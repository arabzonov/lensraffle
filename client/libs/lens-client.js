import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { DateUtils, invariant, failure, success, assertNever } from '@lens-protocol/shared-kernel';
import { BaseStorageSchema, Storage, InMemoryStorageProvider } from '@lens-protocol/storage';
import jwtDecode from 'jwt-decode';
import { z } from 'zod';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var NotAuthenticatedError = /*#__PURE__*/function (_Error) {
  _inherits(NotAuthenticatedError, _Error);
  var _super = _createSuper(NotAuthenticatedError);
  function NotAuthenticatedError() {
    var _this;
    _classCallCheck(this, NotAuthenticatedError);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "name", 'NotAuthenticatedError');
    _defineProperty(_assertThisInitialized(_this), "message", 'Not Authenticated');
    return _this;
  }
  return _createClass(NotAuthenticatedError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var CredentialsExpiredError = /*#__PURE__*/function (_Error2) {
  _inherits(CredentialsExpiredError, _Error2);
  var _super2 = _createSuper(CredentialsExpiredError);
  function CredentialsExpiredError() {
    var _this2;
    _classCallCheck(this, CredentialsExpiredError);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this2), "name", 'CredentialsExpiredError');
    _defineProperty(_assertThisInitialized(_this2), "message", 'Authentication credentials are expired');
    return _this2;
  }
  return _createClass(CredentialsExpiredError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}

var FetchGraphQLClient = /*#__PURE__*/function (_GraphQLClient) {
  _inherits(FetchGraphQLClient, _GraphQLClient);
  var _super = _createSuper(FetchGraphQLClient);
  function FetchGraphQLClient(url, options) {
    _classCallCheck(this, FetchGraphQLClient);
    return _super.call(this, url, _objectSpread2(_objectSpread2({}, options), {}, {
      fetch: fetch
    }));
  }
  return _createClass(FetchGraphQLClient);
}(GraphQLClient);

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var _templateObject$f, _templateObject2$f, _templateObject3$b, _templateObject4$b;
var AuthChallengeDocument = gql(_templateObject$f || (_templateObject$f = _taggedTemplateLiteral(["\n    query AuthChallenge($address: EthereumAddress!) {\n  result: challenge(request: {address: $address}) {\n    text\n  }\n}\n    "])));
var AuthVerifyDocument = gql(_templateObject2$f || (_templateObject2$f = _taggedTemplateLiteral(["\n    query AuthVerify($accessToken: Jwt!) {\n  result: verify(request: {accessToken: $accessToken})\n}\n    "])));
var AuthAuthenticateDocument = gql(_templateObject3$b || (_templateObject3$b = _taggedTemplateLiteral(["\n    mutation AuthAuthenticate($address: EthereumAddress!, $signature: Signature!) {\n  result: authenticate(request: {address: $address, signature: $signature}) {\n    accessToken\n    refreshToken\n  }\n}\n    "])));
var AuthRefreshDocument = gql(_templateObject4$b || (_templateObject4$b = _taggedTemplateLiteral(["\n    mutation AuthRefresh($refreshToken: Jwt!) {\n  result: refresh(request: {refreshToken: $refreshToken}) {\n    accessToken\n    refreshToken\n  }\n}\n    "])));
var defaultWrapper$e = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var AuthChallengeDocumentString = print(AuthChallengeDocument);
var AuthVerifyDocumentString = print(AuthVerifyDocument);
var AuthAuthenticateDocumentString = print(AuthAuthenticateDocument);
var AuthRefreshDocumentString = print(AuthRefreshDocument);
function getSdk$e(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$e;
  return {
    AuthChallenge: function AuthChallenge(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(AuthChallengeDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'AuthChallenge', 'query');
    },
    AuthVerify: function AuthVerify(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(AuthVerifyDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'AuthVerify', 'query');
    },
    AuthAuthenticate: function AuthAuthenticate(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(AuthAuthenticateDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'AuthAuthenticate', 'mutation');
    },
    AuthRefresh: function AuthRefresh(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(AuthRefreshDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'AuthRefresh', 'mutation');
    }
  };
}

