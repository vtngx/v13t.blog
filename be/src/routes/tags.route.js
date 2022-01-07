const express = require('express')
const {
  listTags,
  getTag,
  createTag,
  deleteTag
} = require('../controllers/tags.controller')
const { requireAuth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.route('/')
  .get(listTags)
  .post(requireAuth, createTag)

router.route('/:id')
  .get(getTag)
  .delete(requireAuth, deleteTag)

module.exports = router