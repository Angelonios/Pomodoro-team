import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

export function FormLink() {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Link href="*" variant="body2">
          Already have an account? Sign in
        </Link>
      </Grid>
    </Grid>
  );
}
