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
  
  it('gets all films', async() => {
    const films = await getFilms();

    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => {
          delete film.__v;
          delete film.cast;
          expect(res.body).toContainEqual({ ...film, studio: expect.any(Object) });
        });
      });
  });

  it('gets a film by id', async() => {
    const film = await getFilm();
    const studio = await getStudio({ _id: { $in: film.studio } });
    const actors = await getActors({ _id: { $in: film.cast.map(role => role.actor) } });
    
    return request(app)
      .get(`/api/v1/films/${film._id}`)
      .then(res => {
        actors.forEach(actor => {
          delete actor.dob;
          delete actor.pob;
          delete actor.__v;
          film.cast.forEach(role => {
            if(role.actor === actor._id) {
              role.actor = actor;
            }
          });
        });
        
        delete film._id;
        delete film.__v;
        expect(res.body).toEqual({ 
          ...film, 
          studio: { _id: studio._id, name: studio.name }, 
          
        });
      });
  });
});
