/*!
 * Beebotte client JavaScript library
 * Version 0.6.0
 * http://beebotte.com
 * Report issues to https://github.com/beebotte/bbt_node/issues
 * Contact email contact@beebotte.com
 *
 * Copyright 2017, Beebotte Corporation
 * MIT licence
 */

/*********** DEPENDENCIES HERE ***************/

/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-2 as well as the corresponding HMAC implementation
 as defined in FIPS PUB 198a

 Copyright Brian Turek 2008-2013
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnston
*/
(function(A){function q(a,d,b){var f=0,e=[0],c="",g=null,c=b||"UTF8";if("UTF8"!==c&&"UTF16"!==c)throw"encoding must be UTF8 or UTF16";if("HEX"===d){if(0!==a.length%2)throw"srcString of HEX type must be in byte increments";g=t(a);f=g.binLen;e=g.value}else if("ASCII"===d||"TEXT"===d)g=v(a,c),f=g.binLen,e=g.value;else if("B64"===d)g=w(a),f=g.binLen,e=g.value;else throw"inputFormat must be HEX, TEXT, ASCII, or B64";this.getHash=function(a,b,c,d){var g=null,h=e.slice(),k=f,m;3===arguments.length?
"number"!==typeof c&&(d=c,c=1):2===arguments.length&&(c=1);if(c!==parseInt(c,10)||1>c)throw"numRounds must a integer >= 1";switch(b){case "HEX":g=x;break;case "B64":g=y;break;default:throw"format must be HEX or B64";}if("SHA-1"===a)for(m=0;m<c;m++)h=s(h,k),k=160;else throw"Chosen SHA variant is not supported";return g(h,z(d))};this.getHMAC=function(a,b,d,g,q){var h,k,m,l,r=[],u=[];h=null;switch(g){case "HEX":g=x;break;case "B64":g=y;break;default:throw"outputFormat must be HEX or B64";}if("SHA-1"===
d)k=64,l=160;else throw"Chosen SHA variant is not supported";if("HEX"===b)h=t(a),m=h.binLen,h=h.value;else if("ASCII"===b||"TEXT"===b)h=v(a,c),m=h.binLen,h=h.value;else if("B64"===b)h=w(a),m=h.binLen,h=h.value;else throw"inputFormat must be HEX, TEXT, ASCII, or B64";a=8*k;b=k/4-1;if(k<m/8){if("SHA-1"===d)h=s(h,m);else throw"Unexpected error in HMAC implementation";h[b]&=4294967040}else k>m/8&&(h[b]&=4294967040);for(k=0;k<=b;k+=1)r[k]=h[k]^909522486,u[k]=h[k]^1549556828;if("SHA-1"===d)d=s(u.concat(s(r.concat(e),
a+f)),a+l);else throw"Unexpected error in HMAC implementation";return g(d,z(q))}}function v(a,d){var b=[],f,e=[],c=0,g;if("UTF8"===d)for(g=0;g<a.length;g+=1)for(f=a.charCodeAt(g),e=[],2048<f?(e[0]=224|(f&61440)>>>12,e[1]=128|(f&4032)>>>6,e[2]=128|f&63):128<f?(e[0]=192|(f&1984)>>>6,e[1]=128|f&63):e[0]=f,f=0;f<e.length;f+=1)b[c>>>2]|=e[f]<<24-c%4*8,c+=1;else if("UTF16"===d)for(g=0;g<a.length;g+=1)b[c>>>2]|=a.charCodeAt(g)<<16-c%4*8,c+=2;return{value:b,binLen:8*c}}function t(a){var d=[],b=a.length,f,
e;if(0!==b%2)throw"String of HEX type must be in byte increments";for(f=0;f<b;f+=2){e=parseInt(a.substr(f,2),16);if(isNaN(e))throw"String of HEX type contains invalid characters";d[f>>>3]|=e<<24-f%8*4}return{value:d,binLen:4*b}}function w(a){var d=[],b=0,f,e,c,g,p;if(-1===a.search(/^[a-zA-Z0-9=+\/]+$/))throw"Invalid character in base-64 string";f=a.indexOf("=");a=a.replace(/\=/g,"");if(-1!==f&&f<a.length)throw"Invalid '=' found in base-64 string";for(e=0;e<a.length;e+=4){p=a.substr(e,4);for(c=g=0;c<
p.length;c+=1)f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(p[c]),g|=f<<18-6*c;for(c=0;c<p.length-1;c+=1)d[b>>2]|=(g>>>16-8*c&255)<<24-b%4*8,b+=1}return{value:d,binLen:8*b}}function x(a,d){var b="",f=4*a.length,e,c;for(e=0;e<f;e+=1)c=a[e>>>2]>>>8*(3-e%4),b+="0123456789abcdef".charAt(c>>>4&15)+"0123456789abcdef".charAt(c&15);return d.outputUpper?b.toUpperCase():b}function y(a,d){var b="",f=4*a.length,e,c,g;for(e=0;e<f;e+=3)for(g=(a[e>>>2]>>>8*(3-e%4)&255)<<16|(a[e+1>>>
2]>>>8*(3-(e+1)%4)&255)<<8|a[e+2>>>2]>>>8*(3-(e+2)%4)&255,c=0;4>c;c+=1)b=8*e+6*c<=32*a.length?b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g>>>6*(3-c)&63):b+d.b64Pad;return b}function z(a){var d={outputUpper:!1,b64Pad:"="};try{a.hasOwnProperty("outputUpper")&&(d.outputUpper=a.outputUpper),a.hasOwnProperty("b64Pad")&&(d.b64Pad=a.b64Pad)}catch(b){}if("boolean"!==typeof d.outputUpper)throw"Invalid outputUpper formatting option";if("string"!==typeof d.b64Pad)throw"Invalid b64Pad formatting option";
return d}function B(a,d){return a<<d|a>>>32-d}function C(a,d,b){return a^d^b}function D(a,d,b){return a&d^~a&b}function E(a,d,b){return a&d^a&b^d&b}function F(a,d){var b=(a&65535)+(d&65535);return((a>>>16)+(d>>>16)+(b>>>16)&65535)<<16|b&65535}function G(a,d,b,f,e){var c=(a&65535)+(d&65535)+(b&65535)+(f&65535)+(e&65535);return((a>>>16)+(d>>>16)+(b>>>16)+(f>>>16)+(e>>>16)+(c>>>16)&65535)<<16|c&65535}function s(a,d){var b=[],f,e,c,g,p,q,s=D,t=C,v=E,h=B,k=F,m,l,r=G,u,n=[1732584193,4023233417,2562383102,
271733878,3285377520];a[d>>>5]|=128<<24-d%32;a[(d+65>>>9<<4)+15]=d;u=a.length;for(m=0;m<u;m+=16){f=n[0];e=n[1];c=n[2];g=n[3];p=n[4];for(l=0;80>l;l+=1)b[l]=16>l?a[l+m]:h(b[l-3]^b[l-8]^b[l-14]^b[l-16],1),q=20>l?r(h(f,5),s(e,c,g),p,1518500249,b[l]):40>l?r(h(f,5),t(e,c,g),p,1859775393,b[l]):60>l?r(h(f,5),v(e,c,g),p,2400959708,b[l]):r(h(f,5),t(e,c,g),p,3395469782,b[l]),p=g,g=c,c=h(e,30),e=f,f=q;n[0]=k(f,n[0]);n[1]=k(e,n[1]);n[2]=k(c,n[2]);n[3]=k(g,n[3]);n[4]=k(p,n[4])}return n}"function"===typeof define&&
typeof define.amd?define(function(){return q}):"undefined"!==typeof exports?"undefined"!==typeof module&&module.exports?module.exports=exports=q:exports=q:A.jsSHA=q})(this);

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

