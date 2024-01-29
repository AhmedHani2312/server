const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS module
const userRoutes = require('./routes/user');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Since Express 4.16.0, bodyParser has been re-added under the methods express.json() and express.urlencoded()
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(express.json()); // To parse JSON bodies

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Root Route
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

// User Routes
app.use('/user', userRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server started at port 3000');
});
