const express = require('express');
const router = express.Router();

require('dotenv').config('JWT_KEY');

const {registerUser,loginUser, logoutUser, verifyUser, fetchCart} = require('../controllers/authController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { addToCart } = require('../controllers/authController');

router.get('/', (req, resp) => {
    resp.json({ message: 'Hey there users' });
});   

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/logout',isLoggedIn,logoutUser);

router.get('/verify',isLoggedIn,verifyUser);

router.get("/addtocart/:id",isLoggedIn,addToCart);

router.get("/cart",isLoggedIn,fetchCart);


module.exports = router;