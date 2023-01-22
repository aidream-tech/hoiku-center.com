/** 
 * @projectDescription	Indents (x)html source code.
 *
 * @author 	mizuki fujitani
 * @version 1.2 2009-08-12
 * @license GPL
 */
 

(function($){

var DEFAULTS = {
	tab: '\t',
	xhtml: true, // ex. <img> --> <img />, <br> --> <br />
	singles: ['br', 'img', 'hr'],
	conserve: ['script'],
	selector: ''
};

var O = {}, D = 0;

var tabs = function(){
	var t = '\n', i;
	for(i = 0; i < D; i ++){
		t += O.tab;
	}
	return t;
};

var msie_style2lc = $.browser.msie ? function(styles){
	styles = styles.split(';');
	for(var i = 0;  i < styles.length; i ++){
		styles[i] = styles[i].split(':');
		styles[i][0] = styles[i][0].toLowerCase();
		styles[i] = styles[i].join(':');
	}
	return styles.join(';');
} : 0;

var tag2src = function(dom, empty){
	var tag, attrs, src, i;
	if(dom.nodeType === 1 /* HTMLElement */){
		var tag = dom.nodeName.toLowerCase(), attrs = dom.attributes, attr_name, attr_value, src;
		src = '<'+tag;
		for(i = 0; i < attrs.length; i ++){
			attr_name = attrs[i].nodeName.toLowerCase();
			attr_value = attrs[i].nodeValue;
			if($.browser.msie
				&& (attr_name.indexOf('jquery') >= 0
				|| attr_value === ''
				|| attr_value === null
				|| attr_value === false
				|| attr_value === 'inherit'
				|| (attr_name === 'tabindex' && attr_value === 0))){
				continue;
			}
			src += ' ' + attr_name + '="' + attr_value + '"';
		}
		if($.browser.msie && (attr_value = $(dom).attr('style'))){
			src += ' style="' + msie_style2lc(attr_value) + '"';
		}
		
		if(empty){
			// ▼ 修正
			//src += O.xhtml && $.inArray(tag, O.singles) >= 0 ? ' />' : '></' + tag + '>';
			// ▼ 追記
			if(O.xhtml && $.inArray(tag, O.singles) >= 0){
				src += ' />';
			}else if(!O.xhtml && $.inArray(tag, O.singles) >= 0){
				src += '>';
			}else{
				src += '></' + tag + '>';
			}
			// ▲ 追記
			// ▲ 修正
		}else{
			src = [src + '>', '</' + tag + '>'];
		}
	}else{ /* TextNode */
		src = dom.nodeValue;
	}
	return src;
};


var insert_tabs = function(source){
	var indented = '', conserved = [], wrap = $('<div></div>'), i, tag, re;
	
	// 1: 
	
	for(i = 0; i < O.conserve.length; i ++){
		tag = O.conserve[i],
		re = new RegExp(
			'(<'+tag+'(\\s+[\\w-:]+=[\"\']?.*?[\"\']?)*?\\s*>([\\s\\S]*?)<\\/'+tag+'>'+
			'|'+
			'<'+tag+'(\\s+[\\w-:]+=[\"\']?.*?[\"\']?)*?\\s*\\/?>)'+
			(tag === 'script' ? '(\\s*?<noscript>(.*?)<\\/noscript>)?':''), 'ig');
		
		source = source.replace(re, function(a0, a1, a2, a3, a4, a5, a6){
			conserved.push(tag == 'script' && typeof a5 === 'string' && a5.length ? a1 + a5 : a1);
			return '<div class="jquery-indent-conserved-'+(conserved.length-1)+'"></div>';
		});
	}
	
	// 2: 
	
	source = source
		.replace(/<!--[\S\s]*?-->/g, '')
		.replace(/>\n?[\t ]+/g, '>')
		.replace(/[\t ]+</g, '<')
		.replace(/[\t ]*\n[\t ]*/g, '');
	
	// 3: 
	
	wrap.html(source);
	if(O.selector){
		wrap = $(O.selector, wrap);
		if(wrap.length === 0 || !wrap.html().length){
			return '';
		}else if(wrap.length > 1){
			wrap = wrap.eq(0);
		}
		D = 1;
	}
	
	// 4: 
	
	wrap.contents().each(function(){
		var children = $(this).contents(), src;
		if(children.length === 0){
			indented += tabs() + tag2src(this, true);
		}else if(children.length === 1 && children.get(0).nodeType === 3){
			src = tag2src(this, false);
			indented += tabs() + src[0] + children.get(0).nodeValue + src[1];
		}else{
			src = tag2src(this, false);
			indented += tabs() + src[0];
			D ++;
			children.each(arguments.callee);
			D --;
			indented += tabs() + src[1];
		}
	});
	
	// 5: 
	
	if(O.selector){
		tag = tag2src(wrap.get(0));
		indented = tag[0] + indented + '\n' + tag[1];
	}
	
	indented = indented.replace(/\t*<div class="jquery-indent-conserved-(\d+)"><\/div>/g, function(a0, a1){
		return conserved[a1];
	}).replace(/^\n/, ''); // ^\n
	
	D = 0;
	
	return indented;
};

$.extend({
	indent: function(source, options){
		O = $.extend({}, DEFAULTS, options);
		if(typeof source === 'string' && source.length){
			return insert_tabs(source);
		}else{
			return $;
		}
	}
});

$.fn.extend({
	indent: function(options){
		var sources = [];
		O = $.extend({}, DEFAULTS, options);
		this.each(function(){
			sources.push(insert_tabs(this.innerHTML));
		});
		return sources.length ? (sources.length > 1 ? sources : sources[0]) : '';
	}
});

$.fn.dump = function() {
   return $.dump(this);
}

$.dump = function(object) {
   var recursion = function(obj, level) {
      if(!level) level = 0;
      var dump = '', p = '';
      for(i = 0; i < level; i++) p += "\t";
      
      t = type(obj);
      switch(t) {
         case "string":
            return '"' + obj + '"';
            break;
         case "number":
            return obj.toString();
            break;
         case "boolean":
            return obj ? 'true' : 'false';
         case "date":
            return "Date: " + obj.toLocaleString();
         case "array":
            dump += 'Array ( \n';
            $.each(obj, function(k,v) {
               dump += p +'\t' + k + ' => ' + recursion(v, level + 1) + '\n';
            });
            dump += p + ')';
            break;
         case "object":
            dump += 'Object { \n';
            $.each(obj, function(k,v) {
               dump += p + '\t' + k + ': ' + recursion(v, level + 1) + '\n';
            });
            dump += p + '}';
            break;
         case "jquery":
            dump += 'jQuery Object { \n';
            $.each(obj, function(k,v) {
               dump += p + '\t' + k + ' = ' + recursion(v, level + 1) + '\n';
            });
            dump += p + '}';
            break;
         case "regexp":
            return "RegExp: " + obj.toString();
         case "error":
            return obj.toString();
         case "document":
         case "domelement":
            dump += 'DOMElement [ \n'
                  + p + '\tnodeName: ' + obj.nodeName + '\n'
                  + p + '\tnodeValue: ' + obj.nodeValue + '\n'
                  + p + '\tinnerHTML: [ \n';
            $.each(obj.childNodes, function(k,v) {
               if(k < 1) var r = 0;
               if(type(v) == "string") {
                  if(v.textContent.match(/[^\s]/)) {
                     dump += p + '\t\t' + (k - (r||0)) + ' = String: ' + trim(v.textContent) + '\n';
                  } else {
                     r--;
                  }
               } else {
                  dump += p + '\t\t' + (k - (r||0)) + ' = ' + recursion(v, level + 2) + '\n';
               }
            });
            dump += p + '\t]\n'
                  + p + ']';
            break;
         case "function":
            var match = obj.toString().match(/^(.*)\(([^\)]*)\)/im);
            match[1] = trim(match[1].replace(new RegExp("[\\s]+", "g"), " "));
            match[2] = trim(match[2].replace(new RegExp("[\\s]+", "g"), " "));
            return match[1] + "(" + match[2] + ")";
         case "window":
         default:
            dump += 'N/A: ' + t;
            break;
      }
      
      return dump;
   }
   
   var type = function(obj) {
      var type = typeof(obj);
      
      if(type != "object") {
         return type;
      }
      
      switch(obj) {
         case null:
            return 'null';
         case window:
            return 'window';
         case document:
            return 'document';
         case window.event:
            return 'event';
         default:
            break;
      }
      
      if(obj.jquery) {
         return 'jquery';
      }
      
      switch(obj.constructor) {
         case Array:
            return 'array';
         case Boolean:
            return 'boolean';
         case Date:
            return 'date';
         case Object:
            return 'object';
         case RegExp:
            return 'regexp';
         case ReferenceError:
         case Error:
            return 'error';
         case null:
         default:
            break;
      }
      
      switch(obj.nodeType) {
         case 1:
            return 'domelement';
         case 3:
            return 'string';
         case null:
         default:
            break;
      }
      
      return 'Unknown';
   }
   
   return recursion(object);
}

function trim(str) {
   return ltrim(rtrim(str));
}

function ltrim(str) {
   return str.replace(new RegExp("^[\\s]+", "g"), "");
}

function rtrim(str) {
   return str.replace(new RegExp("[\\s]+$", "g"), "");
}

})(jQuery);