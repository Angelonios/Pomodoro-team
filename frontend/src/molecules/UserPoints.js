import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import { gql, useQuery } from '@apollo/client';

export function UserPoints({ user_id }) {
  const GET_CURRENT_USER_POINTS = gql`
    query Points($user_id: Int!) {
      user(user_id: $user_id) {
        points
      }
    }
  `;

  const { loading, data } = useQuery(GET_CURRENT_USER_POINTS, {
    variables: {
      user_id: user_id,
    },
  });
  if (loading) {
    return (
      <Grid item xs={12} md={4}>
        <Typography>Loadin.</Typography>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12} md={4}>
        <Typography>Your points are: {data.user.points}</Typography>
      </Grid>
    );
  }
}
