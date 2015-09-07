iris.ui(function(self) {
  'use strict';

  self.events('newStep', 'stepChange');

  self.settings({
    label: 'label',
    value: '',
    table: null,
    stepName: ''
  });

  self.create = function() {
    self.tmpl(iris.path.ui.step.html);

    self.get('input').val(self.setting('value')).on('keyup', onKeyUp).on('blur', onBlur).on('change', onChange);
    self.get('label').text(self.setting('label'));

    self.ui('uiTableEditor', iris.path.ui.tableEditor.js).on('change', onChange);

    var table = self.setting('table');
    if (table && table.length > 1) {
      self.get('btnAddTable').hide();
      self.ui('uiTableEditor').setTableData(self.setting('table'));
      self.ui('uiTableEditor').get().removeClass('hidden');
    }

    self.get().find('[data-toggle="tooltip"]').tooltip();
    self.get('btnAddTable').on('click', onAddTable);
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
    self.get('btnAddTable').hide();
    self.ui('uiTableEditor').init().get().removeClass('hidden');
  }

}, iris.path.ui.step.js);
