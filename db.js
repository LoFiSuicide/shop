let mysql = require('mysql'),
	fs = require('fs')

let dbConnect = JSON.parse(fs.readFileSync('dbconnect.json', 'utf8'))

let state = {
	db:null
}

exports.connect = (done) => {
	if(state.db)
		return done()
	
	let connection = mysql.createConnection(dbConnect)

	connection.connect((err) => {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return done(err);
		}
		state.db = connection
		return done()
	})
}

exports.get = () => {
	return state.db
}

exports.end = () => {
	state.db.end()
	state.db = null
}