var hexcase=0,b64pad="=";function hex_md5(c){return rstr2hex(rstr_md5(str2rstr_utf8(c)))}function b64_md5(c){return rstr2b64(rstr_md5(str2rstr_utf8(c)))}function any_md5(c,g){return rstr2any(rstr_md5(str2rstr_utf8(c)),g)}function hex_hmac_md5(c,g){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(c),str2rstr_utf8(g)))}function b64_hmac_md5(c,g){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(c),str2rstr_utf8(g)))}
function any_hmac_md5(c,g,a){return rstr2any(rstr_hmac_md5(str2rstr_utf8(c),str2rstr_utf8(g)),a)}function md5_vm_test(){return"900150983cd24fb0d6963f7d28e17f72"==hex_md5("abc").toLowerCase()}function rstr_md5(c){return binl2rstr(binl_md5(rstr2binl(c),8*c.length))}
function rstr_hmac_md5(c,g){var a=rstr2binl(c);16<a.length&&(a=binl_md5(a,8*c.length));for(var b=Array(16),d=Array(16),e=0;16>e;e++)b[e]=a[e]^909522486,d[e]=a[e]^1549556828;a=binl_md5(b.concat(rstr2binl(g)),512+8*g.length);return binl2rstr(binl_md5(d.concat(a),640))}function rstr2hex(c){for(var g=hexcase?"0123456789ABCDEF":"0123456789abcdef",a="",b,d=0;d<c.length;d++)b=c.charCodeAt(d),a+=g.charAt(b>>>4&15)+g.charAt(b&15);return a}
function rstr2b64(c){for(var g="",a=c.length,b=0;b<a;b+=3)for(var d=c.charCodeAt(b)<<16|(b+1<a?c.charCodeAt(b+1)<<8:0)|(b+2<a?c.charCodeAt(b+2):0),e=0;4>e;e++)g=8*b+6*e>8*c.length?g+b64pad:g+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>>6*(3-e)&63);return g}
function rstr2any(c,g){var a=g.length,b,d,e,f,h,k=Array(Math.ceil(c.length/2));for(b=0;b<k.length;b++)k[b]=c.charCodeAt(2*b)<<8|c.charCodeAt(2*b+1);var m=Math.ceil(8*c.length/(Math.log(g.length)/Math.log(2))),l=Array(m);for(d=0;d<m;d++){h=[];for(b=f=0;b<k.length;b++)if(f=(f<<16)+k[b],e=Math.floor(f/a),f-=e*a,0<h.length||0<e)h[h.length]=e;l[d]=f;k=h}a="";for(b=l.length-1;0<=b;b--)a+=g.charAt(l[b]);return a}
function str2rstr_utf8(c){for(var g="",a=-1,b,d;++a<c.length;)b=c.charCodeAt(a),d=a+1<c.length?c.charCodeAt(a+1):0,55296<=b&&56319>=b&&56320<=d&&57343>=d&&(b=65536+((b&1023)<<10)+(d&1023),a++),127>=b?g+=String.fromCharCode(b):2047>=b?g+=String.fromCharCode(192|b>>>6&31,128|b&63):65535>=b?g+=String.fromCharCode(224|b>>>12&15,128|b>>>6&63,128|b&63):2097151>=b&&(g+=String.fromCharCode(240|b>>>18&7,128|b>>>12&63,128|b>>>6&63,128|b&63));return g}
function str2rstr_utf16le(c){for(var g="",a=0;a<c.length;a++)g+=String.fromCharCode(c.charCodeAt(a)&255,c.charCodeAt(a)>>>8&255);return g}function str2rstr_utf16be(c){for(var g="",a=0;a<c.length;a++)g+=String.fromCharCode(c.charCodeAt(a)>>>8&255,c.charCodeAt(a)&255);return g}function rstr2binl(c){for(var g=Array(c.length>>2),a=0;a<g.length;a++)g[a]=0;for(a=0;a<8*c.length;a+=8)g[a>>5]|=(c.charCodeAt(a/8)&255)<<a%32;return g}
function binl2rstr(c){for(var g="",a=0;a<32*c.length;a+=8)g+=String.fromCharCode(c[a>>5]>>>a%32&255);return g}
function binl_md5(c,g){c[g>>5]|=128<<g%32;c[(g+64>>>9<<4)+14]=g;for(var a=1732584193,b=-271733879,d=-1732584194,e=271733878,f=0;f<c.length;f+=16)var h=a,k=b,m=d,l=e,a=md5_ff(a,b,d,e,c[f+0],7,-680876936),e=md5_ff(e,a,b,d,c[f+1],12,-389564586),d=md5_ff(d,e,a,b,c[f+2],17,606105819),b=md5_ff(b,d,e,a,c[f+3],22,-1044525330),a=md5_ff(a,b,d,e,c[f+4],7,-176418897),e=md5_ff(e,a,b,d,c[f+5],12,1200080426),d=md5_ff(d,e,a,b,c[f+6],17,-1473231341),b=md5_ff(b,d,e,a,c[f+7],22,-45705983),a=md5_ff(a,b,d,e,c[f+8],7,
1770035416),e=md5_ff(e,a,b,d,c[f+9],12,-1958414417),d=md5_ff(d,e,a,b,c[f+10],17,-42063),b=md5_ff(b,d,e,a,c[f+11],22,-1990404162),a=md5_ff(a,b,d,e,c[f+12],7,1804603682),e=md5_ff(e,a,b,d,c[f+13],12,-40341101),d=md5_ff(d,e,a,b,c[f+14],17,-1502002290),b=md5_ff(b,d,e,a,c[f+15],22,1236535329),a=md5_gg(a,b,d,e,c[f+1],5,-165796510),e=md5_gg(e,a,b,d,c[f+6],9,-1069501632),d=md5_gg(d,e,a,b,c[f+11],14,643717713),b=md5_gg(b,d,e,a,c[f+0],20,-373897302),a=md5_gg(a,b,d,e,c[f+5],5,-701558691),e=md5_gg(e,a,b,d,c[f+
10],9,38016083),d=md5_gg(d,e,a,b,c[f+15],14,-660478335),b=md5_gg(b,d,e,a,c[f+4],20,-405537848),a=md5_gg(a,b,d,e,c[f+9],5,568446438),e=md5_gg(e,a,b,d,c[f+14],9,-1019803690),d=md5_gg(d,e,a,b,c[f+3],14,-187363961),b=md5_gg(b,d,e,a,c[f+8],20,1163531501),a=md5_gg(a,b,d,e,c[f+13],5,-1444681467),e=md5_gg(e,a,b,d,c[f+2],9,-51403784),d=md5_gg(d,e,a,b,c[f+7],14,1735328473),b=md5_gg(b,d,e,a,c[f+12],20,-1926607734),a=md5_hh(a,b,d,e,c[f+5],4,-378558),e=md5_hh(e,a,b,d,c[f+8],11,-2022574463),d=md5_hh(d,e,a,b,c[f+
11],16,1839030562),b=md5_hh(b,d,e,a,c[f+14],23,-35309556),a=md5_hh(a,b,d,e,c[f+1],4,-1530992060),e=md5_hh(e,a,b,d,c[f+4],11,1272893353),d=md5_hh(d,e,a,b,c[f+7],16,-155497632),b=md5_hh(b,d,e,a,c[f+10],23,-1094730640),a=md5_hh(a,b,d,e,c[f+13],4,681279174),e=md5_hh(e,a,b,d,c[f+0],11,-358537222),d=md5_hh(d,e,a,b,c[f+3],16,-722521979),b=md5_hh(b,d,e,a,c[f+6],23,76029189),a=md5_hh(a,b,d,e,c[f+9],4,-640364487),e=md5_hh(e,a,b,d,c[f+12],11,-421815835),d=md5_hh(d,e,a,b,c[f+15],16,530742520),b=md5_hh(b,d,e,
a,c[f+2],23,-995338651),a=md5_ii(a,b,d,e,c[f+0],6,-198630844),e=md5_ii(e,a,b,d,c[f+7],10,1126891415),d=md5_ii(d,e,a,b,c[f+14],15,-1416354905),b=md5_ii(b,d,e,a,c[f+5],21,-57434055),a=md5_ii(a,b,d,e,c[f+12],6,1700485571),e=md5_ii(e,a,b,d,c[f+3],10,-1894986606),d=md5_ii(d,e,a,b,c[f+10],15,-1051523),b=md5_ii(b,d,e,a,c[f+1],21,-2054922799),a=md5_ii(a,b,d,e,c[f+8],6,1873313359),e=md5_ii(e,a,b,d,c[f+15],10,-30611744),d=md5_ii(d,e,a,b,c[f+6],15,-1560198380),b=md5_ii(b,d,e,a,c[f+13],21,1309151649),a=md5_ii(a,
b,d,e,c[f+4],6,-145523070),e=md5_ii(e,a,b,d,c[f+11],10,-1120210379),d=md5_ii(d,e,a,b,c[f+2],15,718787259),b=md5_ii(b,d,e,a,c[f+9],21,-343485551),a=safe_add(a,h),b=safe_add(b,k),d=safe_add(d,m),e=safe_add(e,l);return[a,b,d,e]}function md5_cmn(c,g,a,b,d,e){return safe_add(bit_rol(safe_add(safe_add(g,c),safe_add(b,e)),d),a)}function md5_ff(c,g,a,b,d,e,f){return md5_cmn(g&a|~g&b,c,g,d,e,f)}function md5_gg(c,g,a,b,d,e,f){return md5_cmn(g&b|a&~b,c,g,d,e,f)}
function md5_hh(c,g,a,b,d,e,f){return md5_cmn(g^a^b,c,g,d,e,f)}function md5_ii(c,g,a,b,d,e,f){return md5_cmn(a^(g|~b),c,g,d,e,f)}function safe_add(c,g){var a=(c&65535)+(g&65535);return(c>>16)+(g>>16)+(a>>16)<<16|a&65535}function bit_rol(c,g){return c<<g|c>>>32-g};

