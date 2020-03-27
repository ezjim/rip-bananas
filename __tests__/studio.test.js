require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');


describe('studio routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let studio;

  beforeEach(async() => {
    studio = await Studio.create({
      name: 'studiotest',
      address: { city: 'SEA', state: 'WA', country: 'USA' }
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'studioone',
        address: { city: 'SEA', state: 'WA', country: 'USA' }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'studioone',
          address: { city: 'SEA', state: 'WA', country: 'USA' },
          __v: 0
        });
      });
  });

});
