var btn_num = 6;

$(document).ready(function(){
	for(i=1; i<=btn_num; i++){
    	$('a.bt_menu'+i+'').hover(
        	function () {
            	$(this).stop().animate({'opacity' : '0'}, 300);
	        },
    	    function () {
        	    $(this).stop().animate({'opacity' : '1'}, 800);
	        }
		);
	}
});
