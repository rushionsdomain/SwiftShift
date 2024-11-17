# backend/app.py

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask and database
app = Flask(__name__)

# Configuration settings
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///app.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "supersecretkey")

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Define Models

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(120), nullable=True)
    bookings = db.relationship('Booking', backref='user', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address
        }

class Mover(db.Model):
    __tablename__ = 'movers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    rating = db.Column(db.Float, nullable=True)
    bookings = db.relationship('Booking', backref='mover', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "rating": self.rating
        }

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    mover_id = db.Column(db.Integer, db.ForeignKey('movers.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    location_from = db.Column(db.String(120), nullable=False)
    location_to = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "mover_id": self.mover_id,
            "date": self.date.isoformat(),
            "location_from": self.location_from,
            "location_to": self.location_to
        }

# Routes

# User routes
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        address=data.get('address')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

# Mover routes
@app.route('/movers', methods=['GET'])
def get_movers():
    movers = Mover.query.all()
    return jsonify([mover.to_dict() for mover in movers])

@app.route('/movers', methods=['POST'])
def create_mover():
    data = request.get_json()
    new_mover = Mover(
        name=data['name'],
        rating=data.get('rating', 0)
    )
    db.session.add(new_mover)
    db.session.commit()
    return jsonify(new_mover.to_dict()), 201

@app.route('/movers/<int:mover_id>', methods=['GET'])
def get_mover(mover_id):
    mover = Mover.query.get_or_404(mover_id)
    return jsonify(mover.to_dict())

# Booking routes
@app.route('/bookings', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([booking.to_dict() for booking in bookings])

@app.route('/bookings', methods=['POST'])
def create_booking():
    data = request.get_json()
    new_booking = Booking(
        user_id=data['user_id'],
        mover_id=data['mover_id'],
        date=data['date'],
        location_from=data['location_from'],
        location_to=data['location_to']
    )
    db.session.add(new_booking)
    db.session.commit()
    return jsonify(new_booking.to_dict()), 201

@app.route('/bookings/<int:booking_id>', methods=['GET'])
def get_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    return jsonify(booking.to_dict())

# Data seeding
@app.cli.command("seed")
def seed_data():
    """Seed the database with initial data."""
    user1 = User(name="John Doe", email="john.doe@example.com", phone="+254700123456", address="Nairobi, Kenya")
    user2 = User(name="Jane Doe", email="jane.doe@example.com", phone="+254700654321", address="Mombasa, Kenya")
    mover1 = Mover(name="Quick Movers", rating=4.5)
    mover2 = Mover(name="Safe Transport", rating=4.2)
    booking1 = Booking(user_id=1, mover_id=1, date="2024-12-01", location_from="Nairobi", location_to="Kisumu")

    db.session.add_all([user1, user2, mover1, mover2, booking1])
    db.session.commit()
    print("Database seeded with initial data.")

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
