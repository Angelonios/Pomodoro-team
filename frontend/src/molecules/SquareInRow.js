import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import tree3 from 'src/assets/tree3.png';

const useStyles = makeStyles((theme) => ({
  square: {
    width: 'calc(100%/7)',
    maxHeight: '100%',
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    '&:hover': {
      filter: 'brightness(2)',
    },
  },
  float: {
    paddingTop: 'calc(100%/7)',
    float: 'left',
  },
}));

export function SquareInRow({ rowNum, colNum, tree }) {
  const classes = useStyles();
  return (
    <>
      {tree ? (
        <div
          className={classes.square}
          name={rowNum.toString() + colNum.toString()}
        >
          <img
            className={classes.img}
            onMouseOver="hover"
            src={tree3}
            height="75px"
          />
        </div>
      ) : (
        <div
          className={classes.square}
          name={rowNum.toString() + colNum.toString()}
        />
      )}
    </>
  );
}
