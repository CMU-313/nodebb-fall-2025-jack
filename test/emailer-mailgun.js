'use strict';

const assert = require('assert');
const Emailer = require('../src/emailer');
const mailgunPlugin = require('../nodebb-plugin-mailgun-delivery/library.js');

describe('emailer mailgun integration', () => {
	let origSend;

	before(() => {
		origSend = mailgunPlugin.sendViaMailgun;
	});

	after(() => {
		mailgunPlugin.sendViaMailgun = origSend;
	});

	describe('payload sanitization', () => {
		beforeEach(() => {
			// Spy that echoes back payload
			mailgunPlugin.sendViaMailgun = async (data) => ({ received: data });
		});

		it('ensures from is stringified and headers are normalized', async () => {
			const data = {
				to: 'recipient@example.org',
				from_name: 'NodeBB',
				from: { address: 'no-reply@example.org' }, // legacy format
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

			assert.strictEqual(typeof received.from, 'string');
			assert(received.from.includes('NodeBB'), 'from should include display name');

			// plaintext should be moved to text
			assert.strictEqual(received.text, 'hi');

			// headers should be stringified or flattened
			if (received.headers) {
				assert.strictEqual(typeof received.headers['List-Unsubscribe'], 'string');
				assert.strictEqual(typeof received.headers['X-Custom'], 'string');
			} else {
				assert.strictEqual(typeof received['h:List-Unsubscribe'], 'string');
				assert.strictEqual(typeof received['h:X-Custom'], 'string');
			}
		});

		it('handles from as plain string', async () => {
			const data = {
				to: 'a@b.com',
				from: 'direct@example.org',
				subject: 'Hi',
				html: '<p>Hello</p>',
			};

			const res = await Emailer.sendViaFallback(data);
			assert.strictEqual(res.received.from, 'direct@example.org');
		});

		it('handles from as object without from_name', async () => {
			const data = {
				to: 'a@b.com',
				from: { address: 'test@ex.org' },
				subject: 'Hi',
				html: '<p>Hello</p>',
			};

			const res = await Emailer.sendViaFallback(data);
			assert.strictEqual(res.received.from, 'test@ex.org');
		});

		it('handles missing headers gracefully', async () => {
			const data = {
				to: 'x@x.com',
				from_name: 'NodeBB',
				from: 'no-reply@example.org',
				subject: 'T',
				html: '<p>hi</p>',
			};

			const res = await Emailer.sendViaFallback(data);
			assert.ok(res.received);
			assert.strictEqual(typeof res.received.from, 'string');
		});

		it('normalizes null/undefined header values', async () => {
			const data = {
				to: 'recipient@example.org',
				from_name: 'NodeBB',
				from: 'no-reply@example.org',
				headers: {
					A: null,
					B: undefined,
				},
				html: '<p>hi</p>',
			};

			const res = await Emailer.sendViaFallback(data);
			assert.strictEqual(res.received.headers.A, '');
			assert.strictEqual(res.received.headers.B, '');
		});

		it('does not overwrite existing text when plaintext is also present', async () => {
			const data = {
				to: 'recipient@example.org',
				from_name: 'NodeBB',
				from: 'no-reply@example.org',
				text: 'already here',
				plaintext: 'should not replace',
				html: '<p>hi</p>',
			};

			const res = await Emailer.sendViaFallback(data);
			assert.strictEqual(res.received.text, 'already here');
		});
	});

	describe('error normalization', () => {
		it('wraps non-Error rejections into Error instances', async () => {
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
			assert(thrown.message.includes('Mailgun send failed'));
		});

		it('propagates actual Error from plugin without rewrapping', async () => {
			mailgunPlugin.sendViaMailgun = async () => {
				throw new Error('MG fail');
			};

			const data = { from: 'a@b.com' };

			let caught;
			try {
				await Emailer.sendViaFallback(data);
			} catch (err) {
				caught = err;
			}
			assert.strictEqual(caught.message, 'MG fail');
			assert.ok(caught instanceof Error);
		});
	});

	describe('formatEmailErr utility', () => {
		it('returns stack or message for Error instance', () => {
			const err = new Error('boom');
			const result = Emailer.formatEmailErr(err);
			assert(result.includes('boom'));
		});

		it('stringifies plain object errors', () => {
			const result = Emailer.formatEmailErr({ reason: 'bad' });
			assert(result.includes('"reason"'));
		});

		it('returns string as-is', () => {
			const result = Emailer.formatEmailErr('custom string');
			assert.strictEqual(result, 'custom string');
		});

		it('returns "Unknown error" when null', () => {
			const result = Emailer.formatEmailErr(null);
			assert.strictEqual(result, 'Unknown error (no error object)');
		});
	});
});
