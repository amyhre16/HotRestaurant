var connection = require('./connection.js');

var orm = {
	selectAll: function(table) {
		var query = "SELECT * FROM ??";
		connection.query(query, [table], function(err, result) {
			if (err) {
				throw err;
			}
			return result;
		});
	},
	clearTables: function(table) {
		var query = "DELETE FROM ??";
		connection.query(query, [table], function(err, result) {
			if (err) {
				throw err;
			}
		});
	},
	findCount: function
};