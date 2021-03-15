INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 500, 'hunter', 'update', 'README', 'localhost', current_timestamp(), 1);
INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 255, 'amanda', 'modification', 'React', 'localhost', current_timestamp(), 0);
INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 525, 'william', 'modification', 'Java', 'localhost', current_timestamp(), 0);
INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 'xyz', 'test\\fmundt1022', 'C:\\Windows\\System32\\notepad.exe', 'C:\\Windows\\System32\\drivers\\etc\\hosts', 'ltaxyz345101010.test.testing.com', TIMESTAMP '2021-02-21 19:20:30.45', 0);
INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 'xyz', 'test\\fmundt1022', 'C:\\Windows\\System32\\notepad.exe', 'C:\\Windows\\System32\\drivers\\etc\\services', 'ltaxyz345101010.test.testing.com', TIMESTAMP '2021-02-21 19:21:30.45', 0);
INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 'xyz', 'test\\puppet_agent', 'C:\\Program Files\\xyzpet Labs\\puppet\\sys\\ruby\\bin\\ruby.exe', 'C:\\Windows\\System32\\drivers\\etc\\hosts', 'ltaxyz345101010.test.testing.com', TIMESTAMP '2021-02-21 19:50:30.45', 0);
INSERT INTO `alert` (`id`, `application_id`, `change_agent`, `change_process`, `file`, `hostname`, `timestamp`, `checked`) VALUES (NULL, 'xyz', 'test\\puppet_agent', 'C:\\Program Files\\xyzpet Labs\\puppet\\sys\\ruby\\bin\\ruby.exe', 'C:\\Windows\\System32\\drivers\\etc\\services', 'ltaxyz345101010.test.testing.com', TIMESTAMP '2021-02-21 19:50:30.45', 0);

REPLACE INTO users (user_id, user_name, email, password, first_name, last_name, role)
VALUES (1,'user', 'user@acme.com',
        '$2y$10$A50PPo/tm3skv9iguM4UpOJg3ZUulV0XMB3iuGpx7po4k9OcFrREO',
        'Program', 'User', 'USER');
REPLACE INTO users (user_id, user_name, email, password, first_name, last_name, role)
VALUES (2, 'admin', 'admin@acme.com',
        '$2y$10$A50PPo/tm3skv9iguM4UpOJg3ZUulV0XMB3iuGpx7po4k9OcFrREO',
        'Program', 'Admin', 'ADMIN');

REPLACE INTO `application_users` (`application_user_id`, `user_id`, `application_id`) VALUES (NULL, 1, '255');
REPLACE INTO `application_users` (`application_user_id`, `user_id`, `application_id`) VALUES (NULL, 1, '500');
REPLACE INTO `application_users` (`application_user_id`, `user_id`, `application_id`) VALUES (NULL, 2, '500');
REPLACE INTO `application_users` (`application_user_id`, `user_id`, `application_id`) VALUES (NULL, 1, 'xyz');
REPLACE INTO `application_users` (`application_user_id`, `user_id`, `application_id`) VALUES (NULL, 1, 'abc');
REPLACE INTO `application_users` (`application_user_id`, `user_id`, `application_id`) VALUES (NULL, 2, 'abc');



