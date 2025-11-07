'use strict';

define('forum/topic/translate', [
	'api',
	'alerts',
	'components',
], function (api, alerts, components) {
	const Translate = {};

	Translate.init = function () {
		addTranslateHandlers();
	};

	function addTranslateHandlers() {
		const postContainer = components.get('topic');

		postContainer.on('click', '[component="post/translate"]', function (e) {
			e.preventDefault();
			const postEl = $(this).parents('[data-pid]');
			translatePost(postEl);
		});
	}

	function translatePost(postEl) {
		const pid = postEl.attr('data-pid');
		const contentEl = postEl.find('[component="post/content"]');
		const translationEl = postEl.find('[component="post/translation"]');

		// Get the text content (strip HTML)
		const originalText = contentEl.text().trim();

		if (!originalText) {
			alerts.error('No text to translate');
			return;
		}

		// Show loading state
		translationEl.removeClass('hidden').html('<i class="fa fa-spinner fa-spin"></i> Translating to English...');

		// Make API call to translation endpoint (always translate to English)
		api.post('/posts/' + pid + '/translate', {
			text: originalText,
			targetLanguage: 'en',
		})
			.then(function (response) {
				if (response && response.translatedText) {
					// Display translated text underneath
					translationEl.html(escapeHtml(response.translatedText));
				} else {
					alerts.error('Translation failed');
					translationEl.addClass('hidden');
				}
			})
			.catch(function (err) {
				console.error('Translation error:', err);
				alerts.error(err.message || 'Translation failed');
				translationEl.addClass('hidden');
			});
	}

	function escapeHtml(text) {
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	return Translate;
});

