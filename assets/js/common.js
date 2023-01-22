/* ------------------------------------------------------------
 Bookmark（お気に入りに追加）
------------------------------------------------------------ */
function addBookmark(title,url) {
	if (window.sidebar) {
		window.sidebar.addPanel(title, url,"");
	} else if(document.all) {
		window.external.AddFavorite( url, title);
	} else if(window.opera && window.print) {
		return true;
	} else {
		alert('お使いのブラウザでは、この機能をご利用できません。');
	}
}

/* ------------------------------------------------------------
 Print（印刷）
------------------------------------------------------------ */
function print_out() {
	/* print() が使用できるブラウザか否かの判別 */
	if (navigator.userAgent.match(/msie (\d)/i)) {
		v = (eval(RegExp.$1) >= 5) ? 1 : 0;
	} else if (self.innerWidth) {
		v = (eval(navigator.appVersion.charAt(0)) >= 4) ? 1 : 0;
	} else {
		v = 0;
	}
	/* print() が使用できるブラウザの場合 印刷を実行 */
	if (v) {
		self.print();
	} else {
		alert('お使いのブラウザでは、この機能をご利用できません。');
	}
}