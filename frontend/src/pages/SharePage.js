import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { usePomodoroState } from '../utils/PomodoroContext';


const GET_POMODORO = gql`
  query Pomodoro($shareId: String!) {
    pomodoro(shareId: $shareId) {
      position
      secondsSinceStart
    }
  }
`;

export function SharePage() {
  let state = usePomodoroState();

  const { shareId } = useParams();
  debugger;
  const { loading, error, data } = useQuery(GET_POMODORO, { variables: { shareId } });
  let progressValue = (data.secondsSinceStart);
  if (loading) {
    return <p>Loading...</p>;

  }
  if (error) {
    return <p>Something has gone wrong...</p>;

  }
}
