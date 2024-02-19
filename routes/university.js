const express = require('express');
const router = express.Router();
const UniversityController = require('../controllers/university');


router.get('/randomUniversities', UniversityController.getRandomUniversities);
router.get('/allUniversities', UniversityController.getAllUniversities);


module.exports = router;