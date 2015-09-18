define('auth', function(){

	function User() {

		this.get = function() {
			var data = $.parseJSON(localStorage.getItem("user"))||{};
			return data;
		};

		this.update = function(data) {
			localStorage.setItem("user", JSON.stringify(data));
		};

		this.logout = function(){
			localStorage.clear();
		};

		this.checkAuth = function(){
			if (this.get().token || location.pathname == '/login' || location.pathname == '/recover' || location.pathname.substr(0, 9) == '/register') {
				return true;
			} else {
				$.router.go('/login');
			}
		}
	}

	return new User();
});
