const mongoose = require('mongoose')
const User = require('../models/User')
const ObjectId = mongoose.Types.ObjectId
const UserError = require('../utils/userError')

const list = async () => {
  try {
    return await User.find({})
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

const get = async (_id) => {
  try {
    const data = await User.findOne({ _id })
    return data
      ? data
      : new UserError(404, "User Not Found")
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

const create = async({ name, password, username }) => {
  try {
    // validate
    if (!name.trim() || !password.trim() || !username.trim())
      return new UserError(400, "Inputs Cannot Be Empty")

    // check duplicacte username
    const existingUser = await User.findOne({ username })
    if (existingUser)
      return new UserError(400, "Username Already Exists")

    //  create item
    return await User.create({ name, password, username })
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

const update = async(_id, { name, username }, reqUser) => {
  try {
    // find user
    const user = await User.findOne({ _id })
    if (!user)
      return new UserError(404, "User Not Found")
    
    if (String(reqUser._id) !== String(_id))
      return new UserError(401, "Unauthorized")

    // validate
    if (!name.trim() || !username.trim())
      return new UserError(400, "Inputs Cannot Be Empty")

    // check duplicacte username
    const existingUser = await User.findOne({ username, _id: { $ne: _id } })
    if (existingUser)
      return new UserError(400, "Username Already Exists")

    //  create item
    return await User.findOneAndUpdate(
      { _id },
      { name, username },
      { new: true }
    )
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

module.exports = {
  list,
  get,
  create,
  update,
}