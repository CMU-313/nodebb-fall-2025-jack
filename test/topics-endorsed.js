'use strict';

const assert = require('assert');

const User = require('../src/user');
const topics = require('../src/topics');
const posts = require('../src/posts');
const categories = require('../src/categories');
const db = require('../src/database');
const helpers = require('./helpers');

describe('Endorsed filter', () => {
	let adminUid;
	let cat;
	let tA;
	let tB;
	let tC;

	before(async () => {
		adminUid = await User.create({ username: 'endorse_admin', password: 'Pwd123456!' });
		const groups = require('../src/groups');
		await groups.join('administrators', adminUid);
		cat = await categories.create({ name: 'Endorse Cat', description: 'cat for endorse tests' });

		// Create three topics
		tA = (await topics.post({ uid: adminUid, title: 'A', content: 'A', cid: cat.cid })).topicData.tid;
		tB = (await topics.post({ uid: adminUid, title: 'B', content: 'B', cid: cat.cid })).topicData.tid;
		tC = (await topics.post({ uid: adminUid, title: 'C', content: 'C', cid: cat.cid })).topicData.tid;
	});

	it('Topics.filterEndorsedTids returns only endorsed topic tids', async () => {
		// Add a reply to topic B and mark it endorsed
		const reply = await posts.create({ uid: adminUid, tid: tB, content: 'endorsed reply' });
		// Manually set endorsed flag on the reply
		await posts.setPostField(reply.pid, 'endorsed', 1);

		const tids = [String(tA), String(tB), String(tC)];
		const filtered = await topics.filterEndorsedTids(tids);
		assert.deepStrictEqual(filtered.sort(), [String(tB)].sort());
	});

	it('Topics.filterEndorsedTids handles empty input gracefully', async () => {
		const filtered = await topics.filterEndorsedTids([]);
		assert.deepStrictEqual(filtered, []);
	});

	it('Topics.filterEndorsedTids returns multiple endorsed tids when present', async () => {
		// Add endorsed replies to topic A and C as well (topic B already has one from first test)
		const r1 = await posts.create({ uid: adminUid, tid: tA, content: 'endorsed A' });
		await posts.setPostField(r1.pid, 'endorsed', 1);
		const r2 = await posts.create({ uid: adminUid, tid: tC, content: 'endorsed C' });
		await posts.setPostField(r2.pid, 'endorsed', 1);

		const tids = [String(tA), String(tB), String(tC)];
		const filtered = await topics.filterEndorsedTids(tids);
		// all three topics should now be endorsed
		assert.deepStrictEqual(filtered.sort(), [String(tA), String(tB), String(tC)].sort());
		await posts.setPostField(r1.pid, 'endorsed', 0);
		await posts.setPostField(r2.pid, 'endorsed', 0);
	});

	it('categories.getCategoryById with filter=endorsed returns only endorsed topics', async () => {
		
		const data = await categories.getCategoryById({ uid: adminUid, cid: cat.cid, start: 0, stop: 10, settings: { topicsPerPage: 10 }, query: { filter: 'endorsed' } });
		// Ensure only topic B is present (has endorsed reply from first test)
		const tids = data.topics.map(t => String(t.tid));
		assert.deepStrictEqual(tids, [String(tB)]);
	});

	it('categories.getCategoryById without filter=endorsed uses default sort option', async () => {
	// Call category fetch normally (no endorsed filter)
		const data = await categories.getCategoryById({
			uid: adminUid,
			cid: cat.cid,
			start: 0,
			stop: 10,
			settings: { topicsPerPage: 10 },
			query: {}, // no filter key
		});

		// Should include all topics, since we're not filtering by 'endorsed'
		const tids = data.topics.map(t => String(t.tid));
		assert(tids.includes(String(tA)));
		assert(tids.includes(String(tB)));
		assert(tids.includes(String(tC)));

		it('categories.getCategoryById without filter=endorsed uses default sort option', async () => {
			const data = await categories.getCategoryById({
				uid: adminUid,
				cid: cat.cid,
				start: 0,
				stop: 10,
				settings: { topicsPerPage: 10 },
				query: {}, // no filter key
			});

			// Verify it returns all topics (non-endorsed case)
			const tids = data.topics.map(t => String(t.tid));
			assert(tids.includes(String(tA)));
			assert(tids.includes(String(tB)));
			assert(tids.includes(String(tC)));
		});
	});

	it('handles tids containing null or invalid topic IDs gracefully', async () => {
		const filtered = await topics.filterEndorsedTids([null, undefined, '']);
		assert.deepStrictEqual(filtered, []);
	});

	it('returns null for topics with no posts', async () => {
		// Create a fake topic with no mainPid/posts
		const fakeTid = await db.incrObjectField('topic:next', 'tid');
		const filtered = await topics.filterEndorsedTids([String(fakeTid)]);
		assert.deepStrictEqual(filtered, []);
	});

	it('returns null if posts have no endorsed field', async () => {
		const tid = (await topics.post({ uid: adminUid, title: 'NoEndorse', content: 'test', cid: cat.cid })).topicData.tid;
		// Force remove "endorsed" field from post
		const [pid] = await posts.getPidsFromSet(`tid:${tid}:posts`, 0, -1, false);
		await db.deleteObjectField(`post:${pid}`, 'endorsed');
		const filtered = await topics.filterEndorsedTids([String(tid)]);
		assert.deepStrictEqual(filtered, []);
	});

	it('handles internal errors gracefully (catch block)', async () => {
		const original = posts.getPostsFields;
		posts.getPostsFields = () => { throw new Error('mock failure'); };
		const filtered = await topics.filterEndorsedTids([String(tA)]);
		assert.deepStrictEqual(filtered, []);
		posts.getPostsFields = original;
	});



});
