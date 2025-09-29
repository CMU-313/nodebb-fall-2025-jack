//file to create basic resolved/unresolved functions for recognizing admin

'use strict';

const database = require('./database');
const User = require('./user');

const resolvedUtils = {};

// check if user id is admin (course staff in our case)
resolvedUtils.isCourseStaff = async function (uid) {
	if (!uid) return false;
	const userData = await User.getUserData(uid);
	return userData.isAdmin;
};

// Get status
resolvedUtils.getTopicResolvedStatus = async function (tid) {
	const data = await database.getObjectField(`topic:${tid}`, 'resolved');
	// for both old and new topics
	return { resolved: data === '1' || data === true || data === 'true' };
};

// Update status
resolvedUtils.updateTopicResolvedStatus = async function (tid, resolved) {
	await database.setObjectField(`topic:${tid}`, 'resolved', resolved ? 1 : 0);
	return { resolved: resolved };
};

module.exports = resolvedUtils;