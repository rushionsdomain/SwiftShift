# backend/app/seeds.py

from . import db
from .models import User, Mover

def seed_data():
    # Example user
    user1 = User(name="John Doe", email="john.doe@example.com")
    user2 = User(name="Jane Doe", email="jane.doe@example.com")
    
    # Example movers
    mover1 = Mover(name="Quick Movers", rating=4.5)
    mover2 = Mover(name="Safe Transport", rating=4.2)
    
    # Add data to session and commit
    db.session.add_all([user1, user2, mover1, mover2])
    db.session.commit()
