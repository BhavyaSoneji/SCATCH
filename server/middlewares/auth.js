const jwt = require('jsonwebtoken')
const auth = (req,resp,next)=>{
    try{
        if(!req.cookies.token){
            return resp.status(401).json({ status: false, message: "Not authenticated.."});
        }
        jwt.verify(req.cookies.token,process.env.JWT_KEY,(err,buff)=>{
            if(err){
                return resp.status(500).send({status:false,message:"Invalid token"});
            }
            if(!buff){
                return resp.status(500).send({status:false,message:"Error Logging In.."});
            }
            else{
                req.user = buff.email;
                req.id = buff.id;
                req.userType = buff.userType;
                next();
            }
        })
    }
    catch(err){
        resp.status(500).send({status:false,message:"Error Logging In.."});
    }
}   

module.exports.auth = auth;