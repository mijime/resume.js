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
  var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var location = _ref.location;
    var paperFormat = _ref.paperFormat;
    var paperBorder = _ref.paperBorder;
    var paperOrientation = _ref.paperOrientation;
    var instream, outstream, tmpHtmlPath, tmpPdfPath;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            instream = (0, _through2.default)();
            outstream = (0, _through2.default)();
            _context.next = 4;
            return createTemp('.html');

          case 4:
            tmpHtmlPath = _context.sent;
            _context.next = 7;
            return createTemp('.pdf');

          case 7:
            tmpPdfPath = _context.sent;


            instream.pause();
            instream.pipe(_fs2.default.createWriteStream(tmpHtmlPath)).on('finish', function () {
              var writer = _child_process2.default.execFile(_path2.default.resolve(_phantomjsPrebuilt2.default.path), [_path2.default.resolve(__dirname, './phantom/render.js'), tmpHtmlPath, tmpPdfPath, location || process.cwd(), paperFormat || 'A4', paperBorder || '2cm', paperOrientation || 'portrait'], function (err) {
                if (err) {
                  outstream.emit('error', err);
                  return;
                }
                _fs2.default.createReadStream(tmpPdfPath).pipe(outstream);
              });

              writer.stdout.pipe(process.stdout);
              writer.stderr.pipe(process.stderr);
            });
            instream.resume();
            return _context.abrupt('return', (0, _duplexer2.default)(instream, outstream));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function (_x) {
    return ref.apply(this, arguments);
  };
}();