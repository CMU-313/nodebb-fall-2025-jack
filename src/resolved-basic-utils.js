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
	console.log(`[resolved-utils] Topic ${tid} resolved field:`, data);
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
	console.log(`[resolved-utils] Checking unresolved topics for category: ${cid}`);
	const tids = await database.getSortedSetRange(`cid:${cid}:tids`, 0, -1);
	console.log(`[resolved-utils] Found topic IDs for category ${cid}:`, tids);
	let unresolvedCount = 0;
	for await (const tid of tids) {
		const status = await this.getTopicResolvedStatus(tid);
		if (!(status.resolved)) {
			unresolvedCount += 1;
		}
	}
	console.log(`[resolved-utils] Unresolved topic count for category ${cid}:`, unresolvedCount);
	return unresolvedCount;
};

resolvedUtils.getPostEndorsedStatus = async function (pid) {
	const data = await database.getObjectField(`post:${pid}`, 'endorsed');
	return {
		endorsed: data === '1' || data === true || data === 1,
	};
};

resolvedUtils.setPostEndorsedStatus = async function (pid, endorsed) {
	await database.setObjectField(`post:${pid}`, 'endorsed', endorsed ? 1 : 0);
};


module.exports = resolvedUtils;