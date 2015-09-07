iris.ui(function(self) {
  'use strict';

  self.events('change');

  self.settings({
    defaultText: '<value>',
    class: '',
    text: ''
  });

  self.create = function() {
    self.tmpl(iris.path.ui.editableLabel.html);

    self.get().
      on('blur', onBlur).
      on('mouseup', onMouseUp).
      on('keypress', onKeyPress).
      addClass(self.setting('class'));

    self.text(self.setting('text'));
  };

  self.text = function(text) {
    if (text !== undefined) {
      self.get().text(text);
      checkDefaultText();
    } else {
      return self.get().text();
    }

    return self;
  };

  function onKeyPress(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.blur();
    }
  }

  function onBlur() {
    self.get().val($.trim(self.get().val()));
    checkDefaultText();
    self.notify('change');
  }

  function checkDefaultText() {
    var defaultVal = self.get().text() === '' || self.get().text() === self.setting('defaultText');
    if (defaultVal) {
      self.get().text(self.setting('defaultText'));
    }

    self.get().toggleClass('defaultVal', defaultVal);
  }

  function onMouseUp(e) {
    document.execCommand('selectAll', false, null);
  }

}, iris.path.ui.editableLabel.js);
