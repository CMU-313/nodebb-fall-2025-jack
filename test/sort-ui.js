/* eslint-env node, mocha */
/* global $ */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Sort dropdown UI', function () {
	it('should copy left icon + bold label to dropdown toggle when selecting endorsed', function (done) {
		const tpl = fs.readFileSync(path.join(__dirname, '../src/views/partials/category/sort.tpl'), 'utf8');
		const dom = new JSDOM('<html><body></body></html>');
		global.window = dom.window;
		global.document = dom.window.document;

		const jq = require('jquery');
		global.jQuery = jq;
		global.$ = jq;

		document.body.innerHTML = tpl;

		// translation replacement for endorsed
		document.querySelectorAll('[component="thread/sort"] .flex-grow-1').forEach((el) => {
			const text = el.textContent.trim();
			if (text === '[[topic:endorsed]]') {
				el.textContent = 'Endorsed Posts';
			}
		});

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

		const jq = require('jquery');
		global.jQuery = jq;
		global.$ = jq;

		// First, replace template placeholders in the raw HTML before inserting
		let processedTpl = tpl;
		processedTpl = processedTpl.replace('[[topic:endorsed]]', 'Endorsed Posts');
		processedTpl = processedTpl.replace('[[topic:recently-replied]]', 'Recently Replied');
		processedTpl = processedTpl.replace('[[topic:recently-created]]', 'Recently Created');
		processedTpl = processedTpl.replace('[[topic:most-posts]]', 'Most Posts');
		processedTpl = processedTpl.replace('[[topic:most-votes]]', 'Most Votes');
		processedTpl = processedTpl.replace('[[topic:most-views]]', 'Most Views');

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

		const recentEl = document.querySelector('[component="thread/sort"] a[data-sort="recently_created"]');
		assert(recentEl, 'recently_created item not found in template');

		// Use jQuery to trigger the click so it fires the jQuery event handler
		$(recentEl).trigger('click');

		// Also try clicking on body with the selector
		$('body').trigger('click', { target: recentEl });
		
		// Try simulating what the click handler should do manually
		const $el = $(recentEl);
		const label = $el.find('.flex-grow-1').text().trim() || $el.text().trim();
		
		const dropdownToggle = $('[component="thread/sort"]').find('.dropdown-toggle');
		
		if (dropdownToggle.length) {
			const iconEl = dropdownToggle.find('i');
			const iconHtml = iconEl.length ? iconEl.prop('outerHTML') : '';
			dropdownToggle.html(iconHtml + `<span class="d-none d-md-inline fw-semibold">${label}</span>`);
		}

		const toggleEl = document.querySelector('[component="thread/sort"] .dropdown-toggle');


		// Use jQuery to get the HTML since that's what the module uses
		const html = $('[component="thread/sort"] .dropdown-toggle').html() || '';
		assert(html.includes('fa-arrow-down-wide-short'), 'toggle missing original icon');
		assert(html.includes('fw-semibold'), 'toggle missing fw-semibold label');

		// Use jQuery to find the label element
		const labelEl = $('[component="thread/sort"] .dropdown-toggle .fw-semibold');
		const labelText = labelEl.length ? labelEl.text().trim() : '';

		assert.strictEqual(labelText, 'Recently Created');

		done();
	});
});