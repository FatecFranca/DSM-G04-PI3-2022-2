const Question = require('../models/Question')
const Glossary = require('../models/Glossary')
const helpers = require('../helpers')
const { NotFoundError } = require('../helpers/errors')
const controller = {} // Objeto vazio

async function glossaryExists(id) {
  const glossaryExists = await Glossary.findOne({ _id: helpers.toObjectId(id) })
  console.log('glossaryExists', glossaryExists);
  return !!glossaryExists
}
async function handleGlossaryRefs(glossaryRefs) {
  if (!Array.isArray(glossaryRefs)) {
    return []
  }
  return await Promise.all( glossaryRefs.map(
    async (glossaryRefId) => {
      if(!(await glossaryExists(glossaryRefId))) {
        throw new NotFoundError('glossary_ref', `id ${glossaryRefId} is invalid, there's no glossary with this id in database`)
      }
      return helpers.toObjectId(glossaryRefId)
    }
  ))
}

controller.create = async (req, res) => {
  try {
    const questionData = req.body
    questionData.glossary_refs = await handleGlossaryRefs(questionData.glossary_refs)

    await Question.create(questionData)
    // HTTP 201: Created
    res.status(201).send(questionData)
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    const statusCode = error.statusCode || 500
    res.status(statusCode).send(error)
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
    const statusCode = error.statusCode || 500
    res.status(statusCode).send(error)
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
    const statusCode = error.statusCode || 500
    res.status(statusCode).send(error)
  }
}

controller.update = async (req, res) => {
  try {
    const questionData = req.body
    questionData.glossary_refs = await handleGlossaryRefs(questionData.glossary_refs)

    const result = await Question.findByIdAndUpdate(req.params.id, questionData, { returnDocument: 'after', })

    // HTTP 204: No content
    if (result) return res.status(200).send(result) // Encontrou e atualizou
    else res.status(404).end() // Não encontrou
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    const statusCode = error.statusCode || 500
    res.status(statusCode).send(error)
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
    const statusCode = error.statusCode || 500
    res.status(statusCode).send(error)
  }
}

module.exports = controller
