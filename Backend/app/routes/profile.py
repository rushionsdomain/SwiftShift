from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User, db

bp = Blueprint('profile', __name__, url_prefix='/profile')

@bp.route('/me', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "name": user.name,
        "email": user.email,
        "phone_number": user.phone_number,
        "address": user.address,
        "profile_picture_url": user.profile_picture_url,
        "role": user.role
    })

@bp.route('/update', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    user.name = data.get('name', user.name)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.address = data.get('address', user.address)
    user.profile_picture_url = data.get('profile_picture_url', user.profile_picture_url)

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"})
