import { v4 as uuidv4 } from 'uuid';
/* import { gql } from '@apollo/client'; */

const getUdid = () => {
  return uuidv4();
};

const saveIdsToLocalStorage = (communicationId, shareId) => {
  localStorage.setItem('communicationId', communicationId);
  localStorage.setItem('shareId', shareId);
};

const getIdsFromLocalStorage = () => {
  const communicationId = localStorage.getItem('communicationId');
  const shareId = localStorage.getItem('shareId');
  return { communicationId, shareId };
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
  } else {
    communicationId = getIdsFromLocalStorage(communicationId);
    shareId = getIdsFromLocalStorage(shareId);
  }
};

/* const sendUpdatePomodoroMutation = () => {
  const UPDATE_POMODORO_MUTATION = gql`
    mutation UpdatePomodoro ($running: Boolean!, $position: Int!, $communicationId: String!, $shareId: String) {
      pomodoros (running: $running, position: $position) {
        running
        position
        ids (communicationId = $communicationId, shareId = $shareId) {
          communicationId
          shareId
        }
      }
    }
  `;
};

const sendPomodoroQuery = () => {
  const POMODORO_QUERY = gql`
      query Pomodoro ($communicationId: String!) {
        pomodoros{
          position
          secondsSinceStart
          ids (communicationId = $communicationId) {
            communicationId
          }
        }
      }
    `;
}; */
