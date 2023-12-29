const http = require('http')

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
  if (req.url === '/users') return res.end('USERS')
  if (req.url === '/posts') return res.end('POSTS')
  res.end(req.url)
})

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
