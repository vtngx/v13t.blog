const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Types

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: [{
      type: ObjectId,
      ref: 'Tag'
    }],
    required: true,
    default: []
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User',
    // required: true,
    default: null
  },
  thumbnail: {
    type: String,
    // required: true,
    default: ''
  },
  createdAt: {
    type: String,
    default: new Date(Date.now()).getTime()
  }
})

module.exports = mongoose.model('Post', PostSchema)