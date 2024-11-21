from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    user_type = db.Column(db.String(50), nullable=False)  # 'user', 'mover', or 'admin'

# Inventory Model
class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    home_type = db.Column(db.String(50), nullable=False)
    items = db.Column(db.JSON, nullable=False)  # JSON field for list of items

# Move Request Model
class MoveRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    pickup_address = db.Column(db.String(255), nullable=False)
    delivery_address = db.Column(db.String(255), nullable=False)
    move_date = db.Column(db.Date, nullable=False)
    inventory_id = db.Column(db.Integer, db.ForeignKey('inventory.id'), nullable=False)
    mover_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Assigned mover

# Quote Model
class Quote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    move_request_id = db.Column(db.Integer, db.ForeignKey('move_request.id'), nullable=False)
    mover_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quote_amount = db.Column(db.Float, nullable=False)

# Notification Model
class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # E.g., 'move', 'payment'
