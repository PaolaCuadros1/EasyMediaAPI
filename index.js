import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import './src/config/dotenv.js'

//Controllers
import UsersController from './src/users/controller.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())


const PORT = process.env.PORT || 2500
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/users', UsersController)

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  })