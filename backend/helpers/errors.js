class NotFoundError extends Error {
  constructor(param, detail) {
    super()
    this.message = `${param} was found.` + (detail ? ' ' + detail: '');
    this.statusCode = 404;
  }
}
module.exports = {
  NotFoundError,
}