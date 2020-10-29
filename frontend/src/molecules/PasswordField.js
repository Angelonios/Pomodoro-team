import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export function PasswordField({
  id,
  children,
  name,
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
        name={name}
        label={children}
        type="password"
        id={id}
        helperText={helperText}
        autoComplete="current-password"
        onChange={handleChange}
      />
    </Grid>
  );
}
