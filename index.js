'use strict'

// huge list of words
const words = require("./words.js")

// random because why reinvent the wheel?
const Random = require("random-js");

// by default
// words are not unique
// only a single word is returned
// there are no length constraints
const defaultOpts = {
  count : 1, minLength : words.minLength, maxLength : words.maxLength, defaultSeed: 137, unique: false
}

const byLength = (min, max) => (str) => {
  return str.length >= min && str.length <= max
}

const geta_random_word = (options) => {
  const { count = defaultOpts.count, 
          minLength = defaultOpts.minLength, 
          maxLength = defaultOpts.maxLength,
          unique = defaultOpts.unique,
          engine = Random.MersenneTwister19937.seed(defaultOpts.defaultSeed) } = options

  const r = new Random.Random(engine)
  const rangeCheck = byLength(minLength, maxLength)
  const list = (unique ? Array.from(new Set(words.list)) : words.list).filter(rangeCheck)
  const prod = unique ? r.sample(list, count) : r.dice(list.length, count).map(i => list[i])

  return count == 1 ? prod[0] : prod
}

const grw = (cb, opts = defaultOpts) => {
  // experiment
  setImmediate(() => cb(geta_random_word(opts)))
}
grw.minLength = defaultOpts.minLength
grw.maxLength = defaultOpts.maxLength
module.exports = grw

