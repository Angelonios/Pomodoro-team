import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMutation } from '@apollo/client';
import { Tooltip } from '@material-ui/core';

import tree3 from 'src/assets/tree3.png';
import { useAuth } from 'src/utils/auth';
import { PLANT_TREE, SPEND_POINTS } from 'src/utils/serverSyncUtils';

const useStyles = makeStyles((theme) => ({
  square: {
    width: 'calc(100%/7)',
    height: 'calc(100%/7)',
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    float: 'left',
  },
  img: {
    '&:hover': {
      filter: 'brightness(2)',
    },
  },
  imgPlanting: {
    opacity: '0.2',
    '&:hover': {
      filter: 'brightness(1)',
      opacity: '1',
    },
  },
  float: {
    paddingTop: 'calc(100%/7)',
    float: 'left',
  },
}));

export function SquareInRow({
  rowNum,
  colNum,
  tree,
  planting,
  setPlanting,
  team_id,
  gardenSquares,
  display_name,
  actualPoints,
  setActualPoints,
}) {
  const classes = useStyles();
  const { user } = useAuth();
  const [spendPoints] = useMutation(SPEND_POINTS);
  const [plantTree] = useMutation(PLANT_TREE, {
    onCompleted: () => spendPoints({ variables: { user_id: user.user_id } }),
  });

  const plantTrees = (e) => {
    if (e.target.id === '') {
      setPlanting(!planting);
      return false;
    }
    plantTree({
      variables: {
        team_id: team_id,
        user_id: user.user_id,
        display_name: user.display_name,
        position: e.target.id,
      },
    });
    setPlanting(!planting);
    setActualPoints(actualPoints - 10);
    gardenSquares.refetch();
  };

  return (
    <>
      {tree ? (
        <>
          {planting /* je strom a sázím */ ? (
            <div
              className={classes.square}
              id={rowNum.toString() + colNum.toString()}
              style={{
                backgroundColor: '#ffffffe0',
                filter: 'brightness(0.1)',
              }}
            >
              <img
                className={classes.img}
                src={tree3}
                height="75px"
                alt="tree"
                style={{ filter: 'brightness(0.2)' }}
              />
            </div>
          ) : (
            /* je strom a nesázím */
            <div
              className={classes.square}
              id={rowNum.toString() + colNum.toString()}
            >
              <Tooltip title={display_name}>
                <img
                  className={classes.img}
                  src={tree3}
                  height="75px"
                  alt="tree"
                />
              </Tooltip>
            </div>
          )}
        </>
      ) : (
        <>
          {planting /* není strom a sázím */ ? (
            <div
              className={classes.square}
              id={rowNum.toString() + colNum.toString()}
              style={{
                backgroundColor: '#ffffff7a',
                filter: 'brightness(1)',
                cursor: 'pointer',
              }}
              onClick={(e) => plantTrees(e)}
            >
              <img
                className={classes.imgPlanting}
                id={rowNum.toString() + colNum.toString()}
                src={tree3}
                height="75px"
                alt="tree"
              />
            </div>
          ) : (
            <div
              className={classes.square}
              id={rowNum.toString() + colNum.toString()}
            />
          )}
        </>
      )}
    </>
  );
}
