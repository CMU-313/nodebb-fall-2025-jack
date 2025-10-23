'use strict';

define('forum/categories', ['api', 'categorySelector'], function (api, categorySelector) {
	const categories = {};

	categories.init = function () {
		app.enterRoom('categories');

		categorySelector.init($('[component="category-selector"]'), {
			privilege: 'find',
			onSelect: function (category) {
				ajaxify.go('/category/' + category.cid);
			},
		});

		document.querySelectorAll('[data-cid][component="categories/category"]').forEach(async (el) => {
			const cid = el.getAttribute('data-cid');
			const countEl = el.querySelector('[component="category/unresolved-count"]');
			if (!countEl) {
				return;
			}
			try {
				// Call your backend route
				// const { unresolvedTopicCount } = await api.get(`/categories/${encodeURIComponent(cid)}/unresolved/count`);
				const { unresolvedTopicCount } = await fetch(`/api/categories/${encodeURIComponent(cid)}/unresolved-count`).then(res => res.json());
				countEl.textContent = `${unresolvedTopicCount}`;// countEl.textContent = `12`;
			} catch (err) {
				console.error(`Failed to load resolved count for category ${cid}`, err);
			}
		});
	};

	return categories;
});
