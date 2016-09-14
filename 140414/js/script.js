$(function(){
	/* Variables */
	var neighborhood;
	var chicago;
	var fill = "rgba(45,163,16,0.8)";
	var fill_radar1 = "rgba(230,230,230,0.6)";
	var fill_radar2 = "rgba(45,163,16,0.6)";
	var stroke = "rgb(220,220,220)";
	var baseRedH = 4.88;
	var baseRedS = 80.37;
	var baseRedL = 83.92;
	var baseBlueH = 192.29;
	var baseBlueS = 95.02;
	var baseBlueL = 86.67;
	var baseGreenH = 107;
	var baseGreenS = 89;
	var baseGreenL = 63;
	var baseH = baseGreenH;
	var baseS = baseGreenS;
	var baseL = baseGreenL;
	
	/* Data Container */
	//1. Most Spoken Non-English Languages
	var langBarData = {
        labels: [],
        datasets: [{
            fillColor: fill,
            strokeColor: stroke,
            data: []
        }]
    }
	var langBarOption = {
        scaleOverride: true,
        scaleSteps: 6,
        scaleStepWidth: 50000,
        scaleStartValue: 0,
        barValueSpacing: 1,
        barDatasetSpacing: 10,
    };
	var langPieData = [];
	var langPieOption = {
        animationEasing: "easeOutQuint",
	};
	
	//2.Non-English Speakers by Neighborhood
	var speakerBarData = {
        labels: [],
        datasets: [{
            fillColor: fill,
            strokeColor: stroke,
            data: []
        }]
    }
	var speakerBarOption = {
        scaleOverride: true,
        scaleSteps: 6,
        scaleStepWidth: 10,
        scaleStartValue: 0,
        barValueSpacing: 1,
        barDatasetSpacing: 10,
	}
	
	//3.Language Diversity
	var diversityBarData = {
        labels: [],
        datasets: [{
            fillColor: fill,
            strokeColor: stroke,
            data: []
        }]
    }
	var diversityBarOption = {
        scaleOverride: true,
        scaleSteps: 7,
        scaleStepWidth: 5,
        scaleStartValue: 0,
        barValueSpacing: 1,
        barDatasetSpacing: 10,
	}
	var areaProfileData = {
        labels: [],
        datasets: [{
            fillColor: fill_radar1,
            strokeColor: stroke,
            data: []
        },{
            fillColor: fill_radar2,
            strokeColor: stroke,
            data: []
        }]		
	}
	var areaProfileOption = {
        scaleOverride: true,
        scaleSteps: 10,
        scaleStepWidth: 1,
        scaleStartValue: 0,
        barValueSpacing: 1,
        barDatasetSpacing: 10,	
	}
	
	//4.Distribution of Language
	var distributeBarData = {
        labels: [],
        datasets: [{
            fillColor: fill,
            strokeColor: stroke,
            data: []
        }]
    }
	var distributeBarOption = {
        scaleOverride: true,
        scaleSteps: 5,
        scaleStepWidth: 2400,
        scaleStartValue: 0,
        barValueSpacing: 1,
        barDatasetSpacing: 10,
	}
	

	/* Getdata */
	function getData() {
		$.getJSON("data/languages.chicago.json", function(data){
			//console.log(data);
			neighborhood = _.map(data.data, function(el, index){
				return {
					area: el[9],
					predominant: el[10],
					african: el[11],
					arabic: el[12],
					armenian: el[13],
					cambodian: el[14],
					chinese: el[15],
					creole: el[16],
					french: el[17],
					german: el[18],
					greek: el[19],
					gujarati: el[20],
					hebrew: el[21],
					hindi: el[22],
					hmong: el[23],
					hungarian: el[24],
					italian: el[25],
					japanese: el[26],
					korean: el[27],
					laotian: el[28],
					navajo: el[29],
					asian: el[30],
					indic: el[31],
					indoEurpoean: el[32],
					northAmerican: el[33],
					pacificIsland: el[34],
					slavic: el[35],
					westGermanic: el[36],
					persian: el[37],
					polish: el[38],
					portuguese: el[39],
					russian: el[40],
					scandinavian: el[41],
					serbo: el[42],
					spanish: el[43],
					tagalog: el[44],
					thai: el[45],
					unspecified: el[46],
					urdu: el[47],
					vietnamese: el[48],
					yiddish: el[49]
				}
			});
			
			chicago = neighborhood[77];
			neighborhood.pop();
			
			for (var i=0;i<neighborhood.length;i++){
				var begin = neighborhood[i].predominant.indexOf("(")+1;
				var end = neighborhood[i].predominant.indexOf("%");
				neighborhood[i].predomPercent = neighborhood[i].predominant.slice(begin,end);
				var predominant = neighborhood[i].predominant.slice(0,begin-2);
				switch(predominant){
					case "SPANISH":
						predominant = "spanish";
						break;
					case "POLISH":
						predominant = "polish";
						break;
					case "CHINESE":
						predominant = "chinese";
						break;
					case "AFRICAN LANGUAGES":
						predominant = "african";
						break;
				}
				neighborhood[i].predominant = predominant;
			}
			
			/* Language_Bar */
			var langChicago = _.omit(chicago, ["area","predominant"])
			var langChicagoSortedLabel = Object.keys(langChicago).sort(function(a,b){
				return langChicago[a]-langChicago[b];
			});
			var langChicagoSortedTop10 = _.last(langChicagoSortedLabel,10);
			for(var i=0;i<langChicagoSortedTop10.length;i++){
				langBarData.labels.push(langChicagoSortedTop10[i]);
                langBarData.datasets[0].data.push(langChicago[langChicagoSortedTop10[i]]);
			}
			
			/* Language_Pie */
			var langChicagoSortedTop4 = _.last(langChicagoSortedLabel,4);
			for(var i=0;i<langChicagoSortedTop4.length;i++){
				langPieData.push({
					value: parseInt(langChicago[langChicagoSortedTop4[i]]),
					color: 'hsl(' + baseH + ', ' + baseS + '%,' + (baseL - (i * 13)) + '%)'
				});
			}
			var langChicagoRest = _.first(langChicagoSortedLabel, langChicagoSortedLabel.length - 4);
			var remainder = 0;
			for(var i=0;i<langChicagoRest.length;i++){
				remainder += parseInt(langChicago[langChicagoRest[i]]);
			}
			langPieData.push({
				value: remainder,
				color: 'hsl(' + baseH + ', ' + baseS + '%,' + (baseL + 25) + '%)'
			});
			
			/* Speakers */
			var speakerPercent = new Array();
			var speaker = _.sortBy(neighborhood, function(el){
				var totalSpeaker = 
					parseInt(el.african)+
					parseInt(el.arabic)+
					parseInt(el.armenian)+
					parseInt(el.cambodian)+
					parseInt(el.chinese)+
					parseInt(el.creole)+
					parseInt(el.french)+
					parseInt(el.german)+
					parseInt(el.greek)+
					parseInt(el.gujarati)+
					parseInt(el.hebrew)+
					parseInt(el.hindi)+
					parseInt(el.hmong)+
					parseInt(el.hungarian)+
					parseInt(el.italian)+
					parseInt(el.japanese)+
					parseInt(el.korean)+
					parseInt(el.laotian)+
					parseInt(el.navajo)+
					parseInt(el.asian)+
					parseInt(el.indic)+
					parseInt(el.indoEurpoean)+
					parseInt(el.northAmerican)+
					parseInt(el.pacificIsland)+
					parseInt(el.slavic)+
					parseInt(el.westGermanic)+
					parseInt(el.persian)+
					parseInt(el.polish)+
					parseInt(el.portuguese)+
					parseInt(el.russian)+
					parseInt(el.scandinavian)+
					parseInt(el.serbo)+
					parseInt(el.spanish)+
					parseInt(el.tagalog)+
					parseInt(el.thai)+
					parseInt(el.unspecified)+
					parseInt(el.urdu)+
					parseInt(el.vietnamese)+
					parseInt(el.yiddish);
				var totalPop = parseInt(el[el.predominant])/(parseFloat(el.predomPercent)/100);
				var percentage = Math.round(totalSpeaker/totalPop*1000)/10;
				speakerPercent.push(percentage);
				return percentage;				
			});
			speakerPercent.sort(function(a,b){return a-b});
			
			var speakerPercentTop20 = _.last(speakerPercent, 20);
			var speakerTop20 = _.last(speaker, 20);
			
			for(var i=0;i<speakerTop20.length;i++){
				speakerBarData.labels.push(speakerTop20[i].area);
                speakerBarData.datasets[0].data.push(speakerPercentTop20[i]);
			}
			
			/* Diversity */
			var diversity = new Array();
			for(var i=0;i<neighborhood.length;i++){
				diversity.push(0);
				$.each(neighborhood[i],function(key,value){
					if(key!="area"&&key!="predomPercent"&&key!="predominant"){
						if(parseInt(value)!=0){
							diversity[i]+=1;
						}
					}
				})
			}
			$.each(diversity,function(key,value){
				neighborhood[key].diversity = value;
			});
			var diversitySort = _.sortBy(neighborhood,function(el){
				return el.diversity;
			})
			
			var diversityTop5 = _.last(diversitySort,5);
			var diversityBottom5 = _.first(diversitySort,5);
			var diversityUnion = _.union(diversityBottom5,diversityTop5);
			
			for(var i=0;i<diversityUnion.length;i++){
				diversityBarData.labels.push(diversityUnion[i].area);
				diversityBarData.datasets[0].data.push(diversityUnion[i].diversity);
			}
			
			var langFamilyData = new Array(5,6,3,2,6,9);
			var langFamilyData2 = new Array(1,3,4,8,2,5);
			var langFamilyLabel = new Array("Indo-European","Sino-Tibetan","Niger¡VCongo","Afroasiatic","Austronesian","Dravidian");
			
			for(var i=0;i<langFamilyData.length;i++){
				areaProfileData.labels.push(langFamilyLabel[i]);
				areaProfileData.datasets[0].data.push(langFamilyData[i]);
				areaProfileData.datasets[1].data.push(langFamilyData2[i]);
			}
			
			//console.log(diversityUnion);
			
			
			drawGraphs();
		});
	}
	
	function drawGraphs() {

        var ctx1 = document.getElementById("mostLangBarChart").getContext("2d");
        var langBarChart = new Chart(ctx1).Bar(langBarData, langBarOption);

        var ctx2 = document.getElementById("mostLangPieChart").getContext("2d");
        var langPieChart = new Chart(ctx2).Doughnut(langPieData, langPieOption);

        var ctx3 = document.getElementById("speakersChart").getContext("2d");
        var speakersBarChart = new Chart(ctx3).Bar(speakerBarData, speakerBarOption);

        var ctx4 = document.getElementById("diversityChart").getContext("2d");
        var diversityBarChart = new Chart(ctx4).Bar(diversityBarData, diversityBarOption);

        var ctx5 = document.getElementById("AreaProfile").getContext("2d");
        var AreaProfile = new Chart(ctx5).Radar(areaProfileData, areaProfileOption);

    }
	
	
	getData();
})