iris.ui(function (self) {
	"use strict";

	self.create = function() {
		self.tmpl(iris.path.ui.tableEditor.html);

		self.get('btnAddTable').on('click', onAddTable);
		self.get('btnAddRow').click(addRow);
		self.get('btnAddColumn').click(addCol);
	};

	function addRow() {
		self.get('tableBody').append(self.get('tableBody').find("tr:last").clone());
	}

	function addCol() {
		self.get('tableHead').append($('<td><span contenteditable="true">Column name</span></td>'));
		self.get('tableBody').find('tr').each(function(){
			$(this).append($('<td><span contenteditable="true">Value</span></td>'))
		});
	}

	function onAddTable() {
		self.get('btnAddTable').hide();
		self.get('tableEditor').removeClass('hidden');
	}

}, iris.path.ui.tableEditor.js);
