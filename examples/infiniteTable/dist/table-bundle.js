(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["kompo"] = factory();
	else
		root["kompo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = construct;
exports.constructClass = constructClass;
exports.render = render;
exports.update = update;
exports.kompo = kompo;
exports.setState = setState;
exports.getState = getState;
exports.mount = mount;
exports.unmount = unmount;
exports.unmountAll = unmountAll;
exports.mountIndex = mountIndex;
exports.react = react;
exports.slot = slot;
exports.hasSlot = hasSlot;
exports.getRouter = getRouter;
exports.compose = compose;
exports.getProps = getProps;
exports.getMethods = getMethods;
exports.getMounts = getMounts;
exports.mountable = mountable;
exports.debug = debug;
exports.debugLifeCycle = debugLifeCycle;
exports.getSelector = getSelector;

var _store = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * When KOMPO_DEBUG is defined it returns it, otherwise is returns false
 * @returns boolean
 */
function isKompoDebug() {
    if (typeof KOMPO_DEBUG != 'undefined') {
        return KOMPO_DEBUG;
    }

    return false;
}

/**
 * Adds construct function to Element prototype
 */
if ((typeof Element === 'undefined' ? 'undefined' : _typeof(Element)) === 'object') {
    Object.defineProperty(Element.prototype, 'construct', {
        writable: true,
        value: function value() {
            throw new Error('Must override the construct method');
        }
    });
}

/**
 * Creates a compnent from an Element
 *
 * @param tag
 * @param constructFn
 * @param defaultProps
 * @returns {function()}
 */
function construct(tag, constructFn) {
    var defaultProps = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    return function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var c = kompo(document.createElement(tag));
        c.kompo.props = _extends({}, defaultProps, props);
        c.construct = constructFn;
        return c;
    };
}

function constructClass(tag, constructClass) {
    var defaultProps = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var methods = getMethods(constructClass.prototype);
    return function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var c = kompo(document.createElement(tag));
        c.kompo.props = _extends({}, defaultProps, props);
        _extends(c, methods);
        return c;
    };
}

/**
 * Renders given component
 *
 * @param Element
 */
function render(Element) {
    var kompo = Element.kompo;
    if (!kompo.initial) return;

    if (isKompoDebug() && kompo.debug) {
        console.groupCollapsed('RENDER: ');
        console.log(Element);
        console.log(kompo);
        console.groupCollapsed('CONSTRUCT: ');
    }

    // Construct then ...
    Element.construct(kompo.props);
    kompo.initial = false;

    if (isKompoDebug() && kompo.debug) {
        console.groupEnd();
    }

    // ... react
    var statefulls = kompo.statefulls,
        selector = kompo.selector,
        state = selector ? selector(Element.__kompo__.state) : Element.__kompo__.state;

    if (statefulls.length > 0 && state) {
        if (isKompoDebug() && kompo.debug) {
            console.log('HAS STATE: ', state);
            console.groupCollapsed('REACTS: ');
        }

        for (var i = 0, l = statefulls.length; i < l; ++i) {
            statefulls[i](state, Element);
        }

        if (isKompoDebug() && kompo.debug) {
            console.groupEnd();
        }
    }

    if (isKompoDebug() && kompo.debug) {
        console.groupEnd();
    }
}

function update(Element, state) {
    var kompo = Element.kompo;

    if (isKompoDebug() && kompo.debug) {
        console.groupCollapsed('UPDATE: ');
        console.log(Element);
        console.log(kompo);
    }

    updateStatefulls(Element, kompo, state);

    var mounts = kompo.mounts;
    if (mounts.length > 0) {
        if (isKompoDebug() && kompo.debug) {
            console.groupCollapsed('MOUNTS: ');
        }

        for (var i = 0, l = mounts.length; i < l; ++i) {
            update(mounts[i], state);
        }

        if (isKompoDebug() && kompo.debug) {
            console.groupEnd();
        }
    }

    if (isKompoDebug() && kompo.debug) {
        console.groupEnd();
    }
}

function updateStatefulls(Element, kompo, state) {
    var statefulls = kompo.statefulls;

    // Only run if a component has statefulls
    if (statefulls.length == 0) return;

    var selector = kompo.selector,
        selectedState = selector ? selector(Element.__kompo__.state) : Element.__kompo__.state;

    if (selectedState && (state === selectedState || inProperties(selectedState, state))) {
        if (isKompoDebug() && kompo.debug) {
            console.log('HAS DIRTY STATE: ', selectedState);
            console.groupCollapsed('REACTS: ');
        }

        for (var i = 0, l = statefulls.length; i < l; ++i) {
            var st = statefulls[i];

            if ((0, _store.shouldIgnore)(state, st)) {
                (0, _store.resetIgnore)(state);
                continue;
            }

            st(selectedState, Element);
        }

        if (isKompoDebug() && kompo.debug) {
            console.groupEnd();
        }
    }
}

function inProperties(selectedState, state) {
    if (selectedState && !(0, _store.isProxy)(selectedState)) {
        var keys = Object.keys(selectedState);
        for (var i = 0, l = keys.length; i < l; ++i) {
            if (state === selectedState[keys[i]]) {
                return true;
            }
        }
    }

    return false;
}

function kompo(Element) {
    Element.kompo = {
        initial: true,
        props: {},
        defaultProps: {},
        mounts: [],
        statefulls: [],
        slots: {},
        routed: undefined,
        selector: undefined,
        // state: undefined, // TODO Unavailable now but could perhaps be used as caching mechanism (also see setState())
        unmount: undefined,
        debug: false
    };

    return Element;
}

function setState(Element, selector) {
    var kompo = Element.kompo;
    // TODO Unavailable now but could perhaps be used as caching mechanism
    // if(apply) kompo.state = selector(Element.__kompo__.state);
    kompo.selector = selector;
    return Element;
}

