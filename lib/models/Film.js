const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  role: {
    type: String
  },
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor',
    required: true
  }
});

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true,
    min: 1000,
    max: 9999
  },
  cast: [castSchema]
});
schema.virtual('actors', {
  ref: 'Actor',
  localField: 'cast.actor',
  foreignField: '_id'
});

schema.virtual('studios', {
  ref: 'Studio',
  localField: 'studio',
  foreignField: '_id'
});

module.exports = mongoose.model('Film', schema);
