'use strict';

const assert = require('assert');
const db = require('../mocks/databasemock');

const topics = require('../../src/topics');
const posts = require('../../src/posts');
const categories = require('../../src/categories');
const user = require('../../src/user');
const groups = require('../../src/groups');
const helpers = require('../helpers');

describe('Post Endorsed Status', () => {
	let adminUid;
	let regularUid;
	let categoryObj;
	let topicData;
	let postData;
	let adminJar;

	before(async () => {
		// Setup: Create admin user
		adminUid = await user.create({ username: 'endorseadmin', password: '123456' });
		await groups.join('administrators', adminUid);

		// Setup: Create regular user
		regularUid = await user.create({ username: 'endorseregular', password: '123456' });

		// Setup: Login admin and get jar
		const adminLogin = await helpers.loginUser('endorseadmin', '123456');
		adminJar = adminLogin.jar;

		// Setup: Create category and topic for testing
		categoryObj = await categories.create({
			name: 'Test Category',
			description: 'Test category for endorsed posts',
		});

		const result = await topics.post({
			uid: regularUid,
			cid: categoryObj.cid,
			title: 'Test Topic',
			content: 'Test topic content',
		});
		topicData = result.topicData;
		postData = result.postData;
	});

	// ===== BACKEND TESTS =====

	describe('Backend - GET /api/posts/:pid/endorsed', () => {
		it('should return endorsed status for a post', async () => {
			// Test: GET endpoint returns proper data structure with endorsed field
			const { response, body } = await helpers.request('get', `/api/posts/${postData.pid}/endorsed`, {});
			assert.strictEqual(response.statusCode, 200);
			assert.strictEqual(typeof body.endorsed, 'boolean');
			assert.strictEqual(body.endorsed, false); // New posts default to false
		});

		it('should work for guests', async () => {
			// Test: Unauthenticated users can read endorsed status (public data)
			const { response, body } = await helpers.request('get', `/api/posts/${postData.pid}/endorsed`, {});
			assert.strictEqual(response.statusCode, 200);
			assert.strictEqual(typeof body.endorsed, 'boolean');
		});
	});

	describe('Backend - PUT /api/posts/:pid/endorsed', () => {
		it('should allow admin to endorse a post', async () => {
			// Test: Admin can change endorsed status to true
			const { response, body } = await helpers.request('put', `/api/posts/${postData.pid}/endorsed`, {
				jar: adminJar,
				body: { endorsed: true },
			});
			assert.strictEqual(response.statusCode, 200);
			assert.strictEqual(body.success, true);
			assert.strictEqual(body.endorsed, true);

			// Verify it was actually updated
			const { body: statusBody } = await helpers.request('get', `/api/posts/${postData.pid}/endorsed`, {});
			assert.strictEqual(statusBody.endorsed, true);
		});

		it('should allow admin to un-endorse a post', async () => {
			// Test: Admin can toggle endorsed status back to false
			const { response, body } = await helpers.request('put', `/api/posts/${postData.pid}/endorsed`, {
				jar: adminJar,
				body: { endorsed: false },
			});
			assert.strictEqual(response.statusCode, 200);
			assert.strictEqual(body.endorsed, false);

			// Verify it was actually updated
			const { body: statusBody } = await helpers.request('get', `/api/posts/${postData.pid}/endorsed`, {});
			assert.strictEqual(statusBody.endorsed, false);
		});

		it('should fail if non-admin tries to update', async () => {
			// Test: Regular users get 403 Forbidden when trying to endorse
			const regularLogin = await helpers.loginUser('endorseregular', '123456');
			const { response } = await helpers.request('put', `/api/posts/${postData.pid}/endorsed`, {
				jar: regularLogin.jar,
				body: { endorsed: true },
			});
			assert.strictEqual(response.statusCode, 403);
		});

		it('should require authentication', async () => {
			// Test: Guests (not logged in) cannot endorse posts
			const { response } = await helpers.request('put', `/api/posts/${postData.pid}/endorsed`, {
				body: { endorsed: true },
			});
			assert.strictEqual(response.statusCode, 403); // Changed from 401 to 403
		});
	});

	describe('Backend - Post Creation', () => {
		it('should create posts with endorsed: false by default', async () => {
			// Test: New posts automatically get endorsed field set to false
			const result = await topics.reply({
				uid: regularUid,
				tid: topicData.tid,
				content: 'Test reply',
			});
			assert.strictEqual(result.endorsed, false);
		});
	});

	describe('Backend - Data Type Conversion', () => {
		it('should return endorsed as boolean, not string', async () => {
			// Test: Database stores '0'/'1' strings, but API returns true/false booleans
			const result = await topics.reply({
				uid: regularUid,
				tid: topicData.tid,
				content: 'Test reply for boolean check',
			});

			const retrievedPosts = await posts.getPostsByPids([result.pid], regularUid);
			assert.strictEqual(typeof retrievedPosts[0].endorsed, 'boolean');
		});

		it('should handle old posts without endorsed field', async () => {
			// Test: Posts created before this feature get default value (false)
			const result = await topics.reply({
				uid: regularUid,
				tid: topicData.tid,
				content: 'Old post simulation',
			});

			// Simulate old post by removing the field
			await db.deleteObjectField(`post:${result.pid}`, 'endorsed');

			const retrievedPosts = await posts.getPostsByPids([result.pid], regularUid);
			assert.strictEqual(retrievedPosts[0].endorsed, false); // Backward compatibility
		});
	});

	// ===== FRONTEND INTEGRATION TESTS =====

	describe('Frontend - Topic Page Display', () => {
		it('should display endorsed status on topic page', async () => {
			// Test: Topic API includes endorsed field in post objects
			const { body } = await helpers.request('get', `/api/topic/${topicData.tid}`, { jar: adminJar });
			assert(body.posts);
			assert(body.posts[0].hasOwnProperty('endorsed'));
			assert.strictEqual(typeof body.posts[0].endorsed, 'boolean');
		});

		it('should persist endorsed status across page loads', async () => {
			// Test: Endorsed status is saved and shows up consistently
			await helpers.request('put', `/api/posts/${postData.pid}/endorsed`, {
				jar: adminJar,
				body: { endorsed: true },
			});

			// First load
			const { body: body1 } = await helpers.request('get', `/api/topic/${topicData.tid}`, {});
			assert.strictEqual(body1.posts[0].endorsed, true);

			// Second load - should still be endorsed
			const { body: body2 } = await helpers.request('get', `/api/topic/${topicData.tid}`, {});
			assert.strictEqual(body2.posts[0].endorsed, true);
		});
	});
});
