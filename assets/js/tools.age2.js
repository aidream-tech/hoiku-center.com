//  Copyright (C)2002.4-2010.2  MYSYS. All rights reserved.

// 日数計算
   	var week="日月火水木金土";

	var nenrei0=0;
	var nissuu=0;
	var c=0;
	var y1="";
	var m1="";
	var d1="";
	var y2="";
	var m2="";
	var d2="";
	var uru="平年";
	var ME=31;
	var syoki=0; 
	var saikou=0;
	var Ln=8;
	var YM="";
	var CAL="";




function datainit(){

        var uru="平年";
	day0=new Date();
	year=day0.getYear();
	month=day0.getMonth()+1;
	day=day0.getDate();
	if(year<2000) year +=1900;
	youbi=day0.getDay();
   	f2.y20.value=year;
  	f2.m20.value=month;
   	f2.d20.value=day;
   	f2.y10.value=year;
   	f2.m10.value=month;
   	f2.d10.value=day;
	y2=year;
	m2=month;
	d2=day;
	y1=y2;
	m1=m2;
	d1=d2;
	if((year % 4== 0) && (year % 100!=0) || (year % 400==0)) uru ="閏年";
   	f2.uru1.value=uru;
 	if(uru=="閏年"){
		f2.uru1.style.backgroundColor="lightsalmon"
	}else{
		f2.uru1.style.backgroundColor="white"
	}

   	f2.uru2.value=uru;
 	if(uru=="閏年"){
		f2.uru2.style.backgroundColor="lightsalmon"
	}else{
		f2.uru2.style.backgroundColor="white"
	}
	if (year>1988) {wa="平成",wareki =year-1988}
        else if (year>1925) {wa="昭和",wareki =year-1925}
        else if (year>1911) {wa="大正",wareki =year-1911}
        else if (year>1867) {wa="明治",wareki =year-1867}
 
  	f2.wareki1.value=wa + String(wareki);
   	f2.wareki2.value=wa + String(wareki);
   	f2.youbi1.value=week.substr(youbi,1);
	ybcolor1(youbi);
   	f2.youbi2.value=week.substr(youbi,1);
	ybcolor2(youbi);
	f2.y10.focus();

        var uru="平年";
   	f2.y3.value=year;
	if((year % 4== 0) && (year % 100!=0) || (year % 400==0)) uru ="閏年";
	if (year>1988) {wa="平成",wareki =year-1988}
        else if (year>1925) {wa="昭和",wareki =year-1925}
        else if (year>1911) {wa="大正",wareki =year-1911}
        else if (year>1867) {wa="明治",wareki =year-1867}
   	f2.uru3.value=uru;
	f2.wareki3.value=wa + wareki
 	if(uru=="閏年"){
		f2.uru3.style.backgroundColor="lightsalmon"
	}else{
		f2.uru3.style.backgroundColor="white"
	}

}

function gengou(y,m,d){
	wa="不明";

	if(y>1989){
		wa="平成",wareki =y-1988
	}

	if((y>1926)&&(y<=1989)){
		wa="昭和",wareki =y-1925
		if(y==1989){
			if((m==1)&&(d>=8)){
				wa="平成",wareki =y-1988
			}else if((m>1)&&(d>=1)){
				wa="平成",wareki =y-1988
			}
		}
	}
	if((y>1912)&&(y<=1926)){
		wa="大正",wareki =y-1911
		if(y==1926){
			if((m==12)&&(d>=25)){
				wa="昭和",wareki =y-1925
			}
		}
	}
	if((y>1868)&&(y<=1912)){
		wa="明治",wareki =y-1867
		if(y==1912){
			if((m==7)&&(d>=30)){
				wa="大正",wareki =y-1911
			}else if((m>8)&&(d>=1)){
				wa="大正",wareki =y-1911
			}
		}
	}

       f2.wareki1.value=wa + String(wareki);
	uru="平年";
	if((y%4== 0) && (y%100!=0) || (y%400==0)) uru ="閏年";
   	f2.uru1.value=uru;
 	if(uru=="閏年"){
		f2.uru1.style.backgroundColor="lightsalmon"
	}else{
		f2.uru1.style.backgroundColor="white"
	}
	
        tstday=new Date(y,m-1,d);
	youbi=tstday.getDay();
	ybcolor1(youbi);
   	f2.youbi1.value=week.substr(youbi,1);
	y1=y;
	m1=m;
	d1=d;
	keisan(y1,m1,d1,y2,m2,d2)
}

