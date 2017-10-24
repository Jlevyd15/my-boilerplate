import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Input from './Input'
import Form from './Form'
import Button from './Button'
import './Login.css'
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
		fetch('/token', {
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
			<div className="login-contianer">
				<Form id={config.forms.login} submitHandler={this.handleSubmit} fieldIds={fieldIds} >
					<div className="login-grid">
						<div className="one"><label>Email</label></div>
						<div className="two"><Input id={email} dataType="email" required={true} /></div>
						<div className="three"><label>Password</label></div>
						<div className="four"><Input id={password} dataType="password" type="password" required={true} /></div>
						<div className="five"><Button callback={() => this.props.history.push('/register')} btnStyle="btn btn-secondary">Register</Button></div>
						<div className="six"><Button type="submit" btnStyle="btn btn-primary">Login</Button></div>
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
