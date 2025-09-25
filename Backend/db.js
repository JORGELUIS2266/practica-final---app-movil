// db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",        // tu usuario MySQL
  password: "12345678", // tu contraseña
  database: "escuela",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exporta el pool con promise para usar async/await
module.exports = pool.promise();
