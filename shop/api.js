let productsContoller = require('../controllers/products')
let basketController = require('../controllers/basket')

module.exports = (app) => {
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
	//Расчет итоговой стоимости
	app.get("/api/price", basketController.price)
	//Добавление продукта в корзину
	app.get("/api/addtobasket:id", basketController.add)
	//Уменьшаем/увеличиваем количество товара
	app.get("/api/editbasket", basketController.edit)
	//Удаление продукта из корзины
	app.get("/api/deletetobasket:id", basketController.delete)
}