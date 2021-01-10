import React, { useRef, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMutation, useQuery } from '@apollo/client';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Avatar, Grid, Tooltip } from '@material-ui/core';
import NatureIcon from '@material-ui/icons/Nature';
import Gravatar from 'react-gravatar';

import trava from 'src/assets/trava.png';
import tree4 from 'src/assets/tree4.png';
import { Loading } from 'src/atoms';
import { GardenDialog } from 'src/molecules';
import { useAuth } from 'src/utils/auth';
import { GET_GARDEN_SQUARES, GET_LESAPAN, GET_USER_POINTS, PLANT_TREE, SPEND_POINTS } from '../utils/serverSyncUtils';

const useStyles = makeStyles((theme) => ({
  board: {
    width: '530px',
    height: '362px',
    backgroundImage: 'url(' + trava + ')',
    marginBottom: theme.spacing(4),
    position: 'relative',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom',
    WebkitFilter: 'drop-shadow(25px 25px 20px rgba(0,0,0,0.3))',
  },
  root: {
    flexGrow: 1,
    width: '65%',
    marginBottom: theme.spacing(2),
  },
}));

export function Garden({ team_id, user_id }) {
  const abcd = useRef();
  const classes = useStyles();
  const { user } = useAuth();
  const ROW_COUNT = 7;
  const COLUMN_COUNT = 7;
  const squares = [];
  const [open, setOpen] = useState(false);
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

  const getSquarePosition = (row, column) => {
    return {
      top: (row - 1) * 20 + 20 * 9 - (column - 1) * 20,
      left: (column - 1) * 40 + (row - 1) * 40,
    };
  };

  const getMousePosition = (left, top) => {
    left = left + 15;
    top = top + 15;
    return {
      row: Math.round((-180 + left / 2 + top) / 40 - 1.5) + 1,
      column: Math.round(left / 40 - (-180 + left / 2 + top) / 40 + 0.5) + 1,
    };
  };

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
    let park = document.getElementById('park');
    setHoveredSquare(
      getMousePosition(e.pageX - park.offsetLeft, e.pageY - park.offsetTop),
    );
  };

  const handleGardenClick = (e) => {
    if (planting) {
      let park = document.getElementById('park');
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
        setPlanting(!planting);
        setOpen(true);
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
        setPlanting(!planting);
        setActualPoints(actualPoints - 10);
        gardenSquares.refetch();
      }
    }
  };

  const drawPark = (plantedTrees) => {
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
                  transition: 'filter 700ms ease-in-out',
                  cursor: 'crosshair',
                }}
              />,
            );
          } else if (isHoveredOver) {
            squares.push(
              <Tooltip title={planted.display_name} key="tooltip">
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
                    filter: 'brightness(1.8)',
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
                key="plantingTree"
                style={{
                  backgroundImage: 'url(' + tree4 + ')',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  width: '50px',
                  height: '50px',
                  top: top,
                  left: left,
                  position: 'absolute',
                  filter: 'brightness(1.5) saturate(0%)',
                  cursor: 'crosshair',
                  transition: 'top 200ms ease-in-out, left 200ms ease-in-out',
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
    squares.push(
      <GardenDialog
        open={open}
        setOpen={setOpen}
        setPlanting={setPlanting}
        key="dialog"
      />,
    );
    return squares;
  };

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
            ref={abcd}
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
