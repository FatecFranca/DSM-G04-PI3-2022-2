const Assessment = require('../models/Assessment')

const controller = {} // Objeto vazio

controller.create = async (req, res) => {
  try {
    const result = await Assessment.create(req.body)
    // HTTP 201: Created
    res.status(201).send(result)
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAll = async (req, res) => {
  try {
    // find() sem parâmetros retorna todos os documentos
    // da coleção
    const result = await Assessment.find().populate('user')
    // HTTP 200: OK (implícito)
    return res.send(result)
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    return res.status(500).send(error)
  }
}

controller.retrieveOne = async (req, res) => {
  try {
    const result = await Assessment.findById(req.params.id)

    if (!result) {
        // HTTP 404: Not Found 
        return res.status(404).send({
            message: 'Avaliação não encontrada'
        }) // Não encontrou
    }
    
    // Encontrou o documento
    // HTTP 200: OK (implícito)
    return res.send(result)
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    return res.status(500).send(error)
  }
}

controller.update = async (req, res) => {
  try {
    const result = await Assessment.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after'})

    if (!result) {
      // HTTP 404: Not Found
      return res.status(404).send({
        message: 'Avaliação não encontrada',
      })
    }

    // Encontrou e atualizou
    return res.status(200).send(result)
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    return res.status(500).send(error)
  }
}

controller.delete = async (req, res) => {
  try {
    const result = await Assessment.findByIdAndDelete(req.params.id)

    if (!result) {
      return res.status(404).send({
        message: 'Avaliação não encontrada',
      }) // Não encontrou
    }

    // HTTP 204: No content
    return res.status(204).end() // Encontrou e excluiu
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

module.exports = controller
