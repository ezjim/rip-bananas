const { getFilms, getFilm, getStudio, getActors } = require('../db/data-helpers');

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../lib/app');


describe('films routes', () => {
  
  it('creates a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'The Pest',
        studio: new mongoose.Types.ObjectId(),
        released: 1997,
        cast: [
          { role: 'Pestario', actor: new mongoose.Types.ObjectId() },
          { role: 'Gustav', actor: new mongoose.Types.ObjectId() }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'The Pest',
          studio: expect.any(String),
          released: 1997,
          cast: [
            { _id: expect.any(String), role: 'Pestario', actor: expect.any(String) },
            { _id: expect.any(String), role: 'Gustav', actor: expect.any(String) }
          ],
          __v: 0
        });
      });
  });
});
