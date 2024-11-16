# login.py
from flask import Flask, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

users = {}

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            return jsonify({'message': 'Unauthorized access'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Missing username or password'}), 400
    
    username = data['username']
    password = data['password']
    
    
    # Basic validation
    if len(username) < 3:
        return jsonify({'message': 'Username must be at least 3 characters long'}), 400
    if len(password) < 6:
        return jsonify({'message': 'Password must be at least 6 characters long'}), 400
    
    if username in users:
        return jsonify({'message': 'Username already exists'}), 409
    
    users[username] = generate_password_hash(password)
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Missing username or password'}), 400
    
    username = data['username']
    password = data['password']
    
    if username not in users or not check_password_hash(users[username], password):
        return jsonify({'message': 'Invalid username or password'}), 401
    
    session['username'] = username
    return jsonify({'message': 'Logged in successfully', 'username': username}), 200

@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    session.pop('username', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/user', methods=['GET'])
@login_required
def get_user():
    return jsonify({
        'username': session['username'],
        'message': 'User data retrieved successfully'
    }), 200

@app.route('/api/change-password', methods=['PUT'])
@login_required
def change_password():
    data = request.get_json()
    
    if not data or 'old_password' not in data or 'new_password' not in data:
        return jsonify({'message': 'Missing old or new password'}), 400
    
    username = session['username']
    old_password = data['old_password']
    new_password = data['new_password']
    
    if not check_password_hash(users[username], old_password):
        return jsonify({'message': 'Current password is incorrect'}), 401
    
    if len(new_password) < 6:
        return jsonify({'message': 'New password must be at least 6 characters long'}), 400
    
    users[username] = generate_password_hash(new_password)
    return jsonify({'message': 'Password changed successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)