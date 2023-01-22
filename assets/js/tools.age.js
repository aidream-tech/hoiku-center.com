window.onload = clear;

var week="日月火水木金土";
var GRP="";
var Q = 0;
var T = 0;
var output = '';

/**
 * 基準日に現在の日付をセット
 */
function setNow() {
	var year, month, date, youbi;
	var objDate = new Date();
	document.getElementById('to_year').value = objDate.getFullYear();
	document.getElementById('to_month').value = objDate.getMonth() + 1;
	document.getElementById('to_date').value = objDate.getDate();
	document.getElementById('to_youbi').innerHTML = '（' + week.substr(objDate.getDay(),1) + '）';
}

function clear() {
	setNow();
	document.getElementById('from_year').value = '';
	document.getElementById('from_month').value = '';
	document.getElementById('from_date').value = '';
	document.getElementById('viewBio').value = '';
}

/**
 * 日付の妥当性をチェック
 */
function checkDate(year, month, date) {
    var objDate = new Date(year, month - 1, date);
		var youbi = '';
		if(objDate == null || objDate.getFullYear() != year || objDate.getMonth() != month - 1 || objDate.getDate() != date) {
       return false;
    }
		return true;
}

/**
 * 入力値を半角数字に変換
 */
function changeHalfNum(val) {
	var doubleNum = "０１２３４５６７８９";
	var singleNum = "0123456789";
	var inputVal = val;
	var outputVal = '';
	var oneChar = '';
	var num = 0;
	
	for(var i=0; i < inputVal.length; i++){
    oneChar = inputVal.charAt(i);
    num = doubleNum.indexOf(oneChar,0);
    oneChar = num >= 0 ? singleNum.charAt(num) : oneChar;
    outputVal += oneChar;
  }
	
  return outputVal;
}

/**
 * 結果
 */
function getResult(res, output) {
	if (output != '') {
		document.getElementById(output).innerHTML = res;
	} else {
		return res;
	}
}

/**
 * 曜日
 */
function getYoubi(year_id, month_id, date_id, output) {
	var year, month, date, output;
	year = document.getElementById(year_id).value;
	month = document.getElementById(month_id).value;
	date = document.getElementById(date_id).value;
	if (checkDate(year, month, date) === true) {
		var objDate = new Date(year, month -1, date);
		youbi = objDate.getDay();
		document.getElementById(output).innerHTML = '（' + week.substr(youbi,1) + '）';
	} else {
		document.getElementById(output).innerHTML = '';
	}
}

/**
 * 閏年（うるうどし）
 */
function checkLeapYear(year, output) {
	var res = ((year % 4== 0) && (year % 100!=0) || (year % 400==0)) === true ? '閏年（うるうどし）' : '平年';
	getResult(res, output);
}

/**
 * 十二支
 */
function getTwelveHorarySigns(year, output) {
	var arr, val, res;
	arr = new Array(
		"子(ね・ねずみ)",
		"丑(うし)",
		"寅(とら)",
		"卯(う・うさぎ)",
		"辰(たつ)",
		"巳(み・へび)",
		"午(うま)",
		"未(ひつじ)",
		"申(さる)",
		"酉(とり)",
		"戌(いぬ)",
		"亥(い・いのしし)"
	);
	val = (eval(year) + 8) % 12
	res = arr[val];
	getResult(res, output);
}

/**
 * 十干（じっかん）
 */
function getTenHorarySigns(year, output) {
	var arr, val, res;
	arr = new Array(
		"甲（きのえ）",
		"乙（きのと）",
		"丙（ひのえ）",
		"丁（ひのと）",
		"戊（つちのえ）",
		"己（つちのと）",
		"庚（かのえ）",
		"辛（かのと）",
		"壬（みずのえ）",
		"癸（みずのと）"
	);
	val = (year + 6) % 10 ;
  res = arr[val];
	getResult(res, output);
}

/**
 * 九星術
 */
function getAstrology(year, output) {
	var arr, val, res;
	arr = new Array(
		"一白水星（いっぱくすいせい）",
		"二黒土星（じこくどせい）",
		"三碧木星（さんぺきもくせい）",
		"四緑木星（しろくもくせい）",
		"五黄土星（ごおうどせい）",
		"六白金星（ろっぱくきんせい）",
		"七赤金星（しちせききんせい）",
		"八白土星（はっぱくどせい）",
		"九紫火星（きゅうしかせい）"
	)
	val = -(eval(year) + 7) % 9 + 9
	if (val == 0) val = 9;
	res = arr[val - 1]
	getResult(res, output);
}

/**
 * 祝い
 */
