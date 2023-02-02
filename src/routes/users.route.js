import { Router } from 'express'
const router = Router()

import {getUsers, getUser, login, register} from '../controllers/users.controller'

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/login', login)

router.post('/register', register)

export default router