var ClockSkewedError = /*#__PURE__*/function (_Error) {
  _inherits(ClockSkewedError, _Error);
  var _super = _createSuper(ClockSkewedError);
  function ClockSkewedError() {
    var _this;
    _classCallCheck(this, ClockSkewedError);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "name", 'ClockSkewedError');
    _defineProperty(_assertThisInitialized(_this), "message", 'Your system clock is skewed compared to the API clock');
    return _this;
  }
  return _createClass(ClockSkewedError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
// Threshold in seconds that will mark token as expired even it's still valid
// Adds some time for all communications that's required to refresh tokens
var TOKEN_EXP_THRESHOLD = DateUtils.secondsToMs(30);
var CLOCK_SKEWED_THRESHOLD = DateUtils.secondsToMs(10);
var Credentials = /*#__PURE__*/function () {
  function Credentials(accessToken, refreshToken) {
    _classCallCheck(this, Credentials);
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
  _createClass(Credentials, [{
    key: "checkClock",
    value: function checkClock() {
      var decodedToken = jwtDecode(this.refreshToken);
      invariant(decodedToken.iat, 'Issued at date should be provided by JWT token');

      // check if local time is not too far off from server time
      if (Math.abs(DateUtils.secondsToMs(decodedToken.iat) - Date.now()) > CLOCK_SKEWED_THRESHOLD) {
        throw new ClockSkewedError();
      }
    }
  }, {
    key: "canRefresh",
    value: function canRefresh() {
      var now = Date.now();
      var tokenExpTimestamp = this.getTokenExpTimestamp(this.refreshToken);
      return now < tokenExpTimestamp - TOKEN_EXP_THRESHOLD;
    }
  }, {
    key: "shouldRefresh",
    value: function shouldRefresh() {
      var accessToken = this.accessToken;
      if (!accessToken) {
        return true;
      }
      var now = Date.now();
      var tokenExpTimestamp = this.getTokenExpTimestamp(accessToken);
      return now >= tokenExpTimestamp - TOKEN_EXP_THRESHOLD;
    }
  }, {
    key: "getTokenExpTimestamp",
    value: function getTokenExpTimestamp(token) {
      var decodedToken = jwtDecode(token);
      invariant(decodedToken.exp, 'Exp date should be provided by JWT token');
      return DateUtils.secondsToMs(decodedToken.exp);
    }
  }]);
  return Credentials;
}();

var AuthenticationApi = /*#__PURE__*/function () {
  function AuthenticationApi(config) {
    _classCallCheck(this, AuthenticationApi);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$e(client);
  }
  _createClass(AuthenticationApi, [{
    key: "challenge",
    value: function () {
      var _challenge = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(address) {
        var result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.sdk.AuthChallenge({
                address: address
              });
            case 2:
              result = _context.sent;
              return _context.abrupt("return", result.data.result.text);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function challenge(_x) {
        return _challenge.apply(this, arguments);
      }
      return challenge;
    }()
  }, {
    key: "verify",
    value: function () {
      var _verify = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(accessToken) {
        var result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.sdk.AuthVerify({
                accessToken: accessToken
              });
            case 2:
              result = _context2.sent;
              return _context2.abrupt("return", result.data.result);
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function verify(_x2) {
        return _verify.apply(this, arguments);
      }
      return verify;
    }()
  }, {
    key: "authenticate",
    value: function () {
      var _authenticate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(address, signature) {
        var result, _result$data$result, accessToken, refreshToken, credentials;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.sdk.AuthAuthenticate({
                address: address,
                signature: signature
              });
            case 2:
              result = _context3.sent;
              _result$data$result = result.data.result, accessToken = _result$data$result.accessToken, refreshToken = _result$data$result.refreshToken;
              credentials = new Credentials(accessToken, refreshToken);
              credentials.checkClock();
              return _context3.abrupt("return", credentials);
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function authenticate(_x3, _x4) {
        return _authenticate.apply(this, arguments);
      }
      return authenticate;
    }()
  }, {
    key: "refresh",
    value: function () {
      var _refresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(refreshToken) {
        var result, _result$data$result2, newAccessToken, newRefreshToken, credentials;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.sdk.AuthRefresh({
                refreshToken: refreshToken
              });
            case 2:
              result = _context4.sent;
              _result$data$result2 = result.data.result, newAccessToken = _result$data$result2.accessToken, newRefreshToken = _result$data$result2.refreshToken;
              credentials = new Credentials(newAccessToken, newRefreshToken);
              credentials.checkClock();
              return _context4.abrupt("return", credentials);
            case 7:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function refresh(_x5) {
        return _refresh.apply(this, arguments);
      }
      return refresh;
    }()
  }]);
  return AuthenticationApi;
}();

var AuthData = z.object({
  refreshToken: z.string()
});
/**
 * Stores auth credentials.
 * Access token is kept in memory.
 * Refresh token is persisted permanently.
 */
var CredentialsStorage = /*#__PURE__*/function () {
  function CredentialsStorage(storageProvider, namespace) {
    _classCallCheck(this, CredentialsStorage);
    var authStorageSchema = new BaseStorageSchema("lens.".concat(namespace, ".credentials"), AuthData);
    this.refreshTokenStorage = Storage.createForSchema(authStorageSchema, storageProvider);
  }
  _createClass(CredentialsStorage, [{
    key: "set",
    value: function () {
      var _set = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
        var accessToken, refreshToken;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              accessToken = _ref.accessToken, refreshToken = _ref.refreshToken;
              this.accessToken = accessToken;
              _context.next = 4;
              return this.refreshTokenStorage.set({
                refreshToken: refreshToken,
                accessToken: accessToken
              });
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function set(_x) {
        return _set.apply(this, arguments);
      }
      return set;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var refreshToken, accessToken;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.getRefreshToken();
            case 2:
              refreshToken = _context2.sent;
              if (refreshToken) {
                _context2.next = 5;
                break;
              }
              return _context2.abrupt("return", null);
            case 5:
              accessToken = this.accessToken;
              return _context2.abrupt("return", new Credentials(accessToken, refreshToken));
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function get() {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "reset",
    value: function () {
      var _reset = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              this.accessToken = undefined;
              _context3.next = 3;
              return this.refreshTokenStorage.reset();
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function reset() {
        return _reset.apply(this, arguments);
      }
      return reset;
    }()
  }, {
    key: "subscribe",
    value: function subscribe(_) {
      throw new Error('Method not implemented.');
    }
  }, {
    key: "getRefreshToken",
    value: function () {
      var _getRefreshToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _result$refreshToken;
        var result;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.refreshTokenStorage.get();
            case 2:
              result = _context4.sent;
              return _context4.abrupt("return", (_result$refreshToken = result === null || result === void 0 ? void 0 : result.refreshToken) !== null && _result$refreshToken !== void 0 ? _result$refreshToken : null);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getRefreshToken() {
        return _getRefreshToken.apply(this, arguments);
      }
      return getRefreshToken;
    }()
  }]);
  return CredentialsStorage;
}();

/**
 * Authentication for Lens API. Request challenge, authenticate, manage credentials.
 */
var Authentication = /*#__PURE__*/function () {
  function Authentication(config) {
    _classCallCheck(this, Authentication);
    this.api = new AuthenticationApi(config);
    this.storage = new CredentialsStorage(config.storage || new InMemoryStorageProvider(), config.environment.name);
  }
  _createClass(Authentication, [{
    key: "generateChallenge",
    value: function () {
      var _generateChallenge = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(address) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.api.challenge(address));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function generateChallenge(_x) {
        return _generateChallenge.apply(this, arguments);
      }
      return generateChallenge;
    }()
  }, {
    key: "authenticate",
    value: function () {
      var _authenticate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(address, signature) {
        var credentials;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.api.authenticate(address, signature);
            case 2:
              credentials = _context2.sent;
              _context2.next = 5;
              return this.storage.set(credentials);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function authenticate(_x2, _x3) {
        return _authenticate.apply(this, arguments);
      }
      return authenticate;
    }()
  }, {
    key: "isAuthenticated",
    value: function () {
      var _isAuthenticated = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var credentials, newCredentials;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.storage.get();
            case 2:
              credentials = _context3.sent;
              if (credentials) {
                _context3.next = 5;
                break;
              }
              return _context3.abrupt("return", false);
            case 5:
              if (credentials.shouldRefresh()) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", credentials);
            case 7:
              if (!credentials.canRefresh()) {
                _context3.next = 14;
                break;
              }
              _context3.next = 10;
              return this.api.refresh(credentials.refreshToken);
            case 10:
              newCredentials = _context3.sent;
              _context3.next = 13;
              return this.storage.set(newCredentials);
            case 13:
              return _context3.abrupt("return", newCredentials);
            case 14:
              return _context3.abrupt("return", false);
            case 15:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function isAuthenticated() {
        return _isAuthenticated.apply(this, arguments);
      }
      return isAuthenticated;
    }()
  }, {
    key: "getRequestHeader",
    value: function () {
      var _getRequestHeader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var credentials, newCredentials;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.storage.get();
            case 2:
              credentials = _context4.sent;
              if (credentials) {
                _context4.next = 5;
                break;
              }
              return _context4.abrupt("return", failure(new NotAuthenticatedError()));
            case 5:
              if (credentials.shouldRefresh()) {
                _context4.next = 7;
                break;
              }
              return _context4.abrupt("return", success(this.buildHeader(credentials.accessToken)));
            case 7:
              if (!credentials.canRefresh()) {
                _context4.next = 14;
                break;
              }
              _context4.next = 10;
              return this.api.refresh(credentials.refreshToken);
            case 10:
              newCredentials = _context4.sent;
              _context4.next = 13;
              return this.storage.set(newCredentials);
            case 13:
              return _context4.abrupt("return", success(this.buildHeader(newCredentials.accessToken)));
            case 14:
              return _context4.abrupt("return", failure(new CredentialsExpiredError()));
            case 15:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getRequestHeader() {
        return _getRequestHeader.apply(this, arguments);
      }
      return getRequestHeader;
    }()
  }, {
    key: "buildHeader",
    value: function buildHeader(accessToken) {
      return {
        authorization: "Bearer ".concat(accessToken || '')
      };
    }
  }]);
  return Authentication;
}();

/**
 * @internal
 */

/**
 * A paginated query result.
 */

/**
 * @internal
 */
function buildPaginatedQueryResult(_x, _x2) {
  return _buildPaginatedQueryResult.apply(this, arguments);
}
function _buildPaginatedQueryResult() {
  _buildPaginatedQueryResult = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(queryFn, variables) {
    var result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return queryFn(variables);
        case 2:
          result = _context3.sent;
          _context3.t0 = function next() {
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              var nextResult;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (!result.pageInfo.next) {
                      _context.next = 6;
                      break;
                    }
                    _context.next = 3;
                    return buildPaginatedQueryResult(queryFn, _objectSpread2(_objectSpread2({}, variables), {}, {
                      cursor: result.pageInfo.next
                    }));
                  case 3:
                    nextResult = _context.sent;
                    result = nextResult;
                    return _context.abrupt("return", nextResult);
                  case 6:
                    return _context.abrupt("return", null);
                  case 7:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }))();
          };
          _context3.t1 = function prev() {
            return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
              var prevResult;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!result.pageInfo.prev) {
                      _context2.next = 6;
                      break;
                    }
                    _context2.next = 3;
                    return buildPaginatedQueryResult(queryFn, _objectSpread2(_objectSpread2({}, variables), {}, {
                      cursor: result.pageInfo.prev
                    }));
                  case 3:
                    prevResult = _context2.sent;
                    result = prevResult;
                    return _context2.abrupt("return", prevResult);
                  case 6:
                    return _context2.abrupt("return", null);
                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }))();
          };
          return _context3.abrupt("return", {
            get pageInfo() {
              return result.pageInfo;
            },
            get items() {
              return result.items;
            },
            next: _context3.t0,
            prev: _context3.t1
          });
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _buildPaginatedQueryResult.apply(this, arguments);
}

function getHeader(_x) {
  return _getHeader.apply(this, arguments);
}
function _getHeader() {
  _getHeader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(authentication) {
    var headerResult;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (authentication) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", {});
        case 2:
          _context.next = 4;
          return authentication.getRequestHeader();
        case 4:
          headerResult = _context.sent;
          if (!headerResult.isFailure()) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", {});
        case 7:
          return _context.abrupt("return", headerResult.value);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getHeader.apply(this, arguments);
}
function provideAuthHeaders(_x2, _x3) {
  return _provideAuthHeaders.apply(this, arguments);
}
function _provideAuthHeaders() {
  _provideAuthHeaders = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(authentication, handler) {
    var header;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getHeader(authentication);
        case 2:
          header = _context2.sent;
          return _context2.abrupt("return", handler(header));
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _provideAuthHeaders.apply(this, arguments);
}

function requireAuthHeaders(_x, _x2) {
  return _requireAuthHeaders.apply(this, arguments);
}
function _requireAuthHeaders() {
  _requireAuthHeaders = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(authentication, handler) {
    var headerResult, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (authentication) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", failure(new NotAuthenticatedError()));
        case 2:
          _context.next = 4;
          return authentication.getRequestHeader();
        case 4:
          headerResult = _context.sent;
          if (!headerResult.isFailure()) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", failure(headerResult.error));
        case 7:
          _context.next = 9;
          return handler(headerResult.value);
        case 9:
          result = _context.sent;
          return _context.abrupt("return", success(result));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _requireAuthHeaders.apply(this, arguments);
}

var POLL_INTERVAL = 1000;
var POLL_MAX_ATTEMPTS = 20; // try for 20 sec

function poll(_x) {
  return _poll.apply(this, arguments);
}
function _poll() {
  _poll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref) {
    var fn, validate, onMaxAttempts, _ref$interval, interval, _ref$maxAttempts, maxAttempts, attempts, executePoll;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          fn = _ref.fn, validate = _ref.validate, onMaxAttempts = _ref.onMaxAttempts, _ref$interval = _ref.interval, interval = _ref$interval === void 0 ? POLL_INTERVAL : _ref$interval, _ref$maxAttempts = _ref.maxAttempts, maxAttempts = _ref$maxAttempts === void 0 ? POLL_MAX_ATTEMPTS : _ref$maxAttempts;
          attempts = 0;
          executePoll = /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
              var result;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return fn();
                  case 2:
                    result = _context.sent;
                    attempts++;
                    if (!validate(result)) {
                      _context.next = 8;
                      break;
                    }
                    return _context.abrupt("return", resolve(result));
                  case 8:
                    if (!(maxAttempts && attempts === maxAttempts)) {
                      _context.next = 12;
                      break;
                    }
                    return _context.abrupt("return", reject(onMaxAttempts()));
                  case 12:
                    setTimeout(executePoll, interval, resolve, reject);
                  case 13:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function executePoll(_x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }();
          return _context2.abrupt("return", new Promise(executePoll));
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _poll.apply(this, arguments);
}

var _templateObject$e, _templateObject2$e, _templateObject3$a, _templateObject4$a, _templateObject5$9, _templateObject6$6, _templateObject7$6, _templateObject8$4, _templateObject9$4, _templateObject10$3, _templateObject11$3, _templateObject12$2, _templateObject13$2, _templateObject14$2, _templateObject15$2, _templateObject16$2, _templateObject17$2, _templateObject18$2, _templateObject19$2, _templateObject20$2, _templateObject21$2, _templateObject22$2, _templateObject23$2, _templateObject24$2, _templateObject25$2, _templateObject26$2, _templateObject27$2, _templateObject28$2, _templateObject29$2, _templateObject30$2, _templateObject31$2, _templateObject32$1, _templateObject33$1, _templateObject34$1, _templateObject35$1, _templateObject36$1;
var Eip712TypedDataDomainFragmentDoc = gql(_templateObject$e || (_templateObject$e = _taggedTemplateLiteral(["\n    fragment EIP712TypedDataDomain on EIP712TypedDataDomain {\n  name\n  chainId\n  version\n  verifyingContract\n}\n    "])));
var Erc20FragmentDoc = gql(_templateObject2$e || (_templateObject2$e = _taggedTemplateLiteral(["\n    fragment Erc20 on Erc20 {\n  __typename\n  name\n  symbol\n  decimals\n  address\n}\n    "])));
var Erc20AmountFragmentDoc = gql(_templateObject3$a || (_templateObject3$a = _taggedTemplateLiteral(["\n    fragment Erc20Amount on Erc20Amount {\n  __typename\n  asset {\n    ...Erc20\n  }\n  value\n}\n    ", ""])), Erc20FragmentDoc);
var MediaFragmentDoc = gql(_templateObject4$a || (_templateObject4$a = _taggedTemplateLiteral(["\n    fragment Media on Media {\n  __typename\n  altTag\n  cover\n  mimeType\n  url\n}\n    "])));
var MediaSetFragmentDoc = gql(_templateObject5$9 || (_templateObject5$9 = _taggedTemplateLiteral(["\n    fragment MediaSet on MediaSet {\n  __typename\n  original {\n    ...Media\n  }\n}\n    ", ""])), MediaFragmentDoc);
var ModuleFeeAmountFragmentDoc = gql(_templateObject6$6 || (_templateObject6$6 = _taggedTemplateLiteral(["\n    fragment ModuleFeeAmount on ModuleFeeAmount {\n  __typename\n  asset {\n    ...Erc20\n  }\n  value\n}\n    ", ""])), Erc20FragmentDoc);
var FeeFollowModuleSettingsFragmentDoc = gql(_templateObject7$6 || (_templateObject7$6 = _taggedTemplateLiteral(["\n    fragment FeeFollowModuleSettings on FeeFollowModuleSettings {\n  __typename\n  amount {\n    ...ModuleFeeAmount\n  }\n  contractAddress\n  recipient\n}\n    ", ""])), ModuleFeeAmountFragmentDoc);
var ProfileFollowModuleSettingsFragmentDoc = gql(_templateObject8$4 || (_templateObject8$4 = _taggedTemplateLiteral(["\n    fragment ProfileFollowModuleSettings on ProfileFollowModuleSettings {\n  __typename\n  contractAddress\n}\n    "])));
var RevertFollowModuleSettingsFragmentDoc = gql(_templateObject9$4 || (_templateObject9$4 = _taggedTemplateLiteral(["\n    fragment RevertFollowModuleSettings on RevertFollowModuleSettings {\n  __typename\n  contractAddress\n}\n    "])));
var UnknownFollowModuleSettingsFragmentDoc = gql(_templateObject10$3 || (_templateObject10$3 = _taggedTemplateLiteral(["\n    fragment UnknownFollowModuleSettings on UnknownFollowModuleSettings {\n  __typename\n  contractAddress\n}\n    "])));
var AttributeFragmentDoc = gql(_templateObject11$3 || (_templateObject11$3 = _taggedTemplateLiteral(["\n    fragment Attribute on Attribute {\n  __typename\n  displayType\n  key\n  value\n}\n    "])));
var ProfileFragmentDoc = gql(_templateObject12$2 || (_templateObject12$2 = _taggedTemplateLiteral(["\n    fragment Profile on Profile {\n  __typename\n  id\n  name\n  bio\n  handle\n  ownedBy\n  interests\n  picture {\n    ... on NftImage {\n      __typename\n      contractAddress\n      tokenId\n      uri\n      verified\n    }\n    ... on MediaSet {\n      ...MediaSet\n    }\n  }\n  coverPicture {\n    ... on NftImage {\n      __typename\n      contractAddress\n      tokenId\n      uri\n      verified\n    }\n    ... on MediaSet {\n      ...MediaSet\n    }\n  }\n  stats {\n    __typename\n    totalFollowers\n    totalFollowing\n    totalPosts\n    totalComments\n    totalMirrors\n    totalPublications\n    totalCollects\n  }\n  followModule {\n    ... on FeeFollowModuleSettings {\n      ...FeeFollowModuleSettings\n    }\n    ... on ProfileFollowModuleSettings {\n      ...ProfileFollowModuleSettings\n    }\n    ... on RevertFollowModuleSettings {\n      ...RevertFollowModuleSettings\n    }\n    ... on UnknownFollowModuleSettings {\n      ...UnknownFollowModuleSettings\n    }\n  }\n  attributes {\n    ...Attribute\n  }\n  dispatcher {\n    address\n    canUseRelay\n  }\n  isDefault\n  isFollowedByMe(isFinalisedOnChain: true)\n  isFollowing(who: $observerId)\n}\n    ", "\n", "\n", "\n", "\n", "\n", ""])), MediaSetFragmentDoc, FeeFollowModuleSettingsFragmentDoc, ProfileFollowModuleSettingsFragmentDoc, RevertFollowModuleSettingsFragmentDoc, UnknownFollowModuleSettingsFragmentDoc, AttributeFragmentDoc);
var MirrorBaseFragmentDoc = gql(_templateObject13$2 || (_templateObject13$2 = _taggedTemplateLiteral(["\n    fragment MirrorBase on Mirror {\n  __typename\n  id\n  createdAt\n  isDataAvailability\n  dataAvailabilityProofs\n  profile {\n    ...Profile\n  }\n  hidden\n}\n    ", ""])), ProfileFragmentDoc);
var SimplePublicationStatsFragmentDoc = gql(_templateObject14$2 || (_templateObject14$2 = _taggedTemplateLiteral(["\n    fragment SimplePublicationStats on PublicationStats {\n  __typename\n  totalAmountOfMirrors\n  totalAmountOfCollects\n  totalAmountOfComments\n  totalUpvotes\n  totalDownvotes\n}\n    "])));
var MetadataAttributeOutputFragmentDoc = gql(_templateObject15$2 || (_templateObject15$2 = _taggedTemplateLiteral(["\n    fragment MetadataAttributeOutput on MetadataAttributeOutput {\n  __typename\n  traitType\n  value\n}\n    "])));
var MetadataFragmentDoc = gql(_templateObject16$2 || (_templateObject16$2 = _taggedTemplateLiteral(["\n    fragment Metadata on MetadataOutput {\n  __typename\n  animatedUrl\n  content\n  contentWarning\n  description\n  image\n  locale\n  mainContentFocus\n  name\n  cover {\n    ...MediaSet\n  }\n  media {\n    ...MediaSet\n  }\n  attributes {\n    ...MetadataAttributeOutput\n  }\n  tags\n}\n    ", "\n", ""])), MediaSetFragmentDoc, MetadataAttributeOutputFragmentDoc);
var WalletFragmentDoc = gql(_templateObject17$2 || (_templateObject17$2 = _taggedTemplateLiteral(["\n    fragment Wallet on Wallet {\n  __typename\n  address\n  defaultProfile {\n    ...Profile\n  }\n}\n    ", ""])), ProfileFragmentDoc);
var FreeCollectModuleSettingsFragmentDoc = gql(_templateObject18$2 || (_templateObject18$2 = _taggedTemplateLiteral(["\n    fragment FreeCollectModuleSettings on FreeCollectModuleSettings {\n  __typename\n  contractAddress\n  followerOnly\n}\n    "])));
var FeeCollectModuleSettingsFragmentDoc = gql(_templateObject19$2 || (_templateObject19$2 = _taggedTemplateLiteral(["\n    fragment FeeCollectModuleSettings on FeeCollectModuleSettings {\n  __typename\n  amount {\n    ...ModuleFeeAmount\n  }\n  contractAddress\n  followerOnly\n  recipient\n  referralFee\n}\n    ", ""])), ModuleFeeAmountFragmentDoc);
var LimitedFeeCollectModuleSettingsFragmentDoc = gql(_templateObject20$2 || (_templateObject20$2 = _taggedTemplateLiteral(["\n    fragment LimitedFeeCollectModuleSettings on LimitedFeeCollectModuleSettings {\n  __typename\n  amount {\n    ...ModuleFeeAmount\n  }\n  collectLimit\n  contractAddress\n  followerOnly\n  recipient\n  referralFee\n}\n    ", ""])), ModuleFeeAmountFragmentDoc);
var LimitedTimedFeeCollectModuleSettingsFragmentDoc = gql(_templateObject21$2 || (_templateObject21$2 = _taggedTemplateLiteral(["\n    fragment LimitedTimedFeeCollectModuleSettings on LimitedTimedFeeCollectModuleSettings {\n  __typename\n  amount {\n    ...ModuleFeeAmount\n  }\n  collectLimit\n  contractAddress\n  followerOnly\n  endTimestamp\n  recipient\n  referralFee\n}\n    ", ""])), ModuleFeeAmountFragmentDoc);
var RevertCollectModuleSettingsFragmentDoc = gql(_templateObject22$2 || (_templateObject22$2 = _taggedTemplateLiteral(["\n    fragment RevertCollectModuleSettings on RevertCollectModuleSettings {\n  __typename\n  contractAddress\n}\n    "])));
var TimedFeeCollectModuleSettingsFragmentDoc = gql(_templateObject23$2 || (_templateObject23$2 = _taggedTemplateLiteral(["\n    fragment TimedFeeCollectModuleSettings on TimedFeeCollectModuleSettings {\n  __typename\n  amount {\n    ...ModuleFeeAmount\n  }\n  contractAddress\n  followerOnly\n  endTimestamp\n  recipient\n  referralFee\n}\n    ", ""])), ModuleFeeAmountFragmentDoc);
var MultirecipientFeeCollectModuleSettingsFragmentDoc = gql(_templateObject24$2 || (_templateObject24$2 = _taggedTemplateLiteral(["\n    fragment MultirecipientFeeCollectModuleSettings on MultirecipientFeeCollectModuleSettings {\n  __typename\n  amount {\n    ...ModuleFeeAmount\n  }\n  collectLimitOptional: collectLimit\n  contractAddress\n  followerOnly\n  endTimestampOptional: endTimestamp\n  recipients {\n    recipient\n    split\n  }\n  referralFee\n}\n    ", ""])), ModuleFeeAmountFragmentDoc);
var Erc4626FeeCollectModuleSettingsFragmentDoc = gql(_templateObject25$2 || (_templateObject25$2 = _taggedTemplateLiteral(["\n    fragment ERC4626FeeCollectModuleSettings on ERC4626FeeCollectModuleSettings {\n  __typename\n  amount {\n    ...ModuleFeeAmount\n  }\n  collectLimitOptional: collectLimit\n  contractAddress\n  followerOnly\n  endTimestampOptional: endTimestamp\n  recipient\n  referralFee\n  vault\n}\n    ", ""])), ModuleFeeAmountFragmentDoc);
var AaveFeeCollectModuleSettingsFragmentDoc = gql(_templateObject26$2 || (_templateObject26$2 = _taggedTemplateLiteral(["\n    fragment AaveFeeCollectModuleSettings on AaveFeeCollectModuleSettings {\n  __typename\n  amount {\n    ...ModuleFeeAmount\n  }\n  collectLimitOptional: collectLimit\n  contractAddress\n  followerOnly\n  endTimestampOptional: endTimestamp\n  recipient\n  referralFee\n}\n    ", ""])), ModuleFeeAmountFragmentDoc);
var PostFragmentDoc = gql(_templateObject27$2 || (_templateObject27$2 = _taggedTemplateLiteral(["\n    fragment Post on Post {\n  __typename\n  id\n  stats {\n    ...SimplePublicationStats\n  }\n  metadata {\n    ...Metadata\n  }\n  profile {\n    ...Profile\n  }\n  collectedBy {\n    ...Wallet\n  }\n  collectModule {\n    __typename\n    ... on FreeCollectModuleSettings {\n      ...FreeCollectModuleSettings\n    }\n    ... on FeeCollectModuleSettings {\n      ...FeeCollectModuleSettings\n    }\n    ... on LimitedFeeCollectModuleSettings {\n      ...LimitedFeeCollectModuleSettings\n    }\n    ... on LimitedTimedFeeCollectModuleSettings {\n      ...LimitedTimedFeeCollectModuleSettings\n    }\n    ... on RevertCollectModuleSettings {\n      ...RevertCollectModuleSettings\n    }\n    ... on TimedFeeCollectModuleSettings {\n      ...TimedFeeCollectModuleSettings\n    }\n    ... on MultirecipientFeeCollectModuleSettings {\n      ...MultirecipientFeeCollectModuleSettings\n    }\n    ... on ERC4626FeeCollectModuleSettings {\n      ...ERC4626FeeCollectModuleSettings\n    }\n    ... on AaveFeeCollectModuleSettings {\n      ...AaveFeeCollectModuleSettings\n    }\n  }\n  referenceModule {\n    __typename\n    ... on FollowOnlyReferenceModuleSettings {\n      contractAddress\n    }\n  }\n  collectNftAddress\n  createdAt\n  hidden\n  isGated\n  isDataAvailability\n  dataAvailabilityProofs\n  reaction(request: {profileId: $observerId})\n  hasCollectedByMe(isFinalisedOnChain: true)\n  canComment(profileId: $observerId) {\n    result\n  }\n  canMirror(profileId: $observerId) {\n    result\n  }\n  mirrors(by: $observerId)\n}\n    ", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", ""])), SimplePublicationStatsFragmentDoc, MetadataFragmentDoc, ProfileFragmentDoc, WalletFragmentDoc, FreeCollectModuleSettingsFragmentDoc, FeeCollectModuleSettingsFragmentDoc, LimitedFeeCollectModuleSettingsFragmentDoc, LimitedTimedFeeCollectModuleSettingsFragmentDoc, RevertCollectModuleSettingsFragmentDoc, TimedFeeCollectModuleSettingsFragmentDoc, MultirecipientFeeCollectModuleSettingsFragmentDoc, Erc4626FeeCollectModuleSettingsFragmentDoc, AaveFeeCollectModuleSettingsFragmentDoc);
var CommentBaseFragmentDoc = gql(_templateObject28$2 || (_templateObject28$2 = _taggedTemplateLiteral(["\n    fragment CommentBase on Comment {\n  __typename\n  id\n  stats {\n    ...SimplePublicationStats\n  }\n  metadata {\n    ...Metadata\n  }\n  profile {\n    ...Profile\n  }\n  collectedBy {\n    ...Wallet\n  }\n  collectModule {\n    __typename\n    ... on FreeCollectModuleSettings {\n      ...FreeCollectModuleSettings\n    }\n    ... on FeeCollectModuleSettings {\n      ...FeeCollectModuleSettings\n    }\n    ... on LimitedFeeCollectModuleSettings {\n      ...LimitedFeeCollectModuleSettings\n    }\n    ... on LimitedTimedFeeCollectModuleSettings {\n      ...LimitedTimedFeeCollectModuleSettings\n    }\n    ... on RevertCollectModuleSettings {\n      ...RevertCollectModuleSettings\n    }\n    ... on TimedFeeCollectModuleSettings {\n      ...TimedFeeCollectModuleSettings\n    }\n    ... on MultirecipientFeeCollectModuleSettings {\n      ...MultirecipientFeeCollectModuleSettings\n    }\n    ... on ERC4626FeeCollectModuleSettings {\n      ...ERC4626FeeCollectModuleSettings\n    }\n    ... on AaveFeeCollectModuleSettings {\n      ...AaveFeeCollectModuleSettings\n    }\n  }\n  referenceModule {\n    __typename\n    ... on FollowOnlyReferenceModuleSettings {\n      contractAddress\n    }\n  }\n  collectNftAddress\n  createdAt\n  hidden\n  isGated\n  isDataAvailability\n  dataAvailabilityProofs\n  reaction(request: {profileId: $observerId})\n  hasCollectedByMe(isFinalisedOnChain: true)\n  canComment(profileId: $observerId) {\n    result\n  }\n  canMirror(profileId: $observerId) {\n    result\n  }\n  mirrors(by: $observerId)\n}\n    ", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", "\n", ""])), SimplePublicationStatsFragmentDoc, MetadataFragmentDoc, ProfileFragmentDoc, WalletFragmentDoc, FreeCollectModuleSettingsFragmentDoc, FeeCollectModuleSettingsFragmentDoc, LimitedFeeCollectModuleSettingsFragmentDoc, LimitedTimedFeeCollectModuleSettingsFragmentDoc, RevertCollectModuleSettingsFragmentDoc, TimedFeeCollectModuleSettingsFragmentDoc, MultirecipientFeeCollectModuleSettingsFragmentDoc, Erc4626FeeCollectModuleSettingsFragmentDoc, AaveFeeCollectModuleSettingsFragmentDoc);
var CommentFragmentDoc = gql(_templateObject29$2 || (_templateObject29$2 = _taggedTemplateLiteral(["\n    fragment Comment on Comment {\n  __typename\n  ...CommentBase\n  commentOn {\n    ... on Post {\n      ...Post\n    }\n    ... on Mirror {\n      ...MirrorBase\n    }\n    ... on Comment {\n      ...CommentBase\n    }\n  }\n  mainPost {\n    ... on Post {\n      ...Post\n    }\n    ... on Mirror {\n      ...MirrorBase\n    }\n  }\n}\n    ", "\n", "\n", ""])), CommentBaseFragmentDoc, PostFragmentDoc, MirrorBaseFragmentDoc);
var MirrorFragmentDoc = gql(_templateObject30$2 || (_templateObject30$2 = _taggedTemplateLiteral(["\n    fragment Mirror on Mirror {\n  __typename\n  ...MirrorBase\n  mirrorOf {\n    ... on Post {\n      ...Post\n    }\n    ... on Comment {\n      ...Comment\n    }\n  }\n}\n    ", "\n", "\n", ""])), MirrorBaseFragmentDoc, PostFragmentDoc, CommentFragmentDoc);
var CommonPaginatedResultInfoFragmentDoc = gql(_templateObject31$2 || (_templateObject31$2 = _taggedTemplateLiteral(["\n    fragment CommonPaginatedResultInfo on PaginatedResultInfo {\n  __typename\n  prev\n  next\n  totalCount\n}\n    "])));
var FollowingFragmentDoc = gql(_templateObject32$1 || (_templateObject32$1 = _taggedTemplateLiteral(["\n    fragment Following on Following {\n  __typename\n  profile {\n    ...Profile\n  }\n}\n    ", ""])), ProfileFragmentDoc);
var FollowerFragmentDoc = gql(_templateObject33$1 || (_templateObject33$1 = _taggedTemplateLiteral(["\n    fragment Follower on Follower {\n  __typename\n  wallet {\n    ...Wallet\n  }\n}\n    ", ""])), WalletFragmentDoc);
var RelayerResultFragmentDoc = gql(_templateObject34$1 || (_templateObject34$1 = _taggedTemplateLiteral(["\n    fragment RelayerResult on RelayerResult {\n  __typename\n  txHash\n  txId\n}\n    "])));
var RelayErrorFragmentDoc = gql(_templateObject35$1 || (_templateObject35$1 = _taggedTemplateLiteral(["\n    fragment RelayError on RelayError {\n  __typename\n  reason\n}\n    "])));
var CreateDataAvailabilityPublicationResultFragmentDoc = gql(_templateObject36$1 || (_templateObject36$1 = _taggedTemplateLiteral(["\n    fragment CreateDataAvailabilityPublicationResult on CreateDataAvailabilityPublicationResult {\n  __typename\n  id\n  proofs\n  dataAvailabilityId\n}\n    "])));

var _templateObject$d, _templateObject2$d;
var ExplorePublicationsDocument = gql(_templateObject$d || (_templateObject$d = _taggedTemplateLiteral(["\n    query ExplorePublications($request: ExplorePublicationRequest!, $observerId: ProfileId) {\n  result: explorePublications(request: $request) {\n    items {\n      ... on Post {\n        ...Post\n      }\n      ... on Mirror {\n        ...Mirror\n      }\n      ... on Comment {\n        ...Comment\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), PostFragmentDoc, MirrorFragmentDoc, CommentFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var ExploreProfilesDocument = gql(_templateObject2$d || (_templateObject2$d = _taggedTemplateLiteral(["\n    query ExploreProfiles($request: ExploreProfilesRequest!, $observerId: ProfileId) {\n  result: exploreProfiles(request: $request) {\n    items {\n      ...Profile\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), ProfileFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var defaultWrapper$d = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var ExplorePublicationsDocumentString = print(ExplorePublicationsDocument);
var ExploreProfilesDocumentString = print(ExploreProfilesDocument);
function getSdk$d(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$d;
  return {
    ExplorePublications: function ExplorePublications(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ExplorePublicationsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ExplorePublications', 'query');
    },
    ExploreProfiles: function ExploreProfiles(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ExploreProfilesDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ExploreProfiles', 'query');
    }
  };
}

/**
 * Explore Lens Protocol.
 *
 * @group LensClient Modules
 */
var Explore = /*#__PURE__*/function () {
  function Explore(config, authentication) {
    _classCallCheck(this, Explore);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$d(client);
    this.authentication = authentication;
  }

  /**
   * Explore publications
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Array of {@link PublicationFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * import { PublicationSortCriteria } from '@lens-protocol/client';
   *
   * const result = await client.explore.publications({
   *   sortCriteria: PublicationSortCriteria.TopCommented
   * });
   * ```
   */
  _createClass(Explore, [{
    key: "publications",
    value: function () {
      var _publications = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(request, observerId) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(headers) {
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee$(_context) {
                              while (1) switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return _this.sdk.ExplorePublications({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context.sent;
                                  return _context.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context.stop();
                              }
                            }, _callee);
                          }));
                          return function (_x4) {
                            return _ref2.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function publications(_x, _x2) {
        return _publications.apply(this, arguments);
      }
      return publications;
    }()
    /**
     * Explore profiles
     *
     * @param request - Request object for the query
     * @param observerId - Optional id of a profile that is the observer for this request
     * @returns Array of {@link ProfileFragment} wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * import { ProfileSortCriteria } from '@lens-protocol/client';
     *
     * const result = await client.explore.profiles({
     *   sortCriteria: ProfileSortCriteria.MostFollowers
     * })
     * ```
     */
  }, {
    key: "profiles",
    value: function () {
      var _profiles = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(request, observerId) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(headers) {
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        return _context5.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                              while (1) switch (_context4.prev = _context4.next) {
                                case 0:
                                  _context4.next = 2;
                                  return _this2.sdk.ExploreProfiles({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context4.sent;
                                  return _context4.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context4.stop();
                              }
                            }, _callee4);
                          }));
                          return function (_x8) {
                            return _ref4.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x7) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function profiles(_x5, _x6) {
        return _profiles.apply(this, arguments);
      }
      return profiles;
    }()
  }]);
  return Explore;
}();

var _templateObject$c, _templateObject2$c, _templateObject3$9, _templateObject4$9, _templateObject5$8, _templateObject6$5, _templateObject7$5;
var ElectedMirrorFragmentDoc = gql(_templateObject$c || (_templateObject$c = _taggedTemplateLiteral(["\n    fragment ElectedMirror on ElectedMirror {\n  __typename\n  mirrorId\n  profile {\n    ...Profile\n  }\n  timestamp\n}\n    ", ""])), ProfileFragmentDoc);
var MirrorEventFragmentDoc = gql(_templateObject2$c || (_templateObject2$c = _taggedTemplateLiteral(["\n    fragment MirrorEvent on MirrorEvent {\n  __typename\n  profile {\n    ...Profile\n  }\n  timestamp\n}\n    ", ""])), ProfileFragmentDoc);
var CollectedEventFragmentDoc = gql(_templateObject3$9 || (_templateObject3$9 = _taggedTemplateLiteral(["\n    fragment CollectedEvent on CollectedEvent {\n  __typename\n  profile {\n    ...Profile\n  }\n  timestamp\n}\n    ", ""])), ProfileFragmentDoc);
var ReactionEventFragmentDoc = gql(_templateObject4$9 || (_templateObject4$9 = _taggedTemplateLiteral(["\n    fragment ReactionEvent on ReactionEvent {\n  __typename\n  profile {\n    ...Profile\n  }\n  reaction\n  timestamp\n}\n    ", ""])), ProfileFragmentDoc);
var FeedItemFragmentDoc = gql(_templateObject5$8 || (_templateObject5$8 = _taggedTemplateLiteral(["\n    fragment FeedItem on FeedItem {\n  __typename\n  root {\n    ... on Post {\n      ...Post\n    }\n    ... on Comment {\n      ...Comment\n    }\n  }\n  comments {\n    ...Comment\n  }\n  electedMirror {\n    ...ElectedMirror\n  }\n  mirrors {\n    ...MirrorEvent\n  }\n  collects {\n    ...CollectedEvent\n  }\n  reactions {\n    ...ReactionEvent\n  }\n}\n    ", "\n", "\n", "\n", "\n", "\n", ""])), PostFragmentDoc, CommentFragmentDoc, ElectedMirrorFragmentDoc, MirrorEventFragmentDoc, CollectedEventFragmentDoc, ReactionEventFragmentDoc);
var FeedDocument = gql(_templateObject6$5 || (_templateObject6$5 = _taggedTemplateLiteral(["\n    query Feed($request: FeedRequest!, $observerId: ProfileId) {\n  result: feed(request: $request) {\n    items {\n      ...FeedItem\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), FeedItemFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var FeedHighlightsDocument = gql(_templateObject7$5 || (_templateObject7$5 = _taggedTemplateLiteral(["\n    query FeedHighlights($request: FeedHighlightsRequest!, $observerId: ProfileId) {\n  result: feedHighlights(request: $request) {\n    items {\n      ... on Post {\n        ...Post\n      }\n      ... on Mirror {\n        ...Mirror\n      }\n      ... on Comment {\n        ...Comment\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), PostFragmentDoc, MirrorFragmentDoc, CommentFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var defaultWrapper$c = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var FeedDocumentString = print(FeedDocument);
var FeedHighlightsDocumentString = print(FeedHighlightsDocument);
function getSdk$c(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$c;
  return {
    Feed: function Feed(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(FeedDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'Feed', 'query');
    },
    FeedHighlights: function FeedHighlights(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(FeedHighlightsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'FeedHighlights', 'query');
    }
  };
}

/**
 * Feed is one of the most fundamental element to create a successful social media site.
 *
 * @group LensClient Modules
 */
var Feed = /*#__PURE__*/function () {
  function Feed(config, authentication) {
    _classCallCheck(this, Feed);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$c(client);
    this.authentication = authentication;
  }

  /**
   * Fetch feed items.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns {@link PromiseResult} with array of {@link FeedItemFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.feed.fetch({
   *   profileId: '0x123',
   * });
   * ```
   */
  _createClass(Feed, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(request, observerId) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(headers) {
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee$(_context) {
                              while (1) switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return _this.sdk.Feed({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context.sent;
                                  return _context.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context.stop();
                              }
                            }, _callee);
                          }));
                          return function (_x4) {
                            return _ref2.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      return fetch;
    }()
    /**
     * Fetch feed highlights.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the query
     * @param observerId - Optional id of a profile that is the observer for this request
     * @returns {@link PromiseResult} with array of {@link PublicationFragment} wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.feed.fetchHighlights({
     *   profileId: '0x123',
     * });
     * ```
     */
  }, {
    key: "fetchHighlights",
    value: function () {
      var _fetchHighlights = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(request, observerId) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(headers) {
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        return _context5.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                              while (1) switch (_context4.prev = _context4.next) {
                                case 0:
                                  _context4.next = 2;
                                  return _this2.sdk.FeedHighlights({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context4.sent;
                                  return _context4.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context4.stop();
                              }
                            }, _callee4);
                          }));
                          return function (_x8) {
                            return _ref4.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x7) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function fetchHighlights(_x5, _x6) {
        return _fetchHighlights.apply(this, arguments);
      }
      return fetchHighlights;
    }()
  }]);
  return Feed;
}();

var _templateObject$b, _templateObject2$b, _templateObject3$8, _templateObject4$8, _templateObject5$7, _templateObject6$4, _templateObject7$4, _templateObject8$3, _templateObject9$3;
var ModuleInfoFragmentDoc = gql(_templateObject$b || (_templateObject$b = _taggedTemplateLiteral(["\n    fragment ModuleInfo on ModuleInfo {\n  __typename\n  name\n  type\n}\n    "])));
var EnabledModuleFragmentDoc = gql(_templateObject2$b || (_templateObject2$b = _taggedTemplateLiteral(["\n    fragment EnabledModule on EnabledModule {\n  __typename\n  moduleName\n  contractAddress\n  inputParams {\n    ...ModuleInfo\n  }\n  redeemParams {\n    ...ModuleInfo\n  }\n  returnDataParams: returnDataParms {\n    ...ModuleInfo\n  }\n}\n    ", ""])), ModuleInfoFragmentDoc);
var EnabledModulesFragmentDoc = gql(_templateObject3$8 || (_templateObject3$8 = _taggedTemplateLiteral(["\n    fragment EnabledModules on EnabledModules {\n  __typename\n  collectModules {\n    ...EnabledModule\n  }\n  followModules {\n    ...EnabledModule\n  }\n  referenceModules {\n    ...EnabledModule\n  }\n}\n    ", ""])), EnabledModuleFragmentDoc);
var ApprovedAllowanceAmountFragmentDoc = gql(_templateObject4$8 || (_templateObject4$8 = _taggedTemplateLiteral(["\n    fragment ApprovedAllowanceAmount on ApprovedAllowanceAmount {\n  currency\n  module\n  contractAddress\n  allowance\n}\n    "])));
var GenerateModuleCurrencyApprovalFragmentDoc = gql(_templateObject5$7 || (_templateObject5$7 = _taggedTemplateLiteral(["\n    fragment GenerateModuleCurrencyApproval on GenerateModuleCurrencyApproval {\n  to\n  from\n  data\n}\n    "])));
var EnabledModulesDocument = gql(_templateObject6$4 || (_templateObject6$4 = _taggedTemplateLiteral(["\n    query EnabledModules {\n  result: enabledModules {\n    ...EnabledModules\n  }\n}\n    ", ""])), EnabledModulesFragmentDoc);
var EnabledModuleCurrenciesDocument = gql(_templateObject7$4 || (_templateObject7$4 = _taggedTemplateLiteral(["\n    query EnabledModuleCurrencies {\n  result: enabledModuleCurrencies {\n    ...Erc20\n  }\n}\n    ", ""])), Erc20FragmentDoc);
var ApprovedModuleAllowanceAmountDocument = gql(_templateObject8$3 || (_templateObject8$3 = _taggedTemplateLiteral(["\n    query ApprovedModuleAllowanceAmount($request: ApprovedModuleAllowanceAmountRequest!) {\n  result: approvedModuleAllowanceAmount(request: $request) {\n    ... on ApprovedAllowanceAmount {\n      ...ApprovedAllowanceAmount\n    }\n  }\n}\n    ", ""])), ApprovedAllowanceAmountFragmentDoc);
var GenerateModuleCurrencyApprovalDataDocument = gql(_templateObject9$3 || (_templateObject9$3 = _taggedTemplateLiteral(["\n    query GenerateModuleCurrencyApprovalData($request: GenerateModuleCurrencyApprovalDataRequest!) {\n  result: generateModuleCurrencyApprovalData(request: $request) {\n    ... on GenerateModuleCurrencyApproval {\n      ...GenerateModuleCurrencyApproval\n    }\n  }\n}\n    ", ""])), GenerateModuleCurrencyApprovalFragmentDoc);
var defaultWrapper$b = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var EnabledModulesDocumentString = print(EnabledModulesDocument);
var EnabledModuleCurrenciesDocumentString = print(EnabledModuleCurrenciesDocument);
var ApprovedModuleAllowanceAmountDocumentString = print(ApprovedModuleAllowanceAmountDocument);
var GenerateModuleCurrencyApprovalDataDocumentString = print(GenerateModuleCurrencyApprovalDataDocument);
function getSdk$b(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$b;
  return {
    EnabledModules: function EnabledModules(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(EnabledModulesDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'EnabledModules', 'query');
    },
    EnabledModuleCurrencies: function EnabledModuleCurrencies(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(EnabledModuleCurrenciesDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'EnabledModuleCurrencies', 'query');
    },
    ApprovedModuleAllowanceAmount: function ApprovedModuleAllowanceAmount(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ApprovedModuleAllowanceAmountDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ApprovedModuleAllowanceAmount', 'query');
    },
    GenerateModuleCurrencyApprovalData: function GenerateModuleCurrencyApprovalData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(GenerateModuleCurrencyApprovalDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'GenerateModuleCurrencyApprovalData', 'query');
    }
  };
}

/**
 * Modules allow to include unique, custom functionality on follow, collect and reference.
 *
 * @group LensClient Modules
 */
var Modules = /*#__PURE__*/function () {
  function Modules(config, authentication) {
    _classCallCheck(this, Modules);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$b(client);
    this.authentication = authentication;
  }

  /**
   * Fetch enabled currencies.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @returns {@link PromiseResult} with array of {@link Erc20Fragment}
   *
   * @example
   * ```ts
   * const result = await client.modules.fetchEnabledCurrencies();
   * ```
   */
  _createClass(Modules, [{
    key: "fetchEnabledCurrencies",
    value: function () {
      var _fetchEnabledCurrencies = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _this.sdk.EnabledModuleCurrencies({}, headers);
                      case 2:
                        result = _context.sent;
                        return _context.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function fetchEnabledCurrencies() {
        return _fetchEnabledCurrencies.apply(this, arguments);
      }
      return fetchEnabledCurrencies;
    }()
    /**
     * Fetch enabled modules.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @returns {@link PromiseResult} with {@link EnabledModulesFragment}
     *
     * @example
     * ```ts
     * const result = await client.modules.fetchEnabled();
     * ```
     */
  }, {
    key: "fetchEnabled",
    value: function () {
      var _fetchEnabled = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _this2.sdk.EnabledModules({}, headers);
                      case 2:
                        result = _context3.sent;
                        return _context3.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function fetchEnabled() {
        return _fetchEnabled.apply(this, arguments);
      }
      return fetchEnabled;
    }()
    /**
     * Fetch the approved amount of requested currencies that each requested module can move
     * on behalf of the authenticated user.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the query
     * @returns {@link PromiseResult} with array of {@link ApprovedAllowanceAmountFragment}
     *
     * @example
     * ```ts
     * import { CollectModules, FollowModules, ReferenceModules } from '@lens-protocol/client';
     *
     * const result = await client.modules.approvedAllowanceAmount({
     *   currencies: ['0x3C68CE8504087f89c640D02d133646d98e64ddd9'],
     *   collectModules: [CollectModules.LimitedFeeCollectModule],
     *   followModules: [FollowModules.FeeFollowModule],
     *   referenceModules: [ReferenceModules.FollowerOnlyReferenceModule],
     * });
     * ```
     */
  }, {
    key: "approvedAllowanceAmount",
    value: function () {
      var _approvedAllowanceAmount = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(request) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _this3.sdk.ApprovedModuleAllowanceAmount({
                          request: request
                        }, headers);
                      case 2:
                        result = _context5.sent;
                        return _context5.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x4) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function approvedAllowanceAmount(_x3) {
        return _approvedAllowanceAmount.apply(this, arguments);
      }
      return approvedAllowanceAmount;
    }()
    /**
     * Generate the data required to approve the amount of a currency to be moved by the module.
     *
     * This method encodes the allowance ERC-20 data for the module. It returns the partial transaction that still needs to be submitted.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the query
     * @returns {@link PromiseResult} with {@link GenerateModuleCurrencyApprovalFragment}
     *
     * @example
     * ```ts
     * import { CollectModules } from '@lens-protocol/client';
     *
     * const result = await client.modules.generateCurrencyApprovalData({
     *  currency: '0xD40282e050723Ae26Aeb0F77022dB14470f4e011',
     *  value: '10',
     *  collectModule: CollectModules.LimitedFeeCollectModule,
     * });
     * ```
     */
  }, {
    key: "generateCurrencyApprovalData",
    value: function () {
      var _generateCurrencyApprovalData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(request) {
        var _this4 = this;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return _this4.sdk.GenerateModuleCurrencyApprovalData({
                          request: request
                        }, headers);
                      case 2:
                        result = _context7.sent;
                        return _context7.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7);
                }));
                return function (_x6) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function generateCurrencyApprovalData(_x5) {
        return _generateCurrencyApprovalData.apply(this, arguments);
      }
      return generateCurrencyApprovalData;
    }()
  }]);
  return Modules;
}();

var _templateObject$a, _templateObject2$a, _templateObject3$7, _templateObject4$7, _templateObject5$6, _templateObject6$3, _templateObject7$3, _templateObject8$2, _templateObject9$2, _templateObject10$2, _templateObject11$2;
var NftFragmentDoc = gql(_templateObject$a || (_templateObject$a = _taggedTemplateLiteral(["\n    fragment Nft on NFT {\n  __typename\n  contractName\n  contractAddress\n  symbol\n  tokenId\n  owners {\n    amount\n    address\n  }\n  name\n  description\n  contentURI\n  originalContent {\n    uri\n    animatedUrl\n    metaType\n  }\n  chainId\n  collectionName\n  ercType\n}\n    "])));
var NftGalleryFragmentDoc = gql(_templateObject2$a || (_templateObject2$a = _taggedTemplateLiteral(["\n    fragment NftGallery on NftGallery {\n  id\n  name\n  profileId\n  createdAt\n  updatedAt\n  items {\n    ...Nft\n  }\n}\n    ", ""])), NftFragmentDoc);
var NftOwnershipChallengeResultFragmentDoc = gql(_templateObject3$7 || (_templateObject3$7 = _taggedTemplateLiteral(["\n    fragment NftOwnershipChallengeResult on NftOwnershipChallengeResult {\n  id\n  text\n  timeout\n}\n    "])));
var NftsDocument = gql(_templateObject4$7 || (_templateObject4$7 = _taggedTemplateLiteral(["\n    query Nfts($request: NFTsRequest!) {\n  result: nfts(request: $request) {\n    items {\n      ...Nft\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), NftFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var NftOwnershipChallengeDocument = gql(_templateObject5$6 || (_templateObject5$6 = _taggedTemplateLiteral(["\n    query NftOwnershipChallenge($request: NftOwnershipChallengeRequest!) {\n  result: nftOwnershipChallenge(request: $request) {\n    ...NftOwnershipChallengeResult\n  }\n}\n    ", ""])), NftOwnershipChallengeResultFragmentDoc);
var ProfileGalleriesDocument = gql(_templateObject6$3 || (_templateObject6$3 = _taggedTemplateLiteral(["\n    query ProfileGalleries($request: NftGalleriesRequest!) {\n  result: nftGalleries(request: $request) {\n    ...NftGallery\n  }\n}\n    ", ""])), NftGalleryFragmentDoc);
var CreateNftGalleryDocument = gql(_templateObject7$3 || (_templateObject7$3 = _taggedTemplateLiteral(["\n    mutation CreateNFTGallery($request: NftGalleryCreateRequest!) {\n  result: createNftGallery(request: $request)\n}\n    "])));
var UpdateNftGalleryInfoDocument = gql(_templateObject8$2 || (_templateObject8$2 = _taggedTemplateLiteral(["\n    mutation UpdateNFTGalleryInfo($request: NftGalleryUpdateInfoRequest!) {\n  updateNftGalleryInfo(request: $request)\n}\n    "])));
var UpdateNftGalleryOrderDocument = gql(_templateObject9$2 || (_templateObject9$2 = _taggedTemplateLiteral(["\n    mutation UpdateNFTGalleryOrder($request: NftGalleryUpdateItemOrderRequest!) {\n  updateNftGalleryOrder(request: $request)\n}\n    "])));
var UpdateNftGalleryItemsDocument = gql(_templateObject10$2 || (_templateObject10$2 = _taggedTemplateLiteral(["\n    mutation UpdateNFTGalleryItems($request: NftGalleryUpdateItemsRequest!) {\n  updateNftGalleryItems(request: $request)\n}\n    "])));
var DeleteNftGalleryDocument = gql(_templateObject11$2 || (_templateObject11$2 = _taggedTemplateLiteral(["\n    mutation DeleteNFTGallery($request: NftGalleryDeleteRequest!) {\n  deleteNftGallery(request: $request)\n}\n    "])));
var defaultWrapper$a = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var NftsDocumentString = print(NftsDocument);
var NftOwnershipChallengeDocumentString = print(NftOwnershipChallengeDocument);
var ProfileGalleriesDocumentString = print(ProfileGalleriesDocument);
var CreateNftGalleryDocumentString = print(CreateNftGalleryDocument);
var UpdateNftGalleryInfoDocumentString = print(UpdateNftGalleryInfoDocument);
var UpdateNftGalleryOrderDocumentString = print(UpdateNftGalleryOrderDocument);
var UpdateNftGalleryItemsDocumentString = print(UpdateNftGalleryItemsDocument);
var DeleteNftGalleryDocumentString = print(DeleteNftGalleryDocument);
function getSdk$a(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$a;
  return {
    Nfts: function Nfts(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(NftsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'Nfts', 'query');
    },
    NftOwnershipChallenge: function NftOwnershipChallenge(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(NftOwnershipChallengeDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'NftOwnershipChallenge', 'query');
    },
    ProfileGalleries: function ProfileGalleries(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ProfileGalleriesDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ProfileGalleries', 'query');
    },
    CreateNFTGallery: function CreateNFTGallery(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateNftGalleryDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateNFTGallery', 'mutation');
    },
    UpdateNFTGalleryInfo: function UpdateNFTGalleryInfo(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(UpdateNftGalleryInfoDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'UpdateNFTGalleryInfo', 'mutation');
    },
    UpdateNFTGalleryOrder: function UpdateNFTGalleryOrder(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(UpdateNftGalleryOrderDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'UpdateNFTGalleryOrder', 'mutation');
    },
    UpdateNFTGalleryItems: function UpdateNFTGalleryItems(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(UpdateNftGalleryItemsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'UpdateNFTGalleryItems', 'mutation');
    },
    DeleteNFTGallery: function DeleteNFTGallery(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(DeleteNftGalleryDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'DeleteNFTGallery', 'mutation');
    }
  };
}

/**
 * Query owned NFTs. Challenge ownership. Create and manage NFT galleries.
 *
 * @remarks
 *
 * You can set NFT images as profile pictures and the server will track if they still
 * own it every few hours. If they do not it will be removed from their profile picture.
 *
 * @group LensClient Modules
 */
var Nfts = /*#__PURE__*/function () {
  function Nfts(config, authentication) {
    _classCallCheck(this, Nfts);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$a(client);
    this.authentication = authentication;
  }

  /**
   * Fetch NFTs.
   *
   * If you are using `development` enviroment you can only query Polygon Mumbai (chainId: 80001).
   * If you are using `production` enviroment you can only query Ethereum Mainnet (chainId: 1) and Polygon Mainnet (chainId: 137).
   *
   * @param request - Request object for the query
   * @returns Array of {@link NftFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.nfts.fetch({
   *   chainIds: [1],
   *   ownerAddress: '0xA6D3a33a1C66083859765b9D6E407D095a908193',
   * });
   * ```
   */
  _createClass(Nfts, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(request) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(headers) {
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee$(_context) {
                              while (1) switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return _this.sdk.Nfts({
                                    request: currRequest
                                  }, headers);
                                case 2:
                                  result = _context.sent;
                                  return _context.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context.stop();
                              }
                            }, _callee);
                          }));
                          return function (_x3) {
                            return _ref2.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }
      return fetch;
    }()
    /**
     * Fetch NFT ownership challenge.
     *
     * If you are using `development` enviroment you can only query Polygon Mumbai (chainId: 80001).
     * If you are using `production` enviroment you can only query Ethereum Mainnet (chainId: 1) or Polygon Mainnet (chainId: 137).
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the query
     * @returns {@link PromiseResult} with {@link NftOwnershipChallengeResultFragment}
     *
     * @example
     * ```ts
     * const result = await client.nfts.ownershipChallenge({
     *   ethereumAddress: '0xdfd7D26fd33473F475b57556118F8251464a24eb',
     *   nfts: [
     *     {
     *        contractAddress: '0x54439D4908A3E19356F876aa6022D67d0b3B12d6',
     *        tokenId: '5742',
     *        chainId: 1
     *     }
     *   ]
     * });
     * ```
     */
  }, {
    key: "ownershipChallenge",
    value: function () {
      var _ownershipChallenge = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(request) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _this2.sdk.NftOwnershipChallenge({
                          request: request
                        }, headers);
                      case 2:
                        result = _context4.sent;
                        return _context4.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }, _callee4);
                }));
                return function (_x5) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function ownershipChallenge(_x4) {
        return _ownershipChallenge.apply(this, arguments);
      }
      return ownershipChallenge;
    }()
    /**
     * Fetch NFT galleries of a profile.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the query
     * @returns Array of {@link NftGalleryFragment}
     *
     * @example
     * ```ts
     * const result = await client.nfts.fetchGalleries({
     *   profileId: '0x0185',
     * });
     * ```
     */
  }, {
    key: "fetchGalleries",
    value: function () {
      var _fetchGalleries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(request) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return _this3.sdk.ProfileGalleries({
                          request: request
                        }, headers);
                      case 2:
                        result = _context6.sent;
                        return _context6.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function (_x7) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function fetchGalleries(_x6) {
        return _fetchGalleries.apply(this, arguments);
      }
      return fetchGalleries;
    }()
    /**
     * Create a new NFT gallery.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with the id of the new gallery
     *
     * @example
     * ```ts
     * const result = await client.nfts.createGallery({
     *   profileId: '0x0185',
     *   name: 'My favorite NFTs',
     *   items: [
     *     {
     *       contractAddress: '0x1234123412341234123412341234123412341234'
     *       tokenId: '1',
     *       chainId: 137
     *     }
     *   ]
     * });
     * ```
     */
  }, {
    key: "createGallery",
    value: function () {
      var _createGallery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(request) {
        var _this4 = this;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return _this4.sdk.CreateNFTGallery({
                          request: request
                        }, headers);
                      case 2:
                        result = _context8.sent;
                        return _context8.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee8);
                }));
                return function (_x9) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function createGallery(_x8) {
        return _createGallery.apply(this, arguments);
      }
      return createGallery;
    }()
    /**
     * Update a NFT gallery.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with void
     *
     * @example
     * ```ts
     * const result = await client.nfts.updateGalleryInfo({
     *  profileId: '0x01',
     *  galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
     *  name: 'New name',
     * });
     * ```
     */
  }, {
    key: "updateGalleryInfo",
    value: function () {
      var _updateGalleryInfo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(request) {
        var _this5 = this;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(headers) {
                  return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return _this5.sdk.UpdateNFTGalleryInfo({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10);
                }));
                return function (_x11) {
                  return _ref6.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function updateGalleryInfo(_x10) {
        return _updateGalleryInfo.apply(this, arguments);
      }
      return updateGalleryInfo;
    }()
    /**
     * Update a NFT gallery items.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with void
     *
     * @example
     * ```ts
     * const result = await client.nfts.updateGalleryItems({
     *   profileId: '0x01',
     *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
     *   toAdd: [{
     *     contractAddress: '0x1234123412341234123412341234123412341234',
     *     tokenId: '1',
     *     chainId: 137
     *   }],
     *   toRemove: [{
     *     contractAddress: '0x0001000100010001000100010001000100010001',
     *     tokenId: '2',
     *     chainId: 137
     *   }]
     * });
     * ```
     */
  }, {
    key: "updateGalleryItems",
    value: function () {
      var _updateGalleryItems = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(request) {
        var _this6 = this;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(headers) {
                  return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                    while (1) switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return _this6.sdk.UpdateNFTGalleryItems({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context12.stop();
                    }
                  }, _callee12);
                }));
                return function (_x13) {
                  return _ref7.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function updateGalleryItems(_x12) {
        return _updateGalleryItems.apply(this, arguments);
      }
      return updateGalleryItems;
    }()
    /**
     * Update a NFT gallery items order.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with void
     *
     * @example
     * ```ts
     * const result = await client.nfts.updateGalleryOrder({
     *   profileId: '0x01',
     *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148',
     *   updates: [{
     *     contractAddress: '0x1234123412341234123412341234123412341234',
     *     tokenId: '1',
     *     chainId: 137,
     *     newOrder: 1,
     *   }]
     *  });
     * ```
     */
  }, {
    key: "updateGalleryOrder",
    value: function () {
      var _updateGalleryOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(request) {
        var _this7 = this;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              return _context15.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(headers) {
                  return _regeneratorRuntime().wrap(function _callee14$(_context14) {
                    while (1) switch (_context14.prev = _context14.next) {
                      case 0:
                        _context14.next = 2;
                        return _this7.sdk.UpdateNFTGalleryOrder({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context14.stop();
                    }
                  }, _callee14);
                }));
                return function (_x15) {
                  return _ref8.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function updateGalleryOrder(_x14) {
        return _updateGalleryOrder.apply(this, arguments);
      }
      return updateGalleryOrder;
    }()
    /**
     * Delete a NFT gallery.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with void
     *
     * @example
     * ```ts
     * const result = await client.nfts.deleteGallery({
     *   profileId: '0x01',
     *   galleryId: '9aeb66b2-0d8f-4c33-951c-feedbb171148'
     * });
     * ```
     */
  }, {
    key: "deleteGallery",
    value: function () {
      var _deleteGallery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(request) {
        var _this8 = this;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              return _context17.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(headers) {
                  return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                    while (1) switch (_context16.prev = _context16.next) {
                      case 0:
                        _context16.next = 2;
                        return _this8.sdk.DeleteNFTGallery({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context16.stop();
                    }
                  }, _callee16);
                }));
                return function (_x17) {
                  return _ref9.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function deleteGallery(_x16) {
        return _deleteGallery.apply(this, arguments);
      }
      return deleteGallery;
    }()
  }]);
  return Nfts;
}();

var _templateObject$9, _templateObject2$9;
var UserSigNoncesFragmentDoc = gql(_templateObject$9 || (_templateObject$9 = _taggedTemplateLiteral(["\n    fragment UserSigNonces on UserSigNonces {\n  lensHubOnChainSigNonce\n  peripheryOnChainSigNonce\n}\n    "])));
var UserSigNoncesDocument = gql(_templateObject2$9 || (_templateObject2$9 = _taggedTemplateLiteral(["\n    query UserSigNonces {\n  result: userSigNonces {\n    ...UserSigNonces\n  }\n}\n    ", ""])), UserSigNoncesFragmentDoc);
var defaultWrapper$9 = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var UserSigNoncesDocumentString = print(UserSigNoncesDocument);
function getSdk$9(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$9;
  return {
    UserSigNonces: function UserSigNonces(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(UserSigNoncesDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'UserSigNonces', 'query');
    }
  };
}

/**
 * Query the current nonces of the `lensHub` and the `periphery` of the authenticated user.
 *
 * - `periphery` includes profile metadata and approval follow.
 * - `lensHub` includes everything else minus unfollow which is a nonce on the `followNftAddress` contract.
 *
 * @group LensClient Modules
 */
var Nonces = /*#__PURE__*/function () {
  function Nonces(config, authentication) {
    _classCallCheck(this, Nonces);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$9(client);
    this.authentication = authentication;
  }

  /**
   * Fetch user nonces.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @returns {@link PromiseResult} with {@link UserSigNoncesFragment}
   *
   * @example
   * ```ts
   * const result = await client.nonces.fetch();
   * ```
   */
  _createClass(Nonces, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _this.sdk.UserSigNonces({}, headers);
                      case 2:
                        result = _context.sent;
                        return _context.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function fetch() {
        return _fetch.apply(this, arguments);
      }
      return fetch;
    }()
  }]);
  return Nonces;
}();

