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

export function GardenRow({ rowNum, gardenSquares, gardenSquaresSet }) {
  const classes = useStyles();
  const row = [1, 2, 3, 4, 5, 6, 7];

  if (!gardenSquaresSet) {
    return <div>loading...</div>;
  }

  return (
    <>
      {gardenSquaresSet ? (
        <div className={classes.row}>
          <div className={classes.float} />
          {row.map((gardenSquare, index) => {
            if (
              gardenSquares.data.gardenSquares[index] !== undefined &&
              gardenSquares.data.gardenSquares[index].position ===
                rowNum.toString() + index
            ) {
              return (
                <SquareInRow
                  rowNum={rowNum}
                  colNum={index}
                  tree={true}
                  key={index}
                />
              );
            } else {
              return (
                <SquareInRow
                  rowNum={rowNum}
                  colNum={index}
                  tree={false}
                  key={index}
                />
              );
            }
          })}
        </div>
      ) : (
        <div className={classes.row}>
          <div className={classes.float} />
          <SquareInRow rowNum={rowNum} colNum={0} tree={false} />
          <SquareInRow rowNum={rowNum} colNum={1} tree={false} />
          <SquareInRow rowNum={rowNum} colNum={2} tree={false} />
          <SquareInRow rowNum={rowNum} colNum={3} tree={false} />
          <SquareInRow rowNum={rowNum} colNum={4} tree={false} />
          <SquareInRow rowNum={rowNum} colNum={5} tree={false} />
          <SquareInRow rowNum={rowNum} colNum={6} tree={false} />
        </div>
      )}
    </>
  );
}