/*********** DEPENDENCIES OVER ***************/

/** @constructor
 * Class: BBT
 * An object container for all Beebotte library functions.
 *
 * @param key_id Access key associated with your Beebotte account
 * @param options optional parameters for initializing beebotte
 *   {
 *     auth_endpoint: authentication endpoint
 *     auth_method: HTTP method (GET or POST) to be used for authentication purposes. Defaults to GET.
 *     server: URL to beebotte. default beebotte.com
 *     ssl: boolean - indicates whether ssl should be used. default false.
 *     username: string - assigns a friendly username
 *     cipher: cryptographic key for message data encryption. Defaults to no encryption.
 *   }
 */
BBT = function(key_id, options) {
  checkAppKey(key_id);
  this.key = key_id;
  options = options || {};

  this.initDefaults(); //Initialize default params
  this.updateParams(options);

  var self = this;

  this.instanceID = Math.floor(Math.random() * 1000000000);
  BBT.instances.push(this);

  this.connection = new BBT.Connection(this);

  if (options.auto_connect === true) {
    this.connect();
  }
  
}

/*** Constant Values ***/
BBT.VERSION  = '0.6.0'; //Version of this client library
BBT.PROTO    = 1; //Version of Beebotte Protocol
BBT.ws_host  = 'ws.beebotte.com';
BBT.api_host = 'api.beebotte.com';
BBT.host     = 'beebotte.com';
BBT.port     = 80;  //Port for clear text connections
BBT.sport    = 443; //Port for secure (TLS) connections

