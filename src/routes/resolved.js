//create api endpoint to check resolved status
'use strict';

const resolvedUtils = require('../resolved-basic-utils');
const middleware = require('../middleware');

//run build process
module.exports = function (router) {
	// GET resolved status - note the /api prefix
	router.get('/api/topics/:tid/resolved', middleware.authenticate, async (req, res) => {
		try {
			const { tid } = req.params;
			const data = await resolvedUtils.getTopicResolvedStatus(tid);
			res.json({ tid: tid, resolved: data.resolved });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});
};