const express = require('express');
const router = express.Router();
const { create, login } = require('../controllers/ownerController');
const { auth } = require('../middlewares/auth');
// const {authorize} = require('../middlewares/authorize');


if(process.env.NODE_ENV=='development'){
    router.post('/create',create);
}

router.get('/login',login);
// router.get('/delete/:id',auth,authorize('owner'),login);
// router.get('/edit/:id',auth,authorize('owner'),login);

module.exports = router;

