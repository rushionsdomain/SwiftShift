# backend/app.py

import os
import sys
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from getpass import getpass

# Load environment variables
load_dotenv()

# Initialize Flask and database
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///app.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "supersecretkey")

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
    role = db.Column(db.String(20), nullable=False, default="User")
    password = db.Column(db.String(120), nullable=False)
    bookings = db.relationship('Booking', backref='user', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "role": self.role
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
    status = db.Column(db.String(20), default="Pending")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "mover_id": self.mover_id,
            "date": self.date.isoformat(),
            "location_from": self.location_from,
            "location_to": self.location_to,
            "status": self.status
        }

# CLI Login Prompt
def login_prompt():
    print("Welcome! Please log in.")
    role = input("Login as (Admin, Mover, User): ").strip().capitalize()
    email = input("Enter your email: ").strip()
    password = getpass("Enter your password: ").strip()

    user = User.query.filter_by(email=email, password=password, role=role).first()
    if user:
        print(f"Logged in successfully as {role}")
        return user
    else:
        print("Invalid credentials. Please try again.")
        sys.exit()

# Admin Functions
def admin_dashboard():
    print("Admin Dashboard")
    while True:
        print("\nOptions:")
        print("1. Add User")
        print("2. Add Mover")
        print("3. View Users")
        print("4. View Movers")
        print("5. Exit")
        choice = input("Select an option: ")

        if choice == "1":
            add_user()
        elif choice == "2":
            add_mover()
        elif choice == "3":
            view_users()
        elif choice == "4":
            view_movers()
        elif choice == "5":
            break
        else:
            print("Invalid choice. Try again.")

def add_user():
    print("Adding a new user")
    name = input("Enter name: ")
    email = input("Enter email: ")
    password = getpass("Enter password: ")
    role = input("Enter role (User or Mover): ").capitalize()

    new_user = User(name=name, email=email, password=password, role=role)
    db.session.add(new_user)
    db.session.commit()
    print("User added successfully.")

def add_mover():
    print("Adding a new mover")
    name = input("Enter mover name: ")
    rating = float(input("Enter mover rating: "))

    new_mover = Mover(name=name, rating=rating)
    db.session.add(new_mover)
    db.session.commit()
    print("Mover added successfully.")

def view_users():
    users = User.query.all()
    for user in users:
        print(user.to_dict())

def view_movers():
    movers = Mover.query.all()
    for mover in movers:
        print(mover.to_dict())

# Mover Functions
def mover_dashboard(mover):
    print(f"Welcome, Mover {mover.name}")
    while True:
        print("\nOptions:")
        print("1. View Bookings")
        print("2. Update Booking Status")
        print("3. Exit")
        choice = input("Select an option: ")

        if choice == "1":
            view_mover_bookings(mover.id)
        elif choice == "2":
            update_booking_status()
        elif choice == "3":
            break
        else:
            print("Invalid choice. Try again.")

def view_mover_bookings(mover_id):
    bookings = Booking.query.filter_by(mover_id=mover_id).all()
    for booking in bookings:
        print(booking.to_dict())

def update_booking_status():
    booking_id = int(input("Enter booking ID: "))
    new_status = input("Enter new status (Pending, In Progress, Complete): ")
    
    booking = Booking.query.get(booking_id)
    if booking:
        booking.status = new_status
        db.session.commit()
        print("Booking status updated.")
    else:
        print("Booking not found.")

# User Functions
def user_dashboard(user):
    print(f"Welcome, {user.name}")
    while True:
        print("\nOptions:")
        print("1. View Movers")
        print("2. Create Booking")
        print("3. View My Bookings")
        print("4. Exit")
        choice = input("Select an option: ")

        if choice == "1":
            view_movers()
        elif choice == "2":
            create_booking(user.id)
        elif choice == "3":
            view_user_bookings(user.id)
        elif choice == "4":
            break
        else:
            print("Invalid choice. Try again.")

def create_booking(user_id):
    mover_id = int(input("Enter mover ID: "))
    location_from = input("Enter starting location: ")
    location_to = input("Enter destination: ")
    date_str = input("Enter date (YYYY-MM-DD): ")
    date = datetime.strptime(date_str, '%Y-%m-%d').date()

    new_booking = Booking(
        user_id=user_id,
        mover_id=mover_id,
        location_from=location_from,
        location_to=location_to,
        date=date
    )
    db.session.add(new_booking)
    db.session.commit()
    print("Booking created successfully.")

def view_user_bookings(user_id):
    bookings = Booking.query.filter_by(user_id=user_id).all()
    for booking in bookings:
        print(booking.to_dict())

# Main Program Execution
if __name__ == '__main__':
    with app.app_context():
        user = login_prompt()
        if user.role == "Admin":
            admin_dashboard()
        elif user.role == "Mover":
            mover_dashboard(user)
        elif user.role == "User":
            user_dashboard(user)
