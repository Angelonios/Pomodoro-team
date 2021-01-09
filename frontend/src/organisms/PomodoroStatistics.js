import React, { useEffect, useState } from 'react';
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

  const { loading, data, refetch } = useQuery(POMODORO_STATISTICS, {
    variables: { user_id: auth.user.user_id },
  });
  const tableStyle = makeStyles({
    table: {
      minWidth: 500,
    },
  });

  function prepareData(data) {
    const workDurations = data.pomodoroStatistics.map((ps) => {
      let workDate = new Date(parseInt(ps.finished_at));
      workDate.setHours(0, 0, 0, 0);
      return {
        duration: ps.duration,
        finished_at: workDate,
        tasks: ps.tasks,
      };
    });
    const preparedWeeks = PrepareWeeks();
    const preparedPages = preparedWeeks.map((week) =>
      week.map((day) => {
        return {
          date: day,
          work: 0,
          tasks: [],
        };
      }),
    );

    return mapWorkDatesToPages(workDurations, preparedPages);
  }

  function mapWorkDatesToPages(workDurations, preparedPages) {
    for (let i = 0; i < preparedPages.length; i++) {
      const week = preparedPages[i];
      week.sort((a, b) => a.date - b.date);
      for (let j = 0; j < week.length; j++) {
        const day = week[j];
        for (let k = 0; k < workDurations.length; k++) {
          const workDay = workDurations[k];
          if (day.date.getTime() === workDay.finished_at.getTime()) {
            day.work = workDay.duration;
            day.tasks = workDay.tasks;
            console.log('mapped work to day: ' + day);
          }
        }
      }
    }
    return preparedPages;
  }

  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setPages(prepareData(data));
  }, [loading, data]);

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

  return (
    <>
      <Container component="main">
        <StatisticsTable
          classes={tableStyle()}
          rowsPerPage={ROWS_PER_PAGE}
          pages={pages}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          TablePaginationActions={tableActions}
          refetch={refetch}
        />
      </Container>
    </>
  );
}
