!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.kompo=e():t.kompo=e()}(this,function(){return function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,e,n){Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=45)}([function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.util=e.state=e.router=void 0;var r=n(1),i=o(r),a=n(22),u=o(a),s=n(23),l=o(s),c=n(24),d=o(c),f=n(10),p=o(f),h=n(3),v=o(h),m=n(4),_=o(m),y=n(5),b=o(y),g=n(6),k=o(g),O=n(11),x=o(O),P={construct:l.default,route:s.route,indexRoute:s.indexRoute,swap:s.swap,link:u.default},C={app:d.default,dispatch:p.default,observe:v.default,inheritObserved:h.inheritObserved,markClean:h.markClean,markDirty:h.markDirty},j={hasProxy:_.default,isObject:b.default,merge:k.default,isFunction:x.default};e.default={construct:i.default,render:r.render,update:r.update,kompo:r.kompo,setState:r.setState,mount:r.mount,react:r.react,slot:r.slot,getRouter:r.getRouter,unmount:r.unmount,unmountAll:r.unmountAll,mountIndex:r.mountIndex,getState:r.getState,compose:r.compose,append:r.append,getProps:r.getProps,constructClass:r.constructClass,children:r.children,appendChildren:r.appendChildren},e.router=P,e.state=C,e.util=j},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return function(){var o=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=s(document.createElement(t));return r.kompo.props=(0,E.default)(w({},n),o),r.construct=e,r}}function i(t,e){var n=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],o=P(e.prototype);return function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=s(document.createElement(t));return r.kompo.props=(0,E.default)(w({},n),e),(0,E.default)(r,o),r}}function a(t){var e=t.kompo;e.initial?(t.construct(e.props),e.initial=!1):u(t)}function u(t){var e=t.kompo,n=e.mounts,o=e.selector,r=o?o(t.__kompo__.state):t.__kompo__.state,i=t===t.__kompo__.root;if(r){var u=A.default?(0,R.default)(r)||Array.isArray(r):(0,R.default)(r)&&!Array.isArray(r);if(!u||!r.hasOwnProperty("__kompo_dirty__")||0!==r.__kompo_dirty__.length)for(var s=e.statefulls,l=0,c=s.length;l<c;++l)s[l](r,t)}for(var d=0,f=n.length;d<f;++d)a(n[d]);i&&(0,T.markClean)(r)}function s(t){return t.kompo={initial:!0,props:{},defaultProps:{},mounts:[],statefulls:[],slots:{},routed:void 0,selector:void 0,state:void 0,unmount:void 0,children:void 0},t}function l(t,e){var n=t.kompo;n.state=e(t.__kompo__.state),n.selector=e}function c(t){var e=t.kompo.selector;return e?e(t.__kompo__.state):t.__kompo__.state}function d(t,e,n,o){var r=void 0;arguments.length>=3&&(Array.isArray(n)||n instanceof Element)?(r=e,e=n,n=o):r=t,Array.isArray(e)?p(t,r,e,n):f(t,r,e,n)}function f(t,e,n,o){o&&l(n,o),a(n),e.appendChild(n);var r=t.kompo.mounts;r.indexOf(n)===-1&&(n.kompo.unmount=function(t){r.splice(r.indexOf(t),1)},r.push(n))}function p(t,e,n,o){for(var r=document.createDocumentFragment(),i=0,a=n.length;i<a;++i)f(t,r,n[i],o?o(i):void 0);e.appendChild(r)}function h(t){var e=t.kompo.unmount;e&&e(t)}function v(t){t.kompo.mounts=[]}function m(t,e){return t.kompo.mounts.indexOf(e)}function _(t,e){var n=t.kompo,o=n.selector;n.statefulls.push(e),e(o?o(t.__kompo__.state):t.__kompo__.state,t)}function y(t,e,n){2===arguments.length?t.kompo.slots[e](t):t.kompo.slots[e]=n}function b(t,e){return!!t.kompo.slots[e]}function g(t){return t.__kompo__.router}function k(t,e){return function(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return t((0,E.default)(e,n))}}function O(t,e){a(e),t.appendChild(e)}function x(t){return t.kompo.props}function P(t){var e=[],n={},o=t;do{for(var r=Object.getOwnPropertyNames(o),i=[],a=0,u=r.length;a<u;++a){var s=r[a];"function"!=typeof o[s]||"constructor"==s||0!=a&&s===r[a-1]||e.indexOf(s)!==-1||(i.push(s),n[s]=t[s])}e.push.apply(e,i)}while((o=Object.getPrototypeOf(o))&&Object.getPrototypeOf(o));return n}function C(t,e){return t.kompo.children=e,t}function j(t,e){for(var n=t.kompo.children,o=e?document.createDocumentFragment():t,r=0,i=n.length;r<i;++r){var u=n[r];u.hasOwnProperty("kompo")&&a(u),o.appendChild(u)}e&&t.appendChild(o)}Object.defineProperty(e,"__esModule",{value:!0});var w=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t};e.default=r,e.constructClass=i,e.render=a,e.update=u,e.kompo=s,e.setState=l,e.getState=c,e.mount=d,e.unmount=h,e.unmountAll=v,e.mountIndex=m,e.react=_,e.slot=y,e.hasSlot=b,e.getRouter=g,e.compose=k,e.append=O,e.getProps=x,e.getMethods=P,e.children=C,e.appendChildren=j;var M=n(6),E=o(M),S=n(4),A=o(S),L=n(5),R=o(L),T=n(3);Object.defineProperty(Element.prototype,"construct",{writable:!0,value:function(){throw new Error("Must override the construct method")}})},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.addClasses=e.throttle=e.replace=e.remove=e.merge=e.matches=e.isObject=e.isFunction=e.empty=e.delegate=e.debounce=e.addAttributes=e.createText=e.createFragment=e.create=e.capitalize=void 0;var r=n(13),i=o(r),a=n(7),u=o(a),s=n(14),l=o(s),c=n(15),d=o(c),f=n(16),p=o(f),h=n(17),v=o(h),m=n(8),_=o(m),y=n(9),b=o(y),g=n(18),k=o(g),O=n(19),x=o(O),P=n(20),C=o(P),j=n(21),w=o(j),M=n(12),E=o(M);e.capitalize=i.default,e.create=u.default,e.createFragment=a.createFragment,e.createText=a.createText,e.addAttributes=a.addAttributes,e.debounce=l.default,e.delegate=d.default,e.empty=p.default,e.isFunction=v.default,e.isObject=_.default,e.matches=b.default,e.merge=k.default,e.remove=x.default,e.replace=C.default,e.throttle=w.default,e.addClasses=E.default},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t){var e=(0,f.default)(t),n=Array.isArray(t);if(!e&&!n)return t;if(Object.defineProperty(t,"__kompo_dirty__",{writable:!0,value:[]}),c.default){for(var o=Object.keys(t),a=0,u=o.length;a<u;++a){var s=o[a];p.indexOf(s)===-1&&(t[s]=r(t[s]))}t=n?new Proxy(t,{apply:function(t,e,n){return t.__kompo_dirty__.push(!0),e[t].apply(this,n)},deleteProperty:function(t){return t.__kompo_dirty__.push(!0),!0},set:function(t,e,n){return"__kompo_dirty__"!==e&&n!=t[e]&&t.__kompo_dirty__.indexOf(e)===-1&&t.__kompo_dirty__.push(e),t[e]=r(n),!0}}):new Proxy(t,{get:function(t,e){return t[e]},set:function(t,e,n){return"__kompo_dirty__"!==e&&n!=t[e]&&t.__kompo_dirty__.indexOf(e)===-1&&t.__kompo_dirty__.push(e),t[e]=r(n),!0}})}else t=i(t);return t}function i(t){for(var e=Object.keys(t),n=function(n,o){var i=e[n],a="__"+i,u=t[i];Object.defineProperty(t,a,{writable:!0,value:u}),Object.defineProperty(t,i,{get:function(){return this[a]},set:function(e){(0,f.default)(e)&&r(e),e!=this[i]&&t.__kompo_dirty__.indexOf(i)===-1&&t.__kompo_dirty__.push(i),this[a]=e}}),t[i]=u},o=0,i=e.length;o<i;++o)n(o,i);return t}function a(t){var e=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];Object.defineProperty(t,"__kompo_dirty__",{writable:!0,value:[]});for(var n=Object.keys(t),o=0,r=n.length;o<r;++o){var i=n[o],a=t[i];if(!(e.indexOf(i)>-1)){if("undefined"==typeof a)return;a&&a.hasOwnProperty("__kompo_dirty__")&&a.__kompo_dirty__.length>0&&t.__kompo_dirty__.push(!0)}}return t}function u(t){var e=(0,f.default)(t),n=Array.isArray(t);if(!e&&!n)return t;if(t.__kompo_dirty__=[],n)for(var o=0,r=t.length;o<r;++o)u(t[o]);else for(var i=Object.keys(t),a=0,s=i.length;a<s;++a)u(t[i[a]])}function s(t){t.__kompo_dirty__.push(!0)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r,e.inheritObserved=a,e.markClean=u,e.markDirty=s;var l=n(4),c=o(l),d=n(5),f=o(d),p=["length","__kompo_dirty__"]},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default="Proxy"in window},function(t,e){"use strict";function n(t){var e="undefined"==typeof t?"undefined":o(t);return"function"==e||t&&"object"==e||!1}Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.default=n},function(t,e){"use strict";function n(){for(var t=Array.prototype.shift.call(arguments),e=0;e<arguments.length;e++){var n=arguments[e];for(var o in n)t[o]=n[o]}return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e){"use strict";function n(t,e){var n=void 0;return n=t?a.createElement(t):a.createElement("div"),e&&o(n,e),n}function o(t,e){for(var n=Object.keys(e),o=0,r=n.length;o<r;o++){var i=n[o],a=e[i];t.setAttribute(i,a)}return t}function r(){return a.createDocumentFragment()}function i(t){return a.createTextNode(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n,e.addAttributes=o,e.createFragment=r,e.createText=i;var a=document},function(t,e){"use strict";function n(t){var e="undefined"==typeof t?"undefined":o(t);return"function"==e||t&&"object"==e||!1}Object.defineProperty(e,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};e.default=n},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){if(!Element.prototype.matches){var t=Element.prototype;t.webkitMatchesSelector&&(t.matches=t.webkitMatchesSelector),t.msMatchesSelector&&(t.matches=t.msMatchesSelector),t.mozMatchesSelector&&(t.matches=t.mozMatchesSelector)}}()},function(t,e,n){"use strict";function o(t,e,n){if(e){var o=t.kompo,i=o.selector?o.selector(t.__kompo__.state):t.__kompo__.state;i&&(e(i),n||(0,r.render)(t.__kompo__.root))}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=o;var r=n(1)},function(t,e){"use strict";function n(t){var e={};return t&&"[object Function]"===e.toString.call(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e){"use strict";function n(t,e){for(var n=0,o=e.length;n<o;++n)t.classList.add(e[n])}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e){"use strict";function n(t){if("string"==typeof t)return t.charAt(0).toUpperCase()+t.slice(1)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e){"use strict";function n(t,e,n){var o=null;return function(){var r=n||this,i=arguments;clearTimeout(o),o=setTimeout(function(){t.apply(r,i)},e)}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e,n){"use strict";function o(t,e,n,o){t.addEventListener(n,function(t){for(var n=t.target;n&&n!=this;n=n.parentNode)if(n.matches(e)){o.bind(n)(t);break}},!1)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=o,n(9)},function(t,e){"use strict";function n(t){for(;t.lastChild;)t.removeChild(t.lastChild);return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e){"use strict";function n(t){var e={};return t&&"[object Function]"===e.toString.call(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e){"use strict";function n(){for(var t=Array.prototype.shift.call(arguments),e=0;e<arguments.length;e++){var n=arguments[e];for(var o in n)t[o]=n[o]}return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=t.parentNode;e&&e.removeChild(t)}},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var n=!(arguments.length<=2||void 0===arguments[2])&&arguments[2],o=!(arguments.length<=3||void 0===arguments[3])&&arguments[3],r=(0,s.default)(arguments[2]),u=void 0;return u=r?o?t.lastChild:t.firstChild:n?t.lastChild:t.firstChild,"string"==typeof e&&(e=(0,a.default)(e)),r&&(0,i.addAttributes)(e,n),u?t.replaceChild(e,u):t.appendChild(e),e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r;var i=n(7),a=o(i),u=n(8),s=o(u)},function(t,e){"use strict";function n(t,e,n){e||(e=250);var o=void 0,r=void 0;return function(){var i=n||this,a=+new Date,u=arguments;return o&&a<o+e?(clearTimeout(r),void(r=setTimeout(function(){o=a,t.apply(i,u)},e))):(o=a,t.apply(i,u))}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=o(r),a=n(10),u=o(a);e.default=(0,i.default)("a",function(t){for(var e=this,n=t.url,o=t.child,i=t.classNames,a=t.data,s=t.title,l=t.defaultEvent,c=t.activeClass,d=t.onClick,f=0,p=i.length;f<p;++f)this.classList.add(i[f]);var h=(0,r.getRouter)(this);if((0,r.react)(this,function(){h.isUrl(n)?e.classList.add(c):e.classList.remove(c)}),this.setAttribute("href",n),"string"==typeof o)this.textContent=o;else if(o.hasOwnProperty("kompo"))(0,r.mount)(this,o);else if(o instanceof Node)this.appendChild(o);else{if(!(0,r.hasSlot)(this,"child"))throw new Error('Child should be a string, KompoElement, Node or a slot callback named "child"');(0,r.slot)(this,"child")}this.addEventListener(l,function(t){t.preventDefault(),d&&d(t),h.goTo(n,s,a),(0,u.default)(e,function(t){t.url=n})})},{url:"",child:"",classNames:[],data:void 0,title:"",defaultEvent:"click",activeClass:"active",onClick:void 0})},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t){function e(t){"/"!==t[0]&&(t="/"+t),"/"===t.slice(-1)&&(t=t.slice(0,-1)),l=t}function n(t){c="/"===t[0]?t:"/"+t}function o(t){return t="/"===t[0]?t:"/"+t,c===t}function r(t){i(t);for(var e=Object.keys(v),n=0,o=e.length;n<o;n++){var r=e[n],a=r.replace(/(:([\w-]+))/g,"([\\w-]+)").replace(/\//g,"\\/");m[a]=v[r]}}function i(t){var e=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],n=arguments.length<=2||void 0===arguments[2]?[]:arguments[2],o=arguments.length<=3||void 0===arguments[3]?0:arguments[3],r=t.children,a=t.component;if(a instanceof Element?a.kompo.level=o:(a instanceof Promise||(0,h.default)(a))&&(a.kompo={level:o}),r)for(var u=t.path,s=0===e.length,l=0,c=r.length;l<c;l++){var d=r[l],f=s?e.concat(a,d.component):e.concat(d.component),p=n.concat(l),m=void 0;m="/"===d.path[0]?d.path:s?u+d.path:""===d.path?u:u+"/"+d.path,d.path=m,v[m]={components:f,hierarchy:p},i(d,f,p,o+1)}}function a(e,n){for(var o=Object.keys(n),r=0,i=o.length;r<i;r++){var a=o[r],u=e.match(new RegExp("^"+a+"$"));if(null!==u)return u.shift(),p=u,n[a]}return t.notFoundCallback&&t.notFoundCallback(e),[]}function u(e){return s(e,t.routes)}function s(t,e){return t=t.slice(),1===t.length?e.children:s(t,e.children[t.shift()])}t=(0,d.default)({base:"/",url:"/",notFoundCallback:function(t){throw new Error("No matching route found for url: "+t+". Provide a notFoundCallback callback option or correct the url or route.")}},t);var l=void 0,c=void 0,f=0,p=[],v={},m={};return e(t.base),n(t.url),r(t.routes),{getParams:function(){return p},isUrl:o,getUrl:function(){return c},setTo:function(t){return t=t.replace(l,""),!o(t)&&(n(t),!0)},goTo:function(t){var e=arguments.length<=1||void 0===arguments[1]?"":arguments[1],r=arguments.length<=2||void 0===arguments[2]?null:arguments[2];return!o(t)&&(n(t),history.pushState(r,e,l+c),!0)},get:function(t,e,n){t instanceof Element&&(f=t.kompo.level+1);var o=a(c,m),r=o.components;return e?(n&&(r[f]={component:r[f],siblings:u(o.hierarchy)}),e<0?r.slice(f+e,f+1):r.slice(f,f+e)):n?{component:r[f],siblings:u(o.hierarchy)}:r[f]}}}function i(t,e,n){return{path:t,component:e,children:n}}function a(t){return i("",t)}function u(t,e,n){var o=e.get(t),r=void 0;o&&((0,h.default)(o)&&(r=o,o=s(o)),o instanceof Element?l(t,o,n):o instanceof Promise&&(o.kompo.resolved?l(t,o.kompo.resolved,n):o.then(function(e){e.kompo.level=o.kompo.level,l(t,e,n,!0),o.kompo.resolved=e,r&&(r.kompo.resolved=e)}).catch(function(){console.error("Cannot dynamically load module for route")})))}function s(t){var e=t();return e.kompo=t.kompo,e}function l(t,e,n){var o=!(arguments.length<=3||void 0===arguments[3])&&arguments[3],r=t.kompo.routed,i=n?n:t;r!==e&&(r?(o&&(0,f.render)(e),i.replaceChild(e,r),t.kompo.mounts.splice(t.kompo.mounts.indexOf(r,1))):((0,f.render)(e),i.appendChild(e)),t.kompo.mounts.indexOf(e)==-1&&t.kompo.mounts.push(e),t.kompo.routed=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r,e.route=i,e.indexRoute=a,e.swap=u;var c=n(6),d=o(c),f=n(1),p=n(11),h=o(p)},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n){return e=(0,a.default)(e),Object.defineProperty(Element.prototype,"__kompo__",{value:{root:t,state:e,router:n}}),{start:function(e){return e&&(0,u.setState)(t,e),(0,u.render)(t),t}}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r;var i=n(3),a=o(i),u=n(1)},,,,,function(t,e,n){"use strict";var o=n(0),r=n.n(o),i=n(37),a=r.a.construct,u=r.a.getRouter,s=r.a.react;e.a=a("div",function(t){var e=t.heading;this.setAttribute("data-type","Branch");var o=document.createElement("h2");o.textContent=e,this.appendChild(o);var r=n.i(i.a)(this,u(this));s(this,function(){console.log("LEVEL TWO MULTIPANEL"),r.do()})},{heading:"Branch construct"})},function(t,e,n){"use strict";var o=n(0),r=n.n(o),i=r.a.construct,a=r.a.getRouter,u=r.a.react;e.a=i("div",function(t){var e=t.heading,n=t.paramIndex;this.setAttribute("data-type","Leaf");var o=document.createElement("h2"),r=document.createElement("span");o.textContent=e,this.appendChild(o),this.appendChild(r);var i=a(this);u(this,function(){var t=i.getParams();t.length>0&&(r.textContent="Param at index "+n+" = "+t[n])})},{heading:"Leaf construct",paramIndex:0})},,,function(t,e,n){"use strict";var o=n(0),r=n.n(o),i=n(2),a=(n.n(i),o.state.dispatch),u=(r.a.getProps,r.a.mount);e.a=r.a.construct("div",function(t){var e,o=this,r=t.classNames,s=t.basis,l=t.unit,c=t.component,d=t.overlay,f=t.index,p=t.slideTo,h=t.slideToUrl;if(r.push("o-MultiPanel-panel"),(e=this.classList).add.apply(e,r),this.style.flexBasis=s+l,d){var v=n.i(i.create)("div",{class:"o-MultiPanel-panel-overlay"});this.appendChild(v),v.addEventListener("click",function(t){h?a(o,function(t){t.url=h()}):"undefined"!=typeof f&&p&&p(f)})}u(this,c)},{classNames:[],basis:100,unit:"%",component:void 0,overlay:!0,index:void 0,slideTo:void 0,slideToUrl:void 0})},,,,function(t,e,n){"use strict";function o(t,e,n){for(var o=0,r=l(t),i=0,a=n;i<a;++i){var u=e[i],s=e[i+1],c=l(u);if(s){var d=l(s);d.basis<100&&(o-=100-d.basis)}o+=c.basis}for(var f=0,p=e.length;f<p;++f)f===n?e[f].classList.add("o-MultiPanel-panel--selected"):e[f].classList.remove("o-MultiPanel-panel--selected");var h=o/r.totalWidth*100;r.wrapper.style.transform="translateX(-"+h+r.unit+")"}function r(t,e,n){var r=void 0;return{do:function(){for(var i=e.get(t,void 0,!0),a=[],u=i.siblings,s=Object.keys(u),l=function(t,n){var o=u[t],r=o.component;r.kompo.props.slideToUrl=function(){return e.goTo(o.path),o.path},a.push(r)},p=0,h=s.length;p<h;++p)l(p,h);var v=i.component,m=t.kompo.routed;if(v!==m){var _=a.indexOf(v),y=n?n:t;m||(r=f(),d(r,a),c(t,y,r)),o(r,a,_),t.kompo.routed=v}}}}var i=n(0),a=n.n(i),u=n(2),s=(n.n(u),n(42));n.n(s);e.a=r;var l=a.a.getProps,c=a.a.mount,d=a.a.children,f=a.a.construct("div",function(t){var e,r=this,i=t.classNames,a=t.overlay,s=(t.defaultPanel,t.unit),d=t.transitionDuration;i.push("o-MultiPanel"),a&&i.push("o-MultiPanel--withOverlay"),(e=this.classList).add.apply(e,i);for(var f=n.i(u.create)("div"),p=this.kompo.children,h=0,v=p.length;h<v;++h){var m=p[h],_=l(m);_.index=h,_.slideTo=function(t){return o(r,p,t)},this.kompo.props.totalWidth=this.kompo.props.totalWidth+_.basis}f.style.transition="transform "+d+"ms",f.style.width=this.kompo.props.totalWidth+s,this.kompo.props.wrapper=f,c(this,f,p),this.appendChild(f)},{classNames:[],defaultPanel:0,unit:"%",transitionDuration:500,totalWidth:0,wrapper:void 0,overlay:!0})},,,function(t,e,n){e=t.exports=n(41)(void 0),e.push([t.i,".o-MultiPanel{overflow:hidden}.o-MultiPanel>div{display:flex}.o-MultiPanel>div>*{box-sizing:border-box;flex:1 1 auto}.o-MultiPanel--withOverlay>div>.o-MultiPanel-panel{position:relative}.o-MultiPanel-panel-overlay{cursor:pointer;position:absolute;width:100%;height:100%;transition:all .5s;background-color:hsla(0,0%,100%,.5);z-index:-999;opacity:0}.o-MultiPanel--withOverlay>div>.o-MultiPanel-panel:not(.o-MultiPanel-panel--selected) .o-MultiPanel-panel-overlay{z-index:999;opacity:1}",""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=o(r),a=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(a).concat([i]).join("\n")}return[n].join("\n")}function o(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,"+e;return"/*# "+n+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var o=n(e,t);return e[2]?"@media "+e[2]+"{"+o+"}":o}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){var o=n(40);"string"==typeof o&&(o=[[t.i,o,""]]);var r,i={};i.transform=r;n(43)(o,i);o.locals&&(t.exports=o.locals)},function(t,e,n){function o(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=h[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(c(o.parts[i],e))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(c(o.parts[i],e));h[o.id]={id:o.id,refs:1,parts:a}}}}function r(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],u=i[1],s=i[2],l=i[3],c={css:u,media:s,sourceMap:l};o[a]?o[a].parts.push(c):n.push(o[a]={id:a,parts:[c]})}return n}function i(t,e){var n=_(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=g[g.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),g.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=g.indexOf(t);e>=0&&g.splice(e,1)}function u(t){var e=document.createElement("style");return t.attrs.type="text/css",l(e,t.attrs),i(t,e),e}function s(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",l(e,t.attrs),i(t,e),e}function l(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function c(t,e){var n,o,r,i;if(e.transform&&t.css){if(i=e.transform(t.css),!i)return function(){};t.css=i}if(e.singleton){var l=b++;n=y||(y=u(e)),o=d.bind(null,n,l,!1),r=d.bind(null,n,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=s(e),o=p.bind(null,n,e),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=u(e),o=f.bind(null,n),r=function(){a(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}function d(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=O(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}function f(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=k(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),u=t.href;t.href=URL.createObjectURL(a),u&&URL.revokeObjectURL(u)}var h={},v=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},m=v(function(){return window&&document&&document.all&&!window.atob}),_=function(t){var e={};return function(n){return"undefined"==typeof e[n]&&(e[n]=t.call(this,n)),e[n]}}(function(t){return document.querySelector(t)}),y=null,b=0,g=[],k=n(44);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=m()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return o(n,e),function(t){for(var i=[],a=0;a<n.length;a++){var u=n[a],s=h[u.id];s.refs--,i.push(s)}if(t){var l=r(t,e);o(l,e)}for(var a=0;a<i.length;a++){var s=i[a];if(0===s.refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete h[s.id]}}}};var O=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/"),r=t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return t;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"});return r}},function(t,e,n){"use strict";function o(t){if(null==t)throw new TypeError("Cannot destructure undefined")}var r=n(0),i=n.n(r),a=n(30),u=n(29),s=n(33),l=i.a.construct,c=i.a.react,d=i.a.getRouter,f=r.router.route,p=r.router.indexRoute,h=r.router.swap,v=r.state.dispatch,m=l("div",function(t){var e=this;o(t);var n=document.createElement("h1"),r=document.createElement("nav"),i=["","simple","param/123","branch","branch/simple","rooted_nested","nonexisting"],a=d(this);n.textContent="Router example";for(var u=function(t,n){var o=document.createElement("a");o.addEventListener("click",function(){a.goTo(i[t]),v(e,function(e){e.url=i[t]})}),o.setAttribute("href","javascript:void(0);"),o.textContent=i[t],r.appendChild(o)},s=0,l=i.length;s<l;++s)u(s,l);this.appendChild(n),this.appendChild(r),c(this,function(){console.log("LEVEL ONE SWAP "),h(e,a)})}),_=f("/",m(),[p(n.i(a.a)({heading:"Index construct"})),f("simple",n.i(a.a)({heading:"Simple construct"})),f("param/:param",n.i(a.a)({heading:"Route with a param, shown in Component"})),f("branch",n.i(u.a)(),[p(n.i(s.a)({basis:60,component:n.i(a.a)({heading:"Nested index construct",input:!0})})),f("simple",n.i(s.a)({component:n.i(a.a)({heading:"Nested simple construct"})})),f("/rooted_nested",n.i(s.a)({basis:80,component:n.i(a.a)({heading:"Rooted nested construct"})}))])]),y={url:"/"},b=r.router.construct({routes:_,base:"multipanel",notFoundCallback:function(t){throw alert("Url: "+t+" not found"),new Error("Url: "+t+" not found")}}),g=b.get();document.body.appendChild(g),r.state.app(g,y,b).start()}])});
//# sourceMappingURL=bundle.js.map