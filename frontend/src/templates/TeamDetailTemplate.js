import React from 'react';
import { useState } from 'react';
import { TopNavigation } from '../organisms';
import { TeamDetailPage } from '../organisms/TeamDetailPage';

export function TeamDetailTemplate() {
  // const [teamNameError, setTeamNameError] = useState(false);

  return (
    <>
      <TopNavigation />
      <TeamDetailPage
        // teamNameError = {teamNameError}
        // setTeamNameError = {setTeamNameError}
      />
    </>
  );
}
