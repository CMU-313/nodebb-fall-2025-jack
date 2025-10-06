'use strict';


define('sort', ['components'], function (components) {
	const module = {};

	module.handleSort = function (field, gotoOnSave) {
		const threadSort = components.get('thread/sort');
		const dropdownToggle = threadSort.find('.dropdown-toggle');

		// --- Detect URL parameters ---
		const urlParams = utils.params();
		const currentSort = urlParams.sort || config[field];
		const currentFilter = urlParams.filter;

		threadSort.find('i').removeClass('fa-check');

		// --- Identify active link based on filter or sort ---
		let currentSetting;
		if (currentFilter) {
			currentSetting = threadSort.find(`a[data-filter="${currentFilter}"]`);
		} else {
			currentSetting = threadSort.find(`a[data-sort="${currentSort}"]`);
		}

		// --- Apply checkmark + label on load ---
		if (currentSetting && currentSetting.length) {
			currentSetting.find('i').addClass('fa-check');
			// Build toggle content: preserve the dropdown's original icon (if any)
			// and inject a bold label derived from the selected item. 
			const label = currentSetting.find('.flex-grow-1').text().trim() || currentSetting.text().trim();
			if (dropdownToggle.length) {
				const iconEl = dropdownToggle.find('i');
				const iconHtml = iconEl.length ? iconEl.prop('outerHTML') : '';
				dropdownToggle.html(iconHtml + `<span class="d-none d-md-inline fw-semibold">${label}</span>`);
			}
		}

		// --- Handle click for both sort and filter ---
		$('body')
			.off('click', '[component="thread/sort"] a[data-sort], [component="thread/sort"] a[data-filter]')
			.on('click', '[component="thread/sort"] a[data-sort], [component="thread/sort"] a[data-filter]', function () {
				const $el = $(this);
				const params = utils.params();

				if ($el.is('[data-filter]')) {
					params.filter = $el.attr('data-filter');
					delete params.sort;
				} else if ($el.is('[data-sort]')) {
					params.sort = $el.attr('data-sort');
					delete params.filter;
				}

				// update toggle to show the original icon + bold label (fallback behavior). 
				const label = $el.find('.flex-grow-1').text().trim() || $el.text().trim();
				if (dropdownToggle.length) {
					const iconEl = dropdownToggle.find('i');
					const iconHtml = iconEl.length ? iconEl.prop('outerHTML') : '';
					dropdownToggle.html(iconHtml + `<span class="d-none d-md-inline fw-semibold">${label}</span>`);
				}

				const qs = $.param(params);
				ajaxify.go(gotoOnSave + (qs ? '?' + qs : ''));
			});
	};

	// --- Re-run after Ajax navigation ---
	$(window).on('action:ajaxify.end', function () {
		if ($('[component="thread/sort"]').length) {
			require(['sort'], function (sort) {
				sort.handleSort('categoryTopicSort', ajaxify.currentPage);
			});
		}
	});

	return module;
});
