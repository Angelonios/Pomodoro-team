import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { LeaveTeamButton } from '../molecules';
import { SharedPomodoro } from '../organisms';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  name: {
    marginTop: 58,
  },
}));
/*
const GET_TEAM_MEMBERS = gql`
  query getUsersFromTeam($team_id: Int!) {
    getUsersFromTeam(team_id: $team_id) {
      email
      user_id
    }
  }
`;
*/
const GET_TEAM_MEMBERS_POMODORO = gql`
  query teamMembersPomodoro($team_id: Int!) {
    teamMembersPomodoro(team_id: $team_id) {
      share_id
      email
    }
  }
`;

export function TeamDetailPageTemplate() {
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

  if (teamMembers.data === undefined) {
    return <div>loading...</div>;
  }

  console.log(teamMembers);

  return (
    <Container component="main">
      <Paper elevation={3}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography align={'center'} variant={'h3'}>
                {dataSet ? name : 'No team selected!'}
              </Typography>
            </Grid>
            {dataSet &&
              teamMembers.data.teamMembersPomodoro.map((pomodoro) => (
                <Grid container spacing={3} key={pomodoro.user_id}>
                  <Grid item xl={4} lg={4} xs={6} align="center">
                    <Typography
                      align={'center'}
                      variant={'body2'}
                      className={classes.name}
                      display="block"
                    >
                      {pomodoro.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} align="center">
                    <SharedPomodoro shareId={pomodoro.share_id} />
                  </Grid>
                </Grid>
              ))}
          </Grid>
          <Grid item xs={12}>
            <LeaveTeamButton team_id={id} />
          </Grid>
        </div>
      </Paper>
    </Container>
  );
}
