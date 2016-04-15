(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gak = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":10}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":11}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/math/tanh"), __esModule: true };
},{"core-js/library/fn/math/tanh":12}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":13}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":14}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":15}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/set"), __esModule: true };
},{"core-js/library/fn/set":16}],8:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],9:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":5}],10:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$.core').Array.from;
},{"../../modules/$.core":25,"../../modules/es6.array.from":64,"../../modules/es6.string.iterator":71}],11:[function(require,module,exports){
var core = require('../../modules/$.core');
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
};
},{"../../modules/$.core":25}],12:[function(require,module,exports){
require('../../modules/es6.math.tanh');
module.exports = require('../../modules/$.core').Math.tanh;
},{"../../modules/$.core":25,"../../modules/es6.math.tanh":66}],13:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":25,"../../modules/es6.object.assign":67}],14:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":44}],15:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":25,"../../modules/es6.object.keys":68}],16:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.set');
require('../modules/es7.set.to-json');
module.exports = require('../modules/$.core').Set;
},{"../modules/$.core":25,"../modules/es6.object.to-string":69,"../modules/es6.set":70,"../modules/es6.string.iterator":71,"../modules/es7.set.to-json":72,"../modules/web.dom.iterable":73}],17:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],18:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],19:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":37}],20:[function(require,module,exports){
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
},{"./$.cof":21,"./$.wks":62}],21:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],22:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , hide         = require('./$.hide')
  , redefineAll  = require('./$.redefine-all')
  , ctx          = require('./$.ctx')
  , strictNew    = require('./$.strict-new')
  , defined      = require('./$.defined')
  , forOf        = require('./$.for-of')
  , $iterDefine  = require('./$.iter-define')
  , step         = require('./$.iter-step')
  , ID           = require('./$.uid')('id')
  , $has         = require('./$.has')
  , isObject     = require('./$.is-object')
  , setSpecies   = require('./$.set-species')
  , DESCRIPTORS  = require('./$.descriptors')
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
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
    redefineAll(C.prototype, {
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
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
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
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
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
    $iterDefine(C, NAME, function(iterated, kind){
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
    setSpecies(NAME);
  }
};
},{"./$":44,"./$.ctx":26,"./$.defined":27,"./$.descriptors":28,"./$.for-of":31,"./$.has":33,"./$.hide":34,"./$.is-object":37,"./$.iter-define":40,"./$.iter-step":42,"./$.redefine-all":50,"./$.set-species":52,"./$.strict-new":55,"./$.uid":61}],23:[function(require,module,exports){
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
},{"./$.classof":20,"./$.for-of":31}],24:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , global         = require('./$.global')
  , $export        = require('./$.export')
  , fails          = require('./$.fails')
  , hide           = require('./$.hide')
  , redefineAll    = require('./$.redefine-all')
  , forOf          = require('./$.for-of')
  , strictNew      = require('./$.strict-new')
  , isObject       = require('./$.is-object')
  , setToStringTag = require('./$.set-to-string-tag')
  , DESCRIPTORS    = require('./$.descriptors');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    C = wrapper(function(target, iterable){
      strictNew(target, C, NAME);
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)$.setDesc(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$":44,"./$.descriptors":28,"./$.export":29,"./$.fails":30,"./$.for-of":31,"./$.global":32,"./$.hide":34,"./$.is-object":37,"./$.redefine-all":50,"./$.set-to-string-tag":53,"./$.strict-new":55}],25:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
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
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":17}],27:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],28:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":30}],29:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":25,"./$.ctx":26,"./$.global":32}],30:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],31:[function(require,module,exports){
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
},{"./$.an-object":19,"./$.ctx":26,"./$.is-array-iter":36,"./$.iter-call":38,"./$.to-length":59,"./core.get-iterator-method":63}],32:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],33:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],34:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":44,"./$.descriptors":28,"./$.property-desc":49}],35:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":21}],36:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":43,"./$.wks":62}],37:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],38:[function(require,module,exports){
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
},{"./$.an-object":19}],39:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":44,"./$.hide":34,"./$.property-desc":49,"./$.set-to-string-tag":53,"./$.wks":62}],40:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":44,"./$.export":29,"./$.has":33,"./$.hide":34,"./$.iter-create":39,"./$.iterators":43,"./$.library":45,"./$.redefine":51,"./$.set-to-string-tag":53,"./$.wks":62}],41:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":62}],42:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],43:[function(require,module,exports){
module.exports = {};
},{}],44:[function(require,module,exports){
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
},{}],45:[function(require,module,exports){
module.exports = true;
},{}],46:[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
module.exports = Math.expm1 || function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
};
},{}],47:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":44,"./$.fails":30,"./$.iobject":35,"./$.to-object":60}],48:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":25,"./$.export":29,"./$.fails":30}],49:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],50:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":51}],51:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":34}],52:[function(require,module,exports){
'use strict';
var core        = require('./$.core')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":44,"./$.core":25,"./$.descriptors":28,"./$.wks":62}],53:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":44,"./$.has":33,"./$.wks":62}],54:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":32}],55:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],56:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":27,"./$.to-integer":57}],57:[function(require,module,exports){
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
},{"./$.defined":27,"./$.iobject":35}],59:[function(require,module,exports){
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
},{"./$.defined":27}],61:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],62:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":32,"./$.shared":54,"./$.uid":61}],63:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":20,"./$.core":25,"./$.iterators":43,"./$.wks":62}],64:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $export     = require('./$.export')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":26,"./$.export":29,"./$.is-array-iter":36,"./$.iter-call":38,"./$.iter-detect":41,"./$.to-length":59,"./$.to-object":60,"./core.get-iterator-method":63}],65:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
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

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":18,"./$.iter-define":40,"./$.iter-step":42,"./$.iterators":43,"./$.to-iobject":58}],66:[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./$.export')
  , expm1   = require('./$.math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./$.export":29,"./$.math-expm1":46}],67:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":29,"./$.object-assign":47}],68:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":48,"./$.to-object":60}],69:[function(require,module,exports){

},{}],70:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.2 Set Objects
require('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":24,"./$.collection-strong":22}],71:[function(require,module,exports){
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
},{"./$.iter-define":40,"./$.string-at":56}],72:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./$.export');

