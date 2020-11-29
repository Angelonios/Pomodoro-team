import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export function NameField({ name }) {
  return (
    <Grid item xs={12}>
      <TextField
        id="name"
        label="Display name"
        defaultValue={name}
        variant="outlined"
      />
    </Grid>
  );
}
