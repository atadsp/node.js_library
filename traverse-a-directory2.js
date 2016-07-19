var os = require("os");
var fs = require("fs");

function traverseDirectory(startDir, usePath, callback){
	if(arguments.length === 2 && typeof arguments[1] === "function"){
		callback = usePath;
		usePath = false;
	}

var parsedDirectory = [];

	fs.readdir(startDir, function(err, dirList){
			if (err) {
				return callback(err);
			}

			if (usePath){
				startDir = fs.realpathSynch(startDir);
			}

			var listlength = dirList.length;

			if(!listlength){
				return callback(null, parsedDirectory);
			}
		dirList.forEach(function(file){
			file = startDir + (os.platform() === "win32" ? '\\': '/') + file;
			fs.stat(file, function(err, stat){
				if (err){
					callback(err);
				}

				parsedDirectory.push(file);

				if (stat && stat.isDirectory()){
					traverseDirectory(file, function(err, parsed){
						parsedDirectory = parsedDirectory.concat(parsed);

						if(!-- listlength){
							callback(null, parsedDirectory);
						}
					});
				if(!-- listlength){
					callback(null, parsedDirectory);
				}
			});
		});
	});
}

args = process.argv.splice(2);

if (args.length ===0){
	console.log ("please provide a start directory");
}

args.forEach(function(arg){
	traverseDirectory(arg, function(err, result){
		if(err){
			console.log(err);
		}
		console.log(result);
	});
});