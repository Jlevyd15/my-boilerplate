import React, { Component } from 'react';



export class Users extends Component {
	constructor() {
		super()
		this.getToken = this.getToken.bind(this)
		this.getUsers = this.getUsers.bind(this)
		this.state = {
			token: null,
			users: null,
		}
	}

	componentDidMount() {
		this.getToken()
	}

	// get a token from the server and save it in the browser session storage
	getToken() {
		let data
		fetch(`/token`, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body:'password=john123&email=john@mail.com'
		})
		.then(response => {
			return response.json()
		})
		.then(data => {
			console.log(data)

			// token is received, save it into session storage for later
			sessionStorage.setItem('token', data.token)
			this.setState({ token: data.token })
			this.getUsers()
		})
	}

	// after getting the token we're now authenticated and can use this to hit any of the api endpoints 
	getUsers() {
		fetch(`/users`, {
			method: 'GET',
			headers: new Headers({
				'token': sessionStorage.getItem('token')
			})
		})
		.then(response => {
			return response.json()
		})
		.then(data => {
			console.log(data)
			// sessionStorage.setItem('token', data.token)
			this.setState({ users: data.users })
		})
	}

	render() {
		return (
			<div>
				<div>Authenticated User route {this.state.token}</div>
				<div>Users <pre>{this.state.users ? this.state.users.name : null}</pre></div>
			</div>
		);
	}
}

export default Users
