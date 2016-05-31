var fs = require("fs-extra");
var lrc = require("./libraryReadCheck");
var pathDir = "/Users/wasabe/test/jhg";
// var pathDir = "/Users/wasabe/test/ggg/try";
var files = function(pathDirectory, callback){
	var allDir = [];
	var holdTask = 0;
	var tempHoldTask = 0;
	allDir.push(pathDirectory);
	function getAllDirectory(path) {
		lrc.readDirectory(path, function(items, pathDir) {
			holdTask += 1;
			for (var ctr in items) {
				if (fs.statSync(path + "/" + items[ctr]).isDirectory()) {
					tempHoldTask += 1;
					allDir.push(path + "/" + items[ctr]);
					getAllDirectory(path + "/" + items[ctr]);
				}
			}
			if (holdTask == tempHoldTask) {
				var filesList = [];
				var ctrr = 0;
				for (var counter in allDir) {
					lrc.readDirectory(allDir[counter], function(allFiles, pathDirect) {
						for (var counterCTR in allFiles) {
							lrc.checkIfDirectory(pathDirect + "/" + allFiles[counterCTR], function(check, pathFile) {
								ctrr += 1;
								if (check == "notdir") {
									filesList.push(pathFile);
								}
								if (ctrr == allDir.length) {
									callback(filesList);
								}
							});
						}
					});
				}
			}
			else if (tempHoldTask == 0) {
				var filesList = [];
				for (var ctrCTR in items) {
					filesList.push(path + "/" + items[ctrCTR]);
				}
				callback(filesList);
			}
		});
	}
	getAllDirectory(pathDirectory);
};

// files(pathDir, function(items) {
// 	console.log(items);
// });

module.exports.files = files;
