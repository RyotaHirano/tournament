import React, { Component } from 'react';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import selectLevel from '../lib/select-level';

import { teams } from '../conf/conf';

export default class CountryTable extends Component {

  constructor(props) {
    super(props);
    this.onClickTableRow = this.onClickTableRow.bind(this);
    this._onRowSelection = this.onRowClickSelection.bind(this);
  }

  render() {
    return (
      <Table
        fixedHeader={this.props.tableData.fixedHeader}
        fixedFooter={this.props.tableData.fixedFooter}
        selectable={this.props.tableData.selectable}
        multiSelectable={this.props.tableData.multiSelectable}
        onCellClick={this.onClickTableRow}
        onRowSelection={this._onRowSelection}
        >
        <TableHeader enableSelectAll={this.props.tableData.enableSelectAll} >
          <TableRow>
            <TableHeaderColumn colSpan="4" tooltip="Select Team" style={{ textAlign: 'center' }} >
              Select Your Team
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip="Rank" style={{ textAlign: 'center' }} >Rank</TableHeaderColumn>
            <TableHeaderColumn tooltip="Level" style={{ textAlign: 'center' }} >Level</TableHeaderColumn>
            <TableHeaderColumn tooltip="Country" style={{ textAlign: 'center' }} >Country</TableHeaderColumn>
            <TableHeaderColumn tooltip="Player" style={{ textAlign: 'center' }} >Player</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={this.props.tableData.deselectOnClickaway}
          showRowHover={this.props.tableData.showRowHover}
          stripedRows={this.props.tableData.stripedRows} >
          {teams.map((country, rank) =>
            <TableRow
              key={Date.now() * Math.random() + rank}
              selected={this.props.selectedCountry[rank + 1].selected}
              className={`country-table-row-${selectLevel(rank + 1)}`}
              >
              <TableRowColumn style={{ textAlign: 'center' }} >{rank + 1}</TableRowColumn>
              <TableRowColumn style={{ textAlign: 'center' }} >{selectLevel(rank + 1)}</TableRowColumn>
              <TableRowColumn style={{ textAlign: 'center' }} >{country}</TableRowColumn>
              <TableRowColumn style={{ textAlign: 'center' }} >{this.props.selectedCountry[rank + 1].player}</TableRowColumn>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableRowColumn style={{ textAlign: 'center' }}>Rank</TableRowColumn>
            <TableRowColumn style={{ textAlign: 'center' }}>Level</TableRowColumn>
            <TableRowColumn style={{ textAlign: 'center' }}>Country</TableRowColumn>
            <TableRowColumn style={{ textAlign: 'center' }}>Player</TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }

  onClickTableRow(rowNumber) {
    const targetRank = rowNumber + 1;
    this.props.onClickTableRow(targetRank);
  }
  onRowClickSelection(selectedRows) {
    this.props.onClickAddRowSelection(selectedRows);
  }
}
