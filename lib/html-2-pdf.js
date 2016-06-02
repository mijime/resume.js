'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _tmp = require('tmp');

var _tmp2 = _interopRequireDefault(_tmp);

var _duplexer = require('duplexer');

var _duplexer2 = _interopRequireDefault(_duplexer);

var _phantomjsPrebuilt = require('phantomjs-prebuilt');

var _phantomjsPrebuilt2 = _interopRequireDefault(_phantomjsPrebuilt);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTemp(postfix) {
  return new _promise2.default(function (resolve, reject) {
    _tmp2.default.file({ postfix: postfix }, function (err, path, fd) {
      if (err) {
        return reject(err);
      }

      _fs2.default.close(fd);
      return resolve(path);
    });
  });
}

exports.default = function () {
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    var _this = this;

    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var location = _ref.location;
    var paperFormat = _ref.paperFormat;
    var paperBorder = _ref.paperBorder;
    var paperOrientation = _ref.paperOrientation;
    var instream, outstream, tmpHtmlPath$, tmpPdfPath$;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            instream = (0, _through2.default)();
            outstream = (0, _through2.default)();


            instream.pause();
            tmpHtmlPath$ = createTemp('.html');
            tmpPdfPath$ = createTemp('.pdf');
            _context3.t0 = instream;
            _context3.t1 = _fs2.default;
            _context3.next = 9;
            return tmpHtmlPath$;

          case 9:
            _context3.t2 = _context3.sent;
            _context3.t3 = _context3.t1.createWriteStream.call(_context3.t1, _context3.t2);
            _context3.t4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
              var writer;
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.t0 = _child_process2.default;
                      _context2.t1 = _path2.default.resolve(_phantomjsPrebuilt2.default.path);
                      _context2.t2 = _path2.default.resolve(__dirname, './phantom/render.js');
                      _context2.next = 5;
                      return tmpHtmlPath$;

                    case 5:
                      _context2.t3 = _context2.sent;
                      _context2.next = 8;
                      return tmpPdfPath$;

                    case 8:
                      _context2.t4 = _context2.sent;
                      _context2.t5 = location || process.cwd();
                      _context2.t6 = paperFormat || 'A4';
                      _context2.t7 = paperBorder || '2cm';
                      _context2.t8 = paperOrientation || 'portrait';
                      _context2.t9 = [_context2.t2, _context2.t3, _context2.t4, _context2.t5, _context2.t6, _context2.t7, _context2.t8];

                      _context2.t10 = function () {
                        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(err) {
                          return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  if (!err) {
                                    _context.next = 3;
                                    break;
                                  }

                                  outstream.emit('error', err);
                                  return _context.abrupt('return');

                                case 3:
                                  _context.t0 = _fs2.default;
                                  _context.next = 6;
                                  return tmpPdfPath$;

                                case 6:
                                  _context.t1 = _context.sent;
                                  _context.t2 = outstream;

                                  _context.t0.createReadStream.call(_context.t0, _context.t1).pipe(_context.t2);

                                case 9:
                                case 'end':
                                  return _context.stop();
                              }
                            }
                          }, _callee, _this);
                        }));
                        return function (_x3) {
                          return ref.apply(this, arguments);
                        };
                      }();

                      writer = _context2.t0.execFile.call(_context2.t0, _context2.t1, _context2.t9, _context2.t10);

                      writer.stdout.pipe(process.stdout);
                      writer.stderr.pipe(process.stderr);

                    case 18:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this);
            }));

            _context3.t0.pipe.call(_context3.t0, _context3.t3).on('finish', _context3.t4);

            instream.resume();
            return _context3.abrupt('return', (0, _duplexer2.default)(instream, outstream));

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return function (_x) {
    return ref.apply(this, arguments);
  };
}();