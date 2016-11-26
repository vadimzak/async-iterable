'use strict';

require('babel-polyfill');

var _AsyncIterable = require('../AsyncIterable');

var _AsyncIterable2 = _interopRequireDefault(_AsyncIterable);

var _asyncUtils = require('../asyncUtils');

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// mocha flow type declarations
describe('AsyncIterable', function () {

  describe('Queued', function () {
    it('#toArray() returns correct results', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ai = new _AsyncIterable2.default(new Set([1, 2, 3]).values(), function () {
                var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(n) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return (0, _asyncUtils.sleep)(n);

                        case 2:
                          return _context.abrupt('return', n);

                        case 3:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined);
                }));

                return function (_x) {
                  return _ref2.apply(this, arguments);
                };
              }());
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
    })), 1);
  });

  it('#toArray() returns correct results', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var ai, res;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ai = new _AsyncIterable2.default([1, 2, 3], function () {
              var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(n) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return (0, _asyncUtils.sleep)(n);

                      case 2:
                        return _context3.abrupt('return', n);

                      case 3:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x2) {
                return _ref4.apply(this, arguments);
              };
            }());
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

  describe('#forEach()', function () {

    it('is called on all items', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              ai = new _AsyncIterable2.default([1, 2, 3], function () {
                var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(n) {
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return (0, _asyncUtils.sleep)(n);

                        case 2:
                          return _context5.abrupt('return', n);

                        case 3:
                        case 'end':
                          return _context5.stop();
                      }
                    }
                  }, _callee5, undefined);
                }));

                return function (_x3) {
                  return _ref6.apply(this, arguments);
                };
              }());
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

    it('stoppes when brkObj is returned', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              ai = new _AsyncIterable2.default([1, 2, 3], function () {
                var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(n) {
                  return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return (0, _asyncUtils.sleep)(n);

                        case 2:
                          return _context7.abrupt('return', n);

                        case 3:
                        case 'end':
                          return _context7.stop();
                      }
                    }
                  }, _callee7, undefined);
                }));

                return function (_x4) {
                  return _ref8.apply(this, arguments);
                };
              }());
              res = [];
              _context8.next = 4;
              return ai.forEach(function (n, i, brkObj) {
                res.push(n);
                return brkObj;
              });

            case 4:
              (0, _chai.expect)(res).to.eql([1]);

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    })));
  });

  describe('#size()', function () {

    it('returns size on Array', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              ai = new _AsyncIterable2.default([1, 2, 3], function () {
                var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(n) {
                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return (0, _asyncUtils.sleep)(n);

                        case 2:
                          return _context9.abrupt('return', n);

                        case 3:
                        case 'end':
                          return _context9.stop();
                      }
                    }
                  }, _callee9, undefined);
                }));

                return function (_x5) {
                  return _ref10.apply(this, arguments);
                };
              }());
              res = ai.size();

              (0, _chai.expect)(res).to.eql(3);

            case 3:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    })));

    it('returns undefined size on Iterable', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              ai = new _AsyncIterable2.default(new Set([1, 2, 3]).values(), function () {
                var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(n) {
                  return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          _context11.next = 2;
                          return (0, _asyncUtils.sleep)(n);

                        case 2:
                          return _context11.abrupt('return', n);

                        case 3:
                        case 'end':
                          return _context11.stop();
                      }
                    }
                  }, _callee11, undefined);
                }));

                return function (_x6) {
                  return _ref12.apply(this, arguments);
                };
              }());
              res = ai.size();

              (0, _chai.expect)(res).to.eql(undefined);

            case 3:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, undefined);
    })));
  });

  it('#map() returns mapped results', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var ai, res;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            ai = new _AsyncIterable2.default([1, 2, 3], function () {
              var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(n) {
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.next = 2;
                        return (0, _asyncUtils.sleep)(n);

                      case 2:
                        return _context13.abrupt('return', n);

                      case 3:
                      case 'end':
                        return _context13.stop();
                    }
                  }
                }, _callee13, undefined);
              }));

              return function (_x7) {
                return _ref14.apply(this, arguments);
              };
            }());
            _context14.next = 3;
            return ai.map(function (n) {
              return n.toString();
            }).toArray();

          case 3:
            res = _context14.sent;

            (0, _chai.expect)(res).to.eql(['1', '2', '3']);

          case 5:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  })));

  it('#filter() returns filtered results', _asyncToGenerator(regeneratorRuntime.mark(function _callee16() {
    var ai, res;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            ai = new _AsyncIterable2.default([1, 2, 3], function () {
              var _ref16 = _asyncToGenerator(regeneratorRuntime.mark(function _callee15(n) {
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        _context15.next = 2;
                        return (0, _asyncUtils.sleep)(n);

                      case 2:
                        return _context15.abrupt('return', n);

                      case 3:
                      case 'end':
                        return _context15.stop();
                    }
                  }
                }, _callee15, undefined);
              }));

              return function (_x8) {
                return _ref16.apply(this, arguments);
              };
            }());
            _context16.next = 3;
            return ai.filter(function (n) {
              return n % 2 === 0;
            }).toArray();

          case 3:
            res = _context16.sent;

            (0, _chai.expect)(res).to.eql([2]);

          case 5:
          case 'end':
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  })));

  describe('#take()', function () {

    it('returns less results', _asyncToGenerator(regeneratorRuntime.mark(function _callee18() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              ai = new _AsyncIterable2.default([1, 2, 3], function () {
                var _ref18 = _asyncToGenerator(regeneratorRuntime.mark(function _callee17(n) {
                  return regeneratorRuntime.wrap(function _callee17$(_context17) {
                    while (1) {
                      switch (_context17.prev = _context17.next) {
                        case 0:
                          _context17.next = 2;
                          return (0, _asyncUtils.sleep)(n);

                        case 2:
                          return _context17.abrupt('return', n);

                        case 3:
                        case 'end':
                          return _context17.stop();
                      }
                    }
                  }, _callee17, undefined);
                }));

                return function (_x9) {
                  return _ref18.apply(this, arguments);
                };
              }());
              _context18.next = 3;
              return ai.take(2).toArray();

            case 3:
              res = _context18.sent;

              (0, _chai.expect)(res).to.eql([1, 2]);

            case 5:
            case 'end':
              return _context18.stop();
          }
        }
      }, _callee18, undefined);
    })));

    it('#take().size() returns correct size on Array', _asyncToGenerator(regeneratorRuntime.mark(function _callee20() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              ai = new _AsyncIterable2.default([1, 2, 3], function () {
                var _ref20 = _asyncToGenerator(regeneratorRuntime.mark(function _callee19(n) {
                  return regeneratorRuntime.wrap(function _callee19$(_context19) {
                    while (1) {
                      switch (_context19.prev = _context19.next) {
                        case 0:
                          _context19.next = 2;
                          return (0, _asyncUtils.sleep)(n);

                        case 2:
                          return _context19.abrupt('return', n);

                        case 3:
                        case 'end':
                          return _context19.stop();
                      }
                    }
                  }, _callee19, undefined);
                }));

                return function (_x10) {
                  return _ref20.apply(this, arguments);
                };
              }());
              _context20.next = 3;
              return ai.take(2).size();

            case 3:
              res = _context20.sent;

              (0, _chai.expect)(res).to.eql(2);

            case 5:
            case 'end':
              return _context20.stop();
          }
        }
      }, _callee20, undefined);
    })));

    it('#take().size() returns undefiend size on Iterable', _asyncToGenerator(regeneratorRuntime.mark(function _callee22() {
      var ai, res;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              ai = new _AsyncIterable2.default(new Set([1, 2, 3]).values(), function () {
                var _ref22 = _asyncToGenerator(regeneratorRuntime.mark(function _callee21(n) {
                  return regeneratorRuntime.wrap(function _callee21$(_context21) {
                    while (1) {
                      switch (_context21.prev = _context21.next) {
                        case 0:
                          _context21.next = 2;
                          return (0, _asyncUtils.sleep)(n);

                        case 2:
                          return _context21.abrupt('return', n);

                        case 3:
                        case 'end':
                          return _context21.stop();
                      }
                    }
                  }, _callee21, undefined);
                }));

                return function (_x11) {
                  return _ref22.apply(this, arguments);
                };
              }());
              _context22.next = 3;
              return ai.take(2).size();

            case 3:
              res = _context22.sent;

              (0, _chai.expect)(res).to.eql(undefined);

            case 5:
            case 'end':
              return _context22.stop();
          }
        }
      }, _callee22, undefined);
    })));
  });
});
//# sourceMappingURL=AsyncIterable.test.js.map