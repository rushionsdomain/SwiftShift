from flask import Flask
from flask_migrate import Migrate  # Import Flask-Migrate
from app.config import Config
from app.extensions import db, jwt
from app.routes import auth, profile, booking

# Initialize the migrate object
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    
    # Initialize Migrate with the app and db
    migrate.init_app(app, db)

    app.register_blueprint(auth.bp)
    app.register_blueprint(profile.bp)
    app.register_blueprint(booking.bp)

    return app