BBT.debug = false

BBT.types = {
    //Basic types
    BBT_Any: 'any',
    BBT_Number: 'number',
    BBT_String: 'string',
    BBT_Boolean: 'boolean',
    BBT_Object: 'object',
    BBT_Function: 'function',
    BBT_Array: 'array',
    //Constrained types
    BBT_Alpha: 'alphabetic',
    BBT_Alphanum: 'alphanumeric',
    BBT_Decimal: 'decimal',
    BBT_Rate: 'rate',
    BBT_Percentage: 'percentage',
    BBT_Email: 'email',
    BBT_GPS: 'gps',
    BBT_CPU: 'cpu',
    BBT_Memory: 'memory',
    //Unit types (all numeric - functional)
    BBT_Temp: 'temperature',
    BBT_Humidity: 'humidity',
    BBT_BodyTemp: 'body temperature'
};

BBT.AttributeTypesLabels = [
    //Basic types
    'any',
    'number',
    'string',
    'boolean',
    'object',
    'function',
    'array',
    //Constrained types
    'alphabetic',
    'alphanumeric',
    'decimal',
    'rate',
    'percentage',
    'email',
    'gps',
    'cpu',
    'memory',
    //Unit types (all numeric - functional)
    'temperature',
    'humidity',
    'body temperature'
];

BBT.instances = [];

BBT.prototype.initDefaults = function() {
  this.ws_host  = BBT.ws_host;
  this.api_host = BBT.api_host;
  this.host     = BBT.host;
  this.port     = BBT.port;
  this.sport    = BBT.sport;

  this.ssl = true;
  this.auth_endpoint = null;
  this.auth_method = 'get';
  this.cipher = null;
  this.userinfo = {};
}

BBT.prototype.updateParams = function(params) {
  if(params.auth_endpoint) this.auth_endpoint = params.auth_endpoint;
  if(params.auth_method) this.auth_method = params.auth_method.toLowerCase();
  if(params.userinfo) this.userinfo = params.userinfo;
  if(params.username) this.userinfo.username = params.username;
  if(params.host) this.host = params.host;
  if(params.ws_host) this.ws_host = params.ws_host;
  if(params.api_host) this.api_host = params.api_host;
  if(params.port) this.port = params.port;
  if(params.sport) this.sport = params.sport;
  if(params.ssl === false) this.ssl = params.ssl; //set to false
  if(params.on_connect) this.on_connect = params.on_connect;
  if(params.on_disconnect) this.on_disconnect = params.on_disconnect;

  if(params.cipher) this.cipher = params.cipher;
}

BBT.prototype.getWsUrl = function() {
  var p = (this.ssl === true)? this.sport : this.port;
  return ((this.ssl === true)? 'https://' : 'http://' ) + this.ws_host + ':' + p;
}

BBT.prototype.getApiUrl = function() {
  var p = (this.ssl === true)? this.sport : this.port;
  return ((this.ssl === true)? 'https://' : 'http://' ) + this.api_host + ':' + p;
}

/** @constructor */
BBT.Connection = function(bbt) {
  this.bbt = bbt;
  this.connection = null;
  this.channels = new BBT.Channels();

}

BBT.Connection.prototype.onConnection = function() {
  if (this.bbt.on_connect) {
    this.bbt.on_connect();
    return
  }
  for(c in this.channels.channels) {
    this.channels.channels[c].do_subscribe();
  }
}

BBT.Connection.prototype.onDisonnection = function() {
  BBT.warn("Connetion has been Dropped");

  if (this.bbt.on_disconnect) {
    this.bbt.on_disconnect();
    return
  }
}

BBT.Connection.prototype.connect = function () {
  if( this.connection && this.connection.connected ) return this;
  var self = this;
  var query =  'key=' + this.bbt.key + '&username=' + (self.bbt.userinfo.username || '');
  this.connection = io(self.bbt.getWsUrl(), {query: query});
  this.connection.on('connect', function () {
    self.onConnection();
  });

  this.connection.on('disconnect', function () {
    self.onDisonnection();
  });

  this.connection.on('message', function (msg) {
    if(msg.channel && msg.resource) {
      var Channel = self.channels.getAny(msg.channel, msg.resource);
      if(Channel) {
        Channel.fct(msg);
      }else {
        //console.log('Warning! non subscribed message: ' + JSON.stringify(msg));
      }
    } else {
      //console.log('Warning! non conform message: ' + JSON.stringify(msg));
    }
  });

  this.connection.connect();
  return this;
}

BBT.Connection.prototype.disconnect = function () {
  if(this.connection.connected) {
    this.connection.io.disconnect();
    this.connection.removeAllListeners();
  };
  return this;
}

//for internal use only
BBT.Connection.prototype.send_auth = function(sig, source) {
  var self = this;
  if(self.send('control', 'authenticate', {auth: sig.auth, source: source})) {
    this.authenticated = true;
    return true;
  }else {
    this.authenticated = false
    return false;
  }
}

