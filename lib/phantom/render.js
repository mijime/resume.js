'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _system = require('system');

var _system2 = _interopRequireDefault(_system);

var _webpage = require('webpage');

var _webpage2 = _interopRequireDefault(_webpage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
  (function () {
    var page = _webpage2.default.create();
    page.onConsoleMessage = function (msg) {
      return console.log('phantom::console', msg);
    };
    page.onError = function (msg) {
      return console.log('phantom::error', msg);
    };
    page.onResourceError = function (err) {
      console.log('Unable to load resource #' + err.id + ' (URL: ' + err.url + ')');
      console.log('Error code: ' + err.errorCode + '. Description: ' + err.errorString);
    };

    var args = ['input', 'output', 'location', 'paperFormat', 'paperBorder', 'paperOrientation', 'renderDelay'].reduce(function (args, name, i) {
      args[name] = _system2.default.args[i + 1];
      return args;
    }, {});

    var content = _fs2.default.read(args.input);
    page.setContent(content, args.location);
    page.paperSize = {
      format: args.paperFormat,
      border: args.paperBorder,
      orientation: args.paperOrientation
    };

    page.onLoadFinished = function () {
      function render() {
        page.render(args.output);
        page.close();
        phantom.exit();
      }

      if (args.renderDelay > 0) {
        setTimeout(render, args.renderDelay);
      } else {
        render();
      }
    };
  })();
} catch (err) {
  console.log('phantom::main::error', err);
  phantom.exit(2);
}