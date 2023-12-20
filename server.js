const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // To parse JSON bodies

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
