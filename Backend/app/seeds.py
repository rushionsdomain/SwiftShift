from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.mover import Mover
from app.models.admin import Admin

app = create_app()

def seed():
    # User 1 - Customer
    user1 = User(email="user1@example.com", name="John Doe", phone_number="1234567890", address="123 Main St")
    user1.set_password("password123")
    db.session.add(user1)

    # Mover 1 - Associated with User 1
    mover1 = Mover(user_id=user1.id, experience="5 years", services_offered="Residential Moving", vehicle_type="Van", hourly_rate=50)
    db.session.add(mover1)

    # Admin 1 - Associated with User 1
    admin1 = Admin(user_id=user1.id, permissions="All Access")
    db.session.add(admin1)

    # User 2 - Customer
    user2 = User(email="user2@example.com", name="Jane Smith", phone_number="9876543210", address="456 Elm St")
    user2.set_password("securePass456")
    db.session.add(user2)

    # Mover 2 - Associated with User 2
    mover2 = Mover(user_id=user2.id, experience="3 years", services_offered="Office Relocation", vehicle_type="Truck", hourly_rate=60)
    db.session.add(mover2)

    # User 3 - Customer
    user3 = User(email="user3@example.com", name="Mike Johnson", phone_number="1231231234", address="789 Oak St")
    user3.set_password("anotherPass789")
    db.session.add(user3)

    # Mover 3 - Associated with User 3
    mover3 = Mover(user_id=user3.id, experience="10 years", services_offered="Long Distance Moving", vehicle_type="Trailer", hourly_rate=80)
    db.session.add(mover3)

    # User 4 - Customer without a Mover or Admin role
    user4 = User(email="user4@example.com", name="Alice Brown", phone_number="3213214321", address="101 Maple St")
    user4.set_password("password789")
    db.session.add(user4)

    # Commit all changes
    db.session.commit()

# Run the seed function
with app.app_context():
    seed()
