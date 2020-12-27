import React from 'react';
import { useState } from 'react';
import { TopNavigation } from '../organisms';
import { CreateTeamForm } from '../organisms/CreateTeamForm';
import { PageTitle } from 'src/utils/userNotification/PageTitle';

export function CreateTeamTemplate() {
  const [teamNameError, setTeamNameError] = useState(false);

  return (
    <>
      <PageTitle pageName="Create Team" />
      <TopNavigation />
      <CreateTeamForm
        teamNameError={teamNameError}
        setTeamNameError={setTeamNameError}
      />
    </>
  );
}
