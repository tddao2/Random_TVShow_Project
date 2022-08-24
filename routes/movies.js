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

// Get all movies
router.get('', allMovies);

// Add a movie list
router.post('', addMovie);

// Get specific movie list
router.get('/:id/edit', editMovie);

// Update specific movie list
router.put('/:movieID', updateMovie);

// Delete a movie list
router.delete('/:id', deleteMovie);

// Get all movie list by Id
router.get('/decision', moviesDecision);

// Get a random movie from multiple movie lists
router.get('/randomSelection', randomMovie);

module.exports = router;
