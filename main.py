import flask
from flask import jsonify
from flask import request
import mysql.connector
from mysql.connector import Error
from connection import Connect
import random

app = flask.Flask(__name__) 
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1> WELCOME TO OUR MOVIE NIGHT APPLICATION! </h1>"

@app.route('/friends/all', methods=['GET'])
def api_all():
    mydb = create_connection()

    cursor = mydb.cursor()
    sql = "SELECT * FROM friend"
    cursor.execute(sql)
    friends = cursor.fetchall()
    
    return jsonify(friends)

@app.route('/friend/addfriend', methods=['POST'])
def addfriend():
    request_data = request.get_json()

    firstname = request_data['firstname']
    lastname = request_data['lastname']
    
    try:
        mydb = create_connection()
        cursor = mydb.cursor()
        query = "INSERT INTO friend (firstname, lastname) VALUES ('"+firstname+"','"+lastname+"')"
        cursor.execute(query)
        mydb.commit()
        print("Connection to MySQL DB successful")
        return 'Hi {}! Your name has been added successfully.'.format(firstname)
    except Exception as e:
        print(f"The error '{e}' occurred")
        return e

@app.route('/friends', methods=['GET'])
def api_friends_id():
    if 'friendID' in request.args:
        friendID = int(request.args['friendID'])
    else:
        return 'ERROR: No ID provided!'

    try:
        mydb = create_connection()
        cursor = mydb.cursor()
        cursor.execute("SELECT * FROM friend WHERE friendID = %s", (friendID,))
        friend = cursor.fetchone()
        return jsonify(friend)
    except Exception as e:
        print(f"The error '{e}' occurred")

@app.route('/friends', methods=['PUT'])
def updatefriend():
    request_data = request.get_json()
    
    friendid = request_data['friendID']
    firstname = request_data['firstname']
    lastname = request_data['lastname']

    try:
        mydb = create_connection()
        cursor = mydb.cursor()
        cursor.execute("UPDATE friend SET firstname = %s, lastname = %s WHERE friendID = %s", (firstname,lastname,friendid))
        mydb.commit()
        return 'Your name has been updated successfully!'
    except Exception as e:
        print(f"The error '{e}' occurred")

@app.route('/friends', methods=['DELETE'])
def deleteFriend():
    if 'friendID' in request.args:
        friendID = int(request.args['friendID'])
    else:
        return 'ERROR: No ID provided!'
    
    try:
        mydb = create_connection()
        cursor = mydb.cursor()
        cursor.execute("DELETE FROM friend WHERE friendID = %s", (friendID,))
        mydb.commit()
        return 'Your name has been deleted successfully!'
    except Exception as e:
        print(f"The error '{e}' occurred")

@app.route('/movies/all', methods=['GET'])
def movie_all():
    mydb = create_connection()

    cursor = mydb.cursor()
    
    cursor.execute("SELECT id, concat(FirstName,' ',LastName) as Name, movie1, movie2, movie3, movie4, movie5, movie6, movie7, movie8, movie9, movie10, b.friendID \
                    FROM friend a \
                    JOIN movielist b \
                    ON a.friendID = b.friendID;")
    movies = cursor.fetchall()
    
    return jsonify(movies)

@app.route('/movies', methods=['POST'])
def addMovie():
    request_data = request.get_json()

    List = request_data['movies']
    print(List['movie1'])
    
    try:
        mydb = create_connection()
        cursor = mydb.cursor()
    
        cursor.execute("INSERT INTO movielist (friendID, movie1,movie2,movie3,movie4,movie5,movie6,movie7,movie8,movie9,movie10) \
                                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", 
                                (List['friendID'], List['movie1'],List['movie2'],List['movie3'],
                                List['movie4'],List['movie5'],List['movie6'],List['movie7'],
                                List['movie8'],List['movie9'],List['movie10'])
                        )
        print("Connection to MySQL DB successful")
        mydb.commit()
        return 'Movies have been added successfully!'
    except Exception as e:
        print(f"The error '{e}' occurred")
    
@app.route('/movies', methods=['GET'])
def api_movie_id():
    if 'movieID' in request.args: 
        movieID = int(request.args['movieID'])
    else:
        return 'ERROR: No ID provided!'
    print(movieID)
    try:
        mydb = create_connection()
        cursor = mydb.cursor()
        cursor.execute("SELECT id, concat(FirstName,' ',LastName) as Name, movie1, movie2, movie3, movie4, movie5, movie6, movie7, movie8, movie9, movie10 \
                    FROM friend a \
                    JOIN movielist b \
                    ON a.friendID = b.friendID \
                    WHERE id = %s;",(movieID,))
        movie = cursor.fetchone()

        return jsonify(movie)
    except Exception as e:
        print(f"The error '{e}' occurred")

@app.route('/movie', methods=['PUT'])
def updateMovie():
    request_data = request.get_json()

    id = request_data['movieID']
    List = request_data['movies']

    try:
        mydb = create_connection()
        cursor = mydb.cursor()
        cursor.execute("UPDATE movielist \
                    SET movie1 = %s, movie2 = %s, movie3 = %s, movie4 = %s, movie5 = %s, movie6 = %s, movie7 = %s, movie8 = %s, movie9 = %s, movie10 = %s \
                    WHERE id = %s", (List['movie1'],List['movie2'],List['movie3'],
                                List['movie4'],List['movie5'],List['movie6'],List['movie7'],
                                List['movie8'],List['movie9'],List['movie10'], id))
        mydb.commit()
        return 'Movies have been updated successfully!'
    except Exception as e:
        print(f"The error '{e}' occurred")

@app.route('/movie', methods=['DELETE'])
def deleteMovie():
    if 'movieID' in request.args:
        movieID = int(request.args['movieID'])
    else:
        return 'ERROR: No ID provided!'
    
    try:
        mydb = create_connection()
        cursor = mydb.cursor()
        cursor.execute("DELETE FROM movielist WHERE id = %s", (movieID,))
        mydb.commit()
        return 'Movies have been deleted successfully!'
    except Exception as e:
        print(f"The error '{e}' occurred")

@app.route('/movies/random/randomMovie', methods=['POST'])
def movie_random():
    request_data = request.get_json()

    Id = ''

    if len(request_data['Id']) == 1:
        Id = str(tuple(request_data['Id'])).replace(",)",")")
        print(Id)
    else:
        Id = tuple(request_data['Id'])
        print(Id)

    try:
        mydb = create_connection()
        cursor = mydb.cursor()
        query = "SELECT movie1, movie2, movie3, movie4, movie5, movie6, movie7, movie8, movie9, movie10 from movielist WHERE friendID in %s" % (Id,)
        cursor.execute(query)
        movies = cursor.fetchall()

        List = []
        for i in movies:
            for y in i:
                if y != '':
                    List.append(y)
        list_index = random.randint(0, len(List) - 1)
        movie = List[list_index]
        return jsonify(movie)

    except Exception as e:
        print(f"The error '{e}' occurred")

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(**Connect)
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection

app.run()