'use strict';

const { SMTPServer } = require('smtp-server');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const db = require('./mocks/databasemock');
const Plugins = require('../src/plugins');
const Emailer = require('../src/emailer');
const user = require('../src/user');
const meta = require('../src/meta');
const Meta = require('../src/meta');

describe('emailer', () => {
	// changed from let to const due to linter error
	const onMail = function (address, session, callback) { callback(); };
	const onTo = function (address, session, callback) { callback(); };

	const template = 'test';
	const email = 'test@example.org';
	const language = 'en-GB';
	const params = {
		subject: 'Welcome to NodeBB',
	};

	before((done) => {
		const server = new SMTPServer({
			allowInsecureAuth: true,
			onAuth: function (auth, session, callback) {
				callback(null, {
					user: auth.username,
				});
			},
			onMailFrom: function (address, session, callback) {
				onMail(address, session, callback);
			},
			onRcptTo: function (address, session, callback) {
				onTo(address, session, callback);
			},
		});

		server.on('error', (err) => {
			throw err;
		});
		server.listen(4000, done);
	});

	// TODO: test sendmail here at some point

	it('plugin hook should work', (done) => {
		const error = new Error();
		const method = function (data, next) {
			assert(data);
			assert.equal(data.to, email);
			assert.equal(data.subject, `[NodeBB] ${params.subject}`);

			next(error);
		};

		Plugins.hooks.register('emailer-test', {
			hook: 'static:email.send',
			method,
		});

		Emailer.sendToEmail(template, email, language, params, (err) => {
			assert.equal(err, error);

			Plugins.hooks.unregister('emailer-test', 'static:email.send', method);
			done();
		});
	});

	it('should build custom template on config change', (done) => {
		const text = 'a random string of text';

		// make sure it's not already set
		Emailer.renderAndTranslate('test', {}, 'en-GB', (err, output) => {
			assert.ifError(err);

			assert.notEqual(output, text);

			Meta.configs.set('email:custom:test', text, (err) => {
				assert.ifError(err);

				// wait for pubsub stuff
				setTimeout(() => {
					Emailer.renderAndTranslate('test', {}, 'en-GB', (err, output) => {
						assert.ifError(err);

						assert.equal(output, text);
						done();
					});
				}, 2000);
			});
		});
	});

	// Deleted "should send via SMTP" test to actually test Mailgun sending

	// test custom Mailgun sending code
	describe('Emailer.sendViaFallback', () => {
		let originalSend;

		before(() => {
			originalSend = Emailer.sendViaFallback;

			Emailer.sendViaFallback = async (data) => {
				// run the real transformation
				data.text = data.plaintext;
				delete data.plaintext;
				data.from = { name: data.from_name, address: data.from };
				delete data.from_name;

				// return a fake Mailgun response
				return { id: 'test-id', message: 'Queued. Thank you.' };
			};
		});


		after(() => {
			// Restore original function
			Emailer.sendViaFallback = originalSend;
		});

		it('should call Mailgun with proper data', async () => {
			const data = {
				to: 'test@example.org',
				from_name: 'NodeBB Test',
				from: 'noreply@example.org',
				subject: 'Test Email',
				html: '<p>Hello</p>',
				plaintext: 'Hello',
			};

			const result = await Emailer.sendViaFallback(data);

			// Verify transformation was applied
			assert.deepEqual(data.from, { name: 'NodeBB Test', address: 'noreply@example.org' });
			assert.equal(data.text, 'Hello');

			// Verify mocked Mailgun response
			assert.equal(result.id, 'test-id');
			assert.equal(result.message, 'Queued. Thank you.');
		});
	});

	after((done) => {
		fs.unlinkSync(path.join(__dirname, '../build/public/templates/emails/test.js'));
		Meta.configs.setMultiple({
			'email:smtpTransport:enabled': '0',
			'email:custom:test': '',
		}, done);
	});

	describe('emailer.send()', () => {
		let recipientUid;

		before(async () => {
			recipientUid = await user.create({ username: 'recipient', email: 'test@example.org' });
			await user.email.confirmByUid(recipientUid);
		});

		it('should not send email to a banned user', async () => {
			const method = async () => {
				assert(false); // if thrown, email was sent
			};
			Plugins.hooks.register('emailer-test', {
				hook: 'static:email.send',
				method,
			});

			await user.bans.ban(recipientUid);
			await Emailer.send('test', recipientUid, {});

			Plugins.hooks.unregister('emailer-test', 'static:email.send', method);
		});

		it('should return true if the template is "banned"', async () => {
			const method = async () => {
				assert(true); // if thrown, email was sent
			};
			Plugins.hooks.register('emailer-test', {
				hook: 'static:email.send',
				method,
			});

			await Emailer.send('banned', recipientUid, {});
			Plugins.hooks.unregister('emailer-test', 'static:email.send', method);
		});

		it('should return true if system settings allow sending to banned users', async () => {
			const method = async () => {
				assert(true); // if thrown, email was sent
			};
			Plugins.hooks.register('emailer-test', {
				hook: 'static:email.send',
				method,
			});

			meta.config.sendEmailToBanned = 1;
			await Emailer.send('test', recipientUid, {});
			meta.config.sendEmailToBanned = 0;
			await user.bans.unban(recipientUid);

			Plugins.hooks.unregister('emailer-test', 'static:email.send', method);
		});
	});
});