import { v4 as uuidv4 } from 'uuid';
import { gql } from '@apollo/client';

export const POMODORO_QUERY = gql`
  query Pomodoro($shareId: String!) {
    pomodoro(shareId: $shareId) {
      position
      secondsSinceStart
      isOffline
    }
  }
`;

export const UPDATE_POMODORO_MUTATION = gql`
  mutation UpdatePomodoro(
    $running: Boolean!
    $position: Int!
    $communicationId: String!
    $shareId: String!
  ) {
    updatePomodoro(
      running: $running
      position: $position
      communicationId: $communicationId
      shareId: $shareId
    )
  }
`;

export const GET_USER_POMODORO_IDS = gql`
  query UserPomodoroIDs($user_id: Int!) {
    userPomodoroIds(user_id: $user_id) {
      share_id
      communication_id
    }
  }
`;

const getUdid = () => {
  return uuidv4();
};

export const saveIdsToLocalStorage = (communicationId, shareId) => {
  localStorage.setItem('communicationId', communicationId);
  localStorage.setItem('shareId', shareId);
};

export const initServerCommunication = (
  serverCommunicationId,
  serverShareId,
) => {
  if (serverCommunicationId && serverShareId) {
    saveIdsToLocalStorage(serverCommunicationId, serverShareId);
    return { communicationId: serverCommunicationId, shareId: serverShareId };
  } else {
    let communicationId;
    let shareId;
    if (
      localStorage.getItem('communicationId') === null ||
      localStorage.getItem('shareId') === null
    ) {
      communicationId = getUdid();
      shareId = getUdid();
      saveIdsToLocalStorage(communicationId, shareId);
      return { communicationId, shareId };
    } else {
      communicationId = localStorage.getItem('communicationId');
      shareId = localStorage.getItem('shareId');
      return { communicationId, shareId };
    }
  }
};
