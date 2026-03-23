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

        await fs.promises.unlinkSync(req.file.path)

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
       await fs.promises.unlinkSync(req.file.path)
        
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getRequiredDetails = async(req,res)=>{
    try {
        const getDetails = await organization.findByPk(id, 
            {include: 
                [
                    {model: staff, as: 'staffs', attributes: ['name','profilePhoto']},
                    {model: equipments, as: 'equip', attributes: ['name', 'images']},
                    {model: orders, as: 'order', attributes: ['type', 'images', 'amount', 'status', 'staff']},
                    {model: delivery, as: 'deliver', attributes: ['processedBy']}
                ], attributes: ['name']
            })

            if (!getDetails){
                return res.status(404).json({
                    message: 'details not found'
                })
            }

            res.status(200).json({
                message: 'detailed retrieved successfully',
                getDetails
            })
        

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

exports.getAllDetails = async(req,res)=>{
    try {
         const {id} = req.params
        const getAllDetail = await organization.findAll( 
            {include: 
                [
                    {model: staff, as: 'staffs', attributes: ['name','profilePhoto']},
                    {model: equipments, as: 'equip', attributes: ['name', 'images']},
                    {model: orders, as: 'order', attributes: ['type', 'images', 'amount', 'status', 'staff']},
                    {model: delivery, as: 'deliver', attributes: ['processedBy']}
                ], attributes: ['name']
            })

            if (!getAllDetail){
                return res.status(404).json({
                    message: 'details not found'
                })
            }

            res.status(200).json({
                message: 'All details retrieved successfully',
                getAllDetail
            })
        

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};
