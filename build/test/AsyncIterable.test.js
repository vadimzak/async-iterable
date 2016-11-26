'use strict';

require('babel-polyfill');

var _stream = require('stream');

var _AsyncIterable = require('../AsyncIterable');

var _AsyncIterable2 = _interopRequireDefault(_AsyncIterable);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//import fs from 'fs'

// mocha flow type declarations
describe('AsyncIterable', function () {

  describe('#from() (static)', function () {
    it('creates an AsyncIterable from an Iterable', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ai = _AsyncIterable2.default.from(new Set([1, 2, 3]).values());
              _context.next = 3;
              return ai.toArray();

            case 3:
              res = _context.sent;

              (0, _chai.expect)(res).to.eql([1, 2, 3]);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    })));

    it('creates an AsyncIterable from an Array', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ai = _AsyncIterable2.default.from([1, 2, 3]);
              _context2.next = 3;
              return ai.toArray();

            case 3:
              res = _context2.sent;

              (0, _chai.expect)(res).to.eql([1, 2, 3]);

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    })));

    it('creates an AsyncIterable from an Stream', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var s, ai, res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              s = new _stream.Readable();

              s.push("1");
              s.push("2");
              s.push(null);

              //let s = fs.createReadStream('package.json')

              ai = _AsyncIterable2.default.from(function () {
                return s;
              });
              _context3.next = 7;
              return ai.toArray();

            case 7:
              res = _context3.sent;

              (0, _chai.expect)(res.map(function (buf) {
                return buf.toString();
              })).to.eql(["1", "2"]);

            case 9:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    })));
  });

  it('#toArray() returns correct results', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var ai, res;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ai = new _AsyncIterable2.default([1, 2, 3]);
            _context4.next = 3;
            return ai.toArray();

          case 3:
            res = _context4.sent;

            (0, _chai.expect)(res).to.eql([1, 2, 3]);

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  })));

  describe('Queued', function () {
    it('#toArray() returns correct results', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              ai = new _AsyncIterable2.default(new Set([1, 2, 3]).values());
              _context5.next = 3;
              return ai.toArray();

            case 3:
              res = _context5.sent;

              (0, _chai.expect)(res).to.eql([1, 2, 3]);

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    })), 1);
  });

  describe('#forEach()', function () {

    it('is called on all items', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              ai = new _AsyncIterable2.default([1, 2, 3]);
              res = [];
              _context6.next = 4;
              return ai.forEach(function (n) {
                res.push(n);
              });

            case 4:
              (0, _chai.expect)(res).to.eql([1, 2, 3]);

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    })));

    it('stoppes when brkObj is returned', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              ai = new _AsyncIterable2.default([1, 2, 3]);
              res = [];
              _context7.next = 4;
              return ai.forEach(function (n, i, brkObj) {
                res.push(n);
                return brkObj;
              });

            case 4:
              (0, _chai.expect)(res).to.eql([1]);

            case 5:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    })));
  });

  describe('#size', function () {

    it('returns size on Array', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              ai = new _AsyncIterable2.default([1, 2, 3]);
              res = ai.size;

              (0, _chai.expect)(res).to.eql(3);

            case 3:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));

    it('returns undefined size on Iterable', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              ai = new _AsyncIterable2.default(new Set([1, 2, 3]).values());
              res = ai.size;

              (0, _chai.expect)(res).to.eql(undefined);

            case 3:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    })));
  });

  it('#map() returns mapped results', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var ai, res;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            ai = new _AsyncIterable2.default([1, 2, 3]);
            _context10.next = 3;
            return ai.map(function (n) {
              return n.toString();
            }).toArray();

          case 3:
            res = _context10.sent;

            (0, _chai.expect)(res).to.eql(['1', '2', '3']);

          case 5:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  })));

  it('#filter() returns filtered results', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var ai, res;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            ai = new _AsyncIterable2.default([1, 2, 3]);
            _context11.next = 3;
            return ai.filter(function (n) {
              return n % 2 === 0;
            }).toArray();

          case 3:
            res = _context11.sent;

            (0, _chai.expect)(res).to.eql([2]);

          case 5:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  })));

  describe('#take()', function () {

    it('returns less results', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              ai = new _AsyncIterable2.default([1, 2, 3]);
              _context12.next = 3;
              return ai.take(2).toArray();

            case 3:
              res = _context12.sent;

              (0, _chai.expect)(res).to.eql([1, 2]);

            case 5:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    })));

    it('#take().size returns correct size on Array', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              ai = new _AsyncIterable2.default([1, 2, 3]);
              _context13.next = 3;
              return ai.take(2).size;

            case 3:
              res = _context13.sent;

              (0, _chai.expect)(res).to.eql(2);

            case 5:
            case 'end':
              return _context13.stop();
          }
        }
      }, _callee13, undefined);
    })));

    it('#take().size returns undefiend size on Iterable', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              ai = new _AsyncIterable2.default(new Set([1, 2, 3]).values());
              _context14.next = 3;
              return ai.take(2).size;

            case 3:
              res = _context14.sent;

              (0, _chai.expect)(res).to.eql(undefined);

            case 5:
            case 'end':
              return _context14.stop();
          }
        }
      }, _callee14, undefined);
    })));
  });
});
//# sourceMappingURL=AsyncIterable.test.js.map