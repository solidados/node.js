const http = require('http')
const EventEmitter = require('events')
const Router = require('./framework/Router')

const PORT = process.env.PORT || 5000

const emitter = new EventEmitter()
const router = new Router()

router.get('/users', (req, res) => {
  res.end('YOU HAVE SENT A REQUEST TO /users')
})

router.get('/posts', (req, res) => {
  res.end('YOU HAVE SENT A REQUEST TO /posts')
})

const server = http.createServer((req, res) => {
  const emitted = emitter.emit(`[${req.url}]:[${req.method}]`, req, res)

  if (!emitted) {
    res.end() // immediate process end fi user requested non-existing route
  }
})

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
