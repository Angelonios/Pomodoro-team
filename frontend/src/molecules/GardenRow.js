import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { SquareInRow } from 'src/molecules';

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

export function GardenRow({
  rowNum,
  gardenSquares,
  gardenSquaresSet,
  planting,
  setPlanting,
  team_id,
}) {
  const classes = useStyles();
  const squares = [1, 2, 3, 4, 5, 6, 7];

  if (!gardenSquaresSet) {
    return <div>loading...</div>;
  }

  return (
    <>
      {gardenSquaresSet ? (
        <div className={classes.row}>
          <div className={classes.float} />
          {squares.map((square, index) => {
            if (gardenSquares.data.gardenSquares !== undefined) {
              for (
                let i = 0;
                i < gardenSquares.data.gardenSquares.length;
                i++
              ) {
                if (
                  gardenSquares.data.gardenSquares[i].position ===
                  rowNum.toString() + index
                ) {
                  return (
                    <SquareInRow
                      rowNum={rowNum}
                      colNum={index}
                      tree={true}
                      key={index}
                      planting={planting}
                      setPlanting={setPlanting}
                      team_id={team_id}
                      gardenSquares={gardenSquares}
                    />
                  );
                }
              }
              return (
                <SquareInRow
                  rowNum={rowNum}
                  colNum={index}
                  tree={false}
                  key={index}
                  planting={planting}
                  setPlanting={setPlanting}
                  team_id={team_id}
                  gardenSquares={gardenSquares}
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
