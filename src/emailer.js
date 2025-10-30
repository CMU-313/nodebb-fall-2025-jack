'use strict';

const winston = require('winston');
const nconf = require('nconf');
const Benchpress = require('benchpressjs');
const nodemailer = require('nodemailer');
const wellKnownServices = require('nodemailer/lib/well-known/services');
const { htmlToText } = require('html-to-text');
const url = require('url');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const db = require('./database');
const User = require('./user');
const Plugins = require('./plugins');
const meta = require('./meta');
const translator = require('./translator');
const pubsub = require('./pubsub');
const file = require('./file');

const viewsDir = nconf.get('views_dir');
const Emailer = module.exports;


// custom plugin code to send emails via Mailgun API
const mailgunSender = require('../nodebb-plugin-mailgun-delivery/library.js');

// Helper to create a robust, human-friendly error string for email sends
function formatEmailErr(err) {
	if (!err) {
		return 'Unknown error (no error object)';
	}
	if (err instanceof Error) {
		return err.stack || err.message || String(err);
	}
	try {
		const serialized = typeof err === 'string' ? err : JSON.stringify(err);
		return serialized;
	} catch (e) {
		return String(err);
	}
}
Emailer.formatEmailErr = formatEmailErr;

let prevConfig;
let app;

Emailer.fallbackNotFound = false;

Emailer.transports = {
	sendmail: nodemailer.createTransport({
		sendmail: true,
		newline: 'unix',
	}),
	smtp: undefined,
};

Emailer.listServices = () => Object.keys(wellKnownServices);
Emailer._defaultPayload = {};

const smtpSettingsChanged = (config) => {
	const settings = [
		'email:smtpTransport:enabled',
		'email:smtpTransport:pool',
		'email:smtpTransport:user',
		'email:smtpTransport:pass',
		'email:smtpTransport:service',
		'email:smtpTransport:port',
		'email:smtpTransport:host',
		'email:smtpTransport:security',
	];
	// config only has these properties if settings are saved on /admin/settings/email
	return settings.some(key => config.hasOwnProperty(key) && config[key] !== prevConfig[key]);
};

const getHostname = () => {
	const configUrl = nconf.get('url');
	const parsed = url.parse(configUrl);
	return parsed.hostname;
};

const buildCustomTemplates = async (config) => {
	try {
		// If the new config contains any email override values, re-compile those templates
		const toBuild = Object
			.keys(config)
			.filter(prop => prop.startsWith('email:custom:'))
			.map(key => key.split(':')[2]);

		if (!toBuild.length) {
			return;
		}

		const [templates, allPaths] = await Promise.all([
			Emailer.getTemplates(config),
			file.walk(viewsDir),
		]);

		const templatesToBuild = templates.filter(template => toBuild.includes(template.path));
		const paths = _.fromPairs(allPaths.map((p) => {
			const relative = path.relative(viewsDir, p).replace(/\\/g, '/');
			return [relative, p];
		}));

		await Promise.all(templatesToBuild.map(async (template) => {
			const source = await meta.templates.processImports(paths, template.path, template.text);
			const compiled = await Benchpress.precompile(source, { filename: template.path });
			await fs.promises.writeFile(template.fullpath.replace(/\.tpl$/, '.js'), compiled);
		}));

		Benchpress.flush();
		winston.verbose('[emailer] Built custom email templates');
	} catch (err) {
		winston.error(`[emailer] Failed to build custom email templates\n${err.stack}`);
	}
};

Emailer.getTemplates = async (config) => {
	const emailsPath = path.join(viewsDir, 'emails');
	let emails = await file.walk(emailsPath);
	emails = emails.filter(email => !email.endsWith('.js'));

	const templates = await Promise.all(emails.map(async (email) => {
		const path = email.replace(emailsPath, '').slice(1).replace('.tpl', '');
		const original = await fs.promises.readFile(email, 'utf8');

		return {
			path: path,
			fullpath: email,
			text: config[`email:custom:${path}`] || original,
			original: original,
			isCustom: !!config[`email:custom:${path}`],
		};
	}));
	return templates;
};

