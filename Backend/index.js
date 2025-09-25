const mysql = require("mysql2");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});


const pool = mysql.createPool({
  host: "localhost",
  user: "root",         // tu usuario de MySQL
  password: "tu_pass",  // tu contraseña
  database: "escuela",  // la base de datos que creaste
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
