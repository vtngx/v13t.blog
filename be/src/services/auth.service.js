const User = require('../models/User')
const UserError = require("../utils/userError")

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await User
      .findOne({ username })
      .select('+password')

    if (!user)
      return new UserError(401, "Invalid Credentials")

    return !!await user.matchPassword(password)
      ? user
      : new UserError(401, "Invalid Credentials")
  } catch (err) {
    return new UserError
  }
}

module.exports = {
  login
}