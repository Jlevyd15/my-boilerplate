import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FormError.css'

export class FormError extends Component {
	showFormErrors() {
		return (
			this.props.form && !this.props.form.get('valid') ? 
				<ul className="form-error-list">
					{this.props.form ? this.props.form.fieldResults.map((result, index) => (
						result.get('error') ? <li key={index}>{result.get('error')}</li> : null
					)) : null}
				</ul> : null
		)
	}
	render() {
		return (
			<div>
				{this.showFormErrors()}
			</div>
		);
	}
}

FormError.propTypes = {
	form: PropTypes.object
}

export default FormError