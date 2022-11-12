const mongoose = require('mongoose')

const schema = mongoose.Schema({
    order: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

/*
    Parâmetros de mongoose.model:
    1º - Nome da model, para uso interno (convenção: primeira letra maiúscula e singular)
    2º - Relação de campos do esquema (schema)
    3º - Nome da collection no banco de dados (convenção: mesmo nome da model com letra inicial minúsculas e plural)
*/
module.exports = mongoose.model('Criterion', schema, 'criterions')