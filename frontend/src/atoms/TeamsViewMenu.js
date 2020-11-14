import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { gql, useQuery } from '@apollo/client';

export function TeamsViewMenu({ user_id }) {
  const USER_TEAMS = gql`
    query userTeams($user_id: Int!) {
      userTeams(user_id: $user_id) {
        name
        team_id
      }
    }
  `;
  const { loading, error, data } = useQuery(USER_TEAMS, {
    variables: { user_id: user_id },
  });

  console.log(data);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Teams
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Team 1</MenuItem>
        <MenuItem onClick={handleClose}>Team 2</MenuItem>
        <MenuItem onClick={handleClose}>Team 3</MenuItem>
      </Menu>
    </div>
  );
}
