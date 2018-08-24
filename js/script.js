'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (root) {

	function sliders() {
		// Параметры слайдеров
		var data = {
			index: {
				dots: false,
				pauseOnHover: false,
				slidesToShow: 1,
				responsive: [{
					breakpoint: 768,
					settings: {
						arrows: false
					}
				}]
			},

			actions: {
				slidesToShow: 5,
				variableWidth: true,
				prevArrow: $('.slider_actions .slider__arrow_prev'),
				nextArrow: $('.slider_actions .slider__arrow_next')
			},

			partners: {
				slidesToShow: 1,
				prevArrow: $('.slider_partners .slider__arrow_prev'),
				nextArrow: $('.slider_partners .slider__arrow_next')
			},

			service: {
				slidesToShow: 1,
				asNavFor: '[data-slider="servicenav"] .slider__slides'
			},

			service2: _defineProperty({
				slidesToShow: 1,
				dots: false,
				pauseOnHover: false
			}, 'slidesToShow', 1),

			servicenav: {
				slidesToShow: 6,
				asNavFor: '[data-slider="service"] .slider__slides',
				arrows: false,
				draggable: false,
				focusOnSelect: true,
				responsive: [{
					breakpoint: 1200,
					settings: {
						variableWidth: true
					}
				}]
			},

			photos: {
				slidesToShow: 5,
				variableWidth: true
			}
		};

		// Активация слайдеров

		$('.slider').each(function (i, s) {
			var slider = $(s).data('slider'),
			    slides = $(s).find('.slider__slides').children().length;

			if (slides > data[slider].slidesToShow || Boolean(data[slider].asNavFor)) {
				$(s).find('.slider__slides').slick(data[slider]);
			}
		});
	}

	sliders();

	$('.v-item__top').on('click', function () {
		$(this).closest('.v-item').toggleClass('v-item_show');
	});

	// Модалки

	$('[data-modal]').iziModal();

	$('[data-open]').on('click', function (e) {
		e.preventDefault();

		var m = $(this).data('open');
		console.log($('[data-modal="' + m + '"]'));

		$('[data-modal="' + m + '"]').iziModal('open');
	});

	$('select').niceSelect();

	$('[data-type="datepicker"]').datepicker();

	if ($('[data-modal="photos"]').get(0)) {
		$('[data-modal="photos"]').iziModal({
			width: false,
			zindex: 999999999
		});
	}

	if ($('[data-modal="iframe"]').get(0)) {
		$('[data-modal="iframe"]').iziModal({
			history: false,
			iframe: true,
			fullscreen: true,
			headerColor: '#000000',
			group: 'iframe',
			loop: true
		});
	}

	$('.avideo__iframe').on('click', function () {
		$('[data-modal="iframe"]').iziModal('open');
	});

	$('.photo').on('click', function () {
		var img = '<img src="' + $(this).data('big') + '"/>';

		$('[data-modal="photos"] .iziModal-content').html(img);
		$('[data-modal="photos"]').iziModal('open');
	});

	$('.radio').on('click', function () {
		var checked = $(this).find('input:checked').get(0);

		$(this).parent().find('.radio_checked').removeClass('radio_checked');

		if (checked) $(this).addClass('radio_checked');
	});

	$('.radio').each(function (i, radio) {
		if ($(radio).index() == 0) $(radio).trigger('click');
	});

	// Табы
	$('[data-tabs] > *').on('click', function () {

		var tabs = $(this).parent().data('tabs'),
		    content = $('[data-tabs-content="' + tabs + '"]').children(),
		    index = $(this).index(),
		    aContent = $(content).get(index);

		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');

		$(content).hide();

		if ($(aContent).parent().data('tabs-flex') == true) {
			$(aContent).css('display', 'flex');
		} else {
			$(aContent).show();
		}
	});

	$('[data-tabs]').each(function (i, tabs) {
		$(tabs).children().first().trigger('click');
	});

	$('.nav').clone().appendTo($('.mobile__nav'));

	$('.mobile__menu-btn').on('click', function () {
		$('.page').toggleClass('page_fade');
		$(this).parent().find('.mobile__menu').toggleClass('mobile__menu_show');
	});
})(window);