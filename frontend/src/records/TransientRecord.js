import Immutable from 'immutable'

const TransientRecord = new Immutable.Record({
	id: null,
	message: '',
	severity: '',
	open: false
})

export default TransientRecord