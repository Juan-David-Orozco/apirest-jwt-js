import User from '../models/User'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
import Role from '../models/Role'

export const register = async(req, res) => {
  try {
    const {username, email, password, roles} = req.body
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password)
    })

    if(roles){
      const foundRoles = await Role.find({name: {$in: roles}})
      newUser.roles = foundRoles.map(role => role._id)
    } else {
      const role = await Role.findOne({name: "user"})
      newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()

    const token = jwt.sign({id: savedUser._id}, TOKEN_SECRET, {expiresIn: 86400})
    res.status(200).json({mesagge:'Register', token})
  } catch (error) {
    res.status(500).json({error: error})
  }
  
}

export const login = async (req, res) => {
  try {
    const {email, password} = req.body

    const userFound = await User.findOne({email}).populate("roles")
    if(!userFound) return res.status(400).json({message: "User not found"})

    const matchPassword = await User.comparePassword(password, userFound.password)
    if(!matchPassword) return res.status(401).json({message: "Invalid password", token: null})

    const token = jwt.sign({id: userFound._id}, TOKEN_SECRET, {expiresIn: 86400})

    res.status(200).json({mesagge:'Login', token})
  } catch (error) {
    res.status(500).json({error: error})
  }
}