Emailer.setupFallbackTransport = (config) => {
	winston.verbose('[emailer] Setting up fallback transport');
	// Enable SMTP transport if enabled in ACP
	if (parseInt(config['email:smtpTransport:enabled'], 10) === 1) {
		const smtpOptions = {
			name: getHostname(),
			pool: config['email:smtpTransport:pool'],
		};

		if (config['email:smtpTransport:user'] || config['email:smtpTransport:pass']) {
			smtpOptions.auth = {
				user: config['email:smtpTransport:user'],
				pass: config['email:smtpTransport:pass'],
			};
		}

		if (config['email:smtpTransport:service'] === 'nodebb-custom-smtp') {
			smtpOptions.port = config['email:smtpTransport:port'];
			smtpOptions.host = config['email:smtpTransport:host'];

			if (config['email:smtpTransport:security'] === 'NONE') {
				smtpOptions.secure = false;
				smtpOptions.requireTLS = false;
				smtpOptions.ignoreTLS = true;
			} else if (config['email:smtpTransport:security'] === 'STARTTLS') {
				smtpOptions.secure = false;
				smtpOptions.requireTLS = true;
				smtpOptions.ignoreTLS = false;
			} else {
				// meta.config['email:smtpTransport:security'] === 'ENCRYPTED' or undefined
				smtpOptions.secure = true;
				smtpOptions.requireTLS = true;
				smtpOptions.ignoreTLS = false;
			}
		} else {
			smtpOptions.service = String(config['email:smtpTransport:service']);
		}
		if (config['email:smtpTransport:allow-self-signed']) {
			smtpOptions.tls = {
				rejectUnauthorized: false,
			};
		}
		Emailer.transports.smtp = nodemailer.createTransport(smtpOptions);
		Emailer.fallbackTransport = Emailer.transports.smtp;
	} else {
		Emailer.fallbackTransport = Emailer.transports.sendmail;
	}
};

Emailer.registerApp = (expressApp) => {
	app = expressApp;

	let logo = null;
	if (meta.config.hasOwnProperty('brand:emailLogo')) {
		logo = (!meta.config['brand:emailLogo'].startsWith('http') ? nconf.get('url') : '') + meta.config['brand:emailLogo'];
	}

	Emailer._defaultPayload = {
		url: nconf.get('url'),
		site_title: meta.config.title || 'NodeBB',
		logo: {
			src: logo,
			height: meta.config['brand:emailLogo:height'],
			width: meta.config['brand:emailLogo:width'],
		},
	};

	Emailer.setupFallbackTransport(meta.config);
	buildCustomTemplates(meta.config);

	// need to shallow clone the config object
	// otherwise prevConfig holds reference to meta.config object,
	// which is updated before the pubsub handler is called
	prevConfig = { ...meta.config };

	pubsub.on('config:update', (config) => {
		// config object only contains properties for the specific acp settings page
		// not the entire meta.config object
		if (config) {
			// Update default payload if new logo is uploaded
			if (config.hasOwnProperty('brand:emailLogo')) {
				Emailer._defaultPayload.logo.src = config['brand:emailLogo'];
			}
			if (config.hasOwnProperty('brand:emailLogo:height')) {
				Emailer._defaultPayload.logo.height = config['brand:emailLogo:height'];
			}
			if (config.hasOwnProperty('brand:emailLogo:width')) {
				Emailer._defaultPayload.logo.width = config['brand:emailLogo:width'];
			}

			if (smtpSettingsChanged(config)) {
				Emailer.setupFallbackTransport(config);
			}
			buildCustomTemplates(config);

			prevConfig = { ...prevConfig, ...config };
		}
	});

	return Emailer;
};

Emailer.send = async (template, uid, params) => {
	if (!app) {
		throw Error('[emailer] App not ready!');
	}

	let userData = await User.getUserFields(uid, ['email', 'username', 'email:confirmed', 'banned']);
	
	if (!userData) {
		throw new Error(`No user found for uid ${uid}`);
	} else {
		console.log('Emailer.send called', userData);
	}

	// 'welcome' and 'verify-email' explicitly used passed-in email address
	if (['welcome', 'verify-email'].includes(template)) {
		userData.email = params.email;
	} else if (meta.config.includeUnverifiedEmails && !userData.email) {
		// get unconfirmed email to use
		const code = await db.get(`confirm:byUid:${uid}`);
		const confirmObj = code ? await db.getObject(`confirm:${code}`) : null;
		if (confirmObj && confirmObj.email) {
			userData.email = String(confirmObj.email);
		}
	}

	({ template, userData, params } = await Plugins.hooks.fire('filter:email.prepare', { template, uid, userData, params }));

	if (!meta.config.sendEmailToBanned && template !== 'banned') {
		if (userData.banned) {
			winston.warn(`[emailer/send] User ${userData.username} (uid: ${uid}) is banned; not sending email due to system config.`);
			return;
		}
	}

	if (!userData || !userData.email) {
		if (process.env.NODE_ENV === 'development') {
			winston.warn(`uid : ${uid} has no email, not sending "${template}" email.`);
		}
		return;
	}

	const allowedTpls = ['verify-email', 'welcome', 'registration_accepted', 'reset', 'reset_notify'];
	if (!meta.config.includeUnverifiedEmails && !userData['email:confirmed'] && !allowedTpls.includes(template)) {
		if (process.env.NODE_ENV === 'development') {
			winston.warn(`uid : ${uid} (${userData.email}) has not confirmed email, not sending "${template}" email.`);
		}
		return;
	}
	const userSettings = await User.getSettings(uid);
	// Combined passed-in payload with default values
	params = { ...Emailer._defaultPayload, ...params };
	params.uid = uid;
	params.username = userData.username;
	params.displayname = userData.displayname;
	params.rtl = await translator.translate('[[language:dir]]', userSettings.userLang) === 'rtl';

	const result = await Plugins.hooks.fire('filter:email.cancel', {
		cancel: false, // set to true in plugin to cancel sending email
		template: template,
		params: params,
	});

	if (result.cancel) {
		return;
	}
	await Emailer.sendToEmail(template, userData.email, userSettings.userLang, params);
};

