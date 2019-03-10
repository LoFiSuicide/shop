let Products = require('../models/products')

let lang = JSON.parse(require('fs').readFileSync('shop/lang/ru.json', 'utf8'))

function unitBasket(req){
	if(req.session.basket == undefined) 
		req.session.basket = []
}

exports.home = (req,res) => {
	unitBasket(req)
	res.render('shop/home.ejs', {lang:lang, basket:req.session.basket})
}

exports.catalog = (req,res) => {
	unitBasket(req)
	res.render('shop/catalog.ejs', {lang:lang, basket:req.session.basket})
}

exports.basket = (req,res) => {
	unitBasket(req)
	var ids = ""
	for(product of req.session.basket){
		ids += `${product.id},`
	}
	Products.getproducts(ids, (err,result) => {
		if(err){
			console.log(err)
			return res.send("Возникла ошибка, попробуйте позже")
		}
		else
			res.render('shop/basket.ejs', {lang:lang, prod:result, basket:req.session.basket})
	})
}

exports.smallbasket = (req,res) => {
	unitBasket(req)
	var ids = ""
	for(product of req.session.basket){
		ids += `${product.id},`
	}
	Products.getproducts(ids, (err,result) => {
		if(err){
			console.log(err)
			return res.send("Возникла ошибка, попробуйте позже")
		}
		else
			res.render('shop/basketmin.ejs', {lang:lang, prod:result, basket:req.session.basket})
	})
}

exports.order = (req,res) => {
	unitBasket(req)
	res.render('shop/order.ejs', {lang:lang, basket:req.session.basket})
}

exports.product = (req,res) => {
	unitBasket(req)
	let id = req.params.id

	Products.product(id, (err,result) => {
		if(err){
			console.log(err)
			return res.send("Возникла ошибка, попробуйте позже")
		}
		else if(result.length < 1) 
			res.render('shop/404.ejs');
		else
			res.render('shop/product.ejs', {lang:lang, basket:req.session.basket, id:id})
		
	})
}

exports.category = (req,res) => {
	unitBasket(req)
	let id = req.params.id

	Products.category(id, (err,result) => {
		if(err){
			console.log(err)
			return res.send("Возникла ошибка, попробуйте позже")
		}
		else if(result.length < 1) 
			res.render('shop/404.ejs')
		else
			res.render('shop/products.ejs', {lang:lang, basket:req.session.basket, id:id})

	})
}

exports.faq = (req,res) => {
	unitBasket(req)
	res.render('shop/faq.ejs', {lang:lang, basket:req.session.basket})
}