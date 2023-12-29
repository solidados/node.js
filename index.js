const http = require('http')

const PORT = process.env.PORT || 5000

class Router {
  constructor () {
    this.endpoints = {}
  }

  request (method = "GET", path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {}
    }
    /** /users [GET, POST, DELETE]; /posts [GET, POST, PUT, DELETE] */
    const endpoint = this.endpoints[path]

    if (endpoint[method]) {
      throw new Error(`[${method}] по адресу ${path} уже существует`)
    }

    endpoint[method] = handler
  }
}

const server = http.createServer((req, res) => {

  res.end(req.url)
})

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
