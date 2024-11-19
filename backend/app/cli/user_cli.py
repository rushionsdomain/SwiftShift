import click
from app import db
from app.models.user import User

@click.group()
def user():
    """User-related commands."""
    pass

@user.command()
@click.argument('name')
@click.argument('email')
@click.argument('password')
def create(name, email, password):
    """Create a new user."""
    user = User(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    click.echo(f"User {name} created successfully!")
