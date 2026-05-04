from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, Length, EqualTo, ValidationError
from app.models import User

class RegisterForm(FlaskForm):
    username = StringField("Foydalanuvchi nomi", validators=[DataRequired(), Length(3, 64)])
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Parol", validators=[DataRequired(), Length(6, 128)])
    confirm = PasswordField("Parolni tasdiqlang", validators=[DataRequired(), EqualTo("password", "Parollar mos kelmadi")])
    submit = SubmitField("Ro'yxatdan o'tish")
    def validate_username(self, f):
        if User.query.filter_by(username=f.data).first(): raise ValidationError("Bu nom band.")
    def validate_email(self, f):
        if User.query.filter_by(email=f.data).first(): raise ValidationError("Bu email band.")

class LoginForm(FlaskForm):
    login = StringField("Nomi yoki Email", validators=[DataRequired()])
    password = PasswordField("Parol", validators=[DataRequired()])
    submit = SubmitField("Kirish")

class ResetForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Yangi parol", validators=[DataRequired(), Length(6, 128)])
    confirm = PasswordField("Tasdiqlang", validators=[DataRequired(), EqualTo("password")])
    submit = SubmitField("Parolni yangilash")
