'use strict';

const assert = require('assert');
const nock = require('nock');

const translate = require('../src/translate');

describe('Translation Module', () => {
	const mockContent = 'Hola mundo';
	const baseUrl = 'http://localhost:5000';

	before(() => {
		// Set the environment variable for tests
		process.env.TRANSLATOR_API_BASE = baseUrl;
	});

	after(() => {
		// Clean up
		delete process.env.TRANSLATOR_API_BASE;
	});

	afterEach(() => {
		nock.cleanAll();
	});

	describe('Unit Tests', () => {
		it('should return isEnglish=false and translated content for non-English text', async () => {
			nock(baseUrl)
				.get('/')
				.query({ content: mockContent })
				.reply(200, {
					is_english: false,
					translated_content: 'Hello world',
				});

			const result = await translate.translate({ content: mockContent });
			assert(Array.isArray(result));
			assert.strictEqual(result[0], false); // isEnglish
			assert.strictEqual(result[1], 'Hello world'); // translatedContent
		});

		it('should return isEnglish=true for English text', async () => {
			nock(baseUrl)
				.get('/')
				.query({ content: 'Hello world' })
				.reply(200, {
					is_english: true,
					translated_content: '',
				});

			const result = await translate.translate({ content: 'Hello world' });
			assert(Array.isArray(result));
			assert.strictEqual(result[0], true); // isEnglish
			assert.strictEqual(result[1], ''); // translatedContent (empty for English)
		});

		it('should handle empty content gracefully', async () => {
			nock(baseUrl)
				.get('/')
				.query({ content: '' })
				.reply(200, {
					is_english: true,
					translated_content: '',
				});

			const result = await translate.translate({ content: '' });
			assert(Array.isArray(result));
			assert.strictEqual(result[0], true);
			assert.strictEqual(result[1], '');
		});
	});

	describe('Mock Tests - Error Handling', () => {
		it('should handle network errors gracefully', async () => {
			nock(baseUrl)
				.get('/')
				.query({ content: mockContent })
				.replyWithError('Network error');

			const result = await translate.translate({ content: mockContent });
			// On error, should default to English
			assert(Array.isArray(result));
			assert.strictEqual(result[0], true);
			assert.strictEqual(result[1], '');
		});

		it('should handle HTTP error responses (500)', async () => {
			nock(baseUrl)
				.get('/')
				.query({ content: mockContent })
				.reply(500, 'Internal Server Error');

			const result = await translate.translate({ content: mockContent });
			// On error, should default to English
			assert(Array.isArray(result));
			assert.strictEqual(result[0], true);
			assert.strictEqual(result[1], '');
		});

		it('should handle malformed JSON response', async () => {
			nock(baseUrl)
				.get('/')
				.query({ content: mockContent })
				.reply(200, 'Not a JSON response');

			const result = await translate.translate({ content: mockContent });
			// On error, should default to English
			assert(Array.isArray(result));
			assert.strictEqual(result[0], true);
			assert.strictEqual(result[1], '');
		});

		it('should handle missing fields in API response', async () => {
			nock(baseUrl)
				.get('/')
				.query({ content: mockContent })
				.reply(200, {
					// Missing is_english and translated_content
					some_other_field: 'value',
				});

			const result = await translate.translate({ content: mockContent });
			// Should handle missing fields gracefully
			assert(Array.isArray(result));
			assert.strictEqual(result[0], true); // Defaults to English
			assert.strictEqual(result[1], '');
		});

		it('should handle unexpected data types in response', async () => {
			nock(baseUrl)
				.get('/')
				.query({ content: mockContent })
				.reply(200, {
					is_english: 'not a boolean',
					translated_content: 12345, // Not a string
				});

			const result = await translate.translate({ content: mockContent });
			// Should still return an array
			assert(Array.isArray(result));
			assert.strictEqual(typeof result[0], 'boolean');
			assert.strictEqual(typeof result[1], 'string');
		});
	});

	describe('Edge Cases', () => {
		it('should handle very long text', async () => {
			const longText = 'a'.repeat(10000);
			nock(baseUrl)
				.get('/')
				.query({ content: longText })
				.reply(200, {
					is_english: true,
					translated_content: '',
				});

			const result = await translate.translate({ content: longText });
			assert(Array.isArray(result));
			assert.strictEqual(result[0], true);
		});

		it('should handle special characters', async () => {
			const specialText = '¡Hola! ¿Cómo estás? 你好';
			nock(baseUrl)
				.get('/')
				.query({ content: specialText })
				.reply(200, {
					is_english: false,
					translated_content: 'Hello! How are you? Hello',
				});

			const result = await translate.translate({ content: specialText });
			assert(Array.isArray(result));
			assert.strictEqual(result[0], false);
		});

		it('should handle undefined postData', async () => {
			const result = await translate.translate({});
			assert(Array.isArray(result));
			// Should handle gracefully
		});
	});
});

