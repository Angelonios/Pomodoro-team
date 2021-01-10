import React from 'react';
import { Box, Container, Paper } from '@material-ui/core';

import { PomodoroTimer, TopNavigation } from 'src/organisms';
import { PageTitle } from 'src/utils/userNotification/PageTitle';
import { TaskForm } from 'src/organisms/TaskForm';
import { PomodoroBot } from 'src/organisms';
import { ShareUrl } from 'src/molecules';

export function HomeTemplate() {
  return (
    <>
      <PageTitle />
      <TopNavigation />
      <Container component="main">
        <Paper elevation={3}>
          <Box p={7}>
            <TaskForm />
          </Box>
          <PomodoroTimer />
          <Box p={4}>
            <PomodoroBot />
          </Box>
          <Box p={7}>
            <ShareUrl />
          </Box>
        </Paper>
      </Container>
    </>
  );
}
