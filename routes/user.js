//user.js routes

const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();

router.post('/signup', UserController.signup);
router.post('/submitPersonalityForm', UserController.submitPersonalityForm); // Added route for personality form submission

router.post('/submitFeaturesForm', UserController.submitFeaturesForm);

// Add this new route in user.js under routes directory

router.post('/submitCountryChoice', UserController.submitCountryChoice);




router.get('/getAllUsers', UserController.getAllUsers);
router.get("/:id", UserController.getUserById);


module.exports = router;