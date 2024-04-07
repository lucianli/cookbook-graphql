var path = require('path');
var babel = require('babel-core');

var hostPackagePath = path.resolve(process.cwd(), 'package.json');
var hostPackageInfo = require(hostPackagePath);

var config = {
	stage: 2,
	retainLines: true,
	auxiliaryCommentBefore: 'istanbul ignore next',
};

var configOverrides = hostPackageInfo['jest-babel'] || { };

Object.keys(configOverrides).forEach(function(key) {
	config[key] = configOverrides[key];
});

function process(src, filename) {
	if (!babel.canCompile(filename, config.extensions)) {
		return src;
	}

	config.filename = filename;

	return babel.transform(src, config).code;
}

module.exports = {
	process: process
};
