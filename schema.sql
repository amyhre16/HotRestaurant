/*
CREATE DATABASE IF NOT EXISTS hotRestaurant;
USE hotRestaurant;
*/

CREATE TABLE IF NOT EXISTS tables (
	reservation_id INTEGER(10) UNSIGNED AUTO_INCREMENT NOT NULL
	, name VARCHAR(100) NOT NULL
	, phone_number VARCHAR(100)
	, email VARCHAR(100)
	, unique_id VARCHAR(100) NOT NULL
	, PRIMARY KEY(reservation_id)
);



CREATE TABLE IF NOT EXISTS waitingList (
	waitingList_id INTEGER(10) UNSIGNED AUTO_INCREMENT NOT NULL
	, name VARCHAR(100) NOT NULL
	, phone_number VARCHAR(100)
	, email VARCHAR(100)
	, unique_id VARCHAR(100) NOT NULL
	, PRIMARY KEY(waitingList_id)
);