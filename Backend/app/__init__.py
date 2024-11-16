# app/__init__.py

from flask import Flask
from app.extensions import db
from app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions like db
    db.init_app(app)

    return app
