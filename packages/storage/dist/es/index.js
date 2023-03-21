var S = Object.defineProperty;
var n = (s, e, t) => e in s ? S(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var r = (s, e, t) => (n(s, typeof e != "symbol" ? e + "" : e, t), t);
class d {
  constructor(e, t) {
    r(this, "prefix", "ILLA_STORAGE@0.0.1");
    r(this, "defaultExpire", 5);
    r(this, "setStorage", (e, t, i, o = -1) => {
      (i == "" || i == null) && (i = null), isNaN(o) && (o = this.defaultExpire);
      let g = {
        value: i,
        time: Date.now(),
        expire: o
      };
      try {
        const a = JSON.stringify(g);
        window[e].setItem(this.autoAddPrefix(t), a);
      } catch (a) {
        console.error(`[ILLA_STORAGE] setStorage error: ${a}`);
      }
    });
    r(this, "getStorage", (e, t) => {
      const i = this.autoAddPrefix(t);
      if (!window[e].getItem(i))
        return;
      let o;
      try {
        const a = window[e].getItem(i);
        if (a == null)
          return;
        o = JSON.parse(a);
      } catch (a) {
        console.error(`[ILLA_STORAGE] getStorage error: ${a}`);
        return;
      }
      let g = Date.now();
      if (o != null)
        if (o.expire > -1 && o.expire * 60 * 1e3 < g - o.time) {
          this.removeStorage(e, t);
          return;
        } else
          return this.setStorage(e, t, o.value, o.expire), o.value;
    });
    r(this, "clearStorage", (e) => {
      window[e].clear();
    });
    r(this, "removeStorage", (e, t) => {
      window[e].removeItem(this.autoAddPrefix(t));
    });
    r(this, "setLocalStorage", (e, t, i) => {
      this.setStorage("localStorage", e, t, i);
    });
    r(this, "getLocalStorage", (e) => this.getStorage("localStorage", e));
    r(this, "clearLocalStorage", () => {
      this.clearStorage("localStorage");
    });
    r(this, "removeLocalStorage", (e) => {
      this.removeStorage("localStorage", e);
    });
    r(this, "setSessionStorage", (e, t, i) => {
      this.setStorage("sessionStorage", e, t, i);
    });
    r(this, "getSessionStorage", (e) => this.getStorage("sessionStorage", e));
    r(this, "clearSessionStorage", () => {
      this.clearStorage("sessionStorage");
    });
    r(this, "removeSessionStorage", (e) => {
      this.removeStorage("sessionStorage", e);
    });
    e != null && (this.prefix = e), t != null && (this.defaultExpire = t);
  }
  autoAddPrefix(e) {
    return `${this.prefix}/${e}`;
  }
}
export {
  d as default
};
//# sourceMappingURL=index.js.map
