const axios = require('axios');
//const { apiKey } = require('../config/movieApiConfig');

const apiKey = '978c227f75cf1305f5de177f3773f57e';
const API_BASE_URL = 'https://api.themoviedb.org/3';

let cache = {
  timestamp: null,
  data: null,
};

exports.searchMovies = async (query, page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/movie`, {
      params: {
        api_key: apiKey,
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.discoverMovies = async (genres, year, rating, sortBy, adult, minVoteCount) => {
  try {
    const params = {
      api_key: apiKey,
    };

    if (genres) {
      params.with_genres = genres.join(',');
    }

    if (year) {
      params.primary_release_year = year;
    }

    if (rating) {
      params.vote_average_gte = rating;
    }

    if (sortBy) {
      params.sort_by = sortBy;
    }

    if (adult !== null) {
      params.include_adult = adult;
    }

    if (minVoteCount) {
      params.vote_count_gte = minVoteCount;
    }

    const response = await axios.get(`${API_BASE_URL}/discover/movie`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.getTrendingMoviesToday = async () => {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  // If we have data in the cache and it's less than a day old, use it
  if (cache.data && now - cache.timestamp < oneDay) {
    return cache.data;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/trending/movie/day`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
      },
    });
    const movies = response.data.results;
    const highestRatedMovie = getHighestRatedMovie(movies);
    const mostPopularGenre = await getMostPopularGenre(movies);
    const mostFrequentActor = await getMostFrequentActor(movies);
    const data = {
      movies: movies,
      trending: {
        movie: highestRatedMovie,
        genre: mostPopularGenre,
        actor: mostFrequentActor,
      },
    };
    cache = {
      timestamp: now,
      data: data,
    };
    return data;
  } catch (error) {
    throw error;
  }
};

exports.getTrendingMoviesThisWeek = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trending/movie/week`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.getNowPlayingMovies = async (page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/now_playing`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.getPopularMovies = async (page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/popular`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.getTopRatedMovies = async (page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/top_rated`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.getUpcomingMovies = async (page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/upcoming`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

exports.getMovies = async (movieIds) => {
  try {
    const movies = await Promise.all(
      movieIds.map(id => this.getMovieDetails(id))
    );
    return movies;
  } catch (error) {
    throw error;
  }
};

//helpers
const getHighestRatedMovie = (movies) => {
  return movies.reduce((highest, movie) => movie.vote_average > highest.vote_average ? movie : highest, movies[0]);
};

const getMostPopularGenre = async (movies) => {
  const genreCounts = {};
  movies.forEach(movie => {
    movie.genre_ids.forEach(genre => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });
  const genres = await getGenres();
  const mostPopularGenreId = parseInt(Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b));
  const mostPopularGenre = genres.find(genre => genre.id === mostPopularGenreId);
  return mostPopularGenre.name;
};

const getMostFrequentActor = async (movies) => {
  const actorCounts = {};
  for (const movie of movies) {
    const response = await axios.get(`${API_BASE_URL}/movie/${movie.id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    response.data.cast.forEach(actor => {
      actorCounts[actor.id] = (actorCounts[actor.id] || 0) + 1;
    });
  }
  const mostFrequentActorId = Object.keys(actorCounts).reduce((a, b) => actorCounts[a] > actorCounts[b] ? a : b);
  const actorResponse = await axios.get(`${API_BASE_URL}/person/${mostFrequentActorId}`, {
    params: {
      api_key: apiKey,
    },
  });
  return actorResponse.data;
};

const getGenres = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/genre/movie/list`, {
      params: {
        api_key: apiKey,
        language: 'en-US',
      },
    });
    return response.data.genres;
  } catch (error) {
    throw error;
  }
};