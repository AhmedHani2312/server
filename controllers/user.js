const connection = require('../connection'); // Adjust the path as per your directory structure

exports.signup = (req, res) => {
    const {id, first_name, last_name, gender, age_range, country, email, university_name } = req.body;

    const query = 'INSERT INTO user (id,first_name, last_name, gender, age_range, country, email, university_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [id, first_name, last_name, gender, age_range, country, email, university_name], (err, results) => {
        if (err) {
            // Handle error properly in production code
            return res.status(500).send(err.message);
        }
        res.send('User created successfully');
    });
};

exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM user';
    connection.query(query, (err, results) => {
        if (err) {
            // Handle error properly in production code
            return res.status(500).send(err.message);
        }
        res.send(results);
    });
}



