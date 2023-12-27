const path = require('path')

// ? -- join позволяет склеить участки пути вне зависимости от OS
// console.log(path.join('first', 'second', 'third')); // first/second/third
// console.log(path.join(__dirname, 'first', 'second', 'third')); // Users/<user_name>/Documents/node.js/lessons/first/second/third

// ? -- resolve позволяет всегда получать абсолютный путь
// console.log(path.resolve('first', 'second', 'file.ext')); // Users/<user_name>/Documents/node.js/lessons/first/second/third/file.ext
/** Если перед одним из аргументов указать слэш `/first`, то относительный путь будет начиная от указанного */

// ? -- parse помогает распарсить путь
const fullPath = path.resolve(__dirname, 'first', 'second', 'third.ext')
// console.log(path.parse(fullPath));
/** Получим объект со свойствами:
 * {
 *   root: '/',
 *   dir: '/Users/<user_name>/Documents/node.js/lessons/first/second',
 *   base: 'third.ext',
 *   ext: '.ext',
 *   name: 'third'
 * }
 * */

// ? -- sep - разделитель OS
// console.log(path.sep); // /

// ? -- isAbsolute - проверка на абсолютный путь
// console.log(path.isAbsolute(fullPath)); // true

// ? -- basename Название файла
// console.log(path.basename(fullPath)); // third.ext

// ? -- extname Название расширения файла
// console.log(path.extname(fullPath)); // .ext

// ? -- URL и как его правильно распарсить
const siteURL = 'http://localhost:8080/users?id=5123'
const url = new URL(siteURL)
console.log(url);
/**
 * URL {
 *   href: 'http://localhost:8080/users?id=5123',
 *   origin: 'http://localhost:8080',
 *   protocol: 'http:',
 *   username: '',
 *   password: '',
 *   host: 'localhost:8080',
 *   hostname: 'localhost',
 *   port: '8080',
 *   pathname: '/users',
 *   search: '?id=5123',
 *   searchParams: URLSearchParams { 'id' => '5123' },
 *   hash: ''
 * }
 * */
