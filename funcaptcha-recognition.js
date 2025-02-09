"use strict";
(() => {
  var Le = Object.create;
  var W = Object.defineProperty;
  var Te = Object.getOwnPropertyDescriptor;
  var Ee = Object.getOwnPropertyNames;
  var _e = Object.getPrototypeOf,
    ke = Object.prototype.hasOwnProperty;
  var X = (e, t) => () => (t || e((t = {
    exports: {}
  }).exports, t), t.exports);
  var Se = (e, t, n, o) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let r of Ee(t)) !ke.call(e, r) && r !== n && W(e, r, {
        get: () => t[r],
        enumerable: !(o = Te(t, r)) || o.enumerable
      });
    return e
  };
  var Y = (e, t, n) => (n = e != null ? Le(_e(e)) : {}, Se(t || !e || !e.__esModule ? W(n, "default", {
    value: e,
    enumerable: !0
  }) : n, e));
  var ae = X((at, F) => {
    "use strict";
    var v = typeof Reflect == "object" ? Reflect : null,
      G = v && typeof v.apply == "function" ? v.apply : function(t, n, o) {
        return Function.prototype.apply.call(t, n, o)
      },
      _;
    v && typeof v.ownKeys == "function" ? _ = v.ownKeys : Object.getOwnPropertySymbols ? _ = function(t) {
      return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
    } : _ = function(t) {
      return Object.getOwnPropertyNames(t)
    };

    function Re(e) {
      console && console.warn && console.warn(e)
    }
    var J = Number.isNaN || function(t) {
      return t !== t
    };

    function s() {
      s.init.call(this)
    }
    F.exports = s;
    F.exports.once = Oe;
    s.EventEmitter = s;
    s.prototype._events = void 0;
    s.prototype._eventsCount = 0;
    s.prototype._maxListeners = void 0;
    var $ = 10;

    function k(e) {
      if (typeof e != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
    }
    Object.defineProperty(s, "defaultMaxListeners", {
      enumerable: !0,
      get: function() {
        return $
      },
      set: function(e) {
        if (typeof e != "number" || e < 0 || J(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
        $ = e
      }
    });
    s.init = function() {
      (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    };
    s.prototype.setMaxListeners = function(t) {
      if (typeof t != "number" || t < 0 || J(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
      return this._maxListeners = t, this
    };

    function Z(e) {
      return e._maxListeners === void 0 ? s.defaultMaxListeners : e._maxListeners
    }
    s.prototype.getMaxListeners = function() {
      return Z(this)
    };
    s.prototype.emit = function(t) {
      for (var n = [], o = 1; o < arguments.length; o++) n.push(arguments[o]);
      var r = t === "error",
        i = this._events;
      if (i !== void 0) r = r && i.error === void 0;
      else if (!r) return !1;
      if (r) {
        var a;
        if (n.length > 0 && (a = n[0]), a instanceof Error) throw a;
        var c = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
        throw c.context = a, c
      }
      var d = i[t];
      if (d === void 0) return !1;
      if (typeof d == "function") G(d, this, n);
      else
        for (var l = d.length, m = re(d, l), o = 0; o < l; ++o) G(m[o], this, n);
      return !0
    };

    function ee(e, t, n, o) {
      var r, i, a;
      if (k(n), i = e._events, i === void 0 ? (i = e._events = Object.create(null), e._eventsCount = 0) : (i.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), i = e._events), a = i[t]), a === void 0) a = i[t] = n, ++e._eventsCount;
      else if (typeof a == "function" ? a = i[t] = o ? [n, a] : [a, n] : o ? a.unshift(n) : a.push(n), r = Z(e), r > 0 && a.length > r && !a.warned) {
        a.warned = !0;
        var c = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = a.length, Re(c)
      }
      return e
    }
    s.prototype.addListener = function(t, n) {
      return ee(this, t, n, !1)
    };
    s.prototype.on = s.prototype.addListener;
    s.prototype.prependListener = function(t, n) {
      return ee(this, t, n, !0)
    };

    function Ie() {
      if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    }

    function te(e, t, n) {
      var o = {
          fired: !1,
          wrapFn: void 0,
          target: e,
          type: t,
          listener: n
        },
        r = Ie.bind(o);
      return r.listener = n, o.wrapFn = r, r
    }
    s.prototype.once = function(t, n) {
      return k(n), this.on(t, te(this, t, n)), this
    };
    s.prototype.prependOnceListener = function(t, n) {
      return k(n), this.prependListener(t, te(this, t, n)), this
    };
    s.prototype.removeListener = function(t, n) {
      var o, r, i, a, c;
      if (k(n), r = this._events, r === void 0) return this;
      if (o = r[t], o === void 0) return this;
      if (o === n || o.listener === n) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete r[t], r.removeListener && this.emit("removeListener", t, o.listener || n));
      else if (typeof o != "function") {
        for (i = -1, a = o.length - 1; a >= 0; a--)
          if (o[a] === n || o[a].listener === n) {
            c = o[a].listener, i = a;
            break
          } if (i < 0) return this;
        i === 0 ? o.shift() : Pe(o, i), o.length === 1 && (r[t] = o[0]), r.removeListener !== void 0 && this.emit("removeListener", t, c || n)
      }
      return this
    };
    s.prototype.off = s.prototype.removeListener;
    s.prototype.removeAllListeners = function(t) {
      var n, o, r;
      if (o = this._events, o === void 0) return this;
      if (o.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : o[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete o[t]), this;
      if (arguments.length === 0) {
        var i = Object.keys(o),
          a;
        for (r = 0; r < i.length; ++r) a = i[r], a !== "removeListener" && this.removeAllListeners(a);
        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
      }
      if (n = o[t], typeof n == "function") this.removeListener(t, n);
      else if (n !== void 0)
        for (r = n.length - 1; r >= 0; r--) this.removeListener(t, n[r]);
      return this
    };

    function ne(e, t, n) {
      var o = e._events;
      if (o === void 0) return [];
      var r = o[t];
      return r === void 0 ? [] : typeof r == "function" ? n ? [r.listener || r] : [r] : n ? Fe(r) : re(r, r.length)
    }
    s.prototype.listeners = function(t) {
      return ne(this, t, !0)
    };
    s.prototype.rawListeners = function(t) {
      return ne(this, t, !1)
    };
    s.listenerCount = function(e, t) {
      return typeof e.listenerCount == "function" ? e.listenerCount(t) : oe.call(e, t)
    };
    s.prototype.listenerCount = oe;

    function oe(e) {
      var t = this._events;
      if (t !== void 0) {
        var n = t[e];
        if (typeof n == "function") return 1;
        if (n !== void 0) return n.length
      }
      return 0
    }
    s.prototype.eventNames = function() {
      return this._eventsCount > 0 ? _(this._events) : []
    };

    function re(e, t) {
      for (var n = new Array(t), o = 0; o < t; ++o) n[o] = e[o];
      return n
    }

    function Pe(e, t) {
      for (; t + 1 < e.length; t++) e[t] = e[t + 1];
      e.pop()
    }

    function Fe(e) {
      for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
      return t
    }

    function Oe(e, t) {
      return new Promise(function(n, o) {
        function r(a) {
          e.removeListener(t, i), o(a)
        }

        function i() {
          typeof e.removeListener == "function" && e.removeListener("error", r), n([].slice.call(arguments))
        }
        ie(e, t, i, {
          once: !0
        }), t !== "error" && De(e, r, {
          once: !0
        })
      })
    }

    function De(e, t, n) {
      typeof e.on == "function" && ie(e, "error", t, n)
    }

    function ie(e, t, n, o) {
      if (typeof e.on == "function") o.once ? e.once(t, n) : e.on(t, n);
      else if (typeof e.addEventListener == "function") e.addEventListener(t, function r(i) {
        o.once && e.removeEventListener(t, r), n(i)
      });
      else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
    }
  });
  var fe = X((ft, f) => {
    f.exports.boot = function(e) {
      return e
    };
    f.exports.ssrMiddleware = function(e) {
      return e
    };
    f.exports.configure = function(e) {
      return e
    };
    f.exports.preFetch = function(e) {
      return e
    };
    f.exports.route = function(e) {
      return e
    };
    f.exports.store = function(e) {
      return e
    };
    f.exports.bexBackground = function(e) {
      return e
    };
    f.exports.bexContent = function(e) {
      return e
    };
    f.exports.bexDom = function(e) {
      return e
    };
    f.exports.ssrProductionExport = function(e) {
      return e
    };
    f.exports.ssrCreate = function(e) {
      return e
    };
    f.exports.ssrListen = function(e) {
      return e
    };
    f.exports.ssrClose = function(e) {
      return e
    };
    f.exports.ssrServeStaticContent = function(e) {
      return e
    };
    f.exports.ssrRenderPreloadTag = function(e) {
      return e
    }
  });
  var ue = Y(ae());
  var O, S = 0,
    u = new Array(256);
  for (let e = 0; e < 256; e++) u[e] = (e + 256).toString(16).substring(1);
  var qe = (() => {
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
    se = 4096;

  function ce() {
    (O === void 0 || S + 16 > se) && (S = 0, O = qe(se));
    let e = Array.prototype.slice.call(O, S, S += 16);
    return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, u[e[0]] + u[e[1]] + u[e[2]] + u[e[3]] + "-" + u[e[4]] + u[e[5]] + "-" + u[e[6]] + u[e[7]] + "-" + u[e[8]] + u[e[9]] + "-" + u[e[10]] + u[e[11]] + u[e[12]] + u[e[13]] + u[e[14]] + u[e[15]]
  }
  var Ae = {
      undefined: () => 0,
      boolean: () => 4,
      number: () => 8,
      string: e => 2 * e.length,
      object: e => e ? Object.keys(e).reduce((t, n) => D(n) + D(e[n]) + t, 0) : 0
    },
    D = e => Ae[typeof e](e),
    b = class extends ue.EventEmitter {
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
          o = `${n.event}.${ce()}`,
          r = o + ".result";
        return new Promise((i, a) => {
          let c = [],
            d = l => {
              if (l !== void 0 && l._chunkSplit) {
                let m = l._chunkSplit;
                c = [...c, ...l.data], m.lastChunk && (this.off(r, d), i(c))
              } else this.off(r, d), i(l)
            };
          this.on(r, d);
          try {
            let l = t.map(m => ({
              ...m,
              payload: {
                data: m.payload,
                eventResponseKey: r
              }
            }));
            this.wall.send(l)
          } catch (l) {
            let m = "Message length exceeded maximum allowed length.";
            if (l.message === m && Array.isArray(n.payload)) {
              let h = D(n);
              if (h > this._maxMessageSize) {
                let g = Math.ceil(h / this._maxMessageSize),
                  C = Math.ceil(n.payload.length / g),
                  E = n.payload;
                for (let P = 0; P < g; P++) {
                  let Me = Math.min(E.length, C);
                  this.wall.send([{
                    event: n.event,
                    payload: {
                      _chunkSplit: {
                        count: g,
                        lastChunk: P === g - 1
                      },
                      data: E.splice(0, Me)
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
  var le = (e, t) => {
    window.addEventListener("message", n => {
      if (n.source === window && n.data.from !== void 0 && n.data.from === t) {
        let o = n.data[0],
          r = e.getEvents();
        for (let i in r) i === o.event && r[i](o.payload)
      }
    }, !1)
  };
  var ve = Y(fe());
  var je = chrome.runtime.getURL("assets/config.json");
  async function Be() {
    let e = await chrome.storage.local.get("defaultConfig");
    if (e.defaultConfig) return e.defaultConfig;
    let t = {},
      o = await (await fetch(je)).json();
    return o && (t = o, chrome.storage.local.set({
      defaultConfig: t
    })), t
  }
  var x = {
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
    pe = {
      proxyType: ["socks5", "http", "https", "socks4"],
      mode: ["click", "token"]
    };
  async function de() {
    let e = await Be(),
      t = Object.keys(e);
    for (let n of t)
      if (!(n === "proxyType" && !pe[n].includes(e[n]))) {
        {
          if (n.endsWith("Mode") && !pe.mode.includes(e[n])) continue;
          if (n === "port") {
            if (typeof e[n] != "number") continue;
            x[n] = e[n]
          }
        }
        Reflect.has(x, n) && typeof x[n] == typeof e[n] && (x[n] = e[n])
      } return x
  }
  var He = de(),
    w = {
      default: He,
      async get(e) {
        return (await this.getAll())[e]
      },
      async getAll() {
        let e = await de(),
          t = await chrome.storage.local.get("config");
        return w.joinConfig(e, t.config)
      },
      async set(e) {
        let t = await w.getAll(),
          n = w.joinConfig(t, e);
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

  function me(e) {
    return new Promise((t, n) => {
      let o = new Image;
      o.src = e, o.setAttribute("crossOrigin", "anonymous"), o.onload = () => {
        let r = document.createElement("canvas");
        r.width = o.width, r.height = o.height, r.getContext("2d").drawImage(o, 0, 0, o.width, o.height);
        let a = r.toDataURL();
        t(a)
      }, o.onerror = r => {
        n(r)
      }
    })
  }

  function y(e) {
    return new Promise(t => setTimeout(t, e))
  }

  function p(e, t) {
    let n = t - e + 1;
    return Math.floor(Math.random() * n + e)
  }

  function q(e) {
    let t = e.getBoundingClientRect();
    return {
      x: t.top + window.scrollY - document.documentElement.clientTop + p(-5, 5),
      y: t.left + window.scrollX - document.documentElement.clientLeft + p(-5, 5)
    }
  }

  function Ne(e, t, n, o, r) {
    let [i, a] = t, [c, d] = r, [l, m] = n, [h, g] = o, C = i * (1 - e) * (1 - e) * (1 - e) + 3 * l * e * (1 - e) * (1 - e) + 3 * h * e * e * (1 - e) + c * e * e * e, E = a * (1 - e) * (1 - e) * (1 - e) + 3 * m * e * (1 - e) * (1 - e) + 3 * g * e * e * (1 - e) + d * e * e * e;
    return [C, E]
  }

  function Ke(e, t, n = 30) {
    let o = [],
      r = 0,
      i = 1;
    for (let h = 0; h < n; ++h) o.push(r), h < n * 1 / 10 ? i += p(60, 100) : h >= n * 9 / 10 && (i -= p(60, 100), i = Math.max(20, i)), r += i;
    let a = [],
      c = [e.x, e.y],
      d = [(e.x + t.x) / 2 + p(30, 100) * 1, (e.y + t.y) / 2 + p(30, 100) * 1],
      l = [(e.x + t.x) / 2 + p(30, 100) * 1, (e.y + t.y) / 2 + p(30, 100) * 1],
      m = [t.x, t.y];
    for (let h of o) {
      let [g, C] = Ne(h / r, c, d, l, m);
      a.push({
        x: g,
        y: C
      })
    }
    return a
  }

  function Ue(e, t) {
    let n = Ke(e, t, p(15, 30));
    for (let o = 0; o < n.length; o++) document.body.dispatchEvent(new MouseEvent("mousemove", {
      bubbles: !0,
      clientX: n[o].x,
      clientY: n[o].y
    }))
  }

  function Ve({
    x: e,
    y: t
  }) {
    document.body.dispatchEvent(new MouseEvent("mousedown", {
      bubbles: !0,
      clientX: e,
      clientY: t
    }))
  }

  function ze({
    x: e,
    y: t
  }) {
    document.body.dispatchEvent(new MouseEvent("mouseup", {
      bubbles: !0,
      clientX: e,
      clientY: t
    }))
  }
  async function Qe(e, t) {
    Ue(e, t), await y(p(30, 80)), Ve(t), await y(p(30, 80)), ze(t)
  }
  async function We(e) {
    for (let t = 0; t < e.length - 1; t++) await Qe(e[t], e[t + 1])
  }

  function Xe(e, t, n) {
    let r = [n ? q(n) : {
      x: t ? p(420, 530) : p(10, 100),
      y: t ? p(200, 300) : p(5, 200)
    }];
    for (let i = 0; i < e.length; i++) {
      let a = q(e[i]);
      r.push(a)
    }
    return r
  }
  async function A(e, t = null) {
    let n = Xe(e, !1, t);
    await We(n)
  }
  var R = "",
    he = "",
    M = !1,
    j = 0,
    B = !1;

  function Ye() {
    let e = document.querySelector(".victory") !== null || document.querySelector("#victory");
    return e && (!B && chrome.runtime.sendMessage({
      action: "solved"
    }), B = !0), e
  }

  function Ge() {
    return document.querySelector(".match-game-fail") !== null || document.querySelector("#wrong")
  }

  function L() {
    return document.querySelector(".container .box button.button") !== null
  }

  function T() {
    return document.querySelector("#home_children_button") !== null || document.querySelector("#EnforcementChallenge") !== null
  }
  async function ge() {
    var n;
    let e = await chrome.storage.local.get("funCaptchaInfo");
    return (n = e == null ? void 0 : e.funCaptchaInfo) == null ? void 0 : n.question
  }
  async function $e(e) {
    let t;
    if (L()) {
      let n = e.slice(e.indexOf("blob"), e.indexOf('")'));
      t = await me(n)
    } else T() && (t = e);
    return t.slice(t.indexOf(";base64,") + 8)
  }
  async function Je() {
    let e = await $e(R),
      t = await ge();
    return {
      image: e,
      question: t
    }
  }

  function Ze(e) {
    let t = document.querySelector(".container .match-game"),
      n = t == null ? void 0 : t.querySelector("button");
    e.push(n), n.click(), A(e)
  }

  function H() {
    return document.querySelector(".container .box button.button") !== null || document.querySelector("#home_children_button") !== null || document.querySelector("#wrong_children_button")
  }

  function N(e) {
    let t = Ge();
    t && (M = !1, j++), !M && j <= e && (L() ? document.querySelector(".container .box button.button").click() : T() && (t ? document.querySelector("#wrong_children_button").click() : document.querySelector("#home_children_button").click()), M = !0, B = !1)
  }

  function K() {
    if (Ye()) return !1;
    let e = document.querySelector(".answer-frame img") !== null || document.querySelector("#game_challengeItem");
    return !e && !M && (M = !1), e
  }

  function U() {
    return new Promise(e => {
      if (L()) {
        let t = document.querySelector(".answer-frame img");
        (t == null ? void 0 : t.style.backgroundImage) && e(!0)
      } else if (T()) {
        let t = document.querySelector("#game_challengeItem_image");
        (t == null ? void 0 : t.src) && e(!0)
      }
      e(!1)
    })
  }
  async function V() {
    if (!await ge()) return !1;
    let t = "";
    if (L()) t = document.querySelector(".answer-frame img").style.backgroundImage;
    else if (T()) {
      let n = document.querySelector("#game_challengeItem_image");
      t = n == null ? void 0 : n.src
    }
    return R === t ? !1 : (R = t, !0)
  }
  async function z() {
    let e = await Je(),
      t = {
        action: "solver",
        captchaType: "funCaptcha",
        params: e
      };
    chrome.runtime.sendMessage(t).then(n => {
      var o, r;
      if (!(n != null && n.response) || ((o = n == null ? void 0 : n.response) == null ? void 0 : o.error)) {
        R = "", j++;
        return
      }
      et((r = n.response.response) == null ? void 0 : r.solution)
    })
  }
  async function et(e) {
    let t = [],
      n = e == null ? void 0 : e.objects[0];
    if (L()) {
      let o = document.querySelector(".answer-frame .right-arrow");
      for (let r = 0; r < Number(n); r++) await y(100), o == null || o.click(), t.push(o);
      await y(500), Ze(t)
    } else if (T()) {
      let o = Array.from(document.querySelectorAll("#game_children_challenge a"));
      o[n].click(), t.push(o[n]), A(t)
    }
  }

  function ye(e) {
    var t, n;
    try {
      let o = JSON.parse(e);
      he = ((t = o == null ? void 0 : o.game_data) == null ? void 0 : t.instruction_string) || ((n = o == null ? void 0 : o.game_data) == null ? void 0 : n.game_variant), chrome.storage.local.set({
        funCaptchaInfo: {
          question: he
        }
      })
    } catch {
      console.log("Get question failed")
    }
  }
  var Ce = document.createElement("script");
  Ce.src = chrome.runtime.getURL("assets/inject/injected.js");
  var tt = document.head || document.documentElement;
  tt.appendChild(Ce);
  window.addEventListener("message", function(e) {
    var t, n;
    (((t = e == null ? void 0 : e.data) == null ? void 0 : t.type) === "xhr" || ((n = e == null ? void 0 : e.data) == null ? void 0 : n.type) === "fetch") && ye(e.data.data)
  });
  async function nt(e) {
    !e.useCapsolver || !e.enabledForFunCaptcha || !e.apiKey || e.enabledForBlacklistControl && e.isInBlackList || e.funCaptchaMode !== "click" || (await y(e.funCaptchaDelayTime), setInterval(async () => {
      if (H() && N(e.funCaptchaRepeatTimes), K()) {
        if (!await U() || !await V()) return;
        await z()
      }
    }, 1e3))
  }
  async function ot(e) {
    setInterval(async () => {
      if (H() && N(e.funCaptchaRepeatTimes), K()) {
        if (!await U() || !await V()) return;
        await z()
      }
    }, 1e3)
  }
  var I = null;
  I && window.clearInterval(I);
  I = window.setInterval(async () => {
    let e = await w.getAll();
    !e.isInit || (e.manualSolving ? chrome.runtime.onMessage.addListener(t => {
      t.command === "execute" && ot(e)
    }) : nt(e), window.clearInterval(I))
  }, 100);
  var be = (0, ve.bexContent)(e => {});
  var Q = chrome.runtime.connect({
      name: "contentScript"
    }),
    xe = !1;
  Q.onDisconnect.addListener(() => {
    xe = !0
  });
  var we = new b({
    listen(e) {
      Q.onMessage.addListener(e)
    },
    send(e) {
      xe || (Q.postMessage(e), window.postMessage({
        ...e,
        from: "bex-content-script"
      }, "*"))
    }
  });

  function rt(e) {
    let t = document.createElement("script");
    t.src = e, t.onload = function() {
      this.remove()
    }, (document.head || document.documentElement).appendChild(t)
  }
  document instanceof HTMLDocument && rt(chrome.runtime.getURL("dom.js"));
  le(we, "bex-dom");
  be(we);
})();