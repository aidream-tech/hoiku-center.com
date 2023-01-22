/**
 * QRコード生成
 */


/**
 * 入力値を半角数字に変換
 */
function ChangeHalfNum(Val) {
	var DoubleNum = "０１２３４５６７８９";
	var SingleNum = "0123456789";
	var InputVal = Val;
	var OutputVal = '';
	var OneChar = '';
	var Num = 0;
	
	for(var i=0;i<InputVal.length;i++){
		OneChar = InputVal.charAt(i);
		Num = DoubleNum.indexOf(OneChar,0);
		OneChar = Num >= 0 ? SingleNum.charAt(Num) : OneChar;
		OutputVal += OneChar;
	}
	return OutputVal;
}


/**
 * QRコードを生成
 */
function generateQr(){
	var qrSizeMax = 500;
	var qrSizeMin = 50;
	var objForm = eval("document.formQrCode");
	var qrBody = objForm.qrBody.value;
	var qrSize = parseInt(ChangeHalfNum(objForm.qrSize.value));
	var charst = objForm.charst.value;

  while(qrBody.indexOf("\r",0) >= 0 || qrBody.indexOf("\n",0) >= 0){
    qrBody = qrBody.replace("\r","");
    qrBody = qrBody.replace("\n","%0D%0A");
  }
	
	if (qrSize < qrSizeMin || qrSizeMax < qrSize) {
		alert('QRコードの一辺の長さは '+qrSizeMin+' 〜 '+qrSizeMax+' pxの範囲で指定してください');
	} else if(qrBody && qrSize > 0 && qrSize <= qrSizeMax){
		var objQrImg = document.getElementById('qrImg');
		objQrImg.src = "http://chart.apis.google.com/chart?cht=qr&choe=Shift_JIS&chs=" + qrSize + "x" + qrSize + "&chld=h&chl=" + qrBody;
		objQrImg.width = qrSize;
		objQrImg.height = qrSize;
		objForm.qrHtml.value = '<img src="http://chart.apis.google.com/chart?cht=qr&choe=' + charst + '&chs=' + qrSize + 'x' + qrSize + '&chld=h&chl=' + qrBody + '">';
  }
}


/**
 * QRコードの内容をクリア
 */
var qrBodyfirst = "on";
function clearQrBody(){
  if(qrBodyfirst == "on"){
    document.formQrCode.qrBody.value = "";
    qrBodyfirst = "off";
  }
}


/**
 * すべての入力内容を初期化
 */
function clearQr(){
	var objForm = eval("document.formQrCode");
	objForm.qrBody.value = '';
	objForm.qrSize.value = 160;
	objForm.charst.value = 'Shift_JIS';
	objForm.qrHtml.value = 'ここにQRコードのHTMLが表示されます';
	var objQrImg = document.getElementById('qrImg');
	objQrImg.width = 160;
	objQrImg.height = 160;
}
