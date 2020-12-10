import React from 'react';
import { Typography } from '@material-ui/core';

import { gql, useQuery } from '@apollo/client';

export function UserPoints({ user_id }) {
  const GET_CURRENT_USER_POINTS = gql`
    query Points($user_id: Int!) {
      user(user_id: $user_id) {
        used_points
      }
      pomodoroStatistics(user_id: $user_id) {
        finished_at
        duration
      }
    }
  `;

  const { loading, data } = useQuery(GET_CURRENT_USER_POINTS, {
    variables: {
      user_id: user_id,
    },
  });
  let countedPoints = 0;
  if (loading) {
    return <Typography>Loadin.</Typography>;
  } else {
    return (
      <Typography>Your used points are: {data.user.used_points}</Typography>
    );
  }
}
