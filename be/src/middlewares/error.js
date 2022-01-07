module.exports = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || err.errObj || "Server Error",
  })
}