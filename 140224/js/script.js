var dcWidth;
var dcHeight;
var fontArr = ["Open Sans","Paytone One","Nunito","Arial"];
var loop = 0;

document.querySelector(".title").onclick = function(){
	//var rand = Math.floor((Math.random()*(fontArr.length))+1)-1;

	if(loop > (fontArr.length-1)){
		loop = 0;
		this.style.fontFamily = fontArr[loop]+", sans-serif";
	}else{
		this.style.fontFamily = fontArr[loop]+", sans-serif";
		loop++;
	}
}

/*Get document width & height*/
function getSize(){
	dcWidth = document.documentElement.clientWidth;
	dcHeight = document.documentElement.clientHeight;
}
getSize();

/*Update size upon window resizing*/
onresize = function() {
	getSize();
}

/*Mouse detection & change CSS accordingly*/
onmousemove = function () {
	var mouseX = window.event.x;
	var mouseY = window.event.y;
	var relX = 100-(Math.round(100*((dcWidth-mouseX)/dcWidth)));
	var relY = 100-(Math.round(100*((dcHeight-mouseY)/dcHeight)));
	var pos = relX+"% "+relY+"%";
	var tShadow = ((dcWidth/2-mouseX)/(dcWidth/2)*3)+"px "+((dcHeight/2-mouseY)/(dcHeight/2)*3)+"px";
	
	document.querySelector(".title").style.backgroundPosition = relX+"% "+relY+"%";
	document.querySelector(".title").style.textShadow = tShadow+" 0px rgba(255, 255, 255, 0.3)";
	//document.querySelector("#display").innerHTML = tShadow;
}