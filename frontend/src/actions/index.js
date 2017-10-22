import { INIT_FIELD, UPDATE_FIELD, SUBMIT_FORM, ERROR_FIELD, INIT_TRANSIENT, TOGGLE_TRANSIENT } from './actionTypes' 

export const fields = {
	init: (id, dataType, required) => ({ type: INIT_FIELD, id, dataType, required }),
	change: (id, value, dataType, required) => ({ type: UPDATE_FIELD, id, value, dataType, required }),
	error: (id, valid, error) => ({ type: ERROR_FIELD, valid, id, error })
}

export const forms = {
	submit: (id, validationResults) => ({ type: SUBMIT_FORM, id, validationResults })
}

export const transients = {
	init: id => ({ type: INIT_TRANSIENT, id }),
	toggle: (id, message, severity, open) => ({ type: TOGGLE_TRANSIENT, id, message, severity, open }),
}