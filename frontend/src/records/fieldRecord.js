import Immutable from 'immutable';

const FieldRecord = new Immutable.Record({
	Id: null,
	value: '',
	dataType: null,
	required: null,
	valid: true,
	error: ''
})

export default FieldRecord