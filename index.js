const words = require("./words.js")

const usedKeys = new Set()

const between = (min, max) => Math.floor(Math.random() * (max - min) + min) 

const byLength = (min, max) => (str) => {
  // console.log('cbbbbl', min, max, str, str.length >= min && str.length <= max)
  return str.length >= min && str.length <= max
}

const has = (ks, k) => {
  // console.log('==>',ks.has(k), ks, k)
  return ks.has(k)
}

const uniqueRandom = (min, max) => {
  const rangeCheck = byLength(min, max)
  const availableWords = words.list.filter(rangeCheck)
  let newKey = between(0, words.list.length)
  while (has(usedKeys, newKey) || ! rangeCheck(words.list[newKey]) ){
    if ( usedKeys.size > (availableWords.length ) ) {
      // console.error('not enough words')
      break
    }
    newKey = between(0, words.list.length)
    // console.log('nk', newKey, min, max, usedKeys.has(newKey))
  }
  usedKeys.add(newKey)
  return newKey
}

const defaultOpts = {
  count : 1, minLength : words.minLength, maxLength : words.maxLength
}


const geta_random_word = ({count = defaultOpts.count, 
                          minLength = defaultOpts.minLength, 
                          maxLength = defaultOpts.maxLength }) => {
  const ws = Array.from(Array(count)).map(() => {
    const r = uniqueRandom(minLength, maxLength)
    // console.log('r',r, minLength, maxLength)
    return words.list[r]
  })

  return count == 1 ? ws[0] : ws
}

module.exports = (cb, opts = defaultOpts) => {
  cb(geta_random_word(opts))
}
