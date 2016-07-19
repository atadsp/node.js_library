var fs = require("fs");
var out;

console.log(__dirname);

fs.realpath(__dirname, function(err, path){
	if(err){
		console.log(err);
		return;
	}
	console.log('realpath async: ' + path);
})