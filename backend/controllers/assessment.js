const Assessment = require('../models/Assessment')
const Answer = require('../models/Answer')

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
        message: 'Avaliação não encontrada',
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
    const result = await Assessment.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
    })

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

/*******************************************************************
 * Métodos para o model Answer
 */

controller.createAnswer = async (req, res) => {
  try {
    // Pega o id do assessment por meio do parâmetro :assessment_id colocado na route
    const { assessment_id } = req.params
    const answer = req.body
    const assessment = await Assessment.findById(assessment_id)
    if (!assessment) {
      return res.status(404).send({
        message: 'Avaliação não encontrada',
      })
    }
    // Verifica se answers é um array, se for, ele não faz nada
    // se não for um array, ele transforma .answers em um array
    assessment.answers = Array.isArray(assessment.answers)
      ? assessment.answers
      : []

    // verifica se o a answer já existe no array de answers
    const answerAlreadyExists = assessment.answers.find(
      a => a.question === answer.question
    )
    // se a answer já existe, vamos atualizar ela com o novo valor
    if (answerAlreadyExists) {
      // atualiza a answer se ela já existir com os novos dados passados
      answerAlreadyExists = {
        ...answerAlreadyExists,
        ...answer,
      }
    } else {
      // adiciona a answer no array de answers se ela não existir
      assessment.answers.push(answer)
    }

    const result = await assessment.save()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

// controller.retrieveAllAnswers = async (req, res) => {
//   try {
//     const assessment = await Assessment.findById(
//       req.params.assessment.id
//     )//.populate('answers', { path: 'question' })
//     // HTTP 200: OK (implícito)
//     if (assessment) res.send(assessment.answer)
//     // HTTP 404: Not found
//     else res.status(404).end()
//   } catch (error) {
//     console.error(error)
//     //HTTP 500: Internal Server Erro
//     res.status(500).send(error)
//   }
// }

controller.retrieveAllAnswers = async (req, res) => {
  try {
      const assessment = await Assessment.findById(req.params.assessment_id)
      //.populate({ path: 'answers', populate: { path: 'question' } })
      console.log(assessment)
      // HTTP 200: OK (implícito)
      if (assessment) res.status(200).send(assessment.answers)
      // HTTP 404: Not Found
      else res.status(404).end()
  }
  catch (error) {
      console.error(error)
      // HTTP 500: Internal Server Error
      res.status(500).send(error)
  }
}

controller.updateAnswer = async (req, res) => {
  try {
    const answerData = req.body
    const answerId = req.params.id
    const assessmentId = req.params.assessment_id
    const assessment = await Assessment.findById(assessmentId)
    const answer = assessment.answers.find(answer => answer.id === answerId)

    if (!assessment) {
      // HTTP 404: Not Found
      return res.status(404).send({
        message: 'Avaliação não encontrada',
      })
    }
    if (!answer) {
      // HTTP 404: Not Found
      return res.status(404).send({
        message: 'Resposta não encontrada',
      })
    }
    const result = await Answer.findByIdAndUpdate(answerId, answerData, {
      returnDocument: 'after',
    })
    if (!result) {
      // HTTP 404: Not Found
      return res.status(404).send({
        message: 'Resposta não encontrada',
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

controller.deleteAnswer = async (req, res) => {
  try {
    const assessmentId = req.params.assessment_id
    const answerId = req.params.id
    const assessment = await Assessment.findById(assessmentId)

    if (!assessment) {
      return res.status(404).send({
        message: 'Avaliação não encontrada',
      }) // Não encontrou
    }

    const answer = assessment.answers.find(answer => answer.id === answerId)
    if (!answer) {
      return res.status(404).send({
        message: 'Resposta não encontrada',
      }) // Não encontrou
    }

    await Answer.findByIdAndDelete(answerId)

    // HTTP 204: No content
    return res.status(204).end() // Encontrou e excluiu
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

module.exports = controller
