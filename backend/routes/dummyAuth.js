// routes/dummyAuth.js
const express = require('express');
const { dummyLogin } = require('../controllers/dummyAuthController');

const router = express.Router();

// Route dummy login
router.post('/login', dummyLogin);

module.exports = router;