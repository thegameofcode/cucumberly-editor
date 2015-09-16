import alt from '../alt';
import BookSource from '../sources/BookSource';

class BookActions {

  updateBook(book) {
    this.dispatch(book);
  }

  fetchBook() {
    this.dispatch();
    BookSource.fetch()
        .then((book) => {
          this.actions.updateBook(book);
        })
        .catch((err) => {
          this.actions.bookFailed(err);
        });
  }

  bookFailed(err) {
    this.dispatch(err);
  }

}

export default alt.createActions(BookActions);
