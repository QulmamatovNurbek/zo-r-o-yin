import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "zoroyin-super-secret-change-me"
    # SQLite default. Switch to PostgreSQL: postgresql://user:pass@host/db
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or \
        "sqlite:///" + os.path.join(basedir, "zoroyin.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
