const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

const login = async (req, resp) => {
  const { email, password } = req.body;
  const owner = await ownerModel.findOne({email});
  try{
    if(owner){
        bcrypt.compare(password,owner.password,(err,result)=>{
        if(err){
            resp.status(500).send({ status: false, message: err.message });
        }
        else{
            if(!result){
                resp.status(500).send({ status: false, message:"Email or Password is Incorrect.."});
            }else{
                const token = generateToken(owner,"owner");
                resp.cookie("token",token,{
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                })
                resp.status(200).send({ status: true, message:"Owner Login Successfull.."});
            }
        }
    })
  }
  else{
    resp.status(500).send({status:false,message:"Error Logging In.."});
  }
  }catch(error){
    resp.send({error,message:"Error logging in "});
  }
  
};

const create = async (req, resp) => {
  const owners = await ownerModel.find();
  if (owners.length<=0) {
    const { fullName, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        resp.status(500).send({ status: false, message: err.message });
      } else {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            resp.status(500).send({ status: false, message: err.message });
          } else {
            const createdOwner = await ownerModel.create({
              fullName,
              email,
              password:hash,
            });
            const token = generateToken(createdOwner,"owner");
            resp.cookie("token", token);
            resp.status(201).send({ sataus: true, createdOwner: createdOwner });
          }
        });
      }
    });
  } else{
    resp.status(500).send("No permissions to create owner.");
  }
};

module.exports.create = create;
module.exports.login = login;