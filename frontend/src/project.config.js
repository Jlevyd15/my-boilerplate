import Login from './pages/LoginPage'
import Users from './pages/UsersPage'
import Landing from './pages/LandingPage'
import Register from './pages/RegisterPage'

export const config = {
	routes: {
		home: { route: '/', name: 'Home', component: Landing, secure: false },
		login: { route: '/login', name: 'Login', component: Login, secure: false },
		register: { route: '/register', name: 'Register', component: Register, secure: false },
		dashboard: { route: '/dashboard', name: 'Dashboard', component: Landing, secure: true },
		users: { route: '/getUsers', name: 'Users', component: Users, secure: true },
		logout: { route: '/logout', name: 'Logout', component: Login, secure: true },
		forgot: { route: '/forgot', name: 'Forgot', component: Login },
		reset: { route: '/reset', name: 'Reset', component: Login, secure: true },
	},
	forms: {
		login: 'login.Form',
		register: 'register.Form',
		forgot: 'forgotPassword.form'
	},
	fields: {
		login: {
			email: 'email.Input.Login',
			password: 'password.Input.Login'
		},
		register: {
			name: 'name.Input.Register',
			email: 'email.Input.Register',
			emailConfirm: 'email.confirm.Input.Register',
			password: 'password.Input.Register',
			passwordConfirm: 'password.confirm.Input.Register'
		},
		forgot: {
			email: 'email.Input.Forgot'
		}
	},
	modals: {

	}
}