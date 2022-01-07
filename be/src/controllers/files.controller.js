const fs = require('fs')
const UserError = require("../utils/userError")
const { sendResponse } = require('../utils/response')
const { uploadSingle } = require('../middlewares/upload.middleware')

const upload = async (req, res, next) => {
  try {
    await uploadSingle(req, res)

    if (!req.file)
      return new UserError(400, "Please Upload A File")

    return sendResponse(
      { data: req.file.filename },
      res
    )
  } catch(e) {
    return new UserError(500, "Server Error", e)
  }
}

const download = (req, res) => {
  const fileName = req.params.name
  const directoryPath = `${__dirname}/../public/uploads/`
  console.log(directoryPath + fileName)

  res.download(directoryPath + fileName, fileName, e => {
    if (e)
      return new UserError(500, "Could not download the file.", e)
  })
}

module.exports = {
  upload,
  download
}