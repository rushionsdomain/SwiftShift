from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.booking import Booking, db

bp = Blueprint('booking', __name__, url_prefix='/booking')

@bp.route('/create', methods=['POST'])
@jwt_required()
def create_booking():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    booking = Booking(
        user_id=user_id,
        current_location=data['current_location'],
        new_location=data['new_location'],
        selected_inventory=data['selected_inventory'],
        date=data['date'],
        time=data['time'],
        price=data['price'],
        mover=data['mover']
    )
    
    db.session.add(booking)
    db.session.commit()

    return jsonify({"message": "Booking created successfully"}), 201

@bp.route('/my-bookings', methods=['GET'])
@jwt_required()
def get_my_bookings():
    user_id = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=user_id).all()

    return jsonify([{
        "current_location": booking.current_location,
        "new_location": booking.new_location,
        "date": booking.date,
        "time": booking.time,
        "price": booking.price
    } for booking in bookings])
