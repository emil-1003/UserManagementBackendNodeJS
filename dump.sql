DROP DATABASE IF EXISTS usermanagement;

CREATE DATABASE usermanagement;

USE usermanagement;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);