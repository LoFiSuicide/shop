module.exports = (app, lang, mysql, dbConnect) => {

function unitBasket(req){
	if(req.session.basket == undefined) 
		req.session.basket = []
}
//Главная страница
app.get("/", (req, res) => {
	unitBasket(req)

	res.render('home.ejs', {lang:lang, page:"home", basket:req.session.basket, category:[]})
})

//Каталог
app.get("/catalog", (req, res) => {
	unitBasket(req)

	res.render('catalog.ejs', {lang:lang, basket:req.session.basket})
})

//Полноценная корзина
app.get("/basket", (req,res) => {
	unitBasket(req)
	var ids = ""
	for(product of req.session.basket){
		ids += `${product.id},`
	}

	let connection = mysql.createConnection(dbConnect)
	connection.query(`SELECT * FROM products WHERE id_product IN (${ids}0)`, (err, result) => {
		if(err != null){
			console.log('ERROR getCategory: '+err)
			res.send("Возникла ошибка, попробуйте позже")
		}
		else
			res.render('basket.ejs', {lang:lang, prod:result, basket:req.session.basket})
	})
	connection.end()
})

//Малая корзина
app.get("/mbasket", (req,res) => {
	unitBasket(req)
	var ids = ""
	for(product of req.session.basket){
		ids += `${product.id},`
	}

	let connection = mysql.createConnection(dbConnect)
	connection.query(`SELECT * FROM products WHERE id_product IN (${ids}0)`, (err, result) => {
		if(err != null){
			console.log('ERROR getCategory: '+err)
			res.send("Возникла ошибка, попробуйте позже")
		}
		else
			res.render('basketmin.ejs', {lang:lang, prod:result, basket:req.session.basket})
	})
	connection.end()
})

//Оформление заказа
app.get("/order", (req,res) => {
	unitBasket(req)

	res.render('order.ejs', {lang:lang, uid:req.session.uid, basket:req.session.basket})
})

//Данные о продукте
app.get("/product:id", (req,res) => {
	unitBasket(req)

	let id = req.params.id
	let connection = mysql.createConnection(dbConnect)
	connection.query(`SELECT * FROM products WHERE id_product = ${id}`, (err, result) => {
		if(err != null){
			console.log('ERROR getCategory: '+err)
			res.send("Возникла ошибка, попробуйте позже")
		}
		else if(result.length < 1) 
			res.render('404.ejs');
		else
			res.render('product.ejs', {lang:lang, uid:req.session.uid, basket:req.session.basket, id:id})
	})
	connection.end()
})

//Товары с определенной категории
app.get("/category:id", (req, res) => {
	unitBasket(req)

	let id = req.params.id
	let connection = mysql.createConnection(dbConnect)
	connection.query(`SELECT * FROM shop.category WHERE id = ${id}`, (err, result) => {
		if(err != null){
			console.log('ERROR getCategory: '+err)
			res.send("Возникла ошибка, попробуйте позже")
		}
		else if(result.length < 1) 
			res.render('404.ejs')
		else
			res.render('products.ejs', {lang:lang, uid:req.session.uid, basket:req.session.basket, id:id})
	})
	connection.end()
})

//Вопрос Ответ
app.get("/faq", (req,res) => {
	unitBasket(req)

	res.render('faq.ejs', {lang:lang, uid:req.session.uid, basket:req.session.basket})
})

}