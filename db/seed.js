const chance = require('chance').Chance();
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');

module.exports = async({ studiosToCreate = 10, actorsToCreate = 50, filmsToCreate = 200, reviewsToCreate = 200, reviewersToCreate = 25 } = {}) => {

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

  await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers),
    review: chance.sentence({ words: 10 }),
    film: chance.pickone(films),
  })));

  const reviewers = await Reviewer.create([...Array(reviewersToCreate)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

};
