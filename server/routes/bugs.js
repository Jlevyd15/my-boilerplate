var express = require('express');
var router = express.Router();

/* POST to bugs. */
router.post('/', function(req, res, next) {
	console.log(req)
	const { actions, initialState, state, delay } = req.body
	res.json({
		bugReport: req.body,
		replayPayload: `window.bugReporterPlayback(${actions}, ${initialState}, ${state})`
	})
});

module.exports = router;


// actions, initialState, state, delay