require.config({
	baseUrl: '/app',
	paths: {
		jquery: '/js/vendor/jquery.min',
		common: '/js/common',
		'textarea-autosize': '/js/vendor/textarea-autosize.min',
		picker: '/js/vendor/picker',
		date: '/js/vendor/picker.date',
		time: '/js/vendor/picker.time',
		main: '/js/main',
		router: '/js/router',
		hbs: '/js/hbs',
		api: 'services/api',
		auth: 'services/auth'
	},
	deps: ['main'],
	shim: {
		picker: {deps: ['jquery']},
		date:  {deps: ['picker']},
		time:  {deps: ['picker']},
		common: {deps: ['jquery']},
		'textarea-autosize': {deps:['jquery']},
	},
	config: {
		api: '/api'
	},
	hbs: {
		helpers: true,
		i18n: false,
		templateExtension: 'hbs',
		partialsUrl: 'views'
	},
	waitSeconds: 2000,
	urlArgs: 'v=' + (new Date()).getTime()
});

require(['router', 'routes', 'hbs'], function(router, routes, hbs){

	hbs.get().registerHelper('is', function (value, test, options) {
		if (value === test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});

	hbs.get().registerHelper('gt', function (value, test, options) {
		if (parseInt(value) > test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});

	hbs.get().registerHelper('lt', function (value, test, options) {
		if (parseInt(value) < test) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});

	$.each(routes, function(uri, route){
		$.router.add(uri, function(data) {

			var layout = 'views/layouts/' + (route.layout?route.layout:'main');

			require(
				['auth', 'hbs!' + layout, 'controllers/' + route.controller + '/' + route.action],
				function(user, layout, view){
					if (user.checkAuth()) {
						if (view) {
							document.body.innerHTML = layout({content: view(data), user: user.get()});
						}

						$('a[href^="/"]').click(function(e){
							if ($(this).attr('href')) {
								e.preventDefault();
								$.router.go($(this).attr('href'));
							}
						});

						$.event.trigger({
							type: "init"
						});
					}

			});
		});
	});

	$(document).delegate(".navbar-toggle", "click", function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});

	$.router.go(location.pathname);
});
