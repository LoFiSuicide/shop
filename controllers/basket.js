let Basket = require('../models/basket')

exports.get = (req,res) => res.send(req.session.basket)

exports.price = (req,res) => {
	let ids = ""
	for(product of req.session.basket){
		ids += `${product.id},`
	}

	Basket.price(`${ids}0`, req.session.basket, (err,result) => {
		if(err){
			console.log(err)
			return res.send({error:true})
		}
		res.send({price:result})
	})
}