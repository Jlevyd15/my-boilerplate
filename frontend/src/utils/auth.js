// TODO - maybe here we need to make a call to the back-end to check on the server if the token is good
export const isAuthenticated = () => {
	return sessionStorage.getItem('token') ? {
		token: sessionStorage.getItem('token')
	} : false
}