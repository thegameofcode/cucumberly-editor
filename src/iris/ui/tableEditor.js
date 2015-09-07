iris.ui(function (self) {
	"use strict";

	self.events('change');

	var numCols = 0;

	self.create = function() {
		self.tmpl(iris.path.ui.tableEditor.html);

		self.get('btnAddRow').click(onBtnAddRow);
		self.get('btnAddColumn').click(onBtnAddCol);
	};

	self.init = function() {
		addCol();
		addRow();

		return self;
	};

	function onBtnAddRow() {
		addRow();
	}

	function onBtnAddCol() {
		addCol();

		self.get('tableBody').find('tr').each(function() {
			addEditableCell('Row value', this);
		});
	}

	function addRow(text) {
		var $tr = $('<tr>');
		self.get('tableBody').append($tr);
		for (var i = 0; i < numCols; i++) {
			var params = ['Row value', $tr];

			if (text) {
				params.push(text[i]);
			}

			addEditableCell.apply(this, params);
		}
	}

	function addCol(text) {
		numCols++;
		addEditableCell('Column name', self.get('tableHead').find('tr'), text);
	}

	function addEditableCell(defaultText, parent, text) {
		var rowId = 'row_' + cucumberly.util.randomId();
		var $container = $('<td><div data-id="' + rowId + '"></div></td>');
		$container.appendTo(parent);

		var editableText = self.ui(rowId, iris.path.ui.editableLabel.js, {defaultText: defaultText});

		if (text) {
			editableText.text(text);
		}

		editableText.on('change', onCellChange);
	}

	function onCellChange() {
		self.notify('change');
	}

	self.getTableData = function() {
		if (numCols === 0) return undefined;
		var data = [].concat(getCellValues('tableHead')).concat(getCellValues('tableBody'));
		return data;
	};

	self.setTableData = function(data) {
		if (!data || data.length < 2) return;

		var i;
		var header = data[0];
		for (i = 0; i < header.length; i++) {
			addCol(header[i]);
		}

		for (i = 1; i < data.length; i++) {
			addRow(data[i]);
		}

		return self;
	};

	function getCellValues(dataId) {
		var values = [];

		self.get(dataId).find('tr').each(function(idx, tr) {
			var row = [];
			$(tr).find('td span').each(function(idx, span) {
				row.push($(span).text());
			});
			values.push(row);
		});

		return values;
	}

}, iris.path.ui.tableEditor.js);
