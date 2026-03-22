const router = require('express').Router()
const cloudinary = require('../config/cloudinary')
const { createNewCompany, getRequiredDetails, getAllDetails } = require('../controller/organizationController')
const upload = require('../middleware/multer')

router.post('/company', upload.single('image'), createNewCompany)
router.get('/getDetails/:id', getRequiredDetails )
router.get('getDetails', getAllDetails)

module.exports = router

