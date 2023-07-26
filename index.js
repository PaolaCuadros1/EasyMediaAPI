import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import './src/config/dotenv.js'

//Controllers
import UsersController from './src/users/controller.js'
import MessageController from './src/message/controller.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())


const PORT = process.env.PORT || 2500

app.use('/users', UsersController)
app.use('/messages', MessageController)

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  })