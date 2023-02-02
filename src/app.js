const express = require('express')
const morgan = require('morgan')
const usersRoute = require('./routes/users.route')

const app = express()

app.use(morgan('dev'));
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Bienvenido")
})

app.use('/api', usersRoute)

module.exports = app