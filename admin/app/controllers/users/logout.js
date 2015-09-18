define(['auth'],function (user) {
	return function(){
		user.logout();
		$.router.go('/login');
	}
});