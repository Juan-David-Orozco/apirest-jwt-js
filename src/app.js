import express from 'express'
import morgan from 'morgan'
import usersRoute from './routes/users.route'

const app = express()

app.use(morgan('dev'));
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Bienvenido")
})

app.use('/api', usersRoute)

export default app