BBT.Connection.prototype.subscribe = function(args, callback) {
  var Channel = this.channels.get(args.channel, args.resource);

  if(Channel) {
    Channel.update(args, callback);
  }else {
    Channel = new BBT.Channel(args, callback, this.bbt);
    this.channels.add(Channel);
    Channel.do_subscribe();
  }
}

BBT.Connection.prototype.unsubscribe = function(args) {
  var Channel = this.channels.get(args.channel, args.resource);
  if(Channel) {
    Channel.unsubscribe();
    this.channels.remove(Channel);
  }
  return true;
}

BBT.Connection.prototype.publish = function(args) {
  var Channel = this.channels.getChannelWithPermission(args.channel, args.resource, false, true);

  if(Channel && Channel.hasWritePermission()) {
    if(this.send('stream', 'emit', {channel: args.channel, resource: args.resource, data: args.data})) {
      return args.callback({code: 0});
    } else {
      return args.callback({code: 11, message: 'Error while publishing message!'});
    }
  }
  return args.callback({code: 11, message: 'Permission error: cant\'t publish on the given resource!'});
}

BBT.Connection.prototype.write = function(args) {
  var Channel = this.channels.getChannelWithPermission(args.channel, args.resource, false, true);

  if(Channel && Channel.hasWritePermission()) {
    if(this.send('stream', 'write', {channel: args.channel, resource: args.resource, data: args.data})) {
      return args.callback({code: 0});
    } else {
      return args.callback({code: 11, message: 'Error while writing message!'});
    }
  }
  return args.callback({code: 11, message: 'Permission error: cant\'t write on the given resource!'});
}

//For internal use only
BBT.Connection.prototype.send = function(cname, evt, data) {
  if(this.connection) {
    this.connection.json.send({version: BBT.PROTO, channel: cname, event: evt, data: data});
    return true;
  }else {
    return false;
  }
}

/** @constructor */
BBT.Channels = function() {
  this.channels = [];
}

BBT.Channels.prototype.all = function() {
  return this.channels;
}

BBT.Channels.prototype.add = function(channel) {
  this.channels[channel.eid] = channel;
}

BBT.Channels.prototype.remove = function(channel) {
  delete this.channels[channel.eid];
  channel = null;
}

BBT.Channels.prototype.get = function(channel, resource) {
  if(this.channels[channel + '.' + resource]) return this.channels[channel + '.' + resource];
  return null;
}

BBT.Channels.prototype.getAny = function(channel, resource) {
  if(this.channels[channel + '.' + resource]) return this.channels[channel + '.' + resource];
  else if(this.channels[channel + '.*']) return this.channels[channel + '.*'];
  return null;
}

BBT.Channels.prototype.getChannelWithPermission = function(channel, resource, read, write) {
  var Channel = null;
  var match = false;
  if(Channel = this.channels[channel + '.' + resource]) {
    match = true;
    if(read) match = Channel.hasReadPermission();
    if(write) match = Channel.hasWritePermission();
    if(match) return Channel;
  } else if (Channel = this.channels[channel + '.*']) {
    match = true;
    if(read) match = Channel.hasReadPermission();
    if(write) match = Channel.hasWritePermission();
    if(match) return Channel;
  }
  return null;
}

/** @constructor */
BBT.Channel = function(args, fct, bbt) {
  this.eid = args.channel + '.' + args.resource;
  this.channel = args.channel;
  this.resource = args.resource;
  this.bbt = bbt;
  this.fct = fct;
  this.subscribed = false;
  this.write = args.write || false;
  this.read = args.read || false;
  this.is_public = args.is_public || false;
  this.writePermission = false;
  this.readPermission = false;
  this.onError = args.onError;
  this.onSuccess = args.onSuccess;
}

BBT.Channel.prototype.update = function(args) {
  //set defaults
  args.read = (typeof args.read === 'undefined' ) ? true : args.read === true; //default true
  args.write = args.write === true; // default false

  if( args.read === this.read && args.write === this.write ) return; // skip same permissions
  // Permissions changed:
  this.subscribed = false;
  if( args.read ) {
    this.setReadPermission();
  } else {
    this.resetReadPermission();
  }

  if( args.write ) {
    this.setWritePermission();
  } else {
    this.resetWritePermission();
  }

  return this.do_subscribe();
}

//Authentication required for write access and for read access to private or presence resources
BBT.Channel.prototype.authNeeded = function() {
  if(!this.is_public) {
    if(this.write === true) return true;
    if(this.channel.indexOf('private-') === 0) return true;
    if(this.channel.indexOf('presence-') === 0) return true;
  }

  return false;
}

