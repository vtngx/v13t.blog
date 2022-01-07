const util = require('util')
const path = require('path')
const multer = require('multer')
const maxSize = 2 * 1024 * 1024

const upload = multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `${__dirname}/../public/uploads`
      cb(null, dir)
    },
    filename: (req, file, cb) => {
      const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      cb(null, filename)
    }
  }),
  limits: { fileSize: maxSize }
})

module.exports = {
  uploadSingle: util.promisify(upload.single('file')),
  uploadMulti: util.promisify(upload.array('files'))
}