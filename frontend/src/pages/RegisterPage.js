import React from 'react'
import PropTypes from 'prop-types'
import Register from '../components/Register'
import styles from './RegisterPage.css'
import PageMessage from '../components/PageMessage'
import { config } from '../project.config'

const RegisterPage = ({ children }) => {
	return (
		<div className={styles['register-page-container']}>
			<PageMessage id={`PageMessage-${config.forms.register}`} />
			<h1>Register</h1>	
			<Register />
		</div>
	)
}

RegisterPage.propTypes = {
	children: PropTypes.node
}

export default RegisterPage