// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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
      localRequire.cache = {};

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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/main.js":[function(require,module,exports) {
// Sound and music variable
var music = document.querySelector('.music');
var fail = document.querySelector('.fail');
var success = document.querySelector('.success');
var victory = document.querySelector('.victory');
var defeat = document.querySelector('.defeat'); // Top options sound slider variables

var sliderAreaSoundOptionsOff = document.querySelector('.slider-area__sound-options--off');
var sliderAreaSoundOptionsOn = document.querySelector('.slider-area__sound-options--on');
var peg1Sound = document.querySelector('.peg1__sound'); // Top options background slider variables

var sliderAreaBackgroundOptionsDefault = document.querySelector('.slider-area__background-options--default');
var sliderAreaBackgroundOptionsMint = document.querySelector('.slider-area__background-options--mint');
var sliderAreaBackgroundOptionsOcean = document.querySelector('.slider-area__background-options--ocean');
var sliderAreaBackgroundOptionsRoyal = document.querySelector('.slider-area__background-options--royal');
var peg2Background = document.querySelector('.peg2__background'); // Get current year and credit section for footer

var currentYear = new Date().getFullYear();
var credit = document.querySelector('.footer-credit span'); // Getting various sections of the DOM

var quote = document.querySelector('.quote-container .quote');
var letters = document.getElementsByClassName('letter');
var keys = document.getElementsByClassName('key');
var overlays = document.getElementsByClassName('overlay');
var sticks = document.getElementsByClassName('stick');
var gallows = document.querySelector('.gallows-container');
var author = document.querySelector('.quote-container .author'); // variables needed for gameStart() to work properly

var quoteArray = [];
var visibleQuoteArray = [];
var lettersToGo; // Array of all the possible colors for the main title

var colorArray = ['#B82020', '#F56E6E', '#D64141', '#970A0A', '#6E0000', '#B89E20', '#F5DE6E', '#D6BC41', '#977F0A', '#6E5B00', '#38227F', '#6A57A9', '#4E3893', '#261268', '#17074B', '#199419', '#58C458', '#34AB34', '#087908', '#005800'];
var allSticks = Array.from(sticks);
var hangmanCounter; // Add visible class to the overlays so they disappear
// and remove visible class from each stick

var overlayArray = Array.from(overlays);
overlayArray.forEach(function (overlay) {
  overlay.addEventListener('click', function () {
    overlay.classList.remove('visible');
    startGame();
    allSticks.forEach(function (stick) {
      stick.classList.remove('visible');
    });
    hangmanCounter = 0;
  });
}); // Function to adjust sound slider if player wants background music

sliderAreaSoundOptionsOn.addEventListener('click', function () {
  peg1Sound.classList.remove('left');
  peg1Sound.classList.add('right');
  music.play();
  music.volume = .5;
  music.loop = true;
});
sliderAreaSoundOptionsOff.addEventListener('click', function () {
  peg1Sound.classList.add('left');
  peg1Sound.classList.remove('right');
  music.pause();
}); // Function so the player has the option to change the background color

sliderAreaBackgroundOptionsDefault.addEventListener('click', function () {
  peg2Background.classList.add('default');
  peg2Background.classList.remove('mint');
  peg2Background.classList.remove('ocean');
  peg2Background.classList.remove('royal');
  document.body.style.background = 'linear-gradient(#fff, #555)';
});
sliderAreaBackgroundOptionsMint.addEventListener('click', function () {
  peg2Background.classList.add('mint');
  peg2Background.classList.remove('default');
  peg2Background.classList.remove('ocean');
  peg2Background.classList.remove('royal');
  document.body.style.background = 'linear-gradient(#91eeab, #205730)';
});
sliderAreaBackgroundOptionsOcean.addEventListener('click', function () {
  peg2Background.classList.add('ocean');
  peg2Background.classList.remove('mint');
  peg2Background.classList.remove('default');
  peg2Background.classList.remove('royal');
  document.body.style.background = 'linear-gradient(#c3ecff, #0c4857)';
});
sliderAreaBackgroundOptionsRoyal.addEventListener('click', function () {
  peg2Background.classList.add('royal');
  peg2Background.classList.remove('mint');
  peg2Background.classList.remove('ocean');
  peg2Background.classList.remove('default');
  document.body.style.background = 'linear-gradient(#dea4ff, #791886)';
}); // Function to randomly change the color of each letter in the title

var lettersArray = Array.from(letters);
lettersArray.forEach(function (letter) {
  var randNum = Math.floor(Math.random() * colorArray.length);
  letter.style.color = colorArray[randNum];
}); // ----- *IMPORTANT* -----
// This function starts the game

