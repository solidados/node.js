const fs = require('fs')
const path = require('path')

/**
 * `fs` имеет парные методы:
 * - обычный метод НЕ блокирует главный поток
 * - Sync метод блокирует главный поток, и дальше код выполняться не будет,
 * пока файл не будет прочитан, или какая-либо операция не будет завершена.
 * */
const nan = null;
/** .mkdir() - По умолчанию, NodeJS не может создавать папки рекурсивно. Для этого вторым аргументом нужно передать
 *  объект,
 * где указывается разрешение на рекурсию
 * fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), {recursive: true})
 *
 * Пример создания папки и вложенной в неё трёх папок: */
const dir = './dir'
/*const subDirs = ['dir1', 'dir2', 'dir3', 'dir4']

fs.mkdir(dir, { recursive: true }, (err) => {
  if (err) throw err

  subDirs.forEach((subDir) => {
    fs.mkdir(path.join(dir, subDir), (err) => {
      if (err) throw err
    })
  })
})*/

/** .mkdirSync() - Пример создания папки и вложенных в неё других папок с проверкой на наличие существующих
 * В этом примере, если папка уже была создана, то этот шаг пропускается, и переходит к следующему*/
const subDirs = ['dir1', 'dir2', 'dir3', 'dir4']

/*if (!fs.existsSync(path.resolve(__dirname, dir))) {
  fs.mkdirSync(dir, { recursive: true });
}

subDirs.forEach((subDir) => {
  const subDirPath = path.join(dir, subDir);
  if (!fs.existsSync(subDirPath)) {
    fs.mkdirSync(subDirPath);
  }
});*/

/** .mkdir() - С асинхронными функциями работа по-другому: */
/*console.log('START');
fs.mkdir(path.resolve(__dirname, 'dirN'), (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Папка создана');
})
console.log('END');*/

/** .rmdir() - Функция для удаления папок */
// fs.rmdir(path.resolve(__dirname, 'dirN'), (err) => {
//   if (err) {
//     throw err;
//   }
// })

/** writeFile() - Функция создания файла и записи в него данных
 * Данные не добавляются у существующим в файле, а затирают и перезаписывают их
 *
 * Так как обе эти функции Асинхронные, то не известно, какая из них выполнится быстрее.
 * Чтобы упорядочить действия, нужно функцию добавления данных поместить внутрь функции создания файла: */
// fs.writeFile(path.resolve(__dirname, 'test.txt'), '1. First row', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('File created. Data entered');
//   /** .appendFile() - Если нужно дозаписать в файл, то */
//   fs.appendFile(path.resolve(__dirname, 'test.txt'), '\n2. Second row', (err) => {
//     if (err) {
//       throw err;
//     }
//     console.log('File was updated');
//   })
// })

/** Если же нужно выполнять другие действия после создания файла и добавления в него данных, когда мы вкладываем
 *  одну функцию в другую, в треть, в четвёртую, то можно получить так называемый Callback HELL.
 *
 *  Чтобы это исправить существуют Promises */
const fsPromise = require('fs/promises')

// fsPromise.mkdir('/').then().catch()
// fsPromise.readFile('/').then().catch()
// fsPromise.writeFile('/').then().catch()
// fsPromise.appendFile('/').then().catch()
// fsPromise.rm('/').then().catch()
// fsPromise.rmdir('/').then().catch()

/** Реализация функции для записи файла на диск*/
const writeFileAsync = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        return reject(err.message)
      }
      resolve('Operation completed')
    })
  })
}

const appendFileAsync = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, (err) => {
      if (err) {
        return reject(err.message)
      }
      resolve('Operation completed')
    })
  })
}

const readFileAsync = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(err.message)
      }
      resolve(data)
    })
  })
}

const removeFileAsync = async (path) => {
  return new Promise((resolve, reject) => {
    fs.rm(path, (err) => {
      if (err) {
        return reject(err.message)
      }
      resolve()
    })
  })
}
//
// writeFileAsync(path.resolve(__dirname, 'test.txt'), 'New data\n')
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '1. Data to be appended\n'))
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '2. Data to be appended\n'))
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '3. Data to be appended\n'))
//   .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
//   .then(data => console.log(data))
//   .then(() => removeFileAsync(path.resolve(__dirname, 'test.txt')))
//   .then(() => console.log('File was deleted'))
//   .catch((err) => console.log(err.message))

/** .chmod() - Чтение данных из файла */
// fs.chmod()

/** Задача:
 * Через переменную окружения (.env) передать строку, записать её в файл,
 * прочитать файл, посчитать количество слов в файле и записать их количество в
 * новый файл count.txt, а затем удалить основной файл */

const dotenv = require('dotenv')
dotenv.config()

const text = process.env.TEXT || ''

writeFileAsync(path.resolve(__dirname, 'text.txt'), text)
  .then(() => readFileAsync(path.resolve(__dirname, 'text.txt')))
  .then(data => data.split(' ').length)
  .then(wordsCount => writeFileAsync(path.resolve(__dirname, 'wordsCount.txt'), `Количество слов: ${wordsCount}`))
  .then(() => removeFileAsync(path.resolve(__dirname, 'text.txt')))
  .catch(err => console.log(err.message))
