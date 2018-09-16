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
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
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
/* 25 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(27);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);

	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getDynamicWidth;
/**
 * Excepts an object such as:
 * 
 * {
 *      default: 60,
 *      600: 20
 * }
 * 
 * IMPORTANT default key is obligatory
 * 
 * @param widths Object
 * @returns int 
 */
function getDynamicWidth(widths) {
    var keys = Object.keys(widths).sort(),
        cw = document.body.clientWidth;

    for (var i = 0, l = keys.length; i < l; ++i) {
        if (cw < keys[i]) {
            return widths[keys[i]];
        }
    }

    return widths.default;
}

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kompo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kompo_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_getDynamicWidth__ = __webpack_require__(28);

var dispatch = __WEBPACK_IMPORTED_MODULE_0_kompo__["state"].dispatch;
var mount = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.mount;
var getRouter = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.getRouter;






/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_kompo___default.a.construct('div', function (_ref) {
    var _classList,
        _this = this;

    var classNames = _ref.classNames;
    var basis = _ref.basis;
    var unit = _ref.unit;
    var component = _ref.component;
    var overlay = _ref.overlay;
    var index = _ref.index;
    var slideTo = _ref.slideTo;
    var slideToUrl = _ref.slideToUrl;
    var slideBack = _ref.slideBack;
    var multiPanelProps = _ref.multiPanelProps;

    var percentage = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isObject"])(basis) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_getDynamicWidth__["a" /* default */])(basis) / 100 * multiPanelProps.totalWidthPercentage : basis / 100 * multiPanelProps.totalWidthPercentage,
        pu = percentage + unit;

    classNames.push('o-MultiPanel-panel');
    (_classList = this.classList).add.apply(_classList, classNames);
    this.style.flexBasis = pu;
    this.style.width = pu;

    if (overlay) {
        var o = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('div', { 'class': 'o-MultiPanel-panel-overlay' });
        this.appendChild(o);
        o.addEventListener('click', function (e) {
            if (slideBack) {
                history.back();
            } else if (slideToUrl) {
                dispatch(_this, function (state) {
                    state.url = slideToUrl();
                });
            } else if (typeof index !== 'undefined' && slideTo) {
                slideTo(index);
            }
        });
    }

    // Pass on level to component for further routing
    component.kompo.level = this.kompo.level;

    mount(this, component, this.kompo.selector);
    this.appendChild(component);
}, {
    classNames: [],
    basis: 100,
    unit: '%',
    component: undefined,
    overlay: true,
    index: undefined,
    slideTo: undefined,
    slideToUrl: undefined,
    multiPanelProps: undefined,
    slideBack: false
}));

/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = slideTo;
/* harmony export (immutable) */ __webpack_exports__["c"] = slide;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kompo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kompo_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_getDynamicWidth__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_multiPanel_css__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_multiPanel_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__css_multiPanel_css__);

var getProps = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.getProps;
var mount = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.mount;








var multiPanel = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.construct('div', function (_ref) {
    var _this = this,
        _classList;

    var classNames = _ref.classNames;
    var overlay = _ref.overlay;
    var unit = _ref.unit;
    var transitionDuration = _ref.transitionDuration;
    var easingFunction = _ref.easingFunction;
    var children = _ref.children;

    var wrapper = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('div'),
        props = getProps(this);

    window.addEventListener('resize', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["throttle"])(function (e) {
        var index = children.indexOf(props.activePanel);

        // No component is routed abort all work
        if (index < 0) return;

        // Reset totalWidth
        var changedChildren = [];
        props.totalWidth = 0;

        for (var i = 0, l = children.length; i < l; ++i) {
            var child = children[i],
                childProps = getProps(child),
                basis = childProps.basis;

            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isObject"])(basis)) {
                var changedTo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_getDynamicWidth__["a" /* default */])(basis);
                if (changedTo === childProps.activeWidth) {
                    props.totalWidth = props.totalWidth + childProps.activeWidth;
                } else {
                    props.totalWidth = props.totalWidth + changedTo;
                    childProps.activeWidth = changedTo;
                    changedChildren.push(true);
                }
            } else {
                props.totalWidth = props.totalWidth + childProps.basis;
            }
        }

        // If no children have changed don't change anything
        if (changedChildren.length === 0) return;

        props.totalWidthPercentage = 100 / props.totalWidth * 100;

        for (var _i = 0, _l = children.length; _i < _l; ++_i) {
            var _child = children[_i],
                _childProps = getProps(_child),
                _basis = _childProps.basis,
                percentage = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isObject"])(_basis) ? _childProps.activeWidth / 100 * props.totalWidthPercentage : _basis / 100 * props.totalWidthPercentage,
                pu = percentage + unit;

            _child.style.flexBasis = pu;
            _child.style.width = pu;
        }

        // Use double request animation frames to make sure
        // the panels do not animate on resize
        wrapper.style.transition = 'none';
        requestAnimationFrame(function () {
            slideTo(_this, children, index);
            requestAnimationFrame(function () {
                wrapper.style.transition = 'transform ' + transitionDuration + 'ms';
            });
        });
    }, 200));

    classNames.push('o-MultiPanel');
    if (overlay) classNames.push('o-MultiPanel--withOverlay');
    (_classList = this.classList).add.apply(_classList, classNames);

    for (var i = 0, l = children.length; i < l; ++i) {
        var child = children[i],
            childProps = getProps(child);

        childProps.index = i;
        childProps.slideTo = function (index) {
            return slideTo(_this, children, index);
        };

        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isObject"])(childProps.basis)) {
            var dw = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_getDynamicWidth__["a" /* default */])(childProps.basis);
            props.totalWidth = props.totalWidth + dw;
            childProps.activeWidth = dw;
        } else {
            props.totalWidth = props.totalWidth + childProps.basis;
        }

        childProps.multiPanelProps = props;
        wrapper.appendChild(child);
    }

    props.totalWidthPercentage = 100 / props.totalWidth * 100;

    wrapper.style.width = props.totalWidth + unit;
    requestAnimationFrame(function () {
        wrapper.style.transition = 'transform ' + transitionDuration + 'ms ' + easingFunction;
    });

    props.wrapper = wrapper;

    // Pass on selector
    mount(this, children, this.kompo.selector);
    this.appendChild(wrapper);
}, {
    classNames: [],
    unit: '%',
    transitionDuration: 500,
    totalWidth: 0,
    wrapper: undefined,
    overlay: true,
    easingFunction: 'ease',
    children: []
});

