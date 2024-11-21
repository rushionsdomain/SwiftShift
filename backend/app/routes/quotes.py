from flask import request, jsonify
from app import app, db
from app.models import Quote, MoveRequest, User
from flask_jwt_extended import jwt_required, get_jwt_identity

@app.route('/api/quotes', methods=['GET'])
@jwt_required()
def get_quotes():
    user_id = get_jwt_identity()
    quotes = Quote.query.filter_by(mover_id=user_id).all()  # Movers can see their quotes
    
    if not quotes:
        return jsonify(message="No quotes found"), 404
    
    quotes_data = []
    for quote in quotes:
        quotes_data.append({
            "id": quote.id,
            "move_request_id": quote.move_request_id,
            "mover_id": quote.mover_id,
            "quote_amount": quote.quote_amount
        })
    
    return jsonify(quotes=quotes_data), 200

@app.route('/api/quotes', methods=['POST'])
@jwt_required()
def create_quote():
    data = request.get_json()
    mover_id = get_jwt_identity()
    
    move_request_id = data['move_request_id']
    quote_amount = data['quote_amount']
    
    move_request = MoveRequest.query.filter_by(id=move_request_id).first()
    if not move_request:
        return jsonify(message="Move request not found"), 404
    
    new_quote = Quote(
        move_request_id=move_request.id,
        mover_id=mover_id,
        quote_amount=quote_amount
    )
    
    db.session.add(new_quote)
    db.session.commit()
    
    return jsonify(message="Quote created successfully"), 201

@app.route('/api/quotes/<int:id>', methods=['PUT'])
@jwt_required()
def update_quote(id):
    data = request.get_json()
    mover_id = get_jwt_identity()
    
    quote = Quote.query.filter_by(id=id, mover_id=mover_id).first()
    if not quote:
        return jsonify(message="Quote not found"), 404
    
    quote.quote_amount = data.get('quote_amount', quote.quote_amount)
    
    db.session.commit()
    
    return jsonify(message="Quote updated successfully"), 200

@app.route('/api/quotes/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_quote(id):
    mover_id = get_jwt_identity()
    
    quote = Quote.query.filter_by(id=id, mover_id=mover_id).first()
    if not quote:
        return jsonify(message="Quote not found"), 404
    
    db.session.delete(quote)
    db.session.commit()
    
    return jsonify(message="Quote deleted successfully"), 200
