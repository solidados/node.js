const http = require('http')
const EventEmitter = require('events')

module.exports = class Application {
  constructor () {
    this.emitter = new EventEmitter()
    this.server = this._createServer()
  }

  listen (port, callback) {
    this.server.listen(port, callback)
  }

  /** endpoint = {
   *    '/users': {
   *      'GET': handler
   *     }
   *  }
   *  */

  _createServer () {
    return http.createServer((req, res) => {
      const emitted = this.emitter.emit(this._getRouteMask(req.url, req.method), req, res)

      if (!emitted) {
        res.end() // immediate process end fi user requested non-existing route
      }
    })
  }

  addRouter (router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path]

      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method]

        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          handler(req, res)
        })
      })
    })
  }

  _getRouteMask (path, method) {
    return `[${path}]:[${method}]`
  }
}
