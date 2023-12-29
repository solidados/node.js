// ! Stream !== Thread
/** Stream types:
 *
 * • Readable – чтение
 *
 * • Writable – запись
 *
 * • Duplex – чтение + запись
 *
 * • Transform – Такой же, как Duplex, но может изменять данные по мере чтения
 *
 * Стримы нужны для того, чтобы считывать файлы по кусочкам. Размер 1 кусочка = 64Кб*/
const fs = require('fs')
const path = require("path");

// ? -- стандартное чтение за один раз
// fs.readFile(path.resolve(__dirname, 'file-data.txt'), (err, data) => {
//   if (err) throw err
//   console.log(data);
// })

// ? -- как то же самое можно сделать при помощи стримов
/*const readableStream = fs.createReadStream(path.resolve(__dirname, 'file-data.txt'), {
  autoClose: true,
  emitClose: false,
  start: 1,
  end: 10
})*/
// но callback вторым аргументом уже не передаётся. Теперь нам нужно подписаться на событие:

/*readableStream.on('data', (chunk) => {
  console.log(chunk); // получаем chunks, каждый по 65486 bytes
})
readableStream.on('end', () => console.log('Reading ended...'))
readableStream.on('open', () => console.log('Reading started...'))
// обязательно нужно подписываться на событие 'Error', иначе процесс может упасть.
readableStream.on('error', (err) => console.log(`Reading Error: ${err}`))*/

// ? -- writableStream
/*const writableStream = fs.createWriteStream(path.resolve(__dirname, 'file-data2.txt'))
for (let i = 0; i < 20; i++) {
  writableStream.write(i + '\n')
}
writableStream.end()
writableStream.close()
writableStream.destroy()
writableStream.on('error')*/

const http = require('http')
http.createServer((req, res) => {
  /** • req - это Readable stream
   * • res - это Writable stream
   * */
    // например хотим отправить пользователю файл:
  const stream = fs.createReadStream(path.resolve(__dirname, 'file-data.txt')) // читаем по кусочкам файл
  stream.on('data', chunk => res.write(chunk)) // отправляем прочитанный кусочек юзверу
  stream.on('end', chunk => res.end()) // однако чтение файла проходит быстрее, чем соединение
  // Здесь получается ситуация, когда мы уже файл прочитали, соединение закончили, но при этом пользователь весь
  // этот файл выкачать не успел.
  // Для этого придуман метод .pipe(), в который передаётся writableStream - (res!)
  stream.pipe(res)
})
