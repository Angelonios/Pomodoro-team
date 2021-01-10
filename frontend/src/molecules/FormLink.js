import React from 'react';

import Grid from '@material-ui/core/Grid';
import { NavLink } from 'src/atoms/NavLink';

export function FormLink({ link, children }) {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <NavLink to={link} style={{ textDecoration: 'none' }}>
          <b style={{ color: '#3f51b5' }}>{children}</b>
        </NavLink>
      </Grid>
    </Grid>
  );
}
