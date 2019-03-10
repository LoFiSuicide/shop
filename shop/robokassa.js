let roboContoller = require('../controllers/robokassa')

module.exports = (app) => {
	app.get('/api/payment', roboContoller.payment)
	app.get('/api/payment/result', roboContoller.results)
}