function gengou1(y,m,d){
	wa="不明";
	if(y>1989){
		wa="平成",wareki =y-1988
	}

	if((y>1926)&&(y<=1989)){
		wa="昭和",wareki =y-1925
		if(y==1989){
			if((m==1)&&(d>=8)){
				wa="平成",wareki =y-1988
			}else if((m>1)&&(d>=1)){
				wa="平成",wareki =y-1988
			}
		}
	}
	if((y>1912)&&(y<=1926)){
		wa="大正",wareki =y-1911
		if(y==1926){
			if((m==12)&&(d>=25)){
				wa="昭和",wareki =y-1925
			}
		}
	}
	if((y>1868)&&(y<=1912)){
		wa="明治",wareki =y-1867
		if(y==1912){
			if((m==7)&&(d>=30)){
				wa="大正",wareki =y-1911
			}else if((m>8)&&(d>=1)){
				wa="大正",wareki =y-1911
			}
		}
	}

        f2.wareki2.value=wa + String(wareki);
	uru="平年";
	if((y%4== 0) && (y%100!=0) || (y%400==0)) uru ="閏年";
   	f2.uru2.value=uru;
 	if(uru=="閏年"){
		f2.uru2.style.backgroundColor="lightsalmon"
	}else{
		f2.uru2.style.backgroundColor="white"
	}

        tstday=new Date(y,m-1,d);
	youbi=tstday.getDay();
	ybcolor2(youbi);
   	f2.youbi2.value=week.substr(youbi,1);
	y2=y;
	m2=m;
	d2=d;
	keisan(y1,m1,d1,y2,m2,d2)
}


function keisan(y1,m1,d1,y2,m2,d2){
	nenreikeisan(y2,m2,d2,y1,m1,d1);
        f2.nenrei.value=YM;
//nenrei0;
}


function ymd(yy1,mm1,dd1,yy2,mm2,dd2){
// チェック
		document.f2.y10.focus()

function isNumeric(str){
  if((str > 0) || (str <= 0)){
   	 return true;
  }
  else{
	return false;
  }
}
  // 入力なし
  if((yy1 == "")||(mm1 == "")||(dd1 == "")||(yy2 == "")||(mm2 == "")||(dd2 == "")){
        alert("全部入力してください！")
  }
  // 数字入力
  else if(isNumeric(yy1)&&isNumeric(mm1)&&isNumeric(dd1)&&isNumeric(yy2)&&isNumeric(mm2)&&isNumeric(dd2)){
	keisan(yy1,mm1,dd1,yy2,mm2,dd2);	
  // それ以外
  }else{
    alert("半角数字を入力してください");
  }
}


function nenreikeisan(yy2,mm2,dd2,yy1,mm1,dd1){
	nenrei0=yy2-yy1;
	if(mm2-mm1<0){
		nenrei0=yy2-yy1-1;
	} 
	if(mm2-mm1==0){
		nenrei0=yy2-yy1;
		if (dd2-dd1<0){
			nenrei0=yy2-yy1-1;
		}
	}     
	YM=nenrei0
}

function nenreikeisan0(yy2,mm2,dd2,yy1,mm1,dd1){
	yy2=eval(yy2);
	mm2=eval(mm2);
	dd2=eval(dd2);
	yy1=eval(yy1);
	mm1=eval(mm1);
	dd1=eval(dd1);


	nenrei0=yy2-yy1;
       	tukisuu=mm2-mm1;
	if(tukisuu>0){
		if(dd2>=dd1){
		}else if(dd2<dd1){
			tukisuu=tukisuu-1;
			if(tukisuu<0){
				tukisuu=11;
				nenrei=nenrei-1;
			}
		}
	}else if(tukisuu==0){
		if(dd2>=dd1){
			tukisuu=tukisuu;
		}else if(dd2<dd1){
			tukisuu=11;
			nenrei0=nenrei0-1;
		}
	}else if(tukisuu<0){
		nenrei0=nenrei0-1;
		tukisuu=tukisuu+12;

		if(dd2>=dd1){
			tukisuu=tukisuu;
		}else if(dd2<dd1){
			tukisuu=tukisuu-1;
			if(tukisuu<0){
				tukisuu=11;
				nenrei=nenrei-1;
			}
		}
	}

	if(tukisuu<10){
		YM=nenrei0 + ".0" + tukisuu
	}else{
		YM=nenrei0 + "." + tukisuu
	}	
}


