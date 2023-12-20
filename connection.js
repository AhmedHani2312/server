const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newpassword",
  database: "uni_database2",
  port: 3306,
});

connection.connect(err => {
  if (!err) {
    console.log("DB Connection Succeeded");
  } else {
    console.log(err);
  }
});

module.exports = connection;