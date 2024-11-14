from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Booking(db.Model):
    __tablename__ = 'bookings'

    booking_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    current_location = db.Column(db.String(100))
    new_location = db.Column(db.String(100))
    selected_inventory = db.Column(db.JSON)
    date = db.Column(db.Date)
    time = db.Column(db.Time)
    price = db.Column(db.Float)
    mover = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='bookings')
