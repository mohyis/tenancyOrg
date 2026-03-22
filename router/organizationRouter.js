const router = require('express').Router()
const cloudinary = require('../config/cloudinary')
const { createNewCompany, getRequiredDetails } = require('../controller/organizationController')
const upload = require('../middleware/multer')

router.post('/company', upload.single('image'), createNewCompany)
router.get('/getDetails/:id', getRequiredDetails )

module.exports = router