var _templateObject$8, _templateObject2$8, _templateObject3$6, _templateObject4$6, _templateObject5$5, _templateObject6$2, _templateObject7$2;
var NewFollowerNotificationFragmentDoc = gql(_templateObject$8 || (_templateObject$8 = _taggedTemplateLiteral(["\n    fragment NewFollowerNotification on NewFollowerNotification {\n  __typename\n  notificationId\n  createdAt\n  isFollowedByMe\n  wallet {\n    ...Wallet\n  }\n}\n    ", ""])), WalletFragmentDoc);
var NewCollectNotificationFragmentDoc = gql(_templateObject2$8 || (_templateObject2$8 = _taggedTemplateLiteral(["\n    fragment NewCollectNotification on NewCollectNotification {\n  __typename\n  notificationId\n  createdAt\n  wallet {\n    ...Wallet\n  }\n  collectedPublication {\n    ... on Post {\n      ...Post\n    }\n    ... on Mirror {\n      ...Mirror\n    }\n    ... on Comment {\n      ...Comment\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), WalletFragmentDoc, PostFragmentDoc, MirrorFragmentDoc, CommentFragmentDoc);
var NewMirrorNotificationFragmentDoc = gql(_templateObject3$6 || (_templateObject3$6 = _taggedTemplateLiteral(["\n    fragment NewMirrorNotification on NewMirrorNotification {\n  __typename\n  notificationId\n  createdAt\n  profile {\n    ...Profile\n  }\n  publication {\n    ... on Post {\n      ...Post\n    }\n    ... on Comment {\n      ...Comment\n    }\n  }\n}\n    ", "\n", "\n", ""])), ProfileFragmentDoc, PostFragmentDoc, CommentFragmentDoc);
var NewCommentNotificationFragmentDoc = gql(_templateObject4$6 || (_templateObject4$6 = _taggedTemplateLiteral(["\n    fragment NewCommentNotification on NewCommentNotification {\n  __typename\n  notificationId\n  createdAt\n  profile {\n    ...Profile\n  }\n  comment {\n    ...Comment\n  }\n}\n    ", "\n", ""])), ProfileFragmentDoc, CommentFragmentDoc);
var NewMentionNotificationFragmentDoc = gql(_templateObject5$5 || (_templateObject5$5 = _taggedTemplateLiteral(["\n    fragment NewMentionNotification on NewMentionNotification {\n  __typename\n  notificationId\n  createdAt\n  mentionPublication {\n    ... on Post {\n      ...Post\n    }\n    ... on Comment {\n      ...Comment\n    }\n  }\n}\n    ", "\n", ""])), PostFragmentDoc, CommentFragmentDoc);
var NewReactionNotificationFragmentDoc = gql(_templateObject6$2 || (_templateObject6$2 = _taggedTemplateLiteral(["\n    fragment NewReactionNotification on NewReactionNotification {\n  __typename\n  notificationId\n  createdAt\n  profile {\n    ...Profile\n  }\n  reaction\n  publication {\n    ... on Post {\n      ...Post\n    }\n    ... on Comment {\n      ...Comment\n    }\n    ... on Mirror {\n      ...Mirror\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), ProfileFragmentDoc, PostFragmentDoc, CommentFragmentDoc, MirrorFragmentDoc);
var NotificationsDocument = gql(_templateObject7$2 || (_templateObject7$2 = _taggedTemplateLiteral(["\n    query Notifications($request: NotificationRequest!, $observerId: ProfileId) {\n  result: notifications(request: $request) {\n    items {\n      ... on NewFollowerNotification {\n        ...NewFollowerNotification\n      }\n      ... on NewMirrorNotification {\n        ...NewMirrorNotification\n      }\n      ... on NewCollectNotification {\n        ...NewCollectNotification\n      }\n      ... on NewCommentNotification {\n        ...NewCommentNotification\n      }\n      ... on NewMentionNotification {\n        ...NewMentionNotification\n      }\n      ... on NewReactionNotification {\n        ...NewReactionNotification\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", "\n", "\n", "\n", "\n", "\n", ""])), NewFollowerNotificationFragmentDoc, NewMirrorNotificationFragmentDoc, NewCollectNotificationFragmentDoc, NewCommentNotificationFragmentDoc, NewMentionNotificationFragmentDoc, NewReactionNotificationFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var defaultWrapper$8 = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var NotificationsDocumentString = print(NotificationsDocument);
function getSdk$8(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$8;
  return {
    Notifications: function Notifications(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(NotificationsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'Notifications', 'query');
    }
  };
}

/**
 * Notifications on activity for a profile including collects, comment, new followers, and mirrors.
 *
 * @group LensClient Modules
 */
var Notifications = /*#__PURE__*/function () {
  function Notifications(config, authentication) {
    _classCallCheck(this, Notifications);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$8(client);
    this.authentication = authentication;
  }

  /**
   * Fetch notifications.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns {@link PromiseResult} with array of {@link NotificationFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.notifications.fetch({
   *  profileId: '0x0185',
   * });
   * ```
   */
  _createClass(Notifications, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(request, observerId) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(headers) {
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee$(_context) {
                              while (1) switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return _this.sdk.Notifications({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context.sent;
                                  return _context.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context.stop();
                              }
                            }, _callee);
                          }));
                          return function (_x4) {
                            return _ref2.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      return fetch;
    }()
  }]);
  return Notifications;
}();

var _templateObject$7, _templateObject2$7, _templateObject3$5, _templateObject4$5, _templateObject5$4, _templateObject6$1, _templateObject7$1, _templateObject8$1, _templateObject9$1, _templateObject10$1, _templateObject11$1, _templateObject12$1, _templateObject13$1, _templateObject14$1, _templateObject15$1, _templateObject16$1, _templateObject17$1, _templateObject18$1, _templateObject19$1, _templateObject20$1, _templateObject21$1, _templateObject22$1, _templateObject23$1, _templateObject24$1, _templateObject25$1, _templateObject26$1, _templateObject27$1, _templateObject28$1, _templateObject29$1, _templateObject30$1, _templateObject31$1, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36;
var ProfileStatsFragmentDoc = gql(_templateObject$7 || (_templateObject$7 = _taggedTemplateLiteral(["\n    fragment ProfileStats on ProfileStats {\n  __typename\n  totalCollects\n  totalComments\n  totalFollowers\n  totalFollowing\n  totalMirrors\n  totalPosts\n  totalPublications\n  commentsTotal(forSources: $sources)\n  postsTotal(forSources: $sources)\n  mirrorsTotal(forSources: $sources)\n  publicationsTotal(forSources: $sources)\n}\n    "])));
var BurnProfileTypedDataFragmentDoc = gql(_templateObject2$7 || (_templateObject2$7 = _taggedTemplateLiteral(["\n    fragment BurnProfileTypedData on CreateBurnProfileBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      BurnWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      name\n      chainId\n      version\n      verifyingContract\n    }\n    value {\n      nonce\n      deadline\n      tokenId\n    }\n  }\n}\n    "])));
var SetDefaultProfileTypedDataFragmentDoc = gql(_templateObject3$5 || (_templateObject3$5 = _taggedTemplateLiteral(["\n    fragment SetDefaultProfileTypedData on SetDefaultProfileBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      SetDefaultProfileWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      name\n      chainId\n      version\n      verifyingContract\n    }\n    value {\n      nonce\n      deadline\n      wallet\n      profileId\n    }\n  }\n}\n    "])));
var SetProfileImageUriTypedDataFragmentDoc = gql(_templateObject4$5 || (_templateObject4$5 = _taggedTemplateLiteral(["\n    fragment SetProfileImageURITypedData on CreateSetProfileImageUriBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      SetProfileImageURIWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      name\n      chainId\n      version\n      verifyingContract\n    }\n    value {\n      nonce\n      deadline\n      profileId\n      imageURI\n    }\n  }\n}\n    "])));
var SetProfileMetadataTypedDataFragmentDoc = gql(_templateObject5$4 || (_templateObject5$4 = _taggedTemplateLiteral(["\n    fragment SetProfileMetadataTypedData on CreateSetProfileMetadataURIBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      SetProfileMetadataURIWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      name\n      chainId\n      version\n      verifyingContract\n    }\n    value {\n      nonce\n      deadline\n      profileId\n      metadata\n    }\n  }\n}\n    "])));
var SetDispatcherTypedDataFragmentDoc = gql(_templateObject6$1 || (_templateObject6$1 = _taggedTemplateLiteral(["\n    fragment SetDispatcherTypedData on CreateSetDispatcherBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      SetDispatcherWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      name\n      chainId\n      version\n      verifyingContract\n    }\n    value {\n      nonce\n      deadline\n      profileId\n      dispatcher\n    }\n  }\n}\n    "])));
var FollowTypedDataFragmentDoc = gql(_templateObject7$1 || (_templateObject7$1 = _taggedTemplateLiteral(["\n    fragment FollowTypedData on CreateFollowBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      FollowWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      ...EIP712TypedDataDomain\n    }\n    value {\n      nonce\n      deadline\n      profileIds\n      datas\n    }\n  }\n}\n    ", ""])), Eip712TypedDataDomainFragmentDoc);
var UnfollowTypedDataFragmentDoc = gql(_templateObject8$1 || (_templateObject8$1 = _taggedTemplateLiteral(["\n    fragment UnfollowTypedData on CreateUnfollowBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      BurnWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      ...EIP712TypedDataDomain\n    }\n    value {\n      nonce\n      deadline\n      tokenId\n    }\n  }\n}\n    ", ""])), Eip712TypedDataDomainFragmentDoc);
var SetFollowModuleTypedDataFragmentDoc = gql(_templateObject9$1 || (_templateObject9$1 = _taggedTemplateLiteral(["\n    fragment SetFollowModuleTypedData on CreateSetFollowModuleBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      SetFollowModuleWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      name\n      chainId\n      version\n      verifyingContract\n    }\n    value {\n      nonce\n      deadline\n      profileId\n      followModule\n      followModuleInitData\n    }\n  }\n}\n    "])));
var SetFollowNftUriTypedDataFragmentDoc = gql(_templateObject10$1 || (_templateObject10$1 = _taggedTemplateLiteral(["\n    fragment SetFollowNFTUriTypedData on CreateSetFollowNFTUriBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      SetFollowNFTURIWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      name\n      chainId\n      version\n      verifyingContract\n    }\n    value {\n      nonce\n      profileId\n      deadline\n      followNFTURI\n    }\n  }\n}\n    "])));
var ProfileDocument = gql(_templateObject11$1 || (_templateObject11$1 = _taggedTemplateLiteral(["\n    query Profile($request: SingleProfileQueryRequest!, $observerId: ProfileId) {\n  result: profile(request: $request) {\n    ...Profile\n  }\n}\n    ", ""])), ProfileFragmentDoc);
var ProfileStatsDocument = gql(_templateObject12$1 || (_templateObject12$1 = _taggedTemplateLiteral(["\n    query ProfileStats($request: SingleProfileQueryRequest!, $sources: [Sources!]!) {\n  result: profile(request: $request) {\n    stats {\n      ...ProfileStats\n    }\n  }\n}\n    ", ""])), ProfileStatsFragmentDoc);
var ProfilesDocument = gql(_templateObject13$1 || (_templateObject13$1 = _taggedTemplateLiteral(["\n    query Profiles($request: ProfileQueryRequest!, $observerId: ProfileId) {\n  result: profiles(request: $request) {\n    items {\n      ...Profile\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), ProfileFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var RecommendedProfilesDocument = gql(_templateObject14$1 || (_templateObject14$1 = _taggedTemplateLiteral(["\n    query RecommendedProfiles($options: RecommendedProfileOptions!, $observerId: ProfileId) {\n  result: recommendedProfiles(options: $options) {\n    ...Profile\n  }\n}\n    ", ""])), ProfileFragmentDoc);
var MutualFollowersProfilesDocument = gql(_templateObject15$1 || (_templateObject15$1 = _taggedTemplateLiteral(["\n    query MutualFollowersProfiles($request: MutualFollowersProfilesQueryRequest!, $observerId: ProfileId) {\n  result: mutualFollowersProfiles(request: $request) {\n    items {\n      ...Profile\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), ProfileFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var DoesFollowDocument = gql(_templateObject16$1 || (_templateObject16$1 = _taggedTemplateLiteral(["\n    query DoesFollow($request: DoesFollowRequest!) {\n  result: doesFollow(request: $request) {\n    follows\n    followerAddress\n    profileId\n    isFinalisedOnChain\n    __typename\n  }\n}\n    "])));
var FollowingDocument = gql(_templateObject17$1 || (_templateObject17$1 = _taggedTemplateLiteral(["\n    query Following($request: FollowingRequest!, $observerId: ProfileId) {\n  result: following(request: $request) {\n    items {\n      ...Following\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), FollowingFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var FollowersDocument = gql(_templateObject18$1 || (_templateObject18$1 = _taggedTemplateLiteral(["\n    query Followers($request: FollowersRequest!, $observerId: ProfileId) {\n  result: followers(request: $request) {\n    items {\n      ...Follower\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), FollowerFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var FollowerNftOwnedTokenIdsDocument = gql(_templateObject19$1 || (_templateObject19$1 = _taggedTemplateLiteral(["\n    query FollowerNftOwnedTokenIds($request: FollowerNftOwnedTokenIdsRequest!) {\n  result: followerNftOwnedTokenIds(request: $request) {\n    __typename\n    followerNftAddress\n    tokensIds\n  }\n}\n    "])));
var PendingApprovalFollowsDocument = gql(_templateObject20$1 || (_templateObject20$1 = _taggedTemplateLiteral(["\n    query PendingApprovalFollows($request: PendingApprovalFollowsRequest!, $observerId: ProfileId) {\n  result: pendingApprovalFollows(request: $request) {\n    items {\n      ...Profile\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), ProfileFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var ProfileInterestsDocument = gql(_templateObject21$1 || (_templateObject21$1 = _taggedTemplateLiteral(["\n    query ProfileInterests {\n  result: profileInterests\n}\n    "])));
var CreateProfileDocument = gql(_templateObject22$1 || (_templateObject22$1 = _taggedTemplateLiteral(["\n    mutation CreateProfile($request: CreateProfileRequest!) {\n  result: createProfile(request: $request) {\n    ... on RelayerResult {\n      ...RelayerResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), RelayerResultFragmentDoc, RelayErrorFragmentDoc);
var CreateBurnProfileTypedDataDocument = gql(_templateObject23$1 || (_templateObject23$1 = _taggedTemplateLiteral(["\n    mutation CreateBurnProfileTypedData($request: BurnProfileRequest!, $options: TypedDataOptions) {\n  result: createBurnProfileTypedData(request: $request, options: $options) {\n    ...BurnProfileTypedData\n  }\n}\n    ", ""])), BurnProfileTypedDataFragmentDoc);
var CreateSetDefaultProfileTypedDataDocument = gql(_templateObject24$1 || (_templateObject24$1 = _taggedTemplateLiteral(["\n    mutation CreateSetDefaultProfileTypedData($request: CreateSetDefaultProfileRequest!, $options: TypedDataOptions) {\n  result: createSetDefaultProfileTypedData(request: $request, options: $options) {\n    ...SetDefaultProfileTypedData\n  }\n}\n    ", ""])), SetDefaultProfileTypedDataFragmentDoc);
var CreateSetProfileImageUriTypedDataDocument = gql(_templateObject25$1 || (_templateObject25$1 = _taggedTemplateLiteral(["\n    mutation CreateSetProfileImageURITypedData($request: UpdateProfileImageRequest!, $options: TypedDataOptions) {\n  result: createSetProfileImageURITypedData(request: $request, options: $options) {\n    ...SetProfileImageURITypedData\n  }\n}\n    ", ""])), SetProfileImageUriTypedDataFragmentDoc);
var CreateSetProfileImageUriViaDispatcherDocument = gql(_templateObject26$1 || (_templateObject26$1 = _taggedTemplateLiteral(["\n    mutation CreateSetProfileImageURIViaDispatcher($request: UpdateProfileImageRequest!) {\n  result: createSetProfileImageURIViaDispatcher(request: $request) {\n    __typename\n    ... on RelayerResult {\n      ...RelayerResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), RelayerResultFragmentDoc, RelayErrorFragmentDoc);
var CreateSetProfileMetadataTypedDataDocument = gql(_templateObject27$1 || (_templateObject27$1 = _taggedTemplateLiteral(["\n    mutation CreateSetProfileMetadataTypedData($request: CreatePublicSetProfileMetadataURIRequest!, $options: TypedDataOptions) {\n  result: createSetProfileMetadataTypedData(request: $request, options: $options) {\n    ...SetProfileMetadataTypedData\n  }\n}\n    ", ""])), SetProfileMetadataTypedDataFragmentDoc);
var CreateSetProfileMetadataViaDispatcherDocument = gql(_templateObject28$1 || (_templateObject28$1 = _taggedTemplateLiteral(["\n    mutation CreateSetProfileMetadataViaDispatcher($request: CreatePublicSetProfileMetadataURIRequest!) {\n  result: createSetProfileMetadataViaDispatcher(request: $request) {\n    __typename\n    ... on RelayerResult {\n      ...RelayerResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), RelayerResultFragmentDoc, RelayErrorFragmentDoc);
var CreateSetDispatcherTypedDataDocument = gql(_templateObject29$1 || (_templateObject29$1 = _taggedTemplateLiteral(["\n    mutation CreateSetDispatcherTypedData($request: SetDispatcherRequest!, $options: TypedDataOptions) {\n  result: createSetDispatcherTypedData(request: $request, options: $options) {\n    ...SetDispatcherTypedData\n  }\n}\n    ", ""])), SetDispatcherTypedDataFragmentDoc);
var CreateFollowTypedDataDocument = gql(_templateObject30$1 || (_templateObject30$1 = _taggedTemplateLiteral(["\n    mutation CreateFollowTypedData($request: FollowRequest!, $options: TypedDataOptions) {\n  result: createFollowTypedData(request: $request, options: $options) {\n    ...FollowTypedData\n  }\n}\n    ", ""])), FollowTypedDataFragmentDoc);
var CreateUnfollowTypedDataDocument = gql(_templateObject31$1 || (_templateObject31$1 = _taggedTemplateLiteral(["\n    mutation CreateUnfollowTypedData($request: UnfollowRequest!, $options: TypedDataOptions) {\n  result: createUnfollowTypedData(request: $request, options: $options) {\n    ...UnfollowTypedData\n  }\n}\n    ", ""])), UnfollowTypedDataFragmentDoc);
var CreateSetFollowModuleTypedDataDocument = gql(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["\n    mutation CreateSetFollowModuleTypedData($request: CreateSetFollowModuleRequest!, $options: TypedDataOptions) {\n  result: createSetFollowModuleTypedData(request: $request, options: $options) {\n    ...SetFollowModuleTypedData\n  }\n}\n    ", ""])), SetFollowModuleTypedDataFragmentDoc);
var CreateSetFollowNftUriTypedDataDocument = gql(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["\n    mutation CreateSetFollowNFTUriTypedData($request: CreateSetFollowNFTUriRequest!, $options: TypedDataOptions) {\n  result: createSetFollowNFTUriTypedData(request: $request, options: $options) {\n    ...SetFollowNFTUriTypedData\n  }\n}\n    ", ""])), SetFollowNftUriTypedDataFragmentDoc);
var AddProfileInterestDocument = gql(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["\n    mutation AddProfileInterest($request: AddProfileInterestsRequest!) {\n  addProfileInterests(request: $request)\n}\n    "])));
var RemoveProfileInterestDocument = gql(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["\n    mutation RemoveProfileInterest($request: RemoveProfileInterestsRequest!) {\n  removeProfileInterests(request: $request)\n}\n    "])));
var DismissRecommendedProfilesDocument = gql(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["\n    mutation DismissRecommendedProfiles($request: DismissRecommendedProfilesRequest!) {\n  dismissRecommendedProfiles(request: $request)\n}\n    "])));
var defaultWrapper$7 = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var ProfileDocumentString = print(ProfileDocument);
var ProfileStatsDocumentString = print(ProfileStatsDocument);
var ProfilesDocumentString = print(ProfilesDocument);
var RecommendedProfilesDocumentString = print(RecommendedProfilesDocument);
var MutualFollowersProfilesDocumentString = print(MutualFollowersProfilesDocument);
var DoesFollowDocumentString = print(DoesFollowDocument);
var FollowingDocumentString = print(FollowingDocument);
var FollowersDocumentString = print(FollowersDocument);
var FollowerNftOwnedTokenIdsDocumentString = print(FollowerNftOwnedTokenIdsDocument);
var PendingApprovalFollowsDocumentString = print(PendingApprovalFollowsDocument);
var ProfileInterestsDocumentString = print(ProfileInterestsDocument);
var CreateProfileDocumentString = print(CreateProfileDocument);
var CreateBurnProfileTypedDataDocumentString = print(CreateBurnProfileTypedDataDocument);
var CreateSetDefaultProfileTypedDataDocumentString = print(CreateSetDefaultProfileTypedDataDocument);
var CreateSetProfileImageUriTypedDataDocumentString = print(CreateSetProfileImageUriTypedDataDocument);
var CreateSetProfileImageUriViaDispatcherDocumentString = print(CreateSetProfileImageUriViaDispatcherDocument);
var CreateSetProfileMetadataTypedDataDocumentString = print(CreateSetProfileMetadataTypedDataDocument);
var CreateSetProfileMetadataViaDispatcherDocumentString = print(CreateSetProfileMetadataViaDispatcherDocument);
var CreateSetDispatcherTypedDataDocumentString = print(CreateSetDispatcherTypedDataDocument);
var CreateFollowTypedDataDocumentString = print(CreateFollowTypedDataDocument);
var CreateUnfollowTypedDataDocumentString = print(CreateUnfollowTypedDataDocument);
var CreateSetFollowModuleTypedDataDocumentString = print(CreateSetFollowModuleTypedDataDocument);
var CreateSetFollowNftUriTypedDataDocumentString = print(CreateSetFollowNftUriTypedDataDocument);
var AddProfileInterestDocumentString = print(AddProfileInterestDocument);
var RemoveProfileInterestDocumentString = print(RemoveProfileInterestDocument);
var DismissRecommendedProfilesDocumentString = print(DismissRecommendedProfilesDocument);
function getSdk$7(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$7;
  return {
    Profile: function Profile(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ProfileDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'Profile', 'query');
    },
    ProfileStats: function ProfileStats(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ProfileStatsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ProfileStats', 'query');
    },
    Profiles: function Profiles(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ProfilesDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'Profiles', 'query');
    },
    RecommendedProfiles: function RecommendedProfiles(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(RecommendedProfilesDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'RecommendedProfiles', 'query');
    },
    MutualFollowersProfiles: function MutualFollowersProfiles(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(MutualFollowersProfilesDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'MutualFollowersProfiles', 'query');
    },
    DoesFollow: function DoesFollow(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(DoesFollowDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'DoesFollow', 'query');
    },
    Following: function Following(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(FollowingDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'Following', 'query');
    },
    Followers: function Followers(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(FollowersDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'Followers', 'query');
    },
    FollowerNftOwnedTokenIds: function FollowerNftOwnedTokenIds(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(FollowerNftOwnedTokenIdsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'FollowerNftOwnedTokenIds', 'query');
    },
    PendingApprovalFollows: function PendingApprovalFollows(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(PendingApprovalFollowsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'PendingApprovalFollows', 'query');
    },
    ProfileInterests: function ProfileInterests(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ProfileInterestsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ProfileInterests', 'query');
    },
    CreateProfile: function CreateProfile(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateProfileDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateProfile', 'mutation');
    },
    CreateBurnProfileTypedData: function CreateBurnProfileTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateBurnProfileTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateBurnProfileTypedData', 'mutation');
    },
    CreateSetDefaultProfileTypedData: function CreateSetDefaultProfileTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateSetDefaultProfileTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateSetDefaultProfileTypedData', 'mutation');
    },
    CreateSetProfileImageURITypedData: function CreateSetProfileImageURITypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateSetProfileImageUriTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateSetProfileImageURITypedData', 'mutation');
    },
    CreateSetProfileImageURIViaDispatcher: function CreateSetProfileImageURIViaDispatcher(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateSetProfileImageUriViaDispatcherDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateSetProfileImageURIViaDispatcher', 'mutation');
    },
    CreateSetProfileMetadataTypedData: function CreateSetProfileMetadataTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateSetProfileMetadataTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateSetProfileMetadataTypedData', 'mutation');
    },
    CreateSetProfileMetadataViaDispatcher: function CreateSetProfileMetadataViaDispatcher(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateSetProfileMetadataViaDispatcherDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateSetProfileMetadataViaDispatcher', 'mutation');
    },
    CreateSetDispatcherTypedData: function CreateSetDispatcherTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateSetDispatcherTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateSetDispatcherTypedData', 'mutation');
    },
    CreateFollowTypedData: function CreateFollowTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateFollowTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateFollowTypedData', 'mutation');
    },
    CreateUnfollowTypedData: function CreateUnfollowTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateUnfollowTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateUnfollowTypedData', 'mutation');
    },
    CreateSetFollowModuleTypedData: function CreateSetFollowModuleTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateSetFollowModuleTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateSetFollowModuleTypedData', 'mutation');
    },
    CreateSetFollowNFTUriTypedData: function CreateSetFollowNFTUriTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateSetFollowNftUriTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateSetFollowNFTUriTypedData', 'mutation');
    },
    AddProfileInterest: function AddProfileInterest(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(AddProfileInterestDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'AddProfileInterest', 'mutation');
    },
    RemoveProfileInterest: function RemoveProfileInterest(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(RemoveProfileInterestDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'RemoveProfileInterest', 'mutation');
    },
    DismissRecommendedProfiles: function DismissRecommendedProfiles(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(DismissRecommendedProfilesDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'DismissRecommendedProfiles', 'mutation');
    }
  };
}

/**
 * Profiles are the accounts that create publications and are owned by wallets.
 *
 * @group LensClient Modules
 */
var Profile = /*#__PURE__*/function () {
  function Profile(config, authentication) {
    _classCallCheck(this, Profile);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$7(client);
    this.authentication = authentication;
  }

  /**
   * Fetch a single profile.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Profile or null if not found
   *
   * @example
   * ```ts
   * const result = await client.profile.fetch({ profileId: '0x123' });
   * ```
   */
  _createClass(Profile, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(request, observerId) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _this.sdk.Profile({
                          request: request,
                          observerId: observerId
                        }, headers);
                      case 2:
                        result = _context.sent;
                        return _context.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      return fetch;
    }()
    /**
     * Fetch a profile's stats.
     *
     * @param request - Request object for the query
     * @param sources - Required to calculate stats specific to provided appIds
     * @returns Profile stats or undefined if not found
     *
     * @example
     * ```ts
     * const result = await client.profile.stats({ profileId: '0x123' }, ['lenster']);
     * ```
     */
  }, {
    key: "stats",
    value: function () {
      var _stats = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(request, sources) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(headers) {
                  var _result$data$result;
                  var result;
                  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _this2.sdk.ProfileStats({
                          request: request,
                          sources: sources
                        }, headers);
                      case 2:
                        result = _context3.sent;
                        return _context3.abrupt("return", (_result$data$result = result.data.result) === null || _result$data$result === void 0 ? void 0 : _result$data$result.stats);
                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x6) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function stats(_x4, _x5) {
        return _stats.apply(this, arguments);
      }
      return stats;
    }()
    /**
     * Fetch all profiles by requested criteria
     *
     * @param request - Request object for the query
     * @param observerId - Optional id of a profile that is the observer for this request
     * @returns Profiles wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.profile.fetchAll({
     *   ownedBy: ['0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2'],
     * });
     * ```
     */
  }, {
    key: "fetchAll",
    value: function () {
      var _fetchAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(request, observerId) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(headers) {
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        return _context6.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                              while (1) switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return _this3.sdk.Profiles({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context5.sent;
                                  return _context5.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context5.stop();
                              }
                            }, _callee5);
                          }));
                          return function (_x10) {
                            return _ref4.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function (_x9) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function fetchAll(_x7, _x8) {
        return _fetchAll.apply(this, arguments);
      }
      return fetchAll;
    }()
    /**
     * Fetch all recommended profiles
     *
     * @param options - Optional options for the query
     * @param observerId - Optional id of a profile that is the observer for this request
     * @returns Array of recommended profiles
     *
     * @example
     * ```ts
     * const result = await client.profile.allRecommended();
     * ```
     */
  }, {
    key: "allRecommended",
    value: function () {
      var _allRecommended = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var _this4 = this;
        var options,
          observerId,
          _args9 = arguments;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              options = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
              observerId = _args9.length > 1 ? _args9[1] : undefined;
              return _context9.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return _this4.sdk.RecommendedProfiles({
                          options: options,
                          observerId: observerId
                        }, headers);
                      case 2:
                        result = _context8.sent;
                        return _context8.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee8);
                }));
                return function (_x11) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 3:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function allRecommended() {
        return _allRecommended.apply(this, arguments);
      }
      return allRecommended;
    }()
    /**
     * Dismiss profiles from the recommended list
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with void
     *
     * @example
     * ```ts
     * const result = await client.profile.dismissRecommended({ profileIds: ['0x123'] });
     * ```
     */
  }, {
    key: "dismissRecommended",
    value: function () {
      var _dismissRecommended = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(request) {
        var _this5 = this;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(headers) {
                  return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        _context10.next = 2;
                        return _this5.sdk.DismissRecommendedProfiles({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10);
                }));
                return function (_x13) {
                  return _ref6.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function dismissRecommended(_x12) {
        return _dismissRecommended.apply(this, arguments);
      }
      return dismissRecommended;
    }()
    /**
     * Fetch mutual followers between two profiles
     *
     * @param request - Request object for the query
     * @param observerId - Optional id of a profile that is the observer for this request
     * @returns Profiles wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.profile.mutualFollowers({
     *   viewingProfileId: '0x123',
     *   yourProfileId: '0x456',
     * });
     * ```
     */
  }, {
    key: "mutualFollowers",
    value: function () {
      var _mutualFollowers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(request, observerId) {
        var _this6 = this;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(headers) {
                  return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                    while (1) switch (_context13.prev = _context13.next) {
                      case 0:
                        return _context13.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                              while (1) switch (_context12.prev = _context12.next) {
                                case 0:
                                  _context12.next = 2;
                                  return _this6.sdk.MutualFollowersProfiles({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context12.sent;
                                  return _context12.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context12.stop();
                              }
                            }, _callee12);
                          }));
                          return function (_x17) {
                            return _ref8.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context13.stop();
                    }
                  }, _callee13);
                }));
                return function (_x16) {
                  return _ref7.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function mutualFollowers(_x14, _x15) {
        return _mutualFollowers.apply(this, arguments);
      }
      return mutualFollowers;
    }()
    /**
     * Check if the ethereum address follows a profile. Allows bulk request.
     *
     * @param request - Request object for the query
     * @returns Array of results for each requested pair
     *
     * @example
     * ```ts
     * const result = await client.profile.doesFollow({
     *   followInfos: [
     *     {
     *       followerAddress: '0xD020E01C0c90Ab005A01482d34B808874345FD82',
     *       profileId: '0x01'
     *     },
     *     {
     *       followerAddress: '0x248ba21F6ff51cf0CD4765C3Bc9fAD2030a591d5',
     *       profileId: '0x01'
     *     }
     *   ]
     * });
     * ```
     */
  }, {
    key: "doesFollow",
    value: function () {
      var _doesFollow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(request) {
        var _this7 = this;
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                    while (1) switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.next = 2;
                        return _this7.sdk.DoesFollow({
                          request: request
                        }, headers);
                      case 2:
                        result = _context15.sent;
                        return _context15.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context15.stop();
                    }
                  }, _callee15);
                }));
                return function (_x19) {
                  return _ref9.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function doesFollow(_x18) {
        return _doesFollow.apply(this, arguments);
      }
      return doesFollow;
    }()
    /**
     * Fetch all profiles an ethereum address is following
     *
     * @param request - Request object for the query
     * @param observerId - Optional id of a profile that is the observer for this request
     * @returns Profiles wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.profile.allFollowing({
     *  address: '0xe3D871d389BF78c091E29deCe83200E9d6B2B0C2',
     * });
     * ```
     */
  }, {
    key: "allFollowing",
    value: function () {
      var _allFollowing = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(request, observerId) {
        var _this8 = this;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              return _context19.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(headers) {
                  return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                    while (1) switch (_context18.prev = _context18.next) {
                      case 0:
                        return _context18.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee17$(_context17) {
                              while (1) switch (_context17.prev = _context17.next) {
                                case 0:
                                  _context17.next = 2;
                                  return _this8.sdk.Following({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context17.sent;
                                  return _context17.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context17.stop();
                              }
                            }, _callee17);
                          }));
                          return function (_x23) {
                            return _ref11.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context18.stop();
                    }
                  }, _callee18);
                }));
                return function (_x22) {
                  return _ref10.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function allFollowing(_x20, _x21) {
        return _allFollowing.apply(this, arguments);
      }
      return allFollowing;
    }()
    /**
     * Fetch all wallet addresses that follow a profile
     *
     * @param request - Request object for the query
     * @returns Wallets with default profiles wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.profile.allFollowers({
     *   profileId: '0x123',
     * });
     * ```
     */
  }, {
    key: "allFollowers",
    value: function () {
      var _allFollowers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(request, observerId) {
        var _this9 = this;
        return _regeneratorRuntime().wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              return _context22.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(headers) {
                  return _regeneratorRuntime().wrap(function _callee21$(_context21) {
                    while (1) switch (_context21.prev = _context21.next) {
                      case 0:
                        return _context21.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee20$(_context20) {
                              while (1) switch (_context20.prev = _context20.next) {
                                case 0:
                                  _context20.next = 2;
                                  return _this9.sdk.Followers({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context20.sent;
                                  return _context20.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context20.stop();
                              }
                            }, _callee20);
                          }));
                          return function (_x27) {
                            return _ref13.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context21.stop();
                    }
                  }, _callee21);
                }));
                return function (_x26) {
                  return _ref12.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function allFollowers(_x24, _x25) {
        return _allFollowers.apply(this, arguments);
      }
      return allFollowers;
    }()
    /**
     * Fetch follower NFT that the wallet address owns.
     * Remember a wallet can follow a profile as many times as they wish.
     *
     * @param request - Request object for the query
     * @returns Details of follower NFT like contract address and token ids
     *
     * @example
     * ```ts
     * const result = await client.profile.followerNftOwnedTokenIds({
     *   address: '0xD020E01C0c90Ab005A01482d34B808874345FD82',
     *   profileId: '0x01'
     * });
     * ```
     */
  }, {
    key: "followerNftOwnedTokenIds",
    value: function () {
      var _followerNftOwnedTokenIds = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(request) {
        var _this10 = this;
        return _regeneratorRuntime().wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              return _context24.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee23$(_context23) {
                    while (1) switch (_context23.prev = _context23.next) {
                      case 0:
                        _context23.next = 2;
                        return _this10.sdk.FollowerNftOwnedTokenIds({
                          request: request
                        }, headers);
                      case 2:
                        result = _context23.sent;
                        return _context23.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context23.stop();
                    }
                  }, _callee23);
                }));
                return function (_x29) {
                  return _ref14.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this);
      }));
      function followerNftOwnedTokenIds(_x28) {
        return _followerNftOwnedTokenIds.apply(this, arguments);
      }
      return followerNftOwnedTokenIds;
    }()
    /**
     * Create a new profile
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.profile.create({
     *   handle: 'profilehandle',
     * });
     * ```
     */
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(request) {
        var _this11 = this;
        return _regeneratorRuntime().wrap(function _callee26$(_context26) {
          while (1) switch (_context26.prev = _context26.next) {
            case 0:
              return _context26.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee25$(_context25) {
                    while (1) switch (_context25.prev = _context25.next) {
                      case 0:
                        _context25.next = 2;
                        return _this11.sdk.CreateProfile({
                          request: request
                        }, headers);
                      case 2:
                        result = _context25.sent;
                        return _context25.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context25.stop();
                    }
                  }, _callee25);
                }));
                return function (_x31) {
                  return _ref15.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context26.stop();
          }
        }, _callee26, this);
      }));
      function create(_x30) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
    /**
     * Fetch typed data for setting the dispatcher
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for setting the dispatcher
     *
     * @example
     * ```ts
     * const result = await client.profile.createSetDispatcherTypedData({
     *   profileId: activeProfile.id,
     * });
     * ```
     */
  }, {
    key: "createSetDispatcherTypedData",
    value: function () {
      var _createSetDispatcherTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(request, options) {
        var _this12 = this;
        return _regeneratorRuntime().wrap(function _callee28$(_context28) {
          while (1) switch (_context28.prev = _context28.next) {
            case 0:
              return _context28.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee27$(_context27) {
                    while (1) switch (_context27.prev = _context27.next) {
                      case 0:
                        _context27.next = 2;
                        return _this12.sdk.CreateSetDispatcherTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context27.sent;
                        return _context27.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context27.stop();
                    }
                  }, _callee27);
                }));
                return function (_x34) {
                  return _ref16.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context28.stop();
          }
        }, _callee28, this);
      }));
      function createSetDispatcherTypedData(_x32, _x33) {
        return _createSetDispatcherTypedData.apply(this, arguments);
      }
      return createSetDispatcherTypedData;
    }()
    /**
     * Fetch typed data for setting the default profile
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for setting the default profile
     *
     * @example
     * ```ts
     * const result = await client.profile.createSetDefaultProfileTypedData({
     *   profileId: '0x0635', // must be a profile owned by authenticated wallet
     * });
     * ```
     */
  }, {
    key: "createSetDefaultProfileTypedData",
    value: function () {
      var _createSetDefaultProfileTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(request, options) {
        var _this13 = this;
        return _regeneratorRuntime().wrap(function _callee30$(_context30) {
          while (1) switch (_context30.prev = _context30.next) {
            case 0:
              return _context30.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee29$(_context29) {
                    while (1) switch (_context29.prev = _context29.next) {
                      case 0:
                        _context29.next = 2;
                        return _this13.sdk.CreateSetDefaultProfileTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context29.sent;
                        return _context29.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context29.stop();
                    }
                  }, _callee29);
                }));
                return function (_x37) {
                  return _ref17.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context30.stop();
          }
        }, _callee30, this);
      }));
      function createSetDefaultProfileTypedData(_x35, _x36) {
        return _createSetDefaultProfileTypedData.apply(this, arguments);
      }
      return createSetDefaultProfileTypedData;
    }()
    /**
     * Fetch typed data for setting the profile's metadata
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for setting the profile's metadata
     *
     * @example
     * ```ts
     * const result = await client.profile.createSetProfileMetadataTypedData({
     *   profileId: '0x0635',
     *   metadata: 'ipfs://Qm...',
     * });
     * ```
     */
  }, {
    key: "createSetProfileMetadataTypedData",
    value: function () {
      var _createSetProfileMetadataTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32(request, options) {
        var _this14 = this;
        return _regeneratorRuntime().wrap(function _callee32$(_context32) {
          while (1) switch (_context32.prev = _context32.next) {
            case 0:
              return _context32.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee31$(_context31) {
                    while (1) switch (_context31.prev = _context31.next) {
                      case 0:
                        _context31.next = 2;
                        return _this14.sdk.CreateSetProfileMetadataTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context31.sent;
                        return _context31.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context31.stop();
                    }
                  }, _callee31);
                }));
                return function (_x40) {
                  return _ref18.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context32.stop();
          }
        }, _callee32, this);
      }));
      function createSetProfileMetadataTypedData(_x38, _x39) {
        return _createSetProfileMetadataTypedData.apply(this, arguments);
      }
      return createSetProfileMetadataTypedData;
    }()
    /**
     * Set profile's metadata using dispatcher. Profile has to have the dispatcher enabled.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.profile.createSetProfileMetadataViaDispatcher({
     *   profileId: '0x0635',
     *   metadata: 'ipfs://Qm...',
     * });
     * ```
     */
  }, {
    key: "createSetProfileMetadataViaDispatcher",
    value: function () {
      var _createSetProfileMetadataViaDispatcher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34(request) {
        var _this15 = this;
        return _regeneratorRuntime().wrap(function _callee34$(_context34) {
          while (1) switch (_context34.prev = _context34.next) {
            case 0:
              return _context34.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee33$(_context33) {
                    while (1) switch (_context33.prev = _context33.next) {
                      case 0:
                        _context33.next = 2;
                        return _this15.sdk.CreateSetProfileMetadataViaDispatcher({
                          request: request
                        }, headers);
                      case 2:
                        result = _context33.sent;
                        return _context33.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context33.stop();
                    }
                  }, _callee33);
                }));
                return function (_x42) {
                  return _ref19.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context34.stop();
          }
        }, _callee34, this);
      }));
      function createSetProfileMetadataViaDispatcher(_x41) {
        return _createSetProfileMetadataViaDispatcher.apply(this, arguments);
      }
      return createSetProfileMetadataViaDispatcher;
    }()
    /**
     * Fetch typed data for setting the profile's image
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for setting the profile's image
     *
     * @example
     * ```ts
     * const result = await client.profile.createSetProfileImageURITypedData({
     *   profileId: '0x0635',
     *   url: 'ipfs://Qm...',
     * });
     * ```
     */
  }, {
    key: "createSetProfileImageURITypedData",
    value: function () {
      var _createSetProfileImageURITypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee36(request, options) {
        var _this16 = this;
        return _regeneratorRuntime().wrap(function _callee36$(_context36) {
          while (1) switch (_context36.prev = _context36.next) {
            case 0:
              return _context36.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee35(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee35$(_context35) {
                    while (1) switch (_context35.prev = _context35.next) {
                      case 0:
                        _context35.next = 2;
                        return _this16.sdk.CreateSetProfileImageURITypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context35.sent;
                        return _context35.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context35.stop();
                    }
                  }, _callee35);
                }));
                return function (_x45) {
                  return _ref20.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context36.stop();
          }
        }, _callee36, this);
      }));
      function createSetProfileImageURITypedData(_x43, _x44) {
        return _createSetProfileImageURITypedData.apply(this, arguments);
      }
      return createSetProfileImageURITypedData;
    }()
    /**
     * Set profile's image using dispatcher. Profile has to have the dispatcher enabled.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.profile.createSetProfileImageURIViaDispatcher({
     *   profileId: '0x0635',
     *   url: 'ipfs://Qm...',
     * });
     * ```
     */
  }, {
    key: "createSetProfileImageURIViaDispatcher",
    value: function () {
      var _createSetProfileImageURIViaDispatcher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee38(request) {
        var _this17 = this;
        return _regeneratorRuntime().wrap(function _callee38$(_context38) {
          while (1) switch (_context38.prev = _context38.next) {
            case 0:
              return _context38.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee37(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee37$(_context37) {
                    while (1) switch (_context37.prev = _context37.next) {
                      case 0:
                        _context37.next = 2;
                        return _this17.sdk.CreateSetProfileImageURIViaDispatcher({
                          request: request
                        }, headers);
                      case 2:
                        result = _context37.sent;
                        return _context37.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context37.stop();
                    }
                  }, _callee37);
                }));
                return function (_x47) {
                  return _ref21.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context38.stop();
          }
        }, _callee38, this);
      }));
      function createSetProfileImageURIViaDispatcher(_x46) {
        return _createSetProfileImageURIViaDispatcher.apply(this, arguments);
      }
      return createSetProfileImageURIViaDispatcher;
    }()
    /**
     * Fetch typed data for burning a profile
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for burning a profile
     *
     * @example
     * ```ts
     * const result = await client.profile.createBurnProfileTypedData({
     *   profileId: '0x0635',
     * });
     * ```
     */
  }, {
    key: "createBurnProfileTypedData",
    value: function () {
      var _createBurnProfileTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee40(request, options) {
        var _this18 = this;
        return _regeneratorRuntime().wrap(function _callee40$(_context40) {
          while (1) switch (_context40.prev = _context40.next) {
            case 0:
              return _context40.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee39(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee39$(_context39) {
                    while (1) switch (_context39.prev = _context39.next) {
                      case 0:
                        _context39.next = 2;
                        return _this18.sdk.CreateBurnProfileTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context39.sent;
                        return _context39.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context39.stop();
                    }
                  }, _callee39);
                }));
                return function (_x50) {
                  return _ref22.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context40.stop();
          }
        }, _callee40, this);
      }));
      function createBurnProfileTypedData(_x48, _x49) {
        return _createBurnProfileTypedData.apply(this, arguments);
      }
      return createBurnProfileTypedData;
    }()
    /**
     * Fetch typed data for following a profile
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for following a profile
     *
     * @example
     * ```ts
     * const result = await client.profile.createFollowTypedData({
     *   follow: [
     *     { profile: '0x123' },
     *   ],
     * });
     * ```
     */
  }, {
    key: "createFollowTypedData",
    value: function () {
      var _createFollowTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee42(request, options) {
        var _this19 = this;
        return _regeneratorRuntime().wrap(function _callee42$(_context42) {
          while (1) switch (_context42.prev = _context42.next) {
            case 0:
              return _context42.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee41(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee41$(_context41) {
                    while (1) switch (_context41.prev = _context41.next) {
                      case 0:
                        _context41.next = 2;
                        return _this19.sdk.CreateFollowTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context41.sent;
                        return _context41.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context41.stop();
                    }
                  }, _callee41);
                }));
                return function (_x53) {
                  return _ref23.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context42.stop();
          }
        }, _callee42, this);
      }));
      function createFollowTypedData(_x51, _x52) {
        return _createFollowTypedData.apply(this, arguments);
      }
      return createFollowTypedData;
    }()
    /**
     * Fetch typed data for unfollowing a profile
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for unfollowing a profile
     *
     * @example
     * ```ts
     * const result = await client.profile.createUnfollowTypedData({
     *   profile: '0x123',
     * });
     * ```
     */
  }, {
    key: "createUnfollowTypedData",
    value: function () {
      var _createUnfollowTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee44(request, options) {
        var _this20 = this;
        return _regeneratorRuntime().wrap(function _callee44$(_context44) {
          while (1) switch (_context44.prev = _context44.next) {
            case 0:
              return _context44.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee43(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee43$(_context43) {
                    while (1) switch (_context43.prev = _context43.next) {
                      case 0:
                        _context43.next = 2;
                        return _this20.sdk.CreateUnfollowTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context43.sent;
                        return _context43.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context43.stop();
                    }
                  }, _callee43);
                }));
                return function (_x56) {
                  return _ref24.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context44.stop();
          }
        }, _callee44, this);
      }));
      function createUnfollowTypedData(_x54, _x55) {
        return _createUnfollowTypedData.apply(this, arguments);
      }
      return createUnfollowTypedData;
    }()
    /**
     * Fetch typed data for setting a profile's follow module
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for setting a profile's follow module
     *
     * @example
     * ```ts
     * const result = await client.profile.createSetFollowModuleTypedData({
     *   profileId: '0x123',
     *   followModule: {
     *     feeFollowModule: {
     *       amount: {
     *         currency: '0xD40282e050723Ae26Aeb0F77022dB14470f4e011',
     *         value: '0.01'
     *       },
     *       recipient: '0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF'
     *     }
     *   }
     * });
     * ```
     */
  }, {
    key: "createSetFollowModuleTypedData",
    value: function () {
      var _createSetFollowModuleTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee46(request, options) {
        var _this21 = this;
        return _regeneratorRuntime().wrap(function _callee46$(_context46) {
          while (1) switch (_context46.prev = _context46.next) {
            case 0:
              return _context46.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee45(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee45$(_context45) {
                    while (1) switch (_context45.prev = _context45.next) {
                      case 0:
                        _context45.next = 2;
                        return _this21.sdk.CreateSetFollowModuleTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context45.sent;
                        return _context45.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context45.stop();
                    }
                  }, _callee45);
                }));
                return function (_x59) {
                  return _ref25.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context46.stop();
          }
        }, _callee46, this);
      }));
      function createSetFollowModuleTypedData(_x57, _x58) {
        return _createSetFollowModuleTypedData.apply(this, arguments);
      }
      return createSetFollowModuleTypedData;
    }()
    /**
     * Fetch typed data for setting a profile's follow NFT URI.
     *
     * The follow NFT URI is the NFT metadata followers will mint when they follow your profile.
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for setting a profile's follow NFT URI
     *
     * @example
     * ```ts
     * const result = await client.profile.createSetFollowNFTUriTypedData({
     *   profileId: '0x123',
     *   followNFTURI: 'ipfs://Qm...',
     * });
     * ```
     */
  }, {
    key: "createSetFollowNFTUriTypedData",
    value: function () {
      var _createSetFollowNFTUriTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee48(request, options) {
        var _this22 = this;
        return _regeneratorRuntime().wrap(function _callee48$(_context48) {
          while (1) switch (_context48.prev = _context48.next) {
            case 0:
              return _context48.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee47(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee47$(_context47) {
                    while (1) switch (_context47.prev = _context47.next) {
                      case 0:
                        _context47.next = 2;
                        return _this22.sdk.CreateSetFollowNFTUriTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context47.sent;
                        return _context47.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context47.stop();
                    }
                  }, _callee47);
                }));
                return function (_x62) {
                  return _ref26.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context48.stop();
          }
        }, _callee48, this);
      }));
      function createSetFollowNFTUriTypedData(_x60, _x61) {
        return _createSetFollowNFTUriTypedData.apply(this, arguments);
      }
      return createSetFollowNFTUriTypedData;
    }()
    /**
     * Fetch all the pending approval follow NFTs you have been sent
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the query
     * @param observerId - Optional id of a profile that is the observer for this request
     * @returns Profiles wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.profile.pendingApprovalFollows();
     * ```
     */
  }, {
    key: "pendingApprovalFollows",
    value: function () {
      var _pendingApprovalFollows = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee51(request, observerId) {
        var _this23 = this;
        return _regeneratorRuntime().wrap(function _callee51$(_context51) {
          while (1) switch (_context51.prev = _context51.next) {
            case 0:
              return _context51.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee50(headers) {
                  return _regeneratorRuntime().wrap(function _callee50$(_context50) {
                    while (1) switch (_context50.prev = _context50.next) {
                      case 0:
                        return _context50.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee49(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee49$(_context49) {
                              while (1) switch (_context49.prev = _context49.next) {
                                case 0:
                                  _context49.next = 2;
                                  return _this23.sdk.PendingApprovalFollows({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context49.sent;
                                  return _context49.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context49.stop();
                              }
                            }, _callee49);
                          }));
                          return function (_x66) {
                            return _ref28.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context50.stop();
                    }
                  }, _callee50);
                }));
                return function (_x65) {
                  return _ref27.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context51.stop();
          }
        }, _callee51, this);
      }));
      function pendingApprovalFollows(_x63, _x64) {
        return _pendingApprovalFollows.apply(this, arguments);
      }
      return pendingApprovalFollows;
    }()
    /**
     * Fetch all available interests.
     *
     * @returns Array of interests
     */
  }, {
    key: "allInterests",
    value: function () {
      var _allInterests = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee53() {
        var _this24 = this;
        return _regeneratorRuntime().wrap(function _callee53$(_context53) {
          while (1) switch (_context53.prev = _context53.next) {
            case 0:
              return _context53.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee52(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee52$(_context52) {
                    while (1) switch (_context52.prev = _context52.next) {
                      case 0:
                        _context52.next = 2;
                        return _this24.sdk.ProfileInterests({}, headers);
                      case 2:
                        result = _context52.sent;
                        return _context52.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context52.stop();
                    }
                  }, _callee52);
                }));
                return function (_x67) {
                  return _ref29.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context53.stop();
          }
        }, _callee53, this);
      }));
      function allInterests() {
        return _allInterests.apply(this, arguments);
      }
      return allInterests;
    }()
    /**
     * Add interests to a profile.
     *
     * ⚠️ Requires authenticated LensClient with the provided profileId.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with void
     *
     * @example
     * ```ts
     * await client.profile.addInterests({
     *   interests: ['TECHNOLOGY__PROGRAMMING'],
     *   profileId: '0x123',
     * });
     * ```
     */
  }, {
    key: "addInterests",
    value: function () {
      var _addInterests = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee55(request) {
        var _this25 = this;
        return _regeneratorRuntime().wrap(function _callee55$(_context55) {
          while (1) switch (_context55.prev = _context55.next) {
            case 0:
              return _context55.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee54(headers) {
                  return _regeneratorRuntime().wrap(function _callee54$(_context54) {
                    while (1) switch (_context54.prev = _context54.next) {
                      case 0:
                        _context54.next = 2;
                        return _this25.sdk.AddProfileInterest({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context54.stop();
                    }
                  }, _callee54);
                }));
                return function (_x69) {
                  return _ref30.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context55.stop();
          }
        }, _callee55, this);
      }));
      function addInterests(_x68) {
        return _addInterests.apply(this, arguments);
      }
      return addInterests;
    }()
    /**
     * Remove interests from a profile.
     *
     * ⚠️ Requires authenticated LensClient with the provided profileId.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with void
     *
     * @example
     * ```ts
     * await client.profile.removeInterests({
     *   interests: ['TECHNOLOGY__PROGRAMMING'],
     *   profileId: '0x123',
     * });
     * ```
     */
  }, {
    key: "removeInterests",
    value: function () {
      var _removeInterests = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee57(request) {
        var _this26 = this;
        return _regeneratorRuntime().wrap(function _callee57$(_context57) {
          while (1) switch (_context57.prev = _context57.next) {
            case 0:
              return _context57.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee56(headers) {
                  return _regeneratorRuntime().wrap(function _callee56$(_context56) {
                    while (1) switch (_context56.prev = _context56.next) {
                      case 0:
                        _context56.next = 2;
                        return _this26.sdk.RemoveProfileInterest({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context56.stop();
                    }
                  }, _callee56);
                }));
                return function (_x71) {
                  return _ref31.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context57.stop();
          }
        }, _callee57, this);
      }));
      function removeInterests(_x70) {
        return _removeInterests.apply(this, arguments);
      }
      return removeInterests;
    }()
  }]);
  return Profile;
}();

