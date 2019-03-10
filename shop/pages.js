let pagesController = require('../controllers/pages')

module.exports = (app, lang) => {
	//Главная страница
	app.get("/", pagesController.home)
	//Каталог
	app.get("/catalog", pagesController.catalog)
	//Полноценная корзина
	app.get("/basket", pagesController.basket)
	//Малая корзина
	app.get("/mbasket", pagesController.smallbasket)
	//Оформление заказа
	app.get("/order", pagesController.order)
	//Данные о продукте
	app.get("/product:id", pagesController.product)
	//Товары с определенной категории
	app.get("/category:id", pagesController.category)
	//Вопрос Ответ
	app.get("/faq", pagesController.faq)
}