//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, c = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, l = (n, r, o) => (o = n == null ? {} : e(i(n)), c(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), u = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.iterator;
	function p(e) {
		return typeof e != "object" || !e ? null : (e = f && e[f] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var m = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, h = Object.assign, g = {};
	function _(e, t, n) {
		this.props = e, this.context = t, this.refs = g, this.updater = n || m;
	}
	_.prototype.isReactComponent = {}, _.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, _.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function v() {}
	v.prototype = _.prototype;
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = g, this.updater = n || m;
	}
	var b = y.prototype = new v();
	b.constructor = y, h(b, _.prototype), b.isPureReactComponent = !0;
	var x = Array.isArray, S = Object.prototype.hasOwnProperty, C = { current: null }, w = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function T(e, n, r) {
		var i, a = {}, o = null, s = null;
		if (n != null) for (i in n.ref !== void 0 && (s = n.ref), n.key !== void 0 && (o = "" + n.key), n) S.call(n, i) && !w.hasOwnProperty(i) && (a[i] = n[i]);
		var c = arguments.length - 2;
		if (c === 1) a.children = r;
		else if (1 < c) {
			for (var l = Array(c), u = 0; u < c; u++) l[u] = arguments[u + 2];
			a.children = l;
		}
		if (e && e.defaultProps) for (i in c = e.defaultProps, c) a[i] === void 0 && (a[i] = c[i]);
		return {
			$$typeof: t,
			type: e,
			key: o,
			ref: s,
			props: a,
			_owner: C.current
		};
	}
	function E(e, n) {
		return {
			$$typeof: t,
			type: e.type,
			key: n,
			ref: e.ref,
			props: e.props,
			_owner: e._owner
		};
	}
	function ee(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function D(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var te = /\/+/g;
	function ne(e, t) {
		return typeof e == "object" && e && e.key != null ? D("" + e.key) : t.toString(36);
	}
	function re(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n: c = !0;
			}
		}
		if (c) return c = e, o = o(c), e = a === "" ? "." + ne(c, 0) : a, x(o) ? (i = "", e != null && (i = e.replace(te, "$&/") + "/"), re(o, r, i, "", function(e) {
			return e;
		})) : o != null && (ee(o) && (o = E(o, i + (!o.key || c && c.key === o.key ? "" : ("" + o.key).replace(te, "$&/") + "/") + e)), r.push(o)), 1;
		if (c = 0, a = a === "" ? "." : a + ":", x(e)) for (var l = 0; l < e.length; l++) {
			s = e[l];
			var u = a + ne(s, l);
			c += re(s, r, i, u, o);
		}
		else if (u = p(e), typeof u == "function") for (e = u.call(e), l = 0; !(s = e.next()).done;) s = s.value, u = a + ne(s, l++), c += re(s, r, i, u, o);
		else if (s === "object") throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		return c;
	}
	function ie(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return re(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ae(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var O = { current: null }, oe = { transition: null }, se = {
		ReactCurrentDispatcher: O,
		ReactCurrentBatchConfig: oe,
		ReactCurrentOwner: C
	};
	function ce() {
		throw Error("act(...) is not supported in production builds of React.");
	}
	e.Children = {
		map: ie,
		forEach: function(e, t, n) {
			ie(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ie(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ie(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!ee(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	}, e.Component = _, e.Fragment = r, e.Profiler = a, e.PureComponent = y, e.StrictMode = i, e.Suspense = l, e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = se, e.act = ce, e.cloneElement = function(e, n, r) {
		if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
		var i = h({}, e.props), a = e.key, o = e.ref, s = e._owner;
		if (n != null) {
			if (n.ref !== void 0 && (o = n.ref, s = C.current), n.key !== void 0 && (a = "" + n.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
			for (l in n) S.call(n, l) && !w.hasOwnProperty(l) && (i[l] = n[l] === void 0 && c !== void 0 ? c[l] : n[l]);
		}
		var l = arguments.length - 2;
		if (l === 1) i.children = r;
		else if (1 < l) {
			c = Array(l);
			for (var u = 0; u < l; u++) c[u] = arguments[u + 2];
			i.children = c;
		}
		return {
			$$typeof: t,
			type: e.type,
			key: a,
			ref: o,
			props: i,
			_owner: s
		};
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null,
			_defaultValue: null,
			_globalName: null
		}, e.Provider = {
			$$typeof: o,
			_context: e
		}, e.Consumer = e;
	}, e.createElement = T, e.createFactory = function(e) {
		var t = T.bind(null, e);
		return t.type = e, t;
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = ee, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ae
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = oe.transition;
		oe.transition = {};
		try {
			e();
		} finally {
			oe.transition = t;
		}
	}, e.unstable_act = ce, e.useCallback = function(e, t) {
		return O.current.useCallback(e, t);
	}, e.useContext = function(e) {
		return O.current.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e) {
		return O.current.useDeferredValue(e);
	}, e.useEffect = function(e, t) {
		return O.current.useEffect(e, t);
	}, e.useId = function() {
		return O.current.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return O.current.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return O.current.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return O.current.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return O.current.useMemo(e, t);
	}, e.useReducer = function(e, t, n) {
		return O.current.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return O.current.useRef(e);
	}, e.useState = function(e) {
		return O.current.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return O.current.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return O.current.useTransition();
	}, e.version = "18.3.1";
})), d = /* @__PURE__ */ o(((e, t) => {
	t.exports = u();
})), f = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = typeof setTimeout == "function" ? setTimeout : null, _ = typeof clearTimeout == "function" ? clearTimeout : null, v = typeof setImmediate < "u" ? setImmediate : null;
	typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
	function y(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function b(e) {
		if (h = !1, y(e), !m) {
			if (n(c) !== null) m = !0, ie(x);
			else {
				var t = n(l);
				t !== null && ae(b, t.startTime - e);
			}
		}
	}
	function x(t, i) {
		m = !1, h && (h = !1, _(w), w = -1), p = !0;
		var a = f;
		try {
			for (y(i), d = n(c); d !== null && (!(d.expirationTime > i) || t && !ee());) {
				var o = d.callback;
				if (typeof o == "function") {
					d.callback = null, f = d.priorityLevel;
					var s = o(d.expirationTime <= i);
					i = e.unstable_now(), typeof s == "function" ? d.callback = s : d === n(c) && r(c), y(i);
				} else r(c);
				d = n(c);
			}
			if (d !== null) var u = !0;
			else {
				var g = n(l);
				g !== null && ae(b, g.startTime - i), u = !1;
			}
			return u;
		} finally {
			d = null, f = a, p = !1;
		}
	}
	var S = !1, C = null, w = -1, T = 5, E = -1;
	function ee() {
		return !(e.unstable_now() - E < T);
	}
	function D() {
		if (C !== null) {
			var t = e.unstable_now();
			E = t;
			var n = !0;
			try {
				n = C(!0, t);
			} finally {
				n ? te() : (S = !1, C = null);
			}
		} else S = !1;
	}
	var te;
	if (typeof v == "function") te = function() {
		v(D);
	};
	else if (typeof MessageChannel < "u") {
		var ne = new MessageChannel(), re = ne.port2;
		ne.port1.onmessage = D, te = function() {
			re.postMessage(null);
		};
	} else te = function() {
		g(D, 0);
	};
	function ie(e) {
		C = e, S || (S = !0, te());
	}
	function ae(t, n) {
		w = g(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_continueExecution = function() {
		m || p || (m = !0, ie(x));
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : T = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_getFirstCallbackNode = function() {
		return n(c);
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (_(w), w = -1) : h = !0, ae(b, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ie(x))), r;
	}, e.unstable_shouldYield = ee, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), p = /* @__PURE__ */ o(((e, t) => {
	t.exports = f();
})), m = /* @__PURE__ */ o(((e) => {
	var t = d(), n = p();
	function r(e) {
		for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var i = /* @__PURE__ */ new Set(), a = {};
	function o(e, t) {
		s(e, t), s(e + "Capture", t);
	}
	function s(e, t) {
		for (a[e] = t, e = 0; e < t.length; e++) i.add(t[e]);
	}
	var c = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, l = Object.prototype.hasOwnProperty, u = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, f = {}, m = {};
	function h(e) {
		return l.call(m, e) ? !0 : l.call(f, e) ? !1 : u.test(e) ? m[e] = !0 : (f[e] = !0, !1);
	}
	function g(e, t, n, r) {
		if (n !== null && n.type === 0) return !1;
		switch (typeof t) {
			case "function":
			case "symbol": return !0;
			case "boolean": return r ? !1 : n === null ? (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-") : !n.acceptsBooleans;
			default: return !1;
		}
	}
	function _(e, t, n, r) {
		if (t == null || g(e, t, n, r)) return !0;
		if (r) return !1;
		if (n !== null) switch (n.type) {
			case 3: return !t;
			case 4: return !1 === t;
			case 5: return isNaN(t);
			case 6: return isNaN(t) || 1 > t;
		}
		return !1;
	}
	function v(e, t, n, r, i, a, o) {
		this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = a, this.removeEmptyString = o;
	}
	var y = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
		y[e] = new v(e, 0, !1, e, null, !1, !1);
	}), [
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"]
	].forEach(function(e) {
		var t = e[0];
		y[t] = new v(t, 1, !1, e[1], null, !1, !1);
	}), [
		"contentEditable",
		"draggable",
		"spellCheck",
		"value"
	].forEach(function(e) {
		y[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1);
	}), [
		"autoReverse",
		"externalResourcesRequired",
		"focusable",
		"preserveAlpha"
	].forEach(function(e) {
		y[e] = new v(e, 2, !1, e, null, !1, !1);
	}), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
		y[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1);
	}), [
		"checked",
		"multiple",
		"muted",
		"selected"
	].forEach(function(e) {
		y[e] = new v(e, 3, !0, e, null, !1, !1);
	}), ["capture", "download"].forEach(function(e) {
		y[e] = new v(e, 4, !1, e, null, !1, !1);
	}), [
		"cols",
		"rows",
		"size",
		"span"
	].forEach(function(e) {
		y[e] = new v(e, 6, !1, e, null, !1, !1);
	}), ["rowSpan", "start"].forEach(function(e) {
		y[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1);
	});
	var b = /[\-:]([a-z])/g;
	function x(e) {
		return e[1].toUpperCase();
	}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, null, !1, !1);
	}), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
	}), [
		"xml:base",
		"xml:lang",
		"xml:space"
	].forEach(function(e) {
		var t = e.replace(b, x);
		y[t] = new v(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
	}), ["tabIndex", "crossOrigin"].forEach(function(e) {
		y[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1);
	}), y.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), [
		"src",
		"href",
		"action",
		"formAction"
	].forEach(function(e) {
		y[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0);
	});
	function S(e, t, n, r) {
		var i = y.hasOwnProperty(t) ? y[t] : null;
		(i === null ? r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N" : i.type !== 0) && (_(t, n, i, r) && (n = null), r || i === null ? h(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type !== 3 && "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
	}
	var C = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, w = Symbol.for("react.element"), T = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), ee = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), te = Symbol.for("react.provider"), ne = Symbol.for("react.context"), re = Symbol.for("react.forward_ref"), ie = Symbol.for("react.suspense"), ae = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), oe = Symbol.for("react.lazy"), se = Symbol.for("react.offscreen"), ce = Symbol.iterator;
	function le(e) {
		return typeof e != "object" || !e ? null : (e = ce && e[ce] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ue = Object.assign, de;
	function fe(e) {
		if (de === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			de = t && t[1] || "";
		}
		return "\n" + de + e;
	}
	var pe = !1;
	function me(e, t) {
		if (!e || pe) return "";
		pe = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			if (t) {
				if (t = function() {
					throw Error();
				}, Object.defineProperty(t.prototype, "props", { set: function() {
					throw Error();
				} }), typeof Reflect == "object" && Reflect.construct) {
					try {
						Reflect.construct(t, []);
					} catch (e) {
						var r = e;
					}
					Reflect.construct(e, [], t);
				} else {
					try {
						t.call();
					} catch (e) {
						r = e;
					}
					e.call(t.prototype);
				}
			} else {
				try {
					throw Error();
				} catch (e) {
					r = e;
				}
				e();
			}
		} catch (t) {
			if (t && r && typeof t.stack == "string") {
				for (var i = t.stack.split("\n"), a = r.stack.split("\n"), o = i.length - 1, s = a.length - 1; 1 <= o && 0 <= s && i[o] !== a[s];) s--;
				for (; 1 <= o && 0 <= s; o--, s--) if (i[o] !== a[s]) {
					if (o !== 1 || s !== 1) do
						if (o--, s--, 0 > s || i[o] !== a[s]) {
							var c = "\n" + i[o].replace(" at new ", " at ");
							return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
						}
					while (1 <= o && 0 <= s);
					break;
				}
			}
		} finally {
			pe = !1, Error.prepareStackTrace = n;
		}
		return (e = e ? e.displayName || e.name : "") ? fe(e) : "";
	}
	function he(e) {
		switch (e.tag) {
			case 5: return fe(e.type);
			case 16: return fe("Lazy");
			case 13: return fe("Suspense");
			case 19: return fe("SuspenseList");
			case 0:
			case 2:
			case 15: return e = me(e.type, !1), e;
			case 11: return e = me(e.type.render, !1), e;
			case 1: return e = me(e.type, !0), e;
			default: return "";
		}
	}
	function ge(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case E: return "Fragment";
			case T: return "Portal";
			case D: return "Profiler";
			case ee: return "StrictMode";
			case ie: return "Suspense";
			case ae: return "SuspenseList";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case ne: return (e.displayName || "Context") + ".Consumer";
			case te: return (e._context.displayName || "Context") + ".Provider";
			case re:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case O: return t = e.displayName || null, t === null ? ge(e.type) || "Memo" : t;
			case oe:
				t = e._payload, e = e._init;
				try {
					return ge(e(t));
				} catch {}
		}
		return null;
	}
	function _e(e) {
		var t = e.type;
		switch (e.tag) {
			case 24: return "Cache";
			case 9: return (t.displayName || "Context") + ".Consumer";
			case 10: return (t._context.displayName || "Context") + ".Provider";
			case 18: return "DehydratedFragment";
			case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
			case 7: return "Fragment";
			case 5: return t;
			case 4: return "Portal";
			case 3: return "Root";
			case 6: return "Text";
			case 16: return ge(t);
			case 8: return t === ee ? "StrictMode" : "Mode";
			case 22: return "Offscreen";
			case 12: return "Profiler";
			case 21: return "Scope";
			case 13: return "Suspense";
			case 19: return "SuspenseList";
			case 25: return "TracingMarker";
			case 1:
			case 0:
			case 17:
			case 2:
			case 14:
			case 15:
				if (typeof t == "function") return t.displayName || t.name || null;
				if (typeof t == "string") return t;
		}
		return null;
	}
	function ve(e) {
		switch (typeof e) {
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function ye(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function be(e) {
		var t = ye(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
		if (!e.hasOwnProperty(t) && n !== void 0 && typeof n.get == "function" && typeof n.set == "function") {
			var i = n.get, a = n.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					r = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: n.enumerable }), {
				getValue: function() {
					return r;
				},
				setValue: function(e) {
					r = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function xe(e) {
		e._valueTracker ||= be(e);
	}
	function Se(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = ye(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Ce(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function we(e, t) {
		var n = t.checked;
		return ue({}, t, {
			defaultChecked: void 0,
			defaultValue: void 0,
			value: void 0,
			checked: n ?? e._wrapperState.initialChecked
		});
	}
	function Te(e, t) {
		var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked == null ? t.defaultChecked : t.checked;
		n = ve(t.value == null ? n : t.value), e._wrapperState = {
			initialChecked: r,
			initialValue: n,
			controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
		};
	}
	function Ee(e, t) {
		t = t.checked, t != null && S(e, "checked", t, !1);
	}
	function De(e, t) {
		Ee(e, t);
		var n = ve(t.value), r = t.type;
		if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
		else if (r === "submit" || r === "reset") {
			e.removeAttribute("value");
			return;
		}
		t.hasOwnProperty("value") ? Oe(e, t.type, n) : t.hasOwnProperty("defaultValue") && Oe(e, t.type, ve(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
	}
	function k(e, t, n) {
		if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
			var r = t.type;
			if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
			t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
		}
		n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
	}
	function Oe(e, t, n) {
		(t !== "number" || Ce(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
	}
	var ke = Array.isArray;
	function Ae(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + ve(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function je(e, t) {
		if (t.dangerouslySetInnerHTML != null) throw Error(r(91));
		return ue({}, t, {
			value: void 0,
			defaultValue: void 0,
			children: "" + e._wrapperState.initialValue
		});
	}
	function Me(e, t) {
		var n = t.value;
		if (n == null) {
			if (n = t.children, t = t.defaultValue, n != null) {
				if (t != null) throw Error(r(92));
				if (ke(n)) {
					if (1 < n.length) throw Error(r(93));
					n = n[0];
				}
				t = n;
			}
			t ??= "", n = t;
		}
		e._wrapperState = { initialValue: ve(n) };
	}
	function Ne(e, t) {
		var n = ve(t.value), r = ve(t.defaultValue);
		n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
	}
	function Pe(e) {
		var t = e.textContent;
		t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
	}
	function Fe(e) {
		switch (e) {
			case "svg": return "http://www.w3.org/2000/svg";
			case "math": return "http://www.w3.org/1998/Math/MathML";
			default: return "http://www.w3.org/1999/xhtml";
		}
	}
	function Ie(e, t) {
		return e == null || e === "http://www.w3.org/1999/xhtml" ? Fe(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
	}
	var Le, Re = function(e) {
		return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
			MSApp.execUnsafeLocalFunction(function() {
				return e(t, n, r, i);
			});
		} : e;
	}(function(e, t) {
		if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
		else {
			for (Le ||= document.createElement("div"), Le.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Le.firstChild; e.firstChild;) e.removeChild(e.firstChild);
			for (; t.firstChild;) e.appendChild(t.firstChild);
		}
	});
	function ze(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Be = {
		animationIterationCount: !0,
		aspectRatio: !0,
		borderImageOutset: !0,
		borderImageSlice: !0,
		borderImageWidth: !0,
		boxFlex: !0,
		boxFlexGroup: !0,
		boxOrdinalGroup: !0,
		columnCount: !0,
		columns: !0,
		flex: !0,
		flexGrow: !0,
		flexPositive: !0,
		flexShrink: !0,
		flexNegative: !0,
		flexOrder: !0,
		gridArea: !0,
		gridRow: !0,
		gridRowEnd: !0,
		gridRowSpan: !0,
		gridRowStart: !0,
		gridColumn: !0,
		gridColumnEnd: !0,
		gridColumnSpan: !0,
		gridColumnStart: !0,
		fontWeight: !0,
		lineClamp: !0,
		lineHeight: !0,
		opacity: !0,
		order: !0,
		orphans: !0,
		tabSize: !0,
		widows: !0,
		zIndex: !0,
		zoom: !0,
		fillOpacity: !0,
		floodOpacity: !0,
		stopOpacity: !0,
		strokeDasharray: !0,
		strokeDashoffset: !0,
		strokeMiterlimit: !0,
		strokeOpacity: !0,
		strokeWidth: !0
	}, Ve = [
		"Webkit",
		"ms",
		"Moz",
		"O"
	];
	Object.keys(Be).forEach(function(e) {
		Ve.forEach(function(t) {
			t = t + e.charAt(0).toUpperCase() + e.substring(1), Be[t] = Be[e];
		});
	});
	function He(e, t, n) {
		return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Be.hasOwnProperty(e) && Be[e] ? ("" + t).trim() : t + "px";
	}
	function Ue(e, t) {
		for (var n in e = e.style, t) if (t.hasOwnProperty(n)) {
			var r = n.indexOf("--") === 0, i = He(n, t[n], r);
			n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i;
		}
	}
	var We = ue({ menuitem: !0 }, {
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		keygen: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0
	});
	function Ge(e, t) {
		if (t) {
			if (We[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(r(137, e));
			if (t.dangerouslySetInnerHTML != null) {
				if (t.children != null) throw Error(r(60));
				if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(r(61));
			}
			if (t.style != null && typeof t.style != "object") throw Error(r(62));
		}
	}
	function Ke(e, t) {
		if (e.indexOf("-") === -1) return typeof t.is == "string";
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var qe = null;
	function Je(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Ye = null, Xe = null, Ze = null;
	function Qe(e) {
		if (e = Ji(e)) {
			if (typeof Ye != "function") throw Error(r(280));
			var t = e.stateNode;
			t && (t = Xi(t), Ye(e.stateNode, e.type, t));
		}
	}
	function $e(e) {
		Xe ? Ze ? Ze.push(e) : Ze = [e] : Xe = e;
	}
	function et() {
		if (Xe) {
			var e = Xe, t = Ze;
			if (Ze = Xe = null, Qe(e), t) for (e = 0; e < t.length; e++) Qe(t[e]);
		}
	}
	function tt(e, t) {
		return e(t);
	}
	function nt() {}
	var rt = !1;
	function it(e, t, n) {
		if (rt) return e(t, n);
		rt = !0;
		try {
			return tt(e, t, n);
		} finally {
			rt = !1, (Xe !== null || Ze !== null) && (nt(), et());
		}
	}
	function at(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var i = Xi(n);
		if (i === null) return null;
		n = i[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(i = !i.disabled) || (e = e.type, i = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !i;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(r(231, t, typeof n));
		return n;
	}
	var ot = !1;
	if (c) try {
		var st = {};
		Object.defineProperty(st, "passive", { get: function() {
			ot = !0;
		} }), window.addEventListener("test", st, st), window.removeEventListener("test", st, st);
	} catch {
		ot = !1;
	}
	function ct(e, t, n, r, i, a, o, s, c) {
		var l = Array.prototype.slice.call(arguments, 3);
		try {
			t.apply(n, l);
		} catch (e) {
			this.onError(e);
		}
	}
	var lt = !1, ut = null, dt = !1, ft = null, pt = { onError: function(e) {
		lt = !0, ut = e;
	} };
	function mt(e, t, n, r, i, a, o, s, c) {
		lt = !1, ut = null, ct.apply(pt, arguments);
	}
	function ht(e, t, n, i, a, o, s, c, l) {
		if (mt.apply(this, arguments), lt) {
			if (lt) {
				var u = ut;
				lt = !1, ut = null;
			} else throw Error(r(198));
			dt || (dt = !0, ft = u);
		}
	}
	function gt(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function _t(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function vt(e) {
		if (gt(e) !== e) throw Error(r(188));
	}
	function yt(e) {
		var t = e.alternate;
		if (!t) {
			if (t = gt(e), t === null) throw Error(r(188));
			return t === e ? e : null;
		}
		for (var n = e, i = t;;) {
			var a = n.return;
			if (a === null) break;
			var o = a.alternate;
			if (o === null) {
				if (i = a.return, i !== null) {
					n = i;
					continue;
				}
				break;
			}
			if (a.child === o.child) {
				for (o = a.child; o;) {
					if (o === n) return vt(a), e;
					if (o === i) return vt(a), t;
					o = o.sibling;
				}
				throw Error(r(188));
			}
			if (n.return !== i.return) n = a, i = o;
			else {
				for (var s = !1, c = a.child; c;) {
					if (c === n) {
						s = !0, n = a, i = o;
						break;
					}
					if (c === i) {
						s = !0, i = a, n = o;
						break;
					}
					c = c.sibling;
				}
				if (!s) {
					for (c = o.child; c;) {
						if (c === n) {
							s = !0, n = o, i = a;
							break;
						}
						if (c === i) {
							s = !0, i = o, n = a;
							break;
						}
						c = c.sibling;
					}
					if (!s) throw Error(r(189));
				}
			}
			if (n.alternate !== i) throw Error(r(190));
		}
		if (n.tag !== 3) throw Error(r(188));
		return n.stateNode.current === n ? e : t;
	}
	function bt(e) {
		return e = yt(e), e === null ? null : xt(e);
	}
	function xt(e) {
		if (e.tag === 5 || e.tag === 6) return e;
		for (e = e.child; e !== null;) {
			var t = xt(e);
			if (t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var St = n.unstable_scheduleCallback, Ct = n.unstable_cancelCallback, wt = n.unstable_shouldYield, Tt = n.unstable_requestPaint, Et = n.unstable_now, Dt = n.unstable_getCurrentPriorityLevel, Ot = n.unstable_ImmediatePriority, kt = n.unstable_UserBlockingPriority, At = n.unstable_NormalPriority, jt = n.unstable_LowPriority, Mt = n.unstable_IdlePriority, Nt = null, Pt = null;
	function Ft(e) {
		if (Pt && typeof Pt.onCommitFiberRoot == "function") try {
			Pt.onCommitFiberRoot(Nt, e, void 0, (e.current.flags & 128) == 128);
		} catch {}
	}
	var It = Math.clz32 ? Math.clz32 : zt, Lt = Math.log, Rt = Math.LN2;
	function zt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Lt(e) / Rt | 0) | 0;
	}
	var Bt = 64, Vt = 4194304;
	function Ht(e) {
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 4194240;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return e & 130023424;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 1073741824;
			default: return e;
		}
	}
	function Ut(e, t) {
		var n = e.pendingLanes;
		if (n === 0) return 0;
		var r = 0, i = e.suspendedLanes, a = e.pingedLanes, o = n & 268435455;
		if (o !== 0) {
			var s = o & ~i;
			s === 0 ? (a &= o, a !== 0 && (r = Ht(a))) : r = Ht(s);
		} else o = n & ~i, o === 0 ? a !== 0 && (r = Ht(a)) : r = Ht(o);
		if (r === 0) return 0;
		if (t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, a = t & -t, i >= a || i === 16 && a & 4194240)) return t;
		if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t;) n = 31 - It(t), i = 1 << n, r |= e[n], t &= ~i;
		return r;
	}
	function Wt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4: return t + 250;
			case 8:
			case 16:
			case 32:
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864: return -1;
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Gt(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes; 0 < a;) {
			var o = 31 - It(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Wt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
	}
	function Kt(e) {
		return e = e.pendingLanes & -1073741825, e === 0 ? e & 1073741824 ? 1073741824 : 0 : e;
	}
	function A() {
		var e = Bt;
		return Bt <<= 1, !(Bt & 4194240) && (Bt = 64), e;
	}
	function qt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Jt(e, t, n) {
		e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - It(t), e[t] = n;
	}
	function j(e, t) {
		var n = e.pendingLanes & ~t;
		e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
		var r = e.eventTimes;
		for (e = e.expirationTimes; 0 < n;) {
			var i = 31 - It(n), a = 1 << i;
			t[i] = 0, r[i] = -1, e[i] = -1, n &= ~a;
		}
	}
	function Yt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - It(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	var Xt = 0;
	function Zt(e) {
		return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
	}
	var Qt, $t, en, tn, nn, rn = !1, an = [], on = null, sn = null, cn = null, ln = /* @__PURE__ */ new Map(), un = /* @__PURE__ */ new Map(), dn = [], fn = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
	function pn(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				on = null;
				break;
			case "dragenter":
			case "dragleave":
				sn = null;
				break;
			case "mouseover":
			case "mouseout":
				cn = null;
				break;
			case "pointerover":
			case "pointerout":
				ln.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": un.delete(t.pointerId);
		}
	}
	function mn(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Ji(t), t !== null && $t(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function hn(e, t, n, r, i) {
		switch (t) {
			case "focusin": return on = mn(on, e, t, n, r, i), !0;
			case "dragenter": return sn = mn(sn, e, t, n, r, i), !0;
			case "mouseover": return cn = mn(cn, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return ln.set(a, mn(ln.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, un.set(a, mn(un.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function gn(e) {
		var t = qi(e.target);
		if (t !== null) {
			var n = gt(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = _t(n), t !== null) {
						e.blockedOn = t, nn(e.priority, function() {
							en(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function _n(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = On(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				qe = r, n.target.dispatchEvent(r), qe = null;
			} else return t = Ji(n), t !== null && $t(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function vn(e, t, n) {
		_n(e) && n.delete(t);
	}
	function yn() {
		rn = !1, on !== null && _n(on) && (on = null), sn !== null && _n(sn) && (sn = null), cn !== null && _n(cn) && (cn = null), ln.forEach(vn), un.forEach(vn);
	}
	function bn(e, t) {
		e.blockedOn === t && (e.blockedOn = null, rn || (rn = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, yn)));
	}
	function xn(e) {
		function t(t) {
			return bn(t, e);
		}
		if (0 < an.length) {
			bn(an[0], e);
			for (var n = 1; n < an.length; n++) {
				var r = an[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
		}
		for (on !== null && bn(on, e), sn !== null && bn(sn, e), cn !== null && bn(cn, e), ln.forEach(t), un.forEach(t), n = 0; n < dn.length; n++) r = dn[n], r.blockedOn === e && (r.blockedOn = null);
		for (; 0 < dn.length && (n = dn[0], n.blockedOn === null);) gn(n), n.blockedOn === null && dn.shift();
	}
	var Sn = C.ReactCurrentBatchConfig, Cn = !0;
	function wn(e, t, n, r) {
		var i = Xt, a = Sn.transition;
		Sn.transition = null;
		try {
			Xt = 1, En(e, t, n, r);
		} finally {
			Xt = i, Sn.transition = a;
		}
	}
	function Tn(e, t, n, r) {
		var i = Xt, a = Sn.transition;
		Sn.transition = null;
		try {
			Xt = 4, En(e, t, n, r);
		} finally {
			Xt = i, Sn.transition = a;
		}
	}
	function En(e, t, n, r) {
		if (Cn) {
			var i = On(e, t, n, r);
			if (i === null) yi(e, t, r, Dn, n), pn(e, r);
			else if (hn(i, e, t, n, r)) r.stopPropagation();
			else if (pn(e, r), t & 4 && -1 < fn.indexOf(e)) {
				for (; i !== null;) {
					var a = Ji(i);
					if (a !== null && Qt(a), a = On(e, t, n, r), a === null && yi(e, t, r, Dn, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else yi(e, t, r, null, n);
		}
	}
	var Dn = null;
	function On(e, t, n, r) {
		if (Dn = null, e = Je(r), e = qi(e), e !== null) {
			if (t = gt(e), t === null) e = null;
			else if (n = t.tag, n === 13) {
				if (e = _t(t), e !== null) return e;
				e = null;
			} else if (n === 3) {
				if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
				e = null;
			} else t !== e && (e = null);
		}
		return Dn = e, null;
	}
	function kn(e) {
		switch (e) {
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 1;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "toggle":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 4;
			case "message": switch (Dt()) {
				case Ot: return 1;
				case kt: return 4;
				case At:
				case jt: return 16;
				case Mt: return 536870912;
				default: return 16;
			}
			default: return 16;
		}
	}
	var An = null, jn = null, Mn = null;
	function Nn() {
		if (Mn) return Mn;
		var e, t = jn, n = t.length, r, i = "value" in An ? An.value : An.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Mn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Pn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Fn() {
		return !0;
	}
	function In() {
		return !1;
	}
	function Ln(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Fn : In, this.isPropagationStopped = In, this;
		}
		return ue(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Fn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Fn);
			},
			persist: function() {},
			isPersistent: Fn
		}), t;
	}
	var Rn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, zn = Ln(Rn), Bn = ue({}, Rn, {
		view: 0,
		detail: 0
	}), Vn = Ln(Bn), Hn, Un, Wn, Gn = ue({}, Bn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: nr,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Wn && (Wn && e.type === "mousemove" ? (Hn = e.screenX - Wn.screenX, Un = e.screenY - Wn.screenY) : Un = Hn = 0, Wn = e), Hn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Un;
		}
	}), Kn = Ln(Gn), qn = Ln(ue({}, Gn, { dataTransfer: 0 })), Jn = Ln(ue({}, Bn, { relatedTarget: 0 })), Yn = Ln(ue({}, Rn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Xn = Ln(ue({}, Rn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Zn = Ln(ue({}, Rn, { data: 0 })), Qn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, $n = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, er = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function tr(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = er[e]) ? !!t[e] : !1;
	}
	function nr() {
		return tr;
	}
	var rr = Ln(ue({}, Bn, {
		key: function(e) {
			if (e.key) {
				var t = Qn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Pn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? $n[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: nr,
		charCode: function(e) {
			return e.type === "keypress" ? Pn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Pn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), ir = Ln(ue({}, Gn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), ar = Ln(ue({}, Bn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: nr
	})), or = Ln(ue({}, Rn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), sr = Ln(ue({}, Gn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), cr = [
		9,
		13,
		27,
		32
	], lr = c && "CompositionEvent" in window, ur = null;
	c && "documentMode" in document && (ur = document.documentMode);
	var dr = c && "TextEvent" in window && !ur, fr = c && (!lr || ur && 8 < ur && 11 >= ur), pr = " ", mr = !1;
	function hr(e, t) {
		switch (e) {
			case "keyup": return cr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function gr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var _r = !1;
	function vr(e, t) {
		switch (e) {
			case "compositionend": return gr(t);
			case "keypress": return t.which === 32 ? (mr = !0, pr) : null;
			case "textInput": return e = t.data, e === pr && mr ? null : e;
			default: return null;
		}
	}
	function yr(e, t) {
		if (_r) return e === "compositionend" || !lr && hr(e, t) ? (e = Nn(), Mn = jn = An = null, _r = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return fr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var br = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function xr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!br[e.type] : t === "textarea";
	}
	function Sr(e, t, n, r) {
		$e(r), t = xi(t, "onChange"), 0 < t.length && (n = new zn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var Cr = null, wr = null;
	function Tr(e) {
		pi(e, 0);
	}
	function Er(e) {
		if (Se(Yi(e))) return e;
	}
	function Dr(e, t) {
		if (e === "change") return t;
	}
	var Or = !1;
	if (c) {
		var kr;
		if (c) {
			var Ar = "oninput" in document;
			if (!Ar) {
				var jr = document.createElement("div");
				jr.setAttribute("oninput", "return;"), Ar = typeof jr.oninput == "function";
			}
			kr = Ar;
		} else kr = !1;
		Or = kr && (!document.documentMode || 9 < document.documentMode);
	}
	function Mr() {
		Cr && (Cr.detachEvent("onpropertychange", Nr), wr = Cr = null);
	}
	function Nr(e) {
		if (e.propertyName === "value" && Er(wr)) {
			var t = [];
			Sr(t, wr, e, Je(e)), it(Tr, t);
		}
	}
	function M(e, t, n) {
		e === "focusin" ? (Mr(), Cr = t, wr = n, Cr.attachEvent("onpropertychange", Nr)) : e === "focusout" && Mr();
	}
	function Pr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Er(wr);
	}
	function N(e, t) {
		if (e === "click") return Er(t);
	}
	function Fr(e, t) {
		if (e === "input" || e === "change") return Er(t);
	}
	function Ir(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Lr = typeof Object.is == "function" ? Object.is : Ir;
	function Rr(e, t) {
		if (Lr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!l.call(t, i) || !Lr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function P(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function zr(e, t) {
		var n = P(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = P(n);
		}
	}
	function Br(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Br(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Vr() {
		for (var e = window, t = Ce(); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Ce(e.document);
		}
		return t;
	}
	function Hr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	function Ur(e) {
		var t = Vr(), n = e.focusedElem, r = e.selectionRange;
		if (t !== n && n && n.ownerDocument && Br(n.ownerDocument.documentElement, n)) {
			if (r !== null && Hr(n)) {
				if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
				else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
					e = e.getSelection();
					var i = n.textContent.length, a = Math.min(r.start, i);
					r = r.end === void 0 ? a : Math.min(r.end, i), !e.extend && a > r && (i = r, r = a, a = i), i = zr(n, a);
					var o = zr(n, r);
					i && o && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), a > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
				}
			}
			for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
				element: e,
				left: e.scrollLeft,
				top: e.scrollTop
			});
			for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
		}
	}
	var Wr = c && "documentMode" in document && 11 >= document.documentMode, Gr = null, Kr = null, qr = null, Jr = !1;
	function Yr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Jr || Gr == null || Gr !== Ce(r) || (r = Gr, "selectionStart" in r && Hr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), qr && Rr(qr, r) || (qr = r, r = xi(Kr, "onSelect"), 0 < r.length && (t = new zn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Gr)));
	}
	function Xr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Zr = {
		animationend: Xr("Animation", "AnimationEnd"),
		animationiteration: Xr("Animation", "AnimationIteration"),
		animationstart: Xr("Animation", "AnimationStart"),
		transitionend: Xr("Transition", "TransitionEnd")
	}, Qr = {}, $r = {};
	c && ($r = document.createElement("div").style, "AnimationEvent" in window || (delete Zr.animationend.animation, delete Zr.animationiteration.animation, delete Zr.animationstart.animation), "TransitionEvent" in window || delete Zr.transitionend.transition);
	function ei(e) {
		if (Qr[e]) return Qr[e];
		if (!Zr[e]) return e;
		var t = Zr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in $r) return Qr[e] = t[n];
		return e;
	}
	var ti = ei("animationend"), ni = ei("animationiteration"), ri = ei("animationstart"), ii = ei("transitionend"), ai = /* @__PURE__ */ new Map(), oi = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	function si(e, t) {
		ai.set(e, t), o(t, [e]);
	}
	for (var ci = 0; ci < oi.length; ci++) {
		var li = oi[ci];
		si(li.toLowerCase(), "on" + (li[0].toUpperCase() + li.slice(1)));
	}
	si(ti, "onAnimationEnd"), si(ni, "onAnimationIteration"), si(ri, "onAnimationStart"), si("dblclick", "onDoubleClick"), si("focusin", "onFocus"), si("focusout", "onBlur"), si(ii, "onTransitionEnd"), s("onMouseEnter", ["mouseout", "mouseover"]), s("onMouseLeave", ["mouseout", "mouseover"]), s("onPointerEnter", ["pointerout", "pointerover"]), s("onPointerLeave", ["pointerout", "pointerover"]), o("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), o("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), o("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), o("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), o("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), o("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var ui = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), di = new Set("cancel close invalid load scroll toggle".split(" ").concat(ui));
	function fi(e, t, n) {
		var r = e.type || "unknown-event";
		e.currentTarget = n, ht(r, t, void 0, e), e.currentTarget = null;
	}
	function pi(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					fi(i, s, l), a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					fi(i, s, l), a = c;
				}
			}
		}
		if (dt) throw e = ft, dt = !1, ft = null, e;
	}
	function mi(e, t) {
		var n = t[Wi];
		n === void 0 && (n = t[Wi] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (vi(t, e, 2, !1), n.add(r));
	}
	function hi(e, t, n) {
		var r = 0;
		t && (r |= 4), vi(n, e, r, t);
	}
	var gi = "_reactListening" + Math.random().toString(36).slice(2);
	function _i(e) {
		if (!e[gi]) {
			e[gi] = !0, i.forEach(function(t) {
				t !== "selectionchange" && (di.has(t) || hi(t, !1, e), hi(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[gi] || (t[gi] = !0, hi("selectionchange", !1, t));
		}
	}
	function vi(e, t, n, r) {
		switch (kn(t)) {
			case 1:
				var i = wn;
				break;
			case 4:
				i = Tn;
				break;
			default: i = En;
		}
		n = i.bind(null, t, n, e), i = void 0, !ot || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function yi(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var o = r.tag;
			if (o === 3 || o === 4) {
				var s = r.stateNode.containerInfo;
				if (s === i || s.nodeType === 8 && s.parentNode === i) break;
				if (o === 4) for (o = r.return; o !== null;) {
					var c = o.tag;
					if ((c === 3 || c === 4) && (c = o.stateNode.containerInfo, c === i || c.nodeType === 8 && c.parentNode === i)) return;
					o = o.return;
				}
				for (; s !== null;) {
					if (o = qi(s), o === null) return;
					if (c = o.tag, c === 5 || c === 6) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		it(function() {
			var r = a, i = Je(n), o = [];
			a: {
				var s = ai.get(e);
				if (s !== void 0) {
					var c = zn, l = e;
					switch (e) {
						case "keypress": if (Pn(n) === 0) break a;
						case "keydown":
						case "keyup":
							c = rr;
							break;
						case "focusin":
							l = "focus", c = Jn;
							break;
						case "focusout":
							l = "blur", c = Jn;
							break;
						case "beforeblur":
						case "afterblur":
							c = Jn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							c = Kn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							c = qn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							c = ar;
							break;
						case ti:
						case ni:
						case ri:
							c = Yn;
							break;
						case ii:
							c = or;
							break;
						case "scroll":
							c = Vn;
							break;
						case "wheel":
							c = sr;
							break;
						case "copy":
						case "cut":
						case "paste":
							c = Xn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup": c = ir;
					}
					var u = !!(t & 4), d = !u && e === "scroll", f = u ? s === null ? null : s + "Capture" : s;
					u = [];
					for (var p = r, m; p !== null;) {
						m = p;
						var h = m.stateNode;
						if (m.tag === 5 && h !== null && (m = h, f !== null && (h = at(p, f), h != null && u.push(bi(p, h, m)))), d) break;
						p = p.return;
					}
					0 < u.length && (s = new c(s, l, null, n, i), o.push({
						event: s,
						listeners: u
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== qe && (l = n.relatedTarget || n.fromElement) && (qi(l) || l[Ui])) break a;
					if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? qi(l) : null, l !== null && (d = gt(l), l !== d || l.tag !== 5 && l.tag !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
						if (u = Kn, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = ir, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : Yi(c), m = l == null ? s : Yi(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, qi(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
							for (u = c, f = l, p = 0, m = u; m; m = Si(m)) p++;
							for (m = 0, h = f; h; h = Si(h)) m++;
							for (; 0 < p - m;) u = Si(u), p--;
							for (; 0 < m - p;) f = Si(f), m--;
							for (; p--;) {
								if (u === f || f !== null && u === f.alternate) break b;
								u = Si(u), f = Si(f);
							}
							u = null;
						}
						else u = null;
						c !== null && Ci(o, s, c, u, !1), l !== null && d !== null && Ci(o, d, l, u, !0);
					}
				}
				a: {
					if (s = r ? Yi(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var g = Dr;
					else if (xr(s)) {
						if (Or) g = Fr;
						else {
							g = Pr;
							var _ = M;
						}
					} else (c = s.nodeName) && c.toLowerCase() === "input" && (s.type === "checkbox" || s.type === "radio") && (g = N);
					if (g &&= g(e, r)) {
						Sr(o, g, n, i);
						break a;
					}
					_ && _(e, s, r), e === "focusout" && (_ = s._wrapperState) && _.controlled && s.type === "number" && Oe(s, "number", s.value);
				}
				switch (_ = r ? Yi(r) : window, e) {
					case "focusin":
						(xr(_) || _.contentEditable === "true") && (Gr = _, Kr = r, qr = null);
						break;
					case "focusout":
						qr = Kr = Gr = null;
						break;
					case "mousedown":
						Jr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Jr = !1, Yr(o, n, i);
						break;
					case "selectionchange": if (Wr) break;
					case "keydown":
					case "keyup": Yr(o, n, i);
				}
				var v;
				if (lr) b: {
					switch (e) {
						case "compositionstart":
							var y = "onCompositionStart";
							break b;
						case "compositionend":
							y = "onCompositionEnd";
							break b;
						case "compositionupdate":
							y = "onCompositionUpdate";
							break b;
					}
					y = void 0;
				}
				else _r ? hr(e, n) && (y = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (y = "onCompositionStart");
				y && (fr && n.locale !== "ko" && (_r || y !== "onCompositionStart" ? y === "onCompositionEnd" && _r && (v = Nn()) : (An = i, jn = "value" in An ? An.value : An.textContent, _r = !0)), _ = xi(r, y), 0 < _.length && (y = new Zn(y, e, null, n, i), o.push({
					event: y,
					listeners: _
				}), v ? y.data = v : (v = gr(n), v !== null && (y.data = v)))), (v = dr ? vr(e, n) : yr(e, n)) && (r = xi(r, "onBeforeInput"), 0 < r.length && (i = new Zn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: i,
					listeners: r
				}), i.data = v));
			}
			pi(o, t);
		});
	}
	function bi(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function xi(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			i.tag === 5 && a !== null && (i = a, a = at(e, n), a != null && r.unshift(bi(e, a, i)), a = at(e, t), a != null && r.push(bi(e, a, i))), e = e.return;
		}
		return r;
	}
	function Si(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5);
		return e || null;
	}
	function Ci(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (c !== null && c === r) break;
			s.tag === 5 && l !== null && (s = l, i ? (c = at(n, a), c != null && o.unshift(bi(n, c, s))) : i || (c = at(n, a), c != null && o.push(bi(n, c, s)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var wi = /\r\n?/g, Ti = /\u0000|\uFFFD/g;
	function Ei(e) {
		return (typeof e == "string" ? e : "" + e).replace(wi, "\n").replace(Ti, "");
	}
	function Di(e, t, n) {
		if (t = Ei(t), Ei(e) !== t && n) throw Error(r(425));
	}
	function Oi() {}
	var ki = null, Ai = null;
	function ji(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Mi = typeof setTimeout == "function" ? setTimeout : void 0, Ni = typeof clearTimeout == "function" ? clearTimeout : void 0, Pi = typeof Promise == "function" ? Promise : void 0, Fi = typeof queueMicrotask == "function" ? queueMicrotask : Pi === void 0 ? Mi : function(e) {
		return Pi.resolve(null).then(e).catch(Ii);
	};
	function Ii(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Li(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$") {
					if (r === 0) {
						e.removeChild(i), xn(t);
						return;
					}
					r--;
				} else n !== "$" && n !== "$?" && n !== "$!" || r++;
			}
			n = i;
		} while (n);
		xn(t);
	}
	function Ri(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
				if (t === "/$") return null;
			}
		}
		return e;
	}
	function zi(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?") {
					if (t === 0) return e;
					t--;
				} else n === "/$" && t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	var Bi = Math.random().toString(36).slice(2), Vi = "__reactFiber$" + Bi, Hi = "__reactProps$" + Bi, Ui = "__reactContainer$" + Bi, Wi = "__reactEvents$" + Bi, Gi = "__reactListeners$" + Bi, Ki = "__reactHandles$" + Bi;
	function qi(e) {
		var t = e[Vi];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[Ui] || n[Vi]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = zi(e); e !== null;) {
					if (n = e[Vi]) return n;
					e = zi(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Ji(e) {
		return e = e[Vi] || e[Ui], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
	}
	function Yi(e) {
		if (e.tag === 5 || e.tag === 6) return e.stateNode;
		throw Error(r(33));
	}
	function Xi(e) {
		return e[Hi] || null;
	}
	var Zi = [], Qi = -1;
	function $i(e) {
		return { current: e };
	}
	function ea(e) {
		0 > Qi || (e.current = Zi[Qi], Zi[Qi] = null, Qi--);
	}
	function ta(e, t) {
		Qi++, Zi[Qi] = e.current, e.current = t;
	}
	var na = {}, ra = $i(na), ia = $i(!1), aa = na;
	function oa(e, t) {
		var n = e.type.contextTypes;
		if (!n) return na;
		var r = e.stateNode;
		if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
		var i = {}, a;
		for (a in n) i[a] = t[a];
		return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i;
	}
	function sa(e) {
		return e = e.childContextTypes, e != null;
	}
	function ca() {
		ea(ia), ea(ra);
	}
	function la(e, t, n) {
		if (ra.current !== na) throw Error(r(168));
		ta(ra, t), ta(ia, n);
	}
	function ua(e, t, n) {
		var i = e.stateNode;
		if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
		for (var a in i = i.getChildContext(), i) if (!(a in t)) throw Error(r(108, _e(e) || "Unknown", a));
		return ue({}, n, i);
	}
	function da(e) {
		return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || na, aa = ra.current, ta(ra, e), ta(ia, ia.current), !0;
	}
	function fa(e, t, n) {
		var i = e.stateNode;
		if (!i) throw Error(r(169));
		n ? (e = ua(e, t, aa), i.__reactInternalMemoizedMergedChildContext = e, ea(ia), ea(ra), ta(ra, e)) : ea(ia), ta(ia, n);
	}
	var pa = null, ma = !1, ha = !1;
	function ga(e) {
		pa === null ? pa = [e] : pa.push(e);
	}
	function _a(e) {
		ma = !0, ga(e);
	}
	function va() {
		if (!ha && pa !== null) {
			ha = !0;
			var e = 0, t = Xt;
			try {
				var n = pa;
				for (Xt = 1; e < n.length; e++) {
					var r = n[e];
					do
						r = r(!0);
					while (r !== null);
				}
				pa = null, ma = !1;
			} catch (t) {
				throw pa !== null && (pa = pa.slice(e + 1)), St(Ot, va), t;
			} finally {
				Xt = t, ha = !1;
			}
		}
		return null;
	}
	var ya = [], ba = 0, xa = null, Sa = 0, Ca = [], wa = 0, Ta = null, Ea = 1, Da = "";
	function Oa(e, t) {
		ya[ba++] = Sa, ya[ba++] = xa, xa = e, Sa = t;
	}
	function ka(e, t, n) {
		Ca[wa++] = Ea, Ca[wa++] = Da, Ca[wa++] = Ta, Ta = e;
		var r = Ea;
		e = Da;
		var i = 32 - It(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - It(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ea = 1 << 32 - It(t) + i | n << i | r, Da = a + e;
		} else Ea = 1 << a | n << i | r, Da = e;
	}
	function Aa(e) {
		e.return !== null && (Oa(e, 1), ka(e, 1, 0));
	}
	function ja(e) {
		for (; e === xa;) xa = ya[--ba], ya[ba] = null, Sa = ya[--ba], ya[ba] = null;
		for (; e === Ta;) Ta = Ca[--wa], Ca[wa] = null, Da = Ca[--wa], Ca[wa] = null, Ea = Ca[--wa], Ca[wa] = null;
	}
	var Ma = null, Na = null, Pa = !1, Fa = null;
	function Ia(e, t) {
		var n = uu(5, null, null, 0);
		n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
	}
	function La(e, t) {
		switch (e.tag) {
			case 5:
				var n = e.type;
				return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null && (e.stateNode = t, Ma = e, Na = Ri(t.firstChild), !0);
			case 6: return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null && (e.stateNode = t, Ma = e, Na = null, !0);
			case 13: return t = t.nodeType === 8 ? t : null, t !== null && (n = Ta === null ? null : {
				id: Ea,
				overflow: Da
			}, e.memoizedState = {
				dehydrated: t,
				treeContext: n,
				retryLane: 1073741824
			}, n = uu(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ma = e, Na = null, !0);
			default: return !1;
		}
	}
	function Ra(e) {
		return !!(e.mode & 1) && !(e.flags & 128);
	}
	function za(e) {
		if (Pa) {
			var t = Na;
			if (t) {
				var n = t;
				if (!La(e, t)) {
					if (Ra(e)) throw Error(r(418));
					t = Ri(n.nextSibling);
					var i = Ma;
					t && La(e, t) ? Ia(i, n) : (e.flags = e.flags & -4097 | 2, Pa = !1, Ma = e);
				}
			} else {
				if (Ra(e)) throw Error(r(418));
				e.flags = e.flags & -4097 | 2, Pa = !1, Ma = e;
			}
		}
	}
	function Ba(e) {
		for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
		Ma = e;
	}
	function Va(e) {
		if (e !== Ma) return !1;
		if (!Pa) return Ba(e), Pa = !0, !1;
		var t;
		if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ji(e.type, e.memoizedProps)), t &&= Na) {
			if (Ra(e)) throw Ha(), Error(r(418));
			for (; t;) Ia(e, t), t = Ri(t.nextSibling);
		}
		if (Ba(e), e.tag === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(r(317));
			a: {
				for (e = e.nextSibling, t = 0; e;) {
					if (e.nodeType === 8) {
						var n = e.data;
						if (n === "/$") {
							if (t === 0) {
								Na = Ri(e.nextSibling);
								break a;
							}
							t--;
						} else n !== "$" && n !== "$!" && n !== "$?" || t++;
					}
					e = e.nextSibling;
				}
				Na = null;
			}
		} else Na = Ma ? Ri(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ha() {
		for (var e = Na; e;) e = Ri(e.nextSibling);
	}
	function Ua() {
		Na = Ma = null, Pa = !1;
	}
	function Wa(e) {
		Fa === null ? Fa = [e] : Fa.push(e);
	}
	var Ga = C.ReactCurrentBatchConfig;
	function Ka(e, t, n) {
		if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
			if (n._owner) {
				if (n = n._owner, n) {
					if (n.tag !== 1) throw Error(r(309));
					var i = n.stateNode;
				}
				if (!i) throw Error(r(147, e));
				var a = i, o = "" + e;
				return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(e) {
					var t = a.refs;
					e === null ? delete t[o] : t[o] = e;
				}, t._stringRef = o, t);
			}
			if (typeof e != "string") throw Error(r(284));
			if (!n._owner) throw Error(r(290, e));
		}
		return e;
	}
	function qa(e, t) {
		throw e = Object.prototype.toString.call(t), Error(r(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
	}
	function Ja(e) {
		var t = e._init;
		return t(e._payload);
	}
	function Ya(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function i(e, t) {
			for (e = /* @__PURE__ */ new Map(); t !== null;) t.key === null ? e.set(t.index, t) : e.set(t.key, t), t = t.sibling;
			return e;
		}
		function a(e, t) {
			return e = pu(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 2, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 2), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = _u(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === E ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === oe && Ja(i) === t.type) ? (r = a(t, n.props), r.ref = Ka(e, t, n), r.return = e, r) : (r = mu(n.type, n.key, n.props, null, e.mode, r), r.ref = Ka(e, t, n), r.return = e, r);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = vu(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = hu(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number") return t = _u("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case w: return n = mu(t.type, t.key, t.props, null, e.mode, n), n.ref = Ka(e, null, t), n.return = e, n;
					case T: return t = vu(t, e.mode, n), t.return = e, t;
					case oe:
						var r = t._init;
						return f(e, r(t._payload), n);
				}
				if (ke(t) || le(t)) return t = hu(t, e.mode, n, null), t.return = e, t;
				qa(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case w: return n.key === i ? l(e, t, n, r) : null;
					case T: return n.key === i ? u(e, t, n, r) : null;
					case oe: return i = n._init, p(e, t, i(n._payload), r);
				}
				if (ke(n) || le(n)) return i === null ? d(e, t, n, r, null) : null;
				qa(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case w: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case T: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case oe:
						var a = r._init;
						return m(e, t, n, a(r._payload), i);
				}
				if (ke(r) || le(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				qa(t, r);
			}
			return null;
		}
		function h(r, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(r, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(r, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(r, d), Pa && Oa(r, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(r, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return Pa && Oa(r, h), l;
			}
			for (d = i(r, d); h < s.length; h++) g = m(d, r, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(r, e);
			}), Pa && Oa(r, h), l;
		}
		function g(a, s, c, l) {
			var u = le(c);
			if (typeof u != "function") throw Error(r(150));
			if (c = u.call(c), c == null) throw Error(r(151));
			for (var d = u = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), Pa && Oa(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return Pa && Oa(a, g), u;
			}
			for (h = i(a, h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), Pa && Oa(a, g), u;
		}
		function _(e, r, i, o) {
			if (typeof i == "object" && i && i.type === E && i.key === null && (i = i.props.children), typeof i == "object" && i) {
				switch (i.$$typeof) {
					case w:
						a: {
							for (var c = i.key, l = r; l !== null;) {
								if (l.key === c) {
									if (c = i.type, c === E) {
										if (l.tag === 7) {
											n(e, l.sibling), r = a(l, i.props.children), r.return = e, e = r;
											break a;
										}
									} else if (l.elementType === c || typeof c == "object" && c && c.$$typeof === oe && Ja(c) === l.type) {
										n(e, l.sibling), r = a(l, i.props), r.ref = Ka(e, l, i), r.return = e, e = r;
										break a;
									}
									n(e, l);
									break;
								}
								t(e, l), l = l.sibling;
							}
							i.type === E ? (r = hu(i.props.children, e.mode, o, i.key), r.return = e, e = r) : (o = mu(i.type, i.key, i.props, null, e.mode, o), o.ref = Ka(e, r, i), o.return = e, e = o);
						}
						return s(e);
					case T:
						a: {
							for (l = i.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === i.containerInfo && r.stateNode.implementation === i.implementation) {
										n(e, r.sibling), r = a(r, i.children || []), r.return = e, e = r;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							r = vu(i, e.mode, o), r.return = e, e = r;
						}
						return s(e);
					case oe: return l = i._init, _(e, r, l(i._payload), o);
				}
				if (ke(i)) return h(e, r, i, o);
				if (le(i)) return g(e, r, i, o);
				qa(e, i);
			}
			return typeof i == "string" && i !== "" || typeof i == "number" ? (i = "" + i, r !== null && r.tag === 6 ? (n(e, r.sibling), r = a(r, i), r.return = e, e = r) : (n(e, r), r = _u(i, e.mode, o), r.return = e, e = r), s(e)) : n(e, r);
		}
		return _;
	}
	var Xa = Ya(!0), Za = Ya(!1), Qa = $i(null), $a = null, eo = null, to = null;
	function no() {
		to = eo = $a = null;
	}
	function ro(e) {
		var t = Qa.current;
		ea(Qa), e._currentValue = t;
	}
	function io(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ao(e, t) {
		$a = e, to = eo = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Ys = !0), e.firstContext = null);
	}
	function oo(e) {
		var t = e._currentValue;
		if (to !== e) {
			if (e = {
				context: e,
				memoizedValue: t,
				next: null
			}, eo === null) {
				if ($a === null) throw Error(r(308));
				eo = e, $a.dependencies = {
					lanes: 0,
					firstContext: e
				};
			} else eo = eo.next = e;
		}
		return t;
	}
	var so = null;
	function co(e) {
		so === null ? so = [e] : so.push(e);
	}
	function lo(e, t, n, r) {
		var i = t.interleaved;
		return i === null ? (n.next = n, co(t)) : (n.next = i.next, i.next = n), t.interleaved = n, uo(e, r);
	}
	function uo(e, t) {
		e.lanes |= t;
		var n = e.alternate;
		for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
		return n.tag === 3 ? n.stateNode : null;
	}
	var fo = !1;
	function po(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				interleaved: null,
				lanes: 0
			},
			effects: null
		};
	}
	function mo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			effects: e.effects
		});
	}
	function ho(e, t) {
		return {
			eventTime: e,
			lane: t,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function go(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, il & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, uo(e, n);
		}
		return i = r.interleaved, i === null ? (t.next = t, co(r)) : (t.next = i.next, i.next = t), r.interleaved = t, uo(e, n);
	}
	function _o(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194240)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Yt(e, n);
		}
	}
	function vo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						eventTime: n.eventTime,
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: n.callback,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				effects: r.effects
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	function yo(e, t, n, r) {
		var i = e.updateQueue;
		fo = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane, p = s.eventTime;
				if ((r & f) === f) {
					u !== null && (u = u.next = {
						eventTime: p,
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: s.callback,
						next: null
					});
					a: {
						var m = e, h = s;
						switch (f = t, p = n, h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(p, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(p, d, f) : m, f == null) break a;
								d = ue({}, d, f);
								break a;
							case 2: fo = !0;
						}
					}
					s.callback !== null && s.lane !== 0 && (e.flags |= 64, f = i.effects, f === null ? i.effects = [s] : f.push(s));
				} else p = {
					eventTime: p,
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					f = s, s = f.next, f.next = null, i.lastBaseUpdate = f, i.shared.pending = null;
				}
			} while (1);
			if (u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, t = i.shared.interleaved, t !== null) {
				i = t;
				do
					o |= i.lane, i = i.next;
				while (i !== t);
			} else a === null && (i.shared.lanes = 0);
			fl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function bo(e, t, n) {
		if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
			var i = e[t], a = i.callback;
			if (a !== null) {
				if (i.callback = null, i = n, typeof a != "function") throw Error(r(191, a));
				a.call(i);
			}
		}
	}
	var xo = {}, So = $i(xo), Co = $i(xo), wo = $i(xo);
	function To(e) {
		if (e === xo) throw Error(r(174));
		return e;
	}
	function Eo(e, t) {
		switch (ta(wo, t), ta(Co, e), ta(So, xo), e = t.nodeType, e) {
			case 9:
			case 11:
				t = (t = t.documentElement) ? t.namespaceURI : Ie(null, "");
				break;
			default: e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ie(t, e);
		}
		ea(So), ta(So, t);
	}
	function Do() {
		ea(So), ea(Co), ea(wo);
	}
	function Oo(e) {
		To(wo.current);
		var t = To(So.current), n = Ie(t, e.type);
		t !== n && (ta(Co, e), ta(So, n));
	}
	function ko(e) {
		Co.current === e && (ea(So), ea(Co));
	}
	var Ao = $i(0);
	function jo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Mo = [];
	function No() {
		for (var e = 0; e < Mo.length; e++) Mo[e]._workInProgressVersionPrimary = null;
		Mo.length = 0;
	}
	var Po = C.ReactCurrentDispatcher, Fo = C.ReactCurrentBatchConfig, Io = 0, Lo = null, Ro = null, zo = null, Bo = !1, Vo = !1, Ho = 0, Uo = 0;
	function Wo() {
		throw Error(r(321));
	}
	function Go(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Lr(e[n], t[n])) return !1;
		return !0;
	}
	function Ko(e, t, n, i, a, o) {
		if (Io = o, Lo = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Po.current = e === null || e.memoizedState === null ? ks : As, e = n(i, a), Vo) {
			o = 0;
			do {
				if (Vo = !1, Ho = 0, 25 <= o) throw Error(r(301));
				o += 1, zo = Ro = null, t.updateQueue = null, Po.current = js, e = n(i, a);
			} while (Vo);
		}
		if (Po.current = Os, t = Ro !== null && Ro.next !== null, Io = 0, zo = Ro = Lo = null, Bo = !1, t) throw Error(r(300));
		return e;
	}
	function qo() {
		var e = Ho !== 0;
		return Ho = 0, e;
	}
	function Jo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return zo === null ? Lo.memoizedState = zo = e : zo = zo.next = e, zo;
	}
	function Yo() {
		if (Ro === null) {
			var e = Lo.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Ro.next;
		var t = zo === null ? Lo.memoizedState : zo.next;
		if (t !== null) zo = t, Ro = e;
		else {
			if (e === null) throw Error(r(310));
			Ro = e, e = {
				memoizedState: Ro.memoizedState,
				baseState: Ro.baseState,
				baseQueue: Ro.baseQueue,
				queue: Ro.queue,
				next: null
			}, zo === null ? Lo.memoizedState = zo = e : zo = zo.next = e;
		}
		return zo;
	}
	function Xo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Zo(e) {
		var t = Yo(), n = t.queue;
		if (n === null) throw Error(r(311));
		n.lastRenderedReducer = e;
		var i = Ro, a = i.baseQueue, o = n.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			i.baseQueue = a = o, n.pending = null;
		}
		if (a !== null) {
			o = a.next, i = i.baseState;
			var c = s = null, l = null, u = o;
			do {
				var d = u.lane;
				if ((Io & d) === d) l !== null && (l = l.next = {
					lane: 0,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}), i = u.hasEagerState ? u.eagerState : e(i, u.action);
				else {
					var f = {
						lane: d,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					};
					l === null ? (c = l = f, s = i) : l = l.next = f, Lo.lanes |= d, fl |= d;
				}
				u = u.next;
			} while (u !== null && u !== o);
			l === null ? s = i : l.next = c, Lr(i, t.memoizedState) || (Ys = !0), t.memoizedState = i, t.baseState = s, t.baseQueue = l, n.lastRenderedState = i;
		}
		if (e = n.interleaved, e !== null) {
			a = e;
			do
				o = a.lane, Lo.lanes |= o, fl |= o, a = a.next;
			while (a !== e);
		} else a === null && (n.lanes = 0);
		return [t.memoizedState, n.dispatch];
	}
	function Qo(e) {
		var t = Yo(), n = t.queue;
		if (n === null) throw Error(r(311));
		n.lastRenderedReducer = e;
		var i = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Lr(o, t.memoizedState) || (Ys = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, i];
	}
	function $o() {}
	function es(e, t) {
		var n = Lo, i = Yo(), a = t(), o = !Lr(i.memoizedState, a);
		if (o && (i.memoizedState = a, Ys = !0), i = i.queue, fs(rs.bind(null, n, i, e), [e]), i.getSnapshot !== t || o || zo !== null && zo.memoizedState.tag & 1) {
			if (n.flags |= 2048, ss(9, ns.bind(null, n, i, a, t), void 0, null), al === null) throw Error(r(349));
			Io & 30 || ts(n, t, a);
		}
		return a;
	}
	function ts(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = Lo.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, Lo.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function ns(e, t, n, r) {
		t.value = n, t.getSnapshot = r, is(t) && as(e);
	}
	function rs(e, t, n) {
		return n(function() {
			is(t) && as(e);
		});
	}
	function is(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Lr(e, n);
		} catch {
			return !0;
		}
	}
	function as(e) {
		var t = uo(e, 1);
		t !== null && Ml(t, e, 1, -1);
	}
	function os(e) {
		var t = Jo();
		return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Xo,
			lastRenderedState: e
		}, t.queue = e, e = e.dispatch = ws.bind(null, Lo, e), [t.memoizedState, e];
	}
	function ss(e, t, n, r) {
		return e = {
			tag: e,
			create: t,
			destroy: n,
			deps: r,
			next: null
		}, t = Lo.updateQueue, t === null ? (t = {
			lastEffect: null,
			stores: null
		}, Lo.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
	}
	function cs() {
		return Yo().memoizedState;
	}
	function ls(e, t, n, r) {
		var i = Jo();
		Lo.flags |= e, i.memoizedState = ss(1 | t, n, void 0, r === void 0 ? null : r);
	}
	function us(e, t, n, r) {
		var i = Yo();
		r = r === void 0 ? null : r;
		var a = void 0;
		if (Ro !== null) {
			var o = Ro.memoizedState;
			if (a = o.destroy, r !== null && Go(r, o.deps)) {
				i.memoizedState = ss(t, n, a, r);
				return;
			}
		}
		Lo.flags |= e, i.memoizedState = ss(1 | t, n, a, r);
	}
	function ds(e, t) {
		return ls(8390656, 8, e, t);
	}
	function fs(e, t) {
		return us(2048, 8, e, t);
	}
	function ps(e, t) {
		return us(4, 2, e, t);
	}
	function ms(e, t) {
		return us(4, 4, e, t);
	}
	function hs(e, t) {
		if (typeof t == "function") return e = e(), t(e), function() {
			t(null);
		};
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function gs(e, t, n) {
		return n = n == null ? null : n.concat([e]), us(4, 4, hs.bind(null, t, e), n);
	}
	function _s() {}
	function vs(e, t) {
		var n = Yo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Go(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ys(e, t) {
		var n = Yo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Go(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
	}
	function bs(e, t, n) {
		return Io & 21 ? (Lr(n, t) || (n = A(), Lo.lanes |= n, fl |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ys = !0), e.memoizedState = n);
	}
	function xs(e, t) {
		var n = Xt;
		Xt = n !== 0 && 4 > n ? n : 4, e(!0);
		var r = Fo.transition;
		Fo.transition = {};
		try {
			e(!1), t();
		} finally {
			Xt = n, Fo.transition = r;
		}
	}
	function Ss() {
		return Yo().memoizedState;
	}
	function Cs(e, t, n) {
		var r = jl(e);
		if (n = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ts(e)) Es(t, n);
		else if (n = lo(e, t, n, r), n !== null) {
			var i = Al();
			Ml(n, e, r, i), Ds(n, t, r);
		}
	}
	function ws(e, t, n) {
		var r = jl(e), i = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ts(e)) Es(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Lr(s, o)) {
					var c = t.interleaved;
					c === null ? (i.next = i, co(t)) : (i.next = c.next, c.next = i), t.interleaved = i;
					return;
				}
			} catch {}
			n = lo(e, t, i, r), n !== null && (i = Al(), Ml(n, e, r, i), Ds(n, t, r));
		}
	}
	function Ts(e) {
		var t = e.alternate;
		return e === Lo || t !== null && t === Lo;
	}
	function Es(e, t) {
		Vo = Bo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ds(e, t, n) {
		if (n & 4194240) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, Yt(e, n);
		}
	}
	var Os = {
		readContext: oo,
		useCallback: Wo,
		useContext: Wo,
		useEffect: Wo,
		useImperativeHandle: Wo,
		useInsertionEffect: Wo,
		useLayoutEffect: Wo,
		useMemo: Wo,
		useReducer: Wo,
		useRef: Wo,
		useState: Wo,
		useDebugValue: Wo,
		useDeferredValue: Wo,
		useTransition: Wo,
		useMutableSource: Wo,
		useSyncExternalStore: Wo,
		useId: Wo,
		unstable_isNewReconciler: !1
	}, ks = {
		readContext: oo,
		useCallback: function(e, t) {
			return Jo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: oo,
		useEffect: ds,
		useImperativeHandle: function(e, t, n) {
			return n = n == null ? null : n.concat([e]), ls(4194308, 4, hs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ls(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			return ls(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Jo();
			return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
		},
		useReducer: function(e, t, n) {
			var r = Jo();
			return t = n === void 0 ? t : n(t), r.memoizedState = r.baseState = t, e = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: t
			}, r.queue = e, e = e.dispatch = Cs.bind(null, Lo, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Jo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: os,
		useDebugValue: _s,
		useDeferredValue: function(e) {
			return Jo().memoizedState = e;
		},
		useTransition: function() {
			var e = os(!1), t = e[0];
			return e = xs.bind(null, e[1]), Jo().memoizedState = e, [t, e];
		},
		useMutableSource: function() {},
		useSyncExternalStore: function(e, t, n) {
			var i = Lo, a = Jo();
			if (Pa) {
				if (n === void 0) throw Error(r(407));
				n = n();
			} else {
				if (n = t(), al === null) throw Error(r(349));
				Io & 30 || ts(i, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ds(rs.bind(null, i, o, e), [e]), i.flags |= 2048, ss(9, ns.bind(null, i, o, n, t), void 0, null), n;
		},
		useId: function() {
			var e = Jo(), t = al.identifierPrefix;
			if (Pa) {
				var n = Da, r = Ea;
				n = (r & ~(1 << 32 - It(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Ho++, 0 < n && (t += "H" + n.toString(32)), t += ":";
			} else n = Uo++, t = ":" + t + "r" + n.toString(32) + ":";
			return e.memoizedState = t;
		},
		unstable_isNewReconciler: !1
	}, As = {
		readContext: oo,
		useCallback: vs,
		useContext: oo,
		useEffect: fs,
		useImperativeHandle: gs,
		useInsertionEffect: ps,
		useLayoutEffect: ms,
		useMemo: ys,
		useReducer: Zo,
		useRef: cs,
		useState: function() {
			return Zo(Xo);
		},
		useDebugValue: _s,
		useDeferredValue: function(e) {
			return bs(Yo(), Ro.memoizedState, e);
		},
		useTransition: function() {
			return [Zo(Xo)[0], Yo().memoizedState];
		},
		useMutableSource: $o,
		useSyncExternalStore: es,
		useId: Ss,
		unstable_isNewReconciler: !1
	}, js = {
		readContext: oo,
		useCallback: vs,
		useContext: oo,
		useEffect: fs,
		useImperativeHandle: gs,
		useInsertionEffect: ps,
		useLayoutEffect: ms,
		useMemo: ys,
		useReducer: Qo,
		useRef: cs,
		useState: function() {
			return Qo(Xo);
		},
		useDebugValue: _s,
		useDeferredValue: function(e) {
			var t = Yo();
			return Ro === null ? t.memoizedState = e : bs(t, Ro.memoizedState, e);
		},
		useTransition: function() {
			return [Qo(Xo)[0], Yo().memoizedState];
		},
		useMutableSource: $o,
		useSyncExternalStore: es,
		useId: Ss,
		unstable_isNewReconciler: !1
	};
	function Ms(e, t) {
		if (e && e.defaultProps) {
			for (var n in t = ue({}, t), e = e.defaultProps, e) t[n] === void 0 && (t[n] = e[n]);
			return t;
		}
		return t;
	}
	function Ns(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : ue({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ps = {
		isMounted: function(e) {
			return (e = e._reactInternals) ? gt(e) === e : !1;
		},
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Al(), i = jl(e), a = ho(r, i);
			a.payload = t, n != null && (a.callback = n), t = go(e, a, i), t !== null && (Ml(t, e, i, r), _o(t, e, i));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Al(), i = jl(e), a = ho(r, i);
			a.tag = 1, a.payload = t, n != null && (a.callback = n), t = go(e, a, i), t !== null && (Ml(t, e, i, r), _o(t, e, i));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Al(), r = jl(e), i = ho(n, r);
			i.tag = 2, t != null && (i.callback = t), t = go(e, i, r), t !== null && (Ml(t, e, r, n), _o(t, e, r));
		}
	};
	function Fs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Rr(n, r) || !Rr(i, a) : !0;
	}
	function Is(e, t, n) {
		var r = !1, i = na, a = t.contextType;
		return typeof a == "object" && a ? a = oo(a) : (i = sa(t) ? aa : ra.current, r = t.contextTypes, a = (r = r != null) ? oa(e, i) : na), t = new t(n, a), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Ps, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = a), t;
	}
	function Ls(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ps.enqueueReplaceState(t, t.state, null);
	}
	function Rs(e, t, n, r) {
		var i = e.stateNode;
		i.props = n, i.state = e.memoizedState, i.refs = {}, po(e);
		var a = t.contextType;
		typeof a == "object" && a ? i.context = oo(a) : (a = sa(t) ? aa : ra.current, i.context = oa(e, a)), i.state = e.memoizedState, a = t.getDerivedStateFromProps, typeof a == "function" && (Ns(e, t, a, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && Ps.enqueueReplaceState(i, i.state, null), yo(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308);
	}
	function zs(e, t) {
		try {
			var n = "", r = t;
			do
				n += he(r), r = r.return;
			while (r);
			var i = n;
		} catch (e) {
			i = "\nError generating stack: " + e.message + "\n" + e.stack;
		}
		return {
			value: e,
			source: t,
			stack: i,
			digest: null
		};
	}
	function Bs(e, t, n) {
		return {
			value: e,
			source: null,
			stack: n ?? null,
			digest: t ?? null
		};
	}
	function Vs(e, t) {
		try {
			console.error(t.value);
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	var Hs = typeof WeakMap == "function" ? WeakMap : Map;
	function Us(e, t, n) {
		n = ho(-1, n), n.tag = 3, n.payload = { element: null };
		var r = t.value;
		return n.callback = function() {
			bl || (bl = !0, xl = r), Vs(e, t);
		}, n;
	}
	function Ws(e, t, n) {
		n = ho(-1, n), n.tag = 3;
		var r = e.type.getDerivedStateFromError;
		if (typeof r == "function") {
			var i = t.value;
			n.payload = function() {
				return r(i);
			}, n.callback = function() {
				Vs(e, t);
			};
		}
		var a = e.stateNode;
		return a !== null && typeof a.componentDidCatch == "function" && (n.callback = function() {
			Vs(e, t), typeof r != "function" && (Sl === null ? Sl = /* @__PURE__ */ new Set([this]) : Sl.add(this));
			var n = t.stack;
			this.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		}), n;
	}
	function Gs(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Hs();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (i.add(n), e = ru.bind(null, e, t, n), t.then(e, e));
	}
	function Ks(e) {
		do {
			var t;
			if ((t = e.tag === 13) && (t = e.memoizedState, t = t === null || t.dehydrated !== null), t) return e;
			e = e.return;
		} while (e !== null);
		return null;
	}
	function qs(e, t, n, r, i) {
		return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = ho(-1, 1), t.tag = 2, go(n, t, 1))), n.lanes |= 1), e);
	}
	var Js = C.ReactCurrentOwner, Ys = !1;
	function Xs(e, t, n, r) {
		t.child = e === null ? Za(t, null, n, r) : Xa(t, e.child, n, r);
	}
	function Zs(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		return ao(t, i), r = Ko(e, t, n, r, a, i), n = qo(), e !== null && !Ys ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, _c(e, t, i)) : (Pa && n && Aa(t), t.flags |= 1, Xs(e, t, r, i), t.child);
	}
	function Qs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !du(a) && a.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = a, $s(e, t, a, r, i)) : (e = mu(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, (e.lanes & i) === 0) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Rr : n, n(o, r) && e.ref === t.ref) return _c(e, t, i);
		}
		return t.flags |= 1, e = pu(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function $s(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Rr(a, r) && e.ref === t.ref) {
				if (Ys = !1, t.pendingProps = r = a, (e.lanes & i) !== 0) e.flags & 131072 && (Ys = !0);
				else return t.lanes = e.lanes, _c(e, t, i);
			}
		}
		return nc(e, t, n, r, i);
	}
	function ec(e, t, n) {
		var r = t.pendingProps, i = r.children, a = e === null ? null : e.memoizedState;
		if (r.mode === "hidden") {
			if (!(t.mode & 1)) t.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null
			}, ta(ll, cl), cl |= n;
			else {
				if (!(n & 1073741824)) return e = a === null ? n : a.baseLanes | n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
					baseLanes: e,
					cachePool: null,
					transitions: null
				}, t.updateQueue = null, ta(ll, cl), cl |= e, null;
				t.memoizedState = {
					baseLanes: 0,
					cachePool: null,
					transitions: null
				}, r = a === null ? n : a.baseLanes, ta(ll, cl), cl |= r;
			}
		} else a === null ? r = n : (r = a.baseLanes | n, t.memoizedState = null), ta(ll, cl), cl |= r;
		return Xs(e, t, i, n), t.child;
	}
	function tc(e, t) {
		var n = t.ref;
		(e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
	}
	function nc(e, t, n, r, i) {
		var a = sa(n) ? aa : ra.current;
		return a = oa(t, a), ao(t, i), n = Ko(e, t, n, r, a, i), r = qo(), e !== null && !Ys ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, _c(e, t, i)) : (Pa && r && Aa(t), t.flags |= 1, Xs(e, t, n, i), t.child);
	}
	function rc(e, t, n, r, i) {
		if (sa(n)) {
			var a = !0;
			da(t);
		} else a = !1;
		if (ao(t, i), t.stateNode === null) gc(e, t), Is(t, n, r), Rs(t, n, r, i), r = !0;
		else if (e === null) {
			var o = t.stateNode, s = t.memoizedProps;
			o.props = s;
			var c = o.context, l = n.contextType;
			typeof l == "object" && l ? l = oo(l) : (l = sa(n) ? aa : ra.current, l = oa(t, l));
			var u = n.getDerivedStateFromProps, d = typeof u == "function" || typeof o.getSnapshotBeforeUpdate == "function";
			d || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || c !== l) && Ls(t, o, r, l), fo = !1;
			var f = t.memoizedState;
			o.state = f, yo(t, r, o, i), c = t.memoizedState, s !== r || f !== c || ia.current || fo ? (typeof u == "function" && (Ns(t, n, u, r), c = t.memoizedState), (s = fo || Fs(t, n, s, r, f, c, l)) ? (d || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = c), o.props = r, o.state = c, o.context = l, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			o = t.stateNode, mo(e, t), s = t.memoizedProps, l = t.type === t.elementType ? s : Ms(t.type, s), o.props = l, d = t.pendingProps, f = o.context, c = n.contextType, typeof c == "object" && c ? c = oo(c) : (c = sa(n) ? aa : ra.current, c = oa(t, c));
			var p = n.getDerivedStateFromProps;
			(u = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== d || f !== c) && Ls(t, o, r, c), fo = !1, f = t.memoizedState, o.state = f, yo(t, r, o, i);
			var m = t.memoizedState;
			s !== d || f !== m || ia.current || fo ? (typeof p == "function" && (Ns(t, n, p, r), m = t.memoizedState), (l = fo || Fs(t, n, l, r, f, m, c) || !1) ? (u || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, m, c), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, m, c)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), o.props = r, o.state = m, o.context = c, r = l) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return ic(e, t, n, r, a, i);
	}
	function ic(e, t, n, r, i, a) {
		tc(e, t);
		var o = !!(t.flags & 128);
		if (!r && !o) return i && fa(t, n, !1), _c(e, t, a);
		r = t.stateNode, Js.current = t;
		var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
		return t.flags |= 1, e !== null && o ? (t.child = Xa(t, e.child, null, a), t.child = Xa(t, null, s, a)) : Xs(e, t, s, a), t.memoizedState = r.state, i && fa(t, n, !0), t.child;
	}
	function ac(e) {
		var t = e.stateNode;
		t.pendingContext ? la(e, t.pendingContext, t.pendingContext !== t.context) : t.context && la(e, t.context, !1), Eo(e, t.containerInfo);
	}
	function oc(e, t, n, r, i) {
		return Ua(), Wa(i), t.flags |= 256, Xs(e, t, n, r), t.child;
	}
	var sc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0
	};
	function cc(e) {
		return {
			baseLanes: e,
			cachePool: null,
			transitions: null
		};
	}
	function lc(e, t, n) {
		var r = t.pendingProps, i = Ao.current, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(i & 2)), s ? (a = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), ta(Ao, i & 1), e === null) return za(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.lanes = t.mode & 1 ? e.data === "$!" ? 8 : 1073741824 : 1, null) : (o = r.children, e = r.fallback, a ? (r = t.mode, a = t.child, o = {
			mode: "hidden",
			children: o
		}, !(r & 1) && a !== null ? (a.childLanes = 0, a.pendingProps = o) : a = gu(o, r, 0, null), e = hu(e, r, n, null), a.return = t, e.return = t, a.sibling = e, t.child = a, t.child.memoizedState = cc(n), t.memoizedState = sc, e) : uc(t, o));
		if (i = e.memoizedState, i !== null && (s = i.dehydrated, s !== null)) return fc(e, t, o, r, s, i, n);
		if (a) {
			a = r.fallback, o = t.mode, i = e.child, s = i.sibling;
			var c = {
				mode: "hidden",
				children: r.children
			};
			return !(o & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = c, t.deletions = null) : (r = pu(i, c), r.subtreeFlags = i.subtreeFlags & 14680064), s === null ? (a = hu(a, o, n, null), a.flags |= 2) : a = pu(s, a), a.return = t, r.return = t, r.sibling = a, t.child = r, r = a, a = t.child, o = e.child.memoizedState, o = o === null ? cc(n) : {
				baseLanes: o.baseLanes | n,
				cachePool: null,
				transitions: o.transitions
			}, a.memoizedState = o, a.childLanes = e.childLanes & ~n, t.memoizedState = sc, r;
		}
		return a = e.child, e = a.sibling, r = pu(a, {
			mode: "visible",
			children: r.children
		}), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
	}
	function uc(e, t) {
		return t = gu({
			mode: "visible",
			children: t
		}, e.mode, 0, null), t.return = e, e.child = t;
	}
	function dc(e, t, n, r) {
		return r !== null && Wa(r), Xa(t, e.child, null, n), e = uc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function fc(e, t, n, i, a, o, s) {
		if (n) return t.flags & 256 ? (t.flags &= -257, i = Bs(Error(r(422))), dc(e, t, s, i)) : t.memoizedState === null ? (o = i.fallback, a = t.mode, i = gu({
			mode: "visible",
			children: i.children
		}, a, 0, null), o = hu(o, a, s, null), o.flags |= 2, i.return = t, o.return = t, i.sibling = o, t.child = i, t.mode & 1 && Xa(t, e.child, null, s), t.child.memoizedState = cc(s), t.memoizedState = sc, o) : (t.child = e.child, t.flags |= 128, null);
		if (!(t.mode & 1)) return dc(e, t, s, null);
		if (a.data === "$!") {
			if (i = a.nextSibling && a.nextSibling.dataset, i) var c = i.dgst;
			return i = c, o = Error(r(419)), i = Bs(o, i, void 0), dc(e, t, s, i);
		}
		if (c = (s & e.childLanes) !== 0, Ys || c) {
			if (i = al, i !== null) {
				switch (s & -s) {
					case 4:
						a = 2;
						break;
					case 16:
						a = 8;
						break;
					case 64:
					case 128:
					case 256:
					case 512:
					case 1024:
					case 2048:
					case 4096:
					case 8192:
					case 16384:
					case 32768:
					case 65536:
					case 131072:
					case 262144:
					case 524288:
					case 1048576:
					case 2097152:
					case 4194304:
					case 8388608:
					case 16777216:
					case 33554432:
					case 67108864:
						a = 32;
						break;
					case 536870912:
						a = 268435456;
						break;
					default: a = 0;
				}
				a = (a & (i.suspendedLanes | s)) === 0 ? a : 0, a !== 0 && a !== o.retryLane && (o.retryLane = a, uo(e, a), Ml(i, e, a, -1));
			}
			return Kl(), i = Bs(Error(r(421))), dc(e, t, s, i);
		}
		return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = au.bind(null, e), a._reactRetry = t, null) : (e = o.treeContext, Na = Ri(a.nextSibling), Ma = t, Pa = !0, Fa = null, e !== null && (Ca[wa++] = Ea, Ca[wa++] = Da, Ca[wa++] = Ta, Ea = e.id, Da = e.overflow, Ta = t), t = uc(t, i.children), t.flags |= 4096, t);
	}
	function pc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), io(e.return, t, n);
	}
	function mc(e, t, n, r, i) {
		var a = e.memoizedState;
		a === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i
		} : (a.isBackwards = t, a.rendering = null, a.renderingStartTime = 0, a.last = r, a.tail = n, a.tailMode = i);
	}
	function hc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		if (Xs(e, t, r.children, n), r = Ao.current, r & 2) r = r & 1 | 2, t.flags |= 128;
		else {
			if (e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && pc(e, n, t);
				else if (e.tag === 19) pc(e, n, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue;
				}
				if (e === t) break a;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break a;
					e = e.return;
				}
				e.sibling.return = e.return, e = e.sibling;
			}
			r &= 1;
		}
		if (ta(Ao, r), !(t.mode & 1)) t.memoizedState = null;
		else switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && jo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), mc(t, !1, i, n, a);
				break;
			case "backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && jo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				mc(t, !0, n, null, a);
				break;
			case "together":
				mc(t, !1, null, null, void 0);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function gc(e, t) {
		!(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
	}
	function _c(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), fl |= t.lanes, (n & t.childLanes) === 0) return null;
		if (e !== null && t.child !== e.child) throw Error(r(153));
		if (t.child !== null) {
			for (e = t.child, n = pu(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = pu(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function vc(e, t, n) {
		switch (t.tag) {
			case 3:
				ac(t), Ua();
				break;
			case 5:
				Oo(t);
				break;
			case 1:
				sa(t.type) && da(t);
				break;
			case 4:
				Eo(t, t.stateNode.containerInfo);
				break;
			case 10:
				var r = t.type._context, i = t.memoizedProps.value;
				ta(Qa, r._currentValue), r._currentValue = i;
				break;
			case 13:
				if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ta(Ao, Ao.current & 1), e = _c(e, t, n), e === null ? null : e.sibling) : lc(e, t, n) : (ta(Ao, Ao.current & 1), t.flags |= 128, null);
				ta(Ao, Ao.current & 1);
				break;
			case 19:
				if (r = (n & t.childLanes) !== 0, e.flags & 128) {
					if (r) return hc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), ta(Ao, Ao.current), r) break;
				return null;
			case 22:
			case 23: return t.lanes = 0, ec(e, t, n);
		}
		return _c(e, t, n);
	}
	var yc = function(e, t) {
		for (var n = t.child; n !== null;) {
			if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
			else if (n.tag !== 4 && n.child !== null) {
				n.child.return = n, n = n.child;
				continue;
			}
			if (n === t) break;
			for (; n.sibling === null;) {
				if (n.return === null || n.return === t) return;
				n = n.return;
			}
			n.sibling.return = n.return, n = n.sibling;
		}
	}, bc = function(e, t, n, r) {
		var i = e.memoizedProps;
		if (i !== r) {
			e = t.stateNode, To(So.current);
			var o = null;
			switch (n) {
				case "input":
					i = we(e, i), r = we(e, r), o = [];
					break;
				case "select":
					i = ue({}, i, { value: void 0 }), r = ue({}, r, { value: void 0 }), o = [];
					break;
				case "textarea":
					i = je(e, i), r = je(e, r), o = [];
					break;
				default: typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Oi);
			}
			Ge(n, r);
			var s;
			for (u in n = null, i) if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null) {
				if (u === "style") {
					var c = i[u];
					for (s in c) c.hasOwnProperty(s) && (n ||= {}, n[s] = "");
				} else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (a.hasOwnProperty(u) ? o ||= [] : (o ||= []).push(u, null));
			}
			for (u in r) {
				var l = r[u];
				if (c = i?.[u], r.hasOwnProperty(u) && l !== c && (l != null || c != null)) {
					if (u === "style") {
						if (c) {
							for (s in c) !c.hasOwnProperty(s) || l && l.hasOwnProperty(s) || (n ||= {}, n[s] = "");
							for (s in l) l.hasOwnProperty(s) && c[s] !== l[s] && (n ||= {}, n[s] = l[s]);
						} else n || (o ||= [], o.push(u, n)), n = l;
					} else u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, c = c ? c.__html : void 0, l != null && c !== l && (o ||= []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (o ||= []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (a.hasOwnProperty(u) ? (l != null && u === "onScroll" && mi("scroll", e), o || c === l || (o = [])) : (o ||= []).push(u, l));
				}
			}
			n && (o ||= []).push("style", n);
			var u = o;
			(t.updateQueue = u) && (t.flags |= 4);
		}
	}, xc = function(e, t, n, r) {
		n !== r && (t.flags |= 4);
	};
	function Sc(e, t) {
		if (!Pa) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Cc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function wc(e, t, n) {
		var i = t.pendingProps;
		switch (ja(t), t.tag) {
			case 2:
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Cc(t), null;
			case 1: return sa(t.type) && ca(), Cc(t), null;
			case 3: return i = t.stateNode, Do(), ea(ia), ea(ra), No(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Va(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Fa !== null && (Il(Fa), Fa = null))), Cc(t), null;
			case 5:
				ko(t);
				var o = To(wo.current);
				if (n = t.type, e !== null && t.stateNode != null) bc(e, t, n, i, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
				else {
					if (!i) {
						if (t.stateNode === null) throw Error(r(166));
						return Cc(t), null;
					}
					if (e = To(So.current), Va(t)) {
						i = t.stateNode, n = t.type;
						var s = t.memoizedProps;
						switch (i[Vi] = t, i[Hi] = s, e = !!(t.mode & 1), n) {
							case "dialog":
								mi("cancel", i), mi("close", i);
								break;
							case "iframe":
							case "object":
							case "embed":
								mi("load", i);
								break;
							case "video":
							case "audio":
								for (o = 0; o < ui.length; o++) mi(ui[o], i);
								break;
							case "source":
								mi("error", i);
								break;
							case "img":
							case "image":
							case "link":
								mi("error", i), mi("load", i);
								break;
							case "details":
								mi("toggle", i);
								break;
							case "input":
								Te(i, s), mi("invalid", i);
								break;
							case "select":
								i._wrapperState = { wasMultiple: !!s.multiple }, mi("invalid", i);
								break;
							case "textarea": Me(i, s), mi("invalid", i);
						}
						for (var c in Ge(n, s), o = null, s) if (s.hasOwnProperty(c)) {
							var l = s[c];
							c === "children" ? typeof l == "string" ? i.textContent !== l && (!0 !== s.suppressHydrationWarning && Di(i.textContent, l, e), o = ["children", l]) : typeof l == "number" && i.textContent !== "" + l && (!0 !== s.suppressHydrationWarning && Di(i.textContent, l, e), o = ["children", "" + l]) : a.hasOwnProperty(c) && l != null && c === "onScroll" && mi("scroll", i);
						}
						switch (n) {
							case "input":
								xe(i), k(i, s, !0);
								break;
							case "textarea":
								xe(i), Pe(i);
								break;
							case "select":
							case "option": break;
							default: typeof s.onClick == "function" && (i.onclick = Oi);
						}
						i = o, t.updateQueue = i, i !== null && (t.flags |= 4);
					} else {
						c = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Fe(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = c.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = c.createElement(n, { is: i.is }) : (e = c.createElement(n), n === "select" && (c = e, i.multiple ? c.multiple = !0 : i.size && (c.size = i.size))) : e = c.createElementNS(e, n), e[Vi] = t, e[Hi] = i, yc(e, t, !1, !1), t.stateNode = e;
						a: {
							switch (c = Ke(n, i), n) {
								case "dialog":
									mi("cancel", e), mi("close", e), o = i;
									break;
								case "iframe":
								case "object":
								case "embed":
									mi("load", e), o = i;
									break;
								case "video":
								case "audio":
									for (o = 0; o < ui.length; o++) mi(ui[o], e);
									o = i;
									break;
								case "source":
									mi("error", e), o = i;
									break;
								case "img":
								case "image":
								case "link":
									mi("error", e), mi("load", e), o = i;
									break;
								case "details":
									mi("toggle", e), o = i;
									break;
								case "input":
									Te(e, i), o = we(e, i), mi("invalid", e);
									break;
								case "option":
									o = i;
									break;
								case "select":
									e._wrapperState = { wasMultiple: !!i.multiple }, o = ue({}, i, { value: void 0 }), mi("invalid", e);
									break;
								case "textarea":
									Me(e, i), o = je(e, i), mi("invalid", e);
									break;
								default: o = i;
							}
							for (s in Ge(n, o), l = o, l) if (l.hasOwnProperty(s)) {
								var u = l[s];
								s === "style" ? Ue(e, u) : s === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Re(e, u)) : s === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && ze(e, u) : typeof u == "number" && ze(e, "" + u) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (a.hasOwnProperty(s) ? u != null && s === "onScroll" && mi("scroll", e) : u != null && S(e, s, u, c));
							}
							switch (n) {
								case "input":
									xe(e), k(e, i, !1);
									break;
								case "textarea":
									xe(e), Pe(e);
									break;
								case "option":
									i.value != null && e.setAttribute("value", "" + ve(i.value));
									break;
								case "select":
									e.multiple = !!i.multiple, s = i.value, s == null ? i.defaultValue != null && Ae(e, !!i.multiple, i.defaultValue, !0) : Ae(e, !!i.multiple, s, !1);
									break;
								default: typeof o.onClick == "function" && (e.onclick = Oi);
							}
							switch (n) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									i = !!i.autoFocus;
									break a;
								case "img":
									i = !0;
									break a;
								default: i = !1;
							}
						}
						i && (t.flags |= 4);
					}
					t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
				}
				return Cc(t), null;
			case 6:
				if (e && t.stateNode != null) xc(e, t, e.memoizedProps, i);
				else {
					if (typeof i != "string" && t.stateNode === null) throw Error(r(166));
					if (n = To(wo.current), To(So.current), Va(t)) {
						if (i = t.stateNode, n = t.memoizedProps, i[Vi] = t, (s = i.nodeValue !== n) && (e = Ma, e !== null)) switch (e.tag) {
							case 3:
								Di(i.nodeValue, n, !!(e.mode & 1));
								break;
							case 5: !0 !== e.memoizedProps.suppressHydrationWarning && Di(i.nodeValue, n, !!(e.mode & 1));
						}
						s && (t.flags |= 4);
					} else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[Vi] = t, t.stateNode = i;
				}
				return Cc(t), null;
			case 13:
				if (ea(Ao), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (Pa && Na !== null && t.mode & 1 && !(t.flags & 128)) Ha(), Ua(), t.flags |= 98560, s = !1;
					else if (s = Va(t), i !== null && i.dehydrated !== null) {
						if (e === null) {
							if (!s) throw Error(r(318));
							if (s = t.memoizedState, s = s === null ? null : s.dehydrated, !s) throw Error(r(317));
							s[Vi] = t;
						} else Ua(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Cc(t), s = !1;
					} else Fa !== null && (Il(Fa), Fa = null), s = !0;
					if (!s) return t.flags & 65536 ? t : null;
				}
				return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || Ao.current & 1 ? ul === 0 && (ul = 3) : Kl())), t.updateQueue !== null && (t.flags |= 4), Cc(t), null);
			case 4: return Do(), e === null && _i(t.stateNode.containerInfo), Cc(t), null;
			case 10: return ro(t.type._context), Cc(t), null;
			case 17: return sa(t.type) && ca(), Cc(t), null;
			case 19:
				if (ea(Ao), s = t.memoizedState, s === null) return Cc(t), null;
				if (i = !!(t.flags & 128), c = s.rendering, c === null) {
					if (i) Sc(s, !1);
					else {
						if (ul !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (c = jo(e), c !== null) {
								for (t.flags |= 128, Sc(s, !1), i = c.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null;) s = n, e = i, s.flags &= 14680066, c = s.alternate, c === null ? (s.childLanes = 0, s.lanes = e, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = c.childLanes, s.lanes = c.lanes, s.child = c.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = c.memoizedProps, s.memoizedState = c.memoizedState, s.updateQueue = c.updateQueue, s.type = c.type, e = c.dependencies, s.dependencies = e === null ? null : {
									lanes: e.lanes,
									firstContext: e.firstContext
								}), n = n.sibling;
								return ta(Ao, Ao.current & 1 | 2), t.child;
							}
							e = e.sibling;
						}
						s.tail !== null && Et() > vl && (t.flags |= 128, i = !0, Sc(s, !1), t.lanes = 4194304);
					}
				} else {
					if (!i) {
						if (e = jo(c), e !== null) {
							if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Sc(s, !0), s.tail === null && s.tailMode === "hidden" && !c.alternate && !Pa) return Cc(t), null;
						} else 2 * Et() - s.renderingStartTime > vl && n !== 1073741824 && (t.flags |= 128, i = !0, Sc(s, !1), t.lanes = 4194304);
					}
					s.isBackwards ? (c.sibling = t.child, t.child = c) : (n = s.last, n === null ? t.child = c : n.sibling = c, s.last = c);
				}
				return s.tail === null ? (Cc(t), null) : (t = s.tail, s.rendering = t, s.tail = t.sibling, s.renderingStartTime = Et(), t.sibling = null, n = Ao.current, ta(Ao, i ? n & 1 | 2 : n & 1), t);
			case 22:
			case 23: return Hl(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? cl & 1073741824 && (Cc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Cc(t), null;
			case 24: return null;
			case 25: return null;
		}
		throw Error(r(156, t.tag));
	}
	function Tc(e, t) {
		switch (ja(t), t.tag) {
			case 1: return sa(t.type) && ca(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Do(), ea(ia), ea(ra), No(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 5: return ko(t), null;
			case 13:
				if (ea(Ao), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(r(340));
					Ua();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return ea(Ao), null;
			case 4: return Do(), null;
			case 10: return ro(t.type._context), null;
			case 22:
			case 23: return Hl(), null;
			case 24: return null;
			default: return null;
		}
	}
	var Ec = !1, Dc = !1, Oc = typeof WeakSet == "function" ? WeakSet : Set, F = null;
	function kc(e, t) {
		var n = e.ref;
		if (n !== null) {
			if (typeof n == "function") try {
				n(null);
			} catch (n) {
				nu(e, t, n);
			}
			else n.current = null;
		}
	}
	function Ac(e, t, n) {
		try {
			n();
		} catch (n) {
			nu(e, t, n);
		}
	}
	var jc = !1;
	function Mc(e, t) {
		if (ki = Cn, e = Vr(), Hr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var i = n.getSelection && n.getSelection();
				if (i && i.rangeCount !== 0) {
					n = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (Ai = {
			focusedElem: e,
			selectionRange: n
		}, Cn = !1, F = t; F !== null;) if (t = F, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, F = e;
		else for (; F !== null;) {
			t = F;
			try {
				var h = t.alternate;
				if (t.flags & 1024) switch (t.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						if (h !== null) {
							var g = h.memoizedProps, _ = h.memoizedState, v = t.stateNode;
							v.__reactInternalSnapshotBeforeUpdate = v.getSnapshotBeforeUpdate(t.elementType === t.type ? g : Ms(t.type, g), _);
						}
						break;
					case 3:
						var y = t.stateNode.containerInfo;
						y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
						break;
					case 5:
					case 6:
					case 4:
					case 17: break;
					default: throw Error(r(163));
				}
			} catch (e) {
				nu(t, t.return, e);
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, F = e;
				break;
			}
			F = t.return;
		}
		return h = jc, jc = !1, h;
	}
	function Nc(e, t, n) {
		var r = t.updateQueue;
		if (r = r === null ? null : r.lastEffect, r !== null) {
			var i = r = r.next;
			do {
				if ((i.tag & e) === e) {
					var a = i.destroy;
					i.destroy = void 0, a !== void 0 && Ac(t, n, a);
				}
				i = i.next;
			} while (i !== r);
		}
	}
	function Pc(e, t) {
		if (t = t.updateQueue, t = t === null ? null : t.lastEffect, t !== null) {
			var n = t = t.next;
			do {
				if ((n.tag & e) === e) {
					var r = n.create;
					n.destroy = r();
				}
				n = n.next;
			} while (n !== t);
		}
	}
	function Fc(e) {
		var t = e.ref;
		if (t !== null) {
			var n = e.stateNode;
			switch (e.tag) {
				case 5:
					e = n;
					break;
				default: e = n;
			}
			typeof t == "function" ? t(e) : t.current = e;
		}
	}
	function Ic(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, Ic(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Vi], delete t[Hi], delete t[Wi], delete t[Gi], delete t[Ki])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	function Lc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 4;
	}
	function Rc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Lc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function zc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Oi));
		else if (r !== 4 && (e = e.child, e !== null)) for (zc(e, t, n), e = e.sibling; e !== null;) zc(e, t, n), e = e.sibling;
	}
	function Bc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (e = e.child, e !== null)) for (Bc(e, t, n), e = e.sibling; e !== null;) Bc(e, t, n), e = e.sibling;
	}
	var Vc = null, Hc = !1;
	function Uc(e, t, n) {
		for (n = n.child; n !== null;) Wc(e, t, n), n = n.sibling;
	}
	function Wc(e, t, n) {
		if (Pt && typeof Pt.onCommitFiberUnmount == "function") try {
			Pt.onCommitFiberUnmount(Nt, n);
		} catch {}
		switch (n.tag) {
			case 5: Dc || kc(n, t);
			case 6:
				var r = Vc, i = Hc;
				Vc = null, Uc(e, t, n), Vc = r, Hc = i, Vc !== null && (Hc ? (e = Vc, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Vc.removeChild(n.stateNode));
				break;
			case 18:
				Vc !== null && (Hc ? (e = Vc, n = n.stateNode, e.nodeType === 8 ? Li(e.parentNode, n) : e.nodeType === 1 && Li(e, n), xn(e)) : Li(Vc, n.stateNode));
				break;
			case 4:
				r = Vc, i = Hc, Vc = n.stateNode.containerInfo, Hc = !0, Uc(e, t, n), Vc = r, Hc = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				if (!Dc && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
					i = r = r.next;
					do {
						var a = i, o = a.destroy;
						a = a.tag, o !== void 0 && (a & 2 || a & 4) && Ac(n, t, o), i = i.next;
					} while (i !== r);
				}
				Uc(e, t, n);
				break;
			case 1:
				if (!Dc && (kc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
					r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
				} catch (e) {
					nu(n, t, e);
				}
				Uc(e, t, n);
				break;
			case 21:
				Uc(e, t, n);
				break;
			case 22:
				n.mode & 1 ? (Dc = (r = Dc) || n.memoizedState !== null, Uc(e, t, n), Dc = r) : Uc(e, t, n);
				break;
			default: Uc(e, t, n);
		}
	}
	function Gc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			e.updateQueue = null;
			var n = e.stateNode;
			n === null && (n = e.stateNode = new Oc()), t.forEach(function(t) {
				var r = ou.bind(null, e, t);
				n.has(t) || (n.add(t), t.then(r, r));
			});
		}
	}
	function Kc(e, t) {
		var n = t.deletions;
		if (n !== null) for (var i = 0; i < n.length; i++) {
			var a = n[i];
			try {
				var o = e, s = t, c = s;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 5:
							Vc = c.stateNode, Hc = !1;
							break a;
						case 3:
							Vc = c.stateNode.containerInfo, Hc = !0;
							break a;
						case 4:
							Vc = c.stateNode.containerInfo, Hc = !0;
							break a;
					}
					c = c.return;
				}
				if (Vc === null) throw Error(r(160));
				Wc(o, s, a), Vc = null, Hc = !1;
				var l = a.alternate;
				l !== null && (l.return = null), a.return = null;
			} catch (e) {
				nu(a, t, e);
			}
		}
		if (t.subtreeFlags & 12854) for (t = t.child; t !== null;) qc(t, e), t = t.sibling;
	}
	function qc(e, t) {
		var n = e.alternate, i = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (Kc(t, e), Jc(e), i & 4) {
					try {
						Nc(3, e, e.return), Pc(3, e);
					} catch (t) {
						nu(e, e.return, t);
					}
					try {
						Nc(5, e, e.return);
					} catch (t) {
						nu(e, e.return, t);
					}
				}
				break;
			case 1:
				Kc(t, e), Jc(e), i & 512 && n !== null && kc(n, n.return);
				break;
			case 5:
				if (Kc(t, e), Jc(e), i & 512 && n !== null && kc(n, n.return), e.flags & 32) {
					var a = e.stateNode;
					try {
						ze(a, "");
					} catch (t) {
						nu(e, e.return, t);
					}
				}
				if (i & 4 && (a = e.stateNode, a != null)) {
					var o = e.memoizedProps, s = n === null ? o : n.memoizedProps, c = e.type, l = e.updateQueue;
					if (e.updateQueue = null, l !== null) try {
						c === "input" && o.type === "radio" && o.name != null && Ee(a, o), Ke(c, s);
						var u = Ke(c, o);
						for (s = 0; s < l.length; s += 2) {
							var d = l[s], f = l[s + 1];
							d === "style" ? Ue(a, f) : d === "dangerouslySetInnerHTML" ? Re(a, f) : d === "children" ? ze(a, f) : S(a, d, f, u);
						}
						switch (c) {
							case "input":
								De(a, o);
								break;
							case "textarea":
								Ne(a, o);
								break;
							case "select":
								var p = a._wrapperState.wasMultiple;
								a._wrapperState.wasMultiple = !!o.multiple;
								var m = o.value;
								m == null ? p !== !!o.multiple && (o.defaultValue == null ? Ae(a, !!o.multiple, o.multiple ? [] : "", !1) : Ae(a, !!o.multiple, o.defaultValue, !0)) : Ae(a, !!o.multiple, m, !1);
						}
						a[Hi] = o;
					} catch (t) {
						nu(e, e.return, t);
					}
				}
				break;
			case 6:
				if (Kc(t, e), Jc(e), i & 4) {
					if (e.stateNode === null) throw Error(r(162));
					a = e.stateNode, o = e.memoizedProps;
					try {
						a.nodeValue = o;
					} catch (t) {
						nu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Kc(t, e), Jc(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
					xn(t.containerInfo);
				} catch (t) {
					nu(e, e.return, t);
				}
				break;
			case 4:
				Kc(t, e), Jc(e);
				break;
			case 13:
				Kc(t, e), Jc(e), a = e.child, a.flags & 8192 && (o = a.memoizedState !== null, a.stateNode.isHidden = o, !o || a.alternate !== null && a.alternate.memoizedState !== null || (_l = Et())), i & 4 && Gc(e);
				break;
			case 22:
				if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (Dc = (u = Dc) || d, Kc(t, e), Dc = u) : Kc(t, e), Jc(e), i & 8192) {
					if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !d && e.mode & 1) for (F = e, d = e.child; d !== null;) {
						for (f = F = d; F !== null;) {
							switch (p = F, m = p.child, p.tag) {
								case 0:
								case 11:
								case 14:
								case 15:
									Nc(4, p, p.return);
									break;
								case 1:
									kc(p, p.return);
									var h = p.stateNode;
									if (typeof h.componentWillUnmount == "function") {
										i = p, n = p.return;
										try {
											t = i, h.props = t.memoizedProps, h.state = t.memoizedState, h.componentWillUnmount();
										} catch (e) {
											nu(i, n, e);
										}
									}
									break;
								case 5:
									kc(p, p.return);
									break;
								case 22: if (p.memoizedState !== null) {
									Qc(f);
									continue;
								}
							}
							m === null ? Qc(f) : (m.return = p, F = m);
						}
						d = d.sibling;
					}
					a: for (d = null, f = e;;) {
						if (f.tag === 5) {
							if (d === null) {
								d = f;
								try {
									a = f.stateNode, u ? (o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (c = f.stateNode, l = f.memoizedProps.style, s = l != null && l.hasOwnProperty("display") ? l.display : null, c.style.display = He("display", s));
								} catch (t) {
									nu(e, e.return, t);
								}
							}
						} else if (f.tag === 6) {
							if (d === null) try {
								f.stateNode.nodeValue = u ? "" : f.memoizedProps;
							} catch (t) {
								nu(e, e.return, t);
							}
						} else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
							f.child.return = f, f = f.child;
							continue;
						}
						if (f === e) break a;
						for (; f.sibling === null;) {
							if (f.return === null || f.return === e) break a;
							d === f && (d = null), f = f.return;
						}
						d === f && (d = null), f.sibling.return = f.return, f = f.sibling;
					}
				}
				break;
			case 19:
				Kc(t, e), Jc(e), i & 4 && Gc(e);
				break;
			case 21: break;
			default: Kc(t, e), Jc(e);
		}
	}
	function Jc(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				a: {
					for (var n = e.return; n !== null;) {
						if (Lc(n)) {
							var i = n;
							break a;
						}
						n = n.return;
					}
					throw Error(r(160));
				}
				switch (i.tag) {
					case 5:
						var a = i.stateNode;
						i.flags & 32 && (ze(a, ""), i.flags &= -33), Bc(e, Rc(e), a);
						break;
					case 3:
					case 4:
						var o = i.stateNode.containerInfo;
						zc(e, Rc(e), o);
						break;
					default: throw Error(r(161));
				}
			} catch (t) {
				nu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Yc(e, t, n) {
		F = e, Xc(e, t, n);
	}
	function Xc(e, t, n) {
		for (var r = !!(e.mode & 1); F !== null;) {
			var i = F, a = i.child;
			if (i.tag === 22 && r) {
				var o = i.memoizedState !== null || Ec;
				if (!o) {
					var s = i.alternate, c = s !== null && s.memoizedState !== null || Dc;
					s = Ec;
					var l = Dc;
					if (Ec = o, (Dc = c) && !l) for (F = i; F !== null;) o = F, c = o.child, o.tag === 22 && o.memoizedState !== null || c === null ? $c(i) : (c.return = o, F = c);
					for (; a !== null;) F = a, Xc(a, t, n), a = a.sibling;
					F = i, Ec = s, Dc = l;
				}
				Zc(e, t, n);
			} else i.subtreeFlags & 8772 && a !== null ? (a.return = i, F = a) : Zc(e, t, n);
		}
	}
	function Zc(e) {
		for (; F !== null;) {
			var t = F;
			if (t.flags & 8772) {
				var n = t.alternate;
				try {
					if (t.flags & 8772) switch (t.tag) {
						case 0:
						case 11:
						case 15:
							Dc || Pc(5, t);
							break;
						case 1:
							var i = t.stateNode;
							if (t.flags & 4 && !Dc) {
								if (n === null) i.componentDidMount();
								else {
									var a = t.elementType === t.type ? n.memoizedProps : Ms(t.type, n.memoizedProps);
									i.componentDidUpdate(a, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
								}
							}
							var o = t.updateQueue;
							o !== null && bo(t, o, i);
							break;
						case 3:
							var s = t.updateQueue;
							if (s !== null) {
								if (n = null, t.child !== null) switch (t.child.tag) {
									case 5:
										n = t.child.stateNode;
										break;
									case 1: n = t.child.stateNode;
								}
								bo(t, s, n);
							}
							break;
						case 5:
							var c = t.stateNode;
							if (n === null && t.flags & 4) {
								n = c;
								var l = t.memoizedProps;
								switch (t.type) {
									case "button":
									case "input":
									case "select":
									case "textarea":
										l.autoFocus && n.focus();
										break;
									case "img": l.src && (n.src = l.src);
								}
							}
							break;
						case 6: break;
						case 4: break;
						case 12: break;
						case 13:
							if (t.memoizedState === null) {
								var u = t.alternate;
								if (u !== null) {
									var d = u.memoizedState;
									if (d !== null) {
										var f = d.dehydrated;
										f !== null && xn(f);
									}
								}
							}
							break;
						case 19:
						case 17:
						case 21:
						case 22:
						case 23:
						case 25: break;
						default: throw Error(r(163));
					}
					Dc || t.flags & 512 && Fc(t);
				} catch (e) {
					nu(t, t.return, e);
				}
			}
			if (t === e) {
				F = null;
				break;
			}
			if (n = t.sibling, n !== null) {
				n.return = t.return, F = n;
				break;
			}
			F = t.return;
		}
	}
	function Qc(e) {
		for (; F !== null;) {
			var t = F;
			if (t === e) {
				F = null;
				break;
			}
			var n = t.sibling;
			if (n !== null) {
				n.return = t.return, F = n;
				break;
			}
			F = t.return;
		}
	}
	function $c(e) {
		for (; F !== null;) {
			var t = F;
			try {
				switch (t.tag) {
					case 0:
					case 11:
					case 15:
						var n = t.return;
						try {
							Pc(4, t);
						} catch (e) {
							nu(t, n, e);
						}
						break;
					case 1:
						var r = t.stateNode;
						if (typeof r.componentDidMount == "function") {
							var i = t.return;
							try {
								r.componentDidMount();
							} catch (e) {
								nu(t, i, e);
							}
						}
						var a = t.return;
						try {
							Fc(t);
						} catch (e) {
							nu(t, a, e);
						}
						break;
					case 5:
						var o = t.return;
						try {
							Fc(t);
						} catch (e) {
							nu(t, o, e);
						}
				}
			} catch (e) {
				nu(t, t.return, e);
			}
			if (t === e) {
				F = null;
				break;
			}
			var s = t.sibling;
			if (s !== null) {
				s.return = t.return, F = s;
				break;
			}
			F = t.return;
		}
	}
	var el = Math.ceil, tl = C.ReactCurrentDispatcher, nl = C.ReactCurrentOwner, rl = C.ReactCurrentBatchConfig, il = 0, al = null, ol = null, sl = 0, cl = 0, ll = $i(0), ul = 0, dl = null, fl = 0, pl = 0, ml = 0, hl = null, gl = null, _l = 0, vl = Infinity, yl = null, bl = !1, xl = null, Sl = null, Cl = !1, wl = null, Tl = 0, El = 0, Dl = null, Ol = -1, kl = 0;
	function Al() {
		return il & 6 ? Et() : Ol === -1 ? Ol = Et() : Ol;
	}
	function jl(e) {
		return e.mode & 1 ? il & 2 && sl !== 0 ? sl & -sl : Ga.transition === null ? (e = Xt, e === 0 ? (e = window.event, e = e === void 0 ? 16 : kn(e.type), e) : e) : (kl === 0 && (kl = A()), kl) : 1;
	}
	function Ml(e, t, n, i) {
		if (50 < El) throw El = 0, Dl = null, Error(r(185));
		Jt(e, n, i), (!(il & 2) || e !== al) && (e === al && (!(il & 2) && (pl |= n), ul === 4 && Rl(e, sl)), Nl(e, i), n === 1 && il === 0 && !(t.mode & 1) && (vl = Et() + 500, ma && va()));
	}
	function Nl(e, t) {
		var n = e.callbackNode;
		Gt(e, t);
		var r = Ut(e, e === al ? sl : 0);
		if (r === 0) n !== null && Ct(n), e.callbackNode = null, e.callbackPriority = 0;
		else if (t = r & -r, e.callbackPriority !== t) {
			if (n != null && Ct(n), t === 1) e.tag === 0 ? _a(zl.bind(null, e)) : ga(zl.bind(null, e)), Fi(function() {
				!(il & 6) && va();
			}), n = null;
			else {
				switch (Zt(r)) {
					case 1:
						n = Ot;
						break;
					case 4:
						n = kt;
						break;
					case 16:
						n = At;
						break;
					case 536870912:
						n = Mt;
						break;
					default: n = At;
				}
				n = cu(n, Pl.bind(null, e));
			}
			e.callbackPriority = t, e.callbackNode = n;
		}
	}
	function Pl(e, t) {
		if (Ol = -1, kl = 0, il & 6) throw Error(r(327));
		var n = e.callbackNode;
		if (eu() && e.callbackNode !== n) return null;
		var i = Ut(e, e === al ? sl : 0);
		if (i === 0) return null;
		if (i & 30 || (i & e.expiredLanes) !== 0 || t) t = ql(e, i);
		else {
			t = i;
			var a = il;
			il |= 2;
			var o = Gl();
			(al !== e || sl !== t) && (yl = null, vl = Et() + 500, Ul(e, t));
			do
				try {
					Yl();
					break;
				} catch (t) {
					Wl(e, t);
				}
			while (1);
			no(), tl.current = o, il = a, ol === null ? (al = null, sl = 0, t = ul) : t = 0;
		}
		if (t !== 0) {
			if (t === 2 && (a = Kt(e), a !== 0 && (i = a, t = Fl(e, a))), t === 1) throw n = dl, Ul(e, 0), Rl(e, i), Nl(e, Et()), n;
			if (t === 6) Rl(e, i);
			else {
				if (a = e.current.alternate, !(i & 30) && !Ll(a) && (t = ql(e, i), t === 2 && (o = Kt(e), o !== 0 && (i = o, t = Fl(e, o))), t === 1)) throw n = dl, Ul(e, 0), Rl(e, i), Nl(e, Et()), n;
				switch (e.finishedWork = a, e.finishedLanes = i, t) {
					case 0:
					case 1: throw Error(r(345));
					case 2:
						Ql(e, gl, yl);
						break;
					case 3:
						if (Rl(e, i), (i & 130023424) === i && (t = _l + 500 - Et(), 10 < t)) {
							if (Ut(e, 0) !== 0) break;
							if (a = e.suspendedLanes, (a & i) !== i) {
								Al(), e.pingedLanes |= e.suspendedLanes & a;
								break;
							}
							e.timeoutHandle = Mi(Ql.bind(null, e, gl, yl), t);
							break;
						}
						Ql(e, gl, yl);
						break;
					case 4:
						if (Rl(e, i), (i & 4194240) === i) break;
						for (t = e.eventTimes, a = -1; 0 < i;) {
							var s = 31 - It(i);
							o = 1 << s, s = t[s], s > a && (a = s), i &= ~o;
						}
						if (i = a, i = Et() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * el(i / 1960)) - i, 10 < i) {
							e.timeoutHandle = Mi(Ql.bind(null, e, gl, yl), i);
							break;
						}
						Ql(e, gl, yl);
						break;
					case 5:
						Ql(e, gl, yl);
						break;
					default: throw Error(r(329));
				}
			}
		}
		return Nl(e, Et()), e.callbackNode === n ? Pl.bind(null, e) : null;
	}
	function Fl(e, t) {
		var n = hl;
		return e.current.memoizedState.isDehydrated && (Ul(e, t).flags |= 256), e = ql(e, t), e !== 2 && (t = gl, gl = n, t !== null && Il(t)), e;
	}
	function Il(e) {
		gl === null ? gl = e : gl.push.apply(gl, e);
	}
	function Ll(e) {
		for (var t = e;;) {
			if (t.flags & 16384) {
				var n = t.updateQueue;
				if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!Lr(a(), i)) return !1;
					} catch {
						return !1;
					}
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Rl(e, t) {
		for (t &= ~ml, t &= ~pl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
			var n = 31 - It(t), r = 1 << n;
			e[n] = -1, t &= ~r;
		}
	}
	function zl(e) {
		if (il & 6) throw Error(r(327));
		eu();
		var t = Ut(e, 0);
		if (!(t & 1)) return Nl(e, Et()), null;
		var n = ql(e, t);
		if (e.tag !== 0 && n === 2) {
			var i = Kt(e);
			i !== 0 && (t = i, n = Fl(e, i));
		}
		if (n === 1) throw n = dl, Ul(e, 0), Rl(e, t), Nl(e, Et()), n;
		if (n === 6) throw Error(r(345));
		return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ql(e, gl, yl), Nl(e, Et()), null;
	}
	function Bl(e, t) {
		var n = il;
		il |= 1;
		try {
			return e(t);
		} finally {
			il = n, il === 0 && (vl = Et() + 500, ma && va());
		}
	}
	function Vl(e) {
		wl !== null && wl.tag === 0 && !(il & 6) && eu();
		var t = il;
		il |= 1;
		var n = rl.transition, r = Xt;
		try {
			if (rl.transition = null, Xt = 1, e) return e();
		} finally {
			Xt = r, rl.transition = n, il = t, !(il & 6) && va();
		}
	}
	function Hl() {
		cl = ll.current, ea(ll);
	}
	function Ul(e, t) {
		e.finishedWork = null, e.finishedLanes = 0;
		var n = e.timeoutHandle;
		if (n !== -1 && (e.timeoutHandle = -1, Ni(n)), ol !== null) for (n = ol.return; n !== null;) {
			var r = n;
			switch (ja(r), r.tag) {
				case 1:
					r = r.type.childContextTypes, r != null && ca();
					break;
				case 3:
					Do(), ea(ia), ea(ra), No();
					break;
				case 5:
					ko(r);
					break;
				case 4:
					Do();
					break;
				case 13:
					ea(Ao);
					break;
				case 19:
					ea(Ao);
					break;
				case 10:
					ro(r.type._context);
					break;
				case 22:
				case 23: Hl();
			}
			n = n.return;
		}
		if (al = e, ol = e = pu(e.current, null), sl = cl = t, ul = 0, dl = null, ml = pl = fl = 0, gl = hl = null, so !== null) {
			for (t = 0; t < so.length; t++) if (n = so[t], r = n.interleaved, r !== null) {
				n.interleaved = null;
				var i = r.next, a = n.pending;
				if (a !== null) {
					var o = a.next;
					a.next = i, r.next = o;
				}
				n.pending = r;
			}
			so = null;
		}
		return e;
	}
	function Wl(e, t) {
		do {
			var n = ol;
			try {
				if (no(), Po.current = Os, Bo) {
					for (var i = Lo.memoizedState; i !== null;) {
						var a = i.queue;
						a !== null && (a.pending = null), i = i.next;
					}
					Bo = !1;
				}
				if (Io = 0, zo = Ro = Lo = null, Vo = !1, Ho = 0, nl.current = null, n === null || n.return === null) {
					ul = 1, dl = t, ol = null;
					break;
				}
				a: {
					var o = e, s = n.return, c = n, l = t;
					if (t = sl, c.flags |= 32768, typeof l == "object" && l && typeof l.then == "function") {
						var u = l, d = c, f = d.tag;
						if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
							var p = d.alternate;
							p ? (d.updateQueue = p.updateQueue, d.memoizedState = p.memoizedState, d.lanes = p.lanes) : (d.updateQueue = null, d.memoizedState = null);
						}
						var m = Ks(s);
						if (m !== null) {
							m.flags &= -257, qs(m, s, c, o, t), m.mode & 1 && Gs(o, u, t), t = m, l = u;
							var h = t.updateQueue;
							if (h === null) {
								var g = /* @__PURE__ */ new Set();
								g.add(l), t.updateQueue = g;
							} else h.add(l);
							break a;
						}
						if (!(t & 1)) {
							Gs(o, u, t), Kl();
							break a;
						}
						l = Error(r(426));
					} else if (Pa && c.mode & 1) {
						var _ = Ks(s);
						if (_ !== null) {
							!(_.flags & 65536) && (_.flags |= 256), qs(_, s, c, o, t), Wa(zs(l, c));
							break a;
						}
					}
					o = l = zs(l, c), ul !== 4 && (ul = 2), hl === null ? hl = [o] : hl.push(o), o = s;
					do {
						switch (o.tag) {
							case 3:
								o.flags |= 65536, t &= -t, o.lanes |= t;
								var v = Us(o, l, t);
								vo(o, v);
								break a;
							case 1:
								c = l;
								var y = o.type, b = o.stateNode;
								if (!(o.flags & 128) && (typeof y.getDerivedStateFromError == "function" || b !== null && typeof b.componentDidCatch == "function" && (Sl === null || !Sl.has(b)))) {
									o.flags |= 65536, t &= -t, o.lanes |= t;
									var x = Ws(o, c, t);
									vo(o, x);
									break a;
								}
						}
						o = o.return;
					} while (o !== null);
				}
				Zl(n);
			} catch (e) {
				t = e, ol === n && n !== null && (ol = n = n.return);
				continue;
			}
			break;
		} while (1);
	}
	function Gl() {
		var e = tl.current;
		return tl.current = Os, e === null ? Os : e;
	}
	function Kl() {
		(ul === 0 || ul === 3 || ul === 2) && (ul = 4), al === null || !(fl & 268435455) && !(pl & 268435455) || Rl(al, sl);
	}
	function ql(e, t) {
		var n = il;
		il |= 2;
		var i = Gl();
		(al !== e || sl !== t) && (yl = null, Ul(e, t));
		do
			try {
				Jl();
				break;
			} catch (t) {
				Wl(e, t);
			}
		while (1);
		if (no(), il = n, tl.current = i, ol !== null) throw Error(r(261));
		return al = null, sl = 0, ul;
	}
	function Jl() {
		for (; ol !== null;) Xl(ol);
	}
	function Yl() {
		for (; ol !== null && !wt();) Xl(ol);
	}
	function Xl(e) {
		var t = su(e.alternate, e, cl);
		e.memoizedProps = e.pendingProps, t === null ? Zl(e) : ol = t, nl.current = null;
	}
	function Zl(e) {
		var t = e;
		do {
			var n = t.alternate;
			if (e = t.return, t.flags & 32768) {
				if (n = Tc(n, t), n !== null) {
					n.flags &= 32767, ol = n;
					return;
				}
				if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
				else {
					ul = 6, ol = null;
					return;
				}
			} else if (n = wc(n, t, cl), n !== null) {
				ol = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				ol = t;
				return;
			}
			ol = t = e;
		} while (t !== null);
		ul === 0 && (ul = 5);
	}
	function Ql(e, t, n) {
		var r = Xt, i = rl.transition;
		try {
			rl.transition = null, Xt = 1, $l(e, t, n, r);
		} finally {
			rl.transition = i, Xt = r;
		}
		return null;
	}
	function $l(e, t, n, i) {
		do
			eu();
		while (wl !== null);
		if (il & 6) throw Error(r(327));
		n = e.finishedWork;
		var a = e.finishedLanes;
		if (n === null) return null;
		if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(r(177));
		e.callbackNode = null, e.callbackPriority = 0;
		var o = n.lanes | n.childLanes;
		if (j(e, o), e === al && (ol = al = null, sl = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Cl || (Cl = !0, cu(At, function() {
			return eu(), null;
		})), o = !!(n.flags & 15990), n.subtreeFlags & 15990 || o) {
			o = rl.transition, rl.transition = null;
			var s = Xt;
			Xt = 1;
			var c = il;
			il |= 4, nl.current = null, Mc(e, n), qc(n, e), Ur(Ai), Cn = !!ki, Ai = ki = null, e.current = n, Yc(n, e, a), Tt(), il = c, Xt = s, rl.transition = o;
		} else e.current = n;
		if (Cl && (Cl = !1, wl = e, Tl = a), o = e.pendingLanes, o === 0 && (Sl = null), Ft(n.stateNode, i), Nl(e, Et()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], i(a.value, {
			componentStack: a.stack,
			digest: a.digest
		});
		if (bl) throw bl = !1, e = xl, xl = null, e;
		return Tl & 1 && e.tag !== 0 && eu(), o = e.pendingLanes, o & 1 ? e === Dl ? El++ : (El = 0, Dl = e) : El = 0, va(), null;
	}
	function eu() {
		if (wl !== null) {
			var e = Zt(Tl), t = rl.transition, n = Xt;
			try {
				if (rl.transition = null, Xt = 16 > e ? 16 : e, wl === null) var i = !1;
				else {
					if (e = wl, wl = null, Tl = 0, il & 6) throw Error(r(331));
					var a = il;
					for (il |= 4, F = e.current; F !== null;) {
						var o = F, s = o.child;
						if (F.flags & 16) {
							var c = o.deletions;
							if (c !== null) {
								for (var l = 0; l < c.length; l++) {
									var u = c[l];
									for (F = u; F !== null;) {
										var d = F;
										switch (d.tag) {
											case 0:
											case 11:
											case 15: Nc(8, d, o);
										}
										var f = d.child;
										if (f !== null) f.return = d, F = f;
										else for (; F !== null;) {
											d = F;
											var p = d.sibling, m = d.return;
											if (Ic(d), d === u) {
												F = null;
												break;
											}
											if (p !== null) {
												p.return = m, F = p;
												break;
											}
											F = m;
										}
									}
								}
								var h = o.alternate;
								if (h !== null) {
									var g = h.child;
									if (g !== null) {
										h.child = null;
										do {
											var _ = g.sibling;
											g.sibling = null, g = _;
										} while (g !== null);
									}
								}
								F = o;
							}
						}
						if (o.subtreeFlags & 2064 && s !== null) s.return = o, F = s;
						else b: for (; F !== null;) {
							if (o = F, o.flags & 2048) switch (o.tag) {
								case 0:
								case 11:
								case 15: Nc(9, o, o.return);
							}
							var v = o.sibling;
							if (v !== null) {
								v.return = o.return, F = v;
								break b;
							}
							F = o.return;
						}
					}
					var y = e.current;
					for (F = y; F !== null;) {
						s = F;
						var b = s.child;
						if (s.subtreeFlags & 2064 && b !== null) b.return = s, F = b;
						else b: for (s = y; F !== null;) {
							if (c = F, c.flags & 2048) try {
								switch (c.tag) {
									case 0:
									case 11:
									case 15: Pc(9, c);
								}
							} catch (e) {
								nu(c, c.return, e);
							}
							if (c === s) {
								F = null;
								break b;
							}
							var x = c.sibling;
							if (x !== null) {
								x.return = c.return, F = x;
								break b;
							}
							F = c.return;
						}
					}
					if (il = a, va(), Pt && typeof Pt.onPostCommitFiberRoot == "function") try {
						Pt.onPostCommitFiberRoot(Nt, e);
					} catch {}
					i = !0;
				}
				return i;
			} finally {
				Xt = n, rl.transition = t;
			}
		}
		return !1;
	}
	function tu(e, t, n) {
		t = zs(n, t), t = Us(e, t, 1), e = go(e, t, 1), t = Al(), e !== null && (Jt(e, 1, t), Nl(e, t));
	}
	function nu(e, t, n) {
		if (e.tag === 3) tu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				tu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Sl === null || !Sl.has(r))) {
					e = zs(n, e), e = Ws(t, e, 1), t = go(t, e, 1), e = Al(), t !== null && (Jt(t, 1, e), Nl(t, e));
					break;
				}
			}
			t = t.return;
		}
	}
	function ru(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), t = Al(), e.pingedLanes |= e.suspendedLanes & n, al === e && (sl & n) === n && (ul === 4 || ul === 3 && (sl & 130023424) === sl && 500 > Et() - _l ? Ul(e, 0) : ml |= n), Nl(e, t);
	}
	function iu(e, t) {
		t === 0 && (e.mode & 1 ? (t = Vt, Vt <<= 1, !(Vt & 130023424) && (Vt = 4194304)) : t = 1);
		var n = Al();
		e = uo(e, t), e !== null && (Jt(e, t, n), Nl(e, n));
	}
	function au(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), iu(e, n);
	}
	function ou(e, t) {
		var n = 0;
		switch (e.tag) {
			case 13:
				var i = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				i = e.stateNode;
				break;
			default: throw Error(r(314));
		}
		i !== null && i.delete(t), iu(e, n);
	}
	var su = function(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps || ia.current) Ys = !0;
			else {
				if ((e.lanes & n) === 0 && !(t.flags & 128)) return Ys = !1, vc(e, t, n);
				Ys = !!(e.flags & 131072);
			}
		} else Ys = !1, Pa && t.flags & 1048576 && ka(t, Sa, t.index);
		switch (t.lanes = 0, t.tag) {
			case 2:
				var i = t.type;
				gc(e, t), e = t.pendingProps;
				var a = oa(t, ra.current);
				ao(t, n), a = Ko(null, t, i, e, a, n);
				var o = qo();
				return t.flags |= 1, typeof a == "object" && a && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, sa(i) ? (o = !0, da(t)) : o = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, po(t), a.updater = Ps, t.stateNode = a, a._reactInternals = t, Rs(t, i, e, n), t = ic(null, t, i, !0, o, n)) : (t.tag = 0, Pa && o && Aa(t), Xs(null, t, a, n), t = t.child), t;
			case 16:
				i = t.elementType;
				a: {
					switch (gc(e, t), e = t.pendingProps, a = i._init, i = a(i._payload), t.type = i, a = t.tag = fu(i), e = Ms(i, e), a) {
						case 0:
							t = nc(null, t, i, e, n);
							break a;
						case 1:
							t = rc(null, t, i, e, n);
							break a;
						case 11:
							t = Zs(null, t, i, e, n);
							break a;
						case 14:
							t = Qs(null, t, i, Ms(i.type, e), n);
							break a;
					}
					throw Error(r(306, i, ""));
				}
				return t;
			case 0: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : Ms(i, a), nc(e, t, i, a, n);
			case 1: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : Ms(i, a), rc(e, t, i, a, n);
			case 3:
				a: {
					if (ac(t), e === null) throw Error(r(387));
					i = t.pendingProps, o = t.memoizedState, a = o.element, mo(e, t), yo(t, i, null, n);
					var s = t.memoizedState;
					if (i = s.element, o.isDehydrated) {
						if (o = {
							element: i,
							isDehydrated: !1,
							cache: s.cache,
							pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
							transitions: s.transitions
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							a = zs(Error(r(423)), t), t = oc(e, t, i, n, a);
							break a;
						}
						if (i !== a) {
							a = zs(Error(r(424)), t), t = oc(e, t, i, n, a);
							break a;
						}
						for (Na = Ri(t.stateNode.containerInfo.firstChild), Ma = t, Pa = !0, Fa = null, n = Za(t, null, i, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					} else {
						if (Ua(), i === a) {
							t = _c(e, t, n);
							break a;
						}
						Xs(e, t, i, n);
					}
					t = t.child;
				}
				return t;
			case 5: return Oo(t), e === null && za(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, s = a.children, ji(i, a) ? s = null : o !== null && ji(i, o) && (t.flags |= 32), tc(e, t), Xs(e, t, s, n), t.child;
			case 6: return e === null && za(t), null;
			case 13: return lc(e, t, n);
			case 4: return Eo(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = Xa(t, null, i, n) : Xs(e, t, i, n), t.child;
			case 11: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : Ms(i, a), Zs(e, t, i, a, n);
			case 7: return Xs(e, t, t.pendingProps, n), t.child;
			case 8: return Xs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Xs(e, t, t.pendingProps.children, n), t.child;
			case 10:
				a: {
					if (i = t.type._context, a = t.pendingProps, o = t.memoizedProps, s = a.value, ta(Qa, i._currentValue), i._currentValue = s, o !== null) {
						if (Lr(o.value, s)) {
							if (o.children === a.children && !ia.current) {
								t = _c(e, t, n);
								break a;
							}
						} else for (o = t.child, o !== null && (o.return = t); o !== null;) {
							var c = o.dependencies;
							if (c !== null) {
								s = o.child;
								for (var l = c.firstContext; l !== null;) {
									if (l.context === i) {
										if (o.tag === 1) {
											l = ho(-1, n & -n), l.tag = 2;
											var u = o.updateQueue;
											if (u !== null) {
												u = u.shared;
												var d = u.pending;
												d === null ? l.next = l : (l.next = d.next, d.next = l), u.pending = l;
											}
										}
										o.lanes |= n, l = o.alternate, l !== null && (l.lanes |= n), io(o.return, n, t), c.lanes |= n;
										break;
									}
									l = l.next;
								}
							} else if (o.tag === 10) s = o.type === t.type ? null : o.child;
							else if (o.tag === 18) {
								if (s = o.return, s === null) throw Error(r(341));
								s.lanes |= n, c = s.alternate, c !== null && (c.lanes |= n), io(s, n, t), s = o.sibling;
							} else s = o.child;
							if (s !== null) s.return = o;
							else for (s = o; s !== null;) {
								if (s === t) {
									s = null;
									break;
								}
								if (o = s.sibling, o !== null) {
									o.return = s.return, s = o;
									break;
								}
								s = s.return;
							}
							o = s;
						}
					}
					Xs(e, t, a.children, n), t = t.child;
				}
				return t;
			case 9: return a = t.type, i = t.pendingProps.children, ao(t, n), a = oo(a), i = i(a), t.flags |= 1, Xs(e, t, i, n), t.child;
			case 14: return i = t.type, a = Ms(i, t.pendingProps), a = Ms(i.type, a), Qs(e, t, i, a, n);
			case 15: return $s(e, t, t.type, t.pendingProps, n);
			case 17: return i = t.type, a = t.pendingProps, a = t.elementType === i ? a : Ms(i, a), gc(e, t), t.tag = 1, sa(i) ? (e = !0, da(t)) : e = !1, ao(t, n), Is(t, i, a), Rs(t, i, a, n), ic(null, t, i, !0, e, n);
			case 19: return hc(e, t, n);
			case 22: return ec(e, t, n);
		}
		throw Error(r(156, t.tag));
	};
	function cu(e, t) {
		return St(e, t);
	}
	function lu(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function uu(e, t, n, r) {
		return new lu(e, t, n, r);
	}
	function du(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function fu(e) {
		if (typeof e == "function") return +!!du(e);
		if (e != null) {
			if (e = e.$$typeof, e === re) return 11;
			if (e === O) return 14;
		}
		return 2;
	}
	function pu(e, t) {
		var n = e.alternate;
		return n === null ? (n = uu(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
	}
	function mu(e, t, n, i, a, o) {
		var s = 2;
		if (i = e, typeof e == "function") du(e) && (s = 1);
		else if (typeof e == "string") s = 5;
		else a: switch (e) {
			case E: return hu(n.children, a, o, t);
			case ee:
				s = 8, a |= 8;
				break;
			case D: return e = uu(12, n, t, a | 2), e.elementType = D, e.lanes = o, e;
			case ie: return e = uu(13, n, t, a), e.elementType = ie, e.lanes = o, e;
			case ae: return e = uu(19, n, t, a), e.elementType = ae, e.lanes = o, e;
			case se: return gu(n, a, o, t);
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case te:
						s = 10;
						break a;
					case ne:
						s = 9;
						break a;
					case re:
						s = 11;
						break a;
					case O:
						s = 14;
						break a;
					case oe:
						s = 16, i = null;
						break a;
				}
				throw Error(r(130, e == null ? e : typeof e, ""));
		}
		return t = uu(s, n, t, a), t.elementType = e, t.type = i, t.lanes = o, t;
	}
	function hu(e, t, n, r) {
		return e = uu(7, e, r, t), e.lanes = n, e;
	}
	function gu(e, t, n, r) {
		return e = uu(22, e, r, t), e.elementType = se, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
	}
	function _u(e, t, n) {
		return e = uu(6, e, null, t), e.lanes = n, e;
	}
	function vu(e, t, n) {
		return t = uu(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	function yu(e, t, n, r, i) {
		this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = qt(0), this.expirationTimes = qt(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qt(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null;
	}
	function bu(e, t, n, r, i, a, o, s, c) {
		return e = new yu(e, t, n, s, c), t === 1 ? (t = 1, !0 === a && (t |= 8)) : t = 0, a = uu(3, null, null, t), e.current = a, a.stateNode = e, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null
		}, po(a), e;
	}
	function xu(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: T,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	function Su(e) {
		if (!e) return na;
		e = e._reactInternals;
		a: {
			if (gt(e) !== e || e.tag !== 1) throw Error(r(170));
			var t = e;
			do {
				switch (t.tag) {
					case 3:
						t = t.stateNode.context;
						break a;
					case 1: if (sa(t.type)) {
						t = t.stateNode.__reactInternalMemoizedMergedChildContext;
						break a;
					}
				}
				t = t.return;
			} while (t !== null);
			throw Error(r(171));
		}
		if (e.tag === 1) {
			var n = e.type;
			if (sa(n)) return ua(e, n, t);
		}
		return t;
	}
	function Cu(e, t, n, r, i, a, o, s, c) {
		return e = bu(n, r, !0, e, i, a, o, s, c), e.context = Su(null), n = e.current, r = Al(), i = jl(n), a = ho(r, i), a.callback = t ?? null, go(n, a, i), e.current.lanes = i, Jt(e, i, r), Nl(e, r), e;
	}
	function wu(e, t, n, r) {
		var i = t.current, a = Al(), o = jl(i);
		return n = Su(n), t.context === null ? t.context = n : t.pendingContext = n, t = ho(a, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = go(i, t, o), e !== null && (Ml(e, i, o, a), _o(e, i, o)), o;
	}
	function Tu(e) {
		if (e = e.current, !e.child) return null;
		switch (e.child.tag) {
			case 5: return e.child.stateNode;
			default: return e.child.stateNode;
		}
	}
	function Eu(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function Du(e, t) {
		Eu(e, t), (e = e.alternate) && Eu(e, t);
	}
	function Ou() {
		return null;
	}
	var ku = typeof reportError == "function" ? reportError : function(e) {
		console.error(e);
	};
	function Au(e) {
		this._internalRoot = e;
	}
	ju.prototype.render = Au.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(r(409));
		wu(e, t, null, null);
	}, ju.prototype.unmount = Au.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			Vl(function() {
				wu(null, e, null, null);
			}), t[Ui] = null;
		}
	};
	function ju(e) {
		this._internalRoot = e;
	}
	ju.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = tn();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < dn.length && t !== 0 && t < dn[n].priority; n++);
			dn.splice(n, 0, e), n === 0 && gn(e);
		}
	};
	function Mu(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function Nu(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
	}
	function Pu() {}
	function Fu(e, t, n, r, i) {
		if (i) {
			if (typeof r == "function") {
				var a = r;
				r = function() {
					var e = Tu(o);
					a.call(e);
				};
			}
			var o = Cu(t, r, e, 0, null, !1, !1, "", Pu);
			return e._reactRootContainer = o, e[Ui] = o.current, _i(e.nodeType === 8 ? e.parentNode : e), Vl(), o;
		}
		for (; i = e.lastChild;) e.removeChild(i);
		if (typeof r == "function") {
			var s = r;
			r = function() {
				var e = Tu(c);
				s.call(e);
			};
		}
		var c = bu(e, 0, !1, null, null, !1, !1, "", Pu);
		return e._reactRootContainer = c, e[Ui] = c.current, _i(e.nodeType === 8 ? e.parentNode : e), Vl(function() {
			wu(t, c, n, r);
		}), c;
	}
	function Iu(e, t, n, r, i) {
		var a = n._reactRootContainer;
		if (a) {
			var o = a;
			if (typeof i == "function") {
				var s = i;
				i = function() {
					var e = Tu(o);
					s.call(e);
				};
			}
			wu(t, o, e, i);
		} else o = Fu(n, t, e, i, r);
		return Tu(o);
	}
	Qt = function(e) {
		switch (e.tag) {
			case 3:
				var t = e.stateNode;
				if (t.current.memoizedState.isDehydrated) {
					var n = Ht(t.pendingLanes);
					n !== 0 && (Yt(t, n | 1), Nl(t, Et()), !(il & 6) && (vl = Et() + 500, va()));
				}
				break;
			case 13: Vl(function() {
				var t = uo(e, 1);
				t !== null && Ml(t, e, 1, Al());
			}), Du(e, 1);
		}
	}, $t = function(e) {
		if (e.tag === 13) {
			var t = uo(e, 134217728);
			t !== null && Ml(t, e, 134217728, Al()), Du(e, 134217728);
		}
	}, en = function(e) {
		if (e.tag === 13) {
			var t = jl(e), n = uo(e, t);
			n !== null && Ml(n, e, t, Al()), Du(e, t);
		}
	}, tn = function() {
		return Xt;
	}, nn = function(e, t) {
		var n = Xt;
		try {
			return Xt = e, t();
		} finally {
			Xt = n;
		}
	}, Ye = function(e, t, n) {
		switch (t) {
			case "input":
				if (De(e, n), t = n.name, n.type === "radio" && t != null) {
					for (n = e; n.parentNode;) n = n.parentNode;
					for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + "][type=\"radio\"]"), t = 0; t < n.length; t++) {
						var i = n[t];
						if (i !== e && i.form === e.form) {
							var a = Xi(i);
							if (!a) throw Error(r(90));
							Se(i), De(i, a);
						}
					}
				}
				break;
			case "textarea":
				Ne(e, n);
				break;
			case "select": t = n.value, t != null && Ae(e, !!n.multiple, t, !1);
		}
	}, tt = Bl, nt = Vl;
	var Lu = {
		usingClientEntryPoint: !1,
		Events: [
			Ji,
			Yi,
			Xi,
			$e,
			et,
			Bl
		]
	}, Ru = {
		findFiberByHostInstance: qi,
		bundleType: 0,
		version: "18.3.1",
		rendererPackageName: "react-dom"
	}, zu = {
		bundleType: Ru.bundleType,
		version: Ru.version,
		rendererPackageName: Ru.rendererPackageName,
		rendererConfig: Ru.rendererConfig,
		overrideHookState: null,
		overrideHookStateDeletePath: null,
		overrideHookStateRenamePath: null,
		overrideProps: null,
		overridePropsDeletePath: null,
		overridePropsRenamePath: null,
		setErrorHandler: null,
		setSuspenseHandler: null,
		scheduleUpdate: null,
		currentDispatcherRef: C.ReactCurrentDispatcher,
		findHostInstanceByFiber: function(e) {
			return e = bt(e), e === null ? null : e.stateNode;
		},
		findFiberByHostInstance: Ru.findFiberByHostInstance || Ou,
		findHostInstancesForRefresh: null,
		scheduleRefresh: null,
		scheduleRoot: null,
		setRefreshHandler: null,
		getCurrentFiber: null,
		reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Bu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Bu.isDisabled && Bu.supportsFiber) try {
			Nt = Bu.inject(zu), Pt = Bu;
		} catch {}
	}
	e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Lu, e.createPortal = function(e, t) {
		var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!Mu(t)) throw Error(r(200));
		return xu(e, t, null, n);
	}, e.createRoot = function(e, t) {
		if (!Mu(e)) throw Error(r(299));
		var n = !1, i = "", a = ku;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = bu(e, 1, !1, null, null, n, !1, i, a), e[Ui] = t.current, _i(e.nodeType === 8 ? e.parentNode : e), new Au(t);
	}, e.findDOMNode = function(e) {
		if (e == null) return null;
		if (e.nodeType === 1) return e;
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
		return e = bt(t), e = e === null ? null : e.stateNode, e;
	}, e.flushSync = function(e) {
		return Vl(e);
	}, e.hydrate = function(e, t, n) {
		if (!Nu(t)) throw Error(r(200));
		return Iu(null, e, t, !0, n);
	}, e.hydrateRoot = function(e, t, n) {
		if (!Mu(e)) throw Error(r(405));
		var i = n != null && n.hydratedSources || null, a = !1, o = "", s = ku;
		if (n != null && (!0 === n.unstable_strictMode && (a = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = Cu(t, null, e, 1, n ?? null, a, !1, o, s), e[Ui] = t.current, _i(e), i) for (e = 0; e < i.length; e++) n = i[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(n, a);
		return new ju(t);
	}, e.render = function(e, t, n) {
		if (!Nu(t)) throw Error(r(200));
		return Iu(null, e, t, !1, n);
	}, e.unmountComponentAtNode = function(e) {
		if (!Nu(e)) throw Error(r(40));
		return e._reactRootContainer ? (Vl(function() {
			Iu(null, null, e, !1, function() {
				e._reactRootContainer = null, e[Ui] = null;
			});
		}), !0) : !1;
	}, e.unstable_batchedUpdates = Bl, e.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
		if (!Nu(n)) throw Error(r(200));
		if (e == null || e._reactInternals === void 0) throw Error(r(38));
		return Iu(e, t, n, !1, i);
	}, e.version = "18.3.1-next-f1338f8080-20240426";
})), h = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = m();
})), g = /* @__PURE__ */ o(((e) => {
	var t = h();
	e.createRoot = t.createRoot, e.hydrateRoot = t.hydrateRoot;
})), _ = d(), v = g(), y = /* @__PURE__ */ new Map();
function b(e) {
	y.set(e.type, e);
}
function x(e) {
	let t = y.get(e);
	if (!t) throw Error(`Unknown element type "${e}". Did you register it in src/elements/index.ts?`);
	return t;
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.min.js
var S = /* @__PURE__ */ o(((e) => {
	var t = d(), n = Symbol.for("react.element"), r = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = {
		key: !0,
		ref: !0,
		__self: !0,
		__source: !0
	};
	function s(e, t, r) {
		var s, c = {}, l = null, u = null;
		for (s in r !== void 0 && (l = "" + r), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (u = t.ref), t) i.call(t, s) && !o.hasOwnProperty(s) && (c[s] = t[s]);
		if (e && e.defaultProps) for (s in t = e.defaultProps, t) c[s] === void 0 && (c[s] = t[s]);
		return {
			$$typeof: n,
			type: e,
			key: l,
			ref: u,
			props: c,
			_owner: a.current
		};
	}
	e.Fragment = r, e.jsx = s, e.jsxs = s;
})), C = (/* @__PURE__ */ o(((e, t) => {
	t.exports = S();
})))(), w = {
	primary: "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:disabled:bg-indigo-900 dark:disabled:text-indigo-300",
	secondary: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 disabled:text-slate-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
	danger: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400",
	ghost: "text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800"
};
function T({ variant: e = "secondary", className: t = "", ...n }) {
	return /* @__PURE__ */ (0, C.jsx)("button", {
		type: "button",
		...n,
		className: `inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed ${w[e]} ${t}`
	});
}
function E({ children: e, className: t = "" }) {
	return /* @__PURE__ */ (0, C.jsx)("div", {
		className: `rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900 ${t}`,
		children: e
	});
}
function ee(e) {
	return `${Math.round(e * 1e3) / 10}%`;
}
function D(e) {
	return String(Math.round(e * 100) / 100);
}
function te({ score: e }) {
	return e >= 1 ? /* @__PURE__ */ (0, C.jsxs)("span", {
		className: "inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
		children: [/* @__PURE__ */ (0, C.jsx)("span", {
			"aria-hidden": "true",
			children: "✓"
		}), " Correct"]
	}) : e > 0 ? /* @__PURE__ */ (0, C.jsxs)("span", {
		className: "inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/60 dark:text-amber-200",
		children: [
			/* @__PURE__ */ (0, C.jsx)("span", {
				"aria-hidden": "true",
				children: "◐"
			}),
			" Partially correct (",
			ee(e),
			")"
		]
	}) : /* @__PURE__ */ (0, C.jsxs)("span", {
		className: "inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/60 dark:text-red-200",
		children: [/* @__PURE__ */ (0, C.jsx)("span", {
			"aria-hidden": "true",
			children: "✗"
		}), " Incorrect"]
	});
}
function ne({ mode: e }) {
	return /* @__PURE__ */ (0, C.jsx)("span", {
		className: `rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${e === "exam" ? "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200" : "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200"}`,
		children: e
	});
}
function re({ label: e, confirmLabel: t, prompt: n, onConfirm: r, confirming: i, setConfirming: a }) {
	return i ? /* @__PURE__ */ (0, C.jsxs)("span", {
		role: "group",
		"aria-label": n,
		className: "inline-flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, C.jsx)("span", {
				className: "text-sm font-medium",
				children: n
			}),
			/* @__PURE__ */ (0, C.jsx)(T, {
				variant: "danger",
				onClick: () => {
					a(!1), r();
				},
				autoFocus: !0,
				children: t
			}),
			/* @__PURE__ */ (0, C.jsx)(T, {
				onClick: () => a(!1),
				children: "Cancel"
			})
		]
	}) : /* @__PURE__ */ (0, C.jsx)(T, {
		onClick: () => a(!0),
		children: e
	});
}
//#endregion
//#region src/elements/drawing/geometry.ts
function ie(e) {
	if (!(e > 0) || !Number.isFinite(e)) return 1;
	let t = 10 ** Math.floor(Math.log10(e));
	return [
		1,
		2,
		5,
		10
	].map((e) => e * t).reduce((t, n) => Math.abs(Math.log(n / e)) < Math.abs(Math.log(t / e)) ? n : t);
}
function ae(e, t, n) {
	return n > 0 ? Number((t + Math.round((e - t) / n) * n).toPrecision(12)) : e;
}
function O(e, t, n) {
	return Math.min(n, Math.max(t, e));
}
function oe(e) {
	let t = e.length;
	if (t < 2) return t === 1 ? [0] : [];
	let n = [], r = [];
	for (let i = 0; i < t - 1; i++) n.push(e[i + 1][0] - e[i][0]), r.push((e[i + 1][1] - e[i][1]) / n[i]);
	if (t === 2) return [r[0], r[0]];
	let i = Array(t).fill(0);
	for (let e = 1; e < t - 1; e++) {
		if (r[e - 1] * r[e] <= 0) continue;
		let t = 2 * n[e] + n[e - 1], a = n[e] + 2 * n[e - 1];
		i[e] = (t + a) / (t / r[e - 1] + a / r[e]);
	}
	return i[0] = se(n[0], n[1], r[0], r[1]), i[t - 1] = se(n[t - 2], n[t - 3], r[t - 2], r[t - 3]), i;
}
function se(e, t, n, r) {
	let i = ((2 * e + t) * n - e * r) / (e + t);
	return Math.sign(i) === Math.sign(n) ? Math.sign(n) !== Math.sign(r) && Math.abs(i) > Math.abs(3 * n) && (i = 3 * n) : i = 0, i;
}
function ce(e) {
	let t = oe(e), n = [];
	for (let r = 0; r < e.length - 1; r++) {
		let [i, a] = e[r], [o, s] = e[r + 1], c = o - i;
		n.push([
			[i, a],
			[i + c / 3, a + t[r] * c / 3],
			[o - c / 3, s - t[r + 1] * c / 3],
			[o, s]
		]);
	}
	return n;
}
function le(e, t, n, r = 60) {
	let i = [];
	for (let a = 0; a < r; a++) {
		let o = t + (n - t) * a / (r - 1), s = e(o);
		Number.isFinite(s) && i.push([o, s]);
	}
	return i;
}
function ue(e, t) {
	for (let n = 0; n < e.length - 1; n++) {
		let [r, i] = e[n], [a, o] = e[n + 1];
		if (t >= r && t <= a) return a === r ? i : i + (o - i) * (t - r) / (a - r);
	}
	return NaN;
}
function de(e) {
	return e.every((t, n) => n === 0 || t[0] > e[n - 1][0]);
}
function fe(e, t) {
	return Math.hypot(e[0] - t[0], e[1] - t[1]);
}
function pe(e, t, n) {
	let r = fe(t, n);
	return r === 0 ? fe(e, t) : Math.abs((n[0] - t[0]) * (t[1] - e[1]) - (t[0] - e[0]) * (n[1] - t[1])) / r;
}
function me(e, t, n) {
	let r = n[0] - t[0], i = n[1] - t[1], a = r * r + i * i;
	if (a === 0) return fe(e, t);
	let o = O(((e[0] - t[0]) * r + (e[1] - t[1]) * i) / a, 0, 1);
	return fe(e, [t[0] + o * r, t[1] + o * i]);
}
function he(e, t) {
	if (t.length === 1) return fe(e, t[0]);
	let n = Infinity;
	for (let r = 0; r < t.length - 1; r++) n = Math.min(n, me(e, t[r], t[r + 1]));
	return n;
}
function ge(e, t, n) {
	let r = t[0] - e[0], i = t[1] - e[1];
	if (r === 0 && i === 0) return null;
	let a = -Infinity, o = Infinity, s = [
		[-r, e[0] - n.xmin],
		[r, n.xmax - e[0]],
		[-i, e[1] - n.ymin],
		[i, n.ymax - e[1]]
	];
	for (let [e, t] of s) if (e === 0) {
		if (t < 0) return null;
	} else {
		let n = t / e;
		e < 0 ? a = Math.max(a, n) : o = Math.min(o, n);
	}
	return a > o ? null : [[e[0] + a * r, e[1] + a * i], [e[0] + o * r, e[1] + o * i]];
}
function _e(e, t, n) {
	return t[0] === e[0] ? NaN : e[1] + (t[1] - e[1]) * (n - e[0]) / (t[0] - e[0]);
}
function ve(e, t, n) {
	return t[1] === e[1] ? NaN : e[0] + (t[0] - e[0]) * (n - e[1]) / (t[1] - e[1]);
}
function ye(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let [r, i] = e[n], [a, o] = e[(n + 1) % e.length];
		t += r * o - a * i;
	}
	return t / 2;
}
function be(e) {
	return Math.abs(ye(e));
}
function xe(e, t, n) {
	return (t[0] - e[0]) * (n[1] - e[1]) - (t[1] - e[1]) * (n[0] - e[0]);
}
function Se(e) {
	let t = e.length;
	if (t < 3) return !1;
	let n = 0;
	for (let r = 0; r < t; r++) {
		let i = xe(e[r], e[(r + 1) % t], e[(r + 2) % t]);
		if (!(Math.abs(i) < 1e-12)) {
			if (n === 0) n = Math.sign(i);
			else if (Math.sign(i) !== n) return !1;
		}
	}
	return n !== 0;
}
function Ce(e, t, n, r) {
	let i = xe(n, r, e), a = xe(n, r, t), o = xe(e, t, n), s = xe(e, t, r);
	return (i > 0 && a < 0 || i < 0 && a > 0) && (o > 0 && s < 0 || o < 0 && s > 0);
}
function we(e) {
	let t = e.length;
	for (let n = 0; n < t; n++) for (let r = n + 1; r < t; r++) if (!(r === n + 1 || n === 0 && r === t - 1) && Ce(e[n], e[(n + 1) % t], e[r], e[(r + 1) % t])) return !1;
	return !0;
}
function Te(e, t) {
	let n = Math.sign(ye(t)) || 1, r = (e, t, r) => n * xe(t, r, e) >= 0, i = e;
	for (let e = 0; e < t.length && i.length > 0; e++) {
		let n = t[e], a = t[(e + 1) % t.length], o = i;
		i = [];
		for (let e = 0; e < o.length; e++) {
			let t = o[e], s = o[(e + o.length - 1) % o.length], c = r(t, n, a), l = r(s, n, a);
			c ? (l || i.push(Ee(s, t, n, a)), i.push(t)) : l && i.push(Ee(s, t, n, a));
		}
	}
	return i;
}
function Ee(e, t, n, r) {
	let i = xe(n, r, e), a = i / (i - xe(n, r, t));
	return [e[0] + a * (t[0] - e[0]), e[1] + a * (t[1] - e[1])];
}
function De(e, t) {
	let n = be(Te(e, t)), r = be(e) + be(t) - n;
	return r > 0 ? n / r : 0;
}
//#endregion
//#region src/engine/types.ts
var k = class extends Error {
	constructor(e) {
		super(e), this.name = "AuthoringError";
	}
}, Oe = {
	tolFraction: .04,
	ticks: 10,
	snaps: 40,
	angleTol: 8,
	minOverlap: .7
};
function ke(e) {
	let t = e.min ?? 0, n = e.max - t;
	return {
		min: t,
		max: e.max,
		label: e.label ?? "",
		step: e.step ?? ie(n / Oe.ticks),
		snap: e.snap ?? ie(n / Oe.snaps)
	};
}
function Ae(e) {
	let t = ke(e.x), n = ke(e.y);
	return {
		xmin: t.min,
		xmax: t.max,
		ymin: n.min,
		ymax: n.max
	};
}
function je(e, t) {
	let n = t?.tol ?? e.tol;
	if (n === void 0) {
		let t = Ae(e);
		return {
			x: Oe.tolFraction * (t.xmax - t.xmin),
			y: Oe.tolFraction * (t.ymax - t.ymin)
		};
	}
	return typeof n == "number" ? {
		x: n,
		y: n
	} : n;
}
function Me(e) {
	return (t) => [t[0] / e.x, t[1] / e.y];
}
var Ne = (e) => typeof e == "number" && Number.isFinite(e), Pe = (e) => Array.isArray(e) && e.length === 2 && Ne(e[0]) && Ne(e[1]), Fe = (e) => typeof e == "object" && !!e && !Array.isArray(e), Ie = "Your drawing could not be read. Clear it and draw it again.";
function Le(e, t) {
	if (t == null || Array.isArray(t) && t.length === 0) return {
		ok: !1,
		message: "Draw your answer on the graph before submitting."
	};
	if (!Array.isArray(t)) return {
		ok: !1,
		message: Ie
	};
	let n = /* @__PURE__ */ new Map(), r = [];
	for (let i of t) {
		if (!Fe(i) || !Number.isInteger(i.tool)) return {
			ok: !1,
			message: Ie
		};
		let t = i.tool, a = e.tools[t];
		if (!a || a.type !== i.type || (n.set(t, (n.get(t) ?? 0) + 1), (n.get(t) ?? 0) > (a.max ?? 1))) return {
			ok: !1,
			message: Ie
		};
		switch (a.type) {
			case "point":
				if (!Ne(i.x) || !Ne(i.y)) return {
					ok: !1,
					message: Ie
				};
				r.push({
					type: "point",
					tool: t,
					x: i.x,
					y: i.y
				});
				break;
			case "line":
				if (!Pe(i.from) || !Pe(i.to)) return {
					ok: !1,
					message: Ie
				};
				if (i.from[0] === i.to[0] && i.from[1] === i.to[1]) return {
					ok: !1,
					message: `The two handles of your ${Re(a)} are on top of each other. Move one of them.`
				};
				r.push({
					type: "line",
					tool: t,
					from: i.from,
					to: i.to
				});
				break;
			case "polygon": {
				let e = i.points;
				if (!Array.isArray(e) || e.length < 3 || !e.every(Pe)) return {
					ok: !1,
					message: Ie
				};
				if (!we(e)) return {
					ok: !1,
					message: `The edges of your ${Re(a)} cross each other. Move its corners so they don't.`
				};
				if (be(e) === 0) return {
					ok: !1,
					message: `Your ${Re(a)} has no area. Spread its corners apart.`
				};
				r.push({
					type: "polygon",
					tool: t,
					points: e
				});
				break;
			}
			case "curve": {
				let e = i.points;
				if (!Array.isArray(e) || e.length !== 4 || !e.every(Pe) || !de(e)) return {
					ok: !1,
					message: Ie
				};
				r.push({
					type: "curve",
					tool: t,
					points: e
				});
				break;
			}
		}
	}
	return {
		ok: !0,
		objects: r
	};
}
function Re(e) {
	return e.label ? e.label : {
		point: "point",
		line: "line",
		polygon: "shaded area",
		curve: "curve"
	}[e.type];
}
function ze(e) {
	for (let [t, n] of [["x", e.x], ["y", e.y]]) {
		if (!n || !Ne(n.max) || !Ne(n.min ?? 0) || !(n.max > (n.min ?? 0))) throw new k(`${t} axis needs finite min < max.`);
		if (n.step !== void 0 && !(n.step > 0)) throw new k(`${t} axis step must be > 0.`);
		if (n.snap !== void 0 && !(n.snap >= 0)) throw new k(`${t} axis snap must be >= 0.`);
	}
	e.tol !== void 0 && Be(e.tol, "tol");
	let t = /* @__PURE__ */ new Set();
	for (let n of e.initial ?? []) if (n.id !== void 0) {
		if (t.has(n.id)) throw new k(`duplicate initial object id "${n.id}".`);
		t.add(n.id);
	}
	if (!Array.isArray(e.tools) || e.tools.length === 0) throw new k("a drawing part needs at least one tool.");
	if (e.tools.forEach((t, n) => {
		let r = `tool ${n + 1} (${t.type})`;
		if (t.max !== void 0 && !(Number.isInteger(t.max) && t.max >= 1)) throw new k(`${r}: max must be an integer >= 1.`);
		if (t.type === "line" && t.copyOf !== void 0) {
			let n = (e.initial ?? []).find((e) => e.id === t.copyOf);
			if (!n || n.type !== "line") throw new k(`${r}: copyOf "${t.copyOf}" is not an initial line id.`);
		}
		if (t.type === "polygon" && t.vertices !== void 0 && !(Number.isInteger(t.vertices) && t.vertices >= 3)) throw new k(`${r}: vertices must be an integer >= 3.`);
		if (t.type === "curve" && t.start !== void 0 && (t.start.length !== 4 || !t.start.every(Pe) || !de(t.start))) throw new k(`${r}: start needs 4 points with strictly increasing x.`);
	}), !Array.isArray(e.answer) || e.answer.length === 0) throw new k("a drawing part needs at least one answer object.");
	let n = ke(e.x), r = ke(e.y);
	for (let t of e.answer) {
		let i = `answer "${t.label}"`;
		if (!t.label) throw new k("every answer object needs a label (used in feedback).");
		if (t.weight !== void 0 && !(t.weight >= 0)) throw new k(`${i}: weight must be >= 0.`);
		t.tol !== void 0 && Be(t.tol, `${i}: tol`);
		let a = je(e, t);
		if (Math.hypot(n.snap / 2 / a.x, r.snap / 2 / a.y) >= 1) throw new k(`${i}: the snap step is too coarse for its tolerance. Lower axis snap or raise tol.`);
		switch (t.type) {
			case "point":
				if (!Ne(t.x) || !Ne(t.y)) throw new k(`${i}: point needs finite x and y.`);
				break;
			case "line":
				if ("shiftOf" in t) {
					let { from: e, to: n } = t.shiftOf;
					if (!Pe(e) || !Pe(n) || e[0] === n[0] && e[1] === n[1]) throw new k(`${i}: shiftOf needs two different points.`);
					if (![
						"up",
						"down",
						"left",
						"right"
					].includes(t.direction)) throw new k(`${i}: unknown direction.`);
					if ((t.direction === "up" || t.direction === "down") && e[0] === n[0]) throw new k(`${i}: a vertical line can't shift up or down.`);
					if ((t.direction === "left" || t.direction === "right") && e[1] === n[1]) throw new k(`${i}: a horizontal line can't shift left or right.`);
				} else if (!Pe(t.from) || !Pe(t.to) || t.from[0] === t.to[0] && t.from[1] === t.to[1]) throw new k(`${i}: line needs two different points.`);
				break;
			case "polygon":
				if (!Array.isArray(t.points) || !t.points.every(Pe) || !Se(t.points)) throw new k(`${i}: polygon answers must be convex with at least 3 corners.`);
				if (t.minOverlap !== void 0 && !(t.minOverlap > 0 && t.minOverlap <= 1)) throw new k(`${i}: minOverlap must be in (0, 1].`);
				break;
			case "curve":
				if (!Array.isArray(t.points) || t.points.length < 2 || !t.points.every(Pe) || !de(t.points)) throw new k(`${i}: curve needs at least 2 reference points with strictly increasing x.`);
				if (t.through !== void 0 && !Pe(t.through)) throw new k(`${i}: through must be a point.`);
		}
	}
	for (let t of [
		"point",
		"line",
		"polygon",
		"curve"
	]) {
		let n = e.answer.filter((e) => e.type === t).length, r = e.tools.filter((e) => e.type === t).reduce((e, t) => e + (t.max ?? 1), 0);
		if (n > r) throw new k(`the answer has ${n} ${t}(s) but the tools allow only ${r}.`);
	}
}
function Be(e, t) {
	if (!(typeof e == "number" ? e > 0 : Fe(e) && e.x > 0 && e.y > 0)) throw new k(`${t} must be > 0.`);
}
function Ve(e, t, n) {
	let r = je(e, t), i = Me(r), a = Ae(e), o = {
		score: 0,
		message: `Your ${t.label} is not in the right place.`
	};
	if (t.type === "point" && n.type === "point") return Math.hypot((n.x - t.x) / r.x, (n.y - t.y) / r.y) <= 1 ? { score: 1 } : o;
	if (t.type === "line" && n.type === "line") {
		if ("shiftOf" in t) return He(e, t, n, r);
		let [s, c] = ge(t.from, t.to, a) ?? [t.from, t.to];
		return [s, c].every((e) => pe(i(e), i(n.from), i(n.to)) <= 1) ? { score: 1 } : o;
	}
	if (t.type === "polygon" && n.type === "polygon") return De(n.points, t.points) >= (t.minOverlap ?? Oe.minOverlap) ? { score: 1 } : {
		score: 0,
		message: `Your ${t.label} doesn't cover the right area.`
	};
	if (t.type === "curve" && n.type === "curve") {
		let e = n.points.slice(1, 3), a = t.relation ?? "on", o = t.points.map(i), s = 0, c = 0;
		for (let n of e) if (c++, a === "on") he(i(n), o) <= 1 && s++;
		else {
			let e = n[1] - ue(t.points, n[0]);
			(a === "above" ? e > r.y : e < -r.y) && s++;
		}
		let l = [];
		if (s < c && l.push(`The two middle points of your ${t.label} are not in the right place.`), t.through) {
			c++;
			let n = i(t.through);
			e.some((e) => Math.hypot(i(e)[0] - n[0], i(e)[1] - n[1]) <= 1) ? s++ : l.push(`Your ${t.label} doesn't pass through the right point with one of its middle points.`);
		}
		return {
			score: s / c,
			message: l.join(" ") || void 0
		};
	}
	return { score: 0 };
}
function He(e, t, n, r) {
	let i = Ae(e), a = i.xmax - i.xmin, o = i.ymax - i.ymin, { from: s, to: c } = t.shiftOf, l = [(c[0] - s[0]) / a, (c[1] - s[1]) / o], u = [(n.to[0] - n.from[0]) / a, (n.to[1] - n.from[1]) / o], d = Math.abs(l[0] * u[0] + l[1] * u[1]) / (Math.hypot(...l) * Math.hypot(...u));
	if (Math.acos(Math.min(1, d)) * 180 / Math.PI > (t.angleTol ?? Oe.angleTol)) return {
		score: 0,
		message: `Your ${t.label} should be parallel to the original line: shift it, don't rotate it.`
	};
	let [f, p] = ge(s, c, i) ?? [s, c], m, h;
	if (t.direction === "up" || t.direction === "down") {
		let e = (f[0] + p[0]) / 2;
		m = _e(n.from, n.to, e) - _e(s, c, e), h = r.y;
	} else {
		let e = (f[1] + p[1]) / 2;
		m = ve(n.from, n.to, e) - ve(s, c, e), h = r.x;
	}
	if (!Number.isFinite(m)) return {
		score: 0,
		message: `Your ${t.label} is not shifted the right way.`
	};
	if (Math.abs(m) <= h) return {
		score: 0,
		message: `Your ${t.label} hasn't moved far enough from the original line.`
	};
	let g = t.direction === "up" || t.direction === "right";
	return m > 0 === g ? { score: 1 } : {
		score: 0,
		message: `Your ${t.label} is not shifted the right way.`
	};
}
function Ue(e, t) {
	let n = e.answer, r = n.map((e) => e.weight ?? 1), i = r.reduce((e, t) => e + t, 0), a = i / n.length || 1, o = n.map((n) => t.map((t) => t.type === n.type ? Ve(e, n, t) : null)), s = {
		score: -1,
		assigned: [],
		objectScores: []
	}, c = [], l = /* @__PURE__ */ new Set(), u = (e, d) => {
		if (e === n.length) {
			let e = t.length - l.size, n = i + e * a, r = n > 0 ? d / n : 0;
			r > s.score + 1e-12 && (s = {
				score: r,
				assigned: [...c],
				objectScores: c.map((e, t) => e === null ? null : o[t][e])
			});
			return;
		}
		for (let n = 0; n < t.length; n++) {
			let t = o[e][n];
			t && !l.has(n) && (l.add(n), c.push(n), u(e + 1, d + r[e] * t.score), c.pop(), l.delete(n));
		}
		c.push(null), u(e + 1, d), c.pop();
	};
	return u(0, 0), {
		...s,
		score: Math.max(0, s.score)
	};
}
function We(e, t) {
	let n = Le(e, t);
	return n.ok ? { valid: !0 } : {
		valid: !1,
		message: n.message
	};
}
function Ge(e, t) {
	let n = Le(e, t);
	if (!n.ok) return { score: 0 };
	let r = Ue(e, n.objects), i = [];
	e.answer.forEach((e, t) => {
		let n = r.objectScores[t];
		n ? n.score < 1 && n.message && i.push(n.message) : i.push(`You haven't drawn the ${e.label}.`);
	});
	let a = n.objects.length - r.assigned.filter((e) => e !== null).length;
	return a > 0 && i.push(`You drew ${a} extra object${a === 1 ? "" : "s"}, which lowers your score.`), {
		score: r.score,
		feedback: i.join(" ") || void 0
	};
}
function Ke(e) {
	let t = e.tools.map((e) => e.max ?? 1), n = Ae(e), r = [], i = (n, r) => {
		let i = e.tools.map((e, t) => t).filter((r) => e.tools[r].type === n && t[r] > 0), a = i.find((t) => r?.(e.tools[t])) ?? i[0];
		return a === void 0 ? -1 : (t[a]--, a);
	};
	for (let t of e.answer) {
		let a = je(e, t);
		switch (t.type) {
			case "point": {
				let e = i("point");
				e >= 0 && r.push({
					type: "point",
					tool: e,
					x: t.x,
					y: t.y
				});
				break;
			}
			case "line": {
				let e = i("line", (e) => e.type === "line" && e.copyOf !== void 0);
				if (e < 0) break;
				if ("shiftOf" in t) {
					let n = {
						up: [0, 3 * a.y],
						down: [0, -3 * a.y],
						left: [-3 * a.x, 0],
						right: [3 * a.x, 0]
					}[t.direction], i = (e) => [e[0] + n[0], e[1] + n[1]];
					r.push({
						type: "line",
						tool: e,
						from: i(t.shiftOf.from),
						to: i(t.shiftOf.to)
					});
				} else r.push({
					type: "line",
					tool: e,
					from: t.from,
					to: t.to
				});
				break;
			}
			case "polygon": {
				let e = i("polygon");
				e >= 0 && r.push({
					type: "polygon",
					tool: e,
					points: t.points.map((e) => [...e])
				});
				break;
			}
			case "curve": {
				let e = i("curve");
				if (e < 0) break;
				let o = t.points, s = o[0][0], c = o[o.length - 1][0], l = c - s, u = t.relation === "above" ? 3 * a.y : t.relation === "below" ? -3 * a.y : 0, d = (e) => ue(o, Math.min(c, Math.max(s, e))) + u, f = t.through ? t.through[0] : s + .35 * l, p = f + .2 * l <= c ? f + .2 * l : f - .2 * l;
				p < f && ([f, p] = [p, f]);
				let m = (e) => t.through && e === t.through[0] ? [...t.through] : [e, d(e)], h = .2 * l || .1 * (n.xmax - n.xmin);
				r.push({
					type: "curve",
					tool: e,
					points: [
						[f - h, d(f - h)],
						m(f),
						m(p),
						[p + h, d(p + h)]
					]
				});
				break;
			}
		}
	}
	return r;
}
function qe(e) {
	return String(Number(e.toPrecision(4)));
}
var Je = (e) => `(${qe(e[0])}, ${qe(e[1])})`;
function Ye(e, t) {
	let n = Re(e.tools[t.tool] ?? { type: t.type });
	switch (t.type) {
		case "point": return `${n} at ${Je([t.x, t.y])}`;
		case "line": return `${n} through ${Je(t.from)} and ${Je(t.to)}`;
		case "polygon": return `${n} with corners ${t.points.map(Je).join(", ")}`;
		case "curve": return `${n} through ${t.points.map(Je).join(", ")}`;
	}
}
function Xe(e, t) {
	let n = Le(e, t);
	return n.ok ? n.objects.map((t) => Ye(e, t)).join("; ") : Array.isArray(t) && t.length > 0 ? "_(unreadable drawing)_" : "_(nothing drawn)_";
}
function Ze(e) {
	let t = e.answer.filter((e) => e.type === "line" && "shiftOf" in e).length > 0 ? " Any parallel shift in the right direction is accepted." : "";
	return `shown in green on the graph (${e.answer.map((e) => e.label).join(", ")}).${t}`;
}
function Qe(e) {
	if (e.showHelpText === !1) return;
	let t = e.tools.some((e) => e.type === "curve") ? " A curve has 4 points: only the two middle points are graded; the end points just shape its tails." : "";
	return "Add objects with the buttons, then drag their round handles. You can also Tab to a handle and move it with the arrow keys (Shift + arrow for bigger steps; Delete removes the object)." + (e.tools.some((e) => e.type === "line") ? " Drag a line's square handle to move it without turning it." : "") + t;
}
//#endregion
//#region src/elements/drawing/editing.ts
function $e(e) {
	return {
		box: Ae(e),
		snapX: ke(e.x).snap,
		snapY: ke(e.y).snap
	};
}
function et(e, t) {
	let { box: n, snapX: r, snapY: i } = $e(e);
	return [O(ae(O(t[0], n.xmin, n.xmax), n.xmin, r), n.xmin, n.xmax), O(ae(O(t[1], n.ymin, n.ymax), n.ymin, i), n.ymin, n.ymax)];
}
function tt(e) {
	let { box: t, snapX: n, snapY: r } = $e(e);
	return {
		x: n || (t.xmax - t.xmin) / 100,
		y: r || (t.ymax - t.ymin) / 100
	};
}
function nt(e, t, n) {
	let r = ge(t, n, Ae(e));
	if (!r) return null;
	let [i, a] = r, o = (e) => [rt(i[0] + e * (a[0] - i[0])), rt(i[1] + e * (a[1] - i[1]))];
	return [o(.2), o(.8)];
}
var rt = (e) => Number(e.toPrecision(12));
function it(e, t, n) {
	let r = e.tools[t], { box: i } = $e(e), a = i.xmax - i.xmin, o = i.ymax - i.ymin, s = n.filter((e) => e.tool === t).length, c = (t, n) => et(e, [i.xmin + (t + .06 * s) * a, i.ymin + (n - .06 * s) * o]);
	switch (r.type) {
		case "point": {
			let [e, n] = c(.5, .5);
			return {
				type: "point",
				tool: t,
				x: e,
				y: n
			};
		}
		case "line": {
			let n = r.copyOf ? (e.initial ?? []).find((e) => e.id === r.copyOf) : void 0;
			if (n && n.type === "line") {
				let r = nt(e, n.from, n.to);
				if (r) return {
					type: "line",
					tool: t,
					from: r[0],
					to: r[1]
				};
			}
			return {
				type: "line",
				tool: t,
				from: c(.25, .25),
				to: c(.75, .75)
			};
		}
		case "polygon": {
			let e = r.vertices ?? 3, n = e === 4 ? Math.PI / 4 : Math.PI / 2;
			return {
				type: "polygon",
				tool: t,
				points: Array.from({ length: e }, (t, r) => {
					let i = n + 2 * Math.PI * r / e;
					return c(.5 + .18 * Math.cos(i), .5 + .18 * Math.sin(i));
				})
			};
		}
		case "curve": return {
			type: "curve",
			tool: t,
			points: (r.start ?? [
				[.12, .85],
				[.3, .45],
				[.55, .27],
				[.88, .15]
			].map(([e, t]) => c(e, t))).map((e) => [...e])
		};
	}
}
function at(e) {
	switch (e.type) {
		case "point": return [[e.x, e.y]];
		case "line": return [e.from, e.to];
		case "polygon":
		case "curve": return e.points;
	}
}
function ot(e, t, n, r) {
	let i = et(e, r);
	switch (t.type) {
		case "point": return {
			...t,
			x: i[0],
			y: i[1]
		};
		case "line": {
			let e = n === 0 ? t.to : t.from;
			return e[0] === i[0] && e[1] === i[1] ? t : n === 0 ? {
				...t,
				from: i
			} : {
				...t,
				to: i
			};
		}
		case "polygon": {
			let e = t.points.map((e, t) => t === n ? i : e);
			return {
				...t,
				points: e
			};
		}
		case "curve": {
			let { box: r, snapX: a } = $e(e), o = a || (r.xmax - r.xmin) / 100, s = n > 0 ? t.points[n - 1][0] + o : r.xmin, c = n < 3 ? t.points[n + 1][0] - o : r.xmax;
			if (s > c) return t;
			let l = t.points.map((e, t) => t === n ? [O(i[0], s, c), i[1]] : e);
			return {
				...t,
				points: l
			};
		}
	}
}
function st(e, t, n) {
	let { box: r, snapX: i, snapY: a } = $e(e), o = i ? Math.round(n[0] / i) * i : n[0], s = a ? Math.round(n[1] / a) * a : n[1], c = (e) => [rt(e[0] + o), rt(e[1] + s)];
	if (t.type === "line") {
		let n = nt(e, c(t.from), c(t.to));
		return n ? {
			...t,
			from: n[0],
			to: n[1]
		} : t;
	}
	let l = at(t), u = l.map((e) => e[0]), d = l.map((e) => e[1]);
	switch (o = O(o, r.xmin - Math.min(...u), r.xmax - Math.max(...u)), s = O(s, r.ymin - Math.min(...d), r.ymax - Math.max(...d)), t.type) {
		case "point": return {
			...t,
			x: rt(t.x + o),
			y: rt(t.y + s)
		};
		case "polygon":
		case "curve": return {
			...t,
			points: t.points.map(c)
		};
	}
}
function ct(e, t) {
	if (!Array.isArray(t)) return [];
	let n = (e) => Array.isArray(e) && e.length === 2 && e.every((e) => typeof e == "number" && Number.isFinite(e));
	return t.filter((t) => {
		if (typeof t != "object" || !t || !Number.isInteger(t.tool) || e.tools[t.tool]?.type !== t.type) return !1;
		switch (t.type) {
			case "point": return Number.isFinite(t.x) && Number.isFinite(t.y);
			case "line": return n(t.from) && n(t.to);
			case "polygon":
			case "curve": return Array.isArray(t.points) && t.points.length >= 2 && t.points.every(n);
			default: return !1;
		}
	});
}
//#endregion
//#region src/elements/drawing/DrawingInput.tsx
var lt = 560, ut = 400, dt = {
	l: 58,
	r: 20,
	t: 16,
	b: 50
}, ft = lt - dt.l - dt.r, pt = ut - dt.t - dt.b, mt = "stroke-slate-700 dark:stroke-slate-300", ht = "stroke-indigo-600 dark:stroke-indigo-400", gt = "stroke-emerald-600 dark:stroke-emerald-400";
function _t({ part: e, id: t, labelId: n, describedBy: r, value: i, onChange: a, disabled: o, invalid: s, showCorrect: c }) {
	let l = ke(e.x), u = ke(e.y), d = Ae(e), f = (e) => dt.l + (e - l.min) / (l.max - l.min) * ft, p = (e) => dt.t + (1 - (e - u.min) / (u.max - u.min)) * pt, m = (e) => [f(e[0]), p(e[1])], h = (0, _.useMemo)(() => ct(e, i), [e, i]), [g, v] = (0, _.useState)(null), [y, b] = (0, _.useState)(null), [x, S] = (0, _.useState)(null), [w, E] = (0, _.useState)([]), ee = (0, _.useRef)(null), D = (0, _.useRef)(null), te = g ?? h, ne = (0, _.useMemo)(() => c ? Ke(e) : [], [e, c]), re = `${t}-clip`;
	(0, _.useEffect)(() => {
		E([]), b(null);
	}, [t]);
	let ie = (e) => {
		E((e) => [...e.slice(-49), h]), a(e);
	}, ae = (e) => {
		let t = D.current?.getBoundingClientRect();
		if (!t || t.width === 0 || t.height === 0) return null;
		let n = (e.clientX - t.left) * lt / t.width, r = (e.clientY - t.top) * ut / t.height;
		return [l.min + (n - dt.l) / ft * (l.max - l.min), u.min + (1 - (r - dt.t) / pt) * (u.max - u.min)];
	}, O = (e, t) => {
		o || (e.preventDefault(), e.stopPropagation(), e.currentTarget.setPointerCapture?.(e.pointerId), ee.current = t, b(t.obj));
	}, oe = (t) => {
		let n = ee.current;
		if (!n) return;
		let r = ae(t);
		if (!r) return;
		let i = g ?? h, a = i[n.obj];
		if (!a) return;
		let o = n.kind === "handle" ? ot(e, a, n.handle, r) : st(e, n.orig, [r[0] - n.start[0], r[1] - n.start[1]]);
		v(i.map((e, t) => t === n.obj ? o : e));
	}, se = () => {
		ee.current && (ee.current = null, g && ie(g), v(null));
	}, le = (t, n, r) => {
		let i = h[n];
		if (!i || o) return;
		if (t.key === "Delete" || t.key === "Backspace") {
			t.preventDefault(), ie(h.filter((e, t) => t !== n)), b(null);
			return;
		}
		let a = {
			ArrowLeft: [-1, 0],
			ArrowRight: [1, 0],
			ArrowUp: [0, 1],
			ArrowDown: [0, -1]
		}[t.key];
		if (!a) return;
		t.preventDefault();
		let s = tt(e), c = t.shiftKey ? 5 : 1, l = [a[0] * s.x * c, a[1] * s.y * c], u;
		if (r === "move") u = st(e, i, l);
		else {
			let t = at(i)[r];
			u = ot(e, i, r, [t[0] + l[0], t[1] + l[1]]);
		}
		u !== i && ie(h.map((e, t) => t === n ? u : e));
	}, ue = (t) => {
		let n = [...h, it(e, t, h)];
		ie(n), b(n.length - 1);
	}, fe = () => {
		let e = w[w.length - 1];
		e && (E((e) => e.slice(0, -1)), a(e), b(null));
	}, pe = (e, t, n) => {
		let r = n ? ge(e, t, d) : [e, t];
		if (!r) return null;
		let [i, a] = r.map(m);
		return `M${i[0]},${i[1]}L${a[0]},${a[1]}`;
	}, me = (e, t) => {
		if (t && e.length >= 3 && de(e)) {
			let t = ce(e), n = m(t[0][0]);
			return `M${n[0]},${n[1]}` + t.map(([, e, t, n]) => `C${m(e).join(",")} ${m(t).join(",")} ${m(n).join(",")}`).join("");
		}
		return e.map((e, t) => `${t === 0 ? "M" : "L"}${m(e).join(",")}`).join("");
	}, he = (e) => e.map((e) => m(e).join(",")).join(" "), _e = (e, t) => {
		if (e.type === "line" && e.from && e.to) {
			let n = t ? ge(e.from, e.to, d) : [e.from, e.to];
			if (!n) return null;
			let [r, i] = n, a = t && (r[0] > i[0] || r[0] === i[0] && r[1] > i[1]) ? r : i, o = a === r ? i : r;
			return m([o[0] + .93 * (a[0] - o[0]), o[1] + .93 * (a[1] - o[1])]);
		}
		if (e.type === "curve" && e.points) return m(e.points[e.points.length - 1]);
		if (e.type === "polygon" && e.points) {
			let t = e.points.length;
			return m([e.points.reduce((e, t) => e + t[0], 0) / t, e.points.reduce((e, t) => e + t[1], 0) / t]);
		}
		return e.type === "point" && e.x !== void 0 && e.y !== void 0 ? m([e.x, e.y]) : null;
	}, ve = (e, t, n, r, i = !1) => {
		if (!e || !t) return null;
		let a = Math.min(556, Math.max(dt.l + 4, i ? t[0] : t[0] + 7)), o = Math.min(ut - dt.b - 4, Math.max(dt.t + 12, i ? t[1] + 4 : t[1] - 7));
		return /* @__PURE__ */ (0, C.jsx)("text", {
			x: a,
			y: o,
			fontSize: 13,
			textAnchor: i ? "middle" : "start",
			className: n,
			children: e
		}, r);
	}, ye = (e, t) => {
		let n = `init-${t}`, r = "dashed" in e && e.dashed ? "6 4" : void 0, i = "fill-slate-700 dark:fill-slate-200 font-medium";
		switch (e.type) {
			case "line": {
				let t = pe(e.from, e.to, !1);
				return /* @__PURE__ */ (0, C.jsxs)("g", { children: [t && /* @__PURE__ */ (0, C.jsx)("path", {
					d: t,
					strokeWidth: 2.5,
					strokeDasharray: r,
					fill: "none",
					className: mt,
					clipPath: `url(#${re})`
				}), ve(e.label, _e(e, !1), i, `${n}-tag`)] }, n);
			}
			case "curve": return /* @__PURE__ */ (0, C.jsxs)("g", { children: [/* @__PURE__ */ (0, C.jsx)("path", {
				d: me(e.points, e.points.length <= 8),
				strokeWidth: 2.5,
				strokeDasharray: r,
				fill: "none",
				className: mt,
				clipPath: `url(#${re})`
			}), ve(e.label, _e(e, !1), i, `${n}-tag`)] }, n);
			case "polygon": return /* @__PURE__ */ (0, C.jsxs)("g", { children: [/* @__PURE__ */ (0, C.jsx)("polygon", {
				points: he(e.points),
				className: "fill-slate-400/25 stroke-slate-500",
				strokeWidth: 1
			}), ve(e.label, _e(e, !1), i, `${n}-tag`, !0)] }, n);
			case "point": return /* @__PURE__ */ (0, C.jsxs)("g", { children: [/* @__PURE__ */ (0, C.jsx)("circle", {
				cx: f(e.x),
				cy: p(e.y),
				r: 5,
				className: "fill-slate-700 dark:fill-slate-300"
			}), ve(e.label, _e(e, !1), i, `${n}-tag`)] }, n);
		}
	}, be = (e, t, n, r) => {
		let i = r.dashed ? "7 5" : void 0, a = r.strong ? 3.5 : 2.5, o = r.bodyDrag ? {
			onPointerDown: r.bodyDrag,
			style: { cursor: "move" }
		} : {};
		switch (e.type) {
			case "line": {
				let s = pe(e.from, e.to, !0);
				return s ? /* @__PURE__ */ (0, C.jsxs)("g", {
					clipPath: `url(#${re})`,
					children: [/* @__PURE__ */ (0, C.jsx)("path", {
						d: s,
						strokeWidth: a,
						strokeDasharray: i,
						fill: "none",
						className: t
					}), r.bodyDrag && /* @__PURE__ */ (0, C.jsx)("path", {
						d: s,
						strokeWidth: 16,
						stroke: "transparent",
						fill: "none",
						pointerEvents: "stroke",
						...o
					})]
				}, n) : null;
			}
			case "curve": {
				let s = me(e.points, !0);
				return /* @__PURE__ */ (0, C.jsxs)("g", {
					clipPath: `url(#${re})`,
					children: [/* @__PURE__ */ (0, C.jsx)("path", {
						d: s,
						strokeWidth: a,
						strokeDasharray: i,
						fill: "none",
						className: t
					}), r.bodyDrag && /* @__PURE__ */ (0, C.jsx)("path", {
						d: s,
						strokeWidth: 16,
						stroke: "transparent",
						fill: "none",
						pointerEvents: "stroke",
						...o
					})]
				}, n);
			}
			case "polygon": return /* @__PURE__ */ (0, C.jsx)("polygon", {
				points: he(e.points),
				strokeWidth: r.strong ? 2.5 : 1.5,
				strokeDasharray: i,
				className: `${t} ${t === gt ? "fill-emerald-500/20" : "fill-indigo-500/25"}`,
				...o
			}, n);
			case "point": return /* @__PURE__ */ (0, C.jsx)("circle", {
				cx: f(e.x),
				cy: p(e.y),
				r: 6,
				strokeWidth: 2,
				className: `${t} ${t === gt ? "fill-emerald-500/40" : "fill-indigo-600 dark:fill-indigo-400"}`
			}, n);
		}
	}, xe = (t, n) => {
		let r = Re(e.tools[t.tool]), i = at(t)[n];
		return `${t.type === "point" ? r : `${r}, handle ${n + 1} of ${at(t).length}`} at (${qe(i[0])}, ${qe(i[1])}). Arrow keys move it; Delete removes the ${r}.`;
	}, Se = (t, n) => {
		let r = at(t).map((e, r) => {
			let i = `h-${n}-${r}`, [a, o] = m(e);
			return /* @__PURE__ */ (0, C.jsxs)("g", { children: [
				x === i && /* @__PURE__ */ (0, C.jsx)("circle", {
					cx: a,
					cy: o,
					r: 12,
					fill: "none",
					strokeWidth: 2,
					className: "stroke-amber-500"
				}),
				/* @__PURE__ */ (0, C.jsx)("circle", {
					cx: a,
					cy: o,
					r: t.type === "point" ? 7 : 6,
					strokeWidth: 2,
					className: `${ht} ${t.type === "point" ? "fill-indigo-600 dark:fill-indigo-400" : "fill-white dark:fill-slate-900"}`,
					pointerEvents: "none"
				}),
				/* @__PURE__ */ (0, C.jsx)("circle", {
					cx: a,
					cy: o,
					r: 14,
					fill: "transparent",
					tabIndex: 0,
					role: "button",
					"aria-roledescription": "draggable handle",
					"aria-label": xe(t, r),
					style: {
						cursor: "grab",
						outline: "none"
					},
					onPointerDown: (e) => O(e, {
						obj: n,
						kind: "handle",
						handle: r
					}),
					onKeyDown: (e) => le(e, n, r),
					onFocus: () => {
						S(i), b(n);
					},
					onBlur: () => S((e) => e === i ? null : e)
				})
			] }, i);
		});
		if (t.type === "line") {
			let i = `h-${n}-move`, [a, o] = m([(t.from[0] + t.to[0]) / 2, (t.from[1] + t.to[1]) / 2]), s = Re(e.tools[t.tool]);
			r.push(/* @__PURE__ */ (0, C.jsxs)("g", { children: [
				x === i && /* @__PURE__ */ (0, C.jsx)("rect", {
					x: a - 12,
					y: o - 12,
					width: 24,
					height: 24,
					fill: "none",
					strokeWidth: 2,
					className: "stroke-amber-500"
				}),
				/* @__PURE__ */ (0, C.jsx)("rect", {
					x: a - 6,
					y: o - 6,
					width: 12,
					height: 12,
					strokeWidth: 2,
					className: `${ht} fill-white dark:fill-slate-900`,
					pointerEvents: "none"
				}),
				/* @__PURE__ */ (0, C.jsx)("rect", {
					x: a - 14,
					y: o - 14,
					width: 28,
					height: 28,
					fill: "transparent",
					tabIndex: 0,
					role: "button",
					"aria-roledescription": "draggable handle",
					"aria-label": `Move the whole ${s} without turning it. Arrow keys move it; Delete removes it.`,
					style: {
						cursor: "move",
						outline: "none"
					},
					onPointerDown: (e) => {
						let r = ae(e);
						r && O(e, {
							obj: n,
							kind: "body",
							start: r,
							orig: t
						});
					},
					onKeyDown: (e) => le(e, n, "move"),
					onFocus: () => {
						S(i), b(n);
					},
					onBlur: () => S((e) => e === i ? null : e)
				})
			] }, i));
		}
		return r;
	}, Ce = (e, t, n) => {
		let r = [];
		for (let i = 0; e + i * n <= t + n * 1e-9; i++) r.push(Number((e + i * n).toPrecision(12)));
		return r;
	}, we = Ce(l.min, l.max, l.step), Te = Ce(u.min, u.max, u.step), Ee = e.tools.map((e, t) => te.filter((e) => e.tool === t).length);
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		id: t,
		role: "group",
		"aria-labelledby": n,
		"aria-describedby": r,
		className: "basis-full space-y-2",
		children: [
			!o && /* @__PURE__ */ (0, C.jsxs)("div", {
				role: "toolbar",
				"aria-label": "Drawing tools",
				className: "flex flex-wrap gap-2",
				children: [
					e.tools.map((e, t) => /* @__PURE__ */ (0, C.jsxs)(T, {
						onClick: () => ue(t),
						disabled: Ee[t] >= (e.max ?? 1),
						children: [
							/* @__PURE__ */ (0, C.jsx)("span", {
								"aria-hidden": "true",
								children: "+"
							}),
							" Add ",
							Re(e)
						]
					}, t)),
					/* @__PURE__ */ (0, C.jsx)(T, {
						onClick: () => {
							y !== null && (ie(h.filter((e, t) => t !== y)), b(null));
						},
						disabled: y === null || !h[y],
						children: "Delete selected"
					}),
					/* @__PURE__ */ (0, C.jsx)(T, {
						onClick: fe,
						disabled: w.length === 0,
						children: "Undo"
					}),
					/* @__PURE__ */ (0, C.jsx)(T, {
						onClick: () => {
							ie([]), b(null);
						},
						disabled: h.length === 0,
						children: "Clear"
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("svg", {
				ref: D,
				viewBox: `0 0 ${lt} ${ut}`,
				className: `h-auto w-full max-w-2xl select-none rounded-lg border bg-white dark:bg-slate-950 ${s ? "border-red-500 dark:border-red-400" : "border-slate-200 dark:border-slate-800"}`,
				style: { touchAction: o ? "auto" : "none" },
				onPointerMove: oe,
				onPointerUp: se,
				onPointerCancel: se,
				onPointerDown: () => b(null),
				children: [
					/* @__PURE__ */ (0, C.jsx)("defs", { children: /* @__PURE__ */ (0, C.jsx)("clipPath", {
						id: re,
						children: /* @__PURE__ */ (0, C.jsx)("rect", {
							x: dt.l,
							y: dt.t,
							width: ft,
							height: pt
						})
					}) }),
					/* @__PURE__ */ (0, C.jsxs)("g", {
						"aria-hidden": "true",
						children: [
							we.map((e) => /* @__PURE__ */ (0, C.jsxs)("g", { children: [/* @__PURE__ */ (0, C.jsx)("line", {
								x1: f(e),
								x2: f(e),
								y1: dt.t,
								y2: dt.t + pt,
								className: "stroke-slate-200 dark:stroke-slate-800",
								strokeWidth: 1
							}), /* @__PURE__ */ (0, C.jsx)("text", {
								x: f(e),
								y: dt.t + pt + 18,
								fontSize: 12,
								textAnchor: "middle",
								className: "fill-slate-500 dark:fill-slate-400",
								children: qe(e)
							})] }, `xt-${e}`)),
							Te.map((e) => /* @__PURE__ */ (0, C.jsxs)("g", { children: [/* @__PURE__ */ (0, C.jsx)("line", {
								x1: dt.l,
								x2: dt.l + ft,
								y1: p(e),
								y2: p(e),
								className: "stroke-slate-200 dark:stroke-slate-800",
								strokeWidth: 1
							}), /* @__PURE__ */ (0, C.jsx)("text", {
								x: dt.l - 8,
								y: p(e) + 4,
								fontSize: 12,
								textAnchor: "end",
								className: "fill-slate-500 dark:fill-slate-400",
								children: qe(e)
							})] }, `yt-${e}`)),
							/* @__PURE__ */ (0, C.jsx)("line", {
								x1: dt.l,
								x2: dt.l + ft,
								y1: dt.t + pt,
								y2: dt.t + pt,
								strokeWidth: 1.5,
								className: "stroke-slate-500"
							}),
							/* @__PURE__ */ (0, C.jsx)("line", {
								x1: dt.l,
								x2: dt.l,
								y1: dt.t,
								y2: dt.t + pt,
								strokeWidth: 1.5,
								className: "stroke-slate-500"
							}),
							l.label && /* @__PURE__ */ (0, C.jsx)("text", {
								x: dt.l + ft / 2,
								y: 390,
								fontSize: 13,
								textAnchor: "middle",
								className: "fill-slate-700 dark:fill-slate-300",
								children: l.label
							}),
							u.label && /* @__PURE__ */ (0, C.jsx)("text", {
								x: 14,
								y: dt.t + pt / 2,
								fontSize: 13,
								textAnchor: "middle",
								transform: `rotate(-90 14 ${dt.t + pt / 2})`,
								className: "fill-slate-700 dark:fill-slate-300",
								children: u.label
							}),
							(e.initial ?? []).map(ye),
							ne.map((e, t) => be(e, `${gt} opacity-80`, `ex-${t}`, { dashed: !0 }))
						]
					}),
					te.map((t, n) => /* @__PURE__ */ (0, C.jsxs)("g", { children: [/* @__PURE__ */ (0, C.jsxs)("g", {
						"aria-hidden": "true",
						children: [be(t, ht, `shape-${n}`, {
							strong: y === n && !o,
							bodyDrag: o || t.type === "point" ? void 0 : (e) => {
								let r = ae(e);
								r && O(e, {
									obj: n,
									kind: "body",
									start: r,
									orig: t
								});
							}
						}), ve(e.tools[t.tool]?.tag, _e(t, !0), "fill-indigo-700 dark:fill-indigo-300 font-semibold", `tag-${n}`, t.type === "polygon")]
					}), !o && Se(t, n)] }, `obj-${n}`))
				]
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "sr-only",
				children: [(e.initial ?? []).length > 0 && /* @__PURE__ */ (0, C.jsxs)("p", { children: [
					"The graph shows:",
					" ",
					(e.initial ?? []).map((e) => `${e.label ?? e.type}${e.type === "line" ? ` from (${qe(e.from[0])}, ${qe(e.from[1])}) to (${qe(e.to[0])}, ${qe(e.to[1])})` : ""}`).join("; "),
					"."
				] }), /* @__PURE__ */ (0, C.jsx)("p", { children: te.length === 0 ? "You haven't drawn anything yet." : `Your drawing: ${te.map((t) => Ye(e, t)).join("; ")}.` })]
			}),
			c && /* @__PURE__ */ (0, C.jsxs)("p", {
				className: "text-xs text-slate-600 dark:text-slate-400",
				children: [
					/* @__PURE__ */ (0, C.jsx)("span", {
						className: "font-semibold text-emerald-700 dark:text-emerald-300",
						children: "Green dashed"
					}),
					": a correct answer.",
					" ",
					/* @__PURE__ */ (0, C.jsx)("span", {
						className: "font-semibold text-indigo-700 dark:text-indigo-300",
						children: "Blue"
					}),
					": your drawing."
				]
			})
		]
	});
}
//#endregion
//#region src/elements/drawing/index.ts
var vt = {
	type: "drawing",
	check: ze,
	validate: We,
	grade: Ge,
	formatAnswer: Xe,
	formatCorrectAnswer: Ze,
	helpText: Qe,
	Input: _t
}, yt = /^[+-]?\d+$/;
function bt(e) {
	if (typeof e != "string" || e.trim() === "") return {
		ok: !1,
		message: "Please enter an integer"
	};
	let t = e.trim();
	return yt.test(t) ? {
		ok: !0,
		value: BigInt(t)
	} : {
		ok: !1,
		message: `"${t}" is not an integer. Enter whole numbers only, like 42 or -7.`
	};
}
function xt(e) {
	if (!Number.isSafeInteger(e.correct)) throw new k(`integer part needs an integer "correct" value (got ${String(e.correct)}).`);
}
function St(e, t) {
	let n = bt(t);
	return n.ok ? { valid: !0 } : {
		valid: !1,
		message: n.message
	};
}
function Ct(e, t) {
	let n = bt(t);
	return n.ok ? { score: +(n.value === BigInt(e.correct)) } : { score: 0 };
}
//#endregion
//#region src/elements/TextInput.tsx
function wt({ id: e, labelId: t, describedBy: n, value: r, onChange: i, disabled: a, invalid: o, inputMode: s, placeholder: c }) {
	return /* @__PURE__ */ (0, C.jsx)("input", {
		type: "text",
		id: e,
		inputMode: s,
		autoComplete: "off",
		spellCheck: !1,
		"aria-labelledby": t,
		"aria-describedby": n,
		"aria-invalid": o || void 0,
		disabled: a,
		placeholder: c,
		value: typeof r == "string" ? r : "",
		onChange: (e) => i(e.target.value),
		className: `w-40 max-w-full rounded-md border bg-white px-2 py-1.5 font-mono dark:bg-slate-900 ${o ? "border-red-500 dark:border-red-400" : "border-slate-300 dark:border-slate-600"} disabled:opacity-80`
	});
}
//#endregion
//#region src/elements/integer/IntegerInput.tsx
function Tt(e) {
	return /* @__PURE__ */ (0, C.jsx)(wt, {
		...e,
		inputMode: "numeric",
		placeholder: "integer"
	});
}
//#endregion
//#region src/elements/integer/index.ts
var Et = {
	type: "integer",
	check: xt,
	validate: St,
	grade: Ct,
	formatAnswer: (e, t) => typeof t == "string" && t.trim() ? `\`${t.trim()}\`` : "_(no answer)_",
	formatCorrectAnswer: (e) => String(e.correct) + (e.suffix ? ` ${e.suffix}` : ""),
	helpText: () => "Enter a whole number, e.g. 42 or -7.",
	Input: Tt
};
//#endregion
//#region src/elements/multipleChoice/gradeMultipleChoice.ts
function Dt(e, t) {
	return typeof t != "number" || !Number.isInteger(t) ? null : t >= 0 && t < e.options.length ? t : null;
}
function Ot(e, t) {
	return Dt(e, t) === null ? {
		valid: !1,
		message: "Please select an option"
	} : { valid: !0 };
}
function kt(e, t) {
	let n = Dt(e, t);
	if (n === null) return { score: 0 };
	let r = e.options[n], i = { score: +!!r.correct };
	return r.feedback && (i.feedback = r.feedback), i;
}
function At(e, t) {
	let n = Dt(e, t);
	return n === null ? "_(no answer)_" : e.options[n].text;
}
function jt(e) {
	return e.options.find((e) => e.correct)?.text ?? "";
}
//#endregion
//#region node_modules/comma-separated-tokens/index.js
function Mt(e) {
	let t = [], n = String(e || ""), r = n.indexOf(","), i = 0, a = !1;
	for (; !a;) {
		r === -1 && (r = n.length, a = !0);
		let e = n.slice(i, r).trim();
		(e || !a) && t.push(e), i = r + 1, r = n.indexOf(",", i);
	}
	return t;
}
function Nt(e, t) {
	let n = t || {};
	return (e[e.length - 1] === "" ? [...e, ""] : e).join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")).trim();
}
//#endregion
//#region node_modules/estree-util-is-identifier-name/lib/index.js
var Pt = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Ft = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, It = {};
function Lt(e, t) {
	return ((t || It).jsx ? Ft : Pt).test(e);
}
//#endregion
//#region node_modules/hast-util-whitespace/lib/index.js
var Rt = /[ \t\n\f\r]/g;
function zt(e) {
	return typeof e == "object" ? e.type === "text" && Bt(e.value) : Bt(e);
}
function Bt(e) {
	return e.replace(Rt, "") === "";
}
//#endregion
//#region node_modules/property-information/lib/util/schema.js
var Vt = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
Vt.prototype.normal = {}, Vt.prototype.property = {}, Vt.prototype.space = void 0;
//#endregion
//#region node_modules/property-information/lib/util/merge.js
function Ht(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new Vt(n, r, t);
}
//#endregion
//#region node_modules/property-information/lib/normalize.js
function Ut(e) {
	return e.toLowerCase();
}
//#endregion
//#region node_modules/property-information/lib/util/info.js
var Wt = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
Wt.prototype.attribute = "", Wt.prototype.booleanish = !1, Wt.prototype.boolean = !1, Wt.prototype.commaOrSpaceSeparated = !1, Wt.prototype.commaSeparated = !1, Wt.prototype.defined = !1, Wt.prototype.mustUseProperty = !1, Wt.prototype.number = !1, Wt.prototype.overloadedBoolean = !1, Wt.prototype.property = "", Wt.prototype.spaceSeparated = !1, Wt.prototype.space = void 0;
//#endregion
//#region node_modules/property-information/lib/util/types.js
var Gt = /* @__PURE__ */ s({
	boolean: () => A,
	booleanish: () => qt,
	commaOrSpaceSeparated: () => Zt,
	commaSeparated: () => Xt,
	number: () => j,
	overloadedBoolean: () => Jt,
	spaceSeparated: () => Yt
}), Kt = 0, A = Qt(), qt = Qt(), Jt = Qt(), j = Qt(), Yt = Qt(), Xt = Qt(), Zt = Qt();
function Qt() {
	return 2 ** ++Kt;
}
//#endregion
//#region node_modules/property-information/lib/util/defined-info.js
var $t = Object.keys(Gt), en = class extends Wt {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), tn(this, "space", r), typeof n == "number") for (; ++i < $t.length;) {
			let e = $t[i];
			tn(this, $t[i], (n & Gt[e]) === Gt[e]);
		}
	}
};
en.prototype.defined = !0;
function tn(e, t, n) {
	n && (e[t] = n);
}
//#endregion
//#region node_modules/property-information/lib/util/create.js
function nn(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new en(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Ut(r)] = r, n[Ut(a.attribute)] = r;
	}
	return new Vt(t, n, e.space);
}
//#endregion
//#region node_modules/property-information/lib/aria.js
var rn = nn({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: qt,
		ariaAutoComplete: null,
		ariaBusy: qt,
		ariaChecked: qt,
		ariaColCount: j,
		ariaColIndex: j,
		ariaColSpan: j,
		ariaControls: Yt,
		ariaCurrent: null,
		ariaDescribedBy: Yt,
		ariaDetails: null,
		ariaDisabled: qt,
		ariaDropEffect: Yt,
		ariaErrorMessage: null,
		ariaExpanded: qt,
		ariaFlowTo: Yt,
		ariaGrabbed: qt,
		ariaHasPopup: null,
		ariaHidden: qt,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: Yt,
		ariaLevel: j,
		ariaLive: null,
		ariaModal: qt,
		ariaMultiLine: qt,
		ariaMultiSelectable: qt,
		ariaOrientation: null,
		ariaOwns: Yt,
		ariaPlaceholder: null,
		ariaPosInSet: j,
		ariaPressed: qt,
		ariaReadOnly: qt,
		ariaRelevant: null,
		ariaRequired: qt,
		ariaRoleDescription: Yt,
		ariaRowCount: j,
		ariaRowIndex: j,
		ariaRowSpan: j,
		ariaSelected: qt,
		ariaSetSize: j,
		ariaSort: null,
		ariaValueMax: j,
		ariaValueMin: j,
		ariaValueNow: j,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
//#endregion
//#region node_modules/property-information/lib/util/case-sensitive-transform.js
function an(e, t) {
	return t in e ? e[t] : t;
}
//#endregion
//#region node_modules/property-information/lib/util/case-insensitive-transform.js
function on(e, t) {
	return an(e, t.toLowerCase());
}
//#endregion
//#region node_modules/property-information/lib/html.js
var sn = nn({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: Xt,
		acceptCharset: Yt,
		accessKey: Yt,
		action: null,
		allow: null,
		allowFullScreen: A,
		allowPaymentRequest: A,
		allowUserMedia: A,
		alpha: A,
		alt: null,
		as: null,
		async: A,
		autoCapitalize: null,
		autoComplete: Yt,
		autoFocus: A,
		autoPlay: A,
		blocking: Yt,
		capture: null,
		charSet: null,
		checked: A,
		cite: null,
		className: Yt,
		closedBy: null,
		colorSpace: null,
		cols: j,
		colSpan: j,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: qt,
		controls: A,
		controlsList: Yt,
		coords: j | Xt,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: A,
		defer: A,
		dir: null,
		dirName: null,
		disabled: A,
		download: Jt,
		draggable: qt,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: A,
		formTarget: null,
		headers: Yt,
		height: j,
		hidden: Jt,
		high: j,
		href: null,
		hrefLang: null,
		htmlFor: Yt,
		httpEquiv: Yt,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: A,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: A,
		itemId: null,
		itemProp: Yt,
		itemRef: Yt,
		itemScope: A,
		itemType: Yt,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: A,
		low: j,
		manifest: null,
		max: null,
		maxLength: j,
		media: null,
		method: null,
		min: null,
		minLength: j,
		multiple: A,
		muted: A,
		name: null,
		nonce: null,
		noModule: A,
		noValidate: A,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: A,
		optimum: j,
		pattern: null,
		ping: Yt,
		placeholder: null,
		playsInline: A,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: A,
		referrerPolicy: null,
		rel: Yt,
		required: A,
		reversed: A,
		rows: j,
		rowSpan: j,
		sandbox: Yt,
		scope: null,
		scoped: A,
		seamless: A,
		selected: A,
		shadowRootClonable: A,
		shadowRootCustomElementRegistry: A,
		shadowRootDelegatesFocus: A,
		shadowRootMode: null,
		shadowRootSerializable: A,
		shape: null,
		size: j,
		sizes: null,
		slot: null,
		span: j,
		spellCheck: qt,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: j,
		step: null,
		style: null,
		tabIndex: j,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: A,
		useMap: null,
		value: qt,
		width: j,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: Yt,
		axis: null,
		background: null,
		bgColor: null,
		border: j,
		borderColor: null,
		bottomMargin: j,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: A,
		declare: A,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: j,
		leftMargin: j,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: j,
		marginWidth: j,
		noResize: A,
		noHref: A,
		noShade: A,
		noWrap: A,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: j,
		rules: null,
		scheme: null,
		scrolling: qt,
		standby: null,
		summary: null,
		text: null,
		topMargin: j,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: j,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: A,
		disablePictureInPicture: A,
		disableRemotePlayback: A,
		exportParts: Xt,
		part: Yt,
		prefix: null,
		property: null,
		results: j,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: on
}), cn = nn({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: Zt,
		accentHeight: j,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: j,
		amplitude: j,
		arabicForm: null,
		ascent: j,
		attributeName: null,
		attributeType: null,
		azimuth: j,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: j,
		by: null,
		calcMode: null,
		capHeight: j,
		className: Yt,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: j,
		diffuseConstant: j,
		direction: null,
		display: null,
		dur: null,
		divisor: j,
		dominantBaseline: null,
		download: A,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: j,
		enableBackground: null,
		end: null,
		event: null,
		exponent: j,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: j,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: Xt,
		g2: Xt,
		glyphName: Xt,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: j,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: j,
		horizOriginX: j,
		horizOriginY: j,
		id: null,
		ideographic: j,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: j,
		k: j,
		k1: j,
		k2: j,
		k3: j,
		k4: j,
		kernelMatrix: Zt,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: j,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: j,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: j,
		overlineThickness: j,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: j,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: Yt,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: j,
		pointsAtY: j,
		pointsAtZ: j,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: Zt,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: Zt,
		rev: Zt,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: Zt,
		requiredFeatures: Zt,
		requiredFonts: Zt,
		requiredFormats: Zt,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: j,
		specularExponent: j,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: j,
		strikethroughThickness: j,
		string: null,
		stroke: null,
		strokeDashArray: Zt,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: j,
		strokeOpacity: j,
		strokeWidth: null,
		style: null,
		surfaceScale: j,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: Zt,
		tabIndex: j,
		tableValues: null,
		target: null,
		targetX: j,
		targetY: j,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: Zt,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: j,
		underlineThickness: j,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: j,
		values: null,
		vAlphabetic: j,
		vMathematical: j,
		vectorEffect: null,
		vHanging: j,
		vIdeographic: j,
		version: null,
		vertAdvY: j,
		vertOriginX: j,
		vertOriginY: j,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: j,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: an
}), ln = nn({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), un = nn({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: on
}), dn = nn({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), fn = {
	classId: "classID",
	dataType: "datatype",
	itemId: "itemID",
	strokeDashArray: "strokeDasharray",
	strokeDashOffset: "strokeDashoffset",
	strokeLineCap: "strokeLinecap",
	strokeLineJoin: "strokeLinejoin",
	strokeMiterLimit: "strokeMiterlimit",
	typeOf: "typeof",
	xLinkActuate: "xlinkActuate",
	xLinkArcRole: "xlinkArcrole",
	xLinkHref: "xlinkHref",
	xLinkRole: "xlinkRole",
	xLinkShow: "xlinkShow",
	xLinkTitle: "xlinkTitle",
	xLinkType: "xlinkType",
	xmlnsXLink: "xmlnsXlink"
}, pn = /[A-Z]/g, mn = /-[a-z]/g, hn = /^data[-\w.:]+$/i;
function gn(e, t) {
	let n = Ut(t), r = t, i = Wt;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && hn.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(mn, vn);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!mn.test(e)) {
				let n = e.replace(pn, _n);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = en;
	}
	return new i(r, t);
}
function _n(e) {
	return "-" + e.toLowerCase();
}
function vn(e) {
	return e.charAt(1).toUpperCase();
}
//#endregion
//#region node_modules/property-information/index.js
var yn = Ht([
	rn,
	sn,
	ln,
	un,
	dn
], "html"), bn = Ht([
	rn,
	cn,
	ln,
	un,
	dn
], "svg");
//#endregion
//#region node_modules/space-separated-tokens/index.js
function xn(e) {
	let t = String(e || "").trim();
	return t ? t.split(/[ \t\n\r\f]+/g) : [];
}
function Sn(e) {
	return e.join(" ").trim();
}
//#endregion
//#region node_modules/inline-style-parser/cjs/index.js
var Cn = /* @__PURE__ */ o(((e, t) => {
	var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, r = /\n/g, i = /^\s*/, a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, o = /^:\s*/, s = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, c = /^[;\s]*/, l = /^\s+|\s+$/g;
	function u(e, t) {
		if (typeof e != "string") throw TypeError("First argument must be a string");
		if (!e) return [];
		t ||= {};
		var l = 1, u = 1;
		function f(e) {
			var t = e.match(r);
			t && (l += t.length);
			var n = e.lastIndexOf("\n");
			u = ~n ? e.length - n : u + e.length;
		}
		function p() {
			var e = {
				line: l,
				column: u
			};
			return function(t) {
				return t.position = new m(e), _(), t;
			};
		}
		function m(e) {
			this.start = e, this.end = {
				line: l,
				column: u
			}, this.source = t.source;
		}
		m.prototype.content = e;
		function h(n) {
			var r = /* @__PURE__ */ Error(t.source + ":" + l + ":" + u + ": " + n);
			if (r.reason = n, r.filename = t.source, r.line = l, r.column = u, r.source = e, !t.silent) throw r;
		}
		function g(t) {
			var n = t.exec(e);
			if (n) {
				var r = n[0];
				return f(r), e = e.slice(r.length), n;
			}
		}
		function _() {
			g(i);
		}
		function v(e) {
			var t;
			for (e ||= []; t = y();) t !== !1 && e.push(t);
			return e;
		}
		function y() {
			var t = p();
			if (e.charAt(0) == "/" && e.charAt(1) == "*") {
				for (var n = 2; e.charAt(n) != "" && (e.charAt(n) != "*" || e.charAt(n + 1) != "/");) ++n;
				if (n += 2, e.charAt(n - 1) === "") return h("End of comment missing");
				var r = e.slice(2, n - 2);
				return u += 2, f(r), e = e.slice(n), u += 2, t({
					type: "comment",
					comment: r
				});
			}
		}
		function b() {
			var e = p(), t = g(a);
			if (t) {
				if (y(), !g(o)) return h("property missing ':'");
				var r = g(s), i = e({
					type: "declaration",
					property: d(t[0].replace(n, "")),
					value: r ? d(r[0].replace(n, "")) : ""
				});
				return g(c), i;
			}
		}
		function x() {
			var e = [];
			v(e);
			for (var t; t = b();) t !== !1 && (e.push(t), v(e));
			return e;
		}
		return _(), x();
	}
	function d(e) {
		return e ? e.replace(l, "") : "";
	}
	t.exports = u;
})), wn = /* @__PURE__ */ o(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = r;
	var n = t(Cn());
	function r(e, t) {
		let r = null;
		if (!e || typeof e != "string") return r;
		let i = (0, n.default)(e), a = typeof t == "function";
		return i.forEach((e) => {
			if (e.type !== "declaration") return;
			let { property: n, value: i } = e;
			a ? t(n, i, e) : i && (r ||= {}, r[n] = i);
		}), r;
	}
})), Tn = /* @__PURE__ */ o(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.camelCase = void 0;
	var t = /^--[a-zA-Z0-9_-]+$/, n = /-([a-z])/g, r = /^[^-]+$/, i = /^-(webkit|moz|ms|o|khtml)-/, a = /^-(ms)-/, o = function(e) {
		return !e || r.test(e) || t.test(e);
	}, s = function(e, t) {
		return t.toUpperCase();
	}, c = function(e, t) {
		return `${t}-`;
	};
	e.camelCase = function(e, t) {
		return t === void 0 && (t = {}), o(e) ? e : (e = e.toLowerCase(), e = t.reactCompat ? e.replace(a, c) : e.replace(i, c), e.replace(n, s));
	};
})), En = /* @__PURE__ */ o(((e, t) => {
	var n = (e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	})(wn()), r = Tn();
	function i(e, t) {
		var i = {};
		return !e || typeof e != "string" || (0, n.default)(e, function(e, n) {
			e && n && (i[(0, r.camelCase)(e, t)] = n);
		}), i;
	}
	i.default = i, t.exports = i;
})), Dn = kn("end"), On = kn("start");
function kn(e) {
	return t;
	function t(t) {
		let n = t && t.position && t.position[e] || {};
		if (typeof n.line == "number" && n.line > 0 && typeof n.column == "number" && n.column > 0) return {
			line: n.line,
			column: n.column,
			offset: typeof n.offset == "number" && n.offset > -1 ? n.offset : void 0
		};
	}
}
function An(e) {
	let t = On(e), n = Dn(e);
	if (t && n) return {
		start: t,
		end: n
	};
}
//#endregion
//#region node_modules/unist-util-stringify-position/lib/index.js
function jn(e) {
	return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Nn(e.position) : "start" in e || "end" in e ? Nn(e) : "line" in e || "column" in e ? Mn(e) : "";
}
function Mn(e) {
	return Pn(e && e.line) + ":" + Pn(e && e.column);
}
function Nn(e) {
	return Mn(e && e.start) + "-" + Mn(e && e.end);
}
function Pn(e) {
	return e && typeof e == "number" ? e : 1;
}
//#endregion
//#region node_modules/vfile-message/lib/index.js
var Fn = class extends Error {
	constructor(e, t, n) {
		super(), typeof t == "string" && (n = t, t = void 0);
		let r = "", i = {}, a = !1;
		if (t && (i = "line" in t && "column" in t || "start" in t && "end" in t ? { place: t } : "type" in t ? {
			ancestors: [t],
			place: t.position
		} : { ...t }), typeof e == "string" ? r = e : !i.cause && e && (a = !0, r = e.message, i.cause = e), !i.ruleId && !i.source && typeof n == "string") {
			let e = n.indexOf(":");
			e === -1 ? i.ruleId = n : (i.source = n.slice(0, e), i.ruleId = n.slice(e + 1));
		}
		if (!i.place && i.ancestors && i.ancestors) {
			let e = i.ancestors[i.ancestors.length - 1];
			e && (i.place = e.position);
		}
		let o = i.place && "start" in i.place ? i.place.start : i.place;
		this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = r, this.line = o ? o.line : void 0, this.name = jn(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
	}
};
Fn.prototype.file = "", Fn.prototype.name = "", Fn.prototype.reason = "", Fn.prototype.message = "", Fn.prototype.stack = "", Fn.prototype.column = void 0, Fn.prototype.line = void 0, Fn.prototype.ancestors = void 0, Fn.prototype.cause = void 0, Fn.prototype.fatal = void 0, Fn.prototype.place = void 0, Fn.prototype.ruleId = void 0, Fn.prototype.source = void 0;
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/lib/index.js
var In = /* @__PURE__ */ l(En(), 1), Ln = {}.hasOwnProperty, Rn = /* @__PURE__ */ new Map(), zn = /[A-Z]/g, Bn = /* @__PURE__ */ new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]), Vn = /* @__PURE__ */ new Set(["td", "th"]), Hn = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Un(e, t) {
	if (!t || t.Fragment === void 0) throw TypeError("Expected `Fragment` in options");
	let n = t.filePath || void 0, r;
	if (t.development) {
		if (typeof t.jsxDEV != "function") throw TypeError("Expected `jsxDEV` in options when `development: true`");
		r = er(n, t.jsxDEV);
	} else {
		if (typeof t.jsx != "function") throw TypeError("Expected `jsx` in production options");
		if (typeof t.jsxs != "function") throw TypeError("Expected `jsxs` in production options");
		r = $n(n, t.jsx, t.jsxs);
	}
	let i = {
		Fragment: t.Fragment,
		ancestors: [],
		components: t.components || {},
		create: r,
		elementAttributeNameCase: t.elementAttributeNameCase || "react",
		evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
		filePath: n,
		ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
		passKeys: t.passKeys !== !1,
		passNode: t.passNode || !1,
		schema: t.space === "svg" ? bn : yn,
		stylePropertyNameCase: t.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
	}, a = Wn(i, e, void 0);
	return a && typeof a != "string" ? a : i.create(e, i.Fragment, { children: a || void 0 }, void 0);
}
function Wn(e, t, n) {
	if (t.type === "element") return Gn(e, t, n);
	if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression") return Kn(e, t);
	if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement") return Jn(e, t, n);
	if (t.type === "mdxjsEsm") return qn(e, t);
	if (t.type === "root") return Yn(e, t, n);
	if (t.type === "text") return Xn(e, t);
}
function Gn(e, t, n) {
	let r = e.schema, i = r;
	t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = bn, e.schema = i), e.ancestors.push(t);
	let a = or(e, t.tagName, !1), o = tr(e, t), s = rr(e, t);
	return Bn.has(t.tagName) && (s = s.filter(function(e) {
		return typeof e != "string" || !zt(e);
	})), Zn(e, o, a, t), Qn(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Kn(e, t) {
	if (t.data && t.data.estree && e.evaluater) {
		let n = t.data.estree.body[0];
		return n.type, e.evaluater.evaluateExpression(n.expression);
	}
	sr(e, t.position);
}
function qn(e, t) {
	if (t.data && t.data.estree && e.evaluater) return e.evaluater.evaluateProgram(t.data.estree);
	sr(e, t.position);
}
function Jn(e, t, n) {
	let r = e.schema, i = r;
	t.name === "svg" && r.space === "html" && (i = bn, e.schema = i), e.ancestors.push(t);
	let a = t.name === null ? e.Fragment : or(e, t.name, !0), o = nr(e, t), s = rr(e, t);
	return Zn(e, o, a, t), Qn(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Yn(e, t, n) {
	let r = {};
	return Qn(r, rr(e, t)), e.create(t, e.Fragment, r, n);
}
function Xn(e, t) {
	return t.value;
}
function Zn(e, t, n, r) {
	typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function Qn(e, t) {
	if (t.length > 0) {
		let n = t.length > 1 ? t : t[0];
		n && (e.children = n);
	}
}
function $n(e, t, n) {
	return r;
	function r(e, r, i, a) {
		let o = Array.isArray(i.children) ? n : t;
		return a ? o(r, i, a) : o(r, i);
	}
}
function er(e, t) {
	return n;
	function n(n, r, i, a) {
		let o = Array.isArray(i.children), s = On(n);
		return t(r, i, a, o, {
			columnNumber: s ? s.column - 1 : void 0,
			fileName: e,
			lineNumber: s ? s.line : void 0
		}, void 0);
	}
}
function tr(e, t) {
	let n = {}, r, i;
	for (i in t.properties) if (i !== "children" && Ln.call(t.properties, i)) {
		let a = ir(e, i, t.properties[i]);
		if (a) {
			let [i, o] = a;
			e.tableCellAlignToStyle && i === "align" && typeof o == "string" && Vn.has(t.tagName) ? r = o : n[i] = o;
		}
	}
	if (r) {
		let t = n.style ||= {};
		t[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
	}
	return n;
}
function nr(e, t) {
	let n = {};
	for (let r of t.attributes) if (r.type === "mdxJsxExpressionAttribute") {
		if (r.data && r.data.estree && e.evaluater) {
			let t = r.data.estree.body[0];
			t.type;
			let i = t.expression;
			i.type;
			let a = i.properties[0];
			a.type, Object.assign(n, e.evaluater.evaluateExpression(a.argument));
		} else sr(e, t.position);
	} else {
		let i = r.name, a;
		if (r.value && typeof r.value == "object") {
			if (r.value.data && r.value.data.estree && e.evaluater) {
				let t = r.value.data.estree.body[0];
				t.type, a = e.evaluater.evaluateExpression(t.expression);
			} else sr(e, t.position);
		} else a = r.value === null || r.value;
		n[i] = a;
	}
	return n;
}
function rr(e, t) {
	let n = [], r = -1, i = e.passKeys ? /* @__PURE__ */ new Map() : Rn;
	for (; ++r < t.children.length;) {
		let a = t.children[r], o;
		if (e.passKeys) {
			let e = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
			if (e) {
				let t = i.get(e) || 0;
				o = e + "-" + t, i.set(e, t + 1);
			}
		}
		let s = Wn(e, a, o);
		s !== void 0 && n.push(s);
	}
	return n;
}
function ir(e, t, n) {
	let r = gn(e.schema, t);
	if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
		if (Array.isArray(n) && (n = r.commaSeparated ? Nt(n) : Sn(n)), r.property === "style") {
			let t = typeof n == "object" ? n : ar(e, String(n));
			return e.stylePropertyNameCase === "css" && (t = cr(t)), ["style", t];
		}
		return [e.elementAttributeNameCase === "react" && r.space ? fn[r.property] || r.property : r.attribute, n];
	}
}
function ar(e, t) {
	try {
		return (0, In.default)(t, { reactCompat: !0 });
	} catch (t) {
		if (e.ignoreInvalidStyle) return {};
		let n = t, r = new Fn("Cannot parse `style` attribute", {
			ancestors: e.ancestors,
			cause: n,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		throw r.file = e.filePath || void 0, r.url = Hn + "#cannot-parse-style-attribute", r;
	}
}
function or(e, t, n) {
	let r;
	if (!n) r = {
		type: "Literal",
		value: t
	};
	else if (t.includes(".")) {
		let e = t.split("."), n = -1, i;
		for (; ++n < e.length;) {
			let t = Lt(e[n]) ? {
				type: "Identifier",
				name: e[n]
			} : {
				type: "Literal",
				value: e[n]
			};
			i = i ? {
				type: "MemberExpression",
				object: i,
				property: t,
				computed: !!(n && t.type === "Literal"),
				optional: !1
			} : t;
		}
		r = i;
	} else r = Lt(t) && !/^[a-z]/.test(t) ? {
		type: "Identifier",
		name: t
	} : {
		type: "Literal",
		value: t
	};
	if (r.type === "Literal") {
		let t = r.value;
		return Ln.call(e.components, t) ? e.components[t] : t;
	}
	if (e.evaluater) return e.evaluater.evaluateExpression(r);
	sr(e);
}
function sr(e, t) {
	let n = new Fn("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: e.ancestors,
		place: t,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	throw n.file = e.filePath || void 0, n.url = Hn + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function cr(e) {
	let t = {}, n;
	for (n in e) Ln.call(e, n) && (t[lr(n)] = e[n]);
	return t;
}
function lr(e) {
	let t = e.replace(zn, ur);
	return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function ur(e) {
	return "-" + e.toLowerCase();
}
//#endregion
//#region node_modules/html-url-attributes/lib/index.js
var dr = {
	action: ["form"],
	cite: [
		"blockquote",
		"del",
		"ins",
		"q"
	],
	data: ["object"],
	formAction: ["button", "input"],
	href: [
		"a",
		"area",
		"base",
		"link"
	],
	icon: ["menuitem"],
	itemId: null,
	manifest: ["html"],
	ping: ["a", "area"],
	poster: ["video"],
	src: [
		"audio",
		"embed",
		"iframe",
		"img",
		"input",
		"script",
		"source",
		"track",
		"video"
	]
}, fr = {};
function pr(e, t) {
	let n = t || fr;
	return mr(e, typeof n.includeImageAlt != "boolean" || n.includeImageAlt, typeof n.includeHtml != "boolean" || n.includeHtml);
}
function mr(e, t, n) {
	if (gr(e)) {
		if ("value" in e) return e.type === "html" && !n ? "" : e.value;
		if (t && "alt" in e && e.alt) return e.alt;
		if ("children" in e) return hr(e.children, t, n);
	}
	return Array.isArray(e) ? hr(e, t, n) : "";
}
function hr(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) r[i] = mr(e[i], t, n);
	return r.join("");
}
function gr(e) {
	return !!(e && typeof e == "object");
}
//#endregion
//#region node_modules/decode-named-character-reference/index.dom.js
var _r = document.createElement("i");
function vr(e) {
	let t = "&" + e + ";";
	_r.innerHTML = t;
	let n = _r.textContent;
	return n.charCodeAt(n.length - 1) === 59 && e !== "semi" ? !1 : n !== t && n;
}
//#endregion
//#region node_modules/micromark-util-chunked/index.js
function yr(e, t, n, r) {
	let i = e.length, a = 0, o;
	if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
	else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function br(e, t) {
	return e.length > 0 ? (yr(e, e.length, 0, t), e) : t;
}
//#endregion
//#region node_modules/micromark-util-combine-extensions/index.js
var xr = {}.hasOwnProperty;
function Sr(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) Cr(t, e[n]);
	return t;
}
function Cr(e, t) {
	let n;
	for (n in t) {
		let r = (xr.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) {
			xr.call(r, a) || (r[a] = []);
			let e = i[a];
			wr(r[a], Array.isArray(e) ? e : e ? [e] : []);
		}
	}
}
function wr(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
	yr(e, 0, 0, r);
}
//#endregion
//#region node_modules/micromark-util-decode-numeric-character-reference/index.js
function Tr(e, t) {
	let n = Number.parseInt(e, t);
	return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111 ? "�" : String.fromCodePoint(n);
}
//#endregion
//#region node_modules/micromark-util-normalize-identifier/index.js
function Er(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
//#endregion
//#region node_modules/micromark-util-character/index.js
var Dr = Lr(/[A-Za-z]/), Or = Lr(/[\dA-Za-z]/), kr = Lr(/[#-'*+\--9=?A-Z^-~]/);
function Ar(e) {
	return e !== null && (e < 32 || e === 127);
}
var jr = Lr(/\d/), Mr = Lr(/[\dA-Fa-f]/), Nr = Lr(/[!-/:-@[-`{-~]/);
function M(e) {
	return e !== null && e < -2;
}
function Pr(e) {
	return e !== null && (e < 0 || e === 32);
}
function N(e) {
	return e === -2 || e === -1 || e === 32;
}
var Fr = Lr(/\p{P}|\p{S}/u), Ir = Lr(/\s/);
function Lr(e) {
	return t;
	function t(t) {
		return t !== null && t > -1 && e.test(String.fromCharCode(t));
	}
}
//#endregion
//#region node_modules/micromark-util-sanitize-uri/index.js
function Rr(e) {
	let t = [], n = -1, r = 0, i = 0;
	for (; ++n < e.length;) {
		let a = e.charCodeAt(n), o = "";
		if (a === 37 && Or(e.charCodeAt(n + 1)) && Or(e.charCodeAt(n + 2))) i = 2;
		else if (a < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
		else if (a > 55295 && a < 57344) {
			let t = e.charCodeAt(n + 1);
			a < 56320 && t > 56319 && t < 57344 ? (o = String.fromCharCode(a, t), i = 1) : o = "�";
		} else o = String.fromCharCode(a);
		o &&= (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, ""), i &&= (n += i, 0);
	}
	return t.join("") + e.slice(r);
}
//#endregion
//#region node_modules/micromark-factory-space/index.js
function P(e, t, n, r) {
	let i = r ? r - 1 : Infinity, a = 0;
	return o;
	function o(r) {
		return N(r) ? (e.enter(n), s(r)) : t(r);
	}
	function s(r) {
		return N(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/content.js
var zr = { tokenize: Br };
function Br(e) {
	let t = e.attempt(this.parser.constructs.contentInitial, r, i), n;
	return t;
	function r(n) {
		if (n === null) {
			e.consume(n);
			return;
		}
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), P(e, t, "linePrefix");
	}
	function i(t) {
		return e.enter("paragraph"), a(t);
	}
	function a(t) {
		let r = e.enter("chunkText", {
			contentType: "text",
			previous: n
		});
		return n && (n.next = r), n = r, o(t);
	}
	function o(t) {
		if (t === null) {
			e.exit("chunkText"), e.exit("paragraph"), e.consume(t);
			return;
		}
		return M(t) ? (e.consume(t), e.exit("chunkText"), a) : (e.consume(t), o);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/document.js
var Vr = { tokenize: Ur }, Hr = { tokenize: Wr };
function Ur(e) {
	let t = this, n = [], r = 0, i, a, o;
	return s;
	function s(i) {
		if (r < n.length) {
			let a = n[r];
			return t.containerState = a[1], e.attempt(a[0].continuation, c, l)(i);
		}
		return l(i);
	}
	function c(e) {
		if (r++, t.containerState._closeFlow) {
			t.containerState._closeFlow = void 0, i && v();
			let n = t.events.length, a = n, o;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				o = t.events[a][1].end;
				break;
			}
			_(r);
			let s = n;
			for (; s < t.events.length;) t.events[s][1].end = { ...o }, s++;
			return yr(t.events, a + 1, 0, t.events.slice(n)), t.events.length = s, l(e);
		}
		return s(e);
	}
	function l(a) {
		if (r === n.length) {
			if (!i) return f(a);
			if (i.currentConstruct && i.currentConstruct.concrete) return m(a);
			t.interrupt = !(!i.currentConstruct || i._gfmTableDynamicInterruptHack);
		}
		return t.containerState = {}, e.check(Hr, u, d)(a);
	}
	function u(e) {
		return i && v(), _(r), f(e);
	}
	function d(e) {
		return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, m(e);
	}
	function f(n) {
		return t.containerState = {}, e.attempt(Hr, p, m)(n);
	}
	function p(e) {
		return r++, n.push([t.currentConstruct, t.containerState]), f(e);
	}
	function m(n) {
		if (n === null) {
			i && v(), _(0), e.consume(n);
			return;
		}
		return i ||= t.parser.flow(t.now()), e.enter("chunkFlow", {
			_tokenizer: i,
			contentType: "flow",
			previous: a
		}), h(n);
	}
	function h(n) {
		if (n === null) {
			g(e.exit("chunkFlow"), !0), _(0), e.consume(n);
			return;
		}
		return M(n) ? (e.consume(n), g(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(n), h);
	}
	function g(e, n) {
		let s = t.sliceStream(e);
		if (n && s.push(null), e.previous = a, a && (a.next = e), a = e, i.defineSkip(e.start), i.write(s), t.parser.lazy[e.start.line]) {
			let e = i.events.length;
			for (; e--;) if (i.events[e][1].start.offset < o && (!i.events[e][1].end || i.events[e][1].end.offset > o)) return;
			let n = t.events.length, a = n, s, c;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				if (s) {
					c = t.events[a][1].end;
					break;
				}
				s = !0;
			}
			for (_(r), e = n; e < t.events.length;) t.events[e][1].end = { ...c }, e++;
			yr(t.events, a + 1, 0, t.events.slice(n)), t.events.length = e;
		}
	}
	function _(r) {
		let i = n.length;
		for (; i-- > r;) {
			let r = n[i];
			t.containerState = r[1], r[0].exit.call(t, e);
		}
		n.length = r;
	}
	function v() {
		i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
	}
}
function Wr(e, t, n) {
	return P(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
//#endregion
//#region node_modules/micromark-util-classify-character/index.js
function Gr(e) {
	if (e === null || Pr(e) || Ir(e)) return 1;
	if (Fr(e)) return 2;
}
//#endregion
//#region node_modules/micromark-util-resolve-all/index.js
function Kr(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) {
		let a = e[i].resolveAll;
		a && !r.includes(a) && (t = a(t, n), r.push(a));
	}
	return t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/attention.js
var qr = {
	name: "attention",
	resolveAll: Jr,
	tokenize: Yr
};
function Jr(e, t) {
	let n = -1, r, i, a, o, s, c, l, u;
	for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
		for (r = n; r--;) if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
			if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
			c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
			let d = { ...e[r][1].end }, f = { ...e[n][1].start };
			Xr(d, -c), Xr(f, c), o = {
				type: c > 1 ? "strongSequence" : "emphasisSequence",
				start: d,
				end: { ...e[r][1].end }
			}, s = {
				type: c > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...e[n][1].start },
				end: f
			}, a = {
				type: c > 1 ? "strongText" : "emphasisText",
				start: { ...e[r][1].end },
				end: { ...e[n][1].start }
			}, i = {
				type: c > 1 ? "strong" : "emphasis",
				start: { ...o.start },
				end: { ...s.end }
			}, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = br(l, [[
				"enter",
				e[r][1],
				t
			], [
				"exit",
				e[r][1],
				t
			]])), l = br(l, [
				[
					"enter",
					i,
					t
				],
				[
					"enter",
					o,
					t
				],
				[
					"exit",
					o,
					t
				],
				[
					"enter",
					a,
					t
				]
			]), l = br(l, Kr(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), l = br(l, [
				[
					"exit",
					a,
					t
				],
				[
					"enter",
					s,
					t
				],
				[
					"exit",
					s,
					t
				],
				[
					"exit",
					i,
					t
				]
			]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, l = br(l, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])) : u = 0, yr(e, r - 1, n - r + 3, l), n = r + l.length - u - 2;
			break;
		}
	}
	for (n = -1; ++n < e.length;) e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
	return e;
}
function Yr(e, t) {
	let n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Gr(r), a;
	return o;
	function o(t) {
		return a = t, e.enter("attentionSequence"), s(t);
	}
	function s(o) {
		if (o === a) return e.consume(o), s;
		let c = e.exit("attentionSequence"), l = Gr(o), u = !l || l === 2 && i || n.includes(o), d = !i || i === 2 && l || n.includes(r);
		return c._open = !!(a === 42 ? u : u && (i || !d)), c._close = !!(a === 42 ? d : d && (l || !u)), t(o);
	}
}
function Xr(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/autolink.js
var Zr = {
	name: "autolink",
	tokenize: Qr
};
function Qr(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
	}
	function a(t) {
		return Dr(t) ? (e.consume(t), o) : t === 64 ? n(t) : l(t);
	}
	function o(e) {
		return e === 43 || e === 45 || e === 46 || Or(e) ? (r = 1, s(e)) : l(e);
	}
	function s(t) {
		return t === 58 ? (e.consume(t), r = 0, c) : (t === 43 || t === 45 || t === 46 || Or(t)) && r++ < 32 ? (e.consume(t), s) : (r = 0, l(t));
	}
	function c(r) {
		return r === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(r), e.exit("autolinkMarker"), e.exit("autolink"), t) : r === null || r === 32 || r === 60 || Ar(r) ? n(r) : (e.consume(r), c);
	}
	function l(t) {
		return t === 64 ? (e.consume(t), u) : kr(t) ? (e.consume(t), l) : n(t);
	}
	function u(e) {
		return Or(e) ? d(e) : n(e);
	}
	function d(n) {
		return n === 46 ? (e.consume(n), r = 0, u) : n === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(n), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(n);
	}
	function f(t) {
		if ((t === 45 || Or(t)) && r++ < 63) {
			let n = t === 45 ? f : d;
			return e.consume(t), n;
		}
		return n(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/blank-line.js
var $r = {
	partial: !0,
	tokenize: ei
};
function ei(e, t, n) {
	return r;
	function r(t) {
		return N(t) ? P(e, i, "linePrefix")(t) : i(t);
	}
	function i(e) {
		return e === null || M(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/block-quote.js
var ti = {
	continuation: { tokenize: ri },
	exit: ii,
	name: "blockQuote",
	tokenize: ni
};
function ni(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		if (t === 62) {
			let n = r.containerState;
			return n.open ||= (e.enter("blockQuote", { _container: !0 }), !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(t), e.exit("blockQuoteMarker"), a;
		}
		return n(t);
	}
	function a(n) {
		return N(n) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n));
	}
}
function ri(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return N(t) ? P(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : a(t);
	}
	function a(r) {
		return e.attempt(ti, t, n)(r);
	}
}
function ii(e) {
	e.exit("blockQuote");
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-escape.js
var ai = {
	name: "characterEscape",
	tokenize: oi
};
function oi(e, t, n) {
	return r;
	function r(t) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t), e.exit("escapeMarker"), i;
	}
	function i(r) {
		return Nr(r) ? (e.enter("characterEscapeValue"), e.consume(r), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-reference.js
var si = {
	name: "characterReference",
	tokenize: ci
};
function ci(e, t, n) {
	let r = this, i = 0, a, o;
	return s;
	function s(t) {
		return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(t), e.exit("characterReferenceMarker"), c;
	}
	function c(t) {
		return t === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(t), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), a = 31, o = Or, u(t));
	}
	function l(t) {
		return t === 88 || t === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(t), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Mr, u) : (e.enter("characterReferenceValue"), a = 7, o = jr, u(t));
	}
	function u(s) {
		if (s === 59 && i) {
			let i = e.exit("characterReferenceValue");
			return o === Or && !vr(r.sliceSerialize(i)) ? n(s) : (e.enter("characterReferenceMarker"), e.consume(s), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
		}
		return o(s) && i++ < a ? (e.consume(s), u) : n(s);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-fenced.js
var li = {
	partial: !0,
	tokenize: fi
}, ui = {
	concrete: !0,
	name: "codeFenced",
	tokenize: di
};
function di(e, t, n) {
	let r = this, i = {
		partial: !0,
		tokenize: x
	}, a = 0, o = 0, s;
	return c;
	function c(e) {
		return l(e);
	}
	function l(t) {
		let n = r.events[r.events.length - 1];
		return a = n && n[1].type === "linePrefix" ? n[2].sliceSerialize(n[1], !0).length : 0, s = t, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(t);
	}
	function u(t) {
		return t === s ? (o++, e.consume(t), u) : o < 3 ? n(t) : (e.exit("codeFencedFenceSequence"), N(t) ? P(e, d, "whitespace")(t) : d(t));
	}
	function d(n) {
		return n === null || M(n) ? (e.exit("codeFencedFence"), r.interrupt ? t(n) : e.check(li, h, b)(n)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), f(n));
	}
	function f(t) {
		return t === null || M(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(t)) : N(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), P(e, p, "whitespace")(t)) : t === 96 && t === s ? n(t) : (e.consume(t), f);
	}
	function p(t) {
		return t === null || M(t) ? d(t) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), m(t));
	}
	function m(t) {
		return t === null || M(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(t)) : t === 96 && t === s ? n(t) : (e.consume(t), m);
	}
	function h(t) {
		return e.attempt(i, b, g)(t);
	}
	function g(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), _;
	}
	function _(t) {
		return a > 0 && N(t) ? P(e, v, "linePrefix", a + 1)(t) : v(t);
	}
	function v(t) {
		return t === null || M(t) ? e.check(li, h, b)(t) : (e.enter("codeFlowValue"), y(t));
	}
	function y(t) {
		return t === null || M(t) ? (e.exit("codeFlowValue"), v(t)) : (e.consume(t), y);
	}
	function b(n) {
		return e.exit("codeFenced"), t(n);
	}
	function x(e, t, n) {
		let i = 0;
		return a;
		function a(t) {
			return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c;
		}
		function c(t) {
			return e.enter("codeFencedFence"), N(t) ? P(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : l(t);
		}
		function l(t) {
			return t === s ? (e.enter("codeFencedFenceSequence"), u(t)) : n(t);
		}
		function u(t) {
			return t === s ? (i++, e.consume(t), u) : i >= o ? (e.exit("codeFencedFenceSequence"), N(t) ? P(e, d, "whitespace")(t) : d(t)) : n(t);
		}
		function d(r) {
			return r === null || M(r) ? (e.exit("codeFencedFence"), t(r)) : n(r);
		}
	}
}
function fi(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t === null ? n(t) : (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-indented.js
var pi = {
	name: "codeIndented",
	tokenize: hi
}, mi = {
	partial: !0,
	tokenize: gi
};
function hi(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("codeIndented"), P(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let t = r.events[r.events.length - 1];
		return t && t[1].type === "linePrefix" && t[2].sliceSerialize(t[1], !0).length >= 4 ? o(e) : n(e);
	}
	function o(t) {
		return t === null ? c(t) : M(t) ? e.attempt(mi, o, c)(t) : (e.enter("codeFlowValue"), s(t));
	}
	function s(t) {
		return t === null || M(t) ? (e.exit("codeFlowValue"), o(t)) : (e.consume(t), s);
	}
	function c(n) {
		return e.exit("codeIndented"), t(n);
	}
}
function gi(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.parser.lazy[r.now().line] ? n(t) : M(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), i) : P(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let a = r.events[r.events.length - 1];
		return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(e) : M(e) ? i(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-text.js
var _i = {
	name: "codeText",
	previous: yi,
	resolve: vi,
	tokenize: bi
};
function vi(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "codeTextData") {
			e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function yi(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function bi(e, t, n) {
	let r = 0, i, a;
	return o;
	function o(t) {
		return e.enter("codeText"), e.enter("codeTextSequence"), s(t);
	}
	function s(t) {
		return t === 96 ? (e.consume(t), r++, s) : (e.exit("codeTextSequence"), c(t));
	}
	function c(t) {
		return t === null ? n(t) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), c) : t === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(t)) : M(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c) : (e.enter("codeTextData"), l(t));
	}
	function l(t) {
		return t === null || t === 32 || t === 96 || M(t) ? (e.exit("codeTextData"), c(t)) : (e.consume(t), l);
	}
	function u(n) {
		return n === 96 ? (e.consume(n), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(n)) : (a.type = "codeTextData", l(n));
	}
}
//#endregion
//#region node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var xi = class {
	constructor(e) {
		this.left = e ? [...e] : [], this.right = [];
	}
	get(e) {
		if (e < 0 || e >= this.left.length + this.right.length) throw RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		return this.setCursor(0), this.right.pop();
	}
	slice(e, t) {
		let n = t ?? Infinity;
		return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
	}
	splice(e, t, n) {
		let r = t || 0;
		this.setCursor(Math.trunc(e));
		let i = this.right.splice(this.right.length - r, Infinity);
		return n && Si(this.left, n), i.reverse();
	}
	pop() {
		return this.setCursor(Infinity), this.left.pop();
	}
	push(e) {
		this.setCursor(Infinity), this.left.push(e);
	}
	pushMany(e) {
		this.setCursor(Infinity), Si(this.left, e);
	}
	unshift(e) {
		this.setCursor(0), this.right.push(e);
	}
	unshiftMany(e) {
		this.setCursor(0), Si(this.right, e.reverse());
	}
	setCursor(e) {
		if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) {
			if (e < this.left.length) {
				let t = this.left.splice(e, Infinity);
				Si(this.right, t.reverse());
			} else {
				let t = this.right.splice(this.left.length + this.right.length - e, Infinity);
				Si(this.left, t.reverse());
			}
		}
	}
};
function Si(e, t) {
	let n = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; n < t.length;) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
//#endregion
//#region node_modules/micromark-util-subtokenize/index.js
function Ci(e) {
	let t = {}, n = -1, r, i, a, o, s, c, l, u = new xi(e);
	for (; ++n < u.length;) {
		for (; n in t;) n = t[n];
		if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content")) for (; ++a < c.length && c[a][1].type !== "content";) c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
		if (r[0] === "enter") r[1].contentType && (Object.assign(t, wi(u, n)), n = t[n], l = !0);
		else if (r[1]._container) {
			for (a = n, i = void 0; a--;) if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank") o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
			else if (o[1].type !== "linePrefix" && o[1].type !== "listItemIndent") break;
			i && (r[1].end = { ...u.get(i)[1].start }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
		}
	}
	return yr(e, 0, Infinity, u.slice(0)), !l;
}
function wi(e, t) {
	let n = e.get(t)[1], r = e.get(t)[2], i = t - 1, a = [], o = n._tokenizer;
	o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
	let s = o.events, c = [], l = {}, u, d, f = -1, p = n, m = 0, h = 0, g = [h];
	for (; p;) {
		for (; e.get(++i)[1] !== p;);
		a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
	}
	for (p = n; ++f < s.length;) s[f][0] === "exit" && s[f - 1][0] === "enter" && s[f][1].type === s[f - 1][1].type && s[f][1].start.line !== s[f][1].end.line && (h = f + 1, g.push(h), p._tokenizer = void 0, p.previous = void 0, p = p.next);
	for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : g.pop(), f = g.length; f--;) {
		let t = s.slice(g[f], g[f + 1]), n = a.pop();
		c.push([n, n + t.length - 1]), e.splice(n, 2, t);
	}
	for (c.reverse(), f = -1; ++f < c.length;) l[m + c[f][0]] = m + c[f][1], m += c[f][1] - c[f][0] - 1;
	return l;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/content.js
var Ti = {
	resolve: Di,
	tokenize: Oi
}, Ei = {
	partial: !0,
	tokenize: ki
};
function Di(e) {
	return Ci(e), e;
}
function Oi(e, t) {
	let n;
	return r;
	function r(t) {
		return e.enter("content"), n = e.enter("chunkContent", { contentType: "content" }), i(t);
	}
	function i(t) {
		return t === null ? a(t) : M(t) ? e.check(Ei, o, a)(t) : (e.consume(t), i);
	}
	function a(n) {
		return e.exit("chunkContent"), e.exit("content"), t(n);
	}
	function o(t) {
		return e.consume(t), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
			contentType: "content",
			previous: n
		}), n = n.next, i;
	}
}
function ki(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), P(e, a, "linePrefix");
	}
	function a(i) {
		if (i === null || M(i)) return n(i);
		let a = r.events[r.events.length - 1];
		return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(i) : e.interrupt(r.parser.constructs.flow, n, t)(i);
	}
}
//#endregion
//#region node_modules/micromark-factory-destination/index.js
function Ai(e, t, n, r, i, a, o, s, c) {
	let l = c || Infinity, u = 0;
	return d;
	function d(t) {
		return t === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(t), e.exit(a), f) : t === null || t === 32 || t === 41 || Ar(t) ? n(t) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", { contentType: "string" }), h(t));
	}
	function f(n) {
		return n === 62 ? (e.enter(a), e.consume(n), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", { contentType: "string" }), p(n));
	}
	function p(t) {
		return t === 62 ? (e.exit("chunkString"), e.exit(s), f(t)) : t === null || t === 60 || M(t) ? n(t) : (e.consume(t), t === 92 ? m : p);
	}
	function m(t) {
		return t === 60 || t === 62 || t === 92 ? (e.consume(t), p) : p(t);
	}
	function h(i) {
		return !u && (i === null || i === 41 || Pr(i)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(i)) : u < l && i === 40 ? (e.consume(i), u++, h) : i === 41 ? (e.consume(i), u--, h) : i === null || i === 32 || i === 40 || Ar(i) ? n(i) : (e.consume(i), i === 92 ? g : h);
	}
	function g(t) {
		return t === 40 || t === 41 || t === 92 ? (e.consume(t), h) : h(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-label/index.js
function ji(e, t, n, r, i, a) {
	let o = this, s = 0, c;
	return l;
	function l(t) {
		return e.enter(r), e.enter(i), e.consume(t), e.exit(i), e.enter(a), u;
	}
	function u(l) {
		return s > 999 || l === null || l === 91 || l === 93 && !c || 
		/* c8 ignore next 3 */
		l === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(l) : l === 93 ? (e.exit(a), e.enter(i), e.consume(l), e.exit(i), e.exit(r), t) : M(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), u) : (e.enter("chunkString", { contentType: "string" }), d(l));
	}
	function d(t) {
		return t === null || t === 91 || t === 93 || M(t) || s++ > 999 ? (e.exit("chunkString"), u(t)) : (e.consume(t), c ||= !N(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), s++, d) : d(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-title/index.js
function Mi(e, t, n, r, i, a) {
	let o;
	return s;
	function s(t) {
		return t === 34 || t === 39 || t === 40 ? (e.enter(r), e.enter(i), e.consume(t), e.exit(i), o = t === 40 ? 41 : t, c) : n(t);
	}
	function c(n) {
		return n === o ? (e.enter(i), e.consume(n), e.exit(i), e.exit(r), t) : (e.enter(a), l(n));
	}
	function l(t) {
		return t === o ? (e.exit(a), c(o)) : t === null ? n(t) : M(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), P(e, l, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), u(t));
	}
	function u(t) {
		return t === o || t === null || M(t) ? (e.exit("chunkString"), l(t)) : (e.consume(t), t === 92 ? d : u);
	}
	function d(t) {
		return t === o || t === 92 ? (e.consume(t), u) : u(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-whitespace/index.js
function Ni(e, t) {
	let n;
	return r;
	function r(i) {
		return M(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : N(i) ? P(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/definition.js
var Pi = {
	name: "definition",
	tokenize: Ii
}, Fi = {
	partial: !0,
	tokenize: Li
};
function Ii(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("definition"), o(t);
	}
	function o(t) {
		return ji.call(r, e, s, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t);
	}
	function s(t) {
		return i = Er(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), c) : n(t);
	}
	function c(t) {
		return Pr(t) ? Ni(e, l)(t) : l(t);
	}
	function l(t) {
		return Ai(e, u, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t);
	}
	function u(t) {
		return e.attempt(Fi, d, d)(t);
	}
	function d(t) {
		return N(t) ? P(e, f, "whitespace")(t) : f(t);
	}
	function f(a) {
		return a === null || M(a) ? (e.exit("definition"), r.parser.defined.push(i), t(a)) : n(a);
	}
}
function Li(e, t, n) {
	return r;
	function r(t) {
		return Pr(t) ? Ni(e, i)(t) : n(t);
	}
	function i(t) {
		return Mi(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t);
	}
	function a(t) {
		return N(t) ? P(e, o, "whitespace")(t) : o(t);
	}
	function o(e) {
		return e === null || M(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var Ri = {
	name: "hardBreakEscape",
	tokenize: zi
};
function zi(e, t, n) {
	return r;
	function r(t) {
		return e.enter("hardBreakEscape"), e.consume(t), i;
	}
	function i(r) {
		return M(r) ? (e.exit("hardBreakEscape"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/heading-atx.js
var Bi = {
	name: "headingAtx",
	resolve: Vi,
	tokenize: Hi
};
function Vi(e, t) {
	let n = e.length - 2, r = 3, i, a;
	return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
		type: "atxHeadingText",
		start: e[r][1].start,
		end: e[n][1].end
	}, a = {
		type: "chunkText",
		start: e[r][1].start,
		end: e[n][1].end,
		contentType: "text"
	}, yr(e, r, n - r + 1, [
		[
			"enter",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"exit",
			a,
			t
		],
		[
			"exit",
			i,
			t
		]
	])), e;
}
function Hi(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("atxHeading"), a(t);
	}
	function a(t) {
		return e.enter("atxHeadingSequence"), o(t);
	}
	function o(t) {
		return t === 35 && r++ < 6 ? (e.consume(t), o) : t === null || Pr(t) ? (e.exit("atxHeadingSequence"), s(t)) : n(t);
	}
	function s(n) {
		return n === 35 ? (e.enter("atxHeadingSequence"), c(n)) : n === null || M(n) ? (e.exit("atxHeading"), t(n)) : N(n) ? P(e, s, "whitespace")(n) : (e.enter("atxHeadingText"), l(n));
	}
	function c(t) {
		return t === 35 ? (e.consume(t), c) : (e.exit("atxHeadingSequence"), s(t));
	}
	function l(t) {
		return t === null || t === 35 || Pr(t) ? (e.exit("atxHeadingText"), s(t)) : (e.consume(t), l);
	}
}
//#endregion
//#region node_modules/micromark-util-html-tag-name/index.js
var Ui = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), Wi = [
	"pre",
	"script",
	"style",
	"textarea"
], Gi = {
	concrete: !0,
	name: "htmlFlow",
	resolveTo: Ji,
	tokenize: Yi
}, Ki = {
	partial: !0,
	tokenize: Zi
}, qi = {
	partial: !0,
	tokenize: Xi
};
function Ji(e) {
	let t = e.length;
	for (; t-- && (e[t][0] !== "enter" || e[t][1].type !== "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Yi(e, t, n) {
	let r = this, i, a, o, s, c;
	return l;
	function l(e) {
		return u(e);
	}
	function u(t) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t), d;
	}
	function d(s) {
		return s === 33 ? (e.consume(s), f) : s === 47 ? (e.consume(s), a = !0, h) : s === 63 ? (e.consume(s), i = 3, r.interrupt ? t : se) : Dr(s) ? (e.consume(s), o = String.fromCharCode(s), g) : n(s);
	}
	function f(a) {
		return a === 45 ? (e.consume(a), i = 2, p) : a === 91 ? (e.consume(a), i = 5, s = 0, m) : Dr(a) ? (e.consume(a), i = 4, r.interrupt ? t : se) : n(a);
	}
	function p(i) {
		return i === 45 ? (e.consume(i), r.interrupt ? t : se) : n(i);
	}
	function m(i) {
		return i === "CDATA[".charCodeAt(s++) ? (e.consume(i), s === 6 ? r.interrupt ? t : D : m) : n(i);
	}
	function h(t) {
		return Dr(t) ? (e.consume(t), o = String.fromCharCode(t), g) : n(t);
	}
	function g(s) {
		if (s === null || s === 47 || s === 62 || Pr(s)) {
			let c = s === 47, l = o.toLowerCase();
			return !c && !a && Wi.includes(l) ? (i = 1, r.interrupt ? t(s) : D(s)) : Ui.includes(o.toLowerCase()) ? (i = 6, c ? (e.consume(s), _) : r.interrupt ? t(s) : D(s)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(s) : a ? v(s) : y(s));
		}
		return s === 45 || Or(s) ? (e.consume(s), o += String.fromCharCode(s), g) : n(s);
	}
	function _(i) {
		return i === 62 ? (e.consume(i), r.interrupt ? t : D) : n(i);
	}
	function v(t) {
		return N(t) ? (e.consume(t), v) : E(t);
	}
	function y(t) {
		return t === 47 ? (e.consume(t), E) : t === 58 || t === 95 || Dr(t) ? (e.consume(t), b) : N(t) ? (e.consume(t), y) : E(t);
	}
	function b(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || Or(t) ? (e.consume(t), b) : x(t);
	}
	function x(t) {
		return t === 61 ? (e.consume(t), S) : N(t) ? (e.consume(t), x) : y(t);
	}
	function S(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), c = t, C) : N(t) ? (e.consume(t), S) : w(t);
	}
	function C(t) {
		return t === c ? (e.consume(t), c = null, T) : t === null || M(t) ? n(t) : (e.consume(t), C);
	}
	function w(t) {
		return t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || Pr(t) ? x(t) : (e.consume(t), w);
	}
	function T(e) {
		return e === 47 || e === 62 || N(e) ? y(e) : n(e);
	}
	function E(t) {
		return t === 62 ? (e.consume(t), ee) : n(t);
	}
	function ee(t) {
		return t === null || M(t) ? D(t) : N(t) ? (e.consume(t), ee) : n(t);
	}
	function D(t) {
		return t === 45 && i === 2 ? (e.consume(t), ie) : t === 60 && i === 1 ? (e.consume(t), ae) : t === 62 && i === 4 ? (e.consume(t), ce) : t === 63 && i === 3 ? (e.consume(t), se) : t === 93 && i === 5 ? (e.consume(t), oe) : M(t) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(Ki, le, te)(t)) : t === null || M(t) ? (e.exit("htmlFlowData"), te(t)) : (e.consume(t), D);
	}
	function te(t) {
		return e.check(qi, ne, le)(t);
	}
	function ne(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), re;
	}
	function re(t) {
		return t === null || M(t) ? te(t) : (e.enter("htmlFlowData"), D(t));
	}
	function ie(t) {
		return t === 45 ? (e.consume(t), se) : D(t);
	}
	function ae(t) {
		return t === 47 ? (e.consume(t), o = "", O) : D(t);
	}
	function O(t) {
		if (t === 62) {
			let n = o.toLowerCase();
			return Wi.includes(n) ? (e.consume(t), ce) : D(t);
		}
		return Dr(t) && o.length < 8 ? (e.consume(t), o += String.fromCharCode(t), O) : D(t);
	}
	function oe(t) {
		return t === 93 ? (e.consume(t), se) : D(t);
	}
	function se(t) {
		return t === 62 ? (e.consume(t), ce) : t === 45 && i === 2 ? (e.consume(t), se) : D(t);
	}
	function ce(t) {
		return t === null || M(t) ? (e.exit("htmlFlowData"), le(t)) : (e.consume(t), ce);
	}
	function le(n) {
		return e.exit("htmlFlow"), t(n);
	}
}
function Xi(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return M(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a) : n(t);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
function Zi(e, t, n) {
	return r;
	function r(r) {
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt($r, t, n);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/html-text.js
var Qi = {
	name: "htmlText",
	tokenize: $i
};
function $i(e, t, n) {
	let r = this, i, a, o;
	return s;
	function s(t) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t), c;
	}
	function c(t) {
		return t === 33 ? (e.consume(t), l) : t === 47 ? (e.consume(t), x) : t === 63 ? (e.consume(t), y) : Dr(t) ? (e.consume(t), w) : n(t);
	}
	function l(t) {
		return t === 45 ? (e.consume(t), u) : t === 91 ? (e.consume(t), a = 0, m) : Dr(t) ? (e.consume(t), v) : n(t);
	}
	function u(t) {
		return t === 45 ? (e.consume(t), p) : n(t);
	}
	function d(t) {
		return t === null ? n(t) : t === 45 ? (e.consume(t), f) : M(t) ? (o = d, ae(t)) : (e.consume(t), d);
	}
	function f(t) {
		return t === 45 ? (e.consume(t), p) : d(t);
	}
	function p(e) {
		return e === 62 ? ie(e) : e === 45 ? f(e) : d(e);
	}
	function m(t) {
		return t === "CDATA[".charCodeAt(a++) ? (e.consume(t), a === 6 ? h : m) : n(t);
	}
	function h(t) {
		return t === null ? n(t) : t === 93 ? (e.consume(t), g) : M(t) ? (o = h, ae(t)) : (e.consume(t), h);
	}
	function g(t) {
		return t === 93 ? (e.consume(t), _) : h(t);
	}
	function _(t) {
		return t === 62 ? ie(t) : t === 93 ? (e.consume(t), _) : h(t);
	}
	function v(t) {
		return t === null || t === 62 ? ie(t) : M(t) ? (o = v, ae(t)) : (e.consume(t), v);
	}
	function y(t) {
		return t === null ? n(t) : t === 63 ? (e.consume(t), b) : M(t) ? (o = y, ae(t)) : (e.consume(t), y);
	}
	function b(e) {
		return e === 62 ? ie(e) : y(e);
	}
	function x(t) {
		return Dr(t) ? (e.consume(t), S) : n(t);
	}
	function S(t) {
		return t === 45 || Or(t) ? (e.consume(t), S) : C(t);
	}
	function C(t) {
		return M(t) ? (o = C, ae(t)) : N(t) ? (e.consume(t), C) : ie(t);
	}
	function w(t) {
		return t === 45 || Or(t) ? (e.consume(t), w) : t === 47 || t === 62 || Pr(t) ? T(t) : n(t);
	}
	function T(t) {
		return t === 47 ? (e.consume(t), ie) : t === 58 || t === 95 || Dr(t) ? (e.consume(t), E) : M(t) ? (o = T, ae(t)) : N(t) ? (e.consume(t), T) : ie(t);
	}
	function E(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || Or(t) ? (e.consume(t), E) : ee(t);
	}
	function ee(t) {
		return t === 61 ? (e.consume(t), D) : M(t) ? (o = ee, ae(t)) : N(t) ? (e.consume(t), ee) : T(t);
	}
	function D(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), i = t, te) : M(t) ? (o = D, ae(t)) : N(t) ? (e.consume(t), D) : (e.consume(t), ne);
	}
	function te(t) {
		return t === i ? (e.consume(t), i = void 0, re) : t === null ? n(t) : M(t) ? (o = te, ae(t)) : (e.consume(t), te);
	}
	function ne(t) {
		return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? n(t) : t === 47 || t === 62 || Pr(t) ? T(t) : (e.consume(t), ne);
	}
	function re(e) {
		return e === 47 || e === 62 || Pr(e) ? T(e) : n(e);
	}
	function ie(r) {
		return r === 62 ? (e.consume(r), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(r);
	}
	function ae(t) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), O;
	}
	function O(t) {
		return N(t) ? P(e, oe, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : oe(t);
	}
	function oe(t) {
		return e.enter("htmlTextData"), o(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-end.js
var ea = {
	name: "labelEnd",
	resolveAll: ia,
	resolveTo: aa,
	tokenize: oa
}, ta = { tokenize: sa }, na = { tokenize: ca }, ra = { tokenize: la };
function ia(e) {
	let t = -1, n = [];
	for (; ++t < e.length;) {
		let r = e[t][1];
		if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
			let e = r.type === "labelImage" ? 4 : 2;
			r.type = "data", t += e;
		}
	}
	return e.length !== n.length && yr(e, 0, e.length, n), e;
}
function aa(e, t) {
	let n = e.length, r = 0, i, a, o, s;
	for (; n--;) if (i = e[n][1], a) {
		if (i.type === "link" || i.type === "labelLink" && i._inactive) break;
		e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
	} else if (o) {
		if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (a = n, i.type !== "labelLink")) {
			r = 2;
			break;
		}
	} else i.type === "labelEnd" && (o = n);
	let c = {
		type: e[a][1].type === "labelLink" ? "link" : "image",
		start: { ...e[a][1].start },
		end: { ...e[e.length - 1][1].end }
	}, l = {
		type: "label",
		start: { ...e[a][1].start },
		end: { ...e[o][1].end }
	}, u = {
		type: "labelText",
		start: { ...e[a + r + 2][1].end },
		end: { ...e[o - 2][1].start }
	};
	return s = [[
		"enter",
		c,
		t
	], [
		"enter",
		l,
		t
	]], s = br(s, e.slice(a + 1, a + r + 3)), s = br(s, [[
		"enter",
		u,
		t
	]]), s = br(s, Kr(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = br(s, [
		[
			"exit",
			u,
			t
		],
		e[o - 2],
		e[o - 1],
		[
			"exit",
			l,
			t
		]
	]), s = br(s, e.slice(o + 1)), s = br(s, [[
		"exit",
		c,
		t
	]]), yr(e, a, e.length, s), e;
}
function oa(e, t, n) {
	let r = this, i = r.events.length, a, o;
	for (; i--;) if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
		a = r.events[i][1];
		break;
	}
	return s;
	function s(t) {
		return a ? a._inactive ? d(t) : (o = r.parser.defined.includes(Er(r.sliceSerialize({
			start: a.end,
			end: r.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(t);
	}
	function c(t) {
		return t === 40 ? e.attempt(ta, u, o ? u : d)(t) : t === 91 ? e.attempt(na, u, o ? l : d)(t) : o ? u(t) : d(t);
	}
	function l(t) {
		return e.attempt(ra, u, d)(t);
	}
	function u(e) {
		return t(e);
	}
	function d(e) {
		return a._balanced = !0, n(e);
	}
}
function sa(e, t, n) {
	return r;
	function r(t) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), i;
	}
	function i(t) {
		return Pr(t) ? Ni(e, a)(t) : a(t);
	}
	function a(t) {
		return t === 41 ? u(t) : Ai(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t);
	}
	function o(t) {
		return Pr(t) ? Ni(e, c)(t) : u(t);
	}
	function s(e) {
		return n(e);
	}
	function c(t) {
		return t === 34 || t === 39 || t === 40 ? Mi(e, l, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t) : u(t);
	}
	function l(t) {
		return Pr(t) ? Ni(e, u)(t) : u(t);
	}
	function u(r) {
		return r === 41 ? (e.enter("resourceMarker"), e.consume(r), e.exit("resourceMarker"), e.exit("resource"), t) : n(r);
	}
}
function ca(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return ji.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(t);
	}
	function a(e) {
		return r.parser.defined.includes(Er(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
	}
	function o(e) {
		return n(e);
	}
}
function la(e, t, n) {
	return r;
	function r(t) {
		return e.enter("reference"), e.enter("referenceMarker"), e.consume(t), e.exit("referenceMarker"), i;
	}
	function i(r) {
		return r === 93 ? (e.enter("referenceMarker"), e.consume(r), e.exit("referenceMarker"), e.exit("reference"), t) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-start-image.js
var ua = {
	name: "labelStartImage",
	resolveAll: ea.resolveAll,
	tokenize: da
};
function da(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(t), e.exit("labelImageMarker"), a;
	}
	function a(t) {
		return t === 91 ? (e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelImage"), o) : n(t);
	}
	function o(e) {
		/* c8 ignore next 3 */
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-start-link.js
var fa = {
	name: "labelStartLink",
	resolveAll: ea.resolveAll,
	tokenize: pa
};
function pa(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("labelLink"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelLink"), a;
	}
	function a(e) {
		/* c8 ignore next 3 */
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/line-ending.js
var ma = {
	name: "lineEnding",
	tokenize: ha
};
function ha(e, t) {
	return n;
	function n(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), P(e, t, "linePrefix");
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/thematic-break.js
var ga = {
	name: "thematicBreak",
	tokenize: _a
};
function _a(e, t, n) {
	let r = 0, i;
	return a;
	function a(t) {
		return e.enter("thematicBreak"), o(t);
	}
	function o(e) {
		return i = e, s(e);
	}
	function s(a) {
		return a === i ? (e.enter("thematicBreakSequence"), c(a)) : r >= 3 && (a === null || M(a)) ? (e.exit("thematicBreak"), t(a)) : n(a);
	}
	function c(t) {
		return t === i ? (e.consume(t), r++, c) : (e.exit("thematicBreakSequence"), N(t) ? P(e, s, "whitespace")(t) : s(t));
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/list.js
var va = {
	continuation: { tokenize: Sa },
	exit: wa,
	name: "list",
	tokenize: xa
}, ya = {
	partial: !0,
	tokenize: Ta
}, ba = {
	partial: !0,
	tokenize: Ca
};
function xa(e, t, n) {
	let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
	return s;
	function s(t) {
		let i = r.containerState.type || (t === 42 || t === 43 || t === 45 ? "listUnordered" : "listOrdered");
		if (i === "listUnordered" ? !r.containerState.marker || t === r.containerState.marker : jr(t)) {
			if (r.containerState.type || (r.containerState.type = i, e.enter(i, { _container: !0 })), i === "listUnordered") return e.enter("listItemPrefix"), t === 42 || t === 45 ? e.check(ga, n, l)(t) : l(t);
			if (!r.interrupt || t === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), c(t);
		}
		return n(t);
	}
	function c(t) {
		return jr(t) && ++o < 10 ? (e.consume(t), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? t === r.containerState.marker : t === 41 || t === 46) ? (e.exit("listItemValue"), l(t)) : n(t);
	}
	function l(t) {
		return e.enter("listItemMarker"), e.consume(t), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || t, e.check($r, r.interrupt ? n : u, e.attempt(ya, f, d));
	}
	function u(e) {
		return r.containerState.initialBlankLine = !0, a++, f(e);
	}
	function d(t) {
		return N(t) ? (e.enter("listItemPrefixWhitespace"), e.consume(t), e.exit("listItemPrefixWhitespace"), f) : n(t);
	}
	function f(n) {
		return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(n);
	}
}
function Sa(e, t, n) {
	let r = this;
	return r.containerState._closeFlow = void 0, e.check($r, i, a);
	function i(n) {
		return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, P(e, t, "listItemIndent", r.containerState.size + 1)(n);
	}
	function a(n) {
		return r.containerState.furtherBlankLines || !N(n) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(n)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(ba, t, o)(n));
	}
	function o(i) {
		return r.containerState._closeFlow = !0, r.interrupt = void 0, P(e, e.attempt(va, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
	}
}
function Ca(e, t, n) {
	let r = this;
	return P(e, i, "listItemIndent", r.containerState.size + 1);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(e) : n(e);
	}
}
function wa(e) {
	e.exit(this.containerState.type);
}
function Ta(e, t, n) {
	let r = this;
	return P(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return !N(e) && i && i[1].type === "listItemPrefixWhitespace" ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/setext-underline.js
var Ea = {
	name: "setextUnderline",
	resolveTo: Da,
	tokenize: Oa
};
function Da(e, t) {
	let n = e.length, r, i, a;
	for (; n--;) if (e[n][0] === "enter") {
		if (e[n][1].type === "content") {
			r = n;
			break;
		}
		e[n][1].type === "paragraph" && (i = n);
	} else e[n][1].type === "content" && e.splice(n, 1), !a && e[n][1].type === "definition" && (a = n);
	let o = {
		type: "setextHeading",
		start: { ...e[r][1].start },
		end: { ...e[e.length - 1][1].end }
	};
	return e[i][1].type = "setextHeadingText", a ? (e.splice(i, 0, [
		"enter",
		o,
		t
	]), e.splice(a + 1, 0, [
		"exit",
		e[r][1],
		t
	]), e[r][1].end = { ...e[a][1].end }) : e[r][1] = o, e.push([
		"exit",
		o,
		t
	]), e;
}
function Oa(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		let a = r.events.length, s;
		for (; a--;) if (r.events[a][1].type !== "lineEnding" && r.events[a][1].type !== "linePrefix" && r.events[a][1].type !== "content") {
			s = r.events[a][1].type === "paragraph";
			break;
		}
		return !r.parser.lazy[r.now().line] && (r.interrupt || s) ? (e.enter("setextHeadingLine"), i = t, o(t)) : n(t);
	}
	function o(t) {
		return e.enter("setextHeadingLineSequence"), s(t);
	}
	function s(t) {
		return t === i ? (e.consume(t), s) : (e.exit("setextHeadingLineSequence"), N(t) ? P(e, c, "lineSuffix")(t) : c(t));
	}
	function c(r) {
		return r === null || M(r) ? (e.exit("setextHeadingLine"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/flow.js
var ka = { tokenize: Aa };
function Aa(e) {
	let t = this, n = e.attempt($r, r, e.attempt(this.parser.constructs.flowInitial, i, P(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Ti, i)), "linePrefix")));
	return n;
	function r(r) {
		if (r === null) {
			e.consume(r);
			return;
		}
		return e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
	}
	function i(r) {
		if (r === null) {
			e.consume(r);
			return;
		}
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), t.currentConstruct = void 0, n;
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/text.js
var ja = { resolveAll: Fa() }, Ma = Pa("string"), Na = Pa("text");
function Pa(e) {
	return {
		resolveAll: Fa(e === "text" ? Ia : void 0),
		tokenize: t
	};
	function t(t) {
		let n = this, r = this.parser.constructs[e], i = t.attempt(r, a, o);
		return a;
		function a(e) {
			return c(e) ? i(e) : o(e);
		}
		function o(e) {
			if (e === null) {
				t.consume(e);
				return;
			}
			return t.enter("data"), t.consume(e), s;
		}
		function s(e) {
			return c(e) ? (t.exit("data"), i(e)) : (t.consume(e), s);
		}
		function c(e) {
			if (e === null) return !0;
			let t = r[e], i = -1;
			if (t) for (; ++i < t.length;) {
				let e = t[i];
				if (!e.previous || e.previous.call(n, n.previous)) return !0;
			}
			return !1;
		}
	}
}
function Fa(e) {
	return t;
	function t(t, n) {
		let r = -1, i;
		for (; ++r <= t.length;) i === void 0 ? t[r] && t[r][1].type === "data" && (i = r, r++) : (!t[r] || t[r][1].type !== "data") && (r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), r = i + 2), i = void 0);
		return e ? e(t, n) : t;
	}
}
function Ia(e, t) {
	let n = 0;
	for (; ++n <= e.length;) if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
		let r = e[n - 1][1], i = t.sliceStream(r), a = i.length, o = -1, s = 0, c;
		for (; a--;) {
			let e = i[a];
			if (typeof e == "string") {
				for (o = e.length; e.charCodeAt(o - 1) === 32;) s++, o--;
				if (o) break;
				o = -1;
			} else if (e === -2) c = !0, s++;
			else if (e !== -1) {
				a++;
				break;
			}
		}
		if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
			let i = {
				type: n === e.length || c || s < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: a ? o : r.start._bufferIndex + o,
					_index: r.start._index + a,
					line: r.end.line,
					column: r.end.column - s,
					offset: r.end.offset - s
				},
				end: { ...r.end }
			};
			r.end = { ...i.start }, r.start.offset === r.end.offset ? Object.assign(r, i) : (e.splice(n, 0, [
				"enter",
				i,
				t
			], [
				"exit",
				i,
				t
			]), n += 2);
		}
		n++;
	}
	return e;
}
//#endregion
//#region node_modules/micromark/lib/constructs.js
var La = /* @__PURE__ */ s({
	attentionMarkers: () => Ga,
	contentInitial: () => za,
	disable: () => Ka,
	document: () => Ra,
	flow: () => Va,
	flowInitial: () => Ba,
	insideSpan: () => Wa,
	string: () => Ha,
	text: () => Ua
}), Ra = {
	42: va,
	43: va,
	45: va,
	48: va,
	49: va,
	50: va,
	51: va,
	52: va,
	53: va,
	54: va,
	55: va,
	56: va,
	57: va,
	62: ti
}, za = { 91: Pi }, Ba = {
	[-2]: pi,
	[-1]: pi,
	32: pi
}, Va = {
	35: Bi,
	42: ga,
	45: [Ea, ga],
	60: Gi,
	61: Ea,
	95: ga,
	96: ui,
	126: ui
}, Ha = {
	38: si,
	92: ai
}, Ua = {
	[-5]: ma,
	[-4]: ma,
	[-3]: ma,
	33: ua,
	38: si,
	42: qr,
	60: [Zr, Qi],
	91: fa,
	92: [Ri, ai],
	93: ea,
	95: qr,
	96: _i
}, Wa = { null: [qr, ja] }, Ga = { null: [42, 95] }, Ka = { null: [] };
//#endregion
//#region node_modules/micromark/lib/create-tokenizer.js
function qa(e, t, n) {
	let r = {
		_bufferIndex: -1,
		_index: 0,
		line: n && n.line || 1,
		column: n && n.column || 1,
		offset: n && n.offset || 0
	}, i = {}, a = [], o = [], s = [], c = {
		attempt: C(x),
		check: C(S),
		consume: v,
		enter: y,
		exit: b,
		interrupt: C(S, { interrupt: !0 })
	}, l = {
		code: null,
		containerState: {},
		defineSkip: h,
		events: [],
		now: m,
		parser: e,
		previous: null,
		sliceSerialize: f,
		sliceStream: p,
		write: d
	}, u = t.tokenize.call(l, c);
	return t.resolveAll && a.push(t), l;
	function d(e) {
		return o = br(o, e), g(), o[o.length - 1] === null ? (w(t, 0), l.events = Kr(a, l.events, l), l.events) : [];
	}
	function f(e, t) {
		return Ya(p(e), t);
	}
	function p(e) {
		return Ja(o, e);
	}
	function m() {
		let { _bufferIndex: e, _index: t, line: n, column: i, offset: a } = r;
		return {
			_bufferIndex: e,
			_index: t,
			line: n,
			column: i,
			offset: a
		};
	}
	function h(e) {
		i[e.line] = e.column, E();
	}
	function g() {
		let e;
		for (; r._index < o.length;) {
			let t = o[r._index];
			if (typeof t == "string") for (e = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === e && r._bufferIndex < t.length;) _(t.charCodeAt(r._bufferIndex));
			else _(t);
		}
	}
	function _(e) {
		u = u(e);
	}
	function v(e) {
		M(e) ? (r.line++, r.column = 1, r.offset += e === -3 ? 2 : 1, E()) : e !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = e;
	}
	function y(e, t) {
		let n = t || {};
		return n.type = e, n.start = m(), l.events.push([
			"enter",
			n,
			l
		]), s.push(n), n;
	}
	function b(e) {
		let t = s.pop();
		return t.end = m(), l.events.push([
			"exit",
			t,
			l
		]), t;
	}
	function x(e, t) {
		w(e, t.from);
	}
	function S(e, t) {
		t.restore();
	}
	function C(e, t) {
		return n;
		function n(n, r, i) {
			let a, o, s, u;
			return Array.isArray(n) ? f(n) : "tokenize" in n ? f([n]) : d(n);
			function d(e) {
				return t;
				function t(t) {
					let n = t !== null && e[t], r = t !== null && e.null;
					return f([...Array.isArray(n) ? n : n ? [n] : [], ...Array.isArray(r) ? r : r ? [r] : []])(t);
				}
			}
			function f(e) {
				return a = e, o = 0, e.length === 0 ? i : p(e[o]);
			}
			function p(e) {
				return n;
				function n(n) {
					return u = T(), s = e, e.partial || (l.currentConstruct = e), e.name && l.parser.constructs.disable.null.includes(e.name) ? h(n) : e.tokenize.call(t ? Object.assign(Object.create(l), t) : l, c, m, h)(n);
				}
			}
			function m(t) {
				return e(s, u), r;
			}
			function h(e) {
				return u.restore(), ++o < a.length ? p(a[o]) : i;
			}
		}
	}
	function w(e, t) {
		e.resolveAll && !a.includes(e) && a.push(e), e.resolve && yr(l.events, t, l.events.length - t, e.resolve(l.events.slice(t), l)), e.resolveTo && (l.events = e.resolveTo(l.events, l));
	}
	function T() {
		let e = m(), t = l.previous, n = l.currentConstruct, i = l.events.length, a = Array.from(s);
		return {
			from: i,
			restore: o
		};
		function o() {
			r = e, l.previous = t, l.currentConstruct = n, l.events.length = i, s = a, E();
		}
	}
	function E() {
		r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
	}
}
function Ja(e, t) {
	let n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex, o;
	if (n === i) o = [e[n].slice(r, a)];
	else {
		if (o = e.slice(n, i), r > -1) {
			let e = o[0];
			typeof e == "string" ? o[0] = e.slice(r) : o.shift();
		}
		a > 0 && o.push(e[i].slice(0, a));
	}
	return o;
}
function Ya(e, t) {
	let n = -1, r = [], i;
	for (; ++n < e.length;) {
		let a = e[n], o;
		if (typeof a == "string") o = a;
		else switch (a) {
			case -5:
				o = "\r";
				break;
			case -4:
				o = "\n";
				break;
			case -3:
				o = "\r\n";
				break;
			case -2:
				o = t ? " " : "	";
				break;
			case -1:
				if (!t && i) continue;
				o = " ";
				break;
			default: o = String.fromCharCode(a);
		}
		i = a === -2, r.push(o);
	}
	return r.join("");
}
//#endregion
//#region node_modules/micromark/lib/parse.js
function Xa(e) {
	let t = {
		constructs: Sr([La, ...(e || {}).extensions || []]),
		content: n(zr),
		defined: [],
		document: n(Vr),
		flow: n(ka),
		lazy: {},
		string: n(Ma),
		text: n(Na)
	};
	return t;
	function n(e) {
		return n;
		function n(n) {
			return qa(t, e, n);
		}
	}
}
//#endregion
//#region node_modules/micromark/lib/postprocess.js
function Za(e) {
	for (; !Ci(e););
	return e;
}
//#endregion
//#region node_modules/micromark/lib/preprocess.js
var Qa = /[\0\t\n\r]/g;
function $a() {
	let e = 1, t = "", n = !0, r;
	return i;
	function i(i, a, o) {
		let s = [], c, l, u, d, f;
		for (i = t + (typeof i == "string" ? i.toString() : new TextDecoder(a || void 0).decode(i)), u = 0, t = "", n &&= (i.charCodeAt(0) === 65279 && u++, void 0); u < i.length;) {
			if (Qa.lastIndex = u, c = Qa.exec(i), d = c && c.index !== void 0 ? c.index : i.length, f = i.charCodeAt(d), !c) {
				t = i.slice(u);
				break;
			}
			if (f === 10 && u === d && r) s.push(-3), r = void 0;
			else switch (r &&= (s.push(-5), void 0), u < d && (s.push(i.slice(u, d)), e += d - u), f) {
				case 0:
					s.push(65533), e++;
					break;
				case 9:
					for (l = Math.ceil(e / 4) * 4, s.push(-2); e++ < l;) s.push(-1);
					break;
				case 10:
					s.push(-4), e = 1;
					break;
				default: r = !0, e = 1;
			}
			u = d + 1;
		}
		return o && (r && s.push(-5), t && s.push(t), s.push(null)), s;
	}
}
//#endregion
//#region node_modules/micromark-util-decode-string/index.js
var eo = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function to(e) {
	return e.replace(eo, no);
}
function no(e, t, n) {
	if (t) return t;
	if (n.charCodeAt(0) === 35) {
		let e = n.charCodeAt(1), t = e === 120 || e === 88;
		return Tr(n.slice(t ? 2 : 1), t ? 16 : 10);
	}
	return vr(n) || e;
}
//#endregion
//#region node_modules/mdast-util-from-markdown/lib/index.js
var ro = {}.hasOwnProperty;
function io(e, t, n) {
	return t && typeof t == "object" && (n = t, t = void 0), ao(n)(Za(Xa(n).document().write($a()(e, t, !0))));
}
function ao(e) {
	let t = {
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: a(Ee),
			autolinkProtocol: T,
			autolinkEmail: T,
			atxHeading: a(Se),
			blockQuote: a(_e),
			characterEscape: T,
			characterReference: T,
			codeFenced: a(ve),
			codeFencedFenceInfo: o,
			codeFencedFenceMeta: o,
			codeIndented: a(ve, o),
			codeText: a(ye, o),
			codeTextData: T,
			data: T,
			codeFlowValue: T,
			definition: a(be),
			definitionDestinationString: o,
			definitionLabelString: o,
			definitionTitleString: o,
			emphasis: a(xe),
			hardBreakEscape: a(Ce),
			hardBreakTrailing: a(Ce),
			htmlFlow: a(we, o),
			htmlFlowData: T,
			htmlText: a(we, o),
			htmlTextData: T,
			image: a(Te),
			label: o,
			link: a(Ee),
			listItem: a(k),
			listItemValue: f,
			listOrdered: a(De, d),
			listUnordered: a(De),
			paragraph: a(Oe),
			reference: ue,
			referenceString: o,
			resourceDestinationString: o,
			resourceTitleString: o,
			setextHeading: a(Se),
			strong: a(ke),
			thematicBreak: a(je)
		},
		exit: {
			atxHeading: c(),
			atxHeadingSequence: x,
			autolink: c(),
			autolinkEmail: ge,
			autolinkProtocol: he,
			blockQuote: c(),
			characterEscapeValue: E,
			characterReferenceMarkerHexadecimal: fe,
			characterReferenceMarkerNumeric: fe,
			characterReferenceValue: pe,
			characterReference: me,
			codeFenced: c(g),
			codeFencedFence: h,
			codeFencedFenceInfo: p,
			codeFencedFenceMeta: m,
			codeFlowValue: E,
			codeIndented: c(_),
			codeText: c(re),
			codeTextData: E,
			data: E,
			definition: c(),
			definitionDestinationString: b,
			definitionLabelString: v,
			definitionTitleString: y,
			emphasis: c(),
			hardBreakEscape: c(D),
			hardBreakTrailing: c(D),
			htmlFlow: c(te),
			htmlFlowData: E,
			htmlText: c(ne),
			htmlTextData: E,
			image: c(ae),
			label: oe,
			labelText: O,
			lineEnding: ee,
			link: c(ie),
			listItem: c(),
			listOrdered: c(),
			listUnordered: c(),
			paragraph: c(),
			referenceString: de,
			resourceDestinationString: se,
			resourceTitleString: ce,
			resource: le,
			setextHeading: c(w),
			setextHeadingLineSequence: C,
			setextHeadingText: S,
			strong: c(),
			thematicBreak: c()
		}
	};
	so(t, (e || {}).mdastExtensions || []);
	let n = {};
	return r;
	function r(e) {
		let r = {
			type: "root",
			children: []
		}, a = {
			stack: [r],
			tokenStack: [],
			config: t,
			enter: s,
			exit: l,
			buffer: o,
			resume: u,
			data: n
		}, c = [], d = -1;
		for (; ++d < e.length;) (e[d][1].type === "listOrdered" || e[d][1].type === "listUnordered") && (e[d][0] === "enter" ? c.push(d) : d = i(e, c.pop(), d));
		for (d = -1; ++d < e.length;) {
			let n = t[e[d][0]];
			ro.call(n, e[d][1].type) && n[e[d][1].type].call(Object.assign({ sliceSerialize: e[d][2].sliceSerialize }, a), e[d][1]);
		}
		if (a.tokenStack.length > 0) {
			let e = a.tokenStack[a.tokenStack.length - 1];
			(e[1] || lo).call(a, void 0, e[0]);
		}
		for (r.position = {
			start: oo(e.length > 0 ? e[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: oo(e.length > 0 ? e[e.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		}, d = -1; ++d < t.transforms.length;) r = t.transforms[d](r) || r;
		return r;
	}
	function i(e, t, n) {
		let r = t - 1, i = -1, a = !1, o, s, c, l;
		for (; ++r <= n;) {
			let t = e[r];
			switch (t[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					t[0] === "enter" ? i++ : i--, l = void 0;
					break;
				case "lineEndingBlank":
					t[0] === "enter" && (o && !l && !i && !c && (c = r), l = void 0);
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: l = void 0;
			}
			if (!i && t[0] === "enter" && t[1].type === "listItemPrefix" || i === -1 && t[0] === "exit" && (t[1].type === "listUnordered" || t[1].type === "listOrdered")) {
				if (o) {
					let i = r;
					for (s = void 0; i--;) {
						let t = e[i];
						if (t[1].type === "lineEnding" || t[1].type === "lineEndingBlank") {
							if (t[0] === "exit") continue;
							s && (e[s][1].type = "lineEndingBlank", a = !0), t[1].type = "lineEnding", s = i;
						} else if (t[1].type !== "linePrefix" && t[1].type !== "blockQuotePrefix" && t[1].type !== "blockQuotePrefixWhitespace" && t[1].type !== "blockQuoteMarker" && t[1].type !== "listItemIndent") break;
					}
					c && (!s || c < s) && (o._spread = !0), o.end = Object.assign({}, s ? e[s][1].start : t[1].end), e.splice(s || r, 0, [
						"exit",
						o,
						t[2]
					]), r++, n++;
				}
				if (t[1].type === "listItemPrefix") {
					let i = {
						type: "listItem",
						_spread: !1,
						start: Object.assign({}, t[1].start),
						end: void 0
					};
					o = i, e.splice(r, 0, [
						"enter",
						i,
						t[2]
					]), r++, n++, c = void 0, l = !0;
				}
			}
		}
		return e[t][1]._spread = a, n;
	}
	function a(e, t) {
		return n;
		function n(n) {
			s.call(this, e(n), n), t && t.call(this, n);
		}
	}
	function o() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function s(e, t, n) {
		this.stack[this.stack.length - 1].children.push(e), this.stack.push(e), this.tokenStack.push([t, n || void 0]), e.position = {
			start: oo(t.start),
			end: void 0
		};
	}
	function c(e) {
		return t;
		function t(t) {
			e && e.call(this, t), l.call(this, t);
		}
	}
	function l(e, t) {
		let n = this.stack.pop(), r = this.tokenStack.pop();
		if (r) r[0].type !== e.type && (t ? t.call(this, e, r[0]) : (r[1] || lo).call(this, e, r[0]));
		else throw Error("Cannot close `" + e.type + "` (" + jn({
			start: e.start,
			end: e.end
		}) + "): it’s not open");
		n.position.end = oo(e.end);
	}
	function u() {
		return pr(this.stack.pop());
	}
	function d() {
		this.data.expectingFirstListItemValue = !0;
	}
	function f(e) {
		if (this.data.expectingFirstListItemValue) {
			let t = this.stack[this.stack.length - 2];
			t.start = Number.parseInt(this.sliceSerialize(e), 10), this.data.expectingFirstListItemValue = void 0;
		}
	}
	function p() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.lang = e;
	}
	function m() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.meta = e;
	}
	function h() {
		this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
	}
	function g() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
	}
	function _() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/(\r?\n|\r)$/g, "");
	}
	function v(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = Er(this.sliceSerialize(e)).toLowerCase();
	}
	function y() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function b() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function x(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth ||= this.sliceSerialize(e).length;
	}
	function S() {
		this.data.setextHeadingSlurpLineEnding = !0;
	}
	function C(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth = this.sliceSerialize(e).codePointAt(0) === 61 ? 1 : 2;
	}
	function w() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function T(e) {
		let t = this.stack[this.stack.length - 1].children, n = t[t.length - 1];
		(!n || n.type !== "text") && (n = Ae(), n.position = {
			start: oo(e.start),
			end: void 0
		}, t.push(n)), this.stack.push(n);
	}
	function E(e) {
		let t = this.stack.pop();
		t.value += this.sliceSerialize(e), t.position.end = oo(e.end);
	}
	function ee(e) {
		let n = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			let t = n.children[n.children.length - 1];
			t.position.end = oo(e.end), this.data.atHardBreak = void 0;
			return;
		}
		!this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(n.type) && (T.call(this, e), E.call(this, e));
	}
	function D() {
		this.data.atHardBreak = !0;
	}
	function te() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function ne() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function re() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function ie() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function ae() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function O(e) {
		let t = this.sliceSerialize(e), n = this.stack[this.stack.length - 2];
		n.label = to(t), n.identifier = Er(t).toLowerCase();
	}
	function oe() {
		let e = this.stack[this.stack.length - 1], t = this.resume(), n = this.stack[this.stack.length - 1];
		this.data.inReference = !0, n.type === "link" ? n.children = e.children : n.alt = t;
	}
	function se() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function ce() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function le() {
		this.data.inReference = void 0;
	}
	function ue() {
		this.data.referenceType = "collapsed";
	}
	function de(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = Er(this.sliceSerialize(e)).toLowerCase(), this.data.referenceType = "full";
	}
	function fe(e) {
		this.data.characterReferenceType = e.type;
	}
	function pe(e) {
		let t = this.sliceSerialize(e), n = this.data.characterReferenceType, r;
		n ? (r = Tr(t, n === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : r = vr(t);
		let i = this.stack[this.stack.length - 1];
		i.value += r;
	}
	function me(e) {
		let t = this.stack.pop();
		t.position.end = oo(e.end);
	}
	function he(e) {
		E.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = this.sliceSerialize(e);
	}
	function ge(e) {
		E.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = "mailto:" + this.sliceSerialize(e);
	}
	function _e() {
		return {
			type: "blockquote",
			children: []
		};
	}
	function ve() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	function ye() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	function be() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	function xe() {
		return {
			type: "emphasis",
			children: []
		};
	}
	function Se() {
		return {
			type: "heading",
			depth: 0,
			children: []
		};
	}
	function Ce() {
		return { type: "break" };
	}
	function we() {
		return {
			type: "html",
			value: ""
		};
	}
	function Te() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	function Ee() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	function De(e) {
		return {
			type: "list",
			ordered: e.type === "listOrdered",
			start: null,
			spread: e._spread,
			children: []
		};
	}
	function k(e) {
		return {
			type: "listItem",
			spread: e._spread,
			checked: null,
			children: []
		};
	}
	function Oe() {
		return {
			type: "paragraph",
			children: []
		};
	}
	function ke() {
		return {
			type: "strong",
			children: []
		};
	}
	function Ae() {
		return {
			type: "text",
			value: ""
		};
	}
	function je() {
		return { type: "thematicBreak" };
	}
}
function oo(e) {
	return {
		line: e.line,
		column: e.column,
		offset: e.offset
	};
}
function so(e, t) {
	let n = -1;
	for (; ++n < t.length;) {
		let r = t[n];
		Array.isArray(r) ? so(e, r) : co(e, r);
	}
}
function co(e, t) {
	let n;
	for (n in t) if (ro.call(t, n)) switch (n) {
		case "canContainEols": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "transforms": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "enter":
		case "exit": {
			let r = t[n];
			r && Object.assign(e[n], r);
			break;
		}
	}
}
function lo(e, t) {
	throw Error(e ? "Cannot close `" + e.type + "` (" + jn({
		start: e.start,
		end: e.end
	}) + "): a different token (`" + t.type + "`, " + jn({
		start: t.start,
		end: t.end
	}) + ") is open" : "Cannot close document, a token (`" + t.type + "`, " + jn({
		start: t.start,
		end: t.end
	}) + ") is still open");
}
//#endregion
//#region node_modules/remark-parse/lib/index.js
function uo(e) {
	let t = this;
	t.parser = n;
	function n(n) {
		return io(n, {
			...t.data("settings"),
			...e,
			extensions: t.data("micromarkExtensions") || [],
			mdastExtensions: t.data("fromMarkdownExtensions") || []
		});
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function fo(e, t) {
	let n = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: e.wrap(e.all(t), !0)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/break.js
function po(e, t) {
	let n = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	return e.patch(t, n), [e.applyData(t, n), {
		type: "text",
		value: "\n"
	}];
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/code.js
function mo(e, t) {
	let n = t.value ? t.value + "\n" : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
	i.length > 0 && (r.className = ["language-" + i[0]]);
	let a = {
		type: "element",
		tagName: "code",
		properties: r,
		children: [{
			type: "text",
			value: n
		}]
	};
	return t.meta && (a.data = { meta: t.meta }), e.patch(t, a), a = e.applyData(t, a), a = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [a]
	}, e.patch(t, a), a;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/delete.js
function ho(e, t) {
	let n = {
		type: "element",
		tagName: "del",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
function go(e, t) {
	let n = {
		type: "element",
		tagName: "em",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
function _o(e, t) {
	let n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = Rr(r.toLowerCase()), a = e.footnoteOrder.indexOf(r), o, s = e.footnoteCounts.get(r);
	s === void 0 ? (s = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = a + 1, s += 1, e.footnoteCounts.set(r, s);
	let c = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + n + "fn-" + i,
			id: n + "fnref-" + i + (s > 1 ? "-" + s : ""),
			dataFootnoteRef: !0,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(o)
		}]
	};
	e.patch(t, c);
	let l = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [c]
	};
	return e.patch(t, l), e.applyData(t, l);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/heading.js
function vo(e, t) {
	let n = {
		type: "element",
		tagName: "h" + t.depth,
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/html.js
function yo(e, t) {
	if (e.options.allowDangerousHtml) {
		let n = {
			type: "raw",
			value: t.value
		};
		return e.patch(t, n), e.applyData(t, n);
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/revert.js
function bo(e, t) {
	let n = t.referenceType, r = "]";
	if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference") return [{
		type: "text",
		value: "![" + t.alt + r
	}];
	let i = e.all(t), a = i[0];
	a && a.type === "text" ? a.value = "[" + a.value : i.unshift({
		type: "text",
		value: "["
	});
	let o = i[i.length - 1];
	return o && o.type === "text" ? o.value += r : i.push({
		type: "text",
		value: r
	}), i;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
function xo(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return bo(e, t);
	let i = {
		src: Rr(r.url || ""),
		alt: t.alt
	};
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "img",
		properties: i,
		children: []
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/image.js
function So(e, t) {
	let n = { src: Rr(t.url) };
	t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "img",
		properties: n,
		children: []
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
function Co(e, t) {
	let n = {
		type: "text",
		value: t.value.replace(/\r?\n|\r/g, " ")
	};
	e.patch(t, n);
	let r = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [n]
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
function wo(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return bo(e, t);
	let i = { href: Rr(r.url || "") };
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "a",
		properties: i,
		children: e.all(t)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/link.js
function To(e, t) {
	let n = { href: Rr(t.url) };
	t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "a",
		properties: n,
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/list-item.js
function Eo(e, t, n) {
	let r = e.all(t), i = n ? Do(n) : Oo(t), a = {}, o = [];
	if (typeof t.checked == "boolean") {
		let e = r[0], n;
		e && e.type === "element" && e.tagName === "p" ? n = e : (n = {
			type: "element",
			tagName: "p",
			properties: {},
			children: []
		}, r.unshift(n)), n.children.length > 0 && n.children.unshift({
			type: "text",
			value: " "
		}), n.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: t.checked,
				disabled: !0
			},
			children: []
		}), a.className = ["task-list-item"];
	}
	let s = -1;
	for (; ++s < r.length;) {
		let e = r[s];
		(i || s !== 0 || e.type !== "element" || e.tagName !== "p") && o.push({
			type: "text",
			value: "\n"
		}), e.type === "element" && e.tagName === "p" && !i ? o.push(...e.children) : o.push(e);
	}
	let c = r[r.length - 1];
	c && (i || c.type !== "element" || c.tagName !== "p") && o.push({
		type: "text",
		value: "\n"
	});
	let l = {
		type: "element",
		tagName: "li",
		properties: a,
		children: o
	};
	return e.patch(t, l), e.applyData(t, l);
}
function Do(e) {
	let t = !1;
	if (e.type === "list") {
		t = e.spread || !1;
		let n = e.children, r = -1;
		for (; !t && ++r < n.length;) t = Oo(n[r]);
	}
	return t;
}
function Oo(e) {
	return e.spread ?? e.children.length > 1;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/list.js
function ko(e, t) {
	let n = {}, r = e.all(t), i = -1;
	for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length;) {
		let e = r[i];
		if (e.type === "element" && e.tagName === "li" && e.properties && Array.isArray(e.properties.className) && e.properties.className.includes("task-list-item")) {
			n.className = ["contains-task-list"];
			break;
		}
	}
	let a = {
		type: "element",
		tagName: t.ordered ? "ol" : "ul",
		properties: n,
		children: e.wrap(r, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
function Ao(e, t) {
	let n = {
		type: "element",
		tagName: "p",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/root.js
function jo(e, t) {
	let n = {
		type: "root",
		children: e.wrap(e.all(t))
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/strong.js
function Mo(e, t) {
	let n = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table.js
function No(e, t) {
	let n = e.all(t), r = n.shift(), i = [];
	if (r) {
		let n = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: e.wrap([r], !0)
		};
		e.patch(t.children[0], n), i.push(n);
	}
	if (n.length > 0) {
		let r = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: e.wrap(n, !0)
		}, a = On(t.children[1]), o = Dn(t.children[t.children.length - 1]);
		a && o && (r.position = {
			start: a,
			end: o
		}), i.push(r);
	}
	let a = {
		type: "element",
		tagName: "table",
		properties: {},
		children: e.wrap(i, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table-row.js
function Po(e, t, n) {
	let r = n ? n.children : void 0, i = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, o = a ? a.length : t.children.length, s = -1, c = [];
	for (; ++s < o;) {
		let n = t.children[s], r = {}, o = a ? a[s] : void 0;
		o && (r.align = o);
		let l = {
			type: "element",
			tagName: i,
			properties: r,
			children: []
		};
		n && (l.children = e.all(n), e.patch(n, l), l = e.applyData(n, l)), c.push(l);
	}
	let l = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: e.wrap(c, !0)
	};
	return e.patch(t, l), e.applyData(t, l);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
function Fo(e, t) {
	let n = {
		type: "element",
		tagName: "td",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/trim-lines/index.js
var Io = 9, Lo = 32;
function Ro(e) {
	let t = String(e), n = /\r?\n|\r/g, r = n.exec(t), i = 0, a = [];
	for (; r;) a.push(zo(t.slice(i, r.index), i > 0, !0), r[0]), i = r.index + r[0].length, r = n.exec(t);
	return a.push(zo(t.slice(i), i > 0, !1)), a.join("");
}
function zo(e, t, n) {
	let r = 0, i = e.length;
	if (t) {
		let t = e.codePointAt(r);
		for (; t === Io || t === Lo;) r++, t = e.codePointAt(r);
	}
	if (n) {
		let t = e.codePointAt(i - 1);
		for (; t === Io || t === Lo;) i--, t = e.codePointAt(i - 1);
	}
	return i > r ? e.slice(r, i) : "";
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/text.js
function Bo(e, t) {
	let n = {
		type: "text",
		value: Ro(String(t.value))
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function Vo(e, t) {
	let n = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/index.js
var Ho = {
	blockquote: fo,
	break: po,
	code: mo,
	delete: ho,
	emphasis: go,
	footnoteReference: _o,
	heading: vo,
	html: yo,
	imageReference: xo,
	image: So,
	inlineCode: Co,
	linkReference: wo,
	link: To,
	listItem: Eo,
	list: ko,
	paragraph: Ao,
	root: jo,
	strong: Mo,
	table: No,
	tableCell: Fo,
	tableRow: Po,
	text: Bo,
	thematicBreak: Vo,
	toml: Uo,
	yaml: Uo,
	definition: Uo,
	footnoteDefinition: Uo
};
function Uo() {}
//#endregion
//#region node_modules/@ungap/structured-clone/esm/deserialize.js
var { defineProperty: Wo } = Object, Go = typeof self == "object" ? self : globalThis, Ko = (e, t) => {
	switch (e) {
		case "Function":
		case "SharedWorker":
		case "Worker":
		case "eval":
		case "setInterval":
		case "setTimeout": throw TypeError("unable to deserialize " + e);
	}
	return new Go[e](t);
}, qo = (e, t) => {
	let n = (t, n) => (e.set(n, t), t), r = (i) => {
		if (e.has(i)) return e.get(i);
		let [a, o] = t[i];
		switch (a) {
			case 0:
			case -1: return n(o, i);
			case 1: {
				let e = n([], i);
				for (let t of o) e.push(r(t));
				return e;
			}
			case 2: {
				let e = n({}, i);
				for (let [t, n] of o) {
					let i = r(t), a = r(n);
					i === "__proto__" ? Wo(e, i, {
						value: a,
						configurable: !0,
						enumerable: !0,
						writable: !0
					}) : e[i] = a;
				}
				return e;
			}
			case 3: return n(new Date(o), i);
			case 4: {
				let { source: e, flags: t } = o;
				return n(new RegExp(e, t), i);
			}
			case 5: {
				let e = n(/* @__PURE__ */ new Map(), i);
				for (let [t, n] of o) e.set(r(t), r(n));
				return e;
			}
			case 6: {
				let e = n(/* @__PURE__ */ new Set(), i);
				for (let t of o) e.add(r(t));
				return e;
			}
			case 7: {
				let { name: e, message: t } = o;
				return n(typeof Go[e] == "function" ? Ko(e, t) : Error(t), i);
			}
			case 8: return n(BigInt(o), i);
			case "BigInt": return n(Object(BigInt(o)), i);
			case "ArrayBuffer": return n(new Uint8Array(o).buffer, o);
			case "DataView": {
				let { buffer: e } = new Uint8Array(o);
				return n(new DataView(e), o);
			}
			case "-0": return -0;
		}
		return n(Ko(a, o), i);
	};
	return r;
}, Jo = (e) => qo(/* @__PURE__ */ new Map(), e)(0), Yo = "", { toString: Xo } = {}, { keys: Zo, is: Qo } = Object, $o = (e) => {
	let t = typeof e;
	if (t !== "object" || !e) return [0, t];
	let n = Xo.call(e).slice(8, -1);
	switch (n) {
		case "Array": return [1, Yo];
		case "Object": return [2, Yo];
		case "Date": return [3, Yo];
		case "RegExp": return [4, Yo];
		case "Map": return [5, Yo];
		case "Set": return [6, Yo];
		case "DataView": return [1, n];
	}
	return n.includes("Array") ? [1, n] : e instanceof Error ? [7, e.name || "Error"] : [2, n];
}, es = ([e, t]) => e === 0 && (t === "function" || t === "symbol"), ts = (e, t, n, r) => {
	let i = (e, t) => {
		let i = r.push(e) - 1;
		return n.set(t, i), i;
	}, a = (o) => {
		if (n.has(o)) return n.get(o);
		let [s, c] = $o(o);
		switch (s) {
			case 0: {
				let t = o;
				switch (c) {
					case "bigint":
						s = 8, t = o.toString();
						break;
					case "number":
						if (!o && Qo(o, -0)) return r.push(["-0"]) - 1;
						break;
					case "function":
					case "symbol":
						if (e) throw TypeError("unable to serialize " + c);
						t = null;
						break;
					case "undefined": return i([-1], o);
				}
				return i([s, t], o);
			}
			case 1: {
				if (c) {
					let e = o;
					return c === "DataView" ? e = new Uint8Array(o.buffer) : c === "ArrayBuffer" && (e = new Uint8Array(o)), i([c, [...e]], o);
				}
				let e = [], t = i([s, e], o);
				for (let t of o) e.push(a(t));
				return t;
			}
			case 2: {
				if (c) switch (c) {
					case "BigInt": return i([c, o.toString()], o);
					case "Boolean":
					case "Number":
					case "String": return i([c, o.valueOf()], o);
				}
				if (t && "toJSON" in o) return a(o.toJSON());
				let n = [], r = i([s, n], o);
				for (let t of Zo(o)) (e || !es($o(o[t]))) && n.push([a(t), a(o[t])]);
				return r;
			}
			case 3: return i([s, isNaN(o.getTime()) ? Yo : o.toISOString()], o);
			case 4: {
				let { source: e, flags: t } = o;
				return i([s, {
					source: e,
					flags: t
				}], o);
			}
			case 5: {
				let t = [], n = i([s, t], o);
				for (let [n, r] of o) (e || !(es($o(n)) || es($o(r)))) && t.push([a(n), a(r)]);
				return n;
			}
			case 6: {
				let t = [], n = i([s, t], o);
				for (let n of o) (e || !es($o(n))) && t.push(a(n));
				return n;
			}
		}
		let { message: l } = o;
		return i([s, {
			name: c,
			message: l
		}], o);
	};
	return a;
}, ns = (e, { json: t, lossy: n } = {}) => {
	let r = [];
	return ts(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, rs = typeof structuredClone == "function" ? 
/* c8 ignore start */
(e, t) => t && ("json" in t || "lossy" in t) ? Jo(ns(e, t)) : structuredClone(e) : (e, t) => Jo(ns(e, t));
//#endregion
//#region node_modules/mdast-util-to-hast/lib/footer.js
function is(e, t) {
	let n = [{
		type: "text",
		value: "↩"
	}];
	return t > 1 && n.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(t)
		}]
	}), n;
}
function as(e, t) {
	return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function os(e) {
	let t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || is, r = e.options.footnoteBackLabel || as, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || { className: ["sr-only"] }, s = [], c = -1;
	for (; ++c < e.footnoteOrder.length;) {
		let i = e.footnoteById.get(e.footnoteOrder[c]);
		if (!i) continue;
		let a = e.all(i), o = String(i.identifier).toUpperCase(), l = Rr(o.toLowerCase()), u = 0, d = [], f = e.footnoteCounts.get(o);
		for (; f !== void 0 && ++u <= f;) {
			d.length > 0 && d.push({
				type: "text",
				value: " "
			});
			let e = typeof n == "string" ? n : n(c, u);
			typeof e == "string" && (e = {
				type: "text",
				value: e
			}), d.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + t + "fnref-" + l + (u > 1 ? "-" + u : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof r == "string" ? r : r(c, u),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(e) ? e : [e]
			});
		}
		let p = a[a.length - 1];
		if (p && p.type === "element" && p.tagName === "p") {
			let e = p.children[p.children.length - 1];
			e && e.type === "text" ? e.value += " " : p.children.push({
				type: "text",
				value: " "
			}), p.children.push(...d);
		} else a.push(...d);
		let m = {
			type: "element",
			tagName: "li",
			properties: { id: t + "fn-" + l },
			children: e.wrap(a, !0)
		};
		e.patch(i, m), s.push(m);
	}
	if (s.length !== 0) return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: !0,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: a,
				properties: {
					...rs(o),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: i
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: e.wrap(s, !0)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
//#endregion
//#region node_modules/unist-util-is/lib/index.js
var ss = (function(e) {
	if (e == null) return fs;
	if (typeof e == "function") return ds(e);
	if (typeof e == "object") return Array.isArray(e) ? cs(e) : ls(e);
	if (typeof e == "string") return us(e);
	throw Error("Expected function, string, or object as test");
});
function cs(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = ss(e[n]);
	return ds(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function ls(e) {
	let t = e;
	return ds(n);
	function n(n) {
		let r = n, i;
		for (i in e) if (r[i] !== t[i]) return !1;
		return !0;
	}
}
function us(e) {
	return ds(t);
	function t(t) {
		return t && t.type === e;
	}
}
function ds(e) {
	return t;
	function t(t, n, r) {
		return !!(ps(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function fs() {
	return !0;
}
function ps(e) {
	return typeof e == "object" && !!e && "type" in e;
}
//#endregion
//#region node_modules/unist-util-visit-parents/lib/color.js
function ms(e) {
	return e;
}
//#endregion
//#region node_modules/unist-util-visit-parents/lib/index.js
var hs = [], gs = "skip";
function _s(e, t, n, r) {
	let i;
	typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
	let a = ss(i), o = r ? -1 : 1;
	s(e, void 0, [])();
	function s(e, i, c) {
		let l = e && typeof e == "object" ? e : {};
		if (typeof l.type == "string") {
			let t = typeof l.tagName == "string" ? l.tagName : typeof l.name == "string" ? l.name : void 0;
			Object.defineProperty(u, "name", { value: "node (" + ms(e.type + (t ? "<" + t + ">" : "")) + ")" });
		}
		return u;
		function u() {
			let l = hs, u, d, f;
			if ((!t || a(e, i, c[c.length - 1] || void 0)) && (l = vs(n(e, c)), l[0] === !1)) return l;
			if ("children" in e && e.children) {
				let t = e;
				if (t.children && l[0] !== "skip") for (d = (r ? t.children.length : -1) + o, f = c.concat(t); d > -1 && d < t.children.length;) {
					let e = t.children[d];
					if (u = s(e, d, f)(), u[0] === !1) return u;
					d = typeof u[1] == "number" ? u[1] : d + o;
				}
			}
			return l;
		}
	}
}
function vs(e) {
	return Array.isArray(e) ? e : typeof e == "number" ? [!0, e] : e == null ? hs : [e];
}
//#endregion
//#region node_modules/unist-util-visit/lib/index.js
function ys(e, t, n, r) {
	let i, a, o;
	typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), _s(e, a, s, i);
	function s(e, t) {
		let n = t[t.length - 1], r = n ? n.children.indexOf(e) : void 0;
		return o(e, r, n);
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/state.js
var bs = {}.hasOwnProperty, xs = {};
function Ss(e, t) {
	let n = t || xs, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = {
		all: s,
		applyData: ws,
		definitionById: r,
		footnoteById: i,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...Ho,
			...n.handlers
		},
		one: o,
		options: n,
		patch: Cs,
		wrap: Es
	};
	return ys(e, function(e) {
		if (e.type === "definition" || e.type === "footnoteDefinition") {
			let t = e.type === "definition" ? r : i, n = String(e.identifier).toUpperCase();
			t.has(n) || t.set(n, e);
		}
	}), a;
	function o(e, t) {
		let n = e.type, r = a.handlers[n];
		if (bs.call(a.handlers, n) && r) return r(a, e, t);
		if (a.options.passThrough && a.options.passThrough.includes(n)) {
			if ("children" in e) {
				let { children: t, ...n } = e, r = rs(n);
				return r.children = a.all(e), r;
			}
			return rs(e);
		}
		return (a.options.unknownHandler || Ts)(a, e, t);
	}
	function s(e) {
		let t = [];
		if ("children" in e) {
			let n = e.children, r = -1;
			for (; ++r < n.length;) {
				let i = a.one(n[r], e);
				if (i) {
					if (r && n[r - 1].type === "break" && (!Array.isArray(i) && i.type === "text" && (i.value = Ds(i.value)), !Array.isArray(i) && i.type === "element")) {
						let e = i.children[0];
						e && e.type === "text" && (e.value = Ds(e.value));
					}
					Array.isArray(i) ? t.push(...i) : t.push(i);
				}
			}
		}
		return t;
	}
}
function Cs(e, t) {
	e.position && (t.position = An(e));
}
function ws(e, t) {
	let n = t;
	if (e && e.data) {
		let t = e.data.hName, r = e.data.hChildren, i = e.data.hProperties;
		typeof t == "string" && (n.type === "element" ? n.tagName = t : n = {
			type: "element",
			tagName: t,
			properties: {},
			children: "children" in n ? n.children : [n]
		}), n.type === "element" && i && Object.assign(n.properties, rs(i)), "children" in n && n.children && r != null && (n.children = r);
	}
	return n;
}
function Ts(e, t) {
	let n = t.data || {}, r = "value" in t && !(bs.call(n, "hProperties") || bs.call(n, "hChildren")) ? {
		type: "text",
		value: t.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
function Es(e, t) {
	let n = [], r = -1;
	for (t && n.push({
		type: "text",
		value: "\n"
	}); ++r < e.length;) r && n.push({
		type: "text",
		value: "\n"
	}), n.push(e[r]);
	return t && e.length > 0 && n.push({
		type: "text",
		value: "\n"
	}), n;
}
function Ds(e) {
	let t = 0, n = e.charCodeAt(t);
	for (; n === 9 || n === 32;) t++, n = e.charCodeAt(t);
	return e.slice(t);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/index.js
function Os(e, t) {
	let n = Ss(e, t), r = n.one(e, void 0), i = os(n), a = Array.isArray(r) ? {
		type: "root",
		children: r
	} : r || {
		type: "root",
		children: []
	};
	return i && ("children" in a, a.children.push({
		type: "text",
		value: "\n"
	}, i)), a;
}
//#endregion
//#region node_modules/remark-rehype/lib/index.js
function ks(e, t) {
	return e && "run" in e ? async function(n, r) {
		let i = Os(n, {
			file: r,
			...t
		});
		await e.run(i, r);
	} : function(n, r) {
		return Os(n, {
			file: r,
			...e || t
		});
	};
}
//#endregion
//#region node_modules/bail/index.js
function As(e) {
	if (e) throw e;
}
//#endregion
//#region node_modules/extend/index.js
var js = /* @__PURE__ */ o(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = function(e) {
		return typeof Array.isArray == "function" ? Array.isArray(e) : r.call(e) === "[object Array]";
	}, s = function(e) {
		if (!e || r.call(e) !== "[object Object]") return !1;
		var t = n.call(e, "constructor"), i = e.constructor && e.constructor.prototype && n.call(e.constructor.prototype, "isPrototypeOf");
		if (e.constructor && !t && !i) return !1;
		for (var a in e);
		return a === void 0 || n.call(e, a);
	}, c = function(e, t) {
		i && t.name === "__proto__" ? i(e, t.name, {
			enumerable: !0,
			configurable: !0,
			value: t.newValue,
			writable: !0
		}) : e[t.name] = t.newValue;
	}, l = function(e, t) {
		if (t === "__proto__") {
			if (!n.call(e, t)) return;
			if (a) return a(e, t).value;
		}
		return e[t];
	};
	t.exports = function e() {
		var t, n, r, i, a, u, d = arguments[0], f = 1, p = arguments.length, m = !1;
		for (typeof d == "boolean" && (m = d, d = arguments[1] || {}, f = 2), (d == null || typeof d != "object" && typeof d != "function") && (d = {}); f < p; ++f) if (t = arguments[f], t != null) for (n in t) r = l(d, n), i = l(t, n), d !== i && (m && i && (s(i) || (a = o(i))) ? (a ? (a = !1, u = r && o(r) ? r : []) : u = r && s(r) ? r : {}, c(d, {
			name: n,
			newValue: e(m, u, i)
		})) : i !== void 0 && c(d, {
			name: n,
			newValue: i
		}));
		return d;
	};
}));
//#endregion
//#region node_modules/is-plain-obj/index.js
function Ms(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
//#endregion
//#region node_modules/trough/lib/index.js
function Ns() {
	let e = [], t = {
		run: n,
		use: r
	};
	return t;
	function n(...t) {
		let n = -1, r = t.pop();
		if (typeof r != "function") throw TypeError("Expected function as last argument, not " + r);
		i(null, ...t);
		function i(a, ...o) {
			let s = e[++n], c = -1;
			if (a) {
				r(a);
				return;
			}
			for (; ++c < t.length;) (o[c] === null || o[c] === void 0) && (o[c] = t[c]);
			t = o, s ? Ps(s, i)(...o) : r(null, ...o);
		}
	}
	function r(n) {
		if (typeof n != "function") throw TypeError("Expected `middelware` to be a function, not " + n);
		return e.push(n), t;
	}
}
function Ps(e, t) {
	let n;
	return r;
	function r(...t) {
		let r = e.length > t.length, o;
		r && t.push(i);
		try {
			o = e.apply(this, t);
		} catch (e) {
			let t = e;
			if (r && n) throw t;
			return i(t);
		}
		r || (o && o.then && typeof o.then == "function" ? o.then(a, i) : o instanceof Error ? i(o) : a(o));
	}
	function i(e, ...r) {
		n || (n = !0, t(e, ...r));
	}
	function a(e) {
		i(null, e);
	}
}
//#endregion
//#region node_modules/vfile/lib/minpath.browser.js
var Fs = {
	basename: Is,
	dirname: Ls,
	extname: Rs,
	join: zs,
	sep: "/"
};
function Is(e, t) {
	if (t !== void 0 && typeof t != "string") throw TypeError("\"ext\" argument must be a string");
	Hs(e);
	let n = 0, r = -1, i = e.length, a;
	if (t === void 0 || t.length === 0 || t.length > e.length) {
		for (; i--;) if (e.codePointAt(i) === 47) {
			if (a) {
				n = i + 1;
				break;
			}
		} else r < 0 && (a = !0, r = i + 1);
		return r < 0 ? "" : e.slice(n, r);
	}
	if (t === e) return "";
	let o = -1, s = t.length - 1;
	for (; i--;) if (e.codePointAt(i) === 47) {
		if (a) {
			n = i + 1;
			break;
		}
	} else o < 0 && (a = !0, o = i + 1), s > -1 && (e.codePointAt(i) === t.codePointAt(s--) ? s < 0 && (r = i) : (s = -1, r = o));
	return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function Ls(e) {
	if (Hs(e), e.length === 0) return ".";
	let t = -1, n = e.length, r;
	for (; --n;) if (e.codePointAt(n) === 47) {
		if (r) {
			t = n;
			break;
		}
	} else r ||= !0;
	return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function Rs(e) {
	Hs(e);
	let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
	for (; t--;) {
		let s = e.codePointAt(t);
		if (s === 47) {
			if (o) {
				r = t + 1;
				break;
			}
			continue;
		}
		n < 0 && (o = !0, n = t + 1), s === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
	}
	return i < 0 || n < 0 || a === 0 || a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function zs(...e) {
	let t = -1, n;
	for (; ++t < e.length;) Hs(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
	return n === void 0 ? "." : Bs(n);
}
function Bs(e) {
	Hs(e);
	let t = e.codePointAt(0) === 47, n = Vs(e, !t);
	return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Vs(e, t) {
	let n = "", r = 0, i = -1, a = 0, o = -1, s, c;
	for (; ++o <= e.length;) {
		if (o < e.length) s = e.codePointAt(o);
		else if (s === 47) break;
		else s = 47;
		if (s === 47) {
			if (i !== o - 1 && a !== 1) {
				if (i !== o - 1 && a === 2) {
					if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
						if (n.length > 2) {
							if (c = n.lastIndexOf("/"), c !== n.length - 1) {
								c < 0 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
								continue;
							}
						} else if (n.length > 0) {
							n = "", r = 0, i = o, a = 0;
							continue;
						}
					}
					t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
				} else n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
			}
			i = o, a = 0;
		} else s === 46 && a > -1 ? a++ : a = -1;
	}
	return n;
}
function Hs(e) {
	if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
}
//#endregion
//#region node_modules/vfile/lib/minproc.browser.js
var Us = { cwd: Ws };
function Ws() {
	return "/";
}
//#endregion
//#region node_modules/vfile/lib/minurl.shared.js
function Gs(e) {
	return !!(typeof e == "object" && e && "href" in e && e.href && "protocol" in e && e.protocol && e.auth === void 0);
}
//#endregion
//#region node_modules/vfile/lib/minurl.browser.js
function Ks(e) {
	if (typeof e == "string") e = new URL(e);
	else if (!Gs(e)) {
		let t = /* @__PURE__ */ TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + e + "`");
		throw t.code = "ERR_INVALID_ARG_TYPE", t;
	}
	if (e.protocol !== "file:") {
		let e = /* @__PURE__ */ TypeError("The URL must be of scheme file");
		throw e.code = "ERR_INVALID_URL_SCHEME", e;
	}
	return qs(e);
}
function qs(e) {
	if (e.hostname !== "") {
		let e = /* @__PURE__ */ TypeError("File URL host must be \"localhost\" or empty on darwin");
		throw e.code = "ERR_INVALID_FILE_URL_HOST", e;
	}
	let t = e.pathname, n = -1;
	for (; ++n < t.length;) if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
		let e = t.codePointAt(n + 2);
		if (e === 70 || e === 102) {
			let e = /* @__PURE__ */ TypeError("File URL path must not include encoded / characters");
			throw e.code = "ERR_INVALID_FILE_URL_PATH", e;
		}
	}
	return decodeURIComponent(t);
}
//#endregion
//#region node_modules/vfile/lib/index.js
var Js = [
	"history",
	"path",
	"basename",
	"stem",
	"extname",
	"dirname"
], Ys = class {
	constructor(e) {
		let t;
		t = e ? Gs(e) ? { path: e } : typeof e == "string" || $s(e) ? { value: e } : e : {}, this.cwd = "cwd" in t ? "" : Us.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
		let n = -1;
		for (; ++n < Js.length;) {
			let e = Js[n];
			e in t && t[e] !== void 0 && t[e] !== null && (this[e] = e === "history" ? [...t[e]] : t[e]);
		}
		let r;
		for (r in t) Js.includes(r) || (this[r] = t[r]);
	}
	get basename() {
		return typeof this.path == "string" ? Fs.basename(this.path) : void 0;
	}
	set basename(e) {
		Zs(e, "basename"), Xs(e, "basename"), this.path = Fs.join(this.dirname || "", e);
	}
	get dirname() {
		return typeof this.path == "string" ? Fs.dirname(this.path) : void 0;
	}
	set dirname(e) {
		Qs(this.basename, "dirname"), this.path = Fs.join(e || "", this.basename);
	}
	get extname() {
		return typeof this.path == "string" ? Fs.extname(this.path) : void 0;
	}
	set extname(e) {
		if (Xs(e, "extname"), Qs(this.dirname, "extname"), e) {
			if (e.codePointAt(0) !== 46) throw Error("`extname` must start with `.`");
			if (e.includes(".", 1)) throw Error("`extname` cannot contain multiple dots");
		}
		this.path = Fs.join(this.dirname, this.stem + (e || ""));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(e) {
		Gs(e) && (e = Ks(e)), Zs(e, "path"), this.path !== e && this.history.push(e);
	}
	get stem() {
		return typeof this.path == "string" ? Fs.basename(this.path, this.extname) : void 0;
	}
	set stem(e) {
		Zs(e, "stem"), Xs(e, "stem"), this.path = Fs.join(this.dirname || "", e + (this.extname || ""));
	}
	fail(e, t, n) {
		let r = this.message(e, t, n);
		throw r.fatal = !0, r;
	}
	info(e, t, n) {
		let r = this.message(e, t, n);
		return r.fatal = void 0, r;
	}
	message(e, t, n) {
		let r = new Fn(e, t, n);
		return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
	}
	toString(e) {
		return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
	}
};
function Xs(e, t) {
	if (e && e.includes(Fs.sep)) throw Error("`" + t + "` cannot be a path: did not expect `" + Fs.sep + "`");
}
function Zs(e, t) {
	if (!e) throw Error("`" + t + "` cannot be empty");
}
function Qs(e, t) {
	if (!e) throw Error("Setting `" + t + "` requires `path` to be set too");
}
function $s(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
//#endregion
//#region node_modules/unified/lib/callable-instance.js
var ec = (function(e) {
	let t = this.constructor.prototype, n = t[e], r = function() {
		return n.apply(r, arguments);
	};
	return Object.setPrototypeOf(r, t), r;
}), tc = /* @__PURE__ */ l(js(), 1), nc = {}.hasOwnProperty, rc = new class e extends ec {
	constructor() {
		super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Ns();
	}
	copy() {
		let t = new e(), n = -1;
		for (; ++n < this.attachers.length;) {
			let e = this.attachers[n];
			t.use(...e);
		}
		return t.data((0, tc.default)(!0, {}, this.namespace)), t;
	}
	data(e, t) {
		return typeof e == "string" ? arguments.length === 2 ? (oc("data", this.frozen), this.namespace[e] = t, this) : nc.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (oc("data", this.frozen), this.namespace = e, this) : this.namespace;
	}
	freeze() {
		if (this.frozen) return this;
		let e = this;
		for (; ++this.freezeIndex < this.attachers.length;) {
			let [t, ...n] = this.attachers[this.freezeIndex];
			if (n[0] === !1) continue;
			n[0] === !0 && (n[0] = void 0);
			let r = t.call(e, ...n);
			typeof r == "function" && this.transformers.use(r);
		}
		return this.frozen = !0, this.freezeIndex = Infinity, this;
	}
	parse(e) {
		this.freeze();
		let t = lc(e), n = this.parser || this.Parser;
		return ic("parse", n), n(String(t), t);
	}
	process(e, t) {
		let n = this;
		return this.freeze(), ic("process", this.parser || this.Parser), ac("process", this.compiler || this.Compiler), t ? r(void 0, t) : new Promise(r);
		function r(r, i) {
			let a = lc(e), o = n.parse(a);
			n.run(o, a, function(e, t, r) {
				if (e || !t || !r) return s(e);
				let i = t, a = n.stringify(i, r);
				dc(a) ? r.value = a : r.result = a, s(e, r);
			});
			function s(e, n) {
				e || !n ? i(e) : r ? r(n) : t(void 0, n);
			}
		}
	}
	processSync(e) {
		let t = !1, n;
		return this.freeze(), ic("processSync", this.parser || this.Parser), ac("processSync", this.compiler || this.Compiler), this.process(e, r), cc("processSync", "process", t), n;
		function r(e, r) {
			t = !0, As(e), n = r;
		}
	}
	run(e, t, n) {
		sc(e), this.freeze();
		let r = this.transformers;
		return !n && typeof t == "function" && (n = t, t = void 0), n ? i(void 0, n) : new Promise(i);
		function i(i, a) {
			let o = lc(t);
			r.run(e, o, s);
			function s(t, r, o) {
				let s = r || e;
				t ? a(t) : i ? i(s) : n(void 0, s, o);
			}
		}
	}
	runSync(e, t) {
		let n = !1, r;
		return this.run(e, t, i), cc("runSync", "run", n), r;
		function i(e, t) {
			As(e), r = t, n = !0;
		}
	}
	stringify(e, t) {
		this.freeze();
		let n = lc(t), r = this.compiler || this.Compiler;
		return ac("stringify", r), sc(e), r(e, n);
	}
	use(e, ...t) {
		let n = this.attachers, r = this.namespace;
		if (oc("use", this.frozen), e != null) {
			if (typeof e == "function") s(e, t);
			else if (typeof e == "object") Array.isArray(e) ? o(e) : a(e);
			else throw TypeError("Expected usable value, not `" + e + "`");
		}
		return this;
		function i(e) {
			if (typeof e == "function") s(e, []);
			else if (typeof e == "object") {
				if (Array.isArray(e)) {
					let [t, ...n] = e;
					s(t, n);
				} else a(e);
			} else throw TypeError("Expected usable value, not `" + e + "`");
		}
		function a(e) {
			if (!("plugins" in e) && !("settings" in e)) throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			o(e.plugins), e.settings && (r.settings = (0, tc.default)(!0, r.settings, e.settings));
		}
		function o(e) {
			let t = -1;
			if (e != null) {
				if (Array.isArray(e)) for (; ++t < e.length;) {
					let n = e[t];
					i(n);
				}
				else throw TypeError("Expected a list of plugins, not `" + e + "`");
			}
		}
		function s(e, t) {
			let r = -1, i = -1;
			for (; ++r < n.length;) if (n[r][0] === e) {
				i = r;
				break;
			}
			if (i === -1) n.push([e, ...t]);
			else if (t.length > 0) {
				let [r, ...a] = t, o = n[i][1];
				Ms(o) && Ms(r) && (r = (0, tc.default)(!0, o, r)), n[i] = [
					e,
					r,
					...a
				];
			}
		}
	}
}().freeze();
function ic(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `parser`");
}
function ac(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `compiler`");
}
function oc(e, t) {
	if (t) throw Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function sc(e) {
	if (!Ms(e) || typeof e.type != "string") throw TypeError("Expected node, got `" + e + "`");
}
function cc(e, t, n) {
	if (!n) throw Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function lc(e) {
	return uc(e) ? e : new Ys(e);
}
function uc(e) {
	return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function dc(e) {
	return typeof e == "string" || fc(e);
}
function fc(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
//#endregion
//#region node_modules/react-markdown/lib/index.js
var pc = [], mc = { allowDangerousHtml: !0 }, hc = /^(https?|ircs?|mailto|xmpp)$/i, gc = [
	{
		from: "astPlugins",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowDangerousHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowNode",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowElement"
	},
	{
		from: "allowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowedElements"
	},
	{
		from: "className",
		id: "remove-classname"
	},
	{
		from: "disallowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "disallowedElements"
	},
	{
		from: "escapeHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "includeElementIndex",
		id: "#remove-includeelementindex"
	},
	{
		from: "includeNodeIndex",
		id: "change-includenodeindex-to-includeelementindex"
	},
	{
		from: "linkTarget",
		id: "remove-linktarget"
	},
	{
		from: "plugins",
		id: "change-plugins-to-remarkplugins",
		to: "remarkPlugins"
	},
	{
		from: "rawSourcePos",
		id: "#remove-rawsourcepos"
	},
	{
		from: "renderers",
		id: "change-renderers-to-components",
		to: "components"
	},
	{
		from: "source",
		id: "change-source-to-children",
		to: "children"
	},
	{
		from: "sourcePos",
		id: "#remove-sourcepos"
	},
	{
		from: "transformImageUri",
		id: "#add-urltransform",
		to: "urlTransform"
	},
	{
		from: "transformLinkUri",
		id: "#add-urltransform",
		to: "urlTransform"
	}
];
function _c(e) {
	let t = vc(e), n = yc(e);
	return bc(t.runSync(t.parse(n), n), e);
}
function vc(e) {
	let t = e.rehypePlugins || pc, n = e.remarkPlugins || pc, r = e.remarkRehypeOptions ? {
		...e.remarkRehypeOptions,
		...mc
	} : mc;
	return rc().use(uo).use(n).use(ks, r).use(t);
}
function yc(e) {
	let t = e.children || "", n = new Ys();
	return typeof t == "string" ? n.value = t : "" + t, n;
}
function bc(e, t) {
	let n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, c = t.urlTransform || xc;
	for (let e of gc) Object.hasOwn(t, e.from) && "" + e.from + (e.to ? "use `" + e.to + "` instead" : "remove it") + e.id;
	return ys(e, l), Un(e, {
		Fragment: C.Fragment,
		components: i,
		ignoreInvalidStyle: !0,
		jsx: C.jsx,
		jsxs: C.jsxs,
		passKeys: !0,
		passNode: !0
	});
	function l(e, t, i) {
		if (e.type === "raw" && i && typeof t == "number") return o ? i.children.splice(t, 1) : i.children[t] = {
			type: "text",
			value: e.value
		}, t;
		if (e.type === "element") {
			let t;
			for (t in dr) if (Object.hasOwn(dr, t) && Object.hasOwn(e.properties, t)) {
				let n = e.properties[t], r = dr[t];
				(r === null || r.includes(e.tagName)) && (e.properties[t] = c(String(n || ""), t, e));
			}
		}
		if (e.type === "element") {
			let o = n ? !n.includes(e.tagName) : a ? a.includes(e.tagName) : !1;
			if (!o && r && typeof t == "number" && (o = !r(e, t, i)), o && i && typeof t == "number") return s && e.children ? i.children.splice(t, 1, ...e.children) : i.children.splice(t, 1), t;
		}
	}
}
function xc(e) {
	let t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
	return t === -1 || i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || hc.test(e.slice(0, t)) ? e : "";
}
//#endregion
//#region node_modules/ccount/index.js
function Sc(e, t) {
	let n = String(e);
	if (typeof t != "string") throw TypeError("Expected character");
	let r = 0, i = n.indexOf(t);
	for (; i !== -1;) r++, i = n.indexOf(t, i + t.length);
	return r;
}
//#endregion
//#region node_modules/escape-string-regexp/index.js
function Cc(e) {
	if (typeof e != "string") throw TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
//#endregion
//#region node_modules/mdast-util-find-and-replace/lib/index.js
function wc(e, t, n) {
	let r = ss((n || {}).ignore || []), i = Tc(t), a = -1;
	for (; ++a < i.length;) _s(e, "text", o);
	function o(e, t) {
		let n = -1, i;
		for (; ++n < t.length;) {
			let e = t[n], a = i ? i.children : void 0;
			if (r(e, a ? a.indexOf(e) : void 0, i)) return;
			i = e;
		}
		if (i) return s(e, t);
	}
	function s(e, t) {
		let n = t[t.length - 1], r = i[a][0], o = i[a][1], s = 0, c = n.children.indexOf(e), l = !1, u = [];
		r.lastIndex = 0;
		let d = r.exec(e.value);
		for (; d;) {
			let n = d.index, i = {
				index: d.index,
				input: d.input,
				stack: [...t, e]
			}, a = o(...d, i);
			if (typeof a == "string" && (a = a.length > 0 ? {
				type: "text",
				value: a
			} : void 0), a === !1 ? r.lastIndex = n + 1 : (s !== n && u.push({
				type: "text",
				value: e.value.slice(s, n)
			}), Array.isArray(a) ? u.push(...a) : a && u.push(a), s = n + d[0].length, l = !0), !r.global) break;
			d = r.exec(e.value);
		}
		return l ? (s < e.value.length && u.push({
			type: "text",
			value: e.value.slice(s)
		}), n.children.splice(c, 1, ...u)) : u = [e], c + u.length;
	}
}
function Tc(e) {
	let t = [];
	if (!Array.isArray(e)) throw TypeError("Expected find and replace tuple or list of tuples");
	let n = !e[0] || Array.isArray(e[0]) ? e : [e], r = -1;
	for (; ++r < n.length;) {
		let e = n[r];
		t.push([Ec(e[0]), Dc(e[1])]);
	}
	return t;
}
function Ec(e) {
	return typeof e == "string" ? new RegExp(Cc(e), "g") : e;
}
function Dc(e) {
	return typeof e == "function" ? e : function() {
		return e;
	};
}
//#endregion
//#region node_modules/mdast-util-gfm-autolink-literal/lib/index.js
var Oc = "phrasing", F = [
	"autolink",
	"link",
	"image",
	"label"
];
function kc() {
	return {
		transforms: [Lc],
		enter: {
			literalAutolink: jc,
			literalAutolinkEmail: Mc,
			literalAutolinkHttp: Mc,
			literalAutolinkWww: Mc
		},
		exit: {
			literalAutolink: Ic,
			literalAutolinkEmail: Fc,
			literalAutolinkHttp: Nc,
			literalAutolinkWww: Pc
		}
	};
}
function Ac() {
	return { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct: Oc,
			notInConstruct: F
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct: Oc,
			notInConstruct: F
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct: Oc,
			notInConstruct: F
		}
	] };
}
function jc(e) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, e);
}
function Mc(e) {
	this.config.enter.autolinkProtocol.call(this, e);
}
function Nc(e) {
	this.config.exit.autolinkProtocol.call(this, e);
}
function Pc(e) {
	this.config.exit.data.call(this, e);
	let t = this.stack[this.stack.length - 1];
	t.type, t.url = "http://" + this.sliceSerialize(e);
}
function Fc(e) {
	this.config.exit.autolinkEmail.call(this, e);
}
function Ic(e) {
	this.exit(e);
}
function Lc(e) {
	wc(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Rc], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, zc]], { ignore: ["link", "linkReference"] });
}
function Rc(e, t, n, r, i) {
	let a = "";
	if (!Hc(i) || (/^w/i.test(t) && (n = t + n, t = "", a = "http://"), !Bc(n))) return !1;
	let o = Vc(n + r);
	if (!o[0]) return !1;
	let s = {
		type: "link",
		title: null,
		url: a + t + o[0],
		children: [{
			type: "text",
			value: t + o[0]
		}]
	};
	return o[1] ? [s, {
		type: "text",
		value: o[1]
	}] : s;
}
function zc(e, t, n, r) {
	return !Hc(r, !0) || /[-\d_]$/.test(n) ? !1 : {
		type: "link",
		title: null,
		url: "mailto:" + t + "@" + n,
		children: [{
			type: "text",
			value: t + "@" + n
		}]
	};
}
function Bc(e) {
	let t = e.split(".");
	return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function Vc(e) {
	let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
	if (!t) return [e, void 0];
	e = e.slice(0, t.index);
	let n = t[0], r = n.indexOf(")"), i = Sc(e, "("), a = Sc(e, ")");
	for (; r !== -1 && i > a;) e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), a++;
	return [e, n];
}
function Hc(e, t) {
	let n = e.input.charCodeAt(e.index - 1);
	return (e.index === 0 || Ir(n) || Fr(n)) && (!t || n !== 47);
}
//#endregion
//#region node_modules/mdast-util-gfm-footnote/lib/index.js
Qc.peek = Zc;
function Uc() {
	this.buffer();
}
function Wc(e) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, e);
}
function Gc() {
	this.buffer();
}
function Kc(e) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, e);
}
function qc(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = Er(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function Jc(e) {
	this.exit(e);
}
function Yc(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = Er(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function Xc(e) {
	this.exit(e);
}
function Zc() {
	return "[";
}
function Qc(e, t, n, r) {
	let i = n.createTracker(r), a = i.move("[^"), o = n.enter("footnoteReference"), s = n.enter("reference");
	return a += i.move(n.safe(n.associationId(e), {
		after: "]",
		before: a
	})), s(), o(), a += i.move("]"), a;
}
function $c() {
	return {
		enter: {
			gfmFootnoteCallString: Uc,
			gfmFootnoteCall: Wc,
			gfmFootnoteDefinitionLabelString: Gc,
			gfmFootnoteDefinition: Kc
		},
		exit: {
			gfmFootnoteCallString: qc,
			gfmFootnoteCall: Jc,
			gfmFootnoteDefinitionLabelString: Yc,
			gfmFootnoteDefinition: Xc
		}
	};
}
function el(e) {
	let t = !1;
	return e && e.firstLineBlank && (t = !0), {
		handlers: {
			footnoteDefinition: n,
			footnoteReference: Qc
		},
		unsafe: [{
			character: "[",
			inConstruct: [
				"label",
				"phrasing",
				"reference"
			]
		}]
	};
	function n(e, n, r, i) {
		let a = r.createTracker(i), o = a.move("[^"), s = r.enter("footnoteDefinition"), c = r.enter("label");
		return o += a.move(r.safe(r.associationId(e), {
			before: o,
			after: "]"
		})), c(), o += a.move("]:"), e.children && e.children.length > 0 && (a.shift(4), o += a.move((t ? "\n" : " ") + r.indentLines(r.containerFlow(e, a.current()), t ? nl : tl))), s(), o;
	}
}
function tl(e, t, n) {
	return t === 0 ? e : nl(e, t, n);
}
function nl(e, t, n) {
	return (n ? "" : "    ") + e;
}
//#endregion
//#region node_modules/mdast-util-gfm-strikethrough/lib/index.js
var rl = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
cl.peek = ll;
function il() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: ol },
		exit: { strikethrough: sl }
	};
}
function al() {
	return {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: rl
		}],
		handlers: { delete: cl }
	};
}
function ol(e) {
	this.enter({
		type: "delete",
		children: []
	}, e);
}
function sl(e) {
	this.exit(e);
}
function cl(e, t, n, r) {
	let i = n.createTracker(r), a = n.enter("strikethrough"), o = i.move("~~");
	return o += n.containerPhrasing(e, {
		...i.current(),
		before: o,
		after: "~"
	}), o += i.move("~~"), a(), o;
}
function ll() {
	return "~";
}
//#endregion
//#region node_modules/markdown-table/index.js
function ul(e) {
	return e.length;
}
function dl(e, t) {
	let n = t || {}, r = (n.align || []).concat(), i = n.stringLength || ul, a = [], o = [], s = [], c = [], l = 0, u = -1;
	for (; ++u < e.length;) {
		let t = [], r = [], a = -1;
		for (e[u].length > l && (l = e[u].length); ++a < e[u].length;) {
			let o = fl(e[u][a]);
			if (n.alignDelimiters !== !1) {
				let e = i(o);
				r[a] = e, (c[a] === void 0 || e > c[a]) && (c[a] = e);
			}
			t.push(o);
		}
		o[u] = t, s[u] = r;
	}
	let d = -1;
	if (typeof r == "object" && "length" in r) for (; ++d < l;) a[d] = pl(r[d]);
	else {
		let e = pl(r);
		for (; ++d < l;) a[d] = e;
	}
	d = -1;
	let f = [], p = [];
	for (; ++d < l;) {
		let e = a[d], t = "", r = "";
		e === 99 ? (t = ":", r = ":") : e === 108 ? t = ":" : e === 114 && (r = ":");
		let i = n.alignDelimiters === !1 ? 1 : Math.max(1, c[d] - t.length - r.length), o = t + "-".repeat(i) + r;
		n.alignDelimiters !== !1 && (i = t.length + i + r.length, i > c[d] && (c[d] = i), p[d] = i), f[d] = o;
	}
	o.splice(1, 0, f), s.splice(1, 0, p), u = -1;
	let m = [];
	for (; ++u < o.length;) {
		let e = o[u], t = s[u];
		d = -1;
		let r = [];
		for (; ++d < l;) {
			let i = e[d] || "", o = "", s = "";
			if (n.alignDelimiters !== !1) {
				let e = c[d] - (t[d] || 0), n = a[d];
				n === 114 ? o = " ".repeat(e) : n === 99 ? e % 2 ? (o = " ".repeat(e / 2 + .5), s = " ".repeat(e / 2 - .5)) : (o = " ".repeat(e / 2), s = o) : s = " ".repeat(e);
			}
			n.delimiterStart !== !1 && !d && r.push("|"), n.padding !== !1 && (n.alignDelimiters !== !1 || i !== "") && (n.delimiterStart !== !1 || d) && r.push(" "), n.alignDelimiters !== !1 && r.push(o), r.push(i), n.alignDelimiters !== !1 && r.push(s), n.padding !== !1 && r.push(" "), (n.delimiterEnd !== !1 || d !== l - 1) && r.push("|");
		}
		m.push(n.delimiterEnd === !1 ? r.join("").replace(/ +$/, "") : r.join(""));
	}
	return m.join("\n");
}
function fl(e) {
	return e == null ? "" : String(e);
}
function pl(e) {
	let t = typeof e == "string" ? e.codePointAt(0) : 0;
	return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
function ml(e, t, n, r) {
	let i = n.enter("blockquote"), a = n.createTracker(r);
	a.move("> "), a.shift(2);
	let o = n.indentLines(n.containerFlow(e, a.current()), hl);
	return i(), o;
}
function hl(e, t, n) {
	return ">" + (n ? "" : " ") + e;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function gl(e, t) {
	return _l(e, t.inConstruct, !0) && !_l(e, t.notInConstruct, !1);
}
function _l(e, t, n) {
	if (typeof t == "string" && (t = [t]), !t || t.length === 0) return n;
	let r = -1;
	for (; ++r < t.length;) if (e.includes(t[r])) return !0;
	return !1;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/break.js
function vl(e, t, n, r) {
	let i = -1;
	for (; ++i < n.unsafe.length;) if (n.unsafe[i].character === "\n" && gl(n.stack, n.unsafe[i])) return /[ \t]/.test(r.before) ? "" : " ";
	return "\\\n";
}
//#endregion
//#region node_modules/longest-streak/index.js
function yl(e, t) {
	let n = String(e), r = n.indexOf(t), i = r, a = 0, o = 0;
	if (typeof t != "string") throw TypeError("Expected substring");
	for (; r !== -1;) r === i ? ++a > o && (o = a) : a = 1, i = r + t.length, r = n.indexOf(t, i);
	return o;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
function bl(e, t) {
	return !(t.options.fences !== !1 || !e.value || e.lang || !/[^ \r\n]/.test(e.value) || /^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-fence.js
function xl(e) {
	let t = e.options.fence || "`";
	if (t !== "`" && t !== "~") throw Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/code.js
function Sl(e, t, n, r) {
	let i = xl(n), a = e.value || "", o = i === "`" ? "GraveAccent" : "Tilde";
	if (bl(e, n)) {
		let e = n.enter("codeIndented"), t = n.indentLines(a, Cl);
		return e(), t;
	}
	let s = n.createTracker(r), c = i.repeat(Math.max(yl(a, i) + 1, 3)), l = n.enter("codeFenced"), u = s.move(c);
	if (e.lang) {
		let t = n.enter(`codeFencedLang${o}`);
		u += s.move(n.safe(e.lang, {
			before: u,
			after: " ",
			encode: ["`"],
			...s.current()
		})), t();
	}
	if (e.lang && e.meta) {
		let t = n.enter(`codeFencedMeta${o}`);
		u += s.move(" "), u += s.move(n.safe(e.meta, {
			before: u,
			after: "\n",
			encode: ["`"],
			...s.current()
		})), t();
	}
	return u += s.move("\n"), a && (u += s.move(a + "\n")), u += s.move(c), l(), u;
}
function Cl(e, t, n) {
	return (n ? "" : "    ") + e;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-quote.js
function wl(e) {
	let t = e.options.quote || "\"";
	if (t !== "\"" && t !== "'") throw Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/definition.js
function Tl(e, t, n, r) {
	let i = wl(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("definition"), s = n.enter("label"), c = n.createTracker(r), l = c.move("[");
	return l += c.move(n.safe(n.associationId(e), {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]: "), s(), !e.url || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : "\n",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), o(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
function El(e) {
	let t = e.options.emphasis || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
function Dl(e) {
	return "&#x" + e.toString(16).toUpperCase() + ";";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/encode-info.js
function Ol(e, t, n) {
	let r = Gr(e), i = Gr(t);
	return r === void 0 ? i === void 0 ? n === "_" ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !0
	} : r === 1 ? i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !1
	} : {
		inside: !1,
		outside: !1
	};
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
kl.peek = Al;
function kl(e, t, n, r) {
	let i = El(n), a = n.enter("emphasis"), o = n.createTracker(r), s = o.move(i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = Ol(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = Dl(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = Ol(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + Dl(d));
	let p = o.move(i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function Al(e, t, n) {
	return n.options.emphasis || "*";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
function jl(e, t) {
	let n = !1;
	return ys(e, function(e) {
		if ("value" in e && /\r?\n|\r/.test(e.value) || e.type === "break") return n = !0, !1;
	}), !!((!e.depth || e.depth < 3) && pr(e) && (t.options.setext || n));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/heading.js
function Ml(e, t, n, r) {
	let i = Math.max(Math.min(6, e.depth || 1), 1), a = n.createTracker(r);
	if (jl(e, n)) {
		let t = n.enter("headingSetext"), r = n.enter("phrasing"), o = n.containerPhrasing(e, {
			...a.current(),
			before: "\n",
			after: "\n"
		});
		return r(), t(), o + "\n" + (i === 1 ? "=" : "-").repeat(o.length - (Math.max(o.lastIndexOf("\r"), o.lastIndexOf("\n")) + 1));
	}
	let o = "#".repeat(i), s = n.enter("headingAtx"), c = n.enter("phrasing");
	a.move(o + " ");
	let l = n.containerPhrasing(e, {
		before: "# ",
		after: "\n",
		...a.current()
	});
	return /^[\t ]/.test(l) && (l = Dl(l.charCodeAt(0)) + l.slice(1)), l = l ? o + " " + l : o, n.options.closeAtx && (l += " " + o), c(), s(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/html.js
Nl.peek = Pl;
function Nl(e) {
	return e.value || "";
}
function Pl() {
	return "<";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/image.js
Fl.peek = Il;
function Fl(e, t, n, r) {
	let i = wl(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("image"), s = n.enter("label"), c = n.createTracker(r), l = c.move("![");
	return l += c.move(n.safe(e.alt, {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]("), s(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), l += c.move(")"), o(), l;
}
function Il() {
	return "!";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
Ll.peek = Rl;
function Ll(e, t, n, r) {
	let i = e.referenceType, a = n.enter("imageReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("!["), l = n.safe(e.alt, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = [], o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function Rl() {
	return "!";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
zl.peek = Bl;
function zl(e, t, n) {
	let r = e.value || "", i = "`", a = -1;
	for (; RegExp("(^|[^`])" + i + "([^`]|$)").test(r);) i += "`";
	for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++a < n.unsafe.length;) {
		let e = n.unsafe[a], t = n.compilePattern(e), i;
		if (e.atBreak) for (; i = t.exec(r);) {
			let e = i.index;
			r.charCodeAt(e) === 10 && r.charCodeAt(e - 1) === 13 && e--, r = r.slice(0, e) + " " + r.slice(i.index + 1);
		}
	}
	return i + r + i;
}
function Bl() {
	return "`";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
function Vl(e, t) {
	let n = pr(e);
	return !(t.options.resourceLink || !e.url || e.title || !e.children || e.children.length !== 1 || e.children[0].type !== "text" || n !== e.url && "mailto:" + n !== e.url || !/^[a-z][a-z+.-]+:/i.test(e.url) || /[\0- <>\u007F]/.test(e.url));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/link.js
Hl.peek = Ul;
function Hl(e, t, n, r) {
	let i = wl(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.createTracker(r), s, c;
	if (Vl(e, n)) {
		let t = n.stack;
		n.stack = [], s = n.enter("autolink");
		let r = o.move("<");
		return r += o.move(n.containerPhrasing(e, {
			before: r,
			after: ">",
			...o.current()
		})), r += o.move(">"), s(), n.stack = t, r;
	}
	s = n.enter("link"), c = n.enter("label");
	let l = o.move("[");
	return l += o.move(n.containerPhrasing(e, {
		before: l,
		after: "](",
		...o.current()
	})), l += o.move("]("), c(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (c = n.enter("destinationLiteral"), l += o.move("<"), l += o.move(n.safe(e.url, {
		before: l,
		after: ">",
		...o.current()
	})), l += o.move(">")) : (c = n.enter("destinationRaw"), l += o.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...o.current()
	}))), c(), e.title && (c = n.enter(`title${a}`), l += o.move(" " + i), l += o.move(n.safe(e.title, {
		before: l,
		after: i,
		...o.current()
	})), l += o.move(i), c()), l += o.move(")"), s(), l;
}
function Ul(e, t, n) {
	return Vl(e, n) ? "<" : "[";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
Wl.peek = Gl;
function Wl(e, t, n, r) {
	let i = e.referenceType, a = n.enter("linkReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("["), l = n.containerPhrasing(e, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = [], o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function Gl() {
	return "[";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function Kl(e) {
	let t = e.options.bullet || "*";
	if (t !== "*" && t !== "+" && t !== "-") throw Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
function ql(e) {
	let t = Kl(e), n = e.options.bulletOther;
	if (!n) return t === "*" ? "-" : "*";
	if (n !== "*" && n !== "+" && n !== "-") throw Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (n === t) throw Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
	return n;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
function Jl(e) {
	let t = e.options.bulletOrdered || ".";
	if (t !== "." && t !== ")") throw Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-rule.js
function Yl(e) {
	let t = e.options.rule || "*";
	if (t !== "*" && t !== "-" && t !== "_") throw Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/list.js
function Xl(e, t, n, r) {
	let i = n.enter("list"), a = n.bulletCurrent, o = e.ordered ? Jl(n) : Kl(n), s = e.ordered ? o === "." ? ")" : "." : ql(n), c = t && n.bulletLastUsed ? o === n.bulletLastUsed : !1;
	if (!e.ordered) {
		let t = e.children ? e.children[0] : void 0;
		if ((o === "*" || o === "-") && t && (!t.children || !t.children[0]) && n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (c = !0), Yl(n) === o && t) {
			let t = -1;
			for (; ++t < e.children.length;) {
				let n = e.children[t];
				if (n && n.type === "listItem" && n.children && n.children[0] && n.children[0].type === "thematicBreak") {
					c = !0;
					break;
				}
			}
		}
	}
	c && (o = s), n.bulletCurrent = o;
	let l = n.containerFlow(e, r);
	return n.bulletLastUsed = o, n.bulletCurrent = a, i(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
function Zl(e) {
	let t = e.options.listItemIndent || "one";
	if (t !== "tab" && t !== "one" && t !== "mixed") throw Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function Ql(e, t, n, r) {
	let i = Zl(n), a = n.bulletCurrent || Kl(n);
	t && t.type === "list" && t.ordered && (a = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) + a);
	let o = a.length + 1;
	(i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e.spread)) && (o = Math.ceil(o / 4) * 4);
	let s = n.createTracker(r);
	s.move(a + " ".repeat(o - a.length)), s.shift(o);
	let c = n.enter("listItem"), l = n.indentLines(n.containerFlow(e, s.current()), u);
	return c(), l;
	function u(e, t, n) {
		return t ? (n ? "" : " ".repeat(o)) + e : (n ? a : a + " ".repeat(o - a.length)) + e;
	}
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
function $l(e, t, n, r) {
	let i = n.enter("paragraph"), a = n.enter("phrasing"), o = n.containerPhrasing(e, r);
	return a(), i(), o;
}
//#endregion
//#region node_modules/mdast-util-phrasing/lib/index.js
var eu = ss([
	"break",
	"delete",
	"emphasis",
	"footnote",
	"footnoteReference",
	"image",
	"imageReference",
	"inlineCode",
	"inlineMath",
	"link",
	"linkReference",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"strong",
	"text",
	"textDirective"
]);
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/root.js
function tu(e, t, n, r) {
	return (e.children.some(function(e) {
		return eu(e);
	}) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-strong.js
function nu(e) {
	let t = e.options.strong || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/strong.js
ru.peek = iu;
function ru(e, t, n, r) {
	let i = nu(n), a = n.enter("strong"), o = n.createTracker(r), s = o.move(i + i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = Ol(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = Dl(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = Ol(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + Dl(d));
	let p = o.move(i + i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function iu(e, t, n) {
	return n.options.strong || "*";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/text.js
function au(e, t, n, r) {
	return n.safe(e.value, r);
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
function ou(e) {
	let t = e.options.ruleRepetition || 3;
	if (t < 3) throw Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
function su(e, t, n) {
	let r = (Yl(n) + (n.options.ruleSpaces ? " " : "")).repeat(ou(n));
	return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/index.js
var cu = {
	blockquote: ml,
	break: vl,
	code: Sl,
	definition: Tl,
	emphasis: kl,
	hardBreak: vl,
	heading: Ml,
	html: Nl,
	image: Fl,
	imageReference: Ll,
	inlineCode: zl,
	link: Hl,
	linkReference: Wl,
	list: Xl,
	listItem: Ql,
	paragraph: $l,
	root: tu,
	strong: ru,
	text: au,
	thematicBreak: su
};
//#endregion
//#region node_modules/mdast-util-gfm-table/lib/index.js
function lu() {
	return {
		enter: {
			table: uu,
			tableData: mu,
			tableHeader: mu,
			tableRow: fu
		},
		exit: {
			codeText: hu,
			table: du,
			tableData: pu,
			tableHeader: pu,
			tableRow: pu
		}
	};
}
function uu(e) {
	let t = e._align;
	this.enter({
		type: "table",
		align: t.map(function(e) {
			return e === "none" ? null : e;
		}),
		children: []
	}, e), this.data.inTable = !0;
}
function du(e) {
	this.exit(e), this.data.inTable = void 0;
}
function fu(e) {
	this.enter({
		type: "tableRow",
		children: []
	}, e);
}
function pu(e) {
	this.exit(e);
}
function mu(e) {
	this.enter({
		type: "tableCell",
		children: []
	}, e);
}
function hu(e) {
	let t = this.resume();
	this.data.inTable && (t = t.replace(/\\([\\|])/g, gu));
	let n = this.stack[this.stack.length - 1];
	n.type, n.value = t, this.exit(e);
}
function gu(e, t) {
	return t === "|" ? t : e;
}
function _u(e) {
	let t = e || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, a = n ? " " : "|";
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "tableCell"
			},
			{
				character: "\n",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: "|",
				after: "[	 :-]"
			},
			{
				character: "|",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: ":",
				after: "-"
			},
			{
				atBreak: !0,
				character: "-",
				after: "[:|-]"
			}
		],
		handlers: {
			inlineCode: f,
			table: o,
			tableCell: c,
			tableRow: s
		}
	};
	function o(e, t, n, r) {
		return l(u(e, n, r), e.align);
	}
	function s(e, t, n, r) {
		let i = l([d(e, n, r)]);
		return i.slice(0, i.indexOf("\n"));
	}
	function c(e, t, n, r) {
		let i = n.enter("tableCell"), o = n.enter("phrasing"), s = n.containerPhrasing(e, {
			...r,
			before: a,
			after: a
		});
		return o(), i(), s;
	}
	function l(e, t) {
		return dl(e, {
			align: t,
			alignDelimiters: r,
			padding: n,
			stringLength: i
		});
	}
	function u(e, t, n) {
		let r = e.children, i = -1, a = [], o = t.enter("table");
		for (; ++i < r.length;) a[i] = d(r[i], t, n);
		return o(), a;
	}
	function d(e, t, n) {
		let r = e.children, i = -1, a = [], o = t.enter("tableRow");
		for (; ++i < r.length;) a[i] = c(r[i], e, t, n);
		return o(), a;
	}
	function f(e, t, n) {
		let r = cu.inlineCode(e, t, n);
		return n.stack.includes("tableCell") && (r = r.replace(/\|/g, "\\$&")), r;
	}
}
//#endregion
//#region node_modules/mdast-util-gfm-task-list-item/lib/index.js
function vu() {
	return { exit: {
		taskListCheckValueChecked: bu,
		taskListCheckValueUnchecked: bu,
		paragraph: xu
	} };
}
function yu() {
	return {
		unsafe: [{
			atBreak: !0,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: Su }
	};
}
function bu(e) {
	let t = this.stack[this.stack.length - 2];
	t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function xu(e) {
	let t = this.stack[this.stack.length - 2];
	if (t && t.type === "listItem" && typeof t.checked == "boolean") {
		let e = this.stack[this.stack.length - 1];
		e.type;
		let n = e.children[0];
		if (n && n.type === "text") {
			let r = t.children, i = -1, a;
			for (; ++i < r.length;) {
				let e = r[i];
				if (e.type === "paragraph") {
					a = e;
					break;
				}
			}
			a === e && (n.value = n.value.slice(1), n.value.length === 0 ? e.children.shift() : e.position && n.position && typeof n.position.start.offset == "number" && (n.position.start.column++, n.position.start.offset++, e.position.start = Object.assign({}, n.position.start)));
		}
	}
	this.exit(e);
}
function Su(e, t, n, r) {
	let i = e.children[0], a = typeof e.checked == "boolean" && i && i.type === "paragraph", o = "[" + (e.checked ? "x" : " ") + "] ", s = n.createTracker(r);
	a && s.move(o);
	let c = cu.listItem(e, t, n, {
		...r,
		...s.current()
	});
	return a && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
	function l(e) {
		return e + o;
	}
}
//#endregion
//#region node_modules/mdast-util-gfm/lib/index.js
function Cu() {
	return [
		kc(),
		$c(),
		il(),
		lu(),
		vu()
	];
}
function wu(e) {
	return { extensions: [
		Ac(),
		el(e),
		al(),
		_u(e),
		yu()
	] };
}
//#endregion
//#region node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
var Tu = {
	tokenize: zu,
	partial: !0
}, Eu = {
	tokenize: Bu,
	partial: !0
}, Du = {
	tokenize: Vu,
	partial: !0
}, Ou = {
	tokenize: Hu,
	partial: !0
}, ku = {
	tokenize: Uu,
	partial: !0
}, Au = {
	name: "wwwAutolink",
	tokenize: Lu,
	previous: Wu
}, ju = {
	name: "protocolAutolink",
	tokenize: Ru,
	previous: Gu
}, Mu = {
	name: "emailAutolink",
	tokenize: Iu,
	previous: Ku
}, Nu = {};
function Pu() {
	return { text: Nu };
}
for (var Fu = 48; Fu < 123;) Nu[Fu] = Mu, Fu++, Fu === 58 ? Fu = 65 : Fu === 91 && (Fu = 97);
Nu[43] = Mu, Nu[45] = Mu, Nu[46] = Mu, Nu[95] = Mu, Nu[72] = [Mu, ju], Nu[104] = [Mu, ju], Nu[87] = [Mu, Au], Nu[119] = [Mu, Au];
function Iu(e, t, n) {
	let r = this, i, a;
	return o;
	function o(t) {
		return !qu(t) || !Ku.call(r, r.previous) || Ju(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), s(t));
	}
	function s(t) {
		return qu(t) ? (e.consume(t), s) : t === 64 ? (e.consume(t), c) : n(t);
	}
	function c(t) {
		return t === 46 ? e.check(ku, u, l)(t) : t === 45 || t === 95 || Or(t) ? (a = !0, e.consume(t), c) : u(t);
	}
	function l(t) {
		return e.consume(t), i = !0, c;
	}
	function u(o) {
		return a && i && Dr(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(o)) : n(o);
	}
}
function Lu(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t !== 87 && t !== 119 || !Wu.call(r, r.previous) || Ju(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(Tu, e.attempt(Eu, e.attempt(Du, a), n), n)(t));
	}
	function a(n) {
		return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(n);
	}
}
function Ru(e, t, n) {
	let r = this, i = "", a = !1;
	return o;
	function o(t) {
		return (t === 72 || t === 104) && Gu.call(r, r.previous) && !Ju(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(t), e.consume(t), s) : n(t);
	}
	function s(t) {
		if (Dr(t) && i.length < 5) return i += String.fromCodePoint(t), e.consume(t), s;
		if (t === 58) {
			let n = i.toLowerCase();
			if (n === "http" || n === "https") return e.consume(t), c;
		}
		return n(t);
	}
	function c(t) {
		return t === 47 ? (e.consume(t), a ? l : (a = !0, c)) : n(t);
	}
	function l(t) {
		return t === null || Ar(t) || Pr(t) || Ir(t) || Fr(t) ? n(t) : e.attempt(Eu, e.attempt(Du, u), n)(t);
	}
	function u(n) {
		return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(n);
	}
}
function zu(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return (t === 87 || t === 119) && r < 3 ? (r++, e.consume(t), i) : t === 46 && r === 3 ? (e.consume(t), a) : n(t);
	}
	function a(e) {
		return e === null ? n(e) : t(e);
	}
}
function Bu(e, t, n) {
	let r, i, a;
	return o;
	function o(t) {
		return t === 46 || t === 95 ? e.check(Ou, c, s)(t) : t === null || Pr(t) || Ir(t) || t !== 45 && Fr(t) ? c(t) : (a = !0, e.consume(t), o);
	}
	function s(t) {
		return t === 95 ? r = !0 : (i = r, r = void 0), e.consume(t), o;
	}
	function c(e) {
		return i || r || !a ? n(e) : t(e);
	}
}
function Vu(e, t) {
	let n = 0, r = 0;
	return i;
	function i(o) {
		return o === 40 ? (n++, e.consume(o), i) : o === 41 && r < n ? a(o) : o === 33 || o === 34 || o === 38 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 60 || o === 63 || o === 93 || o === 95 || o === 126 ? e.check(Ou, t, a)(o) : o === null || Pr(o) || Ir(o) ? t(o) : (e.consume(o), i);
	}
	function a(t) {
		return t === 41 && r++, e.consume(t), i;
	}
}
function Hu(e, t, n) {
	return r;
	function r(o) {
		return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), r) : o === 38 ? (e.consume(o), a) : o === 93 ? (e.consume(o), i) : o === 60 || o === null || Pr(o) || Ir(o) ? t(o) : n(o);
	}
	function i(e) {
		return e === null || e === 40 || e === 91 || Pr(e) || Ir(e) ? t(e) : r(e);
	}
	function a(e) {
		return Dr(e) ? o(e) : n(e);
	}
	function o(t) {
		return t === 59 ? (e.consume(t), r) : Dr(t) ? (e.consume(t), o) : n(t);
	}
}
function Uu(e, t, n) {
	return r;
	function r(t) {
		return e.consume(t), i;
	}
	function i(e) {
		return Or(e) ? n(e) : t(e);
	}
}
function Wu(e) {
	return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || Pr(e);
}
function Gu(e) {
	return !Dr(e);
}
function Ku(e) {
	return !(e === 47 || qu(e));
}
function qu(e) {
	return e === 43 || e === 45 || e === 46 || e === 95 || Or(e);
}
function Ju(e) {
	let t = e.length, n = !1;
	for (; t--;) {
		let r = e[t][1];
		if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
			n = !0;
			break;
		}
		if (r._gfmAutolinkLiteralWalkedInto) {
			n = !1;
			break;
		}
	}
	return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
//#endregion
//#region node_modules/micromark-extension-gfm-footnote/lib/syntax.js
var Yu = {
	tokenize: rd,
	partial: !0
};
function Xu() {
	return {
		document: { 91: {
			name: "gfmFootnoteDefinition",
			tokenize: ed,
			continuation: { tokenize: td },
			exit: nd
		} },
		text: {
			91: {
				name: "gfmFootnoteCall",
				tokenize: $u
			},
			93: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: Zu,
				resolveTo: Qu
			}
		}
	};
}
function Zu(e, t, n) {
	let r = this, i = r.events.length, a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), o;
	for (; i--;) {
		let e = r.events[i][1];
		if (e.type === "labelImage") {
			o = e;
			break;
		}
		if (e.type === "gfmFootnoteCall" || e.type === "labelLink" || e.type === "label" || e.type === "image" || e.type === "link") break;
	}
	return s;
	function s(i) {
		if (!o || !o._balanced) return n(i);
		let s = Er(r.sliceSerialize({
			start: o.end,
			end: r.now()
		}));
		return s.codePointAt(0) !== 94 || !a.includes(s.slice(1)) ? n(i) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(i), e.exit("gfmFootnoteCallLabelMarker"), t(i));
	}
}
function Qu(e, t) {
	let n = e.length;
	for (; n--;) if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
		e[n][1];
		break;
	}
	e[n + 1][1].type = "data", e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
	let r = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, e[n + 3][1].start),
		end: Object.assign({}, e[e.length - 1][1].end)
	}, i = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, e[n + 3][1].end),
		end: Object.assign({}, e[n + 3][1].end)
	};
	i.end.column++, i.end.offset++, i.end._bufferIndex++;
	let a = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, i.end),
		end: Object.assign({}, e[e.length - 1][1].start)
	}, o = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, a.start),
		end: Object.assign({}, a.end)
	}, s = [
		e[n + 1],
		e[n + 2],
		[
			"enter",
			r,
			t
		],
		e[n + 3],
		e[n + 4],
		[
			"enter",
			i,
			t
		],
		[
			"exit",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"enter",
			o,
			t
		],
		[
			"exit",
			o,
			t
		],
		[
			"exit",
			a,
			t
		],
		e[e.length - 2],
		e[e.length - 1],
		[
			"exit",
			r,
			t
		]
	];
	return e.splice(n, e.length - n + 1, ...s), e;
}
function $u(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a = 0, o;
	return s;
	function s(t) {
		return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(t), e.exit("gfmFootnoteCallLabelMarker"), c;
	}
	function c(t) {
		return t === 94 ? (e.enter("gfmFootnoteCallMarker"), e.consume(t), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", l) : n(t);
	}
	function l(s) {
		if (a > 999 || s === 93 && !o || s === null || s === 91 || Pr(s)) return n(s);
		if (s === 93) {
			e.exit("chunkString");
			let a = e.exit("gfmFootnoteCallString");
			return i.includes(Er(r.sliceSerialize(a))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(s);
		}
		return Pr(s) || (o = !0), a++, e.consume(s), s === 92 ? u : l;
	}
	function u(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), a++, l) : l(t);
	}
}
function ed(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a, o = 0, s;
	return c;
	function c(t) {
		return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), l;
	}
	function l(t) {
		return t === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", u) : n(t);
	}
	function u(t) {
		if (o > 999 || t === 93 && !s || t === null || t === 91 || Pr(t)) return n(t);
		if (t === 93) {
			e.exit("chunkString");
			let n = e.exit("gfmFootnoteDefinitionLabelString");
			return a = Er(r.sliceSerialize(n)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), f;
		}
		return Pr(t) || (s = !0), o++, e.consume(t), t === 92 ? d : u;
	}
	function d(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), o++, u) : u(t);
	}
	function f(t) {
		return t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), i.includes(a) || i.push(a), P(e, p, "gfmFootnoteDefinitionWhitespace")) : n(t);
	}
	function p(e) {
		return t(e);
	}
}
function td(e, t, n) {
	return e.check($r, t, e.attempt(Yu, t, n));
}
function nd(e) {
	e.exit("gfmFootnoteDefinition");
}
function rd(e, t, n) {
	let r = this;
	return P(e, i, "gfmFootnoteDefinitionIndent", 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
function id(e) {
	let t = (e || {}).singleTilde, n = {
		name: "strikethrough",
		tokenize: i,
		resolveAll: r
	};
	return t ??= !0, {
		text: { 126: n },
		insideSpan: { null: [n] },
		attentionMarkers: { null: [126] }
	};
	function r(e, t) {
		let n = -1;
		for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "strikethroughSequenceTemporary" && e[n][1]._close) {
			let r = n;
			for (; r--;) if (e[r][0] === "exit" && e[r][1].type === "strikethroughSequenceTemporary" && e[r][1]._open && e[n][1].end.offset - e[n][1].start.offset === e[r][1].end.offset - e[r][1].start.offset) {
				e[n][1].type = "strikethroughSequence", e[r][1].type = "strikethroughSequence";
				let i = {
					type: "strikethrough",
					start: Object.assign({}, e[r][1].start),
					end: Object.assign({}, e[n][1].end)
				}, a = {
					type: "strikethroughText",
					start: Object.assign({}, e[r][1].end),
					end: Object.assign({}, e[n][1].start)
				}, o = [
					[
						"enter",
						i,
						t
					],
					[
						"enter",
						e[r][1],
						t
					],
					[
						"exit",
						e[r][1],
						t
					],
					[
						"enter",
						a,
						t
					]
				], s = t.parser.constructs.insideSpan.null;
				s && yr(o, o.length, 0, Kr(s, e.slice(r + 1, n), t)), yr(o, o.length, 0, [
					[
						"exit",
						a,
						t
					],
					[
						"enter",
						e[n][1],
						t
					],
					[
						"exit",
						e[n][1],
						t
					],
					[
						"exit",
						i,
						t
					]
				]), yr(e, r - 1, n - r + 3, o), n = r + o.length - 2;
				break;
			}
		}
		for (n = -1; ++n < e.length;) e[n][1].type === "strikethroughSequenceTemporary" && (e[n][1].type = "data");
		return e;
	}
	function i(e, n, r) {
		let i = this.previous, a = this.events, o = 0;
		return s;
		function s(t) {
			return i === 126 && a[a.length - 1][1].type !== "characterEscape" ? r(t) : (e.enter("strikethroughSequenceTemporary"), c(t));
		}
		function c(a) {
			let s = Gr(i);
			if (a === 126) return o > 1 ? r(a) : (e.consume(a), o++, c);
			if (o < 2 && !t) return r(a);
			let l = e.exit("strikethroughSequenceTemporary"), u = Gr(a);
			return l._open = !u || u === 2 && !!s, l._close = !s || s === 2 && !!u, n(a);
		}
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/edit-map.js
var ad = class {
	constructor() {
		this.map = [], this.index = /* @__PURE__ */ new Map();
	}
	add(e, t, n) {
		od(this, e, t, n);
	}
	consume(e) {
		/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
		if (this.map.sort(function(e, t) {
			return e[0] - t[0];
		}), this.map.length === 0) return;
		let t = this.map.length, n = [];
		for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
		n.push(e.slice()), e.length = 0;
		let r = n.pop();
		for (; r;) {
			for (let t of r) e.push(t);
			r = n.pop();
		}
		this.map.length = 0, this.index.clear();
	}
};
function od(e, t, n, r) {
	/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
	if (n === 0 && r.length === 0) return;
	let i = e.index.get(t);
	if (i) {
		i[1] += n, i[2].push(...r);
		return;
	}
	let a = [
		t,
		n,
		r
	];
	e.map.push(a), e.index.set(t, a);
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/infer.js
function sd(e, t) {
	let n = !1, r = [];
	for (; t < e.length;) {
		let i = e[t];
		if (n) {
			if (i[0] === "enter") i[1].type === "tableContent" && r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			else if (i[1].type === "tableContent") {
				if (e[t - 1][1].type === "tableDelimiterMarker") {
					let e = r.length - 1;
					r[e] = r[e] === "left" ? "center" : "right";
				}
			} else if (i[1].type === "tableDelimiterRow") break;
		} else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
		t += 1;
	}
	return r;
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/syntax.js
function cd() {
	return { flow: { null: {
		name: "table",
		tokenize: ld,
		resolveAll: ud
	} } };
}
function ld(e, t, n) {
	let r = this, i = 0, a = 0, o;
	return s;
	function s(e) {
		let t = r.events.length - 1;
		for (; t > -1;) {
			let { type: e } = r.events[t][1];
			if (e === "lineEnding" || e === "linePrefix") t--;
			else break;
		}
		let i = t > -1 ? r.events[t][1].type : null, a = i === "tableHead" || i === "tableRow" ? S : c;
		return a === S && r.parser.lazy[r.now().line] ? n(e) : a(e);
	}
	function c(t) {
		return e.enter("tableHead"), e.enter("tableRow"), l(t);
	}
	function l(e) {
		return e === 124 ? u(e) : (o = !0, a += 1, u(e));
	}
	function u(t) {
		return t === null ? n(t) : M(t) ? a > 1 ? (a = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), p) : n(t) : N(t) ? P(e, u, "whitespace")(t) : (a += 1, o && (o = !1, i += 1), t === 124 ? (e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), o = !0, u) : (e.enter("data"), d(t)));
	}
	function d(t) {
		return t === null || t === 124 || Pr(t) ? (e.exit("data"), u(t)) : (e.consume(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 92 || t === 124 ? (e.consume(t), d) : d(t);
	}
	function p(t) {
		return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(t) : (e.enter("tableDelimiterRow"), o = !1, N(t) ? P(e, m, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : m(t));
	}
	function m(t) {
		return t === 45 || t === 58 ? g(t) : t === 124 ? (o = !0, e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), h) : x(t);
	}
	function h(t) {
		return N(t) ? P(e, g, "whitespace")(t) : g(t);
	}
	function g(t) {
		return t === 58 ? (a += 1, o = !0, e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), _) : t === 45 ? (a += 1, _(t)) : t === null || M(t) ? b(t) : x(t);
	}
	function _(t) {
		return t === 45 ? (e.enter("tableDelimiterFiller"), v(t)) : x(t);
	}
	function v(t) {
		return t === 45 ? (e.consume(t), v) : t === 58 ? (o = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), y) : (e.exit("tableDelimiterFiller"), y(t));
	}
	function y(t) {
		return N(t) ? P(e, b, "whitespace")(t) : b(t);
	}
	function b(n) {
		return n === 124 ? m(n) : n === null || M(n) ? !o || i !== a ? x(n) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(n)) : x(n);
	}
	function x(e) {
		return n(e);
	}
	function S(t) {
		return e.enter("tableRow"), C(t);
	}
	function C(n) {
		return n === 124 ? (e.enter("tableCellDivider"), e.consume(n), e.exit("tableCellDivider"), C) : n === null || M(n) ? (e.exit("tableRow"), t(n)) : N(n) ? P(e, C, "whitespace")(n) : (e.enter("data"), w(n));
	}
	function w(t) {
		return t === null || t === 124 || Pr(t) ? (e.exit("data"), C(t)) : (e.consume(t), t === 92 ? T : w);
	}
	function T(t) {
		return t === 92 || t === 124 ? (e.consume(t), w) : w(t);
	}
}
function ud(e, t) {
	let n = -1, r = !0, i = 0, a = [
		0,
		0,
		0,
		0
	], o = [
		0,
		0,
		0,
		0
	], s = !1, c = 0, l, u, d, f = new ad();
	for (; ++n < e.length;) {
		let p = e[n], m = p[1];
		p[0] === "enter" ? m.type === "tableHead" ? (s = !1, c !== 0 && (fd(f, t, c, l, u), u = void 0, c = 0), l = {
			type: "table",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			l,
			t
		]])) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (r = !0, d = void 0, a = [
			0,
			0,
			0,
			0
		], o = [
			0,
			n + 1,
			0,
			0
		], s && (s = !1, u = {
			type: "tableBody",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			u,
			t
		]])), i = m.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") ? (r = !1, o[2] === 0 && (a[1] !== 0 && (o[0] = o[1], d = dd(f, t, a, i, void 0, d), a = [
			0,
			0,
			0,
			0
		]), o[2] = n)) : m.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (o[0] = o[1], d = dd(f, t, a, i, void 0, d)), a = o, o = [
			a[1],
			n,
			0,
			0
		])) : m.type === "tableHead" ? (s = !0, c = n) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (c = n, a[1] === 0 ? o[1] !== 0 && (d = dd(f, t, o, i, n, d)) : (o[0] = o[1], d = dd(f, t, a, i, n, d)), i = 0) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") && (o[3] = n);
	}
	for (c !== 0 && fd(f, t, c, l, u), f.consume(t.events), n = -1; ++n < t.events.length;) {
		let e = t.events[n];
		e[0] === "enter" && e[1].type === "table" && (e[1]._align = sd(t.events, n));
	}
	return e;
}
function dd(e, t, n, r, i, a) {
	let o = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData";
	n[0] !== 0 && (a.end = Object.assign({}, pd(t.events, n[0])), e.add(n[0], 0, [[
		"exit",
		a,
		t
	]]));
	let s = pd(t.events, n[1]);
	if (a = {
		type: o,
		start: Object.assign({}, s),
		end: Object.assign({}, s)
	}, e.add(n[1], 0, [[
		"enter",
		a,
		t
	]]), n[2] !== 0) {
		let i = pd(t.events, n[2]), a = pd(t.events, n[3]), o = {
			type: "tableContent",
			start: Object.assign({}, i),
			end: Object.assign({}, a)
		};
		if (e.add(n[2], 0, [[
			"enter",
			o,
			t
		]]), r !== 2) {
			let r = t.events[n[2]], i = t.events[n[3]];
			if (r[1].end = Object.assign({}, i[1].end), r[1].type = "chunkText", r[1].contentType = "text", n[3] > n[2] + 1) {
				let t = n[2] + 1, r = n[3] - n[2] - 1;
				e.add(t, r, []);
			}
		}
		e.add(n[3] + 1, 0, [[
			"exit",
			o,
			t
		]]);
	}
	return i !== void 0 && (a.end = Object.assign({}, pd(t.events, i)), e.add(i, 0, [[
		"exit",
		a,
		t
	]]), a = void 0), a;
}
function fd(e, t, n, r, i) {
	let a = [], o = pd(t.events, n);
	i && (i.end = Object.assign({}, o), a.push([
		"exit",
		i,
		t
	])), r.end = Object.assign({}, o), a.push([
		"exit",
		r,
		t
	]), e.add(n + 1, 0, a);
}
function pd(e, t) {
	let n = e[t], r = n[0] === "enter" ? "start" : "end";
	return n[1][r];
}
//#endregion
//#region node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
var md = {
	name: "tasklistCheck",
	tokenize: gd
};
function hd() {
	return { text: { 91: md } };
}
function gd(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.previous !== null || !r._gfmTasklistFirstContentOfListItem ? n(t) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), a);
	}
	function a(t) {
		return Pr(t) ? (e.enter("taskListCheckValueUnchecked"), e.consume(t), e.exit("taskListCheckValueUnchecked"), o) : t === 88 || t === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(t), e.exit("taskListCheckValueChecked"), o) : n(t);
	}
	function o(t) {
		return t === 93 ? (e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), s) : n(t);
	}
	function s(r) {
		return M(r) ? t(r) : N(r) ? e.check({ tokenize: _d }, t, n)(r) : n(r);
	}
}
function _d(e, t, n) {
	return P(e, r, "whitespace");
	function r(e) {
		return e === null ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm/index.js
function vd(e) {
	return Sr([
		Pu(),
		Xu(),
		id(e),
		cd(),
		hd()
	]);
}
//#endregion
//#region node_modules/remark-gfm/lib/index.js
var yd = {};
function bd(e) {
	let t = this, n = e || yd, r = t.data(), i = r.micromarkExtensions ||= [], a = r.fromMarkdownExtensions ||= [], o = r.toMarkdownExtensions ||= [];
	i.push(vd(n)), a.push(Cu()), o.push(wu(n));
}
//#endregion
//#region node_modules/mdast-util-math/lib/index.js
function xd() {
	return {
		enter: {
			mathFlow: e,
			mathFlowFenceMeta: t,
			mathText: a
		},
		exit: {
			mathFlow: i,
			mathFlowFence: r,
			mathFlowFenceMeta: n,
			mathFlowValue: s,
			mathText: o,
			mathTextData: s
		}
	};
	function e(e) {
		this.enter({
			type: "math",
			meta: null,
			value: "",
			data: {
				hName: "pre",
				hChildren: [{
					type: "element",
					tagName: "code",
					properties: { className: ["language-math", "math-display"] },
					children: []
				}]
			}
		}, e);
	}
	function t() {
		this.buffer();
	}
	function n() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.type, t.meta = e;
	}
	function r() {
		this.data.mathFlowInside || (this.buffer(), this.data.mathFlowInside = !0);
	}
	function i(e) {
		let t = this.resume().replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), n = this.stack[this.stack.length - 1];
		n.type, this.exit(e), n.value = t;
		let r = n.data.hChildren[0];
		r.type, r.tagName, r.children.push({
			type: "text",
			value: t
		}), this.data.mathFlowInside = void 0;
	}
	function a(e) {
		this.enter({
			type: "inlineMath",
			value: "",
			data: {
				hName: "code",
				hProperties: { className: ["language-math", "math-inline"] },
				hChildren: []
			}
		}, e), this.buffer();
	}
	function o(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.type, this.exit(e), n.value = t, n.data.hChildren.push({
			type: "text",
			value: t
		});
	}
	function s(e) {
		this.config.enter.data.call(this, e), this.config.exit.data.call(this, e);
	}
}
function Sd(e) {
	let t = (e || {}).singleDollarTextMath;
	return t ??= !0, r.peek = i, {
		unsafe: [
			{
				character: "\r",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "\n",
				inConstruct: "mathFlowMeta"
			},
			{
				character: "$",
				after: t ? void 0 : "\\$",
				inConstruct: "phrasing"
			},
			{
				character: "$",
				inConstruct: "mathFlowMeta"
			},
			{
				atBreak: !0,
				character: "$",
				after: "\\$"
			}
		],
		handlers: {
			math: n,
			inlineMath: r
		}
	};
	function n(e, t, n, r) {
		let i = e.value || "", a = n.createTracker(r), o = "$".repeat(Math.max(yl(i, "$") + 1, 2)), s = n.enter("mathFlow"), c = a.move(o);
		if (e.meta) {
			let t = n.enter("mathFlowMeta");
			c += a.move(n.safe(e.meta, {
				after: "\n",
				before: c,
				encode: ["$"],
				...a.current()
			})), t();
		}
		return c += a.move("\n"), i && (c += a.move(i + "\n")), c += a.move(o), s(), c;
	}
	function r(e, n, r) {
		let i = e.value || "", a = 1;
		for (t || a++; RegExp("(^|[^$])" + "\\$".repeat(a) + "([^$]|$)").test(i);) a++;
		let o = "$".repeat(a);
		/[^ \r\n]/.test(i) && (/^[ \r\n]/.test(i) && /[ \r\n]$/.test(i) || /^\$|\$$/.test(i)) && (i = " " + i + " ");
		let s = -1;
		for (; ++s < r.unsafe.length;) {
			let e = r.unsafe[s];
			if (!e.atBreak) continue;
			let t = r.compilePattern(e), n;
			for (; n = t.exec(i);) {
				let e = n.index;
				i.codePointAt(e) === 10 && i.codePointAt(e - 1) === 13 && e--, i = i.slice(0, e) + " " + i.slice(n.index + 1);
			}
		}
		return o + i + o;
	}
	function i() {
		return "$";
	}
}
//#endregion
//#region node_modules/micromark-extension-math/lib/math-flow.js
var Cd = {
	tokenize: Td,
	concrete: !0,
	name: "mathFlow"
}, wd = {
	tokenize: Ed,
	partial: !0
};
function Td(e, t, n) {
	let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
	return s;
	function s(t) {
		return e.enter("mathFlow"), e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), c(t);
	}
	function c(t) {
		return t === 36 ? (e.consume(t), o++, c) : o < 2 ? n(t) : (e.exit("mathFlowFenceSequence"), P(e, l, "whitespace")(t));
	}
	function l(t) {
		return t === null || M(t) ? d(t) : (e.enter("mathFlowFenceMeta"), e.enter("chunkString", { contentType: "string" }), u(t));
	}
	function u(t) {
		return t === null || M(t) ? (e.exit("chunkString"), e.exit("mathFlowFenceMeta"), d(t)) : t === 36 ? n(t) : (e.consume(t), u);
	}
	function d(n) {
		return e.exit("mathFlowFence"), r.interrupt ? t(n) : e.attempt(wd, f, g)(n);
	}
	function f(t) {
		return e.attempt({
			tokenize: _,
			partial: !0
		}, g, p)(t);
	}
	function p(t) {
		return (a ? P(e, m, "linePrefix", a + 1) : m)(t);
	}
	function m(t) {
		return t === null ? g(t) : M(t) ? e.attempt(wd, f, g)(t) : (e.enter("mathFlowValue"), h(t));
	}
	function h(t) {
		return t === null || M(t) ? (e.exit("mathFlowValue"), m(t)) : (e.consume(t), h);
	}
	function g(n) {
		return e.exit("mathFlow"), t(n);
	}
	function _(e, t, n) {
		let i = 0;
		return P(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
		function a(t) {
			return e.enter("mathFlowFence"), e.enter("mathFlowFenceSequence"), s(t);
		}
		function s(t) {
			return t === 36 ? (i++, e.consume(t), s) : i < o ? n(t) : (e.exit("mathFlowFenceSequence"), P(e, c, "whitespace")(t));
		}
		function c(r) {
			return r === null || M(r) ? (e.exit("mathFlowFence"), t(r)) : n(r);
		}
	}
}
function Ed(e, t, n) {
	let r = this;
	return i;
	function i(n) {
		return n === null ? t(n) : (e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-math/lib/math-text.js
function Dd(e) {
	let t = (e || {}).singleDollarTextMath;
	return t ??= !0, {
		tokenize: n,
		resolve: Od,
		previous: kd,
		name: "mathText"
	};
	function n(e, n, r) {
		let i = 0, a, o;
		return s;
		function s(t) {
			return e.enter("mathText"), e.enter("mathTextSequence"), c(t);
		}
		function c(n) {
			return n === 36 ? (e.consume(n), i++, c) : i < 2 && !t ? r(n) : (e.exit("mathTextSequence"), l(n));
		}
		function l(t) {
			return t === null ? r(t) : t === 36 ? (o = e.enter("mathTextSequence"), a = 0, d(t)) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), l) : M(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), l) : (e.enter("mathTextData"), u(t));
		}
		function u(t) {
			return t === null || t === 32 || t === 36 || M(t) ? (e.exit("mathTextData"), l(t)) : (e.consume(t), u);
		}
		function d(t) {
			return t === 36 ? (e.consume(t), a++, d) : a === i ? (e.exit("mathTextSequence"), e.exit("mathText"), n(t)) : (o.type = "mathTextData", u(t));
		}
	}
}
function Od(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "mathTextData") {
			e[t][1].type = "mathTextPadding", e[n][1].type = "mathTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "mathTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function kd(e) {
	return e !== 36 || this.events[this.events.length - 1][1].type === "characterEscape";
}
//#endregion
//#region node_modules/micromark-extension-math/lib/syntax.js
function Ad(e) {
	return {
		flow: { 36: Cd },
		text: { 36: Dd(e) }
	};
}
//#endregion
//#region node_modules/remark-math/lib/index.js
var jd = {};
function Md(e) {
	let t = this, n = e || jd, r = t.data(), i = r.micromarkExtensions ||= [], a = r.fromMarkdownExtensions ||= [], o = r.toMarkdownExtensions ||= [];
	i.push(Ad(n)), a.push(xd()), o.push(Sd(n));
}
//#endregion
//#region node_modules/hast-util-parse-selector/lib/index.js
var Nd = /[#.]/g;
function Pd(e, t) {
	let n = e || "", r = {}, i = 0, a, o;
	for (; i < n.length;) {
		Nd.lastIndex = i;
		let e = Nd.exec(n), t = n.slice(i, e ? e.index : n.length);
		t && (a ? a === "#" ? r.id = t : Array.isArray(r.className) ? r.className.push(t) : r.className = [t] : o = t, i += t.length), e && (a = e[0], i++);
	}
	return {
		type: "element",
		tagName: o || t || "div",
		properties: r,
		children: []
	};
}
//#endregion
//#region node_modules/hastscript/lib/create-h.js
function Fd(e, t, n) {
	let r = n ? Vd(n) : void 0;
	function i(n, i, ...a) {
		let o;
		if (n == null) {
			o = {
				type: "root",
				children: []
			};
			let e = i;
			a.unshift(e);
		} else {
			o = Pd(n, t);
			let s = o.tagName.toLowerCase(), c = r ? r.get(s) : void 0;
			if (o.tagName = c || s, Id(i)) a.unshift(i);
			else for (let [t, n] of Object.entries(i)) Ld(e, o.properties, t, n);
		}
		for (let e of a) Rd(o.children, e);
		return o.type === "element" && o.tagName === "template" && (o.content = {
			type: "root",
			children: o.children
		}, o.children = []), o;
	}
	return i;
}
function Id(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !0;
	if (typeof e.type != "string") return !1;
	let t = e, n = Object.keys(e);
	for (let e of n) {
		let n = t[e];
		if (n && typeof n == "object") {
			if (!Array.isArray(n)) return !0;
			let e = n;
			for (let t of e) if (typeof t != "number" && typeof t != "string") return !0;
		}
	}
	return !!("children" in e && Array.isArray(e.children));
}
function Ld(e, t, n, r) {
	let i = gn(e, n), a;
	if (r != null) {
		if (typeof r == "number") {
			if (Number.isNaN(r)) return;
			a = r;
		} else a = typeof r == "boolean" ? r : typeof r == "string" ? i.spaceSeparated ? xn(r) : i.commaSeparated ? Mt(r) : i.commaOrSpaceSeparated ? xn(Mt(r).join(" ")) : zd(i, i.property, r) : Array.isArray(r) ? [...r] : i.property === "style" ? Bd(r) : String(r);
		if (Array.isArray(a)) {
			let e = [];
			for (let t of a) e.push(zd(i, i.property, t));
			a = e;
		}
		i.property === "className" && Array.isArray(t.className) && (a = t.className.concat(a)), t[i.property] = a;
	}
}
function Rd(e, t) {
	if (t != null) {
		if (typeof t == "number" || typeof t == "string") e.push({
			type: "text",
			value: String(t)
		});
		else if (Array.isArray(t)) for (let n of t) Rd(e, n);
		else if (typeof t == "object" && "type" in t) t.type === "root" ? Rd(e, t.children) : e.push(t);
		else throw Error("Expected node, nodes, or string, got `" + t + "`");
	}
}
function zd(e, t, n) {
	if (typeof n == "string") {
		if (e.number && n && !Number.isNaN(Number(n))) return Number(n);
		if ((e.boolean || e.overloadedBoolean) && (n === "" || Ut(n) === Ut(t))) return !0;
	}
	return n;
}
function Bd(e) {
	let t = [];
	for (let [n, r] of Object.entries(e)) t.push([n, r].join(": "));
	return t.join("; ");
}
function Vd(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.set(n.toLowerCase(), n);
	return t;
}
//#endregion
//#region node_modules/hastscript/lib/svg-case-sensitive-tag-names.js
var Hd = /* @__PURE__ */ "altGlyph.altGlyphDef.altGlyphItem.animateColor.animateMotion.animateTransform.clipPath.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.foreignObject.glyphRef.linearGradient.radialGradient.solidColor.textArea.textPath".split("."), Ud = Fd(yn, "div"), Wd = Fd(bn, "g", Hd), Gd = {
	html: "http://www.w3.org/1999/xhtml",
	mathml: "http://www.w3.org/1998/Math/MathML",
	svg: "http://www.w3.org/2000/svg",
	xlink: "http://www.w3.org/1999/xlink",
	xml: "http://www.w3.org/XML/1998/namespace",
	xmlns: "http://www.w3.org/2000/xmlns/"
};
//#endregion
//#region node_modules/hast-util-from-dom/lib/index.js
function Kd(e, t) {
	return qd(e, t || {}) || {
		type: "root",
		children: []
	};
}
function qd(e, t) {
	let n = Jd(e, t);
	return n && t.afterTransform && t.afterTransform(e, n), n;
}
function Jd(e, t) {
	switch (e.nodeType) {
		case 1: return $d(e, t);
		case 3: return Zd(e);
		case 8: return Qd(e);
		case 9: return Yd(e, t);
		case 10: return Xd();
		case 11: return Yd(e, t);
		default: return;
	}
}
function Yd(e, t) {
	return {
		type: "root",
		children: ef(e, t)
	};
}
function Xd() {
	return { type: "doctype" };
}
function Zd(e) {
	return {
		type: "text",
		value: e.nodeValue || ""
	};
}
function Qd(e) {
	return {
		type: "comment",
		value: e.nodeValue || ""
	};
}
function $d(e, t) {
	let n = e.namespaceURI, r = n === Gd.svg ? Wd : Ud, i = n === Gd.html ? e.tagName.toLowerCase() : e.tagName, a = n === Gd.html && i === "template" ? e.content : e, o = e.getAttributeNames(), s = {}, c = -1;
	for (; ++c < o.length;) s[o[c]] = e.getAttribute(o[c]) || "";
	return r(i, s, ef(a, t));
}
function ef(e, t) {
	let n = e.childNodes, r = [], i = -1;
	for (; ++i < n.length;) {
		let e = qd(n[i], t);
		e !== void 0 && r.push(e);
	}
	return r;
}
//#endregion
//#region node_modules/hast-util-from-html-isomorphic/lib/browser.js
var tf = new DOMParser();
function nf(e, t) {
	return Kd(t?.fragment ? rf(e) : tf.parseFromString(e, "text/html"));
}
function rf(e) {
	let t = document.createElement("template");
	return t.innerHTML = e, t.content;
}
//#endregion
//#region node_modules/unist-util-find-after/lib/index.js
var af = (function(e, t, n) {
	let r = ss(n);
	if (!e || !e.type || !e.children) throw Error("Expected parent node");
	if (typeof t == "number") {
		if (t < 0 || t === Infinity) throw Error("Expected positive finite number as index");
	} else if (t = e.children.indexOf(t), t < 0) throw Error("Expected child node or index");
	for (; ++t < e.children.length;) if (r(e.children[t], t, e)) return e.children[t];
}), of = (function(e) {
	if (e == null) return uf;
	if (typeof e == "string") return cf(e);
	if (typeof e == "object") return sf(e);
	if (typeof e == "function") return lf(e);
	throw Error("Expected function, string, or array as `test`");
});
function sf(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = of(e[n]);
	return lf(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function cf(e) {
	return lf(t);
	function t(t) {
		return t.tagName === e;
	}
}
function lf(e) {
	return t;
	function t(t, n, r) {
		return !!(df(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function uf(e) {
	return !!(e && typeof e == "object" && "type" in e && e.type === "element" && "tagName" in e && typeof e.tagName == "string");
}
function df(e) {
	return typeof e == "object" && !!e && "type" in e && "tagName" in e;
}
//#endregion
//#region node_modules/hast-util-to-text/lib/index.js
var ff = /\n/g, pf = /[\t ]+/g, mf = of("br"), hf = of(Of), gf = of("p"), _f = of("tr"), vf = of([
	"datalist",
	"head",
	"noembed",
	"noframes",
	"noscript",
	"rp",
	"script",
	"style",
	"template",
	"title",
	Df,
	kf
]), yf = of(/* @__PURE__ */ "address.article.aside.blockquote.body.caption.center.dd.dialog.dir.dl.dt.div.figure.figcaption.footer.form,.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.legend.li.listing.main.menu.nav.ol.p.plaintext.pre.section.ul.xmp".split("."));
function bf(e, t) {
	let n = t || {}, r = "children" in e ? e.children : [], i = yf(e), a = Ef(e, {
		whitespace: n.whitespace || "normal",
		breakBefore: !1,
		breakAfter: !1
	}), o = [];
	(e.type === "text" || e.type === "comment") && o.push(...Cf(e, {
		whitespace: a,
		breakBefore: !0,
		breakAfter: !0
	}));
	let s = -1;
	for (; ++s < r.length;) o.push(...xf(r[s], e, {
		whitespace: a,
		breakBefore: s ? void 0 : i,
		breakAfter: s < r.length - 1 ? mf(r[s + 1]) : i
	}));
	let c = [], l;
	for (s = -1; ++s < o.length;) {
		let e = o[s];
		typeof e == "number" ? l !== void 0 && e > l && (l = e) : e && (l !== void 0 && l > -1 && c.push("\n".repeat(l) || " "), l = -1, c.push(e));
	}
	return c.join("");
}
function xf(e, t, n) {
	return e.type === "element" ? Sf(e, t, n) : e.type === "text" ? n.whitespace === "normal" ? Cf(e, n) : wf(e) : [];
}
function Sf(e, t, n) {
	let r = Ef(e, n), i = e.children || [], a = -1, o = [];
	if (vf(e)) return o;
	let s, c;
	for (mf(e) || _f(e) && af(t, e, _f) ? c = "\n" : gf(e) ? (s = 2, c = 2) : yf(e) && (s = 1, c = 1); ++a < i.length;) o = o.concat(xf(i[a], e, {
		whitespace: r,
		breakBefore: a ? void 0 : s,
		breakAfter: a < i.length - 1 ? mf(i[a + 1]) : c
	}));
	return hf(e) && af(t, e, hf) && o.push("	"), s && o.unshift(s), c && o.push(c), o;
}
function Cf(e, t) {
	let n = String(e.value), r = [], i = [], a = 0;
	for (; a <= n.length;) {
		ff.lastIndex = a;
		let e = ff.exec(n), i = e && "index" in e ? e.index : n.length;
		r.push(Tf(n.slice(a, i).replace(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, ""), a !== 0 || t.breakBefore, i !== n.length || t.breakAfter)), a = i + 1;
	}
	let o = -1, s;
	for (; ++o < r.length;) r[o].charCodeAt(r[o].length - 1) === 8203 || o < r.length - 1 && r[o + 1].charCodeAt(0) === 8203 ? (i.push(r[o]), s = void 0) : r[o] ? (typeof s == "number" && i.push(s), i.push(r[o]), s = 0) : (o === 0 || o === r.length - 1) && i.push(0);
	return i;
}
function wf(e) {
	return [String(e.value)];
}
function Tf(e, t, n) {
	let r = [], i = 0, a;
	for (; i < e.length;) {
		pf.lastIndex = i;
		let n = pf.exec(e);
		a = n ? n.index : e.length, !i && !a && n && !t && r.push(""), i !== a && r.push(e.slice(i, a)), i = n ? a + n[0].length : a;
	}
	return i !== a && !n && r.push(""), r.join(" ");
}
function Ef(e, t) {
	if (e.type === "element") {
		let n = e.properties || {};
		switch (e.tagName) {
			case "listing":
			case "plaintext":
			case "xmp": return "pre";
			case "nobr": return "nowrap";
			case "pre": return n.wrap ? "pre-wrap" : "pre";
			case "td":
			case "th": return n.noWrap ? "nowrap" : t.whitespace;
			case "textarea": return "pre-wrap";
		}
	}
	return t.whitespace;
}
function Df(e) {
	return !!(e.properties || {}).hidden;
}
function Of(e) {
	return e.tagName === "td" || e.tagName === "th";
}
function kf(e) {
	return e.tagName === "dialog" && !(e.properties || {}).open;
}
//#endregion
//#region node_modules/rehype-katex/node_modules/katex/dist/katex.mjs
var I = class e extends Error {
	constructor(t, n) {
		var r = "KaTeX parse error: " + t, i, a, o = n && n.loc;
		if (o && o.start <= o.end) {
			var s = o.lexer.input;
			i = o.start, a = o.end, i === s.length ? r += " at end of input: " : r += " at position " + (i + 1) + ": ";
			var c = s.slice(i, a).replace(/[^]/g, "$&̲"), l = i > 15 ? "…" + s.slice(i - 15, i) : s.slice(0, i), u = a + 15 < s.length ? s.slice(a, a + 15) + "…" : s.slice(a);
			r += l + c + u;
		}
		super(r), this.name = "ParseError", this.position = void 0, this.length = void 0, this.rawMessage = void 0, Object.setPrototypeOf(this, e.prototype), this.position = i, i != null && a != null && (this.length = a - i), this.rawMessage = t;
	}
}, Af = /([A-Z])/g, jf = (e) => e.replace(Af, "-$1").toLowerCase(), Mf = {
	"&": "&amp;",
	">": "&gt;",
	"<": "&lt;",
	"\"": "&quot;",
	"'": "&#x27;"
}, Nf = /[&><"']/g, Pf = (e) => String(e).replace(Nf, (e) => Mf[e]), Ff = (e) => e.type === "ordgroup" || e.type === "color" ? e.body.length === 1 ? Ff(e.body[0]) : e : e.type === "font" ? Ff(e.body) : e, If = /* @__PURE__ */ new Set([
	"mathord",
	"textord",
	"atom"
]), Lf = (e) => If.has(Ff(e).type), Rf = (e) => {
	var t = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(e);
	return t ? t[2] !== ":" || !/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(t[1]) ? null : t[1].toLowerCase() : "_relative";
}, zf = {
	displayMode: {
		type: "boolean",
		description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
		cli: "-d, --display-mode"
	},
	output: {
		type: { enum: [
			"htmlAndMathml",
			"html",
			"mathml"
		] },
		description: "Determines the markup language of the output.",
		cli: "-F, --format <type>"
	},
	leqno: {
		type: "boolean",
		description: "Render display math in leqno style (left-justified tags)."
	},
	fleqn: {
		type: "boolean",
		description: "Render display math flush left."
	},
	throwOnError: {
		type: "boolean",
		default: !0,
		cli: "-t, --no-throw-on-error",
		cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
	},
	errorColor: {
		type: "string",
		default: "#cc0000",
		cli: "-c, --error-color <color>",
		cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
		cliProcessor: (e) => "#" + e
	},
	macros: {
		type: "object",
		cli: "-m, --macro <def>",
		cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
		cliDefault: [],
		cliProcessor: (e, t) => (t.push(e), t)
	},
	minRuleThickness: {
		type: "number",
		description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
		processor: (e) => Math.max(0, e),
		cli: "--min-rule-thickness <size>",
		cliProcessor: parseFloat
	},
	colorIsTextColor: {
		type: "boolean",
		description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
		cli: "-b, --color-is-text-color"
	},
	strict: {
		type: [
			{ enum: [
				"warn",
				"ignore",
				"error"
			] },
			"boolean",
			"function"
		],
		description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
		cli: "-S, --strict",
		cliDefault: !1
	},
	trust: {
		type: ["boolean", "function"],
		description: "Trust the input, enabling all HTML features such as \\url.",
		cli: "-T, --trust"
	},
	maxSize: {
		type: "number",
		default: Infinity,
		description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
		processor: (e) => Math.max(0, e),
		cli: "-s, --max-size <n>",
		cliProcessor: parseInt
	},
	maxExpand: {
		type: "number",
		default: 1e3,
		description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
		processor: (e) => Math.max(0, e),
		cli: "-e, --max-expand <n>",
		cliProcessor: (e) => e === "Infinity" ? Infinity : parseInt(e)
	},
	globalGroup: {
		type: "boolean",
		cli: !1
	}
};
function Bf(e) {
	if (typeof e != "string") return e.enum[0];
	switch (e) {
		case "boolean": return !1;
		case "string": return "";
		case "number": return 0;
		case "object": return {};
		default: throw Error("Unexpected schema type; settings must declare an explicit default.");
	}
}
function Vf(e) {
	return e.default === void 0 ? Bf(Array.isArray(e.type) ? e.type[0] : e.type) : e.default;
}
function Hf(e, t, n, r) {
	var i = n[t];
	e[t] = i === void 0 ? Vf(r) : r.processor ? r.processor(i) : i;
}
var Uf = class {
	constructor(e) {
		e === void 0 && (e = {}), this.displayMode = void 0, this.output = void 0, this.leqno = void 0, this.fleqn = void 0, this.throwOnError = void 0, this.errorColor = void 0, this.macros = void 0, this.minRuleThickness = void 0, this.colorIsTextColor = void 0, this.strict = void 0, this.trust = void 0, this.maxSize = void 0, this.maxExpand = void 0, this.globalGroup = void 0, e ||= {};
		for (var t of Object.keys(zf)) {
			var n = zf[t];
			n && Hf(this, t, e, n);
		}
	}
	reportNonstrict(e, t, n) {
		var r = this.strict;
		if (typeof r == "function" && (r = r(e, t, n)), r && r !== "ignore") {
			if (r === !0 || r === "error") throw new I("LaTeX-incompatible input and strict mode is set to 'error': " + (t + " [" + e + "]"), n);
			r === "warn" ? typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")) : typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + r + "': " + t + " [" + e + "]"));
		}
	}
	useStrictBehavior(e, t, n) {
		var r = this.strict;
		if (typeof r == "function") try {
			r = r(e, t, n);
		} catch {
			r = "error";
		}
		return !r || r === "ignore" ? !1 : r === !0 || r === "error" ? !0 : r === "warn" ? (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (t + " [" + e + "]")), !1) : (typeof console < "u" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + r + "': " + t + " [" + e + "]")), !1);
	}
	isTrusted(e) {
		if ("url" in e && e.url && !e.protocol) {
			var t = Rf(e.url);
			if (t == null) return !1;
			e.protocol = t;
		}
		return !!(typeof this.trust == "function" ? this.trust(e) : this.trust);
	}
}, Wf = class {
	constructor(e, t, n) {
		this.id = void 0, this.size = void 0, this.cramped = void 0, this.id = e, this.size = t, this.cramped = n;
	}
	sup() {
		return $f[ep[this.id]];
	}
	sub() {
		return $f[tp[this.id]];
	}
	fracNum() {
		return $f[np[this.id]];
	}
	fracDen() {
		return $f[rp[this.id]];
	}
	cramp() {
		return $f[ip[this.id]];
	}
	text() {
		return $f[ap[this.id]];
	}
	isTight() {
		return this.size >= 2;
	}
}, Gf = 0, Kf = 1, qf = 2, Jf = 3, Yf = 4, Xf = 5, Zf = 6, Qf = 7, $f = [
	new Wf(Gf, 0, !1),
	new Wf(Kf, 0, !0),
	new Wf(qf, 1, !1),
	new Wf(Jf, 1, !0),
	new Wf(Yf, 2, !1),
	new Wf(Xf, 2, !0),
	new Wf(Zf, 3, !1),
	new Wf(Qf, 3, !0)
], ep = [
	Yf,
	Xf,
	Yf,
	Xf,
	Zf,
	Qf,
	Zf,
	Qf
], tp = [
	Xf,
	Xf,
	Xf,
	Xf,
	Qf,
	Qf,
	Qf,
	Qf
], np = [
	qf,
	Jf,
	Yf,
	Xf,
	Zf,
	Qf,
	Zf,
	Qf
], rp = [
	Jf,
	Jf,
	Xf,
	Xf,
	Qf,
	Qf,
	Qf,
	Qf
], ip = [
	Kf,
	Kf,
	Jf,
	Jf,
	Xf,
	Xf,
	Qf,
	Qf
], ap = [
	Gf,
	Kf,
	qf,
	Jf,
	qf,
	Jf,
	qf,
	Jf
], L = {
	DISPLAY: $f[Gf],
	TEXT: $f[qf],
	SCRIPT: $f[Yf],
	SCRIPTSCRIPT: $f[Zf]
}, op = [
	{
		name: "latin",
		blocks: [[256, 591], [768, 879]]
	},
	{
		name: "cyrillic",
		blocks: [[1024, 1279]]
	},
	{
		name: "armenian",
		blocks: [[1328, 1423]]
	},
	{
		name: "brahmic",
		blocks: [[2304, 4255]]
	},
	{
		name: "georgian",
		blocks: [[4256, 4351]]
	},
	{
		name: "cjk",
		blocks: [
			[12288, 12543],
			[19968, 40879],
			[65280, 65376]
		]
	},
	{
		name: "hangul",
		blocks: [[44032, 55215]]
	}
];
function sp(e) {
	for (var t = 0; t < op.length; t++) for (var n = op[t], r = 0; r < n.blocks.length; r++) {
		var i = n.blocks[r];
		if (e >= i[0] && e <= i[1]) return n.name;
	}
	return null;
}
var cp = [];
op.forEach((e) => e.blocks.forEach((e) => cp.push(...e)));
function lp(e) {
	for (var t = 0; t < cp.length; t += 2) if (e >= cp[t] && e <= cp[t + 1]) return !0;
	return !1;
}
var up = (e) => e + " " + e, dp = 80, fp = function(e, t) {
	return "M95," + (622 + e + t) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + e / 2.075 + " -" + e + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + e) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, pp = function(e, t) {
	return "M263," + (601 + e + t) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + e / 2.084 + " -" + e + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + e) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, mp = function(e, t) {
	return "M983 " + (10 + e + t) + "\nl" + e / 3.13 + " -" + e + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + e) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + e) + " " + t + "h400000v" + (40 + e) + "h-400000z";
}, hp = function(e, t) {
	return "M424," + (2398 + e + t) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + e / 4.223 + " -" + e + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + e) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + e) + " " + t + "\nh400000v" + (40 + e) + "h-400000z";
}, gp = function(e, t) {
	return "M473," + (2713 + e + t) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + e / 5.298 + " -" + e + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + e) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + e) + " " + t + "h400000v" + (40 + e) + "H1017.7z";
}, _p = function(e) {
	var t = e / 2;
	return "M400000 " + e + " H0 L" + t + " 0 l65 45 L145 " + (e - 80) + " H400000z";
}, vp = function(e, t, n) {
	var r = n - 54 - t - e;
	return "M702 " + (e + t) + "H400000" + (40 + e) + "\nH742v" + r + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 " + t + "H400000v" + (40 + e) + "H742z";
}, yp = function(e, t, n) {
	t = 1e3 * t;
	var r = "";
	switch (e) {
		case "sqrtMain":
			r = fp(t, dp);
			break;
		case "sqrtSize1":
			r = pp(t, dp);
			break;
		case "sqrtSize2":
			r = mp(t, dp);
			break;
		case "sqrtSize3":
			r = hp(t, dp);
			break;
		case "sqrtSize4":
			r = gp(t, dp);
			break;
		case "sqrtTall": r = vp(t, dp, n);
	}
	return r;
}, bp = function(e, t) {
	switch (e) {
		case "⎜": return up("M291 0 H417 V" + t + " H291z");
		case "∣": return up("M145 0 H188 V" + t + " H145z");
		case "∥": return up("M145 0 H188 V" + t + " H145z") + up("M367 0 H410 V" + t + " H367z");
		case "⎟": return up("M457 0 H583 V" + t + " H457z");
		case "⎢": return up("M319 0 H403 V" + t + " H319z");
		case "⎥": return up("M263 0 H347 V" + t + " H263z");
		case "⎪": return up("M384 0 H504 V" + t + " H384z");
		case "⏐": return up("M312 0 H355 V" + t + " H312z");
		case "‖": return up("M257 0 H300 V" + t + " H257z") + up("M478 0 H521 V" + t + " H478z");
		default: return "";
	}
}, xp = {
	doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
	doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
	leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
	leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
	leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
	leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
	leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
	leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
	leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
	leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
	leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
	lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
	leftlinesegment: up("M40 281 V428 H0 V94 H40 V241 H400000 v40z"),
	leftbracketunder: up("M0 0 h120 V290 H399995 v120 H0z"),
	leftbracketover: up("M0 440 h120 V150 H399995 v-120 H0z"),
	leftmapsto: up("M40 281 V448H0V74H40V241H400000v40z"),
	leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
	longequal: up("M0 50 h400000 v40H0z m0 194h40000v40H0z"),
	midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
	midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
	oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
	oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
	oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
	oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
	rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
	rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
	rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
	rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
	rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
	rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
	rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
	rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
	rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
	righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
	rightlinesegment: up("M399960 241 V94 h40 V428 h-40 V281 H0 v-40z"),
	rightbracketunder: up("M399995 0 h-120 V290 H0 v120 H400000z"),
	rightbracketover: up("M399995 440 h-120 V150 H0 v-120 H399995z"),
	rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
	twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
	twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
	tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
	tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
	tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
	tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
	vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
	widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
	widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
	widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
	widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
	widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
	widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
	widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
	widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
	baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
	rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
	baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
	rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
	shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
	shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
}, Sp = function(e, t) {
	switch (e) {
		case "lbrack": return "M403 1759 V84 H666 V0 H319 V1759 v" + t + " v1759 v84 h347 v-84\nH403z M403 1759 V0 H319 V1759 v" + t + " v1759 v84 h84z";
		case "rbrack": return "M347 1759 V0 H0 V84 H263 V1759 v" + t + " v1759 H0 v84 H347z\nM347 1759 V0 H263 V1759 v" + t + " v1759 h84z";
		case "vert": return "M145 15 v585 v" + t + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -t + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + t + " v585 h43z";
		case "doublevert": return "M145 15 v585 v" + t + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -t + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + t + " v585 h43z\nM367 15 v585 v" + t + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -t + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M410 15 H367 v585 v" + t + " v585 h43z";
		case "lfloor": return "M319 602 V0 H403 V602 v" + t + " v1715 h263 v84 H319z\nMM319 602 V0 H403 V602 v" + t + " v1715 H319z";
		case "rfloor": return "M319 602 V0 H403 V602 v" + t + " v1799 H0 v-84 H319z\nMM319 602 V0 H403 V602 v" + t + " v1715 H319z";
		case "lceil": return "M403 1759 V84 H666 V0 H319 V1759 v" + t + " v602 h84z\nM403 1759 V0 H319 V1759 v" + t + " v602 h84z";
		case "rceil": return "M347 1759 V0 H0 V84 H263 V1759 v" + t + " v602 h84z\nM347 1759 V0 h-84 V1759 v" + t + " v602 h84z";
		case "lparen": return "M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1\nc-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,\n-36,557 l0," + (t + 84) + "c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,\n949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9\nc0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,\n-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189\nl0,-" + (t + 92) + "c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,\n-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z";
		case "rparen": return "M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,\n63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5\nc11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0," + (t + 9) + "\nc-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664\nc-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11\nc0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17\nc242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558\nl0,-" + (t + 144) + "c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,\n-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z";
		default: throw Error("Unknown stretchy delimiter.");
	}
};
function Cp(e) {
	return "toText" in e;
}
var wp = class {
	constructor(e) {
		this.children = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.children = e, this.classes = [], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = {};
	}
	hasClass(e) {
		return this.classes.includes(e);
	}
	toNode() {
		for (var e = document.createDocumentFragment(), t = 0; t < this.children.length; t++) e.appendChild(this.children[t].toNode());
		return e;
	}
	toMarkup() {
		for (var e = "", t = 0; t < this.children.length; t++) e += this.children[t].toMarkup();
		return e;
	}
	toText() {
		return this.children.map((e) => {
			if (Cp(e)) return e.toText();
			throw Error("Expected MathDomNode with toText, got " + e.constructor.name);
		}).join("");
	}
}, Tp = {
	pt: 1,
	mm: 7227 / 2540,
	cm: 7227 / 254,
	in: 72.27,
	bp: 803 / 800,
	pc: 12,
	dd: 1238 / 1157,
	cc: 14856 / 1157,
	nd: 685 / 642,
	nc: 1370 / 107,
	sp: 1 / 65536,
	px: 803 / 800
}, Ep = {
	ex: !0,
	em: !0,
	mu: !0
}, Dp = function(e) {
	return typeof e != "string" && (e = e.unit), e in Tp || e in Ep || e === "ex";
}, Op = function(e, t) {
	var n;
	if (e.unit in Tp) n = Tp[e.unit] / t.fontMetrics().ptPerEm / t.sizeMultiplier;
	else if (e.unit === "mu") n = t.fontMetrics().cssEmPerMu;
	else {
		var r = t.style.isTight() ? t.havingStyle(t.style.text()) : t;
		if (e.unit === "ex") n = r.fontMetrics().xHeight;
		else if (e.unit === "em") n = r.fontMetrics().quad;
		else throw new I("Invalid unit: '" + e.unit + "'");
		r !== t && (n *= r.sizeMultiplier / t.sizeMultiplier);
	}
	return Math.min(e.number * n, t.maxSize);
}, R = function(e) {
	return +e.toFixed(4) + "em";
}, kp = function(e) {
	return e.filter((e) => e).join(" ");
}, Ap = function(e) {
	var t = "";
	for (var n of Object.keys(e)) {
		var r = e[n];
		r !== void 0 && (t += jf(n) + ":" + r + ";");
	}
	return t;
}, jp = function(e, t, n) {
	if (this.classes = e || [], this.attributes = {}, this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = n || {}, t) {
		t.style.isTight() && this.classes.push("mtight");
		var r = t.getColor();
		r && (this.style.color = r);
	}
}, Mp = function(e) {
	var t = document.createElement(e);
	t.className = kp(this.classes), Object.assign(t.style, this.style);
	for (var n of Object.keys(this.attributes)) t.setAttribute(n, this.attributes[n]);
	for (var r = 0; r < this.children.length; r++) t.appendChild(this.children[r].toNode());
	return t;
}, Np = /[\s"'>/=\x00-\x1f]/, Pp = function(e) {
	var t = "<" + e;
	this.classes.length && (t += " class=\"" + Pf(kp(this.classes)) + "\"");
	var n = Ap(this.style);
	n && (t += " style=\"" + Pf(n) + "\"");
	for (var r of Object.keys(this.attributes)) {
		if (Np.test(r)) throw new I("Invalid attribute name '" + r + "'");
		t += " " + r + "=\"" + Pf(this.attributes[r]) + "\"";
	}
	t += ">";
	for (var i = 0; i < this.children.length; i++) t += this.children[i].toMarkup();
	return t += "</" + e + ">", t;
}, Fp = class {
	constructor(e, t, n, r) {
		this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.width = void 0, this.maxFontSize = void 0, this.style = void 0, this.italic = void 0, jp.call(this, e, n, r), this.children = t || [];
	}
	setAttribute(e, t) {
		this.attributes[e] = t;
	}
	hasClass(e) {
		return this.classes.includes(e);
	}
	toNode() {
		return Mp.call(this, "span");
	}
	toMarkup() {
		return Pp.call(this, "span");
	}
}, Ip = class {
	constructor(e, t, n, r) {
		this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, jp.call(this, t, r), this.children = n || [], this.setAttribute("href", e);
	}
	setAttribute(e, t) {
		this.attributes[e] = t;
	}
	hasClass(e) {
		return this.classes.includes(e);
	}
	toNode() {
		return Mp.call(this, "a");
	}
	toMarkup() {
		return Pp.call(this, "a");
	}
}, Lp = class {
	constructor(e, t, n) {
		this.src = void 0, this.alt = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.alt = t, this.src = e, this.classes = ["mord"], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = n;
	}
	hasClass(e) {
		return this.classes.includes(e);
	}
	toNode() {
		var e = document.createElement("img");
		return e.src = this.src, e.alt = this.alt, e.className = "mord", Object.assign(e.style, this.style), e;
	}
	toMarkup() {
		var e = "<img src=\"" + Pf(this.src) + "\"" + (" alt=\"" + Pf(this.alt) + "\""), t = Ap(this.style);
		return t && (e += " style=\"" + Pf(t) + "\""), e += "'/>", e;
	}
}, Rp = {
	î: "ı̂",
	ï: "ı̈",
	í: "ı́",
	ì: "ı̀"
}, zp = class {
	constructor(e, t, n, r, i, a, o, s) {
		this.text = void 0, this.height = void 0, this.depth = void 0, this.italic = void 0, this.skew = void 0, this.width = void 0, this.maxFontSize = void 0, this.classes = void 0, this.style = void 0, this.text = e, this.height = t || 0, this.depth = n || 0, this.italic = r || 0, this.skew = i || 0, this.width = a || 0, this.classes = o || [], this.style = s || {}, this.maxFontSize = 0;
		var c = sp(this.text.charCodeAt(0));
		c && this.classes.push(c + "_fallback"), /[îïíì]/.test(this.text) && (this.text = Rp[this.text]);
	}
	hasClass(e) {
		return this.classes.includes(e);
	}
	toNode() {
		var e = document.createTextNode(this.text), t = null;
		return this.italic > 0 && (t = document.createElement("span"), t.style.marginRight = R(this.italic)), this.classes.length > 0 && (t ||= document.createElement("span"), t.className = kp(this.classes)), Object.keys(this.style).length > 0 && (t ||= document.createElement("span"), Object.assign(t.style, this.style)), t ? (t.appendChild(e), t) : e;
	}
	toMarkup() {
		var e = !1, t = "<span";
		this.classes.length && (e = !0, t += " class=\"", t += Pf(kp(this.classes)), t += "\"");
		var n = "";
		this.italic > 0 && (n += "margin-right:" + R(this.italic) + ";"), n += Ap(this.style), n && (e = !0, t += " style=\"" + Pf(n) + "\"");
		var r = Pf(this.text);
		return e ? (t += ">", t += r, t += "</span>", t) : r;
	}
}, Bp = class {
	constructor(e, t) {
		this.children = void 0, this.attributes = void 0, this.children = e || [], this.attributes = t || {};
	}
	toNode() {
		var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		for (var t of Object.keys(this.attributes)) e.setAttribute(t, this.attributes[t]);
		for (var n = 0; n < this.children.length; n++) e.appendChild(this.children[n].toNode());
		return e;
	}
	toMarkup() {
		var e = "<svg xmlns=\"http://www.w3.org/2000/svg\"";
		for (var t of Object.keys(this.attributes)) e += " " + t + "=\"" + Pf(this.attributes[t]) + "\"";
		e += ">";
		for (var n = 0; n < this.children.length; n++) e += this.children[n].toMarkup();
		return e += "</svg>", e;
	}
}, Vp = class {
	constructor(e, t) {
		this.pathName = void 0, this.alternate = void 0, this.pathName = e, this.alternate = t;
	}
	toNode() {
		var e = document.createElementNS("http://www.w3.org/2000/svg", "path");
		return this.alternate ? e.setAttribute("d", this.alternate) : e.setAttribute("d", xp[this.pathName]), e;
	}
	toMarkup() {
		return this.alternate ? "<path d=\"" + Pf(this.alternate) + "\"/>" : "<path d=\"" + Pf(xp[this.pathName]) + "\"/>";
	}
}, Hp = class {
	constructor(e) {
		this.attributes = void 0, this.attributes = e || {};
	}
	toNode() {
		var e = document.createElementNS("http://www.w3.org/2000/svg", "line");
		for (var t of Object.keys(this.attributes)) e.setAttribute(t, this.attributes[t]);
		return e;
	}
	toMarkup() {
		var e = "<line";
		for (var t of Object.keys(this.attributes)) e += " " + t + "=\"" + Pf(this.attributes[t]) + "\"";
		return e += "/>", e;
	}
};
function Up(e) {
	if (e instanceof zp) return e;
	throw Error("Expected symbolNode but got " + String(e) + ".");
}
function Wp(e) {
	if (e instanceof Fp) return e;
	throw Error("Expected span<HtmlDomNode> but got " + String(e) + ".");
}
var Gp = (e) => e instanceof Fp || e instanceof Ip || e instanceof wp, Kp = {
	"AMS-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		65: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		66: [
			0,
			.68889,
			0,
			0,
			.66667
		],
		67: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		68: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		69: [
			0,
			.68889,
			0,
			0,
			.66667
		],
		70: [
			0,
			.68889,
			0,
			0,
			.61111
		],
		71: [
			0,
			.68889,
			0,
			0,
			.77778
		],
		72: [
			0,
			.68889,
			0,
			0,
			.77778
		],
		73: [
			0,
			.68889,
			0,
			0,
			.38889
		],
		74: [
			.16667,
			.68889,
			0,
			0,
			.5
		],
		75: [
			0,
			.68889,
			0,
			0,
			.77778
		],
		76: [
			0,
			.68889,
			0,
			0,
			.66667
		],
		77: [
			0,
			.68889,
			0,
			0,
			.94445
		],
		78: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		79: [
			.16667,
			.68889,
			0,
			0,
			.77778
		],
		80: [
			0,
			.68889,
			0,
			0,
			.61111
		],
		81: [
			.16667,
			.68889,
			0,
			0,
			.77778
		],
		82: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		83: [
			0,
			.68889,
			0,
			0,
			.55556
		],
		84: [
			0,
			.68889,
			0,
			0,
			.66667
		],
		85: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		86: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		87: [
			0,
			.68889,
			0,
			0,
			1
		],
		88: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		89: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		90: [
			0,
			.68889,
			0,
			0,
			.66667
		],
		107: [
			0,
			.68889,
			0,
			0,
			.55556
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		165: [
			0,
			.675,
			.025,
			0,
			.75
		],
		174: [
			.15559,
			.69224,
			0,
			0,
			.94666
		],
		240: [
			0,
			.68889,
			0,
			0,
			.55556
		],
		295: [
			0,
			.68889,
			0,
			0,
			.54028
		],
		710: [
			0,
			.825,
			0,
			0,
			2.33334
		],
		732: [
			0,
			.9,
			0,
			0,
			2.33334
		],
		770: [
			0,
			.825,
			0,
			0,
			2.33334
		],
		771: [
			0,
			.9,
			0,
			0,
			2.33334
		],
		989: [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		1008: [
			0,
			.43056,
			.04028,
			0,
			.66667
		],
		8245: [
			0,
			.54986,
			0,
			0,
			.275
		],
		8463: [
			0,
			.68889,
			0,
			0,
			.54028
		],
		8487: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		8498: [
			0,
			.68889,
			0,
			0,
			.55556
		],
		8502: [
			0,
			.68889,
			0,
			0,
			.66667
		],
		8503: [
			0,
			.68889,
			0,
			0,
			.44445
		],
		8504: [
			0,
			.68889,
			0,
			0,
			.66667
		],
		8513: [
			0,
			.68889,
			0,
			0,
			.63889
		],
		8592: [
			-.03598,
			.46402,
			0,
			0,
			.5
		],
		8594: [
			-.03598,
			.46402,
			0,
			0,
			.5
		],
		8602: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8603: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8606: [
			.01354,
			.52239,
			0,
			0,
			1
		],
		8608: [
			.01354,
			.52239,
			0,
			0,
			1
		],
		8610: [
			.01354,
			.52239,
			0,
			0,
			1.11111
		],
		8611: [
			.01354,
			.52239,
			0,
			0,
			1.11111
		],
		8619: [
			0,
			.54986,
			0,
			0,
			1
		],
		8620: [
			0,
			.54986,
			0,
			0,
			1
		],
		8621: [
			-.13313,
			.37788,
			0,
			0,
			1.38889
		],
		8622: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8624: [
			0,
			.69224,
			0,
			0,
			.5
		],
		8625: [
			0,
			.69224,
			0,
			0,
			.5
		],
		8630: [
			0,
			.43056,
			0,
			0,
			1
		],
		8631: [
			0,
			.43056,
			0,
			0,
			1
		],
		8634: [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		8635: [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		8638: [
			.19444,
			.69224,
			0,
			0,
			.41667
		],
		8639: [
			.19444,
			.69224,
			0,
			0,
			.41667
		],
		8642: [
			.19444,
			.69224,
			0,
			0,
			.41667
		],
		8643: [
			.19444,
			.69224,
			0,
			0,
			.41667
		],
		8644: [
			.1808,
			.675,
			0,
			0,
			1
		],
		8646: [
			.1808,
			.675,
			0,
			0,
			1
		],
		8647: [
			.1808,
			.675,
			0,
			0,
			1
		],
		8648: [
			.19444,
			.69224,
			0,
			0,
			.83334
		],
		8649: [
			.1808,
			.675,
			0,
			0,
			1
		],
		8650: [
			.19444,
			.69224,
			0,
			0,
			.83334
		],
		8651: [
			.01354,
			.52239,
			0,
			0,
			1
		],
		8652: [
			.01354,
			.52239,
			0,
			0,
			1
		],
		8653: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8654: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8655: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8666: [
			.13667,
			.63667,
			0,
			0,
			1
		],
		8667: [
			.13667,
			.63667,
			0,
			0,
			1
		],
		8669: [
			-.13313,
			.37788,
			0,
			0,
			1
		],
		8672: [
			-.064,
			.437,
			0,
			0,
			1.334
		],
		8674: [
			-.064,
			.437,
			0,
			0,
			1.334
		],
		8705: [
			0,
			.825,
			0,
			0,
			.5
		],
		8708: [
			0,
			.68889,
			0,
			0,
			.55556
		],
		8709: [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		8717: [
			0,
			.43056,
			0,
			0,
			.42917
		],
		8722: [
			-.03598,
			.46402,
			0,
			0,
			.5
		],
		8724: [
			.08198,
			.69224,
			0,
			0,
			.77778
		],
		8726: [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		8733: [
			0,
			.69224,
			0,
			0,
			.77778
		],
		8736: [
			0,
			.69224,
			0,
			0,
			.72222
		],
		8737: [
			0,
			.69224,
			0,
			0,
			.72222
		],
		8738: [
			.03517,
			.52239,
			0,
			0,
			.72222
		],
		8739: [
			.08167,
			.58167,
			0,
			0,
			.22222
		],
		8740: [
			.25142,
			.74111,
			0,
			0,
			.27778
		],
		8741: [
			.08167,
			.58167,
			0,
			0,
			.38889
		],
		8742: [
			.25142,
			.74111,
			0,
			0,
			.5
		],
		8756: [
			0,
			.69224,
			0,
			0,
			.66667
		],
		8757: [
			0,
			.69224,
			0,
			0,
			.66667
		],
		8764: [
			-.13313,
			.36687,
			0,
			0,
			.77778
		],
		8765: [
			-.13313,
			.37788,
			0,
			0,
			.77778
		],
		8769: [
			-.13313,
			.36687,
			0,
			0,
			.77778
		],
		8770: [
			-.03625,
			.46375,
			0,
			0,
			.77778
		],
		8774: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		8776: [
			-.01688,
			.48312,
			0,
			0,
			.77778
		],
		8778: [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		8782: [
			.06062,
			.54986,
			0,
			0,
			.77778
		],
		8783: [
			.06062,
			.54986,
			0,
			0,
			.77778
		],
		8785: [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		8786: [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		8787: [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		8790: [
			0,
			.69224,
			0,
			0,
			.77778
		],
		8791: [
			.22958,
			.72958,
			0,
			0,
			.77778
		],
		8796: [
			.08198,
			.91667,
			0,
			0,
			.77778
		],
		8806: [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		8807: [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		8808: [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		8809: [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		8812: [
			.25583,
			.75583,
			0,
			0,
			.5
		],
		8814: [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		8815: [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		8816: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		8817: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		8818: [
			.22958,
			.72958,
			0,
			0,
			.77778
		],
		8819: [
			.22958,
			.72958,
			0,
			0,
			.77778
		],
		8822: [
			.1808,
			.675,
			0,
			0,
			.77778
		],
		8823: [
			.1808,
			.675,
			0,
			0,
			.77778
		],
		8828: [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		8829: [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		8830: [
			.22958,
			.72958,
			0,
			0,
			.77778
		],
		8831: [
			.22958,
			.72958,
			0,
			0,
			.77778
		],
		8832: [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		8833: [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		8840: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		8841: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		8842: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		8843: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		8847: [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		8848: [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		8858: [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		8859: [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		8861: [
			.08198,
			.58198,
			0,
			0,
			.77778
		],
		8862: [
			0,
			.675,
			0,
			0,
			.77778
		],
		8863: [
			0,
			.675,
			0,
			0,
			.77778
		],
		8864: [
			0,
			.675,
			0,
			0,
			.77778
		],
		8865: [
			0,
			.675,
			0,
			0,
			.77778
		],
		8872: [
			0,
			.69224,
			0,
			0,
			.61111
		],
		8873: [
			0,
			.69224,
			0,
			0,
			.72222
		],
		8874: [
			0,
			.69224,
			0,
			0,
			.88889
		],
		8876: [
			0,
			.68889,
			0,
			0,
			.61111
		],
		8877: [
			0,
			.68889,
			0,
			0,
			.61111
		],
		8878: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		8879: [
			0,
			.68889,
			0,
			0,
			.72222
		],
		8882: [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		8883: [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		8884: [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		8885: [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		8888: [
			0,
			.54986,
			0,
			0,
			1.11111
		],
		8890: [
			.19444,
			.43056,
			0,
			0,
			.55556
		],
		8891: [
			.19444,
			.69224,
			0,
			0,
			.61111
		],
		8892: [
			.19444,
			.69224,
			0,
			0,
			.61111
		],
		8901: [
			0,
			.54986,
			0,
			0,
			.27778
		],
		8903: [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		8905: [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		8906: [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		8907: [
			0,
			.69224,
			0,
			0,
			.77778
		],
		8908: [
			0,
			.69224,
			0,
			0,
			.77778
		],
		8909: [
			-.03598,
			.46402,
			0,
			0,
			.77778
		],
		8910: [
			0,
			.54986,
			0,
			0,
			.76042
		],
		8911: [
			0,
			.54986,
			0,
			0,
			.76042
		],
		8912: [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		8913: [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		8914: [
			0,
			.54986,
			0,
			0,
			.66667
		],
		8915: [
			0,
			.54986,
			0,
			0,
			.66667
		],
		8916: [
			0,
			.69224,
			0,
			0,
			.66667
		],
		8918: [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		8919: [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		8920: [
			.03517,
			.54986,
			0,
			0,
			1.33334
		],
		8921: [
			.03517,
			.54986,
			0,
			0,
			1.33334
		],
		8922: [
			.38569,
			.88569,
			0,
			0,
			.77778
		],
		8923: [
			.38569,
			.88569,
			0,
			0,
			.77778
		],
		8926: [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		8927: [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		8928: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		8929: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		8934: [
			.23222,
			.74111,
			0,
			0,
			.77778
		],
		8935: [
			.23222,
			.74111,
			0,
			0,
			.77778
		],
		8936: [
			.23222,
			.74111,
			0,
			0,
			.77778
		],
		8937: [
			.23222,
			.74111,
			0,
			0,
			.77778
		],
		8938: [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		8939: [
			.20576,
			.70576,
			0,
			0,
			.77778
		],
		8940: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		8941: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		8994: [
			.19444,
			.69224,
			0,
			0,
			.77778
		],
		8995: [
			.19444,
			.69224,
			0,
			0,
			.77778
		],
		9416: [
			.15559,
			.69224,
			0,
			0,
			.90222
		],
		9484: [
			0,
			.69224,
			0,
			0,
			.5
		],
		9488: [
			0,
			.69224,
			0,
			0,
			.5
		],
		9492: [
			0,
			.37788,
			0,
			0,
			.5
		],
		9496: [
			0,
			.37788,
			0,
			0,
			.5
		],
		9585: [
			.19444,
			.68889,
			0,
			0,
			.88889
		],
		9586: [
			.19444,
			.74111,
			0,
			0,
			.88889
		],
		9632: [
			0,
			.675,
			0,
			0,
			.77778
		],
		9633: [
			0,
			.675,
			0,
			0,
			.77778
		],
		9650: [
			0,
			.54986,
			0,
			0,
			.72222
		],
		9651: [
			0,
			.54986,
			0,
			0,
			.72222
		],
		9654: [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		9660: [
			0,
			.54986,
			0,
			0,
			.72222
		],
		9661: [
			0,
			.54986,
			0,
			0,
			.72222
		],
		9664: [
			.03517,
			.54986,
			0,
			0,
			.77778
		],
		9674: [
			.11111,
			.69224,
			0,
			0,
			.66667
		],
		9733: [
			.19444,
			.69224,
			0,
			0,
			.94445
		],
		10003: [
			0,
			.69224,
			0,
			0,
			.83334
		],
		10016: [
			0,
			.69224,
			0,
			0,
			.83334
		],
		10731: [
			.11111,
			.69224,
			0,
			0,
			.66667
		],
		10846: [
			.19444,
			.75583,
			0,
			0,
			.61111
		],
		10877: [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		10878: [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		10885: [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		10886: [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		10887: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		10888: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		10889: [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		10890: [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		10891: [
			.48256,
			.98256,
			0,
			0,
			.77778
		],
		10892: [
			.48256,
			.98256,
			0,
			0,
			.77778
		],
		10901: [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		10902: [
			.13667,
			.63667,
			0,
			0,
			.77778
		],
		10933: [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		10934: [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		10935: [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		10936: [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		10937: [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		10938: [
			.26167,
			.75726,
			0,
			0,
			.77778
		],
		10949: [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		10950: [
			.25583,
			.75583,
			0,
			0,
			.77778
		],
		10955: [
			.28481,
			.79383,
			0,
			0,
			.77778
		],
		10956: [
			.28481,
			.79383,
			0,
			0,
			.77778
		],
		57350: [
			.08167,
			.58167,
			0,
			0,
			.22222
		],
		57351: [
			.08167,
			.58167,
			0,
			0,
			.38889
		],
		57352: [
			.08167,
			.58167,
			0,
			0,
			.77778
		],
		57353: [
			0,
			.43056,
			.04028,
			0,
			.66667
		],
		57356: [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		57357: [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		57358: [
			.41951,
			.91951,
			0,
			0,
			.77778
		],
		57359: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		57360: [
			.30274,
			.79383,
			0,
			0,
			.77778
		],
		57361: [
			.41951,
			.91951,
			0,
			0,
			.77778
		],
		57366: [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		57367: [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		57368: [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		57369: [
			.25142,
			.75726,
			0,
			0,
			.77778
		],
		57370: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		57371: [
			.13597,
			.63597,
			0,
			0,
			.77778
		]
	},
	"Caligraphic-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		65: [
			0,
			.68333,
			0,
			.19445,
			.79847
		],
		66: [
			0,
			.68333,
			.03041,
			.13889,
			.65681
		],
		67: [
			0,
			.68333,
			.05834,
			.13889,
			.52653
		],
		68: [
			0,
			.68333,
			.02778,
			.08334,
			.77139
		],
		69: [
			0,
			.68333,
			.08944,
			.11111,
			.52778
		],
		70: [
			0,
			.68333,
			.09931,
			.11111,
			.71875
		],
		71: [
			.09722,
			.68333,
			.0593,
			.11111,
			.59487
		],
		72: [
			0,
			.68333,
			.00965,
			.11111,
			.84452
		],
		73: [
			0,
			.68333,
			.07382,
			0,
			.54452
		],
		74: [
			.09722,
			.68333,
			.18472,
			.16667,
			.67778
		],
		75: [
			0,
			.68333,
			.01445,
			.05556,
			.76195
		],
		76: [
			0,
			.68333,
			0,
			.13889,
			.68972
		],
		77: [
			0,
			.68333,
			0,
			.13889,
			1.2009
		],
		78: [
			0,
			.68333,
			.14736,
			.08334,
			.82049
		],
		79: [
			0,
			.68333,
			.02778,
			.11111,
			.79611
		],
		80: [
			0,
			.68333,
			.08222,
			.08334,
			.69556
		],
		81: [
			.09722,
			.68333,
			0,
			.11111,
			.81667
		],
		82: [
			0,
			.68333,
			0,
			.08334,
			.8475
		],
		83: [
			0,
			.68333,
			.075,
			.13889,
			.60556
		],
		84: [
			0,
			.68333,
			.25417,
			0,
			.54464
		],
		85: [
			0,
			.68333,
			.09931,
			.08334,
			.62583
		],
		86: [
			0,
			.68333,
			.08222,
			0,
			.61278
		],
		87: [
			0,
			.68333,
			.08222,
			.08334,
			.98778
		],
		88: [
			0,
			.68333,
			.14643,
			.13889,
			.7133
		],
		89: [
			.09722,
			.68333,
			.08222,
			.08334,
			.66834
		],
		90: [
			0,
			.68333,
			.07944,
			.13889,
			.72473
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		]
	},
	"Fraktur-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		33: [
			0,
			.69141,
			0,
			0,
			.29574
		],
		34: [
			0,
			.69141,
			0,
			0,
			.21471
		],
		38: [
			0,
			.69141,
			0,
			0,
			.73786
		],
		39: [
			0,
			.69141,
			0,
			0,
			.21201
		],
		40: [
			.24982,
			.74947,
			0,
			0,
			.38865
		],
		41: [
			.24982,
			.74947,
			0,
			0,
			.38865
		],
		42: [
			0,
			.62119,
			0,
			0,
			.27764
		],
		43: [
			.08319,
			.58283,
			0,
			0,
			.75623
		],
		44: [
			0,
			.10803,
			0,
			0,
			.27764
		],
		45: [
			.08319,
			.58283,
			0,
			0,
			.75623
		],
		46: [
			0,
			.10803,
			0,
			0,
			.27764
		],
		47: [
			.24982,
			.74947,
			0,
			0,
			.50181
		],
		48: [
			0,
			.47534,
			0,
			0,
			.50181
		],
		49: [
			0,
			.47534,
			0,
			0,
			.50181
		],
		50: [
			0,
			.47534,
			0,
			0,
			.50181
		],
		51: [
			.18906,
			.47534,
			0,
			0,
			.50181
		],
		52: [
			.18906,
			.47534,
			0,
			0,
			.50181
		],
		53: [
			.18906,
			.47534,
			0,
			0,
			.50181
		],
		54: [
			0,
			.69141,
			0,
			0,
			.50181
		],
		55: [
			.18906,
			.47534,
			0,
			0,
			.50181
		],
		56: [
			0,
			.69141,
			0,
			0,
			.50181
		],
		57: [
			.18906,
			.47534,
			0,
			0,
			.50181
		],
		58: [
			0,
			.47534,
			0,
			0,
			.21606
		],
		59: [
			.12604,
			.47534,
			0,
			0,
			.21606
		],
		61: [
			-.13099,
			.36866,
			0,
			0,
			.75623
		],
		63: [
			0,
			.69141,
			0,
			0,
			.36245
		],
		65: [
			0,
			.69141,
			0,
			0,
			.7176
		],
		66: [
			0,
			.69141,
			0,
			0,
			.88397
		],
		67: [
			0,
			.69141,
			0,
			0,
			.61254
		],
		68: [
			0,
			.69141,
			0,
			0,
			.83158
		],
		69: [
			0,
			.69141,
			0,
			0,
			.66278
		],
		70: [
			.12604,
			.69141,
			0,
			0,
			.61119
		],
		71: [
			0,
			.69141,
			0,
			0,
			.78539
		],
		72: [
			.06302,
			.69141,
			0,
			0,
			.7203
		],
		73: [
			0,
			.69141,
			0,
			0,
			.55448
		],
		74: [
			.12604,
			.69141,
			0,
			0,
			.55231
		],
		75: [
			0,
			.69141,
			0,
			0,
			.66845
		],
		76: [
			0,
			.69141,
			0,
			0,
			.66602
		],
		77: [
			0,
			.69141,
			0,
			0,
			1.04953
		],
		78: [
			0,
			.69141,
			0,
			0,
			.83212
		],
		79: [
			0,
			.69141,
			0,
			0,
			.82699
		],
		80: [
			.18906,
			.69141,
			0,
			0,
			.82753
		],
		81: [
			.03781,
			.69141,
			0,
			0,
			.82699
		],
		82: [
			0,
			.69141,
			0,
			0,
			.82807
		],
		83: [
			0,
			.69141,
			0,
			0,
			.82861
		],
		84: [
			0,
			.69141,
			0,
			0,
			.66899
		],
		85: [
			0,
			.69141,
			0,
			0,
			.64576
		],
		86: [
			0,
			.69141,
			0,
			0,
			.83131
		],
		87: [
			0,
			.69141,
			0,
			0,
			1.04602
		],
		88: [
			0,
			.69141,
			0,
			0,
			.71922
		],
		89: [
			.18906,
			.69141,
			0,
			0,
			.83293
		],
		90: [
			.12604,
			.69141,
			0,
			0,
			.60201
		],
		91: [
			.24982,
			.74947,
			0,
			0,
			.27764
		],
		93: [
			.24982,
			.74947,
			0,
			0,
			.27764
		],
		94: [
			0,
			.69141,
			0,
			0,
			.49965
		],
		97: [
			0,
			.47534,
			0,
			0,
			.50046
		],
		98: [
			0,
			.69141,
			0,
			0,
			.51315
		],
		99: [
			0,
			.47534,
			0,
			0,
			.38946
		],
		100: [
			0,
			.62119,
			0,
			0,
			.49857
		],
		101: [
			0,
			.47534,
			0,
			0,
			.40053
		],
		102: [
			.18906,
			.69141,
			0,
			0,
			.32626
		],
		103: [
			.18906,
			.47534,
			0,
			0,
			.5037
		],
		104: [
			.18906,
			.69141,
			0,
			0,
			.52126
		],
		105: [
			0,
			.69141,
			0,
			0,
			.27899
		],
		106: [
			0,
			.69141,
			0,
			0,
			.28088
		],
		107: [
			0,
			.69141,
			0,
			0,
			.38946
		],
		108: [
			0,
			.69141,
			0,
			0,
			.27953
		],
		109: [
			0,
			.47534,
			0,
			0,
			.76676
		],
		110: [
			0,
			.47534,
			0,
			0,
			.52666
		],
		111: [
			0,
			.47534,
			0,
			0,
			.48885
		],
		112: [
			.18906,
			.52396,
			0,
			0,
			.50046
		],
		113: [
			.18906,
			.47534,
			0,
			0,
			.48912
		],
		114: [
			0,
			.47534,
			0,
			0,
			.38919
		],
		115: [
			0,
			.47534,
			0,
			0,
			.44266
		],
		116: [
			0,
			.62119,
			0,
			0,
			.33301
		],
		117: [
			0,
			.47534,
			0,
			0,
			.5172
		],
		118: [
			0,
			.52396,
			0,
			0,
			.5118
		],
		119: [
			0,
			.52396,
			0,
			0,
			.77351
		],
		120: [
			.18906,
			.47534,
			0,
			0,
			.38865
		],
		121: [
			.18906,
			.47534,
			0,
			0,
			.49884
		],
		122: [
			.18906,
			.47534,
			0,
			0,
			.39054
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		8216: [
			0,
			.69141,
			0,
			0,
			.21471
		],
		8217: [
			0,
			.69141,
			0,
			0,
			.21471
		],
		58112: [
			0,
			.62119,
			0,
			0,
			.49749
		],
		58113: [
			0,
			.62119,
			0,
			0,
			.4983
		],
		58114: [
			.18906,
			.69141,
			0,
			0,
			.33328
		],
		58115: [
			.18906,
			.69141,
			0,
			0,
			.32923
		],
		58116: [
			.18906,
			.47534,
			0,
			0,
			.50343
		],
		58117: [
			0,
			.69141,
			0,
			0,
			.33301
		],
		58118: [
			0,
			.62119,
			0,
			0,
			.33409
		],
		58119: [
			0,
			.47534,
			0,
			0,
			.50073
		]
	},
	"Main-Bold": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		33: [
			0,
			.69444,
			0,
			0,
			.35
		],
		34: [
			0,
			.69444,
			0,
			0,
			.60278
		],
		35: [
			.19444,
			.69444,
			0,
			0,
			.95833
		],
		36: [
			.05556,
			.75,
			0,
			0,
			.575
		],
		37: [
			.05556,
			.75,
			0,
			0,
			.95833
		],
		38: [
			0,
			.69444,
			0,
			0,
			.89444
		],
		39: [
			0,
			.69444,
			0,
			0,
			.31944
		],
		40: [
			.25,
			.75,
			0,
			0,
			.44722
		],
		41: [
			.25,
			.75,
			0,
			0,
			.44722
		],
		42: [
			0,
			.75,
			0,
			0,
			.575
		],
		43: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		44: [
			.19444,
			.15556,
			0,
			0,
			.31944
		],
		45: [
			0,
			.44444,
			0,
			0,
			.38333
		],
		46: [
			0,
			.15556,
			0,
			0,
			.31944
		],
		47: [
			.25,
			.75,
			0,
			0,
			.575
		],
		48: [
			0,
			.64444,
			0,
			0,
			.575
		],
		49: [
			0,
			.64444,
			0,
			0,
			.575
		],
		50: [
			0,
			.64444,
			0,
			0,
			.575
		],
		51: [
			0,
			.64444,
			0,
			0,
			.575
		],
		52: [
			0,
			.64444,
			0,
			0,
			.575
		],
		53: [
			0,
			.64444,
			0,
			0,
			.575
		],
		54: [
			0,
			.64444,
			0,
			0,
			.575
		],
		55: [
			0,
			.64444,
			0,
			0,
			.575
		],
		56: [
			0,
			.64444,
			0,
			0,
			.575
		],
		57: [
			0,
			.64444,
			0,
			0,
			.575
		],
		58: [
			0,
			.44444,
			0,
			0,
			.31944
		],
		59: [
			.19444,
			.44444,
			0,
			0,
			.31944
		],
		60: [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		61: [
			-.10889,
			.39111,
			0,
			0,
			.89444
		],
		62: [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		63: [
			0,
			.69444,
			0,
			0,
			.54305
		],
		64: [
			0,
			.69444,
			0,
			0,
			.89444
		],
		65: [
			0,
			.68611,
			0,
			0,
			.86944
		],
		66: [
			0,
			.68611,
			0,
			0,
			.81805
		],
		67: [
			0,
			.68611,
			0,
			0,
			.83055
		],
		68: [
			0,
			.68611,
			0,
			0,
			.88194
		],
		69: [
			0,
			.68611,
			0,
			0,
			.75555
		],
		70: [
			0,
			.68611,
			0,
			0,
			.72361
		],
		71: [
			0,
			.68611,
			0,
			0,
			.90416
		],
		72: [
			0,
			.68611,
			0,
			0,
			.9
		],
		73: [
			0,
			.68611,
			0,
			0,
			.43611
		],
		74: [
			0,
			.68611,
			0,
			0,
			.59444
		],
		75: [
			0,
			.68611,
			0,
			0,
			.90138
		],
		76: [
			0,
			.68611,
			0,
			0,
			.69166
		],
		77: [
			0,
			.68611,
			0,
			0,
			1.09166
		],
		78: [
			0,
			.68611,
			0,
			0,
			.9
		],
		79: [
			0,
			.68611,
			0,
			0,
			.86388
		],
		80: [
			0,
			.68611,
			0,
			0,
			.78611
		],
		81: [
			.19444,
			.68611,
			0,
			0,
			.86388
		],
		82: [
			0,
			.68611,
			0,
			0,
			.8625
		],
		83: [
			0,
			.68611,
			0,
			0,
			.63889
		],
		84: [
			0,
			.68611,
			0,
			0,
			.8
		],
		85: [
			0,
			.68611,
			0,
			0,
			.88472
		],
		86: [
			0,
			.68611,
			.01597,
			0,
			.86944
		],
		87: [
			0,
			.68611,
			.01597,
			0,
			1.18888
		],
		88: [
			0,
			.68611,
			0,
			0,
			.86944
		],
		89: [
			0,
			.68611,
			.02875,
			0,
			.86944
		],
		90: [
			0,
			.68611,
			0,
			0,
			.70277
		],
		91: [
			.25,
			.75,
			0,
			0,
			.31944
		],
		92: [
			.25,
			.75,
			0,
			0,
			.575
		],
		93: [
			.25,
			.75,
			0,
			0,
			.31944
		],
		94: [
			0,
			.69444,
			0,
			0,
			.575
		],
		95: [
			.31,
			.13444,
			.03194,
			0,
			.575
		],
		97: [
			0,
			.44444,
			0,
			0,
			.55902
		],
		98: [
			0,
			.69444,
			0,
			0,
			.63889
		],
		99: [
			0,
			.44444,
			0,
			0,
			.51111
		],
		100: [
			0,
			.69444,
			0,
			0,
			.63889
		],
		101: [
			0,
			.44444,
			0,
			0,
			.52708
		],
		102: [
			0,
			.69444,
			.10903,
			0,
			.35139
		],
		103: [
			.19444,
			.44444,
			.01597,
			0,
			.575
		],
		104: [
			0,
			.69444,
			0,
			0,
			.63889
		],
		105: [
			0,
			.69444,
			0,
			0,
			.31944
		],
		106: [
			.19444,
			.69444,
			0,
			0,
			.35139
		],
		107: [
			0,
			.69444,
			0,
			0,
			.60694
		],
		108: [
			0,
			.69444,
			0,
			0,
			.31944
		],
		109: [
			0,
			.44444,
			0,
			0,
			.95833
		],
		110: [
			0,
			.44444,
			0,
			0,
			.63889
		],
		111: [
			0,
			.44444,
			0,
			0,
			.575
		],
		112: [
			.19444,
			.44444,
			0,
			0,
			.63889
		],
		113: [
			.19444,
			.44444,
			0,
			0,
			.60694
		],
		114: [
			0,
			.44444,
			0,
			0,
			.47361
		],
		115: [
			0,
			.44444,
			0,
			0,
			.45361
		],
		116: [
			0,
			.63492,
			0,
			0,
			.44722
		],
		117: [
			0,
			.44444,
			0,
			0,
			.63889
		],
		118: [
			0,
			.44444,
			.01597,
			0,
			.60694
		],
		119: [
			0,
			.44444,
			.01597,
			0,
			.83055
		],
		120: [
			0,
			.44444,
			0,
			0,
			.60694
		],
		121: [
			.19444,
			.44444,
			.01597,
			0,
			.60694
		],
		122: [
			0,
			.44444,
			0,
			0,
			.51111
		],
		123: [
			.25,
			.75,
			0,
			0,
			.575
		],
		124: [
			.25,
			.75,
			0,
			0,
			.31944
		],
		125: [
			.25,
			.75,
			0,
			0,
			.575
		],
		126: [
			.35,
			.34444,
			0,
			0,
			.575
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		163: [
			0,
			.69444,
			0,
			0,
			.86853
		],
		168: [
			0,
			.69444,
			0,
			0,
			.575
		],
		172: [
			0,
			.44444,
			0,
			0,
			.76666
		],
		176: [
			0,
			.69444,
			0,
			0,
			.86944
		],
		177: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		184: [
			.17014,
			0,
			0,
			0,
			.51111
		],
		198: [
			0,
			.68611,
			0,
			0,
			1.04166
		],
		215: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		216: [
			.04861,
			.73472,
			0,
			0,
			.89444
		],
		223: [
			0,
			.69444,
			0,
			0,
			.59722
		],
		230: [
			0,
			.44444,
			0,
			0,
			.83055
		],
		247: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		248: [
			.09722,
			.54167,
			0,
			0,
			.575
		],
		305: [
			0,
			.44444,
			0,
			0,
			.31944
		],
		338: [
			0,
			.68611,
			0,
			0,
			1.16944
		],
		339: [
			0,
			.44444,
			0,
			0,
			.89444
		],
		567: [
			.19444,
			.44444,
			0,
			0,
			.35139
		],
		710: [
			0,
			.69444,
			0,
			0,
			.575
		],
		711: [
			0,
			.63194,
			0,
			0,
			.575
		],
		713: [
			0,
			.59611,
			0,
			0,
			.575
		],
		714: [
			0,
			.69444,
			0,
			0,
			.575
		],
		715: [
			0,
			.69444,
			0,
			0,
			.575
		],
		728: [
			0,
			.69444,
			0,
			0,
			.575
		],
		729: [
			0,
			.69444,
			0,
			0,
			.31944
		],
		730: [
			0,
			.69444,
			0,
			0,
			.86944
		],
		732: [
			0,
			.69444,
			0,
			0,
			.575
		],
		733: [
			0,
			.69444,
			0,
			0,
			.575
		],
		915: [
			0,
			.68611,
			0,
			0,
			.69166
		],
		916: [
			0,
			.68611,
			0,
			0,
			.95833
		],
		920: [
			0,
			.68611,
			0,
			0,
			.89444
		],
		923: [
			0,
			.68611,
			0,
			0,
			.80555
		],
		926: [
			0,
			.68611,
			0,
			0,
			.76666
		],
		928: [
			0,
			.68611,
			0,
			0,
			.9
		],
		931: [
			0,
			.68611,
			0,
			0,
			.83055
		],
		933: [
			0,
			.68611,
			0,
			0,
			.89444
		],
		934: [
			0,
			.68611,
			0,
			0,
			.83055
		],
		936: [
			0,
			.68611,
			0,
			0,
			.89444
		],
		937: [
			0,
			.68611,
			0,
			0,
			.83055
		],
		8211: [
			0,
			.44444,
			.03194,
			0,
			.575
		],
		8212: [
			0,
			.44444,
			.03194,
			0,
			1.14999
		],
		8216: [
			0,
			.69444,
			0,
			0,
			.31944
		],
		8217: [
			0,
			.69444,
			0,
			0,
			.31944
		],
		8220: [
			0,
			.69444,
			0,
			0,
			.60278
		],
		8221: [
			0,
			.69444,
			0,
			0,
			.60278
		],
		8224: [
			.19444,
			.69444,
			0,
			0,
			.51111
		],
		8225: [
			.19444,
			.69444,
			0,
			0,
			.51111
		],
		8242: [
			0,
			.55556,
			0,
			0,
			.34444
		],
		8407: [
			0,
			.72444,
			.15486,
			0,
			.575
		],
		8463: [
			0,
			.69444,
			0,
			0,
			.66759
		],
		8465: [
			0,
			.69444,
			0,
			0,
			.83055
		],
		8467: [
			0,
			.69444,
			0,
			0,
			.47361
		],
		8472: [
			.19444,
			.44444,
			0,
			0,
			.74027
		],
		8476: [
			0,
			.69444,
			0,
			0,
			.83055
		],
		8501: [
			0,
			.69444,
			0,
			0,
			.70277
		],
		8592: [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		8593: [
			.19444,
			.69444,
			0,
			0,
			.575
		],
		8594: [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		8595: [
			.19444,
			.69444,
			0,
			0,
			.575
		],
		8596: [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		8597: [
			.25,
			.75,
			0,
			0,
			.575
		],
		8598: [
			.19444,
			.69444,
			0,
			0,
			1.14999
		],
		8599: [
			.19444,
			.69444,
			0,
			0,
			1.14999
		],
		8600: [
			.19444,
			.69444,
			0,
			0,
			1.14999
		],
		8601: [
			.19444,
			.69444,
			0,
			0,
			1.14999
		],
		8636: [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		8637: [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		8640: [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		8641: [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		8656: [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		8657: [
			.19444,
			.69444,
			0,
			0,
			.70277
		],
		8658: [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		8659: [
			.19444,
			.69444,
			0,
			0,
			.70277
		],
		8660: [
			-.10889,
			.39111,
			0,
			0,
			1.14999
		],
		8661: [
			.25,
			.75,
			0,
			0,
			.70277
		],
		8704: [
			0,
			.69444,
			0,
			0,
			.63889
		],
		8706: [
			0,
			.69444,
			.06389,
			0,
			.62847
		],
		8707: [
			0,
			.69444,
			0,
			0,
			.63889
		],
		8709: [
			.05556,
			.75,
			0,
			0,
			.575
		],
		8711: [
			0,
			.68611,
			0,
			0,
			.95833
		],
		8712: [
			.08556,
			.58556,
			0,
			0,
			.76666
		],
		8715: [
			.08556,
			.58556,
			0,
			0,
			.76666
		],
		8722: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		8723: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		8725: [
			.25,
			.75,
			0,
			0,
			.575
		],
		8726: [
			.25,
			.75,
			0,
			0,
			.575
		],
		8727: [
			-.02778,
			.47222,
			0,
			0,
			.575
		],
		8728: [
			-.02639,
			.47361,
			0,
			0,
			.575
		],
		8729: [
			-.02639,
			.47361,
			0,
			0,
			.575
		],
		8730: [
			.18,
			.82,
			0,
			0,
			.95833
		],
		8733: [
			0,
			.44444,
			0,
			0,
			.89444
		],
		8734: [
			0,
			.44444,
			0,
			0,
			1.14999
		],
		8736: [
			0,
			.69224,
			0,
			0,
			.72222
		],
		8739: [
			.25,
			.75,
			0,
			0,
			.31944
		],
		8741: [
			.25,
			.75,
			0,
			0,
			.575
		],
		8743: [
			0,
			.55556,
			0,
			0,
			.76666
		],
		8744: [
			0,
			.55556,
			0,
			0,
			.76666
		],
		8745: [
			0,
			.55556,
			0,
			0,
			.76666
		],
		8746: [
			0,
			.55556,
			0,
			0,
			.76666
		],
		8747: [
			.19444,
			.69444,
			.12778,
			0,
			.56875
		],
		8764: [
			-.10889,
			.39111,
			0,
			0,
			.89444
		],
		8768: [
			.19444,
			.69444,
			0,
			0,
			.31944
		],
		8771: [
			.00222,
			.50222,
			0,
			0,
			.89444
		],
		8773: [
			.027,
			.638,
			0,
			0,
			.894
		],
		8776: [
			.02444,
			.52444,
			0,
			0,
			.89444
		],
		8781: [
			.00222,
			.50222,
			0,
			0,
			.89444
		],
		8801: [
			.00222,
			.50222,
			0,
			0,
			.89444
		],
		8804: [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		8805: [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		8810: [
			.08556,
			.58556,
			0,
			0,
			1.14999
		],
		8811: [
			.08556,
			.58556,
			0,
			0,
			1.14999
		],
		8826: [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		8827: [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		8834: [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		8835: [
			.08556,
			.58556,
			0,
			0,
			.89444
		],
		8838: [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		8839: [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		8846: [
			0,
			.55556,
			0,
			0,
			.76666
		],
		8849: [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		8850: [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		8851: [
			0,
			.55556,
			0,
			0,
			.76666
		],
		8852: [
			0,
			.55556,
			0,
			0,
			.76666
		],
		8853: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		8854: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		8855: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		8856: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		8857: [
			.13333,
			.63333,
			0,
			0,
			.89444
		],
		8866: [
			0,
			.69444,
			0,
			0,
			.70277
		],
		8867: [
			0,
			.69444,
			0,
			0,
			.70277
		],
		8868: [
			0,
			.69444,
			0,
			0,
			.89444
		],
		8869: [
			0,
			.69444,
			0,
			0,
			.89444
		],
		8900: [
			-.02639,
			.47361,
			0,
			0,
			.575
		],
		8901: [
			-.02639,
			.47361,
			0,
			0,
			.31944
		],
		8902: [
			-.02778,
			.47222,
			0,
			0,
			.575
		],
		8968: [
			.25,
			.75,
			0,
			0,
			.51111
		],
		8969: [
			.25,
			.75,
			0,
			0,
			.51111
		],
		8970: [
			.25,
			.75,
			0,
			0,
			.51111
		],
		8971: [
			.25,
			.75,
			0,
			0,
			.51111
		],
		8994: [
			-.13889,
			.36111,
			0,
			0,
			1.14999
		],
		8995: [
			-.13889,
			.36111,
			0,
			0,
			1.14999
		],
		9651: [
			.19444,
			.69444,
			0,
			0,
			1.02222
		],
		9657: [
			-.02778,
			.47222,
			0,
			0,
			.575
		],
		9661: [
			.19444,
			.69444,
			0,
			0,
			1.02222
		],
		9667: [
			-.02778,
			.47222,
			0,
			0,
			.575
		],
		9711: [
			.19444,
			.69444,
			0,
			0,
			1.14999
		],
		9824: [
			.12963,
			.69444,
			0,
			0,
			.89444
		],
		9825: [
			.12963,
			.69444,
			0,
			0,
			.89444
		],
		9826: [
			.12963,
			.69444,
			0,
			0,
			.89444
		],
		9827: [
			.12963,
			.69444,
			0,
			0,
			.89444
		],
		9837: [
			0,
			.75,
			0,
			0,
			.44722
		],
		9838: [
			.19444,
			.69444,
			0,
			0,
			.44722
		],
		9839: [
			.19444,
			.69444,
			0,
			0,
			.44722
		],
		10216: [
			.25,
			.75,
			0,
			0,
			.44722
		],
		10217: [
			.25,
			.75,
			0,
			0,
			.44722
		],
		10815: [
			0,
			.68611,
			0,
			0,
			.9
		],
		10927: [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		10928: [
			.19667,
			.69667,
			0,
			0,
			.89444
		],
		57376: [
			.19444,
			.69444,
			0,
			0,
			0
		]
	},
	"Main-BoldItalic": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		33: [
			0,
			.69444,
			.11417,
			0,
			.38611
		],
		34: [
			0,
			.69444,
			.07939,
			0,
			.62055
		],
		35: [
			.19444,
			.69444,
			.06833,
			0,
			.94444
		],
		37: [
			.05556,
			.75,
			.12861,
			0,
			.94444
		],
		38: [
			0,
			.69444,
			.08528,
			0,
			.88555
		],
		39: [
			0,
			.69444,
			.12945,
			0,
			.35555
		],
		40: [
			.25,
			.75,
			.15806,
			0,
			.47333
		],
		41: [
			.25,
			.75,
			.03306,
			0,
			.47333
		],
		42: [
			0,
			.75,
			.14333,
			0,
			.59111
		],
		43: [
			.10333,
			.60333,
			.03306,
			0,
			.88555
		],
		44: [
			.19444,
			.14722,
			0,
			0,
			.35555
		],
		45: [
			0,
			.44444,
			.02611,
			0,
			.41444
		],
		46: [
			0,
			.14722,
			0,
			0,
			.35555
		],
		47: [
			.25,
			.75,
			.15806,
			0,
			.59111
		],
		48: [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		49: [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		50: [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		51: [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		52: [
			.19444,
			.64444,
			.13167,
			0,
			.59111
		],
		53: [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		54: [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		55: [
			.19444,
			.64444,
			.13167,
			0,
			.59111
		],
		56: [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		57: [
			0,
			.64444,
			.13167,
			0,
			.59111
		],
		58: [
			0,
			.44444,
			.06695,
			0,
			.35555
		],
		59: [
			.19444,
			.44444,
			.06695,
			0,
			.35555
		],
		61: [
			-.10889,
			.39111,
			.06833,
			0,
			.88555
		],
		63: [
			0,
			.69444,
			.11472,
			0,
			.59111
		],
		64: [
			0,
			.69444,
			.09208,
			0,
			.88555
		],
		65: [
			0,
			.68611,
			0,
			0,
			.86555
		],
		66: [
			0,
			.68611,
			.0992,
			0,
			.81666
		],
		67: [
			0,
			.68611,
			.14208,
			0,
			.82666
		],
		68: [
			0,
			.68611,
			.09062,
			0,
			.87555
		],
		69: [
			0,
			.68611,
			.11431,
			0,
			.75666
		],
		70: [
			0,
			.68611,
			.12903,
			0,
			.72722
		],
		71: [
			0,
			.68611,
			.07347,
			0,
			.89527
		],
		72: [
			0,
			.68611,
			.17208,
			0,
			.8961
		],
		73: [
			0,
			.68611,
			.15681,
			0,
			.47166
		],
		74: [
			0,
			.68611,
			.145,
			0,
			.61055
		],
		75: [
			0,
			.68611,
			.14208,
			0,
			.89499
		],
		76: [
			0,
			.68611,
			0,
			0,
			.69777
		],
		77: [
			0,
			.68611,
			.17208,
			0,
			1.07277
		],
		78: [
			0,
			.68611,
			.17208,
			0,
			.8961
		],
		79: [
			0,
			.68611,
			.09062,
			0,
			.85499
		],
		80: [
			0,
			.68611,
			.0992,
			0,
			.78721
		],
		81: [
			.19444,
			.68611,
			.09062,
			0,
			.85499
		],
		82: [
			0,
			.68611,
			.02559,
			0,
			.85944
		],
		83: [
			0,
			.68611,
			.11264,
			0,
			.64999
		],
		84: [
			0,
			.68611,
			.12903,
			0,
			.7961
		],
		85: [
			0,
			.68611,
			.17208,
			0,
			.88083
		],
		86: [
			0,
			.68611,
			.18625,
			0,
			.86555
		],
		87: [
			0,
			.68611,
			.18625,
			0,
			1.15999
		],
		88: [
			0,
			.68611,
			.15681,
			0,
			.86555
		],
		89: [
			0,
			.68611,
			.19803,
			0,
			.86555
		],
		90: [
			0,
			.68611,
			.14208,
			0,
			.70888
		],
		91: [
			.25,
			.75,
			.1875,
			0,
			.35611
		],
		93: [
			.25,
			.75,
			.09972,
			0,
			.35611
		],
		94: [
			0,
			.69444,
			.06709,
			0,
			.59111
		],
		95: [
			.31,
			.13444,
			.09811,
			0,
			.59111
		],
		97: [
			0,
			.44444,
			.09426,
			0,
			.59111
		],
		98: [
			0,
			.69444,
			.07861,
			0,
			.53222
		],
		99: [
			0,
			.44444,
			.05222,
			0,
			.53222
		],
		100: [
			0,
			.69444,
			.10861,
			0,
			.59111
		],
		101: [
			0,
			.44444,
			.085,
			0,
			.53222
		],
		102: [
			.19444,
			.69444,
			.21778,
			0,
			.4
		],
		103: [
			.19444,
			.44444,
			.105,
			0,
			.53222
		],
		104: [
			0,
			.69444,
			.09426,
			0,
			.59111
		],
		105: [
			0,
			.69326,
			.11387,
			0,
			.35555
		],
		106: [
			.19444,
			.69326,
			.1672,
			0,
			.35555
		],
		107: [
			0,
			.69444,
			.11111,
			0,
			.53222
		],
		108: [
			0,
			.69444,
			.10861,
			0,
			.29666
		],
		109: [
			0,
			.44444,
			.09426,
			0,
			.94444
		],
		110: [
			0,
			.44444,
			.09426,
			0,
			.64999
		],
		111: [
			0,
			.44444,
			.07861,
			0,
			.59111
		],
		112: [
			.19444,
			.44444,
			.07861,
			0,
			.59111
		],
		113: [
			.19444,
			.44444,
			.105,
			0,
			.53222
		],
		114: [
			0,
			.44444,
			.11111,
			0,
			.50167
		],
		115: [
			0,
			.44444,
			.08167,
			0,
			.48694
		],
		116: [
			0,
			.63492,
			.09639,
			0,
			.385
		],
		117: [
			0,
			.44444,
			.09426,
			0,
			.62055
		],
		118: [
			0,
			.44444,
			.11111,
			0,
			.53222
		],
		119: [
			0,
			.44444,
			.11111,
			0,
			.76777
		],
		120: [
			0,
			.44444,
			.12583,
			0,
			.56055
		],
		121: [
			.19444,
			.44444,
			.105,
			0,
			.56166
		],
		122: [
			0,
			.44444,
			.13889,
			0,
			.49055
		],
		126: [
			.35,
			.34444,
			.11472,
			0,
			.59111
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		168: [
			0,
			.69444,
			.11473,
			0,
			.59111
		],
		176: [
			0,
			.69444,
			0,
			0,
			.94888
		],
		184: [
			.17014,
			0,
			0,
			0,
			.53222
		],
		198: [
			0,
			.68611,
			.11431,
			0,
			1.02277
		],
		216: [
			.04861,
			.73472,
			.09062,
			0,
			.88555
		],
		223: [
			.19444,
			.69444,
			.09736,
			0,
			.665
		],
		230: [
			0,
			.44444,
			.085,
			0,
			.82666
		],
		248: [
			.09722,
			.54167,
			.09458,
			0,
			.59111
		],
		305: [
			0,
			.44444,
			.09426,
			0,
			.35555
		],
		338: [
			0,
			.68611,
			.11431,
			0,
			1.14054
		],
		339: [
			0,
			.44444,
			.085,
			0,
			.82666
		],
		567: [
			.19444,
			.44444,
			.04611,
			0,
			.385
		],
		710: [
			0,
			.69444,
			.06709,
			0,
			.59111
		],
		711: [
			0,
			.63194,
			.08271,
			0,
			.59111
		],
		713: [
			0,
			.59444,
			.10444,
			0,
			.59111
		],
		714: [
			0,
			.69444,
			.08528,
			0,
			.59111
		],
		715: [
			0,
			.69444,
			0,
			0,
			.59111
		],
		728: [
			0,
			.69444,
			.10333,
			0,
			.59111
		],
		729: [
			0,
			.69444,
			.12945,
			0,
			.35555
		],
		730: [
			0,
			.69444,
			0,
			0,
			.94888
		],
		732: [
			0,
			.69444,
			.11472,
			0,
			.59111
		],
		733: [
			0,
			.69444,
			.11472,
			0,
			.59111
		],
		915: [
			0,
			.68611,
			.12903,
			0,
			.69777
		],
		916: [
			0,
			.68611,
			0,
			0,
			.94444
		],
		920: [
			0,
			.68611,
			.09062,
			0,
			.88555
		],
		923: [
			0,
			.68611,
			0,
			0,
			.80666
		],
		926: [
			0,
			.68611,
			.15092,
			0,
			.76777
		],
		928: [
			0,
			.68611,
			.17208,
			0,
			.8961
		],
		931: [
			0,
			.68611,
			.11431,
			0,
			.82666
		],
		933: [
			0,
			.68611,
			.10778,
			0,
			.88555
		],
		934: [
			0,
			.68611,
			.05632,
			0,
			.82666
		],
		936: [
			0,
			.68611,
			.10778,
			0,
			.88555
		],
		937: [
			0,
			.68611,
			.0992,
			0,
			.82666
		],
		8211: [
			0,
			.44444,
			.09811,
			0,
			.59111
		],
		8212: [
			0,
			.44444,
			.09811,
			0,
			1.18221
		],
		8216: [
			0,
			.69444,
			.12945,
			0,
			.35555
		],
		8217: [
			0,
			.69444,
			.12945,
			0,
			.35555
		],
		8220: [
			0,
			.69444,
			.16772,
			0,
			.62055
		],
		8221: [
			0,
			.69444,
			.07939,
			0,
			.62055
		]
	},
	"Main-Italic": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		33: [
			0,
			.69444,
			.12417,
			0,
			.30667
		],
		34: [
			0,
			.69444,
			.06961,
			0,
			.51444
		],
		35: [
			.19444,
			.69444,
			.06616,
			0,
			.81777
		],
		37: [
			.05556,
			.75,
			.13639,
			0,
			.81777
		],
		38: [
			0,
			.69444,
			.09694,
			0,
			.76666
		],
		39: [
			0,
			.69444,
			.12417,
			0,
			.30667
		],
		40: [
			.25,
			.75,
			.16194,
			0,
			.40889
		],
		41: [
			.25,
			.75,
			.03694,
			0,
			.40889
		],
		42: [
			0,
			.75,
			.14917,
			0,
			.51111
		],
		43: [
			.05667,
			.56167,
			.03694,
			0,
			.76666
		],
		44: [
			.19444,
			.10556,
			0,
			0,
			.30667
		],
		45: [
			0,
			.43056,
			.02826,
			0,
			.35778
		],
		46: [
			0,
			.10556,
			0,
			0,
			.30667
		],
		47: [
			.25,
			.75,
			.16194,
			0,
			.51111
		],
		48: [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		49: [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		50: [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		51: [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		52: [
			.19444,
			.64444,
			.13556,
			0,
			.51111
		],
		53: [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		54: [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		55: [
			.19444,
			.64444,
			.13556,
			0,
			.51111
		],
		56: [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		57: [
			0,
			.64444,
			.13556,
			0,
			.51111
		],
		58: [
			0,
			.43056,
			.0582,
			0,
			.30667
		],
		59: [
			.19444,
			.43056,
			.0582,
			0,
			.30667
		],
		61: [
			-.13313,
			.36687,
			.06616,
			0,
			.76666
		],
		63: [
			0,
			.69444,
			.1225,
			0,
			.51111
		],
		64: [
			0,
			.69444,
			.09597,
			0,
			.76666
		],
		65: [
			0,
			.68333,
			0,
			0,
			.74333
		],
		66: [
			0,
			.68333,
			.10257,
			0,
			.70389
		],
		67: [
			0,
			.68333,
			.14528,
			0,
			.71555
		],
		68: [
			0,
			.68333,
			.09403,
			0,
			.755
		],
		69: [
			0,
			.68333,
			.12028,
			0,
			.67833
		],
		70: [
			0,
			.68333,
			.13305,
			0,
			.65277
		],
		71: [
			0,
			.68333,
			.08722,
			0,
			.77361
		],
		72: [
			0,
			.68333,
			.16389,
			0,
			.74333
		],
		73: [
			0,
			.68333,
			.15806,
			0,
			.38555
		],
		74: [
			0,
			.68333,
			.14028,
			0,
			.525
		],
		75: [
			0,
			.68333,
			.14528,
			0,
			.76888
		],
		76: [
			0,
			.68333,
			0,
			0,
			.62722
		],
		77: [
			0,
			.68333,
			.16389,
			0,
			.89666
		],
		78: [
			0,
			.68333,
			.16389,
			0,
			.74333
		],
		79: [
			0,
			.68333,
			.09403,
			0,
			.76666
		],
		80: [
			0,
			.68333,
			.10257,
			0,
			.67833
		],
		81: [
			.19444,
			.68333,
			.09403,
			0,
			.76666
		],
		82: [
			0,
			.68333,
			.03868,
			0,
			.72944
		],
		83: [
			0,
			.68333,
			.11972,
			0,
			.56222
		],
		84: [
			0,
			.68333,
			.13305,
			0,
			.71555
		],
		85: [
			0,
			.68333,
			.16389,
			0,
			.74333
		],
		86: [
			0,
			.68333,
			.18361,
			0,
			.74333
		],
		87: [
			0,
			.68333,
			.18361,
			0,
			.99888
		],
		88: [
			0,
			.68333,
			.15806,
			0,
			.74333
		],
		89: [
			0,
			.68333,
			.19383,
			0,
			.74333
		],
		90: [
			0,
			.68333,
			.14528,
			0,
			.61333
		],
		91: [
			.25,
			.75,
			.1875,
			0,
			.30667
		],
		93: [
			.25,
			.75,
			.10528,
			0,
			.30667
		],
		94: [
			0,
			.69444,
			.06646,
			0,
			.51111
		],
		95: [
			.31,
			.12056,
			.09208,
			0,
			.51111
		],
		97: [
			0,
			.43056,
			.07671,
			0,
			.51111
		],
		98: [
			0,
			.69444,
			.06312,
			0,
			.46
		],
		99: [
			0,
			.43056,
			.05653,
			0,
			.46
		],
		100: [
			0,
			.69444,
			.10333,
			0,
			.51111
		],
		101: [
			0,
			.43056,
			.07514,
			0,
			.46
		],
		102: [
			.19444,
			.69444,
			.21194,
			0,
			.30667
		],
		103: [
			.19444,
			.43056,
			.08847,
			0,
			.46
		],
		104: [
			0,
			.69444,
			.07671,
			0,
			.51111
		],
		105: [
			0,
			.65536,
			.1019,
			0,
			.30667
		],
		106: [
			.19444,
			.65536,
			.14467,
			0,
			.30667
		],
		107: [
			0,
			.69444,
			.10764,
			0,
			.46
		],
		108: [
			0,
			.69444,
			.10333,
			0,
			.25555
		],
		109: [
			0,
			.43056,
			.07671,
			0,
			.81777
		],
		110: [
			0,
			.43056,
			.07671,
			0,
			.56222
		],
		111: [
			0,
			.43056,
			.06312,
			0,
			.51111
		],
		112: [
			.19444,
			.43056,
			.06312,
			0,
			.51111
		],
		113: [
			.19444,
			.43056,
			.08847,
			0,
			.46
		],
		114: [
			0,
			.43056,
			.10764,
			0,
			.42166
		],
		115: [
			0,
			.43056,
			.08208,
			0,
			.40889
		],
		116: [
			0,
			.61508,
			.09486,
			0,
			.33222
		],
		117: [
			0,
			.43056,
			.07671,
			0,
			.53666
		],
		118: [
			0,
			.43056,
			.10764,
			0,
			.46
		],
		119: [
			0,
			.43056,
			.10764,
			0,
			.66444
		],
		120: [
			0,
			.43056,
			.12042,
			0,
			.46389
		],
		121: [
			.19444,
			.43056,
			.08847,
			0,
			.48555
		],
		122: [
			0,
			.43056,
			.12292,
			0,
			.40889
		],
		126: [
			.35,
			.31786,
			.11585,
			0,
			.51111
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		168: [
			0,
			.66786,
			.10474,
			0,
			.51111
		],
		176: [
			0,
			.69444,
			0,
			0,
			.83129
		],
		184: [
			.17014,
			0,
			0,
			0,
			.46
		],
		198: [
			0,
			.68333,
			.12028,
			0,
			.88277
		],
		216: [
			.04861,
			.73194,
			.09403,
			0,
			.76666
		],
		223: [
			.19444,
			.69444,
			.10514,
			0,
			.53666
		],
		230: [
			0,
			.43056,
			.07514,
			0,
			.71555
		],
		248: [
			.09722,
			.52778,
			.09194,
			0,
			.51111
		],
		338: [
			0,
			.68333,
			.12028,
			0,
			.98499
		],
		339: [
			0,
			.43056,
			.07514,
			0,
			.71555
		],
		710: [
			0,
			.69444,
			.06646,
			0,
			.51111
		],
		711: [
			0,
			.62847,
			.08295,
			0,
			.51111
		],
		713: [
			0,
			.56167,
			.10333,
			0,
			.51111
		],
		714: [
			0,
			.69444,
			.09694,
			0,
			.51111
		],
		715: [
			0,
			.69444,
			0,
			0,
			.51111
		],
		728: [
			0,
			.69444,
			.10806,
			0,
			.51111
		],
		729: [
			0,
			.66786,
			.11752,
			0,
			.30667
		],
		730: [
			0,
			.69444,
			0,
			0,
			.83129
		],
		732: [
			0,
			.66786,
			.11585,
			0,
			.51111
		],
		733: [
			0,
			.69444,
			.1225,
			0,
			.51111
		],
		915: [
			0,
			.68333,
			.13305,
			0,
			.62722
		],
		916: [
			0,
			.68333,
			0,
			0,
			.81777
		],
		920: [
			0,
			.68333,
			.09403,
			0,
			.76666
		],
		923: [
			0,
			.68333,
			0,
			0,
			.69222
		],
		926: [
			0,
			.68333,
			.15294,
			0,
			.66444
		],
		928: [
			0,
			.68333,
			.16389,
			0,
			.74333
		],
		931: [
			0,
			.68333,
			.12028,
			0,
			.71555
		],
		933: [
			0,
			.68333,
			.11111,
			0,
			.76666
		],
		934: [
			0,
			.68333,
			.05986,
			0,
			.71555
		],
		936: [
			0,
			.68333,
			.11111,
			0,
			.76666
		],
		937: [
			0,
			.68333,
			.10257,
			0,
			.71555
		],
		8211: [
			0,
			.43056,
			.09208,
			0,
			.51111
		],
		8212: [
			0,
			.43056,
			.09208,
			0,
			1.02222
		],
		8216: [
			0,
			.69444,
			.12417,
			0,
			.30667
		],
		8217: [
			0,
			.69444,
			.12417,
			0,
			.30667
		],
		8220: [
			0,
			.69444,
			.1685,
			0,
			.51444
		],
		8221: [
			0,
			.69444,
			.06961,
			0,
			.51444
		],
		8463: [
			0,
			.68889,
			0,
			0,
			.54028
		]
	},
	"Main-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		33: [
			0,
			.69444,
			0,
			0,
			.27778
		],
		34: [
			0,
			.69444,
			0,
			0,
			.5
		],
		35: [
			.19444,
			.69444,
			0,
			0,
			.83334
		],
		36: [
			.05556,
			.75,
			0,
			0,
			.5
		],
		37: [
			.05556,
			.75,
			0,
			0,
			.83334
		],
		38: [
			0,
			.69444,
			0,
			0,
			.77778
		],
		39: [
			0,
			.69444,
			0,
			0,
			.27778
		],
		40: [
			.25,
			.75,
			0,
			0,
			.38889
		],
		41: [
			.25,
			.75,
			0,
			0,
			.38889
		],
		42: [
			0,
			.75,
			0,
			0,
			.5
		],
		43: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		44: [
			.19444,
			.10556,
			0,
			0,
			.27778
		],
		45: [
			0,
			.43056,
			0,
			0,
			.33333
		],
		46: [
			0,
			.10556,
			0,
			0,
			.27778
		],
		47: [
			.25,
			.75,
			0,
			0,
			.5
		],
		48: [
			0,
			.64444,
			0,
			0,
			.5
		],
		49: [
			0,
			.64444,
			0,
			0,
			.5
		],
		50: [
			0,
			.64444,
			0,
			0,
			.5
		],
		51: [
			0,
			.64444,
			0,
			0,
			.5
		],
		52: [
			0,
			.64444,
			0,
			0,
			.5
		],
		53: [
			0,
			.64444,
			0,
			0,
			.5
		],
		54: [
			0,
			.64444,
			0,
			0,
			.5
		],
		55: [
			0,
			.64444,
			0,
			0,
			.5
		],
		56: [
			0,
			.64444,
			0,
			0,
			.5
		],
		57: [
			0,
			.64444,
			0,
			0,
			.5
		],
		58: [
			0,
			.43056,
			0,
			0,
			.27778
		],
		59: [
			.19444,
			.43056,
			0,
			0,
			.27778
		],
		60: [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		61: [
			-.13313,
			.36687,
			0,
			0,
			.77778
		],
		62: [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		63: [
			0,
			.69444,
			0,
			0,
			.47222
		],
		64: [
			0,
			.69444,
			0,
			0,
			.77778
		],
		65: [
			0,
			.68333,
			0,
			0,
			.75
		],
		66: [
			0,
			.68333,
			0,
			0,
			.70834
		],
		67: [
			0,
			.68333,
			0,
			0,
			.72222
		],
		68: [
			0,
			.68333,
			0,
			0,
			.76389
		],
		69: [
			0,
			.68333,
			0,
			0,
			.68056
		],
		70: [
			0,
			.68333,
			0,
			0,
			.65278
		],
		71: [
			0,
			.68333,
			0,
			0,
			.78472
		],
		72: [
			0,
			.68333,
			0,
			0,
			.75
		],
		73: [
			0,
			.68333,
			0,
			0,
			.36111
		],
		74: [
			0,
			.68333,
			0,
			0,
			.51389
		],
		75: [
			0,
			.68333,
			0,
			0,
			.77778
		],
		76: [
			0,
			.68333,
			0,
			0,
			.625
		],
		77: [
			0,
			.68333,
			0,
			0,
			.91667
		],
		78: [
			0,
			.68333,
			0,
			0,
			.75
		],
		79: [
			0,
			.68333,
			0,
			0,
			.77778
		],
		80: [
			0,
			.68333,
			0,
			0,
			.68056
		],
		81: [
			.19444,
			.68333,
			0,
			0,
			.77778
		],
		82: [
			0,
			.68333,
			0,
			0,
			.73611
		],
		83: [
			0,
			.68333,
			0,
			0,
			.55556
		],
		84: [
			0,
			.68333,
			0,
			0,
			.72222
		],
		85: [
			0,
			.68333,
			0,
			0,
			.75
		],
		86: [
			0,
			.68333,
			.01389,
			0,
			.75
		],
		87: [
			0,
			.68333,
			.01389,
			0,
			1.02778
		],
		88: [
			0,
			.68333,
			0,
			0,
			.75
		],
		89: [
			0,
			.68333,
			.025,
			0,
			.75
		],
		90: [
			0,
			.68333,
			0,
			0,
			.61111
		],
		91: [
			.25,
			.75,
			0,
			0,
			.27778
		],
		92: [
			.25,
			.75,
			0,
			0,
			.5
		],
		93: [
			.25,
			.75,
			0,
			0,
			.27778
		],
		94: [
			0,
			.69444,
			0,
			0,
			.5
		],
		95: [
			.31,
			.12056,
			.02778,
			0,
			.5
		],
		97: [
			0,
			.43056,
			0,
			0,
			.5
		],
		98: [
			0,
			.69444,
			0,
			0,
			.55556
		],
		99: [
			0,
			.43056,
			0,
			0,
			.44445
		],
		100: [
			0,
			.69444,
			0,
			0,
			.55556
		],
		101: [
			0,
			.43056,
			0,
			0,
			.44445
		],
		102: [
			0,
			.69444,
			.07778,
			0,
			.30556
		],
		103: [
			.19444,
			.43056,
			.01389,
			0,
			.5
		],
		104: [
			0,
			.69444,
			0,
			0,
			.55556
		],
		105: [
			0,
			.66786,
			0,
			0,
			.27778
		],
		106: [
			.19444,
			.66786,
			0,
			0,
			.30556
		],
		107: [
			0,
			.69444,
			0,
			0,
			.52778
		],
		108: [
			0,
			.69444,
			0,
			0,
			.27778
		],
		109: [
			0,
			.43056,
			0,
			0,
			.83334
		],
		110: [
			0,
			.43056,
			0,
			0,
			.55556
		],
		111: [
			0,
			.43056,
			0,
			0,
			.5
		],
		112: [
			.19444,
			.43056,
			0,
			0,
			.55556
		],
		113: [
			.19444,
			.43056,
			0,
			0,
			.52778
		],
		114: [
			0,
			.43056,
			0,
			0,
			.39167
		],
		115: [
			0,
			.43056,
			0,
			0,
			.39445
		],
		116: [
			0,
			.61508,
			0,
			0,
			.38889
		],
		117: [
			0,
			.43056,
			0,
			0,
			.55556
		],
		118: [
			0,
			.43056,
			.01389,
			0,
			.52778
		],
		119: [
			0,
			.43056,
			.01389,
			0,
			.72222
		],
		120: [
			0,
			.43056,
			0,
			0,
			.52778
		],
		121: [
			.19444,
			.43056,
			.01389,
			0,
			.52778
		],
		122: [
			0,
			.43056,
			0,
			0,
			.44445
		],
		123: [
			.25,
			.75,
			0,
			0,
			.5
		],
		124: [
			.25,
			.75,
			0,
			0,
			.27778
		],
		125: [
			.25,
			.75,
			0,
			0,
			.5
		],
		126: [
			.35,
			.31786,
			0,
			0,
			.5
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		163: [
			0,
			.69444,
			0,
			0,
			.76909
		],
		167: [
			.19444,
			.69444,
			0,
			0,
			.44445
		],
		168: [
			0,
			.66786,
			0,
			0,
			.5
		],
		172: [
			0,
			.43056,
			0,
			0,
			.66667
		],
		176: [
			0,
			.69444,
			0,
			0,
			.75
		],
		177: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		182: [
			.19444,
			.69444,
			0,
			0,
			.61111
		],
		184: [
			.17014,
			0,
			0,
			0,
			.44445
		],
		198: [
			0,
			.68333,
			0,
			0,
			.90278
		],
		215: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		216: [
			.04861,
			.73194,
			0,
			0,
			.77778
		],
		223: [
			0,
			.69444,
			0,
			0,
			.5
		],
		230: [
			0,
			.43056,
			0,
			0,
			.72222
		],
		247: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		248: [
			.09722,
			.52778,
			0,
			0,
			.5
		],
		305: [
			0,
			.43056,
			0,
			0,
			.27778
		],
		338: [
			0,
			.68333,
			0,
			0,
			1.01389
		],
		339: [
			0,
			.43056,
			0,
			0,
			.77778
		],
		567: [
			.19444,
			.43056,
			0,
			0,
			.30556
		],
		710: [
			0,
			.69444,
			0,
			0,
			.5
		],
		711: [
			0,
			.62847,
			0,
			0,
			.5
		],
		713: [
			0,
			.56778,
			0,
			0,
			.5
		],
		714: [
			0,
			.69444,
			0,
			0,
			.5
		],
		715: [
			0,
			.69444,
			0,
			0,
			.5
		],
		728: [
			0,
			.69444,
			0,
			0,
			.5
		],
		729: [
			0,
			.66786,
			0,
			0,
			.27778
		],
		730: [
			0,
			.69444,
			0,
			0,
			.75
		],
		732: [
			0,
			.66786,
			0,
			0,
			.5
		],
		733: [
			0,
			.69444,
			0,
			0,
			.5
		],
		915: [
			0,
			.68333,
			0,
			0,
			.625
		],
		916: [
			0,
			.68333,
			0,
			0,
			.83334
		],
		920: [
			0,
			.68333,
			0,
			0,
			.77778
		],
		923: [
			0,
			.68333,
			0,
			0,
			.69445
		],
		926: [
			0,
			.68333,
			0,
			0,
			.66667
		],
		928: [
			0,
			.68333,
			0,
			0,
			.75
		],
		931: [
			0,
			.68333,
			0,
			0,
			.72222
		],
		933: [
			0,
			.68333,
			0,
			0,
			.77778
		],
		934: [
			0,
			.68333,
			0,
			0,
			.72222
		],
		936: [
			0,
			.68333,
			0,
			0,
			.77778
		],
		937: [
			0,
			.68333,
			0,
			0,
			.72222
		],
		8211: [
			0,
			.43056,
			.02778,
			0,
			.5
		],
		8212: [
			0,
			.43056,
			.02778,
			0,
			1
		],
		8216: [
			0,
			.69444,
			0,
			0,
			.27778
		],
		8217: [
			0,
			.69444,
			0,
			0,
			.27778
		],
		8220: [
			0,
			.69444,
			0,
			0,
			.5
		],
		8221: [
			0,
			.69444,
			0,
			0,
			.5
		],
		8224: [
			.19444,
			.69444,
			0,
			0,
			.44445
		],
		8225: [
			.19444,
			.69444,
			0,
			0,
			.44445
		],
		8230: [
			0,
			.123,
			0,
			0,
			1.172
		],
		8242: [
			0,
			.55556,
			0,
			0,
			.275
		],
		8407: [
			0,
			.71444,
			.15382,
			0,
			.5
		],
		8463: [
			0,
			.68889,
			0,
			0,
			.54028
		],
		8465: [
			0,
			.69444,
			0,
			0,
			.72222
		],
		8467: [
			0,
			.69444,
			0,
			.11111,
			.41667
		],
		8472: [
			.19444,
			.43056,
			0,
			.11111,
			.63646
		],
		8476: [
			0,
			.69444,
			0,
			0,
			.72222
		],
		8501: [
			0,
			.69444,
			0,
			0,
			.61111
		],
		8592: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8593: [
			.19444,
			.69444,
			0,
			0,
			.5
		],
		8594: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8595: [
			.19444,
			.69444,
			0,
			0,
			.5
		],
		8596: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8597: [
			.25,
			.75,
			0,
			0,
			.5
		],
		8598: [
			.19444,
			.69444,
			0,
			0,
			1
		],
		8599: [
			.19444,
			.69444,
			0,
			0,
			1
		],
		8600: [
			.19444,
			.69444,
			0,
			0,
			1
		],
		8601: [
			.19444,
			.69444,
			0,
			0,
			1
		],
		8614: [
			.011,
			.511,
			0,
			0,
			1
		],
		8617: [
			.011,
			.511,
			0,
			0,
			1.126
		],
		8618: [
			.011,
			.511,
			0,
			0,
			1.126
		],
		8636: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8637: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8640: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8641: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8652: [
			.011,
			.671,
			0,
			0,
			1
		],
		8656: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8657: [
			.19444,
			.69444,
			0,
			0,
			.61111
		],
		8658: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8659: [
			.19444,
			.69444,
			0,
			0,
			.61111
		],
		8660: [
			-.13313,
			.36687,
			0,
			0,
			1
		],
		8661: [
			.25,
			.75,
			0,
			0,
			.61111
		],
		8704: [
			0,
			.69444,
			0,
			0,
			.55556
		],
		8706: [
			0,
			.69444,
			.05556,
			.08334,
			.5309
		],
		8707: [
			0,
			.69444,
			0,
			0,
			.55556
		],
		8709: [
			.05556,
			.75,
			0,
			0,
			.5
		],
		8711: [
			0,
			.68333,
			0,
			0,
			.83334
		],
		8712: [
			.0391,
			.5391,
			0,
			0,
			.66667
		],
		8715: [
			.0391,
			.5391,
			0,
			0,
			.66667
		],
		8722: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		8723: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		8725: [
			.25,
			.75,
			0,
			0,
			.5
		],
		8726: [
			.25,
			.75,
			0,
			0,
			.5
		],
		8727: [
			-.03472,
			.46528,
			0,
			0,
			.5
		],
		8728: [
			-.05555,
			.44445,
			0,
			0,
			.5
		],
		8729: [
			-.05555,
			.44445,
			0,
			0,
			.5
		],
		8730: [
			.2,
			.8,
			0,
			0,
			.83334
		],
		8733: [
			0,
			.43056,
			0,
			0,
			.77778
		],
		8734: [
			0,
			.43056,
			0,
			0,
			1
		],
		8736: [
			0,
			.69224,
			0,
			0,
			.72222
		],
		8739: [
			.25,
			.75,
			0,
			0,
			.27778
		],
		8741: [
			.25,
			.75,
			0,
			0,
			.5
		],
		8743: [
			0,
			.55556,
			0,
			0,
			.66667
		],
		8744: [
			0,
			.55556,
			0,
			0,
			.66667
		],
		8745: [
			0,
			.55556,
			0,
			0,
			.66667
		],
		8746: [
			0,
			.55556,
			0,
			0,
			.66667
		],
		8747: [
			.19444,
			.69444,
			.11111,
			0,
			.41667
		],
		8764: [
			-.13313,
			.36687,
			0,
			0,
			.77778
		],
		8768: [
			.19444,
			.69444,
			0,
			0,
			.27778
		],
		8771: [
			-.03625,
			.46375,
			0,
			0,
			.77778
		],
		8773: [
			-.022,
			.589,
			0,
			0,
			.778
		],
		8776: [
			-.01688,
			.48312,
			0,
			0,
			.77778
		],
		8781: [
			-.03625,
			.46375,
			0,
			0,
			.77778
		],
		8784: [
			-.133,
			.673,
			0,
			0,
			.778
		],
		8801: [
			-.03625,
			.46375,
			0,
			0,
			.77778
		],
		8804: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		8805: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		8810: [
			.0391,
			.5391,
			0,
			0,
			1
		],
		8811: [
			.0391,
			.5391,
			0,
			0,
			1
		],
		8826: [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		8827: [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		8834: [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		8835: [
			.0391,
			.5391,
			0,
			0,
			.77778
		],
		8838: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		8839: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		8846: [
			0,
			.55556,
			0,
			0,
			.66667
		],
		8849: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		8850: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		8851: [
			0,
			.55556,
			0,
			0,
			.66667
		],
		8852: [
			0,
			.55556,
			0,
			0,
			.66667
		],
		8853: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		8854: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		8855: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		8856: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		8857: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		8866: [
			0,
			.69444,
			0,
			0,
			.61111
		],
		8867: [
			0,
			.69444,
			0,
			0,
			.61111
		],
		8868: [
			0,
			.69444,
			0,
			0,
			.77778
		],
		8869: [
			0,
			.69444,
			0,
			0,
			.77778
		],
		8872: [
			.249,
			.75,
			0,
			0,
			.867
		],
		8900: [
			-.05555,
			.44445,
			0,
			0,
			.5
		],
		8901: [
			-.05555,
			.44445,
			0,
			0,
			.27778
		],
		8902: [
			-.03472,
			.46528,
			0,
			0,
			.5
		],
		8904: [
			.005,
			.505,
			0,
			0,
			.9
		],
		8942: [
			.03,
			.903,
			0,
			0,
			.278
		],
		8943: [
			-.19,
			.313,
			0,
			0,
			1.172
		],
		8945: [
			-.1,
			.823,
			0,
			0,
			1.282
		],
		8968: [
			.25,
			.75,
			0,
			0,
			.44445
		],
		8969: [
			.25,
			.75,
			0,
			0,
			.44445
		],
		8970: [
			.25,
			.75,
			0,
			0,
			.44445
		],
		8971: [
			.25,
			.75,
			0,
			0,
			.44445
		],
		8994: [
			-.14236,
			.35764,
			0,
			0,
			1
		],
		8995: [
			-.14236,
			.35764,
			0,
			0,
			1
		],
		9136: [
			.244,
			.744,
			0,
			0,
			.412
		],
		9137: [
			.244,
			.745,
			0,
			0,
			.412
		],
		9651: [
			.19444,
			.69444,
			0,
			0,
			.88889
		],
		9657: [
			-.03472,
			.46528,
			0,
			0,
			.5
		],
		9661: [
			.19444,
			.69444,
			0,
			0,
			.88889
		],
		9667: [
			-.03472,
			.46528,
			0,
			0,
			.5
		],
		9711: [
			.19444,
			.69444,
			0,
			0,
			1
		],
		9824: [
			.12963,
			.69444,
			0,
			0,
			.77778
		],
		9825: [
			.12963,
			.69444,
			0,
			0,
			.77778
		],
		9826: [
			.12963,
			.69444,
			0,
			0,
			.77778
		],
		9827: [
			.12963,
			.69444,
			0,
			0,
			.77778
		],
		9837: [
			0,
			.75,
			0,
			0,
			.38889
		],
		9838: [
			.19444,
			.69444,
			0,
			0,
			.38889
		],
		9839: [
			.19444,
			.69444,
			0,
			0,
			.38889
		],
		10216: [
			.25,
			.75,
			0,
			0,
			.38889
		],
		10217: [
			.25,
			.75,
			0,
			0,
			.38889
		],
		10222: [
			.244,
			.744,
			0,
			0,
			.412
		],
		10223: [
			.244,
			.745,
			0,
			0,
			.412
		],
		10229: [
			.011,
			.511,
			0,
			0,
			1.609
		],
		10230: [
			.011,
			.511,
			0,
			0,
			1.638
		],
		10231: [
			.011,
			.511,
			0,
			0,
			1.859
		],
		10232: [
			.024,
			.525,
			0,
			0,
			1.609
		],
		10233: [
			.024,
			.525,
			0,
			0,
			1.638
		],
		10234: [
			.024,
			.525,
			0,
			0,
			1.858
		],
		10236: [
			.011,
			.511,
			0,
			0,
			1.638
		],
		10815: [
			0,
			.68333,
			0,
			0,
			.75
		],
		10927: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		10928: [
			.13597,
			.63597,
			0,
			0,
			.77778
		],
		57376: [
			.19444,
			.69444,
			0,
			0,
			0
		]
	},
	"Math-BoldItalic": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		48: [
			0,
			.44444,
			0,
			0,
			.575
		],
		49: [
			0,
			.44444,
			0,
			0,
			.575
		],
		50: [
			0,
			.44444,
			0,
			0,
			.575
		],
		51: [
			.19444,
			.44444,
			0,
			0,
			.575
		],
		52: [
			.19444,
			.44444,
			0,
			0,
			.575
		],
		53: [
			.19444,
			.44444,
			0,
			0,
			.575
		],
		54: [
			0,
			.64444,
			0,
			0,
			.575
		],
		55: [
			.19444,
			.44444,
			0,
			0,
			.575
		],
		56: [
			0,
			.64444,
			0,
			0,
			.575
		],
		57: [
			.19444,
			.44444,
			0,
			0,
			.575
		],
		65: [
			0,
			.68611,
			0,
			0,
			.86944
		],
		66: [
			0,
			.68611,
			.04835,
			0,
			.8664
		],
		67: [
			0,
			.68611,
			.06979,
			0,
			.81694
		],
		68: [
			0,
			.68611,
			.03194,
			0,
			.93812
		],
		69: [
			0,
			.68611,
			.05451,
			0,
			.81007
		],
		70: [
			0,
			.68611,
			.15972,
			0,
			.68889
		],
		71: [
			0,
			.68611,
			0,
			0,
			.88673
		],
		72: [
			0,
			.68611,
			.08229,
			0,
			.98229
		],
		73: [
			0,
			.68611,
			.07778,
			0,
			.51111
		],
		74: [
			0,
			.68611,
			.10069,
			0,
			.63125
		],
		75: [
			0,
			.68611,
			.06979,
			0,
			.97118
		],
		76: [
			0,
			.68611,
			0,
			0,
			.75555
		],
		77: [
			0,
			.68611,
			.11424,
			0,
			1.14201
		],
		78: [
			0,
			.68611,
			.11424,
			0,
			.95034
		],
		79: [
			0,
			.68611,
			.03194,
			0,
			.83666
		],
		80: [
			0,
			.68611,
			.15972,
			0,
			.72309
		],
		81: [
			.19444,
			.68611,
			0,
			0,
			.86861
		],
		82: [
			0,
			.68611,
			.00421,
			0,
			.87235
		],
		83: [
			0,
			.68611,
			.05382,
			0,
			.69271
		],
		84: [
			0,
			.68611,
			.15972,
			0,
			.63663
		],
		85: [
			0,
			.68611,
			.11424,
			0,
			.80027
		],
		86: [
			0,
			.68611,
			.25555,
			0,
			.67778
		],
		87: [
			0,
			.68611,
			.15972,
			0,
			1.09305
		],
		88: [
			0,
			.68611,
			.07778,
			0,
			.94722
		],
		89: [
			0,
			.68611,
			.25555,
			0,
			.67458
		],
		90: [
			0,
			.68611,
			.06979,
			0,
			.77257
		],
		97: [
			0,
			.44444,
			0,
			0,
			.63287
		],
		98: [
			0,
			.69444,
			0,
			0,
			.52083
		],
		99: [
			0,
			.44444,
			0,
			0,
			.51342
		],
		100: [
			0,
			.69444,
			0,
			0,
			.60972
		],
		101: [
			0,
			.44444,
			0,
			0,
			.55361
		],
		102: [
			.19444,
			.69444,
			.11042,
			0,
			.56806
		],
		103: [
			.19444,
			.44444,
			.03704,
			0,
			.5449
		],
		104: [
			0,
			.69444,
			0,
			0,
			.66759
		],
		105: [
			0,
			.69326,
			0,
			0,
			.4048
		],
		106: [
			.19444,
			.69326,
			.0622,
			0,
			.47083
		],
		107: [
			0,
			.69444,
			.01852,
			0,
			.6037
		],
		108: [
			0,
			.69444,
			.0088,
			0,
			.34815
		],
		109: [
			0,
			.44444,
			0,
			0,
			1.0324
		],
		110: [
			0,
			.44444,
			0,
			0,
			.71296
		],
		111: [
			0,
			.44444,
			0,
			0,
			.58472
		],
		112: [
			.19444,
			.44444,
			0,
			0,
			.60092
		],
		113: [
			.19444,
			.44444,
			.03704,
			0,
			.54213
		],
		114: [
			0,
			.44444,
			.03194,
			0,
			.5287
		],
		115: [
			0,
			.44444,
			0,
			0,
			.53125
		],
		116: [
			0,
			.63492,
			0,
			0,
			.41528
		],
		117: [
			0,
			.44444,
			0,
			0,
			.68102
		],
		118: [
			0,
			.44444,
			.03704,
			0,
			.56666
		],
		119: [
			0,
			.44444,
			.02778,
			0,
			.83148
		],
		120: [
			0,
			.44444,
			0,
			0,
			.65903
		],
		121: [
			.19444,
			.44444,
			.03704,
			0,
			.59028
		],
		122: [
			0,
			.44444,
			.04213,
			0,
			.55509
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		915: [
			0,
			.68611,
			.15972,
			0,
			.65694
		],
		916: [
			0,
			.68611,
			0,
			0,
			.95833
		],
		920: [
			0,
			.68611,
			.03194,
			0,
			.86722
		],
		923: [
			0,
			.68611,
			0,
			0,
			.80555
		],
		926: [
			0,
			.68611,
			.07458,
			0,
			.84125
		],
		928: [
			0,
			.68611,
			.08229,
			0,
			.98229
		],
		931: [
			0,
			.68611,
			.05451,
			0,
			.88507
		],
		933: [
			0,
			.68611,
			.15972,
			0,
			.67083
		],
		934: [
			0,
			.68611,
			0,
			0,
			.76666
		],
		936: [
			0,
			.68611,
			.11653,
			0,
			.71402
		],
		937: [
			0,
			.68611,
			.04835,
			0,
			.8789
		],
		945: [
			0,
			.44444,
			0,
			0,
			.76064
		],
		946: [
			.19444,
			.69444,
			.03403,
			0,
			.65972
		],
		947: [
			.19444,
			.44444,
			.06389,
			0,
			.59003
		],
		948: [
			0,
			.69444,
			.03819,
			0,
			.52222
		],
		949: [
			0,
			.44444,
			0,
			0,
			.52882
		],
		950: [
			.19444,
			.69444,
			.06215,
			0,
			.50833
		],
		951: [
			.19444,
			.44444,
			.03704,
			0,
			.6
		],
		952: [
			0,
			.69444,
			.03194,
			0,
			.5618
		],
		953: [
			0,
			.44444,
			0,
			0,
			.41204
		],
		954: [
			0,
			.44444,
			0,
			0,
			.66759
		],
		955: [
			0,
			.69444,
			0,
			0,
			.67083
		],
		956: [
			.19444,
			.44444,
			0,
			0,
			.70787
		],
		957: [
			0,
			.44444,
			.06898,
			0,
			.57685
		],
		958: [
			.19444,
			.69444,
			.03021,
			0,
			.50833
		],
		959: [
			0,
			.44444,
			0,
			0,
			.58472
		],
		960: [
			0,
			.44444,
			.03704,
			0,
			.68241
		],
		961: [
			.19444,
			.44444,
			0,
			0,
			.6118
		],
		962: [
			.09722,
			.44444,
			.07917,
			0,
			.42361
		],
		963: [
			0,
			.44444,
			.03704,
			0,
			.68588
		],
		964: [
			0,
			.44444,
			.13472,
			0,
			.52083
		],
		965: [
			0,
			.44444,
			.03704,
			0,
			.63055
		],
		966: [
			.19444,
			.44444,
			0,
			0,
			.74722
		],
		967: [
			.19444,
			.44444,
			0,
			0,
			.71805
		],
		968: [
			.19444,
			.69444,
			.03704,
			0,
			.75833
		],
		969: [
			0,
			.44444,
			.03704,
			0,
			.71782
		],
		977: [
			0,
			.69444,
			0,
			0,
			.69155
		],
		981: [
			.19444,
			.69444,
			0,
			0,
			.7125
		],
		982: [
			0,
			.44444,
			.03194,
			0,
			.975
		],
		1009: [
			.19444,
			.44444,
			0,
			0,
			.6118
		],
		1013: [
			0,
			.44444,
			0,
			0,
			.48333
		],
		57649: [
			0,
			.44444,
			0,
			0,
			.39352
		],
		57911: [
			.19444,
			.44444,
			0,
			0,
			.43889
		]
	},
	"Math-Italic": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		48: [
			0,
			.43056,
			0,
			0,
			.5
		],
		49: [
			0,
			.43056,
			0,
			0,
			.5
		],
		50: [
			0,
			.43056,
			0,
			0,
			.5
		],
		51: [
			.19444,
			.43056,
			0,
			0,
			.5
		],
		52: [
			.19444,
			.43056,
			0,
			0,
			.5
		],
		53: [
			.19444,
			.43056,
			0,
			0,
			.5
		],
		54: [
			0,
			.64444,
			0,
			0,
			.5
		],
		55: [
			.19444,
			.43056,
			0,
			0,
			.5
		],
		56: [
			0,
			.64444,
			0,
			0,
			.5
		],
		57: [
			.19444,
			.43056,
			0,
			0,
			.5
		],
		65: [
			0,
			.68333,
			0,
			.13889,
			.75
		],
		66: [
			0,
			.68333,
			.05017,
			.08334,
			.75851
		],
		67: [
			0,
			.68333,
			.07153,
			.08334,
			.71472
		],
		68: [
			0,
			.68333,
			.02778,
			.05556,
			.82792
		],
		69: [
			0,
			.68333,
			.05764,
			.08334,
			.7382
		],
		70: [
			0,
			.68333,
			.13889,
			.08334,
			.64306
		],
		71: [
			0,
			.68333,
			0,
			.08334,
			.78625
		],
		72: [
			0,
			.68333,
			.08125,
			.05556,
			.83125
		],
		73: [
			0,
			.68333,
			.07847,
			.11111,
			.43958
		],
		74: [
			0,
			.68333,
			.09618,
			.16667,
			.55451
		],
		75: [
			0,
			.68333,
			.07153,
			.05556,
			.84931
		],
		76: [
			0,
			.68333,
			0,
			.02778,
			.68056
		],
		77: [
			0,
			.68333,
			.10903,
			.08334,
			.97014
		],
		78: [
			0,
			.68333,
			.10903,
			.08334,
			.80347
		],
		79: [
			0,
			.68333,
			.02778,
			.08334,
			.76278
		],
		80: [
			0,
			.68333,
			.13889,
			.08334,
			.64201
		],
		81: [
			.19444,
			.68333,
			0,
			.08334,
			.79056
		],
		82: [
			0,
			.68333,
			.00773,
			.08334,
			.75929
		],
		83: [
			0,
			.68333,
			.05764,
			.08334,
			.6132
		],
		84: [
			0,
			.68333,
			.13889,
			.08334,
			.58438
		],
		85: [
			0,
			.68333,
			.10903,
			.02778,
			.68278
		],
		86: [
			0,
			.68333,
			.22222,
			0,
			.58333
		],
		87: [
			0,
			.68333,
			.13889,
			0,
			.94445
		],
		88: [
			0,
			.68333,
			.07847,
			.08334,
			.82847
		],
		89: [
			0,
			.68333,
			.22222,
			0,
			.58056
		],
		90: [
			0,
			.68333,
			.07153,
			.08334,
			.68264
		],
		97: [
			0,
			.43056,
			0,
			0,
			.52859
		],
		98: [
			0,
			.69444,
			0,
			0,
			.42917
		],
		99: [
			0,
			.43056,
			0,
			.05556,
			.43276
		],
		100: [
			0,
			.69444,
			0,
			.16667,
			.52049
		],
		101: [
			0,
			.43056,
			0,
			.05556,
			.46563
		],
		102: [
			.19444,
			.69444,
			.10764,
			.16667,
			.48959
		],
		103: [
			.19444,
			.43056,
			.03588,
			.02778,
			.47697
		],
		104: [
			0,
			.69444,
			0,
			0,
			.57616
		],
		105: [
			0,
			.65952,
			0,
			0,
			.34451
		],
		106: [
			.19444,
			.65952,
			.05724,
			0,
			.41181
		],
		107: [
			0,
			.69444,
			.03148,
			0,
			.5206
		],
		108: [
			0,
			.69444,
			.01968,
			.08334,
			.29838
		],
		109: [
			0,
			.43056,
			0,
			0,
			.87801
		],
		110: [
			0,
			.43056,
			0,
			0,
			.60023
		],
		111: [
			0,
			.43056,
			0,
			.05556,
			.48472
		],
		112: [
			.19444,
			.43056,
			0,
			.08334,
			.50313
		],
		113: [
			.19444,
			.43056,
			.03588,
			.08334,
			.44641
		],
		114: [
			0,
			.43056,
			.02778,
			.05556,
			.45116
		],
		115: [
			0,
			.43056,
			0,
			.05556,
			.46875
		],
		116: [
			0,
			.61508,
			0,
			.08334,
			.36111
		],
		117: [
			0,
			.43056,
			0,
			.02778,
			.57246
		],
		118: [
			0,
			.43056,
			.03588,
			.02778,
			.48472
		],
		119: [
			0,
			.43056,
			.02691,
			.08334,
			.71592
		],
		120: [
			0,
			.43056,
			0,
			.02778,
			.57153
		],
		121: [
			.19444,
			.43056,
			.03588,
			.05556,
			.49028
		],
		122: [
			0,
			.43056,
			.04398,
			.05556,
			.46505
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		915: [
			0,
			.68333,
			.13889,
			.08334,
			.61528
		],
		916: [
			0,
			.68333,
			0,
			.16667,
			.83334
		],
		920: [
			0,
			.68333,
			.02778,
			.08334,
			.76278
		],
		923: [
			0,
			.68333,
			0,
			.16667,
			.69445
		],
		926: [
			0,
			.68333,
			.07569,
			.08334,
			.74236
		],
		928: [
			0,
			.68333,
			.08125,
			.05556,
			.83125
		],
		931: [
			0,
			.68333,
			.05764,
			.08334,
			.77986
		],
		933: [
			0,
			.68333,
			.13889,
			.05556,
			.58333
		],
		934: [
			0,
			.68333,
			0,
			.08334,
			.66667
		],
		936: [
			0,
			.68333,
			.11,
			.05556,
			.61222
		],
		937: [
			0,
			.68333,
			.05017,
			.08334,
			.7724
		],
		945: [
			0,
			.43056,
			.0037,
			.02778,
			.6397
		],
		946: [
			.19444,
			.69444,
			.05278,
			.08334,
			.56563
		],
		947: [
			.19444,
			.43056,
			.05556,
			0,
			.51773
		],
		948: [
			0,
			.69444,
			.03785,
			.05556,
			.44444
		],
		949: [
			0,
			.43056,
			0,
			.08334,
			.46632
		],
		950: [
			.19444,
			.69444,
			.07378,
			.08334,
			.4375
		],
		951: [
			.19444,
			.43056,
			.03588,
			.05556,
			.49653
		],
		952: [
			0,
			.69444,
			.02778,
			.08334,
			.46944
		],
		953: [
			0,
			.43056,
			0,
			.05556,
			.35394
		],
		954: [
			0,
			.43056,
			0,
			0,
			.57616
		],
		955: [
			0,
			.69444,
			0,
			0,
			.58334
		],
		956: [
			.19444,
			.43056,
			0,
			.02778,
			.60255
		],
		957: [
			0,
			.43056,
			.06366,
			.02778,
			.49398
		],
		958: [
			.19444,
			.69444,
			.04601,
			.11111,
			.4375
		],
		959: [
			0,
			.43056,
			0,
			.05556,
			.48472
		],
		960: [
			0,
			.43056,
			.03588,
			0,
			.57003
		],
		961: [
			.19444,
			.43056,
			0,
			.08334,
			.51702
		],
		962: [
			.09722,
			.43056,
			.07986,
			.08334,
			.36285
		],
		963: [
			0,
			.43056,
			.03588,
			0,
			.57141
		],
		964: [
			0,
			.43056,
			.1132,
			.02778,
			.43715
		],
		965: [
			0,
			.43056,
			.03588,
			.02778,
			.54028
		],
		966: [
			.19444,
			.43056,
			0,
			.08334,
			.65417
		],
		967: [
			.19444,
			.43056,
			0,
			.05556,
			.62569
		],
		968: [
			.19444,
			.69444,
			.03588,
			.11111,
			.65139
		],
		969: [
			0,
			.43056,
			.03588,
			0,
			.62245
		],
		977: [
			0,
			.69444,
			0,
			.08334,
			.59144
		],
		981: [
			.19444,
			.69444,
			0,
			.08334,
			.59583
		],
		982: [
			0,
			.43056,
			.02778,
			0,
			.82813
		],
		1009: [
			.19444,
			.43056,
			0,
			.08334,
			.51702
		],
		1013: [
			0,
			.43056,
			0,
			.05556,
			.4059
		],
		57649: [
			0,
			.43056,
			0,
			.02778,
			.32246
		],
		57911: [
			.19444,
			.43056,
			0,
			.08334,
			.38403
		]
	},
	"SansSerif-Bold": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		33: [
			0,
			.69444,
			0,
			0,
			.36667
		],
		34: [
			0,
			.69444,
			0,
			0,
			.55834
		],
		35: [
			.19444,
			.69444,
			0,
			0,
			.91667
		],
		36: [
			.05556,
			.75,
			0,
			0,
			.55
		],
		37: [
			.05556,
			.75,
			0,
			0,
			1.02912
		],
		38: [
			0,
			.69444,
			0,
			0,
			.83056
		],
		39: [
			0,
			.69444,
			0,
			0,
			.30556
		],
		40: [
			.25,
			.75,
			0,
			0,
			.42778
		],
		41: [
			.25,
			.75,
			0,
			0,
			.42778
		],
		42: [
			0,
			.75,
			0,
			0,
			.55
		],
		43: [
			.11667,
			.61667,
			0,
			0,
			.85556
		],
		44: [
			.10556,
			.13056,
			0,
			0,
			.30556
		],
		45: [
			0,
			.45833,
			0,
			0,
			.36667
		],
		46: [
			0,
			.13056,
			0,
			0,
			.30556
		],
		47: [
			.25,
			.75,
			0,
			0,
			.55
		],
		48: [
			0,
			.69444,
			0,
			0,
			.55
		],
		49: [
			0,
			.69444,
			0,
			0,
			.55
		],
		50: [
			0,
			.69444,
			0,
			0,
			.55
		],
		51: [
			0,
			.69444,
			0,
			0,
			.55
		],
		52: [
			0,
			.69444,
			0,
			0,
			.55
		],
		53: [
			0,
			.69444,
			0,
			0,
			.55
		],
		54: [
			0,
			.69444,
			0,
			0,
			.55
		],
		55: [
			0,
			.69444,
			0,
			0,
			.55
		],
		56: [
			0,
			.69444,
			0,
			0,
			.55
		],
		57: [
			0,
			.69444,
			0,
			0,
			.55
		],
		58: [
			0,
			.45833,
			0,
			0,
			.30556
		],
		59: [
			.10556,
			.45833,
			0,
			0,
			.30556
		],
		61: [
			-.09375,
			.40625,
			0,
			0,
			.85556
		],
		63: [
			0,
			.69444,
			0,
			0,
			.51945
		],
		64: [
			0,
			.69444,
			0,
			0,
			.73334
		],
		65: [
			0,
			.69444,
			0,
			0,
			.73334
		],
		66: [
			0,
			.69444,
			0,
			0,
			.73334
		],
		67: [
			0,
			.69444,
			0,
			0,
			.70278
		],
		68: [
			0,
			.69444,
			0,
			0,
			.79445
		],
		69: [
			0,
			.69444,
			0,
			0,
			.64167
		],
		70: [
			0,
			.69444,
			0,
			0,
			.61111
		],
		71: [
			0,
			.69444,
			0,
			0,
			.73334
		],
		72: [
			0,
			.69444,
			0,
			0,
			.79445
		],
		73: [
			0,
			.69444,
			0,
			0,
			.33056
		],
		74: [
			0,
			.69444,
			0,
			0,
			.51945
		],
		75: [
			0,
			.69444,
			0,
			0,
			.76389
		],
		76: [
			0,
			.69444,
			0,
			0,
			.58056
		],
		77: [
			0,
			.69444,
			0,
			0,
			.97778
		],
		78: [
			0,
			.69444,
			0,
			0,
			.79445
		],
		79: [
			0,
			.69444,
			0,
			0,
			.79445
		],
		80: [
			0,
			.69444,
			0,
			0,
			.70278
		],
		81: [
			.10556,
			.69444,
			0,
			0,
			.79445
		],
		82: [
			0,
			.69444,
			0,
			0,
			.70278
		],
		83: [
			0,
			.69444,
			0,
			0,
			.61111
		],
		84: [
			0,
			.69444,
			0,
			0,
			.73334
		],
		85: [
			0,
			.69444,
			0,
			0,
			.76389
		],
		86: [
			0,
			.69444,
			.01528,
			0,
			.73334
		],
		87: [
			0,
			.69444,
			.01528,
			0,
			1.03889
		],
		88: [
			0,
			.69444,
			0,
			0,
			.73334
		],
		89: [
			0,
			.69444,
			.0275,
			0,
			.73334
		],
		90: [
			0,
			.69444,
			0,
			0,
			.67223
		],
		91: [
			.25,
			.75,
			0,
			0,
			.34306
		],
		93: [
			.25,
			.75,
			0,
			0,
			.34306
		],
		94: [
			0,
			.69444,
			0,
			0,
			.55
		],
		95: [
			.35,
			.10833,
			.03056,
			0,
			.55
		],
		97: [
			0,
			.45833,
			0,
			0,
			.525
		],
		98: [
			0,
			.69444,
			0,
			0,
			.56111
		],
		99: [
			0,
			.45833,
			0,
			0,
			.48889
		],
		100: [
			0,
			.69444,
			0,
			0,
			.56111
		],
		101: [
			0,
			.45833,
			0,
			0,
			.51111
		],
		102: [
			0,
			.69444,
			.07639,
			0,
			.33611
		],
		103: [
			.19444,
			.45833,
			.01528,
			0,
			.55
		],
		104: [
			0,
			.69444,
			0,
			0,
			.56111
		],
		105: [
			0,
			.69444,
			0,
			0,
			.25556
		],
		106: [
			.19444,
			.69444,
			0,
			0,
			.28611
		],
		107: [
			0,
			.69444,
			0,
			0,
			.53056
		],
		108: [
			0,
			.69444,
			0,
			0,
			.25556
		],
		109: [
			0,
			.45833,
			0,
			0,
			.86667
		],
		110: [
			0,
			.45833,
			0,
			0,
			.56111
		],
		111: [
			0,
			.45833,
			0,
			0,
			.55
		],
		112: [
			.19444,
			.45833,
			0,
			0,
			.56111
		],
		113: [
			.19444,
			.45833,
			0,
			0,
			.56111
		],
		114: [
			0,
			.45833,
			.01528,
			0,
			.37222
		],
		115: [
			0,
			.45833,
			0,
			0,
			.42167
		],
		116: [
			0,
			.58929,
			0,
			0,
			.40417
		],
		117: [
			0,
			.45833,
			0,
			0,
			.56111
		],
		118: [
			0,
			.45833,
			.01528,
			0,
			.5
		],
		119: [
			0,
			.45833,
			.01528,
			0,
			.74445
		],
		120: [
			0,
			.45833,
			0,
			0,
			.5
		],
		121: [
			.19444,
			.45833,
			.01528,
			0,
			.5
		],
		122: [
			0,
			.45833,
			0,
			0,
			.47639
		],
		126: [
			.35,
			.34444,
			0,
			0,
			.55
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		168: [
			0,
			.69444,
			0,
			0,
			.55
		],
		176: [
			0,
			.69444,
			0,
			0,
			.73334
		],
		180: [
			0,
			.69444,
			0,
			0,
			.55
		],
		184: [
			.17014,
			0,
			0,
			0,
			.48889
		],
		305: [
			0,
			.45833,
			0,
			0,
			.25556
		],
		567: [
			.19444,
			.45833,
			0,
			0,
			.28611
		],
		710: [
			0,
			.69444,
			0,
			0,
			.55
		],
		711: [
			0,
			.63542,
			0,
			0,
			.55
		],
		713: [
			0,
			.63778,
			0,
			0,
			.55
		],
		728: [
			0,
			.69444,
			0,
			0,
			.55
		],
		729: [
			0,
			.69444,
			0,
			0,
			.30556
		],
		730: [
			0,
			.69444,
			0,
			0,
			.73334
		],
		732: [
			0,
			.69444,
			0,
			0,
			.55
		],
		733: [
			0,
			.69444,
			0,
			0,
			.55
		],
		915: [
			0,
			.69444,
			0,
			0,
			.58056
		],
		916: [
			0,
			.69444,
			0,
			0,
			.91667
		],
		920: [
			0,
			.69444,
			0,
			0,
			.85556
		],
		923: [
			0,
			.69444,
			0,
			0,
			.67223
		],
		926: [
			0,
			.69444,
			0,
			0,
			.73334
		],
		928: [
			0,
			.69444,
			0,
			0,
			.79445
		],
		931: [
			0,
			.69444,
			0,
			0,
			.79445
		],
		933: [
			0,
			.69444,
			0,
			0,
			.85556
		],
		934: [
			0,
			.69444,
			0,
			0,
			.79445
		],
		936: [
			0,
			.69444,
			0,
			0,
			.85556
		],
		937: [
			0,
			.69444,
			0,
			0,
			.79445
		],
		8211: [
			0,
			.45833,
			.03056,
			0,
			.55
		],
		8212: [
			0,
			.45833,
			.03056,
			0,
			1.10001
		],
		8216: [
			0,
			.69444,
			0,
			0,
			.30556
		],
		8217: [
			0,
			.69444,
			0,
			0,
			.30556
		],
		8220: [
			0,
			.69444,
			0,
			0,
			.55834
		],
		8221: [
			0,
			.69444,
			0,
			0,
			.55834
		]
	},
	"SansSerif-Italic": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		33: [
			0,
			.69444,
			.05733,
			0,
			.31945
		],
		34: [
			0,
			.69444,
			.00316,
			0,
			.5
		],
		35: [
			.19444,
			.69444,
			.05087,
			0,
			.83334
		],
		36: [
			.05556,
			.75,
			.11156,
			0,
			.5
		],
		37: [
			.05556,
			.75,
			.03126,
			0,
			.83334
		],
		38: [
			0,
			.69444,
			.03058,
			0,
			.75834
		],
		39: [
			0,
			.69444,
			.07816,
			0,
			.27778
		],
		40: [
			.25,
			.75,
			.13164,
			0,
			.38889
		],
		41: [
			.25,
			.75,
			.02536,
			0,
			.38889
		],
		42: [
			0,
			.75,
			.11775,
			0,
			.5
		],
		43: [
			.08333,
			.58333,
			.02536,
			0,
			.77778
		],
		44: [
			.125,
			.08333,
			0,
			0,
			.27778
		],
		45: [
			0,
			.44444,
			.01946,
			0,
			.33333
		],
		46: [
			0,
			.08333,
			0,
			0,
			.27778
		],
		47: [
			.25,
			.75,
			.13164,
			0,
			.5
		],
		48: [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		49: [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		50: [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		51: [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		52: [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		53: [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		54: [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		55: [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		56: [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		57: [
			0,
			.65556,
			.11156,
			0,
			.5
		],
		58: [
			0,
			.44444,
			.02502,
			0,
			.27778
		],
		59: [
			.125,
			.44444,
			.02502,
			0,
			.27778
		],
		61: [
			-.13,
			.37,
			.05087,
			0,
			.77778
		],
		63: [
			0,
			.69444,
			.11809,
			0,
			.47222
		],
		64: [
			0,
			.69444,
			.07555,
			0,
			.66667
		],
		65: [
			0,
			.69444,
			0,
			0,
			.66667
		],
		66: [
			0,
			.69444,
			.08293,
			0,
			.66667
		],
		67: [
			0,
			.69444,
			.11983,
			0,
			.63889
		],
		68: [
			0,
			.69444,
			.07555,
			0,
			.72223
		],
		69: [
			0,
			.69444,
			.11983,
			0,
			.59722
		],
		70: [
			0,
			.69444,
			.13372,
			0,
			.56945
		],
		71: [
			0,
			.69444,
			.11983,
			0,
			.66667
		],
		72: [
			0,
			.69444,
			.08094,
			0,
			.70834
		],
		73: [
			0,
			.69444,
			.13372,
			0,
			.27778
		],
		74: [
			0,
			.69444,
			.08094,
			0,
			.47222
		],
		75: [
			0,
			.69444,
			.11983,
			0,
			.69445
		],
		76: [
			0,
			.69444,
			0,
			0,
			.54167
		],
		77: [
			0,
			.69444,
			.08094,
			0,
			.875
		],
		78: [
			0,
			.69444,
			.08094,
			0,
			.70834
		],
		79: [
			0,
			.69444,
			.07555,
			0,
			.73611
		],
		80: [
			0,
			.69444,
			.08293,
			0,
			.63889
		],
		81: [
			.125,
			.69444,
			.07555,
			0,
			.73611
		],
		82: [
			0,
			.69444,
			.08293,
			0,
			.64584
		],
		83: [
			0,
			.69444,
			.09205,
			0,
			.55556
		],
		84: [
			0,
			.69444,
			.13372,
			0,
			.68056
		],
		85: [
			0,
			.69444,
			.08094,
			0,
			.6875
		],
		86: [
			0,
			.69444,
			.1615,
			0,
			.66667
		],
		87: [
			0,
			.69444,
			.1615,
			0,
			.94445
		],
		88: [
			0,
			.69444,
			.13372,
			0,
			.66667
		],
		89: [
			0,
			.69444,
			.17261,
			0,
			.66667
		],
		90: [
			0,
			.69444,
			.11983,
			0,
			.61111
		],
		91: [
			.25,
			.75,
			.15942,
			0,
			.28889
		],
		93: [
			.25,
			.75,
			.08719,
			0,
			.28889
		],
		94: [
			0,
			.69444,
			.0799,
			0,
			.5
		],
		95: [
			.35,
			.09444,
			.08616,
			0,
			.5
		],
		97: [
			0,
			.44444,
			.00981,
			0,
			.48056
		],
		98: [
			0,
			.69444,
			.03057,
			0,
			.51667
		],
		99: [
			0,
			.44444,
			.08336,
			0,
			.44445
		],
		100: [
			0,
			.69444,
			.09483,
			0,
			.51667
		],
		101: [
			0,
			.44444,
			.06778,
			0,
			.44445
		],
		102: [
			0,
			.69444,
			.21705,
			0,
			.30556
		],
		103: [
			.19444,
			.44444,
			.10836,
			0,
			.5
		],
		104: [
			0,
			.69444,
			.01778,
			0,
			.51667
		],
		105: [
			0,
			.67937,
			.09718,
			0,
			.23889
		],
		106: [
			.19444,
			.67937,
			.09162,
			0,
			.26667
		],
		107: [
			0,
			.69444,
			.08336,
			0,
			.48889
		],
		108: [
			0,
			.69444,
			.09483,
			0,
			.23889
		],
		109: [
			0,
			.44444,
			.01778,
			0,
			.79445
		],
		110: [
			0,
			.44444,
			.01778,
			0,
			.51667
		],
		111: [
			0,
			.44444,
			.06613,
			0,
			.5
		],
		112: [
			.19444,
			.44444,
			.0389,
			0,
			.51667
		],
		113: [
			.19444,
			.44444,
			.04169,
			0,
			.51667
		],
		114: [
			0,
			.44444,
			.10836,
			0,
			.34167
		],
		115: [
			0,
			.44444,
			.0778,
			0,
			.38333
		],
		116: [
			0,
			.57143,
			.07225,
			0,
			.36111
		],
		117: [
			0,
			.44444,
			.04169,
			0,
			.51667
		],
		118: [
			0,
			.44444,
			.10836,
			0,
			.46111
		],
		119: [
			0,
			.44444,
			.10836,
			0,
			.68334
		],
		120: [
			0,
			.44444,
			.09169,
			0,
			.46111
		],
		121: [
			.19444,
			.44444,
			.10836,
			0,
			.46111
		],
		122: [
			0,
			.44444,
			.08752,
			0,
			.43472
		],
		126: [
			.35,
			.32659,
			.08826,
			0,
			.5
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		168: [
			0,
			.67937,
			.06385,
			0,
			.5
		],
		176: [
			0,
			.69444,
			0,
			0,
			.73752
		],
		184: [
			.17014,
			0,
			0,
			0,
			.44445
		],
		305: [
			0,
			.44444,
			.04169,
			0,
			.23889
		],
		567: [
			.19444,
			.44444,
			.04169,
			0,
			.26667
		],
		710: [
			0,
			.69444,
			.0799,
			0,
			.5
		],
		711: [
			0,
			.63194,
			.08432,
			0,
			.5
		],
		713: [
			0,
			.60889,
			.08776,
			0,
			.5
		],
		714: [
			0,
			.69444,
			.09205,
			0,
			.5
		],
		715: [
			0,
			.69444,
			0,
			0,
			.5
		],
		728: [
			0,
			.69444,
			.09483,
			0,
			.5
		],
		729: [
			0,
			.67937,
			.07774,
			0,
			.27778
		],
		730: [
			0,
			.69444,
			0,
			0,
			.73752
		],
		732: [
			0,
			.67659,
			.08826,
			0,
			.5
		],
		733: [
			0,
			.69444,
			.09205,
			0,
			.5
		],
		915: [
			0,
			.69444,
			.13372,
			0,
			.54167
		],
		916: [
			0,
			.69444,
			0,
			0,
			.83334
		],
		920: [
			0,
			.69444,
			.07555,
			0,
			.77778
		],
		923: [
			0,
			.69444,
			0,
			0,
			.61111
		],
		926: [
			0,
			.69444,
			.12816,
			0,
			.66667
		],
		928: [
			0,
			.69444,
			.08094,
			0,
			.70834
		],
		931: [
			0,
			.69444,
			.11983,
			0,
			.72222
		],
		933: [
			0,
			.69444,
			.09031,
			0,
			.77778
		],
		934: [
			0,
			.69444,
			.04603,
			0,
			.72222
		],
		936: [
			0,
			.69444,
			.09031,
			0,
			.77778
		],
		937: [
			0,
			.69444,
			.08293,
			0,
			.72222
		],
		8211: [
			0,
			.44444,
			.08616,
			0,
			.5
		],
		8212: [
			0,
			.44444,
			.08616,
			0,
			1
		],
		8216: [
			0,
			.69444,
			.07816,
			0,
			.27778
		],
		8217: [
			0,
			.69444,
			.07816,
			0,
			.27778
		],
		8220: [
			0,
			.69444,
			.14205,
			0,
			.5
		],
		8221: [
			0,
			.69444,
			.00316,
			0,
			.5
		]
	},
	"SansSerif-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		33: [
			0,
			.69444,
			0,
			0,
			.31945
		],
		34: [
			0,
			.69444,
			0,
			0,
			.5
		],
		35: [
			.19444,
			.69444,
			0,
			0,
			.83334
		],
		36: [
			.05556,
			.75,
			0,
			0,
			.5
		],
		37: [
			.05556,
			.75,
			0,
			0,
			.83334
		],
		38: [
			0,
			.69444,
			0,
			0,
			.75834
		],
		39: [
			0,
			.69444,
			0,
			0,
			.27778
		],
		40: [
			.25,
			.75,
			0,
			0,
			.38889
		],
		41: [
			.25,
			.75,
			0,
			0,
			.38889
		],
		42: [
			0,
			.75,
			0,
			0,
			.5
		],
		43: [
			.08333,
			.58333,
			0,
			0,
			.77778
		],
		44: [
			.125,
			.08333,
			0,
			0,
			.27778
		],
		45: [
			0,
			.44444,
			0,
			0,
			.33333
		],
		46: [
			0,
			.08333,
			0,
			0,
			.27778
		],
		47: [
			.25,
			.75,
			0,
			0,
			.5
		],
		48: [
			0,
			.65556,
			0,
			0,
			.5
		],
		49: [
			0,
			.65556,
			0,
			0,
			.5
		],
		50: [
			0,
			.65556,
			0,
			0,
			.5
		],
		51: [
			0,
			.65556,
			0,
			0,
			.5
		],
		52: [
			0,
			.65556,
			0,
			0,
			.5
		],
		53: [
			0,
			.65556,
			0,
			0,
			.5
		],
		54: [
			0,
			.65556,
			0,
			0,
			.5
		],
		55: [
			0,
			.65556,
			0,
			0,
			.5
		],
		56: [
			0,
			.65556,
			0,
			0,
			.5
		],
		57: [
			0,
			.65556,
			0,
			0,
			.5
		],
		58: [
			0,
			.44444,
			0,
			0,
			.27778
		],
		59: [
			.125,
			.44444,
			0,
			0,
			.27778
		],
		61: [
			-.13,
			.37,
			0,
			0,
			.77778
		],
		63: [
			0,
			.69444,
			0,
			0,
			.47222
		],
		64: [
			0,
			.69444,
			0,
			0,
			.66667
		],
		65: [
			0,
			.69444,
			0,
			0,
			.66667
		],
		66: [
			0,
			.69444,
			0,
			0,
			.66667
		],
		67: [
			0,
			.69444,
			0,
			0,
			.63889
		],
		68: [
			0,
			.69444,
			0,
			0,
			.72223
		],
		69: [
			0,
			.69444,
			0,
			0,
			.59722
		],
		70: [
			0,
			.69444,
			0,
			0,
			.56945
		],
		71: [
			0,
			.69444,
			0,
			0,
			.66667
		],
		72: [
			0,
			.69444,
			0,
			0,
			.70834
		],
		73: [
			0,
			.69444,
			0,
			0,
			.27778
		],
		74: [
			0,
			.69444,
			0,
			0,
			.47222
		],
		75: [
			0,
			.69444,
			0,
			0,
			.69445
		],
		76: [
			0,
			.69444,
			0,
			0,
			.54167
		],
		77: [
			0,
			.69444,
			0,
			0,
			.875
		],
		78: [
			0,
			.69444,
			0,
			0,
			.70834
		],
		79: [
			0,
			.69444,
			0,
			0,
			.73611
		],
		80: [
			0,
			.69444,
			0,
			0,
			.63889
		],
		81: [
			.125,
			.69444,
			0,
			0,
			.73611
		],
		82: [
			0,
			.69444,
			0,
			0,
			.64584
		],
		83: [
			0,
			.69444,
			0,
			0,
			.55556
		],
		84: [
			0,
			.69444,
			0,
			0,
			.68056
		],
		85: [
			0,
			.69444,
			0,
			0,
			.6875
		],
		86: [
			0,
			.69444,
			.01389,
			0,
			.66667
		],
		87: [
			0,
			.69444,
			.01389,
			0,
			.94445
		],
		88: [
			0,
			.69444,
			0,
			0,
			.66667
		],
		89: [
			0,
			.69444,
			.025,
			0,
			.66667
		],
		90: [
			0,
			.69444,
			0,
			0,
			.61111
		],
		91: [
			.25,
			.75,
			0,
			0,
			.28889
		],
		93: [
			.25,
			.75,
			0,
			0,
			.28889
		],
		94: [
			0,
			.69444,
			0,
			0,
			.5
		],
		95: [
			.35,
			.09444,
			.02778,
			0,
			.5
		],
		97: [
			0,
			.44444,
			0,
			0,
			.48056
		],
		98: [
			0,
			.69444,
			0,
			0,
			.51667
		],
		99: [
			0,
			.44444,
			0,
			0,
			.44445
		],
		100: [
			0,
			.69444,
			0,
			0,
			.51667
		],
		101: [
			0,
			.44444,
			0,
			0,
			.44445
		],
		102: [
			0,
			.69444,
			.06944,
			0,
			.30556
		],
		103: [
			.19444,
			.44444,
			.01389,
			0,
			.5
		],
		104: [
			0,
			.69444,
			0,
			0,
			.51667
		],
		105: [
			0,
			.67937,
			0,
			0,
			.23889
		],
		106: [
			.19444,
			.67937,
			0,
			0,
			.26667
		],
		107: [
			0,
			.69444,
			0,
			0,
			.48889
		],
		108: [
			0,
			.69444,
			0,
			0,
			.23889
		],
		109: [
			0,
			.44444,
			0,
			0,
			.79445
		],
		110: [
			0,
			.44444,
			0,
			0,
			.51667
		],
		111: [
			0,
			.44444,
			0,
			0,
			.5
		],
		112: [
			.19444,
			.44444,
			0,
			0,
			.51667
		],
		113: [
			.19444,
			.44444,
			0,
			0,
			.51667
		],
		114: [
			0,
			.44444,
			.01389,
			0,
			.34167
		],
		115: [
			0,
			.44444,
			0,
			0,
			.38333
		],
		116: [
			0,
			.57143,
			0,
			0,
			.36111
		],
		117: [
			0,
			.44444,
			0,
			0,
			.51667
		],
		118: [
			0,
			.44444,
			.01389,
			0,
			.46111
		],
		119: [
			0,
			.44444,
			.01389,
			0,
			.68334
		],
		120: [
			0,
			.44444,
			0,
			0,
			.46111
		],
		121: [
			.19444,
			.44444,
			.01389,
			0,
			.46111
		],
		122: [
			0,
			.44444,
			0,
			0,
			.43472
		],
		126: [
			.35,
			.32659,
			0,
			0,
			.5
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		168: [
			0,
			.67937,
			0,
			0,
			.5
		],
		176: [
			0,
			.69444,
			0,
			0,
			.66667
		],
		184: [
			.17014,
			0,
			0,
			0,
			.44445
		],
		305: [
			0,
			.44444,
			0,
			0,
			.23889
		],
		567: [
			.19444,
			.44444,
			0,
			0,
			.26667
		],
		710: [
			0,
			.69444,
			0,
			0,
			.5
		],
		711: [
			0,
			.63194,
			0,
			0,
			.5
		],
		713: [
			0,
			.60889,
			0,
			0,
			.5
		],
		714: [
			0,
			.69444,
			0,
			0,
			.5
		],
		715: [
			0,
			.69444,
			0,
			0,
			.5
		],
		728: [
			0,
			.69444,
			0,
			0,
			.5
		],
		729: [
			0,
			.67937,
			0,
			0,
			.27778
		],
		730: [
			0,
			.69444,
			0,
			0,
			.66667
		],
		732: [
			0,
			.67659,
			0,
			0,
			.5
		],
		733: [
			0,
			.69444,
			0,
			0,
			.5
		],
		915: [
			0,
			.69444,
			0,
			0,
			.54167
		],
		916: [
			0,
			.69444,
			0,
			0,
			.83334
		],
		920: [
			0,
			.69444,
			0,
			0,
			.77778
		],
		923: [
			0,
			.69444,
			0,
			0,
			.61111
		],
		926: [
			0,
			.69444,
			0,
			0,
			.66667
		],
		928: [
			0,
			.69444,
			0,
			0,
			.70834
		],
		931: [
			0,
			.69444,
			0,
			0,
			.72222
		],
		933: [
			0,
			.69444,
			0,
			0,
			.77778
		],
		934: [
			0,
			.69444,
			0,
			0,
			.72222
		],
		936: [
			0,
			.69444,
			0,
			0,
			.77778
		],
		937: [
			0,
			.69444,
			0,
			0,
			.72222
		],
		8211: [
			0,
			.44444,
			.02778,
			0,
			.5
		],
		8212: [
			0,
			.44444,
			.02778,
			0,
			1
		],
		8216: [
			0,
			.69444,
			0,
			0,
			.27778
		],
		8217: [
			0,
			.69444,
			0,
			0,
			.27778
		],
		8220: [
			0,
			.69444,
			0,
			0,
			.5
		],
		8221: [
			0,
			.69444,
			0,
			0,
			.5
		]
	},
	"Script-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		65: [
			0,
			.7,
			.22925,
			0,
			.80253
		],
		66: [
			0,
			.7,
			.04087,
			0,
			.90757
		],
		67: [
			0,
			.7,
			.1689,
			0,
			.66619
		],
		68: [
			0,
			.7,
			.09371,
			0,
			.77443
		],
		69: [
			0,
			.7,
			.18583,
			0,
			.56162
		],
		70: [
			0,
			.7,
			.13634,
			0,
			.89544
		],
		71: [
			0,
			.7,
			.17322,
			0,
			.60961
		],
		72: [
			0,
			.7,
			.29694,
			0,
			.96919
		],
		73: [
			0,
			.7,
			.19189,
			0,
			.80907
		],
		74: [
			.27778,
			.7,
			.19189,
			0,
			1.05159
		],
		75: [
			0,
			.7,
			.31259,
			0,
			.91364
		],
		76: [
			0,
			.7,
			.19189,
			0,
			.87373
		],
		77: [
			0,
			.7,
			.15981,
			0,
			1.08031
		],
		78: [
			0,
			.7,
			.3525,
			0,
			.9015
		],
		79: [
			0,
			.7,
			.08078,
			0,
			.73787
		],
		80: [
			0,
			.7,
			.08078,
			0,
			1.01262
		],
		81: [
			0,
			.7,
			.03305,
			0,
			.88282
		],
		82: [
			0,
			.7,
			.06259,
			0,
			.85
		],
		83: [
			0,
			.7,
			.19189,
			0,
			.86767
		],
		84: [
			0,
			.7,
			.29087,
			0,
			.74697
		],
		85: [
			0,
			.7,
			.25815,
			0,
			.79996
		],
		86: [
			0,
			.7,
			.27523,
			0,
			.62204
		],
		87: [
			0,
			.7,
			.27523,
			0,
			.80532
		],
		88: [
			0,
			.7,
			.26006,
			0,
			.94445
		],
		89: [
			0,
			.7,
			.2939,
			0,
			.70961
		],
		90: [
			0,
			.7,
			.24037,
			0,
			.8212
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		]
	},
	"Size1-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		40: [
			.35001,
			.85,
			0,
			0,
			.45834
		],
		41: [
			.35001,
			.85,
			0,
			0,
			.45834
		],
		47: [
			.35001,
			.85,
			0,
			0,
			.57778
		],
		91: [
			.35001,
			.85,
			0,
			0,
			.41667
		],
		92: [
			.35001,
			.85,
			0,
			0,
			.57778
		],
		93: [
			.35001,
			.85,
			0,
			0,
			.41667
		],
		123: [
			.35001,
			.85,
			0,
			0,
			.58334
		],
		125: [
			.35001,
			.85,
			0,
			0,
			.58334
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		710: [
			0,
			.72222,
			0,
			0,
			.55556
		],
		732: [
			0,
			.72222,
			0,
			0,
			.55556
		],
		770: [
			0,
			.72222,
			0,
			0,
			.55556
		],
		771: [
			0,
			.72222,
			0,
			0,
			.55556
		],
		8214: [
			-99e-5,
			.601,
			0,
			0,
			.77778
		],
		8593: [
			1e-5,
			.6,
			0,
			0,
			.66667
		],
		8595: [
			1e-5,
			.6,
			0,
			0,
			.66667
		],
		8657: [
			1e-5,
			.6,
			0,
			0,
			.77778
		],
		8659: [
			1e-5,
			.6,
			0,
			0,
			.77778
		],
		8719: [
			.25001,
			.75,
			0,
			0,
			.94445
		],
		8720: [
			.25001,
			.75,
			0,
			0,
			.94445
		],
		8721: [
			.25001,
			.75,
			0,
			0,
			1.05556
		],
		8730: [
			.35001,
			.85,
			0,
			0,
			1
		],
		8739: [
			-.00599,
			.606,
			0,
			0,
			.33333
		],
		8741: [
			-.00599,
			.606,
			0,
			0,
			.55556
		],
		8747: [
			.30612,
			.805,
			.19445,
			0,
			.47222
		],
		8748: [
			.306,
			.805,
			.19445,
			0,
			.47222
		],
		8749: [
			.306,
			.805,
			.19445,
			0,
			.47222
		],
		8750: [
			.30612,
			.805,
			.19445,
			0,
			.47222
		],
		8896: [
			.25001,
			.75,
			0,
			0,
			.83334
		],
		8897: [
			.25001,
			.75,
			0,
			0,
			.83334
		],
		8898: [
			.25001,
			.75,
			0,
			0,
			.83334
		],
		8899: [
			.25001,
			.75,
			0,
			0,
			.83334
		],
		8968: [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		8969: [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		8970: [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		8971: [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		9168: [
			-99e-5,
			.601,
			0,
			0,
			.66667
		],
		10216: [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		10217: [
			.35001,
			.85,
			0,
			0,
			.47222
		],
		10752: [
			.25001,
			.75,
			0,
			0,
			1.11111
		],
		10753: [
			.25001,
			.75,
			0,
			0,
			1.11111
		],
		10754: [
			.25001,
			.75,
			0,
			0,
			1.11111
		],
		10756: [
			.25001,
			.75,
			0,
			0,
			.83334
		],
		10758: [
			.25001,
			.75,
			0,
			0,
			.83334
		]
	},
	"Size2-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		40: [
			.65002,
			1.15,
			0,
			0,
			.59722
		],
		41: [
			.65002,
			1.15,
			0,
			0,
			.59722
		],
		47: [
			.65002,
			1.15,
			0,
			0,
			.81111
		],
		91: [
			.65002,
			1.15,
			0,
			0,
			.47222
		],
		92: [
			.65002,
			1.15,
			0,
			0,
			.81111
		],
		93: [
			.65002,
			1.15,
			0,
			0,
			.47222
		],
		123: [
			.65002,
			1.15,
			0,
			0,
			.66667
		],
		125: [
			.65002,
			1.15,
			0,
			0,
			.66667
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		710: [
			0,
			.75,
			0,
			0,
			1
		],
		732: [
			0,
			.75,
			0,
			0,
			1
		],
		770: [
			0,
			.75,
			0,
			0,
			1
		],
		771: [
			0,
			.75,
			0,
			0,
			1
		],
		8719: [
			.55001,
			1.05,
			0,
			0,
			1.27778
		],
		8720: [
			.55001,
			1.05,
			0,
			0,
			1.27778
		],
		8721: [
			.55001,
			1.05,
			0,
			0,
			1.44445
		],
		8730: [
			.65002,
			1.15,
			0,
			0,
			1
		],
		8747: [
			.86225,
			1.36,
			.44445,
			0,
			.55556
		],
		8748: [
			.862,
			1.36,
			.44445,
			0,
			.55556
		],
		8749: [
			.862,
			1.36,
			.44445,
			0,
			.55556
		],
		8750: [
			.86225,
			1.36,
			.44445,
			0,
			.55556
		],
		8896: [
			.55001,
			1.05,
			0,
			0,
			1.11111
		],
		8897: [
			.55001,
			1.05,
			0,
			0,
			1.11111
		],
		8898: [
			.55001,
			1.05,
			0,
			0,
			1.11111
		],
		8899: [
			.55001,
			1.05,
			0,
			0,
			1.11111
		],
		8968: [
			.65002,
			1.15,
			0,
			0,
			.52778
		],
		8969: [
			.65002,
			1.15,
			0,
			0,
			.52778
		],
		8970: [
			.65002,
			1.15,
			0,
			0,
			.52778
		],
		8971: [
			.65002,
			1.15,
			0,
			0,
			.52778
		],
		10216: [
			.65002,
			1.15,
			0,
			0,
			.61111
		],
		10217: [
			.65002,
			1.15,
			0,
			0,
			.61111
		],
		10752: [
			.55001,
			1.05,
			0,
			0,
			1.51112
		],
		10753: [
			.55001,
			1.05,
			0,
			0,
			1.51112
		],
		10754: [
			.55001,
			1.05,
			0,
			0,
			1.51112
		],
		10756: [
			.55001,
			1.05,
			0,
			0,
			1.11111
		],
		10758: [
			.55001,
			1.05,
			0,
			0,
			1.11111
		]
	},
	"Size3-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		40: [
			.95003,
			1.45,
			0,
			0,
			.73611
		],
		41: [
			.95003,
			1.45,
			0,
			0,
			.73611
		],
		47: [
			.95003,
			1.45,
			0,
			0,
			1.04445
		],
		91: [
			.95003,
			1.45,
			0,
			0,
			.52778
		],
		92: [
			.95003,
			1.45,
			0,
			0,
			1.04445
		],
		93: [
			.95003,
			1.45,
			0,
			0,
			.52778
		],
		123: [
			.95003,
			1.45,
			0,
			0,
			.75
		],
		125: [
			.95003,
			1.45,
			0,
			0,
			.75
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		710: [
			0,
			.75,
			0,
			0,
			1.44445
		],
		732: [
			0,
			.75,
			0,
			0,
			1.44445
		],
		770: [
			0,
			.75,
			0,
			0,
			1.44445
		],
		771: [
			0,
			.75,
			0,
			0,
			1.44445
		],
		8730: [
			.95003,
			1.45,
			0,
			0,
			1
		],
		8968: [
			.95003,
			1.45,
			0,
			0,
			.58334
		],
		8969: [
			.95003,
			1.45,
			0,
			0,
			.58334
		],
		8970: [
			.95003,
			1.45,
			0,
			0,
			.58334
		],
		8971: [
			.95003,
			1.45,
			0,
			0,
			.58334
		],
		10216: [
			.95003,
			1.45,
			0,
			0,
			.75
		],
		10217: [
			.95003,
			1.45,
			0,
			0,
			.75
		]
	},
	"Size4-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.25
		],
		40: [
			1.25003,
			1.75,
			0,
			0,
			.79167
		],
		41: [
			1.25003,
			1.75,
			0,
			0,
			.79167
		],
		47: [
			1.25003,
			1.75,
			0,
			0,
			1.27778
		],
		91: [
			1.25003,
			1.75,
			0,
			0,
			.58334
		],
		92: [
			1.25003,
			1.75,
			0,
			0,
			1.27778
		],
		93: [
			1.25003,
			1.75,
			0,
			0,
			.58334
		],
		123: [
			1.25003,
			1.75,
			0,
			0,
			.80556
		],
		125: [
			1.25003,
			1.75,
			0,
			0,
			.80556
		],
		160: [
			0,
			0,
			0,
			0,
			.25
		],
		710: [
			0,
			.825,
			0,
			0,
			1.8889
		],
		732: [
			0,
			.825,
			0,
			0,
			1.8889
		],
		770: [
			0,
			.825,
			0,
			0,
			1.8889
		],
		771: [
			0,
			.825,
			0,
			0,
			1.8889
		],
		8730: [
			1.25003,
			1.75,
			0,
			0,
			1
		],
		8968: [
			1.25003,
			1.75,
			0,
			0,
			.63889
		],
		8969: [
			1.25003,
			1.75,
			0,
			0,
			.63889
		],
		8970: [
			1.25003,
			1.75,
			0,
			0,
			.63889
		],
		8971: [
			1.25003,
			1.75,
			0,
			0,
			.63889
		],
		9115: [
			.64502,
			1.155,
			0,
			0,
			.875
		],
		9116: [
			1e-5,
			.6,
			0,
			0,
			.875
		],
		9117: [
			.64502,
			1.155,
			0,
			0,
			.875
		],
		9118: [
			.64502,
			1.155,
			0,
			0,
			.875
		],
		9119: [
			1e-5,
			.6,
			0,
			0,
			.875
		],
		9120: [
			.64502,
			1.155,
			0,
			0,
			.875
		],
		9121: [
			.64502,
			1.155,
			0,
			0,
			.66667
		],
		9122: [
			-99e-5,
			.601,
			0,
			0,
			.66667
		],
		9123: [
			.64502,
			1.155,
			0,
			0,
			.66667
		],
		9124: [
			.64502,
			1.155,
			0,
			0,
			.66667
		],
		9125: [
			-99e-5,
			.601,
			0,
			0,
			.66667
		],
		9126: [
			.64502,
			1.155,
			0,
			0,
			.66667
		],
		9127: [
			1e-5,
			.9,
			0,
			0,
			.88889
		],
		9128: [
			.65002,
			1.15,
			0,
			0,
			.88889
		],
		9129: [
			.90001,
			0,
			0,
			0,
			.88889
		],
		9130: [
			0,
			.3,
			0,
			0,
			.88889
		],
		9131: [
			1e-5,
			.9,
			0,
			0,
			.88889
		],
		9132: [
			.65002,
			1.15,
			0,
			0,
			.88889
		],
		9133: [
			.90001,
			0,
			0,
			0,
			.88889
		],
		9143: [
			.88502,
			.915,
			0,
			0,
			1.05556
		],
		10216: [
			1.25003,
			1.75,
			0,
			0,
			.80556
		],
		10217: [
			1.25003,
			1.75,
			0,
			0,
			.80556
		],
		57344: [
			-.00499,
			.605,
			0,
			0,
			1.05556
		],
		57345: [
			-.00499,
			.605,
			0,
			0,
			1.05556
		],
		57680: [
			0,
			.12,
			0,
			0,
			.45
		],
		57681: [
			0,
			.12,
			0,
			0,
			.45
		],
		57682: [
			0,
			.12,
			0,
			0,
			.45
		],
		57683: [
			0,
			.12,
			0,
			0,
			.45
		]
	},
	"Typewriter-Regular": {
		32: [
			0,
			0,
			0,
			0,
			.525
		],
		33: [
			0,
			.61111,
			0,
			0,
			.525
		],
		34: [
			0,
			.61111,
			0,
			0,
			.525
		],
		35: [
			0,
			.61111,
			0,
			0,
			.525
		],
		36: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		37: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		38: [
			0,
			.61111,
			0,
			0,
			.525
		],
		39: [
			0,
			.61111,
			0,
			0,
			.525
		],
		40: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		41: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		42: [
			0,
			.52083,
			0,
			0,
			.525
		],
		43: [
			-.08056,
			.53055,
			0,
			0,
			.525
		],
		44: [
			.13889,
			.125,
			0,
			0,
			.525
		],
		45: [
			-.08056,
			.53055,
			0,
			0,
			.525
		],
		46: [
			0,
			.125,
			0,
			0,
			.525
		],
		47: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		48: [
			0,
			.61111,
			0,
			0,
			.525
		],
		49: [
			0,
			.61111,
			0,
			0,
			.525
		],
		50: [
			0,
			.61111,
			0,
			0,
			.525
		],
		51: [
			0,
			.61111,
			0,
			0,
			.525
		],
		52: [
			0,
			.61111,
			0,
			0,
			.525
		],
		53: [
			0,
			.61111,
			0,
			0,
			.525
		],
		54: [
			0,
			.61111,
			0,
			0,
			.525
		],
		55: [
			0,
			.61111,
			0,
			0,
			.525
		],
		56: [
			0,
			.61111,
			0,
			0,
			.525
		],
		57: [
			0,
			.61111,
			0,
			0,
			.525
		],
		58: [
			0,
			.43056,
			0,
			0,
			.525
		],
		59: [
			.13889,
			.43056,
			0,
			0,
			.525
		],
		60: [
			-.05556,
			.55556,
			0,
			0,
			.525
		],
		61: [
			-.19549,
			.41562,
			0,
			0,
			.525
		],
		62: [
			-.05556,
			.55556,
			0,
			0,
			.525
		],
		63: [
			0,
			.61111,
			0,
			0,
			.525
		],
		64: [
			0,
			.61111,
			0,
			0,
			.525
		],
		65: [
			0,
			.61111,
			0,
			0,
			.525
		],
		66: [
			0,
			.61111,
			0,
			0,
			.525
		],
		67: [
			0,
			.61111,
			0,
			0,
			.525
		],
		68: [
			0,
			.61111,
			0,
			0,
			.525
		],
		69: [
			0,
			.61111,
			0,
			0,
			.525
		],
		70: [
			0,
			.61111,
			0,
			0,
			.525
		],
		71: [
			0,
			.61111,
			0,
			0,
			.525
		],
		72: [
			0,
			.61111,
			0,
			0,
			.525
		],
		73: [
			0,
			.61111,
			0,
			0,
			.525
		],
		74: [
			0,
			.61111,
			0,
			0,
			.525
		],
		75: [
			0,
			.61111,
			0,
			0,
			.525
		],
		76: [
			0,
			.61111,
			0,
			0,
			.525
		],
		77: [
			0,
			.61111,
			0,
			0,
			.525
		],
		78: [
			0,
			.61111,
			0,
			0,
			.525
		],
		79: [
			0,
			.61111,
			0,
			0,
			.525
		],
		80: [
			0,
			.61111,
			0,
			0,
			.525
		],
		81: [
			.13889,
			.61111,
			0,
			0,
			.525
		],
		82: [
			0,
			.61111,
			0,
			0,
			.525
		],
		83: [
			0,
			.61111,
			0,
			0,
			.525
		],
		84: [
			0,
			.61111,
			0,
			0,
			.525
		],
		85: [
			0,
			.61111,
			0,
			0,
			.525
		],
		86: [
			0,
			.61111,
			0,
			0,
			.525
		],
		87: [
			0,
			.61111,
			0,
			0,
			.525
		],
		88: [
			0,
			.61111,
			0,
			0,
			.525
		],
		89: [
			0,
			.61111,
			0,
			0,
			.525
		],
		90: [
			0,
			.61111,
			0,
			0,
			.525
		],
		91: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		92: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		93: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		94: [
			0,
			.61111,
			0,
			0,
			.525
		],
		95: [
			.09514,
			0,
			0,
			0,
			.525
		],
		96: [
			0,
			.61111,
			0,
			0,
			.525
		],
		97: [
			0,
			.43056,
			0,
			0,
			.525
		],
		98: [
			0,
			.61111,
			0,
			0,
			.525
		],
		99: [
			0,
			.43056,
			0,
			0,
			.525
		],
		100: [
			0,
			.61111,
			0,
			0,
			.525
		],
		101: [
			0,
			.43056,
			0,
			0,
			.525
		],
		102: [
			0,
			.61111,
			0,
			0,
			.525
		],
		103: [
			.22222,
			.43056,
			0,
			0,
			.525
		],
		104: [
			0,
			.61111,
			0,
			0,
			.525
		],
		105: [
			0,
			.61111,
			0,
			0,
			.525
		],
		106: [
			.22222,
			.61111,
			0,
			0,
			.525
		],
		107: [
			0,
			.61111,
			0,
			0,
			.525
		],
		108: [
			0,
			.61111,
			0,
			0,
			.525
		],
		109: [
			0,
			.43056,
			0,
			0,
			.525
		],
		110: [
			0,
			.43056,
			0,
			0,
			.525
		],
		111: [
			0,
			.43056,
			0,
			0,
			.525
		],
		112: [
			.22222,
			.43056,
			0,
			0,
			.525
		],
		113: [
			.22222,
			.43056,
			0,
			0,
			.525
		],
		114: [
			0,
			.43056,
			0,
			0,
			.525
		],
		115: [
			0,
			.43056,
			0,
			0,
			.525
		],
		116: [
			0,
			.55358,
			0,
			0,
			.525
		],
		117: [
			0,
			.43056,
			0,
			0,
			.525
		],
		118: [
			0,
			.43056,
			0,
			0,
			.525
		],
		119: [
			0,
			.43056,
			0,
			0,
			.525
		],
		120: [
			0,
			.43056,
			0,
			0,
			.525
		],
		121: [
			.22222,
			.43056,
			0,
			0,
			.525
		],
		122: [
			0,
			.43056,
			0,
			0,
			.525
		],
		123: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		124: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		125: [
			.08333,
			.69444,
			0,
			0,
			.525
		],
		126: [
			0,
			.61111,
			0,
			0,
			.525
		],
		127: [
			0,
			.61111,
			0,
			0,
			.525
		],
		160: [
			0,
			0,
			0,
			0,
			.525
		],
		176: [
			0,
			.61111,
			0,
			0,
			.525
		],
		184: [
			.19445,
			0,
			0,
			0,
			.525
		],
		305: [
			0,
			.43056,
			0,
			0,
			.525
		],
		567: [
			.22222,
			.43056,
			0,
			0,
			.525
		],
		711: [
			0,
			.56597,
			0,
			0,
			.525
		],
		713: [
			0,
			.56555,
			0,
			0,
			.525
		],
		714: [
			0,
			.61111,
			0,
			0,
			.525
		],
		715: [
			0,
			.61111,
			0,
			0,
			.525
		],
		728: [
			0,
			.61111,
			0,
			0,
			.525
		],
		730: [
			0,
			.61111,
			0,
			0,
			.525
		],
		770: [
			0,
			.61111,
			0,
			0,
			.525
		],
		771: [
			0,
			.61111,
			0,
			0,
			.525
		],
		776: [
			0,
			.61111,
			0,
			0,
			.525
		],
		915: [
			0,
			.61111,
			0,
			0,
			.525
		],
		916: [
			0,
			.61111,
			0,
			0,
			.525
		],
		920: [
			0,
			.61111,
			0,
			0,
			.525
		],
		923: [
			0,
			.61111,
			0,
			0,
			.525
		],
		926: [
			0,
			.61111,
			0,
			0,
			.525
		],
		928: [
			0,
			.61111,
			0,
			0,
			.525
		],
		931: [
			0,
			.61111,
			0,
			0,
			.525
		],
		933: [
			0,
			.61111,
			0,
			0,
			.525
		],
		934: [
			0,
			.61111,
			0,
			0,
			.525
		],
		936: [
			0,
			.61111,
			0,
			0,
			.525
		],
		937: [
			0,
			.61111,
			0,
			0,
			.525
		],
		8216: [
			0,
			.61111,
			0,
			0,
			.525
		],
		8217: [
			0,
			.61111,
			0,
			0,
			.525
		],
		8242: [
			0,
			.61111,
			0,
			0,
			.525
		],
		9251: [
			.11111,
			.21944,
			0,
			0,
			.525
		]
	}
}, qp = {
	slant: [
		.25,
		.25,
		.25
	],
	space: [
		0,
		0,
		0
	],
	stretch: [
		0,
		0,
		0
	],
	shrink: [
		0,
		0,
		0
	],
	xHeight: [
		.431,
		.431,
		.431
	],
	quad: [
		1,
		1.171,
		1.472
	],
	extraSpace: [
		0,
		0,
		0
	],
	num1: [
		.677,
		.732,
		.925
	],
	num2: [
		.394,
		.384,
		.387
	],
	num3: [
		.444,
		.471,
		.504
	],
	denom1: [
		.686,
		.752,
		1.025
	],
	denom2: [
		.345,
		.344,
		.532
	],
	sup1: [
		.413,
		.503,
		.504
	],
	sup2: [
		.363,
		.431,
		.404
	],
	sup3: [
		.289,
		.286,
		.294
	],
	sub1: [
		.15,
		.143,
		.2
	],
	sub2: [
		.247,
		.286,
		.4
	],
	supDrop: [
		.386,
		.353,
		.494
	],
	subDrop: [
		.05,
		.071,
		.1
	],
	delim1: [
		2.39,
		1.7,
		1.98
	],
	delim2: [
		1.01,
		1.157,
		1.42
	],
	axisHeight: [
		.25,
		.25,
		.25
	],
	defaultRuleThickness: [
		.04,
		.049,
		.049
	],
	bigOpSpacing1: [
		.111,
		.111,
		.111
	],
	bigOpSpacing2: [
		.166,
		.166,
		.166
	],
	bigOpSpacing3: [
		.2,
		.2,
		.2
	],
	bigOpSpacing4: [
		.6,
		.611,
		.611
	],
	bigOpSpacing5: [
		.1,
		.143,
		.143
	],
	sqrtRuleThickness: [
		.04,
		.04,
		.04
	],
	ptPerEm: [
		10,
		10,
		10
	],
	doubleRuleSep: [
		.2,
		.2,
		.2
	],
	arrayRuleWidth: [
		.04,
		.04,
		.04
	],
	fboxsep: [
		.3,
		.3,
		.3
	],
	fboxrule: [
		.04,
		.04,
		.04
	]
}, Jp = {
	Å: "A",
	Ð: "D",
	Þ: "o",
	å: "a",
	ð: "d",
	þ: "o",
	А: "A",
	Б: "B",
	В: "B",
	Г: "F",
	Д: "A",
	Е: "E",
	Ж: "K",
	З: "3",
	И: "N",
	Й: "N",
	К: "K",
	Л: "N",
	М: "M",
	Н: "H",
	О: "O",
	П: "N",
	Р: "P",
	С: "C",
	Т: "T",
	У: "y",
	Ф: "O",
	Х: "X",
	Ц: "U",
	Ч: "h",
	Ш: "W",
	Щ: "W",
	Ъ: "B",
	Ы: "X",
	Ь: "B",
	Э: "3",
	Ю: "X",
	Я: "R",
	а: "a",
	б: "b",
	в: "a",
	г: "r",
	д: "y",
	е: "e",
	ж: "m",
	з: "e",
	и: "n",
	й: "n",
	к: "n",
	л: "n",
	м: "m",
	н: "n",
	о: "o",
	п: "n",
	р: "p",
	с: "c",
	т: "o",
	у: "y",
	ф: "b",
	х: "x",
	ц: "n",
	ч: "n",
	ш: "w",
	щ: "w",
	ъ: "a",
	ы: "m",
	ь: "a",
	э: "e",
	ю: "m",
	я: "r"
};
function Yp(e, t) {
	Kp[e] = t;
}
function Xp(e, t, n) {
	if (!Kp[t]) throw Error("Font metrics not found for font: " + t + ".");
	var r = e.charCodeAt(0), i = Kp[t][r];
	if (!i && e[0] in Jp && (r = Jp[e[0]].charCodeAt(0), i = Kp[t][r]), !i && n === "text" && lp(r) && (i = Kp[t][77]), i) return {
		depth: i[0],
		height: i[1],
		italic: i[2],
		skew: i[3],
		width: i[4]
	};
}
var Zp = {};
function Qp(e) {
	var t = e >= 5 ? 0 : e >= 3 ? 1 : 2;
	if (!Zp[t]) {
		var n = Zp[t] = { cssEmPerMu: qp.quad[t] / 18 };
		for (var r in qp) qp.hasOwnProperty(r) && (n[r] = qp[r][t]);
	}
	return Zp[t];
}
var $p = {
	math: {},
	text: {}
};
function z(e, t, n, r, i, a) {
	$p[e][i] = {
		font: t,
		group: n,
		replace: r
	}, a && r && ($p[e][r] = $p[e][i]);
}
var B = "math", V = "text", H = "main", U = "ams", em = "accent-token", W = "bin", tm = "close", nm = "inner", G = "mathord", rm = "op-token", im = "open", am = "punct", K = "rel", om = "spacing", q = "textord";
z(B, H, K, "≡", "\\equiv", !0), z(B, H, K, "≺", "\\prec", !0), z(B, H, K, "≻", "\\succ", !0), z(B, H, K, "∼", "\\sim", !0), z(B, H, K, "⊥", "\\perp"), z(B, H, K, "⪯", "\\preceq", !0), z(B, H, K, "⪰", "\\succeq", !0), z(B, H, K, "≃", "\\simeq", !0), z(B, H, K, "∣", "\\mid", !0), z(B, H, K, "≪", "\\ll", !0), z(B, H, K, "≫", "\\gg", !0), z(B, H, K, "≍", "\\asymp", !0), z(B, H, K, "∥", "\\parallel"), z(B, H, K, "⋈", "\\bowtie", !0), z(B, H, K, "⌣", "\\smile", !0), z(B, H, K, "⊑", "\\sqsubseteq", !0), z(B, H, K, "⊒", "\\sqsupseteq", !0), z(B, H, K, "≐", "\\doteq", !0), z(B, H, K, "⌢", "\\frown", !0), z(B, H, K, "∋", "\\ni", !0), z(B, H, K, "∝", "\\propto", !0), z(B, H, K, "⊢", "\\vdash", !0), z(B, H, K, "⊣", "\\dashv", !0), z(B, H, K, "∋", "\\owns"), z(B, H, am, ".", "\\ldotp"), z(B, H, am, "⋅", "\\cdotp"), z(B, H, am, "⋅", "·"), z(V, H, q, "⋅", "·"), z(B, H, q, "#", "\\#"), z(V, H, q, "#", "\\#"), z(B, H, q, "&", "\\&"), z(V, H, q, "&", "\\&"), z(B, H, q, "ℵ", "\\aleph", !0), z(B, H, q, "∀", "\\forall", !0), z(B, H, q, "ℏ", "\\hbar", !0), z(B, H, q, "∃", "\\exists", !0), z(B, H, q, "∇", "\\nabla", !0), z(B, H, q, "♭", "\\flat", !0), z(B, H, q, "ℓ", "\\ell", !0), z(B, H, q, "♮", "\\natural", !0), z(B, H, q, "♣", "\\clubsuit", !0), z(B, H, q, "℘", "\\wp", !0), z(B, H, q, "♯", "\\sharp", !0), z(B, H, q, "♢", "\\diamondsuit", !0), z(B, H, q, "ℜ", "\\Re", !0), z(B, H, q, "♡", "\\heartsuit", !0), z(B, H, q, "ℑ", "\\Im", !0), z(B, H, q, "♠", "\\spadesuit", !0), z(B, H, q, "§", "\\S", !0), z(V, H, q, "§", "\\S"), z(B, H, q, "¶", "\\P", !0), z(V, H, q, "¶", "\\P"), z(B, H, q, "†", "\\dag"), z(V, H, q, "†", "\\dag"), z(V, H, q, "†", "\\textdagger"), z(B, H, q, "‡", "\\ddag"), z(V, H, q, "‡", "\\ddag"), z(V, H, q, "‡", "\\textdaggerdbl"), z(B, H, tm, "⎱", "\\rmoustache", !0), z(B, H, im, "⎰", "\\lmoustache", !0), z(B, H, tm, "⟯", "\\rgroup", !0), z(B, H, im, "⟮", "\\lgroup", !0), z(B, H, W, "∓", "\\mp", !0), z(B, H, W, "⊖", "\\ominus", !0), z(B, H, W, "⊎", "\\uplus", !0), z(B, H, W, "⊓", "\\sqcap", !0), z(B, H, W, "∗", "\\ast"), z(B, H, W, "⊔", "\\sqcup", !0), z(B, H, W, "◯", "\\bigcirc", !0), z(B, H, W, "∙", "\\bullet", !0), z(B, H, W, "‡", "\\ddagger"), z(B, H, W, "≀", "\\wr", !0), z(B, H, W, "⨿", "\\amalg"), z(B, H, W, "&", "\\And"), z(B, H, K, "⟵", "\\longleftarrow", !0), z(B, H, K, "⇐", "\\Leftarrow", !0), z(B, H, K, "⟸", "\\Longleftarrow", !0), z(B, H, K, "⟶", "\\longrightarrow", !0), z(B, H, K, "⇒", "\\Rightarrow", !0), z(B, H, K, "⟹", "\\Longrightarrow", !0), z(B, H, K, "↔", "\\leftrightarrow", !0), z(B, H, K, "⟷", "\\longleftrightarrow", !0), z(B, H, K, "⇔", "\\Leftrightarrow", !0), z(B, H, K, "⟺", "\\Longleftrightarrow", !0), z(B, H, K, "↦", "\\mapsto", !0), z(B, H, K, "⟼", "\\longmapsto", !0), z(B, H, K, "↗", "\\nearrow", !0), z(B, H, K, "↩", "\\hookleftarrow", !0), z(B, H, K, "↪", "\\hookrightarrow", !0), z(B, H, K, "↘", "\\searrow", !0), z(B, H, K, "↼", "\\leftharpoonup", !0), z(B, H, K, "⇀", "\\rightharpoonup", !0), z(B, H, K, "↙", "\\swarrow", !0), z(B, H, K, "↽", "\\leftharpoondown", !0), z(B, H, K, "⇁", "\\rightharpoondown", !0), z(B, H, K, "↖", "\\nwarrow", !0), z(B, H, K, "⇌", "\\rightleftharpoons", !0), z(B, U, K, "≮", "\\nless", !0), z(B, U, K, "", "\\@nleqslant"), z(B, U, K, "", "\\@nleqq"), z(B, U, K, "⪇", "\\lneq", !0), z(B, U, K, "≨", "\\lneqq", !0), z(B, U, K, "", "\\@lvertneqq"), z(B, U, K, "⋦", "\\lnsim", !0), z(B, U, K, "⪉", "\\lnapprox", !0), z(B, U, K, "⊀", "\\nprec", !0), z(B, U, K, "⋠", "\\npreceq", !0), z(B, U, K, "⋨", "\\precnsim", !0), z(B, U, K, "⪹", "\\precnapprox", !0), z(B, U, K, "≁", "\\nsim", !0), z(B, U, K, "", "\\@nshortmid"), z(B, U, K, "∤", "\\nmid", !0), z(B, U, K, "⊬", "\\nvdash", !0), z(B, U, K, "⊭", "\\nvDash", !0), z(B, U, K, "⋪", "\\ntriangleleft"), z(B, U, K, "⋬", "\\ntrianglelefteq", !0), z(B, U, K, "⊊", "\\subsetneq", !0), z(B, U, K, "", "\\@varsubsetneq"), z(B, U, K, "⫋", "\\subsetneqq", !0), z(B, U, K, "", "\\@varsubsetneqq"), z(B, U, K, "≯", "\\ngtr", !0), z(B, U, K, "", "\\@ngeqslant"), z(B, U, K, "", "\\@ngeqq"), z(B, U, K, "⪈", "\\gneq", !0), z(B, U, K, "≩", "\\gneqq", !0), z(B, U, K, "", "\\@gvertneqq"), z(B, U, K, "⋧", "\\gnsim", !0), z(B, U, K, "⪊", "\\gnapprox", !0), z(B, U, K, "⊁", "\\nsucc", !0), z(B, U, K, "⋡", "\\nsucceq", !0), z(B, U, K, "⋩", "\\succnsim", !0), z(B, U, K, "⪺", "\\succnapprox", !0), z(B, U, K, "≆", "\\ncong", !0), z(B, U, K, "", "\\@nshortparallel"), z(B, U, K, "∦", "\\nparallel", !0), z(B, U, K, "⊯", "\\nVDash", !0), z(B, U, K, "⋫", "\\ntriangleright"), z(B, U, K, "⋭", "\\ntrianglerighteq", !0), z(B, U, K, "", "\\@nsupseteqq"), z(B, U, K, "⊋", "\\supsetneq", !0), z(B, U, K, "", "\\@varsupsetneq"), z(B, U, K, "⫌", "\\supsetneqq", !0), z(B, U, K, "", "\\@varsupsetneqq"), z(B, U, K, "⊮", "\\nVdash", !0), z(B, U, K, "⪵", "\\precneqq", !0), z(B, U, K, "⪶", "\\succneqq", !0), z(B, U, K, "", "\\@nsubseteqq"), z(B, U, W, "⊴", "\\unlhd"), z(B, U, W, "⊵", "\\unrhd"), z(B, U, K, "↚", "\\nleftarrow", !0), z(B, U, K, "↛", "\\nrightarrow", !0), z(B, U, K, "⇍", "\\nLeftarrow", !0), z(B, U, K, "⇏", "\\nRightarrow", !0), z(B, U, K, "↮", "\\nleftrightarrow", !0), z(B, U, K, "⇎", "\\nLeftrightarrow", !0), z(B, U, K, "△", "\\vartriangle"), z(B, U, q, "ℏ", "\\hslash"), z(B, U, q, "▽", "\\triangledown"), z(B, U, q, "◊", "\\lozenge"), z(B, U, q, "Ⓢ", "\\circledS"), z(B, U, q, "®", "\\circledR"), z(V, U, q, "®", "\\circledR"), z(B, U, q, "∡", "\\measuredangle", !0), z(B, U, q, "∄", "\\nexists"), z(B, U, q, "℧", "\\mho"), z(B, U, q, "Ⅎ", "\\Finv", !0), z(B, U, q, "⅁", "\\Game", !0), z(B, U, q, "‵", "\\backprime"), z(B, U, q, "▲", "\\blacktriangle"), z(B, U, q, "▼", "\\blacktriangledown"), z(B, U, q, "■", "\\blacksquare"), z(B, U, q, "⧫", "\\blacklozenge"), z(B, U, q, "★", "\\bigstar"), z(B, U, q, "∢", "\\sphericalangle", !0), z(B, U, q, "∁", "\\complement", !0), z(B, U, q, "ð", "\\eth", !0), z(V, H, q, "ð", "ð"), z(B, U, q, "╱", "\\diagup"), z(B, U, q, "╲", "\\diagdown"), z(B, U, q, "□", "\\square"), z(B, U, q, "□", "\\Box"), z(B, U, q, "◊", "\\Diamond"), z(B, U, q, "¥", "\\yen", !0), z(V, U, q, "¥", "\\yen", !0), z(B, U, q, "✓", "\\checkmark", !0), z(V, U, q, "✓", "\\checkmark"), z(B, U, q, "ℶ", "\\beth", !0), z(B, U, q, "ℸ", "\\daleth", !0), z(B, U, q, "ℷ", "\\gimel", !0), z(B, U, q, "ϝ", "\\digamma", !0), z(B, U, q, "ϰ", "\\varkappa"), z(B, U, im, "┌", "\\@ulcorner", !0), z(B, U, tm, "┐", "\\@urcorner", !0), z(B, U, im, "└", "\\@llcorner", !0), z(B, U, tm, "┘", "\\@lrcorner", !0), z(B, U, K, "≦", "\\leqq", !0), z(B, U, K, "⩽", "\\leqslant", !0), z(B, U, K, "⪕", "\\eqslantless", !0), z(B, U, K, "≲", "\\lesssim", !0), z(B, U, K, "⪅", "\\lessapprox", !0), z(B, U, K, "≊", "\\approxeq", !0), z(B, U, W, "⋖", "\\lessdot"), z(B, U, K, "⋘", "\\lll", !0), z(B, U, K, "≶", "\\lessgtr", !0), z(B, U, K, "⋚", "\\lesseqgtr", !0), z(B, U, K, "⪋", "\\lesseqqgtr", !0), z(B, U, K, "≑", "\\doteqdot"), z(B, U, K, "≓", "\\risingdotseq", !0), z(B, U, K, "≒", "\\fallingdotseq", !0), z(B, U, K, "∽", "\\backsim", !0), z(B, U, K, "⋍", "\\backsimeq", !0), z(B, U, K, "⫅", "\\subseteqq", !0), z(B, U, K, "⋐", "\\Subset", !0), z(B, U, K, "⊏", "\\sqsubset", !0), z(B, U, K, "≼", "\\preccurlyeq", !0), z(B, U, K, "⋞", "\\curlyeqprec", !0), z(B, U, K, "≾", "\\precsim", !0), z(B, U, K, "⪷", "\\precapprox", !0), z(B, U, K, "⊲", "\\vartriangleleft"), z(B, U, K, "⊴", "\\trianglelefteq"), z(B, U, K, "⊨", "\\vDash", !0), z(B, U, K, "⊪", "\\Vvdash", !0), z(B, U, K, "⌣", "\\smallsmile"), z(B, U, K, "⌢", "\\smallfrown"), z(B, U, K, "≏", "\\bumpeq", !0), z(B, U, K, "≎", "\\Bumpeq", !0), z(B, U, K, "≧", "\\geqq", !0), z(B, U, K, "⩾", "\\geqslant", !0), z(B, U, K, "⪖", "\\eqslantgtr", !0), z(B, U, K, "≳", "\\gtrsim", !0), z(B, U, K, "⪆", "\\gtrapprox", !0), z(B, U, W, "⋗", "\\gtrdot"), z(B, U, K, "⋙", "\\ggg", !0), z(B, U, K, "≷", "\\gtrless", !0), z(B, U, K, "⋛", "\\gtreqless", !0), z(B, U, K, "⪌", "\\gtreqqless", !0), z(B, U, K, "≖", "\\eqcirc", !0), z(B, U, K, "≗", "\\circeq", !0), z(B, U, K, "≜", "\\triangleq", !0), z(B, U, K, "∼", "\\thicksim"), z(B, U, K, "≈", "\\thickapprox"), z(B, U, K, "⫆", "\\supseteqq", !0), z(B, U, K, "⋑", "\\Supset", !0), z(B, U, K, "⊐", "\\sqsupset", !0), z(B, U, K, "≽", "\\succcurlyeq", !0), z(B, U, K, "⋟", "\\curlyeqsucc", !0), z(B, U, K, "≿", "\\succsim", !0), z(B, U, K, "⪸", "\\succapprox", !0), z(B, U, K, "⊳", "\\vartriangleright"), z(B, U, K, "⊵", "\\trianglerighteq"), z(B, U, K, "⊩", "\\Vdash", !0), z(B, U, K, "∣", "\\shortmid"), z(B, U, K, "∥", "\\shortparallel"), z(B, U, K, "≬", "\\between", !0), z(B, U, K, "⋔", "\\pitchfork", !0), z(B, U, K, "∝", "\\varpropto"), z(B, U, K, "◀", "\\blacktriangleleft"), z(B, U, K, "∴", "\\therefore", !0), z(B, U, K, "∍", "\\backepsilon"), z(B, U, K, "▶", "\\blacktriangleright"), z(B, U, K, "∵", "\\because", !0), z(B, U, K, "⋘", "\\llless"), z(B, U, K, "⋙", "\\gggtr"), z(B, U, W, "⊲", "\\lhd"), z(B, U, W, "⊳", "\\rhd"), z(B, U, K, "≂", "\\eqsim", !0), z(B, H, K, "⋈", "\\Join"), z(B, U, K, "≑", "\\Doteq", !0), z(B, U, W, "∔", "\\dotplus", !0), z(B, U, W, "∖", "\\smallsetminus"), z(B, U, W, "⋒", "\\Cap", !0), z(B, U, W, "⋓", "\\Cup", !0), z(B, U, W, "⩞", "\\doublebarwedge", !0), z(B, U, W, "⊟", "\\boxminus", !0), z(B, U, W, "⊞", "\\boxplus", !0), z(B, U, W, "⋇", "\\divideontimes", !0), z(B, U, W, "⋉", "\\ltimes", !0), z(B, U, W, "⋊", "\\rtimes", !0), z(B, U, W, "⋋", "\\leftthreetimes", !0), z(B, U, W, "⋌", "\\rightthreetimes", !0), z(B, U, W, "⋏", "\\curlywedge", !0), z(B, U, W, "⋎", "\\curlyvee", !0), z(B, U, W, "⊝", "\\circleddash", !0), z(B, U, W, "⊛", "\\circledast", !0), z(B, U, W, "⋅", "\\centerdot"), z(B, U, W, "⊺", "\\intercal", !0), z(B, U, W, "⋒", "\\doublecap"), z(B, U, W, "⋓", "\\doublecup"), z(B, U, W, "⊠", "\\boxtimes", !0), z(B, U, K, "⇢", "\\dashrightarrow", !0), z(B, U, K, "⇠", "\\dashleftarrow", !0), z(B, U, K, "⇇", "\\leftleftarrows", !0), z(B, U, K, "⇆", "\\leftrightarrows", !0), z(B, U, K, "⇚", "\\Lleftarrow", !0), z(B, U, K, "↞", "\\twoheadleftarrow", !0), z(B, U, K, "↢", "\\leftarrowtail", !0), z(B, U, K, "↫", "\\looparrowleft", !0), z(B, U, K, "⇋", "\\leftrightharpoons", !0), z(B, U, K, "↶", "\\curvearrowleft", !0), z(B, U, K, "↺", "\\circlearrowleft", !0), z(B, U, K, "↰", "\\Lsh", !0), z(B, U, K, "⇈", "\\upuparrows", !0), z(B, U, K, "↿", "\\upharpoonleft", !0), z(B, U, K, "⇃", "\\downharpoonleft", !0), z(B, H, K, "⊶", "\\origof", !0), z(B, H, K, "⊷", "\\imageof", !0), z(B, U, K, "⊸", "\\multimap", !0), z(B, U, K, "↭", "\\leftrightsquigarrow", !0), z(B, U, K, "⇉", "\\rightrightarrows", !0), z(B, U, K, "⇄", "\\rightleftarrows", !0), z(B, U, K, "↠", "\\twoheadrightarrow", !0), z(B, U, K, "↣", "\\rightarrowtail", !0), z(B, U, K, "↬", "\\looparrowright", !0), z(B, U, K, "↷", "\\curvearrowright", !0), z(B, U, K, "↻", "\\circlearrowright", !0), z(B, U, K, "↱", "\\Rsh", !0), z(B, U, K, "⇊", "\\downdownarrows", !0), z(B, U, K, "↾", "\\upharpoonright", !0), z(B, U, K, "⇂", "\\downharpoonright", !0), z(B, U, K, "⇝", "\\rightsquigarrow", !0), z(B, U, K, "⇝", "\\leadsto"), z(B, U, K, "⇛", "\\Rrightarrow", !0), z(B, U, K, "↾", "\\restriction"), z(B, H, q, "‘", "`"), z(B, H, q, "$", "\\$"), z(V, H, q, "$", "\\$"), z(V, H, q, "$", "\\textdollar"), z(B, H, q, "%", "\\%"), z(V, H, q, "%", "\\%"), z(B, H, q, "_", "\\_"), z(V, H, q, "_", "\\_"), z(V, H, q, "_", "\\textunderscore"), z(B, H, q, "∠", "\\angle", !0), z(B, H, q, "∞", "\\infty", !0), z(B, H, q, "′", "\\prime"), z(B, H, q, "△", "\\triangle"), z(B, H, q, "Γ", "\\Gamma", !0), z(B, H, q, "Δ", "\\Delta", !0), z(B, H, q, "Θ", "\\Theta", !0), z(B, H, q, "Λ", "\\Lambda", !0), z(B, H, q, "Ξ", "\\Xi", !0), z(B, H, q, "Π", "\\Pi", !0), z(B, H, q, "Σ", "\\Sigma", !0), z(B, H, q, "Υ", "\\Upsilon", !0), z(B, H, q, "Φ", "\\Phi", !0), z(B, H, q, "Ψ", "\\Psi", !0), z(B, H, q, "Ω", "\\Omega", !0), z(B, H, q, "A", "Α"), z(B, H, q, "B", "Β"), z(B, H, q, "E", "Ε"), z(B, H, q, "Z", "Ζ"), z(B, H, q, "H", "Η"), z(B, H, q, "I", "Ι"), z(B, H, q, "K", "Κ"), z(B, H, q, "M", "Μ"), z(B, H, q, "N", "Ν"), z(B, H, q, "O", "Ο"), z(B, H, q, "P", "Ρ"), z(B, H, q, "T", "Τ"), z(B, H, q, "X", "Χ"), z(B, H, q, "¬", "\\neg", !0), z(B, H, q, "¬", "\\lnot"), z(B, H, q, "⊤", "\\top"), z(B, H, q, "⊥", "\\bot"), z(B, H, q, "∅", "\\emptyset"), z(B, U, q, "∅", "\\varnothing"), z(B, H, G, "α", "\\alpha", !0), z(B, H, G, "β", "\\beta", !0), z(B, H, G, "γ", "\\gamma", !0), z(B, H, G, "δ", "\\delta", !0), z(B, H, G, "ϵ", "\\epsilon", !0), z(B, H, G, "ζ", "\\zeta", !0), z(B, H, G, "η", "\\eta", !0), z(B, H, G, "θ", "\\theta", !0), z(B, H, G, "ι", "\\iota", !0), z(B, H, G, "κ", "\\kappa", !0), z(B, H, G, "λ", "\\lambda", !0), z(B, H, G, "μ", "\\mu", !0), z(B, H, G, "ν", "\\nu", !0), z(B, H, G, "ξ", "\\xi", !0), z(B, H, G, "ο", "\\omicron", !0), z(B, H, G, "π", "\\pi", !0), z(B, H, G, "ρ", "\\rho", !0), z(B, H, G, "σ", "\\sigma", !0), z(B, H, G, "τ", "\\tau", !0), z(B, H, G, "υ", "\\upsilon", !0), z(B, H, G, "ϕ", "\\phi", !0), z(B, H, G, "χ", "\\chi", !0), z(B, H, G, "ψ", "\\psi", !0), z(B, H, G, "ω", "\\omega", !0), z(B, H, G, "ε", "\\varepsilon", !0), z(B, H, G, "ϑ", "\\vartheta", !0), z(B, H, G, "ϖ", "\\varpi", !0), z(B, H, G, "ϱ", "\\varrho", !0), z(B, H, G, "ς", "\\varsigma", !0), z(B, H, G, "φ", "\\varphi", !0), z(B, H, W, "∗", "*", !0), z(B, H, W, "+", "+"), z(B, H, W, "−", "-", !0), z(B, H, W, "⋅", "\\cdot", !0), z(B, H, W, "∘", "\\circ", !0), z(B, H, W, "÷", "\\div", !0), z(B, H, W, "±", "\\pm", !0), z(B, H, W, "×", "\\times", !0), z(B, H, W, "∩", "\\cap", !0), z(B, H, W, "∪", "\\cup", !0), z(B, H, W, "∖", "\\setminus", !0), z(B, H, W, "∧", "\\land"), z(B, H, W, "∨", "\\lor"), z(B, H, W, "∧", "\\wedge", !0), z(B, H, W, "∨", "\\vee", !0), z(B, H, q, "√", "\\surd"), z(B, H, im, "⟨", "\\langle", !0), z(B, H, im, "∣", "\\lvert"), z(B, H, im, "∥", "\\lVert"), z(B, H, tm, "?", "?"), z(B, H, tm, "!", "!"), z(B, H, tm, "⟩", "\\rangle", !0), z(B, H, tm, "∣", "\\rvert"), z(B, H, tm, "∥", "\\rVert"), z(B, H, K, "=", "="), z(B, H, K, ":", ":"), z(B, H, K, "≈", "\\approx", !0), z(B, H, K, "≅", "\\cong", !0), z(B, H, K, "≥", "\\ge"), z(B, H, K, "≥", "\\geq", !0), z(B, H, K, "←", "\\gets"), z(B, H, K, ">", "\\gt", !0), z(B, H, K, "∈", "\\in", !0), z(B, H, K, "", "\\@not"), z(B, H, K, "⊂", "\\subset", !0), z(B, H, K, "⊃", "\\supset", !0), z(B, H, K, "⊆", "\\subseteq", !0), z(B, H, K, "⊇", "\\supseteq", !0), z(B, U, K, "⊈", "\\nsubseteq", !0), z(B, U, K, "⊉", "\\nsupseteq", !0), z(B, H, K, "⊨", "\\models"), z(B, H, K, "←", "\\leftarrow", !0), z(B, H, K, "≤", "\\le"), z(B, H, K, "≤", "\\leq", !0), z(B, H, K, "<", "\\lt", !0), z(B, H, K, "→", "\\rightarrow", !0), z(B, H, K, "→", "\\to"), z(B, U, K, "≱", "\\ngeq", !0), z(B, U, K, "≰", "\\nleq", !0), z(B, H, om, "\xA0", "\\ "), z(B, H, om, "\xA0", "\\space"), z(B, H, om, "\xA0", "\\nobreakspace"), z(V, H, om, "\xA0", "\\ "), z(V, H, om, "\xA0", " "), z(V, H, om, "\xA0", "\\space"), z(V, H, om, "\xA0", "\\nobreakspace"), z(B, H, om, "", "\\nobreak"), z(B, H, om, "", "\\allowbreak"), z(B, H, am, ",", ","), z(B, H, am, ";", ";"), z(B, U, W, "⊼", "\\barwedge", !0), z(B, U, W, "⊻", "\\veebar", !0), z(B, H, W, "⊙", "\\odot", !0), z(B, H, W, "⊕", "\\oplus", !0), z(B, H, W, "⊗", "\\otimes", !0), z(B, H, q, "∂", "\\partial", !0), z(B, H, W, "⊘", "\\oslash", !0), z(B, U, W, "⊚", "\\circledcirc", !0), z(B, U, W, "⊡", "\\boxdot", !0), z(B, H, W, "△", "\\bigtriangleup"), z(B, H, W, "▽", "\\bigtriangledown"), z(B, H, W, "†", "\\dagger"), z(B, H, W, "⋄", "\\diamond"), z(B, H, W, "⋆", "\\star"), z(B, H, W, "◃", "\\triangleleft"), z(B, H, W, "▹", "\\triangleright"), z(B, H, im, "{", "\\{"), z(V, H, q, "{", "\\{"), z(V, H, q, "{", "\\textbraceleft"), z(B, H, tm, "}", "\\}"), z(V, H, q, "}", "\\}"), z(V, H, q, "}", "\\textbraceright"), z(B, H, im, "{", "\\lbrace"), z(B, H, tm, "}", "\\rbrace"), z(B, H, im, "[", "\\lbrack", !0), z(V, H, q, "[", "\\lbrack", !0), z(B, H, tm, "]", "\\rbrack", !0), z(V, H, q, "]", "\\rbrack", !0), z(B, H, im, "(", "\\lparen", !0), z(B, H, tm, ")", "\\rparen", !0), z(V, H, q, "<", "\\textless", !0), z(V, H, q, ">", "\\textgreater", !0), z(B, H, im, "⌊", "\\lfloor", !0), z(B, H, tm, "⌋", "\\rfloor", !0), z(B, H, im, "⌈", "\\lceil", !0), z(B, H, tm, "⌉", "\\rceil", !0), z(B, H, q, "\\", "\\backslash"), z(B, H, q, "∣", "|"), z(B, H, q, "∣", "\\vert"), z(V, H, q, "|", "\\textbar", !0), z(B, H, q, "∥", "\\|"), z(B, H, q, "∥", "\\Vert"), z(V, H, q, "∥", "\\textbardbl"), z(V, H, q, "~", "\\textasciitilde"), z(V, H, q, "\\", "\\textbackslash"), z(V, H, q, "^", "\\textasciicircum"), z(B, H, K, "↑", "\\uparrow", !0), z(B, H, K, "⇑", "\\Uparrow", !0), z(B, H, K, "↓", "\\downarrow", !0), z(B, H, K, "⇓", "\\Downarrow", !0), z(B, H, K, "↕", "\\updownarrow", !0), z(B, H, K, "⇕", "\\Updownarrow", !0), z(B, H, rm, "∐", "\\coprod"), z(B, H, rm, "⋁", "\\bigvee"), z(B, H, rm, "⋀", "\\bigwedge"), z(B, H, rm, "⨄", "\\biguplus"), z(B, H, rm, "⋂", "\\bigcap"), z(B, H, rm, "⋃", "\\bigcup"), z(B, H, rm, "∫", "\\int"), z(B, H, rm, "∫", "\\intop"), z(B, H, rm, "∬", "\\iint"), z(B, H, rm, "∭", "\\iiint"), z(B, H, rm, "∏", "\\prod"), z(B, H, rm, "∑", "\\sum"), z(B, H, rm, "⨂", "\\bigotimes"), z(B, H, rm, "⨁", "\\bigoplus"), z(B, H, rm, "⨀", "\\bigodot"), z(B, H, rm, "∮", "\\oint"), z(B, H, rm, "∯", "\\oiint"), z(B, H, rm, "∰", "\\oiiint"), z(B, H, rm, "⨆", "\\bigsqcup"), z(B, H, rm, "∫", "\\smallint"), z(V, H, nm, "…", "\\textellipsis"), z(B, H, nm, "…", "\\mathellipsis"), z(V, H, nm, "…", "\\ldots", !0), z(B, H, nm, "…", "\\ldots", !0), z(B, H, nm, "⋯", "\\@cdots", !0), z(B, H, nm, "⋱", "\\ddots", !0), z(B, H, q, "⋮", "\\varvdots"), z(V, H, q, "⋮", "\\varvdots"), z(B, H, em, "ˊ", "\\acute"), z(B, H, em, "ˋ", "\\grave"), z(B, H, em, "¨", "\\ddot"), z(B, H, em, "~", "\\tilde"), z(B, H, em, "ˉ", "\\bar"), z(B, H, em, "˘", "\\breve"), z(B, H, em, "ˇ", "\\check"), z(B, H, em, "^", "\\hat"), z(B, H, em, "⃗", "\\vec"), z(B, H, em, "˙", "\\dot"), z(B, H, em, "˚", "\\mathring"), z(B, H, G, "", "\\@imath"), z(B, H, G, "", "\\@jmath"), z(B, H, q, "ı", "ı"), z(B, H, q, "ȷ", "ȷ"), z(V, H, q, "ı", "\\i", !0), z(V, H, q, "ȷ", "\\j", !0), z(V, H, q, "ß", "\\ss", !0), z(V, H, q, "æ", "\\ae", !0), z(V, H, q, "œ", "\\oe", !0), z(V, H, q, "ø", "\\o", !0), z(V, H, q, "Æ", "\\AE", !0), z(V, H, q, "Œ", "\\OE", !0), z(V, H, q, "Ø", "\\O", !0), z(V, H, em, "ˊ", "\\'"), z(V, H, em, "ˋ", "\\`"), z(V, H, em, "ˆ", "\\^"), z(V, H, em, "˜", "\\~"), z(V, H, em, "ˉ", "\\="), z(V, H, em, "˘", "\\u"), z(V, H, em, "˙", "\\."), z(V, H, em, "¸", "\\c"), z(V, H, em, "˚", "\\r"), z(V, H, em, "ˇ", "\\v"), z(V, H, em, "¨", "\\\""), z(V, H, em, "˝", "\\H"), z(V, H, em, "◯", "\\textcircled");
var sm = {
	"--": !0,
	"---": !0,
	"``": !0,
	"''": !0
};
z(V, H, q, "–", "--", !0), z(V, H, q, "–", "\\textendash"), z(V, H, q, "—", "---", !0), z(V, H, q, "—", "\\textemdash"), z(V, H, q, "‘", "`", !0), z(V, H, q, "‘", "\\textquoteleft"), z(V, H, q, "’", "'", !0), z(V, H, q, "’", "\\textquoteright"), z(V, H, q, "“", "``", !0), z(V, H, q, "“", "\\textquotedblleft"), z(V, H, q, "”", "''", !0), z(V, H, q, "”", "\\textquotedblright"), z(B, H, q, "°", "\\degree", !0), z(V, H, q, "°", "\\degree"), z(V, H, q, "°", "\\textdegree", !0), z(B, H, q, "£", "\\pounds"), z(B, H, q, "£", "\\mathsterling", !0), z(V, H, q, "£", "\\pounds"), z(V, H, q, "£", "\\textsterling", !0), z(B, U, q, "✠", "\\maltese"), z(V, U, q, "✠", "\\maltese");
for (var cm = "0123456789/@.\"", lm = 0; lm < cm.length; lm++) {
	var um = cm.charAt(lm);
	z(B, H, q, um, um);
}
for (var dm = "0123456789!@*()-=+\";:?/.,", fm = 0; fm < dm.length; fm++) {
	var pm = dm.charAt(fm);
	z(V, H, q, pm, pm);
}
for (var mm = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", hm = 0; hm < mm.length; hm++) {
	var gm = mm.charAt(hm);
	z(B, H, G, gm, gm), z(V, H, q, gm, gm);
}
z(B, U, q, "C", "ℂ"), z(V, U, q, "C", "ℂ"), z(B, U, q, "H", "ℍ"), z(V, U, q, "H", "ℍ"), z(B, U, q, "N", "ℕ"), z(V, U, q, "N", "ℕ"), z(B, U, q, "P", "ℙ"), z(V, U, q, "P", "ℙ"), z(B, U, q, "Q", "ℚ"), z(V, U, q, "Q", "ℚ"), z(B, U, q, "R", "ℝ"), z(V, U, q, "R", "ℝ"), z(B, U, q, "Z", "ℤ"), z(V, U, q, "Z", "ℤ"), z(B, H, G, "h", "ℎ"), z(V, H, G, "h", "ℎ");
for (var J, _m = 0; _m < mm.length; _m++) {
	var vm = mm.charAt(_m);
	J = String.fromCharCode(55349, 56320 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J), J = String.fromCharCode(55349, 56372 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J), J = String.fromCharCode(55349, 56424 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J), J = String.fromCharCode(55349, 56580 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J), J = String.fromCharCode(55349, 56684 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J), J = String.fromCharCode(55349, 56736 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J), J = String.fromCharCode(55349, 56788 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J), J = String.fromCharCode(55349, 56840 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J), J = String.fromCharCode(55349, 56944 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J), _m < 26 && (J = String.fromCharCode(55349, 56632 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J), J = String.fromCharCode(55349, 56476 + _m), z(B, H, G, vm, J), z(V, H, q, vm, J));
}
J = String.fromCharCode(55349, 56668), z(B, H, G, "k", J), z(V, H, q, "k", J);
for (var ym = 0; ym < 10; ym++) {
	var bm = ym.toString();
	J = String.fromCharCode(55349, 57294 + ym), z(B, H, G, bm, J), z(V, H, q, bm, J), J = String.fromCharCode(55349, 57314 + ym), z(B, H, G, bm, J), z(V, H, q, bm, J), J = String.fromCharCode(55349, 57324 + ym), z(B, H, G, bm, J), z(V, H, q, bm, J), J = String.fromCharCode(55349, 57334 + ym), z(B, H, G, bm, J), z(V, H, q, bm, J);
}
for (var xm = "ÐÞþ", Sm = 0; Sm < xm.length; Sm++) {
	var Cm = xm.charAt(Sm);
	z(B, H, G, Cm, Cm), z(V, H, q, Cm, Cm);
}
var wm = {
	mathClass: "mathbf",
	textClass: "textbf",
	font: "Main-Bold"
}, Tm = {
	mathClass: "mathnormal",
	textClass: "textit",
	font: "Math-Italic"
}, Em = {
	mathClass: "boldsymbol",
	textClass: "boldsymbol",
	font: "Main-BoldItalic"
}, Dm = {
	mathClass: "mathscr",
	textClass: "textscr",
	font: "Script-Regular"
}, Om = {
	mathClass: "",
	textClass: "",
	font: ""
}, km = {
	mathClass: "mathfrak",
	textClass: "textfrak",
	font: "Fraktur-Regular"
}, Am = {
	mathClass: "mathbb",
	textClass: "textbb",
	font: "AMS-Regular"
}, jm = {
	mathClass: "mathboldfrak",
	textClass: "textboldfrak",
	font: "Fraktur-Regular"
}, Mm = {
	mathClass: "mathsf",
	textClass: "textsf",
	font: "SansSerif-Regular"
}, Nm = {
	mathClass: "mathboldsf",
	textClass: "textboldsf",
	font: "SansSerif-Bold"
}, Pm = {
	mathClass: "mathitsf",
	textClass: "textitsf",
	font: "SansSerif-Italic"
}, Fm = {
	mathClass: "mathtt",
	textClass: "texttt",
	font: "Typewriter-Regular"
}, Im = [
	wm,
	wm,
	Tm,
	Tm,
	Em,
	Em,
	Dm,
	Om,
	Om,
	Om,
	km,
	km,
	Am,
	Am,
	jm,
	jm,
	Mm,
	Mm,
	Nm,
	Nm,
	Pm,
	Pm,
	Om,
	Om,
	Fm,
	Fm
], Lm = [
	wm,
	Om,
	Mm,
	Nm,
	Fm
], Rm = (e) => {
	var t = e.charCodeAt(0), n = e.charCodeAt(1), r = (t - 55296) * 1024 + (n - 56320) + 65536;
	if (119808 <= r && r < 120484) return Im[Math.floor((r - 119808) / 26)];
	if (120782 <= r && r <= 120831) return Lm[Math.floor((r - 120782) / 10)];
	if (r === 120485 || r === 120486) return Im[0];
	if (120486 < r && r < 120782) return Om;
	throw new I("Unsupported character: " + e);
}, zm = function(e, t, n) {
	if ($p[n][e]) {
		var r = $p[n][e].replace;
		r && (e = r);
	}
	return {
		value: e,
		metrics: Xp(e, t, n)
	};
}, Bm = function(e, t, n, r, i) {
	var a = zm(e, t, n), o = a.metrics;
	e = a.value;
	var s;
	if (o) {
		var c = o.italic;
		(n === "text" || r && r.font === "mathit") && (c = 0), s = new zp(e, o.height, o.depth, c, o.skew, o.width, i);
	} else typeof console < "u" && console.warn("No character metrics " + ("for '" + e + "' in style '" + t + "' and mode '" + n + "'")), s = new zp(e, 0, 0, 0, 0, 0, i);
	if (r) {
		s.maxFontSize = r.sizeMultiplier, r.style.isTight() && s.classes.push("mtight");
		var l = r.getColor();
		l && (s.style.color = l);
	}
	return s;
}, Vm = function(e, t, n, r) {
	return r === void 0 && (r = []), n.font === "boldsymbol" && zm(e, "Main-Bold", t).metrics ? Bm(e, "Main-Bold", t, n, r.concat(["mathbf"])) : e === "\\" || $p[t][e].font === "main" ? Bm(e, "Main-Regular", t, n, r) : Bm(e, "AMS-Regular", t, n, r.concat(["amsrm"]));
}, Hm = function(e, t, n) {
	return n !== "textord" && zm(e, "Math-BoldItalic", t).metrics ? {
		fontName: "Math-BoldItalic",
		fontClass: "boldsymbol"
	} : {
		fontName: "Main-Bold",
		fontClass: "mathbf"
	};
}, Um = function(e, t, n) {
	var r = e.mode, i = e.text, a = ["mord"], { font: o, fontFamily: s, fontWeight: c, fontShape: l } = t, u = r === "math" || r === "text" && !!o, d = u ? o : s, f = "", p = "";
	if (i.charCodeAt(0) === 55349) {
		var m = Rm(i);
		f = m.font, p = m[r + "Class"];
	}
	if (f) return Bm(i, f, r, t, a.concat(p));
	if (d) {
		var h, g;
		if (d === "boldsymbol") {
			var _ = Hm(i, r, n);
			h = _.fontName, g = [_.fontClass];
		} else u ? (h = nh[o].fontName, g = [o]) : (h = th(s, c, l), g = [
			s,
			c,
			l
		]);
		if (zm(i, h, r).metrics) return Bm(i, h, r, t, a.concat(g));
		if (sm.hasOwnProperty(i) && h.slice(0, 10) === "Typewriter") {
			for (var v = [], y = 0; y < i.length; y++) v.push(Bm(i[y], h, r, t, a.concat(g)));
			return Xm(v);
		}
	}
	if (n === "mathord") return Bm(i, "Math-Italic", r, t, a.concat(["mathnormal"]));
	if (n === "textord") {
		var b = $p[r][i] && $p[r][i].font;
		if (b === "ams") return Bm(i, th("amsrm", c, l), r, t, a.concat("amsrm", c, l));
		if (b === "main" || !b) return Bm(i, th("textrm", c, l), r, t, a.concat(c, l));
		var x = th(b, c, l);
		return Bm(i, x, r, t, a.concat(x, c, l));
	}
	throw Error("unexpected type: " + n + " in makeOrd");
}, Wm = (e, t) => {
	if (kp(e.classes) !== kp(t.classes) || e.skew !== t.skew || e.maxFontSize !== t.maxFontSize || e.italic !== 0 && e.hasClass("mathnormal")) return !1;
	if (e.classes.length === 1) {
		var n = e.classes[0];
		if (n === "mbin" || n === "mord") return !1;
	}
	for (var r of Object.keys(e.style)) if (e.style[r] !== t.style[r]) return !1;
	for (var i of Object.keys(t.style)) if (e.style[i] !== t.style[i]) return !1;
	return !0;
}, Gm = (e) => {
	for (var t = 0; t < e.length - 1; t++) {
		var n = e[t], r = e[t + 1];
		n instanceof zp && r instanceof zp && Wm(n, r) && (n.text += r.text, n.height = Math.max(n.height, r.height), n.depth = Math.max(n.depth, r.depth), n.italic = r.italic, e.splice(t + 1, 1), t--);
	}
	return e;
}, Km = function(e) {
	for (var t = 0, n = 0, r = 0, i = 0; i < e.children.length; i++) {
		var a = e.children[i];
		a.height > t && (t = a.height), a.depth > n && (n = a.depth), a.maxFontSize > r && (r = a.maxFontSize);
	}
	e.height = t, e.depth = n, e.maxFontSize = r;
}, Y = function(e, t, n, r) {
	var i = new Fp(e, t, n, r);
	return Km(i), i;
}, qm = (e, t, n, r) => new Fp(e, t, n, r), Jm = function(e, t, n) {
	var r = Y([e], [], t);
	return r.height = Math.max(n || t.fontMetrics().defaultRuleThickness, t.minRuleThickness), r.style.borderBottomWidth = R(r.height), r.maxFontSize = 1, r;
}, Ym = function(e, t, n, r) {
	var i = new Ip(e, t, n, r);
	return Km(i), i;
}, Xm = function(e) {
	var t = new wp(e);
	return Km(t), t;
}, Zm = function(e, t) {
	return e instanceof wp ? Y([], [e], t) : e;
}, Qm = function(e) {
	if (e.positionType === "individualShift") {
		for (var t = e.children, n = [t[0]], r = -t[0].shift - t[0].elem.depth, i = r, a = 1; a < t.length; a++) {
			var o = -t[a].shift - i - t[a].elem.depth, s = o - (t[a - 1].elem.height + t[a - 1].elem.depth);
			i += o, n.push({
				type: "kern",
				size: s
			}), n.push(t[a]);
		}
		return {
			children: n,
			depth: r
		};
	}
	var c;
	if (e.positionType === "top") {
		for (var l = e.positionData, u = 0; u < e.children.length; u++) {
			var d = e.children[u];
			l -= d.type === "kern" ? d.size : d.elem.height + d.elem.depth;
		}
		c = l;
	} else if (e.positionType === "bottom") c = -e.positionData;
	else {
		var f = e.children[0];
		if (f.type !== "elem") throw Error("First child must have type \"elem\".");
		if (e.positionType === "shift") c = -f.elem.depth - e.positionData;
		else if (e.positionType === "firstBaseline") c = -f.elem.depth;
		else throw Error("Invalid positionType " + e.positionType + ".");
	}
	return {
		children: e.children,
		depth: c
	};
}, $m = function(e, t) {
	for (var { children: n, depth: r } = Qm(e), i = 0, a = 0; a < n.length; a++) {
		var o = n[a];
		if (o.type === "elem") {
			var s = o.elem;
			i = Math.max(i, s.maxFontSize, s.height);
		}
	}
	i += 2;
	var c = Y(["pstrut"], []);
	c.style.height = R(i);
	for (var l = [], u = r, d = r, f = r, p = 0; p < n.length; p++) {
		var m = n[p];
		if (m.type === "kern") f += m.size;
		else {
			var h = m.elem, g = m.wrapperClasses || [], _ = m.wrapperStyle || {}, v = Y(g, [c, h], void 0, _);
			v.style.top = R(-i - f - h.depth), m.marginLeft && (v.style.marginLeft = m.marginLeft), m.marginRight && (v.style.marginRight = m.marginRight), l.push(v), f += h.height + h.depth;
		}
		u = Math.min(u, f), d = Math.max(d, f);
	}
	var y = Y(["vlist"], l);
	y.style.height = R(d);
	var b;
	if (u < 0) {
		var x = Y(["vlist"], [Y([], [])]);
		x.style.height = R(-u), b = [Y(["vlist-r"], [y, Y(["vlist-s"], [new zp("​")])]), Y(["vlist-r"], [x])];
	} else b = [Y(["vlist-r"], [y])];
	var S = Y(["vlist-t"], b);
	return b.length === 2 && S.classes.push("vlist-t2"), S.height = d, S.depth = -u, S;
}, eh = (e, t) => {
	var n = Y(["mspace"], [], t), r = Op(e, t);
	return n.style.marginRight = R(r), n;
}, th = (e, t, n) => {
	var r, i;
	switch (e) {
		case "amsrm":
			r = "AMS";
			break;
		case "textrm":
			r = "Main";
			break;
		case "textsf":
			r = "SansSerif";
			break;
		case "texttt":
			r = "Typewriter";
			break;
		default: r = e;
	}
	return i = t === "textbf" && n === "textit" ? "BoldItalic" : t === "textbf" ? "Bold" : n === "textit" ? "Italic" : "Regular", r + "-" + i;
}, nh = {
	mathbf: {
		variant: "bold",
		fontName: "Main-Bold"
	},
	mathrm: {
		variant: "normal",
		fontName: "Main-Regular"
	},
	textit: {
		variant: "italic",
		fontName: "Main-Italic"
	},
	mathit: {
		variant: "italic",
		fontName: "Main-Italic"
	},
	mathnormal: {
		variant: "italic",
		fontName: "Math-Italic"
	},
	mathsfit: {
		variant: "sans-serif-italic",
		fontName: "SansSerif-Italic"
	},
	mathbb: {
		variant: "double-struck",
		fontName: "AMS-Regular"
	},
	mathcal: {
		variant: "script",
		fontName: "Caligraphic-Regular"
	},
	mathfrak: {
		variant: "fraktur",
		fontName: "Fraktur-Regular"
	},
	mathscr: {
		variant: "script",
		fontName: "Script-Regular"
	},
	mathsf: {
		variant: "sans-serif",
		fontName: "SansSerif-Regular"
	},
	mathtt: {
		variant: "monospace",
		fontName: "Typewriter-Regular"
	}
}, rh = {
	vec: [
		"vec",
		.471,
		.714
	],
	oiintSize1: [
		"oiintSize1",
		.957,
		.499
	],
	oiintSize2: [
		"oiintSize2",
		1.472,
		.659
	],
	oiiintSize1: [
		"oiiintSize1",
		1.304,
		.499
	],
	oiiintSize2: [
		"oiiintSize2",
		1.98,
		.659
	]
}, ih = function(e, t) {
	var [n, r, i] = rh[e], a = qm(["overlay"], [new Bp([new Vp(n)], {
		width: R(r),
		height: R(i),
		style: "width:" + R(r),
		viewBox: "0 0 " + 1e3 * r + " " + 1e3 * i,
		preserveAspectRatio: "xMinYMin"
	})], t);
	return a.height = i, a.style.height = R(i), a.style.width = R(r), a;
}, ah = {
	number: 3,
	unit: "mu"
}, oh = {
	number: 4,
	unit: "mu"
}, sh = {
	number: 5,
	unit: "mu"
}, ch = {
	mord: {
		mop: ah,
		mbin: oh,
		mrel: sh,
		minner: ah
	},
	mop: {
		mord: ah,
		mop: ah,
		mrel: sh,
		minner: ah
	},
	mbin: {
		mord: oh,
		mop: oh,
		mopen: oh,
		minner: oh
	},
	mrel: {
		mord: sh,
		mop: sh,
		mopen: sh,
		minner: sh
	},
	mopen: {},
	mclose: {
		mop: ah,
		mbin: oh,
		mrel: sh,
		minner: ah
	},
	mpunct: {
		mord: ah,
		mop: ah,
		mrel: sh,
		mopen: ah,
		mclose: ah,
		mpunct: ah,
		minner: ah
	},
	minner: {
		mord: ah,
		mop: ah,
		mbin: oh,
		mrel: sh,
		mopen: ah,
		mpunct: ah,
		minner: ah
	}
}, lh = {
	mord: { mop: ah },
	mop: {
		mord: ah,
		mop: ah
	},
	mbin: {},
	mrel: {},
	mopen: {},
	mclose: { mop: ah },
	mpunct: {},
	minner: { mop: ah }
}, uh = {}, dh = {}, fh = {};
function X(e) {
	for (var { type: t, names: n, props: r, handler: i, htmlBuilder: a, mathmlBuilder: o } = e, s = {
		type: t,
		numArgs: r.numArgs,
		argTypes: r.argTypes,
		allowedInArgument: !!r.allowedInArgument,
		allowedInText: !!r.allowedInText,
		allowedInMath: r.allowedInMath === void 0 || r.allowedInMath,
		numOptionalArgs: r.numOptionalArgs || 0,
		infix: !!r.infix,
		primitive: !!r.primitive,
		handler: i
	}, c = 0; c < n.length; ++c) uh[n[c]] = s;
	t && (a && (dh[t] = a), o && (fh[t] = o));
}
function ph(e) {
	var { type: t, htmlBuilder: n, mathmlBuilder: r } = e;
	X({
		type: t,
		names: [],
		props: { numArgs: 0 },
		handler() {
			throw Error("Should never be called.");
		},
		htmlBuilder: n,
		mathmlBuilder: r
	});
}
var mh = function(e) {
	return e.type === "ordgroup" && e.body.length === 1 ? e.body[0] : e;
}, hh = function(e) {
	return e.type === "ordgroup" ? e.body : [e];
}, gh = /* @__PURE__ */ new Set([
	"leftmost",
	"mbin",
	"mopen",
	"mrel",
	"mop",
	"mpunct"
]), _h = /* @__PURE__ */ new Set([
	"rightmost",
	"mrel",
	"mclose",
	"mpunct"
]), vh = {
	display: L.DISPLAY,
	text: L.TEXT,
	script: L.SCRIPT,
	scriptscript: L.SCRIPTSCRIPT
}, yh = {
	mord: "mord",
	mop: "mop",
	mbin: "mbin",
	mrel: "mrel",
	mopen: "mopen",
	mclose: "mclose",
	mpunct: "mpunct",
	minner: "minner"
}, bh = function(e, t, n, r) {
	r === void 0 && (r = [null, null]);
	for (var i = [], a = 0; a < e.length; a++) {
		var o = Eh(e[a], t);
		if (o instanceof wp) {
			var s = o.children;
			i.push(...s);
		} else i.push(o);
	}
	if (Gm(i), !n) return i;
	var c = t;
	if (e.length === 1) {
		var l = e[0];
		l.type === "sizing" ? c = t.havingSize(l.size) : l.type === "styling" && (c = t.havingStyle(vh[l.style]));
	}
	var u = Y([r[0] || "leftmost"], [], t), d = Y([r[1] || "rightmost"], [], t), f = n === "root";
	return xh(i, (e, t) => {
		var n = t.classes[0], r = e.classes[0];
		n === "mbin" && _h.has(r) ? t.classes[0] = "mord" : r === "mbin" && gh.has(n) && (e.classes[0] = "mord");
	}, { node: u }, d, f), xh(i, (e, t) => {
		var n = wh(t), r = wh(e), i = n && r ? e.hasClass("mtight") ? lh[n]?.[r] : ch[n]?.[r] : null;
		if (i) return eh(i, c);
	}, { node: u }, d, f), i;
}, xh = function(e, t, n, r, i) {
	r && e.push(r);
	for (var a = 0; a < e.length; a++) {
		var o = e[a], s = Sh(o);
		if (s) {
			xh(s.children, t, n, null, i);
			continue;
		}
		var c = !o.hasClass("mspace");
		if (c) {
			var l = t(o, n.node);
			l && (n.insertAfter ? n.insertAfter(l) : (e.unshift(l), a++));
		}
		c ? n.node = o : i && o.hasClass("newline") && (n.node = Y(["leftmost"])), n.insertAfter = ((t) => (n) => {
			e.splice(t + 1, 0, n), a++;
		})(a);
	}
	r && e.pop();
}, Sh = function(e) {
	return e instanceof wp || e instanceof Ip || e instanceof Fp && e.hasClass("enclosing") ? e : null;
}, Ch = function(e, t) {
	var n = Sh(e);
	if (n) {
		var r = n.children;
		if (r.length) {
			if (t === "right") return Ch(r[r.length - 1], "right");
			if (t === "left") return Ch(r[0], "left");
		}
	}
	return e;
}, wh = function(e, t) {
	return e ? (t && (e = Ch(e, t)), yh[e.classes[0]] || null) : null;
}, Th = function(e, t) {
	var n = ["nulldelimiter"].concat(e.baseSizingClasses());
	return Y(t.concat(n));
}, Eh = function(e, t, n) {
	if (!e) return Y();
	if (dh[e.type]) {
		var r = dh[e.type](e, t);
		if (n && t.size !== n.size) {
			r = Y(t.sizingClasses(n), [r], t);
			var i = t.sizeMultiplier / n.sizeMultiplier;
			r.height *= i, r.depth *= i;
		}
		return r;
	}
	throw new I("Got group of unknown type: '" + e.type + "'");
};
function Dh(e, t) {
	var n = Y(["base"], e, t), r = Y(["strut"]);
	return r.style.height = R(n.height + n.depth), n.depth && (r.style.verticalAlign = R(-n.depth)), n.children.unshift(r), n;
}
function Oh(e, t) {
	var n = null;
	e.length === 1 && e[0].type === "tag" && (n = e[0].tag, e = e[0].body);
	var r = bh(e, t, "root"), i;
	r.length === 2 && r[1].hasClass("tag") && (i = r.pop());
	for (var a = [], o = [], s = 0; s < r.length; s++) if (o.push(r[s]), r[s].hasClass("mbin") || r[s].hasClass("mrel") || r[s].hasClass("allowbreak")) {
		for (var c = !1; s < r.length - 1 && r[s + 1].hasClass("mspace") && !r[s + 1].hasClass("newline");) s++, o.push(r[s]), r[s].hasClass("nobreak") && (c = !0);
		c || (a.push(Dh(o, t)), o = []);
	} else r[s].hasClass("newline") && (o.pop(), o.length > 0 && (a.push(Dh(o, t)), o = []), a.push(r[s]));
	o.length > 0 && a.push(Dh(o, t));
	var l;
	n ? (l = Dh(bh(n, t, !0), t), l.classes = ["tag"], a.push(l)) : i && a.push(i);
	var u = Y(["katex-html"], a);
	if (u.setAttribute("aria-hidden", "true"), l) {
		var d = l.children[0];
		d.style.height = R(u.height + u.depth), u.depth && (d.style.verticalAlign = R(-u.depth));
	}
	return u;
}
function kh(e) {
	return new wp(e);
}
var Z = class {
	constructor(e, t, n) {
		this.type = void 0, this.attributes = void 0, this.children = void 0, this.classes = void 0, this.type = e, this.attributes = {}, this.children = t || [], this.classes = n || [];
	}
	setAttribute(e, t) {
		this.attributes[e] = t;
	}
	getAttribute(e) {
		return this.attributes[e];
	}
	toNode() {
		var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
		for (var t in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, t) && e.setAttribute(t, this.attributes[t]);
		this.classes.length > 0 && (e.className = kp(this.classes));
		for (var n = 0; n < this.children.length; n++) if (this.children[n] instanceof Ah && this.children[n + 1] instanceof Ah) {
			for (var r = this.children[n].toText() + this.children[++n].toText(); this.children[n + 1] instanceof Ah;) r += this.children[++n].toText();
			e.appendChild(new Ah(r).toNode());
		} else e.appendChild(this.children[n].toNode());
		return e;
	}
	toMarkup() {
		var e = "<" + this.type;
		for (var t in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, t) && (e += " " + t + "=\"", e += Pf(this.attributes[t]), e += "\"");
		this.classes.length > 0 && (e += " class =\"" + Pf(kp(this.classes)) + "\""), e += ">";
		for (var n = 0; n < this.children.length; n++) e += this.children[n].toMarkup();
		return e += "</" + this.type + ">", e;
	}
	toText() {
		return this.children.map((e) => e.toText()).join("");
	}
}, Ah = class {
	constructor(e) {
		this.text = void 0, this.text = e;
	}
	toNode() {
		return document.createTextNode(this.text);
	}
	toMarkup() {
		return Pf(this.toText());
	}
	toText() {
		return this.text;
	}
}, jh = class {
	constructor(e) {
		this.width = void 0, this.character = void 0, this.width = e, this.character = e >= .05555 && e <= .05556 ? " " : e >= .1666 && e <= .1667 ? " " : e >= .2222 && e <= .2223 ? " " : e >= .2777 && e <= .2778 ? "  " : e >= -.05556 && e <= -.05555 ? " ⁣" : e >= -.1667 && e <= -.1666 ? " ⁣" : e >= -.2223 && e <= -.2222 ? " ⁣" : e >= -.2778 && e <= -.2777 ? " ⁣" : null;
	}
	toNode() {
		if (this.character) return document.createTextNode(this.character);
		var e = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
		return e.setAttribute("width", R(this.width)), e;
	}
	toMarkup() {
		return this.character ? "<mtext>" + this.character + "</mtext>" : "<mspace width=\"" + R(this.width) + "\"/>";
	}
	toText() {
		return this.character ? this.character : " ";
	}
}, Mh = /* @__PURE__ */ new Set(["\\imath", "\\jmath"]), Nh = /* @__PURE__ */ new Set(["mrow", "mtable"]), Ph = function(e, t, n) {
	return $p[t][e] && $p[t][e].replace && e.charCodeAt(0) !== 55349 && !(sm.hasOwnProperty(e) && n && (n.fontFamily && n.fontFamily.slice(4, 6) === "tt" || n.font && n.font.slice(4, 6) === "tt")) && (e = $p[t][e].replace), new Ah(e);
}, Fh = function(e) {
	return e.length === 1 ? e[0] : new Z("mrow", e);
}, Ih = {
	mathit: "italic",
	boldsymbol: (e) => e.type === "textord" ? "bold" : "bold-italic",
	mathbf: "bold",
	mathbb: "double-struck",
	mathsfit: "sans-serif-italic",
	mathfrak: "fraktur",
	mathscr: "script",
	mathcal: "script",
	mathsf: "sans-serif",
	mathtt: "monospace"
}, Lh = (e, t) => {
	if (e.mode === "text") {
		if (t.fontFamily === "texttt") return "monospace";
		if (t.fontFamily === "textsf") return t.fontShape === "textit" && t.fontWeight === "textbf" ? "sans-serif-bold-italic" : t.fontShape === "textit" ? "sans-serif-italic" : t.fontWeight === "textbf" ? "bold-sans-serif" : "sans-serif";
		if (t.fontShape === "textit" && t.fontWeight === "textbf") return "bold-italic";
		if (t.fontShape === "textit") return "italic";
		if (t.fontWeight === "textbf") return "bold";
	}
	var n = t.font;
	if (!n || n === "mathnormal") return null;
	var r = e.mode, i = Ih[n];
	if (i) return typeof i == "function" ? i(e) : i;
	var a = e.text;
	if (Mh.has(a)) return null;
	if ($p[r][a]) {
		var o = $p[r][a].replace;
		o && (a = o);
	}
	var s = nh[n].fontName;
	return Xp(a, s, r) ? nh[n].variant : null;
};
function Rh(e) {
	if (!e) return !1;
	if (e.type === "mi" && e.children.length === 1) {
		var t = e.children[0];
		return t instanceof Ah && t.text === ".";
	}
	if (e.type === "mo" && e.children.length === 1 && e.getAttribute("separator") === "true" && e.getAttribute("lspace") === "0em" && e.getAttribute("rspace") === "0em") {
		var n = e.children[0];
		return n instanceof Ah && n.text === ",";
	}
	return !1;
}
var zh = function(e, t, n) {
	if (e.length === 1) {
		var r = Vh(e[0], t);
		return n && r instanceof Z && r.type === "mo" && (r.setAttribute("lspace", "0em"), r.setAttribute("rspace", "0em")), [r];
	}
	for (var i = [], a, o = 0; o < e.length; o++) {
		var s = Vh(e[o], t);
		if (s instanceof Z && a instanceof Z) {
			if (s.type === "mtext" && a.type === "mtext" && s.getAttribute("mathvariant") === a.getAttribute("mathvariant")) {
				a.children.push(...s.children);
				continue;
			}
			if (s.type === "mn" && a.type === "mn") {
				a.children.push(...s.children);
				continue;
			}
			if (Rh(s) && a.type === "mn") {
				a.children.push(...s.children);
				continue;
			}
			if (s.type === "mn" && Rh(a)) s.children = [...a.children, ...s.children], i.pop();
			else if ((s.type === "msup" || s.type === "msub") && s.children.length >= 1 && (a.type === "mn" || Rh(a))) {
				var c = s.children[0];
				c instanceof Z && c.type === "mn" && (c.children = [...a.children, ...c.children], i.pop());
			} else if (a.type === "mi" && a.children.length === 1) {
				var l = a.children[0];
				if (l instanceof Ah && l.text === "̸" && (s.type === "mo" || s.type === "mi" || s.type === "mn")) {
					var u = s.children[0];
					u instanceof Ah && u.text.length > 0 && (u.text = u.text.slice(0, 1) + "̸" + u.text.slice(1), i.pop());
				}
			}
		}
		i.push(s), a = s;
	}
	return i;
}, Bh = function(e, t, n) {
	return Fh(zh(e, t, n));
}, Vh = function(e, t) {
	if (!e) return new Z("mrow");
	if (fh[e.type]) return fh[e.type](e, t);
	throw new I("Got group of unknown type: '" + e.type + "'");
};
function Hh(e, t, n, r, i) {
	var a = zh(e, n), o = a.length === 1 && a[0] instanceof Z && Nh.has(a[0].type) ? a[0] : new Z("mrow", a), s = new Z("annotation", [new Ah(t)]);
	s.setAttribute("encoding", "application/x-tex");
	var c = new Z("math", [new Z("semantics", [o, s])]);
	return c.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML"), r && c.setAttribute("display", "block"), Y([i ? "katex" : "katex-mathml"], [c]);
}
var Uh = [
	[
		1,
		1,
		1
	],
	[
		2,
		1,
		1
	],
	[
		3,
		1,
		1
	],
	[
		4,
		2,
		1
	],
	[
		5,
		2,
		1
	],
	[
		6,
		3,
		1
	],
	[
		7,
		4,
		2
	],
	[
		8,
		6,
		3
	],
	[
		9,
		7,
		6
	],
	[
		10,
		8,
		7
	],
	[
		11,
		10,
		9
	]
], Wh = [
	.5,
	.6,
	.7,
	.8,
	.9,
	1,
	1.2,
	1.44,
	1.728,
	2.074,
	2.488
], Gh = function(e, t) {
	return t.size < 2 ? e : Uh[e - 1][t.size - 1];
}, Kh = class e {
	constructor(t) {
		this.style = void 0, this.color = void 0, this.size = void 0, this.textSize = void 0, this.phantom = void 0, this.font = void 0, this.fontFamily = void 0, this.fontWeight = void 0, this.fontShape = void 0, this.sizeMultiplier = void 0, this.maxSize = void 0, this.minRuleThickness = void 0, this._fontMetrics = void 0, this.style = t.style, this.color = t.color, this.size = t.size || e.BASESIZE, this.textSize = t.textSize || this.size, this.phantom = !!t.phantom, this.font = t.font || "", this.fontFamily = t.fontFamily || "", this.fontWeight = t.fontWeight || "", this.fontShape = t.fontShape || "", this.sizeMultiplier = Wh[this.size - 1], this.maxSize = t.maxSize, this.minRuleThickness = t.minRuleThickness, this._fontMetrics = void 0;
	}
	extend(t) {
		var n = {
			style: this.style,
			size: this.size,
			textSize: this.textSize,
			color: this.color,
			phantom: this.phantom,
			font: this.font,
			fontFamily: this.fontFamily,
			fontWeight: this.fontWeight,
			fontShape: this.fontShape,
			maxSize: this.maxSize,
			minRuleThickness: this.minRuleThickness
		};
		return Object.assign(n, t), new e(n);
	}
	havingStyle(e) {
		return this.style === e ? this : this.extend({
			style: e,
			size: Gh(this.textSize, e)
		});
	}
	havingCrampedStyle() {
		return this.havingStyle(this.style.cramp());
	}
	havingSize(e) {
		return this.size === e && this.textSize === e ? this : this.extend({
			style: this.style.text(),
			size: e,
			textSize: e,
			sizeMultiplier: Wh[e - 1]
		});
	}
	havingBaseStyle(t) {
		t ||= this.style.text();
		var n = Gh(e.BASESIZE, t);
		return this.size === n && this.textSize === e.BASESIZE && this.style === t ? this : this.extend({
			style: t,
			size: n
		});
	}
	havingBaseSizing() {
		var e;
		switch (this.style.id) {
			case 4:
			case 5:
				e = 3;
				break;
			case 6:
			case 7:
				e = 1;
				break;
			default: e = 6;
		}
		return this.extend({
			style: this.style.text(),
			size: e
		});
	}
	withColor(e) {
		return this.extend({ color: e });
	}
	withPhantom() {
		return this.extend({ phantom: !0 });
	}
	withFont(e) {
		return this.extend({ font: e });
	}
	withTextFontFamily(e) {
		return this.extend({
			fontFamily: e,
			font: ""
		});
	}
	withTextFontWeight(e) {
		return this.extend({
			fontWeight: e,
			font: ""
		});
	}
	withTextFontShape(e) {
		return this.extend({
			fontShape: e,
			font: ""
		});
	}
	sizingClasses(e) {
		return e.size === this.size ? [] : [
			"sizing",
			"reset-size" + e.size,
			"size" + this.size
		];
	}
	baseSizingClasses() {
		return this.size === e.BASESIZE ? [] : [
			"sizing",
			"reset-size" + this.size,
			"size" + e.BASESIZE
		];
	}
	fontMetrics() {
		return this._fontMetrics ||= Qp(this.size), this._fontMetrics;
	}
	getColor() {
		return this.phantom ? "transparent" : this.color;
	}
};
Kh.BASESIZE = 6;
var qh = function(e) {
	return new Kh({
		style: e.displayMode ? L.DISPLAY : L.TEXT,
		maxSize: e.maxSize,
		minRuleThickness: e.minRuleThickness
	});
}, Jh = function(e, t) {
	if (t.displayMode) {
		var n = ["katex-display"];
		t.leqno && n.push("leqno"), t.fleqn && n.push("fleqn"), e = Y(n, [e]);
	}
	return e;
}, Yh = function(e, t, n) {
	var r = qh(n), i;
	return n.output === "mathml" ? Hh(e, t, r, n.displayMode, !0) : (i = n.output === "html" ? Y(["katex"], [Oh(e, r)]) : Y(["katex"], [Hh(e, t, r, n.displayMode, !1), Oh(e, r)]), Jh(i, n));
}, Xh = function(e, t, n) {
	return Jh(Y(["katex"], [Oh(e, qh(n))]), n);
}, Zh = {
	widehat: "^",
	widecheck: "ˇ",
	widetilde: "~",
	utilde: "~",
	overleftarrow: "←",
	underleftarrow: "←",
	xleftarrow: "←",
	overrightarrow: "→",
	underrightarrow: "→",
	xrightarrow: "→",
	underbrace: "⏟",
	overbrace: "⏞",
	underbracket: "⎵",
	overbracket: "⎴",
	overgroup: "⏠",
	undergroup: "⏡",
	overleftrightarrow: "↔",
	underleftrightarrow: "↔",
	xleftrightarrow: "↔",
	Overrightarrow: "⇒",
	xRightarrow: "⇒",
	overleftharpoon: "↼",
	xleftharpoonup: "↼",
	overrightharpoon: "⇀",
	xrightharpoonup: "⇀",
	xLeftarrow: "⇐",
	xLeftrightarrow: "⇔",
	xhookleftarrow: "↩",
	xhookrightarrow: "↪",
	xmapsto: "↦",
	xrightharpoondown: "⇁",
	xleftharpoondown: "↽",
	xrightleftharpoons: "⇌",
	xleftrightharpoons: "⇋",
	xtwoheadleftarrow: "↞",
	xtwoheadrightarrow: "↠",
	xlongequal: "=",
	xtofrom: "⇄",
	xrightleftarrows: "⇄",
	xrightequilibrium: "⇌",
	xleftequilibrium: "⇋",
	"\\cdrightarrow": "→",
	"\\cdleftarrow": "←",
	"\\cdlongequal": "="
}, Qh = function(e) {
	var t = new Z("mo", [new Ah(Zh[e.replace(/^\\/, "")])]);
	return t.setAttribute("stretchy", "true"), t;
}, $h = {
	overrightarrow: [
		["rightarrow"],
		.888,
		522,
		"xMaxYMin"
	],
	overleftarrow: [
		["leftarrow"],
		.888,
		522,
		"xMinYMin"
	],
	underrightarrow: [
		["rightarrow"],
		.888,
		522,
		"xMaxYMin"
	],
	underleftarrow: [
		["leftarrow"],
		.888,
		522,
		"xMinYMin"
	],
	xrightarrow: [
		["rightarrow"],
		1.469,
		522,
		"xMaxYMin"
	],
	"\\cdrightarrow": [
		["rightarrow"],
		3,
		522,
		"xMaxYMin"
	],
	xleftarrow: [
		["leftarrow"],
		1.469,
		522,
		"xMinYMin"
	],
	"\\cdleftarrow": [
		["leftarrow"],
		3,
		522,
		"xMinYMin"
	],
	Overrightarrow: [
		["doublerightarrow"],
		.888,
		560,
		"xMaxYMin"
	],
	xRightarrow: [
		["doublerightarrow"],
		1.526,
		560,
		"xMaxYMin"
	],
	xLeftarrow: [
		["doubleleftarrow"],
		1.526,
		560,
		"xMinYMin"
	],
	overleftharpoon: [
		["leftharpoon"],
		.888,
		522,
		"xMinYMin"
	],
	xleftharpoonup: [
		["leftharpoon"],
		.888,
		522,
		"xMinYMin"
	],
	xleftharpoondown: [
		["leftharpoondown"],
		.888,
		522,
		"xMinYMin"
	],
	overrightharpoon: [
		["rightharpoon"],
		.888,
		522,
		"xMaxYMin"
	],
	xrightharpoonup: [
		["rightharpoon"],
		.888,
		522,
		"xMaxYMin"
	],
	xrightharpoondown: [
		["rightharpoondown"],
		.888,
		522,
		"xMaxYMin"
	],
	xlongequal: [
		["longequal"],
		.888,
		334,
		"xMinYMin"
	],
	"\\cdlongequal": [
		["longequal"],
		3,
		334,
		"xMinYMin"
	],
	xtwoheadleftarrow: [
		["twoheadleftarrow"],
		.888,
		334,
		"xMinYMin"
	],
	xtwoheadrightarrow: [
		["twoheadrightarrow"],
		.888,
		334,
		"xMaxYMin"
	],
	overleftrightarrow: [
		["leftarrow", "rightarrow"],
		.888,
		522
	],
	overbrace: [
		[
			"leftbrace",
			"midbrace",
			"rightbrace"
		],
		1.6,
		548
	],
	underbrace: [
		[
			"leftbraceunder",
			"midbraceunder",
			"rightbraceunder"
		],
		1.6,
		548
	],
	underleftrightarrow: [
		["leftarrow", "rightarrow"],
		.888,
		522
	],
	xleftrightarrow: [
		["leftarrow", "rightarrow"],
		1.75,
		522
	],
	xLeftrightarrow: [
		["doubleleftarrow", "doublerightarrow"],
		1.75,
		560
	],
	xrightleftharpoons: [
		["leftharpoondownplus", "rightharpoonplus"],
		1.75,
		716
	],
	xleftrightharpoons: [
		["leftharpoonplus", "rightharpoondownplus"],
		1.75,
		716
	],
	xhookleftarrow: [
		["leftarrow", "righthook"],
		1.08,
		522
	],
	xhookrightarrow: [
		["lefthook", "rightarrow"],
		1.08,
		522
	],
	overlinesegment: [
		["leftlinesegment", "rightlinesegment"],
		.888,
		522
	],
	underlinesegment: [
		["leftlinesegment", "rightlinesegment"],
		.888,
		522
	],
	overbracket: [
		["leftbracketover", "rightbracketover"],
		1.6,
		440
	],
	underbracket: [
		["leftbracketunder", "rightbracketunder"],
		1.6,
		410
	],
	overgroup: [
		["leftgroup", "rightgroup"],
		.888,
		342
	],
	undergroup: [
		["leftgroupunder", "rightgroupunder"],
		.888,
		342
	],
	xmapsto: [
		["leftmapsto", "rightarrow"],
		1.5,
		522
	],
	xtofrom: [
		["leftToFrom", "rightToFrom"],
		1.75,
		528
	],
	xrightleftarrows: [
		["baraboveleftarrow", "rightarrowabovebar"],
		1.75,
		901
	],
	xrightequilibrium: [
		["baraboveshortleftharpoon", "rightharpoonaboveshortbar"],
		1.75,
		716
	],
	xleftequilibrium: [
		["shortbaraboveleftharpoon", "shortrightharpoonabovebar"],
		1.75,
		716
	]
}, eg = /* @__PURE__ */ new Set([
	"widehat",
	"widecheck",
	"widetilde",
	"utilde"
]), tg = function(e, t) {
	function n() {
		var n = 4e5, r = e.label.slice(1);
		if (eg.has(r) && "base" in e) {
			var i = e.base.type === "ordgroup" ? e.base.body.length : 1, a, o, s;
			if (i > 5) r === "widehat" || r === "widecheck" ? (a = 420, n = 2364, s = .42, o = r + "4") : (a = 312, n = 2340, s = .34, o = "tilde4");
			else {
				var c = [
					1,
					1,
					2,
					2,
					3,
					3
				][i];
				r === "widehat" || r === "widecheck" ? (n = [
					0,
					1062,
					2364,
					2364,
					2364
				][c], a = [
					0,
					239,
					300,
					360,
					420
				][c], s = [
					0,
					.24,
					.3,
					.3,
					.36,
					.42
				][c], o = r + c) : (n = [
					0,
					600,
					1033,
					2339,
					2340
				][c], a = [
					0,
					260,
					286,
					306,
					312
				][c], s = [
					0,
					.26,
					.286,
					.3,
					.306,
					.34
				][c], o = "tilde" + c);
			}
			return {
				span: qm([], [new Bp([new Vp(o)], {
					width: "100%",
					height: R(s),
					viewBox: "0 0 " + n + " " + a,
					preserveAspectRatio: "none"
				})], t),
				minWidth: 0,
				height: s
			};
		}
		var l = [], u = $h[r];
		if (!u) throw Error("No SVG data for \"" + r + "\".");
		var [d, f, p] = u, m = p / 1e3, h = d.length, g, _;
		if (h === 1) {
			if (u.length !== 4) throw Error("Expected 4-tuple for single-path SVG data \"" + r + "\".");
			g = ["hide-tail"], _ = [u[3]];
		} else if (h === 2) g = ["halfarrow-left", "halfarrow-right"], _ = ["xMinYMin", "xMaxYMin"];
		else if (h === 3) g = [
			"brace-left",
			"brace-center",
			"brace-right"
		], _ = [
			"xMinYMin",
			"xMidYMin",
			"xMaxYMin"
		];
		else throw Error("Correct katexImagesData or update code here to support\n                    " + h + " children.");
		for (var v = 0; v < h; v++) {
			var y = new Bp([new Vp(d[v])], {
				width: "400em",
				height: R(m),
				viewBox: "0 0 " + n + " " + p,
				preserveAspectRatio: _[v] + " slice"
			}), b = qm([g[v]], [y], t);
			if (h === 1) return {
				span: b,
				minWidth: f,
				height: m
			};
			b.style.height = R(m), l.push(b);
		}
		return {
			span: Y(["stretchy"], l, t),
			minWidth: f,
			height: m
		};
	}
	var { span: r, minWidth: i, height: a } = n();
	return r.height = a, r.style.height = R(a), i > 0 && (r.style.minWidth = R(i)), r;
}, ng = function(e, t, n, r, i) {
	var a, o = e.height + e.depth + n + r;
	if (/fbox|color|angl/.test(t)) {
		if (a = Y(["stretchy", t], [], i), t === "fbox") {
			var s = i.color && i.getColor();
			s && (a.style.borderColor = s);
		}
	} else {
		var c = [];
		/^[bx]cancel$/.test(t) && c.push(new Hp({
			x1: "0",
			y1: "0",
			x2: "100%",
			y2: "100%",
			"stroke-width": "0.046em"
		})), /^x?cancel$/.test(t) && c.push(new Hp({
			x1: "0",
			y1: "100%",
			x2: "100%",
			y2: "0",
			"stroke-width": "0.046em"
		})), a = qm([], [new Bp(c, {
			width: "100%",
			height: R(o)
		})], i);
	}
	return a.height = o, a.style.height = R(o), a;
}, rg = {
	bin: 1,
	close: 1,
	inner: 1,
	open: 1,
	punct: 1,
	rel: 1
}, ig = {
	"accent-token": 1,
	mathord: 1,
	"op-token": 1,
	spacing: 1,
	textord: 1
};
function ag(e) {
	return e in rg;
}
function Q(e, t) {
	if (!e || e.type !== t) throw Error("Expected node of type " + t + ", but got " + (e ? "node of type " + e.type : String(e)));
	return e;
}
function og(e) {
	var t = sg(e);
	if (!t) throw Error("Expected node of symbol group type, but got " + (e ? "node of type " + e.type : String(e)));
	return t;
}
function sg(e) {
	return e && (e.type === "atom" || ig.hasOwnProperty(e.type)) ? e : null;
}
var cg = (e) => {
	if (e instanceof zp) return e;
	if (Gp(e) && e.children.length === 1) return cg(e.children[0]);
}, lg = (e, t) => {
	var n, r, i;
	e && e.type === "supsub" ? (r = Q(e.base, "accent"), n = r.base, e.base = n, i = Wp(Eh(e, t)), e.base = r) : (r = Q(e, "accent"), n = r.base);
	var a = Eh(n, t.havingCrampedStyle()), o = r.isShifty && Lf(n), s = 0;
	o && (s = cg(a)?.skew ?? 0);
	var c = r.label === "\\c", l = c ? a.height + a.depth : Math.min(a.height, t.fontMetrics().xHeight), u;
	if (r.isStretchy) u = tg(r, t), u = $m({
		positionType: "firstBaseline",
		children: [{
			type: "elem",
			elem: a
		}, {
			type: "elem",
			elem: u,
			wrapperClasses: ["svg-align"],
			wrapperStyle: s > 0 ? {
				width: "calc(100% - " + R(2 * s) + ")",
				marginLeft: R(2 * s)
			} : void 0
		}]
	});
	else {
		var d, f;
		r.label === "\\vec" ? (d = ih("vec", t), f = rh.vec[1]) : (d = Um({
			type: "textord",
			mode: r.mode,
			text: r.label
		}, t, "textord"), d = Up(d), d.italic = 0, f = d.width, c && (l += d.depth)), u = Y(["accent-body"], [d]);
		var p = r.label === "\\textcircled";
		p && (u.classes.push("accent-full"), l = a.height);
		var m = s;
		p || (m -= f / 2), u.style.left = R(m), r.label === "\\textcircled" && (u.style.top = ".2em"), u = $m({
			positionType: "firstBaseline",
			children: [
				{
					type: "elem",
					elem: a
				},
				{
					type: "kern",
					size: -l
				},
				{
					type: "elem",
					elem: u
				}
			]
		});
	}
	var h = Y(["mord", "accent"], [u], t);
	return i ? (i.children[0] = h, i.height = Math.max(h.height, i.height), i.classes[0] = "mord", i) : h;
}, ug = (e, t) => {
	var n = e.isStretchy ? Qh(e.label) : new Z("mo", [Ph(e.label, e.mode)]), r = new Z("mover", [Vh(e.base, t), n]);
	return r.setAttribute("accent", "true"), r;
}, dg = new RegExp([
	"\\acute",
	"\\grave",
	"\\ddot",
	"\\tilde",
	"\\bar",
	"\\breve",
	"\\check",
	"\\hat",
	"\\vec",
	"\\dot",
	"\\mathring"
].map((e) => "\\" + e).join("|"));
X({
	type: "accent",
	names: [
		"\\acute",
		"\\grave",
		"\\ddot",
		"\\tilde",
		"\\bar",
		"\\breve",
		"\\check",
		"\\hat",
		"\\vec",
		"\\dot",
		"\\mathring",
		"\\widecheck",
		"\\widehat",
		"\\widetilde",
		"\\overrightarrow",
		"\\overleftarrow",
		"\\Overrightarrow",
		"\\overleftrightarrow",
		"\\overgroup",
		"\\overlinesegment",
		"\\overleftharpoon",
		"\\overrightharpoon"
	],
	props: { numArgs: 1 },
	handler: (e, t) => {
		var n = mh(t[0]), r = !dg.test(e.funcName), i = !r || e.funcName === "\\widehat" || e.funcName === "\\widetilde" || e.funcName === "\\widecheck";
		return {
			type: "accent",
			mode: e.parser.mode,
			label: e.funcName,
			isStretchy: r,
			isShifty: i,
			base: n
		};
	},
	htmlBuilder: lg,
	mathmlBuilder: ug
}), X({
	type: "accent",
	names: [
		"\\'",
		"\\`",
		"\\^",
		"\\~",
		"\\=",
		"\\u",
		"\\.",
		"\\\"",
		"\\c",
		"\\r",
		"\\H",
		"\\v",
		"\\textcircled"
	],
	props: {
		numArgs: 1,
		allowedInText: !0,
		allowedInMath: !0,
		argTypes: ["primitive"]
	},
	handler: (e, t) => {
		var n = t[0], r = e.parser.mode;
		return r === "math" && (e.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + e.funcName + " works only in text mode"), r = "text"), {
			type: "accent",
			mode: r,
			label: e.funcName,
			isStretchy: !1,
			isShifty: !0,
			base: n
		};
	},
	htmlBuilder: lg,
	mathmlBuilder: ug
}), X({
	type: "accentUnder",
	names: [
		"\\underleftarrow",
		"\\underrightarrow",
		"\\underleftrightarrow",
		"\\undergroup",
		"\\underlinesegment",
		"\\utilde"
	],
	props: { numArgs: 1 },
	handler: (e, t) => {
		var { parser: n, funcName: r } = e, i = t[0];
		return {
			type: "accentUnder",
			mode: n.mode,
			label: r,
			base: i
		};
	},
	htmlBuilder: (e, t) => {
		var n = Eh(e.base, t), r = tg(e, t), i = e.label === "\\utilde" ? .12 : 0;
		return Y(["mord", "accentunder"], [$m({
			positionType: "top",
			positionData: n.height,
			children: [
				{
					type: "elem",
					elem: r,
					wrapperClasses: ["svg-align"]
				},
				{
					type: "kern",
					size: i
				},
				{
					type: "elem",
					elem: n
				}
			]
		})], t);
	},
	mathmlBuilder: (e, t) => {
		var n = Qh(e.label), r = new Z("munder", [Vh(e.base, t), n]);
		return r.setAttribute("accentunder", "true"), r;
	}
});
var fg = (e) => {
	var t = new Z("mpadded", e ? [e] : []);
	return t.setAttribute("width", "+0.6em"), t.setAttribute("lspace", "0.3em"), t;
};
X({
	type: "xArrow",
	names: [
		"\\xleftarrow",
		"\\xrightarrow",
		"\\xLeftarrow",
		"\\xRightarrow",
		"\\xleftrightarrow",
		"\\xLeftrightarrow",
		"\\xhookleftarrow",
		"\\xhookrightarrow",
		"\\xmapsto",
		"\\xrightharpoondown",
		"\\xrightharpoonup",
		"\\xleftharpoondown",
		"\\xleftharpoonup",
		"\\xrightleftharpoons",
		"\\xleftrightharpoons",
		"\\xlongequal",
		"\\xtwoheadrightarrow",
		"\\xtwoheadleftarrow",
		"\\xtofrom",
		"\\xrightleftarrows",
		"\\xrightequilibrium",
		"\\xleftequilibrium",
		"\\\\cdrightarrow",
		"\\\\cdleftarrow",
		"\\\\cdlongequal"
	],
	props: {
		numArgs: 1,
		numOptionalArgs: 1
	},
	handler(e, t, n) {
		var { parser: r, funcName: i } = e;
		return {
			type: "xArrow",
			mode: r.mode,
			label: i,
			body: t[0],
			below: n[0]
		};
	},
	htmlBuilder(e, t) {
		var n = t.style, r = t.havingStyle(n.sup()), i = Zm(Eh(e.body, r, t), t), a = e.label.slice(0, 2) === "\\x" ? "x" : "cd";
		i.classes.push(a + "-arrow-pad");
		var o;
		e.below && (r = t.havingStyle(n.sub()), o = Zm(Eh(e.below, r, t), t), o.classes.push(a + "-arrow-pad"));
		var s = tg(e, t), c = -t.fontMetrics().axisHeight + .5 * s.height, l = -t.fontMetrics().axisHeight - .5 * s.height - .111;
		(i.depth > .25 || e.label === "\\xleftequilibrium") && (l -= i.depth);
		var u;
		if (o) {
			var d = -t.fontMetrics().axisHeight + o.height + .5 * s.height + .111;
			u = $m({
				positionType: "individualShift",
				children: [
					{
						type: "elem",
						elem: i,
						shift: l
					},
					{
						type: "elem",
						elem: s,
						shift: c,
						wrapperClasses: ["svg-align"]
					},
					{
						type: "elem",
						elem: o,
						shift: d
					}
				]
			});
		} else u = $m({
			positionType: "individualShift",
			children: [{
				type: "elem",
				elem: i,
				shift: l
			}, {
				type: "elem",
				elem: s,
				shift: c,
				wrapperClasses: ["svg-align"]
			}]
		});
		return Y(["mrel", "x-arrow"], [u], t);
	},
	mathmlBuilder(e, t) {
		var n = Qh(e.label);
		n.setAttribute("minsize", e.label.charAt(0) === "x" ? "1.75em" : "3.0em");
		var r;
		if (e.body) {
			var i = fg(Vh(e.body, t));
			r = e.below ? new Z("munderover", [
				n,
				fg(Vh(e.below, t)),
				i
			]) : new Z("mover", [n, i]);
		} else e.below ? r = new Z("munder", [n, fg(Vh(e.below, t))]) : (r = fg(), r = new Z("mover", [n, r]));
		return r;
	}
});
function pg(e, t) {
	var n = bh(e.body, t, !0);
	return Y([e.mclass], n, t);
}
function mg(e, t) {
	var n, r = zh(e.body, t);
	return e.mclass === "minner" ? n = new Z("mpadded", r) : e.mclass === "mord" ? e.isCharacterBox ? (n = r[0], n.type = "mi") : n = new Z("mi", r) : (e.isCharacterBox ? (n = r[0], n.type = "mo") : n = new Z("mo", r), e.mclass === "mbin" ? (n.attributes.lspace = "0.22em", n.attributes.rspace = "0.22em") : e.mclass === "mpunct" ? (n.attributes.lspace = "0em", n.attributes.rspace = "0.17em") : e.mclass === "mopen" || e.mclass === "mclose" ? (n.attributes.lspace = "0em", n.attributes.rspace = "0em") : e.mclass === "minner" && (n.attributes.lspace = "0.0556em", n.attributes.width = "+0.1111em")), n;
}
X({
	type: "mclass",
	names: [
		"\\mathord",
		"\\mathbin",
		"\\mathrel",
		"\\mathopen",
		"\\mathclose",
		"\\mathpunct",
		"\\mathinner"
	],
	props: {
		numArgs: 1,
		primitive: !0
	},
	handler(e, t) {
		var { parser: n, funcName: r } = e, i = t[0];
		return {
			type: "mclass",
			mode: n.mode,
			mclass: "m" + r.slice(5),
			body: hh(i),
			isCharacterBox: Lf(i)
		};
	},
	htmlBuilder: pg,
	mathmlBuilder: mg
});
var hg = (e) => {
	var t = e.type === "ordgroup" && e.body.length ? e.body[0] : e;
	return t.type === "atom" && (t.family === "bin" || t.family === "rel") ? "m" + t.family : "mord";
};
X({
	type: "mclass",
	names: ["\\@binrel"],
	props: { numArgs: 2 },
	handler(e, t) {
		var { parser: n } = e;
		return {
			type: "mclass",
			mode: n.mode,
			mclass: hg(t[0]),
			body: hh(t[1]),
			isCharacterBox: Lf(t[1])
		};
	}
}), X({
	type: "mclass",
	names: [
		"\\stackrel",
		"\\overset",
		"\\underset"
	],
	props: { numArgs: 2 },
	handler(e, t) {
		var { parser: n, funcName: r } = e, i = t[1], a = t[0], o = r === "\\stackrel" ? "mrel" : hg(i), s = {
			type: "op",
			mode: i.mode,
			limits: !0,
			alwaysHandleSupSub: !0,
			parentIsSupSub: !1,
			symbol: !1,
			suppressBaseShift: r !== "\\stackrel",
			body: hh(i)
		}, c = {
			type: "supsub",
			mode: a.mode,
			base: s,
			sup: r === "\\underset" ? null : a,
			sub: r === "\\underset" ? a : null
		};
		return {
			type: "mclass",
			mode: n.mode,
			mclass: o,
			body: [c],
			isCharacterBox: Lf(c)
		};
	},
	htmlBuilder: pg,
	mathmlBuilder: mg
}), X({
	type: "pmb",
	names: ["\\pmb"],
	props: {
		numArgs: 1,
		allowedInText: !0
	},
	handler(e, t) {
		var { parser: n } = e;
		return {
			type: "pmb",
			mode: n.mode,
			mclass: hg(t[0]),
			body: hh(t[0])
		};
	},
	htmlBuilder(e, t) {
		var n = bh(e.body, t, !0), r = Y([e.mclass], n, t);
		return r.style.textShadow = "0.02em 0.01em 0.04px", r;
	},
	mathmlBuilder(e, t) {
		var n = new Z("mstyle", zh(e.body, t));
		return n.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px"), n;
	}
});
var gg = {
	">": "\\\\cdrightarrow",
	"<": "\\\\cdleftarrow",
	"=": "\\\\cdlongequal",
	A: "\\uparrow",
	V: "\\downarrow",
	"|": "\\Vert",
	".": "no arrow"
}, _g = () => ({
	type: "styling",
	body: [],
	mode: "math",
	style: "display",
	resetFont: !0
}), vg = (e) => e.type === "textord" && e.text === "@", yg = (e, t) => (e.type === "mathord" || e.type === "atom") && e.text === t;
function bg(e, t, n) {
	var r = gg[e];
	switch (r) {
		case "\\\\cdrightarrow":
		case "\\\\cdleftarrow": return n.callFunction(r, [t[0]], [t[1]]);
		case "\\uparrow":
		case "\\downarrow":
			var i = n.callFunction("\\\\cdleft", [t[0]], []), a = {
				type: "atom",
				text: r,
				mode: "math",
				family: "rel"
			}, o = {
				type: "ordgroup",
				mode: "math",
				body: [
					i,
					n.callFunction("\\Big", [a], []),
					n.callFunction("\\\\cdright", [t[1]], [])
				]
			};
			return n.callFunction("\\\\cdparent", [o], []);
		case "\\\\cdlongequal": return n.callFunction("\\\\cdlongequal", [], []);
		case "\\Vert": return n.callFunction("\\Big", [{
			type: "textord",
			text: "\\Vert",
			mode: "math"
		}], []);
		default: return {
			type: "textord",
			text: " ",
			mode: "math"
		};
	}
}
function xg(e) {
	var t = [];
	for (e.gullet.beginGroup(), e.gullet.macros.set("\\cr", "\\\\\\relax"), e.gullet.beginGroup();;) {
		t.push(e.parseExpression(!1, "\\\\")), e.gullet.endGroup(), e.gullet.beginGroup();
		var n = e.fetch().text;
		if (n === "&" || n === "\\\\") e.consume();
		else if (n === "\\end") {
			t[t.length - 1].length === 0 && t.pop();
			break;
		} else throw new I("Expected \\\\ or \\cr or \\end", e.nextToken);
	}
	for (var r = [], i = [r], a = 0; a < t.length; a++) {
		for (var o = t[a], s = _g(), c = 0; c < o.length; c++) if (!vg(o[c])) s.body.push(o[c]);
		else {
			r.push(s), c += 1;
			var l = og(o[c]).text, u = [, ,];
			if (u[0] = {
				type: "ordgroup",
				mode: "math",
				body: []
			}, u[1] = {
				type: "ordgroup",
				mode: "math",
				body: []
			}, !"=|.".includes(l)) {
				if ("<>AV".includes(l)) for (var d = 0; d < 2; d++) {
					for (var f = !0, p = c + 1; p < o.length; p++) {
						if (yg(o[p], l)) {
							f = !1, c = p;
							break;
						}
						if (vg(o[p])) throw new I("Missing a " + l + " character to complete a CD arrow.", o[p]);
						u[d].body.push(o[p]);
					}
					if (f) throw new I("Missing a " + l + " character to complete a CD arrow.", o[c]);
				}
				else throw new I("Expected one of \"<>AV=|.\" after @", o[c]);
			}
			var m = {
				type: "styling",
				body: [bg(l, u, e)],
				mode: "math",
				style: "display",
				resetFont: !0
			};
			r.push(m), s = _g();
		}
		a % 2 == 0 ? r.push(s) : r.shift(), r = [], i.push(r);
	}
	return e.gullet.endGroup(), e.gullet.endGroup(), {
		type: "array",
		mode: "math",
		body: i,
		arraystretch: 1,
		addJot: !0,
		rowGaps: [null],
		cols: Array(i[0].length).fill({
			type: "align",
			align: "c",
			pregap: .25,
			postgap: .25
		}),
		colSeparationType: "CD",
		hLinesBeforeRow: Array(i.length + 1).fill([])
	};
}
X({
	type: "cdlabel",
	names: ["\\\\cdleft", "\\\\cdright"],
	props: { numArgs: 1 },
	handler(e, t) {
		var { parser: n, funcName: r } = e;
		return {
			type: "cdlabel",
			mode: n.mode,
			side: r.slice(4),
			label: t[0]
		};
	},
	htmlBuilder(e, t) {
		var n = t.havingStyle(t.style.sup()), r = Zm(Eh(e.label, n, t), t);
		return r.classes.push("cd-label-" + e.side), r.style.bottom = R(.8 - r.depth), r.height = 0, r.depth = 0, r;
	},
	mathmlBuilder(e, t) {
		var n = new Z("mrow", [Vh(e.label, t)]);
		return n = new Z("mpadded", [n]), n.setAttribute("width", "0"), e.side === "left" && n.setAttribute("lspace", "-1width"), n.setAttribute("voffset", "0.7em"), n = new Z("mstyle", [n]), n.setAttribute("displaystyle", "false"), n.setAttribute("scriptlevel", "1"), n;
	}
}), X({
	type: "cdlabelparent",
	names: ["\\\\cdparent"],
	props: { numArgs: 1 },
	handler(e, t) {
		var { parser: n } = e;
		return {
			type: "cdlabelparent",
			mode: n.mode,
			fragment: t[0]
		};
	},
	htmlBuilder(e, t) {
		var n = Zm(Eh(e.fragment, t), t);
		return n.classes.push("cd-vert-arrow"), n;
	},
	mathmlBuilder(e, t) {
		return new Z("mrow", [Vh(e.fragment, t)]);
	}
}), X({
	type: "textord",
	names: ["\\@char"],
	props: {
		numArgs: 1,
		allowedInText: !0
	},
	handler(e, t) {
		for (var { parser: n } = e, r = Q(t[0], "ordgroup").body, i = "", a = 0; a < r.length; a++) {
			var o = Q(r[a], "textord");
			i += o.text;
		}
		var s = parseInt(i), c;
		if (isNaN(s)) throw new I("\\@char has non-numeric argument " + i);
		if (s < 0 || s >= 1114111) throw new I("\\@char with invalid code point " + i);
		return s <= 65535 ? c = String.fromCharCode(s) : (s -= 65536, c = String.fromCharCode((s >> 10) + 55296, (s & 1023) + 56320)), {
			type: "textord",
			mode: n.mode,
			text: c
		};
	}
});
var Sg = (e, t) => Xm(bh(e.body, t.withColor(e.color), !1)), Cg = (e, t) => {
	var n = new Z("mstyle", zh(e.body, t.withColor(e.color)));
	return n.setAttribute("mathcolor", e.color), n;
};
X({
	type: "color",
	names: ["\\textcolor"],
	props: {
		numArgs: 2,
		allowedInText: !0,
		argTypes: ["color", "original"]
	},
	handler(e, t) {
		var { parser: n } = e, r = Q(t[0], "color-token").color, i = t[1];
		return {
			type: "color",
			mode: n.mode,
			color: r,
			body: hh(i)
		};
	},
	htmlBuilder: Sg,
	mathmlBuilder: Cg
}), X({
	type: "color",
	names: ["\\color"],
	props: {
		numArgs: 1,
		allowedInText: !0,
		argTypes: ["color"]
	},
	handler(e, t) {
		var { parser: n, breakOnTokenText: r } = e, i = Q(t[0], "color-token").color;
		n.gullet.macros.set("\\current@color", i);
		var a = n.parseExpression(!0, r);
		return {
			type: "color",
			mode: n.mode,
			color: i,
			body: a
		};
	},
	htmlBuilder: Sg,
	mathmlBuilder: Cg
}), X({
	type: "cr",
	names: ["\\\\"],
	props: {
		numArgs: 0,
		numOptionalArgs: 0,
		allowedInText: !0
	},
	handler(e, t, n) {
		var { parser: r } = e, i = r.gullet.future().text === "[" ? r.parseSizeGroup(!0) : null, a = !r.settings.displayMode || !r.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
		return {
			type: "cr",
			mode: r.mode,
			newLine: a,
			size: i && Q(i, "size").value
		};
	},
	htmlBuilder(e, t) {
		var n = Y(["mspace"], [], t);
		return e.newLine && (n.classes.push("newline"), e.size && (n.style.marginTop = R(Op(e.size, t)))), n;
	},
	mathmlBuilder(e, t) {
		var n = new Z("mspace");
		return e.newLine && (n.setAttribute("linebreak", "newline"), e.size && n.setAttribute("height", R(Op(e.size, t)))), n;
	}
});
var wg = {
	"\\global": "\\global",
	"\\long": "\\\\globallong",
	"\\\\globallong": "\\\\globallong",
	"\\def": "\\gdef",
	"\\gdef": "\\gdef",
	"\\edef": "\\xdef",
	"\\xdef": "\\xdef",
	"\\let": "\\\\globallet",
	"\\futurelet": "\\\\globalfuture"
}, Tg = (e) => {
	var t = e.text;
	if (/^(?:[\\{}$&#^_]|EOF)$/.test(t)) throw new I("Expected a control sequence", e);
	return t;
}, Eg = (e) => {
	var t = e.gullet.popToken();
	return t.text === "=" && (t = e.gullet.popToken(), t.text === " " && (t = e.gullet.popToken())), t;
}, Dg = (e, t, n, r) => {
	var i = e.gullet.macros.get(n.text);
	i ??= (n.noexpand = !0, {
		tokens: [n],
		numArgs: 0,
		unexpandable: !e.gullet.isExpandable(n.text)
	}), e.gullet.macros.set(t, i, r);
};
X({
	type: "internal",
	names: [
		"\\global",
		"\\long",
		"\\\\globallong"
	],
	props: {
		numArgs: 0,
		allowedInText: !0
	},
	handler(e) {
		var { parser: t, funcName: n } = e;
		t.consumeSpaces();
		var r = t.fetch();
		if (wg[r.text]) return (n === "\\global" || n === "\\\\globallong") && (r.text = wg[r.text]), Q(t.parseFunction(), "internal");
		throw new I("Invalid token after macro prefix", r);
	}
}), X({
	type: "internal",
	names: [
		"\\def",
		"\\gdef",
		"\\edef",
		"\\xdef"
	],
	props: {
		numArgs: 0,
		allowedInText: !0,
		primitive: !0
	},
	handler(e) {
		var { parser: t, funcName: n } = e, r = t.gullet.popToken(), i = r.text;
		if (/^(?:[\\{}$&#^_]|EOF)$/.test(i)) throw new I("Expected a control sequence", r);
		for (var a = 0, o, s = [[]]; t.gullet.future().text !== "{";) if (r = t.gullet.popToken(), r.text === "#") {
			if (t.gullet.future().text === "{") {
				o = t.gullet.future(), s[a].push("{");
				break;
			}
			if (r = t.gullet.popToken(), !/^[1-9]$/.test(r.text)) throw new I("Invalid argument number \"" + r.text + "\"");
			if (parseInt(r.text) !== a + 1) throw new I("Argument number \"" + r.text + "\" out of order");
			a++, s.push([]);
		} else if (r.text === "EOF") throw new I("Expected a macro definition");
		else s[a].push(r.text);
		var { tokens: c } = t.gullet.consumeArg();
		return o && c.unshift(o), (n === "\\edef" || n === "\\xdef") && (c = t.gullet.expandTokens(c), c.reverse()), t.gullet.macros.set(i, {
			tokens: c,
			numArgs: a,
			delimiters: s
		}, n === wg[n]), {
			type: "internal",
			mode: t.mode
		};
	}
}), X({
	type: "internal",
	names: ["\\let", "\\\\globallet"],
	props: {
		numArgs: 0,
		allowedInText: !0,
		primitive: !0
	},
	handler(e) {
		var { parser: t, funcName: n } = e, r = Tg(t.gullet.popToken());
		return t.gullet.consumeSpaces(), Dg(t, r, Eg(t), n === "\\\\globallet"), {
			type: "internal",
			mode: t.mode
		};
	}
}), X({
	type: "internal",
	names: ["\\futurelet", "\\\\globalfuture"],
	props: {
		numArgs: 0,
		allowedInText: !0,
		primitive: !0
	},
	handler(e) {
		var { parser: t, funcName: n } = e, r = Tg(t.gullet.popToken()), i = t.gullet.popToken(), a = t.gullet.popToken();
		return Dg(t, r, a, n === "\\\\globalfuture"), t.gullet.pushToken(a), t.gullet.pushToken(i), {
			type: "internal",
			mode: t.mode
		};
	}
});
var Og = function(e, t, n) {
	var r = Xp($p.math[e] && $p.math[e].replace || e, t, n);
	if (!r) throw Error("Unsupported symbol " + e + " and font size " + t + ".");
	return r;
}, kg = function(e, t, n, r) {
	var i = n.havingBaseStyle(t), a = Y(r.concat(i.sizingClasses(n)), [e], n), o = i.sizeMultiplier / n.sizeMultiplier;
	return a.height *= o, a.depth *= o, a.maxFontSize = i.sizeMultiplier, a;
}, Ag = function(e, t, n) {
	var r = t.havingBaseStyle(n), i = (1 - t.sizeMultiplier / r.sizeMultiplier) * t.fontMetrics().axisHeight;
	e.classes.push("delimcenter"), e.style.top = R(i), e.height -= i, e.depth += i;
}, jg = function(e, t, n, r, i, a) {
	var o = kg(Bm(e, "Main-Regular", i, r), t, r, a);
	return n && Ag(o, r, t), o;
}, Mg = function(e, t, n, r) {
	return Bm(e, "Size" + t + "-Regular", n, r);
}, Ng = function(e, t, n, r, i, a) {
	var o = Mg(e, t, i, r), s = kg(Y(["delimsizing", "size" + t], [o], r), L.TEXT, r, a);
	return n && Ag(s, r, L.TEXT), s;
}, Pg = function(e, t, n) {
	return {
		type: "elem",
		elem: Y(["delimsizinginner", t === "Size1-Regular" ? "delim-size1" : "delim-size4"], [Y([], [Bm(e, t, n)])])
	};
}, Fg = function(e, t, n) {
	var r = Kp["Size4-Regular"][e.charCodeAt(0)] ? Kp["Size4-Regular"][e.charCodeAt(0)][4] : Kp["Size1-Regular"][e.charCodeAt(0)][4], i = qm([], [new Bp([new Vp("inner", bp(e, Math.round(1e3 * t)))], {
		width: R(r),
		height: R(t),
		style: "width:" + R(r),
		viewBox: "0 0 " + 1e3 * r + " " + Math.round(1e3 * t),
		preserveAspectRatio: "xMinYMin"
	})], n);
	return i.height = t, i.style.height = R(t), i.style.width = R(r), {
		type: "elem",
		elem: i
	};
}, Ig = .008, Lg = {
	type: "kern",
	size: -1 * Ig
}, Rg = /* @__PURE__ */ new Set([
	"|",
	"\\lvert",
	"\\rvert",
	"\\vert"
]), zg = /* @__PURE__ */ new Set([
	"\\|",
	"\\lVert",
	"\\rVert",
	"\\Vert"
]), Bg = function(e, t, n, r, i, a) {
	var o, s, c, l, u = "", d = 0;
	o = c = l = e, s = null;
	var f = "Size1-Regular";
	e === "\\uparrow" ? c = l = "⏐" : e === "\\Uparrow" ? c = l = "‖" : e === "\\downarrow" ? o = c = "⏐" : e === "\\Downarrow" ? o = c = "‖" : e === "\\updownarrow" ? (o = "\\uparrow", c = "⏐", l = "\\downarrow") : e === "\\Updownarrow" ? (o = "\\Uparrow", c = "‖", l = "\\Downarrow") : Rg.has(e) ? (c = "∣", u = "vert", d = 333) : zg.has(e) ? (c = "∥", u = "doublevert", d = 556) : e === "[" || e === "\\lbrack" ? (o = "⎡", c = "⎢", l = "⎣", f = "Size4-Regular", u = "lbrack", d = 667) : e === "]" || e === "\\rbrack" ? (o = "⎤", c = "⎥", l = "⎦", f = "Size4-Regular", u = "rbrack", d = 667) : e === "\\lfloor" || e === "⌊" ? (c = o = "⎢", l = "⎣", f = "Size4-Regular", u = "lfloor", d = 667) : e === "\\lceil" || e === "⌈" ? (o = "⎡", c = l = "⎢", f = "Size4-Regular", u = "lceil", d = 667) : e === "\\rfloor" || e === "⌋" ? (c = o = "⎥", l = "⎦", f = "Size4-Regular", u = "rfloor", d = 667) : e === "\\rceil" || e === "⌉" ? (o = "⎤", c = l = "⎥", f = "Size4-Regular", u = "rceil", d = 667) : e === "(" || e === "\\lparen" ? (o = "⎛", c = "⎜", l = "⎝", f = "Size4-Regular", u = "lparen", d = 875) : e === ")" || e === "\\rparen" ? (o = "⎞", c = "⎟", l = "⎠", f = "Size4-Regular", u = "rparen", d = 875) : e === "\\{" || e === "\\lbrace" ? (o = "⎧", s = "⎨", l = "⎩", c = "⎪", f = "Size4-Regular") : e === "\\}" || e === "\\rbrace" ? (o = "⎫", s = "⎬", l = "⎭", c = "⎪", f = "Size4-Regular") : e === "\\lgroup" || e === "⟮" ? (o = "⎧", l = "⎩", c = "⎪", f = "Size4-Regular") : e === "\\rgroup" || e === "⟯" ? (o = "⎫", l = "⎭", c = "⎪", f = "Size4-Regular") : e === "\\lmoustache" || e === "⎰" ? (o = "⎧", l = "⎭", c = "⎪", f = "Size4-Regular") : (e === "\\rmoustache" || e === "⎱") && (o = "⎫", l = "⎩", c = "⎪", f = "Size4-Regular");
	var p = Og(o, f, i), m = p.height + p.depth, h = Og(c, f, i), g = h.height + h.depth, _ = Og(l, f, i), v = _.height + _.depth, y = 0, b = 1;
	if (s !== null) {
		var x = Og(s, f, i);
		y = x.height + x.depth, b = 2;
	}
	var S = m + v + y, C = S + Math.max(0, Math.ceil((t - S) / (b * g))) * b * g, w = r.fontMetrics().axisHeight;
	n && (w *= r.sizeMultiplier);
	var T = C / 2 - w, E = [];
	if (u.length > 0) {
		var ee = C - m - v, D = Math.round(C * 1e3), te = Sp(u, Math.round(ee * 1e3)), ne = new Vp(u, te), re = R(d / 1e3), ie = R(D / 1e3), ae = qm([], [new Bp([ne], {
			width: re,
			height: ie,
			viewBox: "0 0 " + d + " " + D
		})], r);
		ae.height = D / 1e3, ae.style.width = re, ae.style.height = ie, E.push({
			type: "elem",
			elem: ae
		});
	} else {
		if (E.push(Pg(l, f, i)), E.push(Lg), s === null) {
			var O = C - m - v + 2 * Ig;
			E.push(Fg(c, O, r));
		} else {
			var oe = (C - m - v - y) / 2 + 2 * Ig;
			E.push(Fg(c, oe, r)), E.push(Lg), E.push(Pg(s, f, i)), E.push(Lg), E.push(Fg(c, oe, r));
		}
		E.push(Lg), E.push(Pg(o, f, i));
	}
	var se = r.havingBaseStyle(L.TEXT);
	return kg(Y(["delimsizing", "mult"], [$m({
		positionType: "bottom",
		positionData: T,
		children: E
	})], se), L.TEXT, r, a);
}, Vg = 80, Hg = .08, Ug = function(e, t, n, r, i) {
	return qm(["hide-tail"], [new Bp([new Vp(e, yp(e, r, n))], {
		width: "400em",
		height: R(t),
		viewBox: "0 0 400000 " + n,
		preserveAspectRatio: "xMinYMin slice"
	})], i);
}, Wg = function(e, t) {
	var n = t.havingBaseSizing(), r = e_("\\surd", e * n.sizeMultiplier, Qg, n), i = n.sizeMultiplier, a = Math.max(0, t.minRuleThickness - t.fontMetrics().sqrtRuleThickness), o, s, c, l, u;
	return r.type === "small" ? (l = 1e3 + 1e3 * a + Vg, e < 1 ? i = 1 : e < 1.4 && (i = .7), s = (1 + a + Hg) / i, c = (1 + a) / i, o = Ug("sqrtMain", s, l, a, t), o.style.minWidth = "0.853em", u = .833 / i) : r.type === "large" ? (l = (1e3 + Vg) * Jg[r.size], c = (Jg[r.size] + a) / i, s = (Jg[r.size] + a + Hg) / i, o = Ug("sqrtSize" + r.size, s, l, a, t), o.style.minWidth = "1.02em", u = 1 / i) : (s = e + a + Hg, c = e + a, l = Math.floor(1e3 * e + a) + Vg, o = Ug("sqrtTall", s, l, a, t), o.style.minWidth = "0.742em", u = 1.056), o.height = c, o.style.height = R(s), {
		span: o,
		advanceWidth: u,
		ruleWidth: (t.fontMetrics().sqrtRuleThickness + a) * i
	};
}, Gg = /* @__PURE__ */ new Set([
	"(",
	"\\lparen",
	")",
	"\\rparen",
	"[",
	"\\lbrack",
	"]",
	"\\rbrack",
	"\\{",
	"\\lbrace",
	"\\}",
	"\\rbrace",
	"\\lfloor",
	"\\rfloor",
	"⌊",
	"⌋",
	"\\lceil",
	"\\rceil",
	"⌈",
	"⌉",
	"\\surd"
]), Kg = /* @__PURE__ */ new Set([
	"\\uparrow",
	"\\downarrow",
	"\\updownarrow",
	"\\Uparrow",
	"\\Downarrow",
	"\\Updownarrow",
	"|",
	"\\|",
	"\\vert",
	"\\Vert",
	"\\lvert",
	"\\rvert",
	"\\lVert",
	"\\rVert",
	"\\lgroup",
	"\\rgroup",
	"⟮",
	"⟯",
	"\\lmoustache",
	"\\rmoustache",
	"⎰",
	"⎱"
]), qg = /* @__PURE__ */ new Set([
	"<",
	">",
	"\\langle",
	"\\rangle",
	"/",
	"\\backslash",
	"\\lt",
	"\\gt"
]), Jg = [
	0,
	1.2,
	1.8,
	2.4,
	3
], Yg = function(e, t, n, r, i) {
	if (e === "<" || e === "\\lt" || e === "⟨" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle"), Gg.has(e) || qg.has(e)) return Ng(e, t, !1, n, r, i);
	if (Kg.has(e)) return Bg(e, Jg[t], !1, n, r, i);
	throw new I("Illegal delimiter: '" + e + "'");
}, Xg = [
	{
		type: "small",
		style: L.SCRIPTSCRIPT
	},
	{
		type: "small",
		style: L.SCRIPT
	},
	{
		type: "small",
		style: L.TEXT
	},
	{
		type: "large",
		size: 1
	},
	{
		type: "large",
		size: 2
	},
	{
		type: "large",
		size: 3
	},
	{
		type: "large",
		size: 4
	}
], Zg = [
	{
		type: "small",
		style: L.SCRIPTSCRIPT
	},
	{
		type: "small",
		style: L.SCRIPT
	},
	{
		type: "small",
		style: L.TEXT
	},
	{ type: "stack" }
], Qg = [
	{
		type: "small",
		style: L.SCRIPTSCRIPT
	},
	{
		type: "small",
		style: L.SCRIPT
	},
	{
		type: "small",
		style: L.TEXT
	},
	{
		type: "large",
		size: 1
	},
	{
		type: "large",
		size: 2
	},
	{
		type: "large",
		size: 3
	},
	{
		type: "large",
		size: 4
	},
	{ type: "stack" }
], $g = function(e) {
	if (e.type === "small") return "Main-Regular";
	if (e.type === "large") return "Size" + e.size + "-Regular";
	if (e.type === "stack") return "Size4-Regular";
	var t = e.type;
	throw Error("Add support for delim type '" + t + "' here.");
}, e_ = function(e, t, n, r) {
	for (var i = Math.min(2, 3 - r.style.size); i < n.length; i++) {
		var a = n[i];
		if (a.type === "stack") break;
		var o = Og(e, $g(a), "math"), s = o.height + o.depth;
		if (a.type === "small") {
			var c = r.havingBaseStyle(a.style);
			s *= c.sizeMultiplier;
		}
		if (s > t) return a;
	}
	return n[n.length - 1];
}, t_ = function(e, t, n, r, i, a) {
	e === "<" || e === "\\lt" || e === "⟨" ? e = "\\langle" : (e === ">" || e === "\\gt" || e === "⟩") && (e = "\\rangle");
	var o = qg.has(e) ? Xg : Gg.has(e) ? Qg : Zg, s = e_(e, t, o, r);
	return s.type === "small" ? jg(e, s.style, n, r, i, a) : s.type === "large" ? Ng(e, s.size, n, r, i, a) : Bg(e, t, n, r, i, a);
}, n_ = function(e, t, n, r, i, a) {
	var o = r.fontMetrics().axisHeight * r.sizeMultiplier, s = 901, c = 5 / r.fontMetrics().ptPerEm, l = Math.max(t - o, n + o);
	return t_(e, Math.max(l / 500 * s, 2 * l - c), !0, r, i, a);
}, r_ = {
	"\\bigl": {
		mclass: "mopen",
		size: 1
	},
	"\\Bigl": {
		mclass: "mopen",
		size: 2
	},
	"\\biggl": {
		mclass: "mopen",
		size: 3
	},
	"\\Biggl": {
		mclass: "mopen",
		size: 4
	},
	"\\bigr": {
		mclass: "mclose",
		size: 1
	},
	"\\Bigr": {
		mclass: "mclose",
		size: 2
	},
	"\\biggr": {
		mclass: "mclose",
		size: 3
	},
	"\\Biggr": {
		mclass: "mclose",
		size: 4
	},
	"\\bigm": {
		mclass: "mrel",
		size: 1
	},
	"\\Bigm": {
		mclass: "mrel",
		size: 2
	},
	"\\biggm": {
		mclass: "mrel",
		size: 3
	},
	"\\Biggm": {
		mclass: "mrel",
		size: 4
	},
	"\\big": {
		mclass: "mord",
		size: 1
	},
	"\\Big": {
		mclass: "mord",
		size: 2
	},
	"\\bigg": {
		mclass: "mord",
		size: 3
	},
	"\\Bigg": {
		mclass: "mord",
		size: 4
	}
}, i_ = /* @__PURE__ */ new Set(/* @__PURE__ */ "(,\\lparen,),\\rparen,[,\\lbrack,],\\rbrack,\\{,\\lbrace,\\},\\rbrace,\\lfloor,\\rfloor,⌊,⌋,\\lceil,\\rceil,⌈,⌉,<,>,\\langle,⟨,\\rangle,⟩,\\lt,\\gt,\\lvert,\\rvert,\\lVert,\\rVert,\\lgroup,\\rgroup,⟮,⟯,\\lmoustache,\\rmoustache,⎰,⎱,/,\\backslash,|,\\vert,\\|,\\Vert,\\uparrow,\\Uparrow,\\downarrow,\\Downarrow,\\updownarrow,\\Updownarrow,.".split(","));
function a_(e) {
	return "isMiddle" in e;
}
function o_(e, t) {
	var n = sg(e);
	if (n && i_.has(n.text)) return n;
	throw n ? new I("Invalid delimiter '" + n.text + "' after '" + t.funcName + "'", e) : new I("Invalid delimiter type '" + e.type + "'", e);
}
X({
	type: "delimsizing",
	names: [
		"\\bigl",
		"\\Bigl",
		"\\biggl",
		"\\Biggl",
		"\\bigr",
		"\\Bigr",
		"\\biggr",
		"\\Biggr",
		"\\bigm",
		"\\Bigm",
		"\\biggm",
		"\\Biggm",
		"\\big",
		"\\Big",
		"\\bigg",
		"\\Bigg"
	],
	props: {
		numArgs: 1,
		argTypes: ["primitive"]
	},
	handler: (e, t) => {
		var n = o_(t[0], e);
		return {
			type: "delimsizing",
			mode: e.parser.mode,
			size: r_[e.funcName].size,
			mclass: r_[e.funcName].mclass,
			delim: n.text
		};
	},
	htmlBuilder: (e, t) => e.delim === "." ? Y([e.mclass]) : Yg(e.delim, e.size, t, e.mode, [e.mclass]),
	mathmlBuilder: (e) => {
		var t = [];
		e.delim !== "." && t.push(Ph(e.delim, e.mode));
		var n = new Z("mo", t);
		e.mclass === "mopen" || e.mclass === "mclose" ? n.setAttribute("fence", "true") : n.setAttribute("fence", "false"), n.setAttribute("stretchy", "true");
		var r = R(Jg[e.size]);
		return n.setAttribute("minsize", r), n.setAttribute("maxsize", r), n;
	}
});
function s_(e) {
	if (!e.body) throw Error("Bug: The leftright ParseNode wasn't fully parsed.");
}
X({
	type: "leftright-right",
	names: ["\\right"],
	props: {
		numArgs: 1,
		primitive: !0
	},
	handler: (e, t) => {
		var n = e.parser.gullet.macros.get("\\current@color");
		if (n && typeof n != "string") throw new I("\\current@color set to non-string in \\right");
		return {
			type: "leftright-right",
			mode: e.parser.mode,
			delim: o_(t[0], e).text,
			color: n
		};
	}
}), X({
	type: "leftright",
	names: ["\\left"],
	props: {
		numArgs: 1,
		primitive: !0
	},
	handler: (e, t) => {
		var n = o_(t[0], e), r = e.parser;
		++r.leftrightDepth;
		var i = r.parseExpression(!1);
		--r.leftrightDepth, r.expect("\\right", !1);
		var a = Q(r.parseFunction(), "leftright-right");
		return {
			type: "leftright",
			mode: r.mode,
			body: i,
			left: n.text,
			right: a.delim,
			rightColor: a.color
		};
	},
	htmlBuilder: (e, t) => {
		s_(e);
		for (var n = bh(e.body, t, !0, ["mopen", "mclose"]), r = 0, i = 0, a = !1, o = 0; o < n.length; o++) {
			var s = n[o];
			a_(s) ? a = !0 : (r = Math.max(n[o].height, r), i = Math.max(n[o].depth, i));
		}
		r *= t.sizeMultiplier, i *= t.sizeMultiplier;
		var c = e.left === "." ? Th(t, ["mopen"]) : n_(e.left, r, i, t, e.mode, ["mopen"]);
		if (n.unshift(c), a) for (var l = 1; l < n.length; l++) {
			var u = n[l];
			if (a_(u)) {
				var d = u.isMiddle;
				n[l] = n_(d.delim, r, i, d.options, e.mode, []);
			}
		}
		var f;
		if (e.right === ".") f = Th(t, ["mclose"]);
		else {
			var p = e.rightColor ? t.withColor(e.rightColor) : t;
			f = n_(e.right, r, i, p, e.mode, ["mclose"]);
		}
		return n.push(f), Y(["minner"], n, t);
	},
	mathmlBuilder: (e, t) => {
		s_(e);
		var n = zh(e.body, t);
		if (e.left !== ".") {
			var r = new Z("mo", [Ph(e.left, e.mode)]);
			r.setAttribute("fence", "true"), n.unshift(r);
		}
		if (e.right !== ".") {
			var i = new Z("mo", [Ph(e.right, e.mode)]);
			i.setAttribute("fence", "true"), e.rightColor && i.setAttribute("mathcolor", e.rightColor), n.push(i);
		}
		return Fh(n);
	}
}), X({
	type: "middle",
	names: ["\\middle"],
	props: {
		numArgs: 1,
		primitive: !0
	},
	handler: (e, t) => {
		var n = o_(t[0], e);
		if (!e.parser.leftrightDepth) throw new I("\\middle without preceding \\left", n);
		return {
			type: "middle",
			mode: e.parser.mode,
			delim: n.text
		};
	},
	htmlBuilder: (e, t) => {
		var n;
		return e.delim === "." ? n = Th(t, []) : (n = Yg(e.delim, 1, t, e.mode, []), n.isMiddle = {
			delim: e.delim,
			options: t
		}), n;
	},
	mathmlBuilder: (e, t) => {
		var n = new Z("mo", [e.delim === "\\vert" || e.delim === "|" ? Ph("|", "text") : Ph(e.delim, e.mode)]);
		return n.setAttribute("fence", "true"), n.setAttribute("lspace", "0.05em"), n.setAttribute("rspace", "0.05em"), n;
	}
});
var c_ = (e, t) => {
	var n = Zm(Eh(e.body, t), t), r = e.label.slice(1), i = t.sizeMultiplier, a, o, s = Lf(e.body);
	if (r === "sout") a = Y(["stretchy", "sout"]), a.height = t.fontMetrics().defaultRuleThickness / i, o = -.5 * t.fontMetrics().xHeight;
	else if (r === "phase") {
		var c = Op({
			number: .6,
			unit: "pt"
		}, t), l = Op({
			number: .35,
			unit: "ex"
		}, t), u = t.havingBaseSizing();
		i /= u.sizeMultiplier;
		var d = n.height + n.depth + c + l;
		n.style.paddingLeft = R(d / 2 + c);
		var f = Math.floor(1e3 * d * i);
		a = qm(["hide-tail"], [new Bp([new Vp("phase", _p(f))], {
			width: "400em",
			height: R(f / 1e3),
			viewBox: "0 0 400000 " + f,
			preserveAspectRatio: "xMinYMin slice"
		})], t), a.style.height = R(d), o = n.depth + c + l;
	} else {
		/cancel/.test(r) ? s || n.classes.push("cancel-pad") : r === "angl" ? n.classes.push("anglpad") : n.classes.push("boxpad");
		var p, m, h = 0;
		/box/.test(r) ? (h = Math.max(t.fontMetrics().fboxrule, t.minRuleThickness), p = t.fontMetrics().fboxsep + (r === "colorbox" ? 0 : h), m = p) : r === "angl" ? (h = Math.max(t.fontMetrics().defaultRuleThickness, t.minRuleThickness), p = 4 * h, m = Math.max(0, .25 - n.depth)) : (p = s ? .2 : 0, m = p), a = ng(n, r, p, m, t), /fbox|boxed|fcolorbox/.test(r) ? (a.style.borderStyle = "solid", a.style.borderWidth = R(h)) : r === "angl" && h !== .049 && (a.style.borderTopWidth = R(h), a.style.borderRightWidth = R(h)), o = n.depth + m, e.backgroundColor && (a.style.backgroundColor = e.backgroundColor, e.borderColor && (a.style.borderColor = e.borderColor));
	}
	var g;
	if (e.backgroundColor) g = $m({
		positionType: "individualShift",
		children: [{
			type: "elem",
			elem: a,
			shift: o
		}, {
			type: "elem",
			elem: n,
			shift: 0
		}]
	});
	else {
		var _ = /cancel|phase/.test(r) ? ["svg-align"] : [];
		g = $m({
			positionType: "individualShift",
			children: [{
				type: "elem",
				elem: n,
				shift: 0
			}, {
				type: "elem",
				elem: a,
				shift: o,
				wrapperClasses: _
			}]
		});
	}
	return /cancel/.test(r) && (g.height = n.height, g.depth = n.depth), /cancel/.test(r) && !s ? Y(["mord", "cancel-lap"], [g], t) : Y(["mord"], [g], t);
}, l_ = (e, t) => {
	var n, r = new Z(e.label.includes("colorbox") ? "mpadded" : "menclose", [Vh(e.body, t)]);
	switch (e.label) {
		case "\\cancel":
			r.setAttribute("notation", "updiagonalstrike");
			break;
		case "\\bcancel":
			r.setAttribute("notation", "downdiagonalstrike");
			break;
		case "\\phase":
			r.setAttribute("notation", "phasorangle");
			break;
		case "\\sout":
			r.setAttribute("notation", "horizontalstrike");
			break;
		case "\\fbox":
			r.setAttribute("notation", "box");
			break;
		case "\\angl":
			r.setAttribute("notation", "actuarial");
			break;
		case "\\fcolorbox":
		case "\\colorbox":
			if (n = t.fontMetrics().fboxsep * t.fontMetrics().ptPerEm, r.setAttribute("width", "+" + 2 * n + "pt"), r.setAttribute("height", "+" + 2 * n + "pt"), r.setAttribute("lspace", n + "pt"), r.setAttribute("voffset", n + "pt"), e.label === "\\fcolorbox") {
				var i = Math.max(t.fontMetrics().fboxrule, t.minRuleThickness);
				r.setAttribute("style", "border: " + R(i) + " solid " + e.borderColor);
			}
			break;
		case "\\xcancel": r.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
	}
	return e.backgroundColor && r.setAttribute("mathbackground", e.backgroundColor), r;
};
X({
	type: "enclose",
	names: ["\\colorbox"],
	props: {
		numArgs: 2,
		allowedInText: !0,
		argTypes: ["color", "hbox"]
	},
	handler(e, t, n) {
		var { parser: r, funcName: i } = e, a = Q(t[0], "color-token").color, o = t[1];
		return {
			type: "enclose",
			mode: r.mode,
			label: i,
			backgroundColor: a,
			body: o
		};
	},
	htmlBuilder: c_,
	mathmlBuilder: l_
}), X({
	type: "enclose",
	names: ["\\fcolorbox"],
	props: {
		numArgs: 3,
		allowedInText: !0,
		argTypes: [
			"color",
			"color",
			"hbox"
		]
	},
	handler(e, t, n) {
		var { parser: r, funcName: i } = e, a = Q(t[0], "color-token").color, o = Q(t[1], "color-token").color, s = t[2];
		return {
			type: "enclose",
			mode: r.mode,
			label: i,
			backgroundColor: o,
			borderColor: a,
			body: s
		};
	},
	htmlBuilder: c_,
	mathmlBuilder: l_
}), X({
	type: "enclose",
	names: ["\\fbox"],
	props: {
		numArgs: 1,
		argTypes: ["hbox"],
		allowedInText: !0
	},
	handler(e, t) {
		var { parser: n } = e;
		return {
			type: "enclose",
			mode: n.mode,
			label: "\\fbox",
			body: t[0]
		};
	}
}), X({
	type: "enclose",
	names: [
		"\\cancel",
		"\\bcancel",
		"\\xcancel",
		"\\phase"
	],
	props: { numArgs: 1 },
	handler(e, t) {
		var { parser: n, funcName: r } = e, i = t[0];
		return {
			type: "enclose",
			mode: n.mode,
			label: r,
			body: i
		};
	},
	htmlBuilder: c_,
	mathmlBuilder: l_
}), X({
	type: "enclose",
	names: ["\\sout"],
	props: {
		numArgs: 1,
		allowedInText: !0
	},
	handler(e, t) {
		var { parser: n, funcName: r } = e;
		n.mode === "math" && n.settings.reportNonstrict("mathVsSout", "LaTeX's \\sout works only in text mode");
		var i = t[0];
		return {
			type: "enclose",
			mode: n.mode,
			label: r,
			body: i
		};
	},
	htmlBuilder: c_,
	mathmlBuilder: l_
}), X({
	type: "enclose",
	names: ["\\angl"],
	props: {
		numArgs: 1,
		argTypes: ["hbox"],
		allowedInText: !1
	},
	handler(e, t) {
		var { parser: n } = e;
		return {
			type: "enclose",
			mode: n.mode,
			label: "\\angl",
			body: t[0]
		};
	}
});
var u_ = {};
function d_(e) {
	for (var { type: t, names: n, props: r, handler: i, htmlBuilder: a, mathmlBuilder: o } = e, s = {
		type: t,
		numArgs: r.numArgs || 0,
		allowedInText: !1,
		numOptionalArgs: 0,
		handler: i
	}, c = 0; c < n.length; ++c) u_[n[c]] = s;
	a && (dh[t] = a), o && (fh[t] = o);
}
var f_ = {};
function $(e, t) {
	f_[e] = t;
}
var p_ = class e {
	constructor(e, t, n) {
		this.lexer = void 0, this.start = void 0, this.end = void 0, this.lexer = e, this.start = t, this.end = n;
	}
	static range(t, n) {
		return n ? !t || !t.loc || !n.loc || t.loc.lexer !== n.loc.lexer ? null : new e(t.loc.lexer, t.loc.start, n.loc.end) : t && t.loc;
	}
}, m_ = class e {
	constructor(e, t) {
		this.text = void 0, this.loc = void 0, this.noexpand = void 0, this.treatAsRelax = void 0, this.text = e, this.loc = t;
	}
	range(t, n) {
		return new e(n, p_.range(this, t));
	}
};
function h_(e) {
	var t = [];
	e.consumeSpaces();
	var n = e.fetch().text;
	for (n === "\\relax" && (e.consume(), e.consumeSpaces(), n = e.fetch().text); n === "\\hline" || n === "\\hdashline";) e.consume(), t.push(n === "\\hdashline"), e.consumeSpaces(), n = e.fetch().text;
	return t;
}
var g_ = (e) => {
	if (!e.parser.settings.displayMode) throw new I("{" + e.envName + "} can be used only in display mode.");
}, __ = /* @__PURE__ */ new Set(["gather", "gather*"]);
function v_(e) {
	if (!e.includes("ed")) return !e.includes("*");
}
function y_(e, t, n) {
	var { hskipBeforeAndAfter: r, addJot: i, cols: a, arraystretch: o, colSeparationType: s, autoTag: c, singleRow: l, emptySingleRow: u, maxNumCols: d, leqno: f } = t;
	if (e.gullet.beginGroup(), l || e.gullet.macros.set("\\cr", "\\\\\\relax"), !o) {
		var p = e.gullet.expandMacroAsText("\\arraystretch");
		if (p == null) o = 1;
		else if (o = parseFloat(p), !o || o < 0) throw new I("Invalid \\arraystretch: " + p);
	}
	e.gullet.beginGroup();
	var m = [], h = [m], g = [], _ = [], v = c == null ? void 0 : [];
	function y() {
		c && e.gullet.macros.set("\\@eqnsw", "1", !0);
	}
	function b() {
		v && (e.gullet.macros.get("\\df@tag") ? (v.push(e.subparse([new m_("\\df@tag")])), e.gullet.macros.set("\\df@tag", void 0, !0)) : v.push(!!c && e.gullet.macros.get("\\@eqnsw") === "1"));
	}
	for (y(), _.push(h_(e));;) {
		var x = e.parseExpression(!1, l ? "\\end" : "\\\\");
		e.gullet.endGroup(), e.gullet.beginGroup();
		var S = {
			type: "ordgroup",
			mode: e.mode,
			body: x
		};
		n && (S = {
			type: "styling",
			mode: e.mode,
			style: n,
			resetFont: !0,
			body: [S]
		}), m.push(S);
		var C = e.fetch().text;
		if (C === "&") {
			if (d && m.length === d) {
				if (l || s) throw new I("Too many tab characters: &", e.nextToken);
				e.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
			}
			e.consume();
		} else if (C === "\\end") {
			b(), m.length === 1 && S.type === "styling" && S.body.length === 1 && S.body[0].type === "ordgroup" && S.body[0].body.length === 0 && (h.length > 1 || !u) && h.pop(), _.length < h.length + 1 && _.push([]);
			break;
		} else if (C === "\\\\") {
			e.consume();
			var w = void 0;
			e.gullet.future().text !== " " && (w = e.parseSizeGroup(!0)), g.push(w ? w.value : null), b(), _.push(h_(e)), m = [], h.push(m), y();
		} else throw new I("Expected & or \\\\ or \\cr or \\end", e.nextToken);
	}
	return e.gullet.endGroup(), e.gullet.endGroup(), {
		type: "array",
		mode: e.mode,
		addJot: i,
		arraystretch: o,
		body: h,
		cols: a,
		rowGaps: g,
		hskipBeforeAndAfter: r,
		hLinesBeforeRow: _,
		colSeparationType: s,
		tags: v,
		leqno: f
	};
}
function b_(e) {
	return e.slice(0, 1) === "d" ? "display" : "text";
}
var x_ = function(e, t) {
	var n, r, i = e.body.length, a = e.hLinesBeforeRow, o = 0, s = Array(i), c = [], l = Math.max(t.fontMetrics().arrayRuleWidth, t.minRuleThickness), u = 1 / t.fontMetrics().ptPerEm, d = 5 * u;
	e.colSeparationType && e.colSeparationType === "small" && (d = .2778 * (t.havingStyle(L.SCRIPT).sizeMultiplier / t.sizeMultiplier));
	var f = e.colSeparationType === "CD" ? Op({
		number: 3,
		unit: "ex"
	}, t) : 12 * u, p = 3 * u, m = e.arraystretch * f, h = .7 * m, g = .3 * m, _ = 0;
	function v(e) {
		for (var t = 0; t < e.length; ++t) t > 0 && (_ += .25), c.push({
			pos: _,
			isDashed: e[t]
		});
	}
	for (v(a[0]), n = 0; n < e.body.length; ++n) {
		var y = e.body[n], b = h, x = g;
		o < y.length && (o = y.length);
		var S = {
			cells: Array(y.length),
			height: 0,
			depth: 0,
			pos: 0
		};
		for (r = 0; r < y.length; ++r) {
			var C = Eh(y[r], t);
			x < C.depth && (x = C.depth), b < C.height && (b = C.height), S.cells[r] = C;
		}
		var w = e.rowGaps[n], T = 0;
		w && (T = Op(w, t), T > 0 && (T += g, x < T && (x = T), T = 0)), e.addJot && n < e.body.length - 1 && (x += p), S.height = b, S.depth = x, _ += b, S.pos = _, _ += x + T, s[n] = S, v(a[n + 1]);
	}
	var E = _ / 2 + t.fontMetrics().axisHeight, ee = e.cols || [], D = [], te, ne, re = [];
	if (e.tags && e.tags.some((e) => e)) for (n = 0; n < i; ++n) {
		var ie = s[n], ae = ie.pos - E, O = e.tags[n], oe = void 0;
		oe = O === !0 ? Y(["eqn-num"], [], t) : O === !1 ? Y([], [], t) : Y([], bh(O, t, !0), t), oe.depth = ie.depth, oe.height = ie.height, re.push({
			type: "elem",
			elem: oe,
			shift: ae
		});
	}
	for (r = 0, ne = 0; r < o || ne < ee.length; ++r, ++ne) {
		for (var se = ee[ne], ce = !0; (le = se)?.type === "separator";) {
			var le;
			if (ce || (te = Y(["arraycolsep"], []), te.style.width = R(t.fontMetrics().doubleRuleSep), D.push(te)), se.separator === "|" || se.separator === ":") {
				var ue = se.separator === "|" ? "solid" : "dashed", de = Y(["vertical-separator"], [], t);
				de.style.height = R(_), de.style.borderRightWidth = R(l), de.style.borderRightStyle = ue, de.style.margin = "0 " + R(-l / 2);
				var fe = _ - E;
				fe && (de.style.verticalAlign = R(-fe)), D.push(de);
			} else throw new I("Invalid separator type: " + se.separator);
			ne++, se = ee[ne], ce = !1;
		}
		if (!(r >= o)) {
			var pe = void 0;
			(r > 0 || e.hskipBeforeAndAfter) && (pe = se?.pregap ?? d, pe !== 0 && (te = Y(["arraycolsep"], []), te.style.width = R(pe), D.push(te)));
			var me = [];
			for (n = 0; n < i; ++n) {
				var he = s[n], ge = he.cells[r];
				if (ge) {
					var _e = he.pos - E;
					ge.depth = he.depth, ge.height = he.height, me.push({
						type: "elem",
						elem: ge,
						shift: _e
					});
				}
			}
			var ve = $m({
				positionType: "individualShift",
				children: me
			}), ye = Y(["col-align-" + (se?.align || "c")], [ve]);
			D.push(ye), (r < o - 1 || e.hskipBeforeAndAfter) && (pe = se?.postgap ?? d, pe !== 0 && (te = Y(["arraycolsep"], []), te.style.width = R(pe), D.push(te)));
		}
	}
	var be = Y(["mtable"], D);
	if (c.length > 0) {
		for (var xe = Jm("hline", t, l), Se = Jm("hdashline", t, l), Ce = [{
			type: "elem",
			elem: be,
			shift: 0
		}]; c.length > 0;) {
			var we = c.pop(), Te = we.pos - E;
			we.isDashed ? Ce.push({
				type: "elem",
				elem: Se,
				shift: Te
			}) : Ce.push({
				type: "elem",
				elem: xe,
				shift: Te
			});
		}
		be = $m({
			positionType: "individualShift",
			children: Ce
		});
	}
	if (re.length === 0) return Y(["mord"], [be], t);
	var Ee = Y(["tag"], [$m({
		positionType: "individualShift",
		children: re
	})], t);
	return Xm([be, Ee]);
}, S_ = {
	c: "center ",
	l: "left ",
	r: "right "
}, C_ = function(e, t) {
	for (var n = [], r = new Z("mtd", [], ["mtr-glue"]), i = new Z("mtd", [], ["mml-eqn-num"]), a = 0; a < e.body.length; a++) {
		for (var o = e.body[a], s = [], c = 0; c < o.length; c++) s.push(new Z("mtd", [Vh(o[c], t)]));
		e.tags && e.tags[a] && (s.unshift(r), s.push(r), e.leqno ? s.unshift(i) : s.push(i)), n.push(new Z("mtr", s));
	}
	var l = new Z("mtable", n), u = e.arraystretch === .5 ? .1 : .16 + e.arraystretch - 1 + (e.addJot ? .09 : 0);
	l.setAttribute("rowspacing", R(u));
	var d = "", f = "";
	if (e.cols && e.cols.length > 0) {
		var p = e.cols, m = "", h = !1, g = 0, _ = p.length;
		p[0].type === "separator" && (d += "top ", g = 1), p[p.length - 1].type === "separator" && (d += "bottom ", --_);
		for (var v = g; v < _; v++) {
			var y = p[v];
			y.type === "align" ? (f += S_[y.align], h && (m += "none "), h = !0) : y.type === "separator" && (h &&= (m += y.separator === "|" ? "solid " : "dashed ", !1));
		}
		l.setAttribute("columnalign", f.trim()), /[sd]/.test(m) && l.setAttribute("columnlines", m.trim());
	}
	if (e.colSeparationType === "align") {
		for (var b = e.cols || [], x = "", S = 1; S < b.length; S++) x += S % 2 ? "0em " : "1em ";
		l.setAttribute("columnspacing", x.trim());
	} else e.colSeparationType === "alignat" || e.colSeparationType === "gather" ? l.setAttribute("columnspacing", "0em") : e.colSeparationType === "small" ? l.setAttribute("columnspacing", "0.2778em") : e.colSeparationType === "CD" ? l.setAttribute("columnspacing", "0.5em") : l.setAttribute("columnspacing", "1em");
	var C = "", w = e.hLinesBeforeRow;
	d += w[0].length > 0 ? "left " : "", d += w[w.length - 1].length > 0 ? "right " : "";
	for (var T = 1; T < w.length - 1; T++) C += w[T].length === 0 ? "none " : w[T][0] ? "dashed " : "solid ";
	return /[sd]/.test(C) && l.setAttribute("rowlines", C.trim()), d !== "" && (l = new Z("menclose", [l]), l.setAttribute("notation", d.trim())), e.arraystretch && e.arraystretch < 1 && (l = new Z("mstyle", [l]), l.setAttribute("scriptlevel", "1")), l;
}, w_ = function(e, t) {
	e.envName.includes("ed") || g_(e);
	var n = [], r = e.envName.includes("at") ? "alignat" : "align", i = e.envName === "split", a = y_(e.parser, {
		cols: n,
		addJot: !0,
		autoTag: i ? void 0 : v_(e.envName),
		emptySingleRow: !0,
		colSeparationType: r,
		maxNumCols: i ? 2 : void 0,
		leqno: e.parser.settings.leqno
	}, "display"), o = 0, s = 0, c = {
		type: "ordgroup",
		mode: e.mode,
		body: []
	};
	if (t[0] && t[0].type === "ordgroup") {
		for (var l = "", u = 0; u < t[0].body.length; u++) {
			var d = Q(t[0].body[u], "textord");
			l += d.text;
		}
		o = Number(l), s = o * 2;
	}
	var f = !s;
	a.body.forEach(function(e) {
		for (var t = 1; t < e.length; t += 2) Q(Q(e[t], "styling").body[0], "ordgroup").body.unshift(c);
		if (f) s < e.length && (s = e.length);
		else {
			var n = e.length / 2;
			if (o < n) throw new I("Too many math in a row: " + ("expected " + o + ", but got " + n), e[0]);
		}
	});
	for (var p = 0; p < s; ++p) {
		var m = "r", h = 0;
		p % 2 == 1 ? m = "l" : p > 0 && f && (h = 1), n[p] = {
			type: "align",
			align: m,
			pregap: h,
			postgap: 0
		};
	}
	return a.colSeparationType = f ? "align" : "alignat", a;
};
d_({
	type: "array",
	names: ["array", "darray"],
	props: { numArgs: 1 },
	handler(e, t) {
		var n = (sg(t[0]) ? [t[0]] : Q(t[0], "ordgroup").body).map(function(e) {
			var t = og(e).text;
			if ("lcr".includes(t)) return {
				type: "align",
				align: t
			};
			if (t === "|") return {
				type: "separator",
				separator: "|"
			};
			if (t === ":") return {
				type: "separator",
				separator: ":"
			};
			throw new I("Unknown column alignment: " + t, e);
		}), r = {
			cols: n,
			hskipBeforeAndAfter: !0,
			maxNumCols: n.length
		};
		return y_(e.parser, r, b_(e.envName));
	},
	htmlBuilder: x_,
	mathmlBuilder: C_
}), d_({
	type: "array",
	names: [
		"matrix",
		"pmatrix",
		"bmatrix",
		"Bmatrix",
		"vmatrix",
		"Vmatrix",
		"matrix*",
		"pmatrix*",
		"bmatrix*",
		"Bmatrix*",
		"vmatrix*",
		"Vmatrix*"
	],
	props: { numArgs: 0 },
	handler(e) {
		var t = {
			matrix: null,
			pmatrix: ["(", ")"],
			bmatrix: ["[", "]"],
			Bmatrix: ["\\{", "\\}"],
			vmatrix: ["|", "|"],
			Vmatrix: ["\\Vert", "\\Vert"]
		}[e.envName.replace("*", "")], n = "c", r = {
			hskipBeforeAndAfter: !1,
			cols: [{
				type: "align",
				align: n
			}]
		};
		if (e.envName.charAt(e.envName.length - 1) === "*") {
			var i = e.parser;
			if (i.consumeSpaces(), i.fetch().text === "[") {
				if (i.consume(), i.consumeSpaces(), n = i.fetch().text, !"lcr".includes(n)) throw new I("Expected l or c or r", i.nextToken);
				i.consume(), i.consumeSpaces(), i.expect("]"), i.consume(), r.cols = [{
					type: "align",
					align: n
				}];
			}
		}
		var a = y_(e.parser, r, b_(e.envName)), o = Math.max(0, ...a.body.map((e) => e.length));
		return a.cols = Array(o).fill({
			type: "align",
			align: n
		}), t ? {
			type: "leftright",
			mode: e.mode,
			body: [a],
			left: t[0],
			right: t[1],
			rightColor: void 0
		} : a;
	},
	htmlBuilder: x_,
	mathmlBuilder: C_
}), d_({
	type: "array",
	names: ["smallmatrix"],
	props: { numArgs: 0 },
	handler(e) {
		var t = y_(e.parser, { arraystretch: .5 }, "script");
		return t.colSeparationType = "small", t;
	},
	htmlBuilder: x_,
	mathmlBuilder: C_
}), d_({
	type: "array",
	names: ["subarray"],
	props: { numArgs: 1 },
	handler(e, t) {
		var n = (sg(t[0]) ? [t[0]] : Q(t[0], "ordgroup").body).map(function(e) {
			var t = og(e).text;
			if ("lc".includes(t)) return {
				type: "align",
				align: t
			};
			throw new I("Unknown column alignment: " + t, e);
		});
		if (n.length > 1) throw new I("{subarray} can contain only one column");
		var r = {
			cols: n,
			hskipBeforeAndAfter: !1,
			arraystretch: .5
		}, i = y_(e.parser, r, "script");
		if (i.body.length > 0 && i.body[0].length > 1) throw new I("{subarray} can contain only one column");
		return i;
	},
	htmlBuilder: x_,
	mathmlBuilder: C_
}), d_({
	type: "array",
	names: [
		"cases",
		"dcases",
		"rcases",
		"drcases"
	],
	props: { numArgs: 0 },
	handler(e) {
		var t = y_(e.parser, {
			arraystretch: 1.2,
			cols: [{
				type: "align",
				align: "l",
				pregap: 0,
				postgap: 1
			}, {
				type: "align",
				align: "l",
				pregap: 0,
				postgap: 0
			}]
		}, b_(e.envName));
		return {
			type: "leftright",
			mode: e.mode,
			body: [t],
			left: e.envName.includes("r") ? "." : "\\{",
			right: e.envName.includes("r") ? "\\}" : ".",
			rightColor: void 0
		};
	},
	htmlBuilder: x_,
	mathmlBuilder: C_
}), d_({
	type: "array",
	names: [
		"align",
		"align*",
		"aligned",
		"split"
	],
	props: { numArgs: 0 },
	handler: w_,
	htmlBuilder: x_,
	mathmlBuilder: C_
}), d_({
	type: "array",
	names: [
		"gathered",
		"gather",
		"gather*"
	],
	props: { numArgs: 0 },
	handler(e) {
		__.has(e.envName) && g_(e);
		var t = {
			cols: [{
				type: "align",
				align: "c"
			}],
			addJot: !0,
			colSeparationType: "gather",
			autoTag: v_(e.envName),
			emptySingleRow: !0,
			leqno: e.parser.settings.leqno
		};
		return y_(e.parser, t, "display");
	},
	htmlBuilder: x_,
	mathmlBuilder: C_
}), d_({
	type: "array",
	names: [
		"alignat",
		"alignat*",
		"alignedat"
	],
	props: { numArgs: 1 },
	handler: w_,
	htmlBuilder: x_,
	mathmlBuilder: C_
}), d_({
	type: "array",
	names: ["equation", "equation*"],
	props: { numArgs: 0 },
	handler(e) {
		g_(e);
		var t = {
			autoTag: v_(e.envName),
			emptySingleRow: !0,
			singleRow: !0,
			maxNumCols: 1,
			leqno: e.parser.settings.leqno
		};
		return y_(e.parser, t, "display");
	},
	htmlBuilder: x_,
	mathmlBuilder: C_
}), d_({
	type: "array",
	names: ["CD"],
	props: { numArgs: 0 },
	handler(e) {
		return g_(e), xg(e.parser);
	},
	htmlBuilder: x_,
	mathmlBuilder: C_
}), $("\\nonumber", "\\gdef\\@eqnsw{0}"), $("\\notag", "\\nonumber"), X({
	type: "text",
	names: ["\\hline", "\\hdashline"],
	props: {
		numArgs: 0,
		allowedInText: !0,
		allowedInMath: !0
	},
	handler(e, t) {
		throw new I(e.funcName + " valid only within array environment");
	}
});
var T_ = u_;
X({
	type: "environment",
	names: ["\\begin", "\\end"],
	props: {
		numArgs: 1,
		argTypes: ["text"]
	},
	handler(e, t) {
		var { parser: n, funcName: r } = e, i = t[0];
		if (i.type !== "ordgroup") throw new I("Invalid environment name", i);
		for (var a = "", o = 0; o < i.body.length; ++o) a += Q(i.body[o], "textord").text;
		if (r === "\\begin") {
			if (!T_.hasOwnProperty(a)) throw new I("No such environment: " + a, i);
			var s = T_[a], { args: c, optArgs: l } = n.parseArguments("\\begin{" + a + "}", s), u = {
				mode: n.mode,
				envName: a,
				parser: n
			}, d = s.handler(u, c, l);
			n.expect("\\end", !1);
			var f = n.nextToken, p = Q(n.parseFunction(), "environment");
			if (p.name !== a) throw new I("Mismatch: \\begin{" + a + "} matched by \\end{" + p.name + "}", f);
			return d;
		}
		return {
			type: "environment",
			mode: n.mode,
			name: a,
			nameGroup: i
		};
	}
});
var E_ = (e, t) => {
	var n = e.font, r = t.withFont(n);
	return Eh(e.body, r);
}, D_ = (e, t) => {
	var n = e.font, r = t.withFont(n);
	return Vh(e.body, r);
}, O_ = {
	"\\Bbb": "\\mathbb",
	"\\bold": "\\mathbf",
	"\\frak": "\\mathfrak"
};
X({
	type: "font",
	names: [
		"\\mathrm",
		"\\mathit",
		"\\mathbf",
		"\\mathnormal",
		"\\mathsfit",
		"\\mathbb",
		"\\mathcal",
		"\\mathfrak",
		"\\mathscr",
		"\\mathsf",
		"\\mathtt",
		"\\Bbb",
		"\\bold",
		"\\frak"
	],
	props: {
		numArgs: 1,
		allowedInArgument: !0
	},
	handler: (e, t) => {
		var { parser: n, funcName: r } = e, i = mh(t[0]), a = r;
		return a in O_ && (a = O_[a]), {
			type: "font",
			mode: n.mode,
			font: a.slice(1),
			body: i
		};
	},
	htmlBuilder: E_,
	mathmlBuilder: D_
}), X({
	type: "mclass",
	names: ["\\boldsymbol", "\\bm"],
	props: { numArgs: 1 },
	handler: (e, t) => {
		var { parser: n } = e, r = t[0];
		return {
			type: "mclass",
			mode: n.mode,
			mclass: hg(r),
			body: [{
				type: "font",
				mode: n.mode,
				font: "boldsymbol",
				body: r
			}],
			isCharacterBox: Lf(r)
		};
	}
}), X({
	type: "font",
	names: [
		"\\rm",
		"\\sf",
		"\\tt",
		"\\bf",
		"\\it",
		"\\cal"
	],
	props: {
		numArgs: 0,
		allowedInText: !0
	},
	handler: (e, t) => {
		var { parser: n, funcName: r, breakOnTokenText: i } = e, { mode: a } = n, o = n.parseExpression(!0, i);
		return {
			type: "font",
			mode: a,
			font: "math" + r.slice(1),
			body: {
				type: "ordgroup",
				mode: n.mode,
				body: o
			}
		};
	},
	htmlBuilder: E_,
	mathmlBuilder: D_
});
var k_ = (e, t) => {
	var n = t.style, r = n.fracNum(), i = n.fracDen(), a = t.havingStyle(r), o = Eh(e.numer, a, t);
	if (e.continued) {
		var s = 8.5 / t.fontMetrics().ptPerEm, c = 3.5 / t.fontMetrics().ptPerEm;
		o.height = o.height < s ? s : o.height, o.depth = o.depth < c ? c : o.depth;
	}
	a = t.havingStyle(i);
	var l = Eh(e.denom, a, t), u, d, f;
	e.hasBarLine ? (e.barSize ? (d = Op(e.barSize, t), u = Jm("frac-line", t, d)) : u = Jm("frac-line", t), d = u.height, f = u.height) : (u = null, d = 0, f = t.fontMetrics().defaultRuleThickness);
	var p, m, h;
	n.size === L.DISPLAY.size ? (p = t.fontMetrics().num1, m = d > 0 ? 3 * f : 7 * f, h = t.fontMetrics().denom1) : (d > 0 ? (p = t.fontMetrics().num2, m = f) : (p = t.fontMetrics().num3, m = 3 * f), h = t.fontMetrics().denom2);
	var g;
	if (u) {
		var _ = t.fontMetrics().axisHeight;
		p - o.depth - (_ + .5 * d) < m && (p += m - (p - o.depth - (_ + .5 * d))), _ - .5 * d - (l.height - h) < m && (h += m - (_ - .5 * d - (l.height - h)));
		var v = -(_ - .5 * d);
		g = $m({
			positionType: "individualShift",
			children: [
				{
					type: "elem",
					elem: l,
					shift: h
				},
				{
					type: "elem",
					elem: u,
					shift: v
				},
				{
					type: "elem",
					elem: o,
					shift: -p
				}
			]
		});
	} else {
		var y = p - o.depth - (l.height - h);
		y < m && (p += .5 * (m - y), h += .5 * (m - y)), g = $m({
			positionType: "individualShift",
			children: [{
				type: "elem",
				elem: l,
				shift: h
			}, {
				type: "elem",
				elem: o,
				shift: -p
			}]
		});
	}
	a = t.havingStyle(n), g.height *= a.sizeMultiplier / t.sizeMultiplier, g.depth *= a.sizeMultiplier / t.sizeMultiplier;
	var b = n.size === L.DISPLAY.size ? t.fontMetrics().delim1 : n.size === L.SCRIPTSCRIPT.size ? t.havingStyle(L.SCRIPT).fontMetrics().delim2 : t.fontMetrics().delim2, x = e.leftDelim == null ? Th(t, ["mopen"]) : t_(e.leftDelim, b, !0, t.havingStyle(n), e.mode, ["mopen"]), S = e.continued ? Y([]) : e.rightDelim == null ? Th(t, ["mclose"]) : t_(e.rightDelim, b, !0, t.havingStyle(n), e.mode, ["mclose"]);
	return Y(["mord"].concat(a.sizingClasses(t)), [
		x,
		Y(["mfrac"], [g]),
		S
	], t);
}, A_ = (e, t) => {
	var n = new Z("mfrac", [Vh(e.numer, t), Vh(e.denom, t)]);
	if (!e.hasBarLine) n.setAttribute("linethickness", "0px");
	else if (e.barSize) {
		var r = Op(e.barSize, t);
		n.setAttribute("linethickness", R(r));
	}
	if (e.leftDelim != null || e.rightDelim != null) {
		var i = [];
		if (e.leftDelim != null) {
			var a = new Z("mo", [new Ah(e.leftDelim.replace("\\", ""))]);
			a.setAttribute("fence", "true"), i.push(a);
		}
		if (i.push(n), e.rightDelim != null) {
			var o = new Z("mo", [new Ah(e.rightDelim.replace("\\", ""))]);
			o.setAttribute("fence", "true"), i.push(o);
		}
		return Fh(i);
	}
	return n;
}, j_ = (e, t) => t ? {
	type: "styling",
	mode: e.mode,
	style: t,
	body: [e]
} : e;
X({
	type: "genfrac",
	names: [
		"\\cfrac",
		"\\dfrac",
		"\\frac",
		"\\tfrac",
		"\\dbinom",
		"\\binom",
		"\\tbinom",
		"\\\\atopfrac",
		"\\\\bracefrac",
		"\\\\brackfrac"
	],
	props: {
		numArgs: 2,
		allowedInArgument: !0
	},
	handler: (e, t) => {
		var { parser: n, funcName: r } = e, i = t[0], a = t[1], o, s = null, c = null;
		switch (r) {
			case "\\cfrac":
			case "\\dfrac":
			case "\\frac":
			case "\\tfrac":
				o = !0;
				break;
			case "\\\\atopfrac":
				o = !1;
				break;
			case "\\dbinom":
			case "\\binom":
			case "\\tbinom":
				o = !1, s = "(", c = ")";
				break;
			case "\\\\bracefrac":
				o = !1, s = "\\{", c = "\\}";
				break;
			case "\\\\brackfrac":
				o = !1, s = "[", c = "]";
				break;
			default: throw Error("Unrecognized genfrac command");
		}
		var l = r === "\\cfrac", u = null;
		return l || r.startsWith("\\d") ? u = "display" : r.startsWith("\\t") && (u = "text"), j_({
			type: "genfrac",
			mode: n.mode,
			numer: i,
			denom: a,
			continued: l,
			hasBarLine: o,
			leftDelim: s,
			rightDelim: c,
			barSize: null
		}, u);
	},
	htmlBuilder: k_,
	mathmlBuilder: A_
}), X({
	type: "infix",
	names: [
		"\\over",
		"\\choose",
		"\\atop",
		"\\brace",
		"\\brack"
	],
	props: {
		numArgs: 0,
		infix: !0
	},
	handler(e) {
		var { parser: t, funcName: n, token: r } = e, i;
		switch (n) {
			case "\\over":
				i = "\\frac";
				break;
			case "\\choose":
				i = "\\binom";
				break;
			case "\\atop":
				i = "\\\\atopfrac";
				break;
			case "\\brace":
				i = "\\\\bracefrac";
				break;
			case "\\brack":
				i = "\\\\brackfrac";
				break;
			default: throw Error("Unrecognized infix genfrac command");
		}
		return {
			type: "infix",
			mode: t.mode,
			replaceWith: i,
			token: r
		};
	}
});
var M_ = [
	"display",
	"text",
	"script",
	"scriptscript"
], N_ = function(e) {
	var t = null;
	return e.length > 0 && (t = e, t = t === "." ? null : t), t;
};
X({
	type: "genfrac",
	names: ["\\genfrac"],
	props: {
		numArgs: 6,
		allowedInArgument: !0,
		argTypes: [
			"math",
			"math",
			"size",
			"text",
			"math",
			"math"
		]
	},
	handler(e, t) {
		var { parser: n } = e, r = t[4], i = t[5], a = mh(t[0]), o = a.type === "atom" && a.family === "open" ? N_(a.text) : null, s = mh(t[1]), c = s.type === "atom" && s.family === "close" ? N_(s.text) : null, l = Q(t[2], "size"), u, d = null;
		l.isBlank ? u = !0 : (d = l.value, u = d.number > 0);
		var f = null, p = t[3];
		if (p.type === "ordgroup") {
			if (p.body.length > 0) {
				var m = Q(p.body[0], "textord");
				f = M_[Number(m.text)];
			}
		} else p = Q(p, "textord"), f = M_[Number(p.text)];
		return j_({
			type: "genfrac",
			mode: n.mode,
			numer: r,
			denom: i,
			continued: !1,
			hasBarLine: u,
			barSize: d,
			leftDelim: o,
			rightDelim: c
		}, f);
	}
}), X({
	type: "infix",
	names: ["\\above"],
	props: {
		numArgs: 1,
		argTypes: ["size"],
		infix: !0
	},
	handler(e, t) {
		var { parser: n, funcName: r, token: i } = e;
		return {
			type: "infix",
			mode: n.mode,
			replaceWith: "\\\\abovefrac",
			size: Q(t[0], "size").value,
			token: i
		};
	}
}), X({
	type: "genfrac",
	names: ["\\\\abovefrac"],
	props: {
		numArgs: 3,
		argTypes: [
			"math",
			"size",
			"math"
		]
	},
	handler: (e, t) => {
		var { parser: n, funcName: r } = e, i = t[0], a = Q(t[1], "infix").size;
		if (!a) throw Error("\\\\abovefrac expected size, but got " + String(a));
		var o = t[2], s = a.number > 0;
		return {
			type: "genfrac",
			mode: n.mode,
			numer: i,
			denom: o,
			continued: !1,
			hasBarLine: s,
			barSize: a,
			leftDelim: null,
			rightDelim: null
		};
	}
});
var P_ = (e, t) => {
	var n = t.style, r, i;
	e.type === "supsub" ? (r = e.sup ? Eh(e.sup, t.havingStyle(n.sup()), t) : Eh(e.sub, t.havingStyle(n.sub()), t), i = Q(e.base, "horizBrace")) : i = Q(e, "horizBrace");
	var a = Eh(i.base, t.havingBaseStyle(L.DISPLAY)), o = tg(i, t), s = i.isOver ? $m({
		positionType: "firstBaseline",
		children: [
			{
				type: "elem",
				elem: a
			},
			{
				type: "kern",
				size: .1
			},
			{
				type: "elem",
				elem: o,
				wrapperClasses: ["svg-align"]
			}
		]
	}) : $m({
		positionType: "bottom",
		positionData: a.depth + .1 + o.height,
		children: [
			{
				type: "elem",
				elem: o,
				wrapperClasses: ["svg-align"]
			},
			{
				type: "kern",
				size: .1
			},
			{
				type: "elem",
				elem: a
			}
		]
	});
	if (r) {
		var c = Y(["minner", i.isOver ? "mover" : "munder"], [s], t);
		s = i.isOver ? $m({
			positionType: "firstBaseline",
			children: [
				{
					type: "elem",
					elem: c
				},
				{
					type: "kern",
					size: .2
				},
				{
					type: "elem",
					elem: r
				}
			]
		}) : $m({
			positionType: "bottom",
			positionData: c.depth + .2 + r.height + r.depth,
			children: [
				{
					type: "elem",
					elem: r
				},
				{
					type: "kern",
					size: .2
				},
				{
					type: "elem",
					elem: c
				}
			]
		});
	}
	return Y(["minner", i.isOver ? "mover" : "munder"], [s], t);
};
X({
	type: "horizBrace",
	names: [
		"\\overbrace",
		"\\underbrace",
		"\\overbracket",
		"\\underbracket"
	],
	props: { numArgs: 1 },
	handler(e, t) {
		var { parser: n, funcName: r } = e;
		return {
			type: "horizBrace",
			mode: n.mode,
			label: r,
			isOver: r.includes("\\over"),
			base: t[0]
		};
	},
	htmlBuilder: P_,
	mathmlBuilder: (e, t) => {
		var n = Qh(e.label);
		return new Z(e.isOver ? "mover" : "munder", [Vh(e.base, t), n]);
	}
}), X({
	type: "href",
	names: ["\\href"],
	props: {
		numArgs: 2,
		argTypes: ["url", "original"],
		allowedInText: !0
	},
	handler: (e, t) => {
		var { parser: n } = e, r = t[1], i = Q(t[0], "url").url;
		return n.settings.isTrusted({
			command: "\\href",
			url: i
		}) ? {
			type: "href",
			mode: n.mode,
			href: i,
			body: hh(r)
		} : n.formatUnsupportedCmd("\\href");
	},
	htmlBuilder: (e, t) => {
		var n = bh(e.body, t, !1);
		return Ym(e.href, [], n, t);
	},
	mathmlBuilder: (e, t) => {
		var n = Bh(e.body, t);
		return n instanceof Z || (n = new Z("mrow", [n])), n.setAttribute("href", e.href), n;
	}
}), X({
	type: "href",
	names: ["\\url"],
	props: {
		numArgs: 1,
		argTypes: ["url"],
		allowedInText: !0
	},
	handler: (e, t) => {
		var { parser: n } = e, r = Q(t[0], "url").url;
		if (!n.settings.isTrusted({
			command: "\\url",
			url: r
		})) return n.formatUnsupportedCmd("\\url");
		for (var i = [], a = 0; a < r.length; a++) {
			var o = r[a];
			o === "~" && (o = "\\textasciitilde"), i.push({
				type: "textord",
				mode: "text",
				text: o
			});
		}
		var s = {
			type: "text",
			mode: n.mode,
			font: "\\texttt",
			body: i
		};
		return {
			type: "href",
			mode: n.mode,
			href: r,
			body: hh(s)
		};
	}
}), X({
	type: "hbox",
	names: ["\\hbox"],
	props: {
		numArgs: 1,
		argTypes: ["text"],
		allowedInText: !0,
		primitive: !0
	},
	handler(e, t) {
		var { parser: n } = e;
		return {
			type: "hbox",
			mode: n.mode,
			body: hh(t[0])
		};
	},
	htmlBuilder(e, t) {
		return Xm(bh(e.body, t.withFont(""), !1));
	},
	mathmlBuilder(e, t) {
		return new Z("mrow", zh(e.body, t.withFont("")));
	}
}), X({
	type: "html",
	names: [
		"\\htmlClass",
		"\\htmlId",
		"\\htmlStyle",
		"\\htmlData"
	],
	props: {
		numArgs: 2,
		argTypes: ["raw", "original"],
		allowedInText: !0
	},
	handler: (e, t) => {
		var { parser: n, funcName: r, token: i } = e, a = Q(t[0], "raw").string, o = t[1];
		n.settings.strict && n.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
		var s, c = {};
		switch (r) {
			case "\\htmlClass":
				c.class = a, s = {
					command: "\\htmlClass",
					class: a
				};
				break;
			case "\\htmlId":
				c.id = a, s = {
					command: "\\htmlId",
					id: a
				};
				break;
			case "\\htmlStyle":
				c.style = a, s = {
					command: "\\htmlStyle",
					style: a
				};
				break;
			case "\\htmlData":
				for (var l = a.split(","), u = 0; u < l.length; u++) {
					var d = l[u], f = d.indexOf("=");
					if (f < 0) throw new I("\\htmlData key/value '" + d + "' missing equals sign");
					var p = d.slice(0, f), m = d.slice(f + 1);
					c["data-" + p.trim()] = m;
				}
				s = {
					command: "\\htmlData",
					attributes: c
				};
				break;
			default: throw Error("Unrecognized html command");
		}
		return n.settings.isTrusted(s) ? {
			type: "html",
			mode: n.mode,
			attributes: c,
			body: hh(o)
		} : n.formatUnsupportedCmd(r);
	},
	htmlBuilder: (e, t) => {
		var n = bh(e.body, t, !1), r = ["enclosing"];
		e.attributes.class && r.push(...e.attributes.class.trim().split(/\s+/));
		var i = Y(r, n, t);
		for (var a in e.attributes) a !== "class" && e.attributes.hasOwnProperty(a) && i.setAttribute(a, e.attributes[a]);
		return i;
	},
	mathmlBuilder: (e, t) => Bh(e.body, t)
}), X({
	type: "htmlmathml",
	names: ["\\html@mathml"],
	props: {
		numArgs: 2,
		allowedInArgument: !0,
		allowedInText: !0
	},
	handler: (e, t) => {
		var { parser: n } = e;
		return {
			type: "htmlmathml",
			mode: n.mode,
			html: hh(t[0]),
			mathml: hh(t[1])
		};
	},
	htmlBuilder: (e, t) => Xm(bh(e.html, t, !1)),
	mathmlBuilder: (e, t) => Bh(e.mathml, t)
});
var F_ = function(e) {
	if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(e)) return {
		number: +e,
		unit: "bp"
	};
	var t = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(e);
	if (!t) throw new I("Invalid size: '" + e + "' in \\includegraphics");
	var n = {
		number: +(t[1] + t[2]),
		unit: t[3]
	};
	if (!Dp(n)) throw new I("Invalid unit: '" + n.unit + "' in \\includegraphics.");
	return n;
};
X({
	type: "includegraphics",
	names: ["\\includegraphics"],
	props: {
		numArgs: 1,
		numOptionalArgs: 1,
		argTypes: ["raw", "url"],
		allowedInText: !1
	},
	handler: (e, t, n) => {
		var { parser: r } = e, i = {
			number: 0,
			unit: "em"
		}, a = {
			number: .9,
			unit: "em"
		}, o = {
			number: 0,
			unit: "em"
		}, s = "";
		if (n[0]) for (var c = Q(n[0], "raw").string.split(","), l = 0; l < c.length; l++) {
			var u = c[l].split("=");
			if (u.length === 2) {
				var d = u[1].trim();
				switch (u[0].trim()) {
					case "alt":
						s = d;
						break;
					case "width":
						i = F_(d);
						break;
					case "height":
						a = F_(d);
						break;
					case "totalheight":
						o = F_(d);
						break;
					default: throw new I("Invalid key: '" + u[0] + "' in \\includegraphics.");
				}
			}
		}
		var f = Q(t[0], "url").url;
		return s === "" && (s = f, s = s.replace(/^.*[\\/]/, ""), s = s.substring(0, s.lastIndexOf("."))), r.settings.isTrusted({
			command: "\\includegraphics",
			url: f
		}) ? {
			type: "includegraphics",
			mode: r.mode,
			alt: s,
			width: i,
			height: a,
			totalheight: o,
			src: f
		} : r.formatUnsupportedCmd("\\includegraphics");
	},
	htmlBuilder: (e, t) => {
		var n = Op(e.height, t), r = 0;
		e.totalheight.number > 0 && (r = Op(e.totalheight, t) - n);
		var i = 0;
		e.width.number > 0 && (i = Op(e.width, t));
		var a = { height: R(n + r) };
		i > 0 && (a.width = R(i)), r > 0 && (a.verticalAlign = R(-r));
		var o = new Lp(e.src, e.alt, a);
		return o.height = n, o.depth = r, o;
	},
	mathmlBuilder: (e, t) => {
		var n = new Z("mglyph", []);
		n.setAttribute("alt", e.alt);
		var r = Op(e.height, t), i = 0;
		if (e.totalheight.number > 0 && (i = Op(e.totalheight, t) - r, n.setAttribute("valign", R(-i))), n.setAttribute("height", R(r + i)), e.width.number > 0) {
			var a = Op(e.width, t);
			n.setAttribute("width", R(a));
		}
		return n.setAttribute("src", e.src), n;
	}
}), X({
	type: "kern",
	names: [
		"\\kern",
		"\\mkern",
		"\\hskip",
		"\\mskip"
	],
	props: {
		numArgs: 1,
		argTypes: ["size"],
		primitive: !0,
		allowedInText: !0
	},
	handler(e, t) {
		var { parser: n, funcName: r } = e, i = Q(t[0], "size");
		if (n.settings.strict) {
			var a = r[1] === "m", o = i.value.unit === "mu";
			a ? (o || n.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + r + " supports only mu units, " + ("not " + i.value.unit + " units")), n.mode !== "math" && n.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + r + " works only in math mode")) : o && n.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + r + " doesn't support mu units");
		}
		return {
			type: "kern",
			mode: n.mode,
			dimension: i.value
		};
	},
	htmlBuilder(e, t) {
		return eh(e.dimension, t);
	},
	mathmlBuilder(e, t) {
		return new jh(Op(e.dimension, t));
	}
}), X({
	type: "lap",
	names: [
		"\\mathllap",
		"\\mathrlap",
		"\\mathclap"
	],
	props: {
		numArgs: 1,
		allowedInText: !0
	},
	handler: (e, t) => {
		var { parser: n, funcName: r } = e, i = t[0];
		return {
			type: "lap",
			mode: n.mode,
			alignment: r.slice(5),
			body: i
		};
	},
	htmlBuilder: (e, t) => {
		var n;
		e.alignment === "clap" ? (n = Y([], [Eh(e.body, t)]), n = Y(["inner"], [n], t)) : n = Y(["inner"], [Eh(e.body, t)]);
		var r = Y(["fix"], []), i = Y([e.alignment], [n, r], t), a = Y(["strut"]);
		return a.style.height = R(i.height + i.depth), i.depth && (a.style.verticalAlign = R(-i.depth)), i.children.unshift(a), i = Y(["thinbox"], [i], t), Y(["mord", "vbox"], [i], t);
	},
	mathmlBuilder: (e, t) => {
		var n = new Z("mpadded", [Vh(e.body, t)]);
		if (e.alignment !== "rlap") {
			var r = e.alignment === "llap" ? "-1" : "-0.5";
			n.setAttribute("lspace", r + "width");
		}
		return n.setAttribute("width", "0px"), n;
	}
}), X({
	type: "styling",
	names: ["\\(", "$"],
	props: {
		numArgs: 0,
		allowedInText: !0,
		allowedInMath: !1
	},
	handler(e, t) {
		var { funcName: n, parser: r } = e, i = r.mode;
		r.switchMode("math");
		var a = n === "\\(" ? "\\)" : "$", o = r.parseExpression(!1, a);
		return r.expect(a), r.switchMode(i), {
			type: "styling",
			mode: r.mode,
			style: "text",
			resetFont: !0,
			body: o
		};
	}
}), X({
	type: "text",
	names: ["\\)", "\\]"],
	props: {
		numArgs: 0,
		allowedInText: !0,
		allowedInMath: !1
	},
	handler(e, t) {
		throw new I("Mismatched " + e.funcName);
	}
});
var I_ = (e, t) => {
	switch (t.style.size) {
		case L.DISPLAY.size: return e.display;
		case L.TEXT.size: return e.text;
		case L.SCRIPT.size: return e.script;
		case L.SCRIPTSCRIPT.size: return e.scriptscript;
		default: return e.text;
	}
};
X({
	type: "mathchoice",
	names: ["\\mathchoice"],
	props: {
		numArgs: 4,
		primitive: !0
	},
	handler: (e, t) => {
		var { parser: n } = e;
		return {
			type: "mathchoice",
			mode: n.mode,
			display: hh(t[0]),
			text: hh(t[1]),
			script: hh(t[2]),
			scriptscript: hh(t[3])
		};
	},
	htmlBuilder: (e, t) => Xm(bh(I_(e, t), t, !1)),
	mathmlBuilder: (e, t) => Bh(I_(e, t), t)
});
var L_ = (e, t, n, r, i, a, o) => {
	e = Y([], [e]);
	var s = n && Lf(n), c, l;
	if (t) {
		var u = Eh(t, r.havingStyle(i.sup()), r);
		l = {
			elem: u,
			kern: Math.max(r.fontMetrics().bigOpSpacing1, r.fontMetrics().bigOpSpacing3 - u.depth)
		};
	}
	if (n) {
		var d = Eh(n, r.havingStyle(i.sub()), r);
		c = {
			elem: d,
			kern: Math.max(r.fontMetrics().bigOpSpacing2, r.fontMetrics().bigOpSpacing4 - d.height)
		};
	}
	var f;
	if (l && c) f = $m({
		positionType: "bottom",
		positionData: r.fontMetrics().bigOpSpacing5 + c.elem.height + c.elem.depth + c.kern + e.depth + o,
		children: [
			{
				type: "kern",
				size: r.fontMetrics().bigOpSpacing5
			},
			{
				type: "elem",
				elem: c.elem,
				marginLeft: R(-a)
			},
			{
				type: "kern",
				size: c.kern
			},
			{
				type: "elem",
				elem: e
			},
			{
				type: "kern",
				size: l.kern
			},
			{
				type: "elem",
				elem: l.elem,
				marginLeft: R(a)
			},
			{
				type: "kern",
				size: r.fontMetrics().bigOpSpacing5
			}
		]
	});
	else if (c) f = $m({
		positionType: "top",
		positionData: e.height - o,
		children: [
			{
				type: "kern",
				size: r.fontMetrics().bigOpSpacing5
			},
			{
				type: "elem",
				elem: c.elem,
				marginLeft: R(-a)
			},
			{
				type: "kern",
				size: c.kern
			},
			{
				type: "elem",
				elem: e
			}
		]
	});
	else if (l) f = $m({
		positionType: "bottom",
		positionData: e.depth + o,
		children: [
			{
				type: "elem",
				elem: e
			},
			{
				type: "kern",
				size: l.kern
			},
			{
				type: "elem",
				elem: l.elem,
				marginLeft: R(a)
			},
			{
				type: "kern",
				size: r.fontMetrics().bigOpSpacing5
			}
		]
	});
	else return e;
	var p = [f];
	if (c && a !== 0 && !s) {
		var m = Y(["mspace"], [], r);
		m.style.marginRight = R(a), p.unshift(m);
	}
	return Y(["mop", "op-limits"], p, r);
}, R_ = /* @__PURE__ */ new Set(["\\smallint"]), z_ = (e, t) => {
	var n, r, i = !1, a;
	e.type === "supsub" ? (n = e.sup, r = e.sub, a = Q(e.base, "op"), i = !0) : a = Q(e, "op");
	var o = t.style, s = !1;
	o.size === L.DISPLAY.size && a.symbol && !R_.has(a.name) && (s = !0);
	var c, l;
	if (a.symbol) {
		var u = s ? "Size2-Regular" : "Size1-Regular", d = "";
		if ((a.name === "\\oiint" || a.name === "\\oiiint") && (d = a.name.slice(1), a.name = d === "oiint" ? "\\iint" : "\\iiint"), c = Bm(a.name, u, "math", t, [
			"mop",
			"op-symbol",
			s ? "large-op" : "small-op"
		]), l = c.italic, d.length > 0) {
			var f = ih(d + "Size" + (s ? "2" : "1"), t);
			c = $m({
				positionType: "individualShift",
				children: [{
					type: "elem",
					elem: c,
					shift: 0
				}, {
					type: "elem",
					elem: f,
					shift: s ? .08 : 0
				}]
			}), a.name = "\\" + d, c.classes.unshift("mop"), c.italic = l;
		}
	} else if (a.body) {
		var p = bh(a.body, t, !0);
		p.length === 1 && p[0] instanceof zp ? (c = p[0], c.classes[0] = "mop") : c = Y(["mop"], p, t);
	} else {
		for (var m = [], h = 1; h < a.name.length; h++) m.push(Vm(a.name[h], a.mode, t));
		c = Y(["mop"], m, t);
	}
	var g = 0, _ = 0;
	return (c instanceof zp || a.name === "\\oiint" || a.name === "\\oiiint") && !a.suppressBaseShift && (g = (c.height - c.depth) / 2 - t.fontMetrics().axisHeight, _ = c.italic ?? 0), i ? L_(c, n, r, t, o, _, g) : (g && (c.style.position = "relative", c.style.top = R(g)), c);
}, B_ = (e, t) => {
	var n;
	if (e.symbol) n = new Z("mo", [Ph(e.name, e.mode)]), R_.has(e.name) && n.setAttribute("largeop", "false");
	else if (e.body) n = new Z("mo", zh(e.body, t));
	else {
		n = new Z("mi", [new Ah(e.name.slice(1))]);
		var r = new Z("mo", [Ph("⁡", "text")]);
		n = e.parentIsSupSub ? new Z("mrow", [n, r]) : kh([n, r]);
	}
	return n;
}, V_ = {
	"∏": "\\prod",
	"∐": "\\coprod",
	"∑": "\\sum",
	"⋀": "\\bigwedge",
	"⋁": "\\bigvee",
	"⋂": "\\bigcap",
	"⋃": "\\bigcup",
	"⨀": "\\bigodot",
	"⨁": "\\bigoplus",
	"⨂": "\\bigotimes",
	"⨄": "\\biguplus",
	"⨆": "\\bigsqcup"
};
X({
	type: "op",
	names: /* @__PURE__ */ "\\coprod.\\bigvee.\\bigwedge.\\biguplus.\\bigcap.\\bigcup.\\intop.\\prod.\\sum.\\bigotimes.\\bigoplus.\\bigodot.\\bigsqcup.\\smallint.∏.∐.∑.⋀.⋁.⋂.⋃.⨀.⨁.⨂.⨄.⨆".split("."),
	props: { numArgs: 0 },
	handler: (e, t) => {
		var { parser: n, funcName: r } = e, i = r;
		return i.length === 1 && (i = V_[i]), {
			type: "op",
			mode: n.mode,
			limits: !0,
			parentIsSupSub: !1,
			symbol: !0,
			name: i
		};
	},
	htmlBuilder: z_,
	mathmlBuilder: B_
}), X({
	type: "op",
	names: ["\\mathop"],
	props: {
		numArgs: 1,
		primitive: !0
	},
	handler: (e, t) => {
		var { parser: n } = e, r = t[0];
		return {
			type: "op",
			mode: n.mode,
			limits: !1,
			parentIsSupSub: !1,
			symbol: !1,
			body: hh(r)
		};
	},
	htmlBuilder: z_,
	mathmlBuilder: B_
});
var H_ = {
	"∫": "\\int",
	"∬": "\\iint",
	"∭": "\\iiint",
	"∮": "\\oint",
	"∯": "\\oiint",
	"∰": "\\oiiint"
};
X({
	type: "op",
	names: /* @__PURE__ */ "\\arcsin.\\arccos.\\arctan.\\arctg.\\arcctg.\\arg.\\ch.\\cos.\\cosec.\\cosh.\\cot.\\cotg.\\coth.\\csc.\\ctg.\\cth.\\deg.\\dim.\\exp.\\hom.\\ker.\\lg.\\ln.\\log.\\sec.\\sin.\\sinh.\\sh.\\tan.\\tanh.\\tg.\\th".split("."),
	props: { numArgs: 0 },
	handler(e) {
		var { parser: t, funcName: n } = e;
		return {
			type: "op",
			mode: t.mode,
			limits: !1,
			parentIsSupSub: !1,
			symbol: !1,
			name: n
		};
	},
	htmlBuilder: z_,
	mathmlBuilder: B_
}), X({
	type: "op",
	names: [
		"\\det",
		"\\gcd",
		"\\inf",
		"\\lim",
		"\\max",
		"\\min",
		"\\Pr",
		"\\sup"
	],
	props: { numArgs: 0 },
	handler(e) {
		var { parser: t, funcName: n } = e;
		return {
			type: "op",
			mode: t.mode,
			limits: !0,
			parentIsSupSub: !1,
			symbol: !1,
			name: n
		};
	},
	htmlBuilder: z_,
	mathmlBuilder: B_
}), X({
	type: "op",
	names: [
		"\\int",
		"\\iint",
		"\\iiint",
		"\\oint",
		"\\oiint",
		"\\oiiint",
		"∫",
		"∬",
		"∭",
		"∮",
		"∯",
		"∰"
	],
	props: {
		numArgs: 0,
		allowedInArgument: !0
	},
	handler(e) {
		var { parser: t, funcName: n } = e, r = n;
		return r.length === 1 && (r = H_[r]), {
			type: "op",
			mode: t.mode,
			limits: !1,
			parentIsSupSub: !1,
			symbol: !0,
			name: r
		};
	},
	htmlBuilder: z_,
	mathmlBuilder: B_
});
var U_ = (e, t) => {
	var n, r, i = !1, a;
	e.type === "supsub" ? (n = e.sup, r = e.sub, a = Q(e.base, "operatorname"), i = !0) : a = Q(e, "operatorname");
	var o;
	if (a.body.length > 0) {
		for (var s = bh(a.body.map((e) => {
			var t = "text" in e ? e.text : void 0;
			return typeof t == "string" ? {
				type: "textord",
				mode: e.mode,
				text: t
			} : e;
		}), t.withFont("mathrm"), !0), c = 0; c < s.length; c++) {
			var l = s[c];
			l instanceof zp && (l.text = l.text.replace(/\u2212/, "-").replace(/\u2217/, "*"));
		}
		o = Y(["mop"], s, t);
	} else o = Y(["mop"], [], t);
	return i ? L_(o, n, r, t, t.style, 0, 0) : o;
};
X({
	type: "operatorname",
	names: ["\\operatorname@", "\\operatornamewithlimits"],
	props: { numArgs: 1 },
	handler: (e, t) => {
		var { parser: n, funcName: r } = e, i = t[0];
		return {
			type: "operatorname",
			mode: n.mode,
			body: hh(i),
			alwaysHandleSupSub: r === "\\operatornamewithlimits",
			limits: !1,
			parentIsSupSub: !1
		};
	},
	htmlBuilder: U_,
	mathmlBuilder: (e, t) => {
		for (var n = zh(e.body, t.withFont("mathrm")), r = !0, i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a instanceof jh)) {
				if (a instanceof Z) switch (a.type) {
					case "mi":
					case "mn":
					case "mspace":
					case "mtext": break;
					case "mo":
						var o = a.children[0];
						a.children.length === 1 && o instanceof Ah ? o.text = o.text.replace(/\u2212/, "-").replace(/\u2217/, "*") : r = !1;
						break;
					default: r = !1;
				}
				else r = !1;
			}
		}
		r && (n = [new Ah(n.map((e) => e.toText()).join(""))]);
		var s = new Z("mi", n);
		s.setAttribute("mathvariant", "normal");
		var c = new Z("mo", [Ph("⁡", "text")]);
		return e.parentIsSupSub ? new Z("mrow", [s, c]) : kh([s, c]);
	}
}), $("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@"), ph({
	type: "ordgroup",
	htmlBuilder(e, t) {
		return e.semisimple ? Xm(bh(e.body, t, !1)) : Y(["mord"], bh(e.body, t, !0), t);
	},
	mathmlBuilder(e, t) {
		return Bh(e.body, t, !0);
	}
}), X({
	type: "overline",
	names: ["\\overline"],
	props: { numArgs: 1 },
	handler(e, t) {
		var { parser: n } = e, r = t[0];
		return {
			type: "overline",
			mode: n.mode,
			body: r
		};
	},
	htmlBuilder(e, t) {
		var n = Eh(e.body, t.havingCrampedStyle()), r = Jm("overline-line", t), i = t.fontMetrics().defaultRuleThickness;
		return Y(["mord", "overline"], [$m({
			positionType: "firstBaseline",
			children: [
				{
					type: "elem",
					elem: n
				},
				{
					type: "kern",
					size: 3 * i
				},
				{
					type: "elem",
					elem: r
				},
				{
					type: "kern",
					size: i
				}
			]
		})], t);
	},
	mathmlBuilder(e, t) {
		var n = new Z("mo", [new Ah("‾")]);
		n.setAttribute("stretchy", "true");
		var r = new Z("mover", [Vh(e.body, t), n]);
		return r.setAttribute("accent", "true"), r;
	}
}), X({
	type: "phantom",
	names: ["\\phantom"],
	props: {
		numArgs: 1,
		allowedInText: !0
	},
	handler: (e, t) => {
		var { parser: n } = e, r = t[0];
		return {
			type: "phantom",
			mode: n.mode,
			body: hh(r)
		};
	},
	htmlBuilder: (e, t) => Xm(bh(e.body, t.withPhantom(), !1)),
	mathmlBuilder: (e, t) => new Z("mphantom", zh(e.body, t))
}), $("\\hphantom", "\\smash{\\phantom{#1}}"), X({
	type: "vphantom",
	names: ["\\vphantom"],
	props: {
		numArgs: 1,
		allowedInText: !0
	},
	handler: (e, t) => {
		var { parser: n } = e, r = t[0];
		return {
			type: "vphantom",
			mode: n.mode,
			body: r
		};
	},
	htmlBuilder: (e, t) => Y(["mord", "rlap"], [Y(["inner"], [Eh(e.body, t.withPhantom())]), Y(["fix"], [])], t),
	mathmlBuilder: (e, t) => {
		var n = new Z("mpadded", [new Z("mphantom", zh(hh(e.body), t))]);
		return n.setAttribute("width", "0px"), n;
	}
}), X({
	type: "raisebox",
	names: ["\\raisebox"],
	props: {
		numArgs: 2,
		argTypes: ["size", "hbox"],
		allowedInText: !0
	},
	handler(e, t) {
		var { parser: n } = e, r = Q(t[0], "size").value, i = t[1];
		return {
			type: "raisebox",
			mode: n.mode,
			dy: r,
			body: i
		};
	},
	htmlBuilder(e, t) {
		var n = Eh(e.body, t);
		return $m({
			positionType: "shift",
			positionData: -Op(e.dy, t),
			children: [{
				type: "elem",
				elem: n
			}]
		});
	},
	mathmlBuilder(e, t) {
		var n = new Z("mpadded", [Vh(e.body, t)]), r = e.dy.number + e.dy.unit;
		return n.setAttribute("voffset", r), n;
	}
}), X({
	type: "internal",
	names: ["\\relax"],
	props: {
		numArgs: 0,
		allowedInText: !0,
		allowedInArgument: !0
	},
	handler(e) {
		var { parser: t } = e;
		return {
			type: "internal",
			mode: t.mode
		};
	}
}), X({
	type: "rule",
	names: ["\\rule"],
	props: {
		numArgs: 2,
		numOptionalArgs: 1,
		allowedInText: !0,
		allowedInMath: !0,
		argTypes: [
			"size",
			"size",
			"size"
		]
	},
	handler(e, t, n) {
		var { parser: r } = e, i = n[0], a = Q(t[0], "size"), o = Q(t[1], "size");
		return {
			type: "rule",
			mode: r.mode,
			shift: i && Q(i, "size").value,
			width: a.value,
			height: o.value
		};
	},
	htmlBuilder(e, t) {
		var n = Y(["mord", "rule"], [], t), r = Op(e.width, t), i = Op(e.height, t), a = e.shift ? Op(e.shift, t) : 0;
		return n.style.borderRightWidth = R(r), n.style.borderTopWidth = R(i), n.style.bottom = R(a), n.width = r, n.height = i + a, n.depth = -a, n.maxFontSize = i * 1.125 * t.sizeMultiplier, n;
	},
	mathmlBuilder(e, t) {
		var n = Op(e.width, t), r = Op(e.height, t), i = e.shift ? Op(e.shift, t) : 0, a = t.color && t.getColor() || "black", o = new Z("mspace");
		o.setAttribute("mathbackground", a), o.setAttribute("width", R(n)), o.setAttribute("height", R(r));
		var s = new Z("mpadded", [o]);
		return i >= 0 ? s.setAttribute("height", R(i)) : (s.setAttribute("height", R(i)), s.setAttribute("depth", R(-i))), s.setAttribute("voffset", R(i)), s;
	}
});
function W_(e, t, n) {
	for (var r = bh(e, t, !1), i = t.sizeMultiplier / n.sizeMultiplier, a = 0; a < r.length; a++) {
		var o = r[a].classes.indexOf("sizing");
		o < 0 ? Array.prototype.push.apply(r[a].classes, t.sizingClasses(n)) : r[a].classes[o + 1] === "reset-size" + t.size && (r[a].classes[o + 1] = "reset-size" + n.size), r[a].height *= i, r[a].depth *= i;
	}
	return Xm(r);
}
var G_ = [
	"\\tiny",
	"\\sixptsize",
	"\\scriptsize",
	"\\footnotesize",
	"\\small",
	"\\normalsize",
	"\\large",
	"\\Large",
	"\\LARGE",
	"\\huge",
	"\\Huge"
];
X({
	type: "sizing",
	names: G_,
	props: {
		numArgs: 0,
		allowedInText: !0
	},
	handler: (e, t) => {
		var { breakOnTokenText: n, funcName: r, parser: i } = e, a = i.parseExpression(!1, n);
		return {
			type: "sizing",
			mode: i.mode,
			size: G_.indexOf(r) + 1,
			body: a
		};
	},
	htmlBuilder: (e, t) => {
		var n = t.havingSize(e.size);
		return W_(e.body, n, t);
	},
	mathmlBuilder: (e, t) => {
		var n = t.havingSize(e.size), r = new Z("mstyle", zh(e.body, n));
		return r.setAttribute("mathsize", R(n.sizeMultiplier)), r;
	}
}), X({
	type: "smash",
	names: ["\\smash"],
	props: {
		numArgs: 1,
		numOptionalArgs: 1,
		allowedInText: !0
	},
	handler: (e, t, n) => {
		var { parser: r } = e, i = !1, a = !1, o = n[0] && Q(n[0], "ordgroup");
		if (o) for (var s, c = 0; c < o.body.length; ++c) {
			var l = o.body[c];
			if (s = og(l).text, s === "t") i = !0;
			else if (s === "b") a = !0;
			else {
				i = !1, a = !1;
				break;
			}
		}
		else i = !0, a = !0;
		var u = t[0];
		return {
			type: "smash",
			mode: r.mode,
			body: u,
			smashHeight: i,
			smashDepth: a
		};
	},
	htmlBuilder: (e, t) => {
		var n = Y([], [Eh(e.body, t)]);
		if (!e.smashHeight && !e.smashDepth) return n;
		if (e.smashHeight && (n.height = 0), e.smashDepth && (n.depth = 0), e.smashHeight && e.smashDepth) return Y(["mord", "smash"], [n], t);
		if (n.children) for (var r = 0; r < n.children.length; r++) e.smashHeight && (n.children[r].height = 0), e.smashDepth && (n.children[r].depth = 0);
		return Y(["mord"], [$m({
			positionType: "firstBaseline",
			children: [{
				type: "elem",
				elem: n
			}]
		})], t);
	},
	mathmlBuilder: (e, t) => {
		var n = new Z("mpadded", [Vh(e.body, t)]);
		return e.smashHeight && n.setAttribute("height", "0px"), e.smashDepth && n.setAttribute("depth", "0px"), n;
	}
}), X({
	type: "sqrt",
	names: ["\\sqrt"],
	props: {
		numArgs: 1,
		numOptionalArgs: 1
	},
	handler(e, t, n) {
		var { parser: r } = e, i = n[0], a = t[0];
		return {
			type: "sqrt",
			mode: r.mode,
			body: a,
			index: i
		};
	},
	htmlBuilder(e, t) {
		var n = Eh(e.body, t.havingCrampedStyle());
		n.height === 0 && (n.height = t.fontMetrics().xHeight), n = Zm(n, t);
		var r = t.fontMetrics().defaultRuleThickness, i = r;
		t.style.id < L.TEXT.id && (i = t.fontMetrics().xHeight);
		var a = r + i / 4, { span: o, ruleWidth: s, advanceWidth: c } = Wg(n.height + n.depth + a + r, t), l = o.height - s;
		l > n.height + n.depth + a && (a = (a + l - n.height - n.depth) / 2);
		var u = o.height - n.height - a - s;
		n.style.paddingLeft = R(c);
		var d = $m({
			positionType: "firstBaseline",
			children: [
				{
					type: "elem",
					elem: n,
					wrapperClasses: ["svg-align"]
				},
				{
					type: "kern",
					size: -(n.height + u)
				},
				{
					type: "elem",
					elem: o
				},
				{
					type: "kern",
					size: s
				}
			]
		});
		if (e.index) {
			var f = t.havingStyle(L.SCRIPTSCRIPT), p = Eh(e.index, f, t);
			return Y(["mord", "sqrt"], [Y(["root"], [$m({
				positionType: "shift",
				positionData: -(.6 * (d.height - d.depth)),
				children: [{
					type: "elem",
					elem: p
				}]
			})]), d], t);
		}
		return Y(["mord", "sqrt"], [d], t);
	},
	mathmlBuilder(e, t) {
		var { body: n, index: r } = e;
		return r ? new Z("mroot", [Vh(n, t), Vh(r, t)]) : new Z("msqrt", [Vh(n, t)]);
	}
});
var K_ = {
	display: L.DISPLAY,
	text: L.TEXT,
	script: L.SCRIPT,
	scriptscript: L.SCRIPTSCRIPT
};
function q_(e) {
	return e in K_;
}
X({
	type: "styling",
	names: [
		"\\displaystyle",
		"\\textstyle",
		"\\scriptstyle",
		"\\scriptscriptstyle"
	],
	props: {
		numArgs: 0,
		allowedInText: !0,
		primitive: !0
	},
	handler(e, t) {
		var { breakOnTokenText: n, funcName: r, parser: i } = e, a = i.parseExpression(!0, n), o = r.slice(1, r.length - 5);
		if (!q_(o)) throw Error("Unknown style: " + o);
		return {
			type: "styling",
			mode: i.mode,
			style: o,
			body: a
		};
	},
	htmlBuilder(e, t) {
		var n = K_[e.style], r = t.havingStyle(n);
		return e.resetFont && (r = r.withFont("")), W_(e.body, r, t);
	},
	mathmlBuilder(e, t) {
		var n = K_[e.style], r = t.havingStyle(n);
		e.resetFont && (r = r.withFont(""));
		var i = new Z("mstyle", zh(e.body, r)), a = {
			display: ["0", "true"],
			text: ["0", "false"],
			script: ["1", "false"],
			scriptscript: ["2", "false"]
		}[e.style];
		return i.setAttribute("scriptlevel", a[0]), i.setAttribute("displaystyle", a[1]), i;
	}
});
var J_ = function(e, t) {
	var n = e.base;
	return n ? n.type === "op" ? n.limits && (t.style.size === L.DISPLAY.size || n.alwaysHandleSupSub) ? z_ : null : n.type === "operatorname" ? n.alwaysHandleSupSub && (t.style.size === L.DISPLAY.size || n.limits) ? U_ : null : n.type === "accent" ? Lf(n.base) ? lg : null : n.type === "horizBrace" && !e.sub === n.isOver ? P_ : null : null;
};
ph({
	type: "supsub",
	htmlBuilder(e, t) {
		var n = J_(e, t);
		if (n) return n(e, t);
		var { base: r, sup: i, sub: a } = e, o = Eh(r, t), s, c, l = t.fontMetrics(), u = 0, d = 0, f = r && Lf(r);
		if (i) {
			var p = t.havingStyle(t.style.sup());
			s = Eh(i, p, t), f || (u = o.height - p.fontMetrics().supDrop * p.sizeMultiplier / t.sizeMultiplier);
		}
		if (a) {
			var m = t.havingStyle(t.style.sub());
			c = Eh(a, m, t), f || (d = o.depth + m.fontMetrics().subDrop * m.sizeMultiplier / t.sizeMultiplier);
		}
		var h = t.style === L.DISPLAY ? l.sup1 : t.style.cramped ? l.sup3 : l.sup2, g = t.sizeMultiplier, _ = R(.5 / l.ptPerEm / g), v = null;
		if (c) {
			var y = e.base && e.base.type === "op" && e.base.name && (e.base.name === "\\oiint" || e.base.name === "\\oiiint");
			(o instanceof zp || y) && (v = R(-(o.italic ?? 0)));
		}
		var b;
		if (s && c) {
			u = Math.max(u, h, s.depth + .25 * l.xHeight), d = Math.max(d, l.sub2);
			var x = 4 * l.defaultRuleThickness;
			if (u - s.depth - (c.height - d) < x) {
				d = x - (u - s.depth) + c.height;
				var S = .8 * l.xHeight - (u - s.depth);
				S > 0 && (u += S, d -= S);
			}
			b = $m({
				positionType: "individualShift",
				children: [{
					type: "elem",
					elem: c,
					shift: d,
					marginRight: _,
					marginLeft: v
				}, {
					type: "elem",
					elem: s,
					shift: -u,
					marginRight: _
				}]
			});
		} else if (c) d = Math.max(d, l.sub1, c.height - .8 * l.xHeight), b = $m({
			positionType: "shift",
			positionData: d,
			children: [{
				type: "elem",
				elem: c,
				marginLeft: v,
				marginRight: _
			}]
		});
		else if (s) u = Math.max(u, h, s.depth + .25 * l.xHeight), b = $m({
			positionType: "shift",
			positionData: -u,
			children: [{
				type: "elem",
				elem: s,
				marginRight: _
			}]
		});
		else throw Error("supsub must have either sup or sub.");
		return Y([wh(o, "right") || "mord"], [o, Y(["msupsub"], [b])], t);
	},
	mathmlBuilder(e, t) {
		var n = !1, r, i;
		e.base && e.base.type === "horizBrace" && (i = !!e.sup, i === e.base.isOver && (n = !0, r = e.base.isOver)), e.base && (e.base.type === "op" || e.base.type === "operatorname") && (e.base.parentIsSupSub = !0);
		var a = [Vh(e.base, t)];
		e.sub && a.push(Vh(e.sub, t)), e.sup && a.push(Vh(e.sup, t));
		var o;
		if (n) o = r ? "mover" : "munder";
		else if (!e.sub) {
			var s = e.base;
			o = s && s.type === "op" && s.limits && (t.style === L.DISPLAY || s.alwaysHandleSupSub) || s && s.type === "operatorname" && s.alwaysHandleSupSub && (s.limits || t.style === L.DISPLAY) ? "mover" : "msup";
		} else if (e.sup) {
			var c = e.base;
			o = c && c.type === "op" && c.limits && t.style === L.DISPLAY || c && c.type === "operatorname" && c.alwaysHandleSupSub && (t.style === L.DISPLAY || c.limits) ? "munderover" : "msubsup";
		} else {
			var l = e.base;
			o = l && l.type === "op" && l.limits && (t.style === L.DISPLAY || l.alwaysHandleSupSub) || l && l.type === "operatorname" && l.alwaysHandleSupSub && (l.limits || t.style === L.DISPLAY) ? "munder" : "msub";
		}
		return new Z(o, a);
	}
}), ph({
	type: "atom",
	htmlBuilder(e, t) {
		return Vm(e.text, e.mode, t, ["m" + e.family]);
	},
	mathmlBuilder(e, t) {
		var n = new Z("mo", [Ph(e.text, e.mode)]);
		if (e.family === "bin") {
			var r = Lh(e, t);
			r === "bold-italic" && n.setAttribute("mathvariant", r);
		} else e.family === "punct" ? n.setAttribute("separator", "true") : (e.family === "open" || e.family === "close") && n.setAttribute("stretchy", "false");
		return n;
	}
});
var Y_ = {
	mi: "italic",
	mn: "normal",
	mtext: "normal"
};
ph({
	type: "mathord",
	htmlBuilder(e, t) {
		return Um(e, t, "mathord");
	},
	mathmlBuilder(e, t) {
		var n = new Z("mi", [Ph(e.text, e.mode, t)]), r = Lh(e, t) || "italic";
		return r !== Y_[n.type] && n.setAttribute("mathvariant", r), n;
	}
}), ph({
	type: "textord",
	htmlBuilder(e, t) {
		return Um(e, t, "textord");
	},
	mathmlBuilder(e, t) {
		var n = Ph(e.text, e.mode, t), r = Lh(e, t) || "normal", i = e.mode === "text" ? new Z("mtext", [n]) : /[0-9]/.test(e.text) ? new Z("mn", [n]) : e.text === "\\prime" ? new Z("mo", [n]) : new Z("mi", [n]);
		return r !== Y_[i.type] && i.setAttribute("mathvariant", r), i;
	}
});
var X_ = {
	"\\nobreak": "nobreak",
	"\\allowbreak": "allowbreak"
}, Z_ = {
	" ": {},
	"\\ ": {},
	"~": { className: "nobreak" },
	"\\space": {},
	"\\nobreakspace": { className: "nobreak" }
};
ph({
	type: "spacing",
	htmlBuilder(e, t) {
		if (Z_.hasOwnProperty(e.text)) {
			var n = Z_[e.text].className || "";
			if (e.mode === "text") {
				var r = Um(e, t, "textord");
				return r.classes.push(n), r;
			}
			return Y(["mspace", n], [Vm(e.text, e.mode, t)], t);
		}
		if (X_.hasOwnProperty(e.text)) return Y(["mspace", X_[e.text]], [], t);
		throw new I("Unknown type of space \"" + e.text + "\"");
	},
	mathmlBuilder(e, t) {
		var n;
		if (Z_.hasOwnProperty(e.text)) n = new Z("mtext", [new Ah("\xA0")]);
		else if (X_.hasOwnProperty(e.text)) return new Z("mspace");
		else throw new I("Unknown type of space \"" + e.text + "\"");
		return n;
	}
});
var Q_ = () => {
	var e = new Z("mtd", []);
	return e.setAttribute("width", "50%"), e;
};
ph({
	type: "tag",
	mathmlBuilder(e, t) {
		var n = new Z("mtable", [new Z("mtr", [
			Q_(),
			new Z("mtd", [Bh(e.body, t)]),
			Q_(),
			new Z("mtd", [Bh(e.tag, t)])
		])]);
		return n.setAttribute("width", "100%"), n;
	}
});
var $_ = {
	"\\text": void 0,
	"\\textrm": "textrm",
	"\\textsf": "textsf",
	"\\texttt": "texttt",
	"\\textnormal": "textrm"
}, ev = {
	"\\textbf": "textbf",
	"\\textmd": "textmd"
}, tv = {
	"\\textit": "textit",
	"\\textup": "textup"
}, nv = (e, t) => {
	var n = e.font;
	return n ? $_[n] ? t.withTextFontFamily($_[n]) : ev[n] ? t.withTextFontWeight(ev[n]) : n === "\\emph" ? t.fontShape === "textit" ? t.withTextFontShape("textup") : t.withTextFontShape("textit") : t.withTextFontShape(tv[n]) : t;
};
X({
	type: "text",
	names: [
		"\\text",
		"\\textrm",
		"\\textsf",
		"\\texttt",
		"\\textnormal",
		"\\textbf",
		"\\textmd",
		"\\textit",
		"\\textup",
		"\\emph"
	],
	props: {
		numArgs: 1,
		argTypes: ["text"],
		allowedInArgument: !0,
		allowedInText: !0
	},
	handler(e, t) {
		var { parser: n, funcName: r } = e, i = t[0];
		return {
			type: "text",
			mode: n.mode,
			body: hh(i),
			font: r
		};
	},
	htmlBuilder(e, t) {
		var n = nv(e, t);
		return Y(["mord", "text"], bh(e.body, n, !0), n);
	},
	mathmlBuilder(e, t) {
		var n = nv(e, t);
		return Bh(e.body, n);
	}
}), X({
	type: "underline",
	names: ["\\underline"],
	props: {
		numArgs: 1,
		allowedInText: !0
	},
	handler(e, t) {
		var { parser: n } = e;
		return {
			type: "underline",
			mode: n.mode,
			body: t[0]
		};
	},
	htmlBuilder(e, t) {
		var n = Eh(e.body, t), r = Jm("underline-line", t), i = t.fontMetrics().defaultRuleThickness;
		return Y(["mord", "underline"], [$m({
			positionType: "top",
			positionData: n.height,
			children: [
				{
					type: "kern",
					size: i
				},
				{
					type: "elem",
					elem: r
				},
				{
					type: "kern",
					size: 3 * i
				},
				{
					type: "elem",
					elem: n
				}
			]
		})], t);
	},
	mathmlBuilder(e, t) {
		var n = new Z("mo", [new Ah("‾")]);
		n.setAttribute("stretchy", "true");
		var r = new Z("munder", [Vh(e.body, t), n]);
		return r.setAttribute("accentunder", "true"), r;
	}
}), X({
	type: "vcenter",
	names: ["\\vcenter"],
	props: {
		numArgs: 1,
		argTypes: ["original"],
		allowedInText: !1
	},
	handler(e, t) {
		var { parser: n } = e;
		return {
			type: "vcenter",
			mode: n.mode,
			body: t[0]
		};
	},
	htmlBuilder(e, t) {
		var n = Eh(e.body, t), r = t.fontMetrics().axisHeight;
		return $m({
			positionType: "shift",
			positionData: .5 * (n.height - r - (n.depth + r)),
			children: [{
				type: "elem",
				elem: n
			}]
		});
	},
	mathmlBuilder(e, t) {
		return new Z("mrow", [new Z("mpadded", [Vh(e.body, t)], ["vcenter"])]);
	}
}), X({
	type: "verb",
	names: ["\\verb"],
	props: {
		numArgs: 0,
		allowedInText: !0
	},
	handler(e, t, n) {
		throw new I("\\verb ended by end of line instead of matching delimiter");
	},
	htmlBuilder(e, t) {
		for (var n = rv(e), r = [], i = t.havingStyle(t.style.text()), a = 0; a < n.length; a++) {
			var o = n[a];
			o === "~" && (o = "\\textasciitilde"), r.push(Bm(o, "Typewriter-Regular", e.mode, i, ["mord", "texttt"]));
		}
		return Y(["mord", "text"].concat(i.sizingClasses(t)), Gm(r), i);
	},
	mathmlBuilder(e, t) {
		var n = new Z("mtext", [new Ah(rv(e))]);
		return n.setAttribute("mathvariant", "monospace"), n;
	}
});
var rv = (e) => e.body.replace(/ /g, e.star ? "␣" : "\xA0"), iv = uh, av = "[ \r\n	]", ov = "\\\\[a-zA-Z@]+", sv = "\\\\[^\ud800-\udfff]", cv = "(" + ov + ")" + av + "*", lv = "\\\\(\n|[ \r	]+\n?)[ \r	]*", uv = "[̀-ͯ]", dv = RegExp(uv + "+$"), fv = "(" + av + "+)|" + (lv + "|") + "([!-\\[\\]-‧‪-퟿豈-￿]" + (uv + "*") + "|[\ud800-\udbff][\udc00-\udfff]" + (uv + "*") + "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + ("|" + cv) + ("|" + sv + ")"), pv = class {
	constructor(e, t) {
		this.input = void 0, this.settings = void 0, this.tokenRegex = void 0, this.catcodes = void 0, this.input = e, this.settings = t, this.tokenRegex = new RegExp(fv, "g"), this.catcodes = {
			"%": 14,
			"~": 13
		};
	}
	setCatcode(e, t) {
		this.catcodes[e] = t;
	}
	lex() {
		var e = this.input, t = this.tokenRegex.lastIndex;
		if (t === e.length) return new m_("EOF", new p_(this, t, t));
		var n = this.tokenRegex.exec(e);
		if (n === null || n.index !== t) throw new I("Unexpected character: '" + e[t] + "'", new m_(e[t], new p_(this, t, t + 1)));
		var r = n[6] || n[3] || (n[2] ? "\\ " : " ");
		if (this.catcodes[r] === 14) {
			var i = e.indexOf("\n", this.tokenRegex.lastIndex);
			return i === -1 ? (this.tokenRegex.lastIndex = e.length, this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)")) : this.tokenRegex.lastIndex = i + 1, this.lex();
		}
		return new m_(r, new p_(this, t, this.tokenRegex.lastIndex));
	}
}, mv = class {
	constructor(e, t) {
		e === void 0 && (e = {}), t === void 0 && (t = {}), this.current = void 0, this.builtins = void 0, this.undefStack = void 0, this.current = t, this.builtins = e, this.undefStack = [];
	}
	beginGroup() {
		this.undefStack.push({});
	}
	endGroup() {
		if (this.undefStack.length === 0) throw new I("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
		var e = this.undefStack.pop();
		for (var t in e) e.hasOwnProperty(t) && (e[t] == null ? delete this.current[t] : this.current[t] = e[t]);
	}
	endGroups() {
		for (; this.undefStack.length > 0;) this.endGroup();
	}
	has(e) {
		return this.current.hasOwnProperty(e) || this.builtins.hasOwnProperty(e);
	}
	get(e) {
		return this.current.hasOwnProperty(e) ? this.current[e] : this.builtins[e];
	}
	set(e, t, n) {
		if (n === void 0 && (n = !1), n) {
			for (var r = 0; r < this.undefStack.length; r++) delete this.undefStack[r][e];
			this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e] = t);
		} else {
			var i = this.undefStack[this.undefStack.length - 1];
			i && !i.hasOwnProperty(e) && (i[e] = this.current[e]);
		}
		t == null ? delete this.current[e] : this.current[e] = t;
	}
}, hv = f_;
$("\\noexpand", function(e) {
	var t = e.popToken();
	return e.isExpandable(t.text) && (t.noexpand = !0, t.treatAsRelax = !0), {
		tokens: [t],
		numArgs: 0
	};
}), $("\\expandafter", function(e) {
	var t = e.popToken();
	return e.expandOnce(!0), {
		tokens: [t],
		numArgs: 0
	};
}), $("\\@firstoftwo", function(e) {
	return {
		tokens: e.consumeArgs(2)[0],
		numArgs: 0
	};
}), $("\\@secondoftwo", function(e) {
	return {
		tokens: e.consumeArgs(2)[1],
		numArgs: 0
	};
}), $("\\@ifnextchar", function(e) {
	var t = e.consumeArgs(3);
	e.consumeSpaces();
	var n = e.future();
	return t[0].length === 1 && t[0][0].text === n.text ? {
		tokens: t[1],
		numArgs: 0
	} : {
		tokens: t[2],
		numArgs: 0
	};
}), $("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}"), $("\\TextOrMath", function(e) {
	var t = e.consumeArgs(2);
	return e.mode === "text" ? {
		tokens: t[0],
		numArgs: 0
	} : {
		tokens: t[1],
		numArgs: 0
	};
});
var gv = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	a: 10,
	A: 10,
	b: 11,
	B: 11,
	c: 12,
	C: 12,
	d: 13,
	D: 13,
	e: 14,
	E: 14,
	f: 15,
	F: 15
};
$("\\char", function(e) {
	var t = e.popToken(), n, r = 0;
	if (t.text === "'") n = 8, t = e.popToken();
	else if (t.text === "\"") n = 16, t = e.popToken();
	else if (t.text === "`") {
		if (t = e.popToken(), t.text[0] === "\\") r = t.text.charCodeAt(1);
		else if (t.text === "EOF") throw new I("\\char` missing argument");
		else r = t.text.charCodeAt(0);
	} else n = 10;
	if (n) {
		if (r = gv[t.text], r == null || r >= n) throw new I("Invalid base-" + n + " digit " + t.text);
		for (var i; (i = gv[e.future().text]) != null && i < n;) r *= n, r += i, e.popToken();
	}
	return "\\@char{" + r + "}";
});
var _v = (e, t, n, r) => {
	var i = e.consumeArg().tokens;
	if (i.length !== 1) throw new I("\\newcommand's first argument must be a macro name");
	var a = i[0].text, o = e.isDefined(a);
	if (o && !t) throw new I("\\newcommand{" + a + "} attempting to redefine " + (a + "; use \\renewcommand"));
	if (!o && !n) throw new I("\\renewcommand{" + a + "} when command " + a + " does not yet exist; use \\newcommand");
	var s = 0;
	if (i = e.consumeArg().tokens, i.length === 1 && i[0].text === "[") {
		for (var c = "", l = e.expandNextToken(); l.text !== "]" && l.text !== "EOF";) c += l.text, l = e.expandNextToken();
		if (!c.match(/^\s*[0-9]+\s*$/)) throw new I("Invalid number of arguments: " + c);
		s = parseInt(c), i = e.consumeArg().tokens;
	}
	return o && r || e.macros.set(a, {
		tokens: i,
		numArgs: s
	}), "";
};
$("\\newcommand", (e) => _v(e, !1, !0, !1)), $("\\renewcommand", (e) => _v(e, !0, !1, !1)), $("\\providecommand", (e) => _v(e, !0, !0, !0)), $("\\message", (e) => {
	var t = e.consumeArgs(1)[0];
	return console.log(t.reverse().map((e) => e.text).join("")), "";
}), $("\\errmessage", (e) => {
	var t = e.consumeArgs(1)[0];
	return console.error(t.reverse().map((e) => e.text).join("")), "";
}), $("\\show", (e) => {
	var t = e.popToken(), n = t.text;
	return console.log(t, e.macros.get(n), iv[n], $p.math[n], $p.text[n]), "";
}), $("\\bgroup", "{"), $("\\egroup", "}"), $("~", "\\nobreakspace"), $("\\lq", "`"), $("\\rq", "'"), $("\\aa", "\\r a"), $("\\AA", "\\r A"), $("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`©}"), $("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}"), $("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`®}"), $("ℬ", "\\mathscr{B}"), $("ℰ", "\\mathscr{E}"), $("ℱ", "\\mathscr{F}"), $("ℋ", "\\mathscr{H}"), $("ℐ", "\\mathscr{I}"), $("ℒ", "\\mathscr{L}"), $("ℳ", "\\mathscr{M}"), $("ℛ", "\\mathscr{R}"), $("ℭ", "\\mathfrak{C}"), $("ℌ", "\\mathfrak{H}"), $("ℨ", "\\mathfrak{Z}"), $("\\Bbbk", "\\Bbb{k}"), $("\\llap", "\\mathllap{\\textrm{#1}}"), $("\\rlap", "\\mathrlap{\\textrm{#1}}"), $("\\clap", "\\mathclap{\\textrm{#1}}"), $("\\mathstrut", "\\vphantom{(}"), $("\\underbar", "\\underline{\\text{#1}}"), $("\\not", "\\html@mathml{\\mathrel{\\mathrlap\\@not}\\nobreak}{\\char\"338}"), $("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`≠}}"), $("\\ne", "\\neq"), $("≠", "\\neq"), $("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`∉}}"), $("∉", "\\notin"), $("≘", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`≘}}"), $("≙", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`≘}}"), $("≚", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`≚}}"), $("≛", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`≛}}"), $("≝", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`≝}}"), $("≞", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`≞}}"), $("≟", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`≟}}"), $("⟂", "\\perp"), $("‼", "\\mathclose{!\\mkern-0.8mu!}"), $("∌", "\\notni"), $("⌜", "\\ulcorner"), $("⌝", "\\urcorner"), $("⌞", "\\llcorner"), $("⌟", "\\lrcorner"), $("©", "\\copyright"), $("®", "\\textregistered"), $("\\ulcorner", "\\html@mathml{\\@ulcorner}{\\mathop{\\char\"231c}}"), $("\\urcorner", "\\html@mathml{\\@urcorner}{\\mathop{\\char\"231d}}"), $("\\llcorner", "\\html@mathml{\\@llcorner}{\\mathop{\\char\"231e}}"), $("\\lrcorner", "\\html@mathml{\\@lrcorner}{\\mathop{\\char\"231f}}"), $("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}"), $("⋮", "\\vdots"), $("\\varGamma", "\\mathit{\\Gamma}"), $("\\varDelta", "\\mathit{\\Delta}"), $("\\varTheta", "\\mathit{\\Theta}"), $("\\varLambda", "\\mathit{\\Lambda}"), $("\\varXi", "\\mathit{\\Xi}"), $("\\varPi", "\\mathit{\\Pi}"), $("\\varSigma", "\\mathit{\\Sigma}"), $("\\varUpsilon", "\\mathit{\\Upsilon}"), $("\\varPhi", "\\mathit{\\Phi}"), $("\\varPsi", "\\mathit{\\Psi}"), $("\\varOmega", "\\mathit{\\Omega}"), $("\\substack", "\\begin{subarray}{c}#1\\end{subarray}"), $("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax"), $("\\boxed", "\\fbox{$\\displaystyle{#1}$}"), $("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;"), $("\\implies", "\\DOTSB\\;\\Longrightarrow\\;"), $("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;"), $("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}"), $("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
var vv = {
	",": "\\dotsc",
	"\\not": "\\dotsb",
	"+": "\\dotsb",
	"=": "\\dotsb",
	"<": "\\dotsb",
	">": "\\dotsb",
	"-": "\\dotsb",
	"*": "\\dotsb",
	":": "\\dotsb",
	"\\DOTSB": "\\dotsb",
	"\\coprod": "\\dotsb",
	"\\bigvee": "\\dotsb",
	"\\bigwedge": "\\dotsb",
	"\\biguplus": "\\dotsb",
	"\\bigcap": "\\dotsb",
	"\\bigcup": "\\dotsb",
	"\\prod": "\\dotsb",
	"\\sum": "\\dotsb",
	"\\bigotimes": "\\dotsb",
	"\\bigoplus": "\\dotsb",
	"\\bigodot": "\\dotsb",
	"\\bigsqcup": "\\dotsb",
	"\\And": "\\dotsb",
	"\\longrightarrow": "\\dotsb",
	"\\Longrightarrow": "\\dotsb",
	"\\longleftarrow": "\\dotsb",
	"\\Longleftarrow": "\\dotsb",
	"\\longleftrightarrow": "\\dotsb",
	"\\Longleftrightarrow": "\\dotsb",
	"\\mapsto": "\\dotsb",
	"\\longmapsto": "\\dotsb",
	"\\hookrightarrow": "\\dotsb",
	"\\doteq": "\\dotsb",
	"\\mathbin": "\\dotsb",
	"\\mathrel": "\\dotsb",
	"\\relbar": "\\dotsb",
	"\\Relbar": "\\dotsb",
	"\\xrightarrow": "\\dotsb",
	"\\xleftarrow": "\\dotsb",
	"\\DOTSI": "\\dotsi",
	"\\int": "\\dotsi",
	"\\oint": "\\dotsi",
	"\\iint": "\\dotsi",
	"\\iiint": "\\dotsi",
	"\\iiiint": "\\dotsi",
	"\\idotsint": "\\dotsi",
	"\\DOTSX": "\\dotsx"
}, yv = /* @__PURE__ */ new Set(["bin", "rel"]);
$("\\dots", function(e) {
	var t = "\\dotso", n = e.expandAfterFuture().text;
	return n in vv ? t = vv[n] : (n.slice(0, 4) === "\\not" || n in $p.math && yv.has($p.math[n].group)) && (t = "\\dotsb"), t;
});
var bv = {
	")": !0,
	"]": !0,
	"\\rbrack": !0,
	"\\}": !0,
	"\\rbrace": !0,
	"\\rangle": !0,
	"\\rceil": !0,
	"\\rfloor": !0,
	"\\rgroup": !0,
	"\\rmoustache": !0,
	"\\right": !0,
	"\\bigr": !0,
	"\\biggr": !0,
	"\\Bigr": !0,
	"\\Biggr": !0,
	$: !0,
	";": !0,
	".": !0,
	",": !0
};
$("\\dotso", function(e) {
	return e.future().text in bv ? "\\ldots\\," : "\\ldots";
}), $("\\dotsc", function(e) {
	var t = e.future().text;
	return t in bv && t !== "," ? "\\ldots\\," : "\\ldots";
}), $("\\cdots", function(e) {
	return e.future().text in bv ? "\\@cdots\\," : "\\@cdots";
}), $("\\dotsb", "\\cdots"), $("\\dotsm", "\\cdots"), $("\\dotsi", "\\!\\cdots"), $("\\dotsx", "\\ldots\\,"), $("\\DOTSI", "\\relax"), $("\\DOTSB", "\\relax"), $("\\DOTSX", "\\relax"), $("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax"), $("\\,", "\\tmspace+{3mu}{.1667em}"), $("\\thinspace", "\\,"), $("\\>", "\\mskip{4mu}"), $("\\:", "\\tmspace+{4mu}{.2222em}"), $("\\medspace", "\\:"), $("\\;", "\\tmspace+{5mu}{.2777em}"), $("\\thickspace", "\\;"), $("\\!", "\\tmspace-{3mu}{.1667em}"), $("\\negthinspace", "\\!"), $("\\negmedspace", "\\tmspace-{4mu}{.2222em}"), $("\\negthickspace", "\\tmspace-{5mu}{.277em}"), $("\\enspace", "\\kern.5em "), $("\\enskip", "\\hskip.5em\\relax"), $("\\quad", "\\hskip1em\\relax"), $("\\qquad", "\\hskip2em\\relax"), $("\\tag", "\\@ifstar\\tag@literal\\tag@paren"), $("\\tag@paren", "\\tag@literal{({#1})}"), $("\\tag@literal", (e) => {
	if (e.macros.get("\\df@tag")) throw new I("Multiple \\tag");
	return "\\gdef\\df@tag{\\text{#1}}";
}), $("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}"), $("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)"), $("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}"), $("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1"), $("\\newline", "\\\\\\relax"), $("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
var xv = R(Kp["Main-Regular"][84][1] - .7 * Kp["Main-Regular"][65][1]);
$("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + xv + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}"), $("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + xv + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}"), $("\\hspace", "\\@ifstar\\@hspacer\\@hspace"), $("\\@hspace", "\\hskip #1\\relax"), $("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax"), $("\\ordinarycolon", ":"), $("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}"), $("\\dblcolon", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char\"2237}}"), $("\\coloneqq", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char\"2254}}"), $("\\Coloneqq", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char\"2237\\char\"3d}}"), $("\\coloneq", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char\"3a\\char\"2212}}"), $("\\Coloneq", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char\"2237\\char\"2212}}"), $("\\eqqcolon", "\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char\"2255}}"), $("\\Eqqcolon", "\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char\"3d\\char\"2237}}"), $("\\eqcolon", "\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char\"2239}}"), $("\\Eqcolon", "\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char\"2212\\char\"2237}}"), $("\\colonapprox", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char\"3a\\char\"2248}}"), $("\\Colonapprox", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char\"2237\\char\"2248}}"), $("\\colonsim", "\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char\"3a\\char\"223c}}"), $("\\Colonsim", "\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char\"2237\\char\"223c}}"), $("∷", "\\dblcolon"), $("∹", "\\eqcolon"), $("≔", "\\coloneqq"), $("≕", "\\eqqcolon"), $("⩴", "\\Coloneqq"), $("\\ratio", "\\vcentcolon"), $("\\coloncolon", "\\dblcolon"), $("\\colonequals", "\\coloneqq"), $("\\coloncolonequals", "\\Coloneqq"), $("\\equalscolon", "\\eqqcolon"), $("\\equalscoloncolon", "\\Eqqcolon"), $("\\colonminus", "\\coloneq"), $("\\coloncolonminus", "\\Coloneq"), $("\\minuscolon", "\\eqcolon"), $("\\minuscoloncolon", "\\Eqcolon"), $("\\coloncolonapprox", "\\Colonapprox"), $("\\coloncolonsim", "\\Colonsim"), $("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}"), $("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}"), $("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}"), $("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}"), $("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`∌}}"), $("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}"), $("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}"), $("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}"), $("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}"), $("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}"), $("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}"), $("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}"), $("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}"), $("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{≩}"), $("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{≨}"), $("\\ngeqq", "\\html@mathml{\\@ngeqq}{≱}"), $("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{≱}"), $("\\nleqq", "\\html@mathml{\\@nleqq}{≰}"), $("\\nleqslant", "\\html@mathml{\\@nleqslant}{≰}"), $("\\nshortmid", "\\html@mathml{\\@nshortmid}{∤}"), $("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{∦}"), $("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{⊈}"), $("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{⊉}"), $("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{⊊}"), $("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{⫋}"), $("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{⊋}"), $("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{⫌}"), $("\\imath", "\\html@mathml{\\@imath}{ı}"), $("\\jmath", "\\html@mathml{\\@jmath}{ȷ}"), $("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`⟦}}"), $("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`⟧}}"), $("⟦", "\\llbracket"), $("⟧", "\\rrbracket"), $("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`⦃}}"), $("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`⦄}}"), $("⦃", "\\lBrace"), $("⦄", "\\rBrace"), $("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`⦵}}"), $("⦵", "\\minuso"), $("\\darr", "\\downarrow"), $("\\dArr", "\\Downarrow"), $("\\Darr", "\\Downarrow"), $("\\lang", "\\langle"), $("\\rang", "\\rangle"), $("\\uarr", "\\uparrow"), $("\\uArr", "\\Uparrow"), $("\\Uarr", "\\Uparrow"), $("\\N", "\\mathbb{N}"), $("\\R", "\\mathbb{R}"), $("\\Z", "\\mathbb{Z}"), $("\\alef", "\\aleph"), $("\\alefsym", "\\aleph"), $("\\Alpha", "\\mathrm{A}"), $("\\Beta", "\\mathrm{B}"), $("\\bull", "\\bullet"), $("\\Chi", "\\mathrm{X}"), $("\\clubs", "\\clubsuit"), $("\\cnums", "\\mathbb{C}"), $("\\Complex", "\\mathbb{C}"), $("\\Dagger", "\\ddagger"), $("\\diamonds", "\\diamondsuit"), $("\\empty", "\\emptyset"), $("\\Epsilon", "\\mathrm{E}"), $("\\Eta", "\\mathrm{H}"), $("\\exist", "\\exists"), $("\\harr", "\\leftrightarrow"), $("\\hArr", "\\Leftrightarrow"), $("\\Harr", "\\Leftrightarrow"), $("\\hearts", "\\heartsuit"), $("\\image", "\\Im"), $("\\infin", "\\infty"), $("\\Iota", "\\mathrm{I}"), $("\\isin", "\\in"), $("\\Kappa", "\\mathrm{K}"), $("\\larr", "\\leftarrow"), $("\\lArr", "\\Leftarrow"), $("\\Larr", "\\Leftarrow"), $("\\lrarr", "\\leftrightarrow"), $("\\lrArr", "\\Leftrightarrow"), $("\\Lrarr", "\\Leftrightarrow"), $("\\Mu", "\\mathrm{M}"), $("\\natnums", "\\mathbb{N}"), $("\\Nu", "\\mathrm{N}"), $("\\Omicron", "\\mathrm{O}"), $("\\plusmn", "\\pm"), $("\\rarr", "\\rightarrow"), $("\\rArr", "\\Rightarrow"), $("\\Rarr", "\\Rightarrow"), $("\\real", "\\Re"), $("\\reals", "\\mathbb{R}"), $("\\Reals", "\\mathbb{R}"), $("\\Rho", "\\mathrm{P}"), $("\\sdot", "\\cdot"), $("\\sect", "\\S"), $("\\spades", "\\spadesuit"), $("\\sub", "\\subset"), $("\\sube", "\\subseteq"), $("\\supe", "\\supseteq"), $("\\Tau", "\\mathrm{T}"), $("\\thetasym", "\\vartheta"), $("\\weierp", "\\wp"), $("\\Zeta", "\\mathrm{Z}"), $("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}"), $("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}"), $("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits"), $("\\bra", "\\mathinner{\\langle{#1}|}"), $("\\ket", "\\mathinner{|{#1}\\rangle}"), $("\\braket", "\\mathinner{\\langle{#1}\\rangle}"), $("\\Bra", "\\left\\langle#1\\right|"), $("\\Ket", "\\left|#1\\right\\rangle");
var Sv = (e) => (t) => {
	var n = t.consumeArg().tokens, r = t.consumeArg().tokens, i = t.consumeArg().tokens, a = t.consumeArg().tokens, o = t.macros.get("|"), s = t.macros.get("\\|");
	t.macros.beginGroup();
	var c = (t) => (n) => {
		e && (n.macros.set("|", o), i.length && n.macros.set("\\|", s));
		var a = t;
		return !t && i.length && n.future().text === "|" && (n.popToken(), a = !0), {
			tokens: a ? i : r,
			numArgs: 0
		};
	};
	t.macros.set("|", c(!1)), i.length && t.macros.set("\\|", c(!0));
	var l = t.consumeArg().tokens, u = t.expandTokens([
		...a,
		...l,
		...n
	]);
	return t.macros.endGroup(), {
		tokens: u.reverse(),
		numArgs: 0
	};
};
$("\\bra@ket", Sv(!1)), $("\\bra@set", Sv(!0)), $("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}"), $("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}"), $("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}"), $("\\angln", "{\\angl n}"), $("\\blue", "\\textcolor{##6495ed}{#1}"), $("\\orange", "\\textcolor{##ffa500}{#1}"), $("\\pink", "\\textcolor{##ff00af}{#1}"), $("\\red", "\\textcolor{##df0030}{#1}"), $("\\green", "\\textcolor{##28ae7b}{#1}"), $("\\gray", "\\textcolor{gray}{#1}"), $("\\purple", "\\textcolor{##9d38bd}{#1}"), $("\\blueA", "\\textcolor{##ccfaff}{#1}"), $("\\blueB", "\\textcolor{##80f6ff}{#1}"), $("\\blueC", "\\textcolor{##63d9ea}{#1}"), $("\\blueD", "\\textcolor{##11accd}{#1}"), $("\\blueE", "\\textcolor{##0c7f99}{#1}"), $("\\tealA", "\\textcolor{##94fff5}{#1}"), $("\\tealB", "\\textcolor{##26edd5}{#1}"), $("\\tealC", "\\textcolor{##01d1c1}{#1}"), $("\\tealD", "\\textcolor{##01a995}{#1}"), $("\\tealE", "\\textcolor{##208170}{#1}"), $("\\greenA", "\\textcolor{##b6ffb0}{#1}"), $("\\greenB", "\\textcolor{##8af281}{#1}"), $("\\greenC", "\\textcolor{##74cf70}{#1}"), $("\\greenD", "\\textcolor{##1fab54}{#1}"), $("\\greenE", "\\textcolor{##0d923f}{#1}"), $("\\goldA", "\\textcolor{##ffd0a9}{#1}"), $("\\goldB", "\\textcolor{##ffbb71}{#1}"), $("\\goldC", "\\textcolor{##ff9c39}{#1}"), $("\\goldD", "\\textcolor{##e07d10}{#1}"), $("\\goldE", "\\textcolor{##a75a05}{#1}"), $("\\redA", "\\textcolor{##fca9a9}{#1}"), $("\\redB", "\\textcolor{##ff8482}{#1}"), $("\\redC", "\\textcolor{##f9685d}{#1}"), $("\\redD", "\\textcolor{##e84d39}{#1}"), $("\\redE", "\\textcolor{##bc2612}{#1}"), $("\\maroonA", "\\textcolor{##ffbde0}{#1}"), $("\\maroonB", "\\textcolor{##ff92c6}{#1}"), $("\\maroonC", "\\textcolor{##ed5fa6}{#1}"), $("\\maroonD", "\\textcolor{##ca337c}{#1}"), $("\\maroonE", "\\textcolor{##9e034e}{#1}"), $("\\purpleA", "\\textcolor{##ddd7ff}{#1}"), $("\\purpleB", "\\textcolor{##c6b9fc}{#1}"), $("\\purpleC", "\\textcolor{##aa87ff}{#1}"), $("\\purpleD", "\\textcolor{##7854ab}{#1}"), $("\\purpleE", "\\textcolor{##543b78}{#1}"), $("\\mintA", "\\textcolor{##f5f9e8}{#1}"), $("\\mintB", "\\textcolor{##edf2df}{#1}"), $("\\mintC", "\\textcolor{##e0e5cc}{#1}"), $("\\grayA", "\\textcolor{##f6f7f7}{#1}"), $("\\grayB", "\\textcolor{##f0f1f2}{#1}"), $("\\grayC", "\\textcolor{##e3e5e6}{#1}"), $("\\grayD", "\\textcolor{##d6d8da}{#1}"), $("\\grayE", "\\textcolor{##babec2}{#1}"), $("\\grayF", "\\textcolor{##888d93}{#1}"), $("\\grayG", "\\textcolor{##626569}{#1}"), $("\\grayH", "\\textcolor{##3b3e40}{#1}"), $("\\grayI", "\\textcolor{##21242c}{#1}"), $("\\kaBlue", "\\textcolor{##314453}{#1}"), $("\\kaGreen", "\\textcolor{##71B307}{#1}");
var Cv = {
	"^": !0,
	_: !0,
	"\\limits": !0,
	"\\nolimits": !0
}, wv = class {
	constructor(e, t, n) {
		this.settings = void 0, this.expansionCount = void 0, this.lexer = void 0, this.macros = void 0, this.stack = void 0, this.mode = void 0, this.settings = t, this.expansionCount = 0, this.feed(e), this.macros = new mv(hv, t.macros), this.mode = n, this.stack = [];
	}
	feed(e) {
		this.lexer = new pv(e, this.settings);
	}
	switchMode(e) {
		this.mode = e;
	}
	beginGroup() {
		this.macros.beginGroup();
	}
	endGroup() {
		this.macros.endGroup();
	}
	endGroups() {
		this.macros.endGroups();
	}
	future() {
		return this.stack.length === 0 && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1];
	}
	popToken() {
		return this.future(), this.stack.pop();
	}
	pushToken(e) {
		this.stack.push(e);
	}
	pushTokens(e) {
		this.stack.push(...e);
	}
	scanArgument(e) {
		var t, n, r;
		if (e) {
			if (this.consumeSpaces(), this.future().text !== "[") return null;
			t = this.popToken(), {tokens: r, end: n} = this.consumeArg(["]"]);
		} else ({tokens: r, start: t, end: n} = this.consumeArg());
		return this.pushToken(new m_("EOF", n.loc)), this.pushTokens(r), new m_("", p_.range(t, n));
	}
	consumeSpaces() {
		for (; this.future().text === " ";) this.stack.pop();
	}
	consumeArg(e) {
		var t = [], n = e && e.length > 0;
		n || this.consumeSpaces();
		var r = this.future(), i, a = 0, o = 0;
		do {
			if (i = this.popToken(), t.push(i), i.text === "{") ++a;
			else if (i.text === "}") {
				if (--a, a === -1) throw new I("Extra }", i);
			} else if (i.text === "EOF") throw new I("Unexpected end of input in a macro argument, expected '" + (e && n ? e[o] : "}") + "'", i);
			if (e && n) {
				if ((a === 0 || a === 1 && e[o] === "{") && i.text === e[o]) {
					if (++o, o === e.length) {
						t.splice(-o, o);
						break;
					}
				} else o = 0;
			}
		} while (a !== 0 || n);
		return r.text === "{" && t[t.length - 1].text === "}" && (t.pop(), t.shift()), t.reverse(), {
			tokens: t,
			start: r,
			end: i
		};
	}
	consumeArgs(e, t) {
		if (t) {
			if (t.length !== e + 1) throw new I("The length of delimiters doesn't match the number of args!");
			for (var n = t[0], r = 0; r < n.length; r++) {
				var i = this.popToken();
				if (n[r] !== i.text) throw new I("Use of the macro doesn't match its definition", i);
			}
		}
		for (var a = [], o = 0; o < e; o++) a.push(this.consumeArg(t && t[o + 1]).tokens);
		return a;
	}
	countExpansion(e) {
		if (this.expansionCount += e, this.expansionCount > this.settings.maxExpand) throw new I("Too many expansions: infinite loop or need to increase maxExpand setting");
	}
	expandOnce(e) {
		var t = this.popToken(), n = t.text, r = t.noexpand ? null : this._getExpansion(n);
		if (r == null || e && r.unexpandable) {
			if (e && r == null && n[0] === "\\" && !this.isDefined(n)) throw new I("Undefined control sequence: " + n);
			return this.pushToken(t), !1;
		}
		this.countExpansion(1);
		var i = r.tokens, a = this.consumeArgs(r.numArgs, r.delimiters);
		if (r.numArgs) {
			i = i.slice();
			for (var o = i.length - 1; o >= 0; --o) {
				var s = i[o];
				if (s.text === "#") {
					if (o === 0) throw new I("Incomplete placeholder at end of macro body", s);
					if (s = i[--o], s.text === "#") i.splice(o + 1, 1);
					else if (/^[1-9]$/.test(s.text)) i.splice(o, 2, ...a[s.text - 1]);
					else throw new I("Not a valid argument number", s);
				}
			}
		}
		return this.pushTokens(i), i.length;
	}
	expandAfterFuture() {
		return this.expandOnce(), this.future();
	}
	expandNextToken() {
		for (;;) if (this.expandOnce() === !1) {
			var e = this.stack.pop();
			return e.treatAsRelax && (e.text = "\\relax"), e;
		}
	}
	expandMacro(e) {
		return this.macros.has(e) ? this.expandTokens([new m_(e)]) : void 0;
	}
	expandTokens(e) {
		var t = [], n = this.stack.length;
		for (this.pushTokens(e); this.stack.length > n;) if (this.expandOnce(!0) === !1) {
			var r = this.stack.pop();
			r.treatAsRelax &&= (r.noexpand = !1, !1), t.push(r);
		}
		return this.countExpansion(t.length), t;
	}
	expandMacroAsText(e) {
		var t = this.expandMacro(e);
		return t && t.map((e) => e.text).join("");
	}
	_getExpansion(e) {
		var t = this.macros.get(e);
		if (t == null) return t;
		if (e.length === 1) {
			var n = this.lexer.catcodes[e];
			if (n != null && n !== 13) return;
		}
		var r = typeof t == "function" ? t(this) : t;
		if (typeof r == "string") {
			var i = 0;
			if (r.includes("#")) for (var a = r.replace(/##/g, ""); a.includes("#" + (i + 1));) ++i;
			for (var o = new pv(r, this.settings), s = [], c = o.lex(); c.text !== "EOF";) s.push(c), c = o.lex();
			return s.reverse(), {
				tokens: s,
				numArgs: i
			};
		}
		return r;
	}
	isDefined(e) {
		return this.macros.has(e) || iv.hasOwnProperty(e) || $p.math.hasOwnProperty(e) || $p.text.hasOwnProperty(e) || Cv.hasOwnProperty(e);
	}
	isExpandable(e) {
		var t = this.macros.get(e);
		return t == null ? iv.hasOwnProperty(e) && !iv[e].primitive : typeof t == "string" || typeof t == "function" || !t.unexpandable;
	}
}, Tv = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/, Ev = Object.freeze({
	"₊": "+",
	"₋": "-",
	"₌": "=",
	"₍": "(",
	"₎": ")",
	"₀": "0",
	"₁": "1",
	"₂": "2",
	"₃": "3",
	"₄": "4",
	"₅": "5",
	"₆": "6",
	"₇": "7",
	"₈": "8",
	"₉": "9",
	ₐ: "a",
	ₑ: "e",
	ₕ: "h",
	ᵢ: "i",
	ⱼ: "j",
	ₖ: "k",
	ₗ: "l",
	ₘ: "m",
	ₙ: "n",
	ₒ: "o",
	ₚ: "p",
	ᵣ: "r",
	ₛ: "s",
	ₜ: "t",
	ᵤ: "u",
	ᵥ: "v",
	ₓ: "x",
	ᵦ: "β",
	ᵧ: "γ",
	ᵨ: "ρ",
	ᵩ: "ϕ",
	ᵪ: "χ",
	"⁺": "+",
	"⁻": "-",
	"⁼": "=",
	"⁽": "(",
	"⁾": ")",
	"⁰": "0",
	"¹": "1",
	"²": "2",
	"³": "3",
	"⁴": "4",
	"⁵": "5",
	"⁶": "6",
	"⁷": "7",
	"⁸": "8",
	"⁹": "9",
	ᴬ: "A",
	ᴮ: "B",
	ᴰ: "D",
	ᴱ: "E",
	ᴳ: "G",
	ᴴ: "H",
	ᴵ: "I",
	ᴶ: "J",
	ᴷ: "K",
	ᴸ: "L",
	ᴹ: "M",
	ᴺ: "N",
	ᴼ: "O",
	ᴾ: "P",
	ᴿ: "R",
	ᵀ: "T",
	ᵁ: "U",
	ⱽ: "V",
	ᵂ: "W",
	ᵃ: "a",
	ᵇ: "b",
	ᶜ: "c",
	ᵈ: "d",
	ᵉ: "e",
	ᶠ: "f",
	ᵍ: "g",
	ʰ: "h",
	ⁱ: "i",
	ʲ: "j",
	ᵏ: "k",
	ˡ: "l",
	ᵐ: "m",
	ⁿ: "n",
	ᵒ: "o",
	ᵖ: "p",
	ʳ: "r",
	ˢ: "s",
	ᵗ: "t",
	ᵘ: "u",
	ᵛ: "v",
	ʷ: "w",
	ˣ: "x",
	ʸ: "y",
	ᶻ: "z",
	ᵝ: "β",
	ᵞ: "γ",
	ᵟ: "δ",
	ᵠ: "ϕ",
	ᵡ: "χ",
	ᶿ: "θ"
}), Dv = {
	"́": {
		text: "\\'",
		math: "\\acute"
	},
	"̀": {
		text: "\\`",
		math: "\\grave"
	},
	"̈": {
		text: "\\\"",
		math: "\\ddot"
	},
	"̃": {
		text: "\\~",
		math: "\\tilde"
	},
	"̄": {
		text: "\\=",
		math: "\\bar"
	},
	"̆": {
		text: "\\u",
		math: "\\breve"
	},
	"̌": {
		text: "\\v",
		math: "\\check"
	},
	"̂": {
		text: "\\^",
		math: "\\hat"
	},
	"̇": {
		text: "\\.",
		math: "\\dot"
	},
	"̊": {
		text: "\\r",
		math: "\\mathring"
	},
	"̋": { text: "\\H" },
	"̧": { text: "\\c" }
}, Ov = {
	á: "á",
	à: "à",
	ä: "ä",
	ǟ: "ǟ",
	ã: "ã",
	ā: "ā",
	ă: "ă",
	ắ: "ắ",
	ằ: "ằ",
	ẵ: "ẵ",
	ǎ: "ǎ",
	â: "â",
	ấ: "ấ",
	ầ: "ầ",
	ẫ: "ẫ",
	ȧ: "ȧ",
	ǡ: "ǡ",
	å: "å",
	ǻ: "ǻ",
	ḃ: "ḃ",
	ć: "ć",
	ḉ: "ḉ",
	č: "č",
	ĉ: "ĉ",
	ċ: "ċ",
	ç: "ç",
	ď: "ď",
	ḋ: "ḋ",
	ḑ: "ḑ",
	é: "é",
	è: "è",
	ë: "ë",
	ẽ: "ẽ",
	ē: "ē",
	ḗ: "ḗ",
	ḕ: "ḕ",
	ĕ: "ĕ",
	ḝ: "ḝ",
	ě: "ě",
	ê: "ê",
	ế: "ế",
	ề: "ề",
	ễ: "ễ",
	ė: "ė",
	ȩ: "ȩ",
	ḟ: "ḟ",
	ǵ: "ǵ",
	ḡ: "ḡ",
	ğ: "ğ",
	ǧ: "ǧ",
	ĝ: "ĝ",
	ġ: "ġ",
	ģ: "ģ",
	ḧ: "ḧ",
	ȟ: "ȟ",
	ĥ: "ĥ",
	ḣ: "ḣ",
	ḩ: "ḩ",
	í: "í",
	ì: "ì",
	ï: "ï",
	ḯ: "ḯ",
	ĩ: "ĩ",
	ī: "ī",
	ĭ: "ĭ",
	ǐ: "ǐ",
	î: "î",
	ǰ: "ǰ",
	ĵ: "ĵ",
	ḱ: "ḱ",
	ǩ: "ǩ",
	ķ: "ķ",
	ĺ: "ĺ",
	ľ: "ľ",
	ļ: "ļ",
	ḿ: "ḿ",
	ṁ: "ṁ",
	ń: "ń",
	ǹ: "ǹ",
	ñ: "ñ",
	ň: "ň",
	ṅ: "ṅ",
	ņ: "ņ",
	ó: "ó",
	ò: "ò",
	ö: "ö",
	ȫ: "ȫ",
	õ: "õ",
	ṍ: "ṍ",
	ṏ: "ṏ",
	ȭ: "ȭ",
	ō: "ō",
	ṓ: "ṓ",
	ṑ: "ṑ",
	ŏ: "ŏ",
	ǒ: "ǒ",
	ô: "ô",
	ố: "ố",
	ồ: "ồ",
	ỗ: "ỗ",
	ȯ: "ȯ",
	ȱ: "ȱ",
	ő: "ő",
	ṕ: "ṕ",
	ṗ: "ṗ",
	ŕ: "ŕ",
	ř: "ř",
	ṙ: "ṙ",
	ŗ: "ŗ",
	ś: "ś",
	ṥ: "ṥ",
	š: "š",
	ṧ: "ṧ",
	ŝ: "ŝ",
	ṡ: "ṡ",
	ş: "ş",
	ẗ: "ẗ",
	ť: "ť",
	ṫ: "ṫ",
	ţ: "ţ",
	ú: "ú",
	ù: "ù",
	ü: "ü",
	ǘ: "ǘ",
	ǜ: "ǜ",
	ǖ: "ǖ",
	ǚ: "ǚ",
	ũ: "ũ",
	ṹ: "ṹ",
	ū: "ū",
	ṻ: "ṻ",
	ŭ: "ŭ",
	ǔ: "ǔ",
	û: "û",
	ů: "ů",
	ű: "ű",
	ṽ: "ṽ",
	ẃ: "ẃ",
	ẁ: "ẁ",
	ẅ: "ẅ",
	ŵ: "ŵ",
	ẇ: "ẇ",
	ẘ: "ẘ",
	ẍ: "ẍ",
	ẋ: "ẋ",
	ý: "ý",
	ỳ: "ỳ",
	ÿ: "ÿ",
	ỹ: "ỹ",
	ȳ: "ȳ",
	ŷ: "ŷ",
	ẏ: "ẏ",
	ẙ: "ẙ",
	ź: "ź",
	ž: "ž",
	ẑ: "ẑ",
	ż: "ż",
	Á: "Á",
	À: "À",
	Ä: "Ä",
	Ǟ: "Ǟ",
	Ã: "Ã",
	Ā: "Ā",
	Ă: "Ă",
	Ắ: "Ắ",
	Ằ: "Ằ",
	Ẵ: "Ẵ",
	Ǎ: "Ǎ",
	Â: "Â",
	Ấ: "Ấ",
	Ầ: "Ầ",
	Ẫ: "Ẫ",
	Ȧ: "Ȧ",
	Ǡ: "Ǡ",
	Å: "Å",
	Ǻ: "Ǻ",
	Ḃ: "Ḃ",
	Ć: "Ć",
	Ḉ: "Ḉ",
	Č: "Č",
	Ĉ: "Ĉ",
	Ċ: "Ċ",
	Ç: "Ç",
	Ď: "Ď",
	Ḋ: "Ḋ",
	Ḑ: "Ḑ",
	É: "É",
	È: "È",
	Ë: "Ë",
	Ẽ: "Ẽ",
	Ē: "Ē",
	Ḗ: "Ḗ",
	Ḕ: "Ḕ",
	Ĕ: "Ĕ",
	Ḝ: "Ḝ",
	Ě: "Ě",
	Ê: "Ê",
	Ế: "Ế",
	Ề: "Ề",
	Ễ: "Ễ",
	Ė: "Ė",
	Ȩ: "Ȩ",
	Ḟ: "Ḟ",
	Ǵ: "Ǵ",
	Ḡ: "Ḡ",
	Ğ: "Ğ",
	Ǧ: "Ǧ",
	Ĝ: "Ĝ",
	Ġ: "Ġ",
	Ģ: "Ģ",
	Ḧ: "Ḧ",
	Ȟ: "Ȟ",
	Ĥ: "Ĥ",
	Ḣ: "Ḣ",
	Ḩ: "Ḩ",
	Í: "Í",
	Ì: "Ì",
	Ï: "Ï",
	Ḯ: "Ḯ",
	Ĩ: "Ĩ",
	Ī: "Ī",
	Ĭ: "Ĭ",
	Ǐ: "Ǐ",
	Î: "Î",
	İ: "İ",
	Ĵ: "Ĵ",
	Ḱ: "Ḱ",
	Ǩ: "Ǩ",
	Ķ: "Ķ",
	Ĺ: "Ĺ",
	Ľ: "Ľ",
	Ļ: "Ļ",
	Ḿ: "Ḿ",
	Ṁ: "Ṁ",
	Ń: "Ń",
	Ǹ: "Ǹ",
	Ñ: "Ñ",
	Ň: "Ň",
	Ṅ: "Ṅ",
	Ņ: "Ņ",
	Ó: "Ó",
	Ò: "Ò",
	Ö: "Ö",
	Ȫ: "Ȫ",
	Õ: "Õ",
	Ṍ: "Ṍ",
	Ṏ: "Ṏ",
	Ȭ: "Ȭ",
	Ō: "Ō",
	Ṓ: "Ṓ",
	Ṑ: "Ṑ",
	Ŏ: "Ŏ",
	Ǒ: "Ǒ",
	Ô: "Ô",
	Ố: "Ố",
	Ồ: "Ồ",
	Ỗ: "Ỗ",
	Ȯ: "Ȯ",
	Ȱ: "Ȱ",
	Ő: "Ő",
	Ṕ: "Ṕ",
	Ṗ: "Ṗ",
	Ŕ: "Ŕ",
	Ř: "Ř",
	Ṙ: "Ṙ",
	Ŗ: "Ŗ",
	Ś: "Ś",
	Ṥ: "Ṥ",
	Š: "Š",
	Ṧ: "Ṧ",
	Ŝ: "Ŝ",
	Ṡ: "Ṡ",
	Ş: "Ş",
	Ť: "Ť",
	Ṫ: "Ṫ",
	Ţ: "Ţ",
	Ú: "Ú",
	Ù: "Ù",
	Ü: "Ü",
	Ǘ: "Ǘ",
	Ǜ: "Ǜ",
	Ǖ: "Ǖ",
	Ǚ: "Ǚ",
	Ũ: "Ũ",
	Ṹ: "Ṹ",
	Ū: "Ū",
	Ṻ: "Ṻ",
	Ŭ: "Ŭ",
	Ǔ: "Ǔ",
	Û: "Û",
	Ů: "Ů",
	Ű: "Ű",
	Ṽ: "Ṽ",
	Ẃ: "Ẃ",
	Ẁ: "Ẁ",
	Ẅ: "Ẅ",
	Ŵ: "Ŵ",
	Ẇ: "Ẇ",
	Ẍ: "Ẍ",
	Ẋ: "Ẋ",
	Ý: "Ý",
	Ỳ: "Ỳ",
	Ÿ: "Ÿ",
	Ỹ: "Ỹ",
	Ȳ: "Ȳ",
	Ŷ: "Ŷ",
	Ẏ: "Ẏ",
	Ź: "Ź",
	Ž: "Ž",
	Ẑ: "Ẑ",
	Ż: "Ż",
	ά: "ά",
	ὰ: "ὰ",
	ᾱ: "ᾱ",
	ᾰ: "ᾰ",
	έ: "έ",
	ὲ: "ὲ",
	ή: "ή",
	ὴ: "ὴ",
	ί: "ί",
	ὶ: "ὶ",
	ϊ: "ϊ",
	ΐ: "ΐ",
	ῒ: "ῒ",
	ῑ: "ῑ",
	ῐ: "ῐ",
	ό: "ό",
	ὸ: "ὸ",
	ύ: "ύ",
	ὺ: "ὺ",
	ϋ: "ϋ",
	ΰ: "ΰ",
	ῢ: "ῢ",
	ῡ: "ῡ",
	ῠ: "ῠ",
	ώ: "ώ",
	ὼ: "ὼ",
	Ύ: "Ύ",
	Ὺ: "Ὺ",
	Ϋ: "Ϋ",
	Ῡ: "Ῡ",
	Ῠ: "Ῠ",
	Ώ: "Ώ",
	Ὼ: "Ὼ"
}, kv = class e {
	constructor(e, t) {
		this.mode = void 0, this.gullet = void 0, this.settings = void 0, this.leftrightDepth = void 0, this.nextToken = void 0, this.mode = "math", this.gullet = new wv(e, t, this.mode), this.settings = t, this.leftrightDepth = 0, this.nextToken = null;
	}
	expect(e, t) {
		if (t === void 0 && (t = !0), this.fetch().text !== e) throw new I("Expected '" + e + "', got '" + this.fetch().text + "'", this.fetch());
		t && this.consume();
	}
	consume() {
		this.nextToken = null;
	}
	fetch() {
		return this.nextToken ??= this.gullet.expandNextToken(), this.nextToken;
	}
	switchMode(e) {
		this.mode = e, this.gullet.switchMode(e);
	}
	parse() {
		this.settings.globalGroup || this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set("\\color", "\\textcolor");
		try {
			var e = this.parseExpression(!1);
			return this.expect("EOF"), this.settings.globalGroup || this.gullet.endGroup(), e;
		} finally {
			this.gullet.endGroups();
		}
	}
	subparse(e) {
		var t = this.nextToken;
		this.consume(), this.gullet.pushToken(new m_("}")), this.gullet.pushTokens(e);
		var n = this.parseExpression(!1);
		return this.expect("}"), this.nextToken = t, n;
	}
	parseExpression(t, n) {
		for (var r = [];;) {
			this.mode === "math" && this.consumeSpaces();
			var i = this.fetch();
			if (e.endOfExpression.has(i.text) || n && i.text === n || t && iv[i.text] && iv[i.text].infix) break;
			var a = this.parseAtom(n);
			if (!a) break;
			a.type !== "internal" && r.push(a);
		}
		return this.mode === "text" && this.formLigatures(r), this.handleInfixNodes(r);
	}
	handleInfixNodes(e) {
		for (var t = -1, n, r = 0; r < e.length; r++) {
			var i = e[r];
			if (i.type === "infix") {
				if (t !== -1) throw new I("only one infix operator per group", i.token);
				t = r, n = i.replaceWith;
			}
		}
		if (t !== -1 && n) {
			var a, o, s = e.slice(0, t), c = e.slice(t + 1);
			return a = s.length === 1 && s[0].type === "ordgroup" ? s[0] : {
				type: "ordgroup",
				mode: this.mode,
				body: s
			}, o = c.length === 1 && c[0].type === "ordgroup" ? c[0] : {
				type: "ordgroup",
				mode: this.mode,
				body: c
			}, [n === "\\\\abovefrac" ? this.callFunction(n, [
				a,
				e[t],
				o
			], []) : this.callFunction(n, [a, o], [])];
		}
		return e;
	}
	handleSupSubscript(e) {
		var t = this.fetch(), n = t.text;
		this.consume(), this.consumeSpaces();
		var r;
		do
			r = this.parseGroup(e);
		while (r?.type === "internal");
		if (!r) throw new I("Expected group after '" + n + "'", t);
		return r;
	}
	formatUnsupportedCmd(e) {
		for (var t = [], n = 0; n < e.length; n++) t.push({
			type: "textord",
			mode: "text",
			text: e[n]
		});
		var r = {
			type: "text",
			mode: this.mode,
			body: t
		};
		return {
			type: "color",
			mode: this.mode,
			color: this.settings.errorColor,
			body: [r]
		};
	}
	parseAtom(e) {
		var t = this.parseGroup("atom", e);
		if (t?.type === "internal" || this.mode === "text") return t;
		for (var n, r;;) {
			this.consumeSpaces();
			var i = this.fetch();
			if (i.text === "\\limits" || i.text === "\\nolimits") {
				if (t && t.type === "op") t.limits = i.text === "\\limits", t.alwaysHandleSupSub = !0;
				else if (t && t.type === "operatorname") t.alwaysHandleSupSub && (t.limits = i.text === "\\limits");
				else throw new I("Limit controls must follow a math operator", i);
				this.consume();
			} else if (i.text === "^") {
				if (n) throw new I("Double superscript", i);
				n = this.handleSupSubscript("superscript");
			} else if (i.text === "_") {
				if (r) throw new I("Double subscript", i);
				r = this.handleSupSubscript("subscript");
			} else if (i.text === "'") {
				if (n) throw new I("Double superscript", i);
				var a = {
					type: "textord",
					mode: this.mode,
					text: "\\prime"
				}, o = [a];
				for (this.consume(); this.fetch().text === "'";) o.push(a), this.consume();
				this.fetch().text === "^" && o.push(this.handleSupSubscript("superscript")), n = {
					type: "ordgroup",
					mode: this.mode,
					body: o
				};
			} else if (Ev[i.text]) {
				var s = Tv.test(i.text), c = [];
				for (c.push(new m_(Ev[i.text])), this.consume();;) {
					var l = this.fetch().text;
					if (!Ev[l] || Tv.test(l) !== s) break;
					c.unshift(new m_(Ev[l])), this.consume();
				}
				var u = this.subparse(c);
				s ? r = {
					type: "ordgroup",
					mode: "math",
					body: u
				} : n = {
					type: "ordgroup",
					mode: "math",
					body: u
				};
			} else break;
		}
		return n || r ? {
			type: "supsub",
			mode: this.mode,
			base: t,
			sup: n,
			sub: r
		} : t;
	}
	parseFunction(e, t) {
		var n = this.fetch(), r = n.text, i = iv[r];
		if (!i) return null;
		if (this.consume(), t && t !== "atom" && !i.allowedInArgument) throw new I("Got function '" + r + "' with no arguments" + (t ? " as " + t : ""), n);
		if (this.mode === "text" && !i.allowedInText) throw new I("Can't use function '" + r + "' in text mode", n);
		if (this.mode === "math" && i.allowedInMath === !1) throw new I("Can't use function '" + r + "' in math mode", n);
		var { args: a, optArgs: o } = this.parseArguments(r, i);
		return this.callFunction(r, a, o, n, e);
	}
	callFunction(e, t, n, r, i) {
		var a = {
			funcName: e,
			parser: this,
			token: r,
			breakOnTokenText: i
		}, o = iv[e];
		if (o && o.handler) return o.handler(a, t, n);
		throw new I("No function handler for " + e);
	}
	parseArguments(e, t) {
		var n = t.numArgs + t.numOptionalArgs;
		if (n === 0) return {
			args: [],
			optArgs: []
		};
		for (var r = [], i = [], a = 0; a < n; a++) {
			var o = t.argTypes && t.argTypes[a], s = a < t.numOptionalArgs;
			("primitive" in t && t.primitive && o == null || t.type === "sqrt" && a === 1 && i[0] == null) && (o = "primitive");
			var c = this.parseGroupOfType("argument to '" + e + "'", o, s);
			if (s) i.push(c);
			else if (c != null) r.push(c);
			else throw new I("Null argument, please report this as a bug");
		}
		return {
			args: r,
			optArgs: i
		};
	}
	parseGroupOfType(e, t, n) {
		switch (t) {
			case "color": return this.parseColorGroup(n);
			case "size": return this.parseSizeGroup(n);
			case "url": return this.parseUrlGroup(n);
			case "math":
			case "text": return this.parseArgumentGroup(n, t);
			case "hbox":
				var r = this.parseArgumentGroup(n, "text");
				return r == null ? null : {
					type: "styling",
					mode: r.mode,
					body: [r],
					style: "text",
					resetFont: !0
				};
			case "raw":
				var i = this.parseStringGroup("raw", n);
				return i == null ? null : {
					type: "raw",
					mode: "text",
					string: i.text
				};
			case "primitive":
				if (n) throw new I("A primitive argument cannot be optional");
				var a = this.parseGroup(e);
				if (a == null) throw new I("Expected group as " + e, this.fetch());
				return a;
			case "original":
			case null:
			case void 0: return this.parseArgumentGroup(n);
			default: throw new I("Unknown group type as " + e, this.fetch());
		}
	}
	consumeSpaces() {
		for (; this.fetch().text === " ";) this.consume();
	}
	parseStringGroup(e, t) {
		var n = this.gullet.scanArgument(t);
		if (n == null) return null;
		for (var r = "", i; (i = this.fetch()).text !== "EOF";) r += i.text, this.consume();
		return this.consume(), n.text = r, n;
	}
	parseRegexGroup(e, t) {
		for (var n = this.fetch(), r = n, i = "", a; (a = this.fetch()).text !== "EOF" && e.test(i + a.text);) r = a, i += r.text, this.consume();
		if (i === "") throw new I("Invalid " + t + ": '" + n.text + "'", n);
		return n.range(r, i);
	}
	parseColorGroup(e) {
		var t = this.parseStringGroup("color", e);
		if (t == null) return null;
		var n = /^(#[a-f0-9]{3,4}|#[a-f0-9]{6}|#[a-f0-9]{8}|[a-f0-9]{6}|[a-z]+)$/i.exec(t.text);
		if (!n) throw new I("Invalid color: '" + t.text + "'", t);
		var r = n[0];
		return /^[0-9a-f]{6}$/i.test(r) && (r = "#" + r), {
			type: "color-token",
			mode: this.mode,
			color: r
		};
	}
	parseSizeGroup(e) {
		var t, n = !1;
		if (this.gullet.consumeSpaces(), t = !e && this.gullet.future().text !== "{" ? this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size") : this.parseStringGroup("size", e), !t) return null;
		!e && t.text.length === 0 && (t.text = "0pt", n = !0);
		var r = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t.text);
		if (!r) throw new I("Invalid size: '" + t.text + "'", t);
		var i = {
			number: +(r[1] + r[2]),
			unit: r[3]
		};
		if (!Dp(i)) throw new I("Invalid unit: '" + i.unit + "'", t);
		return {
			type: "size",
			mode: this.mode,
			value: i,
			isBlank: n
		};
	}
	parseUrlGroup(e) {
		this.gullet.lexer.setCatcode("%", 13), this.gullet.lexer.setCatcode("~", 12);
		var t = this.parseStringGroup("url", e);
		if (this.gullet.lexer.setCatcode("%", 14), this.gullet.lexer.setCatcode("~", 13), t == null) return null;
		var n = t.text.replace(/\\([#$%&~_^{}])/g, "$1");
		return {
			type: "url",
			mode: this.mode,
			url: n
		};
	}
	parseArgumentGroup(e, t) {
		var n = this.gullet.scanArgument(e);
		if (n == null) return null;
		var r = this.mode;
		t && this.switchMode(t), this.gullet.beginGroup();
		var i = this.parseExpression(!1, "EOF");
		this.expect("EOF"), this.gullet.endGroup();
		var a = {
			type: "ordgroup",
			mode: this.mode,
			loc: n.loc,
			body: i
		};
		return t && this.switchMode(r), a;
	}
	parseGroup(e, t) {
		var n = this.fetch(), r = n.text, i;
		if (r === "{" || r === "\\begingroup") {
			this.consume();
			var a = r === "{" ? "}" : "\\endgroup";
			this.gullet.beginGroup();
			var o = this.parseExpression(!1, a), s = this.fetch();
			this.expect(a), this.gullet.endGroup(), i = {
				type: "ordgroup",
				mode: this.mode,
				loc: p_.range(n, s),
				body: o,
				semisimple: r === "\\begingroup" || void 0
			};
		} else if (i = this.parseFunction(t, e) || this.parseSymbol(), i == null && r[0] === "\\" && !Cv.hasOwnProperty(r)) {
			if (this.settings.throwOnError) throw new I("Undefined control sequence: " + r, n);
			i = this.formatUnsupportedCmd(r), this.consume();
		}
		return i;
	}
	formLigatures(e) {
		for (var t = e.length - 1, n = 0; n < t; ++n) {
			var r = e[n];
			if (r.type === "textord") {
				var i = r.text, a = e[n + 1];
				if (a && a.type === "textord") {
					if (i === "-" && a.text === "-") {
						var o = e[n + 2];
						n + 1 < t && o && o.type === "textord" && o.text === "-" ? (e.splice(n, 3, {
							type: "textord",
							mode: "text",
							loc: p_.range(r, o),
							text: "---"
						}), t -= 2) : (e.splice(n, 2, {
							type: "textord",
							mode: "text",
							loc: p_.range(r, a),
							text: "--"
						}), --t);
					}
					(i === "'" || i === "`") && a.text === i && (e.splice(n, 2, {
						type: "textord",
						mode: "text",
						loc: p_.range(r, a),
						text: i + i
					}), --t);
				}
			}
		}
	}
	parseSymbol() {
		var e = this.fetch(), t = e.text;
		if (/^\\verb[^a-zA-Z]/.test(t)) {
			this.consume();
			var n = t.slice(5), r = n.charAt(0) === "*";
			if (r && (n = n.slice(1)), n.length < 2 || n.charAt(0) !== n.slice(-1)) throw new I("\\verb assertion failed --\n                    please report what input caused this bug");
			return n = n.slice(1, -1), {
				type: "verb",
				mode: "text",
				body: n,
				star: r
			};
		}
		Ov.hasOwnProperty(t[0]) && !$p[this.mode][t[0]] && (this.settings.strict && this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", "Accented Unicode text character \"" + t[0] + "\" used in math mode", e), t = Ov[t[0]] + t.slice(1));
		var i = dv.exec(t);
		i && (t = t.substring(0, i.index), t === "i" ? t = "ı" : t === "j" && (t = "ȷ"));
		var a;
		if ($p[this.mode][t]) {
			this.settings.strict && this.mode === "math" && xm.includes(t) && this.settings.reportNonstrict("unicodeTextInMathMode", "Latin-1/Unicode text character \"" + t[0] + "\" used in math mode", e);
			var o = $p[this.mode][t].group, s = p_.range(e);
			a = ag(o) ? {
				type: "atom",
				mode: this.mode,
				family: o,
				loc: s,
				text: t
			} : {
				type: o,
				mode: this.mode,
				loc: s,
				text: t
			};
		} else if (t.charCodeAt(0) >= 128) this.settings.strict && (lp(t.charCodeAt(0)) ? this.mode === "math" && this.settings.reportNonstrict("unicodeTextInMathMode", "Unicode text character \"" + t[0] + "\" used in math mode", e) : this.settings.reportNonstrict("unknownSymbol", "Unrecognized Unicode character \"" + t[0] + "\"" + (" (" + t.charCodeAt(0) + ")"), e)), a = {
			type: "textord",
			mode: "text",
			loc: p_.range(e),
			text: t
		};
		else return null;
		if (this.consume(), i) for (var c = 0; c < i[0].length; c++) {
			var l = i[0][c];
			if (!Dv[l]) throw new I("Unknown accent ' " + l + "'", e);
			var u = Dv[l][this.mode] || Dv[l].text;
			if (!u) throw new I("Accent " + l + " unsupported in " + this.mode + " mode", e);
			a = {
				type: "accent",
				mode: this.mode,
				loc: p_.range(e),
				label: u,
				isStretchy: !1,
				isShifty: !0,
				base: a
			};
		}
		return a;
	}
};
kv.endOfExpression = /* @__PURE__ */ new Set([
	"}",
	"\\endgroup",
	"\\end",
	"\\right",
	"&"
]);
var Av = function(e, t) {
	if (!(typeof e == "string" || e instanceof String)) throw TypeError("KaTeX can only parse string typed expression");
	var n = new kv(e, t);
	delete n.gullet.macros.current["\\df@tag"];
	var r = n.parse();
	if (delete n.gullet.macros.current["\\current@color"], delete n.gullet.macros.current["\\color"], n.gullet.macros.get("\\df@tag")) {
		if (!t.displayMode) throw new I("\\tag works only in display equations");
		r = [{
			type: "tag",
			mode: "text",
			body: r,
			tag: n.subparse([new m_("\\df@tag")])
		}];
	}
	return r;
}, jv = function(e, t, n) {
	t.textContent = "";
	var r = Fv(e, n).toNode();
	t.appendChild(r);
};
typeof document < "u" && document.compatMode !== "CSS1Compat" && (typeof console < "u" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype."), jv = function() {
	throw new I("KaTeX doesn't work in quirks mode.");
});
var Mv = function(e, t) {
	return Fv(e, t).toMarkup();
}, Nv = function(e, t) {
	return Av(e, new Uf(t));
}, Pv = function(e, t, n) {
	if (n.throwOnError || !(e instanceof I)) throw e;
	var r = Y(["katex-error"], [new zp(t)]);
	return r.setAttribute("title", e.toString()), r.setAttribute("style", "color:" + n.errorColor), r;
}, Fv = function(e, t) {
	var n = new Uf(t);
	try {
		return Yh(Av(e, n), e, n);
	} catch (t) {
		return Pv(t, e, n);
	}
}, Iv = {
	version: "0.16.47",
	render: jv,
	renderToString: Mv,
	ParseError: I,
	SETTINGS_SCHEMA: zf,
	__parse: Nv,
	__renderToDomTree: Fv,
	__renderToHTMLTree: function(e, t) {
		var n = new Uf(t);
		try {
			return Xh(Av(e, n), e, n);
		} catch (t) {
			return Pv(t, e, n);
		}
	},
	__setFontMetrics: Yp,
	__defineSymbol: z,
	__defineFunction: X,
	__defineMacro: $,
	__domTree: {
		Span: Fp,
		Anchor: Ip,
		SymbolNode: zp,
		SvgNode: Bp,
		PathNode: Vp,
		LineNode: Hp
	}
}, Lv = {}, Rv = [];
function zv(e) {
	let t = e || Lv;
	return function(e, n) {
		_s(e, "element", function(e, r) {
			let i = Array.isArray(e.properties.className) ? e.properties.className : Rv, a = i.includes("language-math"), o = i.includes("math-display"), s = i.includes("math-inline"), c = o;
			if (!a && !o && !s) return;
			let l = r[r.length - 1], u = e;
			/* c8 ignore next -- verbose to test. */
			if (e.tagName === "code" && a && l && l.type === "element" && l.tagName === "pre" && (u = l, l = r[r.length - 2], c = !0), !l) return;
			let d = bf(u, { whitespace: "pre" }), f;
			try {
				f = Iv.renderToString(d, {
					...t,
					displayMode: c,
					throwOnError: !0
				});
			} catch (i) {
				let a = i, o = a.name.toLowerCase();
				n.message("Could not render math with KaTeX", {
					ancestors: [...r, e],
					cause: a,
					place: e.position,
					ruleId: o,
					source: "rehype-katex"
				});
				try {
					f = Iv.renderToString(d, {
						...t,
						displayMode: c,
						strict: "ignore",
						throwOnError: !1
					});
				} catch {
					f = [{
						type: "element",
						tagName: "span",
						properties: {
							className: ["katex-error"],
							style: "color:" + (t.errorColor || "#cc0000"),
							title: String(i)
						},
						children: [{
							type: "text",
							value: d
						}]
					}];
				}
			}
			typeof f == "string" && (f = nf(f, { fragment: !0 }).children);
			let p = l.children.indexOf(u);
			return l.children.splice(p, 1, ...f), gs;
		});
	};
}
//#endregion
//#region src/components/Markdown.tsx
var Bv = { p: ({ children: e }) => /* @__PURE__ */ (0, C.jsx)(C.Fragment, { children: e }) }, Vv = { table: ({ children: e }) => /* @__PURE__ */ (0, C.jsx)("div", {
	className: "overflow-x-auto",
	children: /* @__PURE__ */ (0, C.jsx)("table", { children: e })
}) };
function Hv({ children: e, inline: t = !1, className: n }) {
	let r = /* @__PURE__ */ (0, C.jsx)(_c, {
		remarkPlugins: [bd, Md],
		rehypePlugins: [zv],
		components: t ? Bv : Vv,
		children: e
	});
	return t ? /* @__PURE__ */ (0, C.jsx)("span", {
		className: `markdown ${n ?? ""}`,
		children: r
	}) : /* @__PURE__ */ (0, C.jsx)("div", {
		className: `markdown ${n ?? ""}`,
		children: r
	});
}
//#endregion
//#region src/elements/multipleChoice/MultipleChoiceInput.tsx
function Uv(e) {
	return e.replace(/\$\$?([^$]*)\$\$?/g, "$1").replace(/[*_`]/g, "").trim();
}
function Wv(e) {
	return (e.part.display ?? "radio") === "dropdown" ? /* @__PURE__ */ (0, C.jsx)(Kv, { ...e }) : /* @__PURE__ */ (0, C.jsx)(Gv, { ...e });
}
function Gv({ part: e, id: t, labelId: n, describedBy: r, value: i, onChange: a, disabled: o, invalid: s }) {
	let c = Dt(e, i);
	return /* @__PURE__ */ (0, C.jsx)("div", {
		role: "radiogroup",
		id: t,
		"aria-labelledby": n,
		"aria-describedby": r,
		"aria-invalid": s || void 0,
		className: "flex basis-full flex-col gap-1.5",
		children: e.options.map((e, n) => {
			let r = `${t}-opt-${n}`, i = c === n;
			return /* @__PURE__ */ (0, C.jsxs)("label", {
				htmlFor: r,
				className: `flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 transition-colors ${i ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-950/50" : "border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/60"} ${o ? "cursor-not-allowed opacity-80" : ""}`,
				children: [/* @__PURE__ */ (0, C.jsx)("input", {
					type: "radio",
					id: r,
					name: t,
					value: n,
					checked: i,
					disabled: o,
					onChange: () => a(n),
					className: "mt-1 h-4 w-4 shrink-0 accent-indigo-600"
				}), /* @__PURE__ */ (0, C.jsx)(Hv, {
					inline: !0,
					className: "min-w-0 break-words",
					children: e.text
				})]
			}, r);
		})
	});
}
function Kv({ part: e, id: t, labelId: n, describedBy: r, value: i, onChange: a, disabled: o, invalid: s }) {
	let c = Dt(e, i);
	return /* @__PURE__ */ (0, C.jsxs)("select", {
		id: t,
		"aria-labelledby": n,
		"aria-describedby": r,
		"aria-invalid": s || void 0,
		disabled: o,
		value: c === null ? "" : String(c),
		onChange: (e) => {
			e.target.value !== "" && a(Number(e.target.value));
		},
		className: `max-w-full rounded-md border bg-white px-2 py-1.5 dark:bg-slate-900 ${s ? "border-red-500" : "border-slate-300 dark:border-slate-600"}`,
		children: [/* @__PURE__ */ (0, C.jsx)("option", {
			value: "",
			disabled: !0,
			children: "Select…"
		}), e.options.map((e, t) => /* @__PURE__ */ (0, C.jsx)("option", {
			value: String(t),
			children: Uv(e.text)
		}, t))]
	});
}
//#endregion
//#region src/elements/multipleChoice/prepareMultipleChoice.ts
function qv(e) {
	if (!Array.isArray(e.options) || e.options.length === 0) throw new k("multiple-choice needs at least one option.");
	let t = e.options.filter((e) => e.correct === !0).length;
	if (t !== 1) throw new k(`multiple-choice needs exactly one correct option (found ${t}).`);
	let n = /* @__PURE__ */ new Set();
	for (let t of e.options) {
		let e = t.text.trim();
		if (!e) throw new k("multiple-choice option text must not be empty.");
		if (n.has(e)) throw new k(`duplicate option text "${t.text}".`);
		n.add(e);
	}
	if (e.numberAnswers !== void 0) {
		let t = e.numberAnswers;
		if (!Number.isInteger(t) || t < 1 || t > e.options.length) throw new k(`numberAnswers must be an integer from 1 to ${e.options.length} (got ${t}).`);
	}
}
function Jv(e, t) {
	qv(e);
	let n = e.options;
	if (e.numberAnswers !== void 0) {
		let r = e.options.find((e) => e.correct), i = e.options.filter((e) => !e.correct), a = /* @__PURE__ */ new Set([r, ...t.sample(i, e.numberAnswers - 1)]);
		n = e.options.filter((e) => a.has(e));
	}
	let r = (e.order ?? "random") === "fixed" ? n : t.shuffle(n), { numberAnswers: i, ...a } = e;
	return {
		...a,
		options: r.map((e) => ({ ...e }))
	};
}
//#endregion
//#region src/elements/multipleChoice/index.ts
var Yv = {
	type: "multiple-choice",
	check: qv,
	prepare: Jv,
	validate: Ot,
	grade: kt,
	formatAnswer: At,
	formatCorrectAnswer: jt,
	Input: Wv
}, Xv = {
	comparison: "relabs",
	rtol: .01,
	atol: 1e-8,
	digits: 2
}, Zv = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;
function Qv(e) {
	if (typeof e != "string" || e.trim() === "") return {
		ok: !1,
		message: "Please enter a number"
	};
	let t = e.trim();
	if (!Zv.test(t)) return {
		ok: !1,
		message: `"${t}" is not a valid number. Use a decimal like 3.2 or scientific notation like 1.5e-3.`
	};
	let n = Number(t);
	return Number.isFinite(n) ? {
		ok: !0,
		value: n
	} : {
		ok: !1,
		message: `"${t}" is too large`
	};
}
function $v(e, t) {
	return e === 0 || !Number.isFinite(e) ? e : Number(e.toPrecision(t));
}
function ey(e, t) {
	return Number.isFinite(e) ? Number(e.toFixed(t)) : e;
}
function ty(e, t, n) {
	let r = n.comparison ?? Xv.comparison, i = n.digits ?? Xv.digits;
	switch (r) {
		case "relabs": {
			let r = n.rtol ?? Xv.rtol, i = n.atol ?? Xv.atol;
			return Math.abs(e - t) <= i + r * Math.abs(t);
		}
		case "sigfig": return $v(e, i) === $v(t, i);
		case "decdig": return ey(e, i) === ey(t, i);
	}
}
function ny(e) {
	if (typeof e.correct != "number" || !Number.isFinite(e.correct)) throw new k(`number part needs a finite "correct" value (got ${String(e.correct)}).`);
	let t = e.comparison ?? Xv.comparison;
	if (![
		"relabs",
		"sigfig",
		"decdig"
	].includes(t)) throw new k(`unknown comparison "${t}".`);
	if (e.rtol !== void 0 && !(e.rtol >= 0)) throw new k("rtol must be >= 0.");
	if (e.atol !== void 0 && !(e.atol >= 0)) throw new k("atol must be >= 0.");
	if (e.digits !== void 0) {
		let n = +(t === "sigfig");
		if (!Number.isInteger(e.digits) || e.digits < n || e.digits > 100) throw new k(`digits must be an integer from ${n} to 100.`);
	}
}
function ry(e, t) {
	let n = Qv(t);
	return n.ok ? { valid: !0 } : {
		valid: !1,
		message: n.message
	};
}
function iy(e, t) {
	let n = Qv(t);
	return n.ok ? { score: +!!ty(n.value, e.correct, e) } : { score: 0 };
}
function ay(e) {
	let t = e.comparison ?? Xv.comparison, n = e.digits ?? Xv.digits;
	return t === "sigfig" ? String($v(e.correct, n)) : t === "decdig" ? e.correct.toFixed(n) : String(Number(e.correct.toPrecision(12)));
}
function oy(e) {
	if (e.showHelpText === !1) return;
	let t = e.comparison ?? Xv.comparison, n = e.digits ?? Xv.digits, r = "Enter a number, e.g. 3.2, -0.5 or 1.5e-3.";
	if (t === "sigfig") return `${r} Graded to ${n} significant figure${n === 1 ? "" : "s"}.`;
	if (t === "decdig") return `${r} Graded to ${n} decimal place${n === 1 ? "" : "s"}.`;
	let i = e.rtol ?? Xv.rtol;
	return `${r} Accepted within ${Number((i * 100).toPrecision(3))}% relative error.`;
}
//#endregion
//#region src/elements/number/NumberInput.tsx
function sy(e) {
	return /* @__PURE__ */ (0, C.jsx)(wt, {
		...e,
		inputMode: "decimal",
		placeholder: "number"
	});
}
//#endregion
//#region src/elements/number/index.ts
var cy = {
	type: "number",
	check: ny,
	validate: ry,
	grade: iy,
	formatAnswer: (e, t) => typeof t == "string" && t.trim() ? `\`${t.trim()}\`` : "_(no answer)_",
	formatCorrectAnswer: (e) => ay(e) + (e.suffix ? ` ${e.suffix}` : ""),
	helpText: oy,
	Input: sy
};
b(Yv), b(cy), b(Et), b(vt);
//#endregion
//#region src/engine/gradeQuestion.ts
function ly(e, t) {
	let n = 0, r = 0;
	for (let i of e) {
		let e = i.weight ?? 1;
		n += e, r += e * dy(t[i.name]?.score ?? 0);
	}
	return n > 0 ? r / n : 0;
}
function uy(e, t) {
	let n = {}, r = !0;
	for (let i of e) {
		let e = x(i.type).validate(i, t[i.name]);
		n[i.name] = e, e.valid || (r = !1);
	}
	if (!r) return {
		valid: r,
		validation: n,
		results: {},
		score: 0
	};
	let i = {};
	for (let n of e) {
		let e = x(n.type).grade(n, t[n.name]);
		i[n.name] = {
			...e,
			score: dy(e.score)
		};
	}
	return {
		valid: r,
		validation: n,
		results: i,
		score: ly(e, i)
	};
}
function dy(e) {
	return Number.isFinite(e) ? Math.min(1, Math.max(0, e)) : 0;
}
//#endregion
//#region src/engine/rng.ts
function fy(e) {
	let t = e >>> 0;
	return () => {
		t = t + 1831565813 >>> 0;
		let e = t;
		return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
function py(e) {
	let t = 2166136261;
	for (let n = 0; n < e.length; n++) t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
	return t >>> 0;
}
function my(e, t) {
	return py(`${e >>> 0}:${t}`);
}
function hy(e) {
	let t = fy(e), n = (e, n) => {
		if (!Number.isInteger(e) || !Number.isInteger(n) || n < e) throw Error(`rng.int: invalid range [${e}, ${n}]`);
		return e + Math.floor(t() * (n - e + 1));
	}, r = (e, n, r) => {
		if (!(n >= e)) throw Error(`rng.float: invalid range [${e}, ${n}]`);
		let i = e + t() * (n - e);
		if (r === void 0) return i;
		let a = Number(i.toFixed(r));
		return Math.min(n, Math.max(e, a));
	}, i = (e) => {
		if (e.length === 0) throw Error("rng.pick: empty array");
		return e[n(0, e.length - 1)];
	}, a = (e) => {
		let t = e.slice();
		for (let e = t.length - 1; e > 0; e--) {
			let r = n(0, e);
			[t[e], t[r]] = [t[r], t[e]];
		}
		return t;
	};
	return {
		next: t,
		int: n,
		float: r,
		pick: i,
		shuffle: a,
		sample: (e, t) => {
			if (!Number.isInteger(t) || t < 0 || t > e.length) throw Error(`rng.sample: cannot take ${t} from ${e.length}`);
			return a(e).slice(0, t);
		}
	};
}
//#endregion
//#region src/engine/variant.ts
function gy(e, t) {
	if (t.length === 0) throw new k(`Question "${e}" has no parts.`);
	let n = /* @__PURE__ */ new Set(), r = 0;
	for (let i of t) {
		if (!i.name) throw new k(`Question "${e}": every part needs a name.`);
		let t = `Question "${e}", part "${i.name}"`;
		if (n.has(i.name)) throw new k(`${t}: duplicate part name.`);
		n.add(i.name);
		let a = i.weight ?? 1;
		if (!Number.isFinite(a) || a < 0) throw new k(`${t}: weight must be >= 0.`);
		r += a;
		try {
			x(i.type).check?.(i);
		} catch (e) {
			throw e instanceof k ? new k(`${t}: ${e.message}`) : e;
		}
	}
	if (r <= 0) throw new k(`Question "${e}": total part weight must be > 0.`);
}
function _y(e, t) {
	let n = hy(t), r = e.generate(n), i = e.render(r), a = e.parts(r);
	gy(e.id, a);
	let o = a.map((e) => {
		let n = x(e.type);
		return n.prepare ? n.prepare(e, hy(my(t, `part:${e.name}`))) : e;
	});
	return {
		questionId: e.id,
		seed: t,
		params: r,
		text: i,
		parts: o
	};
}
//#endregion
//#region src/engine/assessment.ts
function vy(e) {
	return e === "exam" ? 1 : null;
}
function yy(e, t, n, r) {
	return {
		version: 1,
		assessmentId: e.id,
		mode: e.mode,
		startedAt: r,
		currentIndex: 0,
		studentName: "",
		questions: e.questions.map((r) => {
			let i = t(r.questionId);
			if (!i) throw Error(`Assessment "${e.id}" references unknown question "${r.questionId}".`);
			let a = n();
			return {
				questionId: r.questionId,
				points: r.points,
				maxAttempts: r.maxAttempts ?? vy(e.mode),
				variant: 0,
				seed: a,
				preparedParts: _y(i, a).parts,
				draft: {},
				validation: null,
				submissions: [],
				bestScore: 0
			};
		})
	};
}
function by(e) {
	return e.submissions.length;
}
function xy(e) {
	return e.maxAttempts === null ? null : Math.max(0, e.maxAttempts - e.submissions.length);
}
function Sy(e) {
	return e.submissions.filter((t) => t.variant === e.variant);
}
function Cy(e) {
	let t = Sy(e);
	return t[t.length - 1];
}
function wy(e) {
	return Cy(e)?.score === 1 || xy(e) === 0;
}
function Ty(e) {
	return !wy(e);
}
function Ey(e, t) {
	return t === "exercise" && Sy(e).length > 0 && xy(e) !== 0;
}
function Dy(e) {
	return e.bestScore * e.points;
}
function Oy(e) {
	let t = 0, n = 0;
	for (let r of e.questions) t += Dy(r), n += r.points;
	return {
		earned: t,
		possible: n
	};
}
function ky(e, t, n) {
	let r = e.questions[t];
	if (!r) return e;
	let i = n(r);
	if (i === r) return e;
	let a = e.questions.slice();
	return a[t] = i, {
		...e,
		questions: a
	};
}
function Ay(e, t) {
	switch (t.type) {
		case "setValue": return ky(e, t.index, (e) => {
			if (wy(e)) return e;
			let n = e.validation ? { ...e.validation } : null;
			return n && delete n[t.part], {
				...e,
				draft: {
					...e.draft,
					[t.part]: t.value
				},
				validation: n
			};
		});
		case "submit": return ky(e, t.index, (e) => {
			if (!Ty(e)) return e;
			let n = uy(e.preparedParts, e.draft);
			if (!n.valid) return {
				...e,
				validation: n.validation
			};
			let r = {
				variant: e.variant,
				seed: e.seed,
				values: { ...e.draft },
				results: n.results,
				score: n.score,
				timestamp: t.timestamp
			};
			return {
				...e,
				validation: null,
				submissions: [...e.submissions, r],
				bestScore: Math.max(e.bestScore, n.score)
			};
		});
		case "newVariant": return ky(e, t.index, (n) => Ey(n, e.mode) ? {
			...n,
			variant: n.variant + 1,
			seed: t.seed,
			preparedParts: t.preparedParts,
			draft: {},
			validation: null
		} : n);
		case "goTo": return t.index < 0 || t.index >= e.questions.length || t.index === e.currentIndex ? e : {
			...e,
			currentIndex: t.index
		};
		case "setStudentName": return {
			...e,
			studentName: t.name
		};
		case "replace": return t.state;
	}
}
//#endregion
//#region src/engine/seed.ts
function jy() {
	try {
		let e = /* @__PURE__ */ new Uint32Array(1);
		return crypto.getRandomValues(e), e[0];
	} catch {
		return (Date.now() ^ Math.floor(performance.now() * 1e3)) >>> 0;
	}
}
//#endregion
//#region src/engine/storage.ts
var My = "assess:v1:";
function Ny(e) {
	return `${My}${e}`;
}
function Py(e) {
	let t;
	try {
		t = localStorage.getItem(Ny(e.id));
	} catch {
		return null;
	}
	if (!t) return null;
	try {
		let n = JSON.parse(t);
		return Ry(n, e) ? n : null;
	} catch {
		return null;
	}
}
function Fy(e) {
	try {
		return localStorage.setItem(Ny(e.assessmentId), JSON.stringify(e)), !0;
	} catch {
		return !1;
	}
}
function Iy(e) {
	try {
		localStorage.removeItem(Ny(e));
	} catch {}
}
function Ly(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Ry(e, t) {
	return !Ly(e) || e.version !== 1 || e.assessmentId !== t.id || e.mode !== t.mode || typeof e.currentIndex != "number" || typeof e.startedAt != "string" || !Array.isArray(e.questions) || e.questions.length !== t.questions.length ? !1 : e.questions.every((e, n) => Ly(e) ? e.questionId === t.questions[n].questionId && typeof e.seed == "number" && typeof e.variant == "number" && Array.isArray(e.preparedParts) && Array.isArray(e.submissions) && Ly(e.draft) && typeof e.bestScore == "number" : !1);
}
//#endregion
//#region src/questions/q01_price_elasticity.ts
function zy({ p1: e, p2: t, q1: n, q2: r }) {
	let i = (r - n) / ((n + r) / 2), a = (t - e) / ((e + t) / 2);
	return Math.abs(i / a);
}
var By = {
	id: "price-elasticity-midpoint",
	title: "Price elasticity of demand (midpoint method)",
	generate: (e) => {
		let t = e.int(2, 20), n = e.int(60, 200);
		return {
			p1: t,
			p2: t + e.int(1, 6),
			q1: n,
			q2: n - e.int(5, 50)
		};
	},
	render: ({ p1: e, p2: t, q1: n, q2: r }) => `When the price of coffee rises from $${e}$ to $${t}$ dollars per pound, the quantity demanded falls from $${n}$ to $${r}$ pounds per week.\n\nUsing the midpoint method, compute the **absolute value** of the price elasticity of demand:\n\n$$\n|E_d| = \\left| \\frac{(Q_2 - Q_1) \\big/ \\frac{Q_1 + Q_2}{2}}{(P_2 - P_1) \\big/ \\frac{P_1 + P_2}{2}} \\right|\n$$`,
	parts: (e) => [{
		type: "number",
		name: "Ed",
		label: "$|E_d| =$",
		correct: zy(e),
		comparison: "relabs",
		rtol: .01
	}]
}, Vy = [
	{
		kind: "normal good",
		definition: "Demand increases when consumer income increases."
	},
	{
		kind: "inferior good",
		definition: "Demand decreases when consumer income increases."
	},
	{
		kind: "pair of substitute goods",
		definition: "A rise in the price of one increases the demand for the other."
	},
	{
		kind: "pair of complementary goods",
		definition: "A rise in the price of one decreases the demand for the other."
	},
	{
		kind: "public good",
		definition: "It is both non-excludable and non-rival in consumption."
	},
	{
		kind: "common resource",
		definition: "It is rival in consumption but non-excludable."
	},
	{
		kind: "club good",
		definition: "It is excludable but non-rival in consumption."
	},
	{
		kind: "luxury good",
		definition: "Its income elasticity of demand is greater than $1$."
	},
	{
		kind: "necessity",
		definition: "Its income elasticity of demand is between $0$ and $1$."
	}
], Hy = {
	id: "types-of-goods",
	title: "Types of goods",
	generate: (e) => ({ index: e.int(0, Vy.length - 1) }),
	render: ({ index: e }) => `Which statement describes a **${Vy[e].kind}**?`,
	parts: ({ index: e }) => [{
		type: "multiple-choice",
		name: "definition",
		numberAnswers: 4,
		options: Vy.map((t, n) => ({
			text: t.definition,
			correct: n === e,
			feedback: n === e ? void 0 : `That describes a ${t.kind}.`
		}))
	}]
}, Uy = ({ a: e, b: t, c: n, d: r }) => (e - n) / (t + r), Wy = {
	shortage: "A shortage: quantity demanded exceeds quantity supplied.",
	surplus: "A surplus: quantity supplied exceeds quantity demanded.",
	none: "No effect: the market stays at the equilibrium price and quantity."
};
function Gy({ policy: e, binding: t }) {
	return t ? e === "ceiling" ? "shortage" : "surplus" : "none";
}
var Ky = {
	id: "market-equilibrium-mixed",
	title: "Market equilibrium and price controls (mixed)",
	generate: (e) => {
		let t = e.int(80, 160), n = e.int(1, 5), r = e.int(0, 20), i = e.int(1, 5), a = e.pick(["ceiling", "floor"]), o = e.pick([!0, !1]), s = Uy({
			a: t,
			b: n,
			c: r,
			d: i
		}), c = a === "ceiling" === o, l = e.int(2, 5);
		return {
			a: t,
			b: n,
			c: r,
			d: i,
			policy: a,
			binding: o,
			level: c ? Math.floor(s) - l : Math.ceil(s) + l
		};
	},
	render: ({ a: e, b: t, c: n, d: r, policy: i, level: a }) => `In a competitive market, demand and supply are\n\n$$\nQ_d = ${e} - ${t}P, \\qquad Q_s = ${n} + ${r}P\n$$\n\nwhere $P$ is the price in dollars.\n\n**(a)** Find the equilibrium price $P^*$.\n\n**(b)** The government imposes a price **${i}** of $${a}$ dollars. What happens in this market?`,
	parts: (e) => [{
		type: "number",
		name: "price",
		label: "**(a)** $P^* =$",
		correct: Uy(e),
		rtol: .01,
		suffix: "dollars",
		weight: 2
	}, {
		type: "multiple-choice",
		name: "control",
		label: "**(b)**",
		weight: 1,
		order: "fixed",
		options: Object.keys(Wy).map((t) => ({
			text: Wy[t],
			correct: t === Gy(e),
			feedback: t === Gy(e) ? void 0 : "Compare the controlled price with the equilibrium price from (a). Does the control stop the market from reaching it?"
		}))
	}]
}, qy = {
	id: "firm-profit-integer",
	title: "Profit of a firm",
	generate: (e) => ({
		q: e.int(20, 300),
		p: e.int(10, 40),
		avc: e.int(5, 35),
		fc: e.int(10, 80) * 50
	}),
	render: ({ q: e, p: t, avc: n, fc: r }) => `A firm sells $${e}$ units at a price of $${t}$ dollars each. Its average variable cost is $${n}$ dollars per unit and its fixed cost is $${r}$ dollars.\n\nCompute the firm's profit $\\pi = TR - TC$. Enter a negative number for a loss.`,
	parts: ({ q: e, p: t, avc: n, fc: r }) => [{
		type: "integer",
		name: "profit",
		label: "$\\pi =$",
		correct: t * e - (n * e + r),
		suffix: "dollars"
	}]
}, Jy = {
	id: "present-value-sigfig",
	title: "Present value (significant figures)",
	generate: (e) => ({
		fv: e.int(10, 100) * 100,
		r: e.float(1.5, 9.5, 1),
		n: e.int(2, 15)
	}),
	render: ({ fv: e, r: t, n }) => `You will receive $${e}$ dollars in $${n}$ years. The annual interest rate is $${t}\\%$, compounded yearly.\n\nCompute the present value $PV = \\dfrac{FV}{(1 + r)^n}$ and give your answer to **3 significant figures**.`,
	parts: ({ fv: e, r: t, n }) => [{
		type: "number",
		name: "PV",
		label: "$PV =$",
		correct: e / (1 + t / 100) ** n,
		comparison: "sigfig",
		digits: 3,
		suffix: "dollars"
	}]
}, Yy = [
	{
		description: "a tax on imported goods",
		term: "tariff"
	},
	{
		description: "a limit on the quantity of a good that may be imported",
		term: "quota"
	},
	{
		description: "a legal maximum price",
		term: "price ceiling"
	},
	{
		description: "a legal minimum price",
		term: "price floor"
	},
	{
		description: "a government payment to producers for each unit produced",
		term: "subsidy"
	},
	{
		description: "the value of the next best alternative given up",
		term: "opportunity cost"
	},
	{
		description: "a sustained rise in the general price level",
		term: "inflation"
	},
	{
		description: "a market with a single seller and no close substitutes",
		term: "monopoly"
	},
	{
		description: "a market dominated by a few interdependent firms",
		term: "oligopoly"
	},
	{
		description: "a cost imposed on third parties outside a transaction",
		term: "negative externality"
	}
], Xy = {
	id: "economic-terms-dropdown",
	title: "Economic terms (dropdown)",
	generate: (e) => ({ index: e.int(0, Yy.length - 1) }),
	render: () => "Complete the sentence.",
	parts: ({ index: e }) => [{
		type: "multiple-choice",
		name: "term",
		display: "dropdown",
		numberAnswers: 4,
		label: `The economic term for **${Yy[e].description}** is`,
		suffix: ".",
		options: Yy.map((t, n) => ({
			text: t.term,
			correct: n === e
		}))
	}]
}, Zy = 30;
function Qy({ a: e, c: t, d: n, t: r }) {
	let i = (e - t) / (1 + n), a = (e - t - r) / (1 + n), o = e - a;
	return {
		q0: i,
		p0: e - i,
		qt: a,
		buyers: o,
		sellers: o - r
	};
}
var $y = (e) => e === 1 ? "" : String(e), eb = {
	id: "tax-incidence-drawing",
	title: "A per-unit tax (drawing)",
	generate: (e) => ({
		a: e.int(20, 28),
		c: e.int(2, 6),
		d: e.pick([.5, 1]),
		t: e.int(4, 7)
	}),
	render: ({ a: e, c: t, d: n, t: r }) => `A market has demand $P = ${e} - Q$ and supply $P = ${t} + ${$y(n)}Q$, shown on the graph. The government imposes a tax of $${r}$ dollars per unit on **sellers**.\n\n**(a)** On the graph: shift the supply curve to show the tax, mark the new equilibrium, and shade the deadweight loss.\n\n**(b)** What price do buyers pay after the tax?`,
	parts: (e) => {
		let { a: t, c: n, d: r, t: i } = e, { q0: a, p0: o, qt: s, buyers: c, sellers: l } = Qy(e), u = (e) => ({
			from: [0, n + e],
			to: [Zy, n + e + r * Zy]
		});
		return [{
			type: "drawing",
			name: "graph",
			label: "**(a)**",
			weight: 3,
			x: {
				max: Zy,
				label: "Quantity",
				snap: .5
			},
			y: {
				max: 30,
				label: "Price (dollars)",
				snap: .5
			},
			initial: [{
				type: "line",
				id: "D",
				from: [0, t],
				to: [t, 0],
				label: "D"
			}, {
				type: "line",
				id: "S1",
				...u(0),
				label: "S₁"
			}],
			tools: [
				{
					type: "line",
					copyOf: "S1",
					label: "new supply curve",
					tag: "S₂"
				},
				{
					type: "point",
					label: "new equilibrium"
				},
				{
					type: "polygon",
					vertices: 3,
					label: "deadweight loss",
					tag: "DWL"
				}
			],
			answer: [
				{
					type: "line",
					label: "new supply curve",
					...u(i)
				},
				{
					type: "point",
					label: "new equilibrium",
					x: s,
					y: c
				},
				{
					type: "polygon",
					label: "deadweight loss",
					points: [
						[s, c],
						[s, l],
						[a, o]
					],
					minOverlap: .6
				}
			]
		}, {
			type: "number",
			name: "buyers",
			label: "**(b)** Buyers pay $P_B =$",
			correct: c,
			rtol: .01,
			suffix: "dollars"
		}];
	}
}, tb = 20, nb = {
	id: "indifference-curve-drawing",
	title: "Optimal bundle and indifference curve (drawing)",
	generate: (e) => ({
		m: 2 * e.int(5, 10),
		px: e.pick([1, 2]),
		py: e.pick([1, 2])
	}),
	render: ({ m: e, px: t, py: n }) => `A consumer has utility $U(x, y) = xy$, income $M = ${e}$ dollars, and faces prices $p_x = ${t}$ and $p_y = ${n}$ dollars. Their budget line is drawn on the graph.\n\n**(a)** Add a curve and shape it into the indifference curve that is tangent to the budget line. Put **one of its two middle points at the optimal bundle** and the other middle point on the same indifference curve.\n\n**(b)** How many units of good $x$ does the consumer buy?`,
	parts: ({ m: e, px: t, py: n }) => {
		let r = e / (2 * t), i = e / (2 * n), a = r * i;
		return [{
			type: "drawing",
			name: "graph",
			label: "**(a)**",
			weight: 2,
			x: {
				max: tb,
				label: "Good x"
			},
			y: {
				max: tb,
				label: "Good y"
			},
			initial: [{
				type: "line",
				id: "budget",
				from: [0, e / n],
				to: [e / t, 0],
				label: "Budget line"
			}],
			tools: [{
				type: "curve",
				label: "indifference curve",
				tag: "U"
			}],
			answer: [{
				type: "curve",
				label: "indifference curve",
				points: le((e) => a / e, a / tb, tb, 80),
				relation: "on",
				through: [r, i]
			}]
		}, {
			type: "number",
			name: "x",
			label: "**(b)** $x^* =$",
			correct: r,
			rtol: .01,
			suffix: "units"
		}];
	}
}, rb = [
	{
		text: "Consumer incomes rise, and the good is a **normal** good.",
		shift: "right"
	},
	{
		text: "Consumer incomes rise, and the good is an **inferior** good.",
		shift: "left"
	},
	{
		text: "The price of a **substitute** good rises.",
		shift: "right"
	},
	{
		text: "The price of a **complementary** good rises.",
		shift: "left"
	},
	{
		text: "Consumers expect the price of the good to rise next month.",
		shift: "right"
	},
	{
		text: "The number of buyers in the market falls.",
		shift: "left"
	},
	{
		text: "A successful advertising campaign makes the good more popular.",
		shift: "right"
	},
	{
		text: "Consumer incomes fall, and the good is a **normal** good.",
		shift: "left"
	}
], ib = {
	id: "demand-shift-drawing",
	title: "Shifts in demand (drawing)",
	generate: (e) => ({
		index: e.int(0, rb.length - 1),
		a: e.int(12, 17)
	}),
	render: ({ index: e }) => `${rb[e].text}\n\n**(a)** Add a copy of the demand curve $D_1$ and move it to show the new demand curve.\n\n**(b)** If supply doesn't change, what happens to the equilibrium price?`,
	parts: ({ index: e, a: t }) => {
		let n = rb[e].shift;
		return [{
			type: "drawing",
			name: "graph",
			label: "**(a)**",
			weight: 2,
			x: {
				max: 20,
				label: "Quantity"
			},
			y: {
				max: 20,
				label: "Price (dollars)"
			},
			initial: [{
				type: "line",
				id: "D1",
				from: [0, t],
				to: [t, 0],
				label: "D₁"
			}, {
				type: "line",
				id: "S",
				from: [0, 2],
				to: [20, 22],
				label: "S"
			}],
			tools: [{
				type: "line",
				copyOf: "D1",
				label: "new demand curve",
				tag: "D₂"
			}],
			answer: [{
				type: "line",
				label: "new demand curve",
				shiftOf: {
					from: [0, t],
					to: [t, 0]
				},
				direction: n
			}]
		}, {
			type: "multiple-choice",
			name: "price",
			label: "**(b)**",
			order: "fixed",
			options: [
				{
					text: "It rises.",
					correct: n === "right"
				},
				{
					text: "It falls.",
					correct: n === "left"
				},
				{
					text: "It stays the same.",
					feedback: "A shift in demand moves the equilibrium along the supply curve."
				}
			]
		}];
	}
}, ab = [
	"bicycles",
	"textbooks",
	"coffee makers",
	"backpacks",
	"umbrellas",
	"desk lamps",
	"sneakers",
	"board games"
];
function ob({ goods: e, prices: t, quantities: n }, r) {
	return e.reduce((e, i, a) => e + t[r][a] * n[r][a], 0);
}
function sb({ goods: e, prices: t, quantities: n }, r, i = 0) {
	return e.reduce((e, a, o) => e + t[i][o] * n[r][o], 0);
}
function cb({ goods: e, years: t, prices: n, quantities: r }) {
	return [
		`| Year | ${e.map((e) => `${e} price | ${e} quantity`).join(" | ")} |`,
		`|---|${e.map(() => "---|---").join("|")}|`,
		...t.map((t, i) => `| ${t} | ${e.map((e, t) => `${n[i][t]} | ${r[i][t]}`).join(" | ")} |`)
	].join("\n");
}
//#endregion
//#region src/questions/index.ts
var lb = [
	By,
	Hy,
	Ky,
	qy,
	Jy,
	Xy,
	eb,
	nb,
	ib,
	{
		id: "gdp-deflator",
		title: "Nominal GDP, real GDP, and the GDP deflator",
		generate: (e) => {
			let t = e.sample(ab, 2), n = e.int(2019, 2022), r = [
				n,
				n + 1,
				n + 2
			];
			return {
				goods: t,
				years: r,
				prices: r.map(() => t.map(() => e.int(2, 20))),
				quantities: r.map(() => t.map(() => e.int(10, 100)))
			};
		},
		render: (e) => `This small economy produces only the goods below. Prices are in dollars per unit, and ${e.years[0]} is the **base year**.\n\n${cb(e)}\n\n**(a)** Compute nominal GDP in ${e.years[2]}: the value of ${e.years[2]}'s output at ${e.years[2]} prices.\n\n**(b)** Compute real GDP in ${e.years[2]}: the value of ${e.years[2]}'s output at ${e.years[0]} (base-year) prices.\n\n**(c)** Compute the GDP deflator for ${e.years[2]}. `,
		parts: (e) => {
			let t = ob(e, 2), n = sb(e, 2);
			return [
				{
					type: "number",
					name: "nominal",
					label: "**(a)** Nominal GDP $=$",
					correct: t,
					rtol: .01,
					suffix: "dollars"
				},
				{
					type: "number",
					name: "real",
					label: "**(b)** Real GDP $=$",
					correct: n,
					rtol: .01,
					suffix: "dollars"
				},
				{
					type: "number",
					name: "deflator",
					label: "**(c)** GDP deflator $=$",
					correct: t / n * 100,
					rtol: .01,
					atol: .01
				}
			];
		}
	}
], ub = new Map(lb.map((e) => [e.id, e]));
if (ub.size !== lb.length) throw Error("Duplicate question ids in the question bank.");
function db(e) {
	return ub.get(e);
}
//#endregion
//#region src/components/AssessmentContext.tsx
var fb = (0, _.createContext)(null);
function pb({ assessment: e, bank: t = db, nextSeed: n = jy, children: r }) {
	let i = () => yy(e, t, n, (/* @__PURE__ */ new Date()).toISOString()), [a, o] = (0, _.useReducer)(Ay, void 0, () => Py(e) ?? i()), [s, c] = (0, _.useState)(!0), l = (0, _.useRef)(a);
	l.current = a, (0, _.useEffect)(() => {
		c(Fy(a));
	}, [a]);
	let u = (0, _.useMemo)(() => ({
		setValue: (e, t, n) => o({
			type: "setValue",
			index: e,
			part: t,
			value: n
		}),
		submit: (e) => o({
			type: "submit",
			index: e,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		}),
		newVariant: (e) => {
			let r = l.current.questions[e], i = r && t(r.questionId);
			if (!i) return;
			let a = n();
			o({
				type: "newVariant",
				index: e,
				seed: a,
				preparedParts: _y(i, a).parts
			});
		},
		goTo: (e) => o({
			type: "goTo",
			index: e
		}),
		setStudentName: (e) => o({
			type: "setStudentName",
			name: e
		}),
		reset: () => {
			Iy(e.id), o({
				type: "replace",
				state: i()
			});
		}
	}), [
		e,
		t,
		n
	]), d = (0, _.useMemo)(() => ({
		assessment: e,
		state: a,
		bank: t,
		actions: u,
		saved: s
	}), [
		e,
		a,
		t,
		u,
		s
	]);
	return /* @__PURE__ */ (0, C.jsx)(fb.Provider, {
		value: d,
		children: r
	});
}
function mb() {
	let e = (0, _.useContext)(fb);
	if (!e) throw Error("useAssessment must be used inside <AssessmentProvider>");
	return e;
}
//#endregion
//#region src/components/QuestionBody.tsx
function hb({ idPrefix: e, text: t, parts: n, values: r, onChange: i, disabled: a, validation: o, results: s, showCorrect: c }) {
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, C.jsx)(Hv, {
			className: "leading-relaxed",
			children: t
		}), /* @__PURE__ */ (0, C.jsx)("div", {
			className: "space-y-3",
			children: n.map((t, l) => /* @__PURE__ */ (0, C.jsx)(gb, {
				idPrefix: e,
				index: l,
				total: n.length,
				part: t,
				value: r[t.name],
				onChange: i ? (e) => i(t.name, e) : void 0,
				disabled: a || !i,
				validation: o?.[t.name],
				result: s?.[t.name],
				showCorrect: c
			}, t.name))
		})]
	});
}
function gb({ idPrefix: e, index: t, total: n, part: r, value: i, onChange: a, disabled: o, validation: s, result: c, showCorrect: l }) {
	let u = x(r.type), d = `${e}-${r.name}`.replace(/[^A-Za-z0-9_-]/g, "_"), f = `${d}-input`, p = `${d}-label`, m = `${d}-help`, h = `${d}-feedback`, g = o ? void 0 : u.helpText?.(r), _ = s !== void 0 && !s.valid;
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "rounded-lg border border-slate-200 p-3 dark:border-slate-800",
		children: [
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-2 gap-y-2",
				children: [
					r.label ? /* @__PURE__ */ (0, C.jsx)("span", {
						id: p,
						className: "font-medium",
						children: /* @__PURE__ */ (0, C.jsx)(Hv, {
							inline: !0,
							children: r.label
						})
					}) : /* @__PURE__ */ (0, C.jsx)("span", {
						id: p,
						className: "sr-only",
						children: n > 1 ? `Answer for part ${t + 1}` : "Answer"
					}),
					/* @__PURE__ */ (0, C.jsx)(u.Input, {
						part: r,
						id: f,
						labelId: p,
						describedBy: [g ? m : "", h].filter(Boolean).join(" "),
						value: i,
						onChange: a ?? _b,
						disabled: o,
						invalid: _,
						showCorrect: l
					}),
					r.suffix && /* @__PURE__ */ (0, C.jsx)(Hv, {
						inline: !0,
						children: r.suffix
					}),
					c && /* @__PURE__ */ (0, C.jsx)(te, { score: c.score })
				]
			}),
			g && /* @__PURE__ */ (0, C.jsx)("p", {
				id: m,
				className: "mt-1.5 text-xs text-slate-500 dark:text-slate-400",
				children: g
			}),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				id: h,
				"aria-live": "polite",
				className: "space-y-1 text-sm [&:not(:empty)]:mt-2",
				children: [
					_ && /* @__PURE__ */ (0, C.jsxs)("p", {
						className: "font-medium text-red-700 dark:text-red-300",
						children: [/* @__PURE__ */ (0, C.jsx)("span", {
							"aria-hidden": "true",
							children: "⚠ "
						}), s.message ?? "Invalid answer"]
					}),
					c?.feedback && /* @__PURE__ */ (0, C.jsx)("div", {
						className: "text-slate-700 dark:text-slate-300",
						children: /* @__PURE__ */ (0, C.jsx)(Hv, {
							inline: !0,
							children: c.feedback
						})
					}),
					l && /* @__PURE__ */ (0, C.jsxs)("p", {
						className: "text-slate-700 dark:text-slate-300",
						children: ["Correct answer: ", /* @__PURE__ */ (0, C.jsx)(Hv, {
							inline: !0,
							className: "font-semibold",
							children: u.formatCorrectAnswer(r)
						})]
					})
				]
			})
		]
	});
}
function _b() {}
//#endregion
//#region src/components/QuestionView.tsx
function vb({ index: e }) {
	let { state: t, bank: n, actions: r } = mb(), i = t.questions[e], a = n(i.questionId), o = (0, _.useMemo)(() => a ? _y(a, i.seed).text : "", [a, i.seed]);
	if (!a) return /* @__PURE__ */ (0, C.jsxs)("p", {
		role: "alert",
		children: [
			"Unknown question “",
			i.questionId,
			"”."
		]
	});
	let s = Cy(i), c = wy(i), l = xy(i), u = Sy(i).length, d = `q${e}-heading`, f = {};
	if (s) for (let [e, t] of Object.entries(s.results)) JSON.stringify(i.draft[e]) === JSON.stringify(s.values[e]) && (f[e] = t);
	return /* @__PURE__ */ (0, C.jsxs)("article", {
		"aria-labelledby": d,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, C.jsxs)("header", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, C.jsxs)("h2", {
					id: d,
					className: "text-lg font-semibold",
					children: [
						"Question ",
						e + 1,
						". ",
						a.title
					]
				}), /* @__PURE__ */ (0, C.jsxs)("span", {
					className: "text-sm text-slate-600 dark:text-slate-400",
					children: [
						D(i.bestScore * i.points),
						" / ",
						i.points,
						" points"
					]
				})]
			}),
			/* @__PURE__ */ (0, C.jsxs)("form", {
				noValidate: !0,
				onKeyDown: (e) => {
					let t = e.target, n = t instanceof HTMLInputElement && t.type === "radio";
					e.key === "Enter" && (n || t instanceof HTMLSelectElement) && (e.preventDefault(), c || e.currentTarget.requestSubmit());
				},
				onSubmit: (t) => {
					t.preventDefault(), r.submit(e);
				},
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, C.jsx)(hb, {
					idPrefix: `q${e}-v${i.variant}`,
					text: o,
					parts: i.preparedParts,
					values: i.draft,
					onChange: (t, n) => r.setValue(e, t, n),
					disabled: c,
					validation: i.validation,
					results: f,
					showCorrect: c
				}), /* @__PURE__ */ (0, C.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, C.jsx)(T, {
						type: "submit",
						variant: "primary",
						disabled: c,
						children: "Submit"
					}), Ey(i, t.mode) && /* @__PURE__ */ (0, C.jsx)(T, {
						onClick: () => r.newVariant(e),
						children: "New variant"
					})]
				})]
			}),
			/* @__PURE__ */ (0, C.jsx)("div", {
				role: "status",
				"aria-live": "polite",
				className: "text-sm",
				children: i.validation ? /* @__PURE__ */ (0, C.jsx)("p", {
					className: "text-red-700 dark:text-red-300",
					children: "Some answers are not in a valid format. Fix them and submit again; this did not use an attempt."
				}) : s ? /* @__PURE__ */ (0, C.jsxs)("p", { children: [
					"Submission score: ",
					/* @__PURE__ */ (0, C.jsx)("strong", { children: ee(s.score) }),
					s.score === 1 ? " — well done!" : c ? " — no attempts left." : ""
				] }) : null
			}),
			/* @__PURE__ */ (0, C.jsxs)("footer", {
				className: "flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-200 pt-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400",
				children: [
					/* @__PURE__ */ (0, C.jsxs)("span", { children: [
						"Attempts used: ",
						by(i),
						i.maxAttempts === null ? " (unlimited)" : ` of ${i.maxAttempts} · ${l} remaining`
					] }),
					t.mode === "exercise" && /* @__PURE__ */ (0, C.jsxs)("span", { children: [
						"Variant ",
						i.variant + 1,
						u > 0 ? ` · ${u} attempt${u === 1 ? "" : "s"} on this variant` : ""
					] }),
					/* @__PURE__ */ (0, C.jsxs)("span", { children: ["Best score: ", ee(i.bestScore)] }),
					/* @__PURE__ */ (0, C.jsxs)("span", {
						className: "font-mono",
						children: ["seed ", i.seed]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/AssessmentView.tsx
function yb(e) {
	return e.bestScore >= 1 ? {
		label: "complete",
		className: "bg-emerald-500"
	} : wy(e) ? {
		label: "closed",
		className: "bg-slate-500"
	} : by(e) > 0 ? {
		label: "in progress",
		className: "bg-amber-500"
	} : {
		label: "not started",
		className: "bg-slate-300 dark:bg-slate-600"
	};
}
function bb({ onShowResults: e } = {}) {
	let { assessment: t, state: n, bank: r, actions: i, saved: a } = mb(), [o, s] = (0, _.useState)(!1), { earned: c, possible: l } = Oy(n), u = n.currentIndex, d = n.questions.length - 1;
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, C.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, C.jsx)("h1", {
							className: "text-2xl font-bold",
							children: t.title
						}), /* @__PURE__ */ (0, C.jsx)(ne, { mode: t.mode })]
					}),
					t.description && /* @__PURE__ */ (0, C.jsx)("p", {
						className: "text-slate-600 dark:text-slate-400",
						children: t.description
					}),
					/* @__PURE__ */ (0, C.jsxs)("div", {
						className: "flex flex-wrap items-center gap-x-4 gap-y-2",
						children: [/* @__PURE__ */ (0, C.jsxs)("p", {
							className: "text-sm",
							children: [
								"Total score:",
								" ",
								/* @__PURE__ */ (0, C.jsxs)("strong", { children: [
									D(c),
									" / ",
									l
								] })
							]
						}), /* @__PURE__ */ (0, C.jsxs)("div", {
							className: "ml-auto flex flex-wrap items-center gap-2",
							children: [e ? /* @__PURE__ */ (0, C.jsx)("button", {
								type: "button",
								onClick: e,
								className: "rounded-md px-3 py-1.5 text-sm font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300",
								children: "Results"
							}) : /* @__PURE__ */ (0, C.jsx)("a", {
								href: `#/assessment/${t.id}/results`,
								className: "rounded-md px-3 py-1.5 text-sm font-medium text-indigo-700 underline-offset-2 hover:underline dark:text-indigo-300",
								children: "Results & export"
							}), /* @__PURE__ */ (0, C.jsx)(re, {
								label: "Reset assessment",
								confirmLabel: "Yes, reset",
								prompt: "Erase all answers and start over?",
								onConfirm: i.reset,
								confirming: o,
								setConfirming: s
							})]
						})]
					}),
					!a && /* @__PURE__ */ (0, C.jsx)("p", {
						role: "alert",
						className: "rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900 dark:bg-amber-900/50 dark:text-amber-100",
						children: "Your browser is blocking storage, so progress will be lost if you reload. Export your results before leaving."
					})
				]
			}),
			/* @__PURE__ */ (0, C.jsx)("nav", {
				"aria-label": "Questions",
				children: /* @__PURE__ */ (0, C.jsx)("ol", {
					className: "m-0 flex list-none flex-wrap gap-2 p-0",
					children: n.questions.map((e, t) => {
						let n = yb(e), a = r(e.questionId)?.title ?? e.questionId;
						return /* @__PURE__ */ (0, C.jsx)("li", { children: /* @__PURE__ */ (0, C.jsxs)("button", {
							type: "button",
							onClick: () => i.goTo(t),
							"aria-current": t === u ? "step" : void 0,
							"aria-label": `Question ${t + 1}: ${a}, ${n.label}, ${D(e.bestScore * e.points)} of ${e.points} points`,
							className: `flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${t === u ? "border-indigo-500 bg-indigo-50 text-indigo-800 dark:border-indigo-400 dark:bg-indigo-950/60 dark:text-indigo-200" : "border-slate-300 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"}`,
							children: [
								/* @__PURE__ */ (0, C.jsx)("span", {
									"aria-hidden": "true",
									className: `h-2.5 w-2.5 rounded-full ${n.className}`
								}),
								"Q",
								t + 1
							]
						}) }, t);
					})
				})
			}),
			/* @__PURE__ */ (0, C.jsx)(E, { children: /* @__PURE__ */ (0, C.jsx)(vb, { index: u }, `${u}`) }),
			/* @__PURE__ */ (0, C.jsxs)("div", {
				className: "flex justify-between gap-2",
				children: [/* @__PURE__ */ (0, C.jsx)(T, {
					onClick: () => i.goTo(u - 1),
					disabled: u === 0,
					children: "← Previous"
				}), u < d ? /* @__PURE__ */ (0, C.jsx)(T, {
					onClick: () => i.goTo(u + 1),
					children: "Next →"
				}) : e ? /* @__PURE__ */ (0, C.jsx)(T, {
					variant: "primary",
					onClick: e,
					children: "Finish & see results →"
				}) : /* @__PURE__ */ (0, C.jsx)("a", {
					href: `#/assessment/${t.id}/results`,
					className: "inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400",
					children: "Finish & see results →"
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/Results.tsx
function xb({ onBack: e } = {}) {
	let { assessment: t, state: n, bank: r, actions: i } = mb(), { earned: a, possible: o } = Oy(n), s = "text-sm text-indigo-700 hover:underline dark:text-indigo-300";
	return /* @__PURE__ */ (0, C.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, C.jsxs)("header", {
			className: "space-y-1",
			children: [
				e ? /* @__PURE__ */ (0, C.jsxs)("button", {
					type: "button",
					onClick: e,
					className: s,
					children: ["← Back to ", t.title]
				}) : /* @__PURE__ */ (0, C.jsxs)("a", {
					href: `#/assessment/${t.id}`,
					className: s,
					children: ["← Back to ", t.title]
				}),
				/* @__PURE__ */ (0, C.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, C.jsx)("h1", {
						className: "text-2xl font-bold",
						children: "Results"
					}), /* @__PURE__ */ (0, C.jsx)(ne, { mode: t.mode })]
				}),
				/* @__PURE__ */ (0, C.jsxs)("p", {
					className: "text-lg",
					children: [
						"Total:",
						" ",
						/* @__PURE__ */ (0, C.jsxs)("strong", { children: [
							D(a),
							" / ",
							o
						] }),
						" ",
						/* @__PURE__ */ (0, C.jsxs)("span", {
							className: "text-slate-600 dark:text-slate-400",
							children: [
								"(",
								ee(o ? a / o : 0),
								")"
							]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, C.jsx)(E, {
			className: "overflow-x-auto p-0 sm:p-0",
			children: /* @__PURE__ */ (0, C.jsxs)("table", {
				className: "w-full min-w-[20rem] text-left text-sm",
				children: [
					/* @__PURE__ */ (0, C.jsx)("caption", {
						className: "sr-only",
						children: "Score per question"
					}),
					/* @__PURE__ */ (0, C.jsx)("thead", {
						className: "border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800 dark:text-slate-400",
						children: /* @__PURE__ */ (0, C.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, C.jsx)("th", {
								scope: "col",
								className: "px-4 py-2",
								children: "Question"
							}),
							/* @__PURE__ */ (0, C.jsx)("th", {
								scope: "col",
								className: "px-4 py-2 text-right",
								children: "Attempts"
							}),
							/* @__PURE__ */ (0, C.jsx)("th", {
								scope: "col",
								className: "px-4 py-2 text-right",
								children: "Best"
							}),
							/* @__PURE__ */ (0, C.jsx)("th", {
								scope: "col",
								className: "px-4 py-2 text-right",
								children: "Points"
							})
						] })
					}),
					/* @__PURE__ */ (0, C.jsx)("tbody", { children: n.questions.map((n, a) => /* @__PURE__ */ (0, C.jsxs)("tr", {
						className: "border-b border-slate-100 last:border-0 dark:border-slate-800/60",
						children: [
							/* @__PURE__ */ (0, C.jsx)("th", {
								scope: "row",
								className: "px-4 py-2 font-medium",
								children: e ? /* @__PURE__ */ (0, C.jsxs)("button", {
									type: "button",
									onClick: () => {
										i.goTo(a), e();
									},
									className: "text-left hover:underline",
									children: [
										a + 1,
										". ",
										r(n.questionId)?.title ?? n.questionId
									]
								}) : /* @__PURE__ */ (0, C.jsxs)("a", {
									href: `#/assessment/${t.id}`,
									onClick: () => i.goTo(a),
									className: "hover:underline",
									children: [
										a + 1,
										". ",
										r(n.questionId)?.title ?? n.questionId
									]
								})
							}),
							/* @__PURE__ */ (0, C.jsxs)("td", {
								className: "px-4 py-2 text-right tabular-nums",
								children: [by(n), n.maxAttempts !== null && ` / ${n.maxAttempts}`]
							}),
							/* @__PURE__ */ (0, C.jsx)("td", {
								className: "px-4 py-2 text-right tabular-nums",
								children: ee(n.bestScore)
							}),
							/* @__PURE__ */ (0, C.jsxs)("td", {
								className: "px-4 py-2 text-right tabular-nums",
								children: [
									D(n.bestScore * n.points),
									" / ",
									n.points
								]
							})
						]
					}, a)) })
				]
			})
		})]
	});
}
//#endregion
//#region src/lib/QuizWidget.tsx
function Sb({ assessment: e, questions: t }) {
	let n = (0, _.useMemo)(() => {
		let e = new Map(t.map((e) => [e.id, e]));
		return (t) => e.get(t);
	}, [t]), [r, i] = (0, _.useState)(!1);
	return /* @__PURE__ */ (0, C.jsx)(pb, {
		assessment: e,
		bank: n,
		children: r ? /* @__PURE__ */ (0, C.jsx)(xb, { onBack: () => i(!1) }) : /* @__PURE__ */ (0, C.jsx)(bb, { onShowResults: () => i(!0) })
	});
}
//#endregion
//#region src/lib/entry.tsx
function Cb(e, { assessment: t, questions: n }) {
	let r = (0, v.createRoot)(e);
	return r.render(/* @__PURE__ */ (0, C.jsx)(_.StrictMode, { children: /* @__PURE__ */ (0, C.jsx)("div", {
		className: "exercise-system-widget",
		children: /* @__PURE__ */ (0, C.jsx)(Sb, {
			assessment: t,
			questions: n
		})
	}) })), () => r.unmount();
}
//#endregion
export { Cb as mount, le as sampleFunction };
