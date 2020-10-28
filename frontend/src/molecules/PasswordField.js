import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export function PasswordField({ id, children }) {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        name="password"
        label={children}
        type="password"
        id={id}
        autoComplete="current-password"
      />
    </Grid>
  );
}
