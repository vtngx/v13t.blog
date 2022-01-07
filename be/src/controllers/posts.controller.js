const { sendResponse } = require('../utils/response')
const postService = require('../services/posts.service')

const listPosts = async (req, res, next) => {
  const data = await postService.list(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getPost = async (req, res, next) => {
  const data = await postService.get(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const createPost = async (req, res, next) => {
  const data = await postService.create(req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updatePost = async (req, res, next) => {
  const data = await postService.update(req.params.id, req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const deletePost = async (req, res, next) => {
  const data = await postService.del(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse({}, res)
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}