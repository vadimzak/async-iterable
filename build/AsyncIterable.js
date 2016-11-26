'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreamIterable = exports.AsyncIteratorBase = exports.AsyncIterableBase = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Queue = require('./Queue');

var _Queue2 = _interopRequireDefault(_Queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncIterator(iterable) { if (typeof Symbol === "function") { if (Symbol.asyncIterator) { var method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { return iterable[Symbol.iterator](); } } throw new TypeError("Object is not async iterable"); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/***************************************/

var IterationError = function IterationError(errorObj) {
  _classCallCheck(this, IterationError);

  this.errorObj = errorObj;
};

/***************************************/

var AsyncIterableBase = exports.AsyncIterableBase = function () {
  function AsyncIterableBase() {
    _classCallCheck(this, AsyncIterableBase);
  }

  _createClass(AsyncIterableBase, [{
    key: 'toArray',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var array, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                array = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 4;
                _iterator = _asyncIterator(this);

              case 6:
                _context.next = 8;
                return _iterator.next();

              case 8:
                _step = _context.sent;
                _iteratorNormalCompletion = _step.done;
                _context.next = 12;
                return _step.value;

              case 12:
                _value = _context.sent;

                if (_iteratorNormalCompletion) {
                  _context.next = 19;
                  break;
                }

                item = _value;

                array.push(item);

              case 16:
                _iteratorNormalCompletion = true;
                _context.next = 6;
                break;

              case 19:
                _context.next = 25;
                break;

              case 21:
                _context.prev = 21;
                _context.t0 = _context['catch'](4);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 25:
                _context.prev = 25;
                _context.prev = 26;

                if (!(!_iteratorNormalCompletion && _iterator.return)) {
                  _context.next = 30;
                  break;
                }

                _context.next = 30;
                return _iterator.return();

              case 30:
                _context.prev = 30;

                if (!_didIteratorError) {
                  _context.next = 33;
                  break;
                }

                throw _iteratorError;

              case 33:
                return _context.finish(30);

              case 34:
                return _context.finish(25);

              case 35:
                return _context.abrupt('return', array);

              case 36:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 21, 25, 35], [26,, 30, 34]]);
      }));

      function toArray() {
        return _ref.apply(this, arguments);
      }

      return toArray;
    }()
  }, {
    key: 'forEach',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(asyncFunc) {
        var i, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _value2, item, ret;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                i = 0;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 4;
                _iterator2 = _asyncIterator(this);

              case 6:
                _context2.next = 8;
                return _iterator2.next();

              case 8:
                _step2 = _context2.sent;
                _iteratorNormalCompletion2 = _step2.done;
                _context2.next = 12;
                return _step2.value;

              case 12:
                _value2 = _context2.sent;

                if (_iteratorNormalCompletion2) {
                  _context2.next = 23;
                  break;
                }

                item = _value2;
                _context2.next = 17;
                return asyncFunc(item, i++, AsyncIterableBase.brkObj);

              case 17:
                ret = _context2.sent;

                if (!(ret === AsyncIterableBase.brkObj)) {
                  _context2.next = 20;
                  break;
                }

                return _context2.abrupt('break', 23);

              case 20:
                _iteratorNormalCompletion2 = true;
                _context2.next = 6;
                break;

              case 23:
                _context2.next = 29;
                break;

              case 25:
                _context2.prev = 25;
                _context2.t0 = _context2['catch'](4);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 29:
                _context2.prev = 29;
                _context2.prev = 30;

                if (!(!_iteratorNormalCompletion2 && _iterator2.return)) {
                  _context2.next = 34;
                  break;
                }

                _context2.next = 34;
                return _iterator2.return();

              case 34:
                _context2.prev = 34;

                if (!_didIteratorError2) {
                  _context2.next = 37;
                  break;
                }

                throw _iteratorError2;

              case 37:
                return _context2.finish(34);

              case 38:
                return _context2.finish(29);

              case 39:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 25, 29, 39], [30,, 34, 38]]);
      }));

      function forEach(_x) {
        return _ref2.apply(this, arguments);
      }

      return forEach;
    }()
  }, {
    key: 'map',
    value: function map(transformFunc) {
      return new MapAsyncIterable(this, transformFunc);
    }
  }, {
    key: 'filter',
    value: function filter(filterFunc) {
      return new FilterAsyncIterable(this, filterFunc);
    }
  }, {
    key: 'take',
    value: function take(maxItems) {
      return new TakeAsyncIterable(this, maxItems);
    }
  }, {
    key: 'size',
    get: function get() {
      return undefined;
    }
  }]);

  return AsyncIterableBase;
}();

