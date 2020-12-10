import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { gql, useMutation } from '@apollo/client';

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

export function SquareInRow({
  rowNum,
  colNum,
  tree,
  planting,
  setPlanting,
  team_id,
  gardenSquares,
}) {
  const classes = useStyles();
  const { user } = useAuth();
  const [plantTree] = useMutation(PLANT_TREE);

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
            <img className={classes.img} src={tree3} height="75px" alt="tree" />
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
