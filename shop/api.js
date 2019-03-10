module.exports = (app) => {

let db = require('../db.js')

//Конфиг
app.get("/api", (req,res) => {
	res.send({ ver:'1.0', lang:"ru, en"})
})

//Корзина
app.get("/api/basket", (req,res) => {
	res.send(req.session.basket)
})

//Данные о товаре
app.get("/api/product/:id", (req,res) => {
	let id = req.params.id

	db.connect((err)=>{
		if(err)
			return console.log(err)

		let q = `SELECT * FROM products WHERE id_product = ${id}`
		db.get().query(q, (err, result) => {
			if(err != null){
				console.log(`ERROR getCategory: ${err}`)
				res.send({error: true})
			}
			else
				res.send({response:result})
		})
		db.end()
	})
})

//Товары определенной категории
app.get("/api/products/:id", (req,res) => {
	let search = (req.query.search)?req.query.search:undefined
	let id = req.params.id
	let start = 0
	let count = 25
	if(req.query.start != undefined) start = req.query.start
	if(req.query.count != undefined) count = req.query.count

	db.connect((err)=>{
		if(err)
			return console.log(err)

		let q = (search != undefined)?`SELECT * FROM shop.products LEFT JOIN shop.category ON shop.products.category = shop.category.id WHERE category = ${id} AND prodname LIKE '%${search}%' LIMIT ${start}, ${count}`:`SELECT * FROM shop.products LEFT JOIN shop.category ON shop.products.category = shop.category.id WHERE category = ${id} LIMIT ${start}, ${count}`

		db.get().query(q, (err, result) => {
			if(err != null){
				console.log(`ERROR getCategory: ${err}`)
				res.send({error: true})
			}
			else
				res.send({response:result})
		})
		db.end()
	})
})

//Товары всех категорий
app.get("/api/products", (req,res) => {
	let search = (req.query.search)?req.query.search:undefined
	let start = 0
	let count = 25
	if(req.query.start != undefined) start = req.query.start
	if(req.query.count != undefined) count = req.query.count

	db.connect((err)=>{
		if(err)
			return console.log(err)

		let q = (search != undefined)?`SELECT * FROM shop.products LEFT JOIN shop.category ON shop.products.category = shop.category.id WHERE prodname LIKE '%${search}%' LIMIT ${start}, ${count}`:`SELECT * FROM shop.products LEFT JOIN shop.category ON shop.products.category = shop.category.id LIMIT ${start}, ${count}`
		db.get().query(q, (err, result) => {
			if(err != null){
				console.log(`ERROR getCategory: ${err}`)
				res.send({error: true})
			}
			else
				res.send({response:result})
		})
		db.end()
	})
})

//Список категорий
app.get("/api/categories", (req,res) => {
	db.connect((err)=>{
		if(err)
			return console.log(err)
		let q = 'SELECT * FROM category'
		db.get().query(q, (err, result) => {
			if(err != null){
				console.log(`ERROR getCategory: ${err}`)
				res.send({error: true})
			}
			else
				res.send({response:result})
		})
		db.end()
	})
})

//Информация о категории с определенным id
app.get("/api/categories/:id", function(req,res){
	db.connect((err)=>{
		if(err)
			return console.log(err)
		let q = `SELECT * FROM category WHERE id=${req.params.id}`
		db.get().query(q, (err, result) => {
			if(err != null){
				console.log('ERROR getCategory: '+err)
				res.send({error: true})
			}
			else
				res.send({response:result})
		})
		db.end()
	})
})

//Расчет итоговой стоимости
app.get("/api/price", (req,res) => {
	let ids = ""
	for(product of req.session.basket){
		ids += `${product.id},`
	}
	db.connect((err)=>{
		if(err)
			return console.log(err)

		let q = `SELECT * FROM products WHERE id_product IN (${ids}0)`
		db.get().query(q, (err, result) => {
			if(err != null){
				console.log(`ERROR getCategory: ${err}`)
				res.send({error: true})
			}
			else{
				let sum = 0
				for(product of req.session.basket){
					for(prod_info of result){
						if(prod_info.id_product == product.id){
							sum+=prod_info.price*product.col
							break
						}
					}
				}
				res.send({price:sum})
			}
		})
		db.end()
	})
})

//Уменьшаем/увеличиваем количество товара
app.get("/api/editbasket", (req,res) => {
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
})

//Добавление продукта в корзину
app.get("/api/addtobasket:id", (req,res) => {
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
})

//Удаление продукта из корзины
app.get("/api/deletetobasket:id", (req,res) => {
	let id = req.params.id
	let search = 0
	for(i in req.session.basket){
		if(req.session.basket[i].id == id)
			req.session.basket.splice(i, 1)
	}
	req.session.save()
	res.send({status:true})
})

}