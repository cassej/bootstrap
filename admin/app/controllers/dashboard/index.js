define(['auth', 'hbs!views/dashboard', 'api'], function(user, view, api) {
	return function(){
		return view({
			applications: api.get('/applications/last'),
			messages: api.get('/messages')
		});
	}
});