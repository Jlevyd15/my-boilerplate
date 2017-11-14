const express = require('express')
const path = require('path')
// const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const flash = require('connect-flash')
require('dotenv').config()

// require the auth file which contains all auth initialization
const auth = require('./utils/auth.js')()
const users = require('./routes/users')
const login = require('./routes/login')
const register = require('./routes/register')
const forgot = require('./routes/forgot')
const reset = require('./routes/reset')
const bugs = require('./routes/bugs')

const app = express()
//set the port to run on one that is specified or 3000
app.set('port', (process.env.PORT || 3000))

//setup connetion to db
const options = { useMongoClient: true }
const localMongoUri = 'mongodb://127.0.0.1/passport-auth'
// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect(process.env.NODE_ENV === 'production' ? mongoose.connect(process.env.MONGODB_URI) : localMongoUri, options)
const db = mongoose.connection
db.on('error', () => {
  console.log('Please start the mongo db instanse before running npm start')
  throw new Error('unable to connect to database at')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.session({ cookie: { maxAge: 60000 }}))
// app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))

// Here we're initializing the auth process
app.use(auth.initialize())
app.use('/users', users)
app.use('/login', login)
app.use('/register', register)
app.use('/forgot', forgot)
app.use('/reset', reset)
app.use('/bugs', bugs)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app