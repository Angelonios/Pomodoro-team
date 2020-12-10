import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { gql, useMutation } from '@apollo/client';

import tree3 from 'src/assets/tree3.png';
import { useAuth } from 'src/utils/auth';
import { useHistory, useLocation } from 'react-router-dom';
import { route } from 'src/Routes';

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

export function SquareInRow({ rowNum, colNum, tree, planting, team_id }) {
  const classes = useStyles();
  const { user } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const [plantTree] = useMutation(PLANT_TREE, {
    onCompleted: () => console.log('tree planted'),
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
    window.location.reload();
    console.log(e.target.id);
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
