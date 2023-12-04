const axios = require('axios');
//const { apiKey } = require('../config/movieApiConfig');

const apiKey = '978c227f75cf1305f5de177f3773f57e';
const API_BASE_URL = 'https://api.themoviedb.org/3';

exports.searchMovies = async (query, adult, page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/movie`, {
      params: {
        api_key: apiKey,
        query,
        include_adult: adult,
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
  try {
    const response = await axios.get(`${API_BASE_URL}/trending/movie/day`, {
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