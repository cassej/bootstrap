define(['api', 'auth', 'hbs!views/login'], function(api, user, view){
	$(view).delegate('form', 'submit', function(e){
		e.preventDefault();
		$.get('/api/auth', $(this).serialize(), function(data){
			if (data && data.error) {
				$('#error').text('Неправильно введен логин и/или пароль').fadeIn('slow', function(){
					setTimeout(function(){
						$('#error').fadeOut('slow');
					}, 2000)
				});
			} else {
				user.update(data);
				$.router.go('/');
			}
		}, 'JSON');

		return false;
	});
	return view;
});