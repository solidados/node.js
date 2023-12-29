const http = require('http')

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  if (req.url === '/users') {
    return res.end(JSON.stringify([
      {
        name: 'John',
        surname: 'Smith',
        age: 25,
        id: 1
      }
    ]))
  }
  if (req.url === '/posts') {
    return res.end(JSON.stringify([
      {
        postId: 1,
        authorId: 1,
        title: 'Lorem ipsum dolor sit amet.',
        post: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet deserunt enim eveniet ex exercitationem hic, nam nulla quas repellendus tempora voluptates? Delectus esse maiores mollitia, nam officia possimus provident tempora? Autem commodi dicta facere in neque nihil obcaecati quam recusandae repellat voluptatum? Architecto delectus, explicabo minus officiis reiciendis repellendus.'
      }
    ]))
  }
  res.end(req.url)
})

server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
