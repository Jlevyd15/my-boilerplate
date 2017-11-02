// //Model - user.js
const mongoose = require('mongoose')
// const bcrypt = require('bcrypt-nodejs')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

// define the schema for our user model
var userSchema = new Schema({
	local: {
		name: String,
		email: String,
		password: String
	}
})

// hash the password before saving it in the db
userSchema.methods.generateHash = (password, callback) => {
	bcrypt.hash(password, 10, (err, hash) => {
		console.log('finished hashing calling callback', err, hash)
		return callback(err, hash)
	})
}
// compare plaintext vs. hash
userSchema.methods.validPassword = (password, savedPass, callback) => {
	console.log('validPassword ', password)
	bcrypt.compare(password, savedPass, (err, res) => {
		console.log('returning validPassword ', res)
		return callback(err, res)
	})
}

	// old hashing methods ======================
	// // generating a hash
	// userSchema.methods.generateHash = password => {
	// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
	// }

	// // checking if password is valid
	// userSchema.methods.validPassword = password => {
	// 	return bcrypt.compareSync(password, this.local.password)
	// }

	// create the model for users and expose it to our app
	module.exports = mongoose.model('User', userSchema)