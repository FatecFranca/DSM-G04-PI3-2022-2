const mongoose = require('mongoose')

const schema = mongoose.Schema({
    // Campo de chave estrangeira para o model User
    assessment: {
        type: mongoose.ObjectId, // Tipo especial
        ref: 'Assessment',    // Coleção referenciada
        required: true
    },
    question: {
        type: mongoose.ObjectId, // Tipo especial
        ref: 'Question',    // Coleção referenciada
        required: true
    },
    answer: {
        type: String,
        required: true,
        enum: ['Y', 'N', 'X', 'P']
    },
    comment:{
        type: String,
    },
    answered_at: {
        type: Date,
        required: true,
        defadult: Date.now() // Data/hora atual
    },
})

/*
    Parâmetros de mongoose.model:
    1º: o nome do model, para uso interno. Por convenção,
        usa-se Inicial Maiúscula.
    2º: a relação de campos do esquema (variável schema)
    3º: o nome da collection no banco de dados (normalmente,
        é o mesmo nome do model, mas pluralizado e com
        inicial minúscula)
*/
module.exports = mongoose.model('Answer', schema, 'answers')