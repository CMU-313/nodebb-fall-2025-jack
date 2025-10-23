'use strict';

process.env.STRYKER_MUTATOR = '1';
process.env.NODE_ENV = 'test';
process.env.NODEBB_ENV = 'test';

// Disable heavy plugins and server initialization
process.env.SKIP_PLUGIN_LOAD = '1';
process.env.DISABLE_SOCKET_IO = '1';
process.env.DISABLE_EMAIL = '1';
process.env.DISABLE_BLACKLIST = '1';
process.env.DISABLE_ACTIVITYPUB = '1';

console.log('[Stryker sandbox] Light mode enabled for faster boot');


const fs = require('fs');
const path = require('path');
try {
	// Ensure logs dir exists
	const logsDir = path.join(process.cwd(), 'logs');
	if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
	fs.writeFileSync(path.join(logsDir, 'output.log'), '', { flag: 'a' });

	// Copy config.json if missing
	const repoRoot = path.resolve(__dirname, '../../'); // adjust if needed
	const sourceConfig = path.join(repoRoot, 'config.json');
	const destConfig = path.join(process.cwd(), 'config.json');
	if (fs.existsSync(sourceConfig) && !fs.existsSync(destConfig)) {
		fs.copyFileSync(sourceConfig, destConfig);
		console.log('[Stryker-sandbox] Copied config.json into sandbox');
	}
} catch (err) {
	console.error('[Stryker-sandbox] Sandbox setup failed:', err);
}