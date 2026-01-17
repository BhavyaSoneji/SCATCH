const productModel = require("../models/product-model");
const createProduct = async (req, resp) => {
  const { name, price, discount, bgColor, textColor, panelColor } = req.body;

  const otherImages = req.files.filter((f)=> f.fieldname == 'otherImages[]')

  const frontImage = req.files.find((f)=> f.fieldname == 'frontImage');

  console.log(otherImages);
  

  const createdProduct = await productModel.create({
    frontImage: frontImage.buffer,
    otherImages: otherImages.map((image)=>{
      return image.buffer;
    }),
    name,
    price,
    discount,
    bgColor,
    textColor,
    panelColor,
  });
  resp.status(201).send({
    status: true,
    message: "Product Created successfully",
    Data: createdProduct,
  });
};

const fetchAllProducts = async (req, resp) => {
  const allProducts = await productModel.find();
  const productWithImages = allProducts.map((product) => {
    return {
      ...product._doc,
      frontImage: product.frontImage
        ? `data:image/png;base64,${product.frontImage.toString("base64")}`
        : null,
    };
    
  });
  resp.send({
    status: true,
    message: "All products fetched",
    products: productWithImages,
  });
};

module.exports = { createProduct, fetchAllProducts };
