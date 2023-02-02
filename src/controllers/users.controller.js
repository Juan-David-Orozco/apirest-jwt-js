const getUsers = (req, res) => {
  res.send('Get all Users')
}

const getUser = (req, res) => {
  res.send('Get User')
}

const login = (req, res) => {
  res.send('Login')
}

const register = (req, res) => {
  res.send('Register')
}

module.exports = {
  getUser, getUsers, login, register
}
