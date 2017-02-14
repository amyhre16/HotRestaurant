var mysql = require('mysql');

var connectionInfo = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hotRestaurant'
});

if (process.env.JAWSDB_URL) {
	connectionInfo = process.env.JAWSDB_URL;
}

// create the connection to the SQL server
var connection = mysql.createConnection(connectionInfo);

// connect to the server
connection.connect();

module.exports = connection;