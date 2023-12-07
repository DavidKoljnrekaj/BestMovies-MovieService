const request = require('supertest');
const express = require('express');
const castRoutes = require('../routes/castRoutes');

const app = express();
app.use(express.json());
app.use('/', castRoutes);

describe('Cast Routes', () => {
  it('should get cast of a movie', async () => {
    const res = await request(app)
      .get('/872585')
      .expect('Content-Type', /json/)
      .expect(200);

      expect(res.body).not.toBeNull();
  });

  it('should get directors of a movie', async () => {
    const res = await request(app)
      .get('/872585/directors')
      .expect('Content-Type', /json/)
      .expect(200);

      expect(res.body).not.toBeNull();
  });

  it('should get actor details', async () => {
    const res = await request(app)
      .get('/2037/details')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  it('should get movies of an actor', async () => {
    const res = await request(app)
      .get('/2037/movies')
      .expect('Content-Type', /json/)
      .expect(200);

      expect(res.body).not.toBeNull();
  });
});