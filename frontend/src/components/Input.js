import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fields } from '../actions'

import './Input.css'

class Input extends React.Component {
	componentWillMount() {
		const { id, dataType, required, handleInit } = this.props
		handleInit(id, dataType, required)
	}
	render() {
		const { id, placeholder, handleOnChange, dataType, type, required } = this.props
		return (
            <input 
            	id={id}
            	placeholder={placeholder}
            	className={this.props.fieldValid ? 'input-control' : 'input-control error'}
            	type={type} 
            	onChange={e => handleOnChange(id, e.target.value, dataType, required)}
            />
		)
	}
}

Input.defaultProps = {
	type: 'text'
}

Input.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	handleOnChange: PropTypes.func,
	handleInit: PropTypes.func,
	type: PropTypes.string,
	required: PropTypes.bool
}

const mapStateToProps = (state, props) => ({
	fieldValid: state.fields.get(props.id) ? state.fields.getIn([props.id, 'valid']) : true
})

const mapDispatchToProps = (dispatch) => ({
	handleOnChange: (id, value, dataType, required) => dispatch(fields.change(id, value, dataType, required)),
	handleInit: (id, dataType, required) => dispatch(fields.init(id, dataType, required)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Input)