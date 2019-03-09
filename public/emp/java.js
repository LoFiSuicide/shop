window.onload = function(){
	window.onresize = function(event){
		if(document.documentElement.clientWidth >= 800){
			document.body.style.overflow='auto'
			document.body.style.margin = "0px 0px 0px 0px"
		}
	}
}

function openmenu(){
	if(document.body.style.marginLeft != "200px"){
		document.body.style.overflow ='hidden'
		document.body.style.margin = "0 0 0 200px"
	}
	else{
		document.body.style.overflow='auto'
		document.body.style.margin = "0px 0px 0px 0px"
	}
	/*Поправляем сафари, который коряво отрисовывает сдвиг страницы*/
	let el = document.getElementById("leftmenu")
	let el2 = document.getElementById("top")
	if(el.style.marginTop == "0px" || el.style.marginTop == ""){
		el.style.marginTop = "-1px"
		el2.style.marginTop = "-1px"
	}
	else{
		el.style.marginTop = "0px"
		el2.style.marginTop = "0px"
	}
}