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