import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export function PasswordField({
  id,
  children,
  name,
  formData,
  updateFormData,
}) {
  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        name={name}
        label={children}
        type="password"
        id={id}
        autoComplete="current-password"
        onChange={handleChange}
      />
    </Grid>
  );
}
