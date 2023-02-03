import User from '../models/User'
import jwt from 'jsonwebtoken'
import Role from '../models/Role'
import { TOKEN_SECRET } from '../config'

export const getUsers = async (req, res) => {
  const users = await User.find()
  res.json({message: 'Get all Users', users})
}

export const createUser = async (req, res) => {
  const {username, email, password, roles} = req.body
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  })

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } })
    newUser.roles = foundRoles.map(role => role._id)
  } else {
    const role = await Role.findOne({ name: "user" })
    newUser.roles = [role._id]
  }

  const savedUser = await newUser.save()

  const token = jwt.sign({ id: savedUser._id }, TOKEN_SECRET, { expiresIn: 86400 })
  res.status(200).json({mesagge:'Create User', token})
}
