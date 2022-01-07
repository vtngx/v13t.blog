const express = require('express')
const {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/posts.controller')
const { requireAuth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.route('/')
  .get(listPosts)
  .post(requireAuth, createPost)

router.route('/:id')
  .get(getPost)
  .put(requireAuth, updatePost)
  .delete(requireAuth, deletePost)

module.exports = router