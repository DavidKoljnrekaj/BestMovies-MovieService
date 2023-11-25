const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/search', movieController.searchMovies);
router.get('/details/:movieId', movieController.getMovieDetails);


module.exports = router;
