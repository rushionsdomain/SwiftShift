
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import unittest

# Initialize the Flask application
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'  # Use your database URI here
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# Define your models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class Mover(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class Move(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mover_id = db.Column(db.Integer, db.ForeignKey('mover.id'), nullable=True)
    move_date = db.Column(db.DateTime, nullable=False)
    time_slot = db.Column(db.String(50), nullable=False)
    requirements = db.Column(db.String(200), nullable=True)

# Create the database tables
with app.app_context():
    db.create_all()

# Define your routes
@app.route('/api/moves/schedule', methods=['POST'])
def schedule_move():
    data = request.get_json()
    user_id = data.get('user_id')
    move_date = datetime.fromisoformat(data.get('move_date'))
    time_slot = data.get('time_slot')

    # Check if the user exists
    if not User.query.get(user_id):
        return jsonify({"error": "User  not found"}), 404

    # Check for existing moves at the same time
    existing_move = Move.query.filter_by(move_date=move_date, time_slot=time_slot).first()
    if existing_move:
        return jsonify({"error": "No movers available"}), 400

    new_move = Move(
        user_id=user_id,
        move_date=move_date,
        time_slot=time_slot,
        requirements=data.get('requirements')
    )
    
    # Assign a mover (for simplicity, we just assign the first available mover)
    available_mover = Mover.query.first()
    if available_mover:
        new_move.mover_id = available_mover.id

    db.session.add(new_move)
    db.session.commit()
    return jsonify({"move_id": new_move.id}), 201

@app.route('/api/moves/availability/<date>', methods=['GET'])
def check_availability(date):
    # For simplicity, assume all movers are available unless they have a scheduled move
    available_movers = Mover.query.all()
    return jsonify({"available_movers": [mover.name for mover in available_movers]}), 200

# Unit tests
class MoveSchedulingTestCase(unittest.TestCase):
    def setUp(self):
        # Setup the test client and initialize the database
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()
        db.create_all()

        # Create test users and movers
        self.user = User(name="Test User")
        self.mover1 = Mover(name="Mover 1")
        self.mover2 = Mover(name="Mover 2")
        db.session.add_all([self.user, self.mover1, self.mover2])
        db.session.commit()

    def tearDown(self):
        # Clean up the database after each test
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_schedule_move_with_different_time_slots(self):
        # Schedule a move for a specific time slot
        response = self.app.post('/api/moves/schedule', json={
            "user_id": self.user.id,
            "move_date": "2024-11-20T09:00:00",  # ISO format for datetime
            "time_slot": "09:00 AM",
            "requirements": "2 rooms, no special items"
        })
        self.assertEqual(response.status_code, 201)

        # Schedule another move for a different time slot
        response = self.app.post('/api/moves/schedule', json={
            "user_id": self.user.id,
            "move_date": "2024-11-20T13:00:00",  # ISO format for datetime
            "time_slot": "01:00 PM",
            "requirements": "3 rooms, needs packing"
        })
        self.assertEqual(response.status_code, 201)

    def test_unavailable_movers_for_busy_dates(self):
        # Schedule a move on a date and time slot
         response = self.app.post('/api/moves/schedule', json={
            "user_id": self.user.id,
            "move_date": "2024-11-20T13:00:00",  # ISO format for datetime
            "time_slot": "01:00 PM",
            "requirements": "2 rooms, needs packing"
         })