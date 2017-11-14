// error message codes
module.exports = {
	// AUTHORIZATION
	1000: { messageCode: 1000, message: 'error before saving new user' },
	1001: { messageCode: 1001, message: 'cannot find user with the credentials provided' },
	1002: { messageCode: 1002, message: 'wrong password' },
	1003: { messageCode: 1003, message: 'please fill the name field' },
	1004: { messageCode: 1004, message:  'please fill the email field' },
	1005: { messageCode: 1005, message: 'please fill the password field' },
	1006: { messageCode: 1006, message:  'passwords do not match' },
	1007: { messageCode: 1007, message: 'email already taken' },
	1008: { messageCode: 1008, message: 'error comparing passwords' },
	// EMAIL
	2000: { messageCode: 2000, message: 'error sending email' },
	// PASS RESET
	3000: { messageCode: 3000, message: 'Password reset token is invalid or has expired.' },
	3001: { messageCode: 3001, message: 'error saving temp token to db.' },
}