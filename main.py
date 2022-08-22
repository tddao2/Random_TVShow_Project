import flask
from flask import jsonify
from flask import request

app = flask.Flask(__name__) 
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1> WELCOME TO OUR MOVIE NIGHT APPLICATION! </h1>"

app.run()