function getCelebration(from_year, to_year, output) {
	var kazoe, res;
	kazoe = to_year - from_year + 1;
	switch (kazoe) {
		case 61:
			res = '還暦（かんれき）';
			break;
		case 70:
			res = '古希（こき）';
			break;
		case 77:
			res = '喜寿（きじゅ）';
			break;
		case 80:
			res = '傘寿（さんじゅ）';
			break;
		case 88:
			res = '米寿（べいじゅ）';
			break;
		case 90:
			res = '卒寿（そつじゅ）';
			break;
		case 99:
			res = '白寿（はくじゅ）';
			break;
		case 100:
			res = '上寿（じょうじゅ）';
			break;
		case 108:
			res = '茶寿（ちゃじゅ）';
			break;
		case 111:
			res = '皇寿（こうじゅ）';
			break;
		default:
			res = '------';
	}
	getResult(res, output);
}


/**
 * 星座
 */
function getConstellation(month, date, output) {
	var arr, res;
	month = parseInt(month);
	date = parseInt(date);
	
	arr = new Array(
		'牡羊座（おひつじざ・3/21〜4/20）',
		'牡牛座（おうしざ・4/21〜5/21）',
		'双子座（ふたござ・5/22〜6/21）',
		'蟹座（かにざ・6/22〜7/22）',
		'獅子座（ししざ・7/23〜8/22）',
		'乙女座（おとめざ・8/23〜9/23）',
		'天秤座（てんびんざ・9/24〜10/23）',
		'蠍座（さそりざ・10/24〜11/22）',
		'射手座（いてざ・11/23〜12/21）',
		'山羊座（やぎざ・12/22〜1/20）',
		'水瓶座（みずがめざ・1/21〜2/18）',
		'魚座（うおざ・2/19〜3/20）'
	);
	if ((month == 3 && date >= 21) || (month == 4 && date <= 20 )) {
		res = arr[0];
	}
	if ((month == 4 && date >= 21) || (month == 5 && date <= 21)) {
		res = arr[1];
	}
	if ((month == 5 && date >= 22) || (month == 6 && date <= 21)) {
		res = arr[2];
	}
	if ((month == 6 && date >= 22) || (month == 7 && date <= 22)) {
		res = arr[3];
	}
	if ((month == 7 && date >= 23) || (month == 8 && date <= 22)) {
		res = arr[4];
	}
	if ((month == 8 && date >= 23) || (month == 9 && date <= 23)) {
		res = arr[5];
	}
	if ((month == 9 && date >= 24) || (month == 10 && date <= 23)) {
		res = arr[6];
	}
	if ((month == 10 && date >= 24) || (month == 11 && date <= 22)) {
		res = arr[7];
	}
	if ((month == 11 && date >= 23) || (month == 12 && date <= 21)) {
		res = arr[8];
	}
	if ((month == 12 && date >= 22) || (month == 1 && date <= 20)) {
		res = arr[9];
	}
	if ((month == 1 && date >= 21) || (month == 2 && date <= 18)) {
		res = arr[10];
	}
	if ((month == 2 && date >= 19) || (month == 3 && date <= 20)) {
		res = arr[11];
	}
	getResult(res, output);
}

/**
 * 誕生石
 */
function getBirthstone(month, output){
	var arr, res;
	arr = new Array(
		" Garnet（ガーネット）", // 1月
		"Amethyst（アメジスト）", // 2月
		"Aquamarine（アクアマリン）・Coral（サンゴ）・Blood Stone（ブラッドストーン）", // 3月
		"Diamond（ダイヤモンド）", // 4月
		"Jadeite（ひすい）・Emerald（エメラルド）", // 5月
		"Peal（真珠）・Moon Stone（ムーンストーン）", // 6月
		"Ruby（ルビー）", // 7月
		"Sardonyx（サードニクス）・Peridot（ペリドット）", // 8月
		"Sapphire（サファイア）", // 9月
		"Opal（オパール）・Tourmaline（トルマリン）", // 10月
		"Topaz（トパーズ）・Citrine（シトリン）", // 11月
		"Turquoise（トルコ石）・Lapis-Lazuli（ラピスラズリ）" // 12月
	);
	res = arr[month - 1];
	getResult(res, output);
}

/**
 * 日数（生存日数）
 */
function getNumberOfDays(from_year, from_month, from_date, to_year, to_month, to_date, output) {
	objFrom = new Date(from_year, from_month - 1, from_date);
	objTo = new Date(to_year, to_month - 1, to_date);
	res = Math.ceil((objTo.getTime() - objFrom.getTime()) / (24 * 60 * 60 * 1000));
	if (output != '') {
		document.getElementById(output).innerHTML = res + '日';
	} else {
		return res;
	}
}

/**
 * 月末日
 */
function getEndOfMonth (year, month, date) {
	var leapYear = checkLeapYear(year, '');
	if (month == 2 && leapYear == '平年'){
		return 28;
	} else if (month == 2 && leapYear == '閏年（うるうどし）'){
		return 29;
	}else if(month == 4 || month == 6 || month == 9 || month == 11){
		return 30;
	}else{
		return 31;
	}
}

/**
 * 調子（各項目）
 */
