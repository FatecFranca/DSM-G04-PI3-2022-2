const { default: mongoose } = require('mongoose')
const Question = require('../models/Question')

const controller = {} // Objeto vazio

function toObjectId(string) {
  return new mongoose.Types.ObjectId(string)
}

function handleGlossaryRefs(glossaryRefs) {
  if (!Array.isArray(glossaryRefs)) {
    return []
  }
  return glossaryRefs.map(toObjectId)
}

controller.create = async (req, res) => {
  try {
    const questionData = req.body
    questionData.glossary_refs = handleGlossaryRefs(questionData.glossary_refs)

    await Question.create(questionData)
    // HTTP 201: Created
    res.status(201).send(questionData)
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
    const result = await Question.find().populate('criterion')
    // HTTP 200: OK (implícito)
    res.send(result)
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOne = async (req, res) => {
  try {
    const result = await Question.findById(req.params.id)

    // HTTP 200: OK (implícito)
    if (result) res.send(result) // Encontrou o documento
    // HTTP 404: Not Found
    else res.status(404).end() // Não encontrou
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.update = async (req, res) => {
  try {
    const questionData = req.body
    questionData.glossary_refs = handleGlossaryRefs(questionData.glossary_refs)

    const result = await Question.findByIdAndUpdate(req.params.id, questionData)

    // HTTP 204: No content
    if (result) return res.status(204).end() // Encontrou e atualizou
    else res.status(404).end() // Não encontrou
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.delete = async (req, res) => {
  try {
    const result = await Question.findByIdAndDelete(req.params.id)

    // HTTP 204: No content
    if (result) res.status(204).end() // Encontrou e excluiu
    else res.status(404).end() // Não encontrou
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

module.exports = controller
