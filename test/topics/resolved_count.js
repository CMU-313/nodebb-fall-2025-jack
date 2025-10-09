'use strict';
const assert = require('assert');
const db = require('../mocks/databasemock');
const topics = require('../../src/topics');
const User = require('../../src/user');
const categories = require('../../src/categories');
const groups = require('../../src/groups');
const helpers = require('../helpers');
describe('GET /api/categories/:cid/unresolved-count', () => {
	let adminUid;
	let regularUid;
	let categoryObj;
	let topicData;
	let adminJar;
	let csrf_token;
	before(async () => {
		// Create admin user
		adminUid = await User.create({ username: 'resolvedadmin', password: '123456' });
		await groups.join('administrators', adminUid);
		const adminLogin = await helpers.loginUser('resolvedadmin', '123456');
		adminJar = adminLogin.jar;
		csrf_token = adminLogin.csrf_token;

		// Create regular user
		regularUid = await User.create({ username: 'regularuser', password: '123456' });

		// Create category
		categoryObj = await categories.create({
			name: 'Resolved Test Category',
			description: 'Category for testing resolved status',
		});

		// Create a test topic
		const result = await topics.post({
			uid: adminUid,
			title: 'Test Topic for Resolved',
			content: 'This topic will be marked as resolved',
			cid: categoryObj.cid,
		});
		topicData = result.topicData;
		
	});
	it('should return correct count of unresolved topics in category', async () => {
		// Initially there should be 1 unresolved topic
		let { response, body } = await helpers.request('get', `/api/categories/${categoryObj.cid}/unresolved-count`, {});
		assert.strictEqual(response.statusCode, 200);
		assert.strictEqual(typeof body.unresolvedTopicCount, 'number');
		assert.strictEqual(body.unresolvedTopicCount, 1);

		// Mark the topic as resolved
		await helpers.request('put', `/api/topics/${topicData.tid}/resolved`, {
			jar: adminJar,
			body: { resolved: true },
		});

		// Now the count should be 0
		({ response, body } = await helpers.request('get', `/api/categories/${categoryObj.cid}/unresolved-count`, {}));
		assert.strictEqual(response.statusCode, 200);
		assert.strictEqual(typeof body.unresolvedTopicCount, 'number');
		assert.strictEqual(body.unresolvedTopicCount, 0);

		// Create another unresolved topic
		await topics.post({
			uid: adminUid,
			title: 'Another Test Topic for Resolved',
			content: 'This topic will remain unresolved',
			cid: categoryObj.cid,
		});

		// Now the count should be 1 again
		({ response, body } = await helpers.request('get', `/api/categories/${categoryObj.cid}/unresolved-count`, {}));
		assert.strictEqual(response.statusCode, 200);
		assert.strictEqual(typeof body.unresolvedTopicCount, 'number');
		assert.strictEqual(body.unresolvedTopicCount, 1);
	});
});