const fs = require('fs')
const cloudinary = require('../config/cloudinary');
const companyStaff = require('../models/staff')

exports.createNewStaff = async(req,res)=>{
    try {
        const { organizationId, name, position, age, salary} = req.body;

        const result = await cloudinary.uploader.upload(req.file.path)

        fs.promises.unlinkSync(req.file.path)

        const newStaff = { 
           organizationId, 
           name, 
           position, 
           age, 
           salary,
           profilePhoto: result.secure_url,
           photoPublicId: result.public_id
        }

        const createStaff = await companyStaff.create(newStaff)

        res.status(201).json({
            message: 'staff created successfully',
            createStaff
        })

        
    } catch (error) {
        fs.promises.unlinkSync(req.file.path)
        
        res.status(500).json({
            message: error.message
        })
    }
};