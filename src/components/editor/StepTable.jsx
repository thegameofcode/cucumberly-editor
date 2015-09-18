import React from 'react';
import BaseComponent from '../BaseComponent';
import EditableLabel from '../ui/EditableLabel';
import { Table, Button, Glyphicon, Panel, Well } from 'react-bootstrap';

export default class StepTable extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('onCreateTable', 'onAddRow', 'onAddCol', 'onRowChange', 'onRemoveTable');

    this.table = props.table;
  }

  getValue() {
    return this.table;
  }

  onCreateTable() {
    this.table = [['Column name'], ['Row text']];
    this.props.onTableChange();
  }

  onAddCol() {
    let [header, ...rows] = this.table;
    header.push('New column');
    this.table = [header, ...rows.map(row => {
      row.push('New column value');
      return row;
    })];
    this.props.onTableChange();
  }

  onAddRow() {
    let [head] = this.table;
    this.table.push(head.map(colName => `${colName} value`));
    this.props.onTableChange();
  }

  onRowChange(rowIdx, colIdx, text) {
    this.table[rowIdx][colIdx] = text;
    this.props.onTableChange();
  }

  onRemoveCol(colIdx) {
    this.table = this.table.map(row => {
      row.splice(colIdx, 1);
      return row;
    });
    this.props.onTableChange();
  }

  onRemoveRow(rowIdx) {
    this.table.splice(rowIdx, 1);
    this.props.onTableChange();
  }

  onRemoveTable() {
    this.table = [];
    this.props.onTableChange();
  }

  render() {
    let table = this.props.table;

    if (table.length === 0) {
      return (
          <Well bsSize='small'>
            <Button onClick={this.onCreateTable}>Add table</Button>
          </Well>
      );
    }

    let [header, ...rows] = this.table;
    let headerRow = header.map((colName, colIdx) => (
        <th key={`head_${colIdx}`}>
          <EditableLabel initialText={colName} onChange={(text) => this.onRowChange(0, colIdx, text)} />
          <Button bsSize='xsmall' bsStyle='link' className='pull-right' onClick={() => this.onRemoveCol(colIdx)}><Glyphicon glyph='remove' /></Button>
        </th>
    ));

    let bodyRows = rows.map((row, rowIdx) => {
      rowIdx++; // sum the header row
      let tds = row.map((rowText, colIdx) => <td key={`cell_${rowIdx}_${colIdx}`}><EditableLabel initialText={rowText} onChange={(text) => this.onRowChange(rowIdx, colIdx, text)} /></td>);
      return (
          <tr key={`row_${rowIdx}`}>
            {tds}
            <td className='text-center'>
              <Button bsSize='xsmall' bsStyle='link' onClick={() => this.onRemoveRow(rowIdx)}><Glyphicon glyph='remove' /></Button>
            </td>
          </tr>
      );
    });

    return (
      <Panel header={<Button bsSize='small' onClick={this.onRemoveTable}>Remove table</Button>}>
        <Table striped bordered hover>
          <thead>
            <tr>
              {headerRow}
              <td style={{width: '100px'}}><Button onClick={this.onAddCol} className='pull-right'>Add Column</Button></td>
            </tr>
          </thead>
          <tbody>
            {bodyRows}
          </tbody>
        </Table>
        <Button onClick={this.onAddRow}>Add Row</Button>
      </Panel>
    );
  }
}
