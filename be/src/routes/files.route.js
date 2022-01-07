const express = require('express')
const {
  upload, download
} = require('../controllers/files.controller')
const { requireAuth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.route('/upload')
  .post(requireAuth, upload)

router.route('/:name')
  .get(requireAuth, download)

module.exports = router