import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export function NameField({
  data,
  formData,
  handleChange,
  formErrors,
  helperText,
}) {
  return (
    <Grid item xs={12}>
      <TextField
        error={formErrors}
        name="name"
        required
        fullWidth
        id="name"
        label="Display name"
        variant="outlined"
        onChange={handleChange}
        helperText={helperText}
        defaultValue={data}
      />
    </Grid>
  );
}
