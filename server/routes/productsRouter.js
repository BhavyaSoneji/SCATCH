const express = require("express");
const router = express.Router();
const {auth} = require('../middlewares/auth');
const { upload } = require("../config/multer-config");
const {createProduct, fetchProduct} = require('../controllers/productController')
const {fetchAllProducts} = require('../controllers/productController');
const authorize = require("../middlewares/authorize");

router.get("/", (req, resp) => {
  resp.json({ message: "Hey there products" });
});

router.post("/create", auth,authorize("owner"),upload.any(),createProduct);

router.get("/allproducts",auth,authorize('user','owner'),fetchAllProducts);

router.get("/:id",auth,authorize('user','owner'),fetchProduct);


module.exports = router;