function min1(y,m,d){
        tstday=new Date(y,m-1,d);
	youbi=tstday.getDay();
	ybcolor1(youbi);
   	f2.youbi1.value=week.substr(youbi,1);
	if(y>1989){
		wa="平成",wareki =y-1988
	}

	if((y>1926)&&(y<=1989)){
		wa="昭和",wareki =y-1925
		if(y==1989){
			if((m==1)&&(d>=8)){
				wa="平成",wareki =y-1988
			}else if((m>1)&&(d>=1)){
				wa="平成",wareki =y-1988
			}
		}
	}
	if((y>1912)&&(y<=1926)){
		wa="大正",wareki =y-1911
		if(y==1926){
			if((m==12)&&(d>=25)){
				wa="昭和",wareki =y-1925
			}
		}
	}
	if((y>1868)&&(y<=1912)){
		wa="明治",wareki =y-1867
		if(y==1912){
			if((m==7)&&(d>=30)){
				wa="大正",wareki =y-1911
			}else if((m>8)&&(d>=1)){
				wa="大正",wareki =y-1911
			}
		}
	}

        f2.wareki1.value=wa + String(wareki);
	y1=y;
	m1=m;
	d1=d;
	keisan(y1,m1,d1,y2,m2,d2)
}

function din1(y,m,d){
	uru=f2.uru1.value;
	f2.d10.value=d;
	if((m==2)&&(uru=="平年")&&(d>28)){
			d=28;
			f2.d10.value=d;
	}else if((m==2)&&(uru="閏年")&&(d>29)){
			d=29;
			f2.d10.value=d;
	}else if(((m==4)||(m==6)||(m==9)||(m==11))&&(d>30)){
			d=30;
			f2.d10.value=d;
	}else{
		if(d>30){
			d=31;
			f2.d10.value=d;
		}
	}
        tstday=new Date(y,m-1,d);
	youbi=tstday.getDay();
	ybcolor1(youbi);
   	f2.youbi1.value=week.substr(youbi,1);

	if(y>1989){
		wa="平成",wareki =y-1988
	}

	if((y>1926)&&(y<=1989)){
		wa="昭和",wareki =y-1925
		if(y==1989){
			if((m==1)&&(d>=8)){
				wa="平成",wareki =y-1988
			}else if((m>1)&&(d>=1)){
				wa="平成",wareki =y-1988
			}
		}
	}
	if((y>1912)&&(y<=1926)){
		wa="大正",wareki =y-1911
		if(y==1926){
			if((m==12)&&(d>=25)){
				wa="昭和",wareki =y-1925
			}
		}
	}
	if((y>1868)&&(y<=1912)){
		wa="明治",wareki =y-1867
		if(y==1912){
			if((m==7)&&(d>=30)){
				wa="大正",wareki =y-1911
			}else if((m>8)&&(d>=1)){
				wa="大正",wareki =y-1911
			}
		}
	}

        f2.wareki1.value=wa + String(wareki);
	y1=y;
	m1=m;
	d1=d;
	keisan(y1,m1,d1,y2,m2,d2)
}

function min2(yy1,mm1,dd1,y,m,d){
        tstday=new Date(y,m-1,d);
	youbi=tstday.getDay();
	ybcolor2(youbi);
   	f2.youbi2.value=week.substr(youbi,1);
	if(y>1989){
		wa="平成",wareki =y-1988
	}

	if((y>1926)&&(y<=1989)){
		wa="昭和",wareki =y-1925
		if(y==1989){
			if((m==1)&&(d>=8)){
				wa="平成",wareki =y-1988
			}else if((m>1)&&(d>=1)){
				wa="平成",wareki =y-1988
			}
		}
	}
	if((y>1912)&&(y<=1926)){
		wa="大正",wareki =y-1911
		if(y==1926){
			if((m==12)&&(d>=25)){
				wa="昭和",wareki =y-1925
			}
		}
	}
	if((y>1868)&&(y<=1912)){
		wa="明治",wareki =y-1867
		if(y==1912){
			if((m==7)&&(d>=30)){
				wa="大正",wareki =y-1911
			}else if((m>8)&&(d>=1)){
				wa="大正",wareki =y-1911
			}
		}
	}
        f2.wareki2.value=wa + String(wareki);
	Getumatubi(y,m,d);
	keisan(yy1,mm1,dd1,y,m,d);
}

