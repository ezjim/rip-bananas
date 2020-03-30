const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .select('name company')
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate({ 
        path: 'reviews', 
        select: 'rating review film -reviewer', 
        populate: {
          path: 'film',
          select: 'title' }
      })
      .select('name company reviews')
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
