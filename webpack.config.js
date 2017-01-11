var path = require('path');
var fs = require('fs');

module.exports = function(webpackConfig) {
	webpackConfig.babel.plugins.push(['import', { libraryName: 'antd', style: false }]);

	//just for dev usage - use local rrrouter instead of published npm
	var localNpm= path.resolve('../rrrouter/src');
	if (fs.existsSync(localNpm)) {
		webpackConfig.resolve.alias = {
			rrrouter: localNpm,
		};
	}

	return webpackConfig;
};
