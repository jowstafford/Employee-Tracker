var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "x8V^QDY$WB",
  database: "employeesdb",
});

connection.connect(function () {
  inputResult();
});
