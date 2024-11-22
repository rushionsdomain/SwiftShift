import os

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:rushion18!@localhost:5432/movers'
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable modification tracking to save resources
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')  # Set a default secret key
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key')  # Set a default JWT secret key