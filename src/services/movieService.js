const axios = require('axios');
//const { apiKey } = require('../config/movieApiConfig');

const apiKey = '978c227f75cf1305f5de177f3773f57e';
const API_BASE_URL = 'https://api.themoviedb.org/3';

exports.searchMovies = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/movie`, {
      params: {
        api_key: apiKey,
        query,
      },
    });
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


