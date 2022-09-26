const mongoose = require('mongoose')

const schema = mongoose.Schema({
    question: {
        type: mongoose.ObjectId, // Tipo especial
        ref: 'Question',        // Coleção referenciada
        required: true
    },
    entry: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
})

/*
    Parâmetros de mongoose.model:
    1º: o nome do model, para uso interno. Por convenção, usa-se Inicia Maiúscula.
    2º: a relação de campos do schema (variàvel schema)
    3º: o nome da collection no banco de dados (normalmente, é o mesmo nome da model, mas pluralizado e com inicial minúscula)
*/
module.exports = mongoose.model('Glossary', schema, 'glossarys')