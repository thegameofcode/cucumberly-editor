iris.screen(function(self) {

  var bookResource = iris.resource(iris.path.resource.book.js);
  var bookManager = require('./manager/book');

  self.create = function() {
    self.tmpl(iris.path.screen.welcome.html);

    self.ui('episodeMenu', iris.path.ui.episodeMenu.js);

    self.screens('screens', [
      ['episode/:episodeId/feature/:featureId', iris.path.screen.feature.js]
    ]);

    self.ui('bookTitle', iris.path.ui.editableLabel.js, {defaultText: 'Book Name'}).on('change', onBookChange);
    self.ui('bookDes', iris.path.ui.editableLabel.js, {defaultText: 'Book Description'}).on('change', onBookChange);

    bookResource.loadBook(onLoadBook);

    self.get('dirChooser').on('change', onDirSelected);
    self.get('btnSaveChanges').on('click', onSaveChanges);
  };

  function onLoadBook(err, book) {
    if (err) return alert('Error loading book data');
    self.ui('bookTitle').text(book.title);
    self.ui('bookDes').text(book.description);
    self.ui('episodeMenu').setEpisodes(book.episodes);
  }

  function onBookChange() {
    bookResource.updateBook({
      title: self.ui('bookTitle').text(),
      description: self.ui('bookDes').text()
    }, function(err) {
      if (err) return alert('Error updating book data');
      iris.log('Book updated');
    });
  }

  function onSaveChanges() {
    self.get('dirChooser').trigger('click');
  }

  function onDirSelected() {
    $('#saveVersionModal').modal('hide');
    var dirPath = this.value;
    bookManager.saveBook(dirPath);
  }

}, iris.path.screen.welcome.js);