$export($export.P, 'Set', {toJSON: require('./$.collection-to-json')('Set')});
},{"./$.collection-to-json":23,"./$.export":29}],73:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":43,"./es6.array.iterator":65}],74:[function(require,module,exports){
"use strict";

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _tanh = require('babel-runtime/core-js/math/tanh');

var _tanh2 = _interopRequireDefault(_tanh);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return (0, _from2.default)(arr);
    }
}

var index_1 = require('../util/index');
var π = Math.PI;
var tanh = _tanh2.default;
var pow = Math.pow;

var oneDay = 24 * 60 * 60 * 1000;
var modelTypes = new _set2.default(['baseline', 'reply']);
function g(Δts, G) {
    return (tanh(10 * Δts / (G * π) - π) + 1) / 2;
}
exports.g = g;
function h(Δtr, H) {
    return pow(2, -Δtr / H);
}
exports.h = h;

var EventRank = function () {
    function EventRank(opts) {
        (0, _classCallCheck3.default)(this, EventRank);

        this.correspondents = [];
        var _opts$G = opts.G;
        var G = _opts$G === undefined ? oneDay : _opts$G;
        var _opts$H = opts.H;
        var H = _opts$H === undefined ? oneDay : _opts$H;
        var _opts$f = opts.f;
        var f = _opts$f === undefined ? 0.8 : _opts$f;
        var _opts$model = opts.model;
        var model = _opts$model === undefined ? 'reply' : _opts$model;
        var _opts$events = opts.events;
        var events = _opts$events === undefined ? [] : _opts$events;
        var include = opts.include;

        index_1.assert(modelTypes.has(model), 'Unexpected model type: ' + model);
        var ranks = opts.ranks;
        var correspondents = opts.correspondents;
        var correspondanceMatrix = opts.correspondanceMatrix;

        if (!correspondents && events) {
            correspondents = EventRank.getCorrespondents(events);
        }
        if (!ranks && correspondents) {
            ranks = EventRank.startRanks(correspondents);
        }
        if (!correspondanceMatrix) {
            correspondanceMatrix = correspondents.reduce(function (o, c) {
                return o[c] = {}, o;
            }, {});
        }
        (0, _assign2.default)(this, {
            G: G, H: H, f: f, model: model,
            correspondents: correspondents,
            correspondanceMatrix: correspondanceMatrix,
            events: events,
            ranks: ranks,
            Vα: []
        });
        this.setInclude(include);
        this.correspondents = this.correspondents.filter(this.include.has.bind(this.include));
    }

    (0, _createClass3.default)(EventRank, [{
        key: 'setInclude',
        value: function setInclude(include) {
            include = include || this.correspondents;
            index_1.assert(Array.isArray(include) || include instanceof _set2.default, 'include needs to be a Set or an Array, but got: ' + include);
            this.include = new _set2.default(include);
            return this;
        }
    }, {
        key: 'serialize',
        value: function serialize() {
            var out = {},
                thisObject = this;
            for (var prop in thisObject) {
                var p = void 0;
                if (!((p = thisObject[prop]) instanceof Function)) {
                    out[prop] = p instanceof _set2.default ? [].concat(_toConsumableArray(p)) : p;
                }
            }
            return out;
        }
    }, {
        key: 'toJson',
        value: function toJson(pretty) {
            return pretty ? (0, _stringify2.default)(this.serialize(), null, 2) : (0, _stringify2.default)(this.serialize());
        }
    }, {
        key: 'log',
        value: function log() {
            console.log(this.ranks);
            return this;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setInclude(this.include && this.include.size ? this.include : this.correspondents);
            this.correspondents = this.correspondents.filter(this.include.has.bind(this.include));
            this.correspondanceMatrix = this.correspondents.reduce(function (o, c) {
                return o[c] = {}, o;
            }, {});
            this.ranks = EventRank.startRanks(this.correspondents);
            return this;
        }
    }, {
        key: 'compute',
        value: function compute() {
            return this.reset().step(this.events).done();
        }
    }, {
        key: 'top',
        value: function top(n) {
            var ranks = [];
            for (var id in this.ranks) {
                ranks.push((0, _assign2.default)({ id: id }, this.ranks[id]));
            }
            ranks.sort(function (a, b) {
                return b.value - a.value;
            });
            return ranks.slice(0, n);
        }
    }, {
        key: 'get',
        value: function get() {
            var _this = this;

            var _ref;

            for (var _len = arguments.length, ids = Array(_len), _key = 0; _key < _len; _key++) {
                ids[_key] = arguments[_key];
            }

            this.catchUp(ids = (_ref = []).concat.apply(_ref, _toConsumableArray(ids)));
            return ids.map(function (id) {
                return (0, _assign2.default)({ id: id }, _this.ranks[id]);
            });
        }
    }, {
        key: 'catchUp',
        value: function catchUp(participant) {
            if (typeof participant === 'string') {
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
                CM[participant].lastUpdate = iα;
                return this;
            } else {
                for (var _i = 0, l = participant.length; _i < l; _i++) {
                    this.catchUp(participant[_i]);
                }
                return this;
            }
        }
    }, {
        key: 'done',
        value: function done() {
            return this.catchUp(this.correspondents);
        }
    }, {
        key: 'step',
        value: function step(event, bucket) {
            if (Array.isArray(event)) {
                for (var i = 0, l = event.length; i < l; i++) {
                    this.step(event[i]);
                }
                return this;
            } else {
                if (event.events) {
                    var events = event.events,
                        n = event.events.length - 1;
                    for (var _i2 = 0, _l = events.length; _i2 < _l; _i2++) {
                        this.step(events[_i2], _i2 !== n ? 'capture' : 'apply');
                    }
                    return this;
                }
                var capture = bucket === 'capture';
                var apply = bucket === 'apply';
                var isBucket = capture || apply;
                var watching = this.include.has.bind(this.include);
                var G = this.G;
                var H = this.H;
                var f = this.f;
                var ranks = this.ranks;
                var CM = this.correspondanceMatrix;
                var model = this.model;
                var Vα = this.Vα;
                var to = event.to;
                var sender = event.from;
                var time = event.time;

                if (!watching(sender)) {
                    return this;
                }
                var recipients = new _set2.default(index_1.ensureArray(to).filter(watching));
                index_1.assert(!!sender, 'no event in sender!', event);
                index_1.assert(!!to.length, 'no recipients of event!', event);
                index_1.assert(!!time, 'no recorded time (or time === 0)!', event);
                recipients.delete(sender);
                if (recipients.size === 0) {
                    return this;
                }
                var timeUpdates = void 0;
                if (isBucket) {
                    timeUpdates = this.timeUpdates = this.timeUpdates || {};
                    timeUpdates[sender] = timeUpdates[sender] || { recieved: {} };
                } else {
                    delete this.timeUpdates;
                }
                var recipientArray = (0, _from2.default)(recipients);
                var nP = recipients.size + 1;
                this.catchUp(sender);
                this.catchUp(recipientArray);
                var Δts = void 0,
                    Δtr = void 0;
                if (model === 'reply') {
                    var lagSender = CM[sender];
                    Δts = time - (lagSender.sent || -Infinity);
                    if (isBucket) {
                        timeUpdates[sender].sent = time;
                    } else {
                        lagSender.sent = time;
                    }
                    var trMin = -Infinity,
                        trRecipient = void 0;
                    for (var _i3 = 0, _l2 = recipientArray.length; _i3 < _l2; _i3++) {
                        var recipient = recipientArray[_i3],
                            tr = lagSender.recieved = lagSender.recieved || {};
                        if ((trRecipient = tr[recipient]) && trRecipient > trMin) {
                            trMin = trRecipient;
                        }
                        if (isBucket) {
                            timeUpdates[sender].recieved[recipient] = time;
                        } else {
                            tr[recipient] = time;
                        }
                    }
                    Δtr = time - trMin;
                    index_1.assert(Δts >= 0, 'Δts must not be negative: Δts = ' + Δts, event);
                    index_1.assert(Δtr >= 0, 'Δtr must not be negative: Δtr = ' + Δtr, event);
                }
                var ΣR = ranks[sender].value;
                for (var _i4 = 0, _l3 = recipientArray.length; _i4 < _l3; _i4++) {
                    ΣR += ranks[recipientArray[_i4]].value;
                }
                index_1.assert(ΣR <= 1.000000000000009 && ΣR >= 0, 'ΣR must be in (0, 1): ΣR = ' + ΣR, event);
                if (ΣR > 1) {
                    ΣR = 1;
                }
                var Tn = 1 - ΣR;
                var α = void 0;
                if (model === 'reply') {
                    Vα.push({
                        value: α = f * g(Δts, G) * h(Δtr, H),
                        time: time
                    });
                } else {
                    Vα.push({ value: α = f, time: time });
                }
                α *= Tn;
                index_1.assert(α <= 1 && α >= 0, 'α must be in (0, 1): α = ' + α, event);
                var ΣRbar = nP - ΣR;
                var iαNew = Vα.length;
                recipientArray.push(sender);
                for (var _i5 = 0, _l4 = recipientArray.length; _i5 < _l4; _i5++) {
                    var participant = recipientArray[_i5],
                        rank = ranks[participant];
                    var value = rank.value;
                    value += α * ((1 - value) / ΣRbar);
                    CM[participant].lastUpdate = iαNew;
                    rank.value = value;
                    rank.time = time;
                }
                if (apply && timeUpdates) {
                    for (var id in timeUpdates) {
                        var up = timeUpdates[id],
                            cmS = CM[id];
                        cmS.recieved = cmS.recieved || {};
                        cmS.sent = up.sent;
                        for (var rid in up.recieved) {
                            cmS.recieved[rid] = up.recieved[rid];
                        }
                    }
                    delete this.timeUpdates;
                }
                return this;
            }
        }
    }], [{
        key: 'getCorrespondents',
        value: function getCorrespondents(events) {
            var outSet = new _set2.default();
            for (var i = 0, l = events.length; i < l; i++) {
                var event = events[i],
                    to = event.to;
                outSet.add(event.from);
                for (var t = 0, lt = to.length; t < lt; t++) {
                    outSet.add(to[t]);
                }
            }
            return (0, _from2.default)(outSet);
        }
    }, {
        key: 'startRanks',
        value: function startRanks(correspondents) {
            var value = 1 / correspondents.length,
                time = 0;
            return correspondents.reduce(function (o, c) {
                return o[c] = { value: value, time: time }, o;
            }, {});
        }
    }, {
        key: 'bucket',
        value: function bucket(events) {
            var hash = {};
            var currentBucket = void 0;
            for (var i = 0, l = events.length; i < l; i++) {
                var event = events[i];
                if (currentBucket = hash[event.time]) {
                    currentBucket.push(event);
                } else {
                    hash[event.time] = [event];
                }
            }
            var times = (0, _keys2.default)(hash).map(function (time) {
                return parseInt(time, 10);
            });
            times.sort();
            return times.map(function (time) {
                return { time: time, events: hash[time] };
            });
        }
    }]);
    return EventRank;
}();

