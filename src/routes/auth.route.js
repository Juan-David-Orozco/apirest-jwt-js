import { Router } from 'express'
const router = Router()

import * as authController from '../controllers/auth.controller'
import { verifyRegister } from '../middlewares'

router.post('/register', [
  verifyRegister.checkRolesExisted,
  verifyRegister.checkDuplicateUser
], authController.register)

router.post('/login', authController.login)

export default router