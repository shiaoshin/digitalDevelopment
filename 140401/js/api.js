$(function(){
	var d = new Date();

	var date = d.getDate();
	var month = d.getMonth();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var year = d.getFullYear();
	var day = d.getDay();
	var ampm;
	
	var $clock = $("#clock .wrapper");
	var $date = $("#date .wrapper");
	var $temp = $("#temp .wrapper")
	var $humid = $("#humidity .wrapper")
	var $icon = $("#icon .wrapper")
	
	/* process */
	month++;
	
	if(hour>11){
		ampm = "PM";
		if(hour != 12){
			hour -= 12;
		}
	}else{
		ampm = "AM"
	}
	if(hour<10){hour = "0"+hour};
	
	if(minute<10){minute = "0"+minute};
	
	switch (day){
		case 1:
			day = "MON";
			break;
		case 2:
			day = "TUE";
			break;
		case 3:
			day = "WED";
			break;
		case 4:
			day = "THU";
			break;
		case 5:
			day = "FRI";
			break;
		case 6:
			day = "SAT";
			break;
		case 0:
			day = "SUN";
			break;
	}

	$clock.html(
		"<span class='led-dig_"+hour.toString()[0]+"'></span>"+
		"<span class='led-dig_"+hour.toString()[1]+"'></span>"+
		"<span class='led-dig_colon'></span>"+
		"<span class='led-dig_"+minute.toString()[0]+"'></span>"+
		"<span class='led-dig_"+minute.toString()[1]+"'></span>"+
		"<p class='foot'>"+ampm+"</p>"
	)
	
	if(date.toString().length>1){
		$date.html(
			"<span class='led-dig_"+month.toString()+"'></span>"+
			"<span class='led-dig_slash'></span>"+
			"<span class='led-dig_"+date.toString()[0]+"'></span>"+
			"<span class='led-dig_"+date.toString()[1]+"'></span>"+
			"<p class='foot'>"+day+" "+year+"</p>"
		)		
	}else{
		$date.html(
			"<span class='led-dig_"+month.toString()+"'></span>"+
			"<span class='led-dig_slash'></span>"+
			"<span class='led-dig_"+date.toString()+"'></span>"+
			"<p class='foot'>"+day+" "+year+"</p>"
		)	
	}
	
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Chicago,%20IL&units=imperial", function(data){
		$temp.html(
			"<span class='led-dig_"+data.main.temp.toString()[0]+"'></span>"+
			"<span class='led-dig_"+data.main.temp.toString()[1]+"'></span>"+
			"<span class='led-dig_F'></span>"+
			"<p class='foot'>"+data.name+"</p>"
		)
		$humid.html(
			"<span class='led-dig_"+data.main.humidity.toString()[0]+"'></span>"+
			"<span class='led-dig_"+data.main.humidity.toString()[1]+"'></span>"+
			"<span class='led-dig_percentage'></span>"+
			"<p class='foot'>Humidity</p>"		
		)
		$icon.html(
			"<img src='img/weather_"+data.weather[0].icon+".png'>"+
			"<p class='foot'>"+data.weather[0].main+"</p>"
		)
	});
});