import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { gql, useMutation, useQuery } from '@apollo/client';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Avatar, Grid, Tooltip } from '@material-ui/core';
import NatureIcon from '@material-ui/icons/Nature';
import Gravatar from 'react-gravatar';

import grass4 from 'src/assets/grass4.jpg';
import tree4 from 'src/assets/tree4.png';
import { Loading } from 'src/atoms';
import { useAuth } from 'src/utils/auth';

const useStyles = makeStyles((theme) => ({
  board: {
    width: '350px',
    height: '350px',
    backgroundImage: 'url(' + grass4 + ')',
    marginBottom: theme.spacing(4),
    position: 'relative',
  },
  root: {
    flexGrow: 1,
    width: '65%',
    marginBottom: theme.spacing(2),
  },
}));

const GET_GARDEN_SQUARES = gql`
  query gardenSquares($team_id: Int!) {
    gardenSquares(team_id: $team_id) {
      row
      col
      display_name
    }
  }
`;
const GET_USER_POINTS = gql`
  query userPoints($user_id: Int!) {
    userPoints(user_id: $user_id)
  }
`;

const GET_LESAPAN = gql`
  query lesaPan($team_id: Int!) {
    lesaPan(team_id: $team_id) {
      email
      display_name
    }
  }
`;

const PLANT_TREE = gql`
  mutation PlantTree(
    $team_id: Int!
    $user_id: Int!
    $display_name: String!
    $row: Int!
    $col: Int!
  ) {
    PlantTree(
      team_id: $team_id
      user_id: $user_id
      display_name: $display_name
      row: $row
      col: $col
    )
  }
`;

const SPEND_POINTS = gql`
  mutation SpendPoints($user_id: Int!) {
    SpendPoints(user_id: $user_id)
  }
`;

function getSquarePosition(row, column) {
  return {
    top: (row - 1) * 50,
    left: (column - 1) * 50,
  };
}

function getMousePosition(x, y) {
  return {
    row: Math.round((y + 50) / 50 - 0.5),
    column: Math.round((x + 50) / 50 - 0.5),
  };
}

