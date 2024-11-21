from flask import request, jsonify
from app import app, db
from app.models import MoveRequest, Inventory, User
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/api/moves', methods=['GET'])
@jwt_required()
def get_move_requests():
    user_id = get_jwt_identity()
    moves = MoveRequest.query.filter_by(user_id=user_id).all()
    
    if not moves:
        return jsonify(message="No move requests found"), 404
    
    moves_data = []
    for move in moves:
        moves_data.append({
            "id": move.id,
            "pickup_address": move.pickup_address,
            "delivery_address": move.delivery_address,
            "move_date": move.move_date,
            "inventory_id": move.inventory_id,
            "mover_id": move.mover_id
        })
    
    return jsonify(moves=moves_data), 200

@app.route('/api/moves', methods=['POST'])
@jwt_required()
def create_move_request():
    data = request.get_json()
    user_id = get_jwt_identity()
    
    pickup_address = data['pickup_address']
    delivery_address = data['delivery_address']
    move_date = data['move_date']
    inventory_id = data['inventory_id']
    
    inventory = Inventory.query.filter_by(id=inventory_id, user_id=user_id).first()
    if not inventory:
        return jsonify(message="Inventory not found"), 404
    
    new_move = MoveRequest(
        user_id=user_id,
        pickup_address=pickup_address,
        delivery_address=delivery_address,
        move_date=move_date,
        inventory_id=inventory.id
    )
    
    db.session.add(new_move)
    db.session.commit()
    
    return jsonify(message="Move request created successfully"), 201

@app.route('/api/moves/<int:id>', methods=['PUT'])
@jwt_required()
def update_move_request(id):
    data = request.get_json()
    user_id = get_jwt_identity()
    
    move_request = MoveRequest.query.filter_by(id=id, user_id=user_id).first()
    if not move_request:
        return jsonify(message="Move request not found"), 404
    
    move_request.pickup_address = data.get('pickup_address', move_request.pickup_address)
    move_request.delivery_address = data.get('delivery_address', move_request.delivery_address)
    move_request.move_date = data.get('move_date', move_request.move_date)
    
    db.session.commit()
    
    return jsonify(message="Move request updated successfully"), 200

@app.route('/api/moves/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_move_request(id):
    user_id = get_jwt_identity()
    
    move_request = MoveRequest.query.filter_by(id=id, user_id=user_id).first()
    if not move_request:
        return jsonify(message="Move request not found"), 404
    
    db.session.delete(move_request)
    db.session.commit()
    
    return jsonify(message="Move request deleted successfully"), 200
