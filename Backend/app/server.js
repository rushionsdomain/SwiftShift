const express = require("express");
const { initializeDatabase } = require("./user-profile");
const userProfileRouter = require("./user-profile");

const app = express();
app.use(express.json());

// Initialize the database
initializeDatabase();

// Mount the router
app.use("/api", userProfileRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
