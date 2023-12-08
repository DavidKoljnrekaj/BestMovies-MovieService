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


exports.getActorDetails = async (req, res) => {
  try {
    const actorId = req.params.actorId;
    const actor = await castService.getActorDetails(actorId);
    res.json(actor);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getActorMovies = async (req, res) => {
  try {
    const actorId = req.params.actorId;
    const movies = await castService.getActorMovies(actorId);
    res.json(movies);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getActorStatistics = async (req, res) => {
  try {
    const actorId = req.params.actorId;
    const statistics = await castService.getActorStatistics(actorId);
    res.json(statistics);
  } catch (error) {
    res.status(500).send(error.message);
  }
};