BBT.Channel.prototype.do_subscribe = function() {
  var self = this;
  if(!self.bbt.connection.connection.connected) {
    BBT.warn("Cannot subscribe as not connected");
    return;
  }
  
  var connection = this.bbt.connection;

  var args = {};
  args.channel = self.channel;
  args.resource = self.resource || '*';
  args.ttl = typeof args.ttl === 'number' ? args.ttl : 0
  args.read = self.read;
  args.write = self.write;
  if(typeof self.bbt.userinfo !== 'undefined') {
    args.userinfo = self.bbt.userinfo;
  }

  if(this.authNeeded()) {
    if( ! self.bbt.auth_endpoint ) return self.onError('Authentication error: Missing authentication endpoint!');
    if(connection.connection && connection.connection.connected && connection.connection.io.engine.id) {
      args.sid = connection.connection.io.engine.id;
      if(connection.bbt.auth_method === 'get') {
        $.getJSON( connection.bbt.auth_endpoint, args) 
        .done(function(data, status) {
          if(!data.auth) {
            return self.onError('Bad authentication reply');
          }
          args.sig = data.auth;
          if( data.userid ) args.userid = data.userid;
          if(connection.send('control', 'subscribe', args)) {
            self.subscribe();
            self.onSuccess('Successfully subscribed to ' + self.channel + '.' + self.resource);
            return true;
          }else {
            return false;
          }
        })
        .fail(function(XMLHttpRequest, textStatus, errorThrown) {
          return self.onError('Unable to authenticate client');
        });
      }else if (connection.bbt.auth_method === 'post') {
        $.post( connection.bbt.auth_endpoint, args )
        .success(function( data ) {
          if(!data.auth) return self.onError('Bad authentication reply');
          args.sig = data.auth;
          if( data.userid ) args.userid = data.userid;
          if(connection.send('control', 'subscribe', args)) {
            self.subscribe();
            self.onSuccess('Successfully subscribed to ' + self.channel + '.' + self.resource);
            return true;
          }else {
            return false;
          }
        })
        .error(function(XMLHttpRequest, textStatus, errorThrown) {
          return self.onError('Unable to authenticate client');
        });
      }else if (connection.bbt.auth_method === 'fct') {
        sig = connection.bbt.auth_endpoint(args.sid, args.channel, args.resource, args.ttl, args.read, args.write);
        if( !sig ) return self.onError('Unable to authenticate client');
        args.sig = sig.auth;
        if( sig.userid ) args.userid = sig.userid;
        if(connection.send('control', 'subscribe', args)) {
          self.subscribe();
          self.onSuccess('Successfully subscribed to ' + self.channel + '.' + self.resource);
          return true;
        }else {
          return false;
        }
      }else {
        return self.onError('Unsupported authentication method!');
      }
    } else {
      return self.onError('Connection error encountered');
    }
  } else {
    if(connection.send('control', 'subscribe', args)) {
      self.subscribe();
      self.onSuccess('Successfully subscribed to ' + self.channel + '.' + self.resource);
      return true;
    }else {
      return false;
    }
  }
}

BBT.Channel.prototype.setReadPermission = function(){
  this.readPermission = true;
  this.read = true;
}

BBT.Channel.prototype.setWritePermission = function(){
  this.writePermission = true;
  this.write = true;
}

BBT.Channel.prototype.resetReadPermission = function(){
  this.readPermission = false;
  this.read = false;
}

BBT.Channel.prototype.resetWritePermission = function(){
  this.writePermission = false;
  this.write = false;
}

//Turns on the subscribed status of this channel with the given permissions
BBT.Channel.prototype.subscribe = function(){
  this.subscribed = true;
  if(this.read === true) this.setReadPermission();
  if(this.write === true) this.setWritePermission();
}

//Unsubscribes from the channel! this revoques any permission granted to the channel
BBT.Channel.prototype.unsubscribe = function() {
  this.subscribed = false;
  this.resetReadPermission();
  this.resetWritePermission();
  var connection = this.bbt.connection;
  return connection.send('control', 'unsubscribe', {channel: this.channel, resource: this.resource });
}

//Returns true if the channel has write permission
BBT.Channel.prototype.hasWritePermission = function() {
  return this.writePermission;
}

//Returns true if the channel has read permission
BBT.Channel.prototype.hasReadPermission = function() {
  return this.readPermission;
}

function checkAppKey(key) {
  if (key === null || key === undefined || key === "") {
    BBT.warn(
      'Warning: You must pass your key id when you instantiate BBT.'
    );
  }
}

BBT.warn = function(message) {
  if (window.console) {
    if (window.console.warn) {
      window.console.warn(message);
    } else if (window.console.log) {
      window.console.log(message);
    }
  }
  if (BBT.log) {
    BBT.log(message);
  }
};

BBT.error = function(err) {
  if (BBT.debug) {
    throw err;
  } else {
    BBT.warn(err)
  }
}

/**
 * Sets the friendly username associated with this connection
 **/
BBT.prototype.setUsername = function(username) {
  this.userinfo.username = username;
}

/**
 * Connects this instance to the Beebotte platform if it is not connected. This method will be automatically called when creating a new instance of BBT.
 */
BBT.prototype.connect = function() {
  this.connection.connect();
}

/**
 * Disconnets this beebotte instance. This will disconnect the websocket connection with beebotte servers.
 */
BBT.prototype.disconnect = function() {
  this.connection.disconnect();
}

/**
 * Sends a transient message to Beebotte. This method require prior 'write' permission on the specified resource (see BBT.grant method).
 *
 * @param {Object} args: {
 *   {string, required} channel name of the channel. It can be prefixed with 'private-' to indicate a private resource.
 *   {string, required} resource name of the resource.
 *   {Object, optional} data data message to publish to Bebotte.
 * }
 * @param {Object optional} data data message to publish to Beebotte. If args.data is present, it will override this parameter.
 */
BBT.prototype.publish = function(args, data) {
  var vargs = {};
  vargs.channel = args.channel;
  vargs.resource = args.resource;
  vargs.data = args.data != null ? args.data : data
  vargs.callback = args.callback || function() {};

  if(!vargs.channel) return BBT.error('channel not specified');
  if(!vargs.resource) return BBT.error('resource not specified');
  if(!(typeof vargs.channel === 'string')) return BBT.error('Invalid format: channel must be a string');
  if(!(typeof vargs.resource === 'string')) return BBT.error('Invalid format: resource must be a string');
  if(vargs.data === null || vargs.data === undefined) return BBT.error('Data message not specified');

  return this.connection.publish(vargs);
}

/**
 * Sends a presistent message to Beebotte. This method require prior 'write' permission on the specified resource (see BBT.grant method).
 * A resource with the specified parameters must exist for this method to succeed. In addition, the message will inherit the access level of the channel.
 * As the access level is specified by the existing channel parameters, it is not necessary to add the 'private-' prefix.
 *
 * @param {Object} args: {
 *   {string, required} channel name of the channel. It can be prefixed with 'private-' to indicate a private resource.
 *   {string, required} resource name of the resource.
 *   {Object, optional} data data message to write to Bebotte.
 * }
 * @param {Object optional} data data message to write to Beebotte. If args.data is present, it will override this parameter.
 */
