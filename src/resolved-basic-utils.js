//file to create basic resolved/unresolved functions for recognizing admin

'use strict';

const database = require('./database');
const User = require('./user');

const resolvedUtils = {};

// check if user id is admin (course staff in our case)
resolvedUtils.isCourseStaff = async function (uid) {
	if (!uid) return false;
	const userData = await User.getUserData(uid);
	
	// Check if user is in administrators group
	const isAdmin = userData.groupTitleArray && userData.groupTitleArray.includes('administrators');
	return isAdmin;
};

// Get status
resolvedUtils.getTopicResolvedStatus = async function (tid) {
	const data = await database.getObjectField(`topic:${tid}`, 'resolved');
	return { resolved: data === '1' || data === true || data === 'true' };
};

// Update status
resolvedUtils.updateTopicResolvedStatus = async function (tid, resolved) {
	await database.setObjectField(`topic:${tid}`, 'resolved', resolved ? 1 : 0);
	return { resolved: resolved };
};
//write a function to get the number of resolved topics in a category
resolvedUtils.getUnresolvedTopicCountInCategory = async function (cid) {
	console.log('here!');
	const tids = await database.getSortedSetRange(`category:${cid}:topics`, 0, -1);
	let unresolvedCount = 0;
	console.log(`tids: ${tids}`);
	// console.log()
	for (const tid of tids) {
		console.log(`checking ${tid}`);
		const status = await this.getTopicResolvedStatus(tid);
		if (!(status.resolved)) {
			unresolvedCount += 1;
		}
	}

	return unresolvedCount;
};

module.exports = resolvedUtils;