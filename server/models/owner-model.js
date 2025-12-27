const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
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
    products:{
        type:String,
        default:[],
        require:true
    },
    profilePic:{
        type:String,
        require:true
    },
    gstin:{
        type:String,
    }
});

module.exports = mongoose.model('owner',ownerSchema); 