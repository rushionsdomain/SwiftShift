from app.extensions import db

class Mover(db.Model):
    __tablename__ = 'movers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref=db.backref('mover', uselist=False))
    experience = db.Column(db.String(255))
    services_offered = db.Column(db.String(255))
    vehicle_type = db.Column(db.String(100))
    license = db.Column(db.String(255))
    hourly_rate = db.Column(db.Float)

    def __repr__(self):
        return f"<Mover {self.user.name}>"
