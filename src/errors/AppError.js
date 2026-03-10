const { HTTP_BAD_REQUEST_RESPONSE }  = require('../config/.arquivosGlobais')


class AppError extends Error {
  constructor(message, statusCode = HTTP_BAD_REQUEST_RESPONSE) {
    super(message)
    this.statusCode = statusCode
  }
}

module.exports = AppError