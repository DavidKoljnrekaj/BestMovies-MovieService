const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/search', movieController.searchMovies);
router.get('/details/:movieId', movieController.getMovieDetails);
router.get('/trending/today', movieController.getTrendingMoviesToday);
router.get('/trending/week', movieController.getTrendingMoviesThisWeek);
router.get('/discover', movieController.discoverMovies);
router.get('/movies/now_playing', movieController.getNowPlayingMovies);
router.get('/movies/popular', movieController.getPopularMovies);
router.get('/movies/top_rated', movieController.getTopRatedMovies);
router.get('/movies/upcoming', movieController.getUpcomingMovies);




module.exports = router;
