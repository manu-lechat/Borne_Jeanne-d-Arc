// DATA ////////////////////////////////////////////////////////////////////////////////////////////

var JsonArray = ["init","init"];

var Json_explorer = function(){

	this.load_json = function(urlJson){  

		$.getJSON(urlJson, function(data) {		
			//useJsonDatas(data);

			JsonArray = data;
			doNextStep();
		});
	}

	function useJsonDatas(arr) {

		console.log("useJsonDatas();")
		JsonArray = arr;
	}

	this.get_json = function(){  

		return(JsonArray);
	}



}
