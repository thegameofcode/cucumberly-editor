import Nedb from 'nedb';
import shortid from 'shortid';

class BookSource {
  constructor() {
    // TODO nw.js: set execution context to node app instead of web?
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
          resolve(bookDb);

        } else {
          console.log('Book not found, creating...');
          let defaultBook = {title: '', description: '', episodes: []};
          this.db.insert(defaultBook, (err, bookDb) => {
            if (err) return reject(err);
            resolve(bookDb);
          });
        }
      });
    });
  }

  saveFeature(episodeId, featureId, episodeData) {
    return this.fetch()
      .then((book) => {
        let episode = book.episodes.filter((episode) => episode.id === episodeId)[0];
        if (!episode) return reject(new Error('Episode not found'));

        let feature = episode.features.filter((feature) => feature.id === featureId)[0];
        if (!feature) return reject(new Error('Feature not found'));

        feature.name = episodeData.name;
        feature.description = episodeData.description;

        return this.saveBook(book);
      });
  }

  saveBook(book) {
    return new Promise((resolve, reject) => {
      this.db.update({_id: book._id}, book, (err, numReplaced) => {
        if (err) return reject(err);
        if (numReplaced !== 1) return reject(new Error('Error updating book'));

        // https://github.com/louischatriot/nedb#compacting-the-database
        //    Under the hood, NeDB's persistence uses an append-only format, meaning that all updates and deletes actually result in lines added at the end of the datafile.
        // in order to simplify the db data edition, we compact the data file after each operation
        this.db.persistence.compactDatafile();

        resolve(book);
      });
    });
  }

  createEpisode() {
    return this.fetch()
        .then((book) => {
          let newEpisode = {
            id: shortid.generate(), name: 'Episode name', features: [], tags:[]
          };
          book.episodes.push(newEpisode);
          return this.saveBook(book);
        });
  }

  createFeature(episodeId) {
    return this.fetch()
        .then((book) => {
          let episode = book.episodes.filter(episode => episode.id === episodeId)[0];
          if (!episode) return Promise.reject(new Error('Episode not found'));

          let newFeature = {id: shortid.generate(), name: 'Feature name', description: {motivation: '', beneficiary: '', expectedBehaviour: ''}, scenarios: []};
          episode.features.push(newFeature);

          return this.saveBook(book);
        });
  }

  createScenario(episodeId, featureId) {
    return this.fetch()
        .then((book) => {
          let episode = book.episodes.filter(episode => episode.id === episodeId)[0];
          if (!episode) return Promise.reject(new Error('Episode not found'));

          let feature = episode.features.filter(feature => feature.id === featureId)[0];
          if (!feature) return Promise.reject(new Error('Feature not found'));

          let newScenario = {
            id: shortid.generate(),
            name: 'scenario name',
            steps: {
              given: [{value:'',table:[]}],
              when: [{value:'',table:[]}],
              then: [{value:'',table:[]}]
            }
          };
          feature.scenarios.push(newScenario);

          return this.saveBook(book);
        });
  }

  createStep(episodeId, featureId, scenarioId, stepCode) {
    return this.fetch()
        .then((book) => {
          let episode = book.episodes.filter(episode => episode.id === episodeId)[0];
          if (!episode) return Promise.reject(new Error('Episode not found'));

          let feature = episode.features.filter(feature => feature.id === featureId)[0];
          if (!feature) return Promise.reject(new Error('Feature not found'));

          let scenario = feature.scenarios.filter(scenario => scenario.id === scenarioId)[0];
          if (!scenario) return Promise.reject(new Error('Scenario not found'));

          let newStep = { value: '', table: [] };
          scenario.steps[stepCode].push(newStep);

          return this.saveBook(book);
        });
  }

  saveStep(episodeId, featureId, scenarioId, stepCode, stepIdx, data) {
    return this.fetch()
        .then((book) => {
          let episode = book.episodes.filter(episode => episode.id === episodeId)[0];
          if (!episode) return Promise.reject(new Error('Episode not found'));

          let feature = episode.features.filter(feature => feature.id === featureId)[0];
          if (!feature) return Promise.reject(new Error('Feature not found'));

          let scenario = feature.scenarios.filter(scenario => scenario.id === scenarioId)[0];
          if (!scenario) return Promise.reject(new Error('Scenario not found'));

          scenario.steps[stepCode][stepIdx] = data;

          return this.saveBook(book);
        });
  }

  saveScenario(episodeId, featureId, scenarioId, data) {
    return this.fetch()
        .then((book) => {
          let episode = book.episodes.filter(episode => episode.id === episodeId)[0];
          if (!episode) return Promise.reject(new Error('Episode not found'));

          let feature = episode.features.filter(feature => feature.id === featureId)[0];
          if (!feature) return Promise.reject(new Error('Feature not found'));

          let scenario = feature.scenarios.filter(scenario => scenario.id === scenarioId)[0];
          if (!scenario) return Promise.reject(new Error('Scenario not found'));

          scenario.name = data.name;

          return this.saveBook(book);
        });
  }

  removeEpisode(episodeId) {
    return this.fetch()
        .then((book) => {
          book.episodes = book.episodes.filter(episode => episode.id !== episodeId);
          return this.saveBook(book);
        });
  }

  saveEpisode(episode) {
    return this.fetch()
        .then((book) => {
          let episodeDb = book.episodes.filter(episodeDb => episodeDb.id === episode.id)[0];
          if (!episodeDb) return Promise.reject(new Error('Episode not found'));
          episodeDb.name = episode.name;
          return this.saveBook(book);
        });
  }

  removeFeature(episodeId, featureId) {
    return this.fetch()
        .then((book) => {
          let episodeDb = book.episodes.filter(episodeDb => episodeDb.id === episodeId)[0];
          if (!episodeDb) return Promise.reject(new Error('Episode not found'));
          episodeDb.features = episodeDb.features.filter(feature => feature.id !== featureId);
          return this.saveBook(book);
        });
  }

  removeScenario(episodeId, featureId, scenarioId) {
    return this.fetch()
        .then((book) => {
          let episode = book.episodes.filter(episode => episode.id === episodeId)[0];
          if (!episode) return Promise.reject(new Error('Episode not found'));

          let feature = episode.features.filter(feature => feature.id === featureId)[0];
          if (!feature) return Promise.reject(new Error('Feature not found'));

          feature.scenarios = feature.scenarios.filter(scenario => scenario.id !== scenarioId);
          return this.saveBook(book);
        });
  }

  /*
  TODO
   updateBook(data, callback) {
   this.book.title = data.title;
   this.book.description = data.description;
   this._saveBook(callback);
   }
   removeFeature(episodeId, featureId, callback) {
   this._getEpisode(episodeId, (err, episode) => {
   if (err) return callback(err);

   _.remove(episode.features, {id: featureId});
   this._saveBook(callback);
   });
   }
   removeScenario(episodeId, featureId, scenarioId, callback) {
   this.getFeature(episodeId, featureId, (err, feature) => {
   if (err) return callback(err);

   _.remove(feature.scenarios, {id: scenarioId});
   this._saveBook(callback);
   });
   }
  */
}

export default new BookSource();
