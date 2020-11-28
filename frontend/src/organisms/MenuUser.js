import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, IconButton } from '@material-ui/core';

import { TeamsViewMenu } from 'src/molecules';
import { LogOut } from 'src/atoms';
import { useHistory } from 'react-router-dom';
import { route } from '../Routes';

export function MenuUser({ user_id, logOut }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        style={{ padding: '6px' }}
        onClick={handleClick}
      >
        <MenuIcon color="action" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Button onClick={() => history.push('/profile')}>Profile</Button>
        </MenuItem>
        <MenuItem style={{ color: 'red' }}>
          <TeamsViewMenu
            user_id={user_id}
            anchor={anchorEl}
            setAnchor={setAnchorEl}
          />
        </MenuItem>
        <MenuItem>
          <Button onClick={() => history.push(route.statistics())}>Statistics</Button>
        </MenuItem>
        <MenuItem>
          <LogOut logOut={logOut} />
        </MenuItem>
      </Menu>
    </>
  );
}
