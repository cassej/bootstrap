define('api', ['auth', 'module'], function(user, module){

	function Api(){
		this.responseData = {};

		this.get = function(uri, data, cb, type) {
			return this.request('GET', uri, data, cb, type);
		};

		this.post = function(uri, data, cb, type) {
			console.log(data);
			return this.request('POST', uri, data, cb, type);
		};

		this.request = function(method, uri, data, cb, type) {
			var self = this;
			uri = module.config('api') + uri;

			if (typeof data === 'undefined') {
				data = {}
			}

			this.responseData = {};

			var async = false;

			if (typeof cb == 'function') {
				async = true;
			}

			if (type != 'html') {
				type = 'json';
			}

			$.ajax({
				type: method,
				url: uri,
				data: data,
				async: async,
				headers: {token: user.get().token},
				dataType: type,
				cache: false,
				contentType: false,
				processData: (typeof data.append == 'function'?false:true),
				success: function(response){
					self.responseData = response;
					if (async) {
						cb(response);
					}
				}
			});

			return this.responseData;
		}
	}

	return new Api();

});
