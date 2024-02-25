const connection = require('../connection'); // Adjust as per your directory structure

exports.getAllUniversities = (req, res) => {
    const query = 'SELECT * FROM university';
    connection.query
    (query
    , (err, results) => {
        if (err) {
            // Handle error properly in production code
            return res.status(500).send(err.message);
        }
        res.status(200).json(results);
    });
}



exports.getAllUniversities = (req, res) => {
    const query = 'SELECT * FROM university';
    connection.query
    (query
    , (err, results) => {
        if (err) {
            // Handle error properly in production code
            return res.status(500).send(err.message);
        }
        res.status(200).json(results);
    });
}


// exports.getRandomUniversities = (req, res) => {
    
//     console.log("Fetching random universities");
//     const query = "SELECT name FROM university ORDER BY RAND() LIMIT 5";
//     connection.query(query, (err, results) => {
//         if (err) {
//             console.error("Error fetching random universities:", err);
//             return res.status(500).json({ error: err.message });
//         }
//         console.log("Results:", results);
//         const universityNames = results.map(uni => uni.name);
//         console.log("Random Universities: ", universityNames);
//         res.json(universityNames);
//     });

// }




exports.getRandomUniversities = (req, res) => {
    const country = req.query.country; // Assuming the country code is passed as a query parameter
    let query;
    
    if (country) {
        // Make sure to replace 'country' with the actual column name in your table that stores the country information
        query = "SELECT name FROM university WHERE country = ? ORDER BY RAND() LIMIT 5";
    } else {
        query = "SELECT name FROM university ORDER BY RAND() LIMIT 5";
    }
    
    connection.query(query, [country], (err, results) => {
        if (err) {
            console.error("Error fetching random universities:", err);
            return res.status(500).json({ error: err.message });
        }
        const universityNames = results.map(uni => uni.name);
        res.json(universityNames);
    });
};









exports.submitRatings = (req, res) => {
    const { ratings, userId } = req.body;

    const queries = ratings.map(rating => {
        return new Promise((resolve, reject) => {
            const { universityId, ratingValue } = rating;
            const query = 'INSERT INTO rating (user_id, university_id, rating, timestamp) VALUES (?, ?, ?, NOW())';
            connection.query(query, [userId, universityId, ratingValue], (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    });

    Promise.all(queries)
        .then(() => {
            res.status(200).json({ message: 'Ratings submitted successfully' });
        })
        .catch(error => {
            console.error('Error submitting ratings:', error);
            res.status(500).json({ error: 'Error submitting ratings' });
        });
};
