from flask import request, jsonify
from app import app, db
from app.models import Notification, User
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/api/notifications', methods=['GET'])
@jwt_required()
def get_notifications():
    user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=user_id).all()
    
    if not notifications:
        return jsonify(message="No notifications found"), 404
    
    notifications_data = []
    for notification in notifications:
        notifications_data.append({
            "id": notification.id,
            "message": notification.message,
            "type": notification.type
        })
    
    return jsonify(notifications=notifications_data), 200

@app.route('/api/notifications', methods=['POST'])
@jwt_required()
def create_notification():
    data = request.get_json()
    user_id = get_jwt_identity()
    message = data['message']
    type = data['type']
    
    new_notification = Notification(user_id=user_id, message=message, type=type)
    db.session.add(new_notification)
    db.session.commit()
    
    return jsonify(message="Notification created successfully"), 201

@app.route('/api/notifications/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_notification(id):
    user_id = get_jwt_identity()
    
    notification = Notification.query.filter_by(id=id, user_id=user_id).first()
    if not notification:
        return jsonify(message="Notification not found"), 404
    
    db.session.delete(notification)
    db.session.commit()
    
    return jsonify(message="Notification deleted successfully"), 200
