const { sendResponse } = require('../utils/response')
const tagService = require('../services/tags.service')

const listTags = async (req, res, next) => {
  const data = await tagService.list(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getTag = async (req, res, next) => {
  const data = await tagService.get(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const createTag = async (req, res, next) => {
  const data = await tagService.create(req.body)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const deleteTag = async (req, res, next) => {
  const data = await tagService.del(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse({}, res)
}

module.exports = {
  listTags,
  getTag,
  createTag,
  deleteTag
}