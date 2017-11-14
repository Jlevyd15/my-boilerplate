const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
// const cfg = require('../utils/config.js')
const User = require('../models/user')
const errorRes = require('../utils/errorResPayload.js')

/* POST tokens. */
router.post('/', (req, res) => {  
	// if (req.body.email && req.body.password) {
	// 	const email = req.body.email
	// 	const password = req.body.password
	// 	const user = users.find(function(u) {
	// 		return u.email === email && u.password === password
	// 	})
	// 	if (user) {
	// 		const payload = {
	// 			id: user.id
	// 		}
	// 		const token = jwt.encode(payload, cfg.jwtSecret)
	// 		res.json({
	// 			token: token
	// 		})
	// 	} else {
	// 		// res.sendStatus(401)
	// 	   res.status(401).send(errorRes(401, 1001, 'cannot find user with the credentials provided'))
	// 	}
	// } else {
	// 	res.status(401).send(errorRes(401, 1002, 'error, email and/or password was not received'))
	// }
	if (req.body.email && req.body.password) {
		const { email, password } = req.body
		User.findOne({ 'local.email': email }, (err, user) => {
			// if there are any errors, return the error before anything else
			if (err) {
				res.status(500).send(errorRes(401, 1000))
				return null
			}
			// if no user is found, return the message
			if (!user) { 
				res.status(401).send(errorRes(401, 1001))
			} else { 
				user.validPassword(password, user.local.password, (err, result) => {
					if (err) {
						res.status(401).send(errorRes(401, 1008))
						return null
					} else if (!result) {
						res.status(401).send(errorRes(401, 1002))
					} else {
						// success
						const token = jwt.encode({ id: user._id }, process.env.JWT_SECRET)
						res.json({ token: token })
					}
				})  
			}
		})
	}
})

module.exports = router