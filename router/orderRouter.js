const router = require('express').Router()
const cloudinary = require('../config/cloudinary')
const { createNewOrder, getRequiredOrder } = require('../controller/orderController')
const upload = require('../middleware/multer')

router.post('/order', upload.array('images'), createNewOrder)
router.get('/order/:id', getRequiredOrder)

module.exports = router