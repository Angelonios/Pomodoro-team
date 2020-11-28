import React from 'react';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../utils/auth';
import { TablePaginationActions } from 'src/molecules/TablePaginationActions';
import { StatisticsTable } from 'src/molecules/StatisticsTable';

const POMODORO_STATISTICS = gql`
  query pomodoroStatistics($user_id: Int!) {
    pomodoroStatistics(user_id: $user_id) {
      Pomodoro{
        finished_at,
        duration,
      }
    }
  }
`;

export function PomodoroStatistics() {
  const auth = useAuth();
  // if (!auth.user) {
  //   return <HomePage />;
  // }
  const tableStyle = makeStyles({
    table: {
      minWidth: 500,
    },
  });

  const tableActionsStyle = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const tableActions = () => TablePaginationActions(tableActionsStyle());

  /* Typechecking setting for table actions */
  tableActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  // const { loading, data } = useQuery(POMODORO_STATISTICS, {
  //   variables: { user_id: auth.user.user_id },
  // });

  function createData(name, calories, fat) {
    return { name, calories, fat };
  }

  const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // debugger;
  return <StatisticsTable classes={tableStyle()}
                          rowsPerPage={rowsPerPage}
                          rows={rows}
                          page={page}
                          emptyRows={emptyRows}
                          handleChangePage={handleChangePage}
                          TablePaginationActions={tableActions}
  />
}
