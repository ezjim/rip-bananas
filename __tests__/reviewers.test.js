const { getReviewers, getReviewer, getReviews, getFilms } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('reviewers routes', () => {

  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'This Guy',
        company: 'Seattle Aquarium',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'This Guy',
          company: 'Seattle Aquarium',
          __v: 0
        });
      });
  });
});