function din2(yy1,mm1,dd1,y,m,d){
	uru=f2.uru2.value;
	f2.d20.value=d;
	if((m==2)&&(uru=="平年")&&(d>28)){
			d=28;
			f2.d20.value=d;
	}else if((m==2)&&(uru="閏年")&&(d>29)){
			d=29;
			f2.d20.value=d;
	}else if(((m==4)||(m==6)||(m==9)||(m==11))&&(d>30)){
			d=30;
			f2.d20.value=d;
	}else{
		if(d>30){
			d=31;
			f2.d20.value=d;
		}
	}
        tstday=new Date(y,m-1,d);
	youbi=tstday.getDay();
	ybcolor2(youbi);
	if(y>1989){
		wa="平成",wareki =y-1988
	}

	if((y>1926)&&(y<=1989)){
		wa="昭和",wareki =y-1925
		if(y==1989){
			if((m==1)&&(d>=8)){
				wa="平成",wareki =y-1988
			}else if((m>1)&&(d>=1)){
				wa="平成",wareki =y-1988
			}
		}
	}
	if((y>1912)&&(y<=1926)){
		wa="大正",wareki =y-1911
		if(y==1926){
			if((m==12)&&(d>=25)){
				wa="昭和",wareki =y-1925
			}
		}
	}
	if((y>1868)&&(y<=1912)){
		wa="明治",wareki =y-1867
		if(y==1912){
			if((m==7)&&(d>=30)){
				wa="大正",wareki =y-1911
			}else if((m>8)&&(d>=1)){
				wa="大正",wareki =y-1911
			}
		}
	}
        f2.wareki2.value=wa + String(wareki);

   	f2.youbi2.value=week.substr(youbi,1);
	keisan(yy1,mm1,dd1,y,m,d);
}


function honjitu1(y,m,d,yy2,mm2,dd2){

	day0=new Date();
	year=day0.getYear();
	month=day0.getMonth()+1;
	day=day0.getDate();
	if(year<2000) year +=1900;
   	f2.y20.value=year;
   	f2.m20.value=month;
   	f2.d20.value=day;
	yy2=year;
	mm2=month;
	dd2=day;
	youbi=day0.getDay();
	ybcolor2(youbi);

   	f2.youbi2.value=week.substr(youbi,1);
	if((year % 4== 0) && (year % 100!=0) || (year % 400==0)) uru ="閏年";
   	f2.uru2.value=uru;
	if (year>1988) {wa="平成",wareki =year-1988}
        else if (year>1925) {wa="昭和",wareki =year-1925}
        else if (year>1911) {wa="大正",wareki =year-1911}
        else if (year>1867) {wa="明治",wareki =year-1867}
   	f2.wareki2.value=wa + String(wareki);
	keisan(y1,m1,d1,yy2,mm2,dd2)
}

//月末日
function Getumatubi(y,m,d){
	if((m==2)&&(uru=="平年")){
		ME=28;
	}else if((m==2)&&(uru="閏年")){
		ME=29;
	}else if((m==4)||(m==6)||(m==9)||(m==11)){
		ME=30;
	}else{
		ME=31;
	}
}

function ybcolor1(youbi){
	if(youbi==0){
		f2.youbi1.style.color="red";
	}else if(youbi==6){
		f2.youbi1.style.color="blue";
	}else{
		f2.youbi1.style.color="black";
	}
}
function ybcolor2(youbi){
	if(youbi==0){
		f2.youbi2.style.color="red";
	}else if(youbi==6){
		f2.youbi2.style.color="blue";
	}else{
		f2.youbi2.style.color="black";
	}
}

