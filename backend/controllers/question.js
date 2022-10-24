const Question = require('../models/Question')

const controller = {} // Objeto vazio

/*
    Métodos de CRUD do controller
    create: cria um novo registro
    retrieve: recupera todos os registros
    rerieveOne: recupera um único registro
    update: atualiza os dados de um registro
    delete: exclui um registro
*/

controller.create = async (req, res) => {
    try {
        const result = await Question.create(req.body)
        // HTTP 201: Created
        res.status(200).send(result)

    } catch (error) {
        console.log(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveAll = async (req, res) => {
    try {
        let result
        // Se existir "criterion" no queryString
        if (req.query.criterion) {
            // Retorna só as questões de um critério, ordenadas pelo campo order, ascendente
            result = await Question.find({ criterion: req.query.criterion }).populate('criterion').populate('glossary_refs').sort({ order: 1 })
        } else {
            // Retorna todas as questões, na ordem natural do banco de dados
            result = await Question.find().populate('criterion').populate('glossary_refs')
        }

        // HTTP 200: OK (implicito)
        res.send(result)

    } catch (error) {
        console.log(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const result = await Question.findById(req.params.id).populate('criterion').populate('glossary_refs')

        // HTTP 200: OK (implicito)
        if (result) {
            res.send(result)
        } else {
            // HTTP 404: Not Found
            res.status(404).end()
        }

    } catch (error) {
        console.log(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try {
        const result = await Question.findByIdAndUpdate(req.params.id, req.body)

        // HTTP 200: OK (implicito)
        if (result) {
            res.status(200).send(result)
        } else {
            // HTTP 404: Not Found
            res.status(404).end()
        }

    } catch (error) {
        console.log(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try {
        const result = await Question.findByIdAndDelete(req.params.id)

        // HTTP 200: OK (implicito)
        if (result) {
            res.status(200).send(result)
        } else {
            // HTTP 404: Not Found
            res.status(404).end()
        }

    } catch (error) {
        console.log(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller