var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var globalThis_1 =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$N = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$M = fails$N;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$M(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});

var fails$L = fails$N;

var functionBindNative = !fails$L(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var call$z = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var functionCall = NATIVE_BIND$3 ? call$z.bind(call$z) : function () {
  return call$z.apply(call$z, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$5 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$5 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$5(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$7 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$2 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var call$y = FunctionPrototype$2.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$y, call$y);

var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$y.apply(fn, arguments);
  };
};

var uncurryThis$X = functionUncurryThis;

var toString$o = uncurryThis$X({}.toString);
var stringSlice$c = uncurryThis$X(''.slice);

var classofRaw$2 = function (it) {
  return stringSlice$c(toString$o(it), 8, -1);
};

var uncurryThis$W = functionUncurryThis;
var fails$K = fails$N;
var classof$j = classofRaw$2;

var $Object$5 = Object;
var split$3 = uncurryThis$W(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$K(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$5('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$j(it) === 'String' ? split$3(it, '') : $Object$5(it);
} : $Object$5;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$9 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$8 = isNullOrUndefined$9;

var $TypeError$r = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$d = function (it) {
  if (isNullOrUndefined$8(it)) throw new $TypeError$r("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$4 = indexedObject;
var requireObjectCoercible$c = requireObjectCoercible$d;

var toIndexedObject$7 = function (it) {
  return IndexedObject$4(requireObjectCoercible$c(it));
};

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var isCallable$v = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$u = isCallable$v;

var isObject$p = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$u(it);
};

var globalThis$R = globalThis_1;
var isCallable$t = isCallable$v;

var aFunction = function (argument) {
  return isCallable$t(argument) ? argument : undefined;
};

var getBuiltIn$d = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis$R[namespace]) : globalThis$R[namespace] && globalThis$R[namespace][method];
};

var uncurryThis$V = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$V({}.isPrototypeOf);

var globalThis$Q = globalThis_1;

var navigator = globalThis$Q.navigator;
var userAgent$8 = navigator && navigator.userAgent;

var environmentUserAgent = userAgent$8 ? String(userAgent$8) : '';

var globalThis$P = globalThis_1;
var userAgent$7 = environmentUserAgent;

var process$3 = globalThis$P.process;
var Deno$1 = globalThis$P.Deno;
var versions = process$3 && process$3.versions || Deno$1 && Deno$1.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent$7) {
  match = userAgent$7.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$7.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var environmentV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$1 = environmentV8Version;
var fails$J = fails$N;
var globalThis$O = globalThis_1;

var $String$8 = globalThis$O.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$J(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String$8(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$3 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$3 &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';

var getBuiltIn$c = getBuiltIn$d;
var isCallable$s = isCallable$v;
var isPrototypeOf$7 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$4 = Object;

var isSymbol$4 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$c('Symbol');
  return isCallable$s($Symbol) && isPrototypeOf$7($Symbol.prototype, $Object$4(it));
};

var $String$7 = String;

var tryToString$6 = function (argument) {
  try {
    return $String$7(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$r = isCallable$v;
var tryToString$5 = tryToString$6;

var $TypeError$q = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$f = function (argument) {
  if (isCallable$r(argument)) return argument;
  throw new $TypeError$q(tryToString$5(argument) + ' is not a function');
};

var aCallable$e = aCallable$f;
var isNullOrUndefined$7 = isNullOrUndefined$9;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$7 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$7(func) ? undefined : aCallable$e(func);
};

var call$x = functionCall;
var isCallable$q = isCallable$v;
var isObject$o = isObject$p;

var $TypeError$p = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$q(fn = input.toString) && !isObject$o(val = call$x(fn, input))) return val;
  if (isCallable$q(fn = input.valueOf) && !isObject$o(val = call$x(fn, input))) return val;
  if (pref !== 'string' && isCallable$q(fn = input.toString) && !isObject$o(val = call$x(fn, input))) return val;
  throw new $TypeError$p("Can't convert object to primitive value");
};

var sharedStore = {exports: {}};

var isPure = false;

var globalThis$N = globalThis_1;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$9 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$9(globalThis$N, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis$N[key] = value;
  } return value;
};

var globalThis$M = globalThis_1;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = sharedStore.exports = globalThis$M[SHARED] || defineGlobalProperty$2(SHARED, {});

(store$3.versions || (store$3.versions = [])).push({
  version: '3.41.0',
  mode: 'global',
  copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.41.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var sharedStoreExports = sharedStore.exports;

var store$2 = sharedStoreExports;

var shared$4 = function (key, value) {
  return store$2[key] || (store$2[key] = value || {});
};

var requireObjectCoercible$b = requireObjectCoercible$d;

var $Object$3 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$e = function (argument) {
  return $Object$3(requireObjectCoercible$b(argument));
};

var uncurryThis$U = functionUncurryThis;
var toObject$d = toObject$e;

var hasOwnProperty = uncurryThis$U({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$d(it), key);
};

var uncurryThis$T = functionUncurryThis;

var id$2 = 0;
var postfix = Math.random();
var toString$n = uncurryThis$T(1.0.toString);

var uid$4 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$n(++id$2 + postfix, 36);
};

var globalThis$L = globalThis_1;
var shared$3 = shared$4;
var hasOwn$m = hasOwnProperty_1;
var uid$3 = uid$4;
var NATIVE_SYMBOL$2 = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Symbol$3 = globalThis$L.Symbol;
var WellKnownSymbolsStore = shared$3('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$3['for'] || Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$3;

var wellKnownSymbol$p = function (name) {
  if (!hasOwn$m(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL$2 && hasOwn$m(Symbol$3, name)
      ? Symbol$3[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var call$w = functionCall;
var isObject$n = isObject$p;
var isSymbol$3 = isSymbol$4;
var getMethod$6 = getMethod$7;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$o = wellKnownSymbol$p;

var $TypeError$o = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$o('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$2 = function (input, pref) {
  if (!isObject$n(input) || isSymbol$3(input)) return input;
  var exoticToPrim = getMethod$6(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$w(exoticToPrim, input, pref);
    if (!isObject$n(result) || isSymbol$3(result)) return result;
    throw new $TypeError$o("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive$1 = toPrimitive$2;
var isSymbol$2 = isSymbol$4;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$4 = function (argument) {
  var key = toPrimitive$1(argument, 'string');
  return isSymbol$2(key) ? key : key + '';
};

var globalThis$K = globalThis_1;
var isObject$m = isObject$p;

var document$3 = globalThis$K.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$m(document$3) && isObject$m(document$3.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};

var DESCRIPTORS$r = descriptors;
var fails$I = fails$N;
var createElement$1 = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$r && !fails$I(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});

var DESCRIPTORS$q = descriptors;
var call$v = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$6 = createPropertyDescriptor$7;
var toIndexedObject$6 = toIndexedObject$7;
var toPropertyKey$3 = toPropertyKey$4;
var hasOwn$l = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$q ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$6(O);
  P = toPropertyKey$3(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$l(O, P)) return createPropertyDescriptor$6(!call$v(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$p = descriptors;
var fails$H = fails$N;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$p && fails$H(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});

var isObject$l = isObject$p;

var $String$6 = String;
var $TypeError$n = TypeError;

// `Assert: Type(argument) is Object`
var anObject$q = function (argument) {
  if (isObject$l(argument)) return argument;
  throw new $TypeError$n($String$6(argument) + ' is not an object');
};

var DESCRIPTORS$o = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$p = anObject$q;
var toPropertyKey$2 = toPropertyKey$4;

var $TypeError$m = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$o ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$p(O);
  P = toPropertyKey$2(P);
  anObject$p(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$p(O);
  P = toPropertyKey$2(P);
  anObject$p(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError$m('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$n = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var createPropertyDescriptor$5 = createPropertyDescriptor$7;

var createNonEnumerableProperty$d = DESCRIPTORS$n ? function (object, key, value) {
  return definePropertyModule$5.f(object, key, createPropertyDescriptor$5(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$3 = {exports: {}};

var DESCRIPTORS$m = descriptors;
var hasOwn$k = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$m && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$k(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$m || (DESCRIPTORS$m && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$S = functionUncurryThis;
var isCallable$p = isCallable$v;
var store$1 = sharedStoreExports;

var functionToString = uncurryThis$S(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$p(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var globalThis$J = globalThis_1;
var isCallable$o = isCallable$v;

var WeakMap$1 = globalThis$J.WeakMap;

var weakMapBasicDetection = isCallable$o(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$2 = shared$4;
var uid$2 = uid$4;

var keys$2 = shared$2('keys');

var sharedKey$3 = function (key) {
  return keys$2[key] || (keys$2[key] = uid$2(key));
};

var hiddenKeys$5 = {};

var NATIVE_WEAK_MAP$1 = weakMapBasicDetection;
var globalThis$I = globalThis_1;
var isObject$k = isObject$p;
var createNonEnumerableProperty$c = createNonEnumerableProperty$d;
var hasOwn$j = hasOwnProperty_1;
var shared$1 = sharedStoreExports;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$4 = hiddenKeys$5;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$7 = globalThis$I.TypeError;
var WeakMap = globalThis$I.WeakMap;
var set$2, get$1, has$6;

var enforce = function (it) {
  return has$6(it) ? get$1(it) : set$2(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$k(it) || (state = get$1(it)).type !== TYPE) {
      throw new TypeError$7('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP$1 || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set$2 = function (it, metadata) {
    if (store.has(it)) throw new TypeError$7(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get$1 = function (it) {
    return store.get(it) || {};
  };
  has$6 = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$4[STATE] = true;
  set$2 = function (it, metadata) {
    if (hasOwn$j(it, STATE)) throw new TypeError$7(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$c(it, STATE, metadata);
    return metadata;
  };
  get$1 = function (it) {
    return hasOwn$j(it, STATE) ? it[STATE] : {};
  };
  has$6 = function (it) {
    return hasOwn$j(it, STATE);
  };
}

var internalState = {
  set: set$2,
  get: get$1,
  has: has$6,
  enforce: enforce,
  getterFor: getterFor
};

var uncurryThis$R = functionUncurryThis;
var fails$G = fails$N;
var isCallable$n = isCallable$v;
var hasOwn$i = hasOwnProperty_1;
var DESCRIPTORS$l = descriptors;
var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$3;
var InternalStateModule$a = internalState;

var enforceInternalState$4 = InternalStateModule$a.enforce;
var getInternalState$6 = InternalStateModule$a.get;
var $String$5 = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$8 = Object.defineProperty;
var stringSlice$b = uncurryThis$R(''.slice);
var replace$9 = uncurryThis$R(''.replace);
var join$4 = uncurryThis$R([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS$l && !fails$G(function () {
  return defineProperty$8(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
  if (stringSlice$b($String$5(name), 0, 7) === 'Symbol(') {
    name = '[' + replace$9($String$5(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$i(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name)) {
    if (DESCRIPTORS$l) defineProperty$8(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$i(options, 'arity') && value.length !== options.arity) {
    defineProperty$8(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$i(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$l) defineProperty$8(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState$4(value);
  if (!hasOwn$i(state, 'source')) {
    state.source = join$4(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$2(function toString() {
  return isCallable$n(this) && getInternalState$6(this).source || inspectSource$2(this);
}, 'toString');

var makeBuiltInExports = makeBuiltIn$3.exports;

var isCallable$m = isCallable$v;
var definePropertyModule$4 = objectDefineProperty;
var makeBuiltIn$1 = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$g = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$m(value)) makeBuiltIn$1(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$4.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil$1 = Math.ceil;
var floor$7 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$7 : ceil$1)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$f = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$e = toIntegerOrInfinity$f;

var max$2 = Math.max;
var min$5 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$4 = function (index, length) {
  var integer = toIntegerOrInfinity$e(index);
  return integer < 0 ? max$2(integer + length, 0) : min$5(integer, length);
};

var toIntegerOrInfinity$d = toIntegerOrInfinity$f;

var min$4 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$9 = function (argument) {
  var len = toIntegerOrInfinity$d(argument);
  return len > 0 ? min$4(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$8 = toLength$9;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$i = function (obj) {
  return toLength$8(obj.length);
};

var toIndexedObject$5 = toIndexedObject$7;
var toAbsoluteIndex$3 = toAbsoluteIndex$4;
var lengthOfArrayLike$h = lengthOfArrayLike$i;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$5 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$5($this);
    var length = lengthOfArrayLike$h(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex$3(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$5(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$5(false)
};

var uncurryThis$Q = functionUncurryThis;
var hasOwn$h = hasOwnProperty_1;
var toIndexedObject$4 = toIndexedObject$7;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$3 = hiddenKeys$5;

var push$b = uncurryThis$Q([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$4(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$h(hiddenKeys$3, key) && hasOwn$h(O, key) && push$b(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$h(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$b(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$2);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$b = getBuiltIn$d;
var uncurryThis$P = functionUncurryThis;
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$o = anObject$q;

var concat$2 = uncurryThis$P([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$b('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule$1.f(anObject$o(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$g = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
var definePropertyModule$3 = objectDefineProperty;

var copyConstructorProperties$3 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$3.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$1.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$g(target, key) && !(exceptions && hasOwn$g(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$F = fails$N;
var isCallable$l = isCallable$v;

var replacement = /#|\.prototype\./;

var isForced$4 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable$l(detection) ? fails$F(detection)
    : !!detection;
};

var normalize = isForced$4.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$4.data = {};
var NATIVE = isForced$4.NATIVE = 'N';
var POLYFILL = isForced$4.POLYFILL = 'P';

var isForced_1 = isForced$4;

var globalThis$H = globalThis_1;
var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$b = createNonEnumerableProperty$d;
var defineBuiltIn$f = defineBuiltIn$g;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties$2 = copyConstructorProperties$3;
var isForced$3 = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis$H;
  } else if (STATIC) {
    target = globalThis$H[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis$H[TARGET] && globalThis$H[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor$4(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$3(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties$2(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$b(sourceProperty, 'sham', true);
    }
    defineBuiltIn$f(target, key, sourceProperty, options);
  }
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$5 = FunctionPrototype.apply;
var call$u = FunctionPrototype.call;

// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$u.bind(apply$5) : function () {
  return call$u.apply(apply$5, arguments);
});

var uncurryThis$O = functionUncurryThis;
var aCallable$d = aCallable$f;

var functionUncurryThisAccessor = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis$O(aCallable$d(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};

var isObject$j = isObject$p;

var isPossiblePrototype$1 = function (argument) {
  return isObject$j(argument) || argument === null;
};

var isPossiblePrototype = isPossiblePrototype$1;

var $String$4 = String;
var $TypeError$l = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (isPossiblePrototype(argument)) return argument;
  throw new $TypeError$l("Can't set " + $String$4(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor$3 = functionUncurryThisAccessor;
var isObject$i = isObject$p;
var requireObjectCoercible$a = requireObjectCoercible$d;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor$3(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    requireObjectCoercible$a(O);
    aPossiblePrototype(proto);
    if (!isObject$i(O)) return O;
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var defineProperty$7 = objectDefineProperty.f;

var proxyAccessor$2 = function (Target, Source, key) {
  key in Target || defineProperty$7(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};

var isCallable$k = isCallable$v;
var isObject$h = isObject$p;
var setPrototypeOf$6 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$5 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$6 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$k(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject$h(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$6($this, NewTargetPrototype);
  return $this;
};

var wellKnownSymbol$n = wellKnownSymbol$p;

var TO_STRING_TAG$5 = wellKnownSymbol$n('toStringTag');
var test$1 = {};

test$1[TO_STRING_TAG$5] = 'z';

var toStringTagSupport = String(test$1) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$j = isCallable$v;
var classofRaw$1 = classofRaw$2;
var wellKnownSymbol$m = wellKnownSymbol$p;

var TO_STRING_TAG$4 = wellKnownSymbol$m('toStringTag');
var $Object$2 = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$i = TO_STRING_TAG_SUPPORT ? classofRaw$1 : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$4)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw$1(O)
    // ES3 arguments fallback
    : (result = classofRaw$1(O)) === 'Object' && isCallable$j(O.callee) ? 'Arguments' : result;
};

var classof$h = classof$i;

var $String$3 = String;

var toString$m = function (argument) {
  if (classof$h(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  return $String$3(argument);
};

var toString$l = toString$m;

var normalizeStringArgument$1 = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$l(argument);
};

var isObject$g = isObject$p;
var createNonEnumerableProperty$a = createNonEnumerableProperty$d;

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
var installErrorCause$1 = function (O, options) {
  if (isObject$g(options) && 'cause' in options) {
    createNonEnumerableProperty$a(O, 'cause', options.cause);
  }
};

var uncurryThis$N = functionUncurryThis;

var $Error = Error;
var replace$8 = uncurryThis$N(''.replace);

var TEST = (function (arg) { return String(new $Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable, sonarjs/slow-regex -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

var errorStackClear = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace$8(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};

var fails$E = fails$N;
var createPropertyDescriptor$4 = createPropertyDescriptor$7;

var errorStackInstallable = !fails$E(function () {
  var error = new Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor$4(1, 7));
  return error.stack !== 7;
});

var createNonEnumerableProperty$9 = createNonEnumerableProperty$d;
var clearErrorStack = errorStackClear;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;

// non-standard V8
var captureStackTrace = Error.captureStackTrace;

var errorStackInstall = function (error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE) {
    if (captureStackTrace) captureStackTrace(error, C);
    else createNonEnumerableProperty$9(error, 'stack', clearErrorStack(stack, dropEntries));
  }
};

var getBuiltIn$a = getBuiltIn$d;
var hasOwn$f = hasOwnProperty_1;
var createNonEnumerableProperty$8 = createNonEnumerableProperty$d;
var isPrototypeOf$6 = objectIsPrototypeOf;
var setPrototypeOf$5 = objectSetPrototypeOf;
var copyConstructorProperties$1 = copyConstructorProperties$3;
var proxyAccessor$1 = proxyAccessor$2;
var inheritIfRequired$4 = inheritIfRequired$5;
var normalizeStringArgument = normalizeStringArgument$1;
var installErrorCause = installErrorCause$1;
var installErrorStack = errorStackInstall;
var DESCRIPTORS$k = descriptors;

var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn$a.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (hasOwn$f(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn$a('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty$8(result, 'message', message);
    installErrorStack(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf$6(OriginalErrorPrototype, this)) inheritIfRequired$4(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf$5) setPrototypeOf$5(WrappedError, BaseError);
    else copyConstructorProperties$1(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS$k && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor$1(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor$1(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties$1(WrappedError, OriginalError);

  try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty$8(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $$T = _export;
var globalThis$G = globalThis_1;
var apply$4 = functionApply;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = globalThis$G[WEB_ASSEMBLY];

// eslint-disable-next-line es/no-error-cause -- feature detection
var FORCED$9 = new Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$9);
  $$T({ global: true, constructor: true, arity: 1, forced: FORCED$9 }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$9);
    $$T({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$9 }, O);
  }
};

// https://tc39.es/ecma262/#sec-nativeerror
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply$4(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply$4(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply$4(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply$4(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply$4(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply$4(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply$4(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply$4(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply$4(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply$4(init, this, arguments); };
});

var objectDefineProperties = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$j = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$2 = objectDefineProperty;
var anObject$n = anObject$q;
var toIndexedObject$3 = toIndexedObject$7;
var objectKeys$1 = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$j && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$n(O);
  var props = toIndexedObject$3(Properties);
  var keys = objectKeys$1(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$9 = getBuiltIn$d;

var html$2 = getBuiltIn$9('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */
var anObject$m = anObject$q;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys$1 = hiddenKeys$5;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$1 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$1('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  activeXDocument = null;
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys$1[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
var objectCreate$1 = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE$1] = anObject$m(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$l = wellKnownSymbol$p;
var create$6 = objectCreate$1;
var defineProperty$6 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$l('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] === undefined) {
  defineProperty$6(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$6(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$4 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var $$S = _export;
var toObject$c = toObject$e;
var lengthOfArrayLike$g = lengthOfArrayLike$i;
var toIntegerOrInfinity$c = toIntegerOrInfinity$f;
var addToUnscopables$3 = addToUnscopables$4;

// `Array.prototype.at` method
// https://tc39.es/ecma262/#sec-array.prototype.at
$$S({ target: 'Array', proto: true }, {
  at: function at(index) {
    var O = toObject$c(this);
    var len = lengthOfArrayLike$g(O);
    var relativeIndex = toIntegerOrInfinity$c(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : O[k];
  }
});

addToUnscopables$3('at');

var $$R = _export;
var $includes = arrayIncludes.includes;
var fails$D = fails$N;
var addToUnscopables$2 = addToUnscopables$4;

// FF99+ bug
var BROKEN_ON_SPARSE = fails$D(function () {
  // eslint-disable-next-line es/no-array-prototype-includes -- detection
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$$R({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$2('includes');

var iterators = {};

var fails$C = fails$N;

var correctPrototypeGetter = !fails$C(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$e = hasOwnProperty_1;
var isCallable$i = isCallable$v;
var toObject$b = toObject$e;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object$1 = Object;
var ObjectPrototype$2 = $Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function (O) {
  var object = toObject$b(O);
  if (hasOwn$e(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$i(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object$1 ? ObjectPrototype$2 : null;
};

var fails$B = fails$N;
var isCallable$h = isCallable$v;
var isObject$f = isObject$p;
var getPrototypeOf$4 = objectGetPrototypeOf;
var defineBuiltIn$e = defineBuiltIn$g;
var wellKnownSymbol$k = wellKnownSymbol$p;

var ITERATOR$a = wellKnownSymbol$k('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$4, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$4(getPrototypeOf$4(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$4 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject$f(IteratorPrototype$4) || fails$B(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$4[ITERATOR$a].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$4 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$h(IteratorPrototype$4[ITERATOR$a])) {
  defineBuiltIn$e(IteratorPrototype$4, ITERATOR$a, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$4,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$5 = objectDefineProperty.f;
var hasOwn$d = hasOwnProperty_1;
var wellKnownSymbol$j = wellKnownSymbol$p;

var TO_STRING_TAG$3 = wellKnownSymbol$j('toStringTag');

var setToStringTag$8 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$d(target, TO_STRING_TAG$3)) {
    defineProperty$5(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$3 = iteratorsCore.IteratorPrototype;
var create$5 = objectCreate$1;
var createPropertyDescriptor$3 = createPropertyDescriptor$7;
var setToStringTag$7 = setToStringTag$8;
var Iterators$4 = iterators;

var returnThis$1 = function () { return this; };

var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$5(IteratorPrototype$3, { next: createPropertyDescriptor$3(+!ENUMERABLE_NEXT, next) });
  setToStringTag$7(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var $$Q = _export;
var call$t = functionCall;
var FunctionName$1 = functionName;
var isCallable$g = isCallable$v;
var createIteratorConstructor$1 = iteratorCreateConstructor;
var getPrototypeOf$3 = objectGetPrototypeOf;
var setPrototypeOf$4 = objectSetPrototypeOf;
var setToStringTag$6 = setToStringTag$8;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$d;
var defineBuiltIn$d = defineBuiltIn$g;
var wellKnownSymbol$i = wellKnownSymbol$p;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME$3 = FunctionName$1.PROPER;
var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
var IteratorPrototype$2 = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$9 = wellKnownSymbol$i('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor$1(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    }

    return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$9]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf$3(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf$3(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (setPrototypeOf$4) {
          setPrototypeOf$4(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (!isCallable$g(CurrentIteratorPrototype[ITERATOR$9])) {
          defineBuiltIn$d(CurrentIteratorPrototype, ITERATOR$9, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$6(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME$3 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME$1) {
      createNonEnumerableProperty$7(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$t(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn$d(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$Q({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$9] !== defaultIterator) {
    defineBuiltIn$d(IterablePrototype, ITERATOR$9, defaultIterator, { name: DEFAULT });
  }
  Iterators$3[NAME] = defaultIterator;

  return methods;
};

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
var createIterResultObject$4 = function (value, done) {
  return { value: value, done: done };
};

var toIndexedObject$2 = toIndexedObject$7;
var addToUnscopables$1 = addToUnscopables$4;
var Iterators$2 = iterators;
var InternalStateModule$9 = internalState;
var defineProperty$4 = objectDefineProperty.f;
var defineIterator$1 = iteratorDefine;
var createIterResultObject$3 = createIterResultObject$4;
var DESCRIPTORS$i = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$8 = InternalStateModule$9.set;
var getInternalState$5 = InternalStateModule$9.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
  setInternalState$8(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject$2(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$5(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = null;
    return createIterResultObject$3(undefined, true);
  }
  switch (state.kind) {
    case 'keys': return createIterResultObject$3(index, false);
    case 'values': return createIterResultObject$3(target[index], false);
  } return createIterResultObject$3([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators$2.Arguments = Iterators$2.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$1('keys');
addToUnscopables$1('values');
addToUnscopables$1('entries');

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$i && values.name !== 'values') try {
  defineProperty$4(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

var classof$g = classofRaw$2;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$5 = Array.isArray || function isArray(argument) {
  return classof$g(argument) === 'Array';
};

var DESCRIPTORS$h = descriptors;
var isArray$4 = isArray$5;

var $TypeError$k = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$3 = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$h && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray$4(O) && !getOwnPropertyDescriptor$3(O, 'length').writable) {
    throw new $TypeError$k('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};

var $TypeError$j = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

var doesNotExceedSafeInteger$2 = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError$j('Maximum allowed index exceeded');
  return it;
};

var $$P = _export;
var toObject$a = toObject$e;
var lengthOfArrayLike$f = lengthOfArrayLike$i;
var setArrayLength$1 = arraySetLength;
var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$2;
var fails$A = fails$N;

var INCORRECT_TO_LENGTH = fails$A(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength$1 = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED$8 = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength$1();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$$P({ target: 'Array', proto: true, arity: 1, forced: FORCED$8 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject$a(this);
    var len = lengthOfArrayLike$f(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger$1(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength$1(O, len);
    return len;
  }
});

var tryToString$4 = tryToString$6;

var $TypeError$i = TypeError;

var deletePropertyOrThrow$2 = function (O, P) {
  if (!delete O[P]) throw new $TypeError$i('Cannot delete property ' + tryToString$4(P) + ' of ' + tryToString$4(O));
};

var uncurryThis$M = functionUncurryThis;

var arraySlice$7 = uncurryThis$M([].slice);

var arraySlice$6 = arraySlice$7;

var floor$6 = Math.floor;

var sort$1 = function (array, comparefn) {
  var length = array.length;

  if (length < 8) {
    // insertion sort
    var i = 1;
    var element, j;

    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    }
  } else {
    // merge sort
    var middle = floor$6(length / 2);
    var left = sort$1(arraySlice$6(array, 0, middle), comparefn);
    var right = sort$1(arraySlice$6(array, middle), comparefn);
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;

    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = (lindex < llength && rindex < rlength)
        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
        : lindex < llength ? left[lindex++] : right[rindex++];
    }
  }

  return array;
};

var arraySort$1 = sort$1;

var fails$z = fails$N;

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$z(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};

var userAgent$6 = environmentUserAgent;

var firefox = userAgent$6.match(/firefox\/(\d+)/i);

var environmentFfVersion = !!firefox && +firefox[1];

var UA = environmentUserAgent;

var environmentIsIeOrEdge = /MSIE|Trident/.test(UA);

var userAgent$5 = environmentUserAgent;

var webkit = userAgent$5.match(/AppleWebKit\/(\d+)\./);

var environmentWebkitVersion = !!webkit && +webkit[1];

var $$O = _export;
var uncurryThis$L = functionUncurryThis;
var aCallable$c = aCallable$f;
var toObject$9 = toObject$e;
var lengthOfArrayLike$e = lengthOfArrayLike$i;
var deletePropertyOrThrow$1 = deletePropertyOrThrow$2;
var toString$k = toString$m;
var fails$y = fails$N;
var internalSort$1 = arraySort$1;
var arrayMethodIsStrict = arrayMethodIsStrict$1;
var FF$1 = environmentFfVersion;
var IE_OR_EDGE$1 = environmentIsIeOrEdge;
var V8$2 = environmentV8Version;
var WEBKIT$1 = environmentWebkitVersion;

var test = [];
var nativeSort$1 = uncurryThis$L(test.sort);
var push$a = uncurryThis$L(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails$y(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails$y(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT$1 = !fails$y(function () {
  // feature detection can be too slow, so check engines versions
  if (V8$2) return V8$2 < 70;
  if (FF$1 && FF$1 > 3) return;
  if (IE_OR_EDGE$1) return true;
  if (WEBKIT$1) return WEBKIT$1 < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED$7 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT$1;

var getSortCompare$1 = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString$k(x) > toString$k(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$$O({ target: 'Array', proto: true, forced: FORCED$7 }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable$c(comparefn);

    var array = toObject$9(this);

    if (STABLE_SORT$1) return comparefn === undefined ? nativeSort$1(array) : nativeSort$1(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike$e(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push$a(items, array[index]);
    }

    internalSort$1(items, getSortCompare$1(comparefn));

    itemsLength = lengthOfArrayLike$e(items);
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) deletePropertyOrThrow$1(array, index++);

    return array;
  }
});

var $$N = _export;
var toObject$8 = toObject$e;
var lengthOfArrayLike$d = lengthOfArrayLike$i;
var setArrayLength = arraySetLength;
var deletePropertyOrThrow = deletePropertyOrThrow$2;
var doesNotExceedSafeInteger = doesNotExceedSafeInteger$2;

// IE8-
var INCORRECT_RESULT = [].unshift(0) !== 1;

// V8 ~ Chrome < 71 and Safari <= 15.4, FF < 23 throws InternalError
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).unshift();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED$6 = INCORRECT_RESULT || !properErrorOnNonWritableLength();

// `Array.prototype.unshift` method
// https://tc39.es/ecma262/#sec-array.prototype.unshift
$$N({ target: 'Array', proto: true, arity: 1, forced: FORCED$6 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function unshift(item) {
    var O = toObject$8(this);
    var len = lengthOfArrayLike$d(O);
    var argCount = arguments.length;
    if (argCount) {
      doesNotExceedSafeInteger(len + argCount);
      var k = len;
      while (k--) {
        var to = k + argCount;
        if (k in O) O[to] = O[k];
        else deletePropertyOrThrow(O, to);
      }
      for (var j = 0; j < argCount; j++) {
        O[j] = arguments[j];
      }
    } return setArrayLength(O, len + argCount);
  }
});

// eslint-disable-next-line es/no-typed-arrays -- safe
var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

var makeBuiltIn = makeBuiltInExports;
var defineProperty$3 = objectDefineProperty;

var defineBuiltInAccessor$b = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty$3.f(target, name, descriptor);
};

var defineBuiltIn$c = defineBuiltIn$g;

var defineBuiltIns$5 = function (target, src, options) {
  for (var key in src) defineBuiltIn$c(target, key, src[key], options);
  return target;
};

var isPrototypeOf$5 = objectIsPrototypeOf;

var $TypeError$h = TypeError;

var anInstance$8 = function (it, Prototype) {
  if (isPrototypeOf$5(Prototype, it)) return it;
  throw new $TypeError$h('Incorrect invocation');
};

var toIntegerOrInfinity$b = toIntegerOrInfinity$f;
var toLength$7 = toLength$9;

var $RangeError$8 = RangeError;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
var toIndex$3 = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity$b(it);
  var length = toLength$7(number);
  if (number !== length) throw new $RangeError$8('Wrong length or index');
  return length;
};

// `Math.sign` method implementation
// https://tc39.es/ecma262/#sec-math.sign
// eslint-disable-next-line es/no-math-sign -- safe
var mathSign = Math.sign || function sign(x) {
  var n = +x;
  // eslint-disable-next-line no-self-compare -- NaN check
  return n === 0 || n !== n ? n : n < 0 ? -1 : 1;
};

var EPSILON$1 = 2.220446049250313e-16; // Number.EPSILON
var INVERSE_EPSILON = 1 / EPSILON$1;

var mathRoundTiesToEven = function (n) {
  return n + INVERSE_EPSILON - INVERSE_EPSILON;
};

var sign = mathSign;
var roundTiesToEven = mathRoundTiesToEven;

var abs$1 = Math.abs;

var EPSILON = 2.220446049250313e-16; // Number.EPSILON

var mathFloatRound = function (x, FLOAT_EPSILON, FLOAT_MAX_VALUE, FLOAT_MIN_VALUE) {
  var n = +x;
  var absolute = abs$1(n);
  var s = sign(n);
  if (absolute < FLOAT_MIN_VALUE) return s * roundTiesToEven(absolute / FLOAT_MIN_VALUE / FLOAT_EPSILON) * FLOAT_MIN_VALUE * FLOAT_EPSILON;
  var a = (1 + FLOAT_EPSILON / EPSILON) * absolute;
  var result = a - (a - absolute);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (result > FLOAT_MAX_VALUE || result !== result) return s * Infinity;
  return s * result;
};

var floatRound = mathFloatRound;

var FLOAT32_EPSILON = 1.1920928955078125e-7; // 2 ** -23;
var FLOAT32_MAX_VALUE = 3.4028234663852886e+38; // 2 ** 128 - 2 ** 104
var FLOAT32_MIN_VALUE = 1.1754943508222875e-38; // 2 ** -126;

// `Math.fround` method implementation
// https://tc39.es/ecma262/#sec-math.fround
// eslint-disable-next-line es/no-math-fround -- safe
var mathFround = Math.fround || function fround(x) {
  return floatRound(x, FLOAT32_EPSILON, FLOAT32_MAX_VALUE, FLOAT32_MIN_VALUE);
};

// IEEE754 conversions based on https://github.com/feross/ieee754
var $Array$3 = Array;
var abs = Math.abs;
var pow$2 = Math.pow;
var floor$5 = Math.floor;
var log$1 = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = $Array$3(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow$2(2, -24) - pow$2(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number !== number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number !== number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor$5(log$1(number) / LN2);
    c = pow$2(2, -exponent);
    if (number * c < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow$2(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow$2(2, mantissaLength);
      exponent += eBias;
    } else {
      mantissa = number * pow$2(2, eBias - 1) * pow$2(2, mantissaLength);
      exponent = 0;
    }
  }
  while (mantissaLength >= 8) {
    buffer[index++] = mantissa & 255;
    mantissa /= 256;
    mantissaLength -= 8;
  }
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  while (exponentLength > 0) {
    buffer[index++] = exponent & 255;
    exponent /= 256;
    exponentLength -= 8;
  }
  buffer[index - 1] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  while (nBits > 0) {
    exponent = exponent * 256 + buffer[index--];
    nBits -= 8;
  }
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  while (nBits > 0) {
    mantissa = mantissa * 256 + buffer[index--];
    nBits -= 8;
  }
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa += pow$2(2, mantissaLength);
    exponent -= eBias;
  } return (sign ? -1 : 1) * mantissa * pow$2(2, exponent - mantissaLength);
};

var ieee754 = {
  pack: pack,
  unpack: unpack
};

var toObject$7 = toObject$e;
var toAbsoluteIndex$2 = toAbsoluteIndex$4;
var lengthOfArrayLike$c = lengthOfArrayLike$i;

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
  var O = toObject$7(this);
  var length = lengthOfArrayLike$c(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex$2(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex$2(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

var globalThis$F = globalThis_1;
var uncurryThis$K = functionUncurryThis;
var DESCRIPTORS$g = descriptors;
var NATIVE_ARRAY_BUFFER$2 = arrayBufferBasicDetection;
var FunctionName = functionName;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$d;
var defineBuiltInAccessor$a = defineBuiltInAccessor$b;
var defineBuiltIns$4 = defineBuiltIns$5;
var fails$x = fails$N;
var anInstance$7 = anInstance$8;
var toIntegerOrInfinity$a = toIntegerOrInfinity$f;
var toLength$6 = toLength$9;
var toIndex$2 = toIndex$3;
var fround = mathFround;
var IEEE754 = ieee754;
var getPrototypeOf$2 = objectGetPrototypeOf;
var setPrototypeOf$3 = objectSetPrototypeOf;
var arrayFill = arrayFill$1;
var arraySlice$5 = arraySlice$7;
var inheritIfRequired$3 = inheritIfRequired$5;
var copyConstructorProperties = copyConstructorProperties$3;
var setToStringTag$5 = setToStringTag$8;
var InternalStateModule$8 = internalState;

var PROPER_FUNCTION_NAME$2 = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var ARRAY_BUFFER$1 = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH$1 = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var getInternalArrayBufferState = InternalStateModule$8.getterFor(ARRAY_BUFFER$1);
var getInternalDataViewState = InternalStateModule$8.getterFor(DATA_VIEW);
var setInternalState$7 = InternalStateModule$8.set;
var NativeArrayBuffer$1 = globalThis$F[ARRAY_BUFFER$1];
var $ArrayBuffer$1 = NativeArrayBuffer$1;
var ArrayBufferPrototype$3 = $ArrayBuffer$1 && $ArrayBuffer$1[PROTOTYPE];
var $DataView = globalThis$F[DATA_VIEW];
var DataViewPrototype$2 = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype$1 = Object.prototype;
var Array$1 = globalThis$F.Array;
var RangeError$3 = globalThis$F.RangeError;
var fill = uncurryThis$K(arrayFill);
var reverse = uncurryThis$K([].reverse);

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(fround(number), 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter$1 = function (Constructor, key, getInternalState) {
  defineBuiltInAccessor$a(Constructor[PROTOTYPE], key, {
    configurable: true,
    get: function () {
      return getInternalState(this)[key];
    }
  });
};

var get = function (view, count, index, isLittleEndian) {
  var store = getInternalDataViewState(view);
  var intIndex = toIndex$2(index);
  var boolIsLittleEndian = !!isLittleEndian;
  if (intIndex + count > store.byteLength) throw new RangeError$3(WRONG_INDEX);
  var bytes = store.bytes;
  var start = intIndex + store.byteOffset;
  var pack = arraySlice$5(bytes, start, start + count);
  return boolIsLittleEndian ? pack : reverse(pack);
};

var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
  var store = getInternalDataViewState(view);
  var intIndex = toIndex$2(index);
  var pack = conversion(+value);
  var boolIsLittleEndian = !!isLittleEndian;
  if (intIndex + count > store.byteLength) throw new RangeError$3(WRONG_INDEX);
  var bytes = store.bytes;
  var start = intIndex + store.byteOffset;
  for (var i = 0; i < count; i++) bytes[start + i] = pack[boolIsLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER$2) {
  $ArrayBuffer$1 = function ArrayBuffer(length) {
    anInstance$7(this, ArrayBufferPrototype$3);
    var byteLength = toIndex$2(length);
    setInternalState$7(this, {
      type: ARRAY_BUFFER$1,
      bytes: fill(Array$1(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS$g) {
      this.byteLength = byteLength;
      this.detached = false;
    }
  };

  ArrayBufferPrototype$3 = $ArrayBuffer$1[PROTOTYPE];

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance$7(this, DataViewPrototype$2);
    anInstance$7(buffer, ArrayBufferPrototype$3);
    var bufferState = getInternalArrayBufferState(buffer);
    var bufferLength = bufferState.byteLength;
    var offset = toIntegerOrInfinity$a(byteOffset);
    if (offset < 0 || offset > bufferLength) throw new RangeError$3('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength$6(byteLength);
    if (offset + byteLength > bufferLength) throw new RangeError$3(WRONG_LENGTH$1);
    setInternalState$7(this, {
      type: DATA_VIEW,
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset,
      bytes: bufferState.bytes
    });
    if (!DESCRIPTORS$g) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  DataViewPrototype$2 = $DataView[PROTOTYPE];

  if (DESCRIPTORS$g) {
    addGetter$1($ArrayBuffer$1, 'byteLength', getInternalArrayBufferState);
    addGetter$1($DataView, 'buffer', getInternalDataViewState);
    addGetter$1($DataView, 'byteLength', getInternalDataViewState);
    addGetter$1($DataView, 'byteOffset', getInternalDataViewState);
  }

  defineBuiltIns$4(DataViewPrototype$2, {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : false), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set$1(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set$1(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set$1(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : false);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set$1(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : false);
    }
  });
} else {
  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$2 && NativeArrayBuffer$1.name !== ARRAY_BUFFER$1;
  /* eslint-disable no-new, sonarjs/inconsistent-function-call -- required for testing */
  if (!fails$x(function () {
    NativeArrayBuffer$1(1);
  }) || !fails$x(function () {
    new NativeArrayBuffer$1(-1);
  }) || fails$x(function () {
    new NativeArrayBuffer$1();
    new NativeArrayBuffer$1(1.5);
    new NativeArrayBuffer$1(NaN);
    return NativeArrayBuffer$1.length !== 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
    /* eslint-enable no-new, sonarjs/inconsistent-function-call -- required for testing */
    $ArrayBuffer$1 = function ArrayBuffer(length) {
      anInstance$7(this, ArrayBufferPrototype$3);
      return inheritIfRequired$3(new NativeArrayBuffer$1(toIndex$2(length)), this, $ArrayBuffer$1);
    };

    $ArrayBuffer$1[PROTOTYPE] = ArrayBufferPrototype$3;

    ArrayBufferPrototype$3.constructor = $ArrayBuffer$1;

    copyConstructorProperties($ArrayBuffer$1, NativeArrayBuffer$1);
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty$6(NativeArrayBuffer$1, 'name', ARRAY_BUFFER$1);
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf$3 && getPrototypeOf$2(DataViewPrototype$2) !== ObjectPrototype$1) {
    setPrototypeOf$3(DataViewPrototype$2, ObjectPrototype$1);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer$1(2));
  var $setInt8 = uncurryThis$K(DataViewPrototype$2.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns$4(DataViewPrototype$2, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag$5($ArrayBuffer$1, ARRAY_BUFFER$1);
setToStringTag$5($DataView, DATA_VIEW);

var arrayBuffer = {
  ArrayBuffer: $ArrayBuffer$1,
  DataView: $DataView
};

var getBuiltIn$8 = getBuiltIn$d;
var defineBuiltInAccessor$9 = defineBuiltInAccessor$b;
var wellKnownSymbol$h = wellKnownSymbol$p;
var DESCRIPTORS$f = descriptors;

var SPECIES$4 = wellKnownSymbol$h('species');

var setSpecies$4 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$8(CONSTRUCTOR_NAME);

  if (DESCRIPTORS$f && Constructor && !Constructor[SPECIES$4]) {
    defineBuiltInAccessor$9(Constructor, SPECIES$4, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var $$M = _export;
var globalThis$E = globalThis_1;
var arrayBufferModule = arrayBuffer;
var setSpecies$3 = setSpecies$4;

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer$6 = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = globalThis$E[ARRAY_BUFFER];

// `ArrayBuffer` constructor
// https://tc39.es/ecma262/#sec-arraybuffer-constructor
$$M({ global: true, constructor: true, forced: NativeArrayBuffer !== ArrayBuffer$6 }, {
  ArrayBuffer: ArrayBuffer$6
});

setSpecies$3(ARRAY_BUFFER);

var classofRaw = classofRaw$2;
var uncurryThis$J = functionUncurryThis;

var functionUncurryThisClause = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis$J(fn);
};

var $$L = _export;
var uncurryThis$I = functionUncurryThisClause;
var fails$w = fails$N;
var ArrayBufferModule$1 = arrayBuffer;
var anObject$l = anObject$q;
var toAbsoluteIndex$1 = toAbsoluteIndex$4;
var toLength$5 = toLength$9;

var ArrayBuffer$5 = ArrayBufferModule$1.ArrayBuffer;
var DataView$4 = ArrayBufferModule$1.DataView;
var DataViewPrototype$1 = DataView$4.prototype;
var nativeArrayBufferSlice = uncurryThis$I(ArrayBuffer$5.prototype.slice);
var getUint8 = uncurryThis$I(DataViewPrototype$1.getUint8);
var setUint8 = uncurryThis$I(DataViewPrototype$1.setUint8);

var INCORRECT_SLICE = fails$w(function () {
  return !new ArrayBuffer$5(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
$$L({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice && end === undefined) {
      return nativeArrayBufferSlice(anObject$l(this), start); // FF fix
    }
    var length = anObject$l(this).byteLength;
    var first = toAbsoluteIndex$1(start, length);
    var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
    var result = new ArrayBuffer$5(toLength$5(fin - first));
    var viewSource = new DataView$4(this);
    var viewTarget = new DataView$4(result);
    var index = 0;
    while (first < fin) {
      setUint8(viewTarget, index++, getUint8(viewSource, first++));
    } return result;
  }
});

var globalThis$D = globalThis_1;
var uncurryThisAccessor$2 = functionUncurryThisAccessor;
var classof$f = classofRaw$2;

var ArrayBuffer$4 = globalThis$D.ArrayBuffer;
var TypeError$6 = globalThis$D.TypeError;

// Includes
// - Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
// - If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
var arrayBufferByteLength$2 = ArrayBuffer$4 && uncurryThisAccessor$2(ArrayBuffer$4.prototype, 'byteLength', 'get') || function (O) {
  if (classof$f(O) !== 'ArrayBuffer') throw new TypeError$6('ArrayBuffer expected');
  return O.byteLength;
};

var globalThis$C = globalThis_1;
var NATIVE_ARRAY_BUFFER$1 = arrayBufferBasicDetection;
var arrayBufferByteLength$1 = arrayBufferByteLength$2;

var DataView$3 = globalThis$C.DataView;

var arrayBufferIsDetached = function (O) {
  if (!NATIVE_ARRAY_BUFFER$1 || arrayBufferByteLength$1(O) !== 0) return false;
  try {
    // eslint-disable-next-line no-new -- thrower
    new DataView$3(O);
    return false;
  } catch (error) {
    return true;
  }
};

var DESCRIPTORS$e = descriptors;
var defineBuiltInAccessor$8 = defineBuiltInAccessor$b;
var isDetached$1 = arrayBufferIsDetached;

var ArrayBufferPrototype$2 = ArrayBuffer.prototype;

// `ArrayBuffer.prototype.detached` getter
// https://tc39.es/ecma262/#sec-get-arraybuffer.prototype.detached
if (DESCRIPTORS$e && !('detached' in ArrayBufferPrototype$2)) {
  defineBuiltInAccessor$8(ArrayBufferPrototype$2, 'detached', {
    configurable: true,
    get: function detached() {
      return isDetached$1(this);
    }
  });
}

var isDetached = arrayBufferIsDetached;

var $TypeError$g = TypeError;

var arrayBufferNotDetached = function (it) {
  if (isDetached(it)) throw new $TypeError$g('ArrayBuffer is detached');
  return it;
};

/* global Bun, Deno -- detection */
var globalThis$B = globalThis_1;
var userAgent$4 = environmentUserAgent;
var classof$e = classofRaw$2;

var userAgentStartsWith = function (string) {
  return userAgent$4.slice(0, string.length) === string;
};

var environment = (function () {
  if (userAgentStartsWith('Bun/')) return 'BUN';
  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
  if (userAgentStartsWith('Deno/')) return 'DENO';
  if (userAgentStartsWith('Node.js/')) return 'NODE';
  if (globalThis$B.Bun && typeof Bun.version == 'string') return 'BUN';
  if (globalThis$B.Deno && typeof Deno.version == 'object') return 'DENO';
  if (classof$e(globalThis$B.process) === 'process') return 'NODE';
  if (globalThis$B.window && globalThis$B.document) return 'BROWSER';
  return 'REST';
})();

var ENVIRONMENT$2 = environment;

var environmentIsNode = ENVIRONMENT$2 === 'NODE';

var globalThis$A = globalThis_1;
var IS_NODE$3 = environmentIsNode;

var getBuiltInNodeModule$1 = function (name) {
  if (IS_NODE$3) {
    try {
      return globalThis$A.process.getBuiltinModule(name);
    } catch (error) { /* empty */ }
    try {
      // eslint-disable-next-line no-new-func -- safe
      return Function('return require("' + name + '")')();
    } catch (error) { /* empty */ }
  }
};

var globalThis$z = globalThis_1;
var fails$v = fails$N;
var V8$1 = environmentV8Version;
var ENVIRONMENT$1 = environment;

var structuredClone$2 = globalThis$z.structuredClone;

var structuredCloneProperTransfer = !!structuredClone$2 && !fails$v(function () {
  // prevent V8 ArrayBufferDetaching protector cell invalidation and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if ((ENVIRONMENT$1 === 'DENO' && V8$1 > 92) || (ENVIRONMENT$1 === 'NODE' && V8$1 > 94) || (ENVIRONMENT$1 === 'BROWSER' && V8$1 > 97)) return false;
  var buffer = new ArrayBuffer(8);
  var clone = structuredClone$2(buffer, { transfer: [buffer] });
  return buffer.byteLength !== 0 || clone.byteLength !== 8;
});

var globalThis$y = globalThis_1;
var getBuiltInNodeModule = getBuiltInNodeModule$1;
var PROPER_STRUCTURED_CLONE_TRANSFER$1 = structuredCloneProperTransfer;

var structuredClone$1 = globalThis$y.structuredClone;
var $ArrayBuffer = globalThis$y.ArrayBuffer;
var $MessageChannel = globalThis$y.MessageChannel;
var detach = false;
var WorkerThreads, channel$1, buffer, $detach;

if (PROPER_STRUCTURED_CLONE_TRANSFER$1) {
  detach = function (transferable) {
    structuredClone$1(transferable, { transfer: [transferable] });
  };
} else if ($ArrayBuffer) try {
  if (!$MessageChannel) {
    WorkerThreads = getBuiltInNodeModule('worker_threads');
    if (WorkerThreads) $MessageChannel = WorkerThreads.MessageChannel;
  }

  if ($MessageChannel) {
    channel$1 = new $MessageChannel();
    buffer = new $ArrayBuffer(2);

    $detach = function (transferable) {
      channel$1.port1.postMessage(null, [transferable]);
    };

    if (buffer.byteLength === 2) {
      $detach(buffer);
      if (buffer.byteLength === 0) detach = $detach;
    }
  }
} catch (error) { /* empty */ }

var detachTransferable$1 = detach;

var globalThis$x = globalThis_1;
var uncurryThis$H = functionUncurryThis;
var uncurryThisAccessor$1 = functionUncurryThisAccessor;
var toIndex$1 = toIndex$3;
var notDetached$4 = arrayBufferNotDetached;
var arrayBufferByteLength = arrayBufferByteLength$2;
var detachTransferable = detachTransferable$1;
var PROPER_STRUCTURED_CLONE_TRANSFER = structuredCloneProperTransfer;

var structuredClone = globalThis$x.structuredClone;
var ArrayBuffer$3 = globalThis$x.ArrayBuffer;
var DataView$2 = globalThis$x.DataView;
var min$3 = Math.min;
var ArrayBufferPrototype$1 = ArrayBuffer$3.prototype;
var DataViewPrototype = DataView$2.prototype;
var slice$3 = uncurryThis$H(ArrayBufferPrototype$1.slice);
var isResizable = uncurryThisAccessor$1(ArrayBufferPrototype$1, 'resizable', 'get');
var maxByteLength = uncurryThisAccessor$1(ArrayBufferPrototype$1, 'maxByteLength', 'get');
var getInt8 = uncurryThis$H(DataViewPrototype.getInt8);
var setInt8 = uncurryThis$H(DataViewPrototype.setInt8);

var arrayBufferTransfer = (PROPER_STRUCTURED_CLONE_TRANSFER || detachTransferable) && function (arrayBuffer, newLength, preserveResizability) {
  var byteLength = arrayBufferByteLength(arrayBuffer);
  var newByteLength = newLength === undefined ? byteLength : toIndex$1(newLength);
  var fixedLength = !isResizable || !isResizable(arrayBuffer);
  var newBuffer;
  notDetached$4(arrayBuffer);
  if (PROPER_STRUCTURED_CLONE_TRANSFER) {
    arrayBuffer = structuredClone(arrayBuffer, { transfer: [arrayBuffer] });
    if (byteLength === newByteLength && (preserveResizability || fixedLength)) return arrayBuffer;
  }
  if (byteLength >= newByteLength && (!preserveResizability || fixedLength)) {
    newBuffer = slice$3(arrayBuffer, 0, newByteLength);
  } else {
    var options = preserveResizability && !fixedLength && maxByteLength ? { maxByteLength: maxByteLength(arrayBuffer) } : undefined;
    newBuffer = new ArrayBuffer$3(newByteLength, options);
    var a = new DataView$2(arrayBuffer);
    var b = new DataView$2(newBuffer);
    var copyLength = min$3(newByteLength, byteLength);
    for (var i = 0; i < copyLength; i++) setInt8(b, i, getInt8(a, i));
  }
  if (!PROPER_STRUCTURED_CLONE_TRANSFER) detachTransferable(arrayBuffer);
  return newBuffer;
};

var $$K = _export;
var $transfer$1 = arrayBufferTransfer;

// `ArrayBuffer.prototype.transfer` method
// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfer
if ($transfer$1) $$K({ target: 'ArrayBuffer', proto: true }, {
  transfer: function transfer() {
    return $transfer$1(this, arguments.length ? arguments[0] : undefined, true);
  }
});

var $$J = _export;
var $transfer = arrayBufferTransfer;

// `ArrayBuffer.prototype.transferToFixedLength` method
// https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfertofixedlength
if ($transfer) $$J({ target: 'ArrayBuffer', proto: true }, {
  transferToFixedLength: function transferToFixedLength() {
    return $transfer(this, arguments.length ? arguments[0] : undefined, false);
  }
});

var DESCRIPTORS$d = descriptors;
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$7;

var createProperty$3 = function (object, key, value) {
  if (DESCRIPTORS$d) definePropertyModule$1.f(object, key, createPropertyDescriptor$2(0, value));
  else object[key] = value;
};

var $$I = _export;
var globalThis$w = globalThis_1;
var anInstance$6 = anInstance$8;
var anObject$k = anObject$q;
var isCallable$f = isCallable$v;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltInAccessor$7 = defineBuiltInAccessor$b;
var createProperty$2 = createProperty$3;
var fails$u = fails$N;
var hasOwn$c = hasOwnProperty_1;
var wellKnownSymbol$g = wellKnownSymbol$p;
var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var DESCRIPTORS$c = descriptors;

var CONSTRUCTOR = 'constructor';
var ITERATOR$8 = 'Iterator';
var TO_STRING_TAG$2 = wellKnownSymbol$g('toStringTag');

var $TypeError$f = TypeError;
var NativeIterator = globalThis$w[ITERATOR$8];

// FF56- have non-standard global helper `Iterator`
var FORCED$5 = !isCallable$f(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype$1
  // FF44- non-standard `Iterator` passes previous tests
  || !fails$u(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance$6(this, IteratorPrototype$1);
  if (getPrototypeOf$1(this) === IteratorPrototype$1) throw new $TypeError$f('Abstract class Iterator not directly constructable');
};

var defineIteratorPrototypeAccessor = function (key, value) {
  if (DESCRIPTORS$c) {
    defineBuiltInAccessor$7(IteratorPrototype$1, key, {
      configurable: true,
      get: function () {
        return value;
      },
      set: function (replacement) {
        anObject$k(this);
        if (this === IteratorPrototype$1) throw new $TypeError$f("You can't redefine this property");
        if (hasOwn$c(this, key)) this[key] = replacement;
        else createProperty$2(this, key, replacement);
      }
    });
  } else IteratorPrototype$1[key] = value;
};

if (!hasOwn$c(IteratorPrototype$1, TO_STRING_TAG$2)) defineIteratorPrototypeAccessor(TO_STRING_TAG$2, ITERATOR$8);

if (FORCED$5 || !hasOwn$c(IteratorPrototype$1, CONSTRUCTOR) || IteratorPrototype$1[CONSTRUCTOR] === Object) {
  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype$1;

// `Iterator` constructor
// https://tc39.es/ecma262/#sec-iterator
$$I({ global: true, constructor: true, forced: FORCED$5 }, {
  Iterator: IteratorConstructor
});

// `GetIteratorDirect(obj)` abstract operation
// https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
var getIteratorDirect$5 = function (obj) {
  return {
    iterator: obj,
    next: obj.next,
    done: false
  };
};

var call$s = functionCall;
var anObject$j = anObject$q;
var getMethod$5 = getMethod$7;

var iteratorClose$5 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$j(iterator);
  try {
    innerResult = getMethod$5(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$s(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$j(innerResult);
  return value;
};

var call$r = functionCall;
var create$4 = objectCreate$1;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$d;
var defineBuiltIns$3 = defineBuiltIns$5;
var wellKnownSymbol$f = wellKnownSymbol$p;
var InternalStateModule$7 = internalState;
var getMethod$4 = getMethod$7;
var IteratorPrototype = iteratorsCore.IteratorPrototype;
var createIterResultObject$2 = createIterResultObject$4;
var iteratorClose$4 = iteratorClose$5;

var TO_STRING_TAG$1 = wellKnownSymbol$f('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var setInternalState$6 = InternalStateModule$7.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule$7.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns$3(create$4(IteratorPrototype), {
    next: function next() {
      var state = getInternalState(this);
      // for simplification:
      //   for `%WrapForValidIteratorPrototype%.next` or with `state.returnHandlerResult` our `nextHandler` returns `IterResultObject`
      //   for `%IteratorHelperPrototype%.next` - just a value
      if (IS_ITERATOR) return state.nextHandler();
      if (state.done) return createIterResultObject$2(undefined, true);
      try {
        var result = state.nextHandler();
        return state.returnHandlerResult ? result : createIterResultObject$2(result, state.done);
      } catch (error) {
        state.done = true;
        throw error;
      }
    },
    'return': function () {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      if (IS_ITERATOR) {
        var returnMethod = getMethod$4(iterator, 'return');
        return returnMethod ? call$r(returnMethod, iterator) : createIterResultObject$2(undefined, true);
      }
      if (state.inner) try {
        iteratorClose$4(state.inner.iterator, 'normal');
      } catch (error) {
        return iteratorClose$4(iterator, 'throw', error);
      }
      if (iterator) iteratorClose$4(iterator, 'normal');
      return createIterResultObject$2(undefined, true);
    }
  });
};

var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
var IteratorHelperPrototype = createIteratorProxyPrototype(false);

createNonEnumerableProperty$5(IteratorHelperPrototype, TO_STRING_TAG$1, 'Iterator Helper');

var iteratorCreateProxy = function (nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
  var IteratorProxy = function Iterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    state.returnHandlerResult = !!RETURN_HANDLER_RESULT;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState$6(this, state);
  };

  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

  return IteratorProxy;
};

var anObject$i = anObject$q;
var iteratorClose$3 = iteratorClose$5;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$3 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$i(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose$3(iterator, 'throw', error);
  }
};

var $$H = _export;
var call$q = functionCall;
var aCallable$b = aCallable$f;
var anObject$h = anObject$q;
var getIteratorDirect$4 = getIteratorDirect$5;
var createIteratorProxy$1 = iteratorCreateProxy;
var callWithSafeIterationClosing$2 = callWithSafeIterationClosing$3;
var IS_PURE$2 = isPure;

var IteratorProxy$1 = createIteratorProxy$1(function () {
  var iterator = this.iterator;
  var predicate = this.predicate;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject$h(call$q(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing$2(iterator, predicate, [value, this.counter++], true)) return value;
  }
});

// `Iterator.prototype.filter` method
// https://tc39.es/ecma262/#sec-iterator.prototype.filter
$$H({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$2 }, {
  filter: function filter(predicate) {
    anObject$h(this);
    aCallable$b(predicate);
    return new IteratorProxy$1(getIteratorDirect$4(this), {
      predicate: predicate
    });
  }
});

var uncurryThis$G = functionUncurryThisClause;
var aCallable$a = aCallable$f;
var NATIVE_BIND = functionBindNative;

var bind$b = uncurryThis$G(uncurryThis$G.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$a(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$b(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var wellKnownSymbol$e = wellKnownSymbol$p;
var Iterators$1 = iterators;

var ITERATOR$7 = wellKnownSymbol$e('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$3 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$7] === it);
};

var classof$d = classof$i;
var getMethod$3 = getMethod$7;
var isNullOrUndefined$6 = isNullOrUndefined$9;
var Iterators = iterators;
var wellKnownSymbol$d = wellKnownSymbol$p;

var ITERATOR$6 = wellKnownSymbol$d('iterator');

var getIteratorMethod$5 = function (it) {
  if (!isNullOrUndefined$6(it)) return getMethod$3(it, ITERATOR$6)
    || getMethod$3(it, '@@iterator')
    || Iterators[classof$d(it)];
};

var call$p = functionCall;
var aCallable$9 = aCallable$f;
var anObject$g = anObject$q;
var tryToString$3 = tryToString$6;
var getIteratorMethod$4 = getIteratorMethod$5;

var $TypeError$e = TypeError;

var getIterator$4 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$4(argument) : usingIterator;
  if (aCallable$9(iteratorMethod)) return anObject$g(call$p(iteratorMethod, argument));
  throw new $TypeError$e(tryToString$3(argument) + ' is not iterable');
};

var bind$a = functionBindContext;
var call$o = functionCall;
var anObject$f = anObject$q;
var tryToString$2 = tryToString$6;
var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
var lengthOfArrayLike$b = lengthOfArrayLike$i;
var isPrototypeOf$4 = objectIsPrototypeOf;
var getIterator$3 = getIterator$4;
var getIteratorMethod$3 = getIteratorMethod$5;
var iteratorClose$2 = iteratorClose$5;

var $TypeError$d = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$8 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$a(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose$2(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$f(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$3(iterable);
    if (!iterFn) throw new $TypeError$d(tryToString$2(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod$2(iterFn)) {
      for (index = 0, length = lengthOfArrayLike$b(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf$4(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator$3(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$o(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose$2(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf$4(ResultPrototype, result)) return result;
  } return new Result(false);
};

var $$G = _export;
var iterate$7 = iterate$8;
var aCallable$8 = aCallable$f;
var anObject$e = anObject$q;
var getIteratorDirect$3 = getIteratorDirect$5;

// `Iterator.prototype.forEach` method
// https://tc39.es/ecma262/#sec-iterator.prototype.foreach
$$G({ target: 'Iterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    anObject$e(this);
    aCallable$8(fn);
    var record = getIteratorDirect$3(this);
    var counter = 0;
    iterate$7(record, function (value) {
      fn(value, counter++);
    }, { IS_RECORD: true });
  }
});

var call$n = functionCall;
var aCallable$7 = aCallable$f;
var anObject$d = anObject$q;
var getIteratorDirect$2 = getIteratorDirect$5;
var createIteratorProxy = iteratorCreateProxy;
var callWithSafeIterationClosing$1 = callWithSafeIterationClosing$3;

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject$d(call$n(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing$1(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
var iteratorMap = function map(mapper) {
  anObject$d(this);
  aCallable$7(mapper);
  return new IteratorProxy(getIteratorDirect$2(this), {
    mapper: mapper
  });
};

var $$F = _export;
var map = iteratorMap;
var IS_PURE$1 = isPure;

// `Iterator.prototype.map` method
// https://tc39.es/ecma262/#sec-iterator.prototype.map
$$F({ target: 'Iterator', proto: true, real: true, forced: IS_PURE$1 }, {
  map: map
});

var $$E = _export;
var anObject$c = anObject$q;
var iterate$6 = iterate$8;
var getIteratorDirect$1 = getIteratorDirect$5;

var push$9 = [].push;

// `Iterator.prototype.toArray` method
// https://tc39.es/ecma262/#sec-iterator.prototype.toarray
$$E({ target: 'Iterator', proto: true, real: true }, {
  toArray: function toArray() {
    var result = [];
    iterate$6(getIteratorDirect$1(anObject$c(this)), push$9, { that: result, IS_RECORD: true });
    return result;
  }
});

var uncurryThis$F = functionUncurryThis;
var isArray$3 = isArray$5;
var isCallable$e = isCallable$v;
var classof$c = classofRaw$2;
var toString$j = toString$m;

var push$8 = uncurryThis$F([].push);

var getJsonReplacerFunction = function (replacer) {
  if (isCallable$e(replacer)) return replacer;
  if (!isArray$3(replacer)) return;
  var rawLength = replacer.length;
  var keys = [];
  for (var i = 0; i < rawLength; i++) {
    var element = replacer[i];
    if (typeof element == 'string') push$8(keys, element);
    else if (typeof element == 'number' || classof$c(element) === 'Number' || classof$c(element) === 'String') push$8(keys, toString$j(element));
  }
  var keysLength = keys.length;
  var root = true;
  return function (key, value) {
    if (root) {
      root = false;
      return value;
    }
    if (isArray$3(this)) return value;
    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
  };
};

var $$D = _export;
var getBuiltIn$7 = getBuiltIn$d;
var apply$3 = functionApply;
var call$m = functionCall;
var uncurryThis$E = functionUncurryThis;
var fails$t = fails$N;
var isCallable$d = isCallable$v;
var isSymbol$1 = isSymbol$4;
var arraySlice$4 = arraySlice$7;
var getReplacerFunction = getJsonReplacerFunction;
var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var $String$2 = String;
var $stringify = getBuiltIn$7('JSON', 'stringify');
var exec$a = uncurryThis$E(/./.exec);
var charAt$b = uncurryThis$E(''.charAt);
var charCodeAt$2 = uncurryThis$E(''.charCodeAt);
var replace$7 = uncurryThis$E(''.replace);
var numberToString$2 = uncurryThis$E(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$1 || fails$t(function () {
  var symbol = getBuiltIn$7('Symbol')('stringify detection');
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) !== '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) !== '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) !== '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails$t(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice$4(arguments);
  var $replacer = getReplacerFunction(replacer);
  if (!isCallable$d($replacer) && (it === undefined || isSymbol$1(it))) return; // IE8 returns string on undefined
  args[1] = function (key, value) {
    // some old implementations (like WebKit) could pass numbers as keys
    if (isCallable$d($replacer)) value = call$m($replacer, this, $String$2(key), value);
    if (!isSymbol$1(value)) return value;
  };
  return apply$3($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt$b(string, offset - 1);
  var next = charAt$b(string, offset + 1);
  if ((exec$a(low, match) && !exec$a(hi, next)) || (exec$a(hi, match) && !exec$a(low, prev))) {
    return '\\u' + numberToString$2(charCodeAt$2(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $$D({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice$4(arguments);
      var result = apply$3(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace$7(result, tester, fixIllFormed) : result;
    }
  });
}

var uncurryThis$D = functionUncurryThis;

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
var thisNumberValue$1 = uncurryThis$D(1.0.valueOf);

var toIntegerOrInfinity$9 = toIntegerOrInfinity$f;
var toString$i = toString$m;
var requireObjectCoercible$9 = requireObjectCoercible$d;

var $RangeError$7 = RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
var stringRepeat = function repeat(count) {
  var str = toString$i(requireObjectCoercible$9(this));
  var result = '';
  var n = toIntegerOrInfinity$9(count);
  if (n < 0 || n === Infinity) throw new $RangeError$7('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};

var $$C = _export;
var uncurryThis$C = functionUncurryThis;
var toIntegerOrInfinity$8 = toIntegerOrInfinity$f;
var thisNumberValue = thisNumberValue$1;
var $repeat$1 = stringRepeat;
var fails$s = fails$N;

var $RangeError$6 = RangeError;
var $String$1 = String;
var floor$4 = Math.floor;
var repeat$1 = uncurryThis$C($repeat$1);
var stringSlice$a = uncurryThis$C(''.slice);
var nativeToFixed = uncurryThis$C(1.0.toFixed);

var pow$1 = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow$1(x, n - 1, acc * x) : pow$1(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor$4(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor$4(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = $String$1(data[index]);
      s = s === '' ? t : s + repeat$1('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED$4 = fails$s(function () {
  return nativeToFixed(0.00008, 3) !== '0.000' ||
    nativeToFixed(0.9, 0) !== '1' ||
    nativeToFixed(1.255, 2) !== '1.25' ||
    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails$s(function () {
  // V8 ~ Android 4.3-
  nativeToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$$C({ target: 'Number', proto: true, forced: FORCED$4 }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity$8(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
    if (fractDigits < 0 || fractDigits > 20) throw new $RangeError$6('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number !== number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return $String$1(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow$1(2, 69, 1)) - 69;
      z = e < 0 ? number * pow$1(2, -e, 1) : number / pow$1(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow$1(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat$1('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat$1('0', fractDigits - k) + result
        : stringSlice$a(result, 0, k - fractDigits) + '.' + stringSlice$a(result, k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});

var DESCRIPTORS$b = descriptors;
var uncurryThis$B = functionUncurryThis;
var call$l = functionCall;
var fails$r = fails$N;
var objectKeys = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$6 = toObject$e;
var IndexedObject$3 = indexedObject;

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty$2 = Object.defineProperty;
var concat$1 = uncurryThis$B([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$r(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$b && $assign({ b: 1 }, $assign(defineProperty$2({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$2(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol('assign detection');
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$6(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject$3(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat$1(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$b || call$l(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

var $$B = _export;
var assign$1 = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$$B({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign$1 }, {
  assign: assign$1
});

// a string of all valid unicode whitespaces
var whitespaces$4 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var uncurryThis$A = functionUncurryThis;
var requireObjectCoercible$8 = requireObjectCoercible$d;
var toString$h = toString$m;
var whitespaces$3 = whitespaces$4;

var replace$6 = uncurryThis$A(''.replace);
var ltrim = RegExp('^[' + whitespaces$3 + ']+');
var rtrim = RegExp('(^|[^' + whitespaces$3 + '])[' + whitespaces$3 + ']+$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$4 = function (TYPE) {
  return function ($this) {
    var string = toString$h(requireObjectCoercible$8($this));
    if (TYPE & 1) string = replace$6(string, ltrim, '');
    if (TYPE & 2) string = replace$6(string, rtrim, '$1');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$4(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$4(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$4(3)
};

var globalThis$v = globalThis_1;
var fails$q = fails$N;
var uncurryThis$z = functionUncurryThis;
var toString$g = toString$m;
var trim$1 = stringTrim.trim;
var whitespaces$2 = whitespaces$4;

var charAt$a = uncurryThis$z(''.charAt);
var $parseFloat$1 = globalThis$v.parseFloat;
var Symbol$2 = globalThis$v.Symbol;
var ITERATOR$5 = Symbol$2 && Symbol$2.iterator;
var FORCED$3 = 1 / $parseFloat$1(whitespaces$2 + '-0') !== -Infinity
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR$5 && !fails$q(function () { $parseFloat$1(Object(ITERATOR$5)); }));

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
var numberParseFloat = FORCED$3 ? function parseFloat(string) {
  var trimmedString = trim$1(toString$g(string));
  var result = $parseFloat$1(trimmedString);
  return result === 0 && charAt$a(trimmedString, 0) === '-' ? -0 : result;
} : $parseFloat$1;

var $$A = _export;
var $parseFloat = numberParseFloat;

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
$$A({ global: true, forced: parseFloat !== $parseFloat }, {
  parseFloat: $parseFloat
});

var globalThis$u = globalThis_1;
var fails$p = fails$N;
var uncurryThis$y = functionUncurryThis;
var toString$f = toString$m;
var trim = stringTrim.trim;
var whitespaces$1 = whitespaces$4;

var $parseInt$3 = globalThis$u.parseInt;
var Symbol$1 = globalThis$u.Symbol;
var ITERATOR$4 = Symbol$1 && Symbol$1.iterator;
var hex = /^[+-]?0x/i;
var exec$9 = uncurryThis$y(hex.exec);
var FORCED$2 = $parseInt$3(whitespaces$1 + '08') !== 8 || $parseInt$3(whitespaces$1 + '0x16') !== 22
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR$4 && !fails$p(function () { $parseInt$3(Object(ITERATOR$4)); }));

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
var numberParseInt = FORCED$2 ? function parseInt(string, radix) {
  var S = trim(toString$f(string));
  return $parseInt$3(S, (radix >>> 0) || (exec$9(hex, S) ? 16 : 10));
} : $parseInt$3;

var $$z = _export;
var $parseInt$2 = numberParseInt;

// `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix
$$z({ global: true, forced: parseInt !== $parseInt$2 }, {
  parseInt: $parseInt$2
});

var uncurryThis$x = functionUncurryThis;
var fails$o = fails$N;
var isCallable$c = isCallable$v;
var classof$b = classof$i;
var getBuiltIn$6 = getBuiltIn$d;
var inspectSource$1 = inspectSource$3;

var noop = function () { /* empty */ };
var construct = getBuiltIn$6('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$8 = uncurryThis$x(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$c(argument)) return false;
  try {
    construct(noop, [], argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$c(argument)) return false;
  switch (classof$b(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec$8(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$3 = !construct || fails$o(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isConstructor$2 = isConstructor$3;
var tryToString$1 = tryToString$6;

var $TypeError$c = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$2 = function (argument) {
  if (isConstructor$2(argument)) return argument;
  throw new $TypeError$c(tryToString$1(argument) + ' is not a constructor');
};

var anObject$b = anObject$q;
var aConstructor$1 = aConstructor$2;
var isNullOrUndefined$5 = isNullOrUndefined$9;
var wellKnownSymbol$c = wellKnownSymbol$p;

var SPECIES$3 = wellKnownSymbol$c('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$2 = function (O, defaultConstructor) {
  var C = anObject$b(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined$5(S = anObject$b(C)[SPECIES$3]) ? defaultConstructor : aConstructor$1(S);
};

var $TypeError$b = TypeError;

var validateArgumentsLength$5 = function (passed, required) {
  if (passed < required) throw new $TypeError$b('Not enough arguments');
  return passed;
};

var userAgent$3 = environmentUserAgent;

// eslint-disable-next-line redos/no-vulnerable -- safe
var environmentIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$3);

var globalThis$t = globalThis_1;
var apply$2 = functionApply;
var bind$9 = functionBindContext;
var isCallable$b = isCallable$v;
var hasOwn$b = hasOwnProperty_1;
var fails$n = fails$N;
var html = html$2;
var arraySlice$3 = arraySlice$7;
var createElement = documentCreateElement$2;
var validateArgumentsLength$4 = validateArgumentsLength$5;
var IS_IOS$1 = environmentIsIos;
var IS_NODE$2 = environmentIsNode;

var set = globalThis$t.setImmediate;
var clear = globalThis$t.clearImmediate;
var process$2 = globalThis$t.process;
var Dispatch = globalThis$t.Dispatch;
var Function$1 = globalThis$t.Function;
var MessageChannel = globalThis$t.MessageChannel;
var String$1 = globalThis$t.String;
var counter = 0;
var queue$2 = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;

fails$n(function () {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = globalThis$t.location;
});

var run = function (id) {
  if (hasOwn$b(queue$2, id)) {
    var fn = queue$2[id];
    delete queue$2[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var eventListener = function (event) {
  run(event.data);
};

var globalPostMessageDefer = function (id) {
  // old engines have not location.origin
  globalThis$t.postMessage(String$1(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength$4(arguments.length, 1);
    var fn = isCallable$b(handler) ? handler : Function$1(handler);
    var args = arraySlice$3(arguments, 1);
    queue$2[++counter] = function () {
      apply$2(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue$2[id];
  };
  // Node.js 0.8-
  if (IS_NODE$2) {
    defer = function (id) {
      process$2.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = eventListener;
    defer = bind$9(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    globalThis$t.addEventListener &&
    isCallable$b(globalThis$t.postMessage) &&
    !globalThis$t.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails$n(globalPostMessageDefer)
  ) {
    defer = globalPostMessageDefer;
    globalThis$t.addEventListener('message', eventListener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear
};

var globalThis$s = globalThis_1;
var DESCRIPTORS$a = descriptors;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
var safeGetBuiltIn$2 = function (name) {
  if (!DESCRIPTORS$a) return globalThis$s[name];
  var descriptor = getOwnPropertyDescriptor$2(globalThis$s, name);
  return descriptor && descriptor.value;
};

var Queue$2 = function () {
  this.head = null;
  this.tail = null;
};

Queue$2.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    var tail = this.tail;
    if (tail) tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      var next = this.head = entry.next;
      if (next === null) this.tail = null;
      return entry.item;
    }
  }
};

var queue$1 = Queue$2;

var userAgent$2 = environmentUserAgent;

var environmentIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$2) && typeof Pebble != 'undefined';

var userAgent$1 = environmentUserAgent;

var environmentIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$1);

var globalThis$r = globalThis_1;
var safeGetBuiltIn$1 = safeGetBuiltIn$2;
var bind$8 = functionBindContext;
var macrotask = task$1.set;
var Queue$1 = queue$1;
var IS_IOS = environmentIsIos;
var IS_IOS_PEBBLE = environmentIsIosPebble;
var IS_WEBOS_WEBKIT = environmentIsWebosWebkit;
var IS_NODE$1 = environmentIsNode;

var MutationObserver = globalThis$r.MutationObserver || globalThis$r.WebKitMutationObserver;
var document$2 = globalThis$r.document;
var process$1 = globalThis$r.process;
var Promise$1 = globalThis$r.Promise;
var microtask$1 = safeGetBuiltIn$1('queueMicrotask');
var notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!microtask$1) {
  var queue = new Queue$1();

  var flush = function () {
    var parent, fn;
    if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
    while (fn = queue.get()) try {
      fn();
    } catch (error) {
      if (queue.head) notify$1();
      throw error;
    }
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = bind$8(promise.then, promise);
    notify$1 = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE$1) {
    notify$1 = function () {
      process$1.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // `webpack` dev server bug on IE global methods - use bind(fn, global)
    macrotask = bind$8(macrotask, globalThis$r);
    notify$1 = function () {
      macrotask(flush);
    };
  }

  microtask$1 = function (fn) {
    if (!queue.head) notify$1();
    queue.add(fn);
  };
}

var microtask_1 = microtask$1;

var hostReportErrors$1 = function (a, b) {
  try {
    // eslint-disable-next-line no-console -- safe
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  } catch (error) { /* empty */ }
};

var perform$3 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var globalThis$q = globalThis_1;

var promiseNativeConstructor = globalThis$q.Promise;

var globalThis$p = globalThis_1;
var NativePromiseConstructor$4 = promiseNativeConstructor;
var isCallable$a = isCallable$v;
var isForced$2 = isForced_1;
var inspectSource = inspectSource$3;
var wellKnownSymbol$b = wellKnownSymbol$p;
var ENVIRONMENT = environment;
var V8_VERSION = environmentV8Version;

NativePromiseConstructor$4 && NativePromiseConstructor$4.prototype;
var SPECIES$2 = wellKnownSymbol$b('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$a(globalThis$p.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$2('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$4);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$4);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    // Detect correctness of subclassing with @@species support
    var promise = new NativePromiseConstructor$4(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES$2] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  } return !GLOBAL_CORE_JS_PROMISE && (ENVIRONMENT === 'BROWSER' || ENVIRONMENT === 'DENO') && !NATIVE_PROMISE_REJECTION_EVENT$1;
});

var promiseConstructorDetection = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
  SUBCLASSING: SUBCLASSING
};

var newPromiseCapability$2 = {};

var aCallable$6 = aCallable$f;

var $TypeError$a = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw new $TypeError$a('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$6(resolve);
  this.reject = aCallable$6(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var $$y = _export;
var IS_NODE = environmentIsNode;
var globalThis$o = globalThis_1;
var call$k = functionCall;
var defineBuiltIn$b = defineBuiltIn$g;
var setPrototypeOf$2 = objectSetPrototypeOf;
var setToStringTag$4 = setToStringTag$8;
var setSpecies$2 = setSpecies$4;
var aCallable$5 = aCallable$f;
var isCallable$9 = isCallable$v;
var isObject$e = isObject$p;
var anInstance$5 = anInstance$8;
var speciesConstructor$1 = speciesConstructor$2;
var task = task$1.set;
var microtask = microtask_1;
var hostReportErrors = hostReportErrors$1;
var perform$2 = perform$3;
var Queue = queue$1;
var InternalStateModule$6 = internalState;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule$6.getterFor(PROMISE);
var setInternalState$5 = InternalStateModule$6.set;
var NativePromisePrototype$2 = NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var PromiseConstructor = NativePromiseConstructor$3;
var PromisePrototype = NativePromisePrototype$2;
var TypeError$5 = globalThis$o.TypeError;
var document$1 = globalThis$o.document;
var process = globalThis$o.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;

var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && globalThis$o.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject$e(it) && isCallable$9(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state === FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(new TypeError$5('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call$k(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    globalThis$o.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = globalThis$o['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call$k(task, globalThis$o, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call$k(task, globalThis$o, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$7 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw new TypeError$5("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call$k(then, value,
            bind$7(internalResolve, wrapper, state),
            bind$7(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR$4) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance$5(this, PromisePrototype);
    aCallable$5(executor);
    call$k(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$7(internalResolve, state), bind$7(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState$5(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: null
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn$b(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability$1(speciesConstructor$1(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable$9(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable$9(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process.domain : undefined;
    if (state.state === PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind$7(internalResolve, state);
    this.reject = bind$7(internalReject, state);
  };

  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (isCallable$9(NativePromiseConstructor$3) && NativePromisePrototype$2 !== Object.prototype) {
    nativeThen = NativePromisePrototype$2.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn$b(NativePromisePrototype$2, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call$k(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype$2.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf$2) {
      setPrototypeOf$2(NativePromisePrototype$2, PromisePrototype);
    }
  }
}

// `Promise` constructor
// https://tc39.es/ecma262/#sec-promise-executor
$$y({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
  Promise: PromiseConstructor
});

setToStringTag$4(PromiseConstructor, PROMISE, false);
setSpecies$2(PROMISE);

var wellKnownSymbol$a = wellKnownSymbol$p;

var ITERATOR$3 = wellKnownSymbol$a('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$3] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$3 = function (exec, SKIP_CLOSING) {
  try {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  } catch (error) { return false; } // workaround of old WebKit + `eval` bug
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$3] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var NativePromiseConstructor$2 = promiseNativeConstructor;
var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$3;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$2(function (iterable) {
  NativePromiseConstructor$2.all(iterable).then(undefined, function () { /* empty */ });
});

var $$x = _export;
var call$j = functionCall;
var aCallable$4 = aCallable$f;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$5 = iterate$8;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$$x({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$2.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var $promiseResolve = aCallable$4(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$5(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call$j($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$w = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor$1 = promiseNativeConstructor;
var getBuiltIn$5 = getBuiltIn$d;
var isCallable$8 = isCallable$v;
var defineBuiltIn$a = defineBuiltIn$g;

var NativePromisePrototype$1 = NativePromiseConstructor$1 && NativePromiseConstructor$1.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$$w({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (isCallable$8(NativePromiseConstructor$1)) {
  var method$1 = getBuiltIn$5('Promise').prototype['catch'];
  if (NativePromisePrototype$1['catch'] !== method$1) {
    defineBuiltIn$a(NativePromisePrototype$1, 'catch', method$1, { unsafe: true });
  }
}

var $$v = _export;
var call$i = functionCall;
var aCallable$3 = aCallable$f;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate$4 = iterate$8;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$$v({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable$3(C.resolve);
      iterate$4(iterable, function (promise) {
        call$i($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$u = _export;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$$u({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    var capabilityReject = capability.reject;
    capabilityReject(r);
    return capability.promise;
  }
});

var anObject$a = anObject$q;
var isObject$d = isObject$p;
var newPromiseCapability = newPromiseCapability$2;

var promiseResolve$2 = function (C, x) {
  anObject$a(C);
  if (isObject$d(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$t = _export;
var getBuiltIn$4 = getBuiltIn$d;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve$1 = promiseResolve$2;

getBuiltIn$4('Promise');

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$$t({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve$1(this, x);
  }
});

var $$s = _export;
var NativePromiseConstructor = promiseNativeConstructor;
var fails$m = fails$N;
var getBuiltIn$3 = getBuiltIn$d;
var isCallable$7 = isCallable$v;
var speciesConstructor = speciesConstructor$2;
var promiseResolve = promiseResolve$2;
var defineBuiltIn$9 = defineBuiltIn$g;

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromiseConstructor && fails$m(function () {
  // eslint-disable-next-line unicorn/no-thenable -- required for testing
  NativePromisePrototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$$s({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn$3('Promise'));
    var isFunction = isCallable$7(onFinally);
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
if (isCallable$7(NativePromiseConstructor)) {
  var method = getBuiltIn$3('Promise').prototype['finally'];
  if (NativePromisePrototype['finally'] !== method) {
    defineBuiltIn$9(NativePromisePrototype, 'finally', method, { unsafe: true });
  }
}

var isObject$c = isObject$p;
var classof$a = classofRaw$2;
var wellKnownSymbol$9 = wellKnownSymbol$p;

var MATCH$2 = wellKnownSymbol$9('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$c(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$a(it) === 'RegExp');
};

var anObject$9 = anObject$q;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$9(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

var call$h = functionCall;
var hasOwn$a = hasOwnProperty_1;
var isPrototypeOf$3 = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;

var RegExpPrototype$4 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype$4) && !hasOwn$a(R, 'flags') && isPrototypeOf$3(RegExpPrototype$4, R)
    ? call$h(regExpFlags, R) : flags;
};

var fails$l = fails$N;
var globalThis$n = globalThis_1;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = globalThis$n.RegExp;

var UNSUPPORTED_Y$2 = fails$l(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') !== null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY$1 = UNSUPPORTED_Y$2 || fails$l(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$l(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') !== null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY$1,
  UNSUPPORTED_Y: UNSUPPORTED_Y$2
};

var fails$k = fails$N;
var globalThis$m = globalThis_1;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = globalThis$m.RegExp;

var regexpUnsupportedDotAll = fails$k(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.test('\n') && re.flags === 's');
});

var fails$j = fails$N;
var globalThis$l = globalThis_1;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = globalThis$l.RegExp;

var regexpUnsupportedNcg = fails$j(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

var DESCRIPTORS$9 = descriptors;
var globalThis$k = globalThis_1;
var uncurryThis$w = functionUncurryThis;
var isForced$1 = isForced_1;
var inheritIfRequired$2 = inheritIfRequired$5;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$d;
var create$3 = objectCreate$1;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var isPrototypeOf$2 = objectIsPrototypeOf;
var isRegExp$1 = isRegexp;
var toString$e = toString$m;
var getRegExpFlags$1 = regexpGetFlags;
var stickyHelpers$1 = regexpStickyHelpers;
var proxyAccessor = proxyAccessor$2;
var defineBuiltIn$8 = defineBuiltIn$g;
var fails$i = fails$N;
var hasOwn$9 = hasOwnProperty_1;
var enforceInternalState$3 = internalState.enforce;
var setSpecies$1 = setSpecies$4;
var wellKnownSymbol$8 = wellKnownSymbol$p;
var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

var MATCH$1 = wellKnownSymbol$8('match');
var NativeRegExp = globalThis$k.RegExp;
var RegExpPrototype$3 = NativeRegExp.prototype;
var SyntaxError$4 = globalThis$k.SyntaxError;
var exec$7 = uncurryThis$w(RegExpPrototype$3.exec);
var charAt$9 = uncurryThis$w(''.charAt);
var replace$5 = uncurryThis$w(''.replace);
var stringIndexOf$2 = uncurryThis$w(''.indexOf);
var stringSlice$9 = uncurryThis$w(''.slice);
// TODO: Use only proper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var MISSED_STICKY = stickyHelpers$1.MISSED_STICKY;
var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS$9 &&
  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$1 || fails$i(function () {
    re2[MATCH$1] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    // eslint-disable-next-line sonarjs/inconsistent-function-call -- required for testing
    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = charAt$9(string, index);
    if (chr === '\\') {
      result += chr + charAt$9(string, ++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = create$3(null);
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = charAt$9(string, index);
    if (chr === '\\') {
      chr += charAt$9(string, ++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        result += chr;
        // ignore non-capturing groups
        if (stringSlice$9(string, index + 1, index + 3) === '?:') {
          continue;
        }
        if (exec$7(IS_NCG, stringSlice$9(string, index + 1))) {
          index += 2;
          ncg = true;
        }
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || hasOwn$9(names, groupname)) {
          throw new SyntaxError$4('Invalid capture group name');
        }
        names[groupname] = true;
        named[named.length] = [groupname, groupid];
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced$1('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = isPrototypeOf$2(RegExpPrototype$3, this);
    var patternIsRegExp = isRegExp$1(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf$2(RegExpPrototype$3, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = getRegExpFlags$1(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString$e(pattern);
    flags = flags === undefined ? '' : toString$e(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL$2 && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf$2(flags, 's') > -1;
      if (dotAll) flags = replace$5(flags, /s/g, '');
    }

    rawFlags = flags;

    if (MISSED_STICKY && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf$2(flags, 'y') > -1;
      if (sticky && UNSUPPORTED_Y$1) flags = replace$5(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG$1) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired$2(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$3, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState$3(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty$4(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  for (var keys$1 = getOwnPropertyNames$1(NativeRegExp), index = 0; keys$1.length > index;) {
    proxyAccessor(RegExpWrapper, NativeRegExp, keys$1[index++]);
  }

  RegExpPrototype$3.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype$3;
  defineBuiltIn$8(globalThis$k, 'RegExp', RegExpWrapper, { constructor: true });
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies$1('RegExp');

var DESCRIPTORS$8 = descriptors;
var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
var classof$9 = classofRaw$2;
var defineBuiltInAccessor$6 = defineBuiltInAccessor$b;
var getInternalState$4 = internalState.get;

var RegExpPrototype$2 = RegExp.prototype;
var $TypeError$9 = TypeError;

// `RegExp.prototype.dotAll` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
if (DESCRIPTORS$8 && UNSUPPORTED_DOT_ALL$1) {
  defineBuiltInAccessor$6(RegExpPrototype$2, 'dotAll', {
    configurable: true,
    get: function dotAll() {
      if (this === RegExpPrototype$2) return;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (classof$9(this) === 'RegExp') {
        return !!getInternalState$4(this).dotAll;
      }
      throw new $TypeError$9('Incompatible receiver, RegExp required');
    }
  });
}

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$g = functionCall;
var uncurryThis$v = functionUncurryThis;
var toString$d = toString$m;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4;
var create$2 = objectCreate$1;
var getInternalState$3 = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$8 = uncurryThis$v(''.charAt);
var indexOf = uncurryThis$v(''.indexOf);
var replace$4 = uncurryThis$v(''.replace);
var stringSlice$8 = uncurryThis$v(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$g(nativeExec, re1, 'a');
  call$g(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState$3(re);
    var str = toString$d(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$g(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$g(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$4(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$8(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$8(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call$g(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$8(match.input, charsAdded);
        match[0] = stringSlice$8(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call$g(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create$2(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $$r = _export;
var exec$6 = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$r({ target: 'RegExp', proto: true, forced: /./.exec !== exec$6 }, {
  exec: exec$6
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var $$q = _export;
var call$f = functionCall;
var isCallable$6 = isCallable$v;
var anObject$8 = anObject$q;
var toString$c = toString$m;

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var nativeTest = /./.test;

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$$q({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (S) {
    var R = anObject$8(this);
    var string = toString$c(S);
    var exec = R.exec;
    if (!isCallable$6(exec)) return call$f(nativeTest, R, string);
    var result = call$f(exec, R, string);
    if (result === null) return false;
    anObject$8(result);
    return true;
  }
});

var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
var defineBuiltIn$7 = defineBuiltIn$g;
var anObject$7 = anObject$q;
var $toString$2 = toString$m;
var fails$h = fails$N;
var getRegExpFlags = regexpGetFlags;

var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];

var NOT_GENERIC = fails$h(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name !== TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn$7(RegExpPrototype$1, TO_STRING, function toString() {
    var R = anObject$7(this);
    var pattern = $toString$2(R.source);
    var flags = $toString$2(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}

var uncurryThis$u = functionUncurryThis;

// eslint-disable-next-line es/no-set -- safe
var SetPrototype$1 = Set.prototype;

var setHelpers = {
  // eslint-disable-next-line es/no-set -- safe
  Set: Set,
  add: uncurryThis$u(SetPrototype$1.add),
  has: uncurryThis$u(SetPrototype$1.has),
  remove: uncurryThis$u(SetPrototype$1['delete']),
  proto: SetPrototype$1
};

var has$5 = setHelpers.has;

// Perform ? RequireInternalSlot(M, [[SetData]])
var aSet$7 = function (it) {
  has$5(it);
  return it;
};

var call$e = functionCall;

var iterateSimple$7 = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
  var next = record.next;
  var step, result;
  while (!(step = call$e(next, iterator)).done) {
    result = fn(step.value);
    if (result !== undefined) return result;
  }
};

var uncurryThis$t = functionUncurryThis;
var iterateSimple$6 = iterateSimple$7;
var SetHelpers$5 = setHelpers;

var Set$3 = SetHelpers$5.Set;
var SetPrototype = SetHelpers$5.proto;
var forEach$3 = uncurryThis$t(SetPrototype.forEach);
var keys = uncurryThis$t(SetPrototype.keys);
var next = keys(new Set$3()).next;

var setIterate = function (set, fn, interruptible) {
  return interruptible ? iterateSimple$6({ iterator: keys(set), next: next }, fn) : forEach$3(set, fn);
};

var SetHelpers$4 = setHelpers;
var iterate$3 = setIterate;

var Set$2 = SetHelpers$4.Set;
var add$3 = SetHelpers$4.add;

var setClone = function (set) {
  var result = new Set$2();
  iterate$3(set, function (it) {
    add$3(result, it);
  });
  return result;
};

var uncurryThisAccessor = functionUncurryThisAccessor;
var SetHelpers$3 = setHelpers;

var setSize = uncurryThisAccessor(SetHelpers$3.proto, 'size', 'get') || function (set) {
  return set.size;
};

var aCallable$2 = aCallable$f;
var anObject$6 = anObject$q;
var call$d = functionCall;
var toIntegerOrInfinity$7 = toIntegerOrInfinity$f;
var getIteratorDirect = getIteratorDirect$5;

var INVALID_SIZE = 'Invalid size';
var $RangeError$5 = RangeError;
var $TypeError$8 = TypeError;
var max$1 = Math.max;

var SetRecord = function (set, intSize) {
  this.set = set;
  this.size = max$1(intSize, 0);
  this.has = aCallable$2(set.has);
  this.keys = aCallable$2(set.keys);
};

SetRecord.prototype = {
  getIterator: function () {
    return getIteratorDirect(anObject$6(call$d(this.keys, this.set)));
  },
  includes: function (it) {
    return call$d(this.has, this.set, it);
  }
};

// `GetSetRecord` abstract operation
// https://tc39.es/proposal-set-methods/#sec-getsetrecord
var getSetRecord$7 = function (obj) {
  anObject$6(obj);
  var numSize = +obj.size;
  // NOTE: If size is undefined, then numSize will be NaN
  // eslint-disable-next-line no-self-compare -- NaN check
  if (numSize !== numSize) throw new $TypeError$8(INVALID_SIZE);
  var intSize = toIntegerOrInfinity$7(numSize);
  if (intSize < 0) throw new $RangeError$5(INVALID_SIZE);
  return new SetRecord(obj, intSize);
};

var aSet$6 = aSet$7;
var SetHelpers$2 = setHelpers;
var clone$2 = setClone;
var size$4 = setSize;
var getSetRecord$6 = getSetRecord$7;
var iterateSet$2 = setIterate;
var iterateSimple$5 = iterateSimple$7;

var has$4 = SetHelpers$2.has;
var remove$1 = SetHelpers$2.remove;

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
var setDifference = function difference(other) {
  var O = aSet$6(this);
  var otherRec = getSetRecord$6(other);
  var result = clone$2(O);
  if (size$4(O) <= otherRec.size) iterateSet$2(O, function (e) {
    if (otherRec.includes(e)) remove$1(result, e);
  });
  else iterateSimple$5(otherRec.getIterator(), function (e) {
    if (has$4(O, e)) remove$1(result, e);
  });
  return result;
};

var getBuiltIn$2 = getBuiltIn$d;

var createSetLike = function (size) {
  return {
    size: size,
    has: function () {
      return false;
    },
    keys: function () {
      return {
        next: function () {
          return { done: true };
        }
      };
    }
  };
};

var createSetLikeWithInfinitySize = function (size) {
  return {
    size: size,
    has: function () {
      return true;
    },
    keys: function () {
      throw new Error('e');
    }
  };
};

var setMethodAcceptSetLike$7 = function (name, callback) {
  var Set = getBuiltIn$2('Set');
  try {
    new Set()[name](createSetLike(0));
    try {
      // late spec change, early WebKit ~ Safari 17.0 beta implementation does not pass it
      // https://github.com/tc39/proposal-set-methods/pull/88
      new Set()[name](createSetLike(-1));
      return false;
    } catch (error2) {
      if (!callback) return true;
      // early V8 implementation bug
      // https://issues.chromium.org/issues/351332634
      try {
        new Set()[name](createSetLikeWithInfinitySize(-Infinity));
        return false;
      } catch (error) {
        var set = new Set();
        set.add(1);
        set.add(2);
        return callback(set[name](createSetLikeWithInfinitySize(Infinity)));
      }
    }
  } catch (error) {
    return false;
  }
};

var $$p = _export;
var difference = setDifference;
var setMethodAcceptSetLike$6 = setMethodAcceptSetLike$7;

var INCORRECT$4 = !setMethodAcceptSetLike$6('difference', function (result) {
  return result.size === 0;
});

// `Set.prototype.difference` method
// https://tc39.es/ecma262/#sec-set.prototype.difference
$$p({ target: 'Set', proto: true, real: true, forced: INCORRECT$4 }, {
  difference: difference
});

var aSet$5 = aSet$7;
var SetHelpers$1 = setHelpers;
var size$3 = setSize;
var getSetRecord$5 = getSetRecord$7;
var iterateSet$1 = setIterate;
var iterateSimple$4 = iterateSimple$7;

var Set$1 = SetHelpers$1.Set;
var add$2 = SetHelpers$1.add;
var has$3 = SetHelpers$1.has;

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
var setIntersection = function intersection(other) {
  var O = aSet$5(this);
  var otherRec = getSetRecord$5(other);
  var result = new Set$1();

  if (size$3(O) > otherRec.size) {
    iterateSimple$4(otherRec.getIterator(), function (e) {
      if (has$3(O, e)) add$2(result, e);
    });
  } else {
    iterateSet$1(O, function (e) {
      if (otherRec.includes(e)) add$2(result, e);
    });
  }

  return result;
};

var $$o = _export;
var fails$g = fails$N;
var intersection = setIntersection;
var setMethodAcceptSetLike$5 = setMethodAcceptSetLike$7;

var INCORRECT$3 = !setMethodAcceptSetLike$5('intersection', function (result) {
  return result.size === 2 && result.has(1) && result.has(2);
}) || fails$g(function () {
  // eslint-disable-next-line es/no-array-from, es/no-set, es/no-set-prototype-intersection -- testing
  return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
});

// `Set.prototype.intersection` method
// https://tc39.es/ecma262/#sec-set.prototype.intersection
$$o({ target: 'Set', proto: true, real: true, forced: INCORRECT$3 }, {
  intersection: intersection
});

var aSet$4 = aSet$7;
var has$2 = setHelpers.has;
var size$2 = setSize;
var getSetRecord$4 = getSetRecord$7;
var iterateSet = setIterate;
var iterateSimple$3 = iterateSimple$7;
var iteratorClose$1 = iteratorClose$5;

// `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
var setIsDisjointFrom = function isDisjointFrom(other) {
  var O = aSet$4(this);
  var otherRec = getSetRecord$4(other);
  if (size$2(O) <= otherRec.size) return iterateSet(O, function (e) {
    if (otherRec.includes(e)) return false;
  }, true) !== false;
  var iterator = otherRec.getIterator();
  return iterateSimple$3(iterator, function (e) {
    if (has$2(O, e)) return iteratorClose$1(iterator, 'normal', false);
  }) !== false;
};

var $$n = _export;
var isDisjointFrom = setIsDisjointFrom;
var setMethodAcceptSetLike$4 = setMethodAcceptSetLike$7;

var INCORRECT$2 = !setMethodAcceptSetLike$4('isDisjointFrom', function (result) {
  return !result;
});

// `Set.prototype.isDisjointFrom` method
// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
$$n({ target: 'Set', proto: true, real: true, forced: INCORRECT$2 }, {
  isDisjointFrom: isDisjointFrom
});

var aSet$3 = aSet$7;
var size$1 = setSize;
var iterate$2 = setIterate;
var getSetRecord$3 = getSetRecord$7;

// `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
var setIsSubsetOf = function isSubsetOf(other) {
  var O = aSet$3(this);
  var otherRec = getSetRecord$3(other);
  if (size$1(O) > otherRec.size) return false;
  return iterate$2(O, function (e) {
    if (!otherRec.includes(e)) return false;
  }, true) !== false;
};

var $$m = _export;
var isSubsetOf = setIsSubsetOf;
var setMethodAcceptSetLike$3 = setMethodAcceptSetLike$7;

var INCORRECT$1 = !setMethodAcceptSetLike$3('isSubsetOf', function (result) {
  return result;
});

// `Set.prototype.isSubsetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
$$m({ target: 'Set', proto: true, real: true, forced: INCORRECT$1 }, {
  isSubsetOf: isSubsetOf
});

var aSet$2 = aSet$7;
var has$1 = setHelpers.has;
var size = setSize;
var getSetRecord$2 = getSetRecord$7;
var iterateSimple$2 = iterateSimple$7;
var iteratorClose = iteratorClose$5;

// `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
var setIsSupersetOf = function isSupersetOf(other) {
  var O = aSet$2(this);
  var otherRec = getSetRecord$2(other);
  if (size(O) < otherRec.size) return false;
  var iterator = otherRec.getIterator();
  return iterateSimple$2(iterator, function (e) {
    if (!has$1(O, e)) return iteratorClose(iterator, 'normal', false);
  }) !== false;
};

var $$l = _export;
var isSupersetOf = setIsSupersetOf;
var setMethodAcceptSetLike$2 = setMethodAcceptSetLike$7;

var INCORRECT = !setMethodAcceptSetLike$2('isSupersetOf', function (result) {
  return !result;
});

// `Set.prototype.isSupersetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
$$l({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  isSupersetOf: isSupersetOf
});

var aSet$1 = aSet$7;
var SetHelpers = setHelpers;
var clone$1 = setClone;
var getSetRecord$1 = getSetRecord$7;
var iterateSimple$1 = iterateSimple$7;

var add$1 = SetHelpers.add;
var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
var setSymmetricDifference = function symmetricDifference(other) {
  var O = aSet$1(this);
  var keysIter = getSetRecord$1(other).getIterator();
  var result = clone$1(O);
  iterateSimple$1(keysIter, function (e) {
    if (has(O, e)) remove(result, e);
    else add$1(result, e);
  });
  return result;
};

var $$k = _export;
var symmetricDifference = setSymmetricDifference;
var setMethodAcceptSetLike$1 = setMethodAcceptSetLike$7;

// `Set.prototype.symmetricDifference` method
// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
$$k({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike$1('symmetricDifference') }, {
  symmetricDifference: symmetricDifference
});

var aSet = aSet$7;
var add = setHelpers.add;
var clone = setClone;
var getSetRecord = getSetRecord$7;
var iterateSimple = iterateSimple$7;

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
var setUnion = function union(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (it) {
    add(result, it);
  });
  return result;
};

var $$j = _export;
var union = setUnion;
var setMethodAcceptSetLike = setMethodAcceptSetLike$7;

// `Set.prototype.union` method
// https://tc39.es/ecma262/#sec-set.prototype.union
$$j({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('union') }, {
  union: union
});

var $$i = _export;
var uncurryThis$s = functionUncurryThis;
var requireObjectCoercible$7 = requireObjectCoercible$d;
var toIntegerOrInfinity$6 = toIntegerOrInfinity$f;
var toString$b = toString$m;
var fails$f = fails$N;

var charAt$7 = uncurryThis$s(''.charAt);

var FORCED$1 = fails$f(function () {
  // eslint-disable-next-line es/no-string-prototype-at -- safe
  return '𠮷'.at(-2) !== '\uD842';
});

// `String.prototype.at` method
// https://tc39.es/ecma262/#sec-string.prototype.at
$$i({ target: 'String', proto: true, forced: FORCED$1 }, {
  at: function at(index) {
    var S = toString$b(requireObjectCoercible$7(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity$6(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt$7(S, k);
  }
});

var isRegExp = isRegexp;

var $TypeError$7 = TypeError;

var notARegexp = function (it) {
  if (isRegExp(it)) {
    throw new $TypeError$7("The method doesn't accept regular expressions");
  } return it;
};

var wellKnownSymbol$7 = wellKnownSymbol$p;

var MATCH = wellKnownSymbol$7('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};

var $$h = _export;
var uncurryThis$r = functionUncurryThis;
var notARegExp$1 = notARegexp;
var requireObjectCoercible$6 = requireObjectCoercible$d;
var toString$a = toString$m;
var correctIsRegExpLogic$1 = correctIsRegexpLogic;

var stringIndexOf$1 = uncurryThis$r(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$$h({ target: 'String', proto: true, forced: !correctIsRegExpLogic$1('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf$1(
      toString$a(requireObjectCoercible$6(this)),
      toString$a(notARegExp$1(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var call$c = functionCall;
var defineBuiltIn$6 = defineBuiltIn$g;
var regexpExec$1 = regexpExec$2;
var fails$e = fails$N;
var wellKnownSymbol$6 = wellKnownSymbol$p;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$d;

var SPECIES$1 = wellKnownSymbol$6('species');
var RegExpPrototype = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$6(KEY);

  var DELEGATES_TO_SYMBOL = !fails$e(function () {
    // String methods call symbol-named RegExp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) !== 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$e(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$1] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: call$c(nativeRegExpMethod, regexp, str, arg2) };
        }
        return { done: true, value: call$c(nativeMethod, str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn$6(String.prototype, KEY, methods[0]);
    defineBuiltIn$6(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty$3(RegExpPrototype[SYMBOL], 'sham', true);
};

var uncurryThis$q = functionUncurryThis;
var toIntegerOrInfinity$5 = toIntegerOrInfinity$f;
var toString$9 = toString$m;
var requireObjectCoercible$5 = requireObjectCoercible$d;

var charAt$6 = uncurryThis$q(''.charAt);
var charCodeAt$1 = uncurryThis$q(''.charCodeAt);
var stringSlice$7 = uncurryThis$q(''.slice);

var createMethod$3 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$9(requireObjectCoercible$5($this));
    var position = toIntegerOrInfinity$5(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt$1(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$6(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice$7(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$3(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$3(true)
};

var charAt$5 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$2 = function (S, index, unicode) {
  return index + (unicode ? charAt$5(S, index).length : 1);
};

var call$b = functionCall;
var anObject$5 = anObject$q;
var isCallable$5 = isCallable$v;
var classof$8 = classofRaw$2;
var regexpExec = regexpExec$2;

var $TypeError$6 = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$5(exec)) {
    var result = call$b(exec, R, S);
    if (result !== null) anObject$5(result);
    return result;
  }
  if (classof$8(R) === 'RegExp') return call$b(regexpExec, R, S);
  throw new $TypeError$6('RegExp#exec called on incompatible receiver');
};

var call$a = functionCall;
var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
var anObject$4 = anObject$q;
var isNullOrUndefined$4 = isNullOrUndefined$9;
var toLength$4 = toLength$9;
var toString$8 = toString$m;
var requireObjectCoercible$4 = requireObjectCoercible$d;
var getMethod$2 = getMethod$7;
var advanceStringIndex$1 = advanceStringIndex$2;
var regExpExec$2 = regexpExecAbstract;

// @@match logic
fixRegExpWellKnownSymbolLogic$2('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible$4(this);
      var matcher = isNullOrUndefined$4(regexp) ? undefined : getMethod$2(regexp, MATCH);
      return matcher ? call$a(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$8(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject$4(this);
      var S = toString$8(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec$2(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec$2(rx, S)) !== null) {
        var matchStr = toString$8(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$4(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

// https://github.com/tc39/proposal-string-pad-start-end
var uncurryThis$p = functionUncurryThis;
var toLength$3 = toLength$9;
var toString$7 = toString$m;
var $repeat = stringRepeat;
var requireObjectCoercible$3 = requireObjectCoercible$d;

var repeat = uncurryThis$p($repeat);
var stringSlice$6 = uncurryThis$p(''.slice);
var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod$2 = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = toString$7(requireObjectCoercible$3($this));
    var intMaxLength = toLength$3(maxLength);
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : toString$7(fillString);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr === '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringSlice$6(stringFiller, 0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

var stringPad = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod$2(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod$2(true)
};

// https://github.com/zloirock/core-js/issues/280
var userAgent = environmentUserAgent;

var stringPadWebkitBug = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);

var $$g = _export;
var $padStart = stringPad.start;
var WEBKIT_BUG = stringPadWebkitBug;

// `String.prototype.padStart` method
// https://tc39.es/ecma262/#sec-string.prototype.padstart
$$g({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var uncurryThis$o = functionUncurryThis;
var toObject$5 = toObject$e;

var floor$3 = Math.floor;
var charAt$4 = uncurryThis$o(''.charAt);
var replace$3 = uncurryThis$o(''.replace);
var stringSlice$5 = uncurryThis$o(''.slice);
// eslint-disable-next-line redos/no-vulnerable -- safe
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject$5(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace$3(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt$4(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice$5(str, 0, position);
      case "'": return stringSlice$5(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice$5(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor$3(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt$4(ch, 1) : captures[f - 1] + charAt$4(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var apply$1 = functionApply;
var call$9 = functionCall;
var uncurryThis$n = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var fails$d = fails$N;
var anObject$3 = anObject$q;
var isCallable$4 = isCallable$v;
var isNullOrUndefined$3 = isNullOrUndefined$9;
var toIntegerOrInfinity$4 = toIntegerOrInfinity$f;
var toLength$2 = toLength$9;
var toString$6 = toString$m;
var requireObjectCoercible$2 = requireObjectCoercible$d;
var advanceStringIndex = advanceStringIndex$2;
var getMethod$1 = getMethod$7;
var getSubstitution = getSubstitution$1;
var regExpExec$1 = regexpExecAbstract;
var wellKnownSymbol$5 = wellKnownSymbol$p;

var REPLACE = wellKnownSymbol$5('replace');
var max = Math.max;
var min$2 = Math.min;
var concat = uncurryThis$n([].concat);
var push$7 = uncurryThis$n([].push);
var stringIndexOf = uncurryThis$n(''.indexOf);
var stringSlice$4 = uncurryThis$n(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$d(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible$2(this);
      var replacer = isNullOrUndefined$3(searchValue) ? undefined : getMethod$1(searchValue, REPLACE);
      return replacer
        ? call$9(replacer, searchValue, O, replaceValue)
        : call$9(nativeReplace, toString$6(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject$3(this);
      var S = toString$6(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable$4(replaceValue);
      if (!functionalReplace) replaceValue = toString$6(replaceValue);

      var global = rx.global;
      var fullUnicode;
      if (global) {
        fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];
      var result;
      while (true) {
        result = regExpExec$1(rx, S);
        if (result === null) break;

        push$7(results, result);
        if (!global) break;

        var matchStr = toString$6(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength$2(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString$6(result[0]);
        var position = max(min$2(toIntegerOrInfinity$4(result.index), S.length), 0);
        var captures = [];
        var replacement;
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push$7(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push$7(replacerArgs, namedCaptures);
          replacement = toString$6(apply$1(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice$4(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }

      return accumulatedResult + stringSlice$4(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
var sameValue$1 = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
};

var call$8 = functionCall;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject$2 = anObject$q;
var isNullOrUndefined$2 = isNullOrUndefined$9;
var requireObjectCoercible$1 = requireObjectCoercible$d;
var sameValue = sameValue$1;
var toString$5 = toString$m;
var getMethod = getMethod$7;
var regExpExec = regexpExecAbstract;

// @@search logic
fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible$1(this);
      var searcher = isNullOrUndefined$2(regexp) ? undefined : getMethod(regexp, SEARCH);
      return searcher ? call$8(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$5(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject$2(this);
      var S = toString$5(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var $$f = _export;
var uncurryThis$m = functionUncurryThisClause;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var toLength$1 = toLength$9;
var toString$4 = toString$m;
var notARegExp = notARegexp;
var requireObjectCoercible = requireObjectCoercible$d;
var correctIsRegExpLogic = correctIsRegexpLogic;

var stringSlice$3 = uncurryThis$m(''.slice);
var min$1 = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor$1(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$$f({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString$4(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength$1(min$1(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString$4(searchString);
    return stringSlice$3(that, index, index + search.length) === search;
  }
});

var PROPER_FUNCTION_NAME = functionName.PROPER;
var fails$c = fails$N;
var whitespaces = whitespaces$4;

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
var stringTrimForced = function (METHOD_NAME) {
  return fails$c(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};

var $$e = _export;
var $trim = stringTrim.trim;
var forcedStringTrimMethod = stringTrimForced;

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$$e({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

var typedArrayConstructor = {exports: {}};

var NATIVE_ARRAY_BUFFER = arrayBufferBasicDetection;
var DESCRIPTORS$7 = descriptors;
var globalThis$j = globalThis_1;
var isCallable$3 = isCallable$v;
var isObject$b = isObject$p;
var hasOwn$8 = hasOwnProperty_1;
var classof$7 = classof$i;
var tryToString = tryToString$6;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$d;
var defineBuiltIn$5 = defineBuiltIn$g;
var defineBuiltInAccessor$5 = defineBuiltInAccessor$b;
var isPrototypeOf$1 = objectIsPrototypeOf;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var wellKnownSymbol$4 = wellKnownSymbol$p;
var uid$1 = uid$4;
var InternalStateModule$5 = internalState;

var enforceInternalState$2 = InternalStateModule$5.enforce;
var getInternalState$2 = InternalStateModule$5.get;
var Int8Array$4 = globalThis$j.Int8Array;
var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
var Uint8ClampedArray$1 = globalThis$j.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
var TypedArray$1 = Int8Array$4 && getPrototypeOf(Int8Array$4);
var TypedArrayPrototype$1 = Int8ArrayPrototype$1 && getPrototypeOf(Int8ArrayPrototype$1);
var ObjectPrototype = Object.prototype;
var TypeError$4 = globalThis$j.TypeError;

var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');
var TYPED_ARRAY_TAG$1 = uid$1('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS$2 = NATIVE_ARRAY_BUFFER && !!setPrototypeOf$1 && classof$7(globalThis$j.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject$b(it)) return false;
  var klass = classof$7(it);
  return klass === 'DataView'
    || hasOwn$8(TypedArrayConstructorsList, klass)
    || hasOwn$8(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor$3 = function (it) {
  var proto = getPrototypeOf(it);
  if (!isObject$b(proto)) return;
  var state = getInternalState$2(proto);
  return (state && hasOwn$8(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor$3(proto);
};

var isTypedArray$1 = function (it) {
  if (!isObject$b(it)) return false;
  var klass = classof$7(it);
  return hasOwn$8(TypedArrayConstructorsList, klass)
    || hasOwn$8(BigIntArrayConstructorsList, klass);
};

var aTypedArray$a = function (it) {
  if (isTypedArray$1(it)) return it;
  throw new TypeError$4('Target is not a typed array');
};

var aTypedArrayConstructor$1 = function (C) {
  if (isCallable$3(C) && (!setPrototypeOf$1 || isPrototypeOf$1(TypedArray$1, C))) return C;
  throw new TypeError$4(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod$a = function (KEY, property, forced, options) {
  if (!DESCRIPTORS$7) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = globalThis$j[ARRAY];
    if (TypedArrayConstructor && hasOwn$8(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype$1[KEY] || forced) {
    defineBuiltIn$5(TypedArrayPrototype$1, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS$2 && Int8ArrayPrototype$1[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS$7) return;
  if (setPrototypeOf$1) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = globalThis$j[ARRAY];
      if (TypedArrayConstructor && hasOwn$8(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray$1[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn$5(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$2 && TypedArray$1[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = globalThis$j[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn$5(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = globalThis$j[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState$2(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS$2 = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = globalThis$j[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState$2(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !isCallable$3(TypedArray$1) || TypedArray$1 === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray$1 = function TypedArray() {
    throw new TypeError$4('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
    if (globalThis$j[NAME]) setPrototypeOf$1(globalThis$j[NAME], TypedArray$1);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS$2 || !TypedArrayPrototype$1 || TypedArrayPrototype$1 === ObjectPrototype) {
  TypedArrayPrototype$1 = TypedArray$1.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS$2) for (NAME in TypedArrayConstructorsList) {
    if (globalThis$j[NAME]) setPrototypeOf$1(globalThis$j[NAME].prototype, TypedArrayPrototype$1);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS$2 && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$1) {
  setPrototypeOf$1(Uint8ClampedArrayPrototype, TypedArrayPrototype$1);
}

if (DESCRIPTORS$7 && !hasOwn$8(TypedArrayPrototype$1, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineBuiltInAccessor$5(TypedArrayPrototype$1, TO_STRING_TAG, {
    configurable: true,
    get: function () {
      return isObject$b(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
    }
  });
  for (NAME in TypedArrayConstructorsList) if (globalThis$j[NAME]) {
    createNonEnumerableProperty$2(globalThis$j[NAME], TYPED_ARRAY_TAG$1, NAME);
  }
}

var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$2,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
  aTypedArray: aTypedArray$a,
  aTypedArrayConstructor: aTypedArrayConstructor$1,
  exportTypedArrayMethod: exportTypedArrayMethod$a,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  getTypedArrayConstructor: getTypedArrayConstructor$3,
  isView: isView,
  isTypedArray: isTypedArray$1,
  TypedArray: TypedArray$1,
  TypedArrayPrototype: TypedArrayPrototype$1
};

/* eslint-disable no-new, sonarjs/inconsistent-function-call -- required for testing */
var globalThis$i = globalThis_1;
var fails$b = fails$N;
var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$3;
var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer$2 = globalThis$i.ArrayBuffer;
var Int8Array$3 = globalThis$i.Int8Array;

var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$b(function () {
  Int8Array$3(1);
}) || !fails$b(function () {
  new Int8Array$3(-1);
}) || !checkCorrectnessOfIteration$1(function (iterable) {
  new Int8Array$3();
  new Int8Array$3(null);
  new Int8Array$3(1.5);
  new Int8Array$3(iterable);
}, true) || fails$b(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array$3(new ArrayBuffer$2(2), 1, undefined).length !== 1;
});

var isObject$a = isObject$p;

var floor$2 = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es/no-number-isinteger -- safe
var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
  return !isObject$a(it) && isFinite(it) && floor$2(it) === it;
};

var toIntegerOrInfinity$3 = toIntegerOrInfinity$f;

var $RangeError$4 = RangeError;

var toPositiveInteger$1 = function (it) {
  var result = toIntegerOrInfinity$3(it);
  if (result < 0) throw new $RangeError$4("The argument can't be less than 0");
  return result;
};

var toPositiveInteger = toPositiveInteger$1;

var $RangeError$3 = RangeError;

var toOffset$2 = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw new $RangeError$3('Wrong offset');
  return offset;
};

var round = Math.round;

var toUint8Clamped$1 = function (it) {
  var value = round(it);
  return value < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
};

var classof$6 = classof$i;

var isBigIntArray$2 = function (it) {
  var klass = classof$6(it);
  return klass === 'BigInt64Array' || klass === 'BigUint64Array';
};

var toPrimitive = toPrimitive$2;

var $TypeError$5 = TypeError;

// `ToBigInt` abstract operation
// https://tc39.es/ecma262/#sec-tobigint
var toBigInt$3 = function (argument) {
  var prim = toPrimitive(argument, 'number');
  if (typeof prim == 'number') throw new $TypeError$5("Can't convert number to bigint");
  // eslint-disable-next-line es/no-bigint -- safe
  return BigInt(prim);
};

var bind$6 = functionBindContext;
var call$7 = functionCall;
var aConstructor = aConstructor$2;
var toObject$4 = toObject$e;
var lengthOfArrayLike$a = lengthOfArrayLike$i;
var getIterator$2 = getIterator$4;
var getIteratorMethod$2 = getIteratorMethod$5;
var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
var isBigIntArray$1 = isBigIntArray$2;
var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
var toBigInt$2 = toBigInt$3;

var typedArrayFrom$1 = function from(source /* , mapfn, thisArg */) {
  var C = aConstructor(this);
  var O = toObject$4(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod$2(O);
  var i, length, result, thisIsBigIntArray, value, step, iterator, next;
  if (iteratorMethod && !isArrayIteratorMethod$1(iteratorMethod)) {
    iterator = getIterator$2(O, iteratorMethod);
    next = iterator.next;
    O = [];
    while (!(step = call$7(next, iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind$6(mapfn, arguments[2]);
  }
  length = lengthOfArrayLike$a(O);
  result = new (aTypedArrayConstructor(C))(length);
  thisIsBigIntArray = isBigIntArray$1(result);
  for (i = 0; length > i; i++) {
    value = mapping ? mapfn(O[i], i) : O[i];
    // FF30- typed arrays doesn't properly convert objects to typed array values
    result[i] = thisIsBigIntArray ? toBigInt$2(value) : +value;
  }
  return result;
};

var isArray$2 = isArray$5;
var isConstructor$1 = isConstructor$3;
var isObject$9 = isObject$p;
var wellKnownSymbol$3 = wellKnownSymbol$p;

var SPECIES = wellKnownSymbol$3('species');
var $Array$2 = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$2(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor$1(C) && (C === $Array$2 || isArray$2(C.prototype))) C = undefined;
    else if (isObject$9(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array$2 : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$1 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var bind$5 = functionBindContext;
var uncurryThis$l = functionUncurryThis;
var IndexedObject$2 = indexedObject;
var toObject$3 = toObject$e;
var lengthOfArrayLike$9 = lengthOfArrayLike$i;
var arraySpeciesCreate = arraySpeciesCreate$1;

var push$6 = uncurryThis$l([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE === 1;
  var IS_FILTER = TYPE === 2;
  var IS_SOME = TYPE === 3;
  var IS_EVERY = TYPE === 4;
  var IS_FIND_INDEX = TYPE === 6;
  var IS_FILTER_REJECT = TYPE === 7;
  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$3($this);
    var self = IndexedObject$2(O);
    var length = lengthOfArrayLike$9(self);
    var boundFunction = bind$5(callbackfn, that);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push$6(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push$6(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$1(7)
};

var lengthOfArrayLike$8 = lengthOfArrayLike$i;

var arrayFromConstructorAndList$3 = function (Constructor, list, $length) {
  var index = 0;
  var length = arguments.length > 2 ? $length : lengthOfArrayLike$8(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var $$d = _export;
var globalThis$h = globalThis_1;
var call$6 = functionCall;
var DESCRIPTORS$6 = descriptors;
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
var ArrayBufferViewCore$a = arrayBufferViewCore;
var ArrayBufferModule = arrayBuffer;
var anInstance$4 = anInstance$8;
var createPropertyDescriptor$1 = createPropertyDescriptor$7;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$d;
var isIntegralNumber = isIntegralNumber$1;
var toLength = toLength$9;
var toIndex = toIndex$3;
var toOffset$1 = toOffset$2;
var toUint8Clamped = toUint8Clamped$1;
var toPropertyKey$1 = toPropertyKey$4;
var hasOwn$7 = hasOwnProperty_1;
var classof$5 = classof$i;
var isObject$8 = isObject$p;
var isSymbol = isSymbol$4;
var create$1 = objectCreate$1;
var isPrototypeOf = objectIsPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var typedArrayFrom = typedArrayFrom$1;
var forEach$2 = arrayIteration.forEach;
var setSpecies = setSpecies$4;
var defineBuiltInAccessor$4 = defineBuiltInAccessor$b;
var definePropertyModule = objectDefineProperty;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var arrayFromConstructorAndList$2 = arrayFromConstructorAndList$3;
var InternalStateModule$4 = internalState;
var inheritIfRequired$1 = inheritIfRequired$5;

var getInternalState$1 = InternalStateModule$4.get;
var setInternalState$4 = InternalStateModule$4.set;
var enforceInternalState$1 = InternalStateModule$4.enforce;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var RangeError$2 = globalThis$h.RangeError;
var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer$1.prototype;
var DataView$1 = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$a.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore$a.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore$a.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore$a.TypedArrayPrototype;
var isTypedArray = ArrayBufferViewCore$a.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var addGetter = function (it, key) {
  defineBuiltInAccessor$4(it, key, {
    configurable: true,
    get: function () {
      return getInternalState$1(this)[key];
    }
  });
};

var isArrayBuffer = function (it) {
  var klass;
  return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof$5(it)) === 'ArrayBuffer' || klass === 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && !isSymbol(key)
    && key in target
    && isIntegralNumber(+key)
    && key >= 0;
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  key = toPropertyKey$1(key);
  return isTypedArrayIndex(target, key)
    ? createPropertyDescriptor$1(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  key = toPropertyKey$1(key);
  if (isTypedArrayIndex(target, key)
    && isObject$8(descriptor)
    && hasOwn$7(descriptor, 'value')
    && !hasOwn$7(descriptor, 'get')
    && !hasOwn$7(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!hasOwn$7(descriptor, 'writable') || descriptor.writable)
    && (!hasOwn$7(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS$6) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $$d({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = globalThis$h[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState$1(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState$1(that);
      data.view[SETTER](index * BYTES + data.byteOffset, CLAMPED ? toUint8Clamped(value) : value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance$4(that, TypedArrayConstructorPrototype);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject$8(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer$1(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset$1(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw new RangeError$2(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw new RangeError$2(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw new RangeError$2(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return arrayFromConstructorAndList$2(TypedArrayConstructor, data);
        } else {
          return call$6(typedArrayFrom, TypedArrayConstructor, data);
        }
        setInternalState$4(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView$1(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$1(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance$4(dummy, TypedArrayConstructorPrototype);
        return inheritIfRequired$1(function () {
          if (!isObject$8(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return arrayFromConstructorAndList$2(TypedArrayConstructor, data);
          return call$6(typedArrayFrom, TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach$2(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty$1(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty$1(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    enforceInternalState$1(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty$1(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    var FORCED = TypedArrayConstructor !== NativeTypedArrayConstructor;

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $$d({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty$1(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty$1(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else typedArrayConstructor.exports = function () { /* empty */ };

var typedArrayConstructorExports = typedArrayConstructor.exports;

var createTypedArrayConstructor$7 = typedArrayConstructorExports;

// `Float32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$7('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$6 = typedArrayConstructorExports;

// `Int8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$6('Int8', function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$5 = typedArrayConstructorExports;

// `Int16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$5('Int16', function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$4 = typedArrayConstructorExports;

// `Int32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$4('Int32', function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$3 = typedArrayConstructorExports;

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$3('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor$2 = typedArrayConstructorExports;

// `Uint8ClampedArray` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$2('Uint8', function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

var createTypedArrayConstructor$1 = typedArrayConstructorExports;

// `Uint16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor$1('Uint16', function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var createTypedArrayConstructor = typedArrayConstructorExports;

// `Uint32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint32', function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var ArrayBufferViewCore$9 = arrayBufferViewCore;
var lengthOfArrayLike$7 = lengthOfArrayLike$i;
var toIntegerOrInfinity$2 = toIntegerOrInfinity$f;

var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
var exportTypedArrayMethod$9 = ArrayBufferViewCore$9.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.at
exportTypedArrayMethod$9('at', function at(index) {
  var O = aTypedArray$9(this);
  var len = lengthOfArrayLike$7(O);
  var relativeIndex = toIntegerOrInfinity$2(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});

var ArrayBufferViewCore$8 = arrayBufferViewCore;
var $fill = arrayFill$1;
var toBigInt$1 = toBigInt$3;
var classof$4 = classof$i;
var call$5 = functionCall;
var uncurryThis$k = functionUncurryThis;
var fails$a = fails$N;

var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
var exportTypedArrayMethod$8 = ArrayBufferViewCore$8.exportTypedArrayMethod;
var slice$2 = uncurryThis$k(''.slice);

// V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
var CONVERSION_BUG = fails$a(function () {
  var count = 0;
  // eslint-disable-next-line es/no-typed-arrays -- safe
  new Int8Array(2).fill({ valueOf: function () { return count++; } });
  return count !== 1;
});

// `%TypedArray%.prototype.fill` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
exportTypedArrayMethod$8('fill', function fill(value /* , start, end */) {
  var length = arguments.length;
  aTypedArray$8(this);
  var actualValue = slice$2(classof$4(this), 0, 3) === 'Big' ? toBigInt$1(value) : +value;
  return call$5($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
}, CONVERSION_BUG);

var bind$4 = functionBindContext;
var IndexedObject$1 = indexedObject;
var toObject$2 = toObject$e;
var lengthOfArrayLike$6 = lengthOfArrayLike$i;

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_FIND_LAST_INDEX = TYPE === 1;
  return function ($this, callbackfn, that) {
    var O = toObject$2($this);
    var self = IndexedObject$1(O);
    var index = lengthOfArrayLike$6(self);
    var boundFunction = bind$4(callbackfn, that);
    var value, result;
    while (index-- > 0) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (result) switch (TYPE) {
        case 0: return value; // findLast
        case 1: return index; // findLastIndex
      }
    }
    return IS_FIND_LAST_INDEX ? -1 : undefined;
  };
};

var arrayIterationFromLast = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: createMethod(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod(1)
};

var ArrayBufferViewCore$7 = arrayBufferViewCore;
var $findLast = arrayIterationFromLast.findLast;

var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
var exportTypedArrayMethod$7 = ArrayBufferViewCore$7.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLast` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlast
exportTypedArrayMethod$7('findLast', function findLast(predicate /* , thisArg */) {
  return $findLast(aTypedArray$7(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$6 = arrayBufferViewCore;
var $findLastIndex = arrayIterationFromLast.findLastIndex;

var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
var exportTypedArrayMethod$6 = ArrayBufferViewCore$6.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLastIndex` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlastindex
exportTypedArrayMethod$6('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
  return $findLastIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var globalThis$g = globalThis_1;
var call$4 = functionCall;
var ArrayBufferViewCore$5 = arrayBufferViewCore;
var lengthOfArrayLike$5 = lengthOfArrayLike$i;
var toOffset = toOffset$2;
var toIndexedObject$1 = toObject$e;
var fails$9 = fails$N;

var RangeError$1 = globalThis$g.RangeError;
var Int8Array$2 = globalThis$g.Int8Array;
var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
var exportTypedArrayMethod$5 = ArrayBufferViewCore$5.exportTypedArrayMethod;

var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails$9(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  var array = new Uint8ClampedArray(2);
  call$4($set, array, { length: 1, 0: 3 }, 1);
  return array[1] !== 3;
});

// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$5.NATIVE_ARRAY_BUFFER_VIEWS && fails$9(function () {
  var array = new Int8Array$2(2);
  array.set(1);
  array.set('2', 1);
  return array[0] !== 0 || array[1] !== 2;
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod$5('set', function set(arrayLike /* , offset */) {
  aTypedArray$5(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var src = toIndexedObject$1(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call$4($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike$5(src);
  var index = 0;
  if (len + offset > length) throw new RangeError$1('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

var globalThis$f = globalThis_1;
var uncurryThis$j = functionUncurryThisClause;
var fails$8 = fails$N;
var aCallable$1 = aCallable$f;
var internalSort = arraySort$1;
var ArrayBufferViewCore$4 = arrayBufferViewCore;
var FF = environmentFfVersion;
var IE_OR_EDGE = environmentIsIeOrEdge;
var V8 = environmentV8Version;
var WEBKIT = environmentWebkitVersion;

var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
var exportTypedArrayMethod$4 = ArrayBufferViewCore$4.exportTypedArrayMethod;
var Uint16Array = globalThis$f.Uint16Array;
var nativeSort = Uint16Array && uncurryThis$j(Uint16Array.prototype.sort);

// WebKit
var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !(fails$8(function () {
  nativeSort(new Uint16Array(2), null);
}) && fails$8(function () {
  nativeSort(new Uint16Array(2), {});
}));

var STABLE_SORT = !!nativeSort && !fails$8(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 74;
  if (FF) return FF < 67;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 602;

  var array = new Uint16Array(516);
  var expected = Array(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  nativeSort(array, function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (y !== y) return -1;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
};

// `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod$4('sort', function sort(comparefn) {
  if (comparefn !== undefined) aCallable$1(comparefn);
  if (STABLE_SORT) return nativeSort(this, comparefn);

  return internalSort(aTypedArray$4(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

var globalThis$e = globalThis_1;
var apply = functionApply;
var ArrayBufferViewCore$3 = arrayBufferViewCore;
var fails$7 = fails$N;
var arraySlice$2 = arraySlice$7;

var Int8Array$1 = globalThis$e.Int8Array;
var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
var exportTypedArrayMethod$3 = ArrayBufferViewCore$3.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$7(function () {
  $toLocaleString.call(new Int8Array$1(1));
});

var FORCED = fails$7(function () {
  return [1, 2].toLocaleString() !== new Int8Array$1([1, 2]).toLocaleString();
}) || !fails$7(function () {
  Int8Array$1.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod$3('toLocaleString', function toLocaleString() {
  return apply(
    $toLocaleString,
    TO_LOCALE_STRING_BUG ? arraySlice$2(aTypedArray$3(this)) : aTypedArray$3(this),
    arraySlice$2(arguments)
  );
}, FORCED);

var lengthOfArrayLike$4 = lengthOfArrayLike$i;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
var arrayToReversed$1 = function (O, C) {
  var len = lengthOfArrayLike$4(O);
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = O[len - k - 1];
  return A;
};

var arrayToReversed = arrayToReversed$1;
var ArrayBufferViewCore$2 = arrayBufferViewCore;

var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
var exportTypedArrayMethod$2 = ArrayBufferViewCore$2.exportTypedArrayMethod;
var getTypedArrayConstructor$2 = ArrayBufferViewCore$2.getTypedArrayConstructor;

// `%TypedArray%.prototype.toReversed` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.toreversed
exportTypedArrayMethod$2('toReversed', function toReversed() {
  return arrayToReversed(aTypedArray$2(this), getTypedArrayConstructor$2(this));
});

var ArrayBufferViewCore$1 = arrayBufferViewCore;
var uncurryThis$i = functionUncurryThis;
var aCallable = aCallable$f;
var arrayFromConstructorAndList$1 = arrayFromConstructorAndList$3;

var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
var getTypedArrayConstructor$1 = ArrayBufferViewCore$1.getTypedArrayConstructor;
var exportTypedArrayMethod$1 = ArrayBufferViewCore$1.exportTypedArrayMethod;
var sort = uncurryThis$i(ArrayBufferViewCore$1.TypedArrayPrototype.sort);

// `%TypedArray%.prototype.toSorted` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tosorted
exportTypedArrayMethod$1('toSorted', function toSorted(compareFn) {
  if (compareFn !== undefined) aCallable(compareFn);
  var O = aTypedArray$1(this);
  var A = arrayFromConstructorAndList$1(getTypedArrayConstructor$1(O), O);
  return sort(A, compareFn);
});

var lengthOfArrayLike$3 = lengthOfArrayLike$i;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$f;

var $RangeError$2 = RangeError;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
var arrayWith$1 = function (O, C, index, value) {
  var len = lengthOfArrayLike$3(O);
  var relativeIndex = toIntegerOrInfinity$1(index);
  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
  if (actualIndex >= len || actualIndex < 0) throw new $RangeError$2('Incorrect index');
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
  return A;
};

var arrayWith = arrayWith$1;
var ArrayBufferViewCore = arrayBufferViewCore;
var isBigIntArray = isBigIntArray$2;
var toIntegerOrInfinity = toIntegerOrInfinity$f;
var toBigInt = toBigInt$3;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var PROPER_ORDER = !!function () {
  try {
    // eslint-disable-next-line no-throw-literal, es/no-typed-arrays, es/no-array-prototype-with -- required for testing
    new Int8Array(1)['with'](2, { valueOf: function () { throw 8; } });
  } catch (error) {
    // some early implementations, like WebKit, does not follow the final semantic
    // https://github.com/tc39/proposal-change-array-by-copy/pull/86
    return error === 8;
  }
}();

// `%TypedArray%.prototype.with` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.with
exportTypedArrayMethod('with', { 'with': function (index, value) {
  var O = aTypedArray(this);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
  return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue);
} }['with'], !PROPER_ORDER);

var fails$6 = fails$N;

var freezing = !fails$6(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = {exports: {}};

var objectGetOwnPropertyNamesExternal = {};

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof$3 = classofRaw$2;
var toIndexedObject = toIndexedObject$7;
var $getOwnPropertyNames = objectGetOwnPropertyNames.f;
var arraySlice$1 = arraySlice$7;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice$1(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && classof$3(it) === 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails$5 = fails$N;

var arrayBufferNonExtensible = fails$5(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});

var fails$4 = fails$N;
var isObject$7 = isObject$p;
var classof$2 = classofRaw$2;
var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails$4(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
var objectIsExtensible = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject$7(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$2(it) === 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;

var $$c = _export;
var uncurryThis$h = functionUncurryThis;
var hiddenKeys = hiddenKeys$5;
var isObject$6 = isObject$p;
var hasOwn$6 = hasOwnProperty_1;
var defineProperty$1 = objectDefineProperty.f;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
var isExtensible$1 = objectIsExtensible;
var uid = uid$4;
var FREEZING$1 = freezing;

var REQUIRED = false;
var METADATA = uid('meta');
var id$1 = 0;

var setMetadata = function (it) {
  defineProperty$1(it, METADATA, { value: {
    objectID: 'O' + id$1++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject$6(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn$6(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible$1(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData$1 = function (it, create) {
  if (!hasOwn$6(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible$1(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING$1 && REQUIRED && isExtensible$1(it) && !hasOwn$6(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis$h([].splice);
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $$c({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = internalMetadata.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData$1,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;

var internalMetadataExports = internalMetadata.exports;

var $$b = _export;
var globalThis$d = globalThis_1;
var uncurryThis$g = functionUncurryThis;
var isForced = isForced_1;
var defineBuiltIn$4 = defineBuiltIn$g;
var InternalMetadataModule$1 = internalMetadataExports;
var iterate$1 = iterate$8;
var anInstance$3 = anInstance$8;
var isCallable$2 = isCallable$v;
var isNullOrUndefined$1 = isNullOrUndefined$9;
var isObject$5 = isObject$p;
var fails$3 = fails$N;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$3;
var setToStringTag$3 = setToStringTag$8;
var inheritIfRequired = inheritIfRequired$5;

var collection$1 = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = globalThis$d[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis$g(NativePrototype[KEY]);
    defineBuiltIn$4(NativePrototype, KEY,
      KEY === 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY === 'delete' ? function (key) {
        return IS_WEAK && !isObject$5(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY === 'get' ? function get(key) {
        return IS_WEAK && !isObject$5(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY === 'has' ? function has(key) {
        return IS_WEAK && !isObject$5(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    !isCallable$2(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$3(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule$1.enable();
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails$3(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails$3(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance$3(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (!isNullOrUndefined$1(iterable)) iterate$1(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $$b({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);

  setToStringTag$3(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var uncurryThis$f = functionUncurryThis;
var defineBuiltIns$2 = defineBuiltIns$5;
var getWeakData = internalMetadataExports.getWeakData;
var anInstance$2 = anInstance$8;
var anObject$1 = anObject$q;
var isNullOrUndefined = isNullOrUndefined$9;
var isObject$4 = isObject$p;
var iterate = iterate$8;
var ArrayIterationModule = arrayIteration;
var hasOwn$5 = hasOwnProperty_1;
var InternalStateModule$3 = internalState;

var setInternalState$3 = InternalStateModule$3.set;
var internalStateGetterFor = InternalStateModule$3.getterFor;
var find$1 = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var splice$1 = uncurryThis$f([].splice);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (state) {
  return state.frozen || (state.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find$1(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) splice$1(this.entries, index, 1);
    return !!~index;
  }
};

var collectionWeak$1 = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance$2(that, Prototype);
      setInternalState$3(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: null
      });
      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject$1(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    defineBuiltIns$2(Prototype, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject$4(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && hasOwn$5(data, state.id) && delete data[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject$4(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && hasOwn$5(data, state.id);
      }
    });

    defineBuiltIns$2(Prototype, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject$4(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          if (data) return data[state.id];
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return Constructor;
  }
};

var FREEZING = freezing;
var globalThis$c = globalThis_1;
var uncurryThis$e = functionUncurryThis;
var defineBuiltIns$1 = defineBuiltIns$5;
var InternalMetadataModule = internalMetadataExports;
var collection = collection$1;
var collectionWeak = collectionWeak$1;
var isObject$3 = isObject$p;
var enforceInternalState = internalState.enforce;
var fails$2 = fails$N;
var NATIVE_WEAK_MAP = weakMapBasicDetection;

var $Object = Object;
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$1 = Array.isArray;
// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = $Object.isExtensible;
// eslint-disable-next-line es/no-object-isfrozen -- safe
var isFrozen = $Object.isFrozen;
// eslint-disable-next-line es/no-object-issealed -- safe
var isSealed = $Object.isSealed;
// eslint-disable-next-line es/no-object-freeze -- safe
var freeze = $Object.freeze;
// eslint-disable-next-line es/no-object-seal -- safe
var seal = $Object.seal;

var IS_IE11 = !globalThis$c.ActiveXObject && 'ActiveXObject' in globalThis$c;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = collection('WeakMap', wrapper, collectionWeak);
var WeakMapPrototype = $WeakMap.prototype;
var nativeSet = uncurryThis$e(WeakMapPrototype.set);

// Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
var hasMSEdgeFreezingBug = function () {
  return FREEZING && fails$2(function () {
    var frozenArray = freeze([]);
    nativeSet(new $WeakMap(), frozenArray, 1);
    return !isFrozen(frozenArray);
  });
};

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP) if (IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.enable();
  var nativeDelete = uncurryThis$e(WeakMapPrototype['delete']);
  var nativeHas = uncurryThis$e(WeakMapPrototype.has);
  var nativeGet = uncurryThis$e(WeakMapPrototype.get);
  defineBuiltIns$1(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject$3(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete(this, key) || state.frozen['delete'](key);
      } return nativeDelete(this, key);
    },
    has: function has(key) {
      if (isObject$3(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) || state.frozen.has(key);
      } return nativeHas(this, key);
    },
    get: function get(key) {
      if (isObject$3(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
      } return nativeGet(this, key);
    },
    set: function set(key, value) {
      if (isObject$3(key) && !isExtensible(key)) {
        var state = enforceInternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
      } else nativeSet(this, key, value);
      return this;
    }
  });
// Chakra Edge frozen keys fix
} else if (hasMSEdgeFreezingBug()) {
  defineBuiltIns$1(WeakMapPrototype, {
    set: function set(key, value) {
      var arrayIntegrityLevel;
      if (isArray$1(key)) {
        if (isFrozen(key)) arrayIntegrityLevel = freeze;
        else if (isSealed(key)) arrayIntegrityLevel = seal;
      }
      nativeSet(this, key, value);
      if (arrayIntegrityLevel) arrayIntegrityLevel(key);
      return this;
    }
  });
}

var bind$3 = functionBindContext;
var uncurryThis$d = functionUncurryThis;
var IndexedObject = indexedObject;
var toObject$1 = toObject$e;
var toPropertyKey = toPropertyKey$4;
var lengthOfArrayLike$2 = lengthOfArrayLike$i;
var objectCreate = objectCreate$1;
var arrayFromConstructorAndList = arrayFromConstructorAndList$3;

var $Array$1 = Array;
var push$5 = uncurryThis$d([].push);

var arrayGroup = function ($this, callbackfn, that, specificConstructor) {
  var O = toObject$1($this);
  var self = IndexedObject(O);
  var boundFunction = bind$3(callbackfn, that);
  var target = objectCreate(null);
  var length = lengthOfArrayLike$2(self);
  var index = 0;
  var Constructor, key, value;
  for (;length > index; index++) {
    value = self[index];
    key = toPropertyKey(boundFunction(value, index, O));
    // in some IE versions, `hasOwnProperty` returns incorrect result on integer keys
    // but since it's a `null` prototype object, we can safely use `in`
    if (key in target) push$5(target[key], value);
    else target[key] = [value];
  }
  // TODO: Remove this block from `core-js@4`
  if (specificConstructor) {
    Constructor = specificConstructor(O);
    if (Constructor !== $Array$1) {
      for (key in target) target[key] = arrayFromConstructorAndList(Constructor, target[key]);
    }
  } return target;
};

var $$a = _export;
var $group = arrayGroup;
var addToUnscopables = addToUnscopables$4;

// `Array.prototype.group` method
// https://github.com/tc39/proposal-array-grouping
$$a({ target: 'Array', proto: true }, {
  group: function group(callbackfn /* , thisArg */) {
    var thisArg = arguments.length > 1 ? arguments[1] : undefined;
    return $group(this, callbackfn, thisArg);
  }
});

addToUnscopables('group');

var uncurryThis$c = functionUncurryThis;
var hasOwn$4 = hasOwnProperty_1;

var $SyntaxError = SyntaxError;
var $parseInt$1 = parseInt;
var fromCharCode$3 = String.fromCharCode;
var at$2 = uncurryThis$c(''.charAt);
var slice$1 = uncurryThis$c(''.slice);
var exec$5 = uncurryThis$c(/./.exec);

var codePoints = {
  '\\"': '"',
  '\\\\': '\\',
  '\\/': '/',
  '\\b': '\b',
  '\\f': '\f',
  '\\n': '\n',
  '\\r': '\r',
  '\\t': '\t'
};

var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
// eslint-disable-next-line regexp/no-control-character -- safe
var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;

var parseJsonString = function (source, i) {
  var unterminated = true;
  var value = '';
  while (i < source.length) {
    var chr = at$2(source, i);
    if (chr === '\\') {
      var twoChars = slice$1(source, i, i + 2);
      if (hasOwn$4(codePoints, twoChars)) {
        value += codePoints[twoChars];
        i += 2;
      } else if (twoChars === '\\u') {
        i += 2;
        var fourHexDigits = slice$1(source, i, i + 4);
        if (!exec$5(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError('Bad Unicode escape at: ' + i);
        value += fromCharCode$3($parseInt$1(fourHexDigits, 16));
        i += 4;
      } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
    } else if (chr === '"') {
      unterminated = false;
      i++;
      break;
    } else {
      if (exec$5(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError('Bad control character in string literal at: ' + i);
      value += chr;
      i++;
    }
  }
  if (unterminated) throw new $SyntaxError('Unterminated string at: ' + i);
  return { value: value, end: i };
};

var $$9 = _export;
var DESCRIPTORS$5 = descriptors;
var globalThis$b = globalThis_1;
var getBuiltIn$1 = getBuiltIn$d;
var uncurryThis$b = functionUncurryThis;
var call$3 = functionCall;
var isCallable$1 = isCallable$v;
var isObject$2 = isObject$p;
var isArray = isArray$5;
var hasOwn$3 = hasOwnProperty_1;
var toString$3 = toString$m;
var lengthOfArrayLike$1 = lengthOfArrayLike$i;
var createProperty$1 = createProperty$3;
var fails$1 = fails$N;
var parseJSONString = parseJsonString;
var NATIVE_SYMBOL = symbolConstructorDetection;

var JSON = globalThis$b.JSON;
var Number$1 = globalThis$b.Number;
var SyntaxError$3 = globalThis$b.SyntaxError;
var nativeParse = JSON && JSON.parse;
var enumerableOwnProperties = getBuiltIn$1('Object', 'keys');
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var at$1 = uncurryThis$b(''.charAt);
var slice = uncurryThis$b(''.slice);
var exec$4 = uncurryThis$b(/./.exec);
var push$4 = uncurryThis$b([].push);

var IS_DIGIT = /^\d$/;
var IS_NON_ZERO_DIGIT = /^[1-9]$/;
var IS_NUMBER_START = /^[\d-]$/;
var IS_WHITESPACE = /^[\t\n\r ]$/;

var PRIMITIVE = 0;
var OBJECT = 1;

var $parse = function (source, reviver) {
  source = toString$3(source);
  var context = new Context(source, 0);
  var root = context.parse();
  var value = root.value;
  var endIndex = context.skip(IS_WHITESPACE, root.end);
  if (endIndex < source.length) {
    throw new SyntaxError$3('Unexpected extra character: "' + at$1(source, endIndex) + '" after the parsed data at: ' + endIndex);
  }
  return isCallable$1(reviver) ? internalize({ '': value }, '', reviver, root) : value;
};

var internalize = function (holder, name, reviver, node) {
  var val = holder[name];
  var unmodified = node && val === node.value;
  var context = unmodified && typeof node.source == 'string' ? { source: node.source } : {};
  var elementRecordsLen, keys, len, i, P;
  if (isObject$2(val)) {
    var nodeIsArray = isArray(val);
    var nodes = unmodified ? node.nodes : nodeIsArray ? [] : {};
    if (nodeIsArray) {
      elementRecordsLen = nodes.length;
      len = lengthOfArrayLike$1(val);
      for (i = 0; i < len; i++) {
        internalizeProperty(val, i, internalize(val, '' + i, reviver, i < elementRecordsLen ? nodes[i] : undefined));
      }
    } else {
      keys = enumerableOwnProperties(val);
      len = lengthOfArrayLike$1(keys);
      for (i = 0; i < len; i++) {
        P = keys[i];
        internalizeProperty(val, P, internalize(val, P, reviver, hasOwn$3(nodes, P) ? nodes[P] : undefined));
      }
    }
  }
  return call$3(reviver, holder, name, val, context);
};

var internalizeProperty = function (object, key, value) {
  if (DESCRIPTORS$5) {
    var descriptor = getOwnPropertyDescriptor(object, key);
    if (descriptor && !descriptor.configurable) return;
  }
  if (value === undefined) delete object[key];
  else createProperty$1(object, key, value);
};

var Node = function (value, end, source, nodes) {
  this.value = value;
  this.end = end;
  this.source = source;
  this.nodes = nodes;
};

var Context = function (source, index) {
  this.source = source;
  this.index = index;
};

// https://www.json.org/json-en.html
Context.prototype = {
  fork: function (nextIndex) {
    return new Context(this.source, nextIndex);
  },
  parse: function () {
    var source = this.source;
    var i = this.skip(IS_WHITESPACE, this.index);
    var fork = this.fork(i);
    var chr = at$1(source, i);
    if (exec$4(IS_NUMBER_START, chr)) return fork.number();
    switch (chr) {
      case '{':
        return fork.object();
      case '[':
        return fork.array();
      case '"':
        return fork.string();
      case 't':
        return fork.keyword(true);
      case 'f':
        return fork.keyword(false);
      case 'n':
        return fork.keyword(null);
    } throw new SyntaxError$3('Unexpected character: "' + chr + '" at: ' + i);
  },
  node: function (type, value, start, end, nodes) {
    return new Node(value, end, type ? null : slice(this.source, start, end), nodes);
  },
  object: function () {
    var source = this.source;
    var i = this.index + 1;
    var expectKeypair = false;
    var object = {};
    var nodes = {};
    while (i < source.length) {
      i = this.until(['"', '}'], i);
      if (at$1(source, i) === '}' && !expectKeypair) {
        i++;
        break;
      }
      // Parsing the key
      var result = this.fork(i).string();
      var key = result.value;
      i = result.end;
      i = this.until([':'], i) + 1;
      // Parsing value
      i = this.skip(IS_WHITESPACE, i);
      result = this.fork(i).parse();
      createProperty$1(nodes, key, result);
      createProperty$1(object, key, result.value);
      i = this.until([',', '}'], result.end);
      var chr = at$1(source, i);
      if (chr === ',') {
        expectKeypair = true;
        i++;
      } else if (chr === '}') {
        i++;
        break;
      }
    }
    return this.node(OBJECT, object, this.index, i, nodes);
  },
  array: function () {
    var source = this.source;
    var i = this.index + 1;
    var expectElement = false;
    var array = [];
    var nodes = [];
    while (i < source.length) {
      i = this.skip(IS_WHITESPACE, i);
      if (at$1(source, i) === ']' && !expectElement) {
        i++;
        break;
      }
      var result = this.fork(i).parse();
      push$4(nodes, result);
      push$4(array, result.value);
      i = this.until([',', ']'], result.end);
      if (at$1(source, i) === ',') {
        expectElement = true;
        i++;
      } else if (at$1(source, i) === ']') {
        i++;
        break;
      }
    }
    return this.node(OBJECT, array, this.index, i, nodes);
  },
  string: function () {
    var index = this.index;
    var parsed = parseJSONString(this.source, this.index + 1);
    return this.node(PRIMITIVE, parsed.value, index, parsed.end);
  },
  number: function () {
    var source = this.source;
    var startIndex = this.index;
    var i = startIndex;
    if (at$1(source, i) === '-') i++;
    if (at$1(source, i) === '0') i++;
    else if (exec$4(IS_NON_ZERO_DIGIT, at$1(source, i))) i = this.skip(IS_DIGIT, i + 1);
    else throw new SyntaxError$3('Failed to parse number at: ' + i);
    if (at$1(source, i) === '.') i = this.skip(IS_DIGIT, i + 1);
    if (at$1(source, i) === 'e' || at$1(source, i) === 'E') {
      i++;
      if (at$1(source, i) === '+' || at$1(source, i) === '-') i++;
      var exponentStartIndex = i;
      i = this.skip(IS_DIGIT, i);
      if (exponentStartIndex === i) throw new SyntaxError$3("Failed to parse number's exponent value at: " + i);
    }
    return this.node(PRIMITIVE, Number$1(slice(source, startIndex, i)), startIndex, i);
  },
  keyword: function (value) {
    var keyword = '' + value;
    var index = this.index;
    var endIndex = index + keyword.length;
    if (slice(this.source, index, endIndex) !== keyword) throw new SyntaxError$3('Failed to parse value at: ' + index);
    return this.node(PRIMITIVE, value, index, endIndex);
  },
  skip: function (regex, i) {
    var source = this.source;
    for (; i < source.length; i++) if (!exec$4(regex, at$1(source, i))) break;
    return i;
  },
  until: function (array, i) {
    i = this.skip(IS_WHITESPACE, i);
    var chr = at$1(this.source, i);
    for (var j = 0; j < array.length; j++) if (array[j] === chr) return i;
    throw new SyntaxError$3('Unexpected character: "' + chr + '" at: ' + i);
  }
};

var NO_SOURCE_SUPPORT = fails$1(function () {
  var unsafeInt = '9007199254740993';
  var source;
  nativeParse(unsafeInt, function (key, value, context) {
    source = context.source;
  });
  return source !== unsafeInt;
});

var PROPER_BASE_PARSE = NATIVE_SYMBOL && !fails$1(function () {
  // Safari 9 bug
  return 1 / nativeParse('-0 \t') !== -Infinity;
});

// `JSON.parse` method
// https://tc39.es/ecma262/#sec-json.parse
// https://github.com/tc39/proposal-json-parse-with-source
$$9({ target: 'JSON', stat: true, forced: NO_SOURCE_SUPPORT }, {
  parse: function parse(text, reviver) {
    return PROPER_BASE_PARSE && !isCallable$1(reviver) ? nativeParse(text) : $parse(text, reviver);
  }
});

var isObject$1 = isObject$p;

var $String = String;
var $TypeError$4 = TypeError;

var anObjectOrUndefined$2 = function (argument) {
  if (argument === undefined || isObject$1(argument)) return argument;
  throw new $TypeError$4($String(argument) + ' is not an object or undefined');
};

var $TypeError$3 = TypeError;

var aString$2 = function (argument) {
  if (typeof argument == 'string') return argument;
  throw new $TypeError$3('Argument is not a string');
};

var commonAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var base64Alphabet$2 = commonAlphabet + '+/';
var base64UrlAlphabet$2 = commonAlphabet + '-_';

var inverse = function (characters) {
  // TODO: use `Object.create(null)` in `core-js@4`
  var result = {};
  var index = 0;
  for (; index < 64; index++) result[characters.charAt(index)] = index;
  return result;
};

var base64Map$2 = {
  i2c: base64Alphabet$2,
  c2i: inverse(base64Alphabet$2),
  i2cUrl: base64UrlAlphabet$2,
  c2iUrl: inverse(base64UrlAlphabet$2)
};

var $TypeError$2 = TypeError;

var getAlphabetOption$2 = function (options) {
  var alphabet = options && options.alphabet;
  if (alphabet === undefined || alphabet === 'base64' || alphabet === 'base64url') return alphabet || 'base64';
  throw new $TypeError$2('Incorrect `alphabet` option');
};

var globalThis$a = globalThis_1;
var uncurryThis$a = functionUncurryThis;
var anObjectOrUndefined$1 = anObjectOrUndefined$2;
var aString$1 = aString$2;
var hasOwn$2 = hasOwnProperty_1;
var base64Map$1 = base64Map$2;
var getAlphabetOption$1 = getAlphabetOption$2;
var notDetached$3 = arrayBufferNotDetached;

var base64Alphabet$1 = base64Map$1.c2i;
var base64UrlAlphabet$1 = base64Map$1.c2iUrl;

var SyntaxError$2 = globalThis$a.SyntaxError;
var TypeError$3 = globalThis$a.TypeError;
var at = uncurryThis$a(''.charAt);

var skipAsciiWhitespace = function (string, index) {
  var length = string.length;
  for (;index < length; index++) {
    var chr = at(string, index);
    if (chr !== ' ' && chr !== '\t' && chr !== '\n' && chr !== '\f' && chr !== '\r') break;
  } return index;
};

var decodeBase64Chunk = function (chunk, alphabet, throwOnExtraBits) {
  var chunkLength = chunk.length;

  if (chunkLength < 4) {
    chunk += chunkLength === 2 ? 'AA' : 'A';
  }

  var triplet = (alphabet[at(chunk, 0)] << 18)
    + (alphabet[at(chunk, 1)] << 12)
    + (alphabet[at(chunk, 2)] << 6)
    + alphabet[at(chunk, 3)];

  var chunkBytes = [
    (triplet >> 16) & 255,
    (triplet >> 8) & 255,
    triplet & 255
  ];

  if (chunkLength === 2) {
    if (throwOnExtraBits && chunkBytes[1] !== 0) {
      throw new SyntaxError$2('Extra bits');
    }
    return [chunkBytes[0]];
  }

  if (chunkLength === 3) {
    if (throwOnExtraBits && chunkBytes[2] !== 0) {
      throw new SyntaxError$2('Extra bits');
    }
    return [chunkBytes[0], chunkBytes[1]];
  }

  return chunkBytes;
};

var writeBytes = function (bytes, elements, written) {
  var elementsLength = elements.length;
  for (var index = 0; index < elementsLength; index++) {
    bytes[written + index] = elements[index];
  }
  return written + elementsLength;
};

/* eslint-disable max-statements, max-depth -- TODO */
var uint8FromBase64 = function (string, options, into, maxLength) {
  aString$1(string);
  anObjectOrUndefined$1(options);
  var alphabet = getAlphabetOption$1(options) === 'base64' ? base64Alphabet$1 : base64UrlAlphabet$1;
  var lastChunkHandling = options ? options.lastChunkHandling : undefined;

  if (lastChunkHandling === undefined) lastChunkHandling = 'loose';

  if (lastChunkHandling !== 'loose' && lastChunkHandling !== 'strict' && lastChunkHandling !== 'stop-before-partial') {
    throw new TypeError$3('Incorrect `lastChunkHandling` option');
  }

  if (into) notDetached$3(into.buffer);

  var bytes = into || [];
  var written = 0;
  var read = 0;
  var chunk = '';
  var index = 0;

  if (maxLength) while (true) {
    index = skipAsciiWhitespace(string, index);
    if (index === string.length) {
      if (chunk.length > 0) {
        if (lastChunkHandling === 'stop-before-partial') {
          break;
        }
        if (lastChunkHandling === 'loose') {
          if (chunk.length === 1) {
            throw new SyntaxError$2('Malformed padding: exactly one additional character');
          }
          written = writeBytes(bytes, decodeBase64Chunk(chunk, alphabet, false), written);
        } else {
          throw new SyntaxError$2('Missing padding');
        }
      }
      read = string.length;
      break;
    }
    var chr = at(string, index);
    ++index;
    if (chr === '=') {
      if (chunk.length < 2) {
        throw new SyntaxError$2('Padding is too early');
      }
      index = skipAsciiWhitespace(string, index);
      if (chunk.length === 2) {
        if (index === string.length) {
          if (lastChunkHandling === 'stop-before-partial') {
            break;
          }
          throw new SyntaxError$2('Malformed padding: only one =');
        }
        if (at(string, index) === '=') {
          ++index;
          index = skipAsciiWhitespace(string, index);
        }
      }
      if (index < string.length) {
        throw new SyntaxError$2('Unexpected character after padding');
      }
      written = writeBytes(bytes, decodeBase64Chunk(chunk, alphabet, lastChunkHandling === 'strict'), written);
      read = string.length;
      break;
    }
    if (!hasOwn$2(alphabet, chr)) {
      throw new SyntaxError$2('Unexpected character');
    }
    var remainingBytes = maxLength - written;
    if (remainingBytes === 1 && chunk.length === 2 || remainingBytes === 2 && chunk.length === 3) {
      // special case: we can fit exactly the number of bytes currently represented by chunk, so we were just checking for `=`
      break;
    }

    chunk += chr;
    if (chunk.length === 4) {
      written = writeBytes(bytes, decodeBase64Chunk(chunk, alphabet, false), written);
      chunk = '';
      read = index;
      if (written === maxLength) {
        break;
      }
    }
  }

  return { bytes: bytes, read: read, written: written };
};

var classof$1 = classof$i;

var $TypeError$1 = TypeError;

// Perform ? RequireInternalSlot(argument, [[TypedArrayName]])
// If argument.[[TypedArrayName]] is not "Uint8Array", throw a TypeError exception
var anUint8Array$4 = function (argument) {
  if (classof$1(argument) === 'Uint8Array') return argument;
  throw new $TypeError$1('Argument is not an Uint8Array');
};

var $$8 = _export;
var globalThis$9 = globalThis_1;
var $fromBase64 = uint8FromBase64;
var anUint8Array$3 = anUint8Array$4;

var Uint8Array$1 = globalThis$9.Uint8Array;

// `Uint8Array.prototype.setFromBase64` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (Uint8Array$1) $$8({ target: 'Uint8Array', proto: true }, {
  setFromBase64: function setFromBase64(string /* , options */) {
    anUint8Array$3(this);

    var result = $fromBase64(string, arguments.length > 1 ? arguments[1] : undefined, this, this.length);

    return { read: result.read, written: result.written };
  }
});

var globalThis$8 = globalThis_1;
var uncurryThis$9 = functionUncurryThis;

var Uint8Array = globalThis$8.Uint8Array;
var SyntaxError$1 = globalThis$8.SyntaxError;
var parseInt$2 = globalThis$8.parseInt;
var min = Math.min;
var NOT_HEX = /[^\da-f]/i;
var exec$3 = uncurryThis$9(NOT_HEX.exec);
var stringSlice$2 = uncurryThis$9(''.slice);

var uint8FromHex = function (string, into) {
  var stringLength = string.length;
  if (stringLength % 2 !== 0) throw new SyntaxError$1('String should be an even number of characters');
  var maxLength = into ? min(into.length, stringLength / 2) : stringLength / 2;
  var bytes = into || new Uint8Array(maxLength);
  var read = 0;
  var written = 0;
  while (written < maxLength) {
    var hexits = stringSlice$2(string, read, read += 2);
    if (exec$3(NOT_HEX, hexits)) throw new SyntaxError$1('String should only contain hex characters');
    bytes[written++] = parseInt$2(hexits, 16);
  }
  return { bytes: bytes, read: read };
};

var $$7 = _export;
var globalThis$7 = globalThis_1;
var aString = aString$2;
var anUint8Array$2 = anUint8Array$4;
var notDetached$2 = arrayBufferNotDetached;
var $fromHex = uint8FromHex;

// `Uint8Array.prototype.setFromHex` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (globalThis$7.Uint8Array) $$7({ target: 'Uint8Array', proto: true }, {
  setFromHex: function setFromHex(string) {
    anUint8Array$2(this);
    aString(string);
    notDetached$2(this.buffer);
    var read = $fromHex(string, this).read;
    return { read: read, written: read / 2 };
  }
});

var $$6 = _export;
var globalThis$6 = globalThis_1;
var uncurryThis$8 = functionUncurryThis;
var anObjectOrUndefined = anObjectOrUndefined$2;
var anUint8Array$1 = anUint8Array$4;
var notDetached$1 = arrayBufferNotDetached;
var base64Map = base64Map$2;
var getAlphabetOption = getAlphabetOption$2;

var base64Alphabet = base64Map.i2c;
var base64UrlAlphabet = base64Map.i2cUrl;

var charAt$3 = uncurryThis$8(''.charAt);

// `Uint8Array.prototype.toBase64` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (globalThis$6.Uint8Array) $$6({ target: 'Uint8Array', proto: true }, {
  toBase64: function toBase64(/* options */) {
    var array = anUint8Array$1(this);
    var options = arguments.length ? anObjectOrUndefined(arguments[0]) : undefined;
    var alphabet = getAlphabetOption(options) === 'base64' ? base64Alphabet : base64UrlAlphabet;
    var omitPadding = !!options && !!options.omitPadding;
    notDetached$1(this.buffer);

    var result = '';
    var i = 0;
    var length = array.length;
    var triplet;

    var at = function (shift) {
      return charAt$3(alphabet, (triplet >> (6 * shift)) & 63);
    };

    for (; i + 2 < length; i += 3) {
      triplet = (array[i] << 16) + (array[i + 1] << 8) + array[i + 2];
      result += at(3) + at(2) + at(1) + at(0);
    }
    if (i + 2 === length) {
      triplet = (array[i] << 16) + (array[i + 1] << 8);
      result += at(3) + at(2) + at(1) + (omitPadding ? '' : '=');
    } else if (i + 1 === length) {
      triplet = array[i] << 16;
      result += at(3) + at(2) + (omitPadding ? '' : '==');
    }

    return result;
  }
});

var $$5 = _export;
var globalThis$5 = globalThis_1;
var uncurryThis$7 = functionUncurryThis;
var anUint8Array = anUint8Array$4;
var notDetached = arrayBufferNotDetached;

var numberToString$1 = uncurryThis$7(1.0.toString);

// `Uint8Array.prototype.toHex` method
// https://github.com/tc39/proposal-arraybuffer-base64
if (globalThis$5.Uint8Array) $$5({ target: 'Uint8Array', proto: true }, {
  toHex: function toHex() {
    anUint8Array(this);
    notDetached(this.buffer);
    var result = '';
    for (var i = 0, length = this.length; i < length; i++) {
      var hex = numberToString$1(this[i], 16);
      result += hex.length === 1 ? '0' + hex : hex;
    }
    return result;
  }
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

var globalThis$4 = globalThis_1;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty = createNonEnumerableProperty$d;
var setToStringTag$2 = setToStringTag$8;
var wellKnownSymbol$2 = wellKnownSymbol$p;

var ITERATOR$2 = wellKnownSymbol$2('iterator');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$2] = ArrayValues;
    }
    setToStringTag$2(CollectionPrototype, COLLECTION_NAME, true);
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(globalThis$4[COLLECTION_NAME] && globalThis$4[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

var $$4 = _export;
var globalThis$3 = globalThis_1;
var defineBuiltInAccessor$3 = defineBuiltInAccessor$b;
var DESCRIPTORS$4 = descriptors;

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var INCORRECT_VALUE = globalThis$3.self !== globalThis$3;

// `self` getter
// https://html.spec.whatwg.org/multipage/window-object.html#dom-self
try {
  if (DESCRIPTORS$4) {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var descriptor = Object.getOwnPropertyDescriptor(globalThis$3, 'self');
    // some engines have `self`, but with incorrect descriptor
    // https://github.com/denoland/deno/issues/15765
    if (INCORRECT_VALUE || !descriptor || !descriptor.get || !descriptor.enumerable) {
      defineBuiltInAccessor$3(globalThis$3, 'self', {
        get: function self() {
          return globalThis$3;
        },
        set: function self(value) {
          if (this !== globalThis$3) throw new $TypeError('Illegal invocation');
          defineProperty(globalThis$3, 'self', {
            value: value,
            writable: true,
            configurable: true,
            enumerable: true
          });
        },
        configurable: true,
        enumerable: true
      });
    }
  } else $$4({ global: true, simple: true, forced: INCORRECT_VALUE }, {
    self: globalThis$3
  });
} catch (error) { /* empty */ }

var charAt$2 = stringMultibyte.charAt;
var toString$2 = toString$m;
var InternalStateModule$2 = internalState;
var defineIterator = iteratorDefine;
var createIterResultObject$1 = createIterResultObject$4;

var STRING_ITERATOR = 'String Iterator';
var setInternalState$2 = InternalStateModule$2.set;
var getInternalState = InternalStateModule$2.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$2(this, {
    type: STRING_ITERATOR,
    string: toString$2(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject$1(undefined, true);
  point = charAt$2(string, index);
  state.index += point.length;
  return createIterResultObject$1(point, false);
});

var fails = fails$N;
var wellKnownSymbol$1 = wellKnownSymbol$p;
var DESCRIPTORS$3 = descriptors;
var IS_PURE = isPure;

var ITERATOR$1 = wellKnownSymbol$1('iterator');

var urlConstructorDetection = !fails(function () {
  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  var url = new URL('b?a=1&b=2&c=3', 'https://a');
  var params = url.searchParams;
  var params2 = new URLSearchParams('a=1&a=2&b=3');
  var result = '';
  url.pathname = 'c%20d';
  params.forEach(function (value, key) {
    params['delete']('b');
    result += key + value;
  });
  params2['delete']('a', 2);
  // `undefined` case is a Chromium 117 bug
  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
  params2['delete']('b', undefined);
  return (IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')))
    || (!params.size && (IS_PURE || !DESCRIPTORS$3))
    || !params.sort
    || url.href !== 'https://a/c%20d?a=1&c=3'
    || params.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !params[ITERATOR$1]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('https://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('https://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('https://x', undefined).host !== 'x';
});

var bind$2 = functionBindContext;
var call$2 = functionCall;
var toObject = toObject$e;
var callWithSafeIterationClosing = callWithSafeIterationClosing$3;
var isArrayIteratorMethod = isArrayIteratorMethod$3;
var isConstructor = isConstructor$3;
var lengthOfArrayLike = lengthOfArrayLike$i;
var createProperty = createProperty$3;
var getIterator$1 = getIterator$4;
var getIteratorMethod$1 = getIteratorMethod$5;

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind$2(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod$1(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    result = IS_CONSTRUCTOR ? new this() : [];
    iterator = getIterator$1(O, iteratorMethod);
    next = iterator.next;
    for (;!(step = call$2(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var uncurryThis$6 = functionUncurryThis;

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;

var $RangeError$1 = RangeError;
var exec$2 = uncurryThis$6(regexSeparators.exec);
var floor$1 = Math.floor;
var fromCharCode$2 = String.fromCharCode;
var charCodeAt = uncurryThis$6(''.charCodeAt);
var join$3 = uncurryThis$6([].join);
var push$3 = uncurryThis$6([].push);
var replace$2 = uncurryThis$6(''.replace);
var split$2 = uncurryThis$6(''.split);
var toLowerCase$1 = uncurryThis$6(''.toLowerCase);

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = charCodeAt(string, counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);
      if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
        push$3(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push$3(output, value);
        counter--;
      }
    } else {
      push$3(output, value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor$1(delta / damp) : delta >> 1;
  delta += floor$1(delta / numPoints);
  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor$1(delta / baseMinusTMin);
    k += base;
  }
  return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      push$3(output, fromCharCode$2(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    push$3(output, delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
      throw new $RangeError$1(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw new $RangeError$1(OVERFLOW_ERROR);
      }
      if (currentValue === n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        var k = base;
        while (true) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push$3(output, fromCharCode$2(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor$1(qMinusT / baseMinusT);
          k += base;
        }

        push$3(output, fromCharCode$2(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
        delta = 0;
        handledCPCount++;
      }
    }

    delta++;
    n++;
  }
  return join$3(output, '');
};

var stringPunycodeToAscii = function (input) {
  var encoded = [];
  var labels = split$2(replace$2(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push$3(encoded, exec$2(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  }
  return join$3(encoded, '.');
};

var $$3 = _export;
var uncurryThis$5 = functionUncurryThis;
var toAbsoluteIndex = toAbsoluteIndex$4;

var $RangeError = RangeError;
var fromCharCode$1 = String.fromCharCode;
// eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
var $fromCodePoint = String.fromCodePoint;
var join$2 = uncurryThis$5([].join);

// length should be 1, old FF problem
var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length !== 1;

// `String.fromCodePoint` method
// https://tc39.es/ecma262/#sec-string.fromcodepoint
$$3({ target: 'String', stat: true, arity: 1, forced: INCORRECT_LENGTH }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function fromCodePoint(x) {
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;
    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw new $RangeError(code + ' is not a valid code point');
      elements[i] = code < 0x10000
        ? fromCharCode$1(code)
        : fromCharCode$1(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00);
    } return join$2(elements, '');
  }
});

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`


var $$2 = _export;
var globalThis$2 = globalThis_1;
var safeGetBuiltIn = safeGetBuiltIn$2;
var getBuiltIn = getBuiltIn$d;
var call$1 = functionCall;
var uncurryThis$4 = functionUncurryThis;
var DESCRIPTORS$2 = descriptors;
var USE_NATIVE_URL$1 = urlConstructorDetection;
var defineBuiltIn$3 = defineBuiltIn$g;
var defineBuiltInAccessor$2 = defineBuiltInAccessor$b;
var defineBuiltIns = defineBuiltIns$5;
var setToStringTag$1 = setToStringTag$8;
var createIteratorConstructor = iteratorCreateConstructor;
var InternalStateModule$1 = internalState;
var anInstance$1 = anInstance$8;
var isCallable = isCallable$v;
var hasOwn$1 = hasOwnProperty_1;
var bind$1 = functionBindContext;
var classof = classof$i;
var anObject = anObject$q;
var isObject = isObject$p;
var $toString$1 = toString$m;
var create = objectCreate$1;
var createPropertyDescriptor = createPropertyDescriptor$7;
var getIterator = getIterator$4;
var getIteratorMethod = getIteratorMethod$5;
var createIterResultObject = createIterResultObject$4;
var validateArgumentsLength$3 = validateArgumentsLength$5;
var wellKnownSymbol = wellKnownSymbol$p;
var arraySort = arraySort$1;

var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState$1 = InternalStateModule$1.set;
var getInternalParamsState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var nativeFetch = safeGetBuiltIn('fetch');
var NativeRequest = safeGetBuiltIn('Request');
var Headers = safeGetBuiltIn('Headers');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var TypeError$2 = globalThis$2.TypeError;
var encodeURIComponent$1 = globalThis$2.encodeURIComponent;
var fromCharCode = String.fromCharCode;
var fromCodePoint = getBuiltIn('String', 'fromCodePoint');
var $parseInt = parseInt;
var charAt$1 = uncurryThis$4(''.charAt);
var join$1 = uncurryThis$4([].join);
var push$2 = uncurryThis$4([].push);
var replace$1 = uncurryThis$4(''.replace);
var shift$1 = uncurryThis$4([].shift);
var splice = uncurryThis$4([].splice);
var split$1 = uncurryThis$4(''.split);
var stringSlice$1 = uncurryThis$4(''.slice);
var exec$1 = uncurryThis$4(/./.exec);

var plus = /\+/g;
var FALLBACK_REPLACER = '\uFFFD';
var VALID_HEX = /^[0-9a-f]+$/i;

var parseHexOctet = function (string, start) {
  var substr = stringSlice$1(string, start, start + 2);
  if (!exec$1(VALID_HEX, substr)) return NaN;

  return $parseInt(substr, 16);
};

var getLeadingOnes = function (octet) {
  var count = 0;
  for (var mask = 0x80; mask > 0 && (octet & mask) !== 0; mask >>= 1) {
    count++;
  }
  return count;
};

var utf8Decode = function (octets) {
  var codePoint = null;

  switch (octets.length) {
    case 1:
      codePoint = octets[0];
      break;
    case 2:
      codePoint = (octets[0] & 0x1F) << 6 | (octets[1] & 0x3F);
      break;
    case 3:
      codePoint = (octets[0] & 0x0F) << 12 | (octets[1] & 0x3F) << 6 | (octets[2] & 0x3F);
      break;
    case 4:
      codePoint = (octets[0] & 0x07) << 18 | (octets[1] & 0x3F) << 12 | (octets[2] & 0x3F) << 6 | (octets[3] & 0x3F);
      break;
  }

  return codePoint > 0x10FFFF ? null : codePoint;
};

var decode = function (input) {
  input = replace$1(input, plus, ' ');
  var length = input.length;
  var result = '';
  var i = 0;

  while (i < length) {
    var decodedChar = charAt$1(input, i);

    if (decodedChar === '%') {
      if (charAt$1(input, i + 1) === '%' || i + 3 > length) {
        result += '%';
        i++;
        continue;
      }

      var octet = parseHexOctet(input, i + 1);

      // eslint-disable-next-line no-self-compare -- NaN check
      if (octet !== octet) {
        result += decodedChar;
        i++;
        continue;
      }

      i += 2;
      var byteSequenceLength = getLeadingOnes(octet);

      if (byteSequenceLength === 0) {
        decodedChar = fromCharCode(octet);
      } else {
        if (byteSequenceLength === 1 || byteSequenceLength > 4) {
          result += FALLBACK_REPLACER;
          i++;
          continue;
        }

        var octets = [octet];
        var sequenceIndex = 1;

        while (sequenceIndex < byteSequenceLength) {
          i++;
          if (i + 3 > length || charAt$1(input, i) !== '%') break;

          var nextByte = parseHexOctet(input, i + 1);

          // eslint-disable-next-line no-self-compare -- NaN check
          if (nextByte !== nextByte) {
            i += 3;
            break;
          }
          if (nextByte > 191 || nextByte < 128) break;

          push$2(octets, nextByte);
          i += 2;
          sequenceIndex++;
        }

        if (octets.length !== byteSequenceLength) {
          result += FALLBACK_REPLACER;
          continue;
        }

        var codePoint = utf8Decode(octets);
        if (codePoint === null) {
          result += FALLBACK_REPLACER;
        } else {
          decodedChar = fromCodePoint(codePoint);
        }
      }
    }

    result += decodedChar;
    i++;
  }

  return result;
};

var find = /[!'()~]|%20/g;

var replacements = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace$1(encodeURIComponent$1(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState$1(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    target: getInternalParamsState(params).entries,
    index: 0,
    kind: kind
  });
}, URL_SEARCH_PARAMS, function next() {
  var state = getInternalIteratorState(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = null;
    return createIterResultObject(undefined, true);
  }
  var entry = target[index];
  switch (state.kind) {
    case 'keys': return createIterResultObject(entry.key, false);
    case 'values': return createIterResultObject(entry.value, false);
  } return createIterResultObject([entry.key, entry.value], false);
}, true);

var URLSearchParamsState = function (init) {
  this.entries = [];
  this.url = null;

  if (init !== undefined) {
    if (isObject(init)) this.parseObject(init);
    else this.parseQuery(typeof init == 'string' ? charAt$1(init, 0) === '?' ? stringSlice$1(init, 1) : init : $toString$1(init));
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var entries = this.entries;
    var iteratorMethod = getIteratorMethod(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator(object, iteratorMethod);
      next = iterator.next;
      while (!(step = call$1(next, iterator)).done) {
        entryIterator = getIterator(anObject(step.value));
        entryNext = entryIterator.next;
        if (
          (first = call$1(entryNext, entryIterator)).done ||
          (second = call$1(entryNext, entryIterator)).done ||
          !call$1(entryNext, entryIterator).done
        ) throw new TypeError$2('Expected sequence with length 2');
        push$2(entries, { key: $toString$1(first.value), value: $toString$1(second.value) });
      }
    } else for (var key in object) if (hasOwn$1(object, key)) {
      push$2(entries, { key: key, value: $toString$1(object[key]) });
    }
  },
  parseQuery: function (query) {
    if (query) {
      var entries = this.entries;
      var attributes = split$1(query, '&');
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = split$1(attribute, '=');
          push$2(entries, {
            key: decode(shift$1(entry)),
            value: decode(join$1(entry, '='))
          });
        }
      }
    }
  },
  serialize: function () {
    var entries = this.entries;
    var result = [];
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      push$2(result, serialize(entry.key) + '=' + serialize(entry.value));
    } return join$1(result, '&');
  },
  update: function () {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function () {
    if (this.url) this.url.update();
  }
};

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance$1(this, URLSearchParamsPrototype$3);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var state = setInternalState$1(this, new URLSearchParamsState(init));
  if (!DESCRIPTORS$2) this.size = state.entries.length;
};

var URLSearchParamsPrototype$3 = URLSearchParamsConstructor.prototype;

defineBuiltIns(URLSearchParamsPrototype$3, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength$3(arguments.length, 2);
    push$2(state.entries, { key: $toString$1(name), value: $toString$1(value) });
    if (!DESCRIPTORS$2) this.length++;
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name /* , value */) {
    var state = getInternalParamsState(this);
    var length = validateArgumentsLength$3(arguments.length, 1);
    var entries = state.entries;
    var key = $toString$1(name);
    var $value = length < 2 ? undefined : arguments[1];
    var value = $value === undefined ? $value : $toString$1($value);
    var index = 0;
    while (index < entries.length) {
      var entry = entries[index];
      if (entry.key === key && (value === undefined || entry.value === value)) {
        splice(entries, index, 1);
        if (value !== undefined) break;
      } else index++;
    }
    if (!DESCRIPTORS$2) this.size = entries.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    var entries = getInternalParamsState(this).entries;
    validateArgumentsLength$3(arguments.length, 1);
    var key = $toString$1(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    var entries = getInternalParamsState(this).entries;
    validateArgumentsLength$3(arguments.length, 1);
    var key = $toString$1(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) push$2(result, entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name /* , value */) {
    var entries = getInternalParamsState(this).entries;
    var length = validateArgumentsLength$3(arguments.length, 1);
    var key = $toString$1(name);
    var $value = length < 2 ? undefined : arguments[1];
    var value = $value === undefined ? $value : $toString$1($value);
    var index = 0;
    while (index < entries.length) {
      var entry = entries[index++];
      if (entry.key === key && (value === undefined || entry.value === value)) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength$3(arguments.length, 1);
    var entries = state.entries;
    var found = false;
    var key = $toString$1(name);
    var val = $toString$1(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) splice(entries, index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) push$2(entries, { key: key, value: val });
    if (!DESCRIPTORS$2) this.size = entries.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind$1(callback, arguments.length > 1 ? arguments[1] : undefined);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
defineBuiltIn$3(URLSearchParamsPrototype$3, ITERATOR, URLSearchParamsPrototype$3.entries, { name: 'entries' });

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
defineBuiltIn$3(URLSearchParamsPrototype$3, 'toString', function toString() {
  return getInternalParamsState(this).serialize();
}, { enumerable: true });

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS$2) defineBuiltInAccessor$2(URLSearchParamsPrototype$3, 'size', {
  get: function size() {
    return getInternalParamsState(this).entries.length;
  },
  configurable: true,
  enumerable: true
});

setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$$2({ global: true, constructor: true, forced: !USE_NATIVE_URL$1 }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL$1 && isCallable(Headers)) {
  var headersHas = uncurryThis$4(HeadersPrototype.has);
  var headersSet = uncurryThis$4(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create(init, {
          body: createPropertyDescriptor(0, $toString$1(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable(nativeFetch)) {
    $$2({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance$1(this, RequestPrototype);
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $$2({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

var web_urlSearchParams_constructor = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $$1 = _export;
var DESCRIPTORS$1 = descriptors;
var USE_NATIVE_URL = urlConstructorDetection;
var globalThis$1 = globalThis_1;
var bind = functionBindContext;
var uncurryThis$3 = functionUncurryThis;
var defineBuiltIn$2 = defineBuiltIn$g;
var defineBuiltInAccessor$1 = defineBuiltInAccessor$b;
var anInstance = anInstance$8;
var hasOwn = hasOwnProperty_1;
var assign = objectAssign;
var arrayFrom = arrayFrom$1;
var arraySlice = arraySlice$7;
var codeAt = stringMultibyte.codeAt;
var toASCII = stringPunycodeToAscii;
var $toString = toString$m;
var setToStringTag = setToStringTag$8;
var validateArgumentsLength$2 = validateArgumentsLength$5;
var URLSearchParamsModule = web_urlSearchParams_constructor;
var InternalStateModule = internalState;

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = globalThis$1.URL;
var TypeError$1 = globalThis$1.TypeError;
var parseInt$1 = globalThis$1.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis$3(''.charAt);
var exec = uncurryThis$3(/./.exec);
var join = uncurryThis$3([].join);
var numberToString = uncurryThis$3(1.0.toString);
var pop = uncurryThis$3([].pop);
var push$1 = uncurryThis$3([].push);
var replace = uncurryThis$3(''.replace);
var shift = uncurryThis$3([].shift);
var split = uncurryThis$3(''.split);
var stringSlice = uncurryThis$3(''.slice);
var toLowerCase = uncurryThis$3(''.toLowerCase);
var unshift = uncurryThis$3([].unshift);

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[a-z]/i;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */
var EOF;

// https://url.spec.whatwg.org/#ipv4-number-parser
var parseIPv4 = function (input) {
  var parts = split(input, '.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] === '') {
    parts.length--;
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part === '') return input;
    radix = 10;
    if (part.length > 1 && charAt(part, 0) === '0') {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix === 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
      number = parseInt$1(part, radix);
    }
    push$1(numbers, number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index === partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = pop(numbers);
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// https://url.spec.whatwg.org/#concept-ipv6-parser
// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt(input, pointer);
  };

  if (chr() === ':') {
    if (charAt(input, 1) !== ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex === 8) return;
    if (chr() === ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt$1(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() === '.') {
      if (length === 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() === '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!exec(DIGIT, chr())) return;
        while (exec(DIGIT, chr())) {
          number = parseInt$1(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece === 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
      }
      if (numbersSeen !== 4) return;
      break;
    } else if (chr() === ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex !== 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  return currLength > maxLength ? currStart : maxIndex;
};

// https://url.spec.whatwg.org/#host-serializing
var serializeHost = function (host) {
  var result, index, compress, ignore0;

  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor(host / 256);
    }
    return join(result, '.');
  }

  // ipv6
  if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  }

  return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
};

// https://url.spec.whatwg.org/#special-scheme
var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

// https://url.spec.whatwg.org/#windows-drive-letter
var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length === 2 && exec(ALPHA, charAt(string, 0))
    && ((second = charAt(string, 1)) === ':' || (!normalized && second === '|'));
};

// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
    string.length === 2 ||
    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

// https://url.spec.whatwg.org/#single-dot-path-segment
var isSingleDot = function (segment) {
  return segment === '.' || toLowerCase(segment) === '%2e';
};

// https://url.spec.whatwg.org/#double-dot-path-segment
var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

var URLState = function (url, isBase, base) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;
  if (isBase) {
    failure = this.parse(urlString);
    if (failure) throw new TypeError$1(failure);
    this.searchParams = null;
  } else {
    if (base !== undefined) baseState = new URLState(base, true);
    failure = this.parse(urlString, null, baseState);
    if (failure) throw new TypeError$1(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams$1());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};

URLState.prototype = {
  type: 'URL',
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function (input, stateOverride, base) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;

    input = $toString(input);

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace(input, LEADING_C0_CONTROL_OR_SPACE, '');
      input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, '$1');
    }

    input = replace(input, TAB_AND_NEW_LINE, '');

    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (chr && exec(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;
          break;

        case SCHEME:
          if (chr && (exec(ALPHANUMERIC, chr) || chr === '+' || chr === '-' || chr === '.')) {
            buffer += toLowerCase(chr);
          } else if (chr === ':') {
            if (stateOverride && (
              (url.isSpecial() !== hasOwn(specialSchemes, buffer)) ||
              (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
              (url.scheme === 'file' && !url.host)
            )) return;
            url.scheme = buffer;
            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
              return;
            }
            buffer = '';
            if (url.scheme === 'file') {
              state = FILE;
            } else if (url.isSpecial() && base && base.scheme === url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] === '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push$1(url.path, '');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;
          break;

        case NO_SCHEME:
          if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME;
          if (base.cannotBeABaseURL && chr === '#') {
            url.scheme = base.scheme;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base.scheme === 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr === '/' && codePoints[pointer + 1] === '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          } break;

        case PATH_OR_AUTHORITY:
          if (chr === '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;
          if (chr === EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
            state = RELATIVE_SLASH;
          } else if (chr === '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = '';
            state = QUERY;
          } else if (chr === '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.path.length--;
            state = PATH;
            continue;
          } break;

        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr === '/' || chr === '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr === '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          } break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr !== '/' || charAt(buffer, pointer + 1) !== '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr !== '/' && chr !== '\\') {
            state = AUTHORITY;
            continue;
          } break;

        case AUTHORITY:
          if (chr === '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint === ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }
            buffer = '';
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial())
          ) {
            if (seenAt && buffer === '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += chr;
          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme === 'file') {
            state = FILE_HOST;
            continue;
          } else if (chr === ':' && !seenBracket) {
            if (buffer === '') return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride === HOSTNAME) return;
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial())
          ) {
            if (url.isSpecial() && buffer === '') return INVALID_HOST;
            if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (chr === '[') seenBracket = true;
            else if (chr === ']') seenBracket = false;
            buffer += chr;
          } break;

        case PORT:
          if (exec(DIGIT, chr)) {
            buffer += chr;
          } else if (
            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial()) ||
            stateOverride
          ) {
            if (buffer !== '') {
              var port = parseInt$1(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
              buffer = '';
            }
            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;
          break;

        case FILE:
          url.scheme = 'file';
          if (chr === '/' || chr === '\\') state = FILE_SLASH;
          else if (base && base.scheme === 'file') {
            switch (chr) {
              case EOF:
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = base.query;
                break;
              case '?':
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = '';
                state = QUERY;
                break;
              case '#':
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = base.query;
                url.fragment = '';
                state = FRAGMENT;
                break;
              default:
                if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.shortenPath();
                }
                state = PATH;
                continue;
            }
          } else {
            state = PATH;
            continue;
          } break;

        case FILE_SLASH:
          if (chr === '/' || chr === '\\') {
            state = FILE_HOST;
            break;
          }
          if (base && base.scheme === 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
            if (isWindowsDriveLetter(base.path[0], true)) push$1(url.path, base.path[0]);
            else url.host = base.host;
          }
          state = PATH;
          continue;

        case FILE_HOST:
          if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer === '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure) return failure;
              if (url.host === 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            } continue;
          } else buffer += chr;
          break;

        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr !== '/' && chr !== '\\') continue;
          } else if (!stateOverride && chr === '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            state = PATH;
            if (chr !== '/') continue;
          } break;

        case PATH:
          if (
            chr === EOF || chr === '/' ||
            (chr === '\\' && url.isSpecial()) ||
            (!stateOverride && (chr === '?' || chr === '#'))
          ) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();
              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                push$1(url.path, '');
              }
            } else if (isSingleDot(buffer)) {
              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                push$1(url.path, '');
              }
            } else {
              if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
              }
              push$1(url.path, buffer);
            }
            buffer = '';
            if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                shift(url.path);
              }
            }
            if (chr === '?') {
              url.query = '';
              state = QUERY;
            } else if (chr === '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          } break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr === '?') {
            url.query = '';
            state = QUERY;
          } else if (chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case QUERY:
          if (!stateOverride && chr === '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr !== EOF) {
            if (chr === "'" && url.isSpecial()) url.query += '%27';
            else if (chr === '#') url.query += '%23';
            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case FRAGMENT:
          if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function (input) {
    var result, codePoints, index;
    if (charAt(input, 0) === '[') {
      if (charAt(input, input.length - 1) !== ']') return INVALID_HOST;
      result = parseIPv6(stringSlice(input, 1, -1));
      if (!result) return INVALID_HOST;
      this.host = result;
    // opaque host
    } else if (!this.isSpecial()) {
      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      this.host = result;
    } else {
      input = toASCII(input);
      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function () {
    return !this.host || this.cannotBeABaseURL || this.scheme === 'file';
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function () {
    return this.username !== '' || this.password !== '';
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function () {
    return hasOwn(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function () {
    var path = this.path;
    var pathSize = path.length;
    if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
      path.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function () {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';
    if (host !== null) {
      output += '//';
      if (url.includesCredentials()) {
        output += username + (password ? ':' + password : '') + '@';
      }
      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme === 'file') output += '//';
    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function (href) {
    var failure = this.parse(href);
    if (failure) throw new TypeError$1(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function () {
    var scheme = this.scheme;
    var port = this.port;
    if (scheme === 'blob') try {
      return new URLConstructor(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme === 'file' || !this.isSpecial()) return 'null';
    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function () {
    return this.scheme + ':';
  },
  setProtocol: function (protocol) {
    this.parse($toString(protocol) + ':', SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function () {
    return this.username;
  },
  setUsername: function (username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.username = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function () {
    return this.password;
  },
  setPassword: function (password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.password = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function () {
    var host = this.host;
    var port = this.port;
    return host === null ? ''
      : port === null ? serializeHost(host)
      : serializeHost(host) + ':' + port;
  },
  setHost: function (host) {
    if (this.cannotBeABaseURL) return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function () {
    var host = this.host;
    return host === null ? '' : serializeHost(host);
  },
  setHostname: function (hostname) {
    if (this.cannotBeABaseURL) return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function () {
    var port = this.port;
    return port === null ? '' : $toString(port);
  },
  setPort: function (port) {
    if (this.cannotHaveUsernamePasswordPort()) return;
    port = $toString(port);
    if (port === '') this.port = null;
    else this.parse(port, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function () {
    var path = this.path;
    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  },
  setPathname: function (pathname) {
    if (this.cannotBeABaseURL) return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function () {
    var query = this.query;
    return query ? '?' + query : '';
  },
  setSearch: function (search) {
    search = $toString(search);
    if (search === '') {
      this.query = null;
    } else {
      if (charAt(search, 0) === '?') search = stringSlice(search, 1);
      this.query = '';
      this.parse(search, QUERY);
    }
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function () {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function () {
    var fragment = this.fragment;
    return fragment ? '#' + fragment : '';
  },
  setHash: function (hash) {
    hash = $toString(hash);
    if (hash === '') {
      this.fragment = null;
      return;
    }
    if (charAt(hash, 0) === '#') hash = stringSlice(hash, 1);
    this.fragment = '';
    this.parse(hash, FRAGMENT);
  },
  update: function () {
    this.query = this.searchParams.serialize() || null;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLPrototype);
  var base = validateArgumentsLength$2(arguments.length, 1) > 1 ? arguments[1] : undefined;
  var state = setInternalState(that, new URLState(url, false, base));
  if (!DESCRIPTORS$1) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function (getter, setter) {
  return {
    get: function () {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function (value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true
  };
};

if (DESCRIPTORS$1) {
  // `URL.prototype.href` accessors pair
  // https://url.spec.whatwg.org/#dom-url-href
  defineBuiltInAccessor$1(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
  // `URL.prototype.origin` getter
  // https://url.spec.whatwg.org/#dom-url-origin
  defineBuiltInAccessor$1(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
  // `URL.prototype.protocol` accessors pair
  // https://url.spec.whatwg.org/#dom-url-protocol
  defineBuiltInAccessor$1(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
  // `URL.prototype.username` accessors pair
  // https://url.spec.whatwg.org/#dom-url-username
  defineBuiltInAccessor$1(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
  // `URL.prototype.password` accessors pair
  // https://url.spec.whatwg.org/#dom-url-password
  defineBuiltInAccessor$1(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
  // `URL.prototype.host` accessors pair
  // https://url.spec.whatwg.org/#dom-url-host
  defineBuiltInAccessor$1(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
  // `URL.prototype.hostname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hostname
  defineBuiltInAccessor$1(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
  // `URL.prototype.port` accessors pair
  // https://url.spec.whatwg.org/#dom-url-port
  defineBuiltInAccessor$1(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
  // `URL.prototype.pathname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-pathname
  defineBuiltInAccessor$1(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
  // `URL.prototype.search` accessors pair
  // https://url.spec.whatwg.org/#dom-url-search
  defineBuiltInAccessor$1(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
  // `URL.prototype.searchParams` getter
  // https://url.spec.whatwg.org/#dom-url-searchparams
  defineBuiltInAccessor$1(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
  // `URL.prototype.hash` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hash
  defineBuiltInAccessor$1(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
defineBuiltIn$2(URLPrototype, 'toJSON', function toJSON() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
defineBuiltIn$2(URLPrototype, 'toString', function toString() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  if (nativeCreateObjectURL) defineBuiltIn$2(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  if (nativeRevokeObjectURL) defineBuiltIn$2(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, 'URL');

$$1({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS$1 }, {
  URL: URLConstructor
});

var $ = _export;
var call = functionCall;

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
$({ target: 'URL', proto: true, enumerable: true }, {
  toJSON: function toJSON() {
    return call(URL.prototype.toString, this);
  }
});

var defineBuiltIn$1 = defineBuiltIn$g;
var uncurryThis$2 = functionUncurryThis;
var toString$1 = toString$m;
var validateArgumentsLength$1 = validateArgumentsLength$5;

var $URLSearchParams$1 = URLSearchParams;
var URLSearchParamsPrototype$2 = $URLSearchParams$1.prototype;
var append = uncurryThis$2(URLSearchParamsPrototype$2.append);
var $delete = uncurryThis$2(URLSearchParamsPrototype$2['delete']);
var forEach$1 = uncurryThis$2(URLSearchParamsPrototype$2.forEach);
var push = uncurryThis$2([].push);
var params$1 = new $URLSearchParams$1('a=1&a=2&b=3');

params$1['delete']('a', 1);
// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
params$1['delete']('b', undefined);

if (params$1 + '' !== 'a=2') {
  defineBuiltIn$1(URLSearchParamsPrototype$2, 'delete', function (name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $delete(this, name);
    var entries = [];
    forEach$1(this, function (v, k) { // also validates `this`
      push(entries, { key: k, value: v });
    });
    validateArgumentsLength$1(length, 1);
    var key = toString$1(name);
    var value = toString$1($value);
    var index = 0;
    var dindex = 0;
    var found = false;
    var entriesLength = entries.length;
    var entry;
    while (index < entriesLength) {
      entry = entries[index++];
      if (found || entry.key === key) {
        found = true;
        $delete(this, entry.key);
      } else dindex++;
    }
    while (dindex < entriesLength) {
      entry = entries[dindex++];
      if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value);
    }
  }, { enumerable: true, unsafe: true });
}

var defineBuiltIn = defineBuiltIn$g;
var uncurryThis$1 = functionUncurryThis;
var toString = toString$m;
var validateArgumentsLength = validateArgumentsLength$5;

var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype$1 = $URLSearchParams.prototype;
var getAll = uncurryThis$1(URLSearchParamsPrototype$1.getAll);
var $has = uncurryThis$1(URLSearchParamsPrototype$1.has);
var params = new $URLSearchParams('a=1');

// `undefined` case is a Chromium 117 bug
// https://bugs.chromium.org/p/v8/issues/detail?id=14222
if (params.has('a', 2) || !params.has('a', undefined)) {
  defineBuiltIn(URLSearchParamsPrototype$1, 'has', function has(name /* , value */) {
    var length = arguments.length;
    var $value = length < 2 ? undefined : arguments[1];
    if (length && $value === undefined) return $has(this, name);
    var values = getAll(this, name); // also validates `this`
    validateArgumentsLength(length, 1);
    var value = toString($value);
    var index = 0;
    while (index < values.length) {
      if (values[index++] === value) return true;
    } return false;
  }, { enumerable: true, unsafe: true });
}

var DESCRIPTORS = descriptors;
var uncurryThis = functionUncurryThis;
var defineBuiltInAccessor = defineBuiltInAccessor$b;

var URLSearchParamsPrototype = URLSearchParams.prototype;
var forEach = uncurryThis(URLSearchParamsPrototype.forEach);

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {
  defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
    get: function size() {
      var count = 0;
      forEach(this, function () { count++; });
      return count;
    },
    configurable: true,
    enumerable: true
  });
}
