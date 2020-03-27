const { getActor, getActors } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const chance = require('chance');

describe('actors routes', () => {

  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Bob Marley',
        dob: new Date,
        pob: 'Jamjam'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Bob Marley',
          dob: expect.any(String),
          pob: 'Jamjam',
          __v: 0
        });
      });
  });

  it('gets all actors', async() => {
    const actors = await getActors();

    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => { 
          delete actor.__v; 
          delete actor.dob;
          delete actor.pob;
          expect(res.body).toContainEqual(actor);
          /* console.log(actor); */
          
        });
      });
  });
  it('gets an actor by id', async() => {
    const actor = await getActor();

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect(res.body).toEqual(actor);
        /* console.log(actor); */
      });
  });
});

