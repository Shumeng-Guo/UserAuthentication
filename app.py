from flask import Flask, flash, request, render_template, redirect, url_for
from db import get_db

app = Flask(__name__)

app.secret_key = 'testing'
# RuntimeError: The session is unavailable because no secret key was set. 
# Set the secret_key on the application to something unique and secret

@app.route("/")
def home():
    return render_template("home.html")


@app.route("/login", methods = ["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form['username']
        password = request.form['password']
        # TODO: encrypt password

        # connect to the database       
        conn = get_db()

        # authenticate the username and password entered, flash error message
        # message flashing
        # need to render the flashed messages in your HTML template
        error_message = None
        user = conn.execute('SELECT * FROM users WHERE username = ?', [username]).fetchone()
        if user is None:
            error_message = 'Incorrect username, please try again or SIGN UP'
            flash(error_message, 'Error')
        else:
            if user[-1] != password:
                error_message = 'Incorrect password, please try again!'
                flash(error_message, 'Error')

        if error_message is None:
            flash("Log in successfully!", "Success")
            return redirect(url_for('home'))

    return render_template("login.html")


@app.route("/register", methods = ["GET", "POST"])
def register():
    if request.method == "POST":
        # validation
        # redirect to login if account is succesfully created
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        conn = get_db()
        error_message = None
        # check if (username, password in database)
        existing_user1 = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
        existing_user2 = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        if existing_user1 or existing_user2:
            error_message = 'User Already Existes! Please log in or try again!'
            flash(error_message, "Error")  # when flashing a message, next request get that message (will show up on the redirect)

        # write into database
        if error_message is None:
            conn.execute('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', (username, password, email))
            conn.commit()
            flash("You've successfully created an account! Now please log in!", "Success")
            return redirect(url_for('login'))

    return render_template("register.html")



if __name__ == '__main__':
    app.run(debug = True)