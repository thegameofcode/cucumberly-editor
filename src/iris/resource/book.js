iris.resource(function(self) {
  'use strict';

  var Datastore = require('nedb');
  var path = require('path');
  var _ = require('lodash');
  var db = new Datastore({
    filename: path.join(require('nw.gui').App.dataPath, 'cucumberly.db'),
    autoload: true
  });

  self.CI_STATUS = {
    PENDING: 'pending',
    SUCCESS: 'success',
    ERROR: 'error',
    NONE: 'none'
  };

  //
  // Book
  //

  var book;

  self.loadBook = function(callback) {
    db.findOne({}, function(err, bookDb) {
      if (err) return callback(err);

      if (bookDb) {
        book = bookDb;
        callback(null, book);
      } else {
        console.log('Book not found, creating...');
        var defaultBook = {id: generateId(), title: '', description: '', episodes: []};
        db.insert(defaultBook, function(err, bookDb) {
          if (err) return callback(err);
          book = bookDb;
          callback(null, book);
        });
      }
    });
  };

  self.updateBook = function(data, callback) {
    book.title = data.title;
    book.description = data.description;
    saveBook(callback);
  };

  //
  // Episodes
  //

  self.createEpisode = function(data, callback) {
    var newEpisode = {
      id: generateId(), name: data.name, features: [],
      ciStatus: self.CI_STATUS.NONE, tags:['android','ios','web','desktop']
    };
    book.episodes.push(newEpisode);
    saveBook(function(err) {
      if (err) return callback(err);
      callback(null, newEpisode);
    });
  };

  self.updateEpisode = function(episodeId, data, callback) {
    getEpisode(episodeId, function(err, book, episode) {
      if (err) return callback(err);

      episode.name = data.name;

      saveBook(function(err) {
        if (err) return callback(err);
        callback(null, episode);
      });
    });
  };

  self.removeEpisode = function(episodeId, callback) {
    _.remove(book.episodes, {id: episodeId});
    saveBook(callback);
  };

  //
  // Features
  //

  self.getFeature = function(episodeId, featureId, callback) {
    self.loadBook(function(err) {
      if (err) return callback(err);

      getFeature(episodeId, featureId, function(err, book, feature) {
        if (err) return callback(err);
        callback(null, feature);
      });
    });
  };

  self.createFeature = function(episodeId, data, callback) {
    getEpisode(episodeId, function(err, book, episode) {
      if (err) return callback(err);

      var newFeature = {id: generateId(), name: data.name, description: data.description, scenarios: [], ciStatus: self.CI_STATUS.PENDING};
      episode.features.push(newFeature);

      saveBook(function(err) {
        if (err) return callback(err);
        callback(null, newFeature);
      });
    });
  };

  self.updateFeature = function(episodeId, featureId, data, callback) {
    getFeature(episodeId, featureId, function(err, book, feature) {
      if (err) return callback(err);

      feature.name = data.name;
      feature.description = data.description;

      saveBook(function(err) {
        if (err) return callback(err);
        callback(null, feature);
      });
    });
  };

  self.removeFeature = function(episodeId, featureId, callback) {
    getEpisode(episodeId, function(err, book, episode) {
      if (err) return callback(err);

      _.remove(episode.features, {id: featureId});
      saveBook(callback);
    });
  };

  //
  // Scenarios
  //

  self.createScenario = function(episodeId, featureId, data, callback) {
    getFeature(episodeId, featureId, function(err, book, feature) {
      if (err) return callback(err);

      var newScenario = {id: generateId(), name: data.name, steps: data.steps, ci: {status: self.CI_STATUS.NONE}};
      feature.scenarios.push(newScenario);
      saveBook(function(err) {
        if (err) return callback(err);
        callback(null, newScenario);
      });
    });
  };

  self.updateScenario = function(episodeId, featureId, scenarioId, data, callback) {
    getFeature(episodeId, featureId, function(err, book, feature) {
      if (err) return callback(err);

      var scenario = _.find(feature.scenarios, {id: scenarioId});
      if (!scenario) return callback(new Error('Scenario not found'));

      scenario.name = data.name;
      scenario.steps = data.steps;

      saveBook(function(err) {
        if (err) return callback(err);
        callback(null, scenario);
      });
    });
  };

  self.removeScenario = function(episodeId, featureId, scenarioId, callback) {
    getFeature(episodeId, featureId, function(err, book, feature) {
      if (err) return callback(err);

      _.remove(feature.scenarios, {id: scenarioId});
      saveBook(callback);
    });
  };

  //
  // Private
  //

  function generateId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  function getEpisode(episodeId, callback) {
    var episode = _.find(book.episodes, {id: episodeId});
    if (!episode) return callback(new Error('Episode not found'));
    callback(null, book, episode);
  }

  function getFeature(episodeId, featureId, callback) {
    getEpisode(episodeId, function(err, book, episode) {
      if (err) return callback(err);

      var feature = _.find(episode.features, {id: featureId});
      if (!feature) return callback(new Error('Feature not found'));

      callback(null, book, feature);
    });
  }

  function saveBook(callback) {
    db.update({_id: book._id}, book, function(err, numReplaced) {
      if (err) return callback(err);
      if (numReplaced !== 1) return callback(new Error('Error updating book'));

      // https://github.com/louischatriot/nedb#compacting-the-database
      //    Under the hood, NeDB's persistence uses an append-only format, meaning that all updates and deletes actually result in lines added at the end of the datafile.
      // in order to simplify the db data edition, we compact the data file after each operation
      db.persistence.compactDatafile();

      callback(null);
    });
  }

}, iris.path.resource.book.js);
