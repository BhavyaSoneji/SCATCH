const express = require('express');
const router = express.Router();

require('dotenv').config('JWT_KEY');

const {registerUser,loginUser, logoutUser} = require('../controllers/authController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.get('/', (req, resp) => {
    resp.json({ message: 'Hey there users' });
});   

router.post('/register',isLoggedIn,registerUser);

router.post('/login',loginUser);

router.get('/logout',isLoggedIn,logoutUser);

module.exports = router;