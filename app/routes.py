from app import app
from flask import Flask, Response, redirect, url_for, request, session, abort, render_template
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


class User(UserMixin, db.Model):
    __tablename__ = "Users"

    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(8),unique=True,nullable=False)
    password = db.Column(db.String(12),nullable=False)
    email = db.Column(db.String(32),unique=True,nullable=False)
     
    def __repr__(self):
        return '<User {0} {1} {2} {3}>'.format(self.id,self.login,self.password,self.email)


guides = {
"galleries" :[
    { "title":"Chin Zhao",
    "description":"Nieustraszony wojownik",
    "rating":4.8,
    "feedback":23
    },
    { "title":"Rino Jackson",
    "description":"Błyskotliwy odkrywca",
    "rating":4.1,
    "feedback":12
    },
    { "title":"Sixto Rodriguez",
    "description":"Znawca tygrysów",
    "rating":4.2,
    "feedback":33
    },
    { "title":"Sai Gon",
    "description":"Wszechstronnie utalentowany",
    "rating":3,
    "feedback":6
    },
    { "title":"Caitlin Rivers",
    "description":"Przyjaciel natury",
    "rating":4,
    "feedback":20
    },
    { "title":"Martin Hope",
    "description":"Głos nadziei",
    "rating":3.6,
    "feedback":7
    }
    ]
}

url = ["img/guide1.jpg","img/guide2.jpg","img/guide3.jpg","img/guide4.jpg","img/guide5.jpg","img/guide6.jpg"]


@app.route("/")
def main():
    global url
    global guides
    return render_template('index.html', len = len(guides["galleries"]), guides = guides["galleries"], url=url) 


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
            for usertemp in db.session.query(Users).filter_by(login=login):
                user = usertemp
            if password == user.password and login == user.login:
                id = user.id
                user = User(id)
                login_user(user)
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
    global url
    global guides
    return render_template("konto.html", len = len(guides["galleries"]), guides = guides["galleries"], url=url) 


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)