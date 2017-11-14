import React, { Component } from 'react'
import Login from '../components/Login'
import Forgot from '../components/Forgot'
import styles from './LoginPage.css'
import PageMessage from '../components/PageMessage'
// import Fade from '../components/Fade'
import { config } from '../project.config'
export class LoginPage extends Component {
	constructor() {
		super()
		this.state = { forgotPassword: false }
		this.handleForgotBtnClick = this.handleForgotBtnClick.bind(this)
	}

	handleForgotBtnClick() {
		this.setState({ forgotPassword: !this.state.forgotPassword })
	}

	render() {
		return (
			<div className={styles['login-page-container']}>
				<PageMessage id={`PageMessage-${config.forms.login}`} />
				{ this.state.forgotPassword ? <Forgot /> : <Login /> }
				<button onClick={this.handleForgotBtnClick}>forgot password</button>
			</div>
		)
	}
}

export default LoginPage
