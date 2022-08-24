# Summary

Building a TV-Show web application following a standard 3 tier architecture: UI – REST API Services – Database.

The application will help user(s) to decide on a movie for a movie-night among friends. At first there should be a page that allows users to create and modify the list of friends. Next, there needs to be a page that allows the user(s) to pick one of the friends that had been created and enter a top-10 list of movies for that friend. Finally, there needs to be the page that makes the decision on what movie will be watched. On this page, the user first picks or selects all the friends who participate in the movie night. After that selection has been performed, there should be a control/button that randomly selects 1 movie among the pool of movies of the friends which are present.

## Installation

The app requires [Node.js](https://nodejs.org/) and [Flask](https://flask.palletsprojects.com/en/2.2.x/installation/#install-flask) to be installed.

These REST Services need to be implemented using the Python Flask Framework and deployed as AWS Lambdas.

Install the dependencies and devDependencies and start the server.

```sh
cd Random_TVShow_Project
touch connection.py
npm i
py main.py
node app.js
```

Besure to add an object ```Connect``` with a AWS Host service connection inside connection.py

# REST API

Friend

|     NAME    |      PATH         |    VERB    |              PURPOSE               |
| ----------- | ----------------- | ---------- | --------------------------------   |
|    Index    | /friend/all       |   GET      | Display all friends               |
|    Create   | /friend           |   POST     | Form to create new friend          |
|    Edit     | /friend/:id/edit  |   GET      | Form to edit specific friend       |
|    Update   | /friend/:id       |   PUT      | Updates specific comment on server |
|    Destroy  | /friend/:id       |   DELETE   | Deletes specific item on server    |

Movie

|     NAME    |      PATH        |    VERB    |              PURPOSE                  |
| ----------- | -----------------| ---------- | ------------------------------------- |
|    Index    | /movie           |   GET      | Display all friend's movies           |
|    Create   | /movie           |   POST     | Form to create new list of movies     |
|    Edit     | /movie/:id/edit  |   GET      | Form to edit specific movie list      |
|    Update   | /movie/:id       |   PUT      | Updates specific movie list on server |
|    Destroy  | /movie/:id       |   DELETE   | Deletes specific movie list on server |

### Request

`GET /friend`

    curl -i -H 'Accept: application/json' http://127.0.0.1:5000/friends/all

### Response

    HTTP/1.1 200 OK
    Date: Tue, 23 Aug 2022 19:07:21 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 175
    
### Request

`POST /friend`

    curl -i -H 'Accept: application/json' http://127.0.0.1:5000/friend/addfriend

### Response

    HTTP/1.1 200 OK
    Date: Wed, 24 Aug 2022 03:49:15 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36
    
    {"firstname":"Thi","lastname":"Dao"}
    
### Request

`GET /friend/33/edit`

    curl -i -H 'Accept: application/json' http://127.0.0.1:5000/friends?friendID=33

### Response

    HTTP/1.1 200 OK
    Date: Wed, 24 Aug 2022 03:53:56 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 29
    
    {"firstname":"Thi","lastname":"Dao"}

### Request

`PUT /friend/33`

    curl -i -H 'Accept: application/json' http://127.0.0.1:5000/friends

### Response

    HTTP/1.1 200 OK
    Date: Wed, 24 Aug 2022 03:57:35 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 53
    
    {"friendID":"33","firstname":"Kate","lastname":"Dao"}

### Request

`DELETE /friend/33`

    curl -i -H 'Accept: application/json' http://127.0.0.1:5000/friends?friendID=33

### Response

    HTTP/1.1 200 OK
    Date: Wed, 24 Aug 2022 04:00:23 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

### Request

`GET /movie`

    curl -i -H 'Accept: application/json' http://127.0.0.1:5000/movies/all

### Response

    HTTP/1.1 200 OK
    Date: Wed, 24 Aug 2022 04:03:53 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 979
    
### Request

`POST /movie`

    curl -i -H 'Accept: application/json' http://127.0.0.1:5000/movies

### Response

    HTTP/1.1 200 OK
    Date: Wed, 24 Aug 2022 04:06:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 185
    
    {"movies":{"friendID":"33","movie1":"The end of the year","movie2":"Mickey","movie3":"Ghost Rider","movie4":"","movie5":"","movie6":"","movie7":"","movie8":"","movie9":"","movie10":""}}
    
### Request

`GET /movie/7/edit`

    curl -i -H 'Accept: application/json' http://127.0.0.1:5000/movies?movieID=7

### Response

    HTTP/1.1 200 OK
    Date: Wed, 24 Aug 2022 04:09:01 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 129

### Request

`PUT /movie/7`

    curl -i -H 'Accept: application/json' http://127.0.0.1:5000/movie

### Response

    HTTP/1.1 200 OK
    Date: Wed, 24 Aug 2022 04:11:19 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 192
    
    {"movieID":"7","movies":{"movie1":"The end of the year","movie2":"Mickey","movie3":"Ghost Rider","movie4":"Rush Hour","movie5":"","movie6":"","movie7":"","movie8":"","movie9":"","movie10":""}}
    
### Request

`DELETE /movie/7`

    curl -i -H 'Accept: application/json' http://127.0.0.1:5000/movie?movieID=7

### Response

    HTTP/1.1 200 OK
    Date: Wed, 24 Aug 2022 04:13:06 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 38
    