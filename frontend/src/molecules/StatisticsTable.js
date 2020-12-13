import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { GetWeekNumberFromDate } from '../utils/DateHelper';
import { Box, Container, Grid, Typography } from '@material-ui/core';

export function StatisticsTable({
                                  classes,
                                  rowsPerPage,
                                  pages,
                                  currentPage,
                                  handleChangePage,
                                  TablePaginationActions,
                                }) {

  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;

  function formatTime(seconds) {
    if(seconds === 0){
      return 'no work done'
    }
    const hours = Math.floor(seconds / SECONDS_IN_HOUR);
    const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);

    const hour_text = (hours === 1) ? hours + ' hour ' : (hours < 1) ? '' : hours + ' hours ';
    const minute_text = (minutes === 1) ? minutes + ' minute ' : (minutes < 1) ? '' : minutes + ' minutes ';
    const result = (hour_text.length === 0 && minute_text.length === 0) ? 'less than a minute' : hour_text + minute_text;

    return result;
  }

  const week = (pages.length !== 0)
    ? pages[currentPage].sort((d1, d2) => d1 > d2 ? 1 : -1)
    : [];
  const weekNumber = GetWeekNumberFromDate((pages.length !== 0) ? week[0].date : new Date());


  return (
    <Container component="main">
      <Paper elevation={3}>
        <Box p={3}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography align={'center'} variant={'h3'}>
              Week {weekNumber}.
            </Typography>
          </Grid>
          <TableContainer component={Paper}>

            <Table className={classes.table} aria-label="custom pagination table">
              <TableBody>
                {(pages.length !== 0) ?
                  week.map(day => (
                  <TableRow key={day.date.toLocaleString('en-us', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                  })}>

                    <TableCell component="th" scope="row">
                      {day.date.toLocaleString('en-us', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long',
                      })}
                    </TableCell>

                    <TableCell style={{ width: 160 }} align="right">
                      {formatTime(day.work)}
                    </TableCell>

                  </TableRow>
                ))
                : <TableRow component="th" scope="row">
                    <TableCell style={{ width: 160 }} align="right">
                      No data available.
                    </TableCell>
                  </TableRow>}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={pages.length}
                    rowsPerPage={rowsPerPage}
                    labelDisplayedRows={() => {
                      '';
                    }}
                    page={currentPage}
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
        </Box>
      </Paper>
    </Container>
  );
}
