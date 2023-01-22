/**
 * ランダム・パスワードの生成
 */

// パスワードに使用する文字列
var Default01 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var Default02 = 'abcdefghijklmnopqrstuvwxyz';
var Default03 = '0123456789';
var Default04 = '=+/.,-_'; // '()+-!#$%&_/~';


//紛らわしいと思われる文字
var ConfusingChars = 'ijcovylIO017'.split('');

//最小桁数
var MinNumber = 4;

//最大桁数
var MacNumber = 100;

//最小個数
var MinQty = 1;

// 最大個数
var MaxQty = 100;

var Chars01,Chars02,Chars03,Chars04;
var StockFlg = false;
var ResText = '';
var CharUniq = true;


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
	
	for(var i=0; i < InputVal.length; i++){
    OneChar = InputVal.charAt(i);
    Num = DoubleNum.indexOf(OneChar,0);
    OneChar = Num >= 0 ? SingleNum.charAt(Num) : OneChar;
    OutputVal += OneChar;
  }
	
  return OutputVal;
}


/**
 * パスワードを生成
 */
function generatePwd(){
	document.form1.Result.value="";
	var Qty = ChangeHalfNum(document.form1.Qty.value.replace(/^0+/,""));
	if (Qty == "" || Qty.match(/[^0-9]/)){
		alert('個数を正しく設定してください');
		return false;
	}
	var Qty = parseInt(Qty);
	if (Qty < MinQty){
		alert('個数が少なすぎます '+MinQty+' - '+MaxQty+' 個で設定してください');
		return false;
	} else if (Qty > MaxQty){
		alert('個数が多すぎます '+MinQty+' - '+MaxQty+' 個で設定してください');
		return false;
	}
	for (var i=0;i<Qty;i++){
		if (!generateOnePwd(1)){
			return;
		}
	}
	document.form1.Result.value += ResText;
	StockFlg = true;
	ResText = '';
}


/**
 * パスワードを1つ生成
 */
function generateOnePwd(int01){
	Chars01 = Default01;
	Chars02 = Default02;
	Chars03 = Default03;
	Chars04 = Default04;

	if (document.form1.CharSafe.checked){
		for (var i in ConfusingChars){
			Chars01 = Chars01.replace(ConfusingChars[i],'');
			Chars02 = Chars02.replace(ConfusingChars[i],'');
			Chars03 = Chars03.replace(ConfusingChars[i],'');
			Chars04 = Chars04.replace(ConfusingChars[i],'');
		}
	}

	CharUniq = true;
	if (!document.form1.CharUniq.checked){
		CharUniq = false;
	}

	var Digit = ChangeHalfNum(document.form1.Digits.value.replace(/^0+/,""));
	if (Digit == "" || Digit.match(/[^0-9]/)){
		alert('桁数を正しく入力してください');
		return false;
	}
	
	Digit = parseInt(Digit);
	if (Digit < MinNumber){
		alert('桁数が小さすぎます '+MinNumber+' 〜 '+MacNumber+' 文字で設定してください');
		return false;
	} else if (Digit > MacNumber){
		alert('桁数が多すぎます '+MinNumber+' 〜 '+MacNumber+' 文字で設定してください');
		return false;
	}

	if (CharUniq){
		var CharsCount = 0;
		if (document.form1.CharType1.checked) CharsCount += Chars01.length;
		if (document.form1.CharType2.checked) CharsCount += Chars02.length;
		if (document.form1.CharType3.checked) CharsCount += Chars03.length;
		if (document.form1.CharType4.checked) CharsCount += Chars04.length;
		if (Digit > CharsCount){
			alert('設定した条件では '+Digit+' 桁のパスワードが作成できません');
			return false;
		}
	}

	var TempText = '';
	var PwdList = '';
	while (PwdList.length < Digit){
		if (document.form1.CharType1.checked){
			TempText = Chars01.charAt(Math.random()*Chars01.length);
			PwdList += TempText;
			if (CharUniq) Chars01 = Chars01.replace(TempText,"");
			if (PwdList.length == Digit) break;
		}
		if (document.form1.CharType2.checked){
			TempText = Chars02.charAt(Math.random()*Chars02.length);
			PwdList += TempText;
			if (CharUniq) Chars02 = Chars02.replace(TempText,"");
			if (PwdList.length == Digit) break;
		}
		if (document.form1.CharType3.checked){
			TempText = Chars03.charAt(Math.random()*Chars03.length);
			PwdList += TempText;
			if (CharUniq) Chars03 = Chars03.replace(TempText,"");
			if (PwdList.length == Digit) break;
		}
		if (document.form1.CharType4.checked){
			TempText = Chars04.charAt(Math.random()*Chars04.length);
			PwdList += TempText;
			if (CharUniq) Chars04 = Chars04.replace(TempText,"");
			if (PwdList.length == Digit) break;
		}
	}

	var PwdList2 = '';
	do {
		TempText = PwdList.charAt(Math.random()*PwdList.length);
		PwdList2 += TempText;
		PwdList = PwdList.replace(TempText,"");
	} while(PwdList.length);
	if (int01){
		ResText += PwdList2 + "\n";
	}
	
	return true;
}

/**
 * パスワードをストック
 */
function StockPwd(){
	if (StockFlg){
		if(document.form1.Stock.value == 'ここにパスワードをストックします') {
			document.form1.Stock.value = '';
		}
		document.form1.Stock.value += document.form1.Result.value;
		StockFlg = false;
	}
}