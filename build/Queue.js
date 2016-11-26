'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncUtils = require('./asyncUtils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_MAX_QUEUE_SIZE = -1;
var DEFAULT_SLEEP_PERIOD_MS = 0;

var Queue = function Queue() {
  var _this = this;

  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Queue);

  this.items = [];
  this.blockingCount = 0;
  this.closed = false;

  this.push = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(newItem) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_this.config.maxSize > 0 && _this.items.length >= _this.config.maxSize)) {
                _context.next = 7;
                break;
              }

              _this.blockingCount++;
              _context.next = 4;
              return (0, _asyncUtils.sleep)(_this.config.sleepPeriodMs);

            case 4:
              _this.blockingCount--;
              _context.next = 0;
              break;

            case 7:

              _this.items.push(newItem);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();

  this.pop = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(_this.items.length === 0)) {
              _context2.next = 9;
              break;
            }

            if (!_this.closed) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt('return', Queue.empty);

          case 3:
            _this.blockingCount++;
            _context2.next = 6;
            return (0, _asyncUtils.sleep)(_this.config.sleepPeriodMs);

          case 6:
            _this.blockingCount--;
            _context2.next = 0;
            break;

          case 9:
            return _context2.abrupt('return', _this.items.shift());

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));
  this.close = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _this.closed = true;

          case 1:
            if (!(_this.items.length > 0)) {
              _context3.next = 6;
              break;
            }

            _context3.next = 4;
            return (0, _asyncUtils.sleep)(_this.config.sleepPeriodMs);

          case 4:
            _context3.next = 1;
            break;

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  this.isBlocking = function () {
    return _this.blockingCount > 0;
  };

  this.getLength = function () {
    return _this.items.length;
  };

  this.config = config;
  this.config.maxSize = this.config.maxSize || DEFAULT_MAX_QUEUE_SIZE;
  this.config.sleepPeriodMs = this.config.sleepPeriodMs || DEFAULT_SLEEP_PERIOD_MS;

  this.items = [];
  this.blockingCount = 0;
  this.closed = false;
};

Queue.empty = Symbol('empty');
exports.default = Queue;
//# sourceMappingURL=Queue.js.map