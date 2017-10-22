import Immutable from 'immutable'
import TransientRecord from '../records/TransientRecord'

import { INIT_TRANSIENT, TOGGLE_TRANSIENT } from '../actions/actionTypes'

const transientsReducer = (transients = Immutable.Map({}), action) => {
	switch(action.type) {
		case INIT_TRANSIENT: {
			return transients.update(action.id, new TransientRecord(), transient => {
				return transient.merge({
					id: action.id
				})
			})
		}
		case TOGGLE_TRANSIENT: {
			return transients.update(action.id, new TransientRecord(), transient => {
				return transient.merge({
					id: action.id,
					message: action.message,
					severity: action.severity,
					open: action.open ? action.open : !transient.open
				})
			})
		}
		default:
			return transients
	}
}

export default transientsReducer