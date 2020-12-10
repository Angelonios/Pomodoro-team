import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { gql, useQuery } from '@apollo/client';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
  const gardenSquares = useQuery(GET_GARDEN_SQUARES, {
    variables: {
      team_id: team_id,
    },
  });
  const gardenSquaresSet = !(
    gardenSquares.data === null || gardenSquares.data === undefined
  );
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
          </Toolbar>
        </AppBar>
      </div>

      {gardenSquaresSet ? (
        <div className={classes.board}>
          <GardenRow
            rowNum={0}
            gardenSquares={gardenSquares.data}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={1}
            gardenSquares={gardenSquares.data}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={2}
            gardenSquares={gardenSquares.data}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={3}
            gardenSquares={gardenSquares.data}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={4}
            gardenSquares={gardenSquares.data}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={5}
            gardenSquares={gardenSquares.data}
            gardenSquaresSet={gardenSquaresSet}
          />
          <GardenRow
            rowNum={6}
            gardenSquares={gardenSquares.data}
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
