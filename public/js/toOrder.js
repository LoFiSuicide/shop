let sum = 0
let payments = [
	{id:1, in:true},
	{id:2, in:false}
]

function valid(obj){
	obj.style.border = (obj.value == '' || obj.value == ' ')?"solid 1px red":"solid 1px green"
	return (obj.value == '' || obj.value == ' ')?false:true
}

function setPayment(obj){
	for(pay of payments)
		pay.in = (pay.id == obj.id)?true:false
	setColor()
}

function setColor(){
	for(pay of payments)
		document.getElementById(pay.id).style.backgroundColor = (pay.in == true)?"rgba(0, 140, 12, 0.25)":"#FFF"
}

function getPayment(){
	for(pay of payments)
		if(pay.in == true)
			return pay.id
}

function enterOrder(){
	let error = false

	let payment = getPayment()
	let lastname = document.getElementById('lastname')
	let firstname = document.getElementById('firstname')
	let middlename = document.getElementById('middlename')
	let phone = document.getElementById('phone')
	let city = document.getElementById('city')
	let adress = document.getElementById('adress')
	let products = basket.products

	let order = {
		lastname:lastname.value,
		firstname:firstname.value,
		middlename:middlename.value,
		phone:phone.value,
		city:city.value,
		adress:adress.value,
		payment:payment,
		products:products,
		sum:sum
	}

	if(valid(lastname) == false) error = true
	if(valid(firstname) == false) error = true
	if(valid(middlename) == false) error = true
	if(valid(phone) == false) error = true
	if(valid(city) == false) error = true
	if(valid(adress) == false) error = true

	if(error == false)
		setOrder(order)
}

function setPrice(){
	let req = new XMLHttpRequest()
	req.open('GET', `/api/price`, true)
	req.onload = () => {
		document.getElementById("basketprice").innerHTML = `${JSON.parse(req.response).price} &#8381;`
		sum = JSON.parse(req.response).price
	}
	req.send()
}

setColor()
setPrice()