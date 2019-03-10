module.exports = (app) => {

let productsContoller = require('../controllers/products')
let basketController = require('../controllers/basket')


//Конфиг
app.get("/api", (req,res) => res.send({ ver:'1.0', lang:"ru, en"}))

//Товары всех категорий
app.get("/api/products", productsContoller.allProducts)
//Товары определенной категории
app.get("/api/products/:id", productsContoller.productsCategory)
//Данные о продукте
app.get("/api/product/:id", productsContoller.product)
//Список категорий
app.get("/api/categories", productsContoller.categories)
//Информация о категории с определенным id
app.get("/api/categories/:id", productsContoller.category)

//Корзина
app.get("/api/basket", basketController.get)

let db = require('../db.js')
//Расчет итоговой стоимости
app.get("/api/price", basketController.price)

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