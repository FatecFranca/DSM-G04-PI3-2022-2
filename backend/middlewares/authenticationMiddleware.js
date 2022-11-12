const { unauthorized, forbidden } = require('../helpers/httpResponses')
const UserModel = require('../models/User')
const TokenGeneratorService = require('../service/TokenGeneratorService')

exports.authenticate = ({ onlyAdmin = false }) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        return unauthorized(res, 'Token não informado')
      }

      const tokenGenerator = new TokenGeneratorService()
      const decoded = tokenGenerator.verifyToken(token)
      const userExists = await UserModel.findOne({ _id: decoded.id })
      if (!userExists) {
        return unauthorized(res, 'Token inválido')
      }

      if (onlyAdmin && !userExists.is_admin) {
        return forbidden(
          res,
          'Você não tem permissão para acessar este recurso'
        )
      }
      
      req.user = userExists
      next()
    } catch (error) {
      return unauthorized(res, 'Token inválido')
    }
  }
}