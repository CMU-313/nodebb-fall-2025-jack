'use strict';

const nconf = require('nconf');

const recentController = require('./recent');
const helpers = require('./helpers');

const viewAllController = module.exports;
const relative_path = nconf.get('relative_path');

viewAllController.get = async function (req, res, next) {
	const data = await recentController.getData(req, 'viewall', 'recent');
	if (!data) {
		return next();
	}

	// Ensure titles/breadcrumbs reflect View All when not used as homepage
	if (req.originalUrl.startsWith(`${relative_path}/api/viewall`) || req.originalUrl.startsWith(`${relative_path}/viewall`)) {
		data.title = 'View All';
		data.breadcrumbs = helpers.buildBreadcrumbs([{ text: 'View All' }]);
	}

	res.render('recent', data);
};


