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

const getUdid = () => {
  return uuidv4();
};

const saveIdsToLocalStorage = (communicationId, shareId) => {
  localStorage.setItem('communicationId', communicationId);
  localStorage.setItem('shareId', shareId);
};

export const initServerCommunication = () => {
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
};
