const express = require('express');
const router = express.Router();

require('dotenv').config('JWT_KEY');
const {registerUser} = require('../controllers/authController');

router.get('/', (req, resp) => {
    resp.json({ message: 'Hey there users' });
});   

router.post('/register',registerUser);

module.exports = router;