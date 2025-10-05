'use strict';

const express = require('express');

const uploadsController = require('../controllers/uploads');
const helpers = require('./helpers');

module.exports = function (app, middleware, controllers) {
	const middlewares = [middleware.autoLocale, middleware.authenticateRequest];
	const router = express.Router();
	app.use('/api', router);

	router.get('/config', [...middlewares, middleware.applyCSRF], helpers.tryRoute(controllers.api.getConfig));

	router.get('/self', [...middlewares], helpers.tryRoute(controllers.user.getCurrentUser));
	router.get('/user/uid/:uid', [...middlewares, middleware.canViewUsers], helpers.tryRoute(controllers.user.getUserByUID));
	router.get('/user/username/:username', [...middlewares, middleware.canViewUsers], helpers.tryRoute(controllers.user.getUserByUsername));
	router.get('/user/email/:email', [...middlewares, middleware.canViewUsers], helpers.tryRoute(controllers.user.getUserByEmail));

	router.get('/categories/:cid/moderators', [...middlewares], helpers.tryRoute(controllers.api.getModerators));

	// Get number of resolved topics in a category (copilot) - moved to avoid conflicts
	router.get('/categories/:cid/unresolved-count', [...middlewares], helpers.tryRoute(async (req, res) => {
		console.log(`[API] *** UNRESOLVED COUNT ENDPOINT HIT *** for category: ${req.params.cid}`);
		const { cid } = req.params;
		const resolvedUtils = require('../resolved-basic-utils');
		console.log(`[API] About to call getUnresolvedTopicCountInCategory for cid: ${cid}`);
		const count = await resolvedUtils.getUnresolvedTopicCountInCategory(cid);
		console.log(`[API] *** RETURNING COUNT ${count} FOR CATEGORY ${cid} ***`);
		res.json({ cid: cid, unresolvedTopicCount: count });
	}));
	router.get('/recent/posts/:term?', [...middlewares], helpers.tryRoute(controllers.posts.getRecentPosts));
	router.get('/unread/total', [...middlewares, middleware.ensureLoggedIn], helpers.tryRoute(controllers.unread.unreadTotal));
	router.get('/topic/teaser/:topic_id', [...middlewares], helpers.tryRoute(controllers.topics.teaser));
	router.get('/topic/pagination/:topic_id', [...middlewares], helpers.tryRoute(controllers.topics.pagination));

	const multipart = require('connect-multiparty');
	const multipartMiddleware = multipart();
	const postMiddlewares = [
		middleware.maintenanceMode,
		multipartMiddleware,
		middleware.validateFiles,
		middleware.uploads.ratelimit,
		middleware.applyCSRF,
	];

	router.post('/post/upload', postMiddlewares, helpers.tryRoute(uploadsController.uploadPost));
	router.post('/user/:userslug/uploadpicture', [
		...middlewares,
		...postMiddlewares,
		middleware.exposeUid,
		middleware.ensureLoggedIn,
		middleware.canViewUsers,
		middleware.checkAccountPermissions,
	], helpers.tryRoute(controllers.accounts.edit.uploadPicture));

	// Resolved status routes - add API endpoint for resolved status
	const resolvedUtils = require('../resolved-basic-utils');
	router.get('/topics/:tid/resolved', [...middlewares], helpers.tryRoute(async (req, res) => {
		const { tid } = req.params;
		const data = await resolvedUtils.getTopicResolvedStatus(tid);
		res.json({ tid: tid, resolved: data.resolved });
	}));

	router.put('/topics/:tid/resolved', [...middlewares, middleware.exposeUid], helpers.tryRoute(async (req, res) => {
		const { tid } = req.params;
		const { resolved } = req.body;
		const { uid } = req;
		
		if (!uid) {
			return res.status(401).json({ error: 'Not logged in' });
		}

		const isAdmin = await resolvedUtils.isCourseStaff(uid);
		if (!isAdmin) {
			return res.status(403).json({ error: 'Insufficient privileges' });
		}

		await resolvedUtils.updateTopicResolvedStatus(tid, resolved);

		res.json({ 
			success: true, 
			resolved,
			message: resolved ? 'Topic marked as resolved' : 'Topic marked as unresolved',
		});
	}));
};
