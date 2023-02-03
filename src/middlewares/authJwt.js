import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
import Role from '../models/Role'
import User from '../models/User'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]
    if(!token) return res.status(403).json({message: "Not token provided"})
  
    const decoded = jwt.verify(token, TOKEN_SECRET)
    req.userId = decoded.id
  
    const verifyUser = await User.findById(req.userId, {password: 0})
    if(!verifyUser) return res.status(400).json({message: "User not found"})
  
    next()
  } catch (error) {
    res.status(500).json({message: "Unauthorized"})
  }
}

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId, {password: 0})
  const roles = await Role.find({_id: {$in: user.roles}})
  const roleModerator = roles.filter((role) => role.name == "moderator")
  if(roleModerator.length == 0) return res.status(400).json({message: "User not role moderator"})
  next()
}

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId, {password: 0})
  const roles = await Role.find({_id: {$in: user.roles}})
  const roleAdmin = roles.filter((role) => role.name == "admin")
  if(roleAdmin.length == 0) return res.status(400).json({message: "User not role admin"})
  next()
}

/*
export const verifyRole = async (req, res, next) => {
  const user = await User.findById(req.userId, {password: 0})
  console.log(user)
  const roles = await Role.find({_id: {$in: user.roles}})
  console.log(roles)
  
  const verifiedRoles = roles.forEach(role => {
    if(role.name == "moderator") return 1
    if(role.name == "admin") return 2
  })

  console.log(typeof verifiedRoles)

  next()
}
*/