var express = require('express')
var router = express.Router()
var auth = require('../utils/auth.js')()

/* GET users listing. */
router.get('/', auth.authenticate(), function(req, res, next) {
	console.log('in users route ')
	res.json({ test: 'protected route', users: 'users' })
})

module.exports = router