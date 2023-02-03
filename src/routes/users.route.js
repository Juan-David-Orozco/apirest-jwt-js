import { Router } from 'express'
const router = Router()
import { authJwt, verifyRegister } from '../middlewares'

import {getUsers, createUser} from '../controllers/users.controller'

router.get('/', getUsers)

router.post('/', [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifyRegister.checkRolesExisted,
    verifyRegister.checkDuplicateUser
  ], createUser
)

export default router