function kotosi(){
	dayK=new Date();
	year=dayK.getYear();
	if(year<2000) year +=1900;
	f2.y3.value=year;
	gengou3(year)
}

function gengou3(y){
	wa="不明";
	if(y>1989){wa="平成",wareki =y-1988}

	if((y>1926)&&(y<=1989)){wa="昭和",wareki =y-1925}
	if((y>1912)&&(y<=1926)){wa="大正",wareki =y-1911}
	if((y>1868)&&(y<=1912)){wa="明治",wareki =y-1867}
        f2.wareki3.value=wa + String(wareki);
	uru="平年";
	if((y%4== 0) && (y%100!=0) || (y%400==0)) uru ="閏年";
   	f2.uru3.value=uru;
 	if(uru=="閏年"){
		f2.uru3.style.backgroundColor="lightsalmon"
	}else{
		f2.uru3.style.backgroundColor="white"
	}
}

function warekiH(){
	year=f2.y3.value;
	syoki=1905+Math.floor((year-1995)/10)*10;
	saikou=year-syoki; 
	Ln=Math.floor(saikou/10)+1;
	CAL="1"
	hyouji();
}
function seirekiH(){
	year=f2.y3.value;
	syoki=1900+Math.floor((year-1990)/10)*10;
	saikou=year-syoki; 
	Ln=Math.floor(saikou/10)+1;
	CAL="2"
	hyouji();
}

// 年齢早見表
function hyouji(){
	WD="";

WD=document.open("Dummy.html","","toolbar=no,location=no,directories=no,menubar=yes,scrollbars=yes,resizable=yes,width=850,height=650");

	col=""
	col +="<STYLE type=text/css>.seltext{font-size:10pt;line-height:11pt;padding:1pt}</STYLE>";
	col +="<CENTER>"
	col +="<FONT SIZE=3><B>実友　年齢早見表</B></FONT>";



	col +="<TABLE border=0 cellspacing=1 bgcolor=palegoldenrod width=98%>"
			wa="不明";
			seireki1= year;
			{if (seireki1>1988) {wa="平成",wareki =seireki1-1988}
			else if (seireki1>1925) {wa="昭和",wareki =seireki1-1925}
			else if (seireki1>1911) {wa="大正",wareki =seireki1-1911}
			else if (seireki1>1867) {wa="明治",wareki =seireki1-1867}
                	} 
	if(CAL=="1"){	
		col += "<TR bgcolor=pink align = center>";
	}else{
		col += "<TR bgcolor=springgreen align = center>";
	}
	
	col += "<TD colspan = 10 class=seltext>" + "<B>" + year + "</B>" + "年(" + wa + wareki + "年)　" +  "<B>" + "</TD></TR>";

		col +="<TR align = center>";
		for(i =0; i <=9; i++){
                	seireki= i + syoki;               
			col += "<TD bgcolor=blue";
			col += "</TD>";
		}
		col +="</TR>"


	for(j=1;j<=Ln;j++){
        	col +="<TR align = center>";
		for(i =0; i <=9; i++){
                	seireki= i + syoki;               
			col += "<TD bgcolor=blue class=seltext";
			style1= "this.style.backgroundColor='red'"
			col +=" onMouseOver = " + style1;
			style1= "this.style.backgroundColor='blue'"
			col +=" onMouseOut = " + style1 + ">" ;

			col += "<font color=white><B>" + seireki +"</B>年" + "</font></TD>";
		}
	        col +="</TR>";


	        col +="<TR align = center>";
		for(i =0; i <=9; i++){
                	wa="不明"
			seireki1= i + syoki;
			{if (seireki1>1988) {wa="平成",wareki =seireki1-1988,celiro="lightgreen"}
                	else if (seireki1>1925) {wa="昭和",wareki =seireki1-1925,celiro="lightcyan"}
                	else if (seireki1>1911) {wa="大正",wareki =seireki1-1911,celiro="mistyrose"}
                	else if (seireki1>1867) {wa="明治",wareki =seireki1-1867,celiro="aliceblue"}
                	} 
			col +="<TD bgcolor='" + celiro + "' class=seltext";
			style1= "this.style.backgroundColor='salmon'"
			col +=" onMouseOver = " + style1;
			style1= "this.style.backgroundColor='" + celiro + "'";
			col +=" onMouseOut = " + style1 + ">" ;
			col += wa + "<B>" + wareki + "</B>" + "年" + "</TD>";

		}
	        col +="</TR>";


       		col +="<TR align = center bgcolor=ghostwhite>"
		for(i =0; i <=9; i++){
                	nenrei= saikou-i                 
			if (nenrei<0){
				col +="<TD class=seltext>" + " -- " + "</TD>";
			}else{
				col +="<TD class=seltext";
				style1= "this.style.backgroundColor='salmon'"
				col +=" onMouseOver = " + style1;
				style1= "this.style.backgroundColor='white'";
				col +=" onMouseOut = " + style1 + ">" ;
								
				col += "<B>" + nenrei + "</B>" + "歳" + "</TD>";			}
		}
 	        col +="</TR>";
		

		col +="<TR align = center>";
		for(i =0; i <=9; i++){
                	seireki= i + syoki;               
			col += "<TD bgcolor=blue";
			col += "</TD>";
		}
		syoki +=10;
		saikou -=10;
		col +="</TR>"
	} 
		col +="<TR align = center>";
		for(i =0; i <=9; i++){
                	seireki= i + syoki;               
			col += "<TD bgcolor=blue";
			col += "</TD>";
		}
		col +="</TR>"
	col += "<TR bgcolor=orangered  align = center><TH colspan = 10 class=seltext>"
	 + "<font color=white>" + "誕生日前は，表示の年齢から１を引きます。" + "</font>" + "</TH></TR>";
	col +="</TABLE>";
	col+="<DIV  class=seltext>（明治は1868年9月8日から，大正は1912年7月30日から，昭和は1926年12月25日から，平成は1989年1月8日から）</DIV>"
//	col +="<BR>"

	col += "<INPUT TYPE='button' VALUE='　戻　る　' onClick='window.close()'>"
	col +="</CENTER>"
	col +="<BR>"

	WD.document.write(col);

	X=(screen.width-850)/2;
	Y=(screen.height-650)/2;
	WD.moveTo(X,Y);
	WD.document.close();
}


