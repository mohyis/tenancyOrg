const router = require('express').Router()
const cloudinary = require('../config/cloudinary')
const { createNewStaff } = require('../controller/staffController')
const upload = require('../middleware/multer')

router.post('/staff', upload.single('image'), createNewStaff)

module.exports = router