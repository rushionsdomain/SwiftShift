# app/config.py

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///movers.db'  # Path to your SQLite DB
    JWT_SECRET_KEY = 'your-secret-key'  # Change this to a secure key
