var currentId =0;
var timer1;
var tweenDiapo;

var diaporama = function(){

	// public functions ////////////////////////////////////////////////////////////////////////////////

	// To init Template 
	this.diaporama_init = function(){ 	

		// insert puces
		document.getElementById('liste_puces').innerHTML = "";
		for(i=0; i<JsonArray.items.length; i++){
			document.getElementById('liste_puces').innerHTML +='<li>&#x25CF;</li>';
		}

		// play first Slide
		diaporama_showDiapo(0);  
	}

	// To start autoplay
	this.diaporama_startAutoplay = function(){ 	

		startAutoplay(); 
	}

	// to call next slide
	this.diaporama_next = function(){ 	

		pause_autoplay(); 
		next(); 	
	}

	this.diaporama_prev = function(){ 	

		pause_autoplay(); 
		prev();	
	}

	// private functions ////////////////////////////////////////////////////////////////////////////////

	// autoplay --- 

	function startAutoplay(){
	    
		clearTimeout(timer1);
		timer1 = null;
	    timer1 = setTimeout( loopAutoplay, 6000);
	    console.log('setTimeout 6');
	}

	function loopAutoplay(){

		startAutoplay();
		next();
	}

	function pause_autoplay(){

		clearTimeout(timer1);
		timer1 = null;
	    timer1 = setTimeout( loopAutoplay, 120000);	    
	    // autoplay will start after 20' of inactivity
	    console.log('setTimeout 20');
	}

	function stop_autoplay(){

		clearTimeout(timer1);
		timer1 = null;
	}


	// controls --- 

	function next(){

		if(currentId<JsonArray.items.length-1){ currentId++;  }else{ currentId = 0; }
		diaporama_showDiapo(currentId);
	}

	function prev(){ 	

		if(currentId>0){ currentId--; }else{ currentId=JsonArray.items.length-1; }
		diaporama_showDiapo(currentId);
	}

	function diaporama_showDiapo(id){

		var currentId = id;
		var currentItem = JsonArray.items[id];

		// txt fr
		document.getElementById('titre_fr').innerHTML = currentItem.titre_fr;
		document.getElementById('txt_fr').innerHTML = currentItem.txt_fr;
		document.getElementById('auteur_fr').innerHTML = currentItem.auteur_fr;
		document.getElementById('source_fr').innerHTML = currentItem.source_fr;
		// txt en
		document.getElementById('titre_en').innerHTML = JsonArray.items[id].titre_en;
		document.getElementById('txt_en').innerHTML = JsonArray.items[id].txt_en;
		document.getElementById('auteur_en').innerHTML = JsonArray.items[id].auteur_en;
		document.getElementById('source_en').innerHTML = JsonArray.items[id].source_en;
		TweenLite.fromTo("#colone_gauche div", 2, { opacity:"0"},{ opacity:"1"});

		// puces
		$("#liste_puces li" ).removeClass("active");
		document.getElementById("liste_puces").children[id].className = "active";

		// img / videos

		$("#media_container div.divToKill_first").each(function() { this.parentNode.removeChild(this); });

		if(currentItem.type_media!="video"){

			// it's a jpg
			console.log('insert jpg');
			// on marque les div existantes pour pouvoir les effacer par la suite
			$("#media_container div").each(function() {	this.className = "divToKill"; });
			// on insère une div contenant l'image à afficher
			document.getElementById("media_container").innerHTML += "<div class='div_to_show'><img  src='media/"+JsonArray.items[id].file+"'></div>"
			// on tween en opacity de 0 à 1 - onComplete, on vire les div marquées
			tweenDiapo = TweenLite.fromTo("#media_container .div_to_show", 3, { opacity:"0"},{ opacity:"1", onComplete: function(){

				if(!tweenDiapo.isActive()){
					$("#media_container div.divToKill").each(function() { this.parentNode.removeChild(this); });
					console.log("delete divToKill");
				}

			}});
		}else{
			// it's a video
			console.log('insert video');
			// 1 - stop autoplay
			stop_autoplay();
			//  2- on gère la dispartition du contenu précédent
			$("#media_container div").each(function() {	this.className = "divToKill"; });
			tweenDiapo = TweenLite.to("#media_container .divToKill", 1, { opacity:"0", onComplete: function(){

				if(!tweenDiapo.isActive()){
					$("#media_container div.divToKill").each(function() { this.parentNode.removeChild(this); });
					console.log("delete divToKill");
				}			

			}});
			// 3 - on insère une div contenant la vidéo à afficher
			var htmlToInsert = "<div class='div_to_show divToKill_first'>";
			htmlToInsert += "	<video id='videoclip' controls='Play, Pause, Seeking' autoplay>";
			htmlToInsert += "	<source  src='media/"+JsonArray.items[id].file+"' type='video/mp4'>";
			htmlToInsert += "	</video>";
			htmlToInsert += "</div>";
			document.getElementById("media_container").innerHTML += htmlToInsert;
			TweenLite.to("#media_container .div_to_show", 2, { opacity:"1" });
			// 4 - on gère la detection de la fin de la vidéo
			var toDoOnEnd = function() { 
				startAutoplay(); ;	
				next();
			}
			document.getElementById("videoclip").addEventListener("ended", toDoOnEnd);
		}

	}


}