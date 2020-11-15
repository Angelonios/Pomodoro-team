import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  Container,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { LeaveTeamButton, AddUserToTeam } from '../molecules';
import { SharedPomodoro } from '../organisms';
import { useAuth } from '../utils/auth';
import { ForbiddenPage } from '../pages/ForbiddenPage';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  name: {
    marginTop: 58,
  },
}));

const GET_TEAM_MEMBERS_POMODORO = gql`
  query teamMembersPomodoro($team_id: Int!) {
    teamMembersPomodoro(team_id: $team_id) {
      share_id
      email
    }
  }
`;

export function TeamDetailPageTemplate() {
  const { user } = useAuth();
  const classes = useStyles();
  const location = useLocation();
  const dataSet = !(location.data === null || location.data === undefined);
  const name = dataSet ? location.data.name : 'No team set!';
  const id = dataSet ? parseInt(location.data.id) : 0;

  const teamMembers = useQuery(GET_TEAM_MEMBERS_POMODORO, {
    variables: {
      team_id: id,
    },
  });
  const teamMembersSet = !(
    teamMembers.data === null || teamMembers.data === undefined
  );

  if (teamMembers.data === undefined) {
    return <div>loading...</div>;
  }

  if (!user) {
    return <ForbiddenPage />;
  }
  return (
    <Container component="main">
      <Paper elevation={3}>
        <Box p={3}>
          {dataSet && teamMembersSet ? (
            <div className={classes.root}>
              <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Typography align={'center'} variant={'h3'}>
                    {dataSet ? name : 'No team selected!'}
                  </Typography>
                </Grid>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>E-mail</TableCell>
                        <TableCell align="center">State</TableCell>
                        <TableCell align="center">Timer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataSet &&
                        teamMembersSet &&
                        teamMembers.data.teamMembersPomodoro.map(
                          (pomodoro, index) => (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {pomodoro.email}
                              </TableCell>
                              <SharedPomodoro
                                shareId={pomodoro.share_id}
                                key={index}
                              />
                            </TableRow>
                          ),
                        )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid item>
                  <LeaveTeamButton team_id={id} />
                </Grid>
                <Grid item>
                  <AddUserToTeam team_id={id} team_name={name} />
                </Grid>
              </Grid>
            </div>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography align={'center'} variant={'h3'}>
                  {dataSet ? name : 'No team selected!'}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
