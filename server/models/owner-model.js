const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullName:{
        type:String,
        require:true,
        default:""
    },
    email:{
        type:String,
        require:true,
        default:""
    },
    password:{
        type:String,
        require:true,
        default:""
    },
    products:{
        type:String,
    },
    profilePic:{
        type:String,
    },
    gstin:{
        type:String,
    }
});

module.exports = mongoose.model('owner',ownerSchema); 