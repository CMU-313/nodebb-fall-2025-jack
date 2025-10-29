if (!global.nbbRequire) {
	global.nbbRequire = (path) => require(path);
}
module.exports = global.nbbRequire;
