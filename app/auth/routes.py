from flask import render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, login_required, current_user
from app import db
from app.auth import auth_bp
from app.auth.forms import RegisterForm, LoginForm, ResetForm
from app.models import User

@auth_bp.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated: return redirect(url_for("main.dashboard"))
    form = RegisterForm()
    if form.validate_on_submit():
        u = User(username=form.username.data.strip(), email=form.email.data.lower().strip())
        u.set_password(form.password.data)
        db.session.add(u); db.session.commit()
        login_user(u)
        flash(f"Xush kelibsiz, {u.username}!", "success")
        return redirect(url_for("main.dashboard"))
    return render_template("auth/register.html", form=form)

@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated: return redirect(url_for("main.dashboard"))
    form = LoginForm()
    if form.validate_on_submit():
        u = User.query.filter((User.email == form.login.data.lower().strip()) | (User.username == form.login.data.strip())).first()
        if u and u.check_password(form.password.data):
            login_user(u, remember=True)
            flash("Muvaffaqiyatli kirdingiz!", "success")
            return redirect(request.args.get("next") or url_for("main.dashboard"))
        flash("Email yoki parol noto'g'ri.", "danger")
    return render_template("auth/login.html", form=form)

@auth_bp.route("/logout")
@login_required
def logout():
    logout_user()
    flash("Tizimdan chiqdingiz.", "info")
    return redirect(url_for("main.index"))

@auth_bp.route("/reset", methods=["GET", "POST"])
def reset():
    """Soddalashtirilgan parolni tiklash (email yuborilmaydi — demo uchun)."""
    form = ResetForm()
    if form.validate_on_submit():
        u = User.query.filter_by(email=form.email.data.lower().strip()).first()
        if u:
            u.set_password(form.password.data); db.session.commit()
            flash("Parol yangilandi. Endi kiring.", "success")
            return redirect(url_for("auth.login"))
        flash("Bunday email topilmadi.", "danger")
    return render_template("auth/reset.html", form=form)
