INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 500, 'hunter', 'update', 'README', 'localhost', current_timestamp(), 0);
INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 255, 'amanda', 'modification', 'React', 'localhost', current_timestamp(), 0);
INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 525, 'william', 'modification', 'Java', 'localhost', current_timestamp(), 0);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
user_id INT    NOT NULL AUTO_INCREMENT,
user_name VARCHAR(255) NOT NULL,
email VARCHAR(320) NOT NULL,
password VARCHAR(255) NOT NULL,
first_name Varchar(50) NOT NULL,
last_name  VARCHAR(50) NOT NULL,
role INT NOT NULL,
PRIMARY KEY (user_id)
);

REPLACE INTO users (user_id, user_name, email, password, first_name, last_name, role)
VALUES (1,'Itachi186', 'user@acme.com',
        '$2y$10$A50PPo/tm3skv9iguM4UpOJg3ZUulV0XMB3iuGpx7po4k9OcFrREO',
        'Program', 'User', 1);
REPLACE INTO users (user_id, user_name, email, password, first_name, last_name, role)
VALUES (2, 'BruceLee', 'admin@acme.com',
        '$2y$10$A50PPo/tm3skv9iguM4UpOJg3ZUulV0XMB3iuGpx7po4k9OcFrREO',
        'Program', 'Admin', 2);
