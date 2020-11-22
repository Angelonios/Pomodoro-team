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
import Gravatar from 'react-gravatar';
import Typography from '@material-ui/core/Typography';
import { Grid, Divider } from '@material-ui/core';
import { LeaveTeamButton, AddUserToTeam } from '../molecules';
import { RefreshButton, TeamPageName } from 'src/atoms';
import { SharedPomodoro } from '../organisms';
import { useAuth } from '../utils/auth';
import { ForbiddenPage } from '../pages/ForbiddenPage';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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

  const onClick = () => {
    teamMembers.refetch();
  };

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

  console.log(window.innerWidth);

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
                    <RefreshButton onClick={onClick} />
                  </Typography>
                </Grid>
                <Box style={{ width: '100%' }}>
                  <Box
                    display="flex"
                    style={{ width: '100%', marginBottom: '15px' }}
                  >
                    <Box style={{ margin: 'auto' }}>
                      <Typography>Email</Typography>
                    </Box>
                    <Box style={{ margin: 'auto' }}>
                      <Typography>State</Typography>
                    </Box>
                    <Box style={{ margin: 'auto' }}>
                      <Typography>Timer</Typography>
                    </Box>
                  </Box>
                  {dataSet &&
                    teamMembersSet &&
                    teamMembers.data.teamMembersPomodoro.map(
                      (pomodoro, index) => {
                        if (window.innerWidth < 740) {
                          return (
                            <>
                              <Box
                                display="flex"
                                key={index}
                                style={{
                                  width: '100%',
                                  flexDirection: 'column',
                                }}
                              >
                                <TeamPageName
                                  email={pomodoro.email}
                                  style={{
                                    marginBottom: '10px',
                                    alignSelf: 'flex-start',
                                  }}
                                />
                                <SharedPomodoro
                                  shareId={pomodoro.share_id}
                                  style={{ marginBottom: '10px' }}
                                  key={index}
                                />
                              </Box>
                              <Divider
                                style={{ margin: '15px 0' }}
                                key={index}
                              />
                            </>
                          );
                        } else {
                          return (
                            <>
                              <Box
                                display="flex"
                                key={index}
                                style={{
                                  width: '100%',
                                }}
                              >
                                <TeamPageName email={pomodoro.email} />
                                <SharedPomodoro
                                  shareId={pomodoro.share_id}
                                  key={index}
                                />
                              </Box>
                              <Divider
                                style={{ margin: '15px 0' }}
                                key={index}
                              />
                            </>
                          );
                        }
                      },
                    )}
                </Box>
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
