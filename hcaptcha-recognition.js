"use strict";
(() => {
  var Ae = Object.create;
  var oe = Object.defineProperty;
  var Fe = Object.getOwnPropertyDescriptor;
  var He = Object.getOwnPropertyNames;
  var qe = Object.getPrototypeOf,
    De = Object.prototype.hasOwnProperty;
  var re = (e, t) => () => (t || e((t = {
    exports: {}
  }).exports, t), t.exports);
  var je = (e, t, n, o) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let r of He(t)) !De.call(e, r) && r !== n && oe(e, r, {
        get: () => t[r],
        enumerable: !(o = Fe(t, r)) || o.enumerable
      });
    return e
  };
  var se = (e, t, n) => (n = e != null ? Ae(qe(e)) : {}, je(t || !e || !e.__esModule ? oe(n, "default", {
    value: e,
    enumerable: !0
  }) : n, e));
  var ge = re((xt, q) => {
    "use strict";
    var x = typeof Reflect == "object" ? Reflect : null,
      ae = x && typeof x.apply == "function" ? x.apply : function(t, n, o) {
        return Function.prototype.apply.call(t, n, o)
      },
      S;
    x && typeof x.ownKeys == "function" ? S = x.ownKeys : Object.getOwnPropertySymbols ? S = function(t) {
      return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
    } : S = function(t) {
      return Object.getOwnPropertyNames(t)
    };

    function Be(e) {
      console && console.warn && console.warn(e)
    }
    var ce = Number.isNaN || function(t) {
      return t !== t
    };

    function l() {
      l.init.call(this)
    }
    q.exports = l;
    q.exports.once = We;
    l.EventEmitter = l;
    l.prototype._events = void 0;
    l.prototype._eventsCount = 0;
    l.prototype._maxListeners = void 0;
    var ie = 10;

    function _(e) {
      if (typeof e != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
    }
    Object.defineProperty(l, "defaultMaxListeners", {
      enumerable: !0,
      get: function() {
        return ie
      },
      set: function(e) {
        if (typeof e != "number" || e < 0 || ce(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
        ie = e
      }
    });
    l.init = function() {
      (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    };
    l.prototype.setMaxListeners = function(t) {
      if (typeof t != "number" || t < 0 || ce(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
      return this._maxListeners = t, this
    };

    function le(e) {
      return e._maxListeners === void 0 ? l.defaultMaxListeners : e._maxListeners
    }
    l.prototype.getMaxListeners = function() {
      return le(this)
    };
    l.prototype.emit = function(t) {
      for (var n = [], o = 1; o < arguments.length; o++) n.push(arguments[o]);
      var r = t === "error",
        a = this._events;
      if (a !== void 0) r = r && a.error === void 0;
      else if (!r) return !1;
      if (r) {
        var s;
        if (n.length > 0 && (s = n[0]), s instanceof Error) throw s;
        var i = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
        throw i.context = s, i
      }
      var c = a[t];
      if (c === void 0) return !1;
      if (typeof c == "function") ae(c, this, n);
      else
        for (var u = c.length, f = me(c, u), o = 0; o < u; ++o) ae(f[o], this, n);
      return !0
    };

    function ue(e, t, n, o) {
      var r, a, s;
      if (_(n), a = e._events, a === void 0 ? (a = e._events = Object.create(null), e._eventsCount = 0) : (a.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), a = e._events), s = a[t]), s === void 0) s = a[t] = n, ++e._eventsCount;
      else if (typeof s == "function" ? s = a[t] = o ? [n, s] : [s, n] : o ? s.unshift(n) : s.push(n), r = le(e), r > 0 && s.length > r && !s.warned) {
        s.warned = !0;
        var i = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        i.name = "MaxListenersExceededWarning", i.emitter = e, i.type = t, i.count = s.length, Be(i)
      }
      return e
    }
    l.prototype.addListener = function(t, n) {
      return ue(this, t, n, !1)
    };
    l.prototype.on = l.prototype.addListener;
    l.prototype.prependListener = function(t, n) {
      return ue(this, t, n, !0)
    };

    function Ne() {
      if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }

    function fe(e, t, n) {
      var o = {
          fired: !1,
          wrapFn: void 0,
          target: e,
          type: t,
          listener: n
        },
        r = Ne.bind(o);
      return r.listener = n, o.wrapFn = r, r
    }
    l.prototype.once = function(t, n) {
      return _(n), this.on(t, fe(this, t, n)), this
    };
    l.prototype.prependOnceListener = function(t, n) {
      return _(n), this.prependListener(t, fe(this, t, n)), this
    };
    l.prototype.removeListener = function(t, n) {
      var o, r, a, s, i;
      if (_(n), r = this._events, r === void 0) return this;
      if (o = r[t], o === void 0) return this;
      if (o === n || o.listener === n) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete r[t], r.removeListener && this.emit("removeListener", t, o.listener || n));
      else if (typeof o != "function") {
        for (a = -1, s = o.length - 1; s >= 0; s--)
          if (o[s] === n || o[s].listener === n) {
            i = o[s].listener, a = s;
            break
          } if (a < 0) return this;
        a === 0 ? o.shift() : Ue(o, a), o.length === 1 && (r[t] = o[0]), r.removeListener !== void 0 && this.emit("removeListener", t, i || n)
      }
      return this
    };
    l.prototype.off = l.prototype.removeListener;
    l.prototype.removeAllListeners = function(t) {
      var n, o, r;
      if (o = this._events, o === void 0) return this;
      if (o.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : o[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete o[t]), this;
      if (arguments.length === 0) {
        var a = Object.keys(o),
          s;
        for (r = 0; r < a.length; ++r) s = a[r], s !== "removeListener" && this.removeAllListeners(s);
        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
      }
      if (n = o[t], typeof n == "function") this.removeListener(t, n);
      else if (n !== void 0)
        for (r = n.length - 1; r >= 0; r--) this.removeListener(t, n[r]);
      return this
    };

    function pe(e, t, n) {
      var o = e._events;
      if (o === void 0) return [];
      var r = o[t];
      return r === void 0 ? [] : typeof r == "function" ? n ? [r.listener || r] : [r] : n ? Ke(r) : me(r, r.length)
    }
    l.prototype.listeners = function(t) {
      return pe(this, t, !0)
    };
    l.prototype.rawListeners = function(t) {
      return pe(this, t, !1)
    };
    l.listenerCount = function(e, t) {
      return typeof e.listenerCount == "function" ? e.listenerCount(t) : de.call(e, t)
    };
    l.prototype.listenerCount = de;

    function de(e) {
      var t = this._events;
      if (t !== void 0) {
        var n = t[e];
        if (typeof n == "function") return 1;
        if (n !== void 0) return n.length
      }
      return 0
    }
    l.prototype.eventNames = function() {
      return this._eventsCount > 0 ? S(this._events) : []
    };

    function me(e, t) {
      for (var n = new Array(t), o = 0; o < t; ++o) n[o] = e[o];
      return n
    }

    function Ue(e, t) {
      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
      e.pop()
    }

    function Ke(e) {
      for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
      return t
    }

    function We(e, t) {
      return new Promise(function(n, o) {
        function r(s) {
          e.removeListener(t, a), o(s)
        }

        function a() {
          typeof e.removeListener == "function" && e.removeListener("error", r), n([].slice.call(arguments))
        }
        he(e, t, a, {
          once: !0
        }), t !== "error" && Qe(e, r, {
          once: !0
        })
      })
    }

    function Qe(e, t, n) {
      typeof e.on == "function" && he(e, "error", t, n)
    }

    function he(e, t, n, o) {
      if (typeof e.on == "function") o.once ? e.once(t, n) : e.on(t, n);
      else if (typeof e.addEventListener == "function") e.addEventListener(t, function r(a) {
        o.once && e.removeEventListener(t, r), n(a)
      });
      else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
    }
  });
  var xe = re((Et, m) => {
    m.exports.boot = function(e) {
      return e
    };
    m.exports.ssrMiddleware = function(e) {
      return e
    };
    m.exports.configure = function(e) {
      return e
    };
    m.exports.preFetch = function(e) {
      return e
    };
    m.exports.route = function(e) {
      return e
    };
    m.exports.store = function(e) {
      return e
    };
    m.exports.bexBackground = function(e) {
      return e
    };
    m.exports.bexContent = function(e) {
      return e
    };
    m.exports.bexDom = function(e) {
      return e
    };
    m.exports.ssrProductionExport = function(e) {
      return e
    };
    m.exports.ssrCreate = function(e) {
      return e
    };
    m.exports.ssrListen = function(e) {
      return e
    };
    m.exports.ssrClose = function(e) {
      return e
    };
    m.exports.ssrServeStaticContent = function(e) {
      return e
    };
    m.exports.ssrRenderPreloadTag = function(e) {
      return e
    }
  });
  var Ce = se(ge());
  var D, R = 0,
    d = new Array(256);
  for (let e = 0; e < 256; e++) d[e] = (e + 256).toString(16).substring(1);
  var Ve = (() => {
      let e = typeof crypto != "undefined" ? crypto : typeof window != "undefined" ? window.crypto || window.msCrypto : void 0;
      if (e !== void 0) {
        if (e.randomBytes !== void 0) return e.randomBytes;
        if (e.getRandomValues !== void 0) return t => {
          let n = new Uint8Array(t);
          return e.getRandomValues(n), n
        }
      }
      return t => {
        let n = [];
        for (let o = t; o > 0; o--) n.push(Math.floor(Math.random() * 256));
        return n
      }
    })(),
    ye = 4096;

  function ve() {
    (D === void 0 || R + 16 > ye) && (R = 0, D = Ve(ye));
    let e = Array.prototype.slice.call(D, R, R += 16);
    return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, d[e[0]] + d[e[1]] + d[e[2]] + d[e[3]] + "-" + d[e[4]] + d[e[5]] + "-" + d[e[6]] + d[e[7]] + "-" + d[e[8]] + d[e[9]] + "-" + d[e[10]] + d[e[11]] + d[e[12]] + d[e[13]] + d[e[14]] + d[e[15]]
  }
  var ze = {
      undefined: () => 0,
      boolean: () => 4,
      number: () => 8,
      string: e => 2 * e.length,
      object: e => e ? Object.keys(e).reduce((t, n) => j(n) + j(e[n]) + t, 0) : 0
    },
    j = e => ze[typeof e](e),
    M = class extends Ce.EventEmitter {
      constructor(t) {
        super(), this.setMaxListeners(1 / 0), this.wall = t, t.listen(n => {
          Array.isArray(n) ? n.forEach(o => this._emit(o)) : this._emit(n)
        }), this._sendingQueue = [], this._sending = !1, this._maxMessageSize = 32 * 1024 * 1024
      }
      send(t, n) {
        return this._send([{
          event: t,
          payload: n
        }])
      }
      getEvents() {
        return this._events
      }
      on(t, n) {
        return super.on(t, o => {
          n({
            ...o,
            respond: r => this.send(o.eventResponseKey, r)
          })
        })
      }
      _emit(t) {
        typeof t == "string" ? this.emit(t) : this.emit(t.event, t.payload)
      }
      _send(t) {
        return this._sendingQueue.push(t), this._nextSend()
      }
      _nextSend() {
        if (!this._sendingQueue.length || this._sending) return Promise.resolve();
        this._sending = !0;
        let t = this._sendingQueue.shift(),
          n = t[0],
          o = `${n.event}.${ve()}`,
          r = o + ".result";
        return new Promise((a, s) => {
          let i = [],
            c = u => {
              if (u !== void 0 && u._chunkSplit) {
                let f = u._chunkSplit;
                i = [...i, ...u.data], f.lastChunk && (this.off(r, c), a(i))
              } else this.off(r, c), a(u)
            };
          this.on(r, c);
          try {
            let u = t.map(f => ({
              ...f,
              payload: {
                data: f.payload,
                eventResponseKey: r
              }
            }));
            this.wall.send(u)
          } catch (u) {
            let f = "Message length exceeded maximum allowed length.";
            if (u.message === f && Array.isArray(n.payload)) {
              let p = j(n);
              if (p > this._maxMessageSize) {
                let g = Math.ceil(p / this._maxMessageSize),
                  C = Math.ceil(n.payload.length / g),
                  v = n.payload;
                for (let b = 0; b < g; b++) {
                  let te = Math.min(v.length, C);
                  this.wall.send([{
                    event: n.event,
                    payload: {
                      _chunkSplit: {
                        count: g,
                        lastChunk: b === g - 1
                      },
                      data: v.splice(0, te)
                    }
                  }])
                }
              }
            }
          }
          this._sending = !1, setTimeout(() => this._nextSend(), 16)
        })
      }
    };
  var be = (e, t) => {
    window.addEventListener("message", n => {
      if (n.source === window && n.data.from !== void 0 && n.data.from === t) {
        let o = n.data[0],
          r = e.getEvents();
        for (let a in r) a === o.event && r[a](o.payload)
      }
    }, !1)
  };
  var ke = se(xe());
  var Ge = chrome.runtime.getURL("assets/config.json");
  async function Xe() {
    let e = await chrome.storage.local.get("defaultConfig");
    if (e.defaultConfig) return e.defaultConfig;
    let t = {},
      o = await (await fetch(Ge)).json();
    return o && (t = o, chrome.storage.local.set({
      defaultConfig: t
    })), t
  }
  var L = {
      manualSolving: !1,
      apiKey: "",
      appId: "",
      enabledForImageToText: !0,
      enabledForRecaptchaV3: !0,
      enabledForHCaptcha: !0,
      enabledForGeetestV4: !1,
      recaptchaV3MinScore: .5,
      enabledForRecaptcha: !0,
      enabledForFunCaptcha: !0,
      enabledForDataDome: !1,
      useProxy: !1,
      proxyType: "http",
      hostOrIp: "",
      port: "",
      proxyLogin: "",
      proxyPassword: "",
      enabledForBlacklistControl: !1,
      blackUrlList: [],
      isInBlackList: !1,
      reCaptchaMode: "click",
      reCaptchaDelayTime: 0,
      reCaptchaCollapse: !1,
      reCaptchaRepeatTimes: 10,
      reCaptcha3Mode: "token",
      reCaptcha3DelayTime: 0,
      reCaptcha3Collapse: !1,
      reCaptcha3RepeatTimes: 10,
      hCaptchaMode: "click",
      hCaptchaDelayTime: 0,
      hCaptchaCollapse: !1,
      hCaptchaRepeatTimes: 10,
      funCaptchaMode: "click",
      funCaptchaDelayTime: 0,
      funCaptchaCollapse: !1,
      funCaptchaRepeatTimes: 10,
      geetestMode: "click",
      geetestCollapse: !1,
      geetestDelayTime: 0,
      geetestRepeatTimes: 10,
      textCaptchaMode: "click",
      textCaptchaCollapse: !1,
      textCaptchaDelayTime: 0,
      textCaptchaRepeatTimes: 10,
      enabledForCloudflare: !1,
      cloudflareMode: "click",
      cloudflareCollapse: !1,
      cloudflareDelayTime: 0,
      cloudflareRepeatTimes: 10,
      datadomeMode: "click",
      datadomeCollapse: !1,
      datadomeDelayTime: 0,
      datadomeRepeatTimes: 10,
      enabledForAws: !1,
      awsMode: "click",
      awsCollapse: !1,
      awsDelayTime: 0,
      awsRepeatTimes: 10,
      useCapsolver: !0,
      isInit: !1,
      solvedCallback: "captchaSolvedCallback",
      textCaptchaSourceAttribute: "capsolver-image-to-text-source",
      textCaptchaResultAttribute: "capsolver-image-to-text-result"
    },
    we = {
      proxyType: ["socks5", "http", "https", "socks4"],
      mode: ["click", "token"]
    };
  async function Me() {
    let e = await Xe(),
      t = Object.keys(e);
    for (let n of t)
      if (!(n === "proxyType" && !we[n].includes(e[n]))) {
        {
          if (n.endsWith("Mode") && !we.mode.includes(e[n])) continue;
          if (n === "port") {
            if (typeof e[n] != "number") continue;
            L[n] = e[n]
          }
        }
        Reflect.has(L, n) && typeof L[n] == typeof e[n] && (L[n] = e[n])
      } return L
  }
  var Ye = Me(),
    T = {
      default: Ye,
      async get(e) {
        return (await this.getAll())[e]
      },
      async getAll() {
        let e = await Me(),
          t = await chrome.storage.local.get("config");
        return T.joinConfig(e, t.config)
      },
      async set(e) {
        let t = await T.getAll(),
          n = T.joinConfig(t, e);
        return chrome.storage.local.set({
          config: n
        })
      },
      joinConfig(e, t) {
        let n = {};
        if (e)
          for (let o in e) n[o] = e[o];
        if (t)
          for (let o in t) n[o] = t[o];
        return n
      }
    };

  function B(e) {
    return new Promise((t, n) => {
      let o = new Image;
      o.src = e, o.setAttribute("crossOrigin", "anonymous"), o.onload = () => {
        let r = document.createElement("canvas");
        r.width = o.width, r.height = o.height, r.getContext("2d").drawImage(o, 0, 0, o.width, o.height);
        let s = r.toDataURL();
        t(s)
      }, o.onerror = r => {
        n(r)
      }
    })
  }

  function y(e) {
    return new Promise(t => setTimeout(t, e))
  }

  function h(e, t) {
    let n = t - e + 1;
    return Math.floor(Math.random() * n + e)
  }

  function N(e) {
    let t = e.getBoundingClientRect();
    return {
      x: t.top + window.scrollY - document.documentElement.clientTop + h(-5, 5),
      y: t.left + window.scrollX - document.documentElement.clientLeft + h(-5, 5)
    }
  }

  function $e(e, t, n, o, r) {
    let [a, s] = t, [i, c] = r, [u, f] = n, [p, g] = o, C = a * (1 - e) * (1 - e) * (1 - e) + 3 * u * e * (1 - e) * (1 - e) + 3 * p * e * e * (1 - e) + i * e * e * e, v = s * (1 - e) * (1 - e) * (1 - e) + 3 * f * e * (1 - e) * (1 - e) + 3 * g * e * e * (1 - e) + c * e * e * e;
    return [C, v]
  }

  function Je(e, t, n = 30) {
    let o = [],
      r = 0,
      a = 1;
    for (let p = 0; p < n; ++p) o.push(r), p < n * 1 / 10 ? a += h(60, 100) : p >= n * 9 / 10 && (a -= h(60, 100), a = Math.max(20, a)), r += a;
    let s = [],
      i = [e.x, e.y],
      c = [(e.x + t.x) / 2 + h(30, 100) * 1, (e.y + t.y) / 2 + h(30, 100) * 1],
      u = [(e.x + t.x) / 2 + h(30, 100) * 1, (e.y + t.y) / 2 + h(30, 100) * 1],
      f = [t.x, t.y];
    for (let p of o) {
      let [g, C] = $e(p / r, i, c, u, f);
      s.push({
        x: g,
        y: C
      })
    }
    return s
  }

  function Ze(e, t) {
    let n = Je(e, t, h(15, 30));
    for (let o = 0; o < n.length; o++) document.body.dispatchEvent(new MouseEvent("mousemove", {
      bubbles: !0,
      clientX: n[o].x,
      clientY: n[o].y
    }))
  }

  function et({
    x: e,
    y: t
  }) {
    document.body.dispatchEvent(new MouseEvent("mousedown", {
      bubbles: !0,
      clientX: e,
      clientY: t
    }))
  }

  function tt({
    x: e,
    y: t
  }) {
    document.body.dispatchEvent(new MouseEvent("mouseup", {
      bubbles: !0,
      clientX: e,
      clientY: t
    }))
  }
  async function nt(e, t) {
    Ze(e, t), await y(h(30, 80)), et(t), await y(h(30, 80)), tt(t)
  }

  function Le(e, t) {
    function n(o, r, a) {
      let s = ["mouseover", "mousedown", "mouseup", "click"],
        i = {
          clientX: r + 85,
          clientY: a + 196,
          bubbles: !0
        };
      for (let c = 0; c < s.length; c++) {
        let u = new MouseEvent(s[c], i);
        o.dispatchEvent(u)
      }
    }
    e.forEach(o => {
      n(t, o.x, o.y)
    })
  }
  async function ot(e) {
    for (let t = 0; t < e.length - 1; t++) await nt(e[t], e[t + 1])
  }

  function rt(e, t, n) {
    let r = [n ? N(n) : {
      x: t ? h(420, 530) : h(10, 100),
      y: t ? h(200, 300) : h(5, 200)
    }];
    for (let a = 0; a < e.length; a++) {
      let s = N(e[a]);
      r.push(s)
    }
    return r
  }
  async function P(e, t = null) {
    let n = rt(e, !1, t);
    await ot(n)
  }
  var U = "",
    K = "",
    w = "",
    I = 0,
    O = null,
    W = !1,
    Q = !1;

  function A() {
    return document.querySelectorAll(".task-grid > .task-image > .image-wrapper > .image").length === 9 || document.querySelectorAll(".task-grid .task-image .wrapper .image").length === 9
  }

  function k() {
    return document.querySelector(".task-answers") !== null
  }

  function V() {
    return document.querySelector("canvas") !== null
  }

  function st() {
    var t;
    let e = ((t = document.querySelector("div.check")) == null ? void 0 : t.style.display) === "block";
    return e && (I = 0, !Q && chrome.runtime.sendMessage({
      action: "solved"
    }), Q = !0), e
  }

  function at() {
    let e = document.querySelector(".display-error");
    return String(e == null ? void 0 : e.style.opacity) === "1"
  }

  function it() {
    var e;
    (e = document.querySelector("#checkbox")) == null || e.click()
  }

  function E(e) {
    let t = e == null ? void 0 : e.style.background;
    return t == null ? void 0 : t.slice(t.indexOf("http"), t.indexOf('")'))
  }

  function ct() {
    let e = null;
    return e && (window.clearInterval(e), e = null), new Promise(t => {
      let n = [],
        o = [];
      A() ? o = Array.from(document.querySelectorAll(".task-image")) : k() && (o = Array.from(document.querySelectorAll(".task-answers .challenge-answer"))), e = window.setInterval(() => {
        for (let a of o) {
          let s = a == null ? void 0 : a.querySelector("div.image"),
            i = E(s);
          n.push(i)
        }
        n.every(a => !!a) ? (window.clearInterval(e), t(n)) : n = []
      }, 500)
    })
  }
  async function lt() {
    let e = [];
    if (A()) {
      let t = await ct(),
        n = t.length;
      for (let o = 0; o < n; o++) try {
        let r = await B(t[o]);
        e.push(r.slice(r.indexOf(";base64,") + 8))
      } catch (r) {
        console.log(r)
      }
    } else if (k()) {
      let t = document.querySelector(".challenge-task > .task-image > .image-wrapper > .image"),
        n = E(t),
        o = await B(n);
      e.unshift(o.slice(o.indexOf(";base64,") + 8))
    } else if (V()) {
      let t = await Te();
      e.push(t)
    }
    return e
  }

  function ut() {
    var t;
    if (k()) return w;
    if (K) return K;
    let e = document.querySelector(".prompt-text");
    return (t = e == null ? void 0 : e.innerText) != null ? t : e.innerHTML
  }
  async function ft() {
    let e = await lt(),
      t = ut();
    return {
      queries: e,
      question: t
    }
  }

  function z() {
    let e = document.querySelector(".button-submit");
    e == null || e.click(), P([e], O), O = null
  }
  async function pt(e) {
    var a;
    let t = e.objects,
      n = Array.from(document.querySelectorAll(".task-image")),
      o = t.length,
      r = [];
    for (let s = 0; s < o; s++) t[s] && (await y(100), (a = n[s]) == null || a.click(), r.push(n[s]));
    await P(r), O = r[r.length - 1], await y(500), z()
  }
  async function dt(e) {
    let t = e == null ? void 0 : e.tags,
      n = t[0],
      o = Array.from(document.querySelectorAll(".answer-text")),
      r = [];

    function a(s) {
      ["mouseover", "mousedown", "mouseup", "click"].forEach(i => {
        let c = new MouseEvent(i, {
          bubbles: !0,
          cancelable: !1
        });
        s.dispatchEvent(c)
      })
    }
    for (let s = 1; s < t.length; s++) t[s] === n && (await y(100), a(o[s - 1]), r.push(o[s - 1]));
    await P(r), O = r[r.length - 1], await y(500), z()
  }
  async function mt(e) {
    var s;
    let t = (s = e == null ? void 0 : e.box) != null ? s : [],
      n = 0,
      o = 0,
      r = [];
    for (let i = 0; i < t.length; i++) i % 2 === 0 ? n = t[i] : (o = t[i], r.push({
      x: n,
      y: o
    }));
    let a = document.querySelector("canvas");
    Le(r, a), await y(500), z()
  }
  async function Te() {
    let e = document.querySelector("canvas");
    if (!e) return null;
    let [t, n] = [e.width, e.height], r = e.getContext("2d", {
      willReadFrequently: !0
    }).getImageData(0, 0, t, n);
    if (Array.from(r.data).every((Ie, Oe) => Oe % 4 === 3 || Ie === 0)) return console.log("The original canvas has no valid content"), null;
    let s = parseInt(e.style.width, 10),
      i = parseInt(e.style.height, 10);
    if (s <= 0 || i <= 0) return console.log("Desired width and height should be positive numbers"), null;
    let c = Math.min(s / t, i / n),
      [u, f] = [t * c, n * c],
      p = document.querySelector(".bounding-box-example"),
      g = p == null ? void 0 : p.style.top.replace("px", ""),
      C = p == null ? void 0 : p.style.height.replace("px", ""),
      v = Number(g) + Number(C),
      b = document.createElement("canvas");
    Object.assign(b, {
      width: u,
      height: f
    }), b.getContext("2d").drawImage(e, 0, v, t, n - v, 0, 0, u, f - v);
    let ne = b.toDataURL("image/jpeg", .4);
    return ne.slice(ne.indexOf(";base64,") + 8)
  }

  function G() {
    return document.querySelector("#checkbox") !== null
  }

  function X() {
    st() || (it(), Q = !1)
  }

  function Y() {
    return document.querySelector(".challenge") !== null
  }

  function $(e = 1e4) {
    return new Promise(t => {
      let n = Date.now(),
        o = Array.from(document.querySelectorAll(".task-image")),
        r = Array.from(document.querySelectorAll(".task-answers > .answer-example > .image-wrapper"));
      document.querySelector("canvas") !== null && t(!0);
      let s = o.length !== 0 ? o : r,
        i = [];
      s.length === 0 && t(!1);
      let c = null;
      c && window.clearInterval(c), c = window.setInterval(() => {
        Date.now() - n > e && t(!1);
        for (let f of s) {
          let p = f == null ? void 0 : f.querySelector("div.image"),
            g = E(p);
          i.push(g)
        }
        i.every(f => !!f) ? (window.clearInterval(c), t(!0)) : (i = [], window.clearInterval(c), t(!1))
      }, 100)
    })
  }
  async function J(e) {
    if (e < I) return !1;
    let t = document.querySelector("h2.prompt-text");
    if (!(t == null ? void 0 : t.innerText)) return console.log("task text error--"), !1;
    let o = [];
    if (A()) {
      let a = Array.from(document.querySelectorAll(".task-image"));
      if (a.length !== 9) return console.log("grid cells error--"), !1;
      for (let s of a) {
        let i = s == null ? void 0 : s.querySelector("div.image"),
          c = E(i);
        o.push(c)
      }
    } else if (k()) {
      let a = E(document.querySelector(".task-image .image"));
      if (!a) return console.log("multi bg error--"), !1;
      o.push(a)
    } else if (V()) {
      let a = await Te();
      if (!a || W) return console.log("canvas error--"), !1;
      o.push(a), W = !0
    } else return !1;
    let r = JSON.stringify(o);
    return U === r ? !1 : (U = r, !0)
  }
  async function Z() {
    at() && I++;
    let e = await ft(),
      t = {
        action: "solver",
        captchaType: "hCaptcha",
        params: e
      };
    chrome.runtime.sendMessage(t).then(n => {
      var o, r;
      if (!(n != null && n.response) || ((o = n == null ? void 0 : n.response) == null ? void 0 : o.error)) {
        U = "", I++;
        return
      }
      ht((r = n.response.response) == null ? void 0 : r.solution)
    })
  }

  function ht(e) {
    A() ? pt(e) : k() ? dt(e) : V() && mt(e), W = !1
  }

  function Ee(e) {
    var t;
    try {
      let n = JSON.parse(e);
      K = (t = n == null ? void 0 : n.requester_question) == null ? void 0 : t.en, typeof(n == null ? void 0 : n.requester_restricted_answer_set) == "object" && (w = "", Object.keys(n.requester_restricted_answer_set).forEach(r => {
        w += n.requester_restricted_answer_set[r].en + "$"
      }), w = w.slice(0, w.length - 1))
    } catch {
      console.log("Get question failed")
    }
  }
  var Se = document.createElement("script");
  Se.src = chrome.runtime.getURL("assets/inject/injected.js");
  var gt = document.head || document.documentElement;
  gt.appendChild(Se);
  window.addEventListener("message", function(e) {
    var t, n;
    (((t = e == null ? void 0 : e.data) == null ? void 0 : t.type) === "xhr" || ((n = e == null ? void 0 : e.data) == null ? void 0 : n.type) === "fetch") && Ee(e.data.data)
  });
  var F = !1;
  async function yt(e) {
    !e.useCapsolver || !e.enabledForHCaptcha || !e.apiKey || e.enabledForBlacklistControl && e.isInBlackList || e.hCaptchaMode !== "click" || F || (await y(e.hCaptchaDelayTime), setInterval(async () => {
      if (G() && X(), !Y() || !await $()) return;
      if (F = !0, !await J(e.hCaptchaRepeatTimes)) {
        F = !1;
        return
      }
      await Z(), await y(2e3), F = !1
    }, 2500))
  }
  async function vt(e) {
    setInterval(async () => {
      G() && X(), !(!Y() || !await $() || !await J(e.hCaptchaRepeatTimes)) && await Z()
    }, 2500)
  }
  var H = null;
  H && window.clearInterval(H);
  H = window.setInterval(async () => {
    let e = await T.getAll();
    !e.isInit || (e.manualSolving ? chrome.runtime.onMessage.addListener(t => {
      t.command === "execute" && vt(e)
    }) : yt(e), window.clearInterval(H))
  }, 100);
  var _e = (0, ke.bexContent)(e => {});
  var ee = chrome.runtime.connect({
      name: "contentScript"
    }),
    Re = !1;
  ee.onDisconnect.addListener(() => {
    Re = !0
  });
  var Pe = new M({
    listen(e) {
      ee.onMessage.addListener(e)
    },
    send(e) {
      Re || (ee.postMessage(e), window.postMessage({
        ...e,
        from: "bex-content-script"
      }, "*"))
    }
  });

  function Ct(e) {
    let t = document.createElement("script");
    t.src = e, t.onload = function() {
      this.remove()
    }, (document.head || document.documentElement).appendChild(t)
  }
  document instanceof HTMLDocument && Ct(chrome.runtime.getURL("dom.js"));
  be(Pe, "bex-dom");
  _e(Pe);
})();