const express = require("express");
const router = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn');
const { upload } = require("../config/multer-config");
const createProduct = require('../controllers/productController')
const fetchAllProducts = require('../controllers/productController')

router.get("/", (req, resp) => {
  resp.json({ message: "Hey there products" });
});

router.post("/create", isLoggedIn, upload.single('image'),createProduct);

router.get("/shop",isLoggedIn,fetchAllProducts);

module.exports = router;