const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { engine } = require('express-handlebars')
const methodOverride = require('method-override')

const router = require('./routes')

const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')

const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())

app.use(messageHandler)

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})