/**
 * Checks if a profile handle is valid.
 *
 * @param handle - profile handle to check
 * @returns true if the handle is valid
 */
function isValidProfileHandle(handle) {
  var validationRegex = /^[a-z](?:[a-z0-9_]{4,25})$/;
  return validationRegex.test(handle);
}

/** All built-in and custom scalars, mapped to their actual values */

/** The access conditions for the publication */

/** The access conditions for the publication */

/** The request object to add interests to a profile */

/** The Profile */

/** The auth challenge result */

/** The authentication result */

/** The challenge request */

/** The claim status */
var ClaimStatus;
(function (ClaimStatus) {
  ClaimStatus["AlreadyClaimed"] = "ALREADY_CLAIMED";
  ClaimStatus["ClaimFailed"] = "CLAIM_FAILED";
  ClaimStatus["NotClaimed"] = "NOT_CLAIMED";
})(ClaimStatus || (ClaimStatus = {}));
/** The collect module types */
var CollectModules;
(function (CollectModules) {
  CollectModules["AaveFeeCollectModule"] = "AaveFeeCollectModule";
  CollectModules["Erc4626FeeCollectModule"] = "ERC4626FeeCollectModule";
  CollectModules["FeeCollectModule"] = "FeeCollectModule";
  CollectModules["FreeCollectModule"] = "FreeCollectModule";
  CollectModules["LimitedFeeCollectModule"] = "LimitedFeeCollectModule";
  CollectModules["LimitedTimedFeeCollectModule"] = "LimitedTimedFeeCollectModule";
  CollectModules["MultirecipientFeeCollectModule"] = "MultirecipientFeeCollectModule";
  CollectModules["RevertCollectModule"] = "RevertCollectModule";
  CollectModules["TimedFeeCollectModule"] = "TimedFeeCollectModule";
  CollectModules["UnknownCollectModule"] = "UnknownCollectModule";
})(CollectModules || (CollectModules = {}));
/** The comment ordering types */
var CommentOrderingTypes;

