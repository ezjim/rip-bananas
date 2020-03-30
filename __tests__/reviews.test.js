const { getReview } = require('../db/data-helpers');
const mongoose = require('mongoose');
const chance = require('chance').Chance();

const request = require('supertest');
const app = require('../lib/app');

describe('reviews routes', () => {

  it('creates a review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 4,
        review: chance.sentence(),
        reviewer: new mongoose.Types.ObjectId(),
        film: new mongoose.Types.ObjectId()
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 4,
          review: expect.any(String),
          reviewer: expect.any(String),
          film: expect.any(String),
          __v: 0
        });
      });
  });

  it('deletes a review by id', async() => {
    const review = await getReview();
    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
  });
});
