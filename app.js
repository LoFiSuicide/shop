let express = require('express'),
	fs = require('fs'),
	https = require('https'),
	http = require('http'),
	bodyParser = require('body-parser'),
	mysql = require('mysql'),
	app = express(),
	mongoose = require ("mongoose"),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.engine('ejs', require('ejs-locals'))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

let httpsport = process.env.PORT || 443
let httpport = process.env.PORT || 80
let lang = JSON.parse(fs.readFileSync('lang/ru.json', 'utf8'))
let options = {
	key: fs.readFileSync('privatekey.pem'),
	cert: fs.readFileSync('certificate.pem')
}
let mongourl = process.env.MONGODB_URI || 'mongodb://localhost/session'
let dbConnect = JSON.parse(fs.readFileSync('dbconnect.json', 'utf8'))

var sessionParser = session({
	secret: "dick",
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({url: mongourl})
})
app.use(sessionParser)

let server = https.createServer(options, app)
server.listen(httpsport, () => {
	console.log("Express server listening on port " + httpsport)
})

http.createServer((req, res) => {
	res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url })
	res.end()
}).listen(httpport)

// Shop
require('./shop/websocket.js')(app, server)
require('./shop/robokassa.js')(app)
require('./shop/api.js')(app, mysql, dbConnect)
require('./shop/pages.js')(app, lang, mysql, dbConnect)
// Administration
let elang = JSON.parse(fs.readFileSync('lang/emp/ru.json', 'utf8'))
require('./employees/api.js')(app, mysql, dbConnect)
require('./employees/pages.js')(app, elang, mysql, dbConnect)
// Errors
require('./shop/errors')(app)