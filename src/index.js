const app = require('./app')
const {connectDB} = require('./db')
const {PORT} = require('./config')

const runApp = () => {
  connectDB()
  app.listen(PORT)
  console.log(`Server on port ${PORT}`)
}

runApp()