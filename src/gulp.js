import BufferList from 'bl';
import {obj} from 'through2';
import replaceExt from 'replace-ext';
import * as resume from '.';

function createVinylStream(stream, extname) {
  return obj(function transform(file, enc, done) {
    if (file.isNull()) {
      this.push(file);
      return done();
    }

    (file.isBuffer() ? file : file.contents)
      .pipe(stream)
      .pipe(new BufferList((err, data) => {
        if (err) {
          return done(err);
        }

        const newFile = file.clone();
        newFile.contents = data;
        newFile.path = replaceExt(file.path, extname);
        this.push(newFile);
        return done();
      }));
  });
}

export function html2pdf() {
  return createVinylStream(resume.html2pdf.apply(this, arguments), '.pdf');
}

export function md2html() {
  return createVinylStream(resume.md2html.apply(this, arguments), '.html');
}
