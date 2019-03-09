module.exports = (app) => {
let parseXML = require('xml2js').parseString,
	robokassa = require('node-robokassa'),
	https = require('https')

const robokassaHelper = new robokassa.RobokassaHelper({
	merchantLogin: 'designshop',
	hashingAlgorithm: 'MD5',
	password1: 'Futupo48',
	password2: 'root2014',
	resultUrlRequestMethod: 'GET'
})

app.get('/api/payment', (req, res) => {
	let sum = 0
	let des = ''
	let uid = 0
	des = req.query.des
	sum = req.query.sum
	uid = req.query.uid //уникальный номер заказа
	let url = `https://auth.robokassa.ru/Merchant/WebService/Service.asmx/CalcOutSumm?MerchantLogin=designshop&IncCurrLabel=BankCard&IncSum=${sum}`
	https.get(url, (rs) => {
		let body = ''
		rs.on('data', (chunk) => body += chunk)
		rs.on('end', () => {
			parseXML(body, (err, result) => {
				let outsum = result.CalcSummsResponseData.OutSum
				let options = {
					invId: uid
				};
				let link = robokassaHelper.generatePaymentUrl(outsum, des, options)
				res.send(link)
			})
		})
	}).on('error', (e) => {
		res.send(e)
		console.log("Got an error: ", e)
	})
})

app.get('/api/payment/result', (req, res) => {
	var result = robokassaHelper.checkPayment(req.params)?"PAYMENT SUCCESS!":"PAYMENT NOT SUCCESS!"
	res.send(result)
})

}