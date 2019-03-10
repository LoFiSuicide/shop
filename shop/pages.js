module.exports = (app, lang) => {

let db = require('../db.js')

function unitBasket(req){
	if(req.session.basket == undefined) 
		req.session.basket = []
}
//Главная страница
app.get("/", (req, res) => {
	unitBasket(req)

	res.render('shop/home.ejs', {lang:lang, basket:req.session.basket})
})

//Каталог
app.get("/catalog", (req, res) => {
	unitBasket(req)

	res.render('shop/catalog.ejs', {lang:lang, basket:req.session.basket})
})

//Полноценная корзина
app.get("/basket", (req,res) => {
	unitBasket(req)
	var ids = ""
	for(product of req.session.basket){
		ids += `${product.id},`
	}

	db.connect((err)=>{
		if(err)
			return console.log(err)

		let q = `SELECT * FROM products WHERE id_product IN (${ids}0)`
		db.get().query(q, (err, result) => {
			if(err != null){
				console.log('ERROR getCategory: '+err)
				res.send("Возникла ошибка, попробуйте позже")
			}
			else
				res.render('shop/basket.ejs', {lang:lang, prod:result, basket:req.session.basket})
		})
		db.end()
	})
})

//Малая корзина
app.get("/mbasket", (req,res) => {
	unitBasket(req)
	var ids = ""
	for(product of req.session.basket){
		ids += `${product.id},`
	}

	db.connect((err)=>{
		if(err)
			return console.log(err)

		let q = `SELECT * FROM products WHERE id_product IN (${ids}0)`
		db.get().query(q, (err, result) => {
			if(err != null){
				console.log('ERROR getCategory: '+err)
				res.send("Возникла ошибка, попробуйте позже")
			}
			else
				res.render('shop/basketmin.ejs', {lang:lang, prod:result, basket:req.session.basket})
		})
		db.end()
	})
})

//Оформление заказа
app.get("/order", (req,res) => {
	unitBasket(req)

	res.render('shop/order.ejs', {lang:lang, basket:req.session.basket})
})

//Данные о продукте
app.get("/product:id", (req,res) => {
	unitBasket(req)

	let id = req.params.id

	db.connect((err)=>{
		if(err)
			return console.log(err)

		let q = `SELECT * FROM products WHERE id_product = ${id}`
		db.get().query(q, (err, result) => {
			if(err != null){
				console.log('ERROR getCategory: '+err)
				res.send("Возникла ошибка, попробуйте позже")
			}
			else if(result.length < 1) 
				res.render('404.ejs');
			else
				res.render('shop/product.ejs', {lang:lang, basket:req.session.basket, id:id})
		})
		db.end()
	})
})

//Товары с определенной категории
app.get("/category:id", (req, res) => {
	unitBasket(req)

	let id = req.params.id

	db.connect((err)=>{
		if(err)
			return console.log(err)
		let q = `SELECT * FROM shop.category WHERE id = ${id}`
		db.get().query(q, (err, result) => {
			if(err != null){
				console.log('ERROR getCategory: '+err)
				res.send("Возникла ошибка, попробуйте позже")
			}
			else if(result.length < 1) 
				res.render('shop/404.ejs')
			else
				res.render('shop/products.ejs', {lang:lang, basket:req.session.basket, id:id})
		})
		db.end()
	})
})

//Вопрос Ответ
app.get("/faq", (req,res) => {
	unitBasket(req)

	res.render('shop/faq.ejs', {lang:lang, basket:req.session.basket})
})

}