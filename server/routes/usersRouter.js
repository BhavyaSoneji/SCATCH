const express = require('express');
const router = express.Router();

require('dotenv').config('JWT_KEY');

const {registerUser,loginUser, logoutUser, verifyUser, fetchUserWithCart, removeFromCart, googleLogin, updateUser, updatePassword} = require('../controllers/userController');
const { auth } = require('../middlewares/auth');
const { addToCart } = require('../controllers/userController');
const authorize = require('../middlewares/authorize');

router.get('/', (req, resp) => {
    resp.json({ message: 'Hey there users' });
});   

router.post('/register',registerUser);

router.post('/login',loginUser);

router.post('/google-login',googleLogin);

router.get('/logout',auth,logoutUser);

router.get('/verify',auth,verifyUser);

router.get("/addtocart/:id",auth,authorize("user"),addToCart);

router.get("/userwithcart",auth,authorize("user",'owner'),fetchUserWithCart);

router.get("/deletefromcart/:id",auth,authorize("user"),removeFromCart);

router.post("/updateuser/:id",auth,authorize("user"),updateUser)

router.post("/updatepassword/:id",auth,authorize("user"),updatePassword)


module.exports = router;