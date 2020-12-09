import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { GardenRow } from 'src/molecules';
import grass3 from 'src/assets/grass3.jpg';

const useStyles = makeStyles((theme) => ({
  board: {
    width: '45%',
    height: 'auto',
    backgroundImage: 'url(' + grass3 + ')',
  },
}));

export function Garden() {
  const classes = useStyles();
  return (
    <div className={classes.board}>
      <GardenRow rowNum={0} />
      <GardenRow rowNum={1} />
      <GardenRow rowNum={2} />
      <GardenRow rowNum={3} />
      <GardenRow rowNum={4} />
      <GardenRow rowNum={5} />
      <GardenRow rowNum={6} />
    </div>
  );
}
