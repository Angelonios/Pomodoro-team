import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

export function StatisticsTable({classes,
                                rowsPerPage,
                                rows,
                                page,
                                emptyRows,
                                setRowsPerPage,
                                handleChangePage,
                                TablePaginationActions}) {


  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;

  function ISO8601_week_no(dt)
  {
    const tdt = new Date(dt.valueOf());
    const dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    const firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4)
    {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
  }

  function formatTime(seconds){
    const hours = Math.floor(seconds / SECONDS_IN_HOUR);
    const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);

    const hour_text = (hours === 1) ? hours + " hour " : (hours < 1) ? "" : hours + " hours ";
    const minute_text = (minutes === 1) ? minutes + " minute " : (minutes < 1) ? "" : minutes + " minutes ";
    const result = (hour_text.length === 0 && minute_text.length === 0) ? "less than a minute" :  hour_text + minute_text;

    return result;
  }

  // const distinctBy = (prop, arr) => [...new Set(arr.map(o => o[prop]))];
  // const distinct_weeks = distinctBy('week_no', rows);
  const max_week_no = ISO8601_week_no(new Date());
  const current_rows = rows.filter(r => r.week_no === (max_week_no - page));

  return (
    <TableContainer component={Paper}>

      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {rows.filter(r => r.week_no === (max_week_no - page))
            .map((row) => (
            <TableRow key={row.finished_at}>
              <TableCell component="th" scope="row">
                {row.finished_at}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {formatTime(row.duration)}
              </TableCell>
            </TableRow>
          ))}

          {/*{emptyRows > 0 && (*/}
          {/*  <TableRow style={{ height: 53 * emptyRows }}>*/}
          {/*    <TableCell colSpan={6} />*/}
          {/*  </TableRow>*/}
          {/*)}*/}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              labelDisplayedRows={() => {''}}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              rowsPerPageOptions={[]}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
