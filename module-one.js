exports.describe = function(){
	return "I'm a commonJS module";
};

console.log("do something immediately");

exports.pokemon =function(req){
	return req;
};