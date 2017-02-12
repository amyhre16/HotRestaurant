// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

// create the express server and assign the port
var app = express();
var PORT = 3000;

// sets up the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

// create the connection to the SQL server
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'secret',
	database: 'hotRestaurant'
});

// connect to the server
connection.connect();

var tables = [
	
];

var waitingList = [

];

// when this route is visited, send the browser to HotRestaurant/index.html
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/reserve', function(req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get('/tables', function(req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

// when /api/tables is visited, display the tables array
app.get('/api/tables', function(req, res) {
	connection.query('SELECT * FROM tables', function(err, result) {
		if (err) {
			throw err;
		}
		res.send(result);
	});
});

// when /api/waitingList is visited, display the waiting list array
app.get('/api/waitingList', function(req, res) {
	connection.query('SELECT * FROM waitingList', function(err, result) {
		if (err) {
			throw err;
		}
		res.send(result);
	});
});

// when clearTables is visited, it clears tables and waitingList
app.post('/clearTables', function(req, res) {
	connection.query('DELETE FROM tables', function(err, result) {
		if (err) {
			throw err;
		}
		console.log("Cleared the Reservation table :D");
	});
	connection.query('DELETE FROM waitingList', function(err, result) {
		if (err) {
			throw err;
		}
		console.log("Cleared the Waiting List table :D");
	});
});


app.post('/makeReservation', function(req, res) {
	connection.query('SELECT COUNT(unique_id) as count FROM tables', function(err, result) {
		if (err) {
			throw err;
		}
		console.log(req.body);
		if (parseInt(result[0].count) < 5) {
			connection.query('INSERT INTO tables (name, phone_number, email, unique_id) VALUES (?, ?, ?, ?)', [req.body.name, req.body.phone, req.body.email, req.body.unique], function(err, insertResult) {
				res.send({reservation: "reservation"});
			});
		}
		else {
			connection.query('INSERT INTO waitingList (name, phone_number, email, unique_id) VALUES (?, ?, ?, ?)', [req.body.name, req.body.phone, req.body.email, req.body.unique], function(err, insertResult) {
				console.log("Added your name to the waiting list");
				res.send({waiting: "waiting"});
			});	
		}
	});
});


// starts server to begin listening
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});