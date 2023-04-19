var mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "pki-lab4.mysql.database.azure.com",
  user: process.env.AZURE_USERNAME,
  password: process.env.AZURE_PASS,
  database: "lab4",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});
exports.databaseConnection = connection;
