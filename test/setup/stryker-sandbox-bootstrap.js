'use strict';

/**
 * Lightweight bootstrap for NodeBB mutation runs.
 * Disables slow systems without breaking test mocks.
 */

process.env.DISABLE_LOGGING = 'true';

const path = require('path');

// Create minimal required directories if missing
const fs = require('fs');
['logs', 'build/public/uploads'].forEach(dir => {
	try {
		fs.mkdirSync(path.resolve(__dirname, '../../', dir), { recursive: true });
	} catch (e) {}
});

// Patch logger to be silent in test mode
try {
	const logger = require('../../src/logger');
	logger.info = logger.warn = logger.error = () => {};
} catch (_) {}
