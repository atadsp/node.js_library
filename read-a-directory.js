var fs = require("fs");
var out;

console.log(__dirname);

fs.realpath(__dirname, function(err, path){
	if(err){
		console.log(err);
		return;
	}
	console.log('realpath async: ' + path);
});

out =fs.realpathSync(__dirname);
console.log('real path sync', out);

fs.stat(__dirname, function(err, contents){
	if (err) return;

		console.log(contents);
});