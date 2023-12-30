const Router = require('../framework/Router')

const router = new Router()

const users = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Rebecca Smith' }
]

router.get('/users', (req, res) => {
  if (req.params.id) {
    return res.send(users.find(user => user.id.toString() === req.params.id))
  }
  res.send(users)
})

router.post('/users', (req, res) => {
  console.log(req.body);
  const user = req.body

  users.push(user)
  res.send(user)
})

module.exports = router
