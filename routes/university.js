const express = require('express');
const router = express.Router();
const UniversityController = require('../controllers/university');


router.get('/randomUniversities', UniversityController.getRandomUniversities);
router.get('/allUniversities', UniversityController.getAllUniversities);


router.post('/submitRatings', UniversityController.submitRatings);


module.exports = router;