Emailer.sendToEmail = async (template, email, language, params) => {
	console.log('SendToEmail called:', {email, params });

	const lang = language || meta.config.defaultLang || 'en-GB';
	const unsubscribable = ['digest', 'notification'];

	// Digests and notifications can be one-click unsubbed
	let payload = {
		template: template,
		uid: params.uid,
	};

	if (unsubscribable.includes(template)) {
		if (template === 'notification') {
			payload.type = params.notification.type;
		}
		payload = jwt.sign(payload, nconf.get('secret'), {
			expiresIn: '30d',
		});

		const unsubUrl = [nconf.get('url'), 'email', 'unsubscribe', payload].join('/');
		params.headers = {
			'List-Id': `<${[template, params.uid, getHostname()].join('.')}>`,
			'List-Unsubscribe': `<${unsubUrl}>`,
			'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
			...params.headers,
		};
		params.unsubUrl = unsubUrl;
	}

	const result = await Plugins.hooks.fire('filter:email.params', {
		template: template,
		email: email,
		language: lang,
		params: params,
	});

	template = result.template;
	email = result.email;
	params = result.params;

	const [html, subject] = await Promise.all([
		Emailer.renderAndTranslate(template, params, result.language),
		translator.translate(params.subject, result.language),
	]);

	const data = await Plugins.hooks.fire('filter:email.modify', {
		_raw: params,
		to: email,
		from: meta.config['email:from'] || `no-reply@${getHostname()}`,
		from_name: meta.config['email:from_name'] || 'NodeBB',
		subject: `[${meta.config.title}] ${_.unescape(subject)}`,
		html: html,
		plaintext: htmlToText(html, {
			tags: { img: { format: 'skip' } },
		}),
		template: template,
		uid: params.uid,
		pid: params.pid,
		fromUid: params.fromUid,
		headers: params.headers,
		rtl: params.rtl,
	});
	const usingFallback = !Plugins.hooks.hasListeners('filter:email.send') &&
		!Plugins.hooks.hasListeners('static:email.send');
	try {
		if (Plugins.hooks.hasListeners('static:email.send')) {
			await Plugins.hooks.fire('static:email.send', data);
		} else {
			await Emailer.sendViaFallback(data);
		}
	} catch (err) {
		if (err.code === 'ENOENT' && usingFallback) {
			Emailer.fallbackNotFound = true;
			throw new Error('[[error:sendmail-not-found]]');
		} else {
			throw err;
		}
	}
};

Emailer.sendViaFallback = async (data) => {
	console.log('[core-emailer] Redirecting email via Mailgun instead of sendmail');

	// use an address object for nodemailer, but Mailgun HTTP API expects `from` to be a string
	// so build a sanitized copy for the Mailgun plugin and avoid mutating the original `data`.
	const mailgunData = { ...data };

	// Ensure 'from' is a string Mailgun can parse: "Name <address>" or plain address
	if (data.from_name) {
		const fromAddr = (typeof data.from === 'object' && data.from.address) ? data.from.address : data.from;
		mailgunData.from = `"${data.from_name}" <${fromAddr}>`;
	} else if (typeof data.from === 'object' && data.from.address) {
		mailgunData.from = data.from.address;
	} else {
		mailgunData.from = data.from;
	}
	delete mailgunData.from_name;

	// Ensure plaintext/text is present (some hooks use `plaintext`)
	if (!mailgunData.text && mailgunData.plaintext) {
		mailgunData.text = mailgunData.plaintext;
		delete mailgunData.plaintext;
	}

	// Normalize headers to strings so Mailgun API doesn't receive objects
	if (mailgunData.headers) {
		for (const [k, v] of Object.entries(mailgunData.headers)) {
			if (v === undefined || v === null) {
				mailgunData.headers[k] = '';
			} else if (typeof v !== 'string') {
				try {
					mailgunData.headers[k] = JSON.stringify(v);
				} catch (e) {
					mailgunData.headers[k] = String(v);
				}
			}
		}
	}

	// Call the plugin which should return/resolves on success or throw/reject on failure
	try {
		const result = await mailgunSender.sendViaMailgun(mailgunData);
		return result;
	} catch (err) {
		// Always wrap into an Error, but use formatEmailErr to normalize message
		const normalized = err instanceof Error ? err : new Error(`Mailgun send failed: ${formatEmailErr(err)}`);

		// Keep original attached for debugging
		normalized.originalError = err;

		throw normalized;
	}
};

Emailer.renderAndTranslate = async (template, params, lang) => {
	const html = await app.renderAsync(`emails/${template}`, params);
	return await translator.translate(html, lang);
};

require('./promisify')(Emailer, ['transports']);