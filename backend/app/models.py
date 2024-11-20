# backend/app/models.py

from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(120), nullable=True)
    
    def __repr__(self):
        return f'<User {self.name}>'

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mover_id = db.Column(db.Integer, db.ForeignKey('mover.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    location_from = db.Column(db.String(120), nullable=False)
    location_to = db.Column(db.String(120), nullable=False)
    
    def __repr__(self):
        return f'<Booking {self.id}>'

class Mover(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    rating = db.Column(db.Float, nullable=True)

    def __repr__(self):
        return f'<Mover {self.name}>'
