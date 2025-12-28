const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

if(process.env.NODE_ENV=='development'){
    router.post('/create', async (req, resp) => {
        const owners = await ownerModel.find();
        if(owners.length>0){
            resp.status(500).send('No permissions to create owner.');
        } else {
            const{fullName,email,password} = req.body;
            const createdOwner = await ownerModel.create({
                fullName,
                email,
                password
            });
            resp.status(200).send(createdOwner);
        }
    });
}

router.get('/', (req, resp) => {
    resp.render("create product");
    
});

module.exports = router;

