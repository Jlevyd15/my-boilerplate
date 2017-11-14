import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import style from './Navbar.css'

import { config } from '../project.config.js'
import { isAuthenticated } from '../utils/auth.js'

export class Navbar extends Component {
	constructor() {
		super()
		this.handleLogout = this.handleLogout.bind(this)
	}
	
	handleLogout() {
		console.log('logging out')
		const token = sessionStorage.getItem('token')
		if (token) {
			sessionStorage.removeItem('token')
			this.props.history.push('/')
		}
	}

	getNavbarLinks() {
		const auth = isAuthenticated()
		var routes = []
		const routekeys = Object.keys(config.routes)
		routekeys.forEach(route => {
			if (auth === false) {
				if (config.routes[route].secure === false) routes.push(config.routes[route])
			} else {
				if (config.routes[route].name !== 'Login' && config.routes[route].name !== 'Register')
					routes.push(config.routes[route])
			}
		})
		
		return routes.map((navLink, index) => {
			if (routes[index]['name'] === 'Logout') {
				return <li key={index}><a onClick={() => this.handleLogout()}>{routes[index]['name']}</a></li>
			} else {
				return <li key={index}><Link to={routes[index]['route']}>{routes[index]['name']}</Link></li>
			}
		})
	}

	render() {
		return (
			<nav className={style['navbar-container']}>
				<img className={style['navbar-logo']} src="https://placeholdit.imgix.net/~text?txtsize=8&txt=50x50&w=50&h=50" alt="" />
				<ul>
					{this.getNavbarLinks()}
				</ul>
			</nav>
		)
	}
}

export default withRouter(Navbar)
