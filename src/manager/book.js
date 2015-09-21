const mkdirp = require('mkdirp');
const fs = require('fs');
const nunjucks = require('nunjucks');
const featureTemplate = require('./feature-tpl');

function saveBook(dirPath, bookData) {
  bookData.episodes.forEach(function(episode) {
    const episodeDirectory = dirPath + '/' + episode.name;
    mkdirp(episodeDirectory, function( /* err */) {
      // TODO err
      episode.features.forEach(function(feature) {

        nunjucks.configure({ autoescape: false });
        const featureRenderedData = nunjucks.renderString(featureTemplate, feature, {autoescape: false});

        fs.writeFile(episodeDirectory + '/' + feature.name + '.feature', featureRenderedData, function( /* err */) {

        });
      });
    });
  });
}
module.exports = {
  saveBook: saveBook
};
