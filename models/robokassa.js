let parseXML = require('xml2js').parseString,
	robokassa = require('node-robokassa'),
	https = require('https'),
	fs = require('fs')

let connect = {}
try {
	connect = JSON.parse(fs.readFileSync('./roboconnect.json', 'utf8'))
} catch (err) {
	console.log(err)
}
const robokassaHelper = new robokassa.RobokassaHelper(connect)

exports.payment = (des, uid, sum, cb) => {
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
				cb(null, link)
			})
		})
	}).on('error', (e) => {
		cb(e)
	})
}

exports.results = (params, cb) => {
	cb(robokassaHelper.checkPayment(params)?"PAYMENT SUCCESS!":"PAYMENT NOT SUCCESS!")
}