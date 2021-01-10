import React from 'react';
import { Typography } from '@material-ui/core';

import { useQuery } from '@apollo/client';
import { GET_DATA_FOR_USER_POINTS } from 'src/utils/serverSyncUtils';

export function UserPoints({ user_id }) {
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

    return countedPoints;
  }
}
