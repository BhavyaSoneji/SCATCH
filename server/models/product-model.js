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
    panelColor:{
        type:String,
        require:true
    },
    discount:{
        type:Number,
        default:0,
    },
    textColor:{
        type:String,
        require:true
    },
    image:{
        type:Buffer,
        require:true
    },
});

module.exports = mongoose.model('products',productSchema); 