let db = require('../db.js')

exports.allProducts = (start = 0, count = 25, search = undefined, cb) => {
	db.connect((err)=>{
		if(err){
			db.end()
			return cb(err)
		}

		let q = (search != undefined)?`SELECT * FROM shop.products LEFT JOIN shop.category ON shop.products.category = shop.category.id WHERE prodname LIKE '%${search}%' LIMIT ${start}, ${count}`:`SELECT * FROM shop.products LEFT JOIN shop.category ON shop.products.category = shop.category.id LIMIT ${start}, ${count}`
		db.get().query(q, (err, result) => {
			cb(err, result)
		})
		db.end()
	})
}

exports.productsCategory = (id, start = 0, count = 25, search = undefined, cb) => {
	db.connect((err)=>{
		if(err){
			db.end()
			return cb(err)
		}

		let q = (search != undefined)?`SELECT * FROM shop.products LEFT JOIN shop.category ON shop.products.category = shop.category.id WHERE category = ${id} AND prodname LIKE '%${search}%' LIMIT ${start}, ${count}`:`SELECT * FROM shop.products LEFT JOIN shop.category ON shop.products.category = shop.category.id WHERE category = ${id} LIMIT ${start}, ${count}`
		db.get().query(q, (err, result) => {
			cb(err, result)
		})
		db.end()
	})
}

exports.product = (id, cb) => {
	db.connect((err)=>{
		if(err){
			db.end()
			return cb(err)
		}

		let q = `SELECT * FROM products WHERE id_product = ${id}`
		db.get().query(q, (err, result) => {
			cb(err, result)
		})
		db.end()
	})
}

exports.categories = (cb) => {
	db.connect((err)=>{
		if(err){
			db.end()
			return cb(err)
		}

		let q = `SELECT * FROM category`
		db.get().query(q, (err, result) => {
			cb(err, result)
		})
		db.end()
	})
}

exports.category = (id, cb) => {
	db.connect((err)=>{
		if(err){
			db.end()
			return cb(err)
		}

		let q = `SELECT * FROM category WHERE id=${id}`
		db.get().query(q, (err, result) => {
			cb(err, result)
		})
		db.end()
	})
}