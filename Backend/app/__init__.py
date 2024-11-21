from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_mail import Mail

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
mail = Mail()

def create_app(config_class='config.Config'):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail.init_app(app)

    # Register Blueprints
    from .routes import auth, users, movers, bookings, payments, notifications
    app.register_blueprint(auth.bp)
    app.register_blueprint(users.bp)
    app.register_blueprint(movers.bp)
    app.register_blueprint(bookings.bp)
    app.register_blueprint(payments.bp)
    app.register_blueprint(notifications.bp)

    return app
