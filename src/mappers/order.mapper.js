exports.toDatabase = (order) => ({
  value: order.valorTotal,
  creationDate: new Date(order.dataCriacao),

  items: (order.items || []).map(i => ({
    productId: i.idItem,
    quantity: i.quantidadeItem,
    price: i.valorItem
  }))
})