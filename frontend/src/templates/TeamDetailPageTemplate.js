import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const GET_TEAM_MEMBERS = gql`
  query getUsersFromTeam($team_id: Int!) {
    getUsersFromTeam(team_id: $team_id) {
      email
      user_id
    }
  }
`;

export function TeamDetailPageTemplate() {
  const classes = useStyles();
  const location = useLocation();
  const dataSet = !(location.data === null || location.data === undefined);
  const name = dataSet ? location.data.name : 'No team set!';
  const id = dataSet ? parseInt(location.data.id) : 0;


  const teamMembers = useQuery(GET_TEAM_MEMBERS, {
    variables: {
      team_id: id,
    },
  });
  if (teamMembers.data === undefined) {
    return <div>loading...</div>;
  }

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
            {dataSet && teamMembers.data.getUsersFromTeam.map(tm =>
              <Grid item xs={12} key={tm.user_id}>
                <Typography align={'center'} variant={'body2'}>
                  {tm.email}
                </Typography>
              </Grid>,
            )}

          </Grid>
        </div>
      </Paper>
    </Container>


  );
}

