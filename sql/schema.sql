DROP DATABASE IF EXISTS employeesdb;

CREATE DATABASE employeesdb;

USE employeesdb;

CREATE TABLE employee (
  PRIMARY KEY (id)
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  role_id INT NULL,
  manager_id INT NULL,
);

CREATE TABLE department (
  PRIMARY KEY (id)
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
);

CREATE TABLE role (
  PRIMARY KEY (id)
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL(11.5) NULL,
  department_id INT NULL,
);