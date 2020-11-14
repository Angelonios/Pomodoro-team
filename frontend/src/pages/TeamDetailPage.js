import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';


const GET_TEAM_MEMBERS = gql`
  query getUsersFromTeam($team_id: Int!) {
    getUsersFromTeam(team_id: $team_id) {
      email
      user_id
    }
  }
`;

export function TeamDetailPage() {
  debugger;
  const location = useLocation();
  const teamMembers = useQuery(GET_TEAM_MEMBERS, {
    variables: {
      team_id: location.data
      // team_id: 1,
    },
  });
  if (teamMembers.data === undefined) {
    return <div>loading...</div>;
  }

  return teamMembers.data.getUsersFromTeam.map(tm =>
    <div key={tm.user_id}>{tm.email}</div>,
  );
}
