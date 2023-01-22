/* ------------------------------------------------------------
スムーズスクロール
------------------------------------------------------------ */

/* Easingの追加 */
jQuery.easing.quart = function (x, t, b, c, d) {
	return -c * ((t=t/d-1)*t*t*t - 1) + b;
};

/* ページの読み込み中 */
jQuery(document).ready(function(){
	/* <a href="#***">の場合、スクロール処理を追加 */
	jQuery('a[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = jQuery(this.hash);
			$target = $target.length && $target || jQuery('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
					if(jQuery.browser.opera){
						jQuery('html').animate({ scrollTop: targetOffset }, 1200, 'quart');
					}else{
						jQuery('html,body').animate({ scrollTop: targetOffset }, 1200, 'quart');
					}
					return false;
			}
		}
	});
	
	jQuery('area[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = jQuery(this.hash);
			$target = $target.length && $target || jQuery('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				if(jQuery.browser.opera){
					jQuery('html').animate({ scrollTop: targetOffset }, 1200, 'quart');
				}else{
					jQuery('html,body').animate({ scrollTop: targetOffset }, 1200, 'quart');
				}
				return false;
			}
		}
	});
});