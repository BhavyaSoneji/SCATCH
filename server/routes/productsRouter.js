const express = require("express");
const router = express.Router();
const {auth} = require('../middlewares/auth');
const { upload } = require("../config/multer-config");
const {createProduct} = require('../controllers/productController')
const {fetchAllProducts} = require('../controllers/productController');
const authorize = require("../middlewares/authorize");

router.get("/", (req, resp) => {
  resp.json({ message: "Hey there products" });
});

router.post("/create", auth,authorize("owner"), upload.single('image'),createProduct);

router.get("/shop",auth,authorize('user','owner'),fetchAllProducts);


module.exports = router;