BBT.prototype.write = function(args, data) {
  var vargs = {};
  vargs.channel = args.channel;
  vargs.resource = args.resource;
  vargs.data = args.data != null ? args.data : data;
  vargs.callback = args.callback || function() {};

  if(!vargs.channel) return BBT.error('channel not specified');
  if(!vargs.resource) return BBT.error('resource not specified');
  if(vargs.data === null || vargs.data === undefined) return BBT.error('Data message not specified');
  if(!(typeof vargs.channel === 'string')) return BBT.error('Invalid format: channel must be a string');
  if(!(typeof vargs.resource === 'string')) return BBT.error('Invalid format: resource must be a string');

  return this.connection.write(vargs);
}

/**
 * Adds a callback listener to the specified resource that will called whenever a message associated with the same resource is published. If the 'channel' parameter is prefixed by 'private-' or 'presence-', this method will automatically trigger the authentication mechanism.
 *
 * @param {Object} args: {
 *   {string, required} channel name of the channel. It can be prefixed with 'private-' to indicate a private resource, or it can be prefixed with 'presence-' to indicate presence events.
 *   {string, optional} resource name of the resource.
 *   {number, optional} ttl time in milliseconds during which the subscription will be active.
 *   {boolean, optional} read will be ignored. Considered always as true.
 *   {boolean, optional} write write permission requested along the subscription. This gives the possibility to publish or write messages to the specified resource. Defaults to false.
 * }
 * @param callback function to be called when a message is received.
 * @return true on success false on failure
 */
BBT.prototype.subscribe = function(args, callback) {
  var vargs = {};
  var cbk = callback || args.callback;
  vargs.channel = args.channel;
  vargs.resource = args.resource || '*';
  vargs.ttl = typeof args.ttl === 'number' ? args.ttl : 0;
  vargs.read = (typeof args.read === 'undefined' ) ? true : args.read === true; //default true
  vargs.write = args.write === true; // default false
  vargs.onError = args.onError || BBT.warn;
  vargs.onSuccess = args.onSuccess || function(msg) {console.log(msg);};
  vargs.is_public = args.is_public || false;
  var onError = vargs.onError;

  if(!vargs.channel) return onError('channel not specified');
  if(!(typeof vargs.channel === 'string')) return onError('Invalid format: channel must be a string');
  if(!(typeof vargs.resource === 'string')) return onError('Invalid format: resource must be a string');
  if(!(typeof vargs.ttl === 'number')) return onError('Invalid format: ttl must be a number');
  if(!(typeof vargs.read === 'boolean')) return onError('Invalid format: read element must be boolean');
  if(!(typeof vargs.write === 'boolean')) return onError('Invalid format: write element must be boolean');
  if(vargs.read && !cbk) return onError('Callback not specified. The callback parameter is mandatory for read operations');

  return this.connection.subscribe(vargs, cbk);
}

/**
 * Stops listenning to messages from the specified resource.
 *
 * @param {Object} args: {
 *   {string} channel name of the channel. It can be prefixed with 'private-' to indicate a private resource, or it can be prefixed with 'presence-' to indicate presence events.
 *   {string} resource name of the resource.
 * }
 * @return true on success false on failure
 */
BBT.prototype.unsubscribe = function(args) {
  var vargs = {};
  vargs.channel = args.channel;
  vargs.resource = args.resource || '*';
  vargs.onError = args.onError || BBT.warn;
  vargs.onSuccess = args.onSuccess || function(msg) {console.log(msg);};

  if(!vargs.channel) return vargs.onError('channel not specified');
  if(!(typeof vargs.channel === 'string')) return vargs.onError('Invalid format: channel must be a string');
  if(!(typeof vargs.resource === 'string')) return vargs.onError('Invalid format: resource must be a string');

  return this.connection.unsubscribe(vargs);
}

/**
 * Sends a REST read request to Beebotte. This is a convenient API call to access the history of public persistent resources.
 *
 * @param {Object} args: {
 *   {string, required} owner username of the channel owner.
 *   {string, required} channel name of the channel.
 *   {string, required} resource name of the resource.
 *   {function, optional} callback function to be called with the response data
 * @param callback function to be called with the response data. args.callback element will override this parameter if it is present.
 * }
 */
BBT.prototype.read = function(args, callback) {
  var limit = args.limit || 1;
  if(!args.owner) return BBT.error('Owner not specified');
  if(!args.channel) return BBT.error('channel not specified');
  if(!args.resource) return BBT.error('resource not specified');
  if(!(typeof args.owner === 'string')) return BBT.error('Invalid format: owner must be a string');
  if(!(typeof args.channel === 'string')) return BBT.error('Invalid format: channel must be a string');
  if(!(typeof args.resource === 'string')) return BBT.error('Invalid format: resource must be a string');
  if(!(typeof limit === 'number')) return BBT.error('Invalid format: limit must be a number');

  var cbk = args.callback || callback;

  if(!cbk) return BBT.error('Callback function not specified');

    $.get(this.getApiUrl() + '/v1/public/data/read/' + args.owner +'/'+ args.channel +'/' + args.resource, { limit: limit })
    .success(function( data ) {
      if( cbk )
        cbk(null, data);
    })
    .error(function(XMLHttpRequest, textStatus, errorThrown) {
      if( cbk )
        cbk ( {code: 11, message: 'Error'}, null );
    });
}

