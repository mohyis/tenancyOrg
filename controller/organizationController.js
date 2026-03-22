const organization = require('../models/organization')
const fs = require('fs')
const cloudinary = require('../config/cloudinary');
const staff = require('../models/staff')
const equipments = require('../models/equipments');
const orders = require('../models/orders')
const delivery = require('../models/delivery');

exports.createNewCompany = async(req,res)=>{
    try {
        const {name, address, email, phoneNumber} = req.body;

        const result = await cloudinary.uploader.upload(req.file.path)

        // fs.unlinkSync(req.file.path)

        const company = {
            name, 
            address,
            email, 
            phoneNumber,
            logo: result.secure_url,
            logoPublicId: result.public_id
        }

        const createCompany = await organization.create(company)

        res.status(201).json({
            message: 'company created successfully',
            createCompany
        })

        
    } catch (error) {
        fs.unlinkSync(req.file.path)
        
        res.status(500).json({
            message: error.message
        })
    }
};


