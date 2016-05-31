var fs = require('fs');
var path = require('path');
var resume = require('../lib');

resume.html2pdf().then(function (html2pdfStream) {
  var md2htmlStream = fs.createReadStream(path.resolve(__dirname, './test.md'))
    .pipe(resume.md2html({
      jsPaths: [
        path.resolve('node_modules/highlightjs/highlight.pack.js'),
        path.resolve(__dirname, './highlight.js'),
      ],
      cssPaths: [
        path.resolve('node_modules/highlightjs/styles/default.css'),
      ],
    }));

  md2htmlStream
    .pipe(fs.createWriteStream(path.resolve(__dirname, './test.html')));

  md2htmlStream
    .pipe(html2pdfStream)
    .pipe(fs.createWriteStream(path.resolve(__dirname, './test.pdf')));
}).catch(function (err) {
  console.log(err);
});
