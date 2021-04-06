DROP DATABASE IF EXISTS epytodo;
CREATE DATABASE epytodo;
USE epytodo;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY(id)
);

CREATE TABLE todo (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(80),
    description VARCHAR(260) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_time TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT "not started",
    user_id INT NOT NULL,
    KEY (id),
    FOREIGN KEY(user_id) REFERENCES user(id)
);