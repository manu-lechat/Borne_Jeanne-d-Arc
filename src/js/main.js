var obj_json; 
var JsonArray; 
var currentStep = 0;
var urlJson = "json/borne_JA.json";
var obj_diaporama;
var timer_autoplay;

function initMain(){

	console.log("initMain()");
	doNextStep();
}


function doNextStep(){

	currentStep++;
	switch(currentStep){
		case 1: 
			get_json();		
		break;	
		case 2: 	
			obj_diaporama = new diaporama();
			obj_diaporama.diaporama_init();
			obj_diaporama.diaporama_startAutoplay();
			init_listeners();
		break;
	}
}

// LISTENERS ////////////////////////////////////////////////////////////////////////////////////////////

function init_listeners(){  console.log("init_listeners()");

	document.getElementById('arrow_prev').onclick = function() { 
		obj_diaporama.diaporama_prev();
	};

	document.getElementById('arrow_next').onclick = function() { 
		obj_diaporama.diaporama_next();	
	};
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

// RESET ////////////////////////////////////////////////////////////////////////////////////////////

function main_reset(){
	window.location.reload();
}

// init
$( document ).ready(function() { 	initMain(); });



