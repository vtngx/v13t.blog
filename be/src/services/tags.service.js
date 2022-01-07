const Tag = require('../models/Tag')
const UserError = require("../utils/userError")

const list = async () => {
  try {
    return await Tag
      .find({})
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

const get = async (_id) => {
  try {
    const data = await Tag.findOne({ _id })
    return data
      ? data
      : new UserError(404, "Tag Not Found")
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

const create = async ({ name }) => {
  try {
    // validate
    if (!name.trim())
      return new UserError(400, "Input Cannot Be Empty")

    //  create item
    return await Tag.create({ name })
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

const del = async (_id) => {
  try {
    //  find by id
    const tag = await Tag.findOne({ _id })
    if (!tag)
      return new UserError(404, "Tag Not Found")

    //  delete
    await Tag.deleteOne({ _id: tag._id })
    return {}
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

module.exports = {
  list,
  get,
  create,
  del,
}