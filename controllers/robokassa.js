let Robokassa = require('../models/robokassa')

exports.payment = (req,res) => {
	let sum = 0
	let des = ''
	let uid = 0
	des = req.query.des
	sum = req.query.sum
	uid = req.query.uid //уникальный номер заказа
	Robokassa.payment(des, uid, sum, (err, link) => {
		if(err){
			console.log(err)
			return res.send({error:true})
		}
		res.send({"link":link})
	})
}

exports.results = (req,res) => {
	Robokassa.productsCategory(req.params, (err,result) => res.send({response:result}))
}