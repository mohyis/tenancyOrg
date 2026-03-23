const fs = require('fs')
const cloudinary = require('../config/cloudinary');
const orders = require('../models/orders');
const delivery = require('../models/delivery');

exports.createNewOrder = async(req,res)=>{
    try {
        const {organizationId, staffId, type, amount, staff} = req.body;

        const imagesPaths = req.files.map((img)=>img.path);

        const images = []
        const imagePublicIds = [];

        for (const path of imagesPaths){
            const result = await cloudinary.uploader.upload(path);
            images.push(result.secure_url)
            imagePublicIds.push(result.public_id);

            fs.promises.unlinkSync(path)
            
        }

        const order = {
            organizationId,
            staffId, 
            type,
            amount, 
            staff,
            images,
            imagePublicIds
        }

        const createOrder = await orders.create(order)

        res.status(201).json({
            message: 'order created successfully',
            createOrder
        })
        
    } catch (error) {
       req.files.forEach((element)=> {
        fs.unlinkSync(element.path)
       })
            res.status(500).json({ 
                message: error.message
        })
    }
};

exports.getRequiredOrder = async(req,res)=>{
    try {

        const {id}= req.params
         const requiredOrder = await orders.findByPk(id, {
            include:
                {model: delivery, as: 'deliver', attributes: ['processedBy', 'status']}
        })
        if(!requiredOrder){
            return res.status(404).json({
                message: 'order not found'
            })
        }
        res.status(200).json({
            message: 'order found',
            requiredOrder
        })

    } catch (error) {
         res.status(500).json({
            message: error.message
        })
    }
};