function startGame() {
  // Fetch random quote
  quoteArray = [];
  visibleQuoteArray = [];
  lettersToGo = 0;
  fetch('https://type.fit/api/quotes').then(function (res) {
    return res.json();
  }).then(function (data) {
    randQuote(data);
  }).catch(function (err) {
    return console.log('Error:', err);
  }); // Function to pick random quote and set letters to _s

  function randQuote(data) {
    var randNum = Math.floor(Math.random() * data.length);
    quoteArray = data[randNum].text.split('');
    author.innerText = "- ".concat(data[randNum].author);

    for (var i = 0; i < quoteArray.length; i++) {
      switch (quoteArray[i]) {
        case ' ':
          visibleQuoteArray[i] = ' ';
          lettersToGo++;
          break;

        case '.':
          visibleQuoteArray[i] = '.';
          lettersToGo++;
          break;

        case ',':
          visibleQuoteArray[i] = ',';
          lettersToGo++;
          break;

        case ':':
          visibleQuoteArray[i] = ':';
          lettersToGo++;
          break;

        case ';':
          visibleQuoteArray[i] + ';';
          lettersToGo++;
          break;

        case '"':
          visibleQuoteArray[i] = '"';
          lettersToGo++;
          break;

        case "'":
          visibleQuoteArray[i] = "'";
          lettersToGo++;
          break;

        case "-":
          visibleQuoteArray[i] = '-';
          lettersToGo++;
          break;

        case "1":
          visibleQuoteArray[i] = '1';
          lettersToGo++;
          break;

        case "2":
          visibleQuoteArray[i] = '2';
          lettersToGo++;
          break;

        case "3":
          visibleQuoteArray[i] = '3';
          lettersToGo++;
          break;

        case "4":
          visibleQuoteArray[i] = '4';
          lettersToGo++;
          break;

        case "5":
          visibleQuoteArray[i] = '5';
          lettersToGo++;
          break;

        case "6":
          visibleQuoteArray[i] = '6';
          lettersToGo++;
          break;

        case "7":
          visibleQuoteArray[i] = '7';
          lettersToGo++;
          break;

        case "8":
          visibleQuoteArray[i] = '8';
          lettersToGo++;
          break;

        case "9":
          visibleQuoteArray[i] = '9';
          lettersToGo++;
          break;

        case "0":
          visibleQuoteArray[i] = '0';
          lettersToGo++;
          break;

        default:
          visibleQuoteArray[i] = '_';
          break;
      }
    }

    ;
    quote.innerText = visibleQuoteArray.join('');
  } // Function to check if the players guess is correct


  var allKeys = Array.from(keys);
  var lettersGuessed = [];
  allKeys.forEach(function (key) {
    key.addEventListener('click', function () {
      // For loop to check possible conditions and respond accordingly
      for (var i = 0; i < quoteArray.length; i++) {
        if (quoteArray[i].toUpperCase() === key.innerText && !lettersGuessed.includes(key.innerText)) {
          visibleQuoteArray[i] = quoteArray[i];
          quote.innerText = visibleQuoteArray.join('');
          lettersToGo++;
          success.pause();
          success.currentTime = 0;
          success.play();
          success.volume = .5;
        } // If key.innerText is not equal to visibleQuoteArray[i]
        // then we add a stick to the stickman and break


        if (!quoteArray.includes(key.innerText.toLowerCase() || !quoteArray.includes(key.innerText.toUpperCase()))) {
          allSticks[hangmanCounter].classList.add('visible');
          hangmanCounter <= allSticks.length ? hangmanCounter++ : hangmanCounter;
          fail.pause();
          fail.currentTime = 0;
          fail.play();
          fail.volume = .5;
          break;
        }
      } // If lettersToGo equals the length of visible quote array]
      // then we show the victory screen and play victory music


      if (lettersToGo === visibleQuoteArray.length) {
        overlayArray[1].classList.add('visible');
        victory.play();
        victory.volume = .5;
      } // If hangmanCounter reaches allSticks.length we
      // show the defeat screan and play defeat music


      if (hangmanCounter === allSticks.length) {
        overlayArray[2].classList.add('visible');
        defeat.play();
        defeat.volume = .5;
      }
    });
  });
} // Call function on window load
//window.onload = startGame();
// Dynamically set the year on the copyright


credit.innerText = currentYear;
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51479" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/main.js"], null)
//# sourceMappingURL=/main.d8ebb8d6.js.map