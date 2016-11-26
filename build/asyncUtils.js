'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var sleep = exports.sleep = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var periodMs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (r) {
              return setTimeout(r, periodMs);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function sleep(_x) {
    return _ref.apply(this, arguments);
  };
}();

var asyncIterableForEach = exports.asyncIterableForEach = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(iterable, asyncFunc) {
    var brkObj, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item, ret;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            brkObj = Symbol('brkObj');
            i = 0;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 5;
            _iterator = _asyncIterator(iterable);

          case 7:
            _context2.next = 9;
            return _iterator.next();

          case 9:
            _step = _context2.sent;
            _iteratorNormalCompletion = _step.done;
            _context2.next = 13;
            return _step.value;

          case 13:
            _value = _context2.sent;

            if (_iteratorNormalCompletion) {
              _context2.next = 24;
              break;
            }

            item = _value;
            _context2.next = 18;
            return asyncFunc(item, i++, brkObj);

          case 18:
            ret = _context2.sent;

            if (!(ret === brkObj)) {
              _context2.next = 21;
              break;
            }

            return _context2.abrupt('break', 24);

          case 21:
            _iteratorNormalCompletion = true;
            _context2.next = 7;
            break;

          case 24:
            _context2.next = 30;
            break;

          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2['catch'](5);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 30:
            _context2.prev = 30;
            _context2.prev = 31;

            if (!(!_iteratorNormalCompletion && _iterator.return)) {
              _context2.next = 35;
              break;
            }

            _context2.next = 35;
            return _iterator.return();

          case 35:
            _context2.prev = 35;

            if (!_didIteratorError) {
              _context2.next = 38;
              break;
            }

            throw _iteratorError;

          case 38:
            return _context2.finish(35);

          case 39:
            return _context2.finish(30);

          case 40:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[5, 26, 30, 40], [31,, 35, 39]]);
  }));

  return function asyncIterableForEach(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

function _asyncIterator(iterable) { if (typeof Symbol === "function") { if (Symbol.asyncIterator) { var method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { return iterable[Symbol.iterator](); } } throw new TypeError("Object is not async iterable"); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=asyncUtils.js.map