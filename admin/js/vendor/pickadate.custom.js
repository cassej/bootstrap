define(['pickadate'], function(){
	(function ($) {
		'use strict';

		var Datepicker = function (element, options) {
			this.options  = options;
			this.$element = $(element);
		};

		Datepicker.DEFAULTS = {
			format: 'd.m.yyyy',
			selectMonths: false,
			selectYears: false
		};

		Datepicker.prototype.display = function (datepickerApi, datepickerRoot) {
			$('.picker__box', datepickerRoot).prepend('<div class="picker__date-display"><div class="picker__date-display-top"><span class="picker__year-display">' + datepickerApi.get('select', 'yyyy') + '</span></div><div class="picker__date-display-bottom"><span class="picker__weekday-display">' + datepickerApi.get('select', 'dddd') + '</span><span class="picker__day-display">' + datepickerApi.get('select', 'd') + '</span><span class="picker__month-display">' + datepickerApi.get('select', 'mmm') + '</span></div></div>');
		};

		Datepicker.prototype.show = function () {
			var that = this;

			this.$element.pickadate({
				clear: 'Отменить',
				close: 'Ок',
				today: 'Сегодня',
				closeOnSelect: false,
				container: 'body',
				format: that.options.format,
				klass: {
					buttonClear: 'btn btn-flat btn-alt picker__button--clear',
					buttonClose: 'btn btn-flat btn-alt picker__button--close',
					buttonToday: 'btn btn-flat btn-alt picker__button--today',
					navPrev: 'icon picker__nav--prev',
					navNext: 'icon picker__nav--next',
				},
				selectMonths: that.options.selectMonths,
				selectYears: that.options.selectYears,
				weekdaysFull: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
				monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
				weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
				monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
			});

			var datepickerApi = this.$element.pickadate('picker'),
				datepickerRoot = datepickerApi.$root;

			datepickerApi.on({
				close: function () {
					$(document.activeElement).blur();
				},
				open: function () {
					if (datepickerApi.get('select') === null) {
						datepickerApi.set('select', datepickerApi.get('highlight'));
					} else if (!$('.picker__date-display', datepickerRoot).length) {
						that.display(datepickerApi, datepickerRoot);
					}
				},
				render: function () {
					that.display(datepickerApi, datepickerRoot);
				}
			});
		};

		function Plugin (option) {
			return this.each(function () {
				var $this   = $(this);
				var data    = $this.data('bs.datepicker');
				var options = $.extend({}, Datepicker.DEFAULTS, $this.data(), typeof option == 'object' && option);

				if (!data) {
					$this.data('bs.datepicker', (data = new Datepicker(this, options)));
				};

				data.show();
			});
		};

		var old = $.fn.datepicker;

		$.fn.datepicker             = Plugin;
		$.fn.datepicker.Constructor = Datepicker;

		$.fn.datepicker.noConflict = function () {
			$.fn.datepicker = old;
			return this;
		};
	}(jQuery));
});
