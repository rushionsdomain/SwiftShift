from app.extensions import db

class Admin(db.Model):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref=db.backref('admin', uselist=False))
    permissions = db.Column(db.String(255))

    def __repr__(self):
        return f"<Admin {self.user.name}>"
