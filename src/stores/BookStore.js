import BookActions from '../actions/BookActions';
import alt from '../alt';

class BookStore {
  constructor() {
    this.book = {};
    this.err = null;

    this.bindListeners({
      handleUpdateBook: BookActions.UPDATE_BOOK,
      handleFetchBook: BookActions.FETCH_BOOK,
      handleBookFailed: BookActions.BOOK_FAILED
    });
  }

  handleUpdateBook(book) {
    this.book = book;
    // optionally return false to suppress the store change event
    this.err = null;
  }

  handleFetchBook() {
    this.book = {name: '', description: '', episodes: []};
  }

  handleBookFailed(err) {
    this.err = err;
  }
}

export default alt.createStore(BookStore, 'BookStore');
