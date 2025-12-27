const userModel = require('../models/user-model');
const bcrypt = require('bcrypt')
const {generateToken} = require('../utils/generateToken')

const registerUser = async(req,resp)=>{
    try{
            const {email,fullName,password,contact} = req.body;

            const registeredUser = await userModel.find({email});
            if(registeredUser.length>0)
            {
                resp.status(500).json({message:'user already exist..'});
            }
            else
            {
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(password,salt,async(err,hash)=>{
                        if(err) resp.send(err.message);
                        const createdUser = await userModel.create({
                            fullName,
                            email,
                            password: hash,
                            contact,
                        });
                        const token = generateToken(createdUser);
                        resp.cookie("token",token);
                        resp.status(200).json({message:'user created successfully..',createdUser});
                    })
                })
            }
        }
        catch(err)
        {
            resp.send(err.message);
        }
}
module.exports.registerUser = registerUser;