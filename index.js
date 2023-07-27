import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import './src/config/dotenv.js'

//Controllers
import UsersController from './src/users/controller.js'
import MessagesController from './src/messages/controller.js'

const app = express()

// Setting cors
const whitelist = ['http://localhost:4200']
app.use(cors({
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Forbidden!!!'));
    }
  }
}))

app.use(bodyParser.json())

app.use(morgan('tiny', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

app.use('/users', UsersController)
app.use('/messages', MessagesController)

const PORT = process.env.PORT || 2500
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  })
