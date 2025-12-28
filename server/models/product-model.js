const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    bgColor:{
        type:String,
        require:true
    },
    pannelColor:{
        type:Number,
        require:true
    },
    discount:{
        type:Number,
        default:0,
    },
    textColor:{
        type:String,
        default:"",
        require:true
    },
    image:{
        type:Buffer,
        require:true
    },
});

module.exports = mongoose.model('products',productSchema); 