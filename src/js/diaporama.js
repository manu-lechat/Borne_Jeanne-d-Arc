var currentId =0;
var timer1;
var speed_autoplay = 3000;

var diaporama = function(){

	this.diaporama_startAutoplay = function(){ 	
	    timer1 = setTimeout( this.diaporam_next(), speed_autoplay);
	}


	this.diaporama_stopAutoplay = function(){ 	

	    clearTimeout(timer1);
	}


	this.diaporama_init = function(){ 	

		// insert puces
		document.getElementById('liste_puces').innerHTML = "";
		for(i=0; i<JsonArray.items.length; i++){
			document.getElementById('liste_puces').innerHTML +='<li>&#x25CF;</li>';
		}

		diaporam_showDiapo(0);
	}


	this.diaporam_next = function(){ 	

		console.log("diaporam_next");
		if(currentId<JsonArray.items.length-1){ currentId++;  }else{ currentId = 0; }
		diaporam_showDiapo(currentId);
	}


	this.diaporam_prev = function(){ 	

		console.log("diaporam_prev");
		if(currentId>0){ currentId--; }else{ currentId=JsonArray.items.length-1; }
		diaporam_showDiapo(currentId);
	}


	function diaporam_showDiapo(id){

		var currentId = id;
		var currentItem = JsonArray.items[id];
		// console.log("show diapo num "+id);
		// console.log(JsonArray.items[id].titre_fr);
		//TweenLite.to(".content_fr", 0.2, { opacity:"0", onComplete: function(){ 

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


		/* } });
		TweenLite.to(".content_en", 0.2, { opacity:"0"});
		TweenLite.to(".content_fr", 0.2, { delay:0.2, opacity:"1" });
		TweenLite.to(".content_en", 0.2, { delay:0.2, opacity:"1" });
		*/
		// puces
		$("#liste_puces li" ).removeClass("active");
		document.getElementById("liste_puces").children[id].className = "active";

		// img / videos
		$("#media_container div").each(function() {	this.className = "divToHide"; });

		if(currentItem.type_media=="video"){}
		else{

			document.getElementById("media_container").innerHTML += "<div class='div_to_show'><img  src='media/"+JsonArray.items[id].file+"'><div>"

		}

		TweenLite.fromTo("#media_container .div_to_show", 1, { opacity:"0"},{ opacity:"1", onComplete: function(){

			$("#media_container div.divToHide").each(function() { this.parentNode.removeChild(this); });
		}} );

	}


	function change_coloneGauche_content(){
		
	}


}