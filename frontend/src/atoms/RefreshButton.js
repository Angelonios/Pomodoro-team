import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export function RefreshButton({ onClick }) {
  const classes = useStyles();

  return (
    <IconButton
      color="primary"
      aria-label="refresh"
      onClick={onClick}
      className={classes.margin}
    >
      <RefreshIcon fontSize="large" color="action" />
    </IconButton>
  );
}
