const test = require('tape')
const grw = require('../index.js')

const TIMEOUT = 1
const LENGTH_SIZE_MIN_VALUE = 0

test('grw is a function, and returns a string', (t) => {
  t.plan(6)
  let checks = false
  grw((w) => {
    // console.log('w', w)
    const typeCheck = typeof w != "string"
    t.notOk(typeCheck , "expected a string")
    const lengthNullCheck = w.length == null
    t.notOk(lengthNullCheck, "shouldn't be null")
    const lengthSizeCheck = w.length <= LENGTH_SIZE_MIN_VALUE
    t.notOk(lengthSizeCheck, "should be longer than: "+ LENGTH_SIZE_MIN_VALUE)
    checks = typeCheck && 
             lengthNullCheck && 
             lengthSizeCheck && 
             undefined
  })
  grw((w) => {
    const differents = w.filter((word, pos) => w.indexOf(word, pos + 1) != -1 ).length === 0
    t.ok(differents, "should get different words") 
  }, {count: 3, unique: true, minLength: 4, maxLength: 7})

  const not_unique_count = 100
  grw((w) => {
    const differents = w.length === not_unique_count

    t.ok(differents, "should get " + not_unique_count + " words") 
  }, {count: not_unique_count, unique: false})

  grw((w) => {
    const differents = w.filter((word, pos) => w.indexOf(word, pos + 1) != -1 ).length === 0
    t.ok(differents, "should get different words") 
  }, {count: 1000, unique: true})

  t.end( checks )
})
