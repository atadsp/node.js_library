var http = require('http');

var server = http.createServer(function(req, res){
	res.write("hello");
	res.end();
});

server.listen(8080);