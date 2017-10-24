import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'

class Fade extends Component {
	constructor(props) {
		super()
		this.state = { show: false }
		// setTimeout(() => (
		// 	this.setState({ show: true })
		// ), props.duration)
		setTimeout(() => (
			this.setState({ show: true })
		))
	}
	
	render() {
		const defaultStyle = {
		  transition: `opacity ${this.props.duration}ms ease-in-out`,
		  opacity: 0,
		}

		const transitionStyles = {
			entering: { 
				opacity: 0,
				transition: `opacity ${this.props.duration} ease-out`
			},
			entered:  { 
				opacity: 1,
				transition: 'opacity 1s ease-out'
			},
			exiting:  { 
				opacity: 1,
				transition: 'opacity 1s ease-out'
			},
			exited: { 
				opacity: 0,
				transition: 'opacity 1s ease-out'
			}
		}
		return (
			<Transition in={this.state.show} timeout={this.props.duration} className="fade">
	            {(state) => (
	            	<div style={{
			        ...defaultStyle,
			        ...transitionStyles[state]
		      	}}>
						{this.props.children}
		      		</div>
	      		)}
			</Transition>
		)
	}
}

Fade.defaultProps = {
	duration: 500
}

Fade.propTypes = {
	duration: PropTypes.number
}

export default Fade
