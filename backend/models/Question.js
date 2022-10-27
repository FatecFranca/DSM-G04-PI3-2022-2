const mongoose = require('mongoose')

const schema = mongoose.Schema({
    criterion: {
        type: mongoose.ObjectId,
        ref: 'Criterion',
        index: true
    },
    order: {
        type: Number,
        required: true,
        index: true
    },
    enunciation: {
        type: String,
        required: true
    },
    glossary_refs: [{
        type: mongoose.ObjectId,
        ref: 'Glossary'
    }]
})

/*
    Parâmetros de mongoose.model:
    1º - Nome da model, para uso interno (convenção: primeira letra maiúscula e singular)
    2º - Relação de campos do esquema (schema)
    3º - Nome da collection no banco de dados (convenção: mesmo nome da model com letra inicial minúsculas e plural)
*/
module.exports = mongoose.model('Question', schema, 'questions')