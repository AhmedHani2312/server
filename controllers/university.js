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


exports.getRandomUniversities = (req, res) => {
    
    console.log("Fetching random universities");
    const query = "SELECT name FROM university ORDER BY RAND() LIMIT 5";
    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching random universities:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("Results:", results);
        const universityNames = results.map(uni => uni.name);
        console.log("Random Universities: ", universityNames);
        res.json(universityNames);
    });

}
