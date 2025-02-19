CREATE DATABASE IF NOT EXISTS app;

USE app;

CREATE TABLE IF NOT EXISTS users(
  id int not null auto_increment,
  name varchar(128) not null,
  login varchar(128) not null unique,
  password char(60) not null,
  constraint users_pk primary key (id)
)ENGINE=INNODB;