/* harmony default export */ __webpack_exports__["b"] = (multiPanel);

function slideTo(multiPanel, panels, index) {
    var initial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var translateTo = 0,
        totalPercentage = 0;

    var props = getProps(multiPanel);

    for (var i = 0, l = panels.length; i < l; ++i) {
        var panel = panels[i];

        if (i < index) {
            translateTo = translateTo + getFlexBasis(panel);
        }

        if (!initial && !panel.classList.contains('o-MultiPanel-panel--withOverlayTransition')) {
            panel.classList.add('o-MultiPanel-panel--withOverlayTransition');
        }

        if (i === index) {
            panel.classList.add('o-MultiPanel-panel--selected');
            props.activePanel = panel;
        } else {
            panel.classList.remove('o-MultiPanel-panel--selected');
        }

        totalPercentage = totalPercentage + getFlexBasis(panel);
    }

    if (index == panels.length - 1) {
        var lastPanel = panels[panels.length - 1],
            basis = lastPanel.kompo.props.basis,
            lastBasis = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isObject"])(basis) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_getDynamicWidth__["a" /* default */])(basis) : basis;

        translateTo = translateTo - (100 - lastBasis) / 100 * props.totalWidthPercentage;
    }

    var unit = props.unit;
    props.wrapper.style.width = props.totalWidth + unit;
    props.wrapper.style.transform = 'translateX(-' + translateTo + unit + ')';
}

function slide(component, router, element) {
    var multiPanelProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var mp = void 0;

    return {
        do: function _do() {
            var c = router.get(component, undefined, true);

            var panels = [],
                routes = c.siblings;

            var keys = Object.keys(routes);

            var _loop = function _loop(i, l) {
                var route = routes[i],
                    co = route.component;

                // TODO This does not work as expected
                // when the component of this panel
                // contains child routes. Only goes back to
                // original path, not the child routes
                co.kompo.props.slideToUrl = function () {
                    router.goTo(route.path);
                    return route.path;
                };

                panels.push(co);
            };

            for (var i = 0, l = keys.length; i < l; ++i) {
                _loop(i, l);
            }

            var cc = c.component,
                routed = component.kompo.routed;

            if (cc === routed) return;

            var index = panels.indexOf(cc),
                el = element ? element : component;

            var initial = false;
            if (!routed) {
                multiPanelProps.children = panels;
                mp = multiPanel(multiPanelProps);
                mount(component, mp);
                el.appendChild(mp);
                initial = true;
            }

            slideTo(mp, panels, index, initial);
            component.kompo.routed = cc;
        }
    };
}

function getFlexBasis(el) {
    var fb = parseFloat(window.getComputedStyle(el).flexBasis);

    if (isNaN(fb)) {
        fb = parseFloat(el.style.flexBasis);
    }

    return fb;
}

/***/ }),
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)(undefined);
// imports


