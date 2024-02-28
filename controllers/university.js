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
        query = "SELECT * FROM university WHERE country = ? ORDER BY RAND() LIMIT 5";
    } else {
        query = "SELECT * FROM university ORDER BY RAND() LIMIT 5";
    }
    
    connection.query(query, [country], (err, results) => {
        if (err) {
            console.error("Error fetching random universities:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(results);
    });
};









// exports.submitRatings = async (req, res) => {
//     const { ratings, userId } = req.body; // Ensure this matches the frontend structure

//     try {
//         await Promise.all(ratings.map(rating => {
//             return new Promise((resolve, reject) => {
//                 const { universityId, ratingValue } = rating; // Ensure these match your database columns
//                 const query = 'INSERT INTO rating (user_id, university_id, rating, timestamp) VALUES (?, ?, ?, NOW())';
//                 connection.query(query, [userId, universityId, ratingValue], (err, result) => {
//                     if (err) reject(err);
//                     else resolve(result);
//                 });
//             });
//         }));
//         res.status(200).json({ message: 'Ratings submitted successfully.' });
//     } catch (error) {
//         console.error('Error submitting ratings:', error);
//         res.status(500).json({ error: 'Error submitting ratings' });
//     }
// };



exports.submitRatings = async (req, res) => {
    const { ratings, userId } = req.body;

    // Start a transaction in case one of the inserts fails
    connection.beginTransaction(err => {
        if (err) {
            console.error('Transaction Begin Error:', err);
            return res.status(500).json({ error: 'Database transaction error' });
        }

        Promise.all(ratings.map(rating => {
            return new Promise((resolve, reject) => {
                const { universityId, ratingValue } = rating;
                console.log('uni id :', universityId);
                const query = 'INSERT INTO rating (user_id, university_id, rating, timestamp) VALUES (?, ?, ?, NOW())';
                connection.query(query, [userId, universityId, ratingValue], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });
        }))
        .then(() => {
            connection.commit(commitErr => {
                if (commitErr) {
                    console.error('Transaction Commit Error:', commitErr);
                    throw commitErr;
                }
                res.status(200).json({ message: 'Ratings submitted successfully.' });
            });
        })
        .catch(transactionErr => {
            connection.rollback(() => {
                console.error('Transaction Rollback:', transactionErr);
                res.status(500).json({ error: 'Error submitting ratings' });
            });
        });
    });
};
