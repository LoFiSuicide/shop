//Корзина (добавление, удаление, id продуктов)
let basket
import('/js/basket.js').then(
	module => {
		basket = new module.Basket
	})
	.catch(err => {
		console.log(err)
	}
)

window.onload = () => {
	const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
	HeaderOpacity(scrollTop)
	btnTop(scrollTop)
}
//Отслеживаем позицию на экране, для отображения кнопки наверх и просрачности меню
window.onscroll = () => {
	const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
	HeaderOpacity(scrollTop)
	btnTop(scrollTop)
}
//Отслеживаем позицию на экране, для открытия корзины
window.onmousemove = (event) => {
	if(event.target.id == 'basket_icon' && document.getElementById("showbasket").style.display == 'none')
		showAjax(document.getElementById("showbasket"), "/mbasket")
	else if(event.target.id != 'basket_icon' && event.target.id != 'showbasket' && 
		event.target.id != 'basketel' && event.target.id != 'basketprice')
		hideElement(document.getElementById("showbasket"))
}
//Закроем меню при нажатии вне меню
window.onclick = (event) => {
	let menu = document.getElementById("fullsmallmenu")
	if(menu.style.display == 'block' && event.target.id != 'smallmenu' && event.target.id != 'smenu'){
		document.body.style.overflow = 'auto'
		menu.style.display = 'none'
		document.body.style.margin = "0px 0px 0px 0px"
		document.getElementById("header").style.width = "100%"
		document.getElementById("smallmenu").style.marginRight = "30px"
	}
}

function btnTop(scrolled){
	if(scrolled > 200) 
		document.getElementById("up").style.display = 'block'
	if(scrolled < 100)
		document.getElementById("up").style.display = 'none'
}

function div(val, by){
	return (val - val % by) / by
}

function toUp(){
	let top = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
	let toTop = setInterval(()=> {
		window.pageYOffset += -top/30
		document.documentElement.scrollTop += -top/30
		document.body.scrollTop += -top/30
		if(Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) == 0) 
			clearInterval(toTop)
	}, 1)
}

function HeaderOpacity(scrolled){
	document.getElementById("header").style.background = `rgba(31, 31, 31, ${scrolled/10})`
}

function blackon(id){
	document.getElementById(`blackproduct${id}`).style.display = 'block'
	document.getElementById(`addtobasket${id}`).style.display = 'block'
}

function blackoff(id){
	document.getElementById(`blackproduct${id}`).style.display = 'none'
	document.getElementById(`addtobasket${id}`).style.display = 'none'
}

function addtobasket(id){
	document.getElementById("basketinfo").innerHTML = basket.count() + 1
	basket.add(id)
}

function showAjax(obj, url){
	var req = new XMLHttpRequest()
	req.open('GET', url, true)
	req.onload = () => {
			obj.innerHTML = req.responseText
			obj.style.display = "block"
	}
	req.send()
}
function hideElement(obj){
	obj.style.display = 'none'
	obj.innerHTML = ''
}

function deletetobasket(id){
	let product = basket.product
	document.getElementById("basketinfo").textContent = basket.count() - basket.prodcount(id)
	basket.delete(id)
}

function smallmenu(){
	let el = document.getElementById("fullsmallmenu")
	if(el.style.display == 'none' || el.style.display == ''){
		el.style.display = 'block'
		document.body.style.overflow='hidden'
		document.getElementById("smallmenu").style.marginRight="3rem"
		document.body.style.margin = "0 0 0 -32rem"
		document.getElementById("header").style.width="101%"
	}
	else{
		el.style.display = 'none'
		document.body.style.overflow='auto'
		document.body.style.margin = "0px 0px 0px 0px"
		document.getElementById("smallmenu").style.marginRight="30px"
		document.getElementById("header").style.width="100%"
	}
}

function like(id){
	let divlike = document.getElementById(`like${id}`)
	if(divlike.style.backgroundImage != 'url("img/like2.png")'){
		divlike.style.backgroundImage = 'url("img/like2.png")'
		//Тут будет ajax на добавление лайка
	}
	else{
		divlike.style.backgroundImage = 'url("img/like.png")'
		//Тут будет ajax на удаление лайка
	}
}

function getCategory(){
	document.getElementById("loading").style.display = "block"
	const app = document.getElementById('page')

	app.appendChild(document.createElement('h1'))
		.textContent = 'Каталог'
	const fgrid = app.appendChild(document.createElement('div'))
	fgrid.setAttribute('class', 'fgrid')

	var req = new XMLHttpRequest()
	req.open('GET', '/api/categories', true)
	req.onload = () => {
		let data = JSON.parse(req.response)
		if((req.status >= 200 && req.status < 400) || req.readyState == 4 || statusText == 'OK'){
			let res = ''
			if(data.error == undefined )
				res = data.response

			document.getElementById("loading").style.display = "none"
			res.forEach(movie => {
				const a = fgrid.appendChild(document.createElement('a'))
				a.setAttribute('href', `category${movie.id}`)

				const product = a.appendChild(document.createElement('div'))
				product.setAttribute('class', 'product')
				product.setAttribute('style', `background-image:url(/gallery/${movie.id_photos})`)

				const prText = product.appendChild(document.createElement('div'))
				prText.setAttribute('class', 'prodtext')
				prText.innerHTML = ''+`${movie.name}`
			})
		} else
			console.log('error: api dont work')
	}
	req.send()
}

