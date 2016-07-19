

var os = require('os');
var fs = require('fs');

function traverseDirectory(startDir, usePath, callback) {

	if (arguments.length === 2 && typeof arguments[1] === "function" ) {
		callback = arguments[1];
		usePath = false;
	}

	// hold an array of whats in the directory
	var parsedDirectory = [];

	// startDirectory, callback
	fs.readdir(startDir, function(err, dirList) {
		if (err) {
			return callback(err);
		}

		if (usePath) {
			startDir = fs.realpathSync(startDir);
		}

		var listlength = dirList.length;

		if (!listlength) {
			return callback(null, parsedDirectory);
		}

		// loop through directory list
		dirList.forEach(function( file ) {
			// windows is special
			file = startDir + (os.platform() === 'win32' ? '\\' : '/') + file;

			fs.stat(file, function(err, stat) {
				if (err) {
					callback(err);
				}

				// note directory for file
				parsedDirectory.push(file);

				// recurse if directory
				if (stat && stat.isDirectory()) {
					traverseDirectory(file, function(err, parsed) {
						// read this directory into our output
						parsedDirectory = parsedDirectory.concat(parsed);

						// check to see if we're at the end of our search
						if (!--listlength) {
							callback(null, parsedDirectory);
						}
					});
				} else {
					// check to see if we're at the end of our search
					if (!--listlength) {
						callback(null, parsedDirectory);
					}
				}
			});

		});

	});
}


args = process.argv.splice(2);

if (args.length === 0) {
	console.log("please provide a start directory" );
}

args.forEach(function(arg) {

	traverseDirectory(arg, function(err, result) {
		if (err) {
			console.log(err);
		}

		console.log(result);
	});

	// use full path
	traverseDirectory(arg, true, function(err, result) {
		if (err) {
			console.log(err);
		}

		console.log(result);
	});
});