const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/userController');

// @route   POST /api/users/register
// @desc    Register user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/users
// @desc    Get all users
// @access  Public (for now, will add auth later if needed)
router.get('/', getUsers);

module.exports = router;