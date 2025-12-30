const { upload } = require('../config/multer-config');
const productModel = require('../models/product-model');
const createProduct =  async(req,resp)=>{
    const { name, price, discount, bgColor, textColor, panelColor } = req.body;
    const createdProduct = await productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgColor,
        textColor,
        panelColor
    });
    // const flash = resp.flash("Success","Product Created Successfully");
    resp.status(201).send({status:true,message:"Product Created successfully",Data:createdProduct});
}

const fetchAllProducts = async(req,resp)=>{
    const allProducts = await productModel.find();
    resp.send({status:true,message:"All products fetched",products:allProducts});
}
module.exports = createProduct;
module.exports = fetchAllProducts;