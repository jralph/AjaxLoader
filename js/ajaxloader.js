/*
Create a self executing function to wrap
around the AjaxLoader jQuery plugin.
 */
(function($, window, document, undefined){

	/*
	Define the plugin name, and plugin defaults.
	 */
	var pluginName = 'ajaxLoader',
		defaults = {
			autoload_identifier: '.ajax-autoload',
			load_to: 'data-load-to',
			load_to_default: '#ajax-container',
			content_source: 'href',
			content_selector: 'data-content',
			content_selector_default: '#ajax-content',
			ajax_on: 'click',
			in_animation: 'fadeIn',
			in_animation_speed: 400,
			out_animation: 'fadeOut',
			out_animation_speed: 400,
			loading_placeholder: '<div style="width: 100%; text-align: center; margin-top: 0px; padding-top: 5px; float: left;"><img src="js/ajax-loader.gif"></div>',
			default_link: null
		};

	/*
	Create the main plugin constructor.
	 */
	function AjaxLoader(element, options) {
		this.element = element;
		this.selector = element.selector;

		this.options = $.extend( {}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	/*
	Create the plugin initialisation function.
	 */
	AjaxLoader.prototype.init = function() {
		this.autoload();
		this.listen();
	};

	/*
	Create the function to listen for events on the
	selected element(s).
	 */
	AjaxLoader.prototype.listen = function() {
		var _this = this;
		$(document).on(this.options.ajax_on, this.selector, function(event) {
			event.preventDefault();
			_this.load(this);
		});
	};

	/*
	Create the autoload function to load any elements
	tagged for immediate loading.
	 */
	AjaxLoader.prototype.autoload = function() {
		var autoload = $(this.selector + this.options.autoload_identifier),
			_this = this;

		autoload.each(function() {
			_this.load(this);
		});
	};

	/*
	Create the function to begin the loading of data.
	 */
	AjaxLoader.prototype.load = function(element) {
		var elem = $(element),
			file = elem.attr(this.options.content_source) || this.options.default_link,
			load_to = elem.attr(this.options.load_to) || this.options.load_to_default,
			content_selector = elem.attr(this.options.content_selector) || this.options.content_selector_default,
			_this = this;

		$.ajax({
			url: file,
			beforeSend: function beforeSend() {
				$(load_to)[_this.options.out_animation](_this.options.out_animation_speed, function() {
					$(load_to).show().html(_this.options.loading_placeholder);
				});
			},
			error: function error(jqXHR, textStatus, errorThrown) {
				console.log(textStatus);
				console.log(errorThrown);
			},
			success: function success(data) {
				$(load_to)[_this.options.out_animation](_this.options.out_animation_speed, function() {
					if( content_selector !== null && content_selector !== 'null' ) {
						var content = $('<div>').html(data);
						$(this).html(content.find(content_selector));
					} else {
						$(this).html(data);
					}
					$(this)[_this.options.in_animation](_this.options.in_animation_speed);
				});
			}
		});
	};

	/*
	Register the plugin.
	 */
	$.fn[pluginName] = function(options) {
		if(!$.data(this, 'plugin_' + pluginName)) {
			$.data(this, 'plugin_' + pluginName, new AjaxLoader(this, options));
		}
		return this;
	};

}(jQuery, window, document));