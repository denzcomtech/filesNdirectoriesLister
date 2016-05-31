var fs = require("fs-extra");
var checkIfDirectory = function(pathFile, callback){
	fs.stat(pathFile, function(error, check) {
		if (!error) {
			if (check.isDirectory()) {
				callback("dir", pathFile);
			} else {
				callback("notdir", pathFile);
			}
		}
	});
};
var readDirectory = function(pathDir, callback) {
	fs.readdir(pathDir, function(err, items) {
		var files = [];
	 	for (var ctr in items) {
	 		if (items[ctr] != undefined) {
	 			// console.log(items[ctr]);
	 			files.push(items[ctr]);
	 		}
	 	}
	 	callback(files, pathDir);
	});
}
module.exports.checkIfDirectory = checkIfDirectory;
module.exports.readDirectory = readDirectory;