$(function(){
	var winW = $(window).width();
	var winH = $(window).height();
	var travel = winW * 0.135;
	
	var frame = $(".frame");
	var logo = $("#logo");
	var instruction = $("#instruction");
	var time = $("#time");
	var weather = $("#weather");
	var arrow = $("#arrow");
	var list = $(".list");

	var navs = $(".nav");
	var nav_up = $(".nav li:nth-of-type(1)");
	var nav_right = $(".nav li:nth-of-type(2)");
	var nav_down = $(".nav li:nth-of-type(3)");
	var nav_left = $(".nav li:nth-of-type(4)");
	
	var interval = 0.4;
	
	var page = 1;
	var level = 1;
	
	/* Landing page*/
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
	
	navs.on('click',function(e){
		if(page==1){
			TweenLite.to(logo, interval, {
				alpha: 0,
				scaleX: 1.5,
				scaleY: 1.5,
				ease: 'easeOutBack'
			});
			TweenLite.to(frame, interval, {
				delay: 0.7,
				x: -travel,
				ease: 'easeOutBack'
			});
			navTrigger(false,true,false,false);
			TweenLite.to(logo, interval, {
				delay: 1,
				onComplete: toggleArr
			});
			page++;
		}
		navs.off('click');
	});
	
	function toggleArr(){
		var src = arrow.attr('src');
		if(src == "img/content_instruction.png"){
			arrow.attr('src','img/content_instruction_2.png');
			TweenLite.to(arrow, interval, {
				alpha: 1,	
				ease: 'easeInQuint',
			});
		}
	}
	
	function navTrigger(sTop,sRight,sDown,sLeft){
		nav_up.off('click');
		nav_right.off('click');
		nav_down.off('click');
		nav_left.off('click');		
		if(!sTop){
			nav_up.off('click');
			TweenLite.to(nav_up, interval, {delay: 0.5, alpha: 0.1, ease: 'easeOutQuint'});
		}else{
			nav_up.on('click', navUp);
			TweenLite.to(nav_up, interval, {delay: 0.5, alpha: 1, ease: 'easeOutQuint'});
		}
		if(!sDown){
			nav_down.off('click');
			TweenLite.to(nav_down, interval, {delay: 0.5,	alpha: 0.1,	ease: 'easeOutQuint'});
		}else{
			nav_down.on('click', navDown);
			TweenLite.to(nav_down, interval, {delay: 0.5,	alpha: 1, ease: 'easeOutQuint'});
		}
		if(!sLeft){
			nav_left.off('click');
			TweenLite.to(nav_left, interval, {delay: 0.5,	alpha: 0.1, ease: 'easeOutQuint'});
		}else{
			nav_left.on('click', navLeft);
			TweenLite.to(nav_left, interval, {delay: 0.5,	alpha: 1, ease: 'easeOutQuint'});
		}
		if(!sRight){
			nav_right.off('click');
			TweenLite.to(nav_right, interval, {delay: 0.5, alpha: 0.1, ease: 'easeOutQuint'});
		}else{
			nav_right.on('click', navRight);
			TweenLite.to(nav_right, interval, {delay: 0.5, alpha: 1, ease: 'easeOutQuint'});
		}		
	}
	
	function navUp(){
		if(level==2){
			TweenLite.to(frame, interval, {
				y: 0,
				ease: 'easeOutBack'
			});
			TweenLite.to(list, interval, {
				css: {top:"15%"},
				ease: 'easeOutBack'
			});
			level--;
			switch(page){
				case 3:
					navTrigger(false,true,true,false);
					break;
				case 4:
					navTrigger(false,true,true,true);
					break;
				case 5:
					navTrigger(false,true,true,true);
					break;
			}			
		}	
	}
	function navDown(){
		if(level==1){
			TweenLite.to(frame, interval, {
				y: -travel,
				ease: 'easeOutBack'
			});
			TweenLite.to(list, interval, {
				css: {top:"48%"},
				ease: 'easeOutBack'
			});
			navTrigger(true,false,false,false);
			level++;
		}
	}
	function navLeft(){
		switch(page){
			case 6:
				TweenLite.to(frame, interval, {
					x: -4*travel,
					ease: 'easeOutBack'
				});
				TweenLite.to(list, interval, {
					css: {left:"62%"},
					ease: 'easeOutBack'
				});
				navTrigger(false,true,true,true);
				page--;
				break;
			case 5:
				TweenLite.to(frame, interval, {
					x: -3*travel,
					ease: 'easeOutBack'
				});
				TweenLite.to(list, interval, {
					css: {left:"51%"},
					ease: 'easeOutBack'
				});
				navTrigger(false,true,true,true);
				page--;
				break;
			case 4:
				TweenLite.to(frame, interval, {
					x: -2*travel,
					ease: 'easeOutBack'
				});
				TweenLite.to(list, interval, {
					css: {left:"40%"},
					ease: 'easeOutBack'
				});
				navTrigger(false,true,true,false);
				page--;
				break;
		}	
	}
	function navRight(){
		switch(page){
			case 2:
				TweenLite.to(frame, interval, {
					x: -2*travel,
					ease: 'easeOutBack'
				});
				navTrigger(false,true,true,false);
				page++;
				break;
			case 3:
				TweenLite.to(frame, interval, {
					x: -3*travel,
					ease: 'easeOutBack'
				});
				TweenLite.to(list, interval, {
					css: {left:"51%"},
					ease: 'easeOutBack'
				});
				navTrigger(false,true,true,true);
				page++;
				break;
			case 4:
				TweenLite.to(frame, interval, {
					x: -4*travel,
					ease: 'easeOutBack'
				});
				TweenLite.to(list, interval, {
					css: {left:"62%"},
					ease: 'easeOutBack'
				});
				navTrigger(false,true,true,true);
				page++;
				break;
			case 5:
				TweenLite.to(frame, interval, {
					x: -5*travel,
					ease: 'easeOutBack'
				});
				TweenLite.to(list, interval, {
					css: {left:"74%"},
					ease: 'easeOutBack'
				});
				navTrigger(false,false,false,true);
				page++;
				break;
		}
	}
});