const castService = require('../services/castService');

exports.getCast = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const cast = await castService.getMovieCast(movieId);
    res.json(cast);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getDirectors = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const directors = await castService.getMovieDirectors(movieId);
    res.json(directors);
  } catch (error) {
    res.status(500).send(error.message);
  }
};