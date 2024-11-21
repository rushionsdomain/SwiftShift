from flask import request, jsonify
from app import app, db
from app.models import Inventory, User
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/api/inventory', methods=['GET'])
@jwt_required()  # Protect this route by requiring a valid JWT token
def get_inventory():
    user_id = get_jwt_identity()  # Get the current logged-in user's ID
    inventory = Inventory.query.filter_by(user_id=user_id).all()
    
    # If no inventory found
    if not inventory:
        return jsonify(message="No inventory found"), 404
    
    # Serialize inventory items
    inventory_data = []
    for item in inventory:
        inventory_data.append({
            "id": item.id,
            "home_type": item.home_type,
            "items": item.items
        })
    
    return jsonify(inventory=inventory_data), 200

@app.route('/api/inventory', methods=['POST'])
@jwt_required()
def add_inventory():
    data = request.get_json()
    user_id = get_jwt_identity()
    home_type = data['home_type']
    items = data['items']
    
    new_inventory = Inventory(user_id=user_id, home_type=home_type, items=items)
    db.session.add(new_inventory)
    db.session.commit()
    
    return jsonify(message="Inventory added successfully"), 201

@app.route('/api/inventory/<int:id>', methods=['PUT'])
@jwt_required()
def update_inventory(id):
    data = request.get_json()
    user_id = get_jwt_identity()
    
    inventory = Inventory.query.filter_by(id=id, user_id=user_id).first()
    if not inventory:
        return jsonify(message="Inventory not found"), 404
    
    inventory.home_type = data.get('home_type', inventory.home_type)
    inventory.items = data.get('items', inventory.items)
    
    db.session.commit()
    
    return jsonify(message="Inventory updated successfully"), 200

@app.route('/api/inventory/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_inventory(id):
    user_id = get_jwt_identity()
    inventory = Inventory.query.filter_by(id=id, user_id=user_id).first()
    
    if not inventory:
        return jsonify(message="Inventory not found"), 404
    
    db.session.delete(inventory)
    db.session.commit()
    
    return jsonify(message="Inventory deleted successfully"), 200
