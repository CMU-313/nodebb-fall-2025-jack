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

});
