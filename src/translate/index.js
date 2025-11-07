'use strict';

const translatorApi = module.exports;

const BASE = process.env.TRANSLATOR_API_BASE || 'http://localhost:5000';

translatorApi.translate = async function (postData) {
	try {
		const content = postData.content || '';
		const url = `${BASE}/?content=${encodeURIComponent(content)}`;
		const response = await fetch(url);
		
		if (!response.ok) {
			// On error, assume it's English and return empty translation
			return [true, ''];
		}
		
		const data = await response.json();
		// Expecting: { is_english: bool, translated_content: str }
		const isEnglish = data.is_english !== false;
		// Ensure translatedContent is always a string, handle null/undefined
		const translatedContent = data.translated_content != null ? String(data.translated_content) : '';
		return [isEnglish, translatedContent];
	} catch (error) {
		console.error('Translation error:', error);
		// On error, assume it's English
		return [true, ''];
	}
};