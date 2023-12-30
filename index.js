const dotenv = require('dotenv')
const Application = require('./framework/Application')
const jsonParser = require('./framework/parseJson')
const urlParser = require('./framework/parseUrl')

const userRouter = require('./src/user-router')

dotenv.config()
const PORT = process.env.PORT || 5000
const BASE_URL = process.env.BASE_URL || ''

const app = new Application()

app.use(jsonParser)
app.use(urlParser(`${BASE_URL}:${PORT}`))

app.addRouter(userRouter)

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
