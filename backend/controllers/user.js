const User = require('../models/User')

const controller ={} //objeto vazio

/*
    Métodos de CRUD do controller

    create: cria um novo usuário
    retrieve: retorna todos os usuários cadastrados
    retrieveOne: retorna um único usuário
    update: atualiza os dados de um usuário
    dele: exclui um usuário
*/

controller.create = async(req, res)=>{
    try{
        const result = await User.create(req.body)
        delete result.password_hash
        //HTTP 201: Created 
        res.status(201).send(result)
    }
    catch(error){
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveAll = async(req, res)=>{
    try{
        //find() sem parâmetros retorna todos os documentos da coleção
        const result = await User.find()
        //HTTP 200: OK (implícito)
        res.send(result)
    }
    catch(error){
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res)=>{
    try{
        const result = await User.findById(req.params.id)

        //HTTP 200: OK (implícito)
        if(result)res.send(result)  // Encontrou o documento
        //HTTP 404: Not Found
        else res.status(404).end()  // Não encontrou
    }
    catch(error){
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async(req, res)=>{
    try{
        const result = await User.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after'})

        //HTTP 204: No content
        if(result) return res.status(204).end() // Encontrou e atualizou 
        else res.status(404).end()              // Não encontrou
    }
    catch(error){
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async(req, res)=>{
    try{
        const result = await User.findByIdAndDelete(req.params.id)

        //HTTP 204: No content
        if(result) return res.status(204).end() // Encontrou e atualizou 
        else res.status(404).end()              // Não encontrou
    }
    catch(error){
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller