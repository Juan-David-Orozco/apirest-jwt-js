import Role from '../models/Role'
import User from '../models/User'

export const checkDuplicateUser = async (req, res, next) => {
  const username = await User.findOne({username: req.body.username})
  const email = await User.findOne({email: req.body.email})
  if(username) return res.status(400).json({message: "The username already exists"})
  if(email) return res.status(400).json({message: "The email already exists"})

  next()
} 

export const checkRolesExisted = async (req, res, next) => {
  if(req.body.roles){
    const rolesCollection = await Role.find()
    const rolesDB = rolesCollection.map((role) => role.name)

    for (let i = 0; i < req.body.roles.length; i++) {
      if(!rolesDB.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`
        })
      }
    }
  }

  next()
}

