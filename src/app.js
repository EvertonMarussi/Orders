const express = require('express')
const routes = require('./routes/order.routes')

const DesafioExercicioPedidos = express()

DesafioExercicioPedidos.use(express.json())
DesafioExercicioPedidos.use(routes)

module.exports = DesafioExercicioPedidos