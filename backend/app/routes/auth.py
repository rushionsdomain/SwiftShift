from flask import request, jsonify
from app import app, db
from app.models import User
from app.utils.jwt_utils import create_access_token, create_refresh_token
from app.utils.password_utils import hash_password, verify_password

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = hash_password(data['password'])  # Hash the password

    new_user = User(username=username, email=email, password=password, user_type='user')
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User registered successfully"), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()
    if user and verify_password(password, user.password):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        return jsonify(access_token=access_token, refresh_token=refresh_token)

    return jsonify(message="Invalid credentials"), 401
