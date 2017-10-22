import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Button.css'

export class Button extends Component {
	callback(e) {
		console.log('in button callback')
		const { callback } = this.props
		if (typeof callback === 'function') callback(e)
	}
	render() {
		const { children, btnStyle, type, callback } = this.props 
		return (
			<button onClick={callback} className={btnStyle} type={type || 'button'}>{children}</button>
		);
	}
}

Button.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	btnStyle: PropTypes.string,
	type: PropTypes.string,
	callback: PropTypes.func
}

export default Button