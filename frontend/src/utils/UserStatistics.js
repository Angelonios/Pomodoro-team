import { useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import { POMODORO_STATISTICS } from 'src/utils/serverSync';

function UserStatistics({ type }) {
  const auth = useAuth();
  const { loading, data } = useQuery(POMODORO_STATISTICS, {
    variables: { user_id: auth.user?.user_id },
    skip: !auth.user,
  });

  if (auth.user) {
    if (data && type === 'all') {
      return data.pomodoroStatistics;
    }
    if (data && type === 'today') {
      const todaysRecords = data.pomodoroStatistics.filter((record) => {
        const recordDate = new Date(
          parseInt(record.finished_at),
        ).toDateString();
        const todayDate = new Date().toDateString();
        if (recordDate === todayDate) {
          return record;
        }
      });
      const todaysTotalSeconds = todaysRecords.reduce(function (acc, obj) {
        return acc + obj.duration;
      }, 0);
      return todaysTotalSeconds;
    }
  }
  return null;
}

export function useStatistics({ type }) {
  return UserStatistics({ type });
}