function getCondition(numberOfDays, Q, output) {
	R=numberOfDays % Q;
  K = -Math.sin(R * (Math.PI)*2 / Q);
  L = Math.floor((1 - K) * 10) - 10;
	res = "普通" + "(" + String(L) + ")";
	if(L>7){
		res = "好調" + "(" + String(L) + ")";
	}else if((L>=0)&&(L<=3)){
		res = "注意" + "(" + String(L) + ")";
	}else if((L<=0)&&(L>-4)){
		res = "注意" + "(" + String(L) + ")";
	}else if(L<=-4){
		res = "不調" + "(" + String(L) + ")";
	}
	getResult(res, output);
}


//------------------------------------------------------
function calcBio(from_year, from_month, from_date, to_year, to_month, to_date){
	objTo = new Date(to_year, to_month - 1, 1);
	objFrom = new Date(from_year, from_month - 1, from_date);
	numberOfDays = Math.ceil((objTo.getTime() - objFrom.getTime()) / (24 * 60 * 60 * 1000));
	var endOfMonth = getEndOfMonth(to_year, to_month, to_date);
	var GH = '';
	var GRP="";
	GRP = to_year + "年" + to_month + "月\n";
	GRP += "\n";
	GRP += "日|-        0        +|\n";
	GRP += "--+---------+---------+-\n";
	for(c = 1; c <= endOfMonth; c++){
		GH = "                       ";
		Q = 23;	// 身体
		PIE();
		GH = GH.substring(0,T)+ "0" + GH.substring(T + 2, GH.length);
		Q = 28;	// 感情
		PIE();
		GH = GH.substring(0,T)+ "*" + GH.substring(T + 2, GH.length); 
		Q = 33;	// 知性
		PIE();
		GH = GH.substring(0,T)+ "+" + GH.substring(T + 2, GH.length); 
		GH = GH.substring(0,9)+ "|" + GH.substring(11, GH.length); 
		GRP += traceBio(2,String(c)) + "|" + GH  + "|"+ "\n";
	}
	document.getElementById('viewBio').value = GRP;
}

function PIE(){
	R = (numberOfDays + c - 1) % Q;
	K = -Math.sin(R * (Math.PI) * 2 / Q);
	L = Math.ceil((1 - K) * 10) - 10;
	if(Q == 33){
		L = Math.floor((1 - K) * 10) - 10;
	}
	T = 10 + L;
}

/**
 * バイオリズムを描画
 */
function traceBio(degit,n) {
	var res = "";
	for(i = 0; i < degit - n.length; i++){
		res += " ";
	}
	res = res + n;
	return res;
}


/**
 * 数字を3桁ごとにカンマ区切り
 */
function addFigure(num) {
　return num.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,' );
}

/**
 * 年齢を算出（このJavaScriptのメイン）
 */
function calcAge() {
	var from = 0;
	var to = 0;
	var from_check = false;
	var to_check = false;
	var from_year, from_month, from_date, from_youbi, to_year, to_month, to_date, to_youbi, numberOfDays;
	
	// 生年月日
	from_year = parseInt(document.getElementById('from_year').value);
	from_month = parseInt(document.getElementById('from_month').value);
	from_date = parseInt(document.getElementById('from_date').value);
	if (checkDate(from_year, from_month, from_date) == true) { // 日付の妥当性をチェック 
		from = from_year * 10000 + from_month * 100 + from_date;
		from_check = true;
	} else {
		alert('生年月日の日付が正しくありません');
	}
	
	// 基準日
	to_year = parseInt(document.getElementById('to_year').value);
	to_month = parseInt(document.getElementById('to_month').value);
	to_date = parseInt(document.getElementById('to_date').value);
	
	if (checkDate(to_year, to_month, to_date) === true) { // 日付の妥当性をチェック
		to = to_year * 10000 + to_month * 100 + to_date;
		to_check = true;
	} else {
		alert('基準日の日付が正しくありません');
	}
	
  if(from_check === true && to_check === true){ 
  	if (to > from) {
			// 年齢
			document.getElementById('age').innerHTML = Math.floor((to - from) / 10000) + '才';
			var numberOfDays = getNumberOfDays(from_year, from_month, from_date, to_year, to_month, to_date, ''); // 生存日数（以下の複数箇所で使用するので変数に格納）
			document.getElementById('numberOfDays').innerHTML = addFigure(numberOfDays) + '日';
			getTwelveHorarySigns(from_year, 'twelveHorarySigns'); // 十二支
			getTenHorarySigns(from_year, 'tenHorarySigns'); // 十干
			getAstrology(from_year, 'astrology'); // 九星
			getCelebration(from_year, to_year, 'celebration'); // 祝い
			getConstellation(from_month, from_date, 'constellation'); // 星座
			getBirthstone(from_month, 'birthstone'); // 誕生石
			getCondition(numberOfDays, 23, 'physical'); // 身体 Physical
			getCondition(numberOfDays, 28, 'emotional'); // 感情 Emotional
			getCondition(numberOfDays, 33, 'intellectual'); // 知性 Intellectual
			calcBio(from_year, from_month, from_date, to_year, to_month, to_date); // バイオ計算
		} else {
			alert('生年月日と基準日を正しく指定してください');
		}
	}
}
