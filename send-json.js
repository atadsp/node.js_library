var http = require('http');

var server = http.createServer(function(request, response){
	response.setHeader('Content-Type', 'application/json');
	response.writeHeader(200, 'json content');
	response.write('{"wizard1" : "mithrandir"}');
	response.end();
});

server.listen(8080, function(){
	console.log('exicute order 66');
});