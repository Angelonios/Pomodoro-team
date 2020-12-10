import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { gql, useQuery } from '@apollo/client';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import NatureIcon from '@material-ui/icons/Nature';

import { GardenRow, UserPoints } from 'src/molecules';
import grass4 from 'src/assets/grass4.jpg';

const useStyles = makeStyles((theme) => ({
  board: {
    width: '45%',
    height: 'auto',
    backgroundImage: 'url(' + grass4 + ')',
    marginBottom: theme.spacing(4),
  },
  root: {
    flexGrow: 1,
    width: '65%',
    marginBottom: theme.spacing(2),
  },
  button: {},
}));

const GET_GARDEN_SQUARES = gql`
  query gardenSquares($team_id: Int!) {
    gardenSquares(team_id: $team_id) {
      position
    }
  }
`;

export function Garden({ team_id, user_id }) {
  const classes = useStyles();
  const [planting, setPlanting] = useState(false);
  const points = 10;
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

  if (gardenSquares.data === undefined) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              <UserPoints user_id={user_id} />
            </Typography>
            <Typography component="div" style={{ marginLeft: 'auto' }}>
              {points < 10 ? (
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
      </div>

      {gardenSquaresSet ? (
        <div className={classes.board}>
          <GardenRow
            rowNum={0}
            gardenSquares={gardenSquares}
            planting={planting}
            setPlanting={setPlanting}
            gardenSquaresSet={gardenSquaresSet}
            team_id={team_id}
          />
          <GardenRow
            rowNum={1}
            gardenSquares={gardenSquares}
            planting={planting}
            setPlanting={setPlanting}
            gardenSquaresSet={gardenSquaresSet}
            team_id={team_id}
          />
          <GardenRow
            team_id={team_id}
            rowNum={2}
            gardenSquares={gardenSquares}
            planting={planting}
            setPlanting={setPlanting}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            team_id={team_id}
            rowNum={3}
            gardenSquares={gardenSquares}
            planting={planting}
            setPlanting={setPlanting}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            team_id={team_id}
            rowNum={4}
            gardenSquares={gardenSquares}
            planting={planting}
            setPlanting={setPlanting}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            team_id={team_id}
            rowNum={5}
            gardenSquares={gardenSquares}
            planting={planting}
            setPlanting={setPlanting}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            team_id={team_id}
            rowNum={6}
            gardenSquares={gardenSquares}
            planting={planting}
            setPlanting={setPlanting}
            gardenSquaresSet={gardenSquaresSet}
          />
        </div>
      ) : (
        <div className={classes.board}>
          <GardenRow
            rowNum={0}
            gardenSquares={gardenSquares}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={1}
            gardenSquares={gardenSquares}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={2}
            gardenSquares={gardenSquares}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={3}
            gardenSquares={gardenSquares}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={4}
            gardenSquares={gardenSquares}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={5}
            gardenSquares={gardenSquares}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={6}
            gardenSquares={gardenSquares}
            gardenSquaresSet={gardenSquaresSet}
          />
        </div>
      )}
    </>
  );
}
