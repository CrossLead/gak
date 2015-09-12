(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gak = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":11}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/tanh"), __esModule: true };
},{"core-js/library/fn/math/tanh":12}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":13}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":14}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":15}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/set"), __esModule: true };
},{"core-js/library/fn/set":16}],7:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],8:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":4}],9:[function(require,module,exports){
"use strict";

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

exports["default"] = _Object$assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/assign":3}],10:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],11:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$.core').Array.from;
},{"../../modules/$.core":25,"../../modules/es6.array.from":65,"../../modules/es6.string.iterator":72}],12:[function(require,module,exports){
require('../../modules/es6.math.tanh');
module.exports = require('../../modules/$.core').Math.tanh;
},{"../../modules/$.core":25,"../../modules/es6.math.tanh":67}],13:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":25,"../../modules/es6.object.assign":68}],14:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":45}],15:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":25,"../../modules/es6.object.keys":69}],16:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.set');
require('../modules/es7.set.to-json');
module.exports = require('../modules/$.core').Set;
},{"../modules/$.core":25,"../modules/es6.object.to-string":70,"../modules/es6.set":71,"../modules/es6.string.iterator":72,"../modules/es7.set.to-json":73,"../modules/web.dom.iterable":74}],17:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],18:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":38}],19:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var toObject = require('./$.to-object')
  , IObject  = require('./$.iobject')
  , enumKeys = require('./$.enum-keys');

module.exports = require('./$.fails')(function(){
  return Symbol() in Object.assign({}); // Object.assign available and Symbol is native
}) ? function assign(target, source){   // eslint-disable-line no-unused-vars
  var T = toObject(target)
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = IObject(arguments[i++])
      , keys   = enumKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
} : Object.assign;
},{"./$.enum-keys":29,"./$.fails":31,"./$.iobject":36,"./$.to-object":60}],20:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":21,"./$.wks":63}],21:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],22:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , hide         = require('./$.hide')
  , ctx          = require('./$.ctx')
  , species      = require('./$.species')
  , strictNew    = require('./$.strict-new')
  , defined      = require('./$.defined')
  , forOf        = require('./$.for-of')
  , step         = require('./$.iter-step')
  , ID           = require('./$.uid')('id')
  , $has         = require('./$.has')
  , isObject     = require('./$.is-object')
  , isExtensible = Object.isExtensible || isObject
  , SUPPORT_DESC = require('./$.support-desc')
  , SIZE         = SUPPORT_DESC ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    require('./$.mix')(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments[1], 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(SUPPORT_DESC)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    require('./$.iter-define')(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    species(C);
    species(require('./$.core')[NAME]); // for wrapper
  }
};
},{"./$":45,"./$.core":25,"./$.ctx":26,"./$.defined":28,"./$.for-of":32,"./$.has":34,"./$.hide":35,"./$.is-object":38,"./$.iter-define":41,"./$.iter-step":43,"./$.mix":47,"./$.species":52,"./$.strict-new":53,"./$.support-desc":55,"./$.uid":61}],23:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = require('./$.for-of')
  , classof = require('./$.classof');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"./$.classof":20,"./$.for-of":32}],24:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , $def       = require('./$.def')
  , hide       = require('./$.hide')
  , forOf      = require('./$.for-of')
  , strictNew  = require('./$.strict-new');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = require('./$.global')[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!require('./$.support-desc') || typeof C != 'function'
    || !(IS_WEAK || proto.forEach && !require('./$.fails')(function(){ new C().entries().next(); }))
  ){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    require('./$.mix')(C.prototype, methods);
  } else {
    C = wrapper(function(target, iterable){
      strictNew(target, C, NAME);
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
      var chain = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return chain ? this : result;
      });
    });
    if('size' in proto)$.setDesc(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  require('./$.tag')(C, NAME);

  O[NAME] = C;
  $def($def.G + $def.W + $def.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$":45,"./$.def":27,"./$.fails":31,"./$.for-of":32,"./$.global":33,"./$.hide":35,"./$.mix":47,"./$.strict-new":53,"./$.support-desc":55,"./$.tag":56}],25:[function(require,module,exports){
var core = module.exports = {};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],26:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};
},{"./$.a-function":17}],27:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , PROTOTYPE = 'prototype';
var ctx = function(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
};
var $def = function(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {})[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && typeof target[key] != 'function')exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp[PROTOTYPE] = C[PROTOTYPE];
    }(out);
    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export
    exports[key] = exp;
    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
