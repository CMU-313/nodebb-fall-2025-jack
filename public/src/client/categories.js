'use strict';


define('forum/categories', ['api', 'categorySelector'], function (api, categorySelector) {
	const categories = {};

	categories.init = function () {
		app.enterRoom('categories');
		console.log('[plugin] forum/categories loaded');
		console.log('ajaxify.data.template:', ajaxify.data.template);

		categorySelector.init($('[component="category-selector"]'), {
			privilege: 'find',
			onSelect: function (category) {
				ajaxify.go('/category/' + category.cid);
			},
		});

		document.querySelectorAll('[data-cid][component="categories/category"]').forEach(async (el) => {
			const cid = el.getAttribute('data-cid');
			console.log(`[Frontend] Found category element with cid: ${cid}`);
			const countEl = el.querySelector('[component="category/unresolved-count"]');
			if (!countEl) {
				console.log(`[Frontend] No unresolved-count element found for category ${cid}`);
				return;
			}
			console.log(`[Frontend] Making API call for category ${cid}`);
			try {
				// Call your backend route
				// const { unresolvedTopicCount } = await api.get(`/categories/${encodeURIComponent(cid)}/unresolved/count`);
				const { unresolvedTopicCount } = await fetch(`/api/categories/${encodeURIComponent(cid)}/unresolved-count`).then(res => res.json());
				console.log(`[Frontend] Received unresolved count: ${unresolvedTopicCount} for category ${cid}`);
				countEl.textContent = `${unresolvedTopicCount}`;// countEl.textContent = `12`;
			} catch (err) {
				console.error(`Failed to load resolved count for category ${cid}`, err);
			}
		});
	};

	return categories;
});
