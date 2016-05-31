export default class Promisify {
  constructor(context) {
    this.context = context;
  }

  node(func) {
    return (...args) => new Promise((resolve, reject) => {
      this.context[func].apply(this.context, args.concat([(err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      }]));
    });
  }
}
