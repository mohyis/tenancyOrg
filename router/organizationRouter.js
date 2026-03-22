const router = require('express').Router()
const cloudinary = require('../config/cloudinary')
const { createNewCompany } = require('../controller/organizationController')
const upload = require('../middleware/multer')

router.post('/company', upload.single('image'), createNewCompany)

module.exports = router