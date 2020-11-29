import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export function NameField({
  formData,
  handleChange,
  formErrors,
  helperText,
  data,
}) {
  return (
    <Grid item xs={12}>
      <TextField id="name" label="Display name" variant="outlined" />
    </Grid>
  );
}
