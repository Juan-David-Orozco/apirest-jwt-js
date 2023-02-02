const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'));
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Bienvenido")
})

module.exports = app