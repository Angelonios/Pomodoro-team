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

export function SquareInRow({ rowNum, colNum, tree, planting }) {
  const classes = useStyles();
  return (
    <>
      {tree ? (
        <div
          className={classes.square}
          name={rowNum.toString() + colNum.toString()}
        >
          {planting ? (
            <img
              className={classes.img}
              src={tree3}
              height="75px"
              style={{ filter: 'brightness(0.2)' }}
            />
          ) : (
            <img className={classes.img} src={tree3} height="75px" />
          )}
        </div>
      ) : (
        <>
          {planting ? (
            <div
              className={classes.square}
              name={rowNum.toString() + colNum.toString()}
              style={{
                backgroundColor: '#ffffff7a',
                filter: 'brightness(1)',
                cursor: 'pointer',
              }}
            />
          ) : (
            <div
              className={classes.square}
              name={rowNum.toString() + colNum.toString()}
            />
          )}
        </>
      )}
    </>
  );
}
