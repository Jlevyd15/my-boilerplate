import React, { Component } from 'react'
import Login from '../components/Login'
import styles from './LoginPage.css'
import PageMessage from '../components/PageMessage'
// import Fade from '../components/Fade'
import { config } from '../project.config'
export class LoginPage extends Component {
	render() {
		return (
			<div className={styles['login-page-container']}>
				<PageMessage id={`PageMessage-${config.forms.login}`} />
				<h1>Login</h1>
				<Login />
			</div>
		)
	}
}

export default LoginPage
