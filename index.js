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

  connection.query(database, function (res) {
    console.table(res);
    inputResult();
  });
}

function addCommand() {
  var database = `
      SELECT b.id, b.title, b.salary 
      FROM role b`;

  connection.query(database, function (res) {
    var roleOutput = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);
    promptInsert(roleOutput);
  });
}
function promptInsert(roleOutput) {
  inquirer

    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please Enter First Name",
      },

      {
        type: "input",
        name: "last_name",
        message: "Please Enter Last Name",
      },

      {
        type: "list",
        name: "roleid",
        message: "Select Employee Role",
        choices: roleOutput,
      },
    ])

    .then(function (result) {
      console.log(result);
      var database = `INSERT INTO employee SET?`;

      connection.query(
        database,
        {
          first_name: result.first_name,
          last_name: result.last_name,
          role_id: result.roleid,
          manager_id: result.managerId,
        },

        function (res) {
          console.table(res);
          inputResult();
        }
      );
    });
}

function removeCommand() {
  var database = `SELECT a.id, a.first_name, a.last_name FROM employee a`;

  connection.query(database, function (err, res) {
    var deleteCommand = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));

    console.table(res);
    promptDelete(deleteCommand);
  });
}

function promptDelete(deleteCommand) {
  inquirer

    .prompt([
      {
        type: "list",
        name: "employeeid",
        message: "choose employee",
        choices: deleteCommand,
      },
    ])

    .then(function (result) {
      var database = `DELETE FROM employee WHERE?`;
      connection.query(database, { id: result.employeeid }, (err, res) => {
        console.table(res);
        inputResult();
      });
    });
}

function dataCommand() {
  var database = `SELECT a.id, a.first_name, a.last_name, b.title, c.name AS department, b.salary, 
    CONCAT(j.first_name, ' ', j.last_name) AS manager FROM employee a
    JOIN role b ON a.role_id = b.id
    JOIN department c ON c.id = b.department_id
    JOIN employee j ON j.id = j.manager_id`;

  connection.query(database, (res) => {
    var selectResponse = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    }));

    console.table(res);
    roleArray(selectResponse);
  });
}

function roleArray(selectResponse) {
  var database = `SELECT b.id, b.title, b.salary FROM role b`;
  var roleOutput;

  connection.query(database, function (err, res) {
    roleOutput = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);
    employeeInput(selectResponse, roleOutput);
  });
}

function addCommand() {
  var database = `SELECT c.id, b.name, c.salary AS budget FROM employee a
      JOIN role c ON a.role_id = c.id
      JOIN department b ON b.id = c.department_id
      GROUP BY c.id, b.name`;

  connection.query(database, function (err, res) {
    var departmentResponse = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));

    console.table(res);
    promptAddRole(departmentResponse);
  });
}

function promptAddRole(departmentResponse) {
  inquirer

    .prompt([
      {
        type: "input",
        name: "title",
        message: "add title:",
      },

      {
        type: "input",
        name: "salary",
        message: "add salary:",
      },

      {
        type: "list",
        name: "departmentIdentification",
        message: "find department:",
        choices: departmentResponse,
      },
    ])

    .then(function (result) {
      var database = `INSERT INTO role SET ?`;
      connection.query(
        database,

        {
          title: result.title,
          salary: result.salary,
          department_id: result.departmentIdentification,
        },

        function (err, res) {
          console.table(res);
          inputResult();
        }
      );
    });
}

function employeeInput(selectResponse, roleOutput) {
  inquirer

    .prompt([
      {
        type: "list",
        name: "employeeid",
        message: "select employee",
        choices: selectResponse,
      },

      {
        type: "list",
        name: "roleid",
        message: "select role",
        choices: roleOutput,
      },
    ])

    .then(function (result) {
      var database = `UPDATE employee SET role_id = ? WHERE id = ?`;
      connection.query(
        database,
        [result.roleid, result.employeeid],

        function (err, res) {
          console.table(res);
          inputResult();
        }
      );
    });
}
