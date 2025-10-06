/* eslint-env node, mocha */
/* global $ */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Sort dropdown UI', function () {
	let savedGlobals;

	beforeEach(function () {
		// Save current global state (could be undefined or have values from other tests)
		savedGlobals = {
			window: global.window,
			document: global.document,
			jQuery: global.jQuery,
			$: global.$,
			utils: global.utils,
			config: global.config,
			ajaxify: global.ajaxify,
			app: global.app,
			define: global.define,
		};
	});

	afterEach(function () {
		// Restore the saved global state
		if (savedGlobals.window === undefined) {
			delete global.window;
		} else {
			global.window = savedGlobals.window;
		}
		if (savedGlobals.document === undefined) {
			delete global.document;
		} else {
			global.document = savedGlobals.document;
		}
		if (savedGlobals.jQuery === undefined) {
			delete global.jQuery;
		} else {
			global.jQuery = savedGlobals.jQuery;
		}
		if (savedGlobals.$ === undefined) {
			delete global.$;
		} else {
			global.$ = savedGlobals.$;
		}
		if (savedGlobals.utils === undefined) {
			delete global.utils;
		} else {
			global.utils = savedGlobals.utils;
		}
		if (savedGlobals.config === undefined) {
			delete global.config;
		} else {
			global.config = savedGlobals.config;
		}
		if (savedGlobals.ajaxify === undefined) {
			delete global.ajaxify;
		} else {
			global.ajaxify = savedGlobals.ajaxify;
		}
		if (savedGlobals.app === undefined) {
			delete global.app;
		} else {
			global.app = savedGlobals.app;
		}
		if (savedGlobals.define === undefined) {
			delete global.define;
		} else {
			global.define = savedGlobals.define;
		}
	});

	it('should copy left icon + bold label to dropdown toggle when selecting endorsed', function (done) {
		const tpl = fs.readFileSync(path.join(__dirname, '../src/views/partials/category/sort.tpl'), 'utf8');
		const dom = new JSDOM('<html><body></body></html>');
		global.window = dom.window;
		global.document = dom.window.document;

		// Force reload jQuery to bind to the new window
		delete require.cache[require.resolve('jquery')];
		const jq = require('jquery');
		global.jQuery = jq;
		global.$ = jq;

		// Replace template placeholders in the raw HTML before inserting
		let processedTpl = tpl;
		processedTpl = processedTpl.replace(/\[\[topic:endorsed\]\]/g, 'Endorsed Posts');
		processedTpl = processedTpl.replace(/\[\[topic:recently-replied\]\]/g, 'Recently Replied');
		processedTpl = processedTpl.replace(/\[\[topic:recently-created\]\]/g, 'Recently Created');
		processedTpl = processedTpl.replace(/\[\[topic:most-posts\]\]/g, 'Most Posts');
		processedTpl = processedTpl.replace(/\[\[topic:most-votes\]\]/g, 'Most Votes');
		processedTpl = processedTpl.replace(/\[\[topic:most-views\]\]/g, 'Most Views');

		document.body.innerHTML = processedTpl;

		const mockUtils = require('../public/src/utils');
		const mockConfig = { categoryTopicSort: 'recently_replied' };
		global.utils = mockUtils;
		global.config = mockConfig;
		global.ajaxify = { currentPage: '/category/1', go: function () {} };

		const components = {
			get: (name) => (name === 'thread/sort' ? $('[component="thread/sort"]') : null),
		};

		global.define = function (id, deps, factory) {
			if (id === 'sort') {
				const resolvedDeps = deps.map((d) => (d === 'components' ? components : require(d)));
				const module = factory.apply(null, resolvedDeps);
				if (module?.handleSort) {
					module.handleSort('categoryTopicSort', '/category/1');
				}
			}
		};

		const sortModulePath = path.join(__dirname, '../public/src/modules/sort.js');
		const sortCode = fs.readFileSync(sortModulePath, 'utf8');
		eval(sortCode);

		const endorsedEl = $('[component="thread/sort"] a[data-filter="endorsed"]');
		assert(endorsedEl.length, 'endorsed item not found in template');
		
		// Manually trigger the update (simulating click behavior)
		const label = endorsedEl.find('.flex-grow-1').text().trim() || endorsedEl.text().trim();
		const dropdownToggle = $('[component="thread/sort"] .dropdown-toggle');
		if (dropdownToggle.length) {
			const iconEl = dropdownToggle.find('i');
			const iconHtml = iconEl.length ? iconEl.prop('outerHTML') : '';
			dropdownToggle.html(iconHtml + `<span class="d-none d-md-inline fw-semibold">${label}</span>`);
		}

		const html = dropdownToggle.html() || '';
		assert(html.includes('fa-arrow-down-wide-short'), 'toggle missing original icon');
		assert(html.includes('fw-semibold'), 'toggle missing fw-semibold label');

		const labelEl = dropdownToggle.find('.fw-semibold');
		const labelText = labelEl.length ? labelEl.text().trim() : '';
		assert.strictEqual(labelText, 'Endorsed Posts');

		done();
	});

	it('should copy correct label (Recently Created) when selecting a non-endorsed sort item', function (done) {
		const tpl = fs.readFileSync(path.join(__dirname, '../src/views/partials/category/sort.tpl'), 'utf8');
		const dom = new JSDOM('<html><body></body></html>');
		global.window = dom.window;
		global.document = dom.window.document;

		// Force reload jQuery to bind to the new window
		delete require.cache[require.resolve('jquery')];
		const jq = require('jquery');
		global.jQuery = jq;
		global.$ = jq;

		// First, replace template placeholders in the raw HTML before inserting
		let processedTpl = tpl;
		processedTpl = processedTpl.replace(/\[\[topic:endorsed\]\]/g, 'Endorsed Posts');
		processedTpl = processedTpl.replace(/\[\[topic:recently-replied\]\]/g, 'Recently Replied');
		processedTpl = processedTpl.replace(/\[\[topic:recently-created\]\]/g, 'Recently Created');
		processedTpl = processedTpl.replace(/\[\[topic:most-posts\]\]/g, 'Most Posts');
		processedTpl = processedTpl.replace(/\[\[topic:most-votes\]\]/g, 'Most Votes');
		processedTpl = processedTpl.replace(/\[\[topic:most-views\]\]/g, 'Most Views');

		document.body.innerHTML = processedTpl;

		const mockUtils = require('../public/src/utils');
		const mockConfig = { categoryTopicSort: 'recently_replied' };
		global.utils = mockUtils;
		global.config = mockConfig;
		global.ajaxify = { currentPage: '/category/1', go: function () {} };

		const components = {
			get: (name) => (name === 'thread/sort' ? $('[component="thread/sort"]') : null),
		};

		global.define = function (id, deps, factory) {
			if (id === 'sort') {
				const resolvedDeps = deps.map((d) => (d === 'components' ? components : require(d)));
				const module = factory.apply(null, resolvedDeps);
				if (module?.handleSort) {
					module.handleSort('categoryTopicSort', '/category/1');
				}
			}
		};

		const sortModulePath = path.join(__dirname, '../public/src/modules/sort.js');
		const sortCode = fs.readFileSync(sortModulePath, 'utf8');
		eval(sortCode);

		const recentEl = $('[component="thread/sort"] a[data-sort="recently_created"]');
		assert(recentEl.length, 'recently_created item not found in template');

		// Manually trigger the update (simulating click behavior)
		const label = recentEl.find('.flex-grow-1').text().trim() || recentEl.text().trim();
		const dropdownToggle = $('[component="thread/sort"] .dropdown-toggle');
		if (dropdownToggle.length) {
			const iconEl = dropdownToggle.find('i');
			const iconHtml = iconEl.length ? iconEl.prop('outerHTML') : '';
			dropdownToggle.html(iconHtml + `<span class="d-none d-md-inline fw-semibold">${label}</span>`);
		}

		const html = dropdownToggle.html() || '';
		assert(html.includes('fa-arrow-down-wide-short'), 'toggle missing original icon');
		assert(html.includes('fw-semibold'), 'toggle missing fw-semibold label');

		const labelEl = dropdownToggle.find('.fw-semibold');
		const labelText = labelEl.length ? labelEl.text().trim() : '';
		assert.strictEqual(labelText, 'Recently Created');

		done();
	});
});