exports.EventRank = EventRank;

},{"../util/index":76,"babel-runtime/core-js/array/from":1,"babel-runtime/core-js/json/stringify":2,"babel-runtime/core-js/math/tanh":3,"babel-runtime/core-js/object/assign":4,"babel-runtime/core-js/object/keys":6,"babel-runtime/core-js/set":7,"babel-runtime/helpers/classCallCheck":8,"babel-runtime/helpers/createClass":9}],75:[function(require,module,exports){
"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
__export(require('./classes/EventRank'));
var index_1 = require('./util/index');
exports.util = index_1.default;

},{"./classes/EventRank":74,"./util/index":76}],76:[function(require,module,exports){
"use strict";

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assert(bool, message, event) {
    if (!bool) {
        gakError('Assertion failed' + (message ? ': ' + message : ''), event);
    }
}
exports.assert = assert;
function ensureArray(value) {
    return Array.isArray(value) ? value : [value];
}
exports.ensureArray = ensureArray;
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
function gakError(message, event) {
    message = 'gak.js | ' + message;
    if (event) {
        var pretty = (0, _stringify2.default)(event, null, 2);
        message = message + ' | Last Processed Event: \n' + pretty;
    }
    throw new Error(message);
}
exports.gakError = gakError;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    assert: assert,
    gakError: gakError,
    last: last,
    ensureArray: ensureArray
};

},{"babel-runtime/core-js/json/stringify":2}],77:[function(require,module,exports){
module.exports={
  "name": "gak",
  "version": "0.0.7",
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
    "babel-runtime": "^5.8.20",
    "event-rank": "0.0.3"
  },
  "devDependencies": {
    "async": "^1.4.2",
    "babel-core": "6.7.2",
    "babel-eslint": "6.0.2",
    "babel-plugin-add-module-exports": "0.1.2",
    "babel-plugin-transform-class-properties": "6.6.0",
    "babel-plugin-transform-flow-strip-types": "6.7.0",
    "babel-plugin-transform-runtime": "6.6.0",
    "babel-polyfill": "^6.7.4",
    "babel-preset-es2015": "6.6.0",
    "babel-preset-es2015-node4": "2.0.3",
    "babel-preset-stage-0": "6.5.0",
    "babel-runtime": "6.6.1",
    "babelify": "7.2.0",
    "browserify": "13.0.0",
    "chai": "^3.2.0",
    "esdoc": "^0.4.5",
    "esdoc-es7-plugin": "0.0.3",
    "eslint": "2.6.0",
    "fast-csv": "^0.6.0",
    "gh-pages": "^0.10.0",
    "gulp": "^3.9.0",
    "gulp-babel": "^6.1.2",
    "gulp-concat": "^2.6.0",
    "gulp-eslint": "^2.0.0",
    "gulp-gh-pages": "^0.5.3",
    "gulp-mocha": "^2.1.3",
    "gulp-run": "^1.6.10",
    "gulp-sourcemaps": "^1.5.2",
    "gulp-uglify": "^1.3.0",
    "gulp-watch": "^4.3.5",
    "lodash": "^3.10.1",
    "mkdirp": "^0.5.1",
    "mocha": "^2.2.5",
    "moment": "^2.10.6",
    "progress": "^1.1.8",
    "promised-mongo": "^1.2.0",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "^1.1.0",
    "yargs": "^3.21.0"
  },
  "babel": {
    "sourceMaps": "both",
    "presets": [
      "stage-0",
      "es2015"
    ],
    "plugins": [
      "transform-runtime",
      "transform-class-properties",
      "transform-flow-strip-types"
    ]
  }
}

},{}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../package.json');

var _eventRank = require('event-rank');

exports.default = {

  // top level properties
  version: _package.version,

  // Classes
  EventRank: _eventRank.EventRank

};

},{"../package.json":77,"event-rank":75}]},{},[78])(78)
});


//# sourceMappingURL=gak.js.map
