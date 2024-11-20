from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "secret_key"  # Make sure to change this to a stronger key in production
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    current_location = db.Column(db.String(100), nullable=False)
    new_location = db.Column(db.String(100), nullable=False)
    mover = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default="Upcoming")

# Routes
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    # Check if user already exists
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already exists!"}), 400
    hashed_password = generate_password_hash(data["password"], method="sha256")
    new_user = User(
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        address=data["address"],
        password=hashed_password,
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()
    if user and check_password_hash(user.password, data["password"]):
        session["user_id"] = user.id
        return jsonify({"message": "Login successful!", "user_id": user.id}), 200
    return jsonify({"message": "Invalid email or password!"}), 401

@app.route("/book_move", methods=["POST"])
def book_move():
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized!"}), 401
    data = request.json
    new_booking = Booking(
        user_id=session["user_id"],
        date=data["date"],
        current_location=data["current_location"],
        new_location=data["new_location"],
        mover=data["mover"],
        price=data["price"],
    )
    db.session.add(new_booking)
    db.session.commit()
    return jsonify({"message": "Move booked successfully!"}), 201

@app.route("/view_bookings", methods=["GET"])
def view_bookings():
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized!"}), 401
    bookings = Booking.query.filter_by(user_id=session["user_id"]).all()
    return jsonify(
        [
            {
                "id": booking.id,
                "date": booking.date,
                "current_location": booking.current_location,
                "new_location": booking.new_location,
                "mover": booking.mover,
                "price": booking.price,
                "status": booking.status,
            }
            for booking in bookings
        ]
    ), 200

@app.route("/view_profile", methods=["GET"])
def view_profile():
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized!"}), 401
    user = User.query.get(session["user_id"])
    return jsonify(
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "address": user.address,
        }
    ), 200

@app.route("/edit_profile", methods=["PUT"])
def edit_profile():
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized!"}), 401
    data = request.json
    user = User.query.get(session["user_id"])
    
    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    user.phone = data.get("phone", user.phone)
    user.address = data.get("address", user.address)
    
    if "password" in data and data["password"]:
        user.password = generate_password_hash(data["password"], method="sha256")
    
    db.session.commit()
    return jsonify({"message": "Profile updated successfully!"}), 200

# Initialize database
with app.app_context():
    db.create_all()

# Run server
if __name__ == "__main__":
    app.run(debug=True)
