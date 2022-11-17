const { forbidden, badRequest } = require('../helpers/httpResponses')
const User = require('../models/User')

const controller = {} //objeto vazio

/*
    Métodos de CRUD do controller

    create: cria um novo usuário
    retrieve: retorna todos os usuários cadastrados
    retrieveOne: retorna um único usuário
    update: atualiza os dados de um usuário
    dele: exclui um usuário
*/

controller.create = async (req, res) => {
  try {
    const isLogged = req.headers.authorization

    if (isLogged) {
      return forbidden(res, 'Você já está logado')
    }

    const user = req.body
    if (!user.email) {
      return badRequest(res, 'E-mail não informado')
    }
    if (!user.password) {
      return badRequest(res, 'Senha não informada')
    }

    if (user.password !== user.password_confirmation) {
      return badRequest(res, 'As senhas não conferem')
    }

    const emailInUse = await User.findOne({ email: user.email })
    if (emailInUse) {
      return badRequest(res, 'E-mail já cadastrado')
    }

    const result = await User.create({
      email: user.email,
      is_admin: user.is_admin || false,
      name: user.name,
      password_hash: user.password,
    })
    
    delete result.password_hash
    //HTTP 201: Created
    res.status(201).send(result)
  } catch (error) {
    console.error(error)
    //HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAll = async (req, res) => {
  try {
    const params = { ...req.query, ...req.params }
    const where = {
      ...(params.email ? { email: params.email } : {}),
      ...(params.name ? { name: params.name } : {}),
      ...(params.id ? { _id: params.id } : {}),
    }
    //find() sem parâmetros retorna todos os documentos da coleção
    const result = await User.find(where)
    //HTTP 200: OK (implícito)
    res.send(result)
  } catch (error) {
    console.error(error)
    //HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOne = async (req, res) => {
  try {
    const result = await User.findById(req.params.id)

    //HTTP 200: OK (implícito)
    if (result) res.send(result) // Encontrou o documento
    //HTTP 404: Not Found
    else res.status(404).end() // Não encontrou
  } catch (error) {
    console.error(error)
    //HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.update = async (req, res) => {
  try {
    const { id } = req.params
    const { user } = req
    if (!id) {
      return badRequest(res, 'ID não informado')
    }
    if (user._id !== id) {
      return forbidden(
        res,
        'Você não tem permissão para atualizar este usuário'
      )
    }
    const result = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
    })

    //HTTP 204: No content
    if (result) return res.status(204).end() // Encontrou e atualizou
    else res.status(404).end() // Não encontrou
  } catch (error) {
    console.error(error)
    //HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.delete = async (req, res) => {
  try {
    const { id } = req.params
    const { user } = req
    if (!id) {
      return badRequest(res, 'ID não informado')
    }
    if (user._id !== id) {
      return forbidden(res, 'Você não tem permissão para excluir este usuário')
    }
    const result = await User.findByIdAndDelete(id)

    //HTTP 204: No content
    if (result) return res.status(204).end() // Encontrou e atualizou
    else res.status(404).end() // Não encontrou
  } catch (error) {
    console.error(error)
    //HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

module.exports = controller