function getProducts(category_id){
	document.getElementById("loading").style.display = "block"
	const app = document.getElementById('page')
	const h1 = app.appendChild(document.createElement('h1'))
	const fgrid = app.appendChild(document.createElement('div'))
	fgrid.setAttribute('class', 'fgrid')

	//Заголовок категории
	let getCatReq = new XMLHttpRequest()
	getCatReq.open('GET', `/api/categories/${category_id}`, true)
	getCatReq.onload = () => {
		let data = JSON.parse(getCatReq.response)
		let res = []
		if(data.error == undefined )
			res = data.response
		h1.textContent = res[0].name
	}
	getCatReq.send()

	//Получим товары категории
	let req = new XMLHttpRequest()
	req.open('GET', `/api/products/${category_id}`, true)
	req.onload = () => {
		let data = JSON.parse(req.response)
		if ((req.status >= 200 && req.status < 400 && data.length > 0)|| req.readyState == 4 || statusText == 'OK'){
			let res = ''
			if(data.error == undefined )
				res = data.response

			res.forEach(movie => {
				const product = fgrid.appendChild(document.createElement('div'))
				product.style.display = 'none'
				product.setAttribute('class', 'product')
				product.setAttribute('style', `background-image:url(/gallery/${movie.photos_id})`)
				product.setAttribute('onmouseover', `blackon(${movie.id_product})`)
				product.setAttribute('onmouseout', `blackoff(${movie.id_product})`)

				const blackproduct_a = product.appendChild(document.createElement('a'))
				blackproduct_a.setAttribute('href', `/product${movie.id_product}`)
				const blackproduct = blackproduct_a.appendChild(document.createElement('div'))
				blackproduct.setAttribute('class', 'blackproduct')
				blackproduct.setAttribute('id', `blackproduct${movie.id_product}`)

				const addtobasket_a = product.appendChild(document.createElement('a'))
				addtobasket_a.setAttribute('href', '#')
				addtobasket_a.setAttribute('onclick', `addtobasket(${movie.id_product});return false;`)
				const addtobasket = addtobasket_a.appendChild(document.createElement('div'))
				addtobasket.setAttribute('class', 'addtobasket')
				addtobasket.setAttribute('id', `addtobasket${movie.id_product}`)

				const prodtext_a = product.appendChild(document.createElement('a'))
				prodtext_a.setAttribute('href', `/product${movie.id_product}`)
				const prodtext = prodtext_a.appendChild(document.createElement('div'))
				prodtext.setAttribute('class', 'prodtext')
				prodtext.textContent = movie.prodname

				const price = product.appendChild(document.createElement('div'))
				price.setAttribute('class', 'price')
				price.innerHTML = `${movie.price} &#8381;`

				const like = product.appendChild(document.createElement('div'))
				like.setAttribute('class', 'like')
				like.innerHTML = `<a href="#like"><span class="like_icon"></span></a>${movie.price}`

				product.style.display = 'block'
				document.getElementById("loading").style.display = "none"
			})
		} else
			console.log('error: api dont working')
	}
	req.send()
}

