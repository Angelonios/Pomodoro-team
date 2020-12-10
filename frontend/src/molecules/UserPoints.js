import React from 'react';
import { Typography } from '@material-ui/core';

import { gql, useQuery } from '@apollo/client';

export function UserPoints({ user_id }) {
  const GET_DATA_FOR_USER_POINTS = gql`
    query Points($user_id: Int!) {
      user(user_id: $user_id) {
        used_points
      }
      pomodoroStatistics(user_id: $user_id) {
        duration
      }
    }
  `;

  const { loading, data } = useQuery(GET_DATA_FOR_USER_POINTS, {
    variables: {
      user_id: user_id,
    },
  });
  let sum = 0;
  if (loading) {
    return <Typography>Loading</Typography>;
  } else {
    data.pomodoroStatistics.forEach((item) => {
      sum += item.duration;
    });

    const countedPoints = Math.floor(sum / 1500) - data.user.used_points;

    return <Typography>Your points are: {countedPoints}</Typography>;
  }
}