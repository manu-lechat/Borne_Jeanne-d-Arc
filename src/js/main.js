var obj_json; 
var JsonArray; 
var currentStep = 0;
var urlJson = "data/borne_JA.json";
var obj_diaporama;
var timer_autoplay;
function initMain(){

	console.log("init main");
	doNextStep();
// ("data/borne_JA.json"
	//initDiaporama();
}


function doNextStep(){

	currentStep++;
	switch(currentStep){
		case 1: 
			console.log("step1");
			get_json();		
		break;	
		case 2: 	
			obj_diaporama = new diaporama();
			obj_diaporama.diaporama_init();
			doNextStep();
		break;
		case 3: 	
			init_listeners();
			init_setTimeOut_autoplay();
		break;
	}
}



function init_listeners(){  console.log("init_listeners()");


	document.getElementById('arrow_prev').onclick = function() { 
		obj_diaporama.diaporama_stopAutoplay();	
		obj_diaporama.diaporam_prev();
		init_setTimeOut_autoplay();
	};

	document.getElementById('arrow_next').onclick = function() { 
		obj_diaporama.diaporama_stopAutoplay();	
		obj_diaporama.diaporam_next();	
		init_setTimeOut_autoplay();
	};
}


function init_setTimeOut_autoplay(){


    clearTimeout(timer_autoplay);
	timer_autoplay = setTimeout( start_diaporama_autoplay(), 10000);

}

function start_diaporama_autoplay(){

	console.log("start autoplay");
	obj_diaporama.diaporama_startAutoplay();
}







// JSON ////////////////////////////////////////////////////////////////////////////////////////////

function get_json(){

	$.getJSON(urlJson, function(data) {
		useJsonDatas(data);
	});
}

function useJsonDatas(arr) {
	JsonArray = arr;
	doNextStep();
}

// JSON ////////////////////////////////////////////////////////////////////////////////////////////





function main_reset(){
	window.location.reload();
}

// init
$( document ).ready(function() { 	initMain(); });



