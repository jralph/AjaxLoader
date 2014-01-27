/*
Create a self executing function to wrap
around the AjaxForm jQuery plugin.
 */
(function($, window, document, undefined){

	/*
	Define the plugin name, and plugin defaults.
	 */
	var pluginName = 'ajaxForm',
		defaults = {
			load_to: 'data-load-to',
			load_to_default: '#ajax-form-container',
			method_selector: 'method',
			data_type: 'text',
			data_return: null,
			content_source: 'action',
			in_animation: 'fadeIn',
			in_animation_speed: 200,
			out_animation: 'fadeOut',
			out_animation_speed: 200,
			loading_placeholder: '<div style="width: 100%; text-align: center; margin-top: 0px; padding-top: 5px; float: left;"><img src="js/ajax-loader.gif"></div>'
		};

	/*
	Create the main plugin constructor.
	 */
	function AjaxForm(element, options) {
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
	AjaxForm.prototype.init = function() {
		this.listen();
	};

	/*
	Create the function to listen for events on the
	selected element(s).
	 */
	AjaxForm.prototype.listen = function() {
		var _this = this;
		$(document).on('submit', this.selector, function(event) {
			event.preventDefault();
			_this.load(this);
		});
	};

	/*
	Create the function to begin the loading of data.
	 */
	AjaxForm.prototype.load = function(element) {
		var elem = $(element),
			file = elem.attr(this.options.content_source),
			load_to = elem.attr(this.options.load_to) || this.options.load_to_default,
			method = elem.attr(this.options.method_selector),
			data = elem.serialize(),
			type = this.options.data_type,
			name = elem.attr('name'),
			_this = this;

		$.ajax({
			type: method,
			url: file,
			data: data,
			dataType: type,
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
				$(load_to)[_this.options.out_animation](_this.options.out_animationspeed, function() {
					if(_this.options.data_return !== null) {
						$(this).html(_this.options.data_return(data, name));
					} else {
						if(_this.options.data_type == 'html'){
							var content = $('<div>').html(data);
							$(this).html(content.find(content_selector));
						} else {
							$(this).html(data);
						}
					}
					$(this)[_this.options.in_animation](_this.options.in_animationspeed);
				});
			}
		});
	};

	/*
	Register the plugin.
	 */
	$.fn[pluginName] = function(options) {
		if(!$.data(this, 'plugin_' + pluginName)) {
			$.data(this, 'plugin_' + pluginName, new AjaxForm(this, options));
		}
		return this;
	};

}(jQuery, window, document));