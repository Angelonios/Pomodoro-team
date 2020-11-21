import React from 'react';

import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export function LogOut({ logOut }) {
  return (
    <IconButton color="secondary" aria-label="log out" onClick={logOut}>
      <ExitToAppIcon color="action" size="large" />
    </IconButton>
  );
}
