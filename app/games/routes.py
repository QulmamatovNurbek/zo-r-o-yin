from flask import render_template, jsonify, request, abort
from flask_login import login_required, current_user
from app import db
from app.games import games_bp
from app.models import Score
from app.main.routes import UNLOCK_THRESHOLDS

MAX_PER_SUBMIT = {"rps":10,"guess":20,"tictactoe":15,"memory":25,"quiz":50,
    "snake":200,"flappy":200,"tetris":500,"pong":30, "2048":500, "minesweeper":50}
GAME_TEMPLATES = {k:f"games/{k}.html" for k in
    ["rps","guess","tictactoe","memory","quiz","snake","flappy","tetris","pong","2048","minesweeper"]}

@games_bp.route("/<slug>")
@login_required
def play(slug):
    if slug not in GAME_TEMPLATES: abort(404)
    th = UNLOCK_THRESHOLDS.get(slug, 0)
    if th and current_user.points < th: abort(403)
    return render_template(GAME_TEMPLATES[slug], slug=slug)

@games_bp.route("/api/award", methods=["POST"])
@login_required
def award():
    from flask_wtf.csrf import CSRFProtect  # not used; CSRF disabled by default for our app
    data = request.get_json(silent=True) or {}
    game = str(data.get("game","")).strip()
    pts = int(data.get("points",0) or 0)
    if game not in MAX_PER_SUBMIT:
        return jsonify({"ok":False,"error":"noma'lum o'yin"}), 400
    if pts <= 0:
        return jsonify({"ok":True,"points":current_user.points})
    pts = min(pts, MAX_PER_SUBMIT[game])
    th = UNLOCK_THRESHOLDS.get(game, 0)
    if th and current_user.points < th:
        return jsonify({"ok":False,"error":"qulflangan"}), 403
    current_user.add_points(pts)
    db.session.add(Score(user_id=current_user.id, game=game, points_earned=pts))
    db.session.commit()
    return jsonify({"ok":True,"added":pts,"points":current_user.points})
