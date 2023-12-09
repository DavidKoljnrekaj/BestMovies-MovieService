const request = require('supertest');
const express = require('express');
const movieRoutes = require('../routes/movieRoutes');

const app = express();
app.use(express.json());
app.use('/', movieRoutes);

describe('Movie Routes', () => {
    it('should search movies', async () => {
      const res = await request(app)
        .get('/search')
        .query({ query: 'Tenet' , adult: true, page: 1})
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(res.body).toHaveProperty('results');
    });
  
    it('should get movie details', async () => {
      const res = await request(app)
        .get('/details/tt6723592')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(res.body).toHaveProperty('id');
      expect(res.body.id).toBe(577922);
    });

    it('should get trending movies this week', async () => {
      const res = await request(app)
        .get('/trending/week')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(res.body).toHaveProperty('results');
    });

    it('should get trending movies today', async () => {
      const res = await request(app)
        .get('/trending/today')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(res.body).toHaveProperty('movies');
      expect(res.body).toHaveProperty('trending');
    } , 15000);

    it('should get popular movies', async () => {
      const res = await request(app)
        .get('/popular')
        .query({ page: 1})
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(res.body).toHaveProperty('results');
    });

    it('should get upcoming movies', async () => {
      const res = await request(app)
        .get('/upcoming')
        .query({ page: 1})
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(res.body).toHaveProperty('results');
    });

    it('should get playing now movies', async () => {
      const res = await request(app)
        .get('/now_playing')
        .query({ page: 1})
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(res.body).toHaveProperty('results');
    });

    it('should get top rated movies', async () => {
      const res = await request(app)
        .get('/top_rated')
        .query({ page: 1})
        .expect(200);
  
      expect(res.body).toHaveProperty('results');
    });




  });