function getState(Element) {
    var selector = Element.kompo.selector;
    return selector ? selector(Element.__kompo__.state) : Element.__kompo__.state;
}

function mount(parent, child, selector) {
    if (Array.isArray(child)) {
        _mountAll(parent, child, selector);
    } else {
        _mount(parent, child, selector);
    }
}

function _mount(parent, child, selector) {
    if (selector) {
        setState(child, selector);
    } else if (child instanceof Mountable) {
        setState(child.Element, child.selector);
        child = child.Element;
    }

    render(child);

    // Protection if same element is appended multiple times
    var mounts = parent.kompo.mounts;
    if (mounts.indexOf(child) === -1) {
        child.kompo.unmount = function () {
            mounts.splice(mounts.indexOf(child), 1);
        };
        mounts.push(child);
    }
}

function _mountAll(parent, children, selector) {
    // Mount all children ...
    for (var i = 0, l = children.length; i < l; ++i) {
        _mount(parent, children[i], selector ? selector : undefined);
    }
}

function unmount(Element) {
    Element.kompo.unmount();
}

function unmountAll(Element) {
    Element.kompo.mounts = [];
}

function mountIndex(parent, child) {
    return parent.kompo.mounts.indexOf(child);
}

function react(Element, statefull) {
    Element.kompo.statefulls.push(statefull);
}

/**
 * Mimics the slot functionality of
 * Web Components
 *
 * Slots are named, their name & location is
 * predefined in the component.
 *
 * @param Element
 * @param name
 * @param cb
 */
function slot(Element, name, cb) {
    if (arguments.length === 2) {
        Element.kompo.slots[name](Element);
    } else {
        Element.kompo.slots[name] = cb;
    }
}

/**
 * Checks whether a slot with the given name exists
 *
 * @param Element
 * @param name
 * @returns {boolean}
 */
function hasSlot(Element, name) {
    return Element.kompo.slots[name] ? true : false;
}

/**
 * Gets the router from an Element. The router is
 * add globally to the Element prototype
 *
 * @param Element
 * @returns {router}
 */
function getRouter(Element) {
    return Element.__kompo__.router;
}

/**
 * Adds properties to an existing component,
 * making it possible to compose a component with
 * different behavior.
 *
 * @param constructComponent
 * @param composeProps
 * @returns {function()}
 */
function compose(constructComponent, composeProps) {
    return function () {
        var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        return constructComponent(_extends(composeProps, props));
    };
}

function getProps(Element) {
    return Element.kompo.props;
}

function getMethods(clss) {
    var props = [],
        methods = {};

    var obj = clss;

    do {
        var ps = Object.getOwnPropertyNames(obj);

        var fps = [];
        for (var i = 0, l = ps.length; i < l; ++i) {
            var p = ps[i];
            if (typeof obj[p] === 'function' //only the methods
            && p != 'constructor' //not the constructor
            && (i == 0 || p !== ps[i - 1]) //not overriding in this prototype
            && props.indexOf(p) === -1 //not overridden in a child
            ) {
                    fps.push(p);
                    methods[p] = clss[p];
                }
        }

        props.push.apply(props, fps);
    } while ((obj = Object.getPrototypeOf(obj)) && //walk-up the prototype chain
    Object.getPrototypeOf(obj) //not the the Object prototype methods (hasOwnProperty, etc...)
    );

    return methods;
}

function getMounts(Element) {
    return Element.kompo.mounts;
}

var Mountable = function Mountable(Element, selector) {
    _classCallCheck(this, Mountable);

    this.Element = Element;
    this.selector = selector;
};

function mountable(Element, selector) {
    return new Mountable(Element, selector);
}

function debug(Element, level) {
    if (!Element instanceof HTMLElement) {
        throw new Error('Not an instance of Element');
    }

    if (!Element.hasOwnProperty('kompo')) {
        throw new Error('Is not a KompoElement');
    }

    var kompo = Element.kompo,
        mounts = kompo.mounts;

    console.log(Element, kompo);

    if (Number.isInteger(level) && level > 0 && mounts.length > 0) {
        console.groupCollapsed('MOUNTS: ');

        var nl = --level;
        for (var i = 0, l = mounts.length; i < l; ++i) {
            debug(mounts[i], nl);
            console.log('__END_OF_MOUNT__');
        }

        console.groupEnd();
    }

    return Element;
}

function debugLifeCycle(Element) {
    if (!Element instanceof HTMLElement) {
        throw new Error('Not an instance of Element');
    }

    if (!Element.hasOwnProperty('kompo')) {
        throw new Error('Is not a KompoElement');
    }

    // Set to true so render & update functions log the components life cycle
    Element.kompo.debug = true;

    return Element;
}

