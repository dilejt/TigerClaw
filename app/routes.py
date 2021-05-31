from app import app
from flask import Flask, Response, redirect, url_for, request, session, abort, render_template, json
from flask_login import LoginManager, UserMixin,login_required, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import table, column, select
import os
import sqlite3 as sql
#set FLASK_APP=aplikacja.py
#flask run

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + os.path.join(basedir, 'uzytkownicy.db')
db = SQLAlchemy(app)

app.config.update(
    DEBUG = True,
    SECRET_KEY = 'sekretny_klucz'
)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

class Users(db.Model):
    __tablename__ = "Users"

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(8),unique=True,nullable=False)
    password = db.Column(db.String(12),nullable=False)
    email = db.Column(db.String(32),unique=True,nullable=False)
     
    def __repr__(self):
        return '<User {0} {1} {2} {3}>'.format(self.id,self.login,self.password,self.email)

class User(UserMixin):
    def __init__(self, id):
        self.id = id

    def __repr__(self):
        return "%s" % (self.id)

json_url = os.path.join(os.path.realpath(os.path.dirname(__file__)), "static/data", "guides.json")
guides = json.load(open(json_url))

@app.route("/")
def main():
    global guides
    return render_template('index.html', len = len(guides["galleries"]), guides = guides["galleries"], url=[ x["img"] for x in guides["galleries"] ]) 


@app.route("/register")
def register():
    return render_template("rejestracja.html")


@app.route('/add', methods=['GET', 'POST'])
def add():
    if request.method == 'POST':
        try:
            with sql.connect("uzytkownicy.db") as con:
                con.execute('CREATE TABLE IF NOT EXISTS User(id INTEGER PRIMARY KEY,login TEXT NOT NULL UNIQUE,password TEXT NOT NULL,email TEXT NOT NULL UNIQUE)')
                user = Users(login=request.form["login"],password=request.form["password"],email=request.form["email"])
                db.session.add(user)
                msg = "Użytkownik dodany"
                db.create_all()
                db.session.commit()
        except:
            msg = "Błąd przy dodawaniu użytkownika"
        finally:
            print (msg)
            return render_template("result.html",msg = msg)
            con.close()
            
@app.route("/login", methods=["GET", "POST"])
def login():
    load_user
    try:
        if request.method == 'POST':
            login = request.form['login']
            password = request.form['password']
            user=db.session.query(Users).filter_by(login=login)
            for usertemp in user:
                user = usertemp
            if password == user.password and login == user.login:
                session['login'] = login
                login_user(User(user.id))
                return redirect(url_for("main"))
            else:
                return abort(401)
        else:
            return render_template('logowanie.html')
    except:
        return abort(401)

@app.errorhandler(401)
def page_not_found(e):
    tytul="Złe dane logowania... "
    blad = "401"
    return render_template('blad.html', tytul=tytul, blad=blad)

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("main"))

# przeladowanie uzytkownika
@login_manager.user_loader
def load_user(userid):
    return User(userid)

@app.route("/account")
@login_required
def account():
    global guides
    return render_template("konto.html", len = len(guides["galleries"]), guides = guides["galleries"], url=[ x["img"] for x in guides["galleries"] ]) 


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)