
const { getStudio, getStudios } = require('../db/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('studios routes', () => {
  
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Warner Bros',
        address: {
          city: 'Los Angeles',
          state: 'California',
          country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Warner Bros',
          address: {
            city: 'Los Angeles',
            state: 'California',
            country: 'USA'
          },
          __v: 0
        });
      });
  });

  it('gets all studios', async() => {
    const studios = await getStudios();

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        studios.forEach(studio => {
          delete studio.__v;
          delete studio.address;
          expect(res.body).toContainEqual(studio);
        });
      });
  });

  it('gets a studio by id', async() => {
    const studio = await getStudio();

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual(studio);
      });
  });
});
