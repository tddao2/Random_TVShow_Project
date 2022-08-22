const express = require('express');
const router = express.Router();

const {
    allMovies,
    addMovie,
    editMovie,
    updateMovie,
    deleteMovie,
    moviesDecision,
    randomMovie,
} = require('../controllers/movies');

router.get('', allMovies);

router.post('', addMovie);

router.get('/:id/edit', editMovie);

router.put('/:movieID', updateMovie);

router.delete('/:id', deleteMovie);

router.get('/decision', moviesDecision);

router.get('/randomSelection', randomMovie);

module.exports = router;
