// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"index.scss":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
'use strict';

require('./index.scss');

var header = {
    template: '\n        <nav class="app-header">\n            <img class="logo" :src=logoSrc>\n\n            <span class="login" @click=logIn>Log In</span>\n        </nav>\n    ',
    data: function data() {
        return {
            logoSrc: 'xxx'
        };
    },
    methods: {
        logIn: function logIn() {
            console.log("Log in");
        }
    }
};

var title = {
    template: '\n        <h1 class=\'title title-decoration\'>{{appTitle.mainTitle}} - {{appTitle.subTitle}}</h1>\n    ',
    props: ['appTitle']
};

var callHistory = {
    template: '\n        <div class="history-wrap">\n            <h2 class="title">Call History</h2>\n            <div class=\'table-wrap\'>\n                <table>\n                    <tr class="table-header">\n                        <th v-for=\'i in headNames\'>{{i}}</th>\n                    </tr>\n                    <tr v-for=\'(i, index) in historyData\'>\n                        <td v-for=\'j in headNames\' v-if="j!==\'snow\'">{{i[j]}}</td>\n                        <td v-for=\'j in headNames\' v-if="j===\'snow\'"><a :href=\'i[j]\'>View</a></td>\n                    </tr>\n                </table>\n            </div>\n        </div>\n    ',
    data: function data() {
        return {
            headNames: []
        };
    },
    props: ['historyData'],
    beforeMount: function beforeMount() {
        for (var i in this.$props.historyData[0]) {
            this.headNames.push(i);
        }
    }
};

var phoneInterface = {
    template: '\n        <section class="phone-interface">\n            <nav class="app-header">\n                <div class="header-left-wrap">\n                    <img class="logo" :src=logoSrc>\n                    <span class="change-status">change status <i class="fa fa-angle-down"></i></span>\n                </div>\n\n                <i class=\'fa fa-cog\'></i>\n            </nav>\n            <section class="in-app-title-section">\n                <h2>{{status}}</h2>\n            </section>\n            <section class="action-panel">\n                <div class="call-wrap">\n                    <button @click=dialNum class="btn btn-normal">\n                        <i></i><span>Dial Number</span>\n                    </button>\n                    <button @click=quickConne class="btn btn-normal">\n                        <i class="fa fa-address-book"></i><span>Quick connects</span>\n                    </button>\n                </div>\n                <button @click=setAvailable class="btn btn-primary">Set to Available</button>\n            </section>\n        </section>\n    ',
    data: function data() {
        return {
            status: 'Offline',
            logoSrc: 'xxxxx'
        };
    },
    methods: {
        dialNum: function dialNum() {
            console.log('dial');
        },
        quickConne: function quickConne() {
            console.log('qucik');
        },
        setAvailable: function setAvailable() {
            console.log('setavai');
        }
    }
};

var currentCall = {
    template: '\n        <section class="current-call-wrap">\n            <h2 class=\'greeting\'>Hello, {{userInfo.name}}!</h2>\n            <div class="current-call">\n                <p class="prop-display each-info" v-for="(i, key) in currentCall"  v-if="computeName(key) !== false">\n                    <span v-text=\'computeName(key)\' class="prop-name"></span>:<span class="prop-value">{{i}}</span>\n                </p>\n                <a v-for="(i, key) in currentCall" :href=i v-if="key===\'snow\'">SNOW incident URL</a>\n            </div>\n        </section>\n    ',
    props: ['userInfo', 'currentCall'],
    methods: {
        computeName: function computeName(data) {
            var string = '';
            switch (data) {
                case 'wwid':
                    string = 'Caller WWID';
                    break;
                case 'number':
                    string = 'Caller Phone';
                    break;
                case 'queue':
                    string = 'Queue';
                    break;
                case 'topic':
                    string = 'Topic';
                    break;
                // case 'snow':
                //     string = 'SNOW';
                //     break;            
                default:
                    string = false;
                    break;
            }
            return string;
        }
    }

};

new Vue({
    el: '#app',
    data: {
        appTitle: {
            mainTitle: 'AWS Connect',
            subTitle: 'J&J GSD Agent Desktop 6'
        },
        callHistory: [{
            time: '09:58:57 AM',
            wwid: '3456123',
            number: '+1 214 4032 2355',
            queue: 'English',
            topic: 'hardware problem',
            snow: 'url...'
        }, {
            time: '09:58:57 AM',
            wwid: '3456123',
            number: '+1 214 4032 2355',
            queue: 'English',
            topic: 'hardware problem',
            snow: 'url...'
        }, {
            time: '09:58:57 AM',
            wwid: '3456123',
            number: '+1 214 4032 2355',
            queue: 'English',
            topic: 'hardware problem',
            snow: 'url...'
        }],
        userInfo: {
            name: 'Steven'
        },
        currentCall: {
            time: '09:58:57 AM',
            wwid: '3456123',
            number: '+1 214 4032 2355',
            queue: 'English',
            topic: 'hardware problem',
            snow: 'xxxxxxx'
        }
    },
    components: {
        'app-header': header,
        'app-title': title,
        'phone-interface': phoneInterface,
        'current-call': currentCall,
        'call-history': callHistory
    }
});
},{"./index.scss":"index.scss"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50384' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Atos_JNJ_AWS1.aeb7eed7.map