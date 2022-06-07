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
