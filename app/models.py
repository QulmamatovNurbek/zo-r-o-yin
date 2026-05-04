from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from app import db

class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    points = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    scores = db.relationship("Score", backref="user", lazy=True, cascade="all,delete-orphan")

    def set_password(self, pw): self.password_hash = generate_password_hash(pw)
    def check_password(self, pw): return check_password_hash(self.password_hash, pw)
    def add_points(self, n):
        self.points = (self.points or 0) + int(n)
        db.session.commit()

    @property
    def rank_title(self):
        p = self.points
        if p >= 10000: return "🚀 ZorO'yin Afsonasi"
        if p >= 5000: return "👑 Chempion"
        if p >= 3000: return "💎 Master"
        if p >= 1500: return "🥇 Professional"
        if p >= 800: return "🥈 Tajribali"
        if p >= 300: return "🥉 Havaskor"
        return "🌱 Yangi o'yinchi"

class Score(db.Model):
    __tablename__ = "scores"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    game = db.Column(db.String(40), nullable=False)
    points_earned = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
