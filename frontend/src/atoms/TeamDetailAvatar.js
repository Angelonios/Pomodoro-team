import React from 'react';
import { Avatar, Badge, Tooltip } from '@material-ui/core';
import Gravatar from 'react-gravatar';
import { makeStyles } from '@material-ui/core/styles';

import crown from 'src/assets/crown.svg';

export function TeamDetailAvatar({ owner, email }) {
  const useStyles = makeStyles((theme) => ({
    medium: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));
  const classes = useStyles();
  if (owner)
    return (
      <Tooltip title="Team owner">
        <Badge
          color="default"
          overlap="circle"
          badgeContent={
            <img
              src={crown}
              width={30}
              alt="Team owner"
              style={{ transform: 'rotate(35deg)', paddingBottom: '10px' }}
            />
          }
        >
          <Avatar className={classes.medium}>
            <Gravatar
              email={email}
              size={70}
              style={{ verticalAlign: 'sub', padding: '5px' }}
            />
          </Avatar>
        </Badge>
      </Tooltip>
    );

  return (
    <Avatar className={classes.medium}>
      <Gravatar
        email={email}
        size={70}
        style={{ verticalAlign: 'sub', padding: '5px' }}
      />
    </Avatar>
  );
}
