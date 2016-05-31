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

exports.default = function () {
  var _this = this;

  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var templatePath = _ref.templatePath;
  var cssPaths = _ref.cssPaths;
  var jsPaths = _ref.jsPaths;

  var template$ = fsp.node('readFile')(templatePath || defaultTmpl, 'utf8');
  var styles$ = _promise2.default.all([defaultCss].concat(cssPaths || []).map(function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(cssPath) {
      var content;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fsp.node('readFile')(cssPath, 'utf8');

            case 2:
              content = _context.sent;
              return _context.abrupt('return', { content: content });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));
    return function (_x2) {
      return ref.apply(this, arguments);
    };
  }()));
  var scripts$ = _promise2.default.all((jsPaths || []).map(function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(jsPath) {
      var content;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fsp.node('readFile')(jsPath, 'utf8');

            case 2:
              content = _context2.sent;
              return _context2.abrupt('return', { content: content });

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));
    return function (_x3) {
      return ref.apply(this, arguments);
    };
  }()));

  var markdown = [];
  var stream = (0, _through2.default)(function (buf, enc, done) {
    markdown.push(buf);
    done();
  }, function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(done) {
      var content, html;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              content = (0, _marked2.default)(markdown.join(''));
              _context3.t0 = _mustache2.default;
              _context3.next = 4;
              return template$;

            case 4:
              _context3.t1 = _context3.sent;
              _context3.t2 = content;
              _context3.next = 8;
              return styles$;

            case 8:
              _context3.t3 = _context3.sent;
              _context3.next = 11;
              return scripts$;

            case 11:
              _context3.t4 = _context3.sent;
              _context3.t5 = {
                content: _context3.t2,
                styles: _context3.t3,
                scripts: _context3.t4
              };
              html = _context3.t0.render.call(_context3.t0, _context3.t1, _context3.t5);


              this.push(html);
              done();

            case 16:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));
    return function (_x4) {
      return ref.apply(this, arguments);
    };
  }());
  return stream;
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _promisify = require('./promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fsp = new _promisify2.default(_fs2.default);
var defaultTmpl = _path2.default.resolve(__dirname, '../templates/index.html');
var defaultCss = _path2.default.resolve(__dirname, '../templates/style.css');