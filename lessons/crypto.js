const crypto = require('crypto');

const start = Date.now()

crypto.pbkdf2('Qwerty', '5', 100000, 64, 'sha512', () => {
  console.log('1 end after: ', Date.now() - start)
})

crypto.pbkdf2('Qwerty', '5', 100000, 64, 'sha512', () => {
  console.log('2 end after: ', Date.now() - start)
})

crypto.pbkdf2('Qwerty', '5', 100000, 64, 'sha512', () => {
  console.log('3 end after: ', Date.now() - start)
})

crypto.pbkdf2('Qwerty', '5', 100000, 64, 'sha512', () => {
  console.log('4 end after: ', Date.now() - start)
})

crypto.pbkdf2('Qwerty', '5', 100000, 64, 'sha512', () => {
  console.log('5 end after: ', Date.now() - start)
})
/**
 ❯ node crypto.js
 3 end after:  227
 4 end after:  277
 1 end after:  278
 2 end after:  280
 5 end after:  373

 */
