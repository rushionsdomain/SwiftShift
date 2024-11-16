const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

// Database configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "user_profile_db",
  password: "chumba123",
  port: 5432,
});

// Database schema
const schema = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS moves (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    from_address TEXT NOT NULL,
    to_address TEXT NOT NULL,
    move_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_activity (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    activity_type VARCHAR(50) NOT NULL,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Initialize database
async function initializeDatabase() {
  try {
    await pool.query(schema);
    console.log("Database schema initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Middleware for request validation
const validateUserId = async (req, res, next) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  const user = await pool.query("SELECT id FROM users WHERE id = $1", [userId]);
  if (user.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  next();
};

// GET /api/users/profile/:id
router.get("/profile/:id", validateUserId, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Get user profile
    const userQuery = `
      SELECT users.*, 
        (SELECT json_agg(moves.*) FROM moves WHERE moves.user_id = users.id) as moves,
        (SELECT json_agg(reviews.*) FROM reviews WHERE reviews.user_id = users.id) as reviews
      FROM users 
      WHERE users.id = $1
    `;
    const result = await pool.query(userQuery, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Log activity
    await logUserActivity(userId, "profile_view", { timestamp: new Date() });

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/users/profile/:id
router.put("/profile/:id", validateUserId, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email, phone, address } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Update user profile
    const updateQuery = `
      UPDATE users 
      SET name = $1, email = $2, phone = $3, address = $4 
      WHERE id = $5 
      RETURNING *
    `;
    const result = await pool.query(updateQuery, [
      name,
      email,
      phone,
      address,
      userId,
    ]);

    // Log activity
    await logUserActivity(userId, "profile_update", {
      fields_updated: Object.keys(req.body),
    });

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// function to log user activity
async function logUserActivity(userId, activityType, details) {
  try {
    const query = `
      INSERT INTO user_activity (user_id, activity_type, details)
      VALUES ($1, $2, $3)
    `;
    await pool.query(query, [userId, activityType, details]);
  } catch (error) {
    console.error("Error logging user activity:", error);
  }
}

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

module.exports = router;
