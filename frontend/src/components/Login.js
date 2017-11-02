import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Input from './Input'
import Form from './Form'
import Button from './Button'
import styles from './Login.css'
import { config } from '../project.config'

const fieldIds = [
	'email.Input.Login', 'password.Input.Login'
]

export class Login extends Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e) {
		e.preventDefault()
		const { email, password, history } = this.props
		console.log('in handleSubmit', email, password)

		// get a token from the server and save it in the browser session storage
		fetch(config.routes.login.route, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body:`password=${password}&email=${email}`
		})
		.then(response => {
			return response.json()
		})
		.then(data => {
			// console.log(data)

			// token is received, save it into session storage for later
			if (data.token) {
				sessionStorage.setItem('token', data.token)
				history.push('/getUsers')
			}
			// this.setState({ token: data.token })
			// this.getUsers()

		}).catch(error => {
			console.error('there was a problem with the request ' + error.message)
		})
	}

	render() {
		const { email, password } = config.fields.login
		return (
			<div className={styles['login-contianer']}>
				<Form id={config.forms.login} submitHandler={this.handleSubmit} fieldIds={fieldIds} >
					<div className={styles['login-grid']}>
						<div className={styles['one']}><label>Email</label></div>
						<div className={styles['two']}><Input id={email} dataType="email" required={true} /></div>
						<div className={styles['three']}><label>Password</label></div>
						<div className={styles['four']}><Input id={password} dataType="password" type="password" required={true} /></div>
						<div className={styles['five']}><Button callback={() => this.props.history.push('/register')} btnStyle="secondary">Register</Button></div>
						<div className={styles['six']}><Button type="submit" btnStyle="primary">Login</Button></div>
	      			</div>	
		      	</Form>
	      	</div>
		)
	}
}

const mapStateToProps = (state, props) => {
const { email, password } = config.fields.login
return {
	email: state.fields.getIn([email, 'value']),
	password: state.fields.getIn([password, 'value'])
}}

export default connect(mapStateToProps)(withRouter(Login))
