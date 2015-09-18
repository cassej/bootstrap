define('routes', function(){
	return {
		'/': {
			controller: 'dashboard',
			action: 'index'
		},

		'/login': {
			controller: 'users',
			action: 'login',
			layout: 'login'
		},

		'/logout': {
			controller: 'users',
			action: 'logout'
		},
		'/profile': {
			controller: 'users',
			action: 'profile'
		}
	}
});
