const { sendResponse } = require('../utils/response')
const userService = require('../services/users.service')

const listUsers = async (req, res, next) => {
  const data = await userService.list()
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getUser = async (req, res, next) => {
  const data = await userService.get(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const createUser = async (req, res, next) => {
  const data = await userService.create(req.body)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updateUser = async (req, res, next) => {
  const data = await userService.update(req.params.id, req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
}