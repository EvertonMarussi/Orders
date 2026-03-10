const repository = require('../repositories/order.repository')
const mapper = require('../mappers/order.mapper')
const AppError = require('../errors/AppError')
const { HTTP_BAD_REQUEST_RESPONSE }  = require('../config/.arquivosGlobais')



exports.createOrder = async (data) => {

    if(!data.numeroPedido){
        throw new AppError('Número do pedido obrigatório', HTTP_BAD_REQUEST_RESPONSE)
    }

    if(!data.dataCriacao){
        throw new AppError('A data de criação é obrigatória', HTTP_BAD_REQUEST_RESPONSE)
    }

    if(!data.valorTotal || data.valorTotal<0){
        throw new AppError('Valor total inválido', HTTP_BAD_REQUEST_RESPONSE)
    }

    if(data.items.length == 0){
        throw new AppError('Precisa haver ao menos um item para prosseguir', HTTP_BAD_REQUEST_RESPONSE)
    }

    for(item of data.items){

        console.log(item)

        if(!item.idItem || !item.quantidadeItem || item.quantidadeItem < 0 || !item.valorItem || item.valorItem < 0){
            throw new AppError('Entrada de itens inválida', HTTP_BAD_REQUEST_RESPONSE)
        }
    }

  const mapped = mapper.toDatabase(data)
  return repository.create(mapped)
}

exports.getOrder = (number) =>
  repository.findByNumber(number)

exports.listOrders = () =>
  repository.findAll()

exports.updateOrder = async (number, data) => {
  const mapped = mapper.toDatabase(data)
  return repository.update(number, mapped)
}

exports.deleteOrder = (number) =>
  repository.delete(number)