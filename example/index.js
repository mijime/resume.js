var fs = require('fs');
var path = require('path');
var resume = require('../lib');

var md2htmlStream = fs.createReadStream(path.resolve(__dirname, './test.md'))
  .pipe(resume.md2html({
    jsPaths: [
      path.resolve('node_modules/highlightjs/highlight.pack.js'),
      path.resolve(__dirname, './highlight.js')
    ],
    cssPaths: [
      path.resolve('node_modules/highlightjs/styles/default.css'),
      path.resolve(__dirname, '../templates/style.css')
    ]
  }));

md2htmlStream
  .pipe(fs.createWriteStream(path.resolve(__dirname, './test.html')));

md2htmlStream
  .pipe(resume.html2pdf())
  .pipe(fs.createWriteStream(path.resolve(__dirname, './test.pdf')));
