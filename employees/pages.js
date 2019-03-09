module.exports = (app, elang, mysql, dbConnect) => {

app.get("/employees/", (req, res) => {
	//Если токин равен undefined или не найден в базе тогда загружем авторицацию
	let access = req.session.token == "123456"?()=>{
		//Токен есть в базе 
		res.render('emp/orders.ejs', {elang:elang})
	}:()=>{
		//Токена нет в базе
		res.render('emp/auth.ejs', {elang:elang})
	}
	access()
})

app.post("/employees/", (req,res) => {
	console.log(req.body)
	//Делаем запрос в базу через api и если есть пользователь берем токен и записываем в сессию
	//Токен мы будем генерировать при регистрации сотрудника
	req.session.token = "123456"
	req.session.save()
	res.redirect('/employees/')
});

}