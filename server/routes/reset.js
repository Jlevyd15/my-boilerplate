// reset password route
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const errorRes = require('../utils/errorResPayload.js')
const nodemailer = require('nodemailer')

router.get('/:token', (req, res) => {
	// create random token so each user's reset link will be unique
	User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, (err, user) => {
		if (!user) {
			res.status(408).send(errorRes(408, 3000))
		} else {
			// res.status(200).send({ message: 'user requesting password reset', id: user._id })
			res.render('reset', { email: user.local.email })
		}
	})
})

router.post('/:token', (req, res) => {
	if (req.body.password === req.body.passwordConfirm) {
		User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: Date.now() } }, (err, user) => {
			if (!user) {
				res.status(408).send(errorRes(408, 3000))
			} else {
				user.local.resetPasswordToken = undefined;
				user.local.resetPasswordExpires = undefined;
				user.generateHash(req.body.password, (err, hash) => {
					if (err) res.send(err)
					user.local.password = hash
					// save the user
					user.save(err => {
						if (err)  {
							res.send(err)
						} else {
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
								to: user.local.email,
								subject: 'Request to reset password',
								text: 'Hello,\n\n' +
	      							'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
							}

							// send message
							transporter.sendMail(mailOpts, (error, info) => {
								//email not sent
								if (error) {
									res.status(500).send(errorRes(500, 2000))
								}
								//Yay!! email sent
								else {
									res.send({ message: 'Your password has been successfully reset, you should receive a confirmation email soon.' })
								}
							})
						}
					})
				})
			}
		})
	} else {
		res.status(401).send(errorRes(401, 1006))
	}
}) 

module.exports = router