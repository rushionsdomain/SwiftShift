from flask import Flask, request, jsonify
from werkzeug.exceptions import BadRequest

app = Flask(__name__)

# In-memory users list for demonstration purposes
users = []

@app.route('/signup', methods=['POST'])
def signup():
    """
    POST: Creates a new user from the incoming JSON data (firstname, email, password).
    """
    try:
        data = request.get_json()  # Get JSON data from the request
        firstname = data.get('firstname')
        email = data.get('email')
        password = data.get('password')

        # Simple validation
        if not firstname or not email or not password:
            return jsonify({"error": "Missing required fields"}), 400

        # Check if the user already exists
        for user in users:
            if user['email'] == email:
                return jsonify({"error": "Email already exists"}), 409

        # Add the new user to the list
        new_user = {"firstname": firstname, "email": email, "password": password}
        users.append(new_user)
        return jsonify({"message": "User created successfully", "user": new_user}), 201
    except BadRequest:
        return jsonify({"error": "Invalid JSON data"}), 400

@app.route('/users', methods=['GET'])
def get_users():
    """
    GET: Retrieves the list of all users.
    """
    return jsonify({"users": users}), 200

@app.route('/users/<email>', methods=['GET'])
def get_user(email):
    """
    GET: Retrieves a specific user by email.
    """
    for user in users:
        if user['email'] == email:
            return jsonify({"user": user}), 200
    return jsonify({"error": "User not found"}), 404

@app.route('/users/<email>', methods=['PUT'])
def update_user(email):
    """
    PUT: Updates a user's details (firstname, email, or password).
    """
    data = request.get_json()
    for user in users:
        if user['email'] == email:
            user['firstname'] = data.get('firstname', user['firstname'])
            user['email'] = data.get('email', user['email'])
            user['password'] = data.get('password', user['password'])
            return jsonify({"message": "User updated", "user": user}), 200
    return jsonify({"error": "User not found"}), 404

@app.route('/users/<email>', methods=['DELETE'])
def delete_user(email):
    """
    DELETE: Deletes a user by email.
    """
    global users
    users = [user for user in users if user['email'] != email]
    return jsonify({"message": "User deleted successfully"}), 200

@app.route('/add-user', methods=['POST'])
def add_user():
    """
    ADD: Adds a new user using the same logic as POST /signup but with a slightly different endpoint name.
    """
    try:
        data = request.get_json()  # Get JSON data from the request
        firstname = data.get('firstname')
        email = data.get('email')
        password = data.get('password')

        # Simple validation
        if not firstname or not email or not password:
            return jsonify({"error": "Missing required fields"}), 400

        # Check if the user already exists
        for user in users:
            if user['email'] == email:
                return jsonify({"error": "Email already exists"}), 409

        # Add the new user to the list
        new_user = {"firstname": firstname, "email": email, "password": password}
        users.append(new_user)
        return jsonify({"message": "User added successfully", "user": new_user}), 201
    except BadRequest:
        return jsonify({"error": "Invalid JSON data"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5555)