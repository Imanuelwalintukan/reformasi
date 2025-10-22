// routes/auth.js
const express = require('express');
const { register, login, logout, getUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user', getUser);

module.exports = router;