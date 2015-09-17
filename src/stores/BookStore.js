import BookActions from '../actions/BookActions';
import alt from '../alt';

class BookStore {
  constructor() {
    this.book = {};
    this.err = null;

    this.bindListeners({
      handleUpdateBook: BookActions.UPDATE_BOOK,
      handleBookFailed: BookActions.BOOK_FAILED
    });
  }

  handleUpdateBook(book) {
    this.book = book;
    this.err = null;
  }

  handleBookFailed(err) {
    this.err = err;
  }
}

export default alt.createStore(BookStore, 'BookStore');
