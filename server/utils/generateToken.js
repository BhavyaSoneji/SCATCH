const jwt = require('jsonwebtoken');

const generateToken = (user,userType)=>{
    const token = jwt.sign({email:user.email,id:user._id,userType:userType.toLowerCase()},process.env.JWT_KEY,{expiresIn:'1d'});
    return token;
};

module.exports.generateToken = generateToken;