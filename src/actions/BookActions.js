import alt from '../alt';
import BookSource from '../sources/BookSource';

class BookActions {

  updateBook(book) {
    this.dispatch(book);
  }

  bookFailed(err) {
    this.dispatch(err);
  }

  fetchBook() {
    BookSource.fetch()
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  saveFeature(episodeId, featureId, data) {
    BookSource.saveFeature(episodeId, featureId, data)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  createEpisode() {
    BookSource.createEpisode()
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  createFeature(episodeId) {
    BookSource.createFeature(episodeId)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  createScenario(episodeId, featureId) {
    BookSource.createScenario(episodeId, featureId)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  createStep(episodeId, featureId, scenarioId, stepCode) {
    BookSource.createStep(episodeId, featureId, scenarioId, stepCode)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  saveStep(episodeId, featureId, scenarioId, stepCode, stepIdx, newValue) {
    BookSource.saveStep(episodeId, featureId, scenarioId, stepCode, stepIdx, newValue)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  saveScenario(episodeId, featureId, scenarioId, data) {
    BookSource.saveScenario(episodeId, featureId, scenarioId, data)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  removeEpisode(episodeId) {
    BookSource.removeEpisode(episodeId)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  saveEpisode(episode) {
    BookSource.saveEpisode(episode)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  removeFeature(episodeId, featureId) {
    BookSource.removeFeature(episodeId, featureId)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

  removeScenario(episodeId, featureId, scenarioId) {
    BookSource.removeScenario(episodeId, featureId, scenarioId)
        .then(book => this.actions.updateBook(book))
        .catch(this.actions.bookFailed);
  }

}

export default alt.createActions(BookActions);
