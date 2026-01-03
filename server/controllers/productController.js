const productModel = require("../models/product-model");
const createProduct = async (req, resp) => {
  const { name, price, discount, bgColor, textColor, panelColor } = req.body;
  console.log(req.file);
  
  const createdProduct = await productModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgColor,
    textColor,
    panelColor,
  });
  // const flash = resp.flash("Success","Product Created Successfully");
  resp
    .status(201)
    .send({
      status: true,
      message: "Product Created successfully",
      Data: createdProduct,
    });
};

const fetchAllProducts = async (req, resp) => {
  const allProducts = await productModel.find();
  const productWithImages = allProducts.map((product)=>{
    return {
      ...product._doc,
      image: product.image?`data:image/png;base64,${product.image.toString("base64")}`:null
    };
  })
    resp.send({
    status: true,
    message: "All products fetched",
    products: productWithImages,
  });
};




module.exports = { createProduct, fetchAllProducts };
