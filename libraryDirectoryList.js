var fs = require("fs-extra");
var lrc = require("./libraryReadCheck");
// var pathDir = "/Users/wasabe/test/jhg";
var pathDir = "/Users/wasabe/test/ggg/try";
var directory = function(pathDirectory, reorntre, callback){
	var allDir = [];
	var holdTask = 0;
	var tempHoldTask = 0;
	allDir.push(pathDirectory);
	function getAllDirectory(path) {
		lrc.readDirectory(path, function(items, pathDir) {
			holdTask += 1;
			for (var ctr in items) {
				if (fs.statSync(path + "/" + items[ctr]).isDirectory()) {
					allDir.push(path + "/" + items[ctr]);
					if (reorntre == "recursive") {
						tempHoldTask += 1;
						getAllDirectory(path + "/" + items[ctr]);
					}
				}
			}
			if (holdTask == tempHoldTask) {
				callback(allDir);
			}
			if (tempHoldTask == 0) {
				callback(allDir);
			}
		});
	}

	getAllDirectory(pathDirectory);	
};

// directory(pathDir, function(a) {
// 	console.log(a);
// });

module.exports.directory = directory;
