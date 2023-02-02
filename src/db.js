const mongoose = require('mongoose')
const {MONGODB_URI} = require('./config')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(MONGODB_URI)
    console.log(`Connect DB: ${db.connection.name}`)  
  } catch (error) {
    console.log(error)
  }
}

module.exports = { connectDB }

