const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/search', movieController.searchMovies);
router.get('/details/:movieId', movieController.getMovieDetails);
router.get('/trending/today', movieController.getTrendingMoviesToday);
router.get('/trending/week', movieController.getTrendingMoviesThisWeek);
router.get('/discover', movieController.discoverMovies);
router.get('/now_playing', movieController.getNowPlayingMovies);
router.get('/popular', movieController.getPopularMovies);
router.get('/top_rated', movieController.getTopRatedMovies);
router.get('/upcoming', movieController.getUpcomingMovies);
router.post('', movieController.getMovies);





module.exports = router;
