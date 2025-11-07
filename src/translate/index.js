/* eslint-disable strict */

'use strict';

const translatorApi = module.exports;

const BASE = process.env.TRANSLATOR_API_BASE || 'http://localhost:3001';

translatorApi.translate = async function (postData) {
	try {
		const content = postData.content || '';
		const url = `${BASE}/api/translate?text=${encodeURIComponent(content)}`;
		const response = await fetch(url);
		
		if (!response.ok) {
			// On error, assume it's English and return empty translation
			return [true, ''];
		}
		
		const data = await response.json();
		// Expecting: { ok, input, translation }
		// If ok is false or no translation, it's English
		const isEnglish = data.ok === false || !data.translation;
		return [isEnglish, data.translation || ''];
	} catch (error) {
		console.error('Translation error:', error);
		// On error, assume it's English
		return [true, ''];
	}
};