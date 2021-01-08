import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';
import { route } from '../Routes';
import { useAuth } from '../utils/auth';
import { LeaveTeamDialog } from 'src/organisms';

const LEAVE_TEAM = gql`
  mutation LeaveTeam($team_id: Int!, $user_id: Int!) {
    LeaveTeam(team_id: $team_id, user_id: $user_id)
  }
`;

export function LeaveTeamButton({ team_id, owner, teamMembers }) {
  const { user } = useAuth();
  const history = useHistory();
  const [leaveTeam] = useMutation(LEAVE_TEAM, {
    onCompleted: () => history.push(route.home()),
  });

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

  console.log(teamMembers);

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
        teamMembers={teamMembers}
        user={user}
      />
    </div>
  );
}
