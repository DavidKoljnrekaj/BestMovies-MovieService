const movieService = require('../services/movieService');

exports.searchMovies = async (req, res, next) => {
  try {
    const { query, adult, page } = req.query;
    const result = await movieService.searchMovies(query, adult == 'true', Number(page));
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

exports.getTrendingMoviesToday = async (req, res) => {
  try {
    const movies = await movieService.getTrendingMoviesToday();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

exports.getTrendingMoviesThisWeek = async (req, res) => {
  try {
    const movies = await movieService.getTrendingMoviesThisWeek();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

exports.discoverMovies = async (req, res, next) => {
  try {
    const { genres, year, rating, sortBy, adult, minVoteCount } = req.query;
    const result = await movieService.discoverMovies(
      genres ? genres.split(',') : null,
      year,
      rating,
      sortBy,
      adult === 'true',
      minVoteCount
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getNowPlayingMovies = async (req, res, next) => {
  try {
    const { page } = req.query;
    const result = await movieService.getNowPlayingMovies(Number(page));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getPopularMovies = async (req, res, next) => {
  try {
    const { page } = req.query;
    const result = await movieService.getPopularMovies(Number(page));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getTopRatedMovies = async (req, res, next) => {
  try {
    const { page } = req.query;
    const result = await movieService.getTopRatedMovies(Number(page));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getUpcomingMovies = async (req, res, next) => {
  try {
    const { page } = req.query;
    const result = await movieService.getUpcomingMovies(Number(page));
    res.json(result);
  } catch (error) {
    next(error);
  }
};

