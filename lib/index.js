'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.md2html = exports.html2pdf = undefined;

var _html2Pdf = require('./html-2-pdf');

var _html2Pdf2 = _interopRequireDefault(_html2Pdf);

var _md2Html = require('./md-2-html');

var _md2Html2 = _interopRequireDefault(_md2Html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.html2pdf = _html2Pdf2.default;
exports.md2html = _md2Html2.default;