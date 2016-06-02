'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html2pdf = html2pdf;
exports.md2html = md2html;

var _bl = require('bl');

var _bl2 = _interopRequireDefault(_bl);

var _through = require('through2');

var _replaceExt = require('replace-ext');

var _replaceExt2 = _interopRequireDefault(_replaceExt);

var _ = require('.');

var resume = _interopRequireWildcard(_);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createVinylStream(stream, extname) {
  return (0, _through.obj)(function transform(file, enc, done) {
    var _this = this;

    if (file.isNull()) {
      this.push(file);
      return done();
    }

    (file.isBuffer() ? file : file.contents).pipe(stream).pipe(new _bl2.default(function (err, data) {
      if (err) {
        return done(err);
      }

      var newFile = file.clone();
      newFile.contents = data;
      newFile.path = (0, _replaceExt2.default)(file.path, extname);
      _this.push(newFile);
      return done();
    }));
  });
}

function html2pdf() {
  return createVinylStream(resume.html2pdf.call(this, arguments), '.pdf');
}

function md2html() {
  return createVinylStream(resume.md2html.call(this, arguments), '.html');
}