/** The comment ranking filter types */
(function (CommentOrderingTypes) {
  CommentOrderingTypes["Desc"] = "DESC";
  CommentOrderingTypes["Ranking"] = "RANKING";
})(CommentOrderingTypes || (CommentOrderingTypes = {}));
var CommentRankingFilter;

/** The gated publication access criteria contract types */
(function (CommentRankingFilter) {
  CommentRankingFilter["NoneRelevant"] = "NONE_RELEVANT";
  CommentRankingFilter["Relevant"] = "RELEVANT";
})(CommentRankingFilter || (CommentRankingFilter = {}));
var ContractType;

/** The create burn eip 712 typed data */
(function (ContractType) {
  ContractType["Erc20"] = "ERC20";
  ContractType["Erc721"] = "ERC721";
  ContractType["Erc1155"] = "ERC1155";
})(ContractType || (ContractType = {}));
/** The custom filters types */
var CustomFiltersTypes;
(function (CustomFiltersTypes) {
  CustomFiltersTypes["Gardeners"] = "GARDENERS";
})(CustomFiltersTypes || (CustomFiltersTypes = {}));
/** The reason why a profile cannot decrypt a publication */
var DecryptFailReason;
(function (DecryptFailReason) {
  DecryptFailReason["CanNotDecrypt"] = "CAN_NOT_DECRYPT";
  DecryptFailReason["CollectNotFinalisedOnChain"] = "COLLECT_NOT_FINALISED_ON_CHAIN";
  DecryptFailReason["DoesNotFollowProfile"] = "DOES_NOT_FOLLOW_PROFILE";
  DecryptFailReason["DoesNotOwnNft"] = "DOES_NOT_OWN_NFT";
  DecryptFailReason["DoesNotOwnProfile"] = "DOES_NOT_OWN_PROFILE";
  DecryptFailReason["FollowNotFinalisedOnChain"] = "FOLLOW_NOT_FINALISED_ON_CHAIN";
  DecryptFailReason["HasNotCollectedPublication"] = "HAS_NOT_COLLECTED_PUBLICATION";
  DecryptFailReason["MissingEncryptionParams"] = "MISSING_ENCRYPTION_PARAMS";
  DecryptFailReason["ProfileDoesNotExist"] = "PROFILE_DOES_NOT_EXIST";
  DecryptFailReason["UnauthorizedAddress"] = "UNAUTHORIZED_ADDRESS";
  DecryptFailReason["UnauthorizedBalance"] = "UNAUTHORIZED_BALANCE";
})(DecryptFailReason || (DecryptFailReason = {}));
/** The gated publication encryption provider */
var EncryptionProvider;
(function (EncryptionProvider) {
  EncryptionProvider["LitProtocol"] = "LIT_PROTOCOL";
})(EncryptionProvider || (EncryptionProvider = {}));
/** The feed event item filter types */
var FeedEventItemType;
(function (FeedEventItemType) {
  FeedEventItemType["CollectComment"] = "COLLECT_COMMENT";
  FeedEventItemType["CollectPost"] = "COLLECT_POST";
  FeedEventItemType["Comment"] = "COMMENT";
  FeedEventItemType["Mirror"] = "MIRROR";
  FeedEventItemType["Post"] = "POST";
  FeedEventItemType["ReactionComment"] = "REACTION_COMMENT";
  FeedEventItemType["ReactionPost"] = "REACTION_POST";
})(FeedEventItemType || (FeedEventItemType = {}));
/** The follow module types */
var FollowModules;
(function (FollowModules) {
  FollowModules["FeeFollowModule"] = "FeeFollowModule";
  FollowModules["ProfileFollowModule"] = "ProfileFollowModule";
  FollowModules["RevertFollowModule"] = "RevertFollowModule";
  FollowModules["UnknownFollowModule"] = "UnknownFollowModule";
})(FollowModules || (FollowModules = {}));
/** The verify webhook result status type */
var IdKitPhoneVerifyWebhookResultStatusType;
(function (IdKitPhoneVerifyWebhookResultStatusType) {
  IdKitPhoneVerifyWebhookResultStatusType["AlreadyVerified"] = "ALREADY_VERIFIED";
  IdKitPhoneVerifyWebhookResultStatusType["Success"] = "SUCCESS";
})(IdKitPhoneVerifyWebhookResultStatusType || (IdKitPhoneVerifyWebhookResultStatusType = {}));
/** The momka validator error */
var MomokaValidatorError;
(function (MomokaValidatorError) {
  MomokaValidatorError["BlockCantBeReadFromNode"] = "BLOCK_CANT_BE_READ_FROM_NODE";
  MomokaValidatorError["BlockTooFar"] = "BLOCK_TOO_FAR";
  MomokaValidatorError["CanNotConnectToBundlr"] = "CAN_NOT_CONNECT_TO_BUNDLR";
  MomokaValidatorError["ChainSignatureAlreadyUsed"] = "CHAIN_SIGNATURE_ALREADY_USED";
  MomokaValidatorError["DataCantBeReadFromNode"] = "DATA_CANT_BE_READ_FROM_NODE";
  MomokaValidatorError["EventMismatch"] = "EVENT_MISMATCH";
  MomokaValidatorError["GeneratedPublicationIdMismatch"] = "GENERATED_PUBLICATION_ID_MISMATCH";
  MomokaValidatorError["InvalidEventTimestamp"] = "INVALID_EVENT_TIMESTAMP";
  MomokaValidatorError["InvalidFormattedTypedData"] = "INVALID_FORMATTED_TYPED_DATA";
  MomokaValidatorError["InvalidPointerSetNotNeeded"] = "INVALID_POINTER_SET_NOT_NEEDED";
  MomokaValidatorError["InvalidSignatureSubmitter"] = "INVALID_SIGNATURE_SUBMITTER";
  MomokaValidatorError["InvalidTxId"] = "INVALID_TX_ID";
  MomokaValidatorError["InvalidTypedDataDeadlineTimestamp"] = "INVALID_TYPED_DATA_DEADLINE_TIMESTAMP";
  MomokaValidatorError["NotClosestBlock"] = "NOT_CLOSEST_BLOCK";
  MomokaValidatorError["NoSignatureSubmitter"] = "NO_SIGNATURE_SUBMITTER";
  MomokaValidatorError["PointerFailedVerification"] = "POINTER_FAILED_VERIFICATION";
  MomokaValidatorError["PotentialReorg"] = "POTENTIAL_REORG";
  MomokaValidatorError["PublicationNonceInvalid"] = "PUBLICATION_NONCE_INVALID";
  MomokaValidatorError["PublicationNoneDa"] = "PUBLICATION_NONE_DA";
  MomokaValidatorError["PublicationNoPointer"] = "PUBLICATION_NO_POINTER";
  MomokaValidatorError["PublicationSignerNotAllowed"] = "PUBLICATION_SIGNER_NOT_ALLOWED";
  MomokaValidatorError["SimulationFailed"] = "SIMULATION_FAILED";
  MomokaValidatorError["SimulationNodeCouldNotRun"] = "SIMULATION_NODE_COULD_NOT_RUN";
  MomokaValidatorError["TimestampProofInvalidDaId"] = "TIMESTAMP_PROOF_INVALID_DA_ID";
  MomokaValidatorError["TimestampProofInvalidSignature"] = "TIMESTAMP_PROOF_INVALID_SIGNATURE";
  MomokaValidatorError["TimestampProofInvalidType"] = "TIMESTAMP_PROOF_INVALID_TYPE";
  MomokaValidatorError["TimestampProofNotSubmitter"] = "TIMESTAMP_PROOF_NOT_SUBMITTER";
  MomokaValidatorError["Unknown"] = "UNKNOWN";
})(MomokaValidatorError || (MomokaValidatorError = {}));
/** The notification filter types */
var NotificationTypes;
(function (NotificationTypes) {
  NotificationTypes["CollectedComment"] = "COLLECTED_COMMENT";
  NotificationTypes["CollectedPost"] = "COLLECTED_POST";
  NotificationTypes["CommentedComment"] = "COMMENTED_COMMENT";
  NotificationTypes["CommentedPost"] = "COMMENTED_POST";
  NotificationTypes["Followed"] = "FOLLOWED";
  NotificationTypes["MentionComment"] = "MENTION_COMMENT";
  NotificationTypes["MentionPost"] = "MENTION_POST";
  NotificationTypes["MirroredComment"] = "MIRRORED_COMMENT";
  NotificationTypes["MirroredPost"] = "MIRRORED_POST";
  NotificationTypes["ReactionComment"] = "REACTION_COMMENT";
  NotificationTypes["ReactionPost"] = "REACTION_POST";
})(NotificationTypes || (NotificationTypes = {}));
/** profile sort criteria */
var ProfileSortCriteria;

/** The Profile Stats */
(function (ProfileSortCriteria) {
  ProfileSortCriteria["CreatedOn"] = "CREATED_ON";
  ProfileSortCriteria["LatestCreated"] = "LATEST_CREATED";
  ProfileSortCriteria["MostCollects"] = "MOST_COLLECTS";
  ProfileSortCriteria["MostComments"] = "MOST_COMMENTS";
  ProfileSortCriteria["MostFollowers"] = "MOST_FOLLOWERS";
  ProfileSortCriteria["MostMirrors"] = "MOST_MIRRORS";
  ProfileSortCriteria["MostPosts"] = "MOST_POSTS";
  ProfileSortCriteria["MostPublication"] = "MOST_PUBLICATION";
})(ProfileSortCriteria || (ProfileSortCriteria = {}));
/** The proxy action status */
var ProxyActionStatusTypes;
(function (ProxyActionStatusTypes) {
  ProxyActionStatusTypes["Complete"] = "COMPLETE";
  ProxyActionStatusTypes["Minting"] = "MINTING";
  ProxyActionStatusTypes["Transferring"] = "TRANSFERRING";
})(ProxyActionStatusTypes || (ProxyActionStatusTypes = {}));
/** The publication content warning */
var PublicationContentWarning;
(function (PublicationContentWarning) {
  PublicationContentWarning["Nsfw"] = "NSFW";
  PublicationContentWarning["Sensitive"] = "SENSITIVE";
  PublicationContentWarning["Spoiler"] = "SPOILER";
})(PublicationContentWarning || (PublicationContentWarning = {}));
/** The publication main focus */
var PublicationMainFocus;

/** The source of the media */
(function (PublicationMainFocus) {
  PublicationMainFocus["Article"] = "ARTICLE";
  PublicationMainFocus["Audio"] = "AUDIO";
  PublicationMainFocus["Embed"] = "EMBED";
  PublicationMainFocus["Image"] = "IMAGE";
  PublicationMainFocus["Link"] = "LINK";
  PublicationMainFocus["TextOnly"] = "TEXT_ONLY";
  PublicationMainFocus["Video"] = "VIDEO";
})(PublicationMainFocus || (PublicationMainFocus = {}));
var PublicationMediaSource;

/** Publication metadata content warning filters */
(function (PublicationMediaSource) {
  PublicationMediaSource["Lens"] = "LENS";
})(PublicationMediaSource || (PublicationMediaSource = {}));
/** The publication metadata display types */
var PublicationMetadataDisplayTypes;

/** Publication metadata filters */
(function (PublicationMetadataDisplayTypes) {
  PublicationMetadataDisplayTypes["Date"] = "date";
  PublicationMetadataDisplayTypes["Number"] = "number";
  PublicationMetadataDisplayTypes["String"] = "string";
})(PublicationMetadataDisplayTypes || (PublicationMetadataDisplayTypes = {}));
/** publication metadata status type */
var PublicationMetadataStatusType;

/** Publication metadata tag filter */
(function (PublicationMetadataStatusType) {
  PublicationMetadataStatusType["MetadataValidationFailed"] = "METADATA_VALIDATION_FAILED";
  PublicationMetadataStatusType["NotFound"] = "NOT_FOUND";
  PublicationMetadataStatusType["Pending"] = "PENDING";
  PublicationMetadataStatusType["Success"] = "SUCCESS";
})(PublicationMetadataStatusType || (PublicationMetadataStatusType = {}));
/** Publication reporting fraud subreason */
var PublicationReportingFraudSubreason;

/** Publication reporting illegal subreason */
(function (PublicationReportingFraudSubreason) {
  PublicationReportingFraudSubreason["Impersonation"] = "IMPERSONATION";
  PublicationReportingFraudSubreason["Scam"] = "SCAM";
})(PublicationReportingFraudSubreason || (PublicationReportingFraudSubreason = {}));
var PublicationReportingIllegalSubreason;

/** Publication reporting reason */
(function (PublicationReportingIllegalSubreason) {
  PublicationReportingIllegalSubreason["AnimalAbuse"] = "ANIMAL_ABUSE";
  PublicationReportingIllegalSubreason["DirectThreat"] = "DIRECT_THREAT";
  PublicationReportingIllegalSubreason["HumanAbuse"] = "HUMAN_ABUSE";
  PublicationReportingIllegalSubreason["ThreatIndividual"] = "THREAT_INDIVIDUAL";
  PublicationReportingIllegalSubreason["Violence"] = "VIOLENCE";
})(PublicationReportingIllegalSubreason || (PublicationReportingIllegalSubreason = {}));
var PublicationReportingReason;

/** Publication reporting sensitive subreason */
(function (PublicationReportingReason) {
  PublicationReportingReason["Fraud"] = "FRAUD";
  PublicationReportingReason["Illegal"] = "ILLEGAL";
  PublicationReportingReason["Sensitive"] = "SENSITIVE";
  PublicationReportingReason["Spam"] = "SPAM";
})(PublicationReportingReason || (PublicationReportingReason = {}));
var PublicationReportingSensitiveSubreason;

/** Publication reporting spam subreason */
(function (PublicationReportingSensitiveSubreason) {
  PublicationReportingSensitiveSubreason["Nsfw"] = "NSFW";
  PublicationReportingSensitiveSubreason["Offensive"] = "OFFENSIVE";
})(PublicationReportingSensitiveSubreason || (PublicationReportingSensitiveSubreason = {}));
var PublicationReportingSpamSubreason;

/** The social comment */
(function (PublicationReportingSpamSubreason) {
  PublicationReportingSpamSubreason["FakeEngagement"] = "FAKE_ENGAGEMENT";
  PublicationReportingSpamSubreason["LowSignal"] = "LOW_SIGNAL";
  PublicationReportingSpamSubreason["ManipulationAlgo"] = "MANIPULATION_ALGO";
  PublicationReportingSpamSubreason["Misleading"] = "MISLEADING";
  PublicationReportingSpamSubreason["MisuseHashtags"] = "MISUSE_HASHTAGS";
  PublicationReportingSpamSubreason["Repetitive"] = "REPETITIVE";
  PublicationReportingSpamSubreason["SomethingElse"] = "SOMETHING_ELSE";
  PublicationReportingSpamSubreason["Unrelated"] = "UNRELATED";
})(PublicationReportingSpamSubreason || (PublicationReportingSpamSubreason = {}));
/** Publication sort criteria */
var PublicationSortCriteria;

/** The publication stats */
(function (PublicationSortCriteria) {
  PublicationSortCriteria["CuratedProfiles"] = "CURATED_PROFILES";
  PublicationSortCriteria["Latest"] = "LATEST";
  PublicationSortCriteria["TopCollected"] = "TOP_COLLECTED";
  PublicationSortCriteria["TopCommented"] = "TOP_COMMENTED";
  PublicationSortCriteria["TopMirrored"] = "TOP_MIRRORED";
})(PublicationSortCriteria || (PublicationSortCriteria = {}));
/** The publication types */
var PublicationTypes;
(function (PublicationTypes) {
  PublicationTypes["Comment"] = "COMMENT";
  PublicationTypes["Mirror"] = "MIRROR";
  PublicationTypes["Post"] = "POST";
})(PublicationTypes || (PublicationTypes = {}));
/** Reaction types */
var ReactionTypes;
(function (ReactionTypes) {
  ReactionTypes["Downvote"] = "DOWNVOTE";
  ReactionTypes["Upvote"] = "UPVOTE";
})(ReactionTypes || (ReactionTypes = {}));
/** The reference module types */
var ReferenceModules;

/** The refresh request */
(function (ReferenceModules) {
  ReferenceModules["DegreesOfSeparationReferenceModule"] = "DegreesOfSeparationReferenceModule";
  ReferenceModules["FollowerOnlyReferenceModule"] = "FollowerOnlyReferenceModule";
  ReferenceModules["UnknownReferenceModule"] = "UnknownReferenceModule";
})(ReferenceModules || (ReferenceModules = {}));
/** Relay error reason */
var RelayErrorReasons;

/** The  */
(function (RelayErrorReasons) {
  RelayErrorReasons["Expired"] = "EXPIRED";
  RelayErrorReasons["HandleTaken"] = "HANDLE_TAKEN";
  RelayErrorReasons["NotAllowed"] = "NOT_ALLOWED";
  RelayErrorReasons["Rejected"] = "REJECTED";
  RelayErrorReasons["WrongWalletSigned"] = "WRONG_WALLET_SIGNED";
})(RelayErrorReasons || (RelayErrorReasons = {}));
/** The relay role key */
var RelayRoleKey;

/** The relayer result */
(function (RelayRoleKey) {
  RelayRoleKey["CreateProfile"] = "CREATE_PROFILE";
  RelayRoleKey["Dispatcher_1"] = "DISPATCHER_1";
  RelayRoleKey["Dispatcher_2"] = "DISPATCHER_2";
  RelayRoleKey["Dispatcher_3"] = "DISPATCHER_3";
  RelayRoleKey["Dispatcher_4"] = "DISPATCHER_4";
  RelayRoleKey["Dispatcher_5"] = "DISPATCHER_5";
  RelayRoleKey["Dispatcher_6"] = "DISPATCHER_6";
  RelayRoleKey["Dispatcher_7"] = "DISPATCHER_7";
  RelayRoleKey["Dispatcher_8"] = "DISPATCHER_8";
  RelayRoleKey["Dispatcher_9"] = "DISPATCHER_9";
  RelayRoleKey["Dispatcher_10"] = "DISPATCHER_10";
  RelayRoleKey["ProxyActionCollect_1"] = "PROXY_ACTION_COLLECT_1";
  RelayRoleKey["ProxyActionCollect_2"] = "PROXY_ACTION_COLLECT_2";
  RelayRoleKey["ProxyActionCollect_3"] = "PROXY_ACTION_COLLECT_3";
  RelayRoleKey["ProxyActionCollect_4"] = "PROXY_ACTION_COLLECT_4";
  RelayRoleKey["ProxyActionCollect_5"] = "PROXY_ACTION_COLLECT_5";
  RelayRoleKey["ProxyActionCollect_6"] = "PROXY_ACTION_COLLECT_6";
  RelayRoleKey["ProxyActionFollow_1"] = "PROXY_ACTION_FOLLOW_1";
  RelayRoleKey["ProxyActionFollow_2"] = "PROXY_ACTION_FOLLOW_2";
  RelayRoleKey["ProxyActionFollow_3"] = "PROXY_ACTION_FOLLOW_3";
  RelayRoleKey["ProxyActionFollow_4"] = "PROXY_ACTION_FOLLOW_4";
  RelayRoleKey["ProxyActionFollow_5"] = "PROXY_ACTION_FOLLOW_5";
  RelayRoleKey["ProxyActionFollow_6"] = "PROXY_ACTION_FOLLOW_6";
  RelayRoleKey["ProxyActionFollow_7"] = "PROXY_ACTION_FOLLOW_7";
  RelayRoleKey["ProxyActionFollow_8"] = "PROXY_ACTION_FOLLOW_8";
  RelayRoleKey["ProxyActionFollow_9"] = "PROXY_ACTION_FOLLOW_9";
  RelayRoleKey["ProxyActionFollow_10"] = "PROXY_ACTION_FOLLOW_10";
  RelayRoleKey["WithSig_1"] = "WITH_SIG_1";
  RelayRoleKey["WithSig_2"] = "WITH_SIG_2";
  RelayRoleKey["WithSig_3"] = "WITH_SIG_3";
})(RelayRoleKey || (RelayRoleKey = {}));
/** The gated publication access criteria scalar operators */
var ScalarOperator;
(function (ScalarOperator) {
  ScalarOperator["Equal"] = "EQUAL";
  ScalarOperator["GreaterThan"] = "GREATER_THAN";
  ScalarOperator["GreaterThanOrEqual"] = "GREATER_THAN_OR_EQUAL";
  ScalarOperator["LessThan"] = "LESS_THAN";
  ScalarOperator["LessThanOrEqual"] = "LESS_THAN_OR_EQUAL";
  ScalarOperator["NotEqual"] = "NOT_EQUAL";
})(ScalarOperator || (ScalarOperator = {}));
/** Search request types */
var SearchRequestTypes;
(function (SearchRequestTypes) {
  SearchRequestTypes["Profile"] = "PROFILE";
  SearchRequestTypes["Publication"] = "PUBLICATION";
})(SearchRequestTypes || (SearchRequestTypes = {}));
/** The publications tags sort criteria */
var TagSortCriteria;
(function (TagSortCriteria) {
  TagSortCriteria["Alphabetical"] = "ALPHABETICAL";
  TagSortCriteria["MostPopular"] = "MOST_POPULAR";
})(TagSortCriteria || (TagSortCriteria = {}));
/** Transaction error reason */
var TransactionErrorReasons;
(function (TransactionErrorReasons) {
  TransactionErrorReasons["Reverted"] = "REVERTED";
})(TransactionErrorReasons || (TransactionErrorReasons = {}));
/** The worldcoin signal type */
var WorldcoinPhoneVerifyType;
(function (WorldcoinPhoneVerifyType) {
  WorldcoinPhoneVerifyType["Orb"] = "ORB";
  WorldcoinPhoneVerifyType["Phone"] = "PHONE";
})(WorldcoinPhoneVerifyType || (WorldcoinPhoneVerifyType = {}));

