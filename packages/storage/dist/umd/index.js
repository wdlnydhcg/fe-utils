(function(s,r){typeof exports=="object"&&typeof module<"u"?module.exports=r():typeof define=="function"&&define.amd?define(r):(s=typeof globalThis<"u"?globalThis:s||self,s["@horloge/storage"]=r())})(this,function(){"use strict";var S=Object.defineProperty;var d=(s,r,e)=>r in s?S(s,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[r]=e;var t=(s,r,e)=>(d(s,typeof r!="symbol"?r+"":r,e),e);class s{constructor(e,o){t(this,"prefix","ILLA_STORAGE@0.0.1");t(this,"defaultExpire",5);t(this,"setStorage",(e,o,a,i=-1)=>{(a==""||a==null)&&(a=null),isNaN(i)&&(i=this.defaultExpire);let g={value:a,time:Date.now(),expire:i};try{const n=JSON.stringify(g);window[e].setItem(this.autoAddPrefix(o),n)}catch(n){console.error(`[ILLA_STORAGE] setStorage error: ${n}`)}});t(this,"getStorage",(e,o)=>{const a=this.autoAddPrefix(o);if(!window[e].getItem(a))return;let i;try{const n=window[e].getItem(a);if(n==null)return;i=JSON.parse(n)}catch(n){console.error(`[ILLA_STORAGE] getStorage error: ${n}`);return}let g=Date.now();if(i!=null)if(i.expire>-1&&i.expire*60*1e3<g-i.time){this.removeStorage(e,o);return}else return this.setStorage(e,o,i.value,i.expire),i.value});t(this,"clearStorage",e=>{window[e].clear()});t(this,"removeStorage",(e,o)=>{window[e].removeItem(this.autoAddPrefix(o))});t(this,"setLocalStorage",(e,o,a)=>{this.setStorage("localStorage",e,o,a)});t(this,"getLocalStorage",e=>this.getStorage("localStorage",e));t(this,"clearLocalStorage",()=>{this.clearStorage("localStorage")});t(this,"removeLocalStorage",e=>{this.removeStorage("localStorage",e)});t(this,"setSessionStorage",(e,o,a)=>{this.setStorage("sessionStorage",e,o,a)});t(this,"getSessionStorage",e=>this.getStorage("sessionStorage",e));t(this,"clearSessionStorage",()=>{this.clearStorage("sessionStorage")});t(this,"removeSessionStorage",e=>{this.removeStorage("sessionStorage",e)});e!=null&&(this.prefix=e),o!=null&&(this.defaultExpire=o)}autoAddPrefix(e){return`${this.prefix}/${e}`}}return s});
//# sourceMappingURL=index.js.map
