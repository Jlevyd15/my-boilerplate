const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const User = require('../models/user')
const errorRes = require('../utils/errorResPayload.js')

/* POST register a new user. */
router.post('/', (req, res, next) => { 
	process.nextTick(() => {
		const { name, email, password, passwordConfirm } = req.body
		User.findOne({ 'local.email': email }, (err, user) => {
			// if there are any errors, return the error
			if (err) {
				res.status(500).send(errorRes(401, 1000))
				return null
			}
			// TODO - do more server side validation here
			if(!name){
				console.log("In bad case")
				res.status(401).send(errorRes(401, 1003))
			} else if (!email) {
				res.status(401).send(errorRes(401, 1004))
			} else if (!password) {
				res.status(401).send(errorRes(401, 1005))
			} else if (password !== passwordConfirm) {
				res.status(401).send(errorRes(401, 1006))
			} else {
				if (user) {
					res.status(401).send(errorRes(401, 1007))
				} else {
					// if there is no user with that email create the user
					const newUser = new User()
					// set the user's local credentials
					newUser.local.name = name
					newUser.local.email = email
					newUser.generateHash(password, (err, hash) => {
						if (err) res.send(err)
						newUser.local.password = hash
						// save the user
						newUser.save(err => {
							if (err) res.send(err)
							// success respond with token
							const token = jwt.encode({ id: newUser._id }, process.env.JWT_SECRET)
							res.json({ token: token })
						})
					})
				}
			}
		})
	})
})

module.exports = router