const fs = require('fs')
const orderDelivery = require('../models/delivery');


exports.createNewDelivery = async(req,res)=>{
    try {
        const {organizationId, staffId, orderId, processedBy, status, clothes} = req.body;

        const delivery = {
            organizationId,
            staffId,
            orderId,
            processedBy, 
            status,
            clothes
        }

        const createDelivery = await orderDelivery.create(delivery)

        res.status(201).json({
            message: 'delivery created successfully',
            createDelivery
        })
        
    } catch (error) {
            res.status(500).json({ 
                message: error.message
        })
    }
};
