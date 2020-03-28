const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');

module.exports = async({ studiosToCreate = 10, actorsToCreate = 50, filmsToCreate = 200 } = {}) => {

  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const actors = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: chance.name(),
    dob: chance.birthday(),
    pob: chance.city()
  })));

  const films = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: `${chance.word()} ${chance.animal()}`,
    studio: chance.pickone(studios),
    released: chance.year(),
    cast: [...Array(10)].map(() => ({ 
      role: `${chance.prefix()} ${chance.animal()}`, 
      actor: chance.pickone(actors) }))    
  })));

};
