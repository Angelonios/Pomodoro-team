import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';

import { TeamsViewMenu } from 'src/molecules';
import { LogOut } from 'src/atoms';

export function MenuUser({ user_id, logOut }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
          <LogOut logOut={logOut} />
        </MenuItem>
        <MenuItem>
          <TeamsViewMenu
            user_id={user_id}
            anchor={anchorEl}
            setAnchor={setAnchorEl}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
