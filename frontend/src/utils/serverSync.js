import React from 'react';
import { v4 as uuidv4 } from 'uuid';
/* import { gql } from '@apollo/client'; */

const ServerSync = () => {};

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
