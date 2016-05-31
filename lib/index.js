'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.md2html = exports.html2pdf = undefined;

var _html2pdf = require('./html2pdf');

var _html2pdf2 = _interopRequireDefault(_html2pdf);

var _md2html = require('./md2html');

var _md2html2 = _interopRequireDefault(_md2html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.html2pdf = _html2pdf2.default;
exports.md2html = _md2html2.default;