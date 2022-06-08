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

function inputResult() {
  inquirer

    .prompt({
      name: "task",
      type: "list",
      message: "Choose an option:",
      choices: [
        "view employees",
        "add employee",
        "remove employee",
        "add role",
        "update employees role",
        "exit",
      ],
    })

    .then(function ({ task }) {
      switch (task) {
        case "view employees":
          viewCommand();
          break;

        case "add employee":
          addCommand();
          break;

        case "remove employee":
          removeCommand();
          break;

        case "add role":
          addCommand();
          break;

        case "update employees role":
          updateCommand();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

function updateCommand() {
  dataCommand();
}

function viewCommand() {
  var database = `SELECT a.id, a.first_name, a.last_name, b.title, c.name 
    AS department, b.salary, CONCAT(j.first_name, ' ', j.last_name) 
    AS manager FROM employee a
    LEFT JOIN role b ON a.role_id = b.id
    LEFT JOIN department c ON c.id = b.department_id
    LEFT JOIN employee j ON j.id = a.manager_id`;

  connection.query(database, function (err, res) {
    console.table(res);
    inputResult();
  });
}
