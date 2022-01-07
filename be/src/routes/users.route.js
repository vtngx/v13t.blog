const express = require('express')
const {
  listUsers,
  getUser,
  createUser,
  updateUser,
} = require('../controllers/users.controller')
const { requireAuth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.use(requireAuth)

router.route('/')
  .get(listUsers)
  .post(createUser)

router.route('/:id')
  .get(getUser)
  .put(updateUser)

module.exports = router