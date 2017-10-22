import { connect } from 'react-redux'
import { transients } from '../actions'
import TransientRecord from '../records/TransientRecord'

const mapStateToProps = (state, props) => {
	const transient = state.transients.get(props.id) 

return ({
	transient: transient ? transient : new TransientRecord()
})}

const mapDispatchToProps = (dispatch, ownProps) => ({
	handleInitTransient: id => dispatch(transients.init(id)),
	handleToggleTransient: (id, message, severity, open) => dispatch(transients.toggle(id, message, severity, open))
})

const TransientsContainer = (component) => connect(mapStateToProps, mapDispatchToProps)(component) 

export default TransientsContainer
