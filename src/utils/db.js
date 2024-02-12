const mysql = require('mysql2');
const { config } = require('./config')

// Validate required configuration properties
const requiredConfigProperties = ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT'];
for (const prop of requiredConfigProperties) {
  if (!config[prop]) {
    console.error(`Missing required configuration property: ${prop}`);
    process.exit(1); // Exit the process if a required property is missing
  }
}

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  port: config.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Testing the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log(`Connected to MySQL database at ${config.DB_HOST}:${config.DB_PORT}`);
  connection.release();
});

module.exports = pool.promise();
  