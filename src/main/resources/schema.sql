DROP TABLE IF EXISTS alert;
CREATE TABLE alert (
  id     INT         NOT NULL AUTO_INCREMENT,
  application_id   VARCHAR(255) NOT NULL,
  change_agent  VARCHAR(255) NOT NULL,
  change_process    VARCHAR(250) NOT NULL,
  file VARCHAR(255) NOT NULL,
  hostname VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  checked BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);