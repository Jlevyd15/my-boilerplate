import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Input from './Input'
import Form from './Form'
import Button from './Button'
import styles from './Register.css'
import { config } from '../project.config'

const fieldIds = [
	'name.Input.Register', 'email.Input.Register', 'password.Input.Register', 'password.confirm.Input.Register'
]

export class Register extends Component {
	constructor() {
		super()
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(e) {
		console.log('in handleSubmit', e)
		e.preventDefault()
		const { name, email, password, passwordConfirm, history } = this.props

		// get a token from the server and save it in the browser session storage
		fetch(config.routes.register.route, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body:`name=${name}&email=${email}&password=${password}&passwordConfirm=${passwordConfirm}`
		})
		.then(response => {
			return response.json()
		})
		.then(data => {
			console.log('register success', data)


			//check res message here



			// token is received, save it into session storage for later
			// if (data.token) {
			// 	sessionStorage.setItem('token', data.token)
			// 	history.push('/getUsers')
			// }
			// this.setState({ token: data.token })
			// this.getUsers()

		}).catch(error => {
			console.error('there was a problem with the request ' + error.message)
		})
	}

	render() {
		const { name, email, password, passwordConfirm } = config.fields.register
		return (
			<div className={styles['register-contianer']}>
				<Form id={config.forms.register} fieldIds={fieldIds} submitHandler={this.handleSubmit}>
					<div className={styles['register-grid']}>
						<div className={styles['one'] + ' ' + styles['fix-bottom']}><label>Name</label></div>
						<div className={styles['two']}><Input id={name} dataType="alpha" /></div>
						<div className={styles['three'] + ' ' + styles['fix-bottom']}><label>Email</label></div>
						<div className={styles['four']}><Input id={email} dataType="email" /></div>
						<div className={styles['five'] + ' ' + styles['fix-bottom']}><label>Password</label></div>
						<div className={styles['six']}><Input id={password} dataType="password" type="password" /></div>
						<div className={styles['seven'] + ' ' + styles['fix-bottom']}><label>Confirm Password</label></div>
						<div className={styles['eight']}><Input id={passwordConfirm} dataType="password" type="password" /></div>
						<div className={styles['ten']}><Button type="submit" btnStyle="primary">Register</Button></div>
						<div className={styles['nine']}><Button btnStyle="secondary" callback={() => this.props.history.push('/login')}>Login</Button></div>
	      			</div>	
		      	</Form>
	      	</div>
		)
	}
}

const mapStateToProps = (state, props) => {
const { name, email, password, passwordConfirm } = config.fields.register
return {
	name: state.fields.getIn([name, 'value']),
	email: state.fields.getIn([email, 'value']),
	password: state.fields.getIn([password, 'value']),
	passwordConfirm: state.fields.getIn([passwordConfirm, 'value'])
}}

export default connect(mapStateToProps)(withRouter(Register))
