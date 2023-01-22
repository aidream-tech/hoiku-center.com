$(function(){
	$.fn.disableDoubleClick = function(config){
		var config = $.extend({
			timeout: 10000
		}, config);
		var buttons = $(':submit, :image', this);
		buttons.bind('click',function() {
			var hidden = $('<input />').
				attr('type', 'hidden').
				attr('name', $(this).attr('name')).
				attr('value', $(this).attr('value'));
			$(this).after(hidden);
		});
		$(this).bind('submit',function() {
			buttons.attr('disabled', true);
			setTimeout(function(){
				buttons.attr('disabled', false);
			}, config.timeout);
		});
		return this;
	}
});