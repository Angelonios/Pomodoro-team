import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import { route } from 'src/Routes';
import { useAuth } from 'src/utils/auth';
import { LeaveTeamDialog } from 'src/organisms';
import { LEAVE_TEAM, SET_NEW_TEAM_OWNER } from 'src/utils/serverSyncUtils';

export function LeaveTeamButton({ team_id, owner, teamMembers }) {
  const { user } = useAuth();
  const history = useHistory();
  const [leaveTeam] = useMutation(LEAVE_TEAM, {
    onCompleted: () => history.push(route.home()),
  });
  const [setNewTeamOwner] = useMutation(SET_NEW_TEAM_OWNER);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    leaveTeam({
      variables: {
        team_id: team_id,
        user_id: user.user_id,
      },
    });
  };

  const handleConfirmWithNewTeamOwner = (newOwnerUserId) => {
    setNewTeamOwner({
      variables: {
        team_id: team_id,
        new_owner_user_id: newOwnerUserId,
      },
    });
    leaveTeam({
      variables: {
        team_id: team_id,
        user_id: user.user_id,
      },
    });
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Leave Team
      </Button>
      <LeaveTeamDialog
        owner={owner}
        open={open}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        handleConfirmWithNewTeamOwner={handleConfirmWithNewTeamOwner}
        teamMembers={teamMembers}
        user={user}
      />
    </div>
  );
}
