const axios = require('axios');

module.exports.allMovies = async (req, res) => {
    try {
        const friendResponse = await axios.get(
            'http://127.0.0.1:5000/friends/all'
        );
        const movieResponse = await axios.get(
            'http://127.0.0.1:5000/movies/all'
        );

        const friends = friendResponse.data;
        const movies = movieResponse.data;

        res.render('pages/addMovie', { friends, movies});
    } catch (error) {
        console.log(error);
    }
}

module.exports.addMovie = async (req, res) => {
    const movies = req.body;
    try {
        const movie = await axios.post('http://127.0.0.1:5000/movies', {
            movies,
        });
        req.flash('success', movie.data);
        res.redirect('/movie');
    } catch (error) {
        req.flash('error', error.response.statusText);
        res.redirect('/movie');
    }
}

module.exports.editMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await axios.get(
            `http://127.0.0.1:5000/movies?movieID=${id}`
        );
        const movieList = movie.data;

        res.render('pages/editMovie', { movieList });
    } catch (error) {
        req.flash('error', error.response.statusText);
        res.redirect('/movie');
    }
}

module.exports.updateMovie = async (req, res) => {
    const { movieID } = req.params;
    const movies = req.body;

    try {
        const movie = await axios.put(`http://127.0.0.1:5000/movie`, {
            movieID,
            movies,
        });
        req.flash('success', movie.data);
        res.redirect('/movie');
    } catch (error) {
        req.flash('error', error.response.statusText);
        res.redirect('/movie');
    }
}

module.exports.deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await axios.delete(
            `http://127.0.0.1:5000/movie?movieID=${id}`
        );
        req.flash('success', movie.data);
        res.redirect('/movie');
    } catch (error) {
        req.flash('error', error.response.statusText);
        res.redirect('/movie');
    }
}

module.exports.moviesDecision = async (req, res) => {
    try {
        const movies = await axios.get('http://127.0.0.1:5000/movies/all');
        const movieList = movies.data;
        res.render('pages/movieDecision', { movieList });
    } catch (error) {
        console.log('Something went wrong');
    }
}

module.exports.randomMovie = async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        req.flash('warning', 'Please select at least a friend!!!');
        return res.redirect('/movie/decision');
    }

    const movies = req.query.movieID;
    const Id = [];
    for (let movie of movies) {
        Id.push(parseInt(movie));
    }
    try {
        const movie = await axios.post(
            'http://127.0.0.1:5000/movies/random/randomMovie',
            {
                Id,
            }
        );

        const movieShow = movie.data;
        res.render('pages/RandomMovie', { movieShow });
    } catch (error) {
        req.flash('error', error.response.statusText);
        res.redirect('/movie/decision');
    }
}