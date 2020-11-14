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
  const location = useLocation();
  const name = location.data.name;
  const ID = location.data.id;

  debugger;
  const teamMembers = useQuery(GET_TEAM_MEMBERS, {
    variables: {
      team_id: ID
    },
  });
  if (teamMembers.data === undefined) {
    return <div>loading...</div>;
  }

  return teamMembers.data.getUsersFromTeam.map(tm =>
    <div key={tm.user_id}>{tm.email}</div>,
  );
}
