import cp from 'child_process';
import fs from 'fs';
import path from 'path';

import tmp from 'tmp';
import duplexer from 'duplexer';
import phantomjs from 'phantomjs-prebuilt';
import through from 'through2';

function createTemp(postfix) {
  return new Promise((resolve, reject) => {
    tmp.file({postfix}, (err, path, fd) => {
      if (err) {
        return reject(err);
      }

      fs.close(fd);
      return resolve(path);
    });
  });
}

export default async function ({
  location,
  paperFormat,
  paperBorder,
  paperOrientation
} = {}) {
  const instream = through();
  const outstream = through();

  instream.pause();
  const tmpHtmlPath$ = createTemp('.html');
  const tmpPdfPath$ = createTemp('.pdf');
  instream.pipe(fs.createWriteStream(await tmpHtmlPath$))
    .on('finish', async () => {
      const writer = cp.execFile(path.resolve(phantomjs.path), [
        path.resolve(__dirname, './phantom/render.js'),
        await tmpHtmlPath$,
        await tmpPdfPath$,
        location || process.cwd(),
        paperFormat || 'A4',
        paperBorder || '2cm',
        paperOrientation || 'portrait'
      ], async err => {
        if (err) {
          outstream.emit('error', err);
          return;
        }
        fs.createReadStream(await tmpPdfPath$).pipe(outstream);
      });
      writer.stdout.pipe(process.stdout);
      writer.stderr.pipe(process.stderr);
    });
  instream.resume();
  return duplexer(instream, outstream);
}
