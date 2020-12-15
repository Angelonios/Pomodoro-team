import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export const MenuItems = React.forwardRef(({ data, onClick }, ref) =>
  data.userTeams.map((team) => (
    <MenuItem id={team.team_id} key={team.team_id} onClick={onClick}>
      {team.name}
    </MenuItem>
  )),
);
