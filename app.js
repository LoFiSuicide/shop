let express = require('express'),
	fs = require('fs'),
	https = require('https'),
	http = require('http'),
	bodyParser = require('body-parser'),
	app = express(),
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

let options = {
	key: fs.readFileSync('privatekey.pem'),
	cert: fs.readFileSync('certificate.pem')
}
let mongourl = process.env.MONGODB_URI || 'mongodb://localhost/session'

let sessionParser = session({
	secret: "dick",
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({url: mongourl})
})
app.use(sessionParser)

let server = https.createServer(options, app).listen(httpsport, () => {
	console.log("Express server listening on port " + httpsport)
})

http.createServer((req, res) => {
	res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url })
	res.end()
}).listen(httpport)

// Shop
require('./shop/websocket.js')(app, server)
require('./shop/robokassa.js')(app)
require('./shop/api.js')(app)
require('./shop/pages.js')(app)
// Administration
let elang = JSON.parse(fs.readFileSync('./employees/lang/ru.json', 'utf8'))
require('./employees/api.js')(app)
require('./employees/pages.js')(app, elang)
// Errors
require('./shop/errors')(app)