let Products = require('../models/products')

exports.allProducts = (req, res) => {
	let search = (req.query.search)?req.query.search:undefined
	let start = 0
	let count = 25
	if(req.query.start != undefined) start = req.query.start
	if(req.query.count != undefined) count = req.query.count

	Products.allProducts(start, count, search, (err,result) => {
		if(err){
			console.log(err)
			return res.send({error:true})
		}
		res.send({response:result})
	})
}

exports.productsCategory = (req, res) => {
	let search = (req.query.search)?req.query.search:undefined
	let id = req.params.id
	let start = 0
	let count = 25
	if(req.query.start != undefined) start = req.query.start
	if(req.query.count != undefined) count = req.query.count

	Products.productsCategory(id, start, count, search, (err,result) => {
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

exports.categories = (req, res) => {
	Products.categories((err,result) => {
		if(err){
			console.log(err)
			return res.send({error:true})
		}
		res.send({response:result})
	})
}

exports.category = (req, res) => {
	let id = req.params.id

	Products.category(id, (err,result) => {
		if(err){
			console.log(err)
			return res.send({error:true})
		}
		res.send({response:result})
	})
}