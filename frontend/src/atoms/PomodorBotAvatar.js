import React from 'react';

import { tomato } from 'src/utils/pomodoroBotMapping';
import happyTomato from 'src/assets/tomatoes/happyTomato.svg';
import amazedTomato from 'src/assets/tomatoes/amazedTomato.svg';
import angryTomato from 'src/assets/tomatoes/angryTomato.svg';
import chilledTomato from 'src/assets/tomatoes/chilledTomato.svg';
import sadTomato from 'src/assets/tomatoes/sadTomato.svg';
import veryHappyTomato from 'src/assets/tomatoes/veryHappyTomato.svg';

export function PomodoroBotAvatar({ avatar, classes }) {
  return (
    <img
      className={classes.avatarImg}
      src={
        avatar === tomato.amazed
          ? amazedTomato
          : avatar === tomato.angry
          ? angryTomato
          : avatar === tomato.chilled
          ? chilledTomato
          : avatar === tomato.happy
          ? happyTomato
          : avatar === tomato.sad
          ? sadTomato
          : avatar === tomato.veryHappy
          ? veryHappyTomato
          : happyTomato
      }
      alt="Tomato"
    />
  );
}
