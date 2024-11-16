from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

# Initialize the SQLAlchemy object (for the database)
db = SQLAlchemy()

# Initialize the JWTManager object (for managing JWT tokens)
jwt = JWTManager()
