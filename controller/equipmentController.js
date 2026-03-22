const fs = require('fs')
const cloudinary = require('../config/cloudinary');
const equipments = require('../models/equipments');

exports.createNewEquipment = async(req,res)=>{
    try {
        const {organizationId, staffId, name, price,  expiringDate, status} = req.body;

        const imagesPaths = req.files.map((img)=>img.path);

        const images = []
        const imagePublicIds = [];

        for (const path of imagesPaths){
            const result = await cloudinary.uploader.upload(path);
            images.push(result.secure_url)
            imagePublicIds.push(result.public_id);

            fs.unlinkSync(path)
            
        }

        const equipment = {
            organizationId, 
            staffId, 
            name, 
            price,  
            expiringDate, 
            status,
            images,
            imagePublicIds
        }

        const createEquipment = await equipments.create(equipment)

        res.status(201).json({
            message: 'equipment created successfully',
            createEquipment
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