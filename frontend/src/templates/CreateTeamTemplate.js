import React from 'react';
import { useState } from 'react';
import { TopNavigation } from '../organisms';
import { CreateTeamForm } from '../organisms/CreateTeamForm';

export function CreateTeamTemplate() {
  const [teamNameError, setTeamNameError] = useState(false);

  return (
    <>
    <TopNavigation />
    <CreateTeamForm
      teamNameError = {teamNameError}
      setTeamNameError = {setTeamNameError}
    />
    </>
  );
}
