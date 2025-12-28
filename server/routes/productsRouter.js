const express = require("express");
const router = express.Router();
const {isLoggedIn} = require('../middlewares/isLoggedIn');
const { upload } = require("../config/multer-config");

router.get("/", (req, resp) => {
  resp.json({ message: "Hey there products" });
});


router.post("/create",upload.single('image'),isLoggedIn, (req,resp) => {
  const { name, price, discount, bgColor, textColor, pannelColor, image } = req.body;
  resp.send(req.file);
});

module.exports = router;