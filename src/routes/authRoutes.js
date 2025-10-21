const express = require('express');
const {registerUser, loginUser, logoutUser} = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken')
const router = express.Router();

//ENDPOINTS FOR AUTHENTICATION ACTION
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);

module.exports = router;