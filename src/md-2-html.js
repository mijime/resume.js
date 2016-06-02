import fs from 'fs';
import path from 'path';

import through from 'through2';
import marked from 'marked';
import mustache from 'mustache';
import Promisify from './promisify';

const fsp = new Promisify(fs);
const defaultTmpl = path.resolve(__dirname, '../templates/index.html');
const defaultCss = path.resolve(__dirname, '../templates/style.css');

export default function ({templatePath, cssPaths, jsPaths} = {}) {
  const template$ = fsp.node('readFile')(templatePath || defaultTmpl, 'utf8');
  const styles$ = Promise.all((cssPaths || [defaultCss]).map(async cssPath => {
    const content = await fsp.node('readFile')(cssPath, 'utf8');
    return {content};
  }));
  const scripts$ = Promise.all((jsPaths || []).map(async jsPath => {
    const content = await fsp.node('readFile')(jsPath, 'utf8');
    return {content};
  }));

  const markdown = [];
  const stream = through((buf, enc, done) => {
    markdown.push(buf);
    done();
  }, async function (done) {
    const content = marked(markdown.join(''));
    const html = mustache.render(await template$, {
      content,
      styles: await styles$,
      scripts: await scripts$
    });

    this.push(html);
    done();
  });
  return stream;
}