// module
exports.push([module.i, ".o-MultiPanel {\r\n    overflow: hidden;\r\n}\r\n\r\n.o-MultiPanel > div  {\r\n    display: flex;\r\n}\r\n\r\n.o-MultiPanel > div > *  {\r\n    box-sizing: border-box;\r\n    flex: 0 0 auto;\r\n}\r\n\r\n.o-MultiPanel--withOverlay > div > .o-MultiPanel-panel {\r\n    position: relative;\r\n}\r\n\r\n.o-MultiPanel-panel-overlay {\r\n    cursor: pointer;\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(255,255,255,.5);\r\n    z-index: -999;\r\n    opacity: 0;\r\n}\r\n\r\n.o-MultiPanel-panel--withOverlayTransition .o-MultiPanel-panel-overlay {\r\n    transition: opacity .5s ease, z-index .5s cubic-bezier(1,0,1,0);\r\n}\r\n\r\n.o-MultiPanel--withOverlay > div > .o-MultiPanel-panel:not(.o-MultiPanel-panel--selected) .o-MultiPanel-panel-overlay  {\r\n    z-index: 999;\r\n    opacity: 1;\r\n    transition: opacity .5s ease, z-index .5s cubic-bezier(0,1,0,1);\r\n}", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(26)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./multiPanel.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./multiPanel.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = outputSelectedDate;
/* harmony export (immutable) */ __webpack_exports__["d"] = setSelectedDate;
/* harmony export (immutable) */ __webpack_exports__["c"] = isolatedReact;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kompo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kompo_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fecha__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fecha___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fecha__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_dateUtils__ = __webpack_require__(39);

var construct = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.construct;
var react = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.react;
var getState = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.getState;
var dispatch = __WEBPACK_IMPORTED_MODULE_0_kompo__["state"].dispatch;







/* harmony default export */ __webpack_exports__["a"] = (construct('table', function (_ref) {
    var _this = this;

    var dayNames = _ref.dayNames;
    var defaultClass = _ref.defaultClass;
    var classes = _ref.classes;
    var previousClass = _ref.previousClass;
    var previousDisabledClass = _ref.previousDisabledClass;
    var nextClass = _ref.nextClass;
    var nextDisabledClass = _ref.nextDisabledClass;
    var previousText = _ref.previousText;
    var nextText = _ref.nextText;
    var selectedClass = _ref.selectedClass;
    var notCurrentMonthClass = _ref.notCurrentMonthClass;
    var currentClass = _ref.currentClass;
    var workingFormat = _ref.workingFormat;
    var labelFormat = _ref.labelFormat;
    var outputFormat = _ref.outputFormat;
    var key = _ref.key;
    var setDate = _ref.setDate;
    var getDate = _ref.getDate;
    var dispatchOnSelect = _ref.dispatchOnSelect;
    var selectCallback = _ref.selectCallback;
    var showRange = _ref.showRange;

    this.classList.add(defaultClass);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["addClasses"])(this, classes);

    var previous = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('a', {
        'class': previousClass,
        href: '#previous'
    }),
        next = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('a', {
        'class': nextClass,
        href: '#next'
    }),
        thead = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('thead'),
        headRow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('tr'),
        headPrevious = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('td'),
        headLabel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('td', { colspan: 5 }),
        headNext = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('td'),
        dayRow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('tr'),
        tbody = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('tbody'),
        props = this.kompo.props;

    var currentDate = new Date(),
        selectedEl = undefined,
        workingDate = undefined,
        hasNoFuture = false,
        hasNoPast = false;

    currentDate.setHours(0, 0, 0, 0);

    /**
     * Structure elements
     */
    previous.textContent = previousText;
    next.textContent = nextText;

    headPrevious.appendChild(previous);
    headNext.appendChild(next);
    headRow.appendChild(headPrevious);
    headRow.appendChild(headLabel);
    headRow.appendChild(headNext);
    thead.appendChild(headRow);
    this.appendChild(thead);

    for (var i = 0, l = dayNames.length; i < l; ++i) {
        var c = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('th');
        c.textContent = dayNames[i];
        dayRow.appendChild(c);
    }

    // Add tr with dayNames in thead
    thead.appendChild(dayRow);
    this.appendChild(thead);
    this.appendChild(tbody);

    /**
     * Events & reactions
     */
    previous.addEventListener('click', function (e) {
        e.preventDefault();

        if (hasNoPast) return;

        workingDate.setMonth(workingDate.getMonth() - 1);
        isolatedReact(_this);
    });

    next.addEventListener('click', function (e) {
        e.preventDefault();

        if (hasNoFuture) return;

        workingDate.setMonth(workingDate.getMonth() + 1);
        isolatedReact(_this);
    });

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["delegate"])(tbody, 'a', 'click', function (e) {
        e.preventDefault();

        if (selectedEl) {
            selectedEl.classList.remove(selectedClass);
        }

        selectedEl = e.target;
        selectedEl.classList.add(selectedClass);

        var dateStr = selectedEl.getAttribute('data-date');
        props.selectedDate = __WEBPACK_IMPORTED_MODULE_2_fecha___default.a.parse(dateStr, workingFormat);

        if (selectCallback) {
            selectCallback(e);
        }

        if (dispatchOnSelect) {
            dispatch(_this, function (state) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isFunction"])(setDate)) {
                    setDate(state, key, __WEBPACK_IMPORTED_MODULE_2_fecha___default.a.format(props.selectedDate, outputFormat));
                } else {
                    state[key] = __WEBPACK_IMPORTED_MODULE_2_fecha___default.a.format(props.selectedDate, outputFormat);
                }
            });
        }
    });

    props.reactFn = function (state) {
        if (!props.selectedDate) {
            props.selectedDate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["isFunction"])(getDate) ? getDate(state, key) : state[key] || new Date(currentDate.getTime());

            if (typeof props.selectedDate === 'string') {
                props.selectedDate = new Date(props.selectedDate);
            }

            props.selectedDate.setHours(0, 0, 0, 0);
        }

        if (!workingDate || props.resetWorkingDate) {
            workingDate = new Date(props.selectedDate.getTime()) || new Date(currentDate.getTime());
            props.resetWorkingDate = false;
        } else {
            workingDate.setHours(0, 0, 0, 0);
        }

        if (props.notBefore) {
            props.notBefore = new Date(props.notBefore);
            props.notBefore.setHours(0, 0, 0, 0);
        }

        if (props.notAfter) {
            props.notAfter = new Date(props.notAfter);
            props.notAfter.setHours(0, 0, 0, 0);
        }

        headLabel.textContent = __WEBPACK_IMPORTED_MODULE_2_fecha___default.a.format(workingDate, labelFormat);

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["empty"])(tbody);
        hasNoPast = false;
        hasNoFuture = false;
        previous.classList.remove(previousDisabledClass);
        next.classList.remove(nextDisabledClass);

        var days = new Date(workingDate.getFullYear(), workingDate.getMonth() + 1, 0).getDate(),
            start = new Date(workingDate.getFullYear(), workingDate.getMonth(), 0).getDay();

        var tr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('tr'),
            currentIncrement = void 0;
        tbody.appendChild(tr);

        for (var _i = 1 - start, _l = 42 - start; _i <= _l; ++_i) {
            var dayDate = new Date(workingDate.getFullYear(), workingDate.getMonth(), _i),
                formattedDate = __WEBPACK_IMPORTED_MODULE_2_fecha___default.a.format(dayDate, workingFormat),
                td = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('td');

            var a = void 0,
                notBeforeCompared = void 0,
                notAfterCompared = void 0;

            if (props.notBefore) {
                notBeforeCompared = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_dateUtils__["a" /* compare */])(dayDate, props.notBefore);
            }

            if (props.notAfter) {
                notAfterCompared = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_dateUtils__["a" /* compare */])(dayDate, props.notAfter);
            }

            dayDate.setHours(0, 0, 0, 0);
            var compared = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_dateUtils__["a" /* compare */])(dayDate, currentDate);
            switch (true) {
                case compared === -1 && props.noPast || notBeforeCompared === -1:
                    a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('span');
                    hasNoPast = true;
                    previous.classList.add(previousDisabledClass);
                    break;
                case compared === 1 && props.noFuture || notAfterCompared === 1:
                    a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('span');
                    hasNoFuture = true;
                    next.classList.add(nextDisabledClass);
                    break;
                default:
                    a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('a', {
                        href: '#' + formattedDate,
                        'data-date': formattedDate
                    });

                    if (showRange) {
                        var selectedCompared = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_dateUtils__["a" /* compare */])(dayDate, props.selectedDate);

                        if (props.notBefore && notBeforeCompared >= 0 && selectedCompared <= 0) {
                            a.classList.add('o-DatePicker-d--inRange');
                        }

                        if (props.notAfter && notAfterCompared <= 0 && selectedCompared >= 0) {
                            a.classList.add('o-DatePicker-d--inRange');
                        }
                    }

                    break;
            }

            if (compared === 0) {
                a.classList.add(currentClass);
                currentIncrement = _i;
            }

            if (_i < 1 || _i > days) {
                a.classList.add(notCurrentMonthClass);
            }

            if (props.selectedDate !== null && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_dateUtils__["a" /* compare */])(dayDate, props.selectedDate) === 0) {
                a.classList.add(selectedClass);
                selectedEl = a;
            }

            a.textContent = dayDate.getDate();
            td.appendChild(a);
            tr.appendChild(td);

            if (_i < _l && (_i + start) % 7 === 0) {
                tbody.appendChild(tr);
                tr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('tr');
            }
        }

        tbody.appendChild(tr); // Don't forget to append last row
    };
    react(this, props.reactFn);
}, {
    dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    defaultClass: 'o-DatePicker',
    classes: [],
    workingFormat: 'DD/MM/YYYY',
    outputFormat: 'YYYY-MM-DD HH:mm:ss',
    labelFormat: 'MMM YYYY',
    previousClass: 'o-DatePicker-prev',
    previousDisabledClass: 'o-DatePicker-prev--disabled',
    previousText: '<',
    nextClass: 'o-DatePicker-next',
    nextDisabledClass: 'o-DatePicker-next--disabled',
    nextText: '>',
    selectedClass: 'o-DatePicker-d--isSelected',
    notCurrentMonthClass: 'o-DatePicker-d--isNotCurrentMonth',
    currentClass: 'o-DatePicker-d--isCurrent',
    selectedDate: undefined,
    key: 'date',
    setDate: undefined,
    getDate: undefined,
    dispatchOnSelect: false,
    noPast: false,
    noFuture: false,
    notBefore: undefined,
    notAfter: undefined,
    showRange: false,
    selectCallback: undefined,
    resetWorkingDate: false
}));