AsyncIterableBase.brkObj = Symbol('brkObj');

var AsyncIteratorBase = exports.AsyncIteratorBase = function () {
  function AsyncIteratorBase() {
    _classCallCheck(this, AsyncIteratorBase);
  }

  _createClass(AsyncIteratorBase, [{
    key: 'next',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                throw new Error('This function must be overridden by derived classes');

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function next() {
        return _ref3.apply(this, arguments);
      }

      return next;
    }()
  }]);

  return AsyncIteratorBase;
}();

/***************************************/

var AsyncIterable = function (_AsyncIterableBase) {
  _inherits(AsyncIterable, _AsyncIterableBase);

  _createClass(AsyncIterable, null, [{
    key: 'from',
    value: function from(innerIterable) {
      var queueSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return new AsyncIterable(innerIterable, queueSize);
    }
  }]);

  function AsyncIterable(innerIterable) {
    var queueSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, AsyncIterable);

    var _this = _possibleConstructorReturn(this, (AsyncIterable.__proto__ || Object.getPrototypeOf(AsyncIterable)).call(this));

    _this._innerIterable = innerIterable;
    _this._queueSize = queueSize;
    return _this;
  }

  _createClass(AsyncIterable, [{
    key: Symbol.asyncIterator,
    value: function value() {
      if (typeof this._innerIterable === 'function') return new StreamIterator(this._innerIterable);
      return this._queueSize ? new QueuedAsyncIterator(this) : new AsyncIterator(this);
    }
  }, {
    key: 'size',
    get: function get() {
      return typeof this._innerIterable.length === 'undefined' ? this._innerIterable.size : this._innerIterable.length; // if _innerIterable is not a list, undefined will be returned
    }
  }]);

  return AsyncIterable;
}(AsyncIterableBase);

exports.default = AsyncIterable;

var QueuedAsyncIterator = function (_AsyncIteratorBase) {
  _inherits(QueuedAsyncIterator, _AsyncIteratorBase);

  function QueuedAsyncIterator(asyncIterable) {
    var _this3 = this;

    _classCallCheck(this, QueuedAsyncIterator);

    var _this2 = _possibleConstructorReturn(this, (QueuedAsyncIterator.__proto__ || Object.getPrototypeOf(QueuedAsyncIterator)).call(this));

    _this2.next = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
      var _value3;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!true) {
                _context4.next = 9;
                break;
              }

              _context4.next = 3;
              return _this2._queue.pop();

            case 3:
              _value3 = _context4.sent;

              if (!(_value3 === _Queue2.default.empty)) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt('return', { done: true });

            case 6:
              return _context4.abrupt('return', { done: false, value: _value3 });

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this3);
    }));
    _this2._start = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
      var _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _value4;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context5.prev = 3;
              _iterator3 = _this2._asyncIterable._innerIterable[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context5.next = 12;
                break;
              }

              _value4 = _step3.value;
              _context5.next = 9;
              return _this2._queue.push(_value4);

            case 9:
              _iteratorNormalCompletion3 = true;
              _context5.next = 5;
              break;

            case 12:
              _context5.next = 18;
              break;

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5['catch'](3);
              _didIteratorError3 = true;
              _iteratorError3 = _context5.t0;

            case 18:
              _context5.prev = 18;
              _context5.prev = 19;

              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }

            case 21:
              _context5.prev = 21;

              if (!_didIteratorError3) {
                _context5.next = 24;
                break;
              }

              throw _iteratorError3;

            case 24:
              return _context5.finish(21);

            case 25:
              return _context5.finish(18);

            case 26:
              _this2._queue.close();

            case 27:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this3, [[3, 14, 18, 26], [19,, 21, 25]]);
    }));

    _this2._asyncIterable = asyncIterable;
    _this2._queue = new _Queue2.default({ maxSize: _this2._asyncIterable._queueSize, sleepPeriodMs: 50 });
    _this2._start();
    return _this2;
  }

  return QueuedAsyncIterator;
}(AsyncIteratorBase);

