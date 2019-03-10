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

exports.add = (req,res) => {
	let id = req.params.id
	let search = 0
	for(product of req.session.basket){
		if(product.id == id){
			product.col++
			search = 1
		}
	}
	if(search == 0)
		req.session.basket[req.session.basket.length] = {id:id, col:1}

	req.session.save()
	res.send({status:true})
}

exports.edit = (req,res) => {
	let id = req.query.id
	let col = req.query.col
	for(i in req.session.basket){
		if(req.session.basket[i].id == id){
			if(Number(req.session.basket[i].col) + Number(col) <= 0)
				req.session.basket.splice(i, 1)
			else
				req.session.basket[i].col = Number(req.session.basket[i].col) + Number(col)
		}
	}
	req.session.save()
	res.send({status:true})
}

exports.delete = (req,res) => {
	let id = req.params.id
	let search = 0
	for(i in req.session.basket){
		if(req.session.basket[i].id == id)
			req.session.basket.splice(i, 1)
	}
	req.session.save()
	res.send({status:true})
}