// ! -- PID
// console.log(process.pid);

// ! -- cross-env package
/** Чтобы воспользоваться пакетом для окружения, его нужно установить `$ npm i cross-env`
 * Далее, перед исполняемой командой скрипта из package.json можно указывать `cross-env <var=value>...`
 * `"start": "cross-env PORT=5000 NODE_ENV=production node ./lessons/process.js"`*/

// console.log(process.env.PORT); // 5000
// console.log(process.env.NODE_ENV); // production

// ! -- dotenv package
/** Чтобы читать переменные из файла `.env`, нужно `$ npm i dotenv`*/
const dotenv = require('dotenv')
dotenv.config()

// console.log(process.env.PORT);
// console.log(process.env.NODE_ENV);

// ! -- Arguments
// console.log(process.argv);
/** Набирая в консоли команду запуска, можно вместе с ней передавать флаги и другие команды.
 * напримерЖ `$ node <file_name>.js -a --moon --etc`
 *  Все эти команды, войдут в массив как отдельные элементы и в зависимости от этих команд определять какую-то логику
 */

/*
if (Math.random() > 0.5) {
  while (true) {}
} else {
  console.log('Выполнение программы завершено');
  process.exit()
}*/
