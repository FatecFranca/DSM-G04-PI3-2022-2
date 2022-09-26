const mongoose = require('mongoose')

module.exports = {
  connectToMongo() {
    return new Promise((resolve, reject) => {
      const { MONGODB_USER, MONGODB_PASS, MONGODB_SERVER, MONGODB_DATABASE } =
        process.env

      mongoose.connect(
        `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_SERVER}/${MONGODB_DATABASE}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )

      mongoose.connection.on('connected', () => {
        resolve()
      })

      mongoose.connection.on('error', erro => {
        reject(erro)
      })
    })
  },
}
