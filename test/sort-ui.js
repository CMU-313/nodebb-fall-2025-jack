/* eslint-env node, mocha */
/* global $ */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Sort dropdown UI', function () {
	it('should copy left icon + bold label to dropdown toggle when selecting endorsed', function (done) {
		// prepare DOM
		const tpl = fs.readFileSync(path.join(__dirname, '../src/views/partials/category/sort.tpl'), 'utf8');
		const dom = new JSDOM('<html><body></body></html>');
		global.window = dom.window;
		global.document = dom.window.document;
		// initialize jQuery robustly: some environments export a factory, others the jQuery object
		const jq = require('jquery');
		// follow the other tests' pattern: assign the module to global.jQuery and $ directly
		global.jQuery = jq;
		global.$ = jq;

		// insert template
		document.body.innerHTML = tpl;

		// In tests we don't run translation; emulate it by replacing the language key
		// for the endorsed label so the UI shows the expected human text.
		document.querySelectorAll('[component="thread/sort"] .flex-grow-1').forEach(function (el) {
			if (el.textContent && el.textContent.indexOf('[[topic:endorsed]]') !== -1) {
				el.textContent = 'Endorsed Posts';
			}
		});

		const mockUtils = require('../public/src/utils');
		const mockConfig = { categoryTopicSort: 'recently_replied' };
		global.utils = mockUtils;
		global.config = mockConfig;
		global.ajaxify = { currentPage: '/category/1', go: function () {} };

		// shim: provide get('thread/sort') returning the DOM element
		const components = {
			get: function (name) {
				if (name === 'thread/sort') {
					return $('[component="thread/sort"]');
				}
				return null;
			},
		};

		// shim: capture define call and execute factory with our mocks
		global.define = function (id, deps, factory) {
			// support define('sort', [..], factory)
			if (id === 'sort') {
				// resolve 'components' dependency
				const resolvedDeps = deps.map((d) => (d === 'components' ? components : require(d)));
				// call factory to register module
				const module = factory.apply(null, resolvedDeps);
				// module has handleSort; call it
				if (module && typeof module.handleSort === 'function') {
					module.handleSort('categoryTopicSort', '/category/1');
				}
			}
		};

		// Evaluate the module file so define(...) runs
		const sortModulePath = path.join(__dirname, '../public/src/modules/sort.js');
		const sortCode = fs.readFileSync(sortModulePath, 'utf8');
		// run the module code in the current context
		eval(sortCode);

		// simulate click on endorsed item using native DOM APIs (avoid jQuery selector pitfalls)
		const endorsedEl = document.querySelector('[component="thread/sort"] a[data-filter="endorsed"]');
		assert(enforcedExistence(endorsedEl), 'endorsed item not found in template');

		// click the element (native click event)
		endorsedEl.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));

		// check toggle HTML now contains the original icon and fw-semibold label
		const toggleEl = document.querySelector('[component="thread/sort"] .dropdown-toggle');
		const html = toggleEl && toggleEl.innerHTML;
		// Fallback behavior: toggle should preserve its original icon and inject a bold label
		assert(html.indexOf('fa-arrow-down-wide-short') !== -1, 'toggle missing original icon');
		assert(html.indexOf('fw-semibold') !== -1, 'toggle missing fw-semibold label');

		// The bold label should read the human-friendly string after translation
		var labelEl = toggleEl.querySelector('.fw-semibold');
		var labelText = labelEl ? labelEl.textContent.trim() : '';
		assert.strictEqual(labelText, 'Endorsed Posts');

		done();

		function enforcedExistence(val) {
			return !!val;
		}
	});
});
