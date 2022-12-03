const Assessment = require('../models/Assessment')
const Answer = require('../models/Answer')

const controller = {} // Objeto vazio
controller.create = async (req, res) => {
  try {
    const assessmentData = req.body
    assessmentData.user = req.user._id
    const assessment = await Assessment.create(assessmentData)
    // HTTP 201: Created
    res.status(201).send(assessment)
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAll = async (req, res) => {
  try {
    if (req.user.is_admin) {
      const where = {
        ...(req.query.user ? { user: req.query.user } : {}),
      }
      // find() sem parâmetros retorna todos os documentos
      // da coleção
      const result = await Assessment.find(where).populate('user')
      // HTTP 200: OK (implícito)
      return res.send(result)
    }

    // find() sem parâmetros retorna todos os documentos
    // da coleção
    const result = await Assessment.find({
      user: req.user._id,
    }).populate('user')
    // HTTP 200: OK (implícito)
    return res.send(result)
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOne = async (req, res) => {
  try {
    // somente usuários administradores podem acessar qualquer avaliação mesmo que não seja sua
    // aqui, o where é montado dinamicamente, se for administrador, não há restrição, se não for, o where é o id do usuário logado
    const where = {
      _id: req.params.id,
      ...(req.user.is_admin ? {} : { user: req.user._id }),
    }
    const result = await Assessment.findOne(where)

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
    const assessmentData = req.body
    const assessment = await Assessment.findById(req.params.id)
    if (!assessment) {
      return res.status(404).send({
        message: 'Avaliação não encontrada',
      })
    }

    if (assessment.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        message: 'Você não pode atualizar uma avaliação que não é sua',
      })
    }

    const assessmentUpdated = await assessment
      .update(assessmentData, { returnDocument: 'after' })
      .getUpdate()

    return res.status(200).send(assessmentUpdated) // Encontrou e atualizou
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.delete = async (req, res) => {
  try {
    const assessmentToDelete = await Assessment.findById(req.params.id)
    if (assessmentToDelete.user.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        message: 'Você não pode deletar uma avaliação que não é sua',
      })
    }

    const result = await assessmentToDelete.delete()
    // HTTP 204: No content
    if (result)
      res.status(200).send({
        message: 'Avaliação deletada com sucesso',
      })
    // Encontrou e excluiu
    else
      res.status(404).send({
        message: 'Avaliação não encontrada',
      }) // Não encontrou
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
    // 1) Encontra a avaliação (assessment) por meio do parâmetro
    // :assessment_id
    const assessment = await Assessment.findById(req.params.assessment_id)

    if (assessment) {
      if (assessment.user.toString() !== req.user._id.toString()) {
        return res.status(403).send({
          message: 'Você não pode responder uma avaliação que não é sua',
        })
      }
      // 2) Verifica se o campo "answers" já existe na avaliação
      if (assessment.answers) {
        const teste = assessment.answers[0]
        // 2.1) Verifica se há uma resposta para a pergunta
        // especificada já existe no vetor
        const idx = assessment.answers.findIndex(
          a => a.question.toString() === req.body.question
        )
        if (idx >= 0) {
          // Já existe uma resposta para a pergunta no vetor "answers"
          assessment.answers[idx] = req.body
        } else {
          // Insere a resposta (req.body) no vetor "answers"
          assessment.answers.push(req.body)
        }
      } else {
        // Cria o vetor "answers" com o primeiro elemento
        assessment.answers = [req.body]
      }

      // Atualiza assessment
      const result = await Assessment.findByIdAndUpdate(
        req.params.assessment_id,
        assessment
      )

      // HTTP 204: No content
      if (result) return res.status(204).end() // Encontrou e atualizou
      else res.status(404).end() // Não encontrou
    }
    // HTTP 404: Not Found
    else res.status(404).end()
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAllAnswers = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.assessment_id)
      .populate({ path: 'answers', populate: { path: 'question' } })

    if (!assessment) {
      // HTTP 404: Not Found
      return res.status(404).end()
    }

    if (assessment.user.toString() !== req.user._id.toString()) {
        return res.status(403).send({
            message: 'Você não pode acessar repostas de uma avaliação que não é sua',
        })
    }
    // HTTP 200: OK (implícito)
    return res.send(assessment.answers)
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOneAnswer = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.assessment_id)
    if (assessment) {
        if (assessment.user.toString() !== req.user._id.toString()) {
            return res.status(403).send({
                message: 'Você não pode acessar respostas de uma avaliação que não é sua',
            })
        }
      const result = assessment.answers.id(req.params.id)
      if (result) {
        res.send(result)
      } else {
        res.status(404).end()
      }
    } else {
      // HTTP 404: Not Found
      res.status(404).end()
    }
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.updateAnswer = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.assessment_id)
    if (assessment && assessment.answers.id(req.params.id)) {
        if (assessment.user.toString() !== req.user._id.toString()) {
            return res.status(403).send({
                message: 'Você não pode atualizar respostas de uma avaliação que não é sua',
            })
        }
      // Atualiza os campos da resposta
      assessment.answers.id(req.params.id).question = req.body.question
      assessment.answers.id(req.params.id).answer = req.body.answer
      assessment.answers.id(req.params.id).comment = req.body.comment
      assessment.answers.id(req.params.id).answered_at = req.body.answered_at

      // Marca o campo "answers" como modificado
      assessment.markModified('answers')

      await assessment.save()

      // HTTP 204: No Content
      res.status(204).end()
    }
    // HTTP 404: Not Found
    else res.status(404).end()
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.deleteAnswer = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.assessment_id)
    if (assessment && assessment.answers.id(req.params.id)) {
        if (assessment.user.toString() !== req.user._id.toString()) {
            return res.status(403).send({
                message: 'Você não pode remover respostas de uma avaliação que não é sua',
            })
        }
      // Exclui o subdocumento relativo à resposta
      assessment.answers.id(req.params.id).remove()

      // Marca o campo "answers" como modificado
      assessment.markModified('answers')

      await assessment.save()

      // HTTP 204: No Content
      res.status(204).end()
    }
    // HTTP 404: Not Found
    else res.status(404).end()
  } catch (error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

module.exports = controller
