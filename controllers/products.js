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