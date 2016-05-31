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

export default async function({
  location,
  paperFormat,
  paperBorder,
  paperOrientation,
} = {}) {
  const instream = through();
  const outstream = through();

  const tmpHtmlPath = await createTemp('.html');
  const tmpPdfPath = await createTemp('.pdf');

  instream.pause();
  instream.pipe(fs.createWriteStream(tmpHtmlPath))
    .on('finish', () => {
      const writer = cp.execFile(path.resolve(phantomjs.path), [
          path.resolve(__dirname, './phantom/render.js'),
          tmpHtmlPath,
          tmpPdfPath,
          location || process.cwd(),
          paperFormat || 'A4',
          paperBorder || '2cm',
          paperOrientation || 'portrait',
      ], err => {
        if (err) {
          outstream.emit('error', err);
          return;
        }
        fs.createReadStream(tmpPdfPath).pipe(outstream);
      });

      writer.stdout.pipe(process.stdout);
      writer.stderr.pipe(process.stderr);
    });
  instream.resume();
  return duplexer(instream, outstream);
}
