import app from './app'
import { connectDB } from './db'
import { PORT } from './config'

const runApp = () => {
  connectDB()
  app.listen(PORT)
  console.log(`Server on port ${PORT}`)
}

runApp()