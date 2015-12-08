import React from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

export default function CountryTableRow(props) {
  const myRank = props.rank + 1;
  const level = Math.ceil(myRank / 10);

  return (
    <TableRow>
      <TableRowColumn style={{ textAlign: 'center' }} >{myRank}</TableRowColumn>
      <TableRowColumn style={{ textAlign: 'center' }} >{level}</TableRowColumn>
      <TableRowColumn style={{ textAlign: 'center' }} >{props.country}</TableRowColumn>
    </TableRow>
  );
}