function getSelector(Element) {
    return Element.kompo.selector;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.util = exports.state = exports.router = undefined;

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

var _link = __webpack_require__(19);

var _link2 = _interopRequireDefault(_link);

var _router = __webpack_require__(20);

var _router2 = _interopRequireDefault(_router);

var _app = __webpack_require__(21);

var _app2 = _interopRequireDefault(_app);

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

var _hasProxy = __webpack_require__(23);

var _hasProxy2 = _interopRequireDefault(_hasProxy);

var _deproxy = __webpack_require__(22);

var _deproxy2 = _interopRequireDefault(_deproxy);

var _isObject = __webpack_require__(3);

var _isObject2 = _interopRequireDefault(_isObject);

var _merge = __webpack_require__(24);

var _merge2 = _interopRequireDefault(_merge);

var _isFunction = __webpack_require__(8);

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = {
    construct: _router2.default,
    route: _router.route,
    indexRoute: _router.indexRoute,
    swap: _router.swap,
    link: _link2.default
};

var state = {
    app: _app2.default,
    observe: _store2.default,
    isProxy: _store.isProxy,
    ignore: _store.ignore,
    shouldIgnore: _store.shouldIgnore,
    resetIgnore: _store.resetIgnore,
    dispatch: _store.dispatch,
    ignoreUpdate: _store.ignoreUpdate,
    resetIgnoreUpdate: _store.resetIgnoreUpdate,
    triggerUpdate: _store.triggerUpdate
};

var util = {
    hasProxy: _hasProxy2.default,
    deproxy: _deproxy2.default,
    isObject: _isObject2.default,
    merge: _merge2.default,
    isFunction: _isFunction2.default
};

exports.default = {
    construct: _component2.default,
    render: _component.render,
    update: _component.update,
    kompo: _component.kompo,
    setState: _component.setState,
    mount: _component.mount,
    getMounts: _component.getMounts,
    mountable: _component.mountable,
    react: _component.react,
    slot: _component.slot,
    getRouter: _component.getRouter,
    unmount: _component.unmount,
    unmountAll: _component.unmountAll,
    mountIndex: _component.mountIndex,
    getState: _component.getState,
    compose: _component.compose,
    getProps: _component.getProps,
    constructClass: _component.constructClass,
    debug: _component.debug,
    debugLifeCycle: _component.debugLifeCycle,
    getSelector: _component.getSelector
};
exports.router = router;
exports.state = state;
exports.util = util;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = observe;
exports.isProxy = isProxy;
exports.ignore = ignore;
exports.shouldIgnore = shouldIgnore;
exports.resetIgnore = resetIgnore;
exports.dispatch = dispatch;
exports.ignoreUpdate = ignoreUpdate;
exports.resetIgnoreUpdate = resetIgnoreUpdate;
exports.triggerUpdate = triggerUpdate;

var _component = __webpack_require__(0);

var _isObject = __webpack_require__(3);

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OBSERVED_KEY = '__kompo_observed__',
    IGNORE_STATEFULL_KEY = '__kompo_ignore_statefulls__',
    IGNORE_KEY = '__kompo_ignore__',
    TRIGGER_UPDATE_KEY = '__kompo_trigger_update__',
    // IMPORTANT Should not be in reserved keys
reservedKeys = ['length', IGNORE_STATEFULL_KEY, IGNORE_KEY];

function observe(obj, root) {
    var isObj = (0, _isObject2.default)(obj),
        isArray = Array.isArray(obj);

    if (!isObj && !isArray || obj.hasOwnProperty(OBSERVED_KEY)) return obj;

    Object.defineProperty(obj, OBSERVED_KEY, {
        value: true
    });

    Object.defineProperty(obj, IGNORE_STATEFULL_KEY, {
        value: [],
        writable: true
    });

    Object.defineProperty(obj, IGNORE_KEY, {
        value: false,
        writable: true
    });

    Object.defineProperty(obj, TRIGGER_UPDATE_KEY, {
        value: true,
        writable: true
    });

    var keys = Object.keys(obj);
    for (var i = 0, l = keys.length; i < l; ++i) {
        var key = keys[i];
        if (reservedKeys.indexOf(key) === -1) {
            obj[key] = observe(obj[key], root);
        }
    }

    obj = new Proxy(obj, {
        deleteProperty: function deleteProperty(target, key) {
            delete target[key];
            if (!obj[IGNORE_KEY]) requestAnimationFrame(function () {
                return (0, _component.update)(root, obj);
            });
            return true;
        },
        set: function set(target, key, val) {
            if (reservedKeys.indexOf(key) > -1 || obj[IGNORE_KEY]) {
                target[key] = val;
            } else {
                target[key] = observe(val, root);
                requestAnimationFrame(function () {
                    return (0, _component.update)(root, obj);
                });
            }

            return true;
        }
    });

    return obj;
}

function isProxy(obj) {
    return obj.hasOwnProperty(OBSERVED_KEY);
}

function ignore(obj) {
    for (var _len = arguments.length, statefulls = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        statefulls[_key - 1] = arguments[_key];
    }

    obj[IGNORE_STATEFULL_KEY] = statefulls;
}

function shouldIgnore(obj, statefull) {
    return obj[IGNORE_STATEFULL_KEY].indexOf(statefull) !== -1;
}

function resetIgnore(obj) {
    obj[IGNORE_STATEFULL_KEY] = [];
}

function dispatch(Element, cb, silent) {
    if (!cb) return;

    var state = (0, _component.getState)(Element);
    ignoreUpdate(state);
    cb(state);
    resetIgnoreUpdate(state);
    if (!silent) triggerUpdate(state);
}

function ignoreUpdate(obj) {
    obj[IGNORE_KEY] = true;
}

function resetIgnoreUpdate(obj) {
    obj[IGNORE_KEY] = false;
}

function triggerUpdate(obj) {
    obj[TRIGGER_UPDATE_KEY] = true;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isObject;

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'function' || value && type == 'object' || false;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addClasses = exports.throttle = exports.replace = exports.remove = exports.merge = exports.matches = exports.isObject = exports.isFunction = exports.empty = exports.delegate = exports.debounce = exports.addAttributes = exports.createText = exports.createFragment = exports.create = exports.capitalize = undefined;

var _capitalize = __webpack_require__(10);

var _capitalize2 = _interopRequireDefault(_capitalize);

var _create = __webpack_require__(5);

var _create2 = _interopRequireDefault(_create);

var _debounce = __webpack_require__(11);

var _debounce2 = _interopRequireDefault(_debounce);

var _delegate = __webpack_require__(12);

var _delegate2 = _interopRequireDefault(_delegate);

var _empty = __webpack_require__(13);

var _empty2 = _interopRequireDefault(_empty);

var _isFunction = __webpack_require__(14);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isObject = __webpack_require__(6);

var _isObject2 = _interopRequireDefault(_isObject);

var _matches = __webpack_require__(7);

var _matches2 = _interopRequireDefault(_matches);

var _merge = __webpack_require__(15);

var _merge2 = _interopRequireDefault(_merge);

var _remove = __webpack_require__(16);

var _remove2 = _interopRequireDefault(_remove);

var _replace = __webpack_require__(17);

var _replace2 = _interopRequireDefault(_replace);

var _throttle = __webpack_require__(18);

var _throttle2 = _interopRequireDefault(_throttle);

var _addClasses = __webpack_require__(9);

var _addClasses2 = _interopRequireDefault(_addClasses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.capitalize = _capitalize2.default;
exports.create = _create2.default;
exports.createFragment = _create.createFragment;
exports.createText = _create.createText;
exports.addAttributes = _create.addAttributes;
exports.debounce = _debounce2.default;
exports.delegate = _delegate2.default;
exports.empty = _empty2.default;
exports.isFunction = _isFunction2.default;
exports.isObject = _isObject2.default;
exports.matches = _matches2.default;
exports.merge = _merge2.default;
exports.remove = _remove2.default;
exports.replace = _replace2.default;
exports.throttle = _throttle2.default;
exports.addClasses = _addClasses2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;
exports.addAttributes = addAttributes;
exports.createFragment = createFragment;
exports.createText = createText;
var doc = document;

/**
 * Creates an Element, when no tagName
 * is given it create an empty div to serve
 * as root.
 *
 * @param {string|undefined} tagName
 * @returns {Element}
 */
function create(tagName, attributes) {
    var Element = void 0;
    if (!tagName) {
        Element = doc.createElement('div');
    } else {
        Element = doc.createElement(tagName);
    }

    if (attributes) {
        addAttributes(Element, attributes);
    }

    return Element;
}

/**
 * Adds attributes to an Element
 * through iterating through an object
 *
 * @param {Element} Element
 * @param {Object} obj
 * @returns {Element}
 */
function addAttributes(Element, obj) {
    var keys = Object.keys(obj);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i],
            value = obj[key];
        Element.setAttribute(key, value);
    }
    return Element;
}

/**
 * Syntactic sugar for creating a DocumentFragment
 *
 * @returns {DocumentFragment}
 */
function createFragment() {
    return doc.createDocumentFragment();
}

/**
 * Syntactic sugar for creating a TextNode
 *
 * @param {string} str
 * @returns {Text}
 */
function createText(str) {
    return doc.createTextNode(str);
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = isObject;

/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'function' || value && type == 'object' || false;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * Polyfills the matches function on Elements
 *
 * Used with event delegation in Components class
 */
exports.default = function () {
    if (!Element.prototype.matches) {
        var ep = Element.prototype;

        if (ep.webkitMatchesSelector) // Chrome <34, SF<7.1, iOS<8
            ep.matches = ep.webkitMatchesSelector;

        if (ep.msMatchesSelector) // IE9/10/11 & Edge
            ep.matches = ep.msMatchesSelector;

        if (ep.mozMatchesSelector) // FF<34
            ep.matches = ep.mozMatchesSelector;
    }
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFunction;

/**
 * Checks if given variable is a function
 *
 * @param {*} functionToCheck
 * @returns {boolean}
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = addClasses;
function addClasses(Element, classes) {
    for (var i = 0, l = classes.length; i < l; ++i) {
        Element.classList.add(classes[i]);
    }
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = capitalize;

/**
 * Capitalizes string
 *
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
    if (typeof str === "string") {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = debounce;

/**
 * Debounces a function call
 *
 * @param {Function} fn - function to debounce
 * @param {Number} delay - timeout for debouncing
 * @param {Object} scope
 * @returns {Function}
 */
function debounce(fn, delay, scope) {
    var timer = null;
    return function () {
        var context = scope || this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = delegate;

__webpack_require__(7);

// Self-executing

function delegate(Element, selector, type, listener) {
    Element.addEventListener(type, function (e) {
        for (var target = e.target; target && target != this; target = target.parentNode) {
            // loop parent nodes from the target to the delegation node
            if (target.matches(selector)) {
                listener.bind(target)(e);
                break;
            }
        }
    }, false);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = empty;
function empty(Element) {
    while (Element.lastChild) {
        Element.removeChild(Element.lastChild);
    }
    return Element;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFunction;

/**
 * Checks if given variable is a function
 *
 * @param {*} functionToCheck
 * @returns {boolean}
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = merge;
/**
 * Merges given objects
 *
 * @param {...Object} objs - Any given amount of objects
 * @returns {Object}
 */
function merge() {
    var object = Array.prototype.shift.call(arguments);
    for (var i = 0; i < arguments.length; i++) {
        var obj = arguments[i];
        for (var j in obj) {
            object[j] = obj[j];
        }
    }

    return object;
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (Element) {
    var parent = Element.parentNode;
    if (parent) {
        parent.removeChild(Element);
    }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = replace;

var _create = __webpack_require__(5);

var _create2 = _interopRequireDefault(_create);

var _isObject = __webpack_require__(6);

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Replaces an Node for another one
 *
 * @param {Node} parent - parent element to replace child on
 * @param {*} child - new child to replace for old child
 * @param {(boolean|Object)} replaceLastChild - replace first or last child | represents an attribute object
 * @param {boolean} rLC
 * @returns {Element} child - child element
 */
function replace(parent, child) {
    var replaceLastChild = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
    var rLC = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    var arg2isObject = (0, _isObject2.default)(arguments[2]);
    var replacedChild = void 0;
    if (arg2isObject) {
        replacedChild = rLC ? parent.lastChild : parent.firstChild;
    } else {
        replacedChild = replaceLastChild ? parent.lastChild : parent.firstChild;
    }

    if (typeof child === 'string') {
        child = (0, _create2.default)(child);
    }

    if (arg2isObject) {
        (0, _create.addAttributes)(child, replaceLastChild);
    }

    if (replacedChild) {
        parent.replaceChild(child, replacedChild);
    } else {
        parent.appendChild(child);
    }

    return child;
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = throttle;

/**
 * Throttle function
 *
 * @param {Function} fn - function to throttle
 * @param {Number} threshold - timeout for throttling
 * @param {Object} scope
 * @returns {Function}
 */
function throttle(fn, threshold, scope) {
    threshold || (threshold = 250);
    var last = void 0,
        deferTimer = void 0;
    return function () {
        var context = scope || this,
            now = +new Date(),
            args = arguments;
        if (last && now < last + threshold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshold);
        } else {
            last = now;
            return fn.apply(context, args);
        }
    };
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = __webpack_require__(0);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _component2.default)('a', function (_ref) {
    var _this = this;

    var url = _ref.url;
    var child = _ref.child;
    var classNames = _ref.classNames;
    var data = _ref.data;
    var title = _ref.title;
    var defaultEvent = _ref.defaultEvent;
    var activeClass = _ref.activeClass;
    var onClick = _ref.onClick;

    // First add classes
    for (var i = 0, l = classNames.length; i < l; ++i) {
        this.classList.add(classNames[i]);
    }

    var router = (0, _component.getRouter)(this);

    (0, _component.react)(this, function () {
        if (router.isUrl(url)) {
            _this.classList.add(activeClass);
        } else {
            _this.classList.remove(activeClass);
        }
    });

    this.setAttribute('href', url);

    if (typeof child === 'string') {
        this.textContent = child;
    } else if (child.hasOwnProperty('kompo')) {
        (0, _component.mount)(this, child);
        this.appendChild(child);
    } else if (child instanceof Node) {
        this.appendChild(child);
    } else if ((0, _component.hasSlot)(this, 'child')) {
        (0, _component.slot)(this, 'child');
    } else {
        throw new Error('Child should be a string, KompoElement, Node or a slot callback named "child"');
    }

    this.addEventListener(defaultEvent, function (e) {
        e.preventDefault();
        if (onClick) {
            onClick(e);
        }
        router.goTo(url, title, data);
        var state = (0, _component.getState)(_this);
        state.url = url;
    });
}, {
    url: '',
    child: '',
    classNames: [],
    data: undefined, // Data to push with pushState()
    title: '',
    defaultEvent: 'click',
    activeClass: 'active',
    onClick: undefined
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = construct;
exports.route = route;
exports.indexRoute = indexRoute;
exports.swap = swap;

var _component = __webpack_require__(0);

var _isFunction = __webpack_require__(8);

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function construct(props) {
    props = _extends({
        base: '/',
        url: '/',
        notFoundCallback: function notFoundCallback(url) {
            throw new Error('No matching route found for url: ' + url + '. Provide a notFoundCallback callback option or correct the url or route.');
        }
    }, props);

    var base = void 0,
        url = void 0,
        index = 0,
        params = [];

    var rawRoutes = {},
        routes = {};

    setBase(props.base);
    setUrl(props.url);
    parseRoute(props.routes);

    function setBase(b) {
        if (b[0] !== '/') {
            b = '/' + b;
        }

        if (b.slice(-1) === '/') {
            b = b.slice(0, -1);
        }

        base = b;
    }

    function setUrl(u) {
        url = u[0] === '/' ? u : '/' + u;
    }

    function isUrl(u) {
        u = u[0] === '/' ? u : '/' + u;
        return url === u;
    }

    function parseRoute(Route) {
        buildPath(Route);

        var rawKeys = Object.keys(rawRoutes);
        for (var i = 0, l = rawKeys.length; i < l; i++) {
            var k = rawKeys[i],

            // TODO: Could this be improved?
            nk = k.replace(/(:([\w-]+))/g, '([\\w-]+)').replace(/\//g, '\\/');
            routes[nk] = rawRoutes[k];
        }
    }

    function buildPath(route) {
        var ancestors = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        var hierarchy = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
        var level = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        var children = route.children;
        var routeComponent = route.component;

        if (routeComponent instanceof Element) {
            routeComponent.kompo.level = level;
        } else if (routeComponent instanceof Promise || (0, _isFunction2.default)(routeComponent)) {
            // Set a level to the promise
            routeComponent.kompo = { level: level };
        }

        if (!children) return;

        var basePath = route.path,
            isRoot = ancestors.length === 0;

        for (var i = 0, l = children.length; i < l; i++) {
            var childRoute = children[i],
                componentPath = !isRoot ? ancestors.concat(childRoute.component) : ancestors.concat(routeComponent, childRoute.component),
                childHierarchy = hierarchy.concat(i);

            var _path = void 0;

            if (childRoute.path[0] === '/') {
                _path = childRoute.path;
            } else if (isRoot) {
                _path = basePath + childRoute.path;
            } else if (childRoute.path === '') {
                _path = basePath;
            } else {
                _path = basePath + '/' + childRoute.path;
            }

            childRoute.path = _path;
            rawRoutes[_path] = {
                components: componentPath,
                hierarchy: childHierarchy
            };
            buildPath(childRoute, componentPath, childHierarchy, level + 1);
        }
    }

    function match(url, against) {
        var keys = Object.keys(against);
        for (var i = 0, l = keys.length; i < l; i++) {
            var regexstr = keys[i],
                _match = url.match(new RegExp('^' + regexstr + '$'));
            if (_match !== null) {
                _match.shift();
                params = _match;
                return against[regexstr];
            }
        }

        if (props.notFoundCallback) {
            props.notFoundCallback(url);
        }

        return []; // Return empty array to keep it all running
    }

    function getSiblingRoutes(hierarchy, index) {
        return scanSiblingsRoutes(hierarchy, props.routes, index - 1, 0);
    }

    function scanSiblingsRoutes(hierarchy, parentRoute, toIndex, currentIndex) {
        hierarchy = hierarchy.slice(); // Slice in order to prevent editing original array
        if (currentIndex === toIndex) {
            return parentRoute.children;
        }

        return scanSiblingsRoutes(hierarchy, parentRoute.children[hierarchy.shift()], toIndex, currentIndex + 1);
    }

    return {
        getParams: function getParams() {
            return params;
        },
        isUrl: isUrl,
        getUrl: function getUrl() {
            return url;
        },
        setTo: function setTo(u) {
            u = u.replace(base, '');
            if (isUrl(u)) return false;

            setUrl(u);
            return true;
        },
        goTo: function goTo(u) {
            var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
            var data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            if (isUrl(u)) return false;

            setUrl(u);

            history.pushState(data, title, base + url);
            return true;
        },
        get: function get(parent, depth, includeSiblings) {
            if (parent instanceof Element) {
                index = parent.kompo.level + 1;
            }

            var md = match(url, routes),
                mc = md.components;

            if (depth) {
                if (includeSiblings) {
                    mc[index] = {
                        component: mc[index],
                        siblings: getSiblingRoutes(md.hierarchy, index)
                    };
                }
                // For negative values, do + because index-(-depth) will be positive instead of negative
                if (depth < 0) return mc.slice(index + depth, index + 1);
                return mc.slice(index, index + depth);
            } else {
                return includeSiblings ? {
                    component: mc[index],
                    siblings: getSiblingRoutes(md.hierarchy, index)
                } : mc[index];
            }
        }
    };
}

function route(path, component, children) {
    return {
        path: path, component: component, children: children
    };
}

function indexRoute(component, children) {
    return route('', component, children);
}

function swap(component, router, element) {
    var c = router.get(component),
        fn = void 0;

    if (c) {
        if ((0, _isFunction2.default)(c)) {
            fn = c;
            c = _toPromise(c);
        }

        if (c instanceof Element) {
            _swap(component, c, element);
        } else if (c instanceof Promise) {
            if (c.kompo.resolved) {
                _swap(component, c.kompo.resolved, element);
            } else {
                c.then(function (rc) {
                    rc.kompo.level = c.kompo.level;
                    _swap(component, rc, element);
                    c.kompo.resolved = rc;
                    if (fn) fn.kompo.resolved = rc;
                }).catch(function () {
                    console.error("Cannot dynamically load module for route");
                });
            }
        }
    }
}

function _toPromise(fn) {
    var pr = fn();

    // Transfer kompo object including level to the promise
    pr.kompo = fn.kompo;

    return pr;
}

function _swap(parent, routedComponent, element) {
    var routed = parent.kompo.routed,
        el = element ? element : parent;

    if (routed === routedComponent) return;

    if (routed) {
        el.replaceChild(routedComponent, routed);
        (0, _component.unmount)(routed);
    } else {
        el.appendChild(routedComponent);
    }

    (0, _component.mount)(parent, routedComponent);
    parent.kompo.routed = routedComponent;
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = app;

var _store = __webpack_require__(2);

var _store2 = _interopRequireDefault(_store);

var _component = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function app(root, state, router) {
    state = (0, _store2.default)(state, root);

    // Make available for all Elements
    Object.defineProperty(Element.prototype, '__kompo__', {
        value: {
            root: root,
            state: state,
            router: router
        }
    });

    return {
        start: function start(selector) {
            if (selector) {
                (0, _component.setState)(root, selector);
            }
            requestAnimationFrame(function () {
                return (0, _component.render)(root);
            });
            return root;
        }
    };
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = deproxy;

var _isObject = __webpack_require__(3);

var _isObject2 = _interopRequireDefault(_isObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deproxy(obj) {
    var isObj = (0, _isObject2.default)(obj),
        isArray = Array.isArray(obj);

    if (!isObj && !isArray) return obj;

    if (isArray) {
        obj = obj.slice();
        for (var i = 0, l = obj.length; i < l; ++i) {
            obj[i] = deproxy(obj[i]);
        }
    } else {
        obj = _extends({}, obj);
        var keys = Object.keys(obj);
        for (var i = 0, l = keys.length; i < l; ++i) {
            obj[keys[i]] = deproxy(obj[keys[i]]);
        }
    }

    return obj;
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
        return 'Proxy' in self;
    } else {
        return 'Proxy' in window;
    }
}();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = merge;

/**
 * Merges given objects
 *
 * @param {...Object} objs - Any given amount of objects
 * @returns {Object}
 */
function merge() {
    var object = Array.prototype.shift.call(arguments);
    for (var i = 0; i < arguments.length; i++) {
        var obj = arguments[i];
        for (var j in obj) {
            object[j] = obj[j];
        }
    }

    return object;
}

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kompo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kompo_util__);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_kompo___default.a.construct('tr', function (_ref) {
    var _this = this;

    var defaultClass = _ref.defaultClass;
    var selectedClass = _ref.selectedClass;
    var hasColumnFilter = _ref.hasColumnFilter;
    var columnFilter = _ref.columnFilter;


    if (defaultClass) this.classList.add(defaultClass);

    __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.react(this, function (s) {
        if (selectedClass) {
            if (_this.kompo.props.selected) {
                _this.classList.add(selectedClass);
            } else {
                _this.classList.remove(selectedClass);
            }
        }

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["empty"])(_this);
        var data = hasColumnFilter ? columnFilter(s) : s,
            keys = Object.keys(data);
        for (var i = 0, l = keys.length; i < l; ++i) {
            var k = keys[i],
                v = data[k];

            // if(typeof minimizeWhitelist !== 'undefined') {
            //     const onWhitelist = isObject?
            //     minimizeWhitelist.indexOf(k) === -1:
            //     minimizeWhitelist.indexOf(filtered[k]) === -1;
            //     if(minimize && onWhitelist) {
            //         continue;
            //     }
            // }

            var c = _this.appendChild(document.createElement('td'));
            if (v instanceof Node) {
                c.appendChild(v);
            } else {
                c.textContent = v;
            }
        }
    });
}, {
    defaultClass: ''
}));

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kompo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kompo_util__);



/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_kompo___default.a.construct('tr', function (_ref) {
    var _this = this;

    var defaultClass = _ref.defaultClass;
    var hasColumnFilter = _ref.hasColumnFilter;
    var columnFilter = _ref.columnFilter;


    if (defaultClass) this.classList.add(defaultClass);

    __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.react(this, function (s) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["empty"])(_this);
        var data = hasColumnFilter ? columnFilter(s) : s,
            keys = Object.keys(data);
        for (var i = 0, l = keys.length; i < l; ++i) {
            // if(typeof minimizeWhitelist !== 'undefined') {
            //     const onWhitelist = isObject?
            //     minimizeWhitelist.indexOf(k) === -1:
            //     minimizeWhitelist.indexOf(filtered[k]) === -1;
            //     if(minimize && onWhitelist) {
            //         continue;
            //     }
            // }

            var c = _this.appendChild(document.createElement('th'));
            c.textContent = keys[i];
        }
    });
}, {
    defaultClass: ''
}));

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export resetSpacers */
/* unused harmony export multiSelect */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kompo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kompo_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tableRow__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tableHead__ = __webpack_require__(34);


var ignoreUpdate = __WEBPACK_IMPORTED_MODULE_0_kompo__["state"].ignoreUpdate;
var resetIgnoreUpdate = __WEBPACK_IMPORTED_MODULE_0_kompo__["state"].resetIgnoreUpdate;
var triggerUpdate = __WEBPACK_IMPORTED_MODULE_0_kompo__["state"].triggerUpdate;





/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_kompo___default.a.construct('table', function (_ref) {
    var _this = this;

    var appendRow = _ref.appendRow;
    var on = _ref.on;
    var classes = _ref.classes;
    var oddRowClass = _ref.oddRowClass;
    var evenRowClass = _ref.evenRowClass;
    var selectedClass = _ref.selectedClass;
    var appendHead = _ref.appendHead;
    var headRowClass = _ref.headRowClass;
    var emptyNotice = _ref.emptyNotice;
    var emptyClass = _ref.emptyClass;
    var scrollableElement = _ref.scrollableElement;
    var topSpacer = _ref.topSpacer;
    var bottomSpacer = _ref.bottomSpacer;
    var rowHeight = _ref.rowHeight;
    var blockSize = _ref.blockSize;
    var scrollThrottle = _ref.scrollThrottle;
    var uniqueKey = _ref.uniqueKey;

    var head = document.createElement('thead'),
        body = document.createElement('tbody'),
        props = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.getProps(this),
        frag = document.createDocumentFragment();

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isFunction"])(on)) on(this);

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["addClasses"])(this, classes);

    var wasEmpty = false;

    scrollableElement = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isFunction"])(scrollableElement) ? scrollableElement() : scrollableElement;

    if (scrollableElement) {
        scrollableElement.style.overflowAnchor = 'none'; // Prevent weird Chrome 56+ behavior
        scrollableElement.addEventListener('scroll', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["throttle"])(function (e) {
            var state = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.getState(_this),
                dataLength = state.data.length,
                scrollPosition = scrollableElement.scrollTop,

            // TODO clientHeight could be troublesome
            reqPerBody = (Math.ceil(scrollableElement.clientHeight / rowHeight / blockSize) + 2) * blockSize,
                visibleStart = Math.floor(scrollPosition / rowHeight),
                renderStart = Math.max((Math.floor(visibleStart / blockSize) - 1) * blockSize, 0),
                visibleEnd = Math.min(renderStart + reqPerBody, dataLength);

            if (state.offset !== renderStart || state.limit !== visibleEnd - renderStart) {
                ignoreUpdate(state);
                state.offset = renderStart;
                state.limit = visibleEnd - renderStart;
                resetIgnoreUpdate(state);
                triggerUpdate(state);
            }
        }, scrollThrottle));
    }

    var reactFn = function reactFn(state) {
        var data = state.data;
        var offset = state.offset,
            limit = state.limit,
            minimize = state.minimize,
            rowFilter = props.rowFilter,
            columnFilter = props.columnFilter;

        if (!Array.isArray(data)) return;
        if (!Array.isArray(data)) {
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isObject"])(data)) {
                data = Object.values(data);
            } else {
                return;
            }
        }

        // Empty out before append
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["empty"])(head);
        __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.unmountAll(_this);

        // When empty...
        if (data.length == 0) {
            // ... render empty notice
            var tr = document.createElement('tr'),
                td = document.createElement('td');

            td.textContent = emptyNotice;
            tr.appendChild(td);
            head.appendChild(tr);
            _this.classList.add(emptyClass);
            wasEmpty = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["empty"])(body);
            return;
        } else if (wasEmpty) {
            // Remove empty notice
            _this.classList.remove(emptyClass);
            wasEmpty = false;
        }

        var hasRowFilter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isFunction"])(rowFilter),
            hasColumnFilter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isFunction"])(columnFilter);

        appendHead(_this, head, {
            defaultClass: headRowClass,
            minimizeWhitelist: props.minimizeWhitelist,
            hasColumnFilter: hasColumnFilter,
            columnFilter: columnFilter
        });

        var dataLength = data.length;
        var os = offset && offset <= dataLength ? offset : 0;
        var l = typeof limit !== 'undefined' && os + limit < dataLength ? os + limit : dataLength;

        // Set spacer heights
        bottomSpacer.style.height = rowHeight * (dataLength - (offset + limit)) + 'px';
        topSpacer.style.height = rowHeight * offset + 'px';

        for (os; os < l; ++os) {
            if (hasRowFilter && !rowFilter(data[os])) continue;
            appendRow(_this, frag, os, {
                defaultClass: os % 2 == 0 ? evenRowClass : oddRowClass,
                selectedClass: selectedClass,
                hasColumnFilter: hasColumnFilter,
                columnFilter: columnFilter,
                selected: props.selected,
                uniqueKey: uniqueKey
            });
        }

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["empty"])(body);
        body.appendChild(frag);
    };

    __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.react(this, reactFn);

    this.appendChild(head);
    this.appendChild(body);
}, {
    classes: [],
    oddRowClass: '',
    evenRowClass: '',
    headRowClass: '',
    minimizeWhitelist: undefined,
    emptyNotice: 'No data found',
    emptyClass: 'empty',
    appendRow: function appendRow(table, frag, key, props) {
        var tr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tableRow__["a" /* default */])(props);
        __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.mount(table, tr, function (s) {
            var ns = table.kompo.selector ? table.kompo.selector(s).data[key] : s.data[key];

            if (ns && props.selected && ns.hasOwnProperty(props.uniqueKey)) {
                tr.kompo.props.selected = props.selected.hasOwnProperty(ns[props.uniqueKey]);
            }

            return ns;
        });
        frag.appendChild(tr);
    },
    appendHead: function appendHead(table, head, props) {
        var tr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tableHead__["a" /* default */])(props);
        __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.mount(table, tr, function (s) {
            return table.kompo.selector ? table.kompo.selector(s).data[0] : s.data[0];
        });
        head.appendChild(tr);
    },

    scrollableElement: undefined,
    topSpacer: undefined,
    bottomSpacer: undefined,
    rowHeight: 20,
    blockSize: 5,
    scrollThrottle: 10,
    uniqueKey: 'id',
    selected: {}
}));

