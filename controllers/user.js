//user.js controllers


const connection = require('../connection'); // Adjust as per your directory structure

exports.signup = (req, res) => {
    const { first_name, last_name, gender, age_range, country, email, university_name } = req.body;

    const query = 'INSERT INTO user (first_name, last_name, gender, age_range, country, email, university_name) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [ first_name, last_name, gender, age_range, country, email, university_name], (err, results) => {
        if (err) {
            // Handle error properly in production code
            return res.status(500).send(err.message);
        }
        res.status(201).json({
            message: 'User created successfully',
            user: {
                ...results,
                email: email
            }
        })
    });
};
exports.submitPersonalityForm = (req, res) => {
    const { email, user_id, responses } = req.body;

    console.log("Received data for personality form:", { email, user_id, responses });

    // Loop through each response and insert into the database
    Promise.all(
        Object.entries(responses).map(([key, value]) => {
            return new Promise((resolve, reject) => {
                const meta_key = key; 
                const meta_value = value;

                // Prepare the SQL query
                const query = "INSERT INTO personalityform (email, user_id, meta_key, meta_value) VALUES (?, ?, ?, ?)";
                
                // Execute the query
                connection.query(query, [email, user_id, meta_key, meta_value], (err, results) => {
                    if (err) {
                        console.error("Error inserting data:", err);
                        reject(err);
                    } else {
                        console.log("Inserted data:", { meta_key, meta_value, results });
                        resolve(results);
                        
                    }
                });
            });
        })
    )
        .then(() => {
            console.log("All responses submitted successfully.");
            res.status(201).json({
                message: "Personality form submitted successfully",
                userId: user_id,
                userEmail: email
            });
        })
    .catch(err => {
        console.error("Error submitting personality form:", err);
        res.status(500).send(err.message);
    });
};




exports.submitFeaturesForm = (req, res) => {
    const { email, user_id, responses } = req.body;
    console.log("Email received on server:", email);
  
    Promise.all(
      responses.map(({ meta_key, meta_value }) => {
        return new Promise((resolve, reject) => {
          const query = "INSERT INTO featuresform (email, user_id, meta_key, meta_value) VALUES (?, ?, ?, ?)";
          connection.query(query, [email, user_id, meta_key, meta_value], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results.insertId);
            }
          });
        });
      })
    )
    .then(resultIds => {
      res.status(201).json({
        message: "Features form submitted successfully",
        insertedIds: resultIds
      });
    })
    .catch(err => {
      console.error("Error submitting features form:", err);
      res.status(500).send(err.message);
    });
  };
  // Add this new controller function in user.js under controllers directory

exports.submitCountryChoice = (req, res) => {
    const { user_id, question_id, uni_country } = req.body;

    const query = "INSERT INTO user_uni_country (user_id, question_id, uni_country) VALUES (?, ?, ?)";
    connection.query(query, [user_id, question_id, uni_country], (err, results) => {
        if (err) {
            console.error("Error inserting country choice:", err);
            return res.status(500).send(err.message);
        }
        console.log("Country choice submitted successfully:", results);
        res.status(201).json({
            message: "Country choice submitted successfully",
            insertedId: results.insertId
        });
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


exports.getUserById = (req, res) => {
    const userId = req.params.id;   
    const query = 'SELECT * FROM user WHERE id = ?';`   `
    connection.query(query, [userId], (err, results) => {
        if (err) {
            // Handle error properly in production code
            return res.status(500).send(err.message);
        }
        res.send(results[0]);
    });
}



exports.submitHowDidItGoForm = async (req, res) => {
    const { email, user_id, responses } = req.body;
  
    try {
      // You'll iterate over your responses object and insert them into the database
      for (const [questionId, answer] of Object.entries(responses)) {
        const query = "INSERT INTO howdiditgoform (email, user_id, meta_key, meta_value) VALUES (?, ?, ?, ?)";
        await new Promise((resolve, reject) => {
          connection.query(query, [email, user_id, questionId, answer], (err, results) => {
            if (err) reject(err);
            resolve(results);
          });
        });
      }
      // Once all inserts are done, send back a success response
      res.status(201).json({
        message: 'Survey responses submitted successfully',
        userEmail: email,
        userId: user_id
      });
    } catch (err) {
      console.error('Error submitting survey responses:', err);
      res.status(500).send(err.message);
    }
  };
  








