const { getStudio, getStudios, getFilms } = require('../db/data-helpers');
const chance = require('chance').Chance();
const request = require('supertest');
const app = require('../lib/app');

describe('studios routes', () => {
  
  it('creates a studio', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: chance.company(),
        address: {
          city: chance.city(),
          state: chance.state(),
          country: chance.country()
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: expect.any(String),
          address: {
            city: expect.any(String),
            state: expect.any(String),
            country: expect.any(String),
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
    const films = await getFilms();
    let studioFilms = [];
    films.forEach(film => {
      if(film.studio === studio._id) {
        delete film.cast;
        delete film.studio;
        delete film.released;
        delete film.__v;
        studioFilms.push(film);
      }
    });
    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        /*  delete studio.__v; */
        expect(res.body).toEqual({ ...studio, films: studioFilms });
      });
  });
  
});
