import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  Container,
  Paper,
  Box,
  Grid,
  Typography,
  Hidden,
} from '@material-ui/core';

import { LeaveTeamButton, AddUserToTeam, KickButton } from 'src/molecules';
import { Loading, TeamPageName } from 'src/atoms';
import { Garden, SharedPomodoro } from 'src/organisms';
import { useAuth } from 'src/utils/auth';
import { ForbiddenPage } from 'src/pages/ForbiddenPage';
import { PageTitle } from 'src/utils/userNotification/PageTitle';
import {
  GET_TEAM_MEMBERS_POMODORO,
  GET_LEADER,
} from 'src/utils/serverSyncUtils';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    textAlign: 'center',
  },
}));

export function TeamDetailPageTemplate() {
  const { user } = useAuth();
  const classes = useStyles();
  const urlParams = useParams('teamId');
  const teamId = parseInt(urlParams.teamId);

  const { loading, error, data } = useQuery(GET_TEAM_MEMBERS_POMODORO, {
    variables: {
      team_id: teamId,
    },
  });
  const leader = useQuery(GET_LEADER, {
    variables: {
      team_id: teamId,
    },
  });
  let beta = JSON.parse(window.localStorage.getItem('beta'));

  if (error) return <div>Something went wrong. Please refresh the page.</div>;

  if (loading || leader.data === undefined)
    return (
      <Container component="main">
        <Paper elevation={3}>
          <Box p={3}>
            <Grid
              container
              spacing={3}
              direction="column"
              alignItems="center"
              className={classes.root}
            >
              <Grid item xs={12}>
                <Typography align={'center'} variant={'h3'}>
                  <Loading />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    );

  const teamName = data ? data.teamMembersPomodoro[0]?.name : '';

  if (
    !user ||
    !data.teamMembersPomodoro.some((e) => e.user_id === user.user_id)
  )
    return <ForbiddenPage />;

  return (
    <>
      <PageTitle pageName={teamName} />
      <Container component="main">
        <Paper elevation={3}>
          <Box p={3}>
            {data ? (
              <div className={classes.root}>
                <Grid
                  container
                  spacing={3}
                  direction="column"
                  alignItems="center"
                >
                  <Grid item xs={12} /*style={{ textAlign: 'center' }}*/>
                    <Typography align={'center'} variant={'h3'}>
                      {teamName}
                    </Typography>
                  </Grid>
                  {beta && <Garden team_id={teamId} user_id={user.user_id} />}
                  <div
                    style={{
                      border: '1px solid ',
                      borderColor: 'action',
                      width: '100%',
                      marginBottom: '20px',
                    }}
                  ></div>
                  <Grid item container>
                    <Grid
                      container
                      spacing={3}
                      style={{ marginBottom: '20px' }}
                    >
                      <Hidden smDown>
                        <Grid item xs={12} md={4}>
                          <Typography className={classes.header}>
                            Name
                          </Typography>
                        </Grid>
                      </Hidden>
                      <Hidden smDown>
                        <Grid item xs={12} md={4}>
                          <Typography className={classes.header}>
                            State
                          </Typography>
                        </Grid>
                      </Hidden>
                      <Hidden smDown>
                        <Grid item xs={12} md={4}>
                          <Typography className={classes.header}>
                            Timer
                          </Typography>
                        </Grid>
                      </Hidden>
                    </Grid>
                    <div
                      style={{
                        border: '1px solid ',
                        borderColor: 'action',
                        width: '100%',
                        marginBottom: '20px',
                      }}
                    ></div>
                    {data.teamMembersPomodoro.map(
                      (teamMemberPomodoro, index) => (
                        <Grid
                          key={index}
                          container
                          spacing={3}
                          style={{
                            alignItems: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <Hidden mdUp>
                            <Grid item xs={2}>
                              <Typography className={classes.header}>
                                Name
                              </Typography>
                            </Grid>
                          </Hidden>
                          <TeamPageName
                            email={teamMemberPomodoro.email}
                            name={teamMemberPomodoro.display_name}
                            owner={
                              leader.data.team.owner_id ===
                              teamMemberPomodoro.user_id
                            }
                          />
                          <SharedPomodoro
                            key={index}
                            shareId={teamMemberPomodoro.share_id}
                          />
                          <Grid
                            item
                            style={{
                              margin: 'auto',
                            }}
                          >
                            <KickButton
                              user_id={teamMemberPomodoro.user_id}
                              team_id={teamId}
                              owner_id={leader.data.team.owner_id}
                            />
                          </Grid>
                          <div
                            style={{
                              border: '1px solid',
                              borderColor: 'action',
                              width: '100%',
                              marginBottom: '20px',
                            }}
                          ></div>
                        </Grid>
                      ),
                    )}
                  </Grid>
                  <Grid item>
                    <LeaveTeamButton
                      team_id={teamId}
                      owner={leader.data.team.owner_id === user.user_id}
                      teamMembers={data.teamMembersPomodoro}
                    />
                  </Grid>
                  <Grid item>
                    <AddUserToTeam
                      team_id={teamId}
                      team_name={teamName}
                      teamMembers={data.teamMembersPomodoro}
                    />
                  </Grid>
                </Grid>
              </div>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography align={'center'} variant={'h3'}>
                    No team selected!
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
}