function getProd(id, obj){
	const app = document.getElementById(obj)
	document.getElementById("loading").style.display = "block"

	let req = new XMLHttpRequest()
	req.open('GET', `/api/product/${id}`, true)
	req.onload = () => {
		let data = JSON.parse(req.response)
		if ((req.status >= 200 && req.status < 400 && data.length > 0) || req.readyState == 4 || req.statusText == 'OK'){
			let res = ''
			if(data.error == undefined )
				res = data.response

			document.getElementById("loading").style.display = "none"
			res.forEach(movie => {
				//Шапка товара
				const fgrid = app.appendChild(document.createElement('div'))
				fgrid.setAttribute('class', 'fgrid')

				const images = fgrid.appendChild(document.createElement('div'))
				images.setAttribute('class', 'product bigprod')
				images.setAttribute('style', `background-image:url(/gallery/${movie.photos_id})`)

				const info = fgrid.appendChild(document.createElement('div'))
				info.setAttribute('class', 'bogprod_info')

				info.appendChild(document.createElement('h1'))
					.textContent = movie.prodname

				const description = info.appendChild(document.createElement('div'))
				description.setAttribute('class', 'bigprod_description')
				const des = description.appendChild(document.createElement('div'))
				des.setAttribute('class', 'bigprod_des')
				des.textContent = 'Описание товара'
				const destext = description.appendChild(document.createElement('div'))
				destext.setAttribute('class', 'bigprod_des_text')
				destext.textContent = movie.description
				const author = destext.appendChild(document.createElement('div'))
				author.setAttribute('class', 'author')
				author.innerHTML = 'Автор стикерпака: <a href="http://instagram.com/a.evstegneev">Евстегнеев А.З.</a>'

				const addblock = info.appendChild(document.createElement('div'))
				addblock.setAttribute('class', 'bigprod_add')
				const like_a = addblock.appendChild(document.createElement('a'))
				like_a.setAttribute('href', '#')
				like_a.setAttribute('onclick', `like(${movie.id_product});return false;`)
				const like = like_a.appendChild(document.createElement('div'))
				like.setAttribute('id', `like${movie.id_product}`)
				like.setAttribute('class', 'btn bigprod_like')

				const add_a = addblock.appendChild(document.createElement('a'))
				add_a.setAttribute('href', '#')
				add_a.setAttribute('onclick', `addtobasket(${movie.id_product});return false;`)
				const add = add_a.appendChild(document.createElement('div'))
				add.setAttribute('class', 'btn bigprod_addtobasket')
				add.textContent = 'Добавить в корзину'

				const price = addblock.appendChild(document.createElement('div'))
				price.setAttribute('class', 'bigprod_price')
				price.innerHTML = `${movie.price} &#8381;`

				//Подробное описание
				const fullinfo = app.appendChild(document.createElement('div'))
				fullinfo.setAttribute('class', 'full_info home_description')

				const tblock1 = fullinfo.appendChild(document.createElement('div'))
				const tblock2 = fullinfo.appendChild(document.createElement('div'))
				tblock1.innerHTML = '<h3>Полная информация о товаре</h3>nfkkdsnfka nsdkfhaksdhf lkashdfk jashdf kahsdkf haahsd fklahsd kflhaskdhf jakshdf klahsdflk ahsdkf hasdfasdf askdhf kashdfkl ahsdkf haskjdhf asdhf asdf kahsdkfhaskdfh asdlfkah sdkfhaskjdhf aksdfhasdf asfhd aksdhf kjashdf kashdfkja hskdfh asdf asdjfh aslkdhf aksdhf asdf askdj fh alskdhf jashdfkj ashdfk ashdf asdf asdjf hasdlkfh askdhf askdjhf sdafajsd f'
				tblock2.innerHTML = '<h3>Отзывы </h3>ыра лыврфалр ыфвлар флыврал fg ksdfhgkash flkghsd kfhaksd fasdhf kashdf kahsdkfh askjdhf ksdhfk asdf jaksdhf lasdkfhalk sdf  hasdkjf haskjfh kashf asd fhaksdh fkasdhf kalsdfkh aslkdfh aksdjfh asfd asdhfasdf ahsdfh alksdf kaskdfh asldkfh asdfasdf sadf asdf asdf asdfv ajshdflkasdkfj asdf askd hfakshdfkjahskdfhasdhfa;sljdf alsdfj asdjfh alksdhfk jahsdfk hask;df hlahskdfh asdjkf haskdh fkjashdkfj ahskjdhfkjashdf asdf asdh fkhaskdlfh jashdf kjahsf;;askfdh '

				//Контакты
				app.appendChild(document.createElement('h1'))
					.textContent = 'Contacts'

				const contacts = app.appendChild(document.createElement('div'))
				contacts.setAttribute('class', 'bottom_info home_description')

				const map = contacts.appendChild(document.createElement('div'))
				map.setAttribute('class', 'map')
				map.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2182.3759495548857!2d60.595515316198835!3d56.839494980857936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43c16e8a9d2a7555%3A0xd3923d859106706a!2z0YPQuy4gOCDQnNCw0YDRgtCwLCA0LCDQldC60LDRgtC10YDQuNC90LHRg9GA0LMsINCh0LLQtdGA0LTQu9C-0LLRgdC60LDRjyDQvtCx0LsuLCA2MjAwMTQ!5e0!3m2!1sru!2sru!4v1543527274627" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>'

				contacts.appendChild(document.createElement('div'))
					.innerHTML = 'Adress: <br> 8 march st., 4 <br><br>Tel: <br>89090207012'
			})
		} else
			console.log('error: api dont working')
	}
	req.send()
}

function openVK(){
	let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
	if((/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))|| width < 1024)
		window.open('https://vk.com/im?sel=-169908877')
	else
		widget.expand()
}

function setOrder(order){
		console.log(order)
		//отправляем post в api на дабавление заказа
		//отправляем на оплату человека если тип оплаты это банковская карточка
}