function outputSelectedDate(datePicker) {
    var props = datePicker.kompo.props;
    return __WEBPACK_IMPORTED_MODULE_2_fecha___default.a.format(props.selectedDate, props.outputFormat);
}

function setSelectedDate(datePicker, date) {
    var props = datePicker.kompo.props;

    if (typeof date === 'string') {
        props.selectedDate = new Date(date);
    } else {
        props.selectedDate = date;
    }

    props.selectedDate.setHours(0, 0, 0, 0);
    props.resetWorkingDate = true;
    isolatedReact(datePicker);
}

function isolatedReact(datePicker) {
    var state = getState(datePicker);
    datePicker.kompo.props.reactFn(state);
}

/***/ }),
/* 38 */,
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compare;
/* unused harmony export convert */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function compare(a, b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return isFinite(a = convert(a).valueOf()) && isFinite(b = convert(b).valueOf()) ? (a > b) - (a < b) : NaN;
}

function convert(d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp)
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return d.constructor === Date ? d : d.constructor === Array ? new Date(d[0], d[1], d[2]) : d.constructor === Number ? new Date(d) : d.constructor === String ? new Date(d) : (typeof d === "undefined" ? "undefined" : _typeof(d)) === "object" ? new Date(d.year, d.month, d.date) : NaN;
}

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kompo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_kompo_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_kompo_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__datePicker__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__multiPanel_multiPanel__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__multiPanel_panel__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_dateUtils__ = __webpack_require__(39);

