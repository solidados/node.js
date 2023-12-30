const Router = require('../framework/Router')

const router = new Router()

const users = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Rebecca Smith' }
]

router.get('/users', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  res.end(JSON.stringify(users))
})
router.post('/users', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  res.end(JSON.stringify(users))
})

module.exports = router
