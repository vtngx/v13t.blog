const Post = require('../models/Post')
const UserError = require("../utils/userError")
const { ObjectId } = require('mongoose').Types

const list = async (query) => {
  try {
    let { search, tag, page, limit } = query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit
    const conditions = {}

    if (tag)
      conditions.tags = ObjectId(tag)

    if (search)
      conditions.title = { $regex: search, $options: 'i' }

    const data = await Post
      .find(conditions)
      .populate('author')
      .populate('tags')
      .skip(skip)
      .limit(limit)

    return { page, data }
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

const get = async (_id) => {
  try {
    const data = await Post
      .findOne({ _id })
      .populate('author')
      .populate('tags')
    return data
      ? data
      : new UserError(404, "Post Not Found")
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

const create = async ({ title, tags, body, thumbnail }, reqUser) => {
  try {
    // validate
    if (!title.trim() || !body.trim() || !tags.length)
      return new UserError(400, "Inputs Cannot Be Empty")

    //  create item
    return await Post.create({ title, tags, body, thumbnail, author: reqUser._id })
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

const update = async (_id, { title, tags, body, thumbnail }, reqUser) => {
  try {
    //  find by id
    let post = await Post.findOne({ _id })
    if (!post)
      return new UserError(404, "Post Not Found")
    
    if (String(reqUser._id) !== String(post.author))
      return new UserError(401, "Unauthorized")

    // validate
    if (!title.trim() || !body.trim() || !tags.length)
      return new UserError(400, "Inputs Cannot Be Empty")

    //  update item
    return await Post.findOneAndUpdate(
      { _id: post._id },
      { title, tags, body, thumbnail },
      { new: true }
    )
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

const del = async (_id) => {
  try {
    //  find by id
    const post = await Post.findOne({ _id })
    if (!post)
      return new UserError(404, "Post Not Found")

    //  delete
    await Post.deleteOne({ _id: post._id })
    return {}
  } catch (e) {
    return new UserError(500, "Server Error", e)
  }
}

module.exports = {
  list,
  get,
  create,
  update,
  del,
}