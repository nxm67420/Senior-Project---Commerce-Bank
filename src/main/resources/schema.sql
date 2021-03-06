DROP TABLE IF EXISTS user_application;

DROP TABLE IF EXISTS application_users;
CREATE TABLE application_users (
                                   application_user_id INT    NOT NULL AUTO_INCREMENT,
                                   user_id VARCHAR(255) NOT NULL,
                                   application_id VARCHAR(320) NOT NULL,
                                   PRIMARY KEY (application_user_id)
);

DROP TABLE IF EXISTS alert;
CREATE TABLE alert (
                       id     INT         NOT NULL AUTO_INCREMENT,
                       application_id   VARCHAR(255) NOT NULL,
                       change_agent  VARCHAR(255) NOT NULL,
                       change_process    VARCHAR(250) NOT NULL,
                       file VARCHAR(255) NOT NULL,
                       hostname VARCHAR(255) NOT NULL,
                       timestamp TIMESTAMP NOT NULL,
                       checked BOOLEAN NOT NULL DEFAULT 0,
                       known BOOLEAN,
                       malicious BOOLEAN,
                       acknowledge_user VARCHAR(255),
                       control_number VARCHAR(255),
                       PRIMARY KEY (id)
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
                       user_id INT    NOT NULL AUTO_INCREMENT,
                       user_name VARCHAR(255) NOT NULL,
                       email VARCHAR(320) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       first_name Varchar(50) NOT NULL,
                       last_name  VARCHAR(50) NOT NULL,
                       role VARCHAR(255) NOT NULL,
                       PRIMARY KEY (user_id)
);