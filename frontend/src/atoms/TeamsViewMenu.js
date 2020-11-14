import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';
import { MenuItems } from 'src/atoms';

export function TeamsViewMenu({ user_id }) {
  const USER_TEAMS = gql`
    query userTeams($user_id: Int!) {
      userTeams(user_id: $user_id) {
        name
        team_id
      }
    }
  `;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCreate = () => {
    history.replace(route.createTeam());
  };

  const { loading, error, data } = useQuery(USER_TEAMS, {
    variables: { user_id: user_id },
  });

  console.log(('data': data));

  if (loading) {
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
          <MenuItem>loading</MenuItem>
          <MenuItem onClick={handleCreate}>Create Team</MenuItem>
        </Menu>
      </div>
    );
  }
  if (error) {
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
          <MenuItem>Something went wrong !</MenuItem>
        </Menu>
      </div>
    );
  }

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
        <MenuItems data={data} />
        <MenuItem onClick={handleCreate}>Create Team</MenuItem>
      </Menu>
    </div>
  );
}
