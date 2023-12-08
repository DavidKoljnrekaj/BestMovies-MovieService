const axios = require('axios');

const apiKey = '978c227f75cf1305f5de177f3773f57e';
const API_BASE_URL = 'https://api.themoviedb.org/3';

exports.getMovieCast = async (movieId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.cast;
  } catch (error) {
    throw error;
  }
};

exports.getMovieDirectors = async (movieId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    const crew = response.data.crew;
    const directors = crew.filter(member => member.job === 'Director');
    return directors;
  } catch (error) {
    throw error;
  }
};

exports.getActorDetails = async (actorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/person/${actorId}`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.getActorMovies = async (actorId) => {
  try {
    const movies = await getMovies(actorId);
    movies.sort((a, b) => b.popularity - a.popularity);
    return movies.slice(0, 10);
  } catch (error) {
    throw error;
  }
};

exports.getActorStatistics = async (actorId) => {
  try {
    const movies = await getMovies(actorId);
    const averageRating = await getAverageRating(movies);
    const mostKnownGenres = await getActorMostKnownGenres(movies);
    const totalMovies = movies.length;
    return {
      averageRating,
      mostKnownGenres,
      totalMovies,
    };
  } catch (error) {
    throw error;
  }
};


//helpers
const getMovies = async (actorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/person/${actorId}/movie_credits`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.cast;
  } catch (error) {
    throw error;
  }
};

const getAverageRating = async (movies) => {
  const totalRating = movies.reduce((total, movie) => total + movie.vote_average, 0);
  const averageRating = Number((totalRating / movies.length).toFixed(1));
  return averageRating;
};

const getActorMostKnownGenres = async (movies) => {
  const genreCounts = {};
  movies.forEach(movie => {
    movie.genre_ids.forEach(genreId => {
      if (!genreCounts[genreId]) {
        genreCounts[genreId] = 0;
      }
      genreCounts[genreId]++;
    });
  });

  const sortedGenreIds = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);
  const topGenreIds = sortedGenreIds.slice(0, 3);

  const mostKnownGenreResponse = await axios.get(`${API_BASE_URL}/genre/movie/list`, {
    params: {
      api_key: apiKey,
    },
  });

  const topGenres = mostKnownGenreResponse.data.genres.filter(genre => topGenreIds.includes(genre.id.toString())).map(genre => genre.name);
  return topGenres;
};