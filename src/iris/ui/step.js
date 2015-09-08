iris.ui(function(self) {
  'use strict';

  self.events('newStep', 'stepChange');

  self.settings({
    label: '',
    stepName: '',
    step: null
  });

  self.create = function() {
    self.tmpl(iris.path.ui.step.html);

    var step = self.setting('step');
    if (!step) {
      step = {value: '', table: null, ci: {status: 'none'}};
    }

    self.get('input').val(step.value).on('keyup', onKeyUp).on('blur', onBlur).on('change', onChange);
    self.get('label').text(self.setting('label'));

    self.ui('uiTableEditor', iris.path.ui.tableEditor.js).on('change', onChange);

    var table = step.table;
    if (table && table.length > 1) {
      self.ui('uiTableEditor').setTableData(step.table).get().toggleClass('hidden', false);
      self.get('btnAddTable').toggleClass('hidden', true);
      self.get('btnRemoveTable').toggleClass('hidden', false);
    }

    self.get().find('[data-toggle="tooltip"]').tooltip();
    self.get('btnAddTable').on('click', onAddTable);
    self.get('btnRemoveTable').on('click', onRemoveTable);
  };

  self.data = function() {
    var table = self.ui('uiTableEditor').getTableData();

    var step = {
      stepName: self.setting('stepName'),
      value: {
        value: self.get('input').val()
      }
    };

    if (table) {
      step.value.table = table;
    }

    return step;
  };

  self.focus = function() {
    self.get('input').focus();
    return self;
  };

  function onKeyUp(e) {
    if (e.keyCode === 13 && self.get('input').val() !== '') {
      self.notify('newStep', self);
    }
  }

  function onBlur() {
    if (self.get('label').text() === 'And' && self.get('input').val() === '') {
      self.destroyUI();
    }
  }

  function onChange() {
    self.notify('stepChange', self);
  }

  function onAddTable() {
    self.get('btnAddTable').toggleClass('hidden', true);
    self.get('btnRemoveTable').toggleClass('hidden', false);
    self.ui('uiTableEditor').init().get().toggleClass('hidden', false);
  }

  function onRemoveTable() {
    self.get('btnAddTable').toggleClass('hidden', false);
    self.get('btnRemoveTable').toggleClass('hidden', true);
    self.ui('uiTableEditor').clear().get().toggleClass('hidden', true);
    onChange();
  }

}, iris.path.ui.step.js);
