module.exports = (app) => {
	//catch 404 and forward to error handler
	app.use((req, res, next) => {
		let err = new Error('Not Found')
		err.status = 404
		next(err)
	})
	//error handler
	app.use((err, req, res, next) => {
		//set locals, only providing error in development
		res.locals.message = err.message
		res.locals.error = req.app.get('env') === 'development' ? err : {}
		//render the error page
		res.status(err.status || 500)
		if(err.status == 404)
			res.render('404.ejs')
		else 
			res.send("ERROR, зайдите на страницу позже, наши мускуллистые программисты уже исправляют проблему.")
	})
}