var AsyncIterator = function (_AsyncIteratorBase2) {
  _inherits(AsyncIterator, _AsyncIteratorBase2);

  function AsyncIterator(asyncIterable) {
    var _this5 = this;

    _classCallCheck(this, AsyncIterator);

    var _this4 = _possibleConstructorReturn(this, (AsyncIterator.__proto__ || Object.getPrototypeOf(AsyncIterator)).call(this));

    _this4.next = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
      var next;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              next = _this4._innerIterator.next();

              if (!next.done) {
                _context6.next = 3;
                break;
              }

              return _context6.abrupt('return', { done: true });

            case 3:
              return _context6.abrupt('return', { done: false, value: next.value });

            case 4:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this5);
    }));

    _this4._asyncIterable = asyncIterable;
    _this4._innerIterator = _this4._asyncIterable._innerIterable[Symbol.iterator]();
    return _this4;
  }

  return AsyncIterator;
}(AsyncIteratorBase);

/***************************************/

var TakeAsyncIterable = function (_AsyncIterableBase2) {
  _inherits(TakeAsyncIterable, _AsyncIterableBase2);

  function TakeAsyncIterable(innerAsyncIterable, maxItems) {
    _classCallCheck(this, TakeAsyncIterable);

    var _this6 = _possibleConstructorReturn(this, (TakeAsyncIterable.__proto__ || Object.getPrototypeOf(TakeAsyncIterable)).call(this));

    _this6._innerAsyncIterable = innerAsyncIterable;
    _this6._maxItems = maxItems;
    return _this6;
  }

  _createClass(TakeAsyncIterable, [{
    key: Symbol.asyncIterator,
    value: function value() {
      return new TakeAsyncIterator(this);
    }
  }, {
    key: 'size',
    get: function get() {
      var innerSize = this._innerAsyncIterable.size;
      if (innerSize != undefined) {
        return Math.min(innerSize, this._maxItems);
      }
    }
  }]);

  return TakeAsyncIterable;
}(AsyncIterableBase);

var TakeAsyncIterator = function (_AsyncIteratorBase3) {
  _inherits(TakeAsyncIterator, _AsyncIteratorBase3);

  function TakeAsyncIterator(iterable) {
    _classCallCheck(this, TakeAsyncIterator);

    var _this7 = _possibleConstructorReturn(this, (TakeAsyncIterator.__proto__ || Object.getPrototypeOf(TakeAsyncIterator)).call(this));

    _this7._nextIndex = 0;

    _this7._iterable = iterable;
    _this7._innerAsyncIterator = _this7._iterable._innerAsyncIterable[Symbol.asyncIterator]();
    return _this7;
  }

  _createClass(TakeAsyncIterator, [{
    key: 'next',
    value: function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(this._nextIndex >= this._iterable._maxItems)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt('return', { done: true });

              case 2:
                this._nextIndex++;
                _context7.next = 5;
                return this._innerAsyncIterator.next();

              case 5:
                return _context7.abrupt('return', _context7.sent);

              case 6:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function next() {
        return _ref7.apply(this, arguments);
      }

      return next;
    }()
  }]);

  return TakeAsyncIterator;
}(AsyncIteratorBase);

/***************************************/

