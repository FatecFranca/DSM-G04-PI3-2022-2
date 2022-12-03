module.exports.badRequest = (res, message) => {
  return res.status(400).json({
    message,
  })
}

module.exports.notFound = (res, message) => {
  return res.status(404).json({
    message,
  })
}

module.exports.unauthorized = (res, message) => {
  return res.status(401).json({
    message,
  })
}

module.exports.forbidden = (res, message) => {
  return res.status(403).json({
    message,
  })
}

module.exports.ok = (res, data) => {
  return res.status(200).json(data)
}

module.exports.serverError = (res, error) => {
  return res.status(500).json({
    message: error.message,
  })
}
