module.exports = (app, mysql, dbConnect) => {

app.get("/api/orders", (req,res) => {
	let data = (req.query.data)?req.query.data:''
	let phone = (req.query.phone)?req.query.phone:''

	let access = req.session.token == "123456"?()=>{
		res.send({"response":[]})
	}:()=>{
		res.send({"error":"no access"})
	}
	access()
})

app.get("/api/order/:id", (req,res) => {
	let id = req.params.id

	let access = req.session.token == "123456"?()=>{
		res.send({"response":[]})
	}:()=>{
		res.send({"error":"no access"})
	}
	access()
})

app.get("/api/users", (req,res) => {
	let search = (req.query.search)?req.query.search:''

	let access = req.session.token == "123456"?()=>{
		res.send({"response":[]})
	}:()=>{
		res.send({"error":"no access"})
	}
	access()
})

app.get("/api/user/:id", (req,res) => {
	let id = req.params.id

	let access = req.session.token == "123456"?()=>{
		res.send({"response":[]})
	}:()=>{
		res.send({"error":"no access"})
	}
	access()
})

}