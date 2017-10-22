export const isAuthenticated = () => {
	return sessionStorage.getItem('token') ? {
		token: sessionStorage.getItem('token')
	} : false
}