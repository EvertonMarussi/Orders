const router = require('express').Router()
const controller = require('../controllers/order.controller')

router.post('/order', controller.create)
router.get('/order/list', controller.list)
router.get('/order/:number', controller.get)
router.put('/order/:number', controller.update)
router.delete('/order/:number', controller.delete)

module.exports = router