function initRollOvers() {
	if (!document.getElementById){
		return;
	}
	
	var preLoads = new Array();
	var allImages = document.getElementsByTagName('img');

	for (var i = 0; i < allImages.length; i++) {		
		if (allImages[i].className == 'on') {
			var src = allImages[i].getAttribute('src');
			var ftype = src.substring(src.lastIndexOf('.'), src.length);
			var oSrc = src.replace(ftype, '_on'+ftype);

			//-- スワップ元、スワップ先画像の登録
			allImages[i].setAttribute('pSrc', src);
			allImages[i].setAttribute('oSrc', oSrc);

			//-- イメージのプリロード
			preLoads[i] = new Image();
			preLoads[i].src = oSrc;

			//-- イベントの設定
			allImages[i].onmouseover = function() {
				this.setAttribute('src', this.getAttribute('oSrc'));
			}
			allImages[i].onmouseout = function() {
				this.setAttribute('src', this.getAttribute('pSrc'));
			}
		}
	}
}

function addOnload(func){
	if ( typeof window.addEventListener != "undefined" ){
		window.addEventListener( "load", func, false );
	}else if ( typeof window.attachEvent != "undefined" ) {
		window.attachEvent( "onload", func );
	}else{
		if ( window.onload != null ){
			var oldOnload = window.onload;
			window.onload = function ( e ) {
			oldOnload( e );
			window[func]();
		};
	}else
		window.onload = func;
	}
}
addOnload(initRollOvers);