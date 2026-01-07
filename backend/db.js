const mysql = require('mysql2');

// Create connection to shoe_db database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shoe_db'
});

// Connect to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to shoe_db database');
});

// Export connection
module.exports = connection;



