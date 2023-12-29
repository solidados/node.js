const http = require('http')
const Router = require('./framework/Router')
const Application = require('./framework/Application')

const PORT = process.env.PORT || 5000

const router = new Router()
const app = new Application()

router.get('/users', (req, res) => {
  res.end('YOU HAVE SENT A REQUEST TO /users')
})

router.get('/posts', (req, res) => {
  res.end('YOU HAVE SENT A REQUEST TO /posts')
})

app.addRouter(router)

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
