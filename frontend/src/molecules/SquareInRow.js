import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import grass2 from 'src/assets/grass2.jpg';

const useStyles = makeStyles((theme) => ({
  square: {
    border: '0.5px solid black',
    width: 'calc(100%/7)',
    maxHeight: '100%',
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    flexShrink: '0',
    minWidth: '100%',
    minHeight: '100%',
  },
  float: {
    paddingTop: 'calc(100%/7)',
    float: 'left',
  },
}));

export function SquareInRow({ rowNum, colNum }) {
  const classes = useStyles();
  return (
    <div
      className={classes.square}
      name={rowNum.toString() + colNum.toString()}
    ></div>
  );
}
