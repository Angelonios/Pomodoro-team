export const convertSecondsToMinutesSting = (seconds) => {
  let min = parseInt(seconds / 60);
  let sec = parseInt(seconds % 60);

  if (seconds < 0) {
    min = '−' + Math.abs(min);
    sec = Math.abs(sec);
  }
  if (sec < 10 && sec > -10) {
    sec = '0' + sec;
  }
  return min + ':' + sec;
};

export const convertSecondsToHours = (seconds) => {
  const HOUR = 3600;
  return parseInt(seconds) / HOUR;
};

export const convertSecondsToPrettyString = (seconds) => {
  const ONE_HOUR_IN_SECONDS = 3600;
  const ONE_MINUTE_IN_SECONDS = 60;
  const hours = parseInt(seconds / ONE_HOUR_IN_SECONDS);
  const minutes = parseInt(
    (seconds % ONE_HOUR_IN_SECONDS) / ONE_MINUTE_IN_SECONDS,
  );
  const hoursString = hours === 1 ? 'hour' : 'hours';
  const minutesString = minutes === 1 ? 'minute' : 'minutes';
  return hours === 0
    ? `${minutes} ${minutesString}`
    : `${hours} ${hoursString} and ${minutes} ${minutesString}`;
};
