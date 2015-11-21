console.log("Hello World from index.js");



$(document).ready(function(){
	var get_data = function(){
			$.get("/metrics",function(data){
				console.log(data);
			});
	};

	setInterval(function(){
			get_data();
	},10000);

});//END of $(document).ready