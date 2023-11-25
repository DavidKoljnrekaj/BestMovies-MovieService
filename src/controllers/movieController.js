const movieService = require('../services/movieService');

exports.searchMovies = async (req, res, next) => {
  try {
    const { query } = req.query;
    const result = await movieService.searchMovies(query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getMovieDetails = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const result = await movieService.getMovieDetails(movieId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};


