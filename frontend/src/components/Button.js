import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Button.css'

export class Button extends Component {
	getBtnStyleName() {
		switch(this.props.btnStyle) {
			case 'primary':
				return styles['btn'] + ' ' + styles['btn-primary']
			case 'secondary':
				return styles['btn'] + ' ' + styles['btn-secondary']
			default:
				return styles['btn'] + ' ' + styles['btn-primary']
		}
	}
	callback(e) {
		console.log('in button callback')
		const { callback } = this.props
		if (typeof callback === 'function') callback(e)
	}
	render() {
		const { children, type, callback } = this.props 
		return (
			<button onClick={callback} className={this.getBtnStyleName()} type={type || 'button'}>{children}</button>
		)
	}
}

Button.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	btnStyle: PropTypes.string,
	type: PropTypes.string,
	callback: PropTypes.func
}

export default Button
