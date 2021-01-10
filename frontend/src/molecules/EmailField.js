import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export function EmailField({
  formData,
  handleChange,
  formErrors,
  helperText,
}) {
  return (
    <Grid item xs={12}>
      <TextField
        error={formErrors}
        variant="outlined"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        onChange={handleChange}
        helperText={helperText}
        defaultValue={formData.email}
      />
    </Grid>
  );
}
