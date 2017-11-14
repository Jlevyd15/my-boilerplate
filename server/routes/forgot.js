// forgot route
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const errorRes = require('../utils/errorResPayload.js')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

router.post('/', (req, res) => {
	// create random token so each user's reset link will be unique

	crypto.randomBytes(20, (err, buf) => {
		const token = buf.toString('hex')
		if (req.body.email) {
			const { email } = req.body
			User.findOne({ 'local.email': email }, (err, user) => {
				// if there are any errors, return the error before anything else
				if (err) {
					res.status(500).send(errorRes(500, 1000))
				}
				// if no user is found, return the message
				if (!user) { 
					res.status(401).send(errorRes(401, 1001))
				} else {
					// set a temp token for password reset
					user.local.resetPasswordToken = token
					user.local.resetPasswordExpires = Date.now() + 3600000 // 1 hour
					user.save((err) => {
						if (err) {
							res.status(500).send(errorRes(500, 3001))
						} else {
							// console.log(user, 'http://' + req.headers.host + '/reset/' + token)
							// res.send({ user, url: 'http://' + req.headers.host + '/reset/' + token })
							const transporter = nodemailer.createTransport({
								service: 'Mailgun',
								auth: {
									user: process.env.MAILGUN_USER,
									pass: process.env.MAILGUN_PASS
								}
							})
							//mail options
							const mailOpts = {
								from: 'support@mail.carsharecompare.com',
								to: email,
								subject: 'Request to reset password',
								text: 'You are receiving this because you have requested to reset your password for this account.\n\n' +
								'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
								'http://' + req.headers.host + '/reset/' + token + '\n\n' +
								'If you did not request this, please ignore this email and your password will remain unchanged.\n'
							}

							// send message
							transporter.sendMail(mailOpts, (error, info) => {
								//email not sent
								if (error) {
									res.status(500).send(errorRes(500, 2000))
								}
								//Yay!! email sent
								else {
									res.send({ message: 'reset link sent, it should be delivered to your inbox soon.' })
								}
							})
						}
					})
				}
			})
		}
	})
})

module.exports = router