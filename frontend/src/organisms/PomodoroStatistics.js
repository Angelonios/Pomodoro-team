import React from 'react';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../utils/auth';
import { TablePaginationActions } from 'src/molecules/TablePaginationActions';
import { StatisticsTable } from 'src/molecules/StatisticsTable';
import { Box, Container, Paper } from '@material-ui/core';

const POMODORO_STATISTICS = gql`
  query pomodoroStatistics($user_id: Int!) {
    pomodoroStatistics(user_id: $user_id) {
        finished_at,
        duration,
    }
  }
`;

export function PomodoroStatistics() {
  const auth = useAuth();
  // if (!user) {
  //   return <HomePage />;
  // }
  const tableStyle = makeStyles({
    table: {
      minWidth: 500,
    },
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);


  const { loading, data } = useQuery(POMODORO_STATISTICS, {
    variables: { user_id: auth.user.user_id },
  });

  function ISO8601_week_no(dt) {
    const tdt = new Date(dt.valueOf());
    const dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    const firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
  }

  function parseData(data) {
    const sorted = data.pomodoroStatistics
      .map(s => ({
        finished_at: parseInt(s.finished_at),
        duration: s.duration,
      }))
      .sort((s1, s2) => (
        s1.finished_at < s2.finished_at ? -1 : 1
      ))
      .map(s => ({
        finished_at: (new Date(s.finished_at)).toLocaleString('en-us', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        }),
        duration: s.duration,
      }));

    const distinctBy = (prop, arr) => [...new Set(arr.map(o => o[prop]))];
    const distinct_dates = distinctBy('finished_at', sorted);

    const aggregated = distinct_dates.map(d => {
      let sum = 0;
      sorted.forEach(s => {
        if (s.finished_at === d) {
          for (let property in s) {
            if (property === 'finished_at') {
              sum += s.duration;
            }
          }
        }
      });
      return ({
        week_no: ISO8601_week_no(new Date(d)),
        finished_at: d,
        duration: sum,
      });
    });

    return aggregated;
  }

  const rows = (loading) ? [] : parseData(data);
  // debugger;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginationData = {
    count: rows.length,
    page: page,
    rowsPerPage: rowsPerPage,
    onChangePage: handleChangePage,
  };

  const tableActions = () => TablePaginationActions(paginationData);

  /* Typechecking setting for table actions */
  tableActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  // debugger;
  return <>
    <Container component="main">
      <StatisticsTable classes={tableStyle()}
                       rowsPerPage={rowsPerPage}
                       rows={rows}
                       page={page}
                       emptyRows={emptyRows}
                       setRowsPerPage={setRowsPerPage}
                       handleChangePage={handleChangePage}
                       TablePaginationActions={tableActions}
      />
    </Container>
  </>;
}
