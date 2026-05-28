const productModel = require("../models/product-model");
const mongoose = require("mongoose");

const createProduct = async (req, resp) => {
  const { name, price, discountPrice, bgColor, textColor, panelColor } =
    req.body;

  const otherImages =
    req.files.filter((f) => f.fieldname == "otherImages[]") || [];

  const frontImage = req.files.find((f) => f.fieldname == "frontImage");

  const createdProduct = await productModel.create({
    frontImage: frontImage.buffer,
    otherImages: otherImages.map((image) => {
      return image.buffer;
    }),
    name,
    price,
    discountPrice,
    bgColor,
    textColor,
    panelColor,
  });
  console.log();
  resp.status(201).send({
    status: true,
    message: "Product Created successfully",
    product: {
      ...createdProduct._doc,
      frontImage: createdProduct.frontImage
        ? `data:image/png;base64,${createdProduct.frontImage.toString("base64")}`
        : null,
    },
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

const fetchProduct = async (req, resp) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const product = await productModel.findOne({ _id: id });
  console.log(product);
};

const deleteProduct = async (req, resp) => {
  try {
    const productId = req.params.id;
    const responce = await productModel.deleteOne({ _id: productId });
    if (responce.acknowledged) {
      resp
        .status(200)
        .send({
          status: "true",
          message: "Product Deleted Successfully..",
          deletedProductID: `${productId}`,
        });
    } else {
      resp
        .status(404)
        .send({ status: "false", message: "Product Not Found.." });
    }
  } catch (err) {
    resp
      .status(500)
      .send({ status: "false", message: "Error while Deleting Product.." });
  }
};
module.exports = {
  createProduct,
  fetchAllProducts,
  fetchProduct,
  deleteProduct,
};
