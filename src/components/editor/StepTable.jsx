import React from 'react';
import BaseComponent from '../BaseComponent';
import EditableLabel from '../ui/EditableLabel';
import { Table, Button } from 'react-bootstrap';

export default class EditableTable extends BaseComponent {
  constructor(props) {
    super(props);
    super.bindMethods('onCreateTable', 'onAddRow', 'onAddCol');

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

  render() {
    let table = this.props.table;

    if (table.length === 0) {
      return <Button onClick={this.onCreateTable}>Add table</Button>;
    }

    let [header, ...rows] = this.table;
    let headerRow = header.map(colName => <th><EditableLabel initialText={colName} /></th>);
    let bodyRows = rows.map(row => {
      let tds = row.map(rowText => <td><EditableLabel initialText={rowText} /></td>);
      return <tr>{tds}</tr>;
    });

    return (
        <div>
          <Button onClick={this.onAddCol} className='pull-right'>Add Column</Button>
          <Table striped bordered hover>
            <thead>
              <tr>{headerRow}</tr>
            </thead>
            <tbody>
              {bodyRows}
            </tbody>
          </Table>
          <Button onClick={this.onAddRow}>Add Row</Button>
        </div>
    );
  }
}
