const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();

router.post('/signup', UserController.signup);
router.get('/getAllUsers', UserController.getAllUsers);



module.exports = router;
