import alt from '../alt';
import BookSource from '../sources/BookSource';

class BookActions {

  updateBook(book) {
    this.dispatch(book);
  }

  fetchBook() {
    this.dispatch();
    BookSource.fetch()
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  bookFailed(err) {
    this.dispatch(err);
  }

  saveFeature(episodeId, featureId, data) {
    this.dispatch();
    BookSource.saveFeature(episodeId, featureId, data)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  createEpisode() {
    this.dispatch();
    BookSource.createEpisode()
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  createFeature(episodeId) {
    this.dispatch();
    BookSource.createFeature(episodeId)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  createScenario(episodeId, featureId) {
    this.dispatch();
    BookSource.createScenario(episodeId, featureId)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  createStep(episodeId, featureId, scenarioId, stepCode) {
    this.dispatch();
    BookSource.createStep(episodeId, featureId, scenarioId, stepCode)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  saveStep(episodeId, featureId, scenarioId, stepCode, stepIdx, newValue) {
    this.dispatch();
    BookSource.saveStep(episodeId, featureId, scenarioId, stepCode, stepIdx, newValue)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  saveScenario(episodeId, featureId, scenarioId, data) {
    this.dispatch();
    BookSource.saveScenario(episodeId, featureId, scenarioId, data)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

}

export default alt.createActions(BookActions);
