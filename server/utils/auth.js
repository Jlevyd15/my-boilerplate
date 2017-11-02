// auth.js
var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt
// var users = require('../users.js')
const User = require('../models/user.js')
var cfg = require('./config.js')
var params = {  
	secretOrKey: cfg.jwtSecret,
	jwtFromRequest: ExtractJwt.fromHeader('token')
}

// TODO - here we would check for the user in the DB 
// and also check that the password and username in the request were correct

module.exports = () => { 
	passport.use(new JwtStrategy(params, (payload, done) => {
		console.log('in auth, payload is', payload)
		return done()
		// User.findOne({ 'local.email': email }, (err, user) => {
		// 	if (user) {
		// 	console.log('returning user', user)
		// 	return done(null, {
		// 		id: user.id
		// 	})
		// 	} else {
		// 		console.log('returning user not found')
		// 		return done(new Error('User not found'), null)
		// 	}
		// })

		
		// var user = users[payload.id - 1] || null
		// if (user) {
		//     console.log('returning user', user)
		//     return done(null, {
		//         id: user.id
		//     })
		// } else {
		//     console.log('returning user not found')
		//     return done(new Error('User not found'), null)
		// }
	}))
	return {
		initialize: () => {
			return passport.initialize()
		},
		authenticate: () => {
			return passport.authenticate('jwt', cfg.jwtSession)
		}
	}
}