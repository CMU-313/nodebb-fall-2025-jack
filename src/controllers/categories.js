'use strict';

const nconf = require('nconf');
const _ = require('lodash');

const categories = require('../categories');
const meta = require('../meta');
const pagination = require('../pagination');
const helpers = require('./helpers');
const privileges = require('../privileges');

const categoriesController = module.exports;

categoriesController.list = async function (req, res) {
	res.locals.metaTags = [{
		name: 'title',
		content: String(meta.config.title || 'NodeBB'),
	}, {
		property: 'og:type',
		content: 'website',
	}];

	const allRootCids = await categories.getAllCidsFromSet('cid:0:children');
	const rootCids = await privileges.categories.filterCids('find', allRootCids, req.uid);
	const pageCount = Math.max(1, Math.ceil(rootCids.length / meta.config.categoriesPerPage));
	const page = Math.min(parseInt(req.query.page, 10) || 1, pageCount);
	const start = Math.max(0, (page - 1) * meta.config.categoriesPerPage);
	const stop = start + meta.config.categoriesPerPage - 1;
	const pageCids = rootCids.slice(start, stop + 1);

	const allChildCids = _.flatten(await Promise.all(pageCids.map(categories.getChildrenCids)));
	const childCids = await privileges.categories.filterCids('find', allChildCids, req.uid);
	const categoryData = await categories.getCategories(pageCids.concat(childCids));
	const tree = categories.getTree(categoryData, 0);
	await Promise.all([
		categories.getRecentTopicReplies(categoryData, req.uid, req.query),
		categories.setUnread(tree, pageCids.concat(childCids), req.uid),
	]);

	// Compute aggregate stats for synthetic View All category across all visible categories
	const allForumCids = await categories.getAllCidsFromSet('categories:cid');
	const visibleAllCids = await privileges.categories.filterCids('find', allForumCids, req.uid);
	const allVisibleCategories = await categories.getCategories(visibleAllCids);
	let aggTopics = 0;
	let aggPosts = 0;
	let latestTeaser = null;
	allVisibleCategories.forEach((cat) => {
		if (!cat) { return; }
		aggTopics += parseInt(cat.totalTopicCount || 0, 10);
		aggPosts += parseInt(cat.totalPostCount || 0, 10);
		if (cat.teaser && cat.teaser.timestamp) {
			if (!latestTeaser || (cat.teaser.timestamp > latestTeaser.timestamp)) {
				latestTeaser = cat.teaser;
			}
		}
	});

	const viewAllCategory = {
		cid: 'all',
		name: 'View All',
		handle: 'viewall',
		description: 'All topics across categories',
		descriptionParsed: 'All topics across categories',
		icon: 'fa-list-ul',
		bgColor: '#6c757d',
		color: '#ffffff',
		slug: 'all',
		parentCid: 0,
		topic_count: aggTopics,
		post_count: aggPosts,
		disabled: 0,
		order: 0,
		link: '',
		numRecentReplies: 0,
		class: '',
		imageClass: 'cover',
		isSection: false,
		minTags: 0,
		maxTags: 0,
		postQueue: 0,
		totalPostCount: aggPosts,
		totalTopicCount: aggTopics,
		subCategoriesPerPage: 0,
		backgroundImage: '',
		teaser: latestTeaser,
		children: [],
	};

	const data = {
		title: meta.config.homePageTitle || '[[pages:home]]',
		selectCategoryLabel: '[[pages:categories]]',
		categories: tree,
		viewAllList: [viewAllCategory],
		// Back-compat for templates that used a single object
		viewAllCategory,
		pagination: pagination.create(page, pageCount, req.query),
	};

	data.categories.forEach((category) => {
		if (category) {
			helpers.trimChildren(category);
			helpers.setCategoryTeaser(category);
		}
	});

	if (req.originalUrl.startsWith(`${nconf.get('relative_path')}/api/categories`) || req.originalUrl.startsWith(`${nconf.get('relative_path')}/categories`)) {
		data.title = '[[pages:categories]]';
		data.breadcrumbs = helpers.buildBreadcrumbs([{ text: data.title }]);
		res.locals.metaTags.push({
			property: 'og:title',
			content: '[[pages:categories]]',
		});
	}

	res.render('categories', data);
};
