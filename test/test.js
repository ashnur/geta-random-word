
const grw = require('../index.js')
const test = require('tape-async')
const Random = require("random-js");


const TEST_COUNT = 6
const TIMEOUT = 1
const LENGTH_SIZE_MIN_VALUE = grw.minLength ?? 0


test('grw is a function, and returns a string', async (t) => { // actually a HOF that takes a callback which will be called by a string. for fun.
  t.plan(TEST_COUNT)
  const test_word_1 = new Promise((resolve,reject) => {
    grw((w) => {
      resolve(w)
    }, {engine : Random.nodeCrypto })
  })
  const word_1 = await test_word_1

  const typeCheck = typeof word_1 != "string"
  t.notOk(typeCheck , "expected a string")

  const lengthNullCheck = word_1.length == null
  t.notOk(lengthNullCheck, "shouldn't be null")

  const lengthSizeCheck = word_1.length <= LENGTH_SIZE_MIN_VALUE
  t.notOk(lengthSizeCheck, "should be longer than: "+ LENGTH_SIZE_MIN_VALUE)

  const test_word_2 = new Promise((resolve,reject) => {
    grw((w) => {
      resolve(w)
    }, {count: 3, unique: true, minLength: 4, maxLength: 7, engine : Random.nodeCrypto})
  })
  const word_2 = await test_word_2
  const differents_1 = word_2.filter((word, pos) => word_2.indexOf(word, pos + 1) != -1 ).length === 0
  t.ok(differents_1, "should get different words") 

  const not_unique_count = 100
  const test_word_3 = new Promise((resolve,reject) => {
    grw((w) => {
      resolve(w)
    }, {count: not_unique_count, unique: false, engine : Random.nodeCrypto})
  })
  const word_3 = await test_word_3

  const differents_2 = word_3.length === not_unique_count
  t.ok(differents_2, "should get " + not_unique_count + " words") 

  const unique_count = 10000
  const test_word_4 = new Promise((resolve,reject) => {
    grw((w) => {
      resolve(w)
    }, {count: unique_count, unique: true, engine : Random.nodeCrypto})
  })
  const word_4 = await test_word_4

  const uniques = new Set(word_4)
  const differents_3 = unique_count === uniques.size && uniques.size === word_4.length
  t.ok(differents_3, "should get " + unique_count + " unique words") 

})
