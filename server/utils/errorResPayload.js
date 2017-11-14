const errorCodes = require('../utils/errorCodes.js')
module.exports = (status, errCode) => {
	const { messageCode, message } = errorCodes[errCode]
	return { status, messageCode, message }
}