export function Garden({ team_id, user_id }) {
  const classes = useStyles();
  const { user } = useAuth();
  const ROW_COUNT = 7;
  const COLUMN_COUNT = 7;
  const squares = [];
  const [planting, setPlanting] = useState(false);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [actualPoints, setActualPoints] = useState(null);
  const [spendPoints] = useMutation(SPEND_POINTS);
  const [plantTree] = useMutation(PLANT_TREE, {
    onCompleted: () => spendPoints({ variables: { user_id: user.user_id } }),
  });
  const points = useQuery(GET_USER_POINTS, {
    variables: { user_id: user_id },
    onCompleted: () => setActualPoints(points.data.userPoints),
  });
  const gardenSquares = useQuery(GET_GARDEN_SQUARES, {
    variables: {
      team_id: team_id,
    },
  });
  const gardenSquaresSet = !(
    gardenSquares.data === null || gardenSquares.data === undefined
  );

  const handleClick = () => {
    setPlanting(!planting);
  };
  const lesaPan = useQuery(GET_LESAPAN, {
    variables: {
      team_id: team_id,
    },
  });
  const lesaPanData = lesaPan.data;
  if (gardenSquares.data === undefined) {
    return <Loading />;
  }

  const handleMouseMove = (e) => {
    var park = document.getElementById('park');
    setHoveredSquare(
      getMousePosition(e.pageX - park.offsetLeft, e.pageY - park.offsetTop),
    );
    //console.log(hoveredSquare);
  };

  const handleGardenClick = (e) => {
    if (planting) {
      var park = document.getElementById('park');
      const plantingPosition = getMousePosition(
        e.pageX - park.offsetLeft,
        e.pageY - park.offsetTop,
      );
      const planted = gardenSquares.data.gardenSquares.find((tree) => {
        return (
          tree.row === plantingPosition.row &&
          tree.col === plantingPosition.column
        );
      });
      if (planted) {
        console.log('Zde už je zasazený strom!');
      } else {
        plantTree({
          variables: {
            team_id: team_id,
            user_id: user.user_id,
            display_name: user.display_name,
            row: plantingPosition.row,
            col: plantingPosition.column,
          },
        });
        console.log(
          `Sázíme na ${JSON.stringify(
            getMousePosition(
              e.pageX - park.offsetLeft,
              e.pageY - park.offsetTop,
            ),
          )}`,
        );
        setPlanting(!planting);
        setActualPoints(actualPoints - 10);
        gardenSquares.refetch();
      }
    }
  };

  function drawPark(plantedTrees) {
    for (let row = 1; row <= ROW_COUNT; row++) {
      for (let column = COLUMN_COUNT; column >= 1; column--) {
        const { top, left } = getSquarePosition(row, column);
        const isHoveredOver =
          hoveredSquare &&
          hoveredSquare.row === row &&
          hoveredSquare.column === column;
        const planted = plantedTrees.data.gardenSquares.find((tree) => {
          return tree.row === row && tree.col === column;
        });
        //console.log(row + ' X ' + column);
        if (planted) {
          if (planting) {
            squares.push(
              <div
                key={row * 7 + column}
                style={{
                  backgroundImage: 'url(' + tree4 + ')',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  width: '50px',
                  height: '50px',
                  top: top,
                  left: left,
                  position: 'absolute',
                  filter: 'brightness(0.2)',
                  backgroundColor: '#ffffffe0',
                }}
              />,
            );
          } else if (isHoveredOver) {
            squares.push(
              <Tooltip title={planted.display_name}>
                <div
                  key={row * 7 + column}
                  style={{
                    backgroundImage: 'url(' + tree4 + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '50px',
                    height: '50px',
                    top: top,
                    left: left,
                    position: 'absolute',
                    filter: 'brightness(1.4)',
                  }}
                />
              </Tooltip>,
            );
          } else {
            squares.push(
              <div
                key={row * 7 + column}
                style={{
                  backgroundImage: 'url(' + tree4 + ')',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  width: '50px',
                  height: '50px',
                  top: top,
                  left: left,
                  position: 'absolute',
                }}
              />,
            );
          }
        } else {
          if (isHoveredOver && planting) {
            squares.push(
              <div
                key={row * 7 + column}
                style={{
                  backgroundImage: 'url(' + tree4 + ')',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  width: '50px',
                  height: '50px',
                  top: top,
                  left: left,
                  position: 'absolute',
                  backgroundColor: '#ffffff7a',
                  filter: 'brightness(1)',
                  cursor: 'pointer',
                }}
              />,
            );
          } else {
            squares.push(
              <div
                key={row * 7 + column}
                style={{
                  width: '50px',
                  height: '50px',
                  top: top,
                  left: left,
                  position: 'absolute',
                }}
              />,
            );
          }
        }
      }
    }
    return squares;
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              You have: {actualPoints} points!
            </Typography>
            <Typography component="div" style={{ marginLeft: 'auto' }}>
              {actualPoints < 10 ? (
                <Button
                  disabled={true}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<NatureIcon />}
                  onClick={handleClick}
                >
                  {planting ? 'Cancel' : 'Plant'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<NatureIcon />}
                  onClick={handleClick}
                >
                  {planting ? 'Cancel' : 'Plant'}
                </Button>
              )}
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: '5px' }}
            >
              {lesaPanData === undefined ? (
                <Typography>There is no The best Lesapán</Typography>
              ) : (
                <Grid>
                  <Typography
                    component="div"
                    style={{ marginRight: '20px', width: '100%' }}
                  >
                    The best Lesapán: {lesaPanData.lesaPan.display_name}
                  </Typography>
                  <Avatar
                    className={classes.medium}
                    style={{ margin: 'auto', marginBottom: '5px' }}
                  >
                    <Gravatar
                      email={lesaPanData.lesaPan.email}
                      size={50}
                      style={{ padding: '5px' }}
                    />
                  </Avatar>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        {gardenSquaresSet ? (
          <div
            id="park"
            className={classes.board}
            onMouseMove={handleMouseMove}
            onClick={handleGardenClick}
          >
            {drawPark(gardenSquares)}
          </div>
        ) : (
          <div id="park" className={classes.board}></div>
        )}
      </div>
    </>
  );
}
