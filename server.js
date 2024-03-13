// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import CORS module
// const userRoutes = require('./routes/user');
// const universityRoutes = require('./routes/university');
// // const recommendationRoutes = require('./routes/recommendationRoutes'); // Adjust the path as necessary
// const app = express();

// // Enable CORS for all routes
// app.use(cors());

// // Since Express 4.16.0, bodyParser has been re-added under the methods express.json() and express.urlencoded()
// app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
// app.use(express.json()); // To parse JSON bodies

// // Serve static files from the 'public' directory
// app.use(express.static('public'));

// // Root Route
// app.get('/', (req, res) => {
//     res.json({ message: 'Hello World!' });
// });

// // User Routes
// app.use('/user', userRoutes);
// app.use('/university', universityRoutes);
// // app.use('/api', recommendationRoutes);

// // Start the server
// app.listen(3000, () => {
//     console.log('Server started at port 3000');
// });



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS module
const userRoutes = require('./routes/user');
const universityRoutes = require('./routes/university');
const recommendationRoutes = require('./routes/recommendationRoutes'); // Now included
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.use('/user', userRoutes);
app.use('/university', universityRoutes);
app.use('/api/recommendations', recommendationRoutes); // Register the recommendations routes

app.listen(3000, () => {
    console.log('Server started at port 3000');
});


