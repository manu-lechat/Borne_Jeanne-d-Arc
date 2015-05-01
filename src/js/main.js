var obj_json; 
var JsonArray; 
var currentStep = 0;
var urlJson = "json/borne_JA.json";
var obj_diaporama;
var timer_autoplay;


// Load conf file /////////////////////////////////////////////////////////////
var execPath = '';
function loadConf(callback) {
	var gui = require('nw.gui'),
		fs = require('fs'),
		path = require('path');

	// récuperer le chemin de l'exe
	// la conf et les médias sont à coté
	execPath = path.dirname(process.execPath);
	// sous mac c'est un peu différent
	if (process.platform === 'darwin') {
		execPath = path.join(execPath, '../../../../../..');
	}
	// récupérer le chemin du fichier de conf
	var confPath = path.join(execPath, 'json', 'borne_JA.json');
	// le charger
	fs.readFile(confPath, 'utf-8', function (err, data) {
		if (err) {
			alert('Fichier de configuration manquant!')
		}
		else {
			useJsonDatas(JSON.parse(data));
		}
	});
}
//////////////////////////////////////////////////////////////////////////////


function initMain(){

	console.log("initMain()");
	doNextStep();
}


function doNextStep(){

	currentStep++;
	switch(currentStep){
		case 1: 
			// load conf
			loadConf(function() {});
		break;	
		case 2: 	
			obj_diaporama = new diaporama(execPath);
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



