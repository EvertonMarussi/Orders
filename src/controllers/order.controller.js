const service                         = require('../services/order.service')
const { HTTP_OK_RESPONSE }            = require('../config/.arquivosGlobais')
const { HTTP_SERVER_ERROR_RESPONSE }  = require('../config/.arquivosGlobais')

exports.create = async (req, res) => {
    try{

        const resultado = await service.createOrder(req.body)
        res.status(HTTP_OK_RESPONSE).json(resultado)

    }catch(err){

        res.status(err.statusCode || HTTP_SERVER_ERROR_RESPONSE).json({
            error: err.message || 'Erro interno do servidor'
        })
    }
}

exports.get = async (req, res) => {

    try{
        const pedidos = await service.getOrder(req.params.number)
        res.json(pedidos)
    }catch(e){

        const resposta = {
            MSG: "Erro ao tentar consultar um pedido"
        }

        res.status(HTTP_SERVER_ERROR_RESPONSE).json(resposta)
    }
}

exports.list = async (req, res) => {
    try{

        res.json(await service.listOrders())

    }catch(e){

        const resposta = {
            MSG: "Erro ao tentar listar pedidos um pedido"
        }

        res.status(HTTP_SERVER_ERROR_RESPONSE).json(resposta)
    }
}

exports.update = async (req, res) => {
    try{

        await service.updateOrder(req.params.number, req.body)
        res.sendStatus(HTTP_OK_RESPONSE)

    }catch(e){

        console.log(e)

        const resposta = {
            MSG: "Erro ao tentar atualizar pedido"
        }

        res.status(HTTP_SERVER_ERROR_RESPONSE).json(resposta)
    }
}

exports.delete = async (req, res) => {
    try{

        await service.deleteOrder(req.params.number)
        res.sendStatus(HTTP_OK_RESPONSE)

    }catch(e){

        const resposta = {
            MSG: "Erro ao tentar deletar pedido"
        }

        res.status(HTTP_SERVER_ERROR_RESPONSE).json(resposta)
    }
}