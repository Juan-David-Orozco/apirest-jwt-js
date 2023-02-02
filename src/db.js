import mongoose from 'mongoose' 
import { MONGODB_URI } from './config'

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(MONGODB_URI)
    console.log(`Connect DB: ${db.connection.name}`)  
  } catch (error) {
    console.log(error)
  }
}