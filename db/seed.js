const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

module.exports = async({ studiosToCreate = 10, actorsToCreate = 50 } = {}) => {

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
    dob: chance.date(),
    pob: chance.city()
  })));
  
};
