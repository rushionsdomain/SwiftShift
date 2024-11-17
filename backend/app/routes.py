# backend/app/routes.py

from flask import Blueprint, jsonify, request
from .models import User, Mover, Booking
from . import db

main = Blueprint('main', __name__)

@main.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify([user.name for user in users])
    
    elif request.method == 'POST':
        data = request.get_json()
        new_user = User(name=data['name'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User added successfully"}), 201
