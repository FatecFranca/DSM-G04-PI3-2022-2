const mongoose = require('mongoose')

module.exports = function(){
    const {
        MONGODB_USER,
        MONGODB_PASS,
        MONGODB_SERVER,
        MONGODB_DATABASE
    }=process.env
    mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_SERVER}/${MONGODB_DATABASE}?retryWrites=true&w=majority`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected',()=>
        console.log('** Mongoose concetado ao servidor remoto **')
    )

    mongoose.connection.on('error',erro=>
        console.error('***Mongoose: ERRO DE CONEXÃO. Causa: '+erro)
    )
}