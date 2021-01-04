import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { gql, useQuery } from '@apollo/client';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Avatar, Grid, Box } from '@material-ui/core';
import NatureIcon from '@material-ui/icons/Nature';
import Gravatar from 'react-gravatar';

import { SquareInRow } from 'src/molecules';
import grass4 from 'src/assets/grass4.jpg';

const useStyles = makeStyles((theme) => ({
  board: {
    width: '550px',
    height: '550px',
    backgroundImage: 'url(' + grass4 + ')',
    marginBottom: theme.spacing(4),
  },
  root: {
    flexGrow: 1,
    width: '65%',
    marginBottom: theme.spacing(2),
  },
  float: {
    paddingTop: '100%',
    float: 'left',
  },
  container: {
    width: '1208px',
    height: '1208px',
  },
}));

const GET_GARDEN_SQUARES = gql`
  query gardenSquares($team_id: Int!) {
    gardenSquares(team_id: $team_id) {
      position
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

export function Garden({ team_id, user_id }) {
  const classes = useStyles();
  const rows = [0, 1, 2, 3, 4, 5, 6];
  const cols = [0, 1, 2, 3, 4, 5, 6];
  const [planting, setPlanting] = useState(false);
  const [actualPoints, setActualPoints] = useState(null);
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
    return <div>loading...</div>;
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
              xs={12}
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
          <div className={classes.board}>
            {rows.map((row, index) => (
              <>
                {cols.map((col, index) => {
                  for (
                    let i = 0;
                    i < gardenSquares.data.gardenSquares.length;
                    i++
                  ) {
                    if (
                      gardenSquares.data.gardenSquares[i].position ===
                      row.toString() + col
                    ) {
                      return (
                        <SquareInRow
                          rowNum={row}
                          colNum={col}
                          tree={true}
                          key={row * 7 + col}
                          planting={planting}
                          setPlanting={setPlanting}
                          actualPoints={actualPoints}
                          setActualPoints={setActualPoints}
                          team_id={team_id}
                          gardenSquares={gardenSquares}
                          display_name={
                            gardenSquares.data.gardenSquares[i].display_name
                          }
                        />
                      );
                    }
                  }
                  return (
                    <SquareInRow
                      rowNum={row}
                      colNum={col}
                      tree={false}
                      key={row * 7 + col}
                      planting={planting}
                      setPlanting={setPlanting}
                      actualPoints={actualPoints}
                      setActualPoints={setActualPoints}
                      team_id={team_id}
                      gardenSquares={gardenSquares}
                      display_name="empty"
                    />
                  );
                })}
              </>
            ))}
          </div>
        ) : (
          <div className={classes.board}>
            {rows.map((row, index) => (
              <>
                {cols.map((col, index) => {
                  return (
                    <SquareInRow
                      rowNum={row}
                      colNum={col}
                      tree={false}
                      key={row * 7 + col}
                      planting={planting}
                      setPlanting={setPlanting}
                      actualPoints={actualPoints}
                      setActualPoints={setActualPoints}
                      team_id={team_id}
                      gardenSquares={gardenSquares}
                      display_name="empty"
                    />
                  );
                })}
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
