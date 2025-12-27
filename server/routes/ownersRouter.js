const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
    resp.json({ message: 'Hey there owner' });
});

module.exports = router;

