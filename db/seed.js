const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');

module.exports = async({ studiosToCreate = 10/* , actorsToCreate = 50, reviewersToCreate = 20, filmsToCreate = 150 */ } = {}) => {

  const studios = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: chance.company(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));
};
