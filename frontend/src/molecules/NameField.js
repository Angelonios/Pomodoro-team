import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export function NameField({
  name,
  formData,
  handleChange,
  formErrors,
  helperText,
}) {
  return (
    <Grid item xs={12}>
      <TextField
        error={formErrors}
        required
        fullWidth
        id="name"
        label="Display name"
        autoComplete="name"
        defaultValue={name}
        variant="outlined"
        onChange={handleChange}
        helperText={helperText}
        value={name}
      />
    </Grid>
  );
}
