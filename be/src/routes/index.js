const userRouter = require('./users.route')
const postRouter = require('./posts.route')
const tagRouter = require('./tags.route')
const fileRouter = require('./files.route')


module.exports = app => {
  app.use('/api/users', userRouter)
  app.use('/api/posts', postRouter)
  app.use('/api/tags', tagRouter)
  app.use('/api/files', fileRouter)
}