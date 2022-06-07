USE employeesdb;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 60000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 80000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 160000, 4);