import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InboxIcon from '@material-ui/icons/Inbox';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
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

export function TeamDetailPage() {
  debugger;
  const classes = useStyles();
  const location = useLocation();
  const name = location.data.name;
  const ID = location.data.id;

  const teamMembers = useQuery(GET_TEAM_MEMBERS, {
    variables: {
      team_id: ID
    },
  });
  if (teamMembers.data === undefined) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {teamMembers.data.getUsersFromTeam.map(tm =>
          <ListItem button key={tm.user_id}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={tm.email}  />
          </ListItem>
        )}
      </List>
    </div>
  );
}