var _templateObject$6, _templateObject2$6, _templateObject3$4, _templateObject4$4, _templateObject5$3;
var ProxyActionStatusResultFragmentDoc = gql(_templateObject$6 || (_templateObject$6 = _taggedTemplateLiteral(["\n    fragment ProxyActionStatusResult on ProxyActionStatusResult {\n  __typename\n  txHash\n  txId\n  status\n}\n    "])));
var ProxyActionErrorFragmentDoc = gql(_templateObject2$6 || (_templateObject2$6 = _taggedTemplateLiteral(["\n    fragment ProxyActionError on ProxyActionError {\n  __typename\n  reason\n  lastKnownTxId\n}\n    "])));
var ProxyActionQueuedFragmentDoc = gql(_templateObject3$4 || (_templateObject3$4 = _taggedTemplateLiteral(["\n    fragment ProxyActionQueued on ProxyActionQueued {\n  __typename\n  queuedAt\n}\n    "])));
var ProxyActionStatusDocument = gql(_templateObject4$4 || (_templateObject4$4 = _taggedTemplateLiteral(["\n    query ProxyActionStatus($proxyActionId: ProxyActionId!) {\n  result: proxyActionStatus(proxyActionId: $proxyActionId) {\n    ... on ProxyActionStatusResult {\n      ...ProxyActionStatusResult\n    }\n    ... on ProxyActionError {\n      ...ProxyActionError\n    }\n    ... on ProxyActionQueued {\n      ...ProxyActionQueued\n    }\n  }\n}\n    ", "\n", "\n", ""])), ProxyActionStatusResultFragmentDoc, ProxyActionErrorFragmentDoc, ProxyActionQueuedFragmentDoc);
var ProxyActionDocument = gql(_templateObject5$3 || (_templateObject5$3 = _taggedTemplateLiteral(["\n    mutation ProxyAction($request: ProxyActionRequest!) {\n  result: proxyAction(request: $request)\n}\n    "])));
var defaultWrapper$6 = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var ProxyActionStatusDocumentString = print(ProxyActionStatusDocument);
var ProxyActionDocumentString = print(ProxyActionDocument);
function getSdk$6(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$6;
  return {
    ProxyActionStatus: function ProxyActionStatus(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ProxyActionStatusDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ProxyActionStatus', 'query');
    },
    ProxyAction: function ProxyAction(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ProxyActionDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ProxyAction', 'mutation');
    }
  };
}

/**
 * Check if the result is a {@link ProxyActionErrorFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link ProxyActionErrorFragment}
 */
function isProxyActionError(result) {
  return result.__typename === 'ProxyActionError';
}

/**
 * Check if the result is a {@link ProxyActionQueuedFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link ProxyActionQueuedFragment}
 */
function isProxyActionQueued(result) {
  return result.__typename === 'ProxyActionQueued';
}

/**
 * Check if the result is a {@link ProxyActionStatusResultFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link ProxyActionStatusResultFragment}
 */
function isProxyActionStatusResult(result) {
  return result.__typename === 'ProxyActionStatusResult';
}

var StatusPollingError = /*#__PURE__*/function (_Error) {
  _inherits(StatusPollingError, _Error);
  var _super = _createSuper(StatusPollingError);
  function StatusPollingError() {
    var _this;
    _classCallCheck(this, StatusPollingError);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "name", 'StatusPollingError');
    _defineProperty(_assertThisInitialized(_this), "message", 'Max attempts exceeded');
    return _this;
  }
  return _createClass(StatusPollingError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 * ProxyAction enables signless follow and collect actions.
 *
 * @remarks
 *
 * ProxyAction enables actions like follow and collect
 * to be signless. This only works if the modules assigned
 * to those actions are free and have no cost to them.
 *
 * @group LensClient Modules
 */
var ProxyAction = /*#__PURE__*/function () {
  function ProxyAction(config, authentication) {
    _classCallCheck(this, ProxyAction);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$6(client);
    this.authentication = authentication;
  }

  /**
   * Follow a profile.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param profileId - profile id to follow
   * @returns {@link PromiseResult} with a proxyActionId
   *
   * @example
   * ```ts
   * const result = await client.proxyAction.freeFollow('0x123');
   * ```
   */
  _createClass(ProxyAction, [{
    key: "freeFollow",
    value: function () {
      var _freeFollow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(profileId) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _this2.sdk.ProxyAction({
                          request: {
                            follow: {
                              freeFollow: {
                                profileId: profileId
                              }
                            }
                          }
                        }, headers);
                      case 2:
                        result = _context.sent;
                        return _context.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function freeFollow(_x) {
        return _freeFollow.apply(this, arguments);
      }
      return freeFollow;
    }()
    /**
     * Collect a publication.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param publicationId - publication id to collect
     * @returns {@link PromiseResult} with a proxyActionId
     *
     * @example
     * ```ts
     * const result = await client.proxyAction.freeCollect('0x123-0x456');
     * ```
     */
  }, {
    key: "freeCollect",
    value: function () {
      var _freeCollect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(publicationId) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _this3.sdk.ProxyAction({
                          request: {
                            collect: {
                              freeCollect: {
                                publicationId: publicationId
                              }
                            }
                          }
                        }, headers);
                      case 2:
                        result = _context3.sent;
                        return _context3.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function freeCollect(_x3) {
        return _freeCollect.apply(this, arguments);
      }
      return freeCollect;
    }()
    /**
     * Check the status of a proxy action.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param proxyActionId - proxy action id to check
     * @returns {@link PromiseResult} with a {@link ProxyActionStatusResultFragment} or {@link ProxyActionErrorFragment} or {@link ProxyActionQueuedFragment}
     *
     * @example
     * ```ts
     * const result = await client.proxyAction.checkStatus(proxyActionId);
     * ```
     */
  }, {
    key: "checkStatus",
    value: function () {
      var _checkStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(proxyActionId) {
        var _this4 = this;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _this4.sdk.ProxyActionStatus({
                          proxyActionId: proxyActionId
                        }, headers);
                      case 2:
                        result = _context5.sent;
                        return _context5.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x6) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function checkStatus(_x5) {
        return _checkStatus.apply(this, arguments);
      }
      return checkStatus;
    }()
    /**
     * Wait for a proxy action to complete.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param proxyActionId - proxy action id to wait for
     * @returns {@link PromiseResult} with a {@link ProxyActionStatusResultFragment} or {@link ProxyActionErrorFragment} or {@link ProxyActionQueuedFragment}
     *
     * @example
     * ```ts
     * const result = await client.proxyAction.waitForStatusComplete(proxyActionId);
     * ```
     */
  }, {
    key: "waitForStatusComplete",
    value: function () {
      var _waitForStatusComplete = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(proxyActionId) {
        var _this5 = this;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", poll({
                fn: function fn() {
                  return _this5.checkStatus(proxyActionId);
                },
                validate: function validate(result) {
                  if (result.isSuccess()) {
                    var value = result.value;
                    if (isProxyActionStatusResult(value)) {
                      return value.status === ProxyActionStatusTypes.Complete;
                    }
                  }
                  // in any not positive scenario, return true to resolve the polling with the Result
                  return true;
                },
                onMaxAttempts: function onMaxAttempts() {
                  return new StatusPollingError();
                }
              }));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function waitForStatusComplete(_x7) {
        return _waitForStatusComplete.apply(this, arguments);
      }
      return waitForStatusComplete;
    }()
  }]);
  return ProxyAction;
}();

var _templateObject$5, _templateObject2$5, _templateObject3$3, _templateObject4$3, _templateObject5$2, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31;
var PublicationStatsFragmentDoc = gql(_templateObject$5 || (_templateObject$5 = _taggedTemplateLiteral(["\n    fragment PublicationStats on PublicationStats {\n  __typename\n  totalAmountOfMirrors\n  totalAmountOfCollects\n  totalAmountOfComments\n  totalUpvotes\n  totalDownvotes\n  commentsTotal(forSources: $sources)\n}\n    "])));
var MediaOutputFragmentDoc = gql(_templateObject2$5 || (_templateObject2$5 = _taggedTemplateLiteral(["\n    fragment MediaOutput on MediaOutput {\n  altTag\n  cover\n  item\n  source\n  type\n}\n    "])));
var PublicMediaResultsFragmentDoc = gql(_templateObject3$3 || (_templateObject3$3 = _taggedTemplateLiteral(["\n    fragment PublicMediaResults on PublicMediaResults {\n  media {\n    ...MediaOutput\n  }\n  signedUrl\n}\n    ", ""])), MediaOutputFragmentDoc);
var CreatePostTypedDataFragmentDoc = gql(_templateObject4$3 || (_templateObject4$3 = _taggedTemplateLiteral(["\n    fragment CreatePostTypedData on CreatePostBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      PostWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      ...EIP712TypedDataDomain\n    }\n    value {\n      nonce\n      deadline\n      profileId\n      contentURI\n      collectModule\n      collectModuleInitData\n      referenceModule\n      referenceModuleInitData\n    }\n  }\n}\n    ", ""])), Eip712TypedDataDomainFragmentDoc);
var CreateCommentTypedDataFragmentDoc = gql(_templateObject5$2 || (_templateObject5$2 = _taggedTemplateLiteral(["\n    fragment CreateCommentTypedData on CreateCommentBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      CommentWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      ...EIP712TypedDataDomain\n    }\n    value {\n      nonce\n      deadline\n      profileId\n      contentURI\n      profileIdPointed\n      pubIdPointed\n      collectModule\n      collectModuleInitData\n      referenceModuleData\n      referenceModule\n      referenceModuleInitData\n    }\n  }\n}\n    ", ""])), Eip712TypedDataDomainFragmentDoc);
var CreateMirrorTypedDataFragmentDoc = gql(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n    fragment CreateMirrorTypedData on CreateMirrorBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      MirrorWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      ...EIP712TypedDataDomain\n    }\n    value {\n      nonce\n      deadline\n      profileId\n      profileIdPointed\n      pubIdPointed\n      referenceModuleData\n      referenceModule\n      referenceModuleInitData\n    }\n  }\n}\n    ", ""])), Eip712TypedDataDomainFragmentDoc);
var CreateCollectTypedDataFragmentDoc = gql(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    fragment CreateCollectTypedData on CreateCollectBroadcastItemResult {\n  id\n  expiresAt\n  typedData {\n    types {\n      CollectWithSig {\n        name\n        type\n      }\n    }\n    domain {\n      ...EIP712TypedDataDomain\n    }\n    value {\n      nonce\n      deadline\n      profileId\n      pubId\n      data\n    }\n  }\n}\n    ", ""])), Eip712TypedDataDomainFragmentDoc);
var PublicationDocument = gql(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n    query Publication($request: PublicationQueryRequest!, $observerId: ProfileId) {\n  result: publication(request: $request) {\n    ... on Post {\n      ...Post\n      reaction(request: {profileId: $observerId})\n    }\n    ... on Mirror {\n      ...Mirror\n      reaction(request: {profileId: $observerId})\n    }\n    ... on Comment {\n      ...Comment\n      reaction(request: {profileId: $observerId})\n    }\n  }\n}\n    ", "\n", "\n", ""])), PostFragmentDoc, MirrorFragmentDoc, CommentFragmentDoc);
var PublicationStatsDocument = gql(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n    query PublicationStats($request: PublicationQueryRequest!, $sources: [Sources!]!) {\n  result: publication(request: $request) {\n    ... on Post {\n      stats {\n        ...PublicationStats\n      }\n    }\n    ... on Mirror {\n      stats {\n        ...PublicationStats\n      }\n    }\n    ... on Comment {\n      stats {\n        ...PublicationStats\n      }\n    }\n  }\n}\n    ", ""])), PublicationStatsFragmentDoc);
var PublicationsDocument = gql(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n    query Publications($request: PublicationsQueryRequest!, $observerId: ProfileId) {\n  result: publications(request: $request) {\n    items {\n      ... on Post {\n        ...Post\n      }\n      ... on Mirror {\n        ...Mirror\n      }\n      ... on Comment {\n        ...Comment\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), PostFragmentDoc, MirrorFragmentDoc, CommentFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var PastPublicationsCreatedDocument = gql(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n    query PastPublicationsCreated($request: PublicationsQueryRequest!) {\n  result: publications(request: $request) {\n    items {\n      ... on Post {\n        createdAt\n      }\n      ... on Mirror {\n        createdAt\n      }\n      ... on Comment {\n        createdAt\n      }\n    }\n  }\n}\n    "])));
var ValidatePublicationMetadataDocument = gql(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n    query ValidatePublicationMetadata($metadata: PublicationMetadataV2Input!) {\n  validatePublicationMetadata(request: {metadatav2: $metadata}) {\n    __typename\n    valid\n    reason\n  }\n}\n    "])));
var WhoCollectedPublicationDocument = gql(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n    query WhoCollectedPublication($request: WhoCollectedPublicationRequest!, $observerId: ProfileId) {\n  result: whoCollectedPublication(request: $request) {\n    items {\n      ...Wallet\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), WalletFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var ProfilePublicationsForSaleDocument = gql(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n    query ProfilePublicationsForSale($request: ProfilePublicationsForSaleRequest!, $observerId: ProfileId) {\n  result: profilePublicationsForSale(request: $request) {\n    items {\n      ... on Post {\n        ...Post\n      }\n      ... on Comment {\n        ...Comment\n      }\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", "\n", ""])), PostFragmentDoc, CommentFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var PublicationMetadataStatusDocument = gql(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n    query PublicationMetadataStatus($request: GetPublicationMetadataStatusRequest!) {\n  result: publicationMetadataStatus(request: $request) {\n    __typename\n    reason\n    status\n  }\n}\n    "])));
var CreatePostTypedDataDocument = gql(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n    mutation CreatePostTypedData($request: CreatePublicPostRequest!, $options: TypedDataOptions) {\n  result: createPostTypedData(request: $request, options: $options) {\n    ...CreatePostTypedData\n  }\n}\n    ", ""])), CreatePostTypedDataFragmentDoc);
var CreatePostViaDispatcherDocument = gql(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["\n    mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {\n  result: createPostViaDispatcher(request: $request) {\n    ... on RelayerResult {\n      ...RelayerResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), RelayerResultFragmentDoc, RelayErrorFragmentDoc);
var CreateCommentTypedDataDocument = gql(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["\n    mutation CreateCommentTypedData($request: CreatePublicCommentRequest!, $options: TypedDataOptions) {\n  result: createCommentTypedData(request: $request, options: $options) {\n    ...CreateCommentTypedData\n  }\n}\n    ", ""])), CreateCommentTypedDataFragmentDoc);
var CreateCommentViaDispatcherDocument = gql(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["\n    mutation CreateCommentViaDispatcher($request: CreatePublicCommentRequest!) {\n  result: createCommentViaDispatcher(request: $request) {\n    ... on RelayerResult {\n      ...RelayerResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), RelayerResultFragmentDoc, RelayErrorFragmentDoc);
var CreateMirrorTypedDataDocument = gql(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["\n    mutation CreateMirrorTypedData($request: CreateMirrorRequest!, $options: TypedDataOptions) {\n  result: createMirrorTypedData(request: $request, options: $options) {\n    ...CreateMirrorTypedData\n  }\n}\n    ", ""])), CreateMirrorTypedDataFragmentDoc);
var CreateMirrorViaDispatcherDocument = gql(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["\n    mutation CreateMirrorViaDispatcher($request: CreateMirrorRequest!) {\n  result: createMirrorViaDispatcher(request: $request) {\n    ... on RelayerResult {\n      ...RelayerResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), RelayerResultFragmentDoc, RelayErrorFragmentDoc);
var CreateCollectTypedDataDocument = gql(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["\n    mutation CreateCollectTypedData($request: CreateCollectRequest!, $options: TypedDataOptions) {\n  result: createCollectTypedData(request: $request, options: $options) {\n    ...CreateCollectTypedData\n  }\n}\n    ", ""])), CreateCollectTypedDataFragmentDoc);
var CreateAttachMediaDataDocument = gql(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["\n    mutation CreateAttachMediaData($request: PublicMediaRequest!) {\n  result: createAttachMediaData(request: $request) {\n    ...PublicMediaResults\n  }\n}\n    ", ""])), PublicMediaResultsFragmentDoc);
var HidePublicationDocument = gql(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["\n    mutation HidePublication($request: HidePublicationRequest!) {\n  hidePublication(request: $request)\n}\n    "])));
var ReportPublicationDocument = gql(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["\n    mutation ReportPublication($request: ReportPublicationRequest!) {\n  reportPublication(request: $request)\n}\n    "])));
var CreateDataAvailabilityPostTypedDataDocument = gql(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["\n    mutation CreateDataAvailabilityPostTypedData($request: CreateDataAvailabilityPostRequest!) {\n  result: createDataAvailabilityPostTypedData(request: $request) {\n    ...CreatePostTypedData\n  }\n}\n    ", ""])), CreatePostTypedDataFragmentDoc);
var CreateDataAvailabilityPostViaDispatcherDocument = gql(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["\n    mutation CreateDataAvailabilityPostViaDispatcher($request: CreateDataAvailabilityPostRequest!) {\n  result: createDataAvailabilityPostViaDispatcher(request: $request) {\n    ... on CreateDataAvailabilityPublicationResult {\n      ...CreateDataAvailabilityPublicationResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), CreateDataAvailabilityPublicationResultFragmentDoc, RelayErrorFragmentDoc);
var CreateDataAvailabilityCommentTypedDataDocument = gql(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["\n    mutation CreateDataAvailabilityCommentTypedData($request: CreateDataAvailabilityCommentRequest!) {\n  result: createDataAvailabilityCommentTypedData(request: $request) {\n    ...CreateCommentTypedData\n  }\n}\n    ", ""])), CreateCommentTypedDataFragmentDoc);
var CreateDataAvailabilityCommentViaDispatcherDocument = gql(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["\n    mutation CreateDataAvailabilityCommentViaDispatcher($request: CreateDataAvailabilityCommentRequest!) {\n  result: createDataAvailabilityCommentViaDispatcher(request: $request) {\n    ... on CreateDataAvailabilityPublicationResult {\n      ...CreateDataAvailabilityPublicationResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), CreateDataAvailabilityPublicationResultFragmentDoc, RelayErrorFragmentDoc);
var CreateDataAvailabilityMirrorTypedDataDocument = gql(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["\n    mutation CreateDataAvailabilityMirrorTypedData($request: CreateDataAvailabilityMirrorRequest!) {\n  result: createDataAvailabilityMirrorTypedData(request: $request) {\n    ...CreateMirrorTypedData\n  }\n}\n    ", ""])), CreateMirrorTypedDataFragmentDoc);
var CreateDataAvailabilityMirrorViaDispatcherDocument = gql(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["\n    mutation CreateDataAvailabilityMirrorViaDispatcher($request: CreateDataAvailabilityMirrorRequest!) {\n  result: createDataAvailabilityMirrorViaDispatcher(request: $request) {\n    ... on CreateDataAvailabilityPublicationResult {\n      ...CreateDataAvailabilityPublicationResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), CreateDataAvailabilityPublicationResultFragmentDoc, RelayErrorFragmentDoc);
var defaultWrapper$5 = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var PublicationDocumentString = print(PublicationDocument);
var PublicationStatsDocumentString = print(PublicationStatsDocument);
var PublicationsDocumentString = print(PublicationsDocument);
var PastPublicationsCreatedDocumentString = print(PastPublicationsCreatedDocument);
var ValidatePublicationMetadataDocumentString = print(ValidatePublicationMetadataDocument);
var WhoCollectedPublicationDocumentString = print(WhoCollectedPublicationDocument);
var ProfilePublicationsForSaleDocumentString = print(ProfilePublicationsForSaleDocument);
var PublicationMetadataStatusDocumentString = print(PublicationMetadataStatusDocument);
var CreatePostTypedDataDocumentString = print(CreatePostTypedDataDocument);
var CreatePostViaDispatcherDocumentString = print(CreatePostViaDispatcherDocument);
var CreateCommentTypedDataDocumentString = print(CreateCommentTypedDataDocument);
var CreateCommentViaDispatcherDocumentString = print(CreateCommentViaDispatcherDocument);
var CreateMirrorTypedDataDocumentString = print(CreateMirrorTypedDataDocument);
var CreateMirrorViaDispatcherDocumentString = print(CreateMirrorViaDispatcherDocument);
var CreateCollectTypedDataDocumentString = print(CreateCollectTypedDataDocument);
var CreateAttachMediaDataDocumentString = print(CreateAttachMediaDataDocument);
var HidePublicationDocumentString = print(HidePublicationDocument);
var ReportPublicationDocumentString = print(ReportPublicationDocument);
var CreateDataAvailabilityPostTypedDataDocumentString = print(CreateDataAvailabilityPostTypedDataDocument);
var CreateDataAvailabilityPostViaDispatcherDocumentString = print(CreateDataAvailabilityPostViaDispatcherDocument);
var CreateDataAvailabilityCommentTypedDataDocumentString = print(CreateDataAvailabilityCommentTypedDataDocument);
var CreateDataAvailabilityCommentViaDispatcherDocumentString = print(CreateDataAvailabilityCommentViaDispatcherDocument);
var CreateDataAvailabilityMirrorTypedDataDocumentString = print(CreateDataAvailabilityMirrorTypedDataDocument);
var CreateDataAvailabilityMirrorViaDispatcherDocumentString = print(CreateDataAvailabilityMirrorViaDispatcherDocument);
function getSdk$5(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$5;
  return {
    Publication: function Publication(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(PublicationDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'Publication', 'query');
    },
    PublicationStats: function PublicationStats(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(PublicationStatsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'PublicationStats', 'query');
    },
    Publications: function Publications(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(PublicationsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'Publications', 'query');
    },
    PastPublicationsCreated: function PastPublicationsCreated(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(PastPublicationsCreatedDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'PastPublicationsCreated', 'query');
    },
    ValidatePublicationMetadata: function ValidatePublicationMetadata(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ValidatePublicationMetadataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ValidatePublicationMetadata', 'query');
    },
    WhoCollectedPublication: function WhoCollectedPublication(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(WhoCollectedPublicationDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'WhoCollectedPublication', 'query');
    },
    ProfilePublicationsForSale: function ProfilePublicationsForSale(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ProfilePublicationsForSaleDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ProfilePublicationsForSale', 'query');
    },
    PublicationMetadataStatus: function PublicationMetadataStatus(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(PublicationMetadataStatusDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'PublicationMetadataStatus', 'query');
    },
    CreatePostTypedData: function CreatePostTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreatePostTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreatePostTypedData', 'mutation');
    },
    CreatePostViaDispatcher: function CreatePostViaDispatcher(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreatePostViaDispatcherDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreatePostViaDispatcher', 'mutation');
    },
    CreateCommentTypedData: function CreateCommentTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateCommentTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateCommentTypedData', 'mutation');
    },
    CreateCommentViaDispatcher: function CreateCommentViaDispatcher(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateCommentViaDispatcherDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateCommentViaDispatcher', 'mutation');
    },
    CreateMirrorTypedData: function CreateMirrorTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateMirrorTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateMirrorTypedData', 'mutation');
    },
    CreateMirrorViaDispatcher: function CreateMirrorViaDispatcher(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateMirrorViaDispatcherDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateMirrorViaDispatcher', 'mutation');
    },
    CreateCollectTypedData: function CreateCollectTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateCollectTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateCollectTypedData', 'mutation');
    },
    CreateAttachMediaData: function CreateAttachMediaData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateAttachMediaDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateAttachMediaData', 'mutation');
    },
    HidePublication: function HidePublication(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(HidePublicationDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'HidePublication', 'mutation');
    },
    ReportPublication: function ReportPublication(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ReportPublicationDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ReportPublication', 'mutation');
    },
    CreateDataAvailabilityPostTypedData: function CreateDataAvailabilityPostTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateDataAvailabilityPostTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateDataAvailabilityPostTypedData', 'mutation');
    },
    CreateDataAvailabilityPostViaDispatcher: function CreateDataAvailabilityPostViaDispatcher(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateDataAvailabilityPostViaDispatcherDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateDataAvailabilityPostViaDispatcher', 'mutation');
    },
    CreateDataAvailabilityCommentTypedData: function CreateDataAvailabilityCommentTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateDataAvailabilityCommentTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateDataAvailabilityCommentTypedData', 'mutation');
    },
    CreateDataAvailabilityCommentViaDispatcher: function CreateDataAvailabilityCommentViaDispatcher(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateDataAvailabilityCommentViaDispatcherDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateDataAvailabilityCommentViaDispatcher', 'mutation');
    },
    CreateDataAvailabilityMirrorTypedData: function CreateDataAvailabilityMirrorTypedData(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateDataAvailabilityMirrorTypedDataDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateDataAvailabilityMirrorTypedData', 'mutation');
    },
    CreateDataAvailabilityMirrorViaDispatcher: function CreateDataAvailabilityMirrorViaDispatcher(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(CreateDataAvailabilityMirrorViaDispatcherDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'CreateDataAvailabilityMirrorViaDispatcher', 'mutation');
    }
  };
}

/**
 * Publications are the posts, comments and mirrors that a profile creates.
 *
 * @remarks
 *
 * Make sure you understand the metadata standards that are set
 * for publications. If a publication does not conform to these
 * standards it will not be indexed by the Lens API.
 * These are the guidelines set for the API. The Lens Protocol itself
 * does not validate these guidelines. Building a standard allows
 * compatibility for all kinds of projects, so we advise following
 * the standards.
 *
 * @group LensClient Modules
 */
