import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';
import { MenuItems } from 'src/atoms';
import { USER_TEAMS } from 'src/utils/serverSync';

export function TeamsViewMenu({ user_id, anchor, setAnchor }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreate = () => {
    history.replace(route.createTeam());
  };

  const handleClickItem = (e) => {
    setAnchor(null);
    setAnchorEl(null);

    history.push({ pathname: '/teamdetail/' + e.target.id });
  };

  const { loading, data } = useQuery(USER_TEAMS, {
    variables: { user_id: user_id },
  });

  if (loading) {
    return (
      <>
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
      </>
    );
  } else {
    return (
      <>
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
          <MenuItems data={data} onClick={handleClickItem} />
          <MenuItem onClick={handleCreate}>Create Team</MenuItem>
        </Menu>
      </>
    );
  }
}
