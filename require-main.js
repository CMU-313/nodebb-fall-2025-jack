'use strict';

/**
 * Safe guard for Stryker sandbox environments:
 * Prevent "Cannot set properties of undefined (setting 'require')" when require.main is missing.
 */
if (typeof require.main === 'undefined') {
	global.require = require;
	require.main = { require };
}

// this forces `require.main.require` to always be relative to this directory
// this allows plugins to use `require.main.require` to reference NodeBB modules
// without worrying about multiple parent modules
if (require.main !== module) {
	require.main.require = function (path) {
		return require(path);
	};
}
