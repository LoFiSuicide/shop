let db = require('../db.js')

exports.price = (ids, basket, cb) => {
	db.connect((err)=>{
		if(err){
			db.end()
			return cb(err)
		}

		let q = `SELECT * FROM products WHERE id_product IN (${ids})`
		db.get().query(q, (err, result) => {
			if(err != null){
				db.end()
				return cb(err)
			}
			else{
				let sum = 0
				for(product of basket){
					for(prod_info of result){
						if(prod_info.id_product == product.id){
							sum+=prod_info.price*product.col
							break
						}
					}
				}
				cb(null, sum)
			}
		})
		db.end()
	})
}