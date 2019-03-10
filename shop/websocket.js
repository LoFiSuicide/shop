let socketController = require('../controllers/websockets')

let ms = []
module.exports = (app, server) => {
	let wss = require('express-ws')(app, server)
	
	app.ws("/", (socket, req) => {
		socket.send(`[${ms.slice(-40)}]`)

		socket.on('message', (message) =>{
			ms.push(JSON.stringify({"message":message}))
			for(user of wss.getWss('/').clients)
				user.send(`[${JSON.stringify({"message":message})}]`)
		})
	})

	app.get("/mess", socketController.page)
}