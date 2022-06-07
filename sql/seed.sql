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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Zane", "Sun", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bang", "Vu", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Connor", "Heartman", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Travis", "Tucker", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jon", "Taylor", 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joseph", "De Cruise", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amber", "Lue", 2, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Samantha", "Worche", 3, 1);