var construct = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.construct;
var mount = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.mount;










/* harmony default export */ __webpack_exports__["a"] = (construct('div', function (_ref) {
    var _this = this;

    var defaultClass = _ref.defaultClass;
    var classes = _ref.classes;
    var multiPanelClass = _ref.multiPanelClass;
    var selectedClass = _ref.selectedClass;
    var navClass = _ref.navClass;
    var fromClass = _ref.fromClass;
    var toClass = _ref.toClass;
    var applyContainerClass = _ref.applyContainerClass;
    var applyClass = _ref.applyClass;
    var applyFormat = _ref.applyFormat;
    var applyCallback = _ref.applyCallback;
    var overlay = _ref.overlay;
    var fromKey = _ref.fromKey;
    var toKey = _ref.toKey;
    var setDate = _ref.setDate;
    var getDate = _ref.getDate;
    var resetClass = _ref.resetClass;
    var resetText = _ref.resetText;
    var resetCallback = _ref.resetCallback;
    var noPast = _ref.noPast;
    var noFuture = _ref.noFuture;
    var toSelectCallback = _ref.toSelectCallback;
    var fromSelectCallback = _ref.fromSelectCallback;
    var _selectCallback = _ref.selectCallback;

    this.classList.add(defaultClass);

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["addClasses"])(this, classes);

    var nav = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('nav', { 'class': navClass }),
        from = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('a', { 'class': fromClass, href: '#from' }),
        to = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('a', { 'class': toClass, href: '#to' }),
        fromDatePicker = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__datePicker__["a" /* default */])({
        key: fromKey,
        setDate: setDate,
        getDate: getDate,
        selectCallback: function selectCallback(e) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__multiPanel_multiPanel__["a" /* slideTo */])(mp, panels, 1);
            toggleToTo(from, to, selectedClass);

            var fromProps = fromDatePicker.kompo.props,
                toProps = toDatePicker.kompo.props;

            toProps.resetWorkingDate = true;
            toProps.notBefore = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__datePicker__["b" /* outputSelectedDate */])(fromDatePicker);

            // If from > to then set selected of toDatePicker to same day
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_dateUtils__["a" /* compare */])(fromProps.selectedDate, toProps.selectedDate) === 1) {
                toProps.selectedDate = fromProps.selectedDate;
            }

            formatApply(applyTextDate, fromDatePicker, toDatePicker);

            // Only rerenders toDatePicker
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__datePicker__["c" /* isolatedReact */])(toDatePicker);

            if (fromSelectCallback) fromSelectCallback(fromDatePicker, toDatePicker);
            if (_selectCallback) _selectCallback(fromDatePicker, toDatePicker);
        },
        outputFormat: applyFormat,
        noFuture: noFuture,
        noPast: noPast
    }),
        toDatePicker = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__datePicker__["a" /* default */])({
        key: toKey,
        setDate: setDate,
        getDate: getDate,
        selectCallback: function selectCallback() {
            formatApply(applyTextDate, fromDatePicker, toDatePicker);
            if (toSelectCallback) toSelectCallback(fromDatePicker, toDatePicker);
            if (_selectCallback) _selectCallback(fromDatePicker, toDatePicker);
        },
        outputFormat: applyFormat,
        noFuture: noFuture,
        noPast: noPast
    }),
        fromPanel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__multiPanel_panel__["a" /* default */])({ component: fromDatePicker }),
        toPanel = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__multiPanel_panel__["a" /* default */])({ component: toDatePicker }),
        mp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__multiPanel_multiPanel__["b" /* default */])({
        classNames: [multiPanelClass],
        overlay: overlay,
        children: [fromPanel, toPanel]
    }),
        panels = [fromPanel, toPanel],
        applyContainer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('div', { 'class': applyContainerClass }),
        apply = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('a', { 'class': applyClass, href: '#apply' }),
        applyText = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('span'),
        applyTextDate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('span');

    from.textContent = 'From';
    to.textContent = 'To';
    applyText.textContent = 'Apply';

    /**
     * Structure
     */
    nav.appendChild(from);
    nav.appendChild(to);
    this.appendChild(nav);

    mount(this, mp, this.kompo.selector);
    this.appendChild(mp);

    if (applyCallback) {
        apply.appendChild(applyText);
        apply.appendChild(applyTextDate);
        applyContainer.appendChild(apply);

        if (resetCallback) {
            var reset = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_kompo_util__["create"])('a', { 'class': resetClass, href: '#reset' });
            reset.textContent = resetText;

            reset.addEventListener('click', function (e) {
                e.preventDefault();

                if (resetCallback) {
                    resetCallback(function (fromDate, toDate) {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__datePicker__["d" /* setSelectedDate */])(fromDatePicker, fromDate);
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__datePicker__["d" /* setSelectedDate */])(toDatePicker, toDate);
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__multiPanel_multiPanel__["a" /* slideTo */])(mp, panels, 0);
                        toggleToFrom(from, to, selectedClass);
                        formatApply(applyTextDate, fromDatePicker, toDatePicker);
                    });
                }
            });

            applyContainer.appendChild(reset);
        }

        this.appendChild(applyContainer);
        formatApply(applyTextDate, fromDatePicker, toDatePicker);

        /**
         * Apply callback
         */
        apply.addEventListener('click', function (e) {
            e.preventDefault();

            if (applyCallback) {
                applyCallback(_this, fromDatePicker, toDatePicker);
            }
        });
    }

    /**
     * Events & Reactions
     */
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__multiPanel_multiPanel__["a" /* slideTo */])(mp, panels, 0);
    from.classList.add(selectedClass);

    from.addEventListener('click', function (e) {
        e.preventDefault();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__multiPanel_multiPanel__["a" /* slideTo */])(mp, panels, 0);
        toggleToFrom(from, to, selectedClass);
    });

    to.addEventListener('click', function (e) {
        e.preventDefault();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__multiPanel_multiPanel__["a" /* slideTo */])(mp, panels, 1);
        toggleToTo(from, to, selectedClass);
        toDatePicker.kompo.props.notBefore = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__datePicker__["b" /* outputSelectedDate */])(fromDatePicker);
    });
}, {
    defaultClass: 'o-DateRange',
    classes: [],
    selectedClass: 'o-DateRange-nav--selected',
    multiPanelClass: 'o-DateRange-multiPanel',
    navClass: 'o-DateRange-nav',
    fromClass: 'o-DateRange-from',
    toClass: 'o-DateRange-to',
    applyContainerClass: 'o-DateRange-applyContainer',
    applyClass: 'o-DateRange-apply',
    applyFormat: 'YYYY-MM-DD',
    applyCallback: undefined,
    overlay: false,
    fromKey: 'from',
    toKey: 'to',
    setDate: undefined,
    getDate: undefined,
    resetClass: 'o-DateRange-reset',
    resetText: 'x',
    resetCallback: undefined,
    noPast: false,
    noFuture: false,
    toSelectCallback: undefined,
    fromSelectCallback: undefined,
    selectCallback: undefined
}));