var Publication = /*#__PURE__*/function () {
  function Publication(config, authentication) {
    _classCallCheck(this, Publication);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$5(client);
    this.authentication = authentication;
  }

  /**
   * Fetch a publication
   *
   * @param request - Request object for the query
   * @returns Publication or null if not found
   *
   * @example
   * ```ts
   * const result = await client.publication.fetch({
   *   publicationId: '0x123',
   * });
   * ```
   */
  _createClass(Publication, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(request, observerId) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _this.sdk.Publication({
                          request: request,
                          observerId: observerId
                        }, headers);
                      case 2:
                        result = _context.sent;
                        return _context.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      return fetch;
    }()
    /**
     * Fetch a publication's stats
     *
     * Returns global stats for a publication, like total amount of
     * mirrors, collects, comments, upvotes and downvotes, as well
     * as `appId` specific stats, like comments (if `sources` provided).
     *
     * @param request - Request object for the query
     * @param sources - Required to calculate stats specific to provided appIds
     * @returns Publication stats or undefined if not found
     *
     * @example
     * ```ts
     * const result = await client.publication.stats({ publicationId: '0x123' }, ['lenster']);
     * ```
     */
  }, {
    key: "stats",
    value: function () {
      var _stats = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(request, sources) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(headers) {
                  var _result$data$result;
                  var result;
                  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _this2.sdk.PublicationStats({
                          request: request,
                          sources: sources
                        }, headers);
                      case 2:
                        result = _context3.sent;
                        return _context3.abrupt("return", (_result$data$result = result.data.result) === null || _result$data$result === void 0 ? void 0 : _result$data$result.stats);
                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x6) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function stats(_x4, _x5) {
        return _stats.apply(this, arguments);
      }
      return stats;
    }()
    /**
     * Validate a publication's metadata before creating it
     *
     * @param metadata - Metadata to validate
     * @returns Validation result
     *
     * @example
     * ```ts
     * const result = await client.publication.validateMetadata(metadata);
     *
     * if (!result.valid) {
     *   throw new Error(`Metadata is not valid.`);
     * }
     * ```
     */
  }, {
    key: "validateMetadata",
    value: function () {
      var _validateMetadata = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(metadata) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _this3.sdk.ValidatePublicationMetadata({
                          metadata: metadata
                        }, headers);
                      case 2:
                        result = _context5.sent;
                        return _context5.abrupt("return", result.data.validatePublicationMetadata);
                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x8) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function validateMetadata(_x7) {
        return _validateMetadata.apply(this, arguments);
      }
      return validateMetadata;
    }()
    /**
     * Check the status of a publication's metadata.
     * Helps to debug why a publication has not been indexed by Lens API.
     *
     * @param request - Request object for the query
     * @returns Status of the publication's metadata
     *
     * @example
     * ```ts
     * const result = await client.publication.metadataStatus({
     *   publicationId: '0x123-0x456',
     * });
     * ```
     */
  }, {
    key: "metadataStatus",
    value: function () {
      var _metadataStatus = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(request) {
        var _this4 = this;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.next = 2;
                        return _this4.sdk.PublicationMetadataStatus({
                          request: request
                        }, headers);
                      case 2:
                        result = _context7.sent;
                        return _context7.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7);
                }));
                return function (_x10) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function metadataStatus(_x9) {
        return _metadataStatus.apply(this, arguments);
      }
      return metadataStatus;
    }()
    /**
     * Fetch all publications by requested criteria
     *
     * @param request - Request object for the query
     * @returns Publications wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.publication.fetchAll({
     *   profileId: '0x123',
     * });
     * ```
     */
  }, {
    key: "fetchAll",
    value: function () {
      var _fetchAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(request, observerId) {
        var _this5 = this;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(headers) {
                  return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                    while (1) switch (_context10.prev = _context10.next) {
                      case 0:
                        return _context10.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                              while (1) switch (_context9.prev = _context9.next) {
                                case 0:
                                  _context9.next = 2;
                                  return _this5.sdk.Publications({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context9.sent;
                                  return _context9.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context9.stop();
                              }
                            }, _callee9);
                          }));
                          return function (_x14) {
                            return _ref6.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context10.stop();
                    }
                  }, _callee10);
                }));
                return function (_x13) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function fetchAll(_x11, _x12) {
        return _fetchAll.apply(this, arguments);
      }
      return fetchAll;
    }()
    /**
     * Fetch all publications by requested criteria
     *
     * @param request - Request object for the query
     * @returns Publications wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.publication.fetchAll({
     *   profileId: '0x123',
     * });
     * ```
     */
  }, {
    key: "fetchPastPublicationsCreated",
    value: function () {
      var _fetchPastPublicationsCreated = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(request) {
        var _this6 = this;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(headers) {
                  return _regeneratorRuntime().wrap(function _callee13$(_context13) {
                    while (1) switch (_context13.prev = _context13.next) {
                      case 0:
                        return _context13.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                              while (1) switch (_context12.prev = _context12.next) {
                                case 0:
                                  _context12.next = 2;
                                  return _this6.sdk.PastPublicationsCreated({
                                    request: currRequest
                                  }, headers);
                                case 2:
                                  result = _context12.sent;
                                  return _context12.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context12.stop();
                              }
                            }, _callee12);
                          }));
                          return function (_x17) {
                            return _ref8.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context13.stop();
                    }
                  }, _callee13);
                }));
                return function (_x16) {
                  return _ref7.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function fetchPastPublicationsCreated(_x15) {
        return _fetchPastPublicationsCreated.apply(this, arguments);
      }
      return fetchPastPublicationsCreated;
    }()
    /**
     * Fetch all wallets that collected a publication
     *
     * @param request - Request object for the query
     * @returns Wallets wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.publication.allWalletsWhoCollected({
     *   publicationId: '0x123-0x456',
     * });
     * ```
     */
  }, {
    key: "allWalletsWhoCollected",
    value: function () {
      var _allWalletsWhoCollected = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(request, observerId) {
        var _this7 = this;
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              return _context17.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(headers) {
                  return _regeneratorRuntime().wrap(function _callee16$(_context16) {
                    while (1) switch (_context16.prev = _context16.next) {
                      case 0:
                        return _context16.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee15$(_context15) {
                              while (1) switch (_context15.prev = _context15.next) {
                                case 0:
                                  _context15.next = 2;
                                  return _this7.sdk.WhoCollectedPublication({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context15.sent;
                                  return _context15.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context15.stop();
                              }
                            }, _callee15);
                          }));
                          return function (_x21) {
                            return _ref10.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context16.stop();
                    }
                  }, _callee16);
                }));
                return function (_x20) {
                  return _ref9.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function allWalletsWhoCollected(_x18, _x19) {
        return _allWalletsWhoCollected.apply(this, arguments);
      }
      return allWalletsWhoCollected;
    }()
    /**
     * Fetch all publications for sale by requested criteria
     *
     * @param request - Request object for the query
     * @returns Publications wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.publication.allForSale({
     *   profileId: '0x123',
     * });
     * ```
     */
  }, {
    key: "allForSale",
    value: function () {
      var _allForSale = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(request, observerId) {
        var _this8 = this;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              return _context20.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(headers) {
                  return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                    while (1) switch (_context19.prev = _context19.next) {
                      case 0:
                        return _context19.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee18$(_context18) {
                              while (1) switch (_context18.prev = _context18.next) {
                                case 0:
                                  _context18.next = 2;
                                  return _this8.sdk.ProfilePublicationsForSale({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context18.sent;
                                  return _context18.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context18.stop();
                              }
                            }, _callee18);
                          }));
                          return function (_x25) {
                            return _ref12.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context19.stop();
                    }
                  }, _callee19);
                }));
                return function (_x24) {
                  return _ref11.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function allForSale(_x22, _x23) {
        return _allForSale.apply(this, arguments);
      }
      return allForSale;
    }()
    /**
     * Fetch typed data for creating a post.
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for creating a post
     *
     * @example
     * ```ts
     * const result = await client.publication.createPostTypedData({
     *   profileId: '0x123',
     *   contentURI: 'ipfs://Qm...', // or arweave
     *   collectModule: {
     *     revertCollectModule: true, // collect disabled
     *   },
     *   referenceModule: {
     *     followerOnlyReferenceModule: false, // anybody can comment or mirror
     *   },
     * });
     * ```
     */
  }, {
    key: "createPostTypedData",
    value: function () {
      var _createPostTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(request, options) {
        var _this9 = this;
        return _regeneratorRuntime().wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              return _context22.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee21$(_context21) {
                    while (1) switch (_context21.prev = _context21.next) {
                      case 0:
                        _context21.next = 2;
                        return _this9.sdk.CreatePostTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context21.sent;
                        return _context21.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context21.stop();
                    }
                  }, _callee21);
                }));
                return function (_x28) {
                  return _ref13.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function createPostTypedData(_x26, _x27) {
        return _createPostTypedData.apply(this, arguments);
      }
      return createPostTypedData;
    }()
    /**
     * Create a post using dispatcher. Profile has to have the dispatcher enabled.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.publication.createPostViaDispatcher({
     *   profileId: '0x123',
     *   contentURI: 'ipfs://Qm...', // or arweave
     *   collectModule: {
     *     revertCollectModule: true, // collect disabled
     *   },
     *   referenceModule: {
     *     followerOnlyReferenceModule: false, // anybody can comment or mirror
     *   },
     * });
     * ```
     */
  }, {
    key: "createPostViaDispatcher",
    value: function () {
      var _createPostViaDispatcher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(request) {
        var _this10 = this;
        return _regeneratorRuntime().wrap(function _callee24$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              return _context24.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee23$(_context23) {
                    while (1) switch (_context23.prev = _context23.next) {
                      case 0:
                        _context23.next = 2;
                        return _this10.sdk.CreatePostViaDispatcher({
                          request: request
                        }, headers);
                      case 2:
                        result = _context23.sent;
                        return _context23.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context23.stop();
                    }
                  }, _callee23);
                }));
                return function (_x30) {
                  return _ref14.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context24.stop();
          }
        }, _callee24, this);
      }));
      function createPostViaDispatcher(_x29) {
        return _createPostViaDispatcher.apply(this, arguments);
      }
      return createPostViaDispatcher;
    }()
    /**
     * Fetch typed data for creating a comment.
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for creating a comment
     *
     * @example
     * ```ts
     * const result = await client.publication.createCommentTypedData({
     *   profileId: '0x123',
     *   publicationId: '0x123-0x456',
     *   contentURI: 'ipfs://Qm...', // or arweave
     *   collectModule: {
     *     revertCollectModule: true, // collect disabled
     *   },
     *   referenceModule: {
     *     followerOnlyReferenceModule: false, // anybody can comment or mirror
     *   },
     * });
     * ```
     */
  }, {
    key: "createCommentTypedData",
    value: function () {
      var _createCommentTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(request, options) {
        var _this11 = this;
        return _regeneratorRuntime().wrap(function _callee26$(_context26) {
          while (1) switch (_context26.prev = _context26.next) {
            case 0:
              return _context26.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee25$(_context25) {
                    while (1) switch (_context25.prev = _context25.next) {
                      case 0:
                        _context25.next = 2;
                        return _this11.sdk.CreateCommentTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context25.sent;
                        return _context25.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context25.stop();
                    }
                  }, _callee25);
                }));
                return function (_x33) {
                  return _ref15.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context26.stop();
          }
        }, _callee26, this);
      }));
      function createCommentTypedData(_x31, _x32) {
        return _createCommentTypedData.apply(this, arguments);
      }
      return createCommentTypedData;
    }()
    /**
     * Create a comment using dispatcher. Profile has to have the dispatcher enabled.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.publication.createCommentViaDispatcher({
     *   profileId: '0x123',
     *   publicationId: '0x123-0x456',
     *   contentURI: 'ipfs://Qm...', // or arweave
     *   collectModule: {
     *     revertCollectModule: true, // collect disabled
     *   },
     *   referenceModule: {
     *     followerOnlyReferenceModule: false, // anybody can comment or mirror
     *   },
     * });
     * ```
     */
  }, {
    key: "createCommentViaDispatcher",
    value: function () {
      var _createCommentViaDispatcher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(request) {
        var _this12 = this;
        return _regeneratorRuntime().wrap(function _callee28$(_context28) {
          while (1) switch (_context28.prev = _context28.next) {
            case 0:
              return _context28.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee27$(_context27) {
                    while (1) switch (_context27.prev = _context27.next) {
                      case 0:
                        _context27.next = 2;
                        return _this12.sdk.CreateCommentViaDispatcher({
                          request: request
                        }, headers);
                      case 2:
                        result = _context27.sent;
                        return _context27.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context27.stop();
                    }
                  }, _callee27);
                }));
                return function (_x35) {
                  return _ref16.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context28.stop();
          }
        }, _callee28, this);
      }));
      function createCommentViaDispatcher(_x34) {
        return _createCommentViaDispatcher.apply(this, arguments);
      }
      return createCommentViaDispatcher;
    }()
    /**
     * Fetch typed data for creating a mirror.
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for creating a mirror
     *
     * @example
     * ```ts
     * const result = await client.publication.createMirrorTypedData({
     *   profileId: '0x123',
     *   publicationId: '0x123-0x456',
     *   referenceModule: {
     *     followerOnlyReferenceModule: false, // anybody can comment or mirror
     *   },
     * });
     * ```
     */
  }, {
    key: "createMirrorTypedData",
    value: function () {
      var _createMirrorTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(request, options) {
        var _this13 = this;
        return _regeneratorRuntime().wrap(function _callee30$(_context30) {
          while (1) switch (_context30.prev = _context30.next) {
            case 0:
              return _context30.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee29$(_context29) {
                    while (1) switch (_context29.prev = _context29.next) {
                      case 0:
                        _context29.next = 2;
                        return _this13.sdk.CreateMirrorTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context29.sent;
                        return _context29.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context29.stop();
                    }
                  }, _callee29);
                }));
                return function (_x38) {
                  return _ref17.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context30.stop();
          }
        }, _callee30, this);
      }));
      function createMirrorTypedData(_x36, _x37) {
        return _createMirrorTypedData.apply(this, arguments);
      }
      return createMirrorTypedData;
    }()
    /**
     * Create a mirror using dispatcher. Profile has to have the dispatcher enabled.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.publication.createMirrorViaDispatcher({
     *   profileId: '0x123',
     *   publicationId: '0x123-0x456',
     *   referenceModule: {
     *     followerOnlyReferenceModule: false, // anybody can comment or mirror
     *   },
     * });
     * ```
     */
  }, {
    key: "createMirrorViaDispatcher",
    value: function () {
      var _createMirrorViaDispatcher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee32(request) {
        var _this14 = this;
        return _regeneratorRuntime().wrap(function _callee32$(_context32) {
          while (1) switch (_context32.prev = _context32.next) {
            case 0:
              return _context32.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee31(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee31$(_context31) {
                    while (1) switch (_context31.prev = _context31.next) {
                      case 0:
                        _context31.next = 2;
                        return _this14.sdk.CreateMirrorViaDispatcher({
                          request: request
                        }, headers);
                      case 2:
                        result = _context31.sent;
                        return _context31.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context31.stop();
                    }
                  }, _callee31);
                }));
                return function (_x40) {
                  return _ref18.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context32.stop();
          }
        }, _callee32, this);
      }));
      function createMirrorViaDispatcher(_x39) {
        return _createMirrorViaDispatcher.apply(this, arguments);
      }
      return createMirrorViaDispatcher;
    }()
    /**
     * Fetch typed data for collecting a publication or a comment.
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcast}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @param options - Configure returned typed data
     * @returns Typed data for collecting a publication or a comment
     *
     * @example
     * ```ts
     * const result = await client.publication.createCollectTypedData({
     *   publicationId: '0x123-0x456',
     * });
     * ```
     */
  }, {
    key: "createCollectTypedData",
    value: function () {
      var _createCollectTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee34(request, options) {
        var _this15 = this;
        return _regeneratorRuntime().wrap(function _callee34$(_context34) {
          while (1) switch (_context34.prev = _context34.next) {
            case 0:
              return _context34.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee33(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee33$(_context33) {
                    while (1) switch (_context33.prev = _context33.next) {
                      case 0:
                        _context33.next = 2;
                        return _this15.sdk.CreateCollectTypedData({
                          request: request,
                          options: options
                        }, headers);
                      case 2:
                        result = _context33.sent;
                        return _context33.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context33.stop();
                    }
                  }, _callee33);
                }));
                return function (_x43) {
                  return _ref19.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context34.stop();
          }
        }, _callee34, this);
      }));
      function createCollectTypedData(_x41, _x42) {
        return _createCollectTypedData.apply(this, arguments);
      }
      return createCollectTypedData;
    }()
    /**
     * Media endpoint allows to upload AUDIO and VIDEO directly to the Lens API
     * without using IPFS or a storage provider. It will create a copy of the
     * file in Lens API cache and streaming system before pinning it to
     * the decentralised IPFS.
     *
     * @param request - Request object for the mutation
     *
     * | name    | type     | desc                                                                                |
     * | :------ | :------- | :---------------------------------------------------------------------------------- |
     * | itemCid | IpfsCid  | You need to precalculate the CID of the file before upload it with the presignedURL |
     * | type    | MimeType | Mime type of the file to upload                                                     |
     * | altTag  | String   | Alternative text to show on the embed object                                        |
     * | cover   | Url      | Url cover image                                                                     |
     *
     * @returns Signed url for uploading the media together with media data
     *
     * @example
     * ```ts
     * const result = await client.publication.createAttachMediaData({
     *   itemCid: 'QmTAznyH583xUgEyY5zdrPB2LSGY7FUBPDddWKj58GmBgp',
     *   type: 'video/mp4',
     *   altTag: 'Video alt tag',
     *   cover: 'ifps://QmVwvsJrFzAAb1fPe5uXF4QpPib1T6gjc3xLpS96BUsTL6'
     * });
     * ```
     */
  }, {
    key: "createAttachMediaData",
    value: function () {
      var _createAttachMediaData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee36(request) {
        var _this16 = this;
        return _regeneratorRuntime().wrap(function _callee36$(_context36) {
          while (1) switch (_context36.prev = _context36.next) {
            case 0:
              return _context36.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee35(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee35$(_context35) {
                    while (1) switch (_context35.prev = _context35.next) {
                      case 0:
                        _context35.next = 2;
                        return _this16.sdk.CreateAttachMediaData({
                          request: request
                        }, headers);
                      case 2:
                        result = _context35.sent;
                        return _context35.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context35.stop();
                    }
                  }, _callee35);
                }));
                return function (_x45) {
                  return _ref20.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context36.stop();
          }
        }, _callee36, this);
      }));
      function createAttachMediaData(_x44) {
        return _createAttachMediaData.apply(this, arguments);
      }
      return createAttachMediaData;
    }()
    /**
     * Hide a publication
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with void
     *
     * @example
     * ```ts
     * await client.publication.hide({
     *  publicationId: '0x014e-0x0a',
     * });
     * ```
     */
  }, {
    key: "hide",
    value: function () {
      var _hide = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee38(request) {
        var _this17 = this;
        return _regeneratorRuntime().wrap(function _callee38$(_context38) {
          while (1) switch (_context38.prev = _context38.next) {
            case 0:
              return _context38.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee37(headers) {
                  return _regeneratorRuntime().wrap(function _callee37$(_context37) {
                    while (1) switch (_context37.prev = _context37.next) {
                      case 0:
                        _context37.next = 2;
                        return _this17.sdk.HidePublication({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context37.stop();
                    }
                  }, _callee37);
                }));
                return function (_x47) {
                  return _ref21.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context38.stop();
          }
        }, _callee38, this);
      }));
      function hide(_x46) {
        return _hide.apply(this, arguments);
      }
      return hide;
    }()
    /**
     * Report a publication with a reason
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with void
     *
     * @example
     * ```ts
     * import { buildReportingReasonInputParams, PublicationReportReason } from '@lens-protocol/client';
     *
     * await client.publication.report({
     *   publicationId: '0x014e-0x0a',
     *   reason: buildReportingReasonInputParams(PublicationReportReason.FAKE_ENGAGEMENT),
     *   additionalComments: 'comment',
     * });
     * ```
     */
  }, {
    key: "report",
    value: function () {
      var _report = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee40(request) {
        var _this18 = this;
        return _regeneratorRuntime().wrap(function _callee40$(_context40) {
          while (1) switch (_context40.prev = _context40.next) {
            case 0:
              return _context40.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee39(headers) {
                  return _regeneratorRuntime().wrap(function _callee39$(_context39) {
                    while (1) switch (_context39.prev = _context39.next) {
                      case 0:
                        _context39.next = 2;
                        return _this18.sdk.ReportPublication({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context39.stop();
                    }
                  }, _callee39);
                }));
                return function (_x49) {
                  return _ref22.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context40.stop();
          }
        }, _callee40, this);
      }));
      function report(_x48) {
        return _report.apply(this, arguments);
      }
      return report;
    }()
    /**
     * Fetch typed data for creating a data availability post.
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastDataAvailability}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns Typed data for creating a data availability post
     *
     * @example
     * ```ts
     * const result = await client.publication.createDataAvailabilityPostTypedData({
     *   from: '0x123',
     *   contentURI: 'ipfs://Qm...', // or arweave
     * });
     * ```
     */
  }, {
    key: "createDataAvailabilityPostTypedData",
    value: function () {
      var _createDataAvailabilityPostTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee42(request) {
        var _this19 = this;
        return _regeneratorRuntime().wrap(function _callee42$(_context42) {
          while (1) switch (_context42.prev = _context42.next) {
            case 0:
              return _context42.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee41(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee41$(_context41) {
                    while (1) switch (_context41.prev = _context41.next) {
                      case 0:
                        _context41.next = 2;
                        return _this19.sdk.CreateDataAvailabilityPostTypedData({
                          request: request
                        }, headers);
                      case 2:
                        result = _context41.sent;
                        return _context41.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context41.stop();
                    }
                  }, _callee41);
                }));
                return function (_x51) {
                  return _ref23.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context42.stop();
          }
        }, _callee42, this);
      }));
      function createDataAvailabilityPostTypedData(_x50) {
        return _createDataAvailabilityPostTypedData.apply(this, arguments);
      }
      return createDataAvailabilityPostTypedData;
    }()
    /**
     * Create a data availability post using dispatcher. Profile has to have the dispatcher enabled.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with {@link CreateDataAvailabilityPublicationResultFragment} or {@link RelayErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.publication.createDataAvailabilityPostViaDispatcher({
     *   from: '0x123',
     *   contentURI: 'ipfs://Qm...', // or arweave
     * });
     * ```
     */
  }, {
    key: "createDataAvailabilityPostViaDispatcher",
    value: function () {
      var _createDataAvailabilityPostViaDispatcher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee44(request) {
        var _this20 = this;
        return _regeneratorRuntime().wrap(function _callee44$(_context44) {
          while (1) switch (_context44.prev = _context44.next) {
            case 0:
              return _context44.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee43(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee43$(_context43) {
                    while (1) switch (_context43.prev = _context43.next) {
                      case 0:
                        _context43.next = 2;
                        return _this20.sdk.CreateDataAvailabilityPostViaDispatcher({
                          request: request
                        }, headers);
                      case 2:
                        result = _context43.sent;
                        return _context43.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context43.stop();
                    }
                  }, _callee43);
                }));
                return function (_x53) {
                  return _ref24.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context44.stop();
          }
        }, _callee44, this);
      }));
      function createDataAvailabilityPostViaDispatcher(_x52) {
        return _createDataAvailabilityPostViaDispatcher.apply(this, arguments);
      }
      return createDataAvailabilityPostViaDispatcher;
    }()
    /**
     * Fetch typed data for creating a data availability comment.
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastDataAvailability}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns Typed data for creating a data availability comment
     *
     * @example
     * ```ts
     * const result = await client.publication.createDataAvailabilityCommentTypedData({
     *   from: '0x123',
     *   commentOn: '0x123-0x456',
     *   contentURI: 'ipfs://Qm...', // or arweave
     * });
     * ```
     */
  }, {
    key: "createDataAvailabilityCommentTypedData",
    value: function () {
      var _createDataAvailabilityCommentTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee46(request) {
        var _this21 = this;
        return _regeneratorRuntime().wrap(function _callee46$(_context46) {
          while (1) switch (_context46.prev = _context46.next) {
            case 0:
              return _context46.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee45(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee45$(_context45) {
                    while (1) switch (_context45.prev = _context45.next) {
                      case 0:
                        _context45.next = 2;
                        return _this21.sdk.CreateDataAvailabilityCommentTypedData({
                          request: request
                        }, headers);
                      case 2:
                        result = _context45.sent;
                        return _context45.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context45.stop();
                    }
                  }, _callee45);
                }));
                return function (_x55) {
                  return _ref25.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context46.stop();
          }
        }, _callee46, this);
      }));
      function createDataAvailabilityCommentTypedData(_x54) {
        return _createDataAvailabilityCommentTypedData.apply(this, arguments);
      }
      return createDataAvailabilityCommentTypedData;
    }()
    /**
     * Create a data availability comment using dispatcher. Profile has to have the dispatcher enabled.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with {@link CreateDataAvailabilityPublicationResultFragment} or {@link RelayErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.publication.createDataAvailabilityCommentViaDispatcher({
     *   from: '0x123',
     *   commentOn: '0x123-0x456',
     *   contentURI: 'ipfs://Qm...', // or arweave
     * });
     * ```
     */
  }, {
    key: "createDataAvailabilityCommentViaDispatcher",
    value: function () {
      var _createDataAvailabilityCommentViaDispatcher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee48(request) {
        var _this22 = this;
        return _regeneratorRuntime().wrap(function _callee48$(_context48) {
          while (1) switch (_context48.prev = _context48.next) {
            case 0:
              return _context48.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee47(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee47$(_context47) {
                    while (1) switch (_context47.prev = _context47.next) {
                      case 0:
                        _context47.next = 2;
                        return _this22.sdk.CreateDataAvailabilityCommentViaDispatcher({
                          request: request
                        }, headers);
                      case 2:
                        result = _context47.sent;
                        return _context47.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context47.stop();
                    }
                  }, _callee47);
                }));
                return function (_x57) {
                  return _ref26.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context48.stop();
          }
        }, _callee48, this);
      }));
      function createDataAvailabilityCommentViaDispatcher(_x56) {
        return _createDataAvailabilityCommentViaDispatcher.apply(this, arguments);
      }
      return createDataAvailabilityCommentViaDispatcher;
    }()
    /**
     * Fetch typed data for creating a data availability mirror.
     *
     * Typed data has to be signed by the profile's wallet and broadcasted with {@link Transaction.broadcastDataAvailability}.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns Typed data for creating a data availability mirror
     *
     * @example
     * ```ts
     * const result = await client.publication.createDataAvailabilityMirrorTypedData({
     *   from: '0x123',
     *   mirror: '0x123-0x456',
     * });
     * ```
     */
  }, {
    key: "createDataAvailabilityMirrorTypedData",
    value: function () {
      var _createDataAvailabilityMirrorTypedData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee50(request) {
        var _this23 = this;
        return _regeneratorRuntime().wrap(function _callee50$(_context50) {
          while (1) switch (_context50.prev = _context50.next) {
            case 0:
              return _context50.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee49(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee49$(_context49) {
                    while (1) switch (_context49.prev = _context49.next) {
                      case 0:
                        _context49.next = 2;
                        return _this23.sdk.CreateDataAvailabilityMirrorTypedData({
                          request: request
                        }, headers);
                      case 2:
                        result = _context49.sent;
                        return _context49.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context49.stop();
                    }
                  }, _callee49);
                }));
                return function (_x59) {
                  return _ref27.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context50.stop();
          }
        }, _callee50, this);
      }));
      function createDataAvailabilityMirrorTypedData(_x58) {
        return _createDataAvailabilityMirrorTypedData.apply(this, arguments);
      }
      return createDataAvailabilityMirrorTypedData;
    }()
    /**
     * Create a data availability mirror using dispatcher. Profile has to have the dispatcher enabled.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with {@link CreateDataAvailabilityPublicationResultFragment} or {@link RelayErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.publication.createDataAvailabilityMirrorViaDispatcher({
     *   from: '0x123',
     *   mirror: '0x123-0x456',
     * });
     * ```
     */
  }, {
    key: "createDataAvailabilityMirrorViaDispatcher",
    value: function () {
      var _createDataAvailabilityMirrorViaDispatcher = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee52(request) {
        var _this24 = this;
        return _regeneratorRuntime().wrap(function _callee52$(_context52) {
          while (1) switch (_context52.prev = _context52.next) {
            case 0:
              return _context52.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee51(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee51$(_context51) {
                    while (1) switch (_context51.prev = _context51.next) {
                      case 0:
                        _context51.next = 2;
                        return _this24.sdk.CreateDataAvailabilityMirrorViaDispatcher({
                          request: request
                        }, headers);
                      case 2:
                        result = _context51.sent;
                        return _context51.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context51.stop();
                    }
                  }, _callee51);
                }));
                return function (_x61) {
                  return _ref28.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context52.stop();
          }
        }, _callee52, this);
      }));
      function createDataAvailabilityMirrorViaDispatcher(_x60) {
        return _createDataAvailabilityMirrorViaDispatcher.apply(this, arguments);
      }
      return createDataAvailabilityMirrorViaDispatcher;
    }()
  }]);
  return Publication;
}();

var PublicationReportReason;

/**
 * Build the input params for reporting a publication.
 *
 * @param reason - the reason for reporting the publication
 * @returns the input params for reporting a publication required by the Lens API
 */
(function (PublicationReportReason) {
  PublicationReportReason["ANIMAL_ABUSE"] = "ANIMAL_ABUSE";
  PublicationReportReason["HARASSMENT"] = "HARASSMENT";
  PublicationReportReason["VIOLENCE"] = "VIOLENCE";
  PublicationReportReason["SELF_HARM"] = "SELF_HARM";
  PublicationReportReason["DIRECT_THREAT"] = "DIRECT_THREAT";
  PublicationReportReason["HATE_SPEECH"] = "HATE_SPEECH";
  PublicationReportReason["NUDITY"] = "NUDITY";
  PublicationReportReason["OFFENSIVE"] = "OFFENSIVE";
  PublicationReportReason["SCAM"] = "SCAM";
  PublicationReportReason["UNAUTHORIZED_SALE"] = "UNAUTHORIZED_SALE";
  PublicationReportReason["IMPERSONATION"] = "IMPERSONATION";
  PublicationReportReason["MISLEADING"] = "MISLEADING";
  PublicationReportReason["MISUSE_HASHTAGS"] = "MISUSE_HASHTAGS";
  PublicationReportReason["UNRELATED"] = "UNRELATED";
  PublicationReportReason["REPETITIVE"] = "REPETITIVE";
  PublicationReportReason["FAKE_ENGAGEMENT"] = "FAKE_ENGAGEMENT";
  PublicationReportReason["MANIPULATION_ALGO"] = "MANIPULATION_ALGO";
  PublicationReportReason["SOMETHING_ELSE"] = "SOMETHING_ELSE";
})(PublicationReportReason || (PublicationReportReason = {}));
var buildReportingReasonInputParams = function buildReportingReasonInputParams(reason) {
  switch (reason) {
    case PublicationReportReason.VIOLENCE:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.Violence
        }
      };
    case PublicationReportReason.SELF_HARM:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.ThreatIndividual
        }
      };
    case PublicationReportReason.DIRECT_THREAT:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.DirectThreat
        }
      };
    case PublicationReportReason.HARASSMENT:
    case PublicationReportReason.HATE_SPEECH:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.HumanAbuse
        }
      };
    case PublicationReportReason.ANIMAL_ABUSE:
      return {
        illegalReason: {
          reason: PublicationReportingReason.Illegal,
          subreason: PublicationReportingIllegalSubreason.AnimalAbuse
        }
      };
    case PublicationReportReason.SCAM:
    case PublicationReportReason.UNAUTHORIZED_SALE:
      return {
        fraudReason: {
          reason: PublicationReportingReason.Fraud,
          subreason: PublicationReportingFraudSubreason.Scam
        }
      };
    case PublicationReportReason.IMPERSONATION:
      return {
        fraudReason: {
          reason: PublicationReportingReason.Fraud,
          subreason: PublicationReportingFraudSubreason.Impersonation
        }
      };
    case PublicationReportReason.NUDITY:
      return {
        sensitiveReason: {
          reason: PublicationReportingReason.Sensitive,
          subreason: PublicationReportingSensitiveSubreason.Nsfw
        }
      };
    case PublicationReportReason.OFFENSIVE:
      return {
        sensitiveReason: {
          reason: PublicationReportingReason.Sensitive,
          subreason: PublicationReportingSensitiveSubreason.Offensive
        }
      };
    case PublicationReportReason.MISLEADING:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.Misleading
        }
      };
    case PublicationReportReason.MISUSE_HASHTAGS:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.MisuseHashtags
        }
      };
    case PublicationReportReason.UNRELATED:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.Unrelated
        }
      };
    case PublicationReportReason.REPETITIVE:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.Repetitive
        }
      };
    case PublicationReportReason.FAKE_ENGAGEMENT:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.FakeEngagement
        }
      };
    case PublicationReportReason.MANIPULATION_ALGO:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.ManipulationAlgo
        }
      };
    case PublicationReportReason.SOMETHING_ELSE:
      return {
        spamReason: {
          reason: PublicationReportingReason.Spam,
          subreason: PublicationReportingSpamSubreason.SomethingElse
        }
      };
    default:
      assertNever(reason, "Unknown report type");
  }
};

