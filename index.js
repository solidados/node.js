const Router = require('./framework/Router')
const Application = require('./framework/Application')
const userRouter = require('./src/user-router')

const PORT = process.env.PORT || 5000

const app = new Application()

app.addRouter(userRouter)

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
