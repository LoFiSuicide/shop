module.exports = (app, server) => {

let wss = require('express-ws')(app, server)

let ms = []
app.ws("/", (socket, req) => {

	//console.log(req.session.basket)

	socket.send(`[${ms.slice(-40)}]`)

	socket.on('message', (message) =>{
		ms.push(JSON.stringify({"message":message}))
		for(user of wss.getWss('/').clients)
			user.send(`[${JSON.stringify({"message":message})}]`)

	})
	socket.on('close', (connection) => {
		//Пользователь закрыл соединение
	})
})


app.get("/mess", (req, res) => {
		res.render('ms.ejs')
})

}