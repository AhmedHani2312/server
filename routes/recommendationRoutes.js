// //  recommendationRoutes.js

// const express = require('express');
// const recommendationController = require('../controllers/recommendationController'); // Adjust the path as necessary
// const router = express.Router();

// // Define a new route for recommendations
// router.post('/recommendations', recommendationController.getRecommendations);

// // Export the router
// module.exports = router;




const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Define the route for getting recommendations
router.post('/', recommendationController.getRecommendations);

module.exports = router;

