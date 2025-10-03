'use strict';

const assert = require('assert');

const Emailer = require('../src/emailer');
const mailgunPlugin = require('../nodebb-plugin-mailgun-delivery/library.js');

describe('emailer mailgun integration', () => {
	describe('payload sanitization', () => {
		let origSend;

		before(() => {
			origSend = mailgunPlugin.sendViaMailgun;
			// Replace plugin with a spy that just echoes back the payload
			mailgunPlugin.sendViaMailgun = async (data) => {
				return { received: data };
			};
		});

		after(() => {
			mailgunPlugin.sendViaMailgun = origSend;
		});

		it('ensures from is stringified and headers are normalized', async () => {
			const data = {
				to: 'recipient@example.org',
				from_name: 'NodeBB',
				from: { address: 'no-reply@example.org' }, // simulate legacy format
				subject: 'Test',
				html: '<p>hi</p>',
				plaintext: 'hi',
				headers: {
					'List-Unsubscribe': ['http://example.org/unsub'],
					'X-Custom': { obj: true },
				},
			};

			const res = await Emailer.sendViaFallback(data);
			const received = res.received;

			// from should have been converted to string
			assert.strictEqual(typeof received.from, 'string');
			assert(received.from.includes('NodeBB'), 'from should include display name');

			// plaintext should be moved to text
			assert.strictEqual(received.text, 'hi');

			// headers should be stringified
			if (received.headers) {
				assert.strictEqual(typeof received.headers['List-Unsubscribe'], 'string');
				assert.strictEqual(typeof received.headers['X-Custom'], 'string');
			} else {
				// or the plugin might flatten them into h: keys
				assert.strictEqual(typeof received['h:List-Unsubscribe'], 'string');
				assert.strictEqual(typeof received['h:X-Custom'], 'string');
			}
		});
	});

	describe('error normalization', () => {
		let origSend;

		before(() => {
			origSend = mailgunPlugin.sendViaMailgun;
		});

		after(() => {
			mailgunPlugin.sendViaMailgun = origSend;
		});

		it('wraps non-Error rejections into Error instances', async () => {
			// Simulate plugin rejecting with plain object instead of Error
			mailgunPlugin.sendViaMailgun = async () => {
				throw { detail: 'bad', code: 401 };
			};

			const data = {
				to: 'recipient@example.org',
				from_name: 'NodeBB',
				from: 'no-reply@example.org',
				subject: 'Test',
				html: '<p>hi</p>',
				plaintext: 'hi',
			};

			let thrown;
			try {
				await Emailer.sendViaFallback(data);
			} catch (err) {
				thrown = err;
			}

			assert(thrown instanceof Error, 'should wrap into an Error');
			assert(thrown.originalError && typeof thrown.originalError === 'object', 'originalError should be attached');
		});
	});
});