var MapAsyncIterable = function (_AsyncIterableBase3) {
  _inherits(MapAsyncIterable, _AsyncIterableBase3);

  function MapAsyncIterable(innerAsyncIterable, transformFunc) {
    _classCallCheck(this, MapAsyncIterable);

    var _this8 = _possibleConstructorReturn(this, (MapAsyncIterable.__proto__ || Object.getPrototypeOf(MapAsyncIterable)).call(this));

    _this8._innerAsyncIterable = innerAsyncIterable;
    _this8._transformFunc = transformFunc;
    return _this8;
  }

  _createClass(MapAsyncIterable, [{
    key: Symbol.asyncIterator,
    value: function value() {
      return new MapAsyncIterator(this);
    }
  }, {
    key: 'size',
    value: function size() {
      return this._innerAsyncIterable.size;
    }
  }]);

  return MapAsyncIterable;
}(AsyncIterableBase);

var MapAsyncIterator = function (_AsyncIteratorBase4) {
  _inherits(MapAsyncIterator, _AsyncIteratorBase4);

  function MapAsyncIterator(iterable) {
    _classCallCheck(this, MapAsyncIterator);

    var _this9 = _possibleConstructorReturn(this, (MapAsyncIterator.__proto__ || Object.getPrototypeOf(MapAsyncIterator)).call(this));

    _this9._nextIndex = 0;

    _this9._iterable = iterable;
    _this9._innerAsyncIterator = _this9._iterable._innerAsyncIterable[Symbol.asyncIterator]();
    return _this9;
  }

  _createClass(MapAsyncIterator, [{
    key: 'next',
    value: function () {
      var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
        var item, value;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._innerAsyncIterator.next();

              case 2:
                item = _context8.sent;

                if (!(item.done === true)) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt('return', { done: true });

              case 5:
                _context8.next = 7;
                return this._iterable._transformFunc(item.value);

              case 7:
                value = _context8.sent;
                return _context8.abrupt('return', { value: value, done: false });

              case 9:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function next() {
        return _ref8.apply(this, arguments);
      }

      return next;
    }()
  }]);

  return MapAsyncIterator;
}(AsyncIteratorBase);

/***************************************/

var FilterAsyncIterable = function (_AsyncIterableBase4) {
  _inherits(FilterAsyncIterable, _AsyncIterableBase4);

  function FilterAsyncIterable(innerAsyncIterable, filterFunc) {
    _classCallCheck(this, FilterAsyncIterable);

    var _this10 = _possibleConstructorReturn(this, (FilterAsyncIterable.__proto__ || Object.getPrototypeOf(FilterAsyncIterable)).call(this));

    _this10._innerAsyncIterable = innerAsyncIterable;
    _this10._filterFunc = filterFunc;
    return _this10;
  }

  _createClass(FilterAsyncIterable, [{
    key: Symbol.asyncIterator,
    value: function value() {
      return new FilterAsyncIterator(this);
    }
  }]);

  return FilterAsyncIterable;
}(AsyncIterableBase);

var FilterAsyncIterator = function (_AsyncIteratorBase5) {
  _inherits(FilterAsyncIterator, _AsyncIteratorBase5);

  function FilterAsyncIterator(iterable) {
    _classCallCheck(this, FilterAsyncIterator);

    var _this11 = _possibleConstructorReturn(this, (FilterAsyncIterator.__proto__ || Object.getPrototypeOf(FilterAsyncIterator)).call(this));

    _this11._nextIndex = 0;

    _this11._iterable = iterable;
    _this11._innerAsyncIterator = _this11._iterable._innerAsyncIterable[Symbol.asyncIterator]();
    return _this11;
  }

  _createClass(FilterAsyncIterator, [{
    key: 'next',
    value: function () {
      var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
        var item;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                item = { done: true };

              case 1:
                if (!true) {
                  _context9.next = 13;
                  break;
                }

                _context9.next = 4;
                return this._innerAsyncIterator.next();

              case 4:
                item = _context9.sent;

                if (!(item.done === true)) {
                  _context9.next = 7;
                  break;
                }

                return _context9.abrupt('break', 13);

              case 7:
                _context9.next = 9;
                return this._iterable._filterFunc(item.value);

              case 9:
                if (!_context9.sent) {
                  _context9.next = 11;
                  break;
                }

                return _context9.abrupt('break', 13);

              case 11:
                _context9.next = 1;
                break;

              case 13:
                return _context9.abrupt('return', item);

              case 14:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function next() {
        return _ref9.apply(this, arguments);
      }

      return next;
    }()
  }]);

  return FilterAsyncIterator;
}(AsyncIteratorBase);

