var fdl = require("./filesNdirectoriesLister");
var pathDir = "/Users/wasabe/test/ggg/try";
fdl.ldl.directory(pathDir, "recursive", function(a) {
	console.log(a);
});