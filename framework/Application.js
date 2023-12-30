const http = require('http')
const EventEmitter = require('events')

module.exports = class Application {
  constructor () {
    this.emitter = new EventEmitter()
    this.server = this._createServer()
    this.middlewares = []
  }

  use (middleware) {
    this.middlewares.push(middleware)
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
      let body = ''

      req.on('data', (chunk) => {
        body += chunk
      })

      req.on('end', () => {
        if (body) {
          req.body = JSON.parse(body)
        }
        /** Раньше этот middleware вызывался непосредственно перед вызовом handlers внутри addRouter()
         * а теперь я его перенёс для вызова непосредственно перед генерацией события: */
        this.middlewares.forEach(middleware => middleware(req, res))

        // После того как закончили читать тело запроса (req.body), эмиттим соответствующее событие:
        const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res)

        if (!emitted) {
          res.end() // immediate process end if user requested non-existing route
        }
      })
    })
  }

  addRouter (router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path]

      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method]
          handler(req, res)
        })
      })
    })
  }

  _getRouteMask (path, method) {
    return `[${path}]:[${method}]`
  }
}
