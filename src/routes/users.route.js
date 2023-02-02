const {Router} = require('express')
const router = Router()

const {getUsers, getUser, login, register} = require('../controllers/users.controller')

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/login', login)

router.post('/register', register)

module.exports = router