const mongoose = require('mongoose')

const schema = mongoose.Schema({
    // Campo de chave estrangeira para o model Criterion
    criterion: {
        type: mongoose.ObjectId, // Tipo especial
        ref: 'Criterion',    // Coleção referenciada
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    enunciation: {
        type: String,
        required: true
    },
    glossary_refs:[
        {
            glossary_ref:{
                type: mongoose.Schema.ObjectId,
                ref:"Glossary"
            }
        }
    ],
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
module.exports = mongoose.model('Question', schema, 'questions')