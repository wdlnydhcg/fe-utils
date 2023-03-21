(function(s,e){typeof exports=="object"&&typeof module<"u"?module.exports=e():typeof define=="function"&&define.amd?define(e):(s=typeof globalThis<"u"?globalThis:s||self,s["@horloge/ws-request"]=e())})(this,function(){"use strict";var l=Object.defineProperty;var a=(s,e,i)=>e in s?l(s,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[e]=i;var o=(s,e,i)=>(a(s,typeof e!="symbol"?e+"":e,i),i);const c=JSON.stringify({signal:0,option:0,target:0,payload:[],broadcast:null});class h{constructor(t){o(this,"ws",null);o(this,"url");o(this,"options",{repeat:0,lockReconnect:!1,forbidReconnect:!1,pingTimeoutId:-1,pongTimeoutId:-1,isOnline:!0});this.url=t}createWebsocket(){try{this.ws=new WebSocket(this.url),this.initEventHandle()}catch(t){throw this.reconnect(),t}}initEventHandle(){this.ws&&(this.ws.onclose=()=>{this.reconnect()},this.ws.onerror=()=>{this.reconnect()},this.ws.onopen=()=>{console.log(`[WS OPENED](${this.url}) connection succeeded`),this.options.isOnline=!0,this.options.repeat=0,this.heartCheck(),this.onOpenCallback()},this.ws.onmessage=t=>{this.onMessageCallback(t),this.heartCheck()})}reconnect(){this.options.forbidReconnect||(this.options.isOnline&&(this.options.isOnline=!1,this.onOnlineChangeCallback(this.options.isOnline)),!(5<=this.options.repeat)&&(this.options.lockReconnect||(this.options.lockReconnect=!0,this.options.repeat++,setTimeout(()=>{this.createWebsocket(),this.options.lockReconnect=!1},5e3))))}heartCheck(){this.heartReset(),this.heartStart()}heartStart(){this.options.forbidReconnect||(this.options.pingTimeoutId=window.setTimeout(()=>{var t;(t=this.ws)==null||t.send(c),this.options.pongTimeoutId=window.setTimeout(()=>{var n;this.options.isOnline&&(this.options.isOnline=!1,this.onOnlineChangeCallback(this.options.isOnline)),(n=this.ws)==null||n.close()},5e3)},2e3))}heartReset(){clearTimeout(this.options.pingTimeoutId),clearTimeout(this.options.pongTimeoutId)}close(){var t;this.options.forbidReconnect=!0,this.heartReset(),(t=this.ws)==null||t.close()}send(t){var n;try{(n=this.ws)==null||n.send(t)}catch(r){console.error(r)}}}return h});
//# sourceMappingURL=index.js.map