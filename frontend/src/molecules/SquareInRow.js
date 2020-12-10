import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { gql, useMutation } from '@apollo/client';
import { Tooltip } from '@material-ui/core';

import tree3 from 'src/assets/tree3.png';
import { useAuth } from 'src/utils/auth';

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

const PLANT_TREE = gql`
  mutation PlantTree(
    $team_id: Int!
    $user_id: Int!
    $display_name: String!
    $position: String!
  ) {
    PlantTree(
      team_id: $team_id
      user_id: $user_id
      display_name: $display_name
      position: $position
    )
  }
`;

const SPEND_POINTS = gql`
  mutation SpendPoints($user_id: Int!) {
    SpendPoints(user_id: $user_id)
  }
`;

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
        <div
          className={classes.square}
          name={rowNum.toString() + colNum.toString()}
          id={rowNum.toString() + colNum.toString()}
        >
          {planting ? (
            <img
              className={classes.img}
              src={tree3}
              height="75px"
              alt="tree"
              style={{ filter: 'brightness(0.2)' }}
            />
          ) : (
            <Tooltip title={display_name}>
              <img
                className={classes.img}
                src={tree3}
                height="75px"
                alt="tree"
              />
            </Tooltip>
          )}
        </div>
      ) : (
        <>
          {planting ? (
            <div
              className={classes.square}
              name={rowNum.toString() + colNum.toString()}
              id={rowNum.toString() + colNum.toString()}
              style={{
                backgroundColor: '#ffffff7a',
                filter: 'brightness(1)',
                cursor: 'pointer',
              }}
              onClick={(e) => plantTrees(e)}
            />
          ) : (
            <div
              className={classes.square}
              name={rowNum.toString() + colNum.toString()}
              id={rowNum.toString() + colNum.toString()}
            />
          )}
        </>
      )}
    </>
  );
}
