const jwt = require('jsonwebtoken');
module.exports = class TokenGeneratorService {
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.expiration = process.env.JWT_EXPIRATION;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: '1d' });
  }
  verifyToken(token) {
    return jwt.verify(token, this.secret);
  }
} 