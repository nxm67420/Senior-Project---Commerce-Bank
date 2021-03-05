INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 500, 'hunter', 'update', 'README', 'localhost', current_timestamp(), 0);
INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 255, 'amanda', 'modification', 'React', 'localhost', current_timestamp(), 0);
INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 525, 'william', 'modification', 'Java', 'localhost', current_timestamp(), 0);

REPLACE INTO users (user_id, user_name, email, password, first_name, last_name, role)
VALUES (1,'user', 'user@acme.com',
        '$2y$10$A50PPo/tm3skv9iguM4UpOJg3ZUulV0XMB3iuGpx7po4k9OcFrREO',
        'Program', 'User', 'USER');
REPLACE INTO users (user_id, user_name, email, password, first_name, last_name, role)
VALUES (2, 'admin', 'admin@acme.com',
        '$2y$10$A50PPo/tm3skv9iguM4UpOJg3ZUulV0XMB3iuGpx7po4k9OcFrREO',
        'Program', 'Admin', 'ADMIN');
