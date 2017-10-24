import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'

class Slide extends Component {
	constructor(props) {
		super()
		this.state = { show: false }
		setTimeout(() => (
			this.setState({ show: true })
		), props.duration)
	}
	
	render() {
		const defaultStyle = {
			// transition: `opacity ${this.props.duration}ms ease-in-out`,
			opacity: 0,
			position: 'absolute',
			top: '-15%',
			left: '50%',
			transform: 'translate(-50%, -2%)'
		}

		const transitionStyles = {
			entering: { 
				opacity: 0,
				transition: `opacity ${this.props.duration} top ${this.props.duration} ease-out`,
				top: '-15%',
				left: '50%',
				transform: 'translate(-50%, -2%)'
			},
			entered:  { 
				opacity: 1,
				transition: `opacity ${this.props.duration} top ${this.props.duration} ease-out`,
				top: '2%',
				left: '50%',
				transform: 'translate(-50%, -2%)'
			},
			exiting:  { 
				opacity: 1,
				transition: `opacity ${this.props.duration} top ${this.props.duration} ease-out`,
				top: '2%',
				left: '50%',
				transform: 'translate(-50%, -2%)'
			},
			exited: { 
				opacity: 0,
				transition: `opacity ${this.props.duration} top ${this.props.duration} ease-out`
			}
		}
		return (
			<Transition in={this.state.show} timeout={this.props.duration} className="slide">
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

Slide.defaultProps = {
	duration: 500
}

Slide.propTypes = {
	duration: PropTypes.number,
	start: PropTypes.number,
	end: PropTypes.number,
	direction: PropTypes.string
}

export default Slide