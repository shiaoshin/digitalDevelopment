$(function(){
	var winW = $(window).width();
	var winH = $(window).height();
	var travel = winW * 0.135;
	
	var $frame = $(".frame");
	var $back = $(".frameBack");
	var $list = $(".list");
	var $logo = $("#logo");
	
	var $time = $("#time");
	var $clock = $("#clock");
	var $date = $("#date");

	var $weather = $("#weather");
	var $temp = $("#temp");
	var $humidity = $("#humidity");
	var $icon = $("#icon");
	
	var $social = $("#social");
	var $feed = $("#feed");
	var $status = $("#status");
	
	var $add = $("#add");
	
	var contents = new Array($clock, $date, $temp, $humidity, $icon, $feed, $status, $add);

	var interval = 0.35;

	var angleDiff = 90;//range:1-90
	var rotation = 15;
	
	/* init*/
	$(document).on('pointermove', function(event) {event.preventDefault()});
	
	/* Landing effect*/
	TweenLite.set(logo, {
		alpha: 0,
		scaleX: 1.15,
		scaleY: 1.15,
	});
	TweenLite.to(logo, interval, {
		delay: 0.5,
		alpha: 1,
		scaleX: 1,
		scaleY: 1,
		ease: 'easeInCube'
	});
	
	/* Swipes_logo */
	$logo.on('tap',function(e){
		e.preventDefault();
		logo();
	});
	$logo.on('swipeend',function(e){
		e.preventDefault();
		//swipe left
		if(e.angle > ((rotation+180)-angleDiff/2) && e.angle < ((rotation+180)+angleDiff/2) ){
			logo();
		}
	});
	function logo(){
		TweenLite.to($logo, interval, {
			alpha: 0,
			scaleX: 1.5,
			scaleY: 1.5,
			ease: 'easeOutBack'
		});
		TweenLite.to($frame, interval, {
			delay: 0.25,
			x: -travel,
			ease: 'easeOutBack'
		});
		listShift("6vw");
		backShift(-25,0);
	}
	/* Swipes_time */
	$clock.on('swipeend',function(e){
		//swipe up
		if(e.angle > ((rotation+90)-angleDiff/2) && e.angle < ((rotation+90)+angleDiff/2) ){
			fade(e.target);
			vertical($time,-travel);
			backShift(-25,-25);
		}
		//swipe left
		if(e.angle > ((rotation+180)-angleDiff/2) && e.angle < ((rotation+180)+angleDiff/2) ){
			fade(e.target);
			horizontal($frame,(-2*travel));
			listShift("2.6vw");
			backShift(-50,0);
		}
	});
	$date.on('swipeend',function(e){
		//swipe down
		if(e.angle > ((rotation+270)-angleDiff/2) && e.angle < ((rotation+270)+angleDiff/2) ){
			fade(e.target);
			vertical($time,0);
			backShift(-25,0);
		}
		//swipe left
		if(e.angle > ((rotation+180)-angleDiff/2) && e.angle < ((rotation+180)+angleDiff/2) ){
			fade(e.target);
			horizontal($frame,(-2*travel));
			listShift("2.6vw");
			backShift(-50,-25);
		}
	});
	/* Swipes_weather */
	$temp.on('swipeend',function(e){
		//swipe up
		if(e.angle > ((rotation+90)-angleDiff/2) && e.angle < ((rotation+90)+angleDiff/2) ){
			fade(e.target);
			vertical($weather,-travel);
			backShift(-50,-25);
		}
		//swipe left
		if(e.angle > ((rotation+180)-angleDiff/2) && e.angle < ((rotation+180)+angleDiff/2) ){
			fade(e.target);
			horizontal($frame,(-3*travel));
			listShift("-1.1vw");
			backShift(-75,0);
		}
		//swipe right
		if(e.angle < (rotation+angleDiff/2) || e.angle > (360+rotation-angleDiff/2)){
			fade(e.target);
			horizontal($frame,(-travel));
			listShift("6vw");
			backShift(-25,0);
		}
	});
	$humidity.on('swipeend',function(e){
		fade(e.target);
		//swipe up
		if(e.angle > ((rotation+90)-angleDiff/2) && e.angle < ((rotation+90)+angleDiff/2) ){
			vertical($weather,(-2*travel));
			backShift(-50,-50);
		}
		//swipe down
		if(e.angle > ((rotation+270)-angleDiff/2) && e.angle < ((rotation+270)+angleDiff/2) ){
			vertical($weather,0);
			backShift(-50,0);
		}
		//swipe left
		if(e.angle > ((rotation+180)-angleDiff/2) && e.angle < ((rotation+180)+angleDiff/2) ){
			horizontal($frame,(-3*travel));
			listShift("-1.1vw");
			backShift(-75,-25);
		}
		//swipe right
		if(e.angle < (rotation+angleDiff/2) || e.angle > (360+rotation-angleDiff/2)){
			horizontal($frame,(-travel));
			listShift("6vw");
			backShift(-25,-25);
		}
	});
	$icon.on('swipeend',function(e){
		//swipe down
		if(e.angle > ((rotation+270)-angleDiff/2) && e.angle < ((rotation+270)+angleDiff/2) ){
			fade(e.target);
			vertical($weather,-travel);
			backShift(-50,-25);
		}
		//swipe left
		if(e.angle > ((rotation+180)-angleDiff/2) && e.angle < ((rotation+180)+angleDiff/2) ){
			fade(e.target);
			horizontal($frame,(-3*travel));
			listShift("-1.1vw");
			backShift(-75,-50);
		}
		//swipe right
		if(e.angle < (rotation+angleDiff/2) || e.angle > (360+rotation-angleDiff/2)){
			fade(e.target);
			horizontal($frame,(-travel));
			listShift("6vw");
			backShift(-25,-50);
		}
	});
	/* Swipes_social */
	$feed.on('swipeend',function(e){
		//swipe up
		if(e.angle > ((rotation+90)-angleDiff/2) && e.angle < ((rotation+90)+angleDiff/2) ){
			fade(e.target);
			vertical($social,-travel);
			backShift(-75,-25);
		}
		//swipe left
		if(e.angle > ((rotation+180)-angleDiff/2) && e.angle < ((rotation+180)+angleDiff/2) ){
			fade(e.target);
			horizontal($frame,(-4*travel));
			listShift("-3.2vw");
			backShift(-100,0);
		}
		//swipe right
		if(e.angle < (rotation+angleDiff/2) || e.angle > (360+rotation-angleDiff/2)){
			fade(e.target);
			horizontal($frame,(-2*travel));
			listShift("2.6vw");
			backShift(-50,0);
		}
	});
	$status.on('swipeend',function(e){
		//swipe down
		if(e.angle > ((rotation+270)-angleDiff/2) && e.angle < ((rotation+270)+angleDiff/2) ){
			fade(e.target);
			vertical($social,0);
			backShift(-75,0);
		}
		//swipe left
		if(e.angle > ((rotation+180)-angleDiff/2) && e.angle < ((rotation+180)+angleDiff/2) ){
			fade(e.target);
			horizontal($frame,(-4*travel));
			listShift("-3.2vw");
			backShift(-100,-25);
		}
		//swipe right
		if(e.angle < (rotation+angleDiff/2) || e.angle > (360+rotation-angleDiff/2)){
			fade(e.target);
			horizontal($frame,(-2*travel));
			listShift("2.6vw");
			backShift(-50,-25);
		}
	});
	/* Swipes_add */
	$add.on('swipeend',function(e){
		//swipe right
		if(e.angle < (rotation+angleDiff/2) || e.angle > (360+rotation-angleDiff/2)){
			fade(e.target);
			horizontal($frame,(-3*travel));
			listShift("-1.1vw");
			backShift(-75,0);
		}
	});
	
	/* Functions */
	function horizontal(target,xpos){	
		TweenLite.to(target, interval, {
			delay: 0.25,
			x: xpos,
			ease: 'easeOutBack'
		});
	}
	function vertical(target,ypos){	
		TweenLite.to(target, interval, {
			y: ypos,
			ease: 'easeInQuart'
		});
	}
	function fade(target){
		//reset
		for (var i=0;i<contents.length;++i){
			TweenLite.set(contents[i], {
				alpha: 1,
				scaleX: 1,
				scaleY: 1
			});
		}
		//fade
		TweenLite.to(target, interval, {
			delay: 0.1,
			alpha: 0.3,
			scaleX: 0.7,
			scaleY: 0.7,
			ease: 'easeOutQuart'
		});
	}
	function listShift(goal){
		TweenLite.to($list, interval, {
			delay: 0.3,
			css: {left:goal},
			ease: 'easeOutBack'				
		});
	}
	function backShift(xpos,ypos){
		TweenLite.to($back, interval, {
			delay: 0.3,
			x: xpos,
			y: ypos,
			ease: 'easeOutBack'				
		});
	}
});