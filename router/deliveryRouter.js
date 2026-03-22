const router = require('express').Router()
const { createNewDelivery } = require('../controller/deliveryController')

router.post('/delivery', createNewDelivery)

module.exports = router