//バイオリズム
function wopen2(){
bio=window.open('nenhyouji.html','newwin3','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=1,width=800,height=600');
X=(screen.width-800)/2;
Y=(screen.height-600)/2;
bio.moveTo(X,Y);

}

function return1(keyCode){
//	if(event.keyCode==13){
//		document.f2.m10.focus()
//	}
// IEでもFirefoxでも可
	if (keyCode == 13) {
        	f2.m10.focus();
    	}
}
function return2(keyCode){
//	if(event.keyCode==13){
//		document.f2.d10.focus()
//	}
// IEでもFirefoxでも可
	if (keyCode == 13) {
        	f2.d10.focus();
    	}


}
function return3(keyCode){
//	if(event.keyCode==13){
//		document.f2.y20.focus()
//	}
// IEでもFirefoxでも可
	if (keyCode == 13) {
        	f2.y20.focus();
    	}
}


function return4(keyCode){
//	if(event.keyCode==13){
//		document.f2.m20.focus()
//	}
// IEでもFirefoxでも可
	if (keyCode == 13) {
        	f2.m20.focus();
    	}

}
function return5(keyCode){
//	if(event.keyCode==13){
//		document.f2.d20.focus()
//	}
// IEでもFirefoxでも可
	if (keyCode == 13) {
        	f2.d20.focus();
    	}
}
function return6(keyCode){
//	if(event.keyCode==13){
//		document.f2.IN.focus()
//	}
// IEでもFirefoxでも可
	if (keyCode == 13) {
        	f2.IN.focus();
    	}
}
function return7(keyCode){
	if(event.keyCode==13){
		document.f2.y10.focus()
	}
// IEでもFirefoxでも可
	if (keyCode == 13) {
        	f2.y10.focus();
    	}
}

//フォーカス
function FocusOnAY(){document.f2.y20.focus()}
function FocusOnAM(){document.f2.m20.focus()}
function FocusOnAD(){document.f2.d20.focus()}
function FocusOnBY(){document.f2.y10.focus()}
function FocusOnBM(){document.f2.m10.focus()}
function FocusOnBD(){document.f2.d10.focus()}
function FocusOnIY(){document.f2.y3.focus()}



