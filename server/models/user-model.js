const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    contact:{
        type:Number,
        require:true
    },
    cart:{
        type:String,
        default:"",
    },
    profilePic:{
        type:String,
        default:""
    }
});

module.exports = mongoose.model('users',userSchema); 