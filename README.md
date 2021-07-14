# Get a random word

### basic usage
```
// commonjs because 
const grw = require('geta-random-word')

// async so it won't block (immediately)
grw((randomWord) => console.log(randomWord)) 


// configure by overwriting default options
grw((randomWord) => console.log(randomWord), {
  // if you want more than one word in an array:
  count : 1, 
  // limit the length of your words
  minLength : grw.minLength, // shortest words' length
  maxLength : grw.maxLength, // longest words' length
  // reproducible generation of different pickings 
  defaultSeed: 137, // 137 is arbitrary, look up https://github.com/ckknight/random-js
  engine: null // this is filled up with MersenneTwister19937 from random-js if unprovided
  unique: false

}) 

```



