define(['jquery', 'textarea-autosize', 'date', 'time'], function($){
	$(document).on('init', function () {
		$.material.init();
		$('.textarea-autosize').textareaAutoSize();

		$('.date').pickadate({
			clear: 'Отменить',
			close: 'Ок',
			today: 'Сегодня',
			format: 'yyyy-mm-dd',
			selectMonths: true,
			selectYears: true,
			weekdaysFull: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
			monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
		});
		$('.time').pickatime();
	});
});
