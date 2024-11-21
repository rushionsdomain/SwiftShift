import click
from app.models import db, User
from app import create_app

app = create_app()

@app.cli.command("create-admin")
@click.argument("username")
@click.argument("email")
@click.argument("password")
def create_admin(username, email, password):
    """Create an admin user."""
    from werkzeug.security import generate_password_hash
    admin = User(username=username, email=email, password=generate_password_hash(password), is_admin=True)
    db.session.add(admin)
    db.session.commit()
    print(f"Admin {username} created successfully.")