/***************************************/

var StreamIterable = exports.StreamIterable = function (_AsyncIterableBase5) {
  _inherits(StreamIterable, _AsyncIterableBase5);

  function StreamIterable(streamFactory, queueConfig) {
    _classCallCheck(this, StreamIterable);

    var _this12 = _possibleConstructorReturn(this, (StreamIterable.__proto__ || Object.getPrototypeOf(StreamIterable)).call(this));

    _this12._streamFactory = streamFactory;
    _this12._queueConfig = queueConfig;
    return _this12;
  }

  _createClass(StreamIterable, [{
    key: Symbol.asyncIterator,
    value: function value() {
      return new StreamIterator(this._streamFactory(), this._queueConfig);
    }
  }]);

  return StreamIterable;
}(AsyncIterableBase);

var StreamIterator = function (_AsyncIteratorBase6) {
  _inherits(StreamIterator, _AsyncIteratorBase6);

  function StreamIterator(streamFactory) {
    var _this14 = this;

    var queueConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { maxSize: 10000 };

    _classCallCheck(this, StreamIterator);

    var _this13 = _possibleConstructorReturn(this, (StreamIterator.__proto__ || Object.getPrototypeOf(StreamIterator)).call(this));

    _this13._queue = new _Queue2.default(queueConfig);
    _this13._stream = streamFactory();

    //let stat = startStat('steram item')
    _this13._stream.on('data', function () {
      var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(item) {
        var errMsg;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;

                _this13._stream.pause();
                _context10.next = 4;
                return _this13._queue.push(item);

              case 4:
                _this13._stream.resume();
                //stat.inc()
                _context10.next = 12;
                break;

              case 7:
                _context10.prev = 7;
                _context10.t0 = _context10['catch'](0);
                errMsg = 'Error during handling StreamIterator stream data';

                console.error(errMsg, _context10.t0);
                _this13._queue.push(new IterationError(errMsg + ': ' + _context10.t0.toString()));

              case 12:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, _this14, [[0, 7]]);
      }));

      return function (_x5) {
        return _ref10.apply(this, arguments);
      };
    }());
    _this13._stream.on('end', function () {
      try {
        _this13._queue.close();
        //stat.end()
      } catch (err) {
        console.error('Error during handling StreamIterator stream end', err);
      }
    });
    _this13._stream.on('error', function () {
      var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(errStr) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return _this13._queue.push(new IterationError(errStr));

              case 3:
                _this13._queue.close();
                //stat.end()
                _context11.next = 9;
                break;

              case 6:
                _context11.prev = 6;
                _context11.t0 = _context11['catch'](0);

                console.error('Error during handling StreamIterator stream error', _context11.t0);

              case 9:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, _this14, [[0, 6]]);
      }));

      return function (_x6) {
        return _ref11.apply(this, arguments);
      };
    }());
    return _this13;
  }

  _createClass(StreamIterator, [{
    key: 'next',
    value: function () {
      var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
        var value;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._queue.pop();

              case 2:
                value = _context12.sent;

                if (!(value instanceof IterationError)) {
                  _context12.next = 5;
                  break;
                }

                throw value.errorObj instanceof Error ? value.errorObj : new Error(value.errorObj);

              case 5:
                if (!(value === _Queue2.default.empty)) {
                  _context12.next = 7;
                  break;
                }

                return _context12.abrupt('return', { done: true });

              case 7:
                return _context12.abrupt('return', { value: value, done: false });

              case 8:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function next() {
        return _ref12.apply(this, arguments);
      }

      return next;
    }()
  }]);

  return StreamIterator;
}(AsyncIteratorBase);
//# sourceMappingURL=AsyncIterable.js.map