function resetSpacers(infiniteTable) {
    var props = infiniteTable.kompo.props;
    props.topSpacer.style.height = 0;
    props.bottomSpacer.style.height = 0;
}

function multiSelect(table, e) {
    var target = e.target.parentNode,
        tableProps = table.kompo.props,
        key = keySelected(tableProps, target);

    // Remove if already in selected
    if (tableProps.selected.hasOwnProperty(key)) {
        target.classList.remove(tableProps.selectedClass);
        delete tableProps.selected[key];
        return;
    }

    tableProps.selected[key] = target;
    target.classList.add(tableProps.selectedClass);
}

function keySelected(tableProps, row) {
    var s = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.getState(row);
    return s[tableProps.uniqueKey];
}

/***/ }),
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kompo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kompo_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_js_table_infiniteTable__ = __webpack_require__(53);
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

// Component and content creation classes and functions



// Example components with self-explanatory name


// Create root component
var root = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.construct('div', function (_ref) {
    _objectDestructuringEmpty(_ref);

    var scrollable = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('div', { 'class': 'o-Scrollable' }),
        topSpacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('div', { 'style': 'height: 0' }),
        bottomSpacer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('div', { 'style': 'height: 0' }),
        t1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__src_js_table_infiniteTable__["a" /* default */])({
        classes: ['o-Table', 'u-mbn'],
        oddRowClass: 'o-Table-row--isOdd',
        evenRowClass: 'o-Table-row--isEven',
        selectedClass: 'selected',
        uniqueKey: 'id',
        on: function on(table) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["delegate"])(table, 'tr', 'click', function (e) {
                e.preventDefault();
                var target = e.target.parentNode,
                    tableProps = table.kompo.props,
                    key = keySelected(tableProps, target);

                // Remove if already in selected
                if (tableProps.selected.hasOwnProperty(key)) {
                    target.classList.remove(tableProps.selectedClass);
                    delete tableProps.selected[key];
                    return;
                }

                tableProps.selected[key] = target;
                target.classList.add(tableProps.selectedClass);
            });
        },
        minimizeWhitelist: ['firstname'],
        scrollableElement: scrollable,
        topSpacer: topSpacer,
        bottomSpacer: bottomSpacer
    });

    this.appendChild(scrollable);
    scrollable.appendChild(topSpacer);
    __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.mount(this, t1);
    scrollable.appendChild(t1);
    scrollable.appendChild(bottomSpacer);
});

function keySelected(tableProps, row) {
    if (!tableProps.selected) {
        tableProps.selected = {};
    }

    var s = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.getState(row);
    return s[tableProps.uniqueKey];
}

// Create instance of root and
// append table to body
document.body.appendChild(__WEBPACK_IMPORTED_MODULE_0_kompo__["state"].app(root(), {
    limit: 10,
    minimize: true,
    offset: 0,
    data: [{
        id: 1,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 2,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 3,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 4,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 5,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 6,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 7,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 8,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 9,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 10,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 11,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 12,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 13,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 14,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 15,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 16,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 17,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 18,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 19,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 20,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 21,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 22,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 23,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 24,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 25,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 26,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 27,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 28,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 29,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 30,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 31,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 32,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 33,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }, {
        id: 34,
        firstname: 'rick',
        lastname: 'deckard',
        movie: 'blade runner 123456789'
    }, {
        id: 35,
        firstname: 'mia',
        lastname: 'wallace',
        movie: 'pulp fiction'
    }, {
        id: 36,
        firstname: 'rocky',
        lastname: 'balboa',
        movie: 'rocky'
    }]
}).start());

/***/ })
/******/ ]);
});
//# sourceMappingURL=table-bundle.js.map