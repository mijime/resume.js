import fs from 'fs';
import system from 'system';
import webpage from 'webpage';

try {
  const page = webpage.create();
  page.onConsoleMessage = msg => console.log('phantom::console', msg);
  page.onError = msg => console.log('phantom::error', msg);
  page.onResourceError = err => {
    console.log(`Unable to load resource #${err.id} (URL: ${err.url})`);
    console.log(`Error code: ${err.errorCode}. Description: ${err.errorString}`);
  };

  const args = [
    'input',
    'output',
    'location',
    'paperFormat',
    'paperOrientation',
    'paperBorder',
    'renderDelay'
  ].reduce((args, name, i) => {
    args[name] = system.args[i + 1];
    return args;
  }, {});

  const content = fs.read(args.input);
  page.setContent(content, args.location);
  page.paperSize = {
    format: args.paperFormat,
    border: args.paperBorder,
    orientation: args.paperOrientation
  };

  page.onLoadFinished = () => {
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
} catch (err) {
  console.log('phantom::main::error', err);
  phantom.exit(2);
}
