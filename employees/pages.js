module.exports = (app, elang, mysql, dbConnect) => {

app.get("/employees", (req, res) => {
	//Если токин равен undefined или не найден в базе тогда загружем авторицацию
	let access = req.session.token == "123456"?()=>{
		//Токен есть в базе 
		res.render('employees/orders.ejs', {elang:elang})
	}:()=>{
		//Токена нет в базе
		res.render('employees/auth.ejs', {elang:elang})
	}
	access()
})

app.post("/employees", (req,res) => {
	console.log(req.body)
	//Делаем запрос в базу через api и если есть пользователь берем токен и записываем в сессию
	//Токен мы будем генерировать при регистрации сотрудника
	req.session.token = "123456"
	req.session.save()
	res.redirect('/employees/')
});

app.get("/employees/catalog", (req,res) => {
	let access = req.session.token == "123456"?()=>{
		res.render('employees/catalog.ejs', {elang:elang})
	}:()=>{
		res.redirect("/employees")
	}
	access()
})

app.get("/employees/album", (req,res) => {
	let access = req.session.token == "123456"?()=>{
		res.render('employees/album.ejs', {elang:elang})
	}:()=>{
		res.redirect("/employees")
	}
	access()
})

app.get("/employees/access", (req,res) => {
	let access = req.session.token == "123456"?()=>{
		res.render('employees/access.ejs', {elang:elang})
	}:()=>{
		res.redirect("/employees")
	}
	access()
})

app.get("/employees/settings", (req,res) => {
	let access = req.session.token == "123456"?()=>{
		res.render('employees/settings.ejs', {elang:elang})
	}:()=>{
		res.redirect("/employees")
	}
	access()
})

}