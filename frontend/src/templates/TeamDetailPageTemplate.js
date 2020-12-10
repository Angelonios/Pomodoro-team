import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  Container,
  Paper,
  Box,
  Grid,
  Typography,
  Hidden,
} from '@material-ui/core';

import { LeaveTeamButton, AddUserToTeam, UserPoints } from '../molecules';
import { RefreshButton, TeamPageName } from 'src/atoms';
import { Garden, SharedPomodoro } from '../organisms';
import { useAuth } from '../utils/auth';
import { ForbiddenPage } from '../pages/ForbiddenPage';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    textAlign: 'center',
  },
}));

const GET_TEAM_MEMBERS_POMODORO = gql`
  query teamMembersPomodoro($team_id: Int!) {
    teamMembersPomodoro(team_id: $team_id) {
      share_id
      email
      display_name
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
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Typography align={'center'} variant={'h3'}>
                    {dataSet ? name : 'No team selected!'}
                  </Typography>
                  <RefreshButton onClick={onClick} />
                </Grid>
                {/*                 <Grid item xs={12} md={4}>
                  <UserPoints user_id={user.user_id} />
                </Grid> */}

                <Garden team_id={id} user_id={user.user_id} />
                <div
                  style={{
                    border: '1px solid ',
                    borderColor: 'action',
                    width: '100%',
                    marginBottom: '20px',
                  }}
                ></div>
                <Grid item container>
                  <Grid container spacing={3} style={{ marginBottom: '20px' }}>
                    <Hidden smDown>
                      <Grid item xs={12} md={4}>
                        <Typography className={classes.header}>Name</Typography>
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
                  {dataSet &&
                    teamMembersSet &&
                    teamMembers.data.teamMembersPomodoro.map(
                      (pomodoro, index) => (
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
                            email={pomodoro.email}
                            name={pomodoro.display_name}
                          />
                          <SharedPomodoro
                            key={index}
                            shareId={pomodoro.share_id}
                          />
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