/** @constructor */
BBT.Connector = function(options) {
    this.keyId = null;
    this.secretKey = null;
    this.port = null;
    this.hostname = null;
    this.protocol = null;

    if (options.keyId && options.secretKey) {
        this.keyId = options.keyId;
        this.secretKey = options.secretKey;
    }else {
        throw new Error('(BBT.Connector) Parameter Error: You must provide your API access key and secret key!');
    }

    this.protocol = options.protocol || 'https'; //Defaults to HTTPs
    if(this.protocol.toLowerCase() !== 'http' && this.protocol.toLowerCase() !== 'https') throw new Error('Unsupported protocol ' + this.protocol);
    this.hostname = options.hostname || 'api.beebotte.com';
    if(this.protocol.toLowerCase() === 'http') this.port = 80; else this.port = 443;
    if(options.port) this.port = options.port;

    this.sign = function(toSign) {
        var shaObj = new jsSHA(toSign, "TEXT");
        var hmac = shaObj.getHMAC(this.secretKey, "TEXT", "SHA-1", "B64");
        return (this.keyId + ':' + hmac);
    }

    this.signRequest = function(http_verb, content_md5, content_type, date, uri) {
      http_verb = http_verb.toUpperCase();

      //content MD5 is mandatory for Post/Put requests
      if((http_verb == 'POST' || http_verb == 'PUT') && (content_md5 == '') ) throw new Error('(BBT.Connector.signRequest) Content-MD5 header required for POST and PUT methods');

      var stringToSign = http_verb + '\n' + content_md5 + '\n' + content_type + '\n' + date + '\n' + uri;

      return this.sign(stringToSign);
    }

    this.getUriToSign = function (method, uri, data) {
      if( method === 'POST' || method === 'PUT' ) return uri;
      return (uri + (data? ('?' + jQuery.param( data )) : ''));
    };

    this.sendRequest = function(options, callback) {
      var self = this;
      options.method = options.method.toUpperCase();
      var date = new Date().toUTCString();
      var contentType = "application/json; charset=UTF-8";
      var md5 = '';
      if( options.method === 'POST' || options.method === 'PUT' ) md5 = b64_md5(options.data);
      var beforeSend = function(xhr) {};
      if( options.is_public !== true ) {
        beforeSend = function(xhr) {
          if( md5 ) {xhr.setRequestHeader('Content-MD5', md5);}
          xhr.setRequestHeader("Authorization", self.signRequest(options.method, md5, contentType, '', self.getUriToSign(options.method, options.uri, options.data)));
          //xhr.setRequestHeader("Authorization", "lelelele");
          xhr.setRequestHeader('X-Bbt-Date', new Date().toUTCString());
        }
      }

      $.ajax({
        url: this.protocol + '://' + this.hostname + ':' + this.port.toString() + options.uri,
        type: options.method,
        dataType : 'json',
        data: options.data,
        contentType: contentType,
        beforeSend : beforeSend,
        success: function(body) {
          callback(null, body)
        },
        error: function(body) {
          callback(body, body)
        }
      });
    }
}

//{channel, resource, type}
BBT.Connector.prototype.readPublicResource = function(params, callback) {
  var self = this;
  var query_opts = { limit: (params.limit || 750) };
  if( params.source ) query_opts.source = params.source;
  if( params['time-range'] ) query_opts['time-range'] = params['time-range'];
  if( params['start-time'] ) query_opts['start-time'] = params['start-time'];
  if( params['end-time'] ) query_opts['end-time'] = params['end-time'];
  if( params['filter'] ) query_opts['filter'] = params['filter'];
  if( params['sample-rate'] ) query_opts['sample-rate'] = params['sample-rate'];

  options = {
    uri: '/v1/public/data/read/' + params.owner + '/' + params.channel + '/' + params.resource,
    data: query_opts,
    method: 'GET',
    is_public: true
  }

  return this.sendRequest(options, callback);
}

//{channel, resource, type}
BBT.Connector.prototype.readResource = function(params, callback) {
  var self = this;
  var query_opts = { limit: (params.limit || 750) };
  if( params.source ) query_opts.source = params.source;
  if( params['time-range'] ) query_opts['time-range'] = params['time-range'];
  if( params['start-time'] ) query_opts['start-time'] = params['start-time'];
  if( params['end-time'] ) query_opts['end-time'] = params['end-time'];
  if( params['filter'] ) query_opts['filter'] = params['filter'];
  if( params['sample-rate'] ) query_opts['sample-rate'] = params['sample-rate'];

  options = {
    uri: '/v1/data/read/' + params.channel + '/' + params.resource,
    data: query_opts,
    method: 'GET',
    is_public: false
  }

  return this.sendRequest(options, callback);
}

//{channel, resource, type, data}
BBT.Connector.prototype.writeResource = function(params, callback) {
  var self = this;
  var body = {data: params.data};
  if( params.ts ) body.ts = params.ts;
  var bodystr = JSON.stringify(body);
  options = {
    uri: '/v1/data/write/' + params.channel + '/' + params.resource,
    data: bodystr,
    method: 'POST',
    is_public: false
  }

  return this.sendRequest(options, callback);
}

//{channel, resource, type, data}
BBT.Connector.prototype.writeBulk = function(params, callback) {
  var self = this;
  var bodystr = JSON.stringify({records: params.records});
  options = {
    uri: '/v1/data/write/' + params.channel,
    data: bodystr,
    method: 'POST',
    is_public: false
  }

  return this.sendRequest(options, callback);
}

BBT.Connector.prototype.publish = function(params, callback) {
  var self = this;
  var body = {data: params.data};
  if( params.ts ) body.ts = params.ts;
  if( params.source ) body.source = params.source;
  var bodystr = JSON.stringify(body);
  options = {
    uri: '/v1/data/publish/' + params.channel + '/' + params.resource + '?' + (params['private']? 'private=true' : 'private=false'),
    data: bodystr,
    method: 'POST',
    is_public: false
  }

  return this.sendRequest(options, callback);
}

//{channel, resource, type, data}
BBT.Connector.prototype.publishBulk = function(params, callback) {
  var self = this;
  var bodystr = JSON.stringify({records: params.records});
  options = {
    uri: '/v1/data/publish/' + params.channel + '?' + (params['private']? 'private=true' : 'private=false'),
    data: bodystr,
    method: 'POST',
    is_public: false
  }

  return this.sendRequest(options, callback);
}

BBT.Connector.prototype.auth = function( sid, channel, resource, ttl, read, write ) {
  resource = resource || '*'
  ttl = typeof ttl === 'number' ? ttl : 0
  read = typeof read === 'undefined' ? true : read === true; //default true
  write = write === true; //default false
  sid = sid;
  if( !sid || !channel ) return null;

  var to_sign = sid + ':' + channel + '.' + resource + ':ttl=' + ttl + ':read=' + read + ':write=' + write;
  return {auth: this.sign(to_sign)};
}
