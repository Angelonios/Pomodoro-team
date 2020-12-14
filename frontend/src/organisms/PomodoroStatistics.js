import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TablePaginationActions } from 'src/molecules/TablePaginationActions';
import { StatisticsTable } from 'src/molecules/StatisticsTable';
import { Container } from '@material-ui/core';
import { POMODORO_STATISTICS } from 'src/utils/serverSync';
import { useAuth } from '../utils/auth';
import { PrepareWeeks } from '../utils/DateHelper';

export function PomodoroStatistics() {
  const ROWS_PER_PAGE = 7;
  const auth = useAuth();
  const [currentPage, setCurrentPage] = React.useState(0);

  const { loading, data } = useQuery(POMODORO_STATISTICS, {
    variables: { user_id: auth.user.user_id },
  });
  const tableStyle = makeStyles({
    table: {
      minWidth: 500,
    },
  });

  function prepareData(data) {
    debugger;
    const workDurations = data.pomodoroStatistics;
    const preparedWeeks = PrepareWeeks();
    const preparedPages = preparedWeeks.map(week =>
      week.map(day => {
        return ({
          date: day,
          work: 0,
        });
      }),
    );

    const finishedPages = mapWorkDatesToPages(workDurations, preparedPages)
    return finishedPages;
  }

  function mapWorkDatesToPages(workDurations, preparedPages){
    for (let i = 0; i < preparedPages.length; i++){
      const week = preparedPages[i];
      for (let j = 0; j < week.length; j++){
        const day = week[j];
        for (let k = 0; k < workDurations.length; k++){
          const workDay = workDurations[k];
          const workDayDate = new Date(parseInt(workDay.finished_at));
          if(day.date.getTime() === workDayDate.getTime()){
            day.work = workDay.duration;
            console.log("mapped work to day: " + day);
          }
        }
      }
    }
    return preparedPages;
  }

  let pages = (loading) ? [] : prepareData(data);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const paginationData = {
    count: pages.length,
    page: currentPage,
    rowsPerPage: ROWS_PER_PAGE,
    onChangePage: handleChangePage,
  };

  const tableActions = () => TablePaginationActions(paginationData);

  tableActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  return <>
    <Container component="main">
      <StatisticsTable classes={tableStyle()}
                       rowsPerPage={ROWS_PER_PAGE}
                       pages={pages}
                       currentPage={currentPage}
                       handleChangePage={handleChangePage}
                       TablePaginationActions={tableActions}
      />
    </Container>
  </>;
}