function toggleToFrom(from, to, clss) {
    from.classList.add(clss);
    to.classList.remove(clss);
}

function toggleToTo(from, to, clss) {
    from.classList.remove(clss);
    to.classList.add(clss);
}

function formatApply(el, fromDatePicker, toDatePicker) {
    el.textContent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__datePicker__["b" /* outputSelectedDate */])(fromDatePicker) + ' / ' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__datePicker__["b" /* outputSelectedDate */])(toDatePicker);
}

/***/ }),
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_kompo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_kompo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_js_date_dateRange__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_js_date_datePicker__ = __webpack_require__(37);
function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

// Component and content creation classes and functions


// import datePicker, {outputSelectedDate, isolatedReact} from  '../../../src/js/date/datePicker';



// Create root component
var root = __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.construct('div', function (_ref) {
    _objectDestructuringEmpty(_ref);

    /**
     * More advanced dateRangePicker
     */
    var dr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__src_js_date_dateRange__["a" /* default */])({
        resetCallback: function resetCallback(reset) {
            var toDate = new Date(),
                fromDate = new Date();

            fromDate.setMonth(fromDate.getMonth() - 1);

            reset(fromDate, toDate);
        }
    });
    __WEBPACK_IMPORTED_MODULE_0_kompo___default.a.mount(this, dr);
    this.appendChild(dr);

    /**
     * Simple implementation of a side by side dateRangePicker
     */
    // const fromDatePicker = datePicker({
    //     notAfter: '2017-07-12 23:59:59',
    //     key: 'from',
    //     showRange: true,
    //     noFuture: true,
    //     selectCallback: e => {
    //         const toProps = toDatePicker.kompo.props;
    //
    //         toProps.resetWorkingDate = true;
    //         toProps.notBefore = outputSelectedDate(fromDatePicker);
    //
    //         isolatedReact(fromDatePicker);
    //         isolatedReact(toDatePicker);
    //     }
    // });
    // component.mount(this, fromDatePicker);
    //
    // const toDatePicker = datePicker({
    //     notBefore: '2017-06-05 23:59:59',
    //     key: 'to',
    //     noFuture: true,
    //     showRange: true,
    //     selectCallback: e => {
    //         const fromProps = fromDatePicker.kompo.props;
    //
    //         fromProps.resetWorkingDate = true;
    //         fromProps.notAfter = outputSelectedDate(toDatePicker);
    //
    //         isolatedReact(fromDatePicker);
    //         isolatedReact(toDatePicker);
    //     }
    // });
    // component.mount(this, toDatePicker);
});

