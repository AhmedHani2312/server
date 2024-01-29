const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/submitPersonalityForm', UserController.submitPersonalityForm); // Added route for personality form submission
router.get('/getAllUsers', UserController.getAllUsers);
router.get("/:id", UserController.getUserById);


module.exports = router;