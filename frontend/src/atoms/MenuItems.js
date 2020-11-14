import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

export function MenuItems({ data }) {
  return data.userTeams.map((team) => (
    <MenuItem id={team.team_id}>{team.name}</MenuItem>
  ));

}
