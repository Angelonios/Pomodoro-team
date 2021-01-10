import React, { useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { GetWeekNumberFromDate } from 'src/utils/DateHelper';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { DayStatisticsDialog } from 'src/organisms';

export function StatisticsTable({
  classes,
  rowsPerPage,
  pages,
  currentPage,
  handleChangePage,
  TablePaginationActions,
  refetch,
}) {
  const SECONDS_IN_HOUR = 3600;
  const SECONDS_IN_MINUTE = 60;
  const [selectedDate, setSelectedDate] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);

  function formatTime(seconds) {
    if (seconds === 0) {
      return 'no work done';
    }
    const hours = Math.floor(seconds / SECONDS_IN_HOUR);
    const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);

    const hour_text =
      hours === 1 ? hours + ' hour ' : hours < 1 ? '' : hours + ' hours ';
    const minute_text =
      minutes === 1
        ? minutes + ' minute '
        : minutes < 1
        ? ''
        : minutes + ' minutes ';
    const result =
      hour_text.length === 0 && minute_text.length === 0
        ? 'less than a minute'
        : hour_text + minute_text;

    return result;
  }

  const week = pages.length !== 0 ? pages[currentPage] : [];
  const weekNumber = GetWeekNumberFromDate(
    pages.length !== 0 ? week[0].date : new Date(),
  );

  const handleOpenDayStatisticsDialog = (day) => {
    setSelectedDate(day.date);
    setDialogOpen(true);
  };

  return (
    <>
      <Container component="main">
        <Paper elevation={3}>
          <Box p={3}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography align={'center'} variant={'h3'}>
                Week {weekNumber}.
              </Typography>
            </Grid>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell align="right">Tasks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pages.length !== 0 ? (
                    week.map((day) => (
                      <TableRow
                        hover
                        onClick={() => handleOpenDayStatisticsDialog(day)}
                        style={{ cursor: 'pointer' }}
                        key={day.date.toLocaleString('en-us', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          weekday: 'long',
                        })}
                      >
                        <TableCell component="th" scope="row">
                          {day.date.toLocaleString('en-us', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long',
                          })}
                        </TableCell>

                        <TableCell style={{ width: 160 }}>
                          {formatTime(day.work)}
                        </TableCell>

                        <TableCell style={{ width: 160 }} align="right">
                          {day.tasks.length}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No data available.</TableCell>
                    </TableRow>
                  )}
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
      <DayStatisticsDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        date={selectedDate}
        pages={pages}
        currentPage={currentPage}
        refetch={refetch}
      />
    </>
  );
}
