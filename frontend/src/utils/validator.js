
const dataTypes = {
	email: /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line no-useless-escape
	password: /^[a-zA-Z]\w{3,14}$/,
	alpha: /^[\D]*$/,
	alphaNumberic: /^[^\W]*$/,
	numeric: /^[\d]*$/
}

const getDataType = dataType => {
	return dataTypes.hasOwnProperty(dataType) ? dataTypes[dataType] : dataTypes['alphaNumberic']
}

// TODO - allow user to pass a custom error message or add some additional info. specific to the field's dataType
// e.g. Password must be a combo of letters/numbers and > 6 characters
// const getCustomValidationMessage = dataType => {
// 	return 
// }

// returns in this format
// {
// 	valid: {bool}
// 	fieldResults: {array of objects}
// }

export const formValidator = fields => {
	const fieldResults = fields.map(field => {
		// invalid input for field dataType
		const _field = field.toJS()
		const fieldValid = getDataType(_field.dataType).test(_field.value)
		if (_field.required && !_field.value) { // field required
			return {
				id: _field.Id,
				valid: false,
				error: `${_field.Id.replace(/\..*$/, '')} is required, please complete this field`,
			}
		} else if (!fieldValid) {
			return {
				id: _field.Id,
				valid: fieldValid,
				error: fieldValid ? '' : `${_field.Id.replace(/\..*$/, '')} is not valid, please enter a valid one`,
			}
		} else {
			return {
				id: _field.Id,
				valid: true,
				error: ''
			}
		}
		
	})
	return {
		valid: fieldResults.every(fieldResult => fieldResult.hasOwnProperty('valid') && fieldResult.valid === true),
		fieldResults
	}
}
