import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

import { config } from '../project.config.js'
import { isAuthenticated } from '../utils/auth.js'

export class Navbar extends Component {

	getNavbarLinks() {
		const auth = isAuthenticated()
		var routes = []
		const routekeys = Object.keys(config.routes)
		routekeys.forEach(route => {
			if (auth === false) {
				if (config.routes[route].secure === false) routes.push(config.routes[route])
			} else {
				routes.push(config.routes[route])
			}
		})
		
		return routes.map((navLink, index) => 
			<li key={index}><Link to={routes[index]['route']}>{routes[index]['name']}</Link></li>)
	}

	render() {
		return (
			<nav className='navbar-container'>
				<img className="navbar-logo" src="crypto-logo.png" />
				<ul>
					{this.getNavbarLinks()}
				</ul>
			</nav>
		);
	}
}

export default Navbar