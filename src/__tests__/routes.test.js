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
        .query({ query: 'Tenet' })
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
  });