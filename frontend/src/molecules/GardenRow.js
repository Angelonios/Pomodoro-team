import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { SquareInRow } from 'src/molecules';
import { from } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
  row: {
    width: '100%',
    display: 'flex',
  },
  float: {
    paddingTop: 'calc(100%/7)',
    float: 'left',
  },
}));

export function GardenRow({ rowNum }) {
  const classes = useStyles();
  return (
    <div className={classes.row}>
      <div className={classes.float} />
      <SquareInRow rowNum={rowNum} colNum={0} />
      <SquareInRow rowNum={rowNum} colNum={1} />
      <SquareInRow rowNum={rowNum} colNum={2} />
      <SquareInRow rowNum={rowNum} colNum={3} />
      <SquareInRow rowNum={rowNum} colNum={4} />
      <SquareInRow rowNum={rowNum} colNum={5} />
      <SquareInRow rowNum={rowNum} colNum={6} />
    </div>
  );
}