module.exports = $def;
},{"./$.core":25,"./$.global":33}],28:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],29:[function(require,module,exports){
// all enumerable object keys, includes symbols
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":45}],30:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
module.exports = Math.expm1 || function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
};
},{}],31:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],32:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":18,"./$.ctx":26,"./$.is-array-iter":37,"./$.iter-call":39,"./$.to-length":59,"./core.get-iterator-method":64}],33:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var UNDEFINED = 'undefined';
var global = module.exports = typeof window != UNDEFINED && window.Math == Math
  ? window : typeof self != UNDEFINED && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],34:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],35:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.support-desc') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":45,"./$.property-desc":49,"./$.support-desc":55}],36:[function(require,module,exports){
// indexed object, fallback for non-array-like ES3 strings
var cof = require('./$.cof');
module.exports = 0 in Object('z') ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":21}],37:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./$.iterators')
  , ITERATOR  = require('./$.wks')('iterator');
module.exports = function(it){
  return (Iterators.Array || Array.prototype[ITERATOR]) === it;
};
},{"./$.iterators":44,"./$.wks":63}],38:[function(require,module,exports){
// http://jsperf.com/core-js-isobject
module.exports = function(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
};
},{}],39:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":18}],40:[function(require,module,exports){
'use strict';
var $ = require('./$')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: require('./$.property-desc')(1,next)});
  require('./$.tag')(Constructor, NAME + ' Iterator');
};
},{"./$":45,"./$.hide":35,"./$.property-desc":49,"./$.tag":56,"./$.wks":63}],41:[function(require,module,exports){
'use strict';
var LIBRARY         = require('./$.library')
  , $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , hide            = require('./$.hide')
  , has             = require('./$.has')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , Iterators       = require('./$.iterators')
  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values';
var returnThis = function(){ return this; };
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  require('./$.iter-create')(Constructor, NAME, next);
  var createMethod = function(kind){
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = require('./$').getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    require('./$.tag')(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
  }
  // Define iterator
  if(!LIBRARY || FORCE)hide(proto, SYMBOL_ITERATOR, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod(KEYS),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * BUGGY, NAME, methods);
  }
};
},{"./$":45,"./$.def":27,"./$.has":34,"./$.hide":35,"./$.iter-create":40,"./$.iterators":44,"./$.library":46,"./$.redef":50,"./$.tag":56,"./$.wks":63}],42:[function(require,module,exports){
var SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , SAFE_CLOSING    = false;
try {
  var riter = [7][SYMBOL_ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }
module.exports = function(exec){
  if(!SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[SYMBOL_ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[SYMBOL_ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":63}],43:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],44:[function(require,module,exports){
module.exports = {};
},{}],45:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],46:[function(require,module,exports){
module.exports = true;
},{}],47:[function(require,module,exports){
var $redef = require('./$.redef');
module.exports = function(target, src){
  for(var key in src)$redef(target, key, src[key]);
  return target;
};
},{"./$.redef":50}],48:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
module.exports = function(KEY, exec){
  var $def = require('./$.def')
    , fn   = (require('./$.core').Object || {})[KEY] || Object[KEY]
    , exp  = {};
  exp[KEY] = exec(fn);
  $def($def.S + $def.F * require('./$.fails')(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":25,"./$.def":27,"./$.fails":31}],49:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],50:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":35}],51:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":33}],52:[function(require,module,exports){
'use strict';
var $       = require('./$')
  , SPECIES = require('./$.wks')('species');
module.exports = function(C){
  if(require('./$.support-desc') && !(SPECIES in C))$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":45,"./$.support-desc":55,"./$.wks":63}],53:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],54:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":28,"./$.to-integer":57}],55:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":31}],56:[function(require,module,exports){
var has  = require('./$.has')
  , hide = require('./$.hide')
  , TAG  = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))hide(it, TAG, tag);
};
},{"./$.has":34,"./$.hide":35,"./$.wks":63}],57:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],58:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":28,"./$.iobject":36}],59:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":57}],60:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":28}],61:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],62:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],63:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || require('./$.uid'))('Symbol.' + name));
};
},{"./$.global":33,"./$.shared":51,"./$.uid":61}],64:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};
},{"./$.classof":20,"./$.core":25,"./$.iterators":44,"./$.wks":63}],65:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $def        = require('./$.def')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$def($def.S + $def.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , mapfn   = arguments[1]
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, arguments[2], 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      for(result = new C(length = toLength(O.length)); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});
},{"./$.ctx":26,"./$.def":27,"./$.is-array-iter":37,"./$.iter-call":39,"./$.iter-detect":42,"./$.to-length":59,"./$.to-object":60,"./core.get-iterator-method":64}],66:[function(require,module,exports){
'use strict';
var setUnscope = require('./$.unscope')
  , step       = require('./$.iter-step')
  , Iterators  = require('./$.iterators')
  , toIObject  = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$.iter-define":41,"./$.iter-step":43,"./$.iterators":44,"./$.to-iobject":58,"./$.unscope":62}],67:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $def  = require('./$.def')
  , expm1 = require('./$.expm1')
  , exp   = Math.exp;

$def($def.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./$.def":27,"./$.expm1":30}],68:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');

$def($def.S + $def.F, 'Object', {assign: require('./$.assign')});
},{"./$.assign":19,"./$.def":27}],69:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":48,"./$.to-object":60}],70:[function(require,module,exports){

},{}],71:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.2 Set Objects
require('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments[0]); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":24,"./$.collection-strong":22}],72:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":41,"./$.string-at":54}],73:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $def  = require('./$.def');

$def($def.P, 'Set', {toJSON: require('./$.collection-to-json')('Set')});
},{"./$.collection-to-json":23,"./$.def":27}],74:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":44,"./es6.array.iterator":66}],75:[function(require,module,exports){
module.exports={
  "name": "gak",
  "version": "0.0.4",
  "description": "Graph Analysis Kit for NodeJS",
  "main": "./dist/node/index.js",
  "scripts": {
    "test": "gulp test",
    "prepublish": "gulp compile"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/CrossLead/gak.git"
  },
  "keywords": [
    "graph",
    "network",
    "link",
    "analysis",
    "clustering"
  ],
  "author": "McChrystal Group",
  "license": "Apache 2.0",
  "bugs": {
    "url": "https://github.com/CrossLead/gak/issues"
  },
  "homepage": "https://github.com/CrossLead/gak",
  "dependencies": {
    "babel-core": "^5.8.22",
    "babel-runtime": "^5.8.20"
  },
  "devDependencies": {
    "async": "^1.4.2",
    "babel": "^5.8.23",
    "babel-eslint": "^4.1.0",
    "babelify": "^6.2.0",
    "browserify": "^11.0.1",
    "chai": "^3.2.0",
    "esdoc": "^0.2.5",
    "esdoc-es7-plugin": "0.0.2",
    "fast-csv": "^0.6.0",
    "gulp": "^3.9.0",
    "gulp-babel": "^5.2.1",
    "gulp-concat": "^2.6.0",
    "gulp-eslint": "^1.0.0",
    "gulp-gh-pages": "^0.5.2",
    "gulp-mocha": "^2.1.3",
    "gulp-run": "^1.6.10",
    "gulp-sourcemaps": "^1.5.2",
    "gulp-uglify": "^1.3.0",
    "gulp-watch": "^4.3.5",
    "lodash": "^3.10.1",
    "mkdirp": "^0.5.1",
    "mocha": "^2.2.5",
    "progress": "^1.1.8",
    "promised-mongo": "^1.2.0",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "^1.1.0",
    "yargs": "^3.21.0"
  }
}
},{}],76:[function(require,module,exports){
/**
 * EventRank implementation
 *
 * Model adapted from "EventRank: A Framework for Ranking Time-Varying Networks"
 * (O’Madadhain & Smyth, 2005), utilizes 'Reply Model' of potential weights
 *
 * PDF: http://www.datalab.uci.edu/papers/linkkdd05-02.pdf
 */
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Math$tanh = require('babel-runtime/core-js/math/tanh')['default'];

var _Set = require('babel-runtime/core-js/set')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

exports.__esModule = true;

var _util = require('../util/');

var π = Math.PI;
var tanh = _Math$tanh;
var pow = Math.pow;

var oneDay = 24 * 60 * 60; // one day in seconds
var modelTypes = new _Set(['baseline', 'reply']);

/**
 * Decay function for influence on potential of event sent by sender s ∈ P_i
 *  using time since event sent from s
 *
 * @param  {Number} Δts : Change in time since last last event sent by s
 * @param  {Number} G : Decay constant to weight sensitivity of new events
 * @return {Number}
 */
function g(Δts, G) {
  return (tanh(10 * Δts / (G * π) - π) + 1) / 2;
}

/**
 * Decay function for influence on potential of event sent by sender s ∈ P_i
 *  using time since last event recieved by r ∈ P_i from s
 *
 * @param  {Number} Δtr : time since last event recieved by r ∈ P_i from s
 * @param  {Number} H : Decay constant to weight sensitivity of new events
 * @return {Number}
 */
function h(Δtr, H) {
  return pow(2, -Δtr / H);
}

/**
 * Event Rank instance
 *
 * @return {EventRank}
 */

var EventRank = (function () {

  /**
   * Create set of unique correspondents involved in all events
   *
   * @static
   * @return {Array<String>} array of correspondent ids
   */

  EventRank.getCorrespondents = function getCorrespondents(events) {
    var outSet = new _Set();
    _util.each(events, function (event) {
      outSet.add(event.from);
      _util.each(_util.ensureArray(event.to), function (id) {
        return outSet.add(id);
      });
    });
    return _Array$from(outSet);
  };

  /**
   * Compute starting ranks of given correspondents
   * @example
   * const ranks = EventRank.startRanks(['a', 'b', 'c'])
   * // => {a: {value: 0.3333333333, time: 0}, ...}
   *
   * @static
   * @return {Array<Object>} starting ranks = 1 / |C|
   */

  EventRank.startRanks = function startRanks(correspondents) {
    var value = 1 / correspondents.length,
        time = 0;
    return correspondents.reduce(function (o, c) {
      return (o[c] = { value: value, time: time }, o);
    }, {});
  };

  /**
   * Collapse times into buckets
   *
   * @static
   * @param {Array<Object>} Array of events to bucket
   * @return {Array<Object>} Array of objects with properties "events" and "time"
   */

  EventRank.bucket = function bucket(events) {
    var hash = {};
    var bucket = undefined;
    _util.each(events, function (event) {
      if (bucket = hash[event.time]) {
        bucket.push(event);
      } else {
        hash[event.time] = [event];
      }
    });
    var times = _Object$keys(hash);
    times.sort();
    return times.map(function (time) {
      return { time: parseInt(time, 10), events: hash[time] };
    });
  };

  /**
   * Construct EventRank object
   *
   * @property {Object} ranks computed ranks so far
   * @property {Array} correspondents list of ids invoved in events
   * @property {Array} events list events associated with ranking algorithm
   * @property {Object} correspondanceMatrix tracks send/recive times
   * @property {String} model model type = 'baseline' || 'reply'
   * @property {Number} G sender recharge parameter (reply model)
   * @property {Number} H reply halflife parameter (reply model)
   * @property {Number} f potential flow fraction
   * @param  {Object} opts weight parameters, correspondent set,
   *                         events (expected to be sorted by time)
   * @return {EventRank}
   */

  _createClass(EventRank, null, [{
    key: 'g',

    // export helper functions with class
    value: g,
    enumerable: true
  }, {
    key: 'h',
    value: h,
    enumerable: true
  }]);

  function EventRank(opts) {
    var _context;

    _classCallCheck(this, EventRank);

    // default options
    var _opts$G = opts.G;
    var G = _opts$G === undefined ? oneDay : _opts$G;
    var _opts$H = opts.H;
    var H = _opts$H === undefined ? oneDay : _opts$H;
    var _opts$f = opts.f;
    var f = _opts$f === undefined ? 0.3 : _opts$f;
    var _opts$model = opts.model;
    var model = _opts$model === undefined ? 'baseline' : _opts$model;
    var _opts$time = opts.time;
    var time = _opts$time === undefined ? 0 : _opts$time;
    var _opts$events = opts.events;
    var events = _opts$events === undefined ? [] : _opts$events;
    var include = opts.include;

    _util.assert(modelTypes.has(model), 'Unexpected model type: ' + model);

    // get ranks if passed
    var ranks = opts.ranks;
    var correspondents = opts.correspondents;
    var correspondanceMatrix = opts.correspondanceMatrix;

    if (!correspondents && events) {
      correspondents = EventRank.getCorrespondents(events);
    }

    // start ranks for all = |C| if not present
    if (!ranks && correspondents) {
      ranks = EventRank.startRanks(correspondents);
    }

    if (!correspondanceMatrix) {
      correspondanceMatrix = correspondents.reduce(function (o, c) {
        return (o[c] = {}, o);
      }, {});
    }

    // add properties
    _Object$assign(this, {
      G: G, H: H, f: f, model: model,
      time: time,
      correspondents: correspondents,
      correspondanceMatrix: correspondanceMatrix,
      events: events,
      ranks: ranks,
      Vα: []
    });

    this.setInclude(include);
    this.correspondents = this.correspondents.filter((_context = this.include).has.bind(_context));
  }

  /**
   * Create the inclusion set for ranking
   *
   * @param {Set | Array} include (optional)
   * @return {EventRank} this : return self for chaining
   */

  EventRank.prototype.setInclude = function setInclude(include) {
    include = include || this.correspondents;
    _util.assert(Array.isArray(include) || include instanceof _Set, 'include needs to be a Set or an Array, but got: ' + include);
    this.include = new _Set(include);
    return this;
  };

  /**
   * Package EventRank in pojo for serializing / db storage
   *
   * @return {Object} plain object for serialization
   */

  EventRank.prototype.serialize = function serialize() {
    var out = {};

    for (var prop in this) {
      var p = undefined;
      if (!((p = this[prop]) instanceof Function)) {
        out[prop] = p;
      }
    }

    return out;
  };

  /**
   * Json string of serialized EventRank
   *
   * @param {Boolean} pretty print formatted Json
   * @return {String} JSON representation of EventRank
   */

  EventRank.prototype.toJson = function toJson(pretty) {
    var args = [this.serialize()];
    if (pretty) {
      args.push.apply(args, [null, 2]);
    }
    return JSON.stringify.apply(JSON, args);
  };

  /**
   * Log current ranks to console
   *
   * @return {EventRank} this : return self for chaining
   */

  EventRank.prototype.log = function log() {
    console.log(this.ranks);
    return this;
  };

  /**
   * Reset model to starting ranks
   *
   * @return {EventRank} this : return self for chaining
   */

  EventRank.prototype.reset = function reset() {
    var _context2;

    this.setInclude(this.include.length || this.include.size ? this.include : this.correspondents);

    this.correspondents = this.correspondents.filter((_context2 = this.include).has.bind(_context2));

    this.correspondanceMatrix = this.correspondents.reduce(function (o, c) {
      return (o[c] = {}, o);
    }, {});

    this.ranks = EventRank.startRanks(this.correspondents);
    return this;
  };

  /**
   * Reset model to starting ranks and compute ranks over all events
   *
   * @return {EventRank} this : return self for chaining
   */

  EventRank.prototype.compute = function compute() {
    return this.reset().step(this.events).done();
  };

  /**
   * Get ranks of top n individuals
   *
   * @param {Number} number of ranks to report (from top)
   * @return {Array<Object>} top n ranks
   */

  EventRank.prototype.top = function top(n) {
    var ranks = [];
    for (var id in this.ranks) {
      ranks.push(_extends({ id: id }, this.ranks[id]));
    }
    ranks.sort(function (a, b) {
      return b.value - a.value;
    });
    return ranks.slice(0, n);
  };

  /**
   * Get ranks of given ids at current period
   *
   * @param {Array<String> | String} combination of str and array<str> of ids
   * @return {Array<Object>} ranks of (ids) at current period
   */

  EventRank.prototype.get = function get() {
    var _ref,
        _this = this;

    for (var _len = arguments.length, ids = Array(_len), _key = 0; _key < _len; _key++) {
      ids[_key] = arguments[_key];
    }

    // catchup these individuals
    this.catchUp(ids = (_ref = []).concat.apply(_ref, ids));
    return ids.map(function (id) {
      return _extends({ id: id }, _this.ranks[id]);
    });
  };

  /**
   * Ranks of individuals who were not participants in the previous event
   * need to be updated, apply a non-participant rank adjustment
   * for each period:
   *      d ∉ P_i :    R_i(d) = R_i-1(d) * (1 - (α_i / Tn_i))
   *
   * @example
   * const R = new EventRank({correspondents: ['a', 'b', 'c']});
   * R.step({from: 'a', to: 'b', time: 1});
   * R.catchUp('c') // catch c ranks to period 1
   *
   * @param  {String | Array<String>} id(s) of participant to "catch up"
   * @return {EventRank} this : return self for chaining
   */

  EventRank.prototype.catchUp = function catchUp(participant) {

    if (Array.isArray(participant)) {
      _util.each(participant, this.catchUp.bind(this));
      return this;
    }

    var CM = this.correspondanceMatrix;
    var ranks = this.ranks;
    var Vα = this.Vα;

    var iα = Vα.length,
        rank = ranks[participant];

    var i = CM[participant].lastUpdate || 0;

    while (i < iα) {
      var αLag = Vα[i++];
      rank.value *= 1 - αLag.value;
      rank.time = αLag.time;
    }

    // update index of last update
    CM[participant].lastUpdate = iα;
    return this;
  };

  /**
   * "Catch up" all correspondents to current period
   *
   * @return {EventRank} this : return self for chaining
   */

  EventRank.prototype.done = function done() {
    return this.catchUp(this.correspondents);
  };

  /**
   * Calculate new ranks given an additional event
   *
   * @param  {Object | Array<Object>} event to add
   * @param  {String} (optional) bucketMode option (capture | apply)
   * @return {EventRank} return self for chaining
   */

  EventRank.prototype.step = function step(event, bucket) {
    var _context3,
        _this2 = this;

    // if event is acutally an array of events, step through all
    if (Array.isArray(event)) {
      _util.each(event, this.step.bind(this));
      return this;
    }

    // if event is an event bucket run through time bucket
    if (event.events) {
      var _ret = (function () {
        var n = event.events.length - 1;
        _util.each(event.events, function (e, index) {
          _this2.step(e, index !== n ? 'capture' : 'apply');
        });
        return {
          v: _this2
        };
      })();

      if (typeof _ret === 'object') return _ret.v;
    }

    // capture or apply time updates for bucket
    var capture = bucket === 'capture';
    var apply = bucket === 'apply';
    var isBucket = capture || apply;
    var watching = (_context3 = this.include).has.bind(_context3);

    // unpack model weight parameters + ranks + correspondents
    var G = this.G;
    var H = this.H;
    var f = this.f;
    var ranks = this.ranks;
    var CM = this.correspondanceMatrix;
    var model = this.model;
    var Vα = this.Vα;

    // unpack event, create set of participants
    var to = event.to;
    var sender = event.from;
    var time = event.time;

    if (!watching(sender)) {
      return;
    }

    var recipients = new _Set(_util.ensureArray(to).filter(watching));

    _util.assert(sender, 'no event in sender!', event);
    _util.assert(to.length, 'no recipients of event!', event);
    _util.assert(time, 'no recorded time (or time === 0)!', event);

    // if the sender sends themself an email...
    recipients['delete'](sender);

    // if the message was from A -> A, skip
    if (recipients.size === 0) {
      return;
    }

    var timeUpdates = undefined;
    if (isBucket) {
      timeUpdates = this.timeUpdates = this.timeUpdates || {};
      timeUpdates[sender] = timeUpdates[sender] || { recieved: {} };
    } else {
      delete this.timeUpdates;
    }

    // get array from recipient set
    var recipientArray = _Array$from(recipients);

    // counts of participants + total correspondents
    var nP = recipients.size + 1;

    // catch up recipients with lazy ranks
    this.catchUp(sender);
    this.catchUp(recipientArray);

    // time differentials (for reply model)
    var Δts = undefined,
        Δtr = undefined;
    if (model === 'reply') {
      (function () {

        // Last time an email was sent by this sender
        // default to infinite time if no recorded emails sent by sender
        var lagSender = CM[sender];
        Δts = time - (lagSender.sent || -Infinity);

        // record current time as most recent send event by sender
        if (isBucket) {
          timeUpdates[sender].sent = time;
        } else {
          lagSender.sent = time;
        }

        // Find the most recent time a message was recieved by the sender
        // from any of P_i, start at infinity (if no messages
        // recieved by sender from any of P_i)
        var trMin = -Infinity,
            trRecipient = undefined;

        _util.each(recipientArray, function (recipient) {
          var tr = lagSender.recieved = lagSender.recieved || {};

          if ((trRecipient = tr[recipient]) && trRecipient > trMin) {
            trMin = trRecipient;
          }

          // if processing bucket, don't apply time updates
          // until all events in bucket have been processed
          if (isBucket) {
            timeUpdates[sender].recieved[recipient] = time;
          } else {
            tr[recipient] = time;
          }
        });

        // time difference (recipient) is
        // between now and minimum determined time above
        Δtr = time - trMin;

        // assert that time differentials are not negative
        // (can't send/recieve messages in the future!)
        _util.assert(Δts >= 0, 'Δts must not be negative: Δts = ' + Δts, event);
        _util.assert(Δtr >= 0, 'Δtr must not be negative: Δtr = ' + Δtr, event);
      })();
    }

    // time of last rank compuation of sender
    var lastTimeSender = ranks[sender].time;

    // start sum with sender rank
    var ΣR = ranks[sender].value;

    // build up sum of all participant ranks
    _util.each(recipientArray, function (recipient) {
      ΣR += ranks[recipient].value;
      // safety check to ensure that all of P_i is on same time period
      _util.assert(ranks[recipient].time === lastTimeSender, 'Last event time should be equal for all participants', event);
    });

    // Safety check to ensure that the sum should be within (0, 1)
    // not exact due to floating point issues...
    _util.assert(ΣR <= 1.000000000000009 && ΣR >= 0, 'ΣR must be in (0, 1): ΣR = ' + ΣR, event);

    if (ΣR > 1) {
      ΣR = 1;
    }

    // current total of non participants is one minus participent potential
    var Tn = 1 - ΣR;

    // potential transfer weight (with Tn factored out)
    var α = undefined;
    if (model === 'reply') {
      // reply model includes time weighting functions
      Vα.push({
        value: α = f * g(Δts, G) * h(Δtr, H), // calculate α for below
        time: time // save time of α calculation
      });
    } else {
        Vα.push({ value: α = f, time: time });
      }
    // Tn is factored out from α above, as cases when Tn == 0
    // cause division by 0 issues, so we need to multiply it back in here
    α *= Tn;

    // safety check for bounds of α
    _util.assert(α <= 1 && α >= 0, 'α must be in (0, 1): α = ' + α, event);

    // sum of additive inverse of ranks of participants
    var ΣRbar = nP - ΣR;

    // store last index of alpha
    var iαNew = Vα.length;

    var updateParticipant = function updateParticipant(participant) {
      var rank = ranks[participant];
      var value = rank.value;

      // update participant rank for this period
      value += α * ((1 - value) / ΣRbar);

      // update index of last update
      CM[participant].lastUpdate = iαNew;

      // push new rank with given time
      rank.value = value;
      rank.time = time;
    };

    // update all participantsc
    updateParticipant(sender);
    _util.each(recipientArray, updateParticipant);

    // apply time updates for bucket of events
    if (apply && timeUpdates) {
      for (var id in timeUpdates) {
        var up = timeUpdates[id];
        var cmS = CM[id];
        cmS.sent = up.sent;
        for (var rid in up.recieved) {
          cmS.recieved[rid] = up.recieved[rid];
        }
      }
      delete this.timeUpdates;
    }

    return this;
  };

  return EventRank;
})();

exports['default'] = EventRank;
module.exports = exports['default'];

},{"../util/":77,"babel-runtime/core-js/array/from":1,"babel-runtime/core-js/math/tanh":2,"babel-runtime/core-js/object/assign":3,"babel-runtime/core-js/object/keys":5,"babel-runtime/core-js/set":6,"babel-runtime/helpers/class-call-check":7,"babel-runtime/helpers/create-class":8,"babel-runtime/helpers/extends":9}],77:[function(require,module,exports){
/**
 * Utility helper functions
 */

/**
 * Throw error if bool is not satisfied
 *
 * @param  {Boolean} bool: Bool that must be true
 * @return {undefined}
 */
'use strict';

exports.__esModule = true;
exports.assert = assert;
exports.ensureArray = ensureArray;
exports.last = last;
exports.each = each;
exports.gakError = gakError;

function assert(bool, message, event) {
  if (!bool) {
    gakError('Assertion failed' + (message ? ': ' + message : ''), event);
  }
}

/**
 * Wrap an item in an array if it is not already one
 *
 * @param  {Any} Object to be wrapped
 * @return {Array<Any>} array of object
 */

function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
}

/**
 * Get the last element from an array
 *
 * @param  {Array<Any>} Array of items
 * @return {Any} Last element of given array
 */

function last(arr) {
  return arr[arr.length - 1];
}

/**
 * Faster forEach function
 *
 * @param  {Array<Any>} arr Array of items
 * @param  {Function} fn Function to call on each item
 * @return {undefined}
 */

function each(arr, fn) {
  if (!(arr instanceof Array)) {
    gakError('Non array object passed to each! (' + arr + ')');
  }
  for (var i = 0, l = arr.length; i < l; i++) {
    fn(arr[i], i);
  }
}

/**
 * Throw a library specific error
 *
 * @param  {String} Error messagec
 * @param  {Object} (optional) Event object
 * @return {undefined}
 */

function gakError(message, event) {
  message = 'gak.js | ' + message;
  if (event) {
    var pretty = JSON.stringify(event, null, 2);
    message = message + ' | Last Processed Event: \n' + pretty;
  }
  throw new Error(message);
}

exports['default'] = {
  assert: assert,
  gakError: gakError,
  last: last,
  each: each,
  ensureArray: ensureArray
};

},{}],78:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _packageJson = require('../package.json');

var _classesEventRank = require('./classes/EventRank');

var _classesEventRank2 = _interopRequireDefault(_classesEventRank);

var _util = require('./util/');

var _util2 = _interopRequireDefault(_util);

exports['default'] = {

  // top level properties
  version: _packageJson.version,
  util: _util2['default'],

  // Classes
  EventRank: _classesEventRank2['default']

};
module.exports = exports['default'];

},{"../package.json":75,"./classes/EventRank":76,"./util/":77,"babel-runtime/helpers/interop-require-default":10}]},{},[78])(78)
});


//# sourceMappingURL=gak.js.map