var _templateObject$4, _templateObject2$4, _templateObject3$2, _templateObject4$2;
var WhoReactedResultFragmentDoc = gql(_templateObject$4 || (_templateObject$4 = _taggedTemplateLiteral(["\n    fragment WhoReactedResult on WhoReactedResult {\n  __typename\n  reactionId\n  reaction\n  reactionAt\n  profile {\n    ...Profile\n  }\n}\n    ", ""])), ProfileFragmentDoc);
var AddReactionDocument = gql(_templateObject2$4 || (_templateObject2$4 = _taggedTemplateLiteral(["\n    mutation AddReaction($request: ReactionRequest!) {\n  addReaction(request: $request)\n}\n    "])));
var RemoveReactionDocument = gql(_templateObject3$2 || (_templateObject3$2 = _taggedTemplateLiteral(["\n    mutation RemoveReaction($request: ReactionRequest!) {\n  removeReaction(request: $request)\n}\n    "])));
var WhoReactedPublicationDocument = gql(_templateObject4$2 || (_templateObject4$2 = _taggedTemplateLiteral(["\n    query WhoReactedPublication($request: WhoReactedPublicationRequest!, $observerId: ProfileId) {\n  result: whoReactedPublication(request: $request) {\n    items {\n      ...WhoReactedResult\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), WhoReactedResultFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var defaultWrapper$4 = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var AddReactionDocumentString = print(AddReactionDocument);
var RemoveReactionDocumentString = print(RemoveReactionDocument);
var WhoReactedPublicationDocumentString = print(WhoReactedPublicationDocument);
function getSdk$4(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$4;
  return {
    AddReaction: function AddReaction(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(AddReactionDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'AddReaction', 'mutation');
    },
    RemoveReaction: function RemoveReaction(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(RemoveReactionDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'RemoveReaction', 'mutation');
    },
    WhoReactedPublication: function WhoReactedPublication(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(WhoReactedPublicationDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'WhoReactedPublication', 'query');
    }
  };
}

/**
 * React to publications off-chain.
 *
 * @group LensClient Modules
 */
var Reactions = /*#__PURE__*/function () {
  function Reactions(config, authentication) {
    _classCallCheck(this, Reactions);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$4(client);
    this.authentication = authentication;
  }

  /**
   * Add a reaction to a publication.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with void
   *
   * @example
   * ```ts
   * import { ReactionTypes } from '@lens-protocol/client';
   *
   * await client.reactions.add({
   *   profileId: '0x01',
   *   publicationId: '0x02-0x01',
   *   reaction: ReactionTypes.Upvote,
   * });
   * ```
   */
  _createClass(Reactions, [{
    key: "add",
    value: function () {
      var _add = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(request) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(headers) {
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _this.sdk.AddReaction({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function add(_x) {
        return _add.apply(this, arguments);
      }
      return add;
    }()
    /**
     * Remove a reaction from a publication.
     * If the reaction does not exist, this will return an error.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with void
     *
     * @example
     * ```ts
     * import { ReactionTypes } from '@lens-protocol/client';
     *
     * await client.reactions.remove({
     *   profileId: '0x01',
     *   publicationId: '0x02-0x01',
     *   reaction: ReactionTypes.Upvote,
     * });
     * ```
     */
  }, {
    key: "remove",
    value: function () {
      var _remove = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(request) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(headers) {
                  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _this2.sdk.RemoveReaction({
                          request: request
                        }, headers);
                      case 2:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function remove(_x3) {
        return _remove.apply(this, arguments);
      }
      return remove;
    }()
    /**
     * Fetch who reacted to a publication.
     *
     * @param request - Request object for the query
     * @param observerId - Optional id of a profile that is the observer for this request
     * @returns Array of {@link WhoReactedResultFragment} wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.reactions.toPublication({
     *   publicationId: '0x01-0x02',
     * });
     * ```
     */
  }, {
    key: "toPublication",
    value: function () {
      var _toPublication = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(request, observerId) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(headers) {
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        return _context6.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                              while (1) switch (_context5.prev = _context5.next) {
                                case 0:
                                  _context5.next = 2;
                                  return _this3.sdk.WhoReactedPublication({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context5.sent;
                                  return _context5.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context5.stop();
                              }
                            }, _callee5);
                          }));
                          return function (_x8) {
                            return _ref4.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function (_x7) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function toPublication(_x5, _x6) {
        return _toPublication.apply(this, arguments);
      }
      return toPublication;
    }()
  }]);
  return Reactions;
}();

var _templateObject$3, _templateObject2$3, _templateObject3$1, _templateObject4$1, _templateObject5$1;
var RevenueAggregateFragmentDoc = gql(_templateObject$3 || (_templateObject$3 = _taggedTemplateLiteral(["\n    fragment RevenueAggregate on RevenueAggregate {\n  __typename\n  total {\n    ...Erc20Amount\n  }\n}\n    ", ""])), Erc20AmountFragmentDoc);
var PublicationRevenueFragmentDoc = gql(_templateObject2$3 || (_templateObject2$3 = _taggedTemplateLiteral(["\n    fragment PublicationRevenue on PublicationRevenue {\n  __typename\n  publication {\n    ... on Post {\n      ...Post\n    }\n    ... on Mirror {\n      ...Mirror\n    }\n    ... on Comment {\n      ...Comment\n    }\n  }\n  revenue {\n    ...RevenueAggregate\n  }\n}\n    ", "\n", "\n", "\n", ""])), PostFragmentDoc, MirrorFragmentDoc, CommentFragmentDoc, RevenueAggregateFragmentDoc);
var ProfilePublicationRevenueDocument = gql(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteral(["\n    query ProfilePublicationRevenue($request: ProfilePublicationRevenueQueryRequest!, $observerId: ProfileId) {\n  result: profilePublicationRevenue(request: $request) {\n    items {\n      ...PublicationRevenue\n    }\n    pageInfo {\n      ...CommonPaginatedResultInfo\n    }\n  }\n}\n    ", "\n", ""])), PublicationRevenueFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var PublicationRevenueDocument = gql(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteral(["\n    query PublicationRevenue($request: PublicationRevenueQueryRequest!, $observerId: ProfileId) {\n  result: publicationRevenue(request: $request) {\n    ...PublicationRevenue\n  }\n}\n    ", ""])), PublicationRevenueFragmentDoc);
var ProfileFollowRevenueDocument = gql(_templateObject5$1 || (_templateObject5$1 = _taggedTemplateLiteral(["\n    query ProfileFollowRevenue($request: ProfileFollowRevenueQueryRequest!) {\n  result: profileFollowRevenue(request: $request) {\n    revenues {\n      ...RevenueAggregate\n    }\n  }\n}\n    ", ""])), RevenueAggregateFragmentDoc);
var defaultWrapper$3 = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var ProfilePublicationRevenueDocumentString = print(ProfilePublicationRevenueDocument);
var PublicationRevenueDocumentString = print(PublicationRevenueDocument);
var ProfileFollowRevenueDocumentString = print(ProfileFollowRevenueDocument);
function getSdk$3(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$3;
  return {
    ProfilePublicationRevenue: function ProfilePublicationRevenue(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ProfilePublicationRevenueDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ProfilePublicationRevenue', 'query');
    },
    PublicationRevenue: function PublicationRevenue(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(PublicationRevenueDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'PublicationRevenue', 'query');
    },
    ProfileFollowRevenue: function ProfileFollowRevenue(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(ProfileFollowRevenueDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'ProfileFollowRevenue', 'query');
    }
  };
}

/**
 * With built-in ways to earn on Lens Protocol, see the breakdown of what you have earned.
 *
 * @group LensClient Modules
 */
var Revenue = /*#__PURE__*/function () {
  function Revenue(config, authentication) {
    _classCallCheck(this, Revenue);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$3(client);
    this.authentication = authentication;
  }

  /**
   * Fetch revenue of a profile's publications.
   * Return only publications that have earned any fees.
   *
   * @param request - Request object for the query
   * @param observerId - Optional id of a profile that is the observer for this request
   * @returns Array of {@link PublicationRevenueFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.revenue.profilePublication({
   *   profileId: '0x123',
   * });
   * ```
   */
  _createClass(Revenue, [{
    key: "profilePublication",
    value: function () {
      var _profilePublication = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(request, observerId) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(headers) {
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(currRequest) {
                            var result;
                            return _regeneratorRuntime().wrap(function _callee$(_context) {
                              while (1) switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return _this.sdk.ProfilePublicationRevenue({
                                    request: currRequest,
                                    observerId: observerId
                                  }, headers);
                                case 2:
                                  result = _context.sent;
                                  return _context.abrupt("return", result.data.result);
                                case 4:
                                case "end":
                                  return _context.stop();
                              }
                            }, _callee);
                          }));
                          return function (_x4) {
                            return _ref2.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function profilePublication(_x, _x2) {
        return _profilePublication.apply(this, arguments);
      }
      return profilePublication;
    }()
    /**
     * Fetch the amounts earned on the requested profile for all follows, grouped by currency.
     *
     * @param request - Request object for the query
     * @returns Array of {@link RevenueAggregateFragment}
     *
     * @example
     * ```ts
     * const result = await client.revenue.profileFollow({
     *   profileId: '0x123',
     * });
     * ```
     */
  }, {
    key: "profileFollow",
    value: function () {
      var _profileFollow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(request) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _this2.sdk.ProfileFollowRevenue({
                          request: request
                        }, headers);
                      case 2:
                        result = _context4.sent;
                        return _context4.abrupt("return", result.data.result.revenues);
                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }, _callee4);
                }));
                return function (_x6) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function profileFollow(_x5) {
        return _profileFollow.apply(this, arguments);
      }
      return profileFollow;
    }()
    /**
     * Fetch the amounts earned on the requested publication.
     *
     * @param request - Request object for the query
     * @param observerId - Optional id of a profile that is the observer for this request
     * @returns Publication revenue
     *
     * @example
     * ```ts
     * const result = await client.revenue.publication({
     *  publicationId: '0x123',
     * });
     * ```
     */
  }, {
    key: "publication",
    value: function () {
      var _publication = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(request, observerId) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return _this3.sdk.PublicationRevenue({
                          request: request,
                          observerId: observerId
                        }, headers);
                      case 2:
                        result = _context6.sent;
                        return _context6.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function (_x9) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function publication(_x7, _x8) {
        return _publication.apply(this, arguments);
      }
      return publication;
    }()
  }]);
  return Revenue;
}();

var _templateObject$2, _templateObject2$2;
var SearchPublicationsDocument = gql(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral(["\n    query SearchPublications($limit: LimitScalar, $cursor: Cursor, $query: Search!, $sources: [Sources!], $observerId: ProfileId) {\n  result: search(\n    request: {query: $query, type: PUBLICATION, limit: $limit, cursor: $cursor, sources: $sources}\n  ) {\n    ... on PublicationSearchResult {\n      __typename\n      items {\n        ... on Post {\n          ...Post\n        }\n        ... on Comment {\n          ...Comment\n        }\n      }\n      pageInfo {\n        ...CommonPaginatedResultInfo\n      }\n    }\n    ... on ProfileSearchResult {\n      __typename\n    }\n  }\n}\n    ", "\n", "\n", ""])), PostFragmentDoc, CommentFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var SearchProfilesDocument = gql(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteral(["\n    query SearchProfiles($limit: LimitScalar!, $cursor: Cursor, $query: Search!, $observerId: ProfileId) {\n  result: search(\n    request: {query: $query, type: PROFILE, limit: $limit, cursor: $cursor}\n  ) {\n    ... on ProfileSearchResult {\n      __typename\n      items {\n        ...Profile\n      }\n      pageInfo {\n        ...CommonPaginatedResultInfo\n      }\n    }\n    ... on PublicationSearchResult {\n      __typename\n    }\n  }\n}\n    ", "\n", ""])), ProfileFragmentDoc, CommonPaginatedResultInfoFragmentDoc);
var defaultWrapper$2 = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var SearchPublicationsDocumentString = print(SearchPublicationsDocument);
var SearchProfilesDocumentString = print(SearchProfilesDocument);
function getSdk$2(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$2;
  return {
    SearchPublications: function SearchPublications(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(SearchPublicationsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'SearchPublications', 'query');
    },
    SearchProfiles: function SearchProfiles(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(SearchProfilesDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'SearchProfiles', 'query');
    }
  };
}

/**
 * Search for profiles and publications.
 *
 * @group LensClient Modules
 */
var Search = /*#__PURE__*/function () {
  function Search(config, authentication) {
    _classCallCheck(this, Search);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$2(client);
    this.authentication = authentication;
  }

  /**
   * Search for profiles.
   *
   * @param request - Request object for the query
   * @returns Array of {@link ProfileFragment} wrapped in {@link PaginatedResult}
   *
   * @example
   * ```ts
   * const result = await client.search.profiles({
   *   query: 'lens',
   * });
   * ```
   */
  _createClass(Search, [{
    key: "profiles",
    value: function () {
      var _profiles = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(request) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(headers) {
                  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        return _context2.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(variables) {
                            var response, result;
                            return _regeneratorRuntime().wrap(function _callee$(_context) {
                              while (1) switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return _this.sdk.SearchProfiles(variables, headers);
                                case 2:
                                  response = _context.sent;
                                  result = response.data.result;
                                  invariant(result.__typename !== 'PublicationSearchResult', 'PublicationSearchResult is not expected in this query');
                                  return _context.abrupt("return", result);
                                case 6:
                                case "end":
                                  return _context.stop();
                              }
                            }, _callee);
                          }));
                          return function (_x3) {
                            return _ref2.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function profiles(_x) {
        return _profiles.apply(this, arguments);
      }
      return profiles;
    }()
    /**
     * Search for publications.
     *
     * @param request - Request object for the query
     * @returns Array of {@link CommentFragment} and/or {@link PostFragment} wrapped in {@link PaginatedResult}
     *
     * @example
     * ```ts
     * const result = await client.search.publications({
     *  query: 'lens',
     * });
     * ```
     */
  }, {
    key: "publications",
    value: function () {
      var _publications = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(request) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", provideAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(headers) {
                  return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                    while (1) switch (_context5.prev = _context5.next) {
                      case 0:
                        return _context5.abrupt("return", buildPaginatedQueryResult( /*#__PURE__*/function () {
                          var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(variables) {
                            var response, result;
                            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                              while (1) switch (_context4.prev = _context4.next) {
                                case 0:
                                  _context4.next = 2;
                                  return _this2.sdk.SearchPublications(variables, headers);
                                case 2:
                                  response = _context4.sent;
                                  result = response.data.result;
                                  invariant(result.__typename !== 'ProfileSearchResult', 'ProfileSearchResult is not expected in this query');
                                  return _context4.abrupt("return", result);
                                case 6:
                                case "end":
                                  return _context4.stop();
                              }
                            }, _callee4);
                          }));
                          return function (_x6) {
                            return _ref4.apply(this, arguments);
                          };
                        }(), request));
                      case 1:
                      case "end":
                        return _context5.stop();
                    }
                  }, _callee5);
                }));
                return function (_x5) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function publications(_x4) {
        return _publications.apply(this, arguments);
      }
      return publications;
    }()
  }]);
  return Search;
}();

var _templateObject$1, _templateObject2$1;
var GlobalProtocolStatsFragmentDoc = gql(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral(["\n    fragment GlobalProtocolStats on GlobalProtocolStats {\n  totalProfiles\n  totalBurntProfiles\n  totalPosts\n  totalMirrors\n  totalComments\n  totalCollects\n  totalFollows\n  totalRevenue {\n    asset {\n      ...Erc20\n    }\n    value\n  }\n}\n    ", ""])), Erc20FragmentDoc);
var GlobalProtocolStatsDocument = gql(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral(["\n    query GlobalProtocolStats($request: GlobalProtocolStatsRequest) {\n  result: globalProtocolStats(request: $request) {\n    ...GlobalProtocolStats\n  }\n}\n    ", ""])), GlobalProtocolStatsFragmentDoc);
var defaultWrapper$1 = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var GlobalProtocolStatsDocumentString = print(GlobalProtocolStatsDocument);
function getSdk$1(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper$1;
  return {
    GlobalProtocolStats: function GlobalProtocolStats(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(GlobalProtocolStatsDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'GlobalProtocolStats', 'query');
    }
  };
}

/**
 * Protocol stats.
 *
 * @group LensClient Modules
 */
var Stats = /*#__PURE__*/function () {
  function Stats(config) {
    _classCallCheck(this, Stats);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk$1(client);
  }

  /**
   * Fetch protocol stats.
   *
   * @param request - Request object for the query
   * @returns Protocol stats
   *
   * @example
   * ```ts
   * const result = await client.stats.fetch();
   * ```
   */
  _createClass(Stats, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(request) {
        var result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.sdk.GlobalProtocolStats({
                request: request
              });
            case 2:
              result = _context.sent;
              return _context.abrupt("return", result.data.result);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }
      return fetch;
    }()
  }]);
  return Stats;
}();

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var TransactionIndexedResultFragmentDoc = gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    fragment TransactionIndexedResult on TransactionIndexedResult {\n  __typename\n  indexed\n  txHash\n}\n    "])));
var TransactionErrorFragmentDoc = gql(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    fragment TransactionError on TransactionError {\n  __typename\n  reason\n}\n    "])));
var HasTxHashBeenIndexedDocument = gql(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    query HasTxHashBeenIndexed($request: HasTxHashBeenIndexedRequest!) {\n  result: hasTxHashBeenIndexed(request: $request) {\n    ... on TransactionIndexedResult {\n      ...TransactionIndexedResult\n    }\n    ... on TransactionError {\n      ...TransactionError\n    }\n  }\n}\n    ", "\n", ""])), TransactionIndexedResultFragmentDoc, TransactionErrorFragmentDoc);
var BroadcastProtocolCallDocument = gql(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    mutation BroadcastProtocolCall($request: BroadcastRequest!) {\n  result: broadcast(request: $request) {\n    ... on RelayerResult {\n      ...RelayerResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), RelayerResultFragmentDoc, RelayErrorFragmentDoc);
var BroadcastDataAvailabilityDocument = gql(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    mutation BroadcastDataAvailability($request: BroadcastRequest!) {\n  result: broadcastDataAvailability(request: $request) {\n    ... on CreateDataAvailabilityPublicationResult {\n      ...CreateDataAvailabilityPublicationResult\n    }\n    ... on RelayError {\n      ...RelayError\n    }\n  }\n}\n    ", "\n", ""])), CreateDataAvailabilityPublicationResultFragmentDoc, RelayErrorFragmentDoc);
var defaultWrapper = function defaultWrapper(action, _operationName, _operationType) {
  return action();
};
var HasTxHashBeenIndexedDocumentString = print(HasTxHashBeenIndexedDocument);
var BroadcastProtocolCallDocumentString = print(BroadcastProtocolCallDocument);
var BroadcastDataAvailabilityDocumentString = print(BroadcastDataAvailabilityDocument);
function getSdk(client) {
  var withWrapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultWrapper;
  return {
    HasTxHashBeenIndexed: function HasTxHashBeenIndexed(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(HasTxHashBeenIndexedDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'HasTxHashBeenIndexed', 'query');
    },
    BroadcastProtocolCall: function BroadcastProtocolCall(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(BroadcastProtocolCallDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'BroadcastProtocolCall', 'mutation');
    },
    BroadcastDataAvailability: function BroadcastDataAvailability(variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.rawRequest(BroadcastDataAvailabilityDocumentString, variables, _objectSpread2(_objectSpread2({}, requestHeaders), wrappedRequestHeaders));
      }, 'BroadcastDataAvailability', 'mutation');
    }
  };
}

/**
 * Check if the result is a {@link CreateDataAvailabilityPublicationResultFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link CreateDataAvailabilityPublicationResultFragment}
 */
function isCreateDataAvailabilityPublicationResult(result) {
  return result.__typename === 'CreateDataAvailabilityPublicationResult';
}

/**
 * Check if the result is a {@link RelayerResultFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link RelayerResultFragment}
 */
function isRelayerResult(result) {
  return result.__typename === 'RelayerResult';
}

/**
 * Check if the result is a {@link RelayErrorFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link RelayErrorFragment}
 */
function isRelayerError(result) {
  return result.__typename === 'RelayError';
}

/**
 * Check if the result is a {@link TransactionIndexedResultFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link TransactionIndexedResultFragment}
 */
function isTransactionIndexedResult(result) {
  return result.__typename === 'TransactionIndexedResult';
}

/**
 * Check if the result is a {@link TransactionErrorFragment}.
 *
 * @param result - result to check
 * @returns true if the result is a {@link TransactionErrorFragment}
 */
function isTransactionError(result) {
  return result.__typename === 'TransactionError';
}

var TransactionPollingError = /*#__PURE__*/function (_Error) {
  _inherits(TransactionPollingError, _Error);
  var _super = _createSuper(TransactionPollingError);
  function TransactionPollingError() {
    var _this;
    _classCallCheck(this, TransactionPollingError);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "name", 'TransactionPollingError');
    _defineProperty(_assertThisInitialized(_this), "message", 'Max attempts exceeded');
    return _this;
  }
  return _createClass(TransactionPollingError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 * Broadcast signed typed data for a gasless transaction.
 *
 * @remarks
 *
 * Typed data is a way to try to show the users what they are signing
 * in a more readable format. You should only call transaction broadcast
 * if you are using the typed data logic.
 *
 * @group LensClient Modules
 */
var Transaction = /*#__PURE__*/function () {
  function Transaction(config, authentication) {
    _classCallCheck(this, Transaction);
    var client = new FetchGraphQLClient(config.environment.gqlEndpoint);
    this.sdk = getSdk(client);
    this.authentication = authentication;
  }

  /**
   * Broadcast a signed typed data for a gasless transaction.
   *
   * ⚠️ Requires authenticated LensClient.
   *
   * @param request - Request object for the mutation
   * @returns {@link PromiseResult} with {@link RelayerResultFragment} or {@link RelayErrorFragment}
   *
   * @example
   * ```ts
   * const result = await client.transaction.broadcast({
   *   id: data.id,
   *   signature: signedTypedData,
   * });
   * ```
   */
  _createClass(Transaction, [{
    key: "broadcast",
    value: function () {
      var _broadcast = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(request) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _this2.sdk.BroadcastProtocolCall({
                          request: request
                        }, headers);
                      case 2:
                        result = _context.sent;
                        return _context.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function broadcast(_x) {
        return _broadcast.apply(this, arguments);
      }
      return broadcast;
    }()
    /**
     * Check if a transaction has been indexed.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param txId - transaction id
     * @returns {@link PromiseResult} with {@link TransactionIndexedResultFragment} or {@link TransactionErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.transaction.wasIndexed(txId);
     * ```
     */
  }, {
    key: "wasIndexed",
    value: function () {
      var _wasIndexed = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(txId) {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                    while (1) switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _this3.sdk.HasTxHashBeenIndexed({
                          request: {
                            txId: txId
                          }
                        }, headers);
                      case 2:
                        result = _context3.sent;
                        return _context3.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }, _callee3);
                }));
                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function wasIndexed(_x3) {
        return _wasIndexed.apply(this, arguments);
      }
      return wasIndexed;
    }()
    /**
     * Poll the transaction status until it has been indexed.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param txId - transaction id
     * @returns {@link PromiseResult} with {@link TransactionIndexedResultFragment} or {@link TransactionErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.transaction.waitForIsIndexed(txId);
     * ```
     */
  }, {
    key: "waitForIsIndexed",
    value: function () {
      var _waitForIsIndexed = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(txId) {
        var _this4 = this;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", poll({
                fn: function fn() {
                  return _this4.wasIndexed(txId);
                },
                validate: function validate(result) {
                  if (result.isSuccess()) {
                    var value = result.value;
                    if (isTransactionIndexedResult(value)) {
                      return value.indexed;
                    }
                  }
                  // in any not positive scenario, return true to resolve the polling with the Result
                  return true;
                },
                onMaxAttempts: function onMaxAttempts() {
                  return new TransactionPollingError();
                }
              }));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function waitForIsIndexed(_x5) {
        return _waitForIsIndexed.apply(this, arguments);
      }
      return waitForIsIndexed;
    }()
    /**
     * Broadcast a signed typed data for a data availability publication.
     *
     * ⚠️ Requires authenticated LensClient.
     *
     * @param request - Request object for the mutation
     * @returns {@link PromiseResult} with {@link CreateDataAvailabilityPublicationResultFragment} or {@link RelayErrorFragment}
     *
     * @example
     * ```ts
     * const result = await client.transaction.broadcastDataAvailability({
     *   id: data.id,
     *   signature: signedTypedData,
     * });
     * ```
     */
  }, {
    key: "broadcastDataAvailability",
    value: function () {
      var _broadcastDataAvailability = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(request) {
        var _this5 = this;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", requireAuthHeaders(this.authentication, /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(headers) {
                  var result;
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return _this5.sdk.BroadcastDataAvailability({
                          request: request
                        }, headers);
                      case 2:
                        result = _context6.sent;
                        return _context6.abrupt("return", result.data.result);
                      case 4:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function (_x7) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function broadcastDataAvailability(_x6) {
        return _broadcastDataAvailability.apply(this, arguments);
      }
      return broadcastDataAvailability;
    }()
  }]);
  return Transaction;
}();

/**
 * The LensClient is the main entry point for the LensClient SDK.
 * It provides access to all the different modules.
 *
 * @group LensClient
 *
 * @example
 * ```ts
 * import { LensClient, development } from '@lens-protocol/client';
 *
 * const client = new LensClient({
 *   environment: development
 * });
 * ```
 */
var LensClient = /*#__PURE__*/function () {
  /**
   * @param config - The configuration for the LensClient
   */
  function LensClient(config) {
    _classCallCheck(this, LensClient);
    this._authentication = new Authentication(config);
    this.config = config;
  }
  _createClass(LensClient, [{
    key: "authentication",
    get: function get() {
      return this._authentication;
    }

    /**
     * The Explore module
     */
  }, {
    key: "explore",
    get: function get() {
      return new Explore(this.config, this._authentication);
    }

    /**
     * The Feed module
     */
  }, {
    key: "feed",
    get: function get() {
      return new Feed(this.config, this._authentication);
    }

    /**
     * The Modules module
     */
  }, {
    key: "modules",
    get: function get() {
      return new Modules(this.config, this._authentication);
    }

    /**
     * The Nfts module
     */
  }, {
    key: "nfts",
    get: function get() {
      return new Nfts(this.config, this._authentication);
    }

    /**
     * The Nonces module
     */
  }, {
    key: "nonces",
    get: function get() {
      return new Nonces(this.config, this._authentication);
    }

    /**
     * The Notifications module
     */
  }, {
    key: "notifications",
    get: function get() {
      return new Notifications(this.config, this._authentication);
    }

    /**
     * The Profile module
     */
  }, {
    key: "profile",
    get: function get() {
      return new Profile(this.config, this._authentication);
    }

    /**
     * The ProxyAction module
     */
  }, {
    key: "proxyAction",
    get: function get() {
      return new ProxyAction(this.config, this._authentication);
    }

    /**
     * The Publication module
     */
  }, {
    key: "publication",
    get: function get() {
      return new Publication(this.config, this._authentication);
    }

    /**
     * The Reactions module
     */
  }, {
    key: "reactions",
    get: function get() {
      return new Reactions(this.config, this._authentication);
    }

    /**
     * The Revenue module
     */
  }, {
    key: "revenue",
    get: function get() {
      return new Revenue(this.config, this._authentication);
    }

    /**
     * The Search module
     */
  }, {
    key: "search",
    get: function get() {
      return new Search(this.config, this._authentication);
    }

    /**
     * The Stats module
     */
  }, {
    key: "stats",
    get: function get() {
      return new Stats(this.config);
    }

    /**
     * The Transaction module
     */
  }, {
    key: "transaction",
    get: function get() {
      return new Transaction(this.config, this._authentication);
    }
  }]);
  return LensClient;
}();

/**
 * @internal
 */
var Environment = /*#__PURE__*/function () {
  function Environment(name, url) {
    _classCallCheck(this, Environment);
    this.name = name;
    this.url = url;
  }
  _createClass(Environment, [{
    key: "gqlEndpoint",
    get: function get() {
      return this.url;
    }
  }]);
  return Environment;
}();
var production = new Environment('production', 'https://api.lens.dev');
var development = new Environment('development', 'https://api-mumbai.lens.dev');

/**
 * @deprecated Please use the {@link production} variable instead
 *
 * After extensive considerations, we have decided to rename the `polygon` variable into `production`.
 * See also the deprecated {@link mumbai} variable.
 *
 * The new variable names are meant to be more explicit about the intended usage.
 * It also helps to widen the meaning of these as we add features that are not limited to Polygon blockchain.
 */
var polygon = production;

/**
 * @deprecated Please use the {@link development} variable instead
 *
 * After extensive considerations, we have decided to rename the `mumbai` variable into `development`.
 * See also the deprecated {@link polygon} variable.
 *
 * The new variable names are meant to be more explicit about the intended usage.
 * It also helps to widen the meaning of these as we add features that are not limited to Polygon blockchain.
 */
var mumbai = development;

export { Authentication, CollectModules, CommentOrderingTypes, CommentRankingFilter, ContractType, CredentialsExpiredError, CustomFiltersTypes, Explore, Feed, FeedEventItemType, FollowModules, LensClient, Modules, Nfts, Nonces, NotAuthenticatedError, NotificationTypes, Notifications, Profile, ProfileSortCriteria, ProxyAction, ProxyActionStatusTypes, Publication, PublicationContentWarning, PublicationMainFocus, PublicationMediaSource, PublicationMetadataDisplayTypes, PublicationMetadataStatusType, PublicationReportReason, PublicationReportingFraudSubreason, PublicationReportingIllegalSubreason, PublicationReportingReason, PublicationReportingSensitiveSubreason, PublicationReportingSpamSubreason, PublicationSortCriteria, PublicationTypes, ReactionTypes, Reactions, ReferenceModules, RelayErrorReasons, Revenue, ScalarOperator, Search, Stats, StatusPollingError, Transaction, TransactionErrorReasons, TransactionPollingError, buildReportingReasonInputParams, development, isCreateDataAvailabilityPublicationResult, isProxyActionError, isProxyActionQueued, isProxyActionStatusResult, isRelayerError, isRelayerResult, isTransactionError, isTransactionIndexedResult, isValidProfileHandle, mumbai, polygon, production };
