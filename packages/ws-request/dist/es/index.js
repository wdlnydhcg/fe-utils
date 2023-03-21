var n = Object.defineProperty;
var c = (s, t, e) => t in s ? n(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var i = (s, t, e) => (c(s, typeof t != "symbol" ? t + "" : t, e), e);
const h = JSON.stringify({
  signal: 0,
  option: 0,
  target: 0,
  payload: [],
  broadcast: null
});
class l {
  constructor(t) {
    i(this, "ws", null);
    i(this, "url");
    i(this, "options", {
      repeat: 0,
      lockReconnect: !1,
      forbidReconnect: !1,
      pingTimeoutId: -1,
      pongTimeoutId: -1,
      isOnline: !0
    });
    this.url = t;
  }
  createWebsocket() {
    try {
      this.ws = new WebSocket(this.url), this.initEventHandle();
    } catch (t) {
      throw this.reconnect(), t;
    }
  }
  initEventHandle() {
    this.ws && (this.ws.onclose = () => {
      this.reconnect();
    }, this.ws.onerror = () => {
      this.reconnect();
    }, this.ws.onopen = () => {
      console.log(`[WS OPENED](${this.url}) connection succeeded`), this.options.isOnline = !0, this.options.repeat = 0, this.heartCheck(), this.onOpenCallback();
    }, this.ws.onmessage = (t) => {
      this.onMessageCallback(t), this.heartCheck();
    });
  }
  reconnect() {
    this.options.forbidReconnect || (this.options.isOnline && (this.options.isOnline = !1, this.onOnlineChangeCallback(this.options.isOnline)), !(5 <= this.options.repeat) && (this.options.lockReconnect || (this.options.lockReconnect = !0, this.options.repeat++, setTimeout(() => {
      this.createWebsocket(), this.options.lockReconnect = !1;
    }, 5e3))));
  }
  heartCheck() {
    this.heartReset(), this.heartStart();
  }
  heartStart() {
    this.options.forbidReconnect || (this.options.pingTimeoutId = window.setTimeout(() => {
      var t;
      (t = this.ws) == null || t.send(h), this.options.pongTimeoutId = window.setTimeout(() => {
        var e;
        this.options.isOnline && (this.options.isOnline = !1, this.onOnlineChangeCallback(this.options.isOnline)), (e = this.ws) == null || e.close();
      }, 5e3);
    }, 2e3));
  }
  heartReset() {
    clearTimeout(this.options.pingTimeoutId), clearTimeout(this.options.pongTimeoutId);
  }
  close() {
    var t;
    this.options.forbidReconnect = !0, this.heartReset(), (t = this.ws) == null || t.close();
  }
  send(t) {
    var e;
    try {
      (e = this.ws) == null || e.send(t);
    } catch (o) {
      console.error(o);
    }
  }
}
export {
  l as default
};
//# sourceMappingURL=index.js.map