// Create instance of root and
// append table to body
document.body.appendChild(__WEBPACK_IMPORTED_MODULE_0_kompo__["state"].app(root(), {
    date: '2017-07-05 23:59:59',
    from: '2017-06-05 23:59:59',
    to: '2017-07-12 23:59:59'
}).start());

/***/ }),
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function (main) {
  'use strict';

  /**
   * Parse or format dates
   * @class fecha
   */
  var fecha = {};
  var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
  var twoDigits = /\d\d?/;
  var threeDigits = /\d{3}/;
  var fourDigits = /\d{4}/;
  var word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
  var literal = /\[([^]*?)\]/gm;
  var noop = function () {
  };

  function shorten(arr, sLen) {
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      newArr.push(arr[i].substr(0, sLen));
    }
    return newArr;
  }

  function monthUpdate(arrName) {
    return function (d, v, i18n) {
      var index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
      if (~index) {
        d.month = index;
      }
    };
  }

  function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
      val = '0' + val;
    }
    return val;
  }

  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var monthNamesShort = shorten(monthNames, 3);
  var dayNamesShort = shorten(dayNames, 3);
  fecha.i18n = {
    dayNamesShort: dayNamesShort,
    dayNames: dayNames,
    monthNamesShort: monthNamesShort,
    monthNames: monthNames,
    amPm: ['am', 'pm'],
    DoFn: function DoFn(D) {
      return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
    }
  };

  var formatFlags = {
    D: function(dateObj) {
      return dateObj.getDate();
    },
    DD: function(dateObj) {
      return pad(dateObj.getDate());
    },
    Do: function(dateObj, i18n) {
      return i18n.DoFn(dateObj.getDate());
    },
    d: function(dateObj) {
      return dateObj.getDay();
    },
    dd: function(dateObj) {
      return pad(dateObj.getDay());
    },
    ddd: function(dateObj, i18n) {
      return i18n.dayNamesShort[dateObj.getDay()];
    },
    dddd: function(dateObj, i18n) {
      return i18n.dayNames[dateObj.getDay()];
    },
    M: function(dateObj) {
      return dateObj.getMonth() + 1;
    },
    MM: function(dateObj) {
      return pad(dateObj.getMonth() + 1);
    },
    MMM: function(dateObj, i18n) {
      return i18n.monthNamesShort[dateObj.getMonth()];
    },
    MMMM: function(dateObj, i18n) {
      return i18n.monthNames[dateObj.getMonth()];
    },
    YY: function(dateObj) {
      return String(dateObj.getFullYear()).substr(2);
    },
    YYYY: function(dateObj) {
      return dateObj.getFullYear();
    },
    h: function(dateObj) {
      return dateObj.getHours() % 12 || 12;
    },
    hh: function(dateObj) {
      return pad(dateObj.getHours() % 12 || 12);
    },
    H: function(dateObj) {
      return dateObj.getHours();
    },
    HH: function(dateObj) {
      return pad(dateObj.getHours());
    },
    m: function(dateObj) {
      return dateObj.getMinutes();
    },
    mm: function(dateObj) {
      return pad(dateObj.getMinutes());
    },
    s: function(dateObj) {
      return dateObj.getSeconds();
    },
    ss: function(dateObj) {
      return pad(dateObj.getSeconds());
    },
    S: function(dateObj) {
      return Math.round(dateObj.getMilliseconds() / 100);
    },
    SS: function(dateObj) {
      return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
    },
    SSS: function(dateObj) {
      return pad(dateObj.getMilliseconds(), 3);
    },
    a: function(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
    },
    A: function(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
    },
    ZZ: function(dateObj) {
      var o = dateObj.getTimezoneOffset();
      return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
    }
  };

  var parseFlags = {
    D: [twoDigits, function (d, v) {
      d.day = v;
    }],
    Do: [new RegExp(twoDigits.source + word.source), function (d, v) {
      d.day = parseInt(v, 10);
    }],
    M: [twoDigits, function (d, v) {
      d.month = v - 1;
    }],
    YY: [twoDigits, function (d, v) {
      var da = new Date(), cent = +('' + da.getFullYear()).substr(0, 2);
      d.year = '' + (v > 68 ? cent - 1 : cent) + v;
    }],
    h: [twoDigits, function (d, v) {
      d.hour = v;
    }],
    m: [twoDigits, function (d, v) {
      d.minute = v;
    }],
    s: [twoDigits, function (d, v) {
      d.second = v;
    }],
    YYYY: [fourDigits, function (d, v) {
      d.year = v;
    }],
    S: [/\d/, function (d, v) {
      d.millisecond = v * 100;
    }],
    SS: [/\d{2}/, function (d, v) {
      d.millisecond = v * 10;
    }],
    SSS: [threeDigits, function (d, v) {
      d.millisecond = v;
    }],
    d: [twoDigits, noop],
    ddd: [word, noop],
    MMM: [word, monthUpdate('monthNamesShort')],
    MMMM: [word, monthUpdate('monthNames')],
    a: [word, function (d, v, i18n) {
      var val = v.toLowerCase();
      if (val === i18n.amPm[0]) {
        d.isPm = false;
      } else if (val === i18n.amPm[1]) {
        d.isPm = true;
      }
    }],
    ZZ: [/([\+\-]\d\d:?\d\d|Z)/, function (d, v) {
      if (v === 'Z') v = '+00:00';
      var parts = (v + '').match(/([\+\-]|\d\d)/gi), minutes;

      if (parts) {
        minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
        d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
      }
    }]
  };
  parseFlags.dd = parseFlags.d;
  parseFlags.dddd = parseFlags.ddd;
  parseFlags.DD = parseFlags.D;
  parseFlags.mm = parseFlags.m;
  parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
  parseFlags.MM = parseFlags.M;
  parseFlags.ss = parseFlags.s;
  parseFlags.A = parseFlags.a;


  // Some common format strings
  fecha.masks = {
    default: 'ddd MMM DD YYYY HH:mm:ss',
    shortDate: 'M/D/YY',
    mediumDate: 'MMM D, YYYY',
    longDate: 'MMMM D, YYYY',
    fullDate: 'dddd, MMMM D, YYYY',
    shortTime: 'HH:mm',
    mediumTime: 'HH:mm:ss',
    longTime: 'HH:mm:ss.SSS'
  };

  /***
   * Format a date
   * @method format
   * @param {Date|number} dateObj
   * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
   */
  fecha.format = function (dateObj, mask, i18nSettings) {
    var i18n = i18nSettings || fecha.i18n;

    if (typeof dateObj === 'number') {
      dateObj = new Date(dateObj);
    }

    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
      throw new Error('Invalid Date in fecha.format');
    }

    mask = fecha.masks[mask] || mask || fecha.masks['default'];

    var literals = [];

    // Make literals inactive by replacing them with ??
    mask = mask.replace(literal, function($0, $1) {
      literals.push($1);
      return '??';
    });
    // Apply formatting rules
    mask = mask.replace(token, function ($0) {
      return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
    });
    // Inline literal values back into the formatted value
    return mask.replace(/\?\?/g, function() {
      return literals.shift();
    });
  };

  /**
   * Parse a date string into an object, changes - into /
   * @method parse
   * @param {string} dateStr Date string
   * @param {string} format Date parse format
   * @returns {Date|boolean}
   */
  fecha.parse = function (dateStr, format, i18nSettings) {
    var i18n = i18nSettings || fecha.i18n;

    if (typeof format !== 'string') {
      throw new Error('Invalid format in fecha.parse');
    }

    format = fecha.masks[format] || format;

    // Avoid regular expression denial of service, fail early for really long strings
    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
    if (dateStr.length > 1000) {
      return false;
    }

    var isValid = true;
    var dateInfo = {};
    format.replace(token, function ($0) {
      if (parseFlags[$0]) {
        var info = parseFlags[$0];
        var index = dateStr.search(info[0]);
        if (!~index) {
          isValid = false;
        } else {
          dateStr.replace(info[0], function (result) {
            info[1](dateInfo, result, i18n);
            dateStr = dateStr.substr(index + result.length);
            return result;
          });
        }
      }

      return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
    });

    if (!isValid) {
      return false;
    }

    var today = new Date();
    if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
      dateInfo.hour = +dateInfo.hour + 12;
    } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
      dateInfo.hour = 0;
    }

    var date;
    if (dateInfo.timezoneOffset != null) {
      dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
      date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
        dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
    } else {
      date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
        dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
    }
    return date;
  };

  /* istanbul ignore next */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = fecha;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return fecha;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    main.fecha = fecha;
  }
})(this);


/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map