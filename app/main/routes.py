from flask import render_template
from flask_login import login_required, current_user
from app.main import main_bp
from app.models import User

# Premium o'yin ochilish chegaralari
UNLOCK_THRESHOLDS = {
    "snake": 300, "flappy": 300, "tetris": 800, "pong": 800,
    "2048": 1500, "minesweeper": 1500,
}

@main_bp.route("/")
def index():
    return render_template("index.html")

@main_bp.route("/dashboard")
@login_required
def dashboard():
    games = [
        {"slug": "rps", "name": "Tosh-Qaychi-Qog'oz", "emoji": "✊", "free": True, "desc": "Klassik o'yin. Yutsang +10 ball."},
        {"slug": "guess", "name": "Sonni Top!", "emoji": "🔢", "free": True, "desc": "1-100 oralig'ida sonni top. +20 gacha ball."},
        {"slug": "tictactoe", "name": "X-O O'yini", "emoji": "❌", "free": True, "desc": "Kompyuter bilan o'yna. Yutsang +15 ball."},
        {"slug": "memory", "name": "Xotira Sinovi", "emoji": "🧠", "free": True, "desc": "4x4 kartalarni eslab juftla. +25 ball."},
        {"slug": "quiz", "name": "Oddiy Viktorina", "emoji": "❓", "free": True, "desc": "10 ta savol. Har to'g'ri javob — +5 ball."},
        {"slug": "snake", "name": "Ilon O'yini", "emoji": "🐍", "free": False, "unlock": 300, "desc": "Klassik Snake. Har ovqat — +1 ball."},
        {"slug": "flappy", "name": "Flappy Qush", "emoji": "🐤", "free": False, "unlock": 300, "desc": "Quvurlardan o'tib bor. Har quvur — +2 ball."},
        {"slug": "tetris", "name": "Tetris", "emoji": "🟦", "free": False, "unlock": 800, "desc": "Bloklarni joylashtir. Har qator — +10 ball."},
        {"slug": "pong", "name": "Pong", "emoji": "🏓", "free": False, "unlock": 800, "desc": "2D klassika. Yutsang +30 ball."},
        {"slug": "2048", "name": "2048", "emoji": "🧩", "free": False, "unlock": 1500, "desc": "Sonlarni qo'shib 2048 ga yet. Har 2048 blok — +50 ball."},
        {"slug": "minesweeper", "name": "Mina Qidiruvchi", "emoji": "💣", "free": False, "unlock": 1500, "desc": "Minalarga tushmay och. Yutsang +40 ball."},
    ]
    for g in games:
        g["unlocked"] = g["free"] or current_user.points >= g.get("unlock", 0)
    return render_template("dashboard.html", games=games)

@main_bp.route("/leaderboard")
def leaderboard():
    top = User.query.order_by(User.points.desc()).limit(50).all()
    return render_template("leaderboard.html", users=top)
