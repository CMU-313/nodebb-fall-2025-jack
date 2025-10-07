'use strict';

const assert = require('assert');
const db = require('../mocks/databasemock');
const topics = require('../../src/topics');
const User = require('../../src/user');
const categories = require('../../src/categories');
const groups = require('../../src/groups');
const helpers = require('../helpers');

describe('Resolved Status', () => {
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

	describe('GET /api/topics/:tid/resolved', () => { /*check that resolved status is correctly returned for topic*/
		it('should return resolved status for a topic', async () => {
			const { response, body } = await helpers.request('get', `/api/topics/${topicData.tid}/resolved`, {
				jar: adminJar,
			});
			assert.strictEqual(response.statusCode, 200);
			assert.strictEqual(typeof body.resolved, 'boolean');
			assert.strictEqual(body.resolved, false); // New topics default to unresolved
		});

		it('should work for guests', async () => {/*check that resolved status is public and readable*/
			const { response, body } = await helpers.request('get', `/api/topics/${topicData.tid}/resolved`, {});
			assert.strictEqual(response.statusCode, 200);
			assert.strictEqual(typeof body.resolved, 'boolean');
		});
	});

	describe('PUT /api/topics/:tid/resolved', () => {/*check that only admin can mark topic as resolved*/
		it('should allow admin to mark topic as resolved', async () => {
			const { response, body } = await helpers.request('put', `/api/topics/${topicData.tid}/resolved`, {
				jar: adminJar,
				body: { resolved: true },
			});
			assert.strictEqual(response.statusCode, 200);
			assert.strictEqual(body.success, true);
			assert.strictEqual(body.resolved, true);

			// Verify it was actually updated
			const { body: statusBody } = await helpers.request('get', `/api/topics/${topicData.tid}/resolved`, {});
			assert.strictEqual(statusBody.resolved, true);
		});

		it('should allow admin to mark topic as unresolved', async () => {/*check that only admin can mark as unresolved*/
			const { response, body } = await helpers.request('put', `/api/topics/${topicData.tid}/resolved`, {
				jar: adminJar,
				body: { resolved: false },
			});
			assert.strictEqual(response.statusCode, 200);
			assert.strictEqual(body.resolved, false);

			// Verify it was actually updated
			const { body: statusBody } = await helpers.request('get', `/api/topics/${topicData.tid}/resolved`, {});
			assert.strictEqual(statusBody.resolved, false);
		});

		it('should fail if non-admin tries to update', async () => {/*check that test fails if non-admin tries to update status button*/
			const regularLogin = await helpers.loginUser('regularuser', '123456');
			const { response } = await helpers.request('put', `/api/topics/${topicData.tid}/resolved`, {
				jar: regularLogin.jar,
				body: { resolved: true },
			});
			assert.strictEqual(response.statusCode, 403);
		});

		it('should fail if not logged in', async () => {
			const { response } = await helpers.request('put', `/api/topics/${topicData.tid}/resolved`, {
				body: { resolved: true },
			});
			assert.strictEqual(response.statusCode, 403);
		});
	});

	describe('New topics', () => {/*check that default topic status is unresolved*/
		it('should default new topics to resolved: false', async () => {
			const result = await topics.post({
				uid: adminUid,
				title: 'Another Test Topic',
				content: 'This should default to unresolved',
				cid: categoryObj.cid,
			});

			const { body } = await helpers.request('get', `/api/topics/${result.topicData.tid}/resolved`, {});
			assert.strictEqual(body.resolved, false);
		});
	});
	/* Frontend tests */
	//tests topic page displays resolved status 
	//test admin can see toggle adn control 
	describe('Frontend Display', () => {
		const nconf = require('nconf');
		const request = require('../../src/request');

		it('should display resolved status on topic page', async () => {
			const { response, body } = await request.get(`${nconf.get('url')}/topic/${topicData.slug}`, {
				jar: adminJar,
			});
			assert.strictEqual(response.statusCode, 200);
			assert(body.includes('resolved') || body.includes('unresolved'), 'Topic page should contain resolved status text');
		});

		it('should show admin controls for admin users', async () => {
			const { response, body } = await request.get(`${nconf.get('url')}/topic/${topicData.slug}`, {
				jar: adminJar,
			});
			assert.strictEqual(response.statusCode, 200);
			// Check that the page contains the checkbox element
			assert(body.includes('checkbox') || body.includes('post-toggle'), 'Admin should see toggle controls');
		});

		it('should load topic page for non-admin users', async () => {
			const regularLogin = await helpers.loginUser('regularuser', '123456');
			const { response } = await request.get(`${nconf.get('url')}/topic/${topicData.slug}`, {
				jar: regularLogin.jar,
			});
			assert.strictEqual(response.statusCode, 200);
		});
	});
});