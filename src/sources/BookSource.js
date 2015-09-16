import Nedb from 'nedb';

class BookSource {
  constructor() {
    //let pathDb = require('path').join(window.require('nw.gui').App.dataPath, 'cucumberly.db');
    this.db =  new Nedb({
      //filename: pathDb,
      filename: 'cucumberly.book',
      autoload: true
    });
  }

  fetch() {
    return new Promise((resolve, reject) => {
      this.db.findOne({}, (err, bookDb) => {
        if (err) return reject(err);

        if (bookDb) {
          this.book = bookDb;
          resolve(bookDb);

        } else {
          console.log('Book not found, creating...');
          let defaultBook = {title: '', description: '', episodes: []};
          this.db.insert(defaultBook, (err, bookDb) => {
            if (err) return reject(err);

            this.book = bookDb;
            resolve(bookDb);
          });
        }
      });
    });
  }
}

export default new BookSource();
