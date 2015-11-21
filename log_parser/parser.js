//[2015-04-20 15:53:35.176] [INFO] console - HalldeMacBook-Pro.local:3213 request uri: http://cgi.wyy.com/movie/MovieSchedule elapsedTime: 584 ms

process.stdin.setEncoding('utf8');


var start_with_data = function(data){
	var start = data.search(/\[2/);
	if(start===0)return true;
	return false;
};
var parse_line = function(line_array){
	var map = {};
		map.date 	= line_array[0];
		map.time 	= line_array[1];
		map.level 	= line_array[2];
		map.host 	= line_array[5];

	var l = line_array.length;

	var json;

	var msg = line_array.slice(6,l).join(" ");
    try { json = JSON.parse(msg);} catch(err) {}
    if (json !== undefined) {
      map.msg = json;
    }else{
    	map.msg = msg;
    }
	return map;
};
var parse_data = function(data){
		var lines = data.split("\n");
		var temp  = "";

		for(var i=0;i<lines.length;i++){
			var one_line = lines[i];
			var items 	 = one_line.split(" ");
			//如果开始的就是[2015]
			if(start_with_data(items[0])){
				if(temp === ""){
					temp = temp + one_line;
				}else{
					var log_struct = parse_line(temp.split(" "));
					temp = "";
					console.log(log_struct);						
				}
			}else{
				if(temp === ""){

				}else{
					temp = temp + one_line;
				}
			}
		}

};


process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
  	parse_data(chunk)
    //process.stdout.write('data: ' + chunk);
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});