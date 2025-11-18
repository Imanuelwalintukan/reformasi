// routes/emailAuth.js
const express = require('express');
const { emailLogin, getUserFromSession, logout, getAllUsers } = require('../controllers/emailAuthController');

const router = express.Router();

// Email-only authentication routes
router.post('/login', emailLogin);
router.get('/user', getUserFromSession);
router.post('/logout', logout);

// Debug route to get all users (remove in production)
router.get('/users', getAllUsers);

module.exports = router;