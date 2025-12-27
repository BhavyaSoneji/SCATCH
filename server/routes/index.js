const express = require('express')
const router = express.Router();

const { isLoggedIn } = require('../middlewares/isLoggedIn');


router.get('/',(req,resp)=>{
    let error = req.flash('error');
    resp.render('index',{error})
})

router.get('/shop',isLoggedIn,(req,resp)=>{
    resp.render('shop')
})

