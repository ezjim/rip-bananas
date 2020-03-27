const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()
  .post('/', (req, res, next) => {
    Film
      .create(req.body)
      .then(film => res.send(film))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Film
      .find()
      .populate({ path: 'studio', select: 'name' })
      .select('title released')
      .then(films => res.send(films))
      .catch(next);
  });