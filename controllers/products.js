let Products = require('../models/products')

exports.all = (req, res) => {
	let search = (req.query.search)?req.query.search:undefined
	let start = 0
	let count = 25
	if(req.query.start != undefined) start = req.query.start
	if(req.query.count != undefined) count = req.query.count

	Products.all(start, count, search, (err,result) => {
		if(err){
			console.log(err)
			return res.send({error:true})
		}
		res.send({response:result})
	})
}

exports.category = (req, res) => {
	let search = (req.query.search)?req.query.search:undefined
	let id = req.params.id
	let start = 0
	let count = 25
	if(req.query.start != undefined) start = req.query.start
	if(req.query.count != undefined) count = req.query.count

	Products.category(id, start, count, search, (err,result) => {
		if(err){
			console.log(err)
			return res.send({error:true})
		}
		res.send({response:result})
	})
}

exports.product = (req, res) => {
	let id = req.params.id

	Products.product(id, (err,result) => {
		if(err){
			console.log(err)
			return res.send({error:true})
		}
		res.send({response:result})
	})
}
