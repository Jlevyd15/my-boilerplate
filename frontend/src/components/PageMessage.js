import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './PageMessage.css'
import TransientsContainer from '../containers/TransientsContainer'
import Fade from './Fade'

export class PageMessage extends Component {
	constructor() {
		super()
		this.close = this.close.bind(this)
		this.onKeyUp = this.onKeyUp.bind(this)
	}
	componentWillMount() {
		this.props.handleInitTransient(this.props.id)
	}
	close() {
		this.props.handleToggleTransient(this.props.id, null, null, false)
	}
	onKeyUp({ keyCode }) {
		return keyCode === 27 ? this.close() : null
	}
	render() {
		const { message, severity, open } = this.props.transient.toJS()
		return (
			open ?
			<Fade duration={200}>
				<div className={styles['PageMessage-container'] + ' ' + styles[`PageMessage-${severity}`]}>
					<span>{message}</span>
					<a href="#" onClick={this.close} onKeyUp={this.onKeyUp}>
						<img className={styles['PageMessage-close-icon']} src="icons/close_circle_outline.svg" alt="close" />
					</a>
				</div>
			</Fade>
			: null
		)
	}
}

PageMessage.propTypes = {
	id: PropTypes.string,
	transient: PropTypes.object
}

export default TransientsContainer(PageMessage)
