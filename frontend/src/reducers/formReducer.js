import Immutable from 'immutable';
import FormRecord from '../records/formRecord';

import { SUBMIT_FORM } from '../actions/actionTypes';


const formReducer = (forms = Immutable.Map({}), action) => {
	// console.log(action)
	switch (action.type) {
		case SUBMIT_FORM: {
			return forms.update(action.id, new FormRecord(), form => {
				return form.merge({
					Id: action.id,
					valid: action.validationResults.valid,
					fieldResults: action.validationResults.fieldResults
				})
			})
		}
		default:
			return forms;
	}
}

export default formReducer;