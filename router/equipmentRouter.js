const router = require('express').Router()
const cloudinary = require('../config/cloudinary')
const { createNewEquipment } = require('../controller/equipmentController')
const upload = require('../middleware/multer')

router.post('/equipment', upload.array('images'), createNewEquipment)

module.exports = router