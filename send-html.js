var http = require('http');

var server = http.createServer(function(req, res){

	res.setHeader('Content-Type', 'text/html');
	res.writeHead(200, 'woot');
	res.write('<!doctype html>');
	res.write('<html>');
	res.write('<head> <meta charset="utf-8"> </head>');
	res.write('<body>');
	res.write('<h2> Hello World </h2>');
	res.write('</body> </html>');
	res.end();
});

server.listen(8080, function